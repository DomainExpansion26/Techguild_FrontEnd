import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/Components";
import { projectsApi } from "@/features/projects/api/projectsApi";
import { applicationsApi } from "@/features/applications/api/applicationsApi";

export default function Applications() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClientProjects();
  }, []);

  const fetchClientProjects = async () => {
    setLoading(true);
    try {
      const res = await projectsApi.getMyProjects();
      const list = res?.data?.projects || res?.data || res?.projects || [];
      const arr = Array.isArray(list) ? list : [];
      setProjects(arr);
      if (arr.length > 0) {
        const firstId = arr[0].id || arr[0]._id;
        setSelectedProjectId(firstId);
        fetchProjectApplications(firstId);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to load client projects:", err);
      setError(err?.message || "Failed to load projects.");
      setLoading(false);
    }
  };

  const fetchProjectApplications = async (projectId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await applicationsApi.getProjectApplications(projectId);
      const list = res?.data?.applications || res?.data || res?.applications || [];
      setApplications(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to load applications for project:", err);
      setError(err?.message || "Failed to load candidate proposals.");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectChange = (e) => {
    const id = e.target.value;
    setSelectedProjectId(id);
    fetchProjectApplications(id);
  };

  const handleAcceptProposal = async (applicationId) => {
    if (!window.confirm("Accept this proposal and initiate contract agreement?")) return;
    setActionLoading(applicationId);
    try {
      await applicationsApi.acceptApplication(applicationId);
      alert("Application accepted! Contract created.");
      fetchProjectApplications(selectedProjectId);
    } catch (err) {
      console.error("Accept application error:", err);
      alert(err?.message || "Failed to accept application.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectProposal = async (applicationId) => {
    if (!window.confirm("Decline this application?")) return;
    setActionLoading(applicationId);
    try {
      await applicationsApi.rejectApplication(applicationId);
      fetchProjectApplications(selectedProjectId);
    } catch (err) {
      console.error("Reject application error:", err);
      alert(err?.message || "Failed to decline application.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: "32px 40px", maxWidth: "1380px", margin: "0 auto" }}>
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fs-3 fw-bold mb-1">Candidate Applications</h1>
            <p className="text-secondary mb-0">Review proposals, freelancer credentials, and hire the top talent.</p>
          </div>

          {projects.length > 0 && (
            <div className="d-flex align-items-center gap-2">
              <label className="fw-semibold text-secondary fs-6">Select Quest:</label>
              <select
                className="form-select form-select-sm"
                style={{ minWidth: "220px" }}
                value={selectedProjectId}
                onChange={handleProjectChange}
              >
                {projects.map((p) => {
                  const pId = p.id || p._id;
                  return (
                    <option key={pId} value={pId}>
                      {p.title}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </header>

        {error && <div className="alert alert-danger mb-4">{error}</div>}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-secondary mt-2">Loading applications from backend...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-3 border p-5">
            <h4 className="fw-bold mb-2">No Quests Posted</h4>
            <p className="text-secondary mb-0">Post a quest to start receiving applications from verified talent.</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-3 border p-5">
            <h4 className="fw-bold mb-2">No Applications Received Yet</h4>
            <p className="text-secondary mb-0">No freelancers have applied to this specific quest yet.</p>
          </div>
        ) : (
          <div className="row g-4">
            {applications.map((app) => {
              const appId = app.id || app._id;
              const applicantName = app.freelancer?.full_name || app.applicant_name || app.user?.full_name || "Applicant";
              const rate = app.proposed_rate || app.bid_amount || "0";
              const coverLetter = app.cover_letter || "No cover letter provided.";
              const status = (app.status || "submitted").toLowerCase();

              return (
                <div key={appId} className="col-12">
                  <div className="card p-4 border rounded-3 shadow-sm bg-white">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold fs-5"
                          style={{ width: "48px", height: "48px" }}
                        >
                          {applicantName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="fs-5 fw-bold mb-0">{applicantName}</h3>
                          <span className="text-muted fs-6">
                            Applied: {app.created_at ? new Date(app.created_at).toLocaleDateString() : "Recent"}
                          </span>
                        </div>
                      </div>

                      <div className="text-end">
                        <span className="badge bg-success-subtle text-success fs-6 px-3 py-2 border border-success-subtle d-block mb-1">
                          Proposed: ${rate}
                        </span>
                        <span className="badge bg-light text-dark border text-capitalize">{status}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-light rounded-3 mb-3">
                      <h6 className="fw-bold text-secondary mb-1">Cover Letter &amp; Proposal Pitch:</h6>
                      <p className="mb-0 text-dark" style={{ whiteSpace: "pre-line" }}>
                        {coverLetter}
                      </p>
                    </div>

                    {status === "submitted" || status === "pending" ? (
                      <div className="d-flex justify-content-end gap-2 pt-2 border-top">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleRejectProposal(appId)}
                          disabled={actionLoading === appId}
                        >
                          Decline
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          style={{ backgroundColor: "#103ca4", borderColor: "#103ca4" }}
                          onClick={() => handleAcceptProposal(appId)}
                          disabled={actionLoading === appId}
                        >
                          {actionLoading === appId ? "Accepting..." : "Accept & Hire"}
                        </button>
                      </div>
                    ) : (
                      <div className="pt-2 border-top text-end text-muted fs-6">
                        Application Status: <strong className="text-capitalize">{status}</strong>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
