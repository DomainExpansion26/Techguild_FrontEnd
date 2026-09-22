import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  Info,
  ChevronDown,
} from "lucide-react";
import { DashboardLayout, Cards } from "@/Components";
import { useAuth } from "@/context/AuthContext";
import { profileApi } from "@/features/profile/api/profileApi";
import { showSnackbar } from "@/store";
import "../settings.css";
import "./ClientProfileSetting.css";

const INDUSTRY_OPTIONS = [
  "IT",
  "Software",
  "Fintech",
  "Healthcare",
  "Education",
  "Marketing",
  "Design",
  "Other",
];

function Field({ label, children, className = "" }) {
  return (
    <>
      <div className={`settings-label ${className}`}>
        <div>{label}</div>
      </div>
      <div>{children}</div>
    </>
  );
}

function VerifiedStep({ label, verified }) {
  return (
    <span className="profile-verify-step">
      {verified ? (
        <CheckCircle2 size={16} className="profile-verify-icon verified" />
      ) : (
        <AlertCircle size={16} className="profile-verify-icon pending" />
      )}
      <span className="profile-verify-label">{label}</span>
    </span>
  );
}

export default function ClientProfileSetting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Form State (matches Figma "Settings 18" rows)
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("IT");
  const [logoUrl, setLogoUrl] = useState("");
  const [showTrustPoints, setShowTrustPoints] = useState(true);
  const [verification, setVerification] = useState({
    email: true,
    phone: true,
    kyc: false,
  });

  const fetchClientProfile = async () => {
    setLoading(true);
    try {
      const res = await profileApi.getProfile();
      const client = res?.client || res?.data?.client || {};
      const profile = res?.data?.profile || res?.profile || {};

      if (client.company_name) setCompanyName(client.company_name);
      else if (user?.name) setCompanyName(user.name);
      if (client.industry) setIndustry(client.industry);
      if (client.logo_url) setLogoUrl(client.logo_url);

      setVerification({
        email: client.email_verified ?? profile.email_verified ?? true,
        phone: client.phone_verified ?? profile.phone_verified ?? true,
        kyc: client.kyc_verified ?? profile.kyc_verified ?? false,
      });

      if (typeof client.show_trust_points === "boolean") {
        setShowTrustPoints(client.show_trust_points);
      }
    } catch (err) {
      console.warn("Could not load client profile:", err);
      if (user?.name) setCompanyName(user.name);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientProfile();
  }, []);

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const res = await profileApi.uploadLogo(file);
      const url = res?.logo_url || res?.url || URL.createObjectURL(file);
      setLogoUrl(url);
      updateUser({ avatar: url });
      dispatch(showSnackbar({ message: "Company logo uploaded successfully!", type: "success" }));
    } catch (err) {
      console.error("Logo upload error:", err);
      const localUrl = URL.createObjectURL(file);
      setLogoUrl(localUrl);
      updateUser({ avatar: localUrl });
      dispatch(showSnackbar({ message: "Logo preview updated.", type: "info" }));
    } finally {
      setUploadingLogo(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveLogo = async () => {
    if (!logoUrl) return;
    try {
      await profileApi.deleteLogo();
    } catch (err) {
      console.warn("Could not delete logo on server:", err);
    }
    setLogoUrl("");
    updateUser({ avatar: null });
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      await profileApi.saveClientProfile({
        company_name: companyName,
        industry,
        logo_url: logoUrl || "",
        show_trust_points: showTrustPoints,
        phone: user?.phone || "+919999999999",
        project_types: ["fixed", "milestone"],
      }, true);

      updateUser({
        name: companyName,
        avatar: logoUrl || companyName.charAt(0).toUpperCase(),
      });

      dispatch(showSnackbar({
        message: "Company profile updated successfully!",
        type: "success",
      }));
    } catch (err) {
      console.error("Failed to save client profile:", err);
      updateUser({ name: companyName });
      dispatch(showSnackbar({
        message: err?.message || "Company profile saved locally.",
        type: "info",
      }));
    } finally {
      setSaving(false);
    }
  };

  const verifiedCount = Object.values(verification).filter(Boolean).length;
  const verifiedPercent = Math.round((verifiedCount / 3) * 100);

  const initials = companyName
    ? companyName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "C";

  return (
    <DashboardLayout activeSettingsTab="profile" containerClass="profile-settings-layout">
      <div className="settings-scroll-area">
        <div className="settings-container profile-settings-container">
          <header className="settings-header">
            <h1 className="settings-page-title">Profile</h1>
            <p className="settings-page-subtitle">
              Control how you appear to Freelancers and Agencies on TechGuild.
            </p>
          </header>

          <Cards className="settings-section profile-settings-section" padding="32px">
            <div className="settings-section-header">
              <h2 className="settings-section-title">Personal Information</h2>
              <p className="settings-section-desc">
                Update your logo, company name, and other details.
              </p>
            </div>

            <div className="settings-form-grid">
              <Field label="Logo" className="pt-2">
                <div className="settings-photo-container">
                  <div
                    className="settings-avatar-large"
                    style={logoUrl ? { backgroundImage: `url(${logoUrl})`, backgroundSize: "cover", color: "transparent" } : {}}
                  >
                    {!logoUrl && initials}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  <div className="settings-photo-actions">
                    <button
                      type="button"
                      className="profile-upload-button"
                      disabled={uploadingLogo || loading}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={14} />
                      {uploadingLogo ? "Uploading..." : "Upload Logo"}
                    </button>
                    <button
                      type="button"
                      className="profile-remove-button"
                      onClick={handleRemoveLogo}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Field>

              <div className="settings-divider" />
              <Field label="Company Name">
                <input
                  className="settings-input"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Nexora Solutions"
                  disabled={loading}
                />
              </Field>

              <div className="settings-divider" />
              <Field label="Industry">
                <div className="settings-select-wrapper">
                  <select
                    className="settings-input settings-select"
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    disabled={loading}
                  >
                    {INDUSTRY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="settings-select-icon" />
                </div>
              </Field>

              <div className="settings-divider" />
              <Field label="Verification Status">
                <div className="profile-verification">
                  <div className="profile-verification-progress">
                    <div className="profile-progress-track">
                      <div
                        className="profile-progress-fill"
                        style={{ width: `${verifiedPercent}%` }}
                      />
                    </div>
                    <span className="profile-progress-label">
                      {verifiedPercent}% Complete
                    </span>
                  </div>

                  <div className="profile-verification-steps">
                    <VerifiedStep label="Email Verified" verified={verification.email} />
                    <span className="profile-verify-connector" />
                    <VerifiedStep label="Phone Verified" verified={verification.phone} />
                    <span className="profile-verify-connector" />
                    <span className="profile-verify-step">
                      <AlertCircle size={16} className="profile-verify-icon pending" />
                      <span className="profile-verify-label">KYC/ID Verification</span>
                      {!verification.kyc && (
                        <span className="profile-verify-not">Not Verified</span>
                      )}
                    </span>
                    <button
                      type="button"
                      className="profile-verify-now"
                      onClick={() => navigate("/client/settings/account-security")}
                    >
                      Verify Now
                    </button>
                  </div>

                  <div className="profile-verification-banner">
                    <Info size={13} />
                    Complete all steps for full account verification
                  </div>
                </div>
              </Field>

              <div className="settings-divider" />
              <Field label="Show Trust Points & Rank to Freelancers">
                <button
                  type="button"
                  role="switch"
                  aria-checked={showTrustPoints}
                  aria-label="Show Trust Points and Rank to Freelancers"
                  className={`profile-trust-toggle${showTrustPoints ? " is-on" : ""}`}
                  onClick={() => setShowTrustPoints((v) => !v)}
                >
                  <span className="profile-trust-knob" />
                </button>
              </Field>
            </div>
          </Cards>

          <div className="profile-footer-actions">
            <button
              type="button"
              className="settings-btn-secondary"
              onClick={fetchClientProfile}
              disabled={saving || loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="settings-btn-primary"
              onClick={handleSaveChanges}
              disabled={saving || loading}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="settings-btn-primary"
              onClick={() => navigate("/client/settings/account-security")}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
