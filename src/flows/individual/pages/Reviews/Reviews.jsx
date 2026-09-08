import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";
import "./reviews.css";

export default function Reviews() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="dashboard-content d-flex align-items-center justify-content-center p-4" style={{ height: "calc(100% - 70px)" }}>
        <Cards className="text-center p-5" style={{ maxWidth: "480px" }}>
          <div className="mb-3 d-inline-flex p-3 rounded-circle bg-warning-subtle text-warning">
            <Icon name="Star" size={32} />
          </div>
          <h2 style={{ fontSize: "20px", color: "#111827", fontWeight: "700", marginBottom: "8px" }}>
            Client Reviews & Ratings
          </h2>
          <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.6", marginBottom: "24px" }}>
            You have not received any client feedback yet. Deliver milestones on your active contracts to start collecting reviews and building your guild reputation.
          </p>
          <button
            type="button"
            className="btn btn-primary px-4 py-2 rounded-3 fw-medium"
            style={{ backgroundColor: "#103ca4", border: "none" }}
            onClick={() => navigate("/projects")}
          >
            Explore Quests & Projects →
          </button>
        </Cards>
      </div>
    </DashboardLayout>
  );
}

