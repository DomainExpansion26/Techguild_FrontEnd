import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DashboardLayout } from "@/Components";
import { projectsApi } from "@/features/projects/api/projectsApi";
import { showSnackbar } from "@/store";

export default function QuestBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Post Quest Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Full Stack");
  const [budgetType, setBudgetType] = useState("fixed");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("intermediate");
  const [projectType, setProjectType] = useState("remote");
  const [duration, setDuration] = useState("1-3 months");
  const [skills, setSkills] = useState("");
  const [deadline, setDeadline] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const fetchMyProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await projectsApi.getMyProjects();
      const list = res?.data?.projects || res?.data || res?.projects || [];
      setProjects(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Error fetching client projects:", err);
      setError(err?.message || "Failed to load your posted quests.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuest = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      dispatch(showSnackbar({ message: "Quest title and scope description are required.", type: "warning" }));
      return;
    }

    const minB = Number(minBudget) || 100;
    const maxB = Number(maxBudget) || minB || 1000;

    setCreating(true);

    try {
      await projectsApi.createProject({
        title: title.trim(),
        description: description.trim(),
        category,
        budget_type: budgetType,
        min_budget: minB,
        max_budget: maxB,
        currency: "USD",
        experience_level: experienceLevel,
        project_type: projectType,
        duration,
        required_skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        visibility: "public",
        application_deadline: deadline ? new Date(deadline).toISOString() : undefined,
      });

      dispatch(showSnackbar({ message: "Quest created and published to Quest Board successfully!", type: "success" }));
      setShowCreateModal(false);
      setTitle("");
      setDescription("");
      setMinBudget("");
      setMaxBudget("");
      setSkills("");
      setDeadline("");
      fetchMyProjects();
    } catch (err) {
      console.error("Failed to create project:", err);
      const errMsg = err?.response?.data?.message || err?.message || "Failed to create quest. Please check inputs.";
      dispatch(showSnackbar({ message: errMsg, type: "error" }));
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteQuest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quest?")) return;
    try {
      await projectsApi.deleteProject(id);
      setProjects((prev) => prev.filter((p) => (p.id || p._id) !== id));
      dispatch(showSnackbar({ message: "Quest deleted successfully.", type: "info" }));
    } catch (err) {
      console.error("Failed to delete project:", err);
      dispatch(showSnackbar({ message: err?.message || "Failed to delete quest.", type: "error" }));
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: "32px 40px", maxWidth: "1380px", margin: "0 auto" }}>
        <header className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
          <div>
            <h1 className="fs-3 fw-bold mb-1">Manage Quests &amp; Projects</h1>
            <p className="text-secondary mb-0">Post requirements, track incoming proposals from freelancers &amp; agencies.</p>
          </div>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary px-3 py-2 fw-semibold"
              onClick={fetchMyProjects}
              disabled={loading}
            >
              🔄 Refresh
            </button>
            <button
              type="button"
              className="btn btn-primary px-4 py-2 fw-semibold"
              style={{ backgroundColor: "#103ca4", borderColor: "#103ca4" }}
              onClick={() => setShowCreateModal(true)}
            >
              + Post a New Quest
            </button>
          </div>
        </header>

        {error && <div className="alert alert-danger mb-4">{error}</div>}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-secondary mt-2">Loading your live posted quests from backend...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-3 border p-5 shadow-sm">
            <div className="mb-3 fs-1">📋</div>
            <h4 className="fw-bold mb-2">No Quests Posted Yet</h4>
            <p className="text-secondary mb-4" style={{ maxWidth: "480px", margin: "0 auto" }}>
              You have not posted any project quests yet. Create your first quest to begin receiving applications from top-tier talent.
            </p>
            <button
              type="button"
              className="btn btn-primary px-4 py-2 fw-semibold"
              style={{ backgroundColor: "#103ca4", borderColor: "#103ca4" }}
              onClick={() => setShowCreateModal(true)}
            >
              Post Your First Quest
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {projects.map((project) => {
              const projectId = project.id || project._id;
              const skillsList = Array.isArray(project.required_skills)
                ? project.required_skills
                : Array.isArray(project.skills)
                ? project.skills
                : [];
              const proposalsCount = project.applications_count || project.proposals_count || 0;
              const minB = project.min_budget || project.budget;
              const maxB = project.max_budget || project.budget;
              const budgetDisplay = minB === maxB ? `$${minB || 0}` : `$${minB || 0} - $${maxB || 0}`;

              return (
                <div key={projectId} className="col-12">
                  <div className="card p-4 border rounded-3 shadow-sm bg-white">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2 mb-2">
                      <div>
                        <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                          <h3 className="fs-5 fw-bold mb-0">{project.title}</h3>
                          <span className="badge bg-primary-subtle text-primary border border-primary-subtle">{project.category || "General"}</span>
                          <span className="badge bg-light text-dark border text-capitalize">{project.project_type || "Remote"}</span>
                          <span className="badge bg-light text-dark border text-capitalize">{project.experience_level || "Intermediate"}</span>
                        </div>
                        <span className="text-muted fs-7">
                          Posted: {project.created_at ? new Date(project.created_at).toLocaleDateString() : "Recently"}
                          {project.duration && ` • Duration: ${project.duration}`}
                        </span>
                      </div>
                      <span className="badge bg-success-subtle text-success fs-6 px-3 py-2 border border-success-subtle">
                        {budgetDisplay} ({project.budget_type || "fixed"})
                      </span>
                    </div>

                    <p className="text-muted mt-2 mb-3" style={{ whiteSpace: "pre-line" }}>{project.description}</p>

                    {skillsList.length > 0 && (
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {skillsList.map((skill, idx) => (
                          <span key={idx} className="badge bg-light text-dark border">
                            {typeof skill === "object" ? skill.name : skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto flex-wrap gap-2">
                      <span className="text-secondary fw-semibold fs-6">
                        📬 {proposalsCount} Proposal{proposalsCount !== 1 ? "s" : ""} Received
                      </span>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => navigate("/client-applications")}
                        >
                          View Applications
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteQuest(projectId)}
                        >
                          Delete Quest
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Create Quest Modal */}
        {showCreateModal && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content p-3 shadow-lg border-0">
                <div className="modal-header border-0 pb-0">
                  <div>
                    <h5 className="modal-title fw-bold">Post a New Quest</h5>
                    <p className="text-secondary fs-7 mb-0">Define your project requirements and budget to receive candidate proposals.</p>
                  </div>
                  <button type="button" className="btn-close" onClick={() => setShowCreateModal(false)}></button>
                </div>
                <form onSubmit={handleCreateQuest}>
                  <div className="modal-body py-3">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Quest Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Build an AI-powered SaaS dashboard in React & Node"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Category</label>
                        <select
                          className="form-select"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="Full Stack">Full Stack Development</option>
                          <option value="Frontend">Frontend Development</option>
                          <option value="Backend">Backend &amp; APIs</option>
                          <option value="Mobile">Mobile App Development</option>
                          <option value="AI & ML">AI &amp; Machine Learning</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="DevOps">DevOps &amp; Cloud</option>
                          <option value="Blockchain">Web3 / Blockchain</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Budget Type</label>
                        <select
                          className="form-select"
                          value={budgetType}
                          onChange={(e) => setBudgetType(e.target.value)}
                        >
                          <option value="fixed">Fixed Price ($)</option>
                          <option value="hourly">Hourly Rate ($/hr)</option>
                        </select>
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Min Budget ($ USD) *</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="e.g. 1000"
                          value={minBudget}
                          onChange={(e) => setMinBudget(e.target.value)}
                          required
                          min="1"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Max Budget ($ USD)</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="e.g. 3000"
                          value={maxBudget}
                          onChange={(e) => setMaxBudget(e.target.value)}
                          min="1"
                        />
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Experience Level</label>
                        <select
                          className="form-select"
                          value={experienceLevel}
                          onChange={(e) => setExperienceLevel(e.target.value)}
                        >
                          <option value="entry">Entry Level</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="expert">Expert</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Location / Type</label>
                        <select
                          className="form-select"
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                        >
                          <option value="remote">Remote</option>
                          <option value="hybrid">Hybrid</option>
                          <option value="onsite">On-Site</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Duration</label>
                        <select
                          className="form-select"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        >
                          <option value="less_than_1_month">Less than 1 month</option>
                          <option value="1-3 months">1 to 3 months</option>
                          <option value="3-6 months">3 to 6 months</option>
                          <option value="more_than_6_months">More than 6 months</option>
                        </select>
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-8">
                        <label className="form-label fw-semibold">Required Skills (Comma separated)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="React, TypeScript, Node.js, PostgreSQL"
                          value={skills}
                          onChange={(e) => setSkills(e.target.value)}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Application Deadline</label>
                        <input
                          type="date"
                          className="form-control"
                          value={deadline}
                          onChange={(e) => setDeadline(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Detailed Description &amp; Scope *</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="Detail the deliverables, technical requirements, milestones, and goals..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="modal-footer border-0 pt-0">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowCreateModal(false)}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-4 fw-semibold"
                      style={{ backgroundColor: "#103ca4", borderColor: "#103ca4" }}
                      disabled={creating}
                    >
                      {creating ? "Publishing Quest..." : "Publish Quest"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
