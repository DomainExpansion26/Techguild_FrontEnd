import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/Components";
import { applicationsApi } from "@/features/applications/api/applicationsApi";
import "./proposals.css";

export default function Proposals() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await applicationsApi.getMyApplications();
      const list = response?.data?.applications || response?.data || response?.applications || [];
      setProposals(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Error fetching proposals from API:", err);
      setError(err?.message || "Failed to load proposals.");
      setProposals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (id) => {
    if (!window.confirm("Are you sure you want to withdraw this proposal?")) return;
    try {
      await applicationsApi.withdrawApplication(id);
      setProposals((prev) => prev.filter((p) => (p.id || p._id) !== id));
    } catch (err) {
      console.error("Failed to withdraw proposal:", err);
      alert(err?.message || "Failed to withdraw proposal.");
    }
  };

  const filteredProposals = proposals.filter((p) => {
    if (activeTab === "all") return true;
    const status = (p.status || "").toLowerCase();
    return status === activeTab.toLowerCase();
  });

  return (
    <DashboardLayout>
      <div className="proposals-page">
        <header className="proposals-header">
          <div>
            <h1 className="proposals-title">My Proposals</h1>
            <p className="proposals-subtitle">
              Track your live submitted proposals, shortlisted bids, and client invitations.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={fetchProposals}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </header>

        {/* Status Tabs */}
        <div className="proposals-tabs">
          <button
            className={`proposals-tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Proposals ({proposals.length})
          </button>
          <button
            className={`proposals-tab-btn ${activeTab === "pending" || activeTab === "submitted" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
          <button
            className={`proposals-tab-btn ${activeTab === "shortlisted" ? "active" : ""}`}
            onClick={() => setActiveTab("shortlisted")}
          >
            Shortlisted
          </button>
          <button
            className={`proposals-tab-btn ${activeTab === "accepted" ? "active" : ""}`}
            onClick={() => setActiveTab("accepted")}
          >
            Accepted
          </button>
        </div>

        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading proposals...</span>
            </div>
            <p className="text-secondary mt-2">Loading your live proposals from backend...</p>
          </div>
        ) : filteredProposals.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-3 border p-5">
            <h4 className="fw-bold mb-2">No Proposals Found</h4>
            <p className="text-secondary mb-0">
              You have not submitted any proposals in this category yet.
            </p>
          </div>
        ) : (
          <div className="proposals-list">
            {filteredProposals.map((item) => {
              const proposalId = item.id || item._id;
              const projectTitle = item.project?.title || item.project_title || item.title || "Project Proposal";
              const clientName = item.project?.client?.company_name || item.client_name || "Client";
              const proposedRate = item.proposed_rate || item.bid_amount || item.rate || "N/A";
              const submittedDate = item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recent";
              const status = (item.status || "submitted").toLowerCase();

              return (
                <div key={proposalId} className="proposal-item-card">
                  <div className="proposal-info">
                    <h3 className="proposal-quest-title">{projectTitle}</h3>
                    <div className="proposal-meta">
                      <span>Client: <strong>{clientName}</strong></span>
                      <span>Proposed Rate: <strong>${proposedRate}</strong></span>
                      <span>Submitted: {submittedDate}</span>
                    </div>
                    {item.cover_letter && (
                      <p className="mt-2 text-secondary fs-6 mb-0" style={{ maxWidth: "700px" }}>
                        "{item.cover_letter}"
                      </p>
                    )}
                  </div>

                  <div className="proposal-actions">
                    <span className={`proposal-status-badge ${status}`}>
                      {status}
                    </span>
                    {status !== "accepted" && status !== "withdrawn" && status !== "rejected" && (
                      <button
                        type="button"
                        className="withdraw-btn"
                        onClick={() => handleWithdraw(proposalId)}
                      >
                        Withdraw
                      </button>
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
