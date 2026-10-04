import React from "react";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";

export default function Notifications() {
  return (
    <DashboardLayout>
      <div className="d-flex align-items-center justify-content-center p-4" style={{ width: "100%", flex: 1, minHeight: 0, overflowY: "auto" }}>
        <Cards className="text-center p-5" style={{ maxWidth: "480px" }}>
          <div className="mb-3 d-inline-flex p-3 rounded-circle bg-light text-primary">
            <Icon name="Bell" size={32} />
          </div>
          <h2 style={{ fontSize: "20px", color: "#111827", fontWeight: "700", marginBottom: "8px" }}>
            Client Guild Notifications
          </h2>
          <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.6", marginBottom: "0" }}>
            You are all caught up. When freelancers apply to your quests or submit milestone deliverables for approval, alerts will appear here.
          </p>
        </Cards>
      </div>
    </DashboardLayout>
  );
}
