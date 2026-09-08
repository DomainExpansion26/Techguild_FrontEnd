import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!open) {
      setIsClosing(false);
      return;
    }

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration, message]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      dispatch(hideSnackbar());
      setIsClosing(false);
    }, 280);
  };

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
