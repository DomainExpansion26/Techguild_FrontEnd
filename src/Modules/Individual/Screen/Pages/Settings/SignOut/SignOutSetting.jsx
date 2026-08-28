import React from "react";
import { DashboardLayout } from "@/Components";
import Icon from "@/Components/icons/Icon";
import "./SignOutSetting.css";

export default function SignOutSetting() {
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
              {/* Red person icon */}
              <Icon name="User" size={132} color="#D12027" strokeWidth={1.5} className="icon-person" />
              {/* Green arrow badge positioned over it */}
              <span className="icon-arrow-badge">
                <Icon name="ArrowRight" size={20} color="#FFFFFF" strokeWidth={2.5} className="icon-arrow" />
              </span>
            </div>
          </div>

          {/* Question Text */}
          <p className="question-text">
            Are you sure you want to <span className="sign-out-text">Sign Out ?</span>
          </p>

          {/* Buttons */}
          <div className="signout-actions">
            <button className="btn btn-custom-cancel">Cancel</button>
            <button className="btn btn-custom-confirm">Confirm Sign Out</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
