import React from "react";
import "./authhomescreen.css";
import img1 from "../../assets/img1.png";

export default function AuthHomeScreen() {
  return (
    <div
      className="auth-home-container"
      style={{ backgroundImage: `url(${img1})` }}
    >
      <div className="auth-home-text-block">
        <h1 className="auth-home-title">
          Every quest you complete<br />
          builds your <span className="highlight-blue">legacy</span>.
        </h1>
        <p className="auth-home-subtitle">
          Join a guild of verified professionals.<br />
          complete quests. Earn ranks. Unlock Opportunities.
        </p>
        <div className="auth-home-logo">
          <span className="logo-tech">Tech</span>
          <span className="logo-guild">Guild</span>
        </div>
      </div>
    </div>
  );
}
