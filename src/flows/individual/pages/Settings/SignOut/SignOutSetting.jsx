import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DashboardLayout } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { useAuth } from "@/context/AuthContext";
import { showSnackbar } from "@/store";
import authApi from "@/features/auth/api/authApi";
import "./SignOutSetting.css";

export default function SignOutSetting() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, logout } = useAuth();

  const handleConfirmSignOut = async () => {
    try {
      // Optional backend logout notification
      await authApi.logout().catch(() => {});
    } finally {
      logout();
      dispatch(showSnackbar({
        message: "You have been signed out successfully.",
        type: "info",
      }));
      navigate("/login");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const displayName = user?.name || (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : null) || user?.email || "Freelancer";
  const displayRole = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Freelancer";

  return (
    <DashboardLayout containerClass="settings-layout-collapsed-nav signout-container" activeSettingsTab="sign-out">
      <div
        className="dashboard-content"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100% - 70px)"
        }}
      >
        <div className="signout-card">
          {/* Header Section */}
          <div className="signout-header">
            <div className="user-name">{displayName}</div>
            <div className="user-role">{displayRole}</div>
          </div>

          {/* Divider */}
          <hr className="custom-divider" />

          {/* Icon Section */}
          <div className="signout-icon-section">
            <div className="signout-icon-wrap">
              <Icon name="CircleUserRound" size={120} className="icon-person" />
            </div>
          </div>

          {/* Question Text */}
          <p className="question-text">
            Are you sure you want to <span className="sign-out-text">Sign Out ?</span>
          </p>

          {/* Buttons */}
          <div className="signout-actions">
            <button
              type="button"
              className="btn btn-custom-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-custom-confirm"
              onClick={handleConfirmSignOut}
            >
              Confirm Sign Out
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

