// Modules/Individual/Screen/Pages/Settings/BillingPayments/BillingPayments.jsx
import { useState } from "react";
import {
  DashboardLayout,
  Cards,
  SecondaryButton,
  TextInput,
} from "@/Components";
import "../settings.css";
import "./BillingPayments.css";

export default function BillingPayments() {
  const [payoutMethod, setPayoutMethod] = useState("SBI — ••••••4821");
  const [payoutSchedule, setPayoutSchedule] = useState("");
  const [taxId, setTaxId] = useState("29AABCU9603R1ZM");
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
            variant="base"
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
                <div className="d-flex align-items-center gap-3 payout-method-row">
                  <TextInput
                    type="text"
                    className="payout-method-container"
                    containerClassName="payout-method-wrap"
                    leftIcon={<span className="bank-badge-sbi">Bank</span>}
                    rightIcon={
                      <span className="text-success small fw-bold">
                        Primary
                      </span>
                    }
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value)}
                  />
                  <SecondaryButton text="Change" />
                </div>
              </div>

              {/* Payout Schedule */}
              <div className="settings-label">
                <div>Payout Schedule</div>
                <p className="settings-caption">
                  How often earnings are transferred
                </p>
              </div>
              <div className="settings-input-narrow">
                <TextInput
                  type="text"
                  className="settings-input"
                  placeholder="Select schedule"
                  value={payoutSchedule}
                  onChange={(e) => setPayoutSchedule(e.target.value)}
                />
              </div>
              
              {/* GST / Tax ID */}
              <div className="settings-label">
                <div>GST / Tax ID</div>
                <p className="settings-caption">
                  Required for invoicing above ₹5L
                </p>
              </div>
              <div className="settings-input-narrow">
                <TextInput
                  type="text"
                  className="settings-input"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                />
              </div>
            </div>
          </Cards>

          {/* ===========================================================
              SECTION 2: BILLING HISTORY
              =========================================================== */}
          <Cards
            variant="base"
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

