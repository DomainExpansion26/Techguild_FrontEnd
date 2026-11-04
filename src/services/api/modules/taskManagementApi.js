import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const taskManagementApi = {
  // Quest marketplace and applications
  listQuests: (params = {}) =>
    apiClient.get(ENDPOINTS.QUESTS.BASE, { params }),
  createQuestDraft: (data) =>
    apiClient.post(ENDPOINTS.QUESTS.BASE, data),
  getMyWork: (params = {}) =>
    apiClient.get(ENDPOINTS.QUESTS.MY_WORK, { params }),
  getQuest: (questId) =>
    apiClient.get(ENDPOINTS.QUESTS.DETAIL(questId)),
  acceptQuest: (questId, data = {}) =>
    apiClient.post(ENDPOINTS.QUESTS.ACCEPT(questId), data),
  getQuestApplications: (questId, params = {}) =>
    apiClient.get(ENDPOINTS.QUESTS.APPLICATIONS(questId), { params }),
  acceptQuestApplication: (questId, applicationId) =>
    apiClient.post(ENDPOINTS.QUESTS.ACCEPT_APPLICATION(questId, applicationId)),
  rejectQuestApplication: (questId, applicationId, data = {}) =>
    apiClient.post(ENDPOINTS.QUESTS.REJECT_APPLICATION(questId, applicationId), data),
  withdrawQuestApplication: (questId, applicationId) =>
    apiClient.post(ENDPOINTS.QUESTS.WITHDRAW_APPLICATION(questId, applicationId)),
  applyToQuest: (questId, data) =>
    apiClient.post(ENDPOINTS.QUESTS.APPLY(questId), data),
  publishQuest: (questId, data = {}) =>
    apiClient.post(ENDPOINTS.QUESTS.PUBLISH(questId), data),
  rejectQuest: (questId, data = {}) =>
    apiClient.post(ENDPOINTS.QUESTS.REJECT(questId), data),

  // Quest milestone lifecycle, escrow, and revisions
  getQuestMilestones: (questId) =>
    apiClient.get(ENDPOINTS.QUESTS.MILESTONES(questId)),
  createQuestMilestone: (questId, data) =>
    apiClient.post(ENDPOINTS.QUESTS.MILESTONES(questId), data),
  approveQuestRoadmap: (questId, data = {}) =>
    apiClient.post(ENDPOINTS.QUESTS.APPROVE_ROADMAP(questId), data),
  submitQuestRoadmap: (questId, data = {}) =>
    apiClient.post(ENDPOINTS.QUESTS.SUBMIT_ROADMAP(questId), data),
  deleteQuestMilestone: (questId, milestoneId) =>
    apiClient.delete(ENDPOINTS.QUESTS.MILESTONE(questId, milestoneId)),
  getQuestMilestone: (questId, milestoneId) =>
    apiClient.get(ENDPOINTS.QUESTS.MILESTONE(questId, milestoneId)),
  updateQuestMilestone: (questId, milestoneId, data) =>
    apiClient.patch(ENDPOINTS.QUESTS.MILESTONE(questId, milestoneId), data),
  approveQuestMilestone: (questId, milestoneId, data = {}) =>
    apiClient.post(ENDPOINTS.QUESTS.APPROVE_MILESTONE(questId, milestoneId), data),
  fundQuestMilestone: (questId, milestoneId, data) =>
    apiClient.post(ENDPOINTS.QUESTS.FUND_MILESTONE(questId, milestoneId), data),
  confirmQuestMilestoneFunding: (questId, milestoneId, data) =>
    apiClient.post(ENDPOINTS.QUESTS.CONFIRM_MILESTONE_FUNDING(questId, milestoneId), data),
  getQuestMilestonePayment: (questId, milestoneId) =>
    apiClient.get(ENDPOINTS.QUESTS.MILESTONE_PAYMENT(questId, milestoneId)),
  getQuestMilestoneRefund: (questId, milestoneId) =>
    apiClient.get(ENDPOINTS.QUESTS.MILESTONE_REFUND(questId, milestoneId)),
  requestQuestMilestoneRefund: (questId, milestoneId, data) =>
    apiClient.post(ENDPOINTS.QUESTS.MILESTONE_REFUND(questId, milestoneId), data),
  releaseQuestMilestone: (questId, milestoneId, data) =>
    apiClient.post(ENDPOINTS.QUESTS.RELEASE_MILESTONE(questId, milestoneId), data),
  requestQuestMilestoneRevision: (questId, milestoneId, data) =>
    apiClient.post(ENDPOINTS.QUESTS.REQUEST_MILESTONE_REVISION(questId, milestoneId), data),
  resubmitQuestMilestone: (questId, milestoneId, data = {}) =>
    apiClient.post(ENDPOINTS.QUESTS.RESUBMIT_MILESTONE(questId, milestoneId), data),
  getQuestMilestoneRevisions: (questId, milestoneId) =>
    apiClient.get(ENDPOINTS.QUESTS.MILESTONE_REVISIONS(questId, milestoneId)),
  sendQuestMilestoneForReview: (questId, milestoneId, data = {}) =>
    apiClient.post(ENDPOINTS.QUESTS.SEND_MILESTONE_FOR_REVIEW(questId, milestoneId), data),
  submitQuestMilestoneForRelease: (questId, milestoneId, data = {}) =>
    apiClient.post(ENDPOINTS.QUESTS.SUBMIT_MILESTONE_FOR_RELEASE(questId, milestoneId), data),

  // Client task-management dashboard and tasks
  getClientTaskManagementMetrics: (params = {}) =>
    apiClient.get(ENDPOINTS.CLIENT_TASK_MANAGEMENT.METRICS, { params }),
  getClientActiveQuests: () =>
    apiClient.get(ENDPOINTS.CLIENT_TASK_MANAGEMENT.ACTIVE_QUESTS),
  getClientQuestActivities: (questId, params = {}) =>
    apiClient.get(ENDPOINTS.CLIENT_TASK_MANAGEMENT.QUEST_ACTIVITIES(questId), { params }),
  approveClientQuest: (questId, data) =>
    apiClient.post(ENDPOINTS.CLIENT_TASK_MANAGEMENT.APPROVE_QUEST(questId), data),
  cancelClientQuestApproval: (questId, data) =>
    apiClient.post(ENDPOINTS.CLIENT_TASK_MANAGEMENT.CANCEL_QUEST_APPROVAL(questId), data),
  getClientQuestDashboard: (questId) =>
    apiClient.get(ENDPOINTS.CLIENT_TASK_MANAGEMENT.QUEST_DASHBOARD(questId)),
  getClientQuestMilestones: (questId) =>
    apiClient.get(ENDPOINTS.CLIENT_TASK_MANAGEMENT.QUEST_MILESTONES(questId)),
  addClientQuestMilestone: (questId, data) =>
    apiClient.post(ENDPOINTS.CLIENT_TASK_MANAGEMENT.QUEST_MILESTONES(questId), data),
  deleteClientMilestone: (milestoneId) =>
    apiClient.delete(ENDPOINTS.CLIENT_TASK_MANAGEMENT.MILESTONE(milestoneId)),
  approveClientMilestone: (milestoneId, data = {}) =>
    apiClient.post(ENDPOINTS.CLIENT_TASK_MANAGEMENT.APPROVE_MILESTONE(milestoneId), data),
  cancelClientMilestoneApproval: (milestoneId, data) =>
    apiClient.post(ENDPOINTS.CLIENT_TASK_MANAGEMENT.CANCEL_MILESTONE_APPROVAL(milestoneId), data),
  getClientMilestoneTasks: (milestoneId) =>
    apiClient.get(ENDPOINTS.CLIENT_TASK_MANAGEMENT.MILESTONE_TASKS(milestoneId)),
  createClientMilestoneTask: (milestoneId, data) =>
    apiClient.post(ENDPOINTS.CLIENT_TASK_MANAGEMENT.MILESTONE_TASKS(milestoneId), data),
  updateClientTaskStatus: (taskId, data) =>
    apiClient.patch(ENDPOINTS.CLIENT_TASK_MANAGEMENT.TASK_STATUS(taskId), data),
};

export default taskManagementApi;
