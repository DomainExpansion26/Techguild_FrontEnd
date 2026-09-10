import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Cards,
  DashboardLayout,
  PrimaryButton,
  SecondaryButton,
  TextInput,
  Toggle,
} from "@/Components";
import { useAuth } from "@/context/AuthContext";
import { showSnackbar } from "@/store";
import authApi from "@/features/auth/api/authApi";
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

export default function AccountSecurity() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const [smsBackup, setSmsBackup] = useState(false);
  const [email, setEmail] = useState(user?.email || "arjun.mehta@gmail.com");
  const emailTouchedRef = useRef(false);
  const [currentPassword, setCurrentPassword] = useState("MySecurePass123");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  // Auth session can resolve after mount on fresh reload — fill the email
  // then, unless the user already typed something.
  useEffect(() => {
    if (user?.email && !emailTouchedRef.current) {
      setEmail(user.email);
    }
  }, [user?.email]);

  const handleSignOut = async () => {
    try {
      await authApi.logout().catch(() => {});
    } finally {
      logout();
      dispatch(showSnackbar({
        message: "You have been signed out.",
        type: "info",
      }));
      navigate("/login");
    }
  };
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
      containerClass="settings-layout-collapsed-nav account-security-layout"
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
            variant="base"
            className="settings-section account-security-section"
            padding="24px 28px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Email Address</h2>
              <p className="settings-section-desc">
                Your login email and where we send important notifications.
              </p>
            </div>
            <div className="settings-form-grid account-security-grid">
              <div className="settings-label">
                <div>Current Email</div>
                <p className="settings-caption">
                  <span className="account-security-verified">Verified</span>
                </p>
              </div>
              <div className="account-security-field-control">
                <div className="account-security-inline-control">
                  <TextInput
                    value={email}
                    onChange={(e) => {
                      emailTouchedRef.current = true;
                      setEmail(e.target.value);
                    }}
                    className="settings-input account-security-email-input"
                  />
                  <SecondaryButton text="Change Email" />
                </div>
              </div>
            </div>
          </Cards>

          <Cards
            variant="base"
            className="settings-section account-security-section"
            padding="24px 28px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Password</h2>
              <p className="settings-section-desc">
                Use a strong, unique password for your TechGuild account.
              </p>
            </div>
            <div className="settings-form-grid account-security-grid">
              <div className="settings-label">
                <div>Current Password</div>
              </div>
              <div className="account-security-field-control">
                <div className="account-security-password-input">
                  <TextInput
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="settings-input"
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
              </div>
              <div className="settings-label">
                <div>New Password</div>
              </div>
              <div className="account-security-field-control">
                <TextInput
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="settings-input"
                />
              </div>
              <div className="settings-label">
                <div>Confirm Password</div>
              </div>
              <div className="account-security-field-control">
                <TextInput
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="settings-input"
                />
              </div>
            </div>
            <div className="account-security-actions">
              <PrimaryButton
                text="Update Password"
                className="account-security-primary-button"
                onClick={() => {}}
              />
            </div>
          </Cards>

          <Cards
            variant="base"
            className="settings-section account-security-section"
            padding="24px 28px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Two-Factor Authentication</h2>
              <p className="settings-section-desc">
                Add an extra layer of security to your account.
              </p>
            </div>
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
                <SecondaryButton text="Manage" />
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
                <SecondaryButton text="Setup" />
              </div>
            </div>
          </Cards>

          <Cards
            variant="base"
            className="settings-section account-security-section"
            padding="24px 28px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Active Sessions</h2>
              <p className="settings-section-desc">
                Devices currently logged in to your account.
              </p>
            </div>
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
                      <SecondaryButton
                        text="Revoke"
                        className="account-security-revoke"
                      />
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

          <Cards
            className="account-security-signout" padding="20px 28px">
            <div className="account-security-signout-content">
              <div>
                <h2>Sign Out</h2>
                <p>You will be signed out of this device immediately.</p>
              </div>
              <SecondaryButton
                text="Sign Out"
                icon={<LogOut width={14} height={14} />}
                className="account-security-signout-button"
                onClick={handleSignOut}
              />
            </div>
          </Cards>
        </main>
      </div>
    </DashboardLayout>
  );
}
