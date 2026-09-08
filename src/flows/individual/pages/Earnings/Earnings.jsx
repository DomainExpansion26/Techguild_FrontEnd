import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";
import "./earnings.css";

export default function Earnings() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="dashboard-content p-4" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111827", marginBottom: "4px" }}>
          Earnings & Financial Overview
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
          Track your milestone escrows, released contract payments, and withdrawal methods.
        </p>

        {/* Metric Cards Row */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <Cards padding="20px" className="border">
              <span className="text-muted small fw-medium">Available Balance</span>
              <h2 className="fs-3 fw-bold text-dark my-1">₹0.00</h2>
              <span className="small text-muted">Ready to withdraw</span>
            </Cards>
          </div>
          <div className="col-12 col-md-4">
            <Cards padding="20px" className="border">
              <span className="text-muted small fw-medium">In Escrow (Pending Milestones)</span>
              <h2 className="fs-3 fw-bold text-dark my-1">₹0.00</h2>
              <span className="small text-muted">Awaiting deliverable review</span>
            </Cards>
          </div>
          <div className="col-12 col-md-4">
            <Cards padding="20px" className="border">
              <span className="text-muted small fw-medium">Total Lifetime Earned</span>
              <h2 className="fs-3 fw-bold text-success my-1">₹0.00</h2>
              <span className="small text-muted">0 completed milestones</span>
            </Cards>
          </div>
        </div>

        {/* Payout History Card */}
        <Cards padding="28px" className="border text-center py-5">
          <div className="mb-3 d-inline-flex p-3 rounded-circle bg-light text-primary">
            <Icon name="CreditCard" size={28} />
          </div>
          <h3 className="fs-6 fw-semibold text-dark mb-1">No Payout Records Yet</h3>
          <p className="text-muted small mb-4" style={{ maxWidth: "420px", margin: "0 auto" }}>
            When clients approve milestone deliverables on your active quests, payments will appear here with automatic direct deposits.
          </p>
          <button
            type="button"
            className="btn btn-primary px-4 py-2 rounded-3 fw-medium"
            style={{ backgroundColor: "#103ca4", border: "none" }}
            onClick={() => navigate("/active-quests")}
          >
            View Active Quests & Milestones
          </button>
        </Cards>
      </div>
    </DashboardLayout>
  );
}

