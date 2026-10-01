import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";

export default function Payouts() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-4" style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", flex: 1, minHeight: 0, overflowY: "auto" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111827", marginBottom: "4px" }}>
          Escrow &amp; Client Billing Overview
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
          Monitor your quest escrow deposits, released freelancer milestone payments, and monthly invoice statements.
        </p>

        <div className="row g-4 mb-4">
          <div className="col-12 col-md-4">
            <Cards padding="24px" className="border text-center h-100">
              <span className="text-muted small fw-medium">Active In Escrow</span>
              <h2 className="fs-2 fw-bold text-primary my-2">$0.00</h2>
              <span className="text-secondary small">Held in milestone security</span>
            </Cards>
          </div>
          <div className="col-12 col-md-4">
            <Cards padding="24px" className="border text-center h-100">
              <span className="text-muted small fw-medium">Total Paid Out</span>
              <h2 className="fs-2 fw-bold text-success my-2">$0.00</h2>
              <span className="text-secondary small">Across all completed quests</span>
            </Cards>
          </div>
          <div className="col-12 col-md-4">
            <Cards padding="24px" className="border text-center h-100">
              <span className="text-muted small fw-medium">Pending Approvals</span>
              <h2 className="fs-2 fw-bold text-dark my-2">0</h2>
              <span className="text-secondary small">Deliverables awaiting review</span>
            </Cards>
          </div>
        </div>

        <Cards padding="28px">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fs-5 fw-bold text-dark mb-0">Recent Escrow Transactions</h3>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate("/client-active-quests")}
            >
              View Active Workrooms
            </button>
          </div>
          <div className="p-4 bg-light rounded-3 text-center border">
            <Icon name="Receipt" size={32} color="#9ca3af" className="mb-2" />
            <p className="text-muted small mb-0">No billing transactions recorded yet. Once contracts are active, itemized milestones appear here.</p>
          </div>
        </Cards>
      </div>
    </DashboardLayout>
  );
}
