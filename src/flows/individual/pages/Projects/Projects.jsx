import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/Components";
import { taskManagementApi } from "@/services/api";
import { showSnackbar } from "@/store";
import "./projects.css";

function formatQuestBudget(quest) {
  if (quest.budget_inr != null) {
    return `₹${Number(quest.budget_inr).toLocaleString("en-IN")}`;
  }

  const minBudget = quest.min_budget ?? quest.budget;
  const maxBudget = quest.max_budget ?? quest.budget;
  if (minBudget != null && maxBudget != null && minBudget !== maxBudget) {
    return `$${minBudget} - $${maxBudget}`;
  }
  return minBudget != null ? `$${minBudget}` : "Negotiable";
}

export default function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questId } = useParams();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [error, setError] = useState(null);
  const [previewProject, setPreviewProject] = useState(null);
  const [previewError, setPreviewError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedExp, setSelectedExp] = useState("all");
  
  // Modal states
  const [selectedProject, setSelectedProject] = useState(null);
  const [proposalText, setProposalText] = useState("");
  const [proposedRate, setProposedRate] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("14");
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = useCallback(async (cursor = null, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskManagementApi.listQuests(cursor ? { cursor } : {});
      if (!Array.isArray(response?.quests)) {
        throw new Error("The quests API returned an invalid response.");
      }

      setProjects((current) => {
        if (!append) return response.quests;
        const existingIds = new Set(current.map((quest) => String(quest.id)));
        return [
          ...current,
          ...response.quests.filter((quest) => !existingIds.has(String(quest.id))),
        ];
      });
      setHasMore(Boolean(response.has_more && response.next_cursor));
      setNextCursor(response.next_cursor || null);
    } catch (err) {
      console.error("Error fetching quests from API:", err);
      setError(err?.message || "Failed to load quests from server.");
      if (!append) {
        setProjects([]);
        setHasMore(false);
        setNextCursor(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (!questId) {
      setPreviewProject(null);
      setPreviewError(null);
      return undefined;
    }

    const listedProject = projects.find(
      (project) => String(project.id || project._id) === questId
    );
    if (listedProject) {
      setPreviewProject(listedProject);
      setPreviewError(null);
      return undefined;
    }

    if (loading) return undefined;

    let active = true;
    setPreviewProject(null);
    setPreviewError(null);

    taskManagementApi.getQuest(questId)
      .then((response) => {
        if (!active) return;
        const project = response?.quest || response;
        if (project && typeof project === "object") {
          setPreviewProject(project);
        } else {
          setPreviewError("This quest could not be found.");
        }
      })
      .catch((err) => {
        if (!active) return;
        console.error("Error fetching quest details:", err);
        setPreviewError(err?.response?.data?.message || err?.message || "Failed to load this quest.");
      });

    return () => {
      active = false;
    };
  }, [questId, projects, loading]);

  const openQuestPreview = (project) => {
    const projectId = project.id || project._id;
    if (projectId) navigate(`/quest-board/${projectId}`);
  };

  const closeQuestPreview = () => navigate("/quest-board");

  const handleApplyClick = (project, e) => {
    e?.stopPropagation();
    setSelectedProject(project);
    setProposalText("");
    const defaultRate = project.budget_inr || project.max_budget || project.min_budget || project.budget || "";
    setProposedRate(defaultRate ? `${defaultRate}` : "");
  };

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    if (!proposalText.trim()) {
      dispatch(showSnackbar({ message: "Please provide a brief cover letter or pitch.", type: "warning" }));
      return;
    }

    setSubmitting(true);

    try {
      await taskManagementApi.applyToQuest(selectedProject.id || selectedProject._id, {
        cover_letter: proposalText.trim(),
        proposed_rate: Number(proposedRate) || 0,
        delivery_days: Number(deliveryDays) || 14,
      });

      dispatch(showSnackbar({ message: "Application submitted successfully to the client!", type: "success" }));
      setSelectedProject(null);
      fetchProjects();
    } catch (err) {
      console.error("Failed to submit proposal:", err);
      const errMsg = err?.response?.data?.message || err?.message || "Failed to submit proposal. Please try again.";
      dispatch(showSnackbar({ message: errMsg, type: "error" }));
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProjects = projects.filter((item) => {
    const title = item.title || "";
    const description = item.description || "";
    const skills = Array.isArray(item.required_skills)
      ? item.required_skills
      : Array.isArray(item.skills)
      ? item.skills
      : [];

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skills.some((s) => typeof s === "string" && s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory =
      selectedCategory === "all" ||
      (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase());

    const matchesExp =
      selectedExp === "all" ||
      ((item.complexity || item.experience_level) &&
        (item.complexity || item.experience_level).toLowerCase() === selectedExp.toLowerCase());

    return matchesSearch && matchesCategory && matchesExp;
  });

  return (
    <DashboardLayout>
      <div className="quest-board-page">
        <header className="quest-board-header">
          <div>
            <h1 className="quest-board-title">Quest Board</h1>
            <p className="quest-board-subtitle">
              Browse live quests and opportunities posted by clients.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm px-3 py-2 fw-semibold"
            onClick={fetchProjects}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "🔄 Refresh Quests"}
          </button>
        </header>

        {/* Filter & Search Bar */}
        <div className="quest-filter-bar">
          <div className="quest-search-input-wrapper">
            <span className="quest-search-icon">🔍</span>
            <input
              type="text"
              className="quest-search-input"
              placeholder="Search live quests by title, description, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="quest-select-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Mobile">Mobile Dev</option>
            <option value="AI & ML">AI &amp; Machine Learning</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="DevOps">DevOps</option>
            <option value="Blockchain">Blockchain</option>
          </select>

          <select
            className="quest-select-filter"
            value={selectedExp}
            onChange={(e) => setSelectedExp(e.target.value)}
          >
            <option value="all">All Experience Levels</option>
            <option value="entry">Entry Level</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}

        {/* Project Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading quests...</span>
            </div>
            <p className="text-secondary mt-2">Loading live quests from backend...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-3 border p-5 shadow-sm">
            <div className="mb-3 fs-1">🛡️</div>
            <h4 className="fw-bold mb-2">No Quests Found</h4>
            <p className="text-secondary mb-0">
              {searchTerm || selectedCategory !== "all"
                ? "No live projects match your current filters. Try adjusting your search query."
                : "There are currently no open quests available. Check back shortly as clients post new work."}
            </p>
          </div>
        ) : (
          <div className="quest-grid">
            {filteredProjects.map((project) => {
              const projectId = project.id || project._id;
              const skillsList = Array.isArray(project.required_skills)
                ? project.required_skills
                : Array.isArray(project.skills)
                ? project.skills
                : [];
              const clientName = project.client?.company_name || project.client?.name || project.client_name || "Client";
              const initials = clientName.substring(0, 2).toUpperCase();
              
              const budgetText = formatQuestBudget(project);
              const complexity = project.complexity || project.experience_level;

              return (
                <div
                  key={projectId}
                  className="quest-card"
                  onClick={() => openQuestPreview(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openQuestPreview(project);
                    }
                  }}
                >
                  <div className="quest-card-header">
                    <div className="quest-client-info">
                      <div className="quest-client-avatar">
                        {initials}
                      </div>
                      <div>
                        <div className="quest-client-name">
                          <span>{clientName}</span>
                          {project.client?.is_verified && <span title="Verified Client">🛡️</span>}
                        </div>
                        <span className="quest-posted-time">
                          {project.created_at ? new Date(project.created_at).toLocaleDateString() : "Active"}
                          {(project.timeline_days || project.duration) &&
                            ` • ${project.timeline_days ? `${project.timeline_days} days` : project.duration}`}
                        </span>
                      </div>
                    </div>
                    <span className="quest-budget-badge">
                      {budgetText}
                    </span>
                  </div>

                  <h3 className="quest-title">{project.title}</h3>
                  <p className="quest-description">{project.description}</p>

                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {project.category && <span className="badge bg-light text-secondary border">{project.category}</span>}
                    {project.project_type && <span className="badge bg-light text-secondary border text-capitalize">{project.project_type}</span>}
                    {complexity && <span className="badge bg-light text-secondary border text-capitalize">{complexity}</span>}
                    {project.required_min_rank && <span className="badge bg-light text-secondary border">Rank {project.required_min_rank}+</span>}
                  </div>

                  {skillsList.length > 0 && (
                    <div className="quest-skills-list">
                      {skillsList.map((skill, idx) => (
                        <span key={idx} className="quest-skill-tag">
                          {typeof skill === "object" ? skill.name : skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="quest-card-footer">
                    <span className="quest-proposals-count">
                      {project.applications_count || project.proposals_count || 0} proposals received
                    </span>
                    <button
                      type="button"
                      className="quest-apply-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyClick(project);
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && hasMore && (
          <div className="text-center mt-4">
            <button
              type="button"
              className="btn btn-outline-primary px-4"
              onClick={() => fetchProjects(nextCursor, true)}
              disabled={loading}
            >
              Load More Quests
            </button>
          </div>
        )}

        {questId && (
          <div className="quest-preview-overlay" onClick={closeQuestPreview}>
            <section
              className="quest-preview-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="quest-preview-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="proposal-modal-close"
                onClick={closeQuestPreview}
                aria-label="Close quest preview"
              >
                ✕
              </button>
              {previewProject ? (
                <>
                  <div className="quest-preview-heading">
                    <div>
                      <p className="quest-preview-eyebrow">Quest Preview</p>
                      <h2 id="quest-preview-title">{previewProject.title || "Quest details"}</h2>
                    </div>
                    <span className="quest-budget-badge">
                      {formatQuestBudget(previewProject)}
                    </span>
                  </div>
                  <p className="quest-preview-client">
                    Posted by {previewProject.client?.company_name || previewProject.client?.name || previewProject.client_name || "Client"}
                    {previewProject.created_at && ` · ${new Date(previewProject.created_at).toLocaleDateString()}`}
                  </p>
                  <div className="quest-preview-tags">
                    {[previewProject.category, previewProject.complexity || previewProject.experience_level, previewProject.status]
                      .filter(Boolean)
                      .map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className="quest-preview-section">
                    <h3>About this quest</h3>
                    <p>{previewProject.description || "No description provided."}</p>
                  </div>
                  {(() => {
                    const skills = Array.isArray(previewProject.required_skills)
                      ? previewProject.required_skills
                      : Array.isArray(previewProject.skills)
                        ? previewProject.skills
                        : [];
                    return skills.length > 0 && (
                      <div className="quest-preview-section">
                        <h3>Skills required</h3>
                        <div className="quest-skills-list">
                          {skills.map((skill, index) => (
                            <span key={skill?.id || skill?._id || skill?.name || skill || index} className="quest-skill-tag">
                              {typeof skill === "object" ? skill.name : skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                  <div className="quest-preview-facts">
                    <div><span>Duration</span><strong>{previewProject.timeline_days ? `${previewProject.timeline_days} days` : previewProject.duration || "Not specified"}</strong></div>
                    <div><span>Milestones</span><strong>{previewProject.milestone_count ?? "Not specified"}</strong></div>
                    <div><span>Applications</span><strong>{previewProject.applications_count || previewProject.proposals_count || 0}</strong></div>
                    <div><span>Deadline</span><strong>{previewProject.application_deadline ? new Date(previewProject.application_deadline).toLocaleDateString() : "Not specified"}</strong></div>
                  </div>
                  <div className="quest-preview-actions">
                    <button type="button" className="btn btn-outline-secondary" onClick={closeQuestPreview}>Back to quests</button>
                    <button type="button" className="quest-apply-btn" onClick={() => handleApplyClick(previewProject)}>
                      Apply Now
                    </button>
                  </div>
                </>
              ) : (
                <div className="quest-preview-loading" role="status">
                  {previewError || "Loading quest preview..."}
                </div>
              )}
            </section>
          </div>
        )}

        {/* Apply / Proposal Submission Modal */}
        {selectedProject && (
          <div className="proposal-modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="proposal-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="proposal-modal-close"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>

              <h2 className="fs-4 fw-bold mb-1">Submit Proposal</h2>
              <p className="text-secondary fs-6 mb-4">{selectedProject.title}</p>

              <form onSubmit={handleSubmitProposal}>
                <div className="proposal-form-group">
                  <label className="proposal-label">Cover Letter &amp; Approach Pitch *</label>
                  <textarea
                    className="proposal-textarea"
                    placeholder="Explain your technical qualifications, previous work relevant to this quest, and milestone delivery plan..."
                    value={proposalText}
                    onChange={(e) => setProposalText(e.target.value)}
                    required
                    rows={5}
                  />
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="proposal-label">Proposed Bid / Rate (₹ INR) *</label>
                    <input
                      type="number"
                      className="proposal-input"
                      value={proposedRate}
                      onChange={(e) => setProposedRate(e.target.value)}
                      placeholder="e.g. 1500"
                      required
                      min="1"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="proposal-label">Estimated Delivery Days *</label>
                    <input
                      type="number"
                      className="proposal-input"
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setSelectedProject(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4 fw-semibold"
                    style={{ backgroundColor: "#103ca4", borderColor: "#103ca4" }}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Send Proposal"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
