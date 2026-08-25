// Modules/Individual/Screen/Pages/Settings/BillingPayments/BillingPayments.jsx
import { DashboardLayout, Cards } from "@/Components";
import "../settings.css";
import "./BillingPayments.css";

export default function BillingPayments() {
  return (
    <DashboardLayout
      containerClass="settings-layout-collapsed-nav billing-payments-layout"
    >
      <div className="settings-scroll-area">
        <div className="settings-container billing-settings-container">
          {/* Header */}
          <div className="settings-header">
            <h1 className="settings-page-title">Billing & Payments</h1>
            <p className="settings-page-subtitle">
              Manage your payout method, tax details, and billing history.
            </p>
          </div>

          {/* ===========================================================
              SECTION 1: PAYOUT SETTINGS
              =========================================================== */}
          <Cards
            className="settings-section billing-settings-section"
            padding="32px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Payout Settings</h2>
              <p className="settings-section-desc">
                Where TechGuild sends your earnings.
              </p>
            </div>

            <div className="settings-form-grid">
              {/* Payout Method */}
              <div className="settings-label">
                <div>Payout Method</div>
                <p className="settings-caption">
                  Payments are released after project completion
                </p>
              </div>
              <div>
                <div className="d-flex align-items-center gap-3">
                  <div className="payout-method-container flex-grow-1">
                    <div className="bank-badge-sbi">Bank</div>
                    <span className="fw-bold small">SBI — ••••••4821</span>
                    <span className="text-success small fw-bold ms-auto">
                      Primary
                    </span>
                  </div>
                  <button type="button" className="settings-btn-secondary">
                    Change
                  </button>
                </div>
              </div>

              <div className="settings-divider" />

              {/* Payout Schedule */}
              <div className="settings-label">
                <div>Payout Schedule</div>
                <p className="settings-caption">
                  How often earnings are transferred
                </p>
              </div>
              <div>
                <input
                  type="text"
                  className="settings-input"
                  placeholder="Select schedule"
                />
              </div>

              <div className="settings-divider" />

              {/* GST / Tax ID */}
              <div className="settings-label">
                <div>GST / Tax ID</div>
                <p className="settings-caption">
                  Required for invoicing above ₹5L
                </p>
              </div>
              <div>
                <input
                  type="text"
                  className="settings-input"
                  defaultValue="29AABCU9603R1ZM"
                />
              </div>
            </div>
          </Cards>

          {/* ===========================================================
              SECTION 2: BILLING HISTORY
              =========================================================== */}
          <Cards
            className="settings-section billing-settings-section"
            padding="32px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Billing History</h2>
              <p className="settings-section-desc">
                All your TechGuild subscription and fee invoices.
              </p>
            </div>

            {/* Empty state to match the screenshot card area */}
            <div className="py-5 d-flex justify-content-center align-items-center">
              <p className="text-muted small mb-0">
                No billing history available yet.
              </p>
            </div>
          </Cards>
        </div>
      </div>
    </DashboardLayout>
  );
}
