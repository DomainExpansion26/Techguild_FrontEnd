import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideSnackbar } from "@/store/slices/snackbarSlice";
import "./Snackbar.css";

const ICONS = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

export default function Snackbar() {
  const dispatch = useDispatch();
  const { open, message, type = "info", duration = 4000 } = useSelector((state) => state.snackbar || {});
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      dispatch(hideSnackbar());
      setIsClosing(false);
    }, 280);
  }, [dispatch]);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration, message, handleClose]);

  if (!open && !isClosing) return null;

  return (
    <div className="tg-snackbar-container" aria-live="polite">
      <div className={`tg-snackbar tg-snackbar-${type} ${isClosing ? "closing" : ""}`}>
        <div className="tg-snackbar-icon">
          {ICONS[type] || "ℹ"}
        </div>
        <div className="tg-snackbar-content">
          <div className="tg-snackbar-title">{type === "error" ? "Action Failed" : (type === "success" ? "Success" : type)}</div>
          <div className="tg-snackbar-message">{message}</div>
        </div>
        <button
          type="button"
          className="tg-snackbar-close"
          onClick={handleClose}
          aria-label="Dismiss notification"
        >
          ✕
        </button>
        <div className="tg-snackbar-progress">
          <div
            className="tg-snackbar-progress-bar"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
