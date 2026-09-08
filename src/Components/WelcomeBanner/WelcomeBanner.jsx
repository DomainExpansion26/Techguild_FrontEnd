import React from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Zap, Briefcase, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import img3 from "@/assets/img3.jpg";
import "./welcome-banner.css";

export default function WelcomeBanner({
  title,
  subtitle = "Complete your profile to stand out",
  desc = "Finish these steps to improve your chances of getting hired.",
  actionText = "Complete profile",
  onActionClick,
  steps = [
    { icon: <Camera size={13} strokeWidth={2.5} />, text: "Basic Information" },
    { icon: <Zap size={13} strokeWidth={2.5} />, text: "Add Skills" },
    { icon: <Briefcase size={13} strokeWidth={2.5} />, text: "Add Portfolio" },
    { icon: <ShieldCheck size={13} strokeWidth={2.5} />, text: "Verify Identity" },
  ],
  progressText = "0 of 4 steps completed"
}) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const firstName = user?.name
    ? user.name.split(" ")[0]
    : (user?.first_name || (user?.email ? user.email.split("@")[0] : ""));
  const resolvedTitle = title || (firstName ? `Welcome to TechGuild, ${firstName}!` : "Welcome to TechGuild!");

  const handleActionClick = () => {
    if (onActionClick) {
      onActionClick();
    } else {
      navigate("/profile");
    }
  };

  return (
    <div
      className="welcome-banner-card animate-fade-in"
      style={{
        backgroundImage: `url(${img3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="welcome-banner-overlay position-absolute top-0 start-0 w-100 h-100"></div>

      <div className="welcome-banner-content">

        <div className="welcome-banner-info-section">
          <div className="welcome-banner-info-text">
            <h2 className="welcome-banner-title">{resolvedTitle}</h2>
            <h3 className="welcome-banner-subtitle">{subtitle}</h3>
            <p className="welcome-banner-desc">{desc}</p>
          </div>
          <button
            type="button"
            className="btn btn-light btn-complete-profile"
            onClick={handleActionClick}
          >
            {actionText}
          </button>
        </div>

        <div className="w-100 welcome-banner-progress-section">
          <div className="progress-bar-container">
            <div className="progress-bar-line"></div>
          </div>
          <div className="progress-text">
            {progressText}
          </div>
        </div>

        <div className="welcome-banner-steps">
          {steps.map((step, index) => (
            <div className="step-item" key={index}>
              <div className="step-icon-circle">
                {step.icon}
              </div>
              <span className="step-text">
                {step.text}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

