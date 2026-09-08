import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";
import "./savedjobs.css";

export default function SavedJobs() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="dashboard-content d-flex align-items-center justify-content-center p-4" style={{ height: "calc(100% - 70px)" }}>
        <Cards className="text-center p-5" style={{ maxWidth: "480px" }}>
          <div className="mb-3 d-inline-flex p-3 rounded-circle bg-primary-subtle text-primary">
            <Icon name="Bookmark" size={32} />
          </div>
          <h2 style={{ fontSize: "20px", color: "#111827", fontWeight: "700", marginBottom: "8px" }}>
            No Saved Quests Yet
          </h2>
          <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.6", marginBottom: "24px" }}>
            Bookmark interesting client quests and projects from the Quest Board to review and apply to them later.
          </p>
          <button
            type="button"
            className="btn btn-primary px-4 py-2 rounded-3 fw-medium"
            style={{ backgroundColor: "#103ca4", border: "none" }}
            onClick={() => navigate("/projects")}
          >
            Browse Available Quests →
          </button>
        </Cards>
      </div>
    </DashboardLayout>
  );
}

