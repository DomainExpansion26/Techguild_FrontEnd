import React from "react";
import { DashboardLayout } from "@/Components";
import "./ClientPrivacySetting.css";

export default function ClientPrivacySetting() {
  return (
    <DashboardLayout activeSettingsTab="privacy">
      <div className="dashboard-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100% - 70px)" }}>
        <div className="dummy-page-card" style={{ padding: "40px", backgroundColor: "#ffffff", borderRadius: "10px", border: "1.26px solid #e5e7eb", textAlign: "center", maxWidth: "400px" }}>
          <h1 style={{ fontSize: "24px", color: "#111827", marginBottom: "12px", fontWeight: "700" }}>Privacy & Visibility Page</h1>
          <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: "1.5" }}>
            This is a dummy page for Client Privacy & Visibility settings. Real features will be integrated here soon.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

