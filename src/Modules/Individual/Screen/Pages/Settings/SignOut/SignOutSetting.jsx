import React from "react";
import { DashboardLayout, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import "./SignOutSetting.css";

export default function SignOutSetting() {
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
            <div className="user-name">Arjun Mehta</div>
            <div className="user-role">Full-Stack Developer</div>
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
            <SecondaryButton text="Cancel" className="cancel-btn" />
            <PrimaryButton text="Confirm Sign Out" className="btn-custom-confirm" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
