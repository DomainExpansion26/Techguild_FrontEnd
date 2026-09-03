// Modules/Individual/Screen/Pages/Settings/DeactivateAccount/DeactivateAccount.jsx
import { DashboardLayout, Cards, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import "../settings.css";
import "./DeactivateAccount.css";

export default function DeactivateAccount() {
  return (
    <DashboardLayout
      containerClass="settings-layout-collapsed-nav deactivate-account-layout"
    >
      <div className="settings-scroll-area">
        <div className="settings-container deactivate-settings-container">
          {/* Header */}
          <div className="settings-header">
            <h1 className="settings-page-title">Deactivate Your Account</h1>
            <p className="settings-page-subtitle">
              Irreversible actions — proceed with caution.
            </p>
          </div>

          {/* ===========================================================
              CARD 1: DEACTIVATE ACCOUNT
              Figma: #FEF2F2 @ 60%, border #FECACA
              =========================================================== */}
          <Cards
            variant="base"
            className="settings-section card-danger-custom deactivate-settings-section"
            padding="32px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Deactivate Account</h2>
              <p className="settings-section-desc">
                Temporarily suspend your account. You can reactivate at any
                time.
              </p>
            </div>
            <div className="deactivate-card-row">
              <p className="deactivate-note mb-0">
                Your profile will be hidden from clients and search results.
              </p>
              <SecondaryButton
                text="Deactivate Account"
                className="deactivate-outline-btn"
              />
            </div>
          </Cards>

          {/* ===========================================================
              CARD 2: DELETE ACCOUNT
              =========================================================== */}
          <Cards
            variant="base"
            className="settings-section card-danger-custom deactivate-settings-section"
            padding="32px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Delete Account</h2>
              <p className="settings-section-desc">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <div className="deactivate-card-row">
              <div className="deactivate-warning">
                <Icon
                  name="TriangleAlert"
                  size={16}
                  color="#DC2626"
                  strokeWidth={1.33}
                  className="deactivate-warning-icon"
                />
                <p className="deactivate-note mb-0">
                  All projects, earnings history, reviews, and data will be{" "}
                  <br className="d-none d-md-block" />
                  permanently erased. <br className="d-none d-md-block" /> This
                  cannot be recovered.
                </p>
              </div>
              <SecondaryButton
                text="Delete My Account"
                className="delete-account-btn"
              />
            </div>
          </Cards>
        </div>
      </div>
    </DashboardLayout>
  );
}
