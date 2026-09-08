import React from "react";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";

export default function Notifications() {
  return (
    <DashboardLayout>
      <div className="dashboard-content d-flex align-items-center justify-content-center p-4" style={{ height: "calc(100% - 70px)" }}>
        <Cards className="text-center p-5" style={{ maxWidth: "480px" }}>
          <div className="mb-3 d-inline-flex p-3 rounded-circle bg-light text-primary">
            <Icon name="Bell" size={32} />
          </div>
          <h2 style={{ fontSize: "20px", color: "#111827", fontWeight: "700", marginBottom: "8px" }}>
            All Caught Up!
          </h2>
          <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.6", marginBottom: "0" }}>
            You have no unread notifications right now. System alerts, project proposal updates, and milestone review notices will appear here in real time.
          </p>
        </Cards>
      </div>
    </DashboardLayout>
  );
}

