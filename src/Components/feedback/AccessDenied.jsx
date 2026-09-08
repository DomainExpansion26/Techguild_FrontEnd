import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/Components/icons/Icon";

export default function AccessDenied({ message = "You do not have permission to view this page." }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        padding: "32px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: "#fee2e2",
          color: "#dc2626",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Icon name="Shield" size={32} />
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>Access Denied</h2>
      <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: "420px", marginBottom: "24px", lineHeight: "1.5" }}>
        {message}
      </p>
      <div style={{ display: "flex", gap: "12px" }}>
        <Link
          to="/dashboard"
          className="btn btn-primary"
          style={{ fontSize: "13px", padding: "8px 20px", borderRadius: "8px" }}
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
