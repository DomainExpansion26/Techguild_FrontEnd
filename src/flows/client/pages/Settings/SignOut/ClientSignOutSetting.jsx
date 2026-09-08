import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DashboardLayout } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { useAuth } from "@/context/AuthContext";
import { showSnackbar } from "@/store";
import authApi from "@/features/auth/api/authApi";
import "@/flows/individual/pages/Settings/SignOut/SignOutSetting.css";
import "./ClientSignOutSetting.css";

export default function ClientSignOutSetting() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, logout } = useAuth();

  const handleConfirmSignOut = async () => {
    try {
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

  const displayName = user?.name || (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : null) || user?.email || "Client";

  return (
    <DashboardLayout containerClass="signout-container" activeSettingsTab="sign-out">
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
          <div className="signout-header">
            <div className="user-name">{displayName}</div>
            <div className="user-role">Client Account</div>
          </div>

          <hr className="custom-divider" />

          <div className="signout-icon-section">
            <div className="signout-icon-wrap">
              <Icon name="User" size={132} color="#D12027" strokeWidth={1.5} className="icon-person" />
              <span className="icon-arrow-badge">
                <Icon name="ArrowRight" size={20} color="#FFFFFF" strokeWidth={2.5} className="icon-arrow" />
              </span>
            </div>
          </div>

          <p className="question-text">
            Are you sure you want to <span className="sign-out-text">Sign Out ?</span>
          </p>

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

