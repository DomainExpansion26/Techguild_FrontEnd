import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/Components";
import { taskManagementApi } from "@/services/api";

const getQuestList = (response) => {
  if (Array.isArray(response)) return response;
  const quests = response?.quests || response?.active_quests;
  if (Array.isArray(quests)) return quests;
  throw new Error("The active quests API returned an invalid response.");
};

export default function ActiveQuests() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActiveQuests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskManagementApi.getClientActiveQuests();
      setQuests(getQuestList(response));
    } catch (err) {
      console.error("Error fetching client active quests:", err);
      setError(err?.message || "Failed to load active quests.");
      setQuests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveQuests();
  }, [fetchActiveQuests]);

  return (
    <DashboardLayout>
      <main style={{ padding: "32px 40px", maxWidth: "1380px", margin: "0 auto", width: "100%", flex: 1, minHeight: 0, overflowY: "auto" }}>
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fs-3 fw-bold mb-1">Active Quests</h1>
            <p className="text-secondary mb-0">Track the quests you have hired for and monitor their progress.</p>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={fetchActiveQuests}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </header>

        {error && <div className="alert alert-danger mb-4" role="alert">{error}</div>}

        {loading ? (
          <div className="text-center py-5" role="status">
            <div className="spinner-border text-primary" aria-hidden="true" />
            <p className="text-secondary mt-2">Loading active quests...</p>
          </div>
        ) : quests.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-3 border p-5">
            <h2 className="fs-4 fw-bold mb-2">No Active Quests</h2>
            <p className="text-secondary mb-3">Once you hire a freelancer for a quest, it will appear here.</p>
            <Link to="/client-quest-board" className="btn btn-primary">View Quest Board</Link>
          </div>
        ) : (
          <div className="row g-4">
            {quests.map((quest, index) => {
              const questId = quest.id || quest.quest_id || quest._id || index;
              const freelancer = quest.freelancer?.full_name
                || quest.freelancer?.name
                || quest.freelancer_name
                || quest.assignee_name;
              const acceptedAt = quest.accepted_at || quest.started_at;

              return (
                <div className="col-12" key={questId}>
                  <article className="card p-4 border rounded-3 shadow-sm bg-white">
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <h2 className="fs-5 fw-bold mb-1">{quest.title || quest.quest_title || "Active Quest"}</h2>
                        {freelancer && <p className="text-secondary mb-1">Freelancer: <strong>{freelancer}</strong></p>}
                        {acceptedAt && (
                          <p className="text-secondary small mb-0">
                            Started {new Date(acceptedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <span className="badge bg-success-subtle text-success border border-success-subtle text-capitalize">
                        {String(quest.status || "Active").replaceAll("_", " ")}
                      </span>
                    </div>
                    {quest.description && <p className="text-secondary mt-3 mb-0">{quest.description}</p>}
                  </article>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}
