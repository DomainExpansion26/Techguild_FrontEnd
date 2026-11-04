import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Cards, DashboardLayout, Dropdown, Popup, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { taskManagementApi, milestonesApi, submissionsApi } from "@/services/api";
import "./activeQuests.css";

const getMilestoneSelectionKey = (milestone, index) =>
  String(milestone.id || milestone._id || milestone.title || index + 1);

const getMilestoneStatusLabel = (status) => {
  const labels = {
    pending: "Pending",
    pending_approval: "Pending Approval",
    revision_requested: "Revision Requested",
    revision_required: "Revision Required",
    changes_requested: "Revision Requested",
    in_progress: "In Progress",
    pending_review: "Pending Review",
    in_review: "In Review",
    under_review: "Under Review",
  };
  return labels[status] || status.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const getMilestoneStatus = (milestone) =>
  String(milestone.status || "pending_approval").trim().toLowerCase().replaceAll(" ", "_");

const canSubmitMilestoneWork = (status) =>
  ["pending", "revision_required"].includes(
    String(status || "pending_approval").trim().toLowerCase().replaceAll(" ", "_"),
  );

const getUploadMilestoneId = (milestone, index) =>
  String(milestone.id || milestone._id || milestone.title || index);

const formatMilestoneAmount = (amount) => {
  const rawAmount = String(amount).trim();
  if (rawAmount.startsWith("₹")) return rawAmount;

  const numericAmount = Number(rawAmount.replaceAll(",", ""));
  return Number.isFinite(numericAmount)
    ? `₹${numericAmount.toLocaleString("en-IN")}`
    : rawAmount;
};

const normalizeTaskManagerStatus = (status) => {
  const normalizedStatus = String(status || "pending").toLowerCase().replaceAll(" ", "_");
  if (["approved", "completed", "complete", "done"].includes(normalizedStatus)) return "completed";
  if (["in_progress", "inprogress", "active"].includes(normalizedStatus)) return "in_progress";
  return "pending";
};

export default function ActiveQuests() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [selectedQuestId, setSelectedQuestId] = useState(null);
  const [viewingQuestMilestones, setViewingQuestMilestones] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [selectedMilestoneIds, setSelectedMilestoneIds] = useState([]);
  const [milestoneForm, setMilestoneForm] = useState({
    title: "",
    tasks: [""],
    description: "",
    amount: "",
    startDate: "",
    endDate: "",
  });
  const [milestoneFeedback, setMilestoneFeedback] = useState({ type: "", text: "" });
  const [creatingMilestone, setCreatingMilestone] = useState(false);
  const [deletingMilestone, setDeletingMilestone] = useState(false);
  const [milestonePendingDeletion, setMilestonePendingDeletion] = useState(null);
  const [milestoneDeleteFeedback, setMilestoneDeleteFeedback] = useState("");
  const [milestoneCreatedSuccessfully, setMilestoneCreatedSuccessfully] = useState(false);
  const [milestoneSuccessMessage, setMilestoneSuccessMessage] = useState("");
  const [submittingRoadmap, setSubmittingRoadmap] = useState(false);
  const [showRoadmapConfirmation, setShowRoadmapConfirmation] = useState(false);
  const [roadmapFeedback, setRoadmapFeedback] = useState({ type: "", text: "" });
  const [taskPopupMilestone, setTaskPopupMilestone] = useState(null);
  const [loadingTaskPopup, setLoadingTaskPopup] = useState(false);
  const [taskPopupError, setTaskPopupError] = useState("");
  const [taskManagerMilestone, setTaskManagerMilestone] = useState(null);
  const [managedTasks, setManagedTasks] = useState([]);
  const [loadingManagedTasks, setLoadingManagedTasks] = useState(false);
  const [savingManagedTasks, setSavingManagedTasks] = useState(false);
  const [managedTasksFeedback, setManagedTasksFeedback] = useState("");
  const [milestonePage, setMilestonePage] = useState(1);
  const [selectedUploadMilestone, setSelectedUploadMilestone] = useState(null);
  const [selectedUploadContractId, setSelectedUploadContractId] = useState("");
  const [selectedUploadTask, setSelectedUploadTask] = useState("");
  const [selectedUploadFile, setSelectedUploadFile] = useState(null);
  const [uploadFeedback, setUploadFeedback] = useState("");
  const [uploadFeedbackType, setUploadFeedbackType] = useState("error");
  const [loadingUploadTasks, setLoadingUploadTasks] = useState(false);
  const [isDraggingUpload, setIsDraggingUpload] = useState(false);
  const [taskFileUploads, setTaskFileUploads] = useState({});

  // Deliverable Submission Modal State
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [workNotes, setWorkNotes] = useState("");
  const [workLink, setWorkLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const fetchActiveContracts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskManagementApi.getMyWork();
      if (!Array.isArray(response?.quests)) {
        throw new Error("The active quests API returned an invalid response.");
      }

      const quests = await Promise.all(response.quests.map(async (quest) => {
        const questId = quest.quest_id;
        const milestoneResponse = await taskManagementApi.getQuestMilestones(questId);
        if (!Array.isArray(milestoneResponse?.milestones)) {
          throw new Error(`Milestones for quest "${quest.title}" could not be loaded.`);
        }

        return {
          ...quest,
          id: questId,
          client: { name: quest.client_name, company_name: quest.client_name },
          start_date: quest.accepted_at,
          milestones: milestoneResponse.milestones,
        };
      }));

      setContracts(quests);
      setSelectedQuestId((currentId) =>
        quests.some((quest) => String(quest.id) === String(currentId)) ? currentId : null,
      );
    } catch (err) {
      console.error("Error fetching active quests from API:", err);
      setError(err?.message || "Failed to load active contracts.");
      setContracts([]);
      setSelectedQuestId(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveContracts();
  }, [fetchActiveContracts]);

  const getTaskUploadKey = (milestone, taskIndex) =>
    `${milestone.id || milestone._id || milestone.title}:${taskIndex}`;
  const allMilestones = contracts.flatMap((contract) =>
    Array.isArray(contract.milestones) ? contract.milestones : [],
  );
  const selectedQuest = contracts.find((contract) => String(contract.id) === String(selectedQuestId));
  const milestones = selectedQuest?.milestones || [];
  const questMilestoneEndDate = milestones
    .map((milestone) => milestone.due_date || milestone.end_date || milestone.endDate)
    .filter(Boolean)
    .sort()
    .at(-1);
  const formatQuestHeaderDate = (date) => date
    ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "—";
  const taskCount = allMilestones.reduce(
    (total, milestone) => total + (
      Array.isArray(milestone.tasks) ? milestone.tasks.length : Number(milestone.task_count) || 0
    ),
    0,
  );
  const pendingReviews = allMilestones.filter((milestone) =>
    ["submitted", "in_review", "pending_review", "under_review", "pending_approval"].includes(
      (milestone.status || "").toLowerCase(),
    ),
  ).length;
  const earnings = allMilestones.reduce((total, milestone) => {
    if (!["approved", "completed"].includes((milestone.status || "").toLowerCase())) return total;
    const amount = Number(String(milestone.amount || 0).replace(/[^\d.-]/g, ""));
    return total + (Number.isFinite(amount) ? amount : 0);
  }, 0);
  const milestonesPerPage = 5;
  const totalMilestonePages = Math.max(1, Math.ceil(milestones.length / milestonesPerPage));
  const currentMilestonePage = Math.min(milestonePage, totalMilestonePages);
  const milestonePageNumbers = totalMilestonePages <= 7
    ? Array.from({ length: totalMilestonePages }, (_, index) => index + 1)
    : currentMilestonePage <= 4
      ? [1, 2, 3, 4, 5, "ellipsis", totalMilestonePages]
      : currentMilestonePage >= totalMilestonePages - 3
        ? [1, "ellipsis", ...Array.from({ length: 5 }, (_, index) => totalMilestonePages - 4 + index)]
        : [1, "ellipsis", currentMilestonePage - 1, currentMilestonePage, currentMilestonePage + 1, "ellipsis", totalMilestonePages];
  const visibleMilestones = milestones.slice(
    (currentMilestonePage - 1) * milestonesPerPage,
    currentMilestonePage * milestonesPerPage,
  );
  const visibleCardMilestones = visibleMilestones;
  const selectedMilestones = milestones.filter((milestone, index) =>
    selectedMilestoneIds.includes(getMilestoneSelectionKey(milestone, index)),
  );
  const selectedDraftMilestones = selectedMilestones.filter((milestone) =>
    getMilestoneStatus(milestone) === "draft",
  );
  const uploadableContracts = contracts;
  const selectedUploadContract = uploadableContracts.find(
    (contract) => String(contract.id || contract._id) === selectedUploadContractId,
  );
  const uploadableMilestones = Array.isArray(selectedUploadContract?.milestones)
    ? selectedUploadContract.milestones
    : [];
  const selectedUploadTaskList = Array.isArray(selectedUploadMilestone?.tasks)
    ? selectedUploadMilestone.tasks
    : [];
  const metrics = [
    { title: "ACTIVE QUEST", value: contracts.length, description: "Projects assigned to you", icon: "Files", color: "blue" },
    { title: "MILESTONES", value: allMilestones.length, description: "Deliverables for each quest", icon: "CircleCheck", color: "green" },
    { title: "TASKS", value: taskCount, description: "Action items under milestones", icon: "ClipboardList", color: "orange" },
    { title: "PENDING REVIEWS", value: pendingReviews, description: "Awaiting client feedback", icon: "NotebookText", color: "purple" },
    { title: "EARNING", value: `₹${earnings.toLocaleString("en-IN")}`, description: "Released after approvals", icon: "IndianRupee", color: "red" },
  ];

  const handleOpenSubmitModal = (milestone) => {
    setSelectedMilestone(milestone);
    setWorkNotes("");
    setWorkLink("");
    setFeedback({ type: "", text: "" });
  };

  const loadUploadMilestoneTasks = async (milestone, contractId) => {
    setLoadingUploadTasks(false);
    setSelectedUploadMilestone(milestone);
    setSelectedUploadTask(Array.isArray(milestone.tasks) && milestone.tasks.length ? "0" : "");
    setSelectedUploadFile(null);
    setUploadFeedback("");
    setUploadFeedbackType("error");

    if (Array.isArray(milestone.tasks)) return;

    const milestoneId = milestone.id || milestone._id;
    if (!contractId || !milestoneId) {
      setUploadFeedback("Tasks could not be loaded because this milestone is missing an ID.");
      return;
    }

    setLoadingUploadTasks(true);
    try {
      const response = await taskManagementApi.getQuestMilestone(contractId, milestoneId);
      const details = response?.milestone || response;
      if (!Array.isArray(details?.tasks)) {
        throw new Error("The milestone details did not include a task list.");
      }

      setSelectedUploadMilestone((current) =>
        current && String(current.id || current._id) === String(milestoneId)
          ? { ...current, ...details }
          : current,
      );
      setSelectedUploadTask(details.tasks.length ? "0" : "");
    } catch (err) {
      console.error("Failed to load tasks for document upload:", err);
      setUploadFeedback(err?.message || "Could not load milestone tasks. Please try again.");
    } finally {
      setLoadingUploadTasks(false);
    }
  };

  const handleOpenTaskUpload = (milestone) => {
    const milestoneId = milestone.id || milestone._id;
    const contract = contracts.find((item) =>
      (Array.isArray(item.milestones) ? item.milestones : []).some((itemMilestone) =>
        itemMilestone === milestone ||
        (milestoneId && String(itemMilestone.id || itemMilestone._id) === String(milestoneId)),
      ),
    );
    const contractId = String(contract?.id || contract?._id || "");
    setSelectedUploadContractId(contractId);
    setLoadingUploadTasks(false);
    loadUploadMilestoneTasks(milestone, contractId);
  };

  const handleChooseUploadFile = (file) => {
    setUploadFeedback("");
    setUploadFeedbackType("error");
    if (!file) {
      setSelectedUploadFile(null);
      return;
    }

    if (!/\.(xlsx|docx)$/i.test(file.name)) {
      setSelectedUploadFile(null);
      setUploadFeedback("Choose an .xlsx or .docx document.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setSelectedUploadFile(null);
      setUploadFeedback("File must be 10 MB or smaller.");
      return;
    }

    setSelectedUploadFile(file);
  };

  const handleUploadTaskFile = (event) => {
    event.preventDefault();
    const taskIndex = Number(selectedUploadTask);
    if (
      !selectedUploadMilestone ||
      selectedUploadTask === "" ||
      !Number.isInteger(taskIndex) ||
      taskIndex < 0 ||
      taskIndex >= selectedUploadTaskList.length ||
      !selectedUploadFile
    ) {
      setUploadFeedback("Choose a task and a file before uploading.");
      setUploadFeedbackType("error");
      return;
    }

    const task = selectedUploadTaskList[taskIndex];
    const taskName = typeof task === "object"
      ? task.title || task.name || `Task ${taskIndex + 1}`
      : task;
    const uploadKey = getTaskUploadKey(selectedUploadMilestone, taskIndex);

    setTaskFileUploads((current) => ({
      ...current,
      [uploadKey]: {
        fileName: selectedUploadFile.name,
        fileSize: selectedUploadFile.size,
        taskName,
        uploadedAt: new Date().toISOString(),
      },
    }));
    setUploadFeedback("File attached to this task for this session. Server upload API integration is still pending.");
    setUploadFeedbackType("success");
    setSelectedUploadFile(null);
  };

  const scrollToMilestones = () => {
    document.getElementById("task-milestones")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleViewQuestMilestones = (quest) => {
    setSelectedQuestId(quest.id);
    setSelectedMilestoneIds([]);
    setMilestoneDeleteFeedback("");
    setMilestonePage(1);
    setViewingQuestMilestones(true);
    document.getElementById("task-milestones")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDeleteMilestone = (milestone) => {
    const milestoneId = milestone?.id || milestone?._id;
    if (!selectedQuest || !milestoneId || deletingMilestone) {
      return;
    }

    setMilestoneDeleteFeedback("");
    setMilestonePendingDeletion(milestone);
  };

  const handleConfirmDeleteMilestone = async () => {
    const milestoneId = milestonePendingDeletion?.id || milestonePendingDeletion?._id;
    if (!selectedQuest || !milestoneId || deletingMilestone) return;
    setDeletingMilestone(true);
    setMilestoneDeleteFeedback("");
    try {
      await taskManagementApi.deleteQuestMilestone(selectedQuest.id, milestoneId);
      setMilestonePendingDeletion(null);
      setSelectedMilestoneIds([]);
      setMilestoneDeleteFeedback("");
      await fetchActiveContracts();
    } catch (err) {
      console.error("Failed to delete quest milestone:", err);
      setMilestoneDeleteFeedback(err?.message || "Could not delete the milestone. Please try again.");
    } finally {
      setDeletingMilestone(false);
    }
  };

  const handleDeleteSelectedMilestone = () => {
    if (selectedMilestones.length === 1) {
      handleDeleteMilestone(selectedMilestones[0]);
    }
  };

  const handleOpenEditMilestone = (milestone) => {
    setEditingMilestone(milestone);
    setMilestoneForm({
      title: milestone.title || "",
      tasks: Array.isArray(milestone.tasks) && milestone.tasks.length
        ? milestone.tasks.map((task) =>
          task && typeof task === "object" ? task.title || task.name || "" : task,
        )
        : [""],
      description: milestone.description || "",
      amount: String(milestone.amount ?? ""),
      startDate: milestone.start_date?.split("T")[0] || "",
      endDate: milestone.due_date?.split("T")[0] || "",
    });
    setMilestoneFeedback({ type: "", text: "" });
    setShowMilestoneForm(true);
  };

  const handleOpenCreateMilestone = (quest) => {
    setSelectedQuestId(quest.id);
    setViewingQuestMilestones(true);
    setSelectedMilestoneIds([]);
    setMilestoneDeleteFeedback("");
    setEditingMilestone(null);
    setMilestoneForm({ title: "", tasks: [""], description: "", amount: "", startDate: "", endDate: "" });
    setMilestoneFeedback({ type: "", text: "" });
    setShowMilestoneForm(true);
  };

  const handleOpenManageTasks = async (milestone) => {
    const milestoneId = milestone.id || milestone._id;
    setTaskManagerMilestone(milestone);
    setManagedTasksFeedback("");
    setLoadingManagedTasks(!Array.isArray(milestone.tasks));

    let taskList = milestone.tasks;
    if (!Array.isArray(taskList)) {
      if (!selectedQuest?.id || !milestoneId) {
        setManagedTasks([]);
        setManagedTasksFeedback("Tasks could not be loaded because this milestone has no ID.");
        setLoadingManagedTasks(false);
        return;
      }

      try {
        const response = await taskManagementApi.getQuestMilestone(selectedQuest.id, milestoneId);
        const details = response?.milestone || response;
        if (!Array.isArray(details?.tasks)) {
          throw new Error("The milestone details did not include a task list.");
        }
        taskList = details.tasks;
        setTaskManagerMilestone({ ...milestone, ...details });
      } catch (err) {
        console.error("Failed to load tasks for milestone management:", err);
        setManagedTasks([]);
        setManagedTasksFeedback(err?.message || "Could not load milestone tasks. Please try again.");
        setLoadingManagedTasks(false);
        return;
      }
    }

    setManagedTasks(taskList.map((task) => {
      const taskDetails = task && typeof task === "object" ? task : {};
      return {
        ...taskDetails,
        title: taskDetails.title || taskDetails.name || (typeof task === "string" ? task : ""),
        status: normalizeTaskManagerStatus(taskDetails.status),
      };
    }));
    setLoadingManagedTasks(false);
  };

  const handleViewMilestoneTasks = async (milestone) => {
    setTaskPopupMilestone(milestone);
    setTaskPopupError("");

    if (Array.isArray(milestone.tasks)) return;

    const milestoneId = milestone.id || milestone._id;
    if (!selectedQuest?.id || !milestoneId) {
      setTaskPopupError("Tasks could not be loaded because this milestone has no ID.");
      return;
    }

    setLoadingTaskPopup(true);
    try {
      const details = await taskManagementApi.getQuestMilestone(selectedQuest.id, milestoneId);
      setTaskPopupMilestone((current) =>
        current && String(current.id || current._id) === String(milestoneId)
          ? { ...current, ...details }
          : current,
      );
    } catch (err) {
      console.error("Failed to load milestone tasks:", err);
      setTaskPopupError(err?.message || "Could not load milestone tasks. Please try again.");
    } finally {
      setLoadingTaskPopup(false);
    }
  };

  const handleSaveManagedTasks = async () => {
    if (!taskManagerMilestone || managedTasks.some((task) => !task.title.trim())) {
      setManagedTasksFeedback("Enter a name for every task before saving.");
      return;
    }

    const milestoneId = taskManagerMilestone.id || taskManagerMilestone._id;
    if (!milestoneId) {
      setManagedTasksFeedback("This milestone cannot be updated because it has no ID.");
      return;
    }

    setSavingManagedTasks(true);
    setManagedTasksFeedback("");
    try {
      await milestonesApi.updateMilestone(milestoneId, {
        title: taskManagerMilestone.title,
        description: taskManagerMilestone.description,
        amount: taskManagerMilestone.amount,
        start_date: taskManagerMilestone.start_date || taskManagerMilestone.startDate,
        due_date: taskManagerMilestone.due_date || taskManagerMilestone.end_date || taskManagerMilestone.endDate,
        tasks: managedTasks.map((task) => ({ ...task, title: task.title.trim() })),
      });
      setTaskManagerMilestone(null);
      await fetchActiveContracts();
    } catch (err) {
      console.error("Failed to update milestone tasks:", err);
      setManagedTasksFeedback(err?.message || "Could not save task changes. Please try again.");
    } finally {
      setSavingManagedTasks(false);
    }
  };

  const handleSelectMilestone = (milestone, index, checked) => {
    const milestoneKey = getMilestoneSelectionKey(milestone, index);
    setSelectedMilestoneIds((current) => checked
      ? [...new Set([...current, milestoneKey])]
      : current.filter((id) => id !== milestoneKey));
  };

  const handleRequestMilestoneApproval = async () => {
    if (!selectedQuest?.id || !selectedDraftMilestones.length || submittingRoadmap) return;

    setSubmittingRoadmap(true);
    setRoadmapFeedback({ type: "", text: "" });
    const successfulMilestoneKeys = [];
    const failedMilestones = [];
    try {
      for (const milestone of selectedDraftMilestones) {
        const milestoneId = milestone.id || milestone._id;
        const milestoneKey = getMilestoneSelectionKey(milestone, milestones.indexOf(milestone));
        try {
          if (!milestoneId) {
            throw new Error("The milestone does not have an ID and could not be submitted.");
          }
          await taskManagementApi.sendQuestMilestoneForReview(selectedQuest.id, milestoneId, {
            note: "Here is the complete project roadmap. Please review.",
          });
          successfulMilestoneKeys.push(milestoneKey);
        } catch (err) {
          console.error(`Failed to request approval for milestone "${milestone.title || milestoneId}":`, err);
          failedMilestones.push({
            title: milestone.title || "Untitled milestone",
            message: err?.message || "Request failed.",
          });
        }
      }

      setSelectedMilestoneIds((current) =>
        current.filter((milestoneKey) => !successfulMilestoneKeys.includes(milestoneKey)),
      );
      if (successfulMilestoneKeys.length && !failedMilestones.length) {
        setRoadmapFeedback({
          type: "success",
          text: `${successfulMilestoneKeys.length} selected draft milestone${successfulMilestoneKeys.length === 1 ? "" : "s"} sent to the client for approval.`,
        });
      } else {
        const failureSummary = failedMilestones
          .map(({ title, message }) => `${title}: ${message}`)
          .join(" ");
        setRoadmapFeedback({
          type: "error",
          text: `${successfulMilestoneKeys.length} milestone${successfulMilestoneKeys.length === 1 ? "" : "s"} sent; ${failedMilestones.length} failed. ${failureSummary}`,
        });
      }
      if (successfulMilestoneKeys.length) {
        await fetchActiveContracts();
      }
    } catch (err) {
      console.error("Failed to request milestone approval:", err);
      setRoadmapFeedback({
        type: "error",
        text: err?.message || "Could not request milestone approval. Please try again.",
      });
    } finally {
      setSubmittingRoadmap(false);
      setShowRoadmapConfirmation(false);
    }
  };

  const handleCreateMilestone = async (e) => {
    e.preventDefault();
    const activeContract = contracts.find((contract) => String(contract.id) === String(selectedQuestId));
    const tasks = milestoneForm.tasks.map((task) => task.trim()).filter(Boolean);

    if (!editingMilestone && tasks.length === 0) {
      setMilestoneFeedback({ type: "error", text: "Add at least one task for this milestone." });
      return;
    }

    if (milestoneForm.endDate < milestoneForm.startDate) {
      setMilestoneFeedback({ type: "error", text: "End date must be on or after the start date." });
      return;
    }

    const startDate = milestoneForm.startDate
      ? new Date(`${milestoneForm.startDate}T00:00:00`).toISOString()
      : undefined;
    const dueDate = milestoneForm.endDate
      ? new Date(`${milestoneForm.endDate}T00:00:00`).toISOString()
      : undefined;
    const newMilestone = {
      title: milestoneForm.title.trim(),
      tasks,
      description: milestoneForm.description.trim(),
      amount: Number(milestoneForm.amount),
      start_date: startDate,
      due_date: dueDate,
    };

    if (editingMilestone) {
      const milestoneId = editingMilestone.id || editingMilestone._id;
      if (!selectedQuest?.id || !milestoneId) {
        setMilestoneFeedback({ type: "error", text: "This milestone cannot be updated because it has no ID." });
        return;
      }

      const dueDays = Math.round(
        (Date.parse(`${milestoneForm.endDate}T00:00:00Z`)
          - Date.parse(`${milestoneForm.startDate}T00:00:00Z`))
        / (24 * 60 * 60 * 1000),
      );
      setCreatingMilestone(true);
      setMilestoneFeedback({ type: "", text: "" });
      try {
        await taskManagementApi.updateQuestMilestone(selectedQuest.id, milestoneId, {
          title: newMilestone.title,
          description: newMilestone.description,
          amount: newMilestone.amount,
          start_date: startDate,
          due_date: dueDate,
          due_days: dueDays,
        });
        setShowMilestoneForm(false);
        setEditingMilestone(null);
        setMilestoneForm({ title: "", tasks: [""], description: "", amount: "", startDate: "", endDate: "" });
        await fetchActiveContracts();
        setMilestoneSuccessMessage("Milestone updated successfully.");
        setMilestoneCreatedSuccessfully(true);
      } catch (err) {
        console.error("Failed to update milestone:", err);
        setMilestoneFeedback({ type: "error", text: err?.message || "Could not update the milestone. Please try again." });
      } finally {
        setCreatingMilestone(false);
      }
      return;
    }

    const contractId = activeContract?.id || activeContract?._id;
    if (!contractId) {
      setMilestoneFeedback({ type: "error", text: "An active quest is required before you can create a milestone." });
      return;
    }

    setCreatingMilestone(true);
    setMilestoneFeedback({ type: "", text: "" });
    try {
      await taskManagementApi.createQuestMilestone(contractId, {
        ...newMilestone,
        tasks: tasks.map((title) => ({
          title,
          start_date: startDate,
          end_date: dueDate,
        })),
      });
      setShowMilestoneForm(false);
      setMilestoneForm({ title: "", tasks: [""], description: "", amount: "", startDate: "", endDate: "" });
      setMilestonePage(1);
      setSelectedQuestId(contractId);
      setViewingQuestMilestones(true);
      await fetchActiveContracts();
      requestAnimationFrame(scrollToMilestones);
      setMilestoneSuccessMessage("Milestone created successfully.");
      setMilestoneCreatedSuccessfully(true);
    } catch (err) {
      console.error("Failed to create milestone:", err);
      setMilestoneFeedback({ type: "error", text: err?.message || "Could not create the milestone. Please try again." });
    } finally {
      setCreatingMilestone(false);
    }
  };

  const handleSubmitDeliverable = async (e) => {
    e.preventDefault();
    if (!workNotes.trim() && !workLink.trim()) {
      setFeedback({ type: "error", text: "Please provide work notes or a repository/live link." });
      return;
    }

    setSubmitting(true);
    setFeedback({ type: "", text: "" });

    try {
      await submissionsApi.createSubmission({
        milestone_id: selectedMilestone.id || selectedMilestone._id,
        notes: workNotes,
        deliverable_url: workLink,
      });
      setFeedback({ type: "success", text: "Work submitted to client for milestone approval!" });
      setTimeout(() => {
        setSelectedMilestone(null);
        fetchActiveContracts();
      }, 1500);
    } catch (err) {
      console.error("Failed to submit work deliverable:", err);
      setFeedback({ type: "error", text: err?.message || "Submission failed. Please check your inputs." });
    } finally {
      setSubmitting(false);
    }
  };

  const uploadPage = (
    <Popup
      open={Boolean(selectedUploadMilestone)}
      onClose={() => setSelectedUploadMilestone(null)}
      title="Upload Your Files"
      overlayClassName="task-milestone-popup-overlay"
      cardClassName="task-upload-popup"
      bodyClassName="task-upload-popup-body"
    >
      <div className="task-upload-selectors">
        <Dropdown
          label="Select from your active quests"
          value={selectedUploadContractId}
          onChange={(event) => {
            const contract = uploadableContracts.find(
              (item) => String(item.id || item._id) === event.target.value,
            );
            const firstAvailableMilestone = contract?.milestones?.[0];
            const contractId = String(contract?.id || contract?._id || "");
            setSelectedUploadContractId(event.target.value);
            if (firstAvailableMilestone) {
              loadUploadMilestoneTasks(firstAvailableMilestone, contractId);
            } else {
              setSelectedUploadMilestone(null);
              setSelectedUploadTask("");
              setSelectedUploadFile(null);
            }
          }}
          options={uploadableContracts.map((contract) => ({
            value: String(contract.id || contract._id),
            label: contract.title || contract.project?.title || "Active quest",
          }))}
          placeholder="Select an active quest"
          required
          disabled={loadingUploadTasks}
        />
        <Dropdown
          label="Select the milestone"
          value={selectedUploadMilestone
            ? getUploadMilestoneId(
              selectedUploadMilestone,
              uploadableMilestones.indexOf(selectedUploadMilestone),
            )
            : ""}
          onChange={(event) => {
            const milestone = uploadableMilestones.find(
              (item, index) => getUploadMilestoneId(item, index) === event.target.value,
            );
            if (milestone) {
              loadUploadMilestoneTasks(milestone, selectedUploadContractId);
            }
          }}
          options={uploadableMilestones.map((milestone, index) => ({
            value: getUploadMilestoneId(milestone, index),
            label: milestone.title || `Milestone ${index + 1}`,
          }))}
          placeholder="Select a milestone"
          required
          disabled={loadingUploadTasks || !uploadableMilestones.length}
        />
      </div>

      <form className="task-file-upload-form" onSubmit={handleUploadTaskFile}>
        <Dropdown
          label="Select the task for this document"
          value={selectedUploadTask}
          onChange={(event) => {
            setSelectedUploadTask(event.target.value);
            setUploadFeedback("");
            setUploadFeedbackType("error");
          }}
          options={selectedUploadTaskList.map((task, index) => ({
            value: String(index),
            label: typeof task === "object" ? task.title || task.name || `Task ${index + 1}` : task,
          }))}
          placeholder={loadingUploadTasks ? "Loading tasks..." : "Select a task"}
          containerClassName="task-file-upload-task-dropdown"
          required
          disabled={loadingUploadTasks || !selectedUploadTaskList.length}
        />
        <label
          className={`task-file-dropzone ${isDraggingUpload ? "is-dragging" : ""}`}
          htmlFor="task-file-upload-input"
          onDragOver={(event) => {
            event.preventDefault();
            setIsDraggingUpload(true);
          }}
          onDragLeave={() => setIsDraggingUpload(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDraggingUpload(false);
            handleChooseUploadFile(event.dataTransfer.files?.[0]);
          }}
        >
          <span className="task-file-dropzone-icon"><Icon name="Upload" size={19} /></span>
          <strong>{selectedUploadFile ? selectedUploadFile.name : "Drag & drop your file here"}</strong>
          <span>{selectedUploadFile
            ? `${(selectedUploadFile.size / 1024 / 1024).toFixed(2)} MB`
            : "or"}</span>
          <span className="task-file-browse-button">Browse Files</span>
          <small>.xlsx, .docx | Max 10 MB</small>
          <input
            id="task-file-upload-input"
            type="file"
            accept=".xlsx,.docx"
            onChange={(event) => handleChooseUploadFile(event.target.files?.[0])}
          />
        </label>
        {uploadFeedback && (
          <p className={`task-file-upload-feedback ${uploadFeedbackType === "success" ? "is-success" : ""}`} role={uploadFeedbackType === "success" || loadingUploadTasks ? "status" : "alert"}>
            {uploadFeedback}
          </p>
        )}
        {loadingUploadTasks && <p className="task-file-upload-note" role="status">Loading milestone tasks…</p>}
        <p className="task-file-upload-note">
          The API is not connected yet. This records the file name in this page only; the document is not sent to a server.
        </p>
        <div className="task-upload-form-actions">
          <SecondaryButton type="button" onClick={() => setSelectedUploadMilestone(null)}>Cancel</SecondaryButton>
          <PrimaryButton
            type="submit"
            disabled={loadingUploadTasks || !selectedUploadFile || selectedUploadTask === "" || !selectedUploadTaskList.length}
          >
            Upload <Icon name="Upload" size={14} />
          </PrimaryButton>
        </div>
      </form>
    </Popup>
  );

  return (
    <DashboardLayout
      containerClass={`task-management-layout ${showMilestoneForm ? "is-milestone-form-open" : ""}`}
    >
      <div className={`active-quests-page ${showMilestoneForm ? "is-milestone-form-open" : ""} ${viewingQuestMilestones ? "is-quest-milestone-view" : ""}`}>
        <div className="task-dashboard-content">
        {!viewingQuestMilestones && <section className="task-welcome-banner">
          <div className="task-welcome-copy">
            <h1>
              Welcome to your Task Management Dashboard!
            </h1>
            <p>
              Create milestones to organize deliverables, then add tasks under each milestone to track progress and manage statuses effectively.
            </p>
            <div className="task-welcome-flow" aria-label="Milestone workflow">
              {[
                ["Plus", "Create Milestones"],
                ["Upload", "Submit to Client"],
                ["Eye", "Review Requested"],
                ["CircleCheck", "Work after approval"],
                ["CheckCircle2", "Deliver completed milestones"],
                ["IndianRupee", "Payment released"],
              ].map(([icon, text]) => (
                <span key={text}><Icon name={icon} size={13} />{text}</span>
              ))}
            </div>
          </div>
          <div className="task-header-actions">
            <PrimaryButton
              className="task-board-link"
              onClick={scrollToMilestones}
              icon={<Icon name="ChevronRight" size={16} />}
            >
              View Milestones
            </PrimaryButton>
          </div>
        </section>}

        {!viewingQuestMilestones && <section className="task-metrics" aria-label="Task management summary">
          {metrics.map((metric) => (
            <Cards
              key={metric.title}
              variant="metric"
              className={`task-metric-card task-metric-${metric.color}`}
              title={metric.title}
              value={loading ? "—" : metric.value}
              description={metric.description}
              icon={metric.icon}
            />
          ))}
        </section>}

        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}

        {contracts.length > 0 ? (
          <>
            {!viewingQuestMilestones && <Cards variant="base" className="task-my-quests-panel">
              <div className="task-my-quests-heading">
                <div>
                  <h2>My Quest</h2>
                  <p>Select a quest to create and manage its milestones.</p>
                </div>
                <button
                  type="button"
                  className="task-milestone-refresh"
                  onClick={fetchActiveContracts}
                  disabled={loading}
                >
                  <Icon name="Download" size={13} /> {loading ? "Refreshing..." : "Refresh"}
                </button>
              </div>
              <div className="task-my-quests-table-wrap">
                <table className="task-my-quests-table">
                  <thead>
                    <tr>
                      <th scope="col">Sr No.</th>
                      <th scope="col">Quest Name</th>
                      <th scope="col">Budget</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">Milestones</th>
                      <th scope="col">Progress</th>
                      <th scope="col">Status</th>
                      <th scope="col">Client Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((quest, index) => {
                      const questMilestones = Array.isArray(quest.milestones) ? quest.milestones : [];
                      const completed = questMilestones.filter((milestone) =>
                        ["approved", "completed"].includes(String(milestone.status || "").toLowerCase()),
                      ).length;
                      const progress = questMilestones.length
                        ? Math.round((completed / questMilestones.length) * 100)
                        : 0;
                      const status = String(quest.status || "active").toLowerCase().replaceAll("_", " ");
                      const isSelected = String(quest.id) === String(selectedQuestId);
                      const dueDates = questMilestones
                        .map((milestone) => milestone.due_date)
                        .filter(Boolean)
                        .sort();
                      const budget = Number(quest.budget_inr);

                      return (
                        <tr className={isSelected ? "is-selected" : ""} key={quest.id}>
                          <td>{index + 1}</td>
                          <td className="task-my-quest-name">{quest.title}</td>
                          <td>{Number.isFinite(budget) ? `₹${budget.toLocaleString("en-IN")}` : "—"}</td>
                          <td>{quest.start_date ? new Date(quest.start_date).toLocaleDateString() : "—"}</td>
                          <td>{dueDates.length ? new Date(dueDates[dueDates.length - 1]).toLocaleDateString() : "—"}</td>
                          <td>{questMilestones.length}</td>
                          <td><span className="task-my-quest-progress">{progress}%</span></td>
                          <td><span className={`task-my-quest-status ${status.replaceAll(" ", "-")}`}>{status}</span></td>
                          <td>{quest.client_name || quest.client?.company_name || "Client"}</td>
                          <td>
                            <button
                              type="button"
                              className="task-create-quest-milestone"
                              onClick={() => questMilestones.length
                                ? handleViewQuestMilestones(quest)
                                : handleOpenCreateMilestone(quest)}
                            >
                              <Icon name={questMilestones.length ? "Eye" : "Plus"} size={13} />
                              {questMilestones.length ? "View Milestones" : "Create Milestones"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Cards>}

            {viewingQuestMilestones && selectedQuest && (
              <section className="task-selected-quest-header" aria-label="Selected quest details">
                <div className="task-selected-quest-topline">
                  <div className="task-selected-quest-title">
                    <button
                      type="button"
                      className="task-selected-quest-back"
                      aria-label="Back to quests"
                      onClick={() => setViewingQuestMilestones(false)}
                    >
                      <Icon name="ArrowLeft" size={14} />
                    </button>
                    <div>
                      <h1>{selectedQuest.title}</h1>
                      <p>
                        Client Name: {selectedQuest.client_name || selectedQuest.client?.name || "Client"}
                        <Icon name="Verified" size={12} />
                      </p>
                    </div>
                  </div>
                  <div className="task-selected-quest-meta">
                    <span>
                      <Icon name="Calendar" size={12} />
                      Started on: {formatQuestHeaderDate(selectedQuest.start_date)}
                    </span>
                    <span>
                      <Icon name="Calendar" size={12} />
                      Ends on: {formatQuestHeaderDate(questMilestoneEndDate)}
                    </span>
                    <span className="task-selected-quest-pill is-active">
                      {String(selectedQuest.status || "Active").replaceAll("_", " ")}
                    </span>
                    <span className="task-selected-quest-pill is-priority">Quest</span>
                  </div>
                </div>
                <div className="task-selected-quest-review">
                  <span><Icon name="TriangleAlert" size={14} /></span>
                  <div>
                    <strong>Review Milestones Before Sending</strong>
                    <p>Double-check milestone details, budgets, and timelines before sending them to the client for approval.</p>
                  </div>
                </div>
              </section>
            )}

            {viewingQuestMilestones && selectedQuest && <>
            <Cards variant="base" className="task-milestones-panel" id="task-milestones">
          <div className="task-milestones-heading">
              <h2>
                <Icon name="NotebookText" size={16} /> {selectedQuest ? `${selectedQuest.title} — Milestones` : "Select a Quest"} ({milestones.length})
              </h2>
              <div className="task-milestone-toolbar">
              <button
                type="button"
                className="task-milestone-icon-button"
                aria-label="Edit selected milestone"
                title="Edit selected milestone"
                disabled={selectedMilestones.length !== 1}
                onClick={() => handleOpenEditMilestone(selectedMilestones[0])}
              >
                <Icon name="Pencil" size={14} />
              </button>
              <button
                type="button"
                className="task-milestone-icon-button is-danger"
                aria-label="Delete selected milestone"
                title={!selectedMilestones.length
                  ? "Select one milestone to delete"
                  : selectedMilestones.length !== 1
                    ? "Select only one milestone to delete"
                    : "Delete selected milestone"}
                disabled={selectedMilestones.length !== 1 || deletingMilestone}
                onClick={handleDeleteSelectedMilestone}
              >
                <Icon name="Trash" size={14} />
              </button>
              <PrimaryButton
                className="task-small-button"
                disabled={!selectedQuest}
                onClick={() => selectedQuest && handleOpenCreateMilestone(selectedQuest)}
              >
                <Icon name="Plus" size={14} /> Add Milestone
              </PrimaryButton>
              <button
                type="button"
                className="task-milestone-refresh"
                onClick={fetchActiveContracts}
                disabled={loading}
              >
                <Icon name="Download" size={13} /> {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
          {milestones.length ? (
            <div className="task-milestone-list">
              {visibleCardMilestones.length > 0 && (
                <div className="task-milestone-cards" aria-label="Pending and revision milestones">
                  {visibleCardMilestones.map((milestone) => {
                    const rowNumber = (currentMilestonePage - 1) * milestonesPerPage
                      + visibleMilestones.indexOf(milestone) + 1;
                    const milestoneId = milestone.id || milestone._id || milestone.title || rowNumber;
                    const milestoneKey = String(milestone.id || milestone._id || milestone.title || rowNumber);
                    const status = getMilestoneStatus(milestone);
                    const tasks = Array.isArray(milestone.tasks) ? milestone.tasks : [];
                    const progressValue = Number(milestone.progress);
                    const completedTaskCount = tasks.reduce((count, task, taskIndex) => {
                      const taskStatus = typeof task === "object"
                        ? String(task.status || "").toLowerCase()
                        : "";
                      return count + (
                        taskFileUploads[getTaskUploadKey(milestone, taskIndex)] ||
                        ["completed", "complete", "approved"].includes(taskStatus) ||
                        task?.is_completed
                          ? 1
                          : 0
                      );
                    }, 0);
                    const progress = ["approved", "completed"].includes(status)
                      ? 100
                      : tasks.length
                        ? Math.round((completedTaskCount / tasks.length) * 100)
                        : Number.isFinite(progressValue)
                          ? Math.min(100, Math.max(0, progressValue))
                          : 0;
                    const startDate = milestone.start_date || milestone.startDate;
                    const endDate = milestone.due_date || milestone.end_date || milestone.endDate;
                    const dateLabel = (date) => date
                      ? new Date(date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                      : "—";
                    const duration = milestone.duration || milestone.duration_days || milestone.durationDays;
                    const durationLabel = typeof duration === "number"
                      ? `Days 1-${duration}`
                      : typeof duration === "string" && /^\d+\s*[-–]\s*\d+$/.test(duration)
                        ? `Days ${duration}`
                        : duration;

                    return (
                      <article className="task-milestone-card" key={milestoneId}>
                        <input
                          className="task-milestone-checkbox"
                          type="checkbox"
                          checked={selectedMilestoneIds.includes(milestoneKey)}
                          aria-label={`Select ${milestone.title || `milestone ${rowNumber}`}`}
                          onChange={(event) => handleSelectMilestone(milestone, rowNumber - 1, event.target.checked)}
                        />
                        <div className="task-milestone-card-main">
                          <div className="task-milestone-card-heading">
                            <span className="task-milestone-card-number">{String(rowNumber).padStart(2, "0")}</span>
                            <span
                              className="task-milestone-card-title"
                              title={milestone.title || `Milestone ${rowNumber}`}
                            >
                              {milestone.title || `Milestone ${rowNumber}`}
                            </span>
                            <span className="task-milestone-card-dates">
                              <span><Icon name="Calendar" size={10} /> Start Date: {dateLabel(startDate)}</span>
                              <span><Icon name="Calendar" size={10} /> End Date: {dateLabel(endDate)}</span>
                            </span>
                            {durationLabel && <span className="task-milestone-card-duration">{durationLabel}</span>}
                            {milestone.amount != null && (
                              <strong className="task-milestone-card-amount">
                                {formatMilestoneAmount(milestone.amount)}
                              </strong>
                            )}
                            <span className={`task-milestone-status ${status}`}>
                              {getMilestoneStatusLabel(status)}
                            </span>
                          </div>
                          {milestone.description && (
                            <p className="task-milestone-card-description">{milestone.description}</p>
                          )}
                          <div className="task-milestone-card-actions">
                            {!canSubmitMilestoneWork(status) && (
                              <div className="task-milestone-progress">
                                <span>{progress}%</span>
                                <div><i style={{ width: `${progress}%` }} /></div>
                              </div>
                            )}
                            <button
                              type="button"
                              className="task-milestone-file-button"
                              aria-label={`Upload a document for ${milestone.title || `milestone ${rowNumber}`}`}
                              title="Upload a document for this milestone"
                              onClick={() => handleOpenTaskUpload(milestone)}
                            >
                              <Icon name="Upload" size={15} />
                              <span>Upload Document</span>
                            </button>
                            <button
                              type="button"
                              className="task-milestone-view-tasks"
                              onClick={() => handleViewMilestoneTasks(milestone)}
                            >
                              <Icon name="Eye" size={13} /> View Tasks
                            </button>
                            {!canSubmitMilestoneWork(status) && (
                              <button
                                type="button"
                                className="task-milestone-manage-tasks"
                                onClick={() => handleOpenManageTasks(milestone)}
                              >
                                <Icon name="Pencil" size={13} /> Manage Tasks
                              </button>
                            )}
                            {canSubmitMilestoneWork(status) && (
                              <button
                                type="button"
                                className="submit-work-btn"
                                onClick={() => handleOpenSubmitModal(milestone)}
                              >
                                Submit Work
                              </button>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
              <div className="task-milestone-pagination">
                <span>
                  {milestones.length
                    ? `${(currentMilestonePage - 1) * milestonesPerPage + 1} - ${Math.min(currentMilestonePage * milestonesPerPage, milestones.length)} of ${milestones.length} results`
                    : "0 results"}
                </span>
                <div>
                  <button
                    type="button"
                    aria-label="Previous milestone page"
                    disabled={currentMilestonePage === 1}
                    onClick={() => setMilestonePage((page) => Math.max(1, page - 1))}
                  >‹</button>
                  {milestonePageNumbers.map((page, index) => page === "ellipsis" ? (
                    <span className="task-milestone-page-ellipsis" key={`ellipsis-${index}`}>…</span>
                  ) : (
                    <button
                      type="button"
                      key={page}
                      aria-label={`Go to milestone page ${page}`}
                      aria-current={currentMilestonePage === page ? "page" : undefined}
                      className={`task-milestone-page-number ${currentMilestonePage === page ? "is-current" : ""}`}
                      onClick={() => setMilestonePage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    aria-label="Next milestone page"
                    disabled={currentMilestonePage === totalMilestonePages}
                    onClick={() => setMilestonePage((page) => Math.min(totalMilestonePages, page + 1))}
                  >›</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="task-milestone-empty">
              <span><Icon name="Plus" size={20} /></span>
              <h3>{loading ? "Loading milestones…" : selectedQuest ? "Start by creating a milestone" : "Choose a quest first"}</h3>
              <p>{selectedQuest
                ? "Add your first milestone to define deliverables and track progress seamlessly."
                : "Select Create Milestones next to a quest above to get started."}</p>
              <PrimaryButton
                className="task-small-button"
                disabled={loading || !selectedQuest}
                onClick={() => selectedQuest && handleOpenCreateMilestone(selectedQuest)}
              >
                <Icon name="Plus" size={14} /> Create Milestone
              </PrimaryButton>
            </div>
          )}
            </Cards>
            {roadmapFeedback.text && (
              <div
                className={`task-roadmap-feedback alert ${roadmapFeedback.type === "success" ? "alert-success" : "alert-danger"} py-2 px-3 mb-0`}
                role={roadmapFeedback.type === "success" ? "status" : "alert"}
              >
                {roadmapFeedback.text}
              </div>
            )}
            <div className="task-payment-banner">
              <span><Icon name="Lock" size={18} /></span>
              <div><strong>Secure Milestone Payments</strong><p>TechGuild securely holds your payment in escrow. Funds are released only after each milestone is reviewed and approved, protecting both clients and professionals.</p></div>
            </div>
            <div className="task-milestone-bottom-nav">
              <PrimaryButton
                type="button"
                className="task-small-button"
                disabled={!selectedDraftMilestones.length || submittingRoadmap}
                onClick={() => setShowRoadmapConfirmation(true)}
              >
                {submittingRoadmap
                  ? "Requesting Approval..."
                  : `Request Client Approval${selectedDraftMilestones.length ? ` (${selectedDraftMilestones.length})` : ""}`}
                {!submittingRoadmap && <Icon name="ArrowRight" size={14} />}
              </PrimaryButton>
            </div>
            </>}
            {!viewingQuestMilestones && <div className="task-payment-banner">
              <span><Icon name="Lock" size={18} /></span>
              <div><strong>Secure Milestone Payments</strong><p>TechGuild securely holds your payment in escrow. Funds are released only after each milestone is reviewed and approved, protecting both clients and professionals.</p></div>
            </div>}
          </>
        ) : loading ? (
          <div className="task-status-card text-center" role="status">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading contracts...</span>
            </div>
            <p className="text-secondary mt-2 mb-0">Loading your active quests...</p>
          </div>
        ) : (
          <>
            <Cards variant="base" className="task-empty-state task-empty-state-default">
              <div className="task-empty-illustration"><Icon name="ClipboardList" size={34} /></div>
              <h2>No Active Quests Yet</h2>
              <p>You don't have any active quests at the moment. Explore the Quest Board and find exciting opportunities to work on and grow your reputation.</p>
              <div className="task-empty-actions">
                <PrimaryButton onClick={() => navigate("/quest-board")} icon={<Icon name="Search" size={15} />}>Browse Quests</PrimaryButton>
                <SecondaryButton onClick={() => navigate("/profile/basic-info")} icon={<Icon name="User" size={15} />}>Complete Your Profile</SecondaryButton>
              </div>
            </Cards>
            <Cards variant="base" className="task-guide-card">
              <div className="task-guide-heading">
                <h2>How Task Management Works</h2>
                <button type="button" onClick={() => navigate("/help-support")}>
                  View Guide <Icon name="ChevronRight" size={12} />
                </button>
              </div>
              <div className="task-guide-steps">
                {[
                  ["Search", "task-guide-blue", "Win a Quest", "Find work that matches your skills and apply."],
                  ["CircleCheck", "task-guide-purple", "Milestones Created", "Agree on deliverables and payment stages."],
                  ["Upload", "task-guide-cyan", "Work & Submit", "Complete tasks and send your work for review."],
                  ["Eye", "task-guide-orange", "Client Review", "The client reviews and approves your submission."],
                  ["IndianRupee", "task-guide-green", "Get Paid", "Receive payment after milestone approval."],
                ].map(([icon, color, title, description]) => (
                  <article className="task-guide-step" key={title}>
                    <span className={`task-guide-icon ${color}`}><Icon name={icon} size={16} /></span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </Cards>
          </>
        )}

        </div>

        <Popup
          open={showMilestoneForm}
          onClose={() => {
            if (!creatingMilestone) {
              setShowMilestoneForm(false);
              setEditingMilestone(null);
            }
          }}
          title={editingMilestone ? "Edit Milestone" : "Create Milestone"}
          subtitle={!editingMilestone ? selectedQuest?.title || "" : ""}
          showCloseButton
          closeOnBackdrop={!creatingMilestone}
          overlayClassName="task-milestone-popup-overlay"
          cardClassName="task-create-milestone-popup"
        >
          <form id="create-milestone-form" className="task-create-milestone-form" onSubmit={handleCreateMilestone}>
            {milestoneFeedback.text && (
              <div className={`alert ${milestoneFeedback.type === "success" ? "alert-success" : "alert-danger"} py-2 px-3 mb-2`} role="alert">
                {milestoneFeedback.text}
              </div>
            )}

            <div className="task-form-field">
              <label htmlFor="task-milestone-title">Milestone Name <span>*</span></label>
              <input
                id="task-milestone-title"
                value={milestoneForm.title}
                onChange={(e) => setMilestoneForm((form) => ({ ...form, title: e.target.value }))}
                placeholder="Write milestone name here"
                maxLength={80}
                required
              />
            </div>

            {!editingMilestone && <fieldset className="task-form-field task-form-tasks">
              <legend>Add Tasks <span>*</span></legend>
              {milestoneForm.tasks.map((task, index) => (
                <div className="task-input-row" key={`task-${index}`}>
                  <input
                    aria-label={`Task ${index + 1}`}
                    value={task}
                    onChange={(e) => setMilestoneForm((form) => ({
                      ...form,
                      tasks: form.tasks.map((item, taskIndex) => taskIndex === index ? e.target.value : item),
                    }))}
                    placeholder="Write task here..."
                    required={index === 0}
                  />
                  {milestoneForm.tasks.length > 1 && (
                    <button
                      type="button"
                      className="task-remove-task"
                      onClick={() => setMilestoneForm((form) => ({
                        ...form,
                        tasks: form.tasks.filter((_, taskIndex) => taskIndex !== index),
                      }))}
                      aria-label={`Remove task ${index + 1}`}
                    >
                      <Icon name="X" size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="task-add-task"
                onClick={() => setMilestoneForm((form) => ({ ...form, tasks: [...form.tasks, ""] }))}
              >
                <Icon name="Plus" size={13} /> Add Task
              </button>
            </fieldset>}

            <div className="task-form-field">
              <label htmlFor="task-milestone-amount">Milestone Amount <span>*</span></label>
              <input
                id="task-milestone-amount"
                type="number"
                min="0"
                step="0.01"
                value={milestoneForm.amount}
                onChange={(e) => setMilestoneForm((form) => ({ ...form, amount: e.target.value }))}
                placeholder="Enter amount"
                required
              />
            </div>

            <div className="task-form-field task-form-description">
              <label htmlFor="task-milestone-description">Description <span className="task-optional-label">(Optional)</span></label>
              <textarea
                id="task-milestone-description"
                value={milestoneForm.description}
                onChange={(e) => setMilestoneForm((form) => ({ ...form, description: e.target.value }))}
                placeholder="Describe the task"
                maxLength={36}
                rows={2}
              />
              <small>{milestoneForm.description.length}/36</small>
            </div>

            <div className="task-milestone-form-row">
              <div className="task-form-field">
                <label htmlFor="task-milestone-start">Start Date <span>*</span></label>
                <input
                  id="task-milestone-start"
                  type="date"
                  value={milestoneForm.startDate}
                  onChange={(e) => setMilestoneForm((form) => ({ ...form, startDate: e.target.value }))}
                  max={milestoneForm.endDate || undefined}
                  required
                />
              </div>
              <div className="task-form-field">
                <label htmlFor="task-milestone-end">End Date <span>*</span></label>
                <input
                  id="task-milestone-end"
                  type="date"
                  value={milestoneForm.endDate}
                  onChange={(e) => setMilestoneForm((form) => ({ ...form, endDate: e.target.value }))}
                  min={milestoneForm.startDate || undefined}
                  required
                />
              </div>
            </div>

            <div className="task-milestone-form-actions">
              <SecondaryButton
                type="button"
                onClick={() => {
                  setShowMilestoneForm(false);
                  setEditingMilestone(null);
                  setMilestoneForm({ title: "", tasks: [""], description: "", amount: "", startDate: "", endDate: "" });
                }}
                disabled={creatingMilestone}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit" disabled={creatingMilestone}>
                {creatingMilestone ? "Saving…" : editingMilestone ? "Save Changes" : "Save Milestone"}
              </PrimaryButton>
            </div>
          </form>
        </Popup>

        <Popup
          open={Boolean(taskPopupMilestone)}
          onClose={() => {
            setTaskPopupMilestone(null);
            setTaskPopupError("");
          }}
          title="Milestone Tasks"
          subtitle={taskPopupMilestone?.title || ""}
          showCloseButton
          overlayClassName="task-milestone-popup-overlay"
          headerClassName="task-list-popup-header"
          bodyClassName="task-list-popup-body"
          cardClassName="task-list-popup"
        >
          {loadingTaskPopup ? (
            <p className="task-list-popup-empty" role="status">Loading tasks…</p>
          ) : taskPopupError ? (
            <p className="task-list-popup-empty" role="alert">{taskPopupError}</p>
          ) : Array.isArray(taskPopupMilestone?.tasks) && taskPopupMilestone.tasks.length ? (
            <div className="task-list-popup-table-wrap">
              <table className="task-list-popup-table">
                <thead>
                  <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">Tasks Name</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {taskPopupMilestone.tasks.map((task, index) => {
                    const taskFile = taskFileUploads[getTaskUploadKey(taskPopupMilestone, index)];
                    const taskStatus = taskFile
                      ? "completed"
                      : String(typeof task === "object" ? task?.status || "pending" : "pending")
                        .toLowerCase()
                        .replaceAll(" ", "_");
                    const taskName = typeof task === "object"
                      ? task?.title || task?.name || `Task ${index + 1}`
                      : task || `Task ${index + 1}`;
                    const startDate = typeof task === "object"
                      ? task?.start_date || task?.startDate || taskPopupMilestone.start_date || taskPopupMilestone.startDate
                      : taskPopupMilestone.start_date || taskPopupMilestone.startDate;
                    const endDate = typeof task === "object"
                      ? task?.due_date || task?.end_date || task?.endDate || taskPopupMilestone.due_date || taskPopupMilestone.end_date || taskPopupMilestone.endDate
                      : taskPopupMilestone.due_date || taskPopupMilestone.end_date || taskPopupMilestone.endDate;
                    const dateLabel = (date) => date ? new Date(date).toLocaleDateString() : "—";

                    return (
                      <tr key={`${task?.id || task?._id || task?.title || "task"}-${index}`}>
                        <td>{index + 1}</td>
                        <td className="task-list-popup-task-name">{taskName}</td>
                        <td>{dateLabel(startDate)}</td>
                        <td>{dateLabel(endDate)}</td>
                        <td>
                          <span className={`task-list-popup-status ${taskStatus}`}>
                            {taskStatus.replaceAll("_", " ")}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="task-list-popup-empty">No tasks have been added to this milestone yet.</p>
          )}
          <div className="task-list-popup-actions">
            <SecondaryButton type="button" onClick={() => setTaskPopupMilestone(null)}>Close</SecondaryButton>
          </div>
        </Popup>

        <Popup
          open={Boolean(taskManagerMilestone)}
          onClose={() => {
            if (!savingManagedTasks) setTaskManagerMilestone(null);
          }}
          showCloseButton
          closeOnBackdrop={!savingManagedTasks}
          overlayClassName="task-milestone-popup-overlay"
          bodyClassName="task-list-popup-body"
          cardClassName="task-list-popup task-manage-popup"
        >
          <div className="task-manage-toolbar">
            <button
              type="button"
              className="task-manage-add-button"
              disabled={loadingManagedTasks || savingManagedTasks}
              onClick={() => setManagedTasks((current) => [...current, { title: "", status: "pending" }])}
            >
              <Icon name="Plus" size={14} /> Add Tasks
            </button>
          </div>
          {managedTasksFeedback && <p className="task-manage-feedback" role="alert">{managedTasksFeedback}</p>}
          {loadingManagedTasks ? (
            <p className="task-list-popup-empty" role="status">Loading milestone tasks…</p>
          ) : managedTasks.length ? (
            <div className="task-list-popup-table-wrap task-manage-table-wrap">
              <table className="task-list-popup-table task-manage-table">
                <thead>
                  <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">Tasks Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {managedTasks.map((task, index) => (
                    <tr key={task.id || task._id || `managed-task-${index}`}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          className="task-manage-name-input"
                          aria-label={`Task ${index + 1} name`}
                          value={task.title}
                          onChange={(event) => setManagedTasks((current) => current.map((item, taskIndex) =>
                            taskIndex === index ? { ...item, title: event.target.value } : item,
                          ))}
                          placeholder="Enter task name"
                        />
                      </td>
                      <td>
                        <div className="task-manage-status-options" role="radiogroup" aria-label={`Task ${index + 1} status`}>
                          {[
                            ["pending", "Pending"],
                            ["in_progress", "In progress"],
                            ["completed", "Completed"],
                          ].map(([value, label]) => (
                            <label key={value}>
                              <input
                                type="radio"
                                name={`task-status-${index}`}
                                value={value}
                                checked={task.status === value}
                                onChange={() => setManagedTasks((current) => current.map((item, taskIndex) =>
                                  taskIndex === index ? { ...item, status: value } : item,
                                ))}
                              />
                              {label}
                            </label>
                          ))}
                          <button
                            type="button"
                            className="task-manage-delete-button"
                            aria-label={`Delete task ${index + 1}`}
                            title="Delete task"
                            onClick={() => setManagedTasks((current) => current.filter((_, taskIndex) => taskIndex !== index))}
                          >
                            <Icon name="Trash" size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="task-list-popup-empty">No tasks yet. Use “Add Tasks” to add one.</p>
          )}
          <div className="task-list-popup-actions task-manage-actions">
            <SecondaryButton type="button" onClick={() => setTaskManagerMilestone(null)} disabled={savingManagedTasks}>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              type="button"
              onClick={handleSaveManagedTasks}
              disabled={loadingManagedTasks || savingManagedTasks}
            >
              {savingManagedTasks ? "Saving…" : "Save"}
            </PrimaryButton>
          </div>
        </Popup>

        <Popup
          open={showRoadmapConfirmation}
          onClose={() => {
            if (!submittingRoadmap) setShowRoadmapConfirmation(false);
          }}
          title={(
            <span className="task-roadmap-confirm-title">
              <Icon name="ArrowRight" size={17} />
              Send Milestones for Approval
            </span>
          )}
          subtitle={`You are about to send ${selectedDraftMilestones.length} selected draft milestone${selectedDraftMilestones.length === 1 ? "" : "s"}${selectedQuest?.title ? ` from ${selectedQuest.title}` : ""} to the client for approval. Continue?`}
          showCloseButton={false}
          closeOnBackdrop={!submittingRoadmap}
          closeOnEsc={!submittingRoadmap}
          overlayClassName="task-milestone-popup-overlay"
          cardClassName="task-roadmap-confirm-popup"
          headerClassName="task-roadmap-confirm-header"
          titleClassName="task-roadmap-confirm-heading"
          subtitleClassName="task-roadmap-confirm-copy"
        >
          <div className="task-roadmap-confirm-actions">
            <SecondaryButton
              type="button"
              onClick={() => setShowRoadmapConfirmation(false)}
              disabled={submittingRoadmap}
            >
              <Icon name="X" size={14} /> Cancel
            </SecondaryButton>
            <PrimaryButton
              type="button"
              onClick={handleRequestMilestoneApproval}
              disabled={!selectedDraftMilestones.length || submittingRoadmap}
            >
              <Icon name="ArrowRight" size={15} />
              {submittingRoadmap ? "Sending..." : "Confirm & Send"}
            </PrimaryButton>
          </div>
        </Popup>

        <Popup
          open={Boolean(milestonePendingDeletion)}
          onClose={() => {
            if (!deletingMilestone) {
              setMilestonePendingDeletion(null);
              setMilestoneDeleteFeedback("");
            }
          }}
          showCloseButton={false}
          closeOnBackdrop={!deletingMilestone}
          overlayClassName="task-milestone-popup-overlay"
          cardClassName="task-milestone-delete-confirm-popup"
        >
          <span className="task-milestone-delete-confirm-icon">
            <Icon name="Trash" size={34} />
          </span>
          <p className="task-milestone-delete-confirm-copy">
            Are you sure you want to delete this Milestone?
          </p>
          {milestoneDeleteFeedback && (
            <p className="task-milestone-delete-confirm-error" role="alert">
              {milestoneDeleteFeedback}
            </p>
          )}
          <div className="task-milestone-delete-confirm-actions">
            <SecondaryButton
              type="button"
              onClick={() => {
                setMilestonePendingDeletion(null);
                setMilestoneDeleteFeedback("");
              }}
              disabled={deletingMilestone}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              type="button"
              onClick={handleConfirmDeleteMilestone}
              disabled={deletingMilestone}
            >
              {deletingMilestone ? "Deleting..." : "Delete"}
            </PrimaryButton>
          </div>
        </Popup>

        <Popup
          open={milestoneCreatedSuccessfully}
          onClose={() => setMilestoneCreatedSuccessfully(false)}
          showCloseButton={false}
          overlayClassName="task-milestone-popup-overlay"
          cardClassName="task-milestone-success-popup"
        >
          <span className="task-milestone-success-icon"><Icon name="Check" size={30} /></span>
          <p>{milestoneSuccessMessage}</p>
        </Popup>

        {/* Submit Deliverable Modal */}
        {selectedMilestone && (
          <div className="proposal-modal-overlay" onClick={() => setSelectedMilestone(null)}>
            <div className="proposal-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="proposal-modal-close"
                onClick={() => setSelectedMilestone(null)}
              >
                ✕
              </button>

              <h2 className="fs-4 fw-bold mb-1">Submit Deliverable</h2>
              <p className="text-secondary fs-6 mb-4">{selectedMilestone.title}</p>

              {feedback.text && (
                <div
                  className={`alert ${feedback.type === "success" ? "alert-success" : "alert-danger"} py-2 px-3 mb-3`}
                >
                  {feedback.text}
                </div>
              )}

              <form onSubmit={handleSubmitDeliverable}>
                <div className="proposal-form-group">
                  <label className="proposal-label">Deliverable URL (GitHub / Demo / Drive)</label>
                  <input
                    type="url"
                    className="proposal-input"
                    placeholder="https://github.com/org/repo or preview link"
                    value={workLink}
                    onChange={(e) => setWorkLink(e.target.value)}
                  />
                </div>

                <div className="proposal-form-group">
                  <label className="proposal-label">Work Summary / Release Notes</label>
                  <textarea
                    className="proposal-textarea"
                    placeholder="Summarize the work completed, changes made, and any review instructions..."
                    value={workNotes}
                    onChange={(e) => setWorkNotes(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setSelectedMilestone(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#103ca4", borderColor: "#103ca4" }}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting Work..." : "Submit to Client"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {uploadPage}
    </DashboardLayout>
  );
}
