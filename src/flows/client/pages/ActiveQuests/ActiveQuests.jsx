import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/Components";
import { contractsApi } from "@/features/contracts/api/contractsApi";
import { submissionsApi } from "@/features/submissions/api/submissionsApi";

export default function ActiveQuests() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchClientContracts();
  }, []);

  const fetchClientContracts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await contractsApi.getClientContracts();
      const list = res?.data?.contracts || res?.data || res?.contracts || [];
      setContracts(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Error fetching client contracts:", err);
      setError(err?.message || "Failed to load client contracts.");
      setContracts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveWork = async (submissionId) => {
    if (!window.confirm("Approve this milestone deliverable and release payment from escrow?")) return;
    setActionLoading(submissionId);
    try {
      await submissionsApi.approveSubmission(submissionId);
      alert("Milestone approved and payment released successfully!");
      fetchClientContracts();
    } catch (err) {
      console.error("Approve milestone error:", err);
      alert(err?.message || "Failed to approve milestone.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRequestRevision = async (submissionId) => {
    const feedback = window.prompt("Enter requested revision details for the freelancer:");
    if (!feedback) return;
    setActionLoading(submissionId);
    try {
      await submissionsApi.rejectSubmission(submissionId, { feedback });
      alert("Revision request sent to freelancer.");
      fetchClientContracts();
    } catch (err) {
      console.error("Revision error:", err);
      alert(err?.message || "Failed to send revision request.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: "32px 40px", maxWidth: "1380px", margin: "0 auto" }}>
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fs-3 fw-bold mb-1">Active Client Contracts &amp; Workrooms</h1>
            <p className="text-secondary mb-0">Track ongoing deliverables, review milestone submissions, and release escrow funds.</p>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={fetchClientContracts}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </header>

        {error && <div className="alert alert-danger mb-4">{error}</div>}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-secondary mt-2">Loading active contracts from backend...</p>
          </div>
        ) : contracts.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-3 border p-5">
            <h4 className="fw-bold mb-2">No Active Contracts</h4>
            <p className="text-secondary mb-0">Once you accept a candidate proposal, your active contract and milestones will appear here.</p>
          </div>
        ) : (
          <div className="row g-4">
            {contracts.map((contract) => {
              const contractId = contract.id || contract._id;
              const title = contract.title || contract.project?.title || "Contract Agreement";
              const freelancerName = contract.freelancer?.full_name || contract.freelancer?.name || "Freelancer";
              const totalAmount = contract.total_amount || contract.budget || "0";
              const milestones = Array.isArray(contract.milestones) ? contract.milestones : [];

              return (
                <div key={contractId} className="col-12">
                  <div className="card p-4 border rounded-3 shadow-sm bg-white">
                    <div className="d-flex justify-content-between align-items-start mb-3 pb-3 border-bottom">
                      <div>
                        <h3 className="fs-5 fw-bold mb-1">{title}</h3>
                        <div className="text-muted fs-6">
                          Freelancer: <strong>{freelancerName}</strong> &bull; Status: <span className="text-success fw-semibold text-capitalize">{contract.status || "Active"}</span>
                        </div>
                      </div>
                      <span className="badge bg-primary-subtle text-primary fs-6 px-3 py-2 border border-primary-subtle">
                        Total: ${totalAmount}
                      </span>
                    </div>

                    <div>
                      <h6 className="fw-bold text-secondary text-uppercase fs-7 mb-3">Milestone Deliverables</h6>
                      {milestones.length === 0 ? (
                        <p className="text-muted fs-6">No milestones configured for this contract.</p>
                      ) : (
                        <div className="d-flex flex-column gap-3">
                          {milestones.map((m, idx) => {
                            const mId = m.id || m._id || idx;
                            const status = (m.status || "pending").toLowerCase();
                            const latestSubmission = m.submission || m.latest_submission;

                            return (
                              <div key={mId} className="p-3 bg-light rounded-3 border d-flex justify-content-between align-items-center">
                                <div>
                                  <div className="fw-bold fs-6">{m.title || `Milestone ${idx + 1}`}</div>
                                  <div className="text-success fw-semibold fs-7">${m.amount || "0"}</div>
                                  {latestSubmission?.notes && (
                                    <div className="mt-2 text-secondary fs-7">
                                      <strong>Notes:</strong> {latestSubmission.notes}
                                    </div>
                                  )}
                                  {latestSubmission?.deliverable_url && (
                                    <div className="mt-1">
                                      <a href={latestSubmission.deliverable_url} target="_blank" rel="noreferrer" className="text-primary fs-7">
                                        🔗 View Deliverable Link
                                      </a>
                                    </div>
                                  )}
                                </div>

                                <div className="d-flex align-items-center gap-2">
                                  <span className="badge bg-white text-dark border text-capitalize">{status}</span>
                                  {latestSubmission && status !== "approved" && (
                                    <>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-outline-warning"
                                        onClick={() => handleRequestRevision(latestSubmission.id || latestSubmission._id)}
                                        disabled={actionLoading === (latestSubmission.id || latestSubmission._id)}
                                      >
                                        Request Revision
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-success"
                                        onClick={() => handleApproveWork(latestSubmission.id || latestSubmission._id)}
                                        disabled={actionLoading === (latestSubmission.id || latestSubmission._id)}
                                      >
                                        {actionLoading === (latestSubmission.id || latestSubmission._id) ? "Approving..." : "Approve & Pay"}
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
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
