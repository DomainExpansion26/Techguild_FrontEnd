import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";

export default function ReputationRank() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="dashboard-content p-4" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111827", marginBottom: "4px" }}>
          Reputation & Guild Rank
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
          Earn trust points by completing identity verification, profile milestones, and delivering top quality on quests.
        </p>

        <div className="row g-4">
          <div className="col-12 col-md-5">
            <Cards padding="28px" className="text-center">
              <div className="d-inline-flex p-3 rounded-circle bg-primary-subtle text-primary mb-3">
                <Icon name="Award" size={36} />
              </div>
              <h2 className="fs-1 fw-bold text-primary mb-0">10</h2>
              <span className="text-muted small fw-medium">Total Trust Score</span>

              <div className="mt-4 pt-3 border-top text-start">
                <div className="d-flex justify-content-between small text-muted mb-2">
                  <span>Current Tier</span>
                  <span className="fw-semibold text-dark">Bronze Adventurer</span>
                </div>
                <div className="d-flex justify-content-between small text-muted">
                  <span>Next Rank (Silver)</span>
                  <span className="fw-semibold text-primary">50 Points Needed</span>
                </div>
              </div>
            </Cards>
          </div>

          <div className="col-12 col-md-7">
            <Cards padding="28px">
              <h3 className="fs-6 fw-bold text-dark mb-3">Ways to Earn Points</h3>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light">
                  <div className="d-flex align-items-center gap-2">
                    <Icon name="CheckCircle2" size={18} color="#16a34a" />
                    <span className="small fw-medium">Email Verified</span>
                  </div>
                  <span className="badge bg-success text-white">+10 Pts</span>
                </div>

                <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light">
                  <div className="d-flex align-items-center gap-2">
                    <Icon name="User" size={18} color="#2563eb" />
                    <span className="small fw-medium">Complete Your Profile</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => navigate("/settings/profile")}
                  >
                    +20 Pts
                  </button>
                </div>

                <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light">
                  <div className="d-flex align-items-center gap-2">
                    <Icon name="ShieldCheck" size={18} color="#9333ea" />
                    <span className="small fw-medium">Verify Government ID</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => navigate("/verification")}
                  >
                    +40 Pts
                  </button>
                </div>
              </div>
            </Cards>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

