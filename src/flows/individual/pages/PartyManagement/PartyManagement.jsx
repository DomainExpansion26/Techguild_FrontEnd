import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DashboardLayout } from "@/Components";
import { teamsApi } from "@/features/teams/api/teamsApi";
import { showSnackbar } from "@/store";

export default function PartyManagement() {
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create Team Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [creating, setCreating] = useState(false);

  // Invite Member Modal
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [inviting, setInviting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await teamsApi.getMyTeams();
      const list = res?.data?.teams || res?.data || res?.teams || [];
      setTeams(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to load teams:", err);
      setError(err?.message || "Failed to load guild parties.");
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    setCreating(true);
    try {
      await teamsApi.createTeam({
        name: teamName.trim(),
        description: teamDescription.trim(),
      });
      dispatch(showSnackbar({ message: "Guild party created successfully!", type: "success" }));
      setShowCreateModal(false);
      setTeamName("");
      setTeamDescription("");
      fetchTeams();
    } catch (err) {
      console.error("Create party error:", err);
      dispatch(showSnackbar({ message: err?.message || "Failed to create party.", type: "error" }));
    } finally {
      setCreating(false);
    }
  };

  const handleInviteMember = async (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviting(true);
    setFeedbackMsg({ type: "", text: "" });
    try {
      await teamsApi.inviteMember(selectedTeam.id || selectedTeam._id, {
        email: inviteEmail.trim(),
        role: inviteRole,
      });
      dispatch(showSnackbar({ message: `Invitation sent to ${inviteEmail}!`, type: "success" }));
      setTimeout(() => {
        setSelectedTeam(null);
        setInviteEmail("");
        fetchTeams();
      }, 1000);
    } catch (err) {
      console.error("Invite member error:", err);
      dispatch(showSnackbar({ message: err?.message || "Failed to invite member.", type: "error" }));
    } finally {
      setInviting(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: "32px 40px", maxWidth: "1380px", margin: "0 auto" }}>
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fs-3 fw-bold mb-1">Guild Parties &amp; Teams</h1>
            <p className="text-secondary mb-0">Form collaborative squads, pool trust points, and tackle larger quests together.</p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: "#103ca4", borderColor: "#103ca4" }}
            onClick={() => setShowCreateModal(true)}
          >
            + Create New Party
          </button>
        </header>

        {error && <div className="alert alert-danger mb-4">{error}</div>}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-secondary mt-2">Loading your party rosters from backend...</p>
          </div>
        ) : teams.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-3 border p-5">
            <h4 className="fw-bold mb-2">No Parties Yet</h4>
            <p className="text-secondary mb-3">Create your first guild party to collaborate on multi-disciplinary client contracts.</p>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setShowCreateModal(true)}
            >
              Start a Party
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {teams.map((team) => {
              const teamId = team.id || team._id;
              const members = Array.isArray(team.members) ? team.members : [];
              return (
                <div key={teamId} className="col-lg-6">
                  <div className="card h-100 p-4 border rounded-3 shadow-sm bg-white">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h3 className="fs-5 fw-bold mb-1">{team.name}</h3>
                        <p className="text-secondary fs-6 mb-0">{team.description || "Guild Party Squad"}</p>
                      </div>
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill">
                        {members.length} Member{members.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="mt-3 mb-4">
                      <h6 className="fw-bold text-muted text-uppercase fs-7 mb-2">Squad Members</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {members.length === 0 ? (
                          <span className="text-muted fs-6">No other members in this party yet.</span>
                        ) : (
                          members.map((member, idx) => (
                            <span key={idx} className="badge bg-light text-dark border px-3 py-2">
                              👤 {member.user?.full_name || member.email || `Member ${idx + 1}`} ({member.role || "member"})
                            </span>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-top d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          setSelectedTeam(team);
                          setFeedbackMsg({ type: "", text: "" });
                        }}
                      >
                        + Invite Member
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Create Party Modal */}
        {showCreateModal && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-3">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">Create Guild Party</h5>
                  <button type="button" className="btn-close" onClick={() => setShowCreateModal(false)}></button>
                </div>
                <form onSubmit={handleCreateTeam}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Party / Team Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. FullStack Ninjas, Alpha Design Squad"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Description / Focus Area</label>
                      <textarea
                        className="form-control"
                        placeholder="What quests does your party specialize in?"
                        value={teamDescription}
                        onChange={(e) => setTeamDescription(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#103ca4" }} disabled={creating}>
                      {creating ? "Creating..." : "Create Party"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Invite Member Modal */}
        {selectedTeam && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-3">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">Invite Member to {selectedTeam.name}</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedTeam(null)}></button>
                </div>
                <form onSubmit={handleInviteMember}>
                  <div className="modal-body">
                    {feedbackMsg.text && (
                      <div className={`alert ${feedbackMsg.type === "success" ? "alert-success" : "alert-danger"} py-2`}>
                        {feedbackMsg.text}
                      </div>
                    )}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Member Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="colleague@techguild.io"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Role in Party</label>
                      <select
                        className="form-select"
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value)}
                      >
                        <option value="member">Member</option>
                        <option value="lead">Co-Lead</option>
                        <option value="reviewer">Code Reviewer</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary" onClick={() => setSelectedTeam(null)}>
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#103ca4" }} disabled={inviting}>
                      {inviting ? "Sending..." : "Send Invitation"}
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
