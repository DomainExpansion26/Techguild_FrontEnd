import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/Components/icons/Icon";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "32px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: "#f3f4f6",
          color: "#4b5563",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Icon name="CircleQuestionMark" size={32} />
      </div>
      <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#111827", marginBottom: "8px" }}>404</h1>
      <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Page Not Found</h2>
      <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: "420px", marginBottom: "24px" }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/dashboard"
        className="btn btn-primary"
        style={{ fontSize: "13px", padding: "8px 20px", borderRadius: "8px" }}
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
