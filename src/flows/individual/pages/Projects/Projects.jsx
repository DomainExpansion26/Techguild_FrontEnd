import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DashboardLayout } from "@/Components";
import { projectsApi } from "@/features/projects/api/projectsApi";
import { applicationsApi } from "@/features/applications/api/applicationsApi";
import { showSnackbar } from "@/store";
import "./projects.css";

export default function Projects() {
  const dispatch = useDispatch();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedExp, setSelectedExp] = useState("all");
  
  // Modal states
  const [selectedProject, setSelectedProject] = useState(null);
  const [proposalText, setProposalText] = useState("");
  const [proposedRate, setProposedRate] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("14");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectsApi.getProjects();
      const list = response?.data?.projects || response?.data || response?.projects || [];
      setProjects(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Error fetching projects from API:", err);
      setError(err?.message || "Failed to load projects from server.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = (project, e) => {
    e.stopPropagation();
    setSelectedProject(project);
    setProposalText("");
    const defaultRate = project.max_budget || project.min_budget || project.budget || "";
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
      await applicationsApi.applyToProject(selectedProject.id || selectedProject._id, {
        cover_letter: proposalText.trim(),
        proposed_rate: Number(proposedRate) || 0,
        delivery_days: Number(deliveryDays) || 14,
      });

      dispatch(showSnackbar({ message: "Proposal submitted successfully to the client!", type: "success" }));
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
      (item.experience_level && item.experience_level.toLowerCase() === selectedExp.toLowerCase());

    return matchesSearch && matchesCategory && matchesExp;
  });

  return (
    <DashboardLayout>
      <div className="quest-board-page">
        <header className="quest-board-header">
          <div>
            <h1 className="quest-board-title">Quest Board</h1>
            <p className="quest-board-subtitle">
              Browse live available projects and contracts directly from clients.
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
              <span className="visually-hidden">Loading projects...</span>
            </div>
            <p className="text-secondary mt-2">Loading live projects from backend...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-3 border p-5 shadow-sm">
            <div className="mb-3 fs-1">🛡️</div>
            <h4 className="fw-bold mb-2">No Projects Found</h4>
            <p className="text-secondary mb-0">
              {searchTerm || selectedCategory !== "all"
                ? "No live projects match your current filters. Try adjusting your search query."
                : "There are currently no open project quests available. Check back shortly as clients post new work."}
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
              
              const minB = project.min_budget || project.budget;
              const maxB = project.max_budget || project.budget;
              const budgetText = minB && maxB && minB !== maxB ? `$${minB} - $${maxB}` : minB ? `$${minB}` : "Negotiable";

              return (
                <div
                  key={projectId}
                  className="quest-card"
                  onClick={() => setSelectedProject(project)}
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
                          {project.duration && ` • ${project.duration}`}
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
                    {project.experience_level && <span className="badge bg-light text-secondary border text-capitalize">{project.experience_level}</span>}
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
                      onClick={(e) => handleApplyClick(project, e)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })}
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
                    <label className="proposal-label">Proposed Bid / Rate ($ USD) *</label>
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
