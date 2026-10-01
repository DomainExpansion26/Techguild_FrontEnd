import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";

export default function CompanyReputation() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-4" style={{ maxWidth: "1000px", margin: "0 auto", width: "100%", flex: 1, minHeight: 0, overflowY: "auto" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111827", marginBottom: "4px" }}>
          Company Reputation & Trust Score
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
          Build employer trust with top agencies and freelancers by completing company verification and maintaining prompt escrow milestones.
        </p>

        <div className="row g-4">
          <div className="col-12 col-md-5">
            <Cards padding="28px" className="text-center">
              <div className="d-inline-flex p-3 rounded-circle bg-primary-subtle text-primary mb-3">
                <Icon name="Award" size={36} />
              </div>
              <h2 className="fs-1 fw-bold text-primary mb-0">10</h2>
              <span className="text-muted small fw-medium">Client Trust Points</span>

              <div className="mt-4 pt-3 border-top text-start">
                <div className="d-flex justify-content-between small text-muted mb-2">
                  <span>Current Tier</span>
                  <span className="fw-semibold text-dark">Verified Employer (F)</span>
                </div>
                <div className="d-flex justify-content-between small text-muted">
                  <span>Next Rank (Rank E)</span>
                  <span className="fw-semibold text-primary">100 Points Needed</span>
                </div>
              </div>
            </Cards>
          </div>

          <div className="col-12 col-md-7">
            <Cards padding="28px">
              <h3 className="fs-6 fw-bold text-dark mb-3">Ways to Increase Client Score</h3>
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
                    <Icon name="Building" size={18} color="#2563eb" />
                    <span className="small fw-medium">Complete Company Profile</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => navigate("/client-profile")}
                  >
                    +20 Pts
                  </button>
                </div>

                <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light">
                  <div className="d-flex align-items-center gap-2">
                    <Icon name="ShieldCheck" size={18} color="#9333ea" />
                    <span className="small fw-medium">Verify Business Incorporation</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => navigate("/client-verification-hub")}
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
