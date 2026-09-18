import React from "react";
import "./authhomescreen.css";
import img1 from "@/assets/img1.png";
import { APP_STRINGS } from "@/constants/string";

export default function AuthHomeScreen() {
  const STRINGS = APP_STRINGS.AUTH.HOME_SCREEN;

  return (
    <div
      className="auth-home-container"
      style={{ backgroundImage: `url(${img1})` }}
    >
      <div className="auth-home-text-block">
        <h1 className="auth-home-title">
          {STRINGS.TITLE_LINE1}<br />
          {STRINGS.TITLE_LINE2_PREFIX}<span className="highlight-blue">{STRINGS.TITLE_HIGHLIGHT}</span>.
        </h1>
        <p className="auth-home-subtitle">
          {STRINGS.SUBTITLE_LINE1}<br />
          {STRINGS.SUBTITLE_LINE2}
        </p>
        <div className="auth-home-logo">
          <span className="logo-tech">{STRINGS.BRAND_TECH}</span>
          <span className="logo-guild">{STRINGS.BRAND_GUILD}</span>
        </div>
      </div>
    </div>
  );
}
