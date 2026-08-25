import { useState } from "react";
import { Cards, DashboardLayout, Toggle } from "@/Components";
import {
  CircleCheck,
  Eye,
  EyeOff,
  Laptop,
  LogOut,
  Monitor,
  Smartphone,
} from "@/Components/icons";
import "./AccountSecurity.css";

function Field({ label, children, hint }) {
  return (
    <>
      <div className="settings-label">
        <div>{label}</div>
        {hint && <p className="settings-caption">{hint}</p>}
      </div>
      <div className="account-security-field-control">{children}</div>
    </>
  );
}

function SectionHeader({ title, description }) {
  return (
    <div className="settings-section-header">
      <h2 className="settings-section-title">{title}</h2>
      <p className="settings-section-desc">{description}</p>
    </div>
  );
}

export default function AccountSecurity() {
  const [smsBackup, setSmsBackup] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const sessions = [
    {
      device: "MacBook Pro — Chrome",
      detail: "Pune, India · Now",
      icon: Laptop,
      current: true,
    },
    {
      device: "iPhone 15 — Safari",
      detail: "Pune, India · 2 hours ago",
      icon: Smartphone,
    },
    {
      device: "Windows PC — Edge",
      detail: "Mumbai, India · 3 days ago",
      icon: Monitor,
    },
  ];

  return (
    <DashboardLayout
      containerClass="account-security-layout"
      activeSettingsTab="account-security"
    >
      <div className="settings-scroll-area">
        <main className="settings-container account-security-container">
          <header className="settings-header">
            <h1 className="settings-page-title">Account &amp; Security</h1>
            <p className="settings-page-subtitle">
              Manage your login credentials, two-factor authentication, and
              active sessions.
            </p>
          </header>

          <Cards
            className="settings-section account-security-section"
            padding="24px 28px"
          >
            <SectionHeader
              title="Email Address"
              description="Your login email and where we send important notifications."
            />
            <div className="settings-form-grid account-security-grid">
              <Field
                label="Current Email"
                hint={
                  <span className="account-security-verified">Verified</span>
                }
              >
                <div className="account-security-inline-control">
                  <input
                    className="settings-input account-security-email-input"
                    defaultValue="arjun.mehta@gmail.com"
                  />
                  <button
                    type="button"
                    className="account-security-secondary-button"
                  >
                    Change Email
                  </button>
                </div>
              </Field>
            </div>
          </Cards>

          <Cards
            className="settings-section account-security-section"
            padding="24px 28px"
          >
            <SectionHeader
              title="Password"
              description="Use a strong, unique password for your TechGuild account."
            />
            <div className="settings-form-grid account-security-grid">
              <Field label="Current Password">
                <div className="account-security-password-input">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    className="settings-input"
                    defaultValue="MySecurePass123"
                  />
                  <button
                    type="button"
                    className="account-security-password-visibility"
                    aria-label={
                      showCurrentPassword
                        ? "Hide current password"
                        : "Show current password"
                    }
                    aria-pressed={showCurrentPassword}
                    onClick={() =>
                      setShowCurrentPassword((visible) => !visible)
                    }
                  >
                    {showCurrentPassword ? (
                      <EyeOff width={14} height={14} />
                    ) : (
                      <Eye width={14} height={14} />
                    )}
                  </button>
                </div>
              </Field>
              <div className="settings-divider" />
              <Field label="New Password">
                <input type="password" className="settings-input" />
              </Field>
              <div className="settings-divider" />
              <Field label="Confirm Password">
                <input type="password" className="settings-input" />
              </Field>
            </div>
            <div className="account-security-actions">
              <button type="button" className="account-security-primary-button">
                Update Password
              </button>
            </div>
          </Cards>

          <Cards
            className="settings-section account-security-section"
            padding="24px 28px"
          >
            <SectionHeader
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account."
            />
            {/* Authenticator App Row */}
            <div className="account-security-setting-row">
              <div className="account-security-left-group">
                <div>
                  <div className="account-security-row-title">
                    Authenticator App
                  </div>
                  <p>Use Google Authenticator or Authy</p>
                </div>
                <span className="account-security-enabled">
                  <CircleCheck width={13} height={13} /> Enabled
                </span>
              </div>
              <div className="account-security-row-action">
                <button
                  type="button"
                  className="account-security-secondary-button"
                >
                  Manage
                </button>
              </div>
            </div>

            {/* SMS Backup Row */}
            <div className="account-security-setting-row">
              <div className="account-security-left-group">
                <div>
                  <div className="account-security-row-title">SMS Backup</div>
                  <p>Receive a one-time code by SMS</p>
                </div>
                <Toggle
                  active={smsBackup}
                  onChange={() => setSmsBackup((enabled) => !enabled)}
                  ariaLabel="Enable SMS backup"
                />
              </div>
              <div className="account-security-row-action">
                <button
                  type="button"
                  className="account-security-secondary-button"
                >
                  Setup
                </button>
              </div>
            </div>
          </Cards>

          <Cards
            className="settings-section account-security-section"
            padding="24px 28px"
          >
            <SectionHeader
              title="Active Sessions"
              description="Devices currently logged in to your account."
            />
            <div className="account-security-sessions">
              {sessions.map(
                ({ device, detail, icon: SessionIcon, current }) => (
                  <div className="account-security-session" key={device}>
                    <div className="account-security-device">
                      <span className="account-security-device-icon">
                        <SessionIcon width={16} height={16} />
                      </span>
                      <span>
                        <b>{device}</b>
                        <small>{detail}</small>
                      </span>
                    </div>
                    {current ? (
                      <span className="account-security-current">Current</span>
                    ) : (
                      <button type="button" className="account-security-revoke">
                        Revoke
                      </button>
                    )}
                  </div>
                ),
              )}
            </div>
            <button
              type="button"
              className="account-security-revoke account-security-signout-others"
            >
              Sign out of all other sessions
            </button>
          </Cards>

          <Cards className="account-security-signout" padding="20px 28px">
            <div className="account-security-signout-content">
              <div>
                <h2>Sign Out</h2>
                <p>You will be signed out of this device immediately.</p>
              </div>
              <button type="button" className="account-security-signout-button">
                <LogOut width={14} height={14} /> Sign Out
              </button>
            </div>
          </Cards>
        </main>
      </div>
    </DashboardLayout>
  );
}
