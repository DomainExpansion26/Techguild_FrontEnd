// Modules/Individual/Screen/Pages/Settings/Privacy/Privacy.jsx
import { useState, useEffect } from "react";
import { DashboardLayout, Cards, Toggle, SecondaryButton } from "@/Components";
import { Download, ArrowRight, Check } from "@/Components/icons";
import "../settings.css";
import "./ClientPrivacySetting.css";

const visibilityOptions = [
  { value: "public", label: "Public" },
  { value: "invited", label: "Only invited freelancers/agencies" },
];

export default function ClientPrivacySetting() {
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [visibilityOpen, setVisibilityOpen] = useState(false);
  // State for the toggles, defaulting to match the Figma design
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const [showProjectHistory, setShowProjectHistory] = useState(true);
  const [showReviewCount, setShowReviewCount] = useState(true);
  const [appearInSearch, setAppearInSearch] = useState(true);
  const [shareAnalytics, setShareAnalytics] = useState(false);
  const [personalizedRecs, setPersonalizedRecs] = useState(false);
  const [financialVisibility, setFinancialVisibility] = useState(true);

  useEffect(() => {
    if (!visibilityOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setVisibilityOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [visibilityOpen]);

  return (
    <DashboardLayout
      containerClass="settings-layout-collapsed-nav privacy-layout"
      activeSettingsTab="privacy"
    >
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
            variant="base"
            className="settings-section privacy-settings-section"
            padding="32px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Profile Visibility</h2>
            </div>

            {/* Profile visible to */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <div>
                <div className="fw-bold small">Profile visible to</div>
                <div className="text-muted small">
                  Who can view your profile
                </div>
              </div>
              <div className="visibility-select-wrap">
                <SecondaryButton
                  text="Select"
                  className="primary-secondary-btn"
                  onClick={() => setVisibilityOpen((prev) => !prev)}
                  aria-haspopup="menu"
                  aria-expanded={visibilityOpen}
                />
                {visibilityOpen && (
                  <>
                    <div
                      className="visibility-menu-backdrop"
                      onClick={() => setVisibilityOpen(false)}
                    />
                    <div
                      className="visibility-menu"
                      role="menu"
                      aria-label="Profile visibility"
                    >
                      {visibilityOptions.map((option) => {
                        const isActive = profileVisibility === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            role="menuitemradio"
                            aria-checked={isActive}
                            className={`visibility-menu-item ${isActive ? "active" : ""}`}
                            onClick={() => {
                              setProfileVisibility(option.value);
                              setVisibilityOpen(false);
                            }}
                          >
                            <span className="visibility-menu-check">
                              {isActive && (
                                <Check width={14} height={14} />
                              )}
                            </span>
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Show company details */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <div>
                <div className="fw-bold small">Show company details</div>
                <div className="text-muted small">
                  Company name, logo, industry
                </div>
              </div>
              <Toggle
                active={showCompanyDetails}
                onClick={() => setShowCompanyDetails(!showCompanyDetails)}
              />
            </div>

            {/* Show project history */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <div>
                <div className="fw-bold small">Show project history</div>
                <div className="text-muted small">
                  Past projects visible to freelancers/agencies
                </div>
              </div>
              <Toggle
                active={showProjectHistory}
                onClick={() => setShowProjectHistory(!showProjectHistory)}
              />
            </div>

            {/* Show review count */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <div>
                <div className="fw-bold small">Show review count</div>
                <div className="text-muted small">
                  Number of reviews received from freelancers/agencies
                </div>
              </div>
              <Toggle
                active={showReviewCount}
                onClick={() => setShowReviewCount(!showReviewCount)}
              />
            </div>

            {/* Appear in search results */}
            <div className="d-flex justify-content-between align-items-center py-3">
              <div>
                <div className="fw-bold small">Appear in search results</div>
                <div className="text-muted small">
                  Allow freelancers/agencies to find your profile
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
            variant="base"
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
            <div className="d-flex justify-content-between align-items-center py-1">
              <div>
                <div className="fw-bold small">Analytics & usage data</div>
                <div className="text-muted small">
                  Allow platform to collect usage for improvements
                </div>
              </div>
              <Toggle
                active={shareAnalytics}
                onClick={() => setShareAnalytics(!shareAnalytics)}
              />
            </div>

            {/* Personalised recommendations */}
            <div className="d-flex justify-content-between align-items-center py-1">
              <div>
                <div className="fw-bold small">
                  Personalised recommendations
                </div>
                <div className="text-muted small">
                  Suggest freelancers/agencies based on past hires
                </div>
              </div>
              <Toggle
                active={personalizedRecs}
                onClick={() => setPersonalizedRecs(!personalizedRecs)}
              />
            </div>

            {/* Financial data visibility */}
            <div className="d-flex justify-content-between align-items-center py-1">
              <div>
                <div className="fw-bold small">
                  Financial data visibility
                </div>
              </div>
              <Toggle
                active={financialVisibility}
                onClick={() => setFinancialVisibility(!financialVisibility)}
              />
            </div>

            {/* Download My Data Button */}
            <div className="pt-3">
              <SecondaryButton
                icon={<Download color={"Black"} width={14} height={14} />}
                text="Download My Data"
                iconPosition="left"
              />
            </div>
          </Cards>
        </div>
      </div>
    </DashboardLayout>
  );
}
