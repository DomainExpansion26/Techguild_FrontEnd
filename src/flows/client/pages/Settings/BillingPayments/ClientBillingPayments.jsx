// Modules/Individual/Screen/Pages/Settings/BillingPayments/BillingPayments.jsx
import { useState } from "react";
import {
  DashboardLayout,
  Cards,
  SecondaryButton,
  TextInput,
  Toggle,
  Dropdown,
} from "@/Components";
import "../settings.css";
import "./ClientBillingPayments.css";

export default function ClientBillingPayments() {
  const [paymentMethod, setPaymentMethod] = useState("SBI — ••••••4821");
  const [escrowFunding, setEscrowFunding] = useState("auto");
  const [currency, setCurrency] = useState("INR");
  return (
    <DashboardLayout
      containerClass="settings-layout-collapsed-nav billing-payments-layout"
      activeSettingsTab="billing-payments"
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
              SECTION 1: FINANCE & PAYMENTS
              =========================================================== */}
          <Cards
            variant="base"
            className="settings-section billing-settings-section"
            padding="32px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Finance & Payments</h2>
            </div>

            <div className="settings-form-grid">
              {/* Payment Methods */}
              <div className="settings-label">
                <div>Payment Methods</div>
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
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <SecondaryButton text="Change" />
                </div>
              </div>

              {/* Escrow Funding */}
              <div className="settings-label">
                <div>Escrow Funding</div>
              </div>
              <div className="escrow-options">
                <div className="escrow-option">
                  <Toggle
                    active={escrowFunding === "auto"}
                    onClick={() => setEscrowFunding("auto")}
                  />
                  <span>Auto Fund Milestones</span>
                </div>
                <div className="escrow-option">
                  <Toggle
                    active={escrowFunding === "manual"}
                    onClick={() => setEscrowFunding("manual")}
                  />
                  <span>Manual Funding</span>
                </div>
              </div>

              {/* Currency Selection */}
              <div className="settings-label">
                <div>Currency Selection</div>
              </div>
              <div className="currency-select-wrap">
                <Dropdown
                  className="settings-input"
                  placeholder="Select currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  options={[
                    { value: "INR", label: "INR" },
                    { value: "USD", label: "USD" },
                    { value: "EUR", label: "EUR" },
                    { value: "GBP", label: "GBP" },
                  ]}
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
