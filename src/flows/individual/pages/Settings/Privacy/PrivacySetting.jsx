// Modules/Individual/Screen/Pages/Settings/Privacy/Privacy.jsx
import { useState } from "react";
import { DashboardLayout, Cards, Toggle } from "@/Components";
import "../settings.css";
import "./PrivacySetting.css"; // page‑specific styles

export default function Privacy() {
  // State for the toggles, defaulting to match the screenshot
  const [showEarnings, setShowEarnings] = useState(false);
  const [showReviewCount, setShowReviewCount] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [appearInSearch, setAppearInSearch] = useState(true);
  const [shareAnalytics, setShareAnalytics] = useState(true);
  const [personalizedRecs, setPersonalizedRecs] = useState(true);

  return (
    <DashboardLayout containerClass="settings-layout-collapsed-nav privacy-layout">
      <div className="settings-scroll-area">
        <div className="settings-container privacy-settings-container">
          {/* Header */}
          <div className="settings-header">
            <h1 className="settings-page-title">Privacy</h1>
            <p className="settings-page-subtitle">
              Control your visibility and how TechGuild uses your data.
            </p>
          </div>

          {/* ===========================================================
              SECTION 1: PROFILE VISIBILITY
              =========================================================== */}
          <Cards
            className="settings-section privacy-settings-section"
            padding="32px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Profile Visibility</h2>
              <p className="settings-section-desc text-muted small">
                Control what others can see on your public profile.
              </p>
            </div>

            {/* Profile visible to */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <div>
                <div className="fw-bold small">Profile visible to</div>
                <div className="text-muted small">
                  Who can view your profile
                </div>
              </div>
              <button
                type="button"
                className="btn btn-light border rounded-3 px-4 py-2 shadow-sm"
              >
                Select
              </button>
            </div>

            {/* Show earnings on profile */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <div>
                <div className="fw-bold small">Show earnings on profile</div>
                <div className="text-muted small">
                  Display your total earnings to visitors
                </div>
              </div>
              <Toggle
                active={showEarnings}
                onClick={() => setShowEarnings(!showEarnings)}
              />
            </div>

            {/* Show review count */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <div>
                <div className="fw-bold small">Show review count</div>
                <div className="text-muted small">
                  Display your total review count
                </div>
              </div>
              <Toggle
                active={showReviewCount}
                onClick={() => setShowReviewCount(!showReviewCount)}
              />
            </div>

            {/* Show online status */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <div>
                <div className="fw-bold small">Show online status</div>
                <div className="text-muted small">
                  Let others see when you are active
                </div>
              </div>
              <Toggle
                active={showOnlineStatus}
                onClick={() => setShowOnlineStatus(!showOnlineStatus)}
              />
            </div>

            {/* Appear in search results */}
            <div className="d-flex justify-content-between align-items-center py-3">
              <div>
                <div className="fw-bold small">Appear in search results</div>
                <div className="text-muted small">
                  Allow clients to discover your profile
                </div>
              </div>
              <Toggle
                active={appearInSearch}
                onClick={() => setAppearInSearch(!appearInSearch)}
              />
            </div>
          </Cards>

          {/* ===========================================================
              SECTION 2: DATA & PRIVACY
              =========================================================== */}
          <Cards
            className="settings-section privacy-settings-section"
            padding="32px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Data & Privacy</h2>
              <p className="settings-section-desc text-muted small">
                Manage how TechGuild uses your data.
              </p>
            </div>

            {/* Analytics & usage data */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <div>
                <div className="fw-bold small">Analytics & usage data</div>
                <div className="text-muted small">
                  Help improve TechGuild by sharing usage data
                </div>
              </div>
              <Toggle
                active={shareAnalytics}
                onClick={() => setShareAnalytics(!shareAnalytics)}
              />
            </div>

            {/* Personalised recommendations */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <div>
                <div className="fw-bold small">
                  Personalised recommendations
                </div>
                <div className="text-muted small">
                  Show tailored project and client suggestions
                </div>
              </div>
              <Toggle
                active={personalizedRecs}
                onClick={() => setPersonalizedRecs(!personalizedRecs)}
              />
            </div>

            {/* Download My Data Button */}
            <div className="pt-3">
              <button
                type="button"
                className="btn btn-light border rounded-3 px-4 py-2 shadow-sm"
              >
                {/* Using standard bootstrap icon to avoid breaking your build again */}
                <i className="bi bi-download me-2"></i> Download My Data
              </button>
            </div>
          </Cards>
        </div>
      </div>
    </DashboardLayout>
  );
}

