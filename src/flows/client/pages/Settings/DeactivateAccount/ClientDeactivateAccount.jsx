import React from "react";
import { DashboardLayout } from "@/Components";
import "./ClientDeactivateAccount.css";

export default function ClientDeactivateAccount() {
  return (
    <DashboardLayout activeSettingsTab="deactivate-account">
      <div className="dashboard-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100% - 70px)" }}>
        <div className="dummy-page-card" style={{ padding: "40px", backgroundColor: "#ffffff", borderRadius: "10px", border: "1.26px solid #e5e7eb", textAlign: "center", maxWidth: "400px" }}>
          <h1 style={{ fontSize: "24px", color: "#dc2626", marginBottom: "12px", fontWeight: "700" }}>Deactivate Client Account</h1>
          <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: "1.5" }}>
            This is a dummy page for Deactivate Client Account. Real features will be integrated here soon.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

