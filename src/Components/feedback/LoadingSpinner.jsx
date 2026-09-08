import React from "react";

export default function LoadingSpinner({ text = "Loading...", fullScreen = false }) {
  if (fullScreen) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
          width: "100%",
        }}
      >
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        {text && <p style={{ marginTop: "16px", color: "#6b7280", fontSize: "14px", fontWeight: 500 }}>{text}</p>}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        width: "100%",
      }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <p style={{ marginTop: "12px", color: "#6b7280", fontSize: "13px" }}>{text}</p>}
    </div>
  );
}
