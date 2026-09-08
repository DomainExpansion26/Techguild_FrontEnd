import React from "react";
import Icon from "@/Components/icons/Icon";

export default function EmptyState({
  icon = "FolderOpen",
  title = "No items found",
  description = "There are no records to display at this time.",
  actionText,
  onAction,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "1px dashed #e5e7eb",
        width: "100%",
        maxWidth: "480px",
        margin: "24px auto",
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          backgroundColor: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
          color: "#6b7280",
        }}
      >
        <Icon name={icon} size={26} />
      </div>
      <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#111827", margin: "0 0 6px 0" }}>{title}</h3>
      <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 18px 0", maxWidth: "340px", lineHeight: "1.5" }}>
        {description}
      </p>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn btn-primary"
          style={{ fontSize: "13px", padding: "8px 18px", borderRadius: "8px" }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
