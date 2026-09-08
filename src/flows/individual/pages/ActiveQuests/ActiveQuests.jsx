import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/Components";
import { contractsApi } from "@/features/contracts/api/contractsApi";
import { milestonesApi } from "@/features/milestones/api/milestonesApi";
import { submissionsApi } from "@/features/submissions/api/submissionsApi";
import "./activeQuests.css";

export default function ActiveQuests() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Deliverable Submission Modal State
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [workNotes, setWorkNotes] = useState("");
  const [workLink, setWorkLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchActiveContracts();
  }, []);

  const fetchActiveContracts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await contractsApi.getFreelancerContracts();
      const list = response?.data?.contracts || response?.data || response?.contracts || [];
      setContracts(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Error fetching contracts from API:", err);
      setError(err?.message || "Failed to load active contracts.");
      setContracts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSubmitModal = (milestone) => {
    setSelectedMilestone(milestone);
    setWorkNotes("");
    setWorkLink("");
    setFeedback({ type: "", text: "" });
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

  return (
    <DashboardLayout>
      <div className="active-quests-page">
        <header className="active-quests-header">
          <div>
            <h1 className="active-quests-title">Active Quests &amp; Contracts</h1>
            <p className="active-quests-subtitle">
              Manage your ongoing client contracts, submit milestone deliverables, and track escrow payments.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={fetchActiveContracts}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </header>

        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading contracts...</span>
            </div>
            <p className="text-secondary mt-2">Loading your active contracts from backend...</p>
          </div>
        ) : contracts.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-3 border p-5">
            <h4 className="fw-bold mb-2">No Active Contracts</h4>
            <p className="text-secondary mb-0">
              When a client accepts your quest proposal, your active contract and milestones will appear here.
            </p>
          </div>
        ) : (
          <div className="contracts-list">
            {contracts.map((contract) => {
              const contractId = contract.id || contract._id;
              const title = contract.title || contract.project?.title || "Contract Agreement";
              const clientName = contract.client?.company_name || contract.client?.name || "Client";
              const totalAmount = contract.total_amount || contract.budget || contract.amount || "0";
              const milestones = Array.isArray(contract.milestones) ? contract.milestones : [];

              return (
                <div key={contractId} className="contract-card">
                  <div className="contract-card-header">
                    <div>
                      <h2 className="contract-title">{title}</h2>
                      <div className="contract-client-meta">
                        Client: <strong>{clientName}</strong> &bull; Status: <span className="text-capitalize text-success fw-semibold">{contract.status || "In Progress"}</span>
                      </div>
                    </div>
                    <span className="contract-value-badge">${totalAmount}</span>
                  </div>

                  <div className="contract-milestones-section">
                    <h3 className="milestones-section-title">Milestones &amp; Deliverables</h3>
                    {milestones.length === 0 ? (
                      <p className="text-muted fs-6 mb-0">No milestones configured for this contract.</p>
                    ) : (
                      milestones.map((m, idx) => {
                        const mId = m.id || m._id || idx;
                        const status = (m.status || "in_progress").toLowerCase();
                        return (
                          <div key={mId} className="milestone-item">
                            <div>
                              <div className="milestone-title">{m.title || `Milestone ${idx + 1}`}</div>
                              <div className="milestone-amount">${m.amount || "0"}</div>
                            </div>

                            <div className="d-flex align-items-center gap-3">
                              <span className={`milestone-status ${status}`}>{status}</span>
                              {status !== "completed" && status !== "approved" && (
                                <button
                                  type="button"
                                  className="submit-work-btn"
                                  onClick={() => handleOpenSubmitModal(m)}
                                >
                                  Submit Work
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
    </DashboardLayout>
  );
}
