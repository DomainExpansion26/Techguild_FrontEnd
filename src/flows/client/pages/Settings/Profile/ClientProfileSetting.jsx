import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { DashboardLayout, Cards } from "@/Components";
import { useAuth } from "@/context/AuthContext";
import { profileApi } from "@/features/profile/api/profileApi";
import { showSnackbar } from "@/store";
import Icon from "@/Components/icons/Icon";
import "@/flows/individual/pages/Settings/settings.css";
import "@/flows/individual/pages/Settings/Profile/ProfileSetting.css";
import "./ClientProfileSetting.css";

function Field({ label, hint, children, className = "" }) {
  return (
    <>
      <div className={`settings-label ${className}`}>
        <div>{label}</div>
        {hint && <p className="settings-caption">{hint}</p>}
      </div>
      <div>{children}</div>
    </>
  );
}

export default function ClientProfileSetting() {
  const dispatch = useDispatch();
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Form State
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const fetchClientProfile = async () => {
    setLoading(true);
    try {
      const res = await profileApi.getProfile();
      const client = res?.client || res?.data?.client || {};

      if (client) {
        if (client.company_name) setCompanyName(client.company_name);
        if (client.industry) setIndustry(client.industry);
        if (client.website_url) setWebsiteUrl(client.website_url);
        if (client.team_size) setTeamSize(client.team_size);
        if (client.budget_range) setBudgetRange(client.budget_range);
        if (client.timezone) setTimezone(client.timezone);
        if (client.logo_url) setLogoUrl(client.logo_url);

        const cityCountry = [client.city, client.country].filter(Boolean).join(", ");
        if (cityCountry) setLocation(cityCountry);
      }

      if (!client.company_name && user?.name) {
        setCompanyName(user.name);
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
    }
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      const [city = "", country = ""] = location.split(",").map((s) => s.trim());

      await profileApi.saveClientProfile({
        company_name: companyName,
        industry,
        website_url: websiteUrl,
        team_size: teamSize,
        budget_range: budgetRange,
        timezone,
        city,
        country,
        logo_url: logoUrl || "",
        phone: user?.phone || "+919999999999",
        project_types: ["fixed", "milestone"],
      }, true);

      updateUser({
        name: companyName,
        avatar: logoUrl || companyName.charAt(0).toUpperCase(),
      });

      dispatch(showSnackbar({
        message: "Company profile updated and saved to API successfully!",
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

  const initials = companyName
    ? companyName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "C";

  return (
    <DashboardLayout activeSettingsTab="profile" containerClass="profile-settings-layout">
      <div className="settings-scroll-area">
        <div className="settings-container profile-settings-container">
          <header className="settings-header">
            <h1 className="settings-page-title">Company Profile</h1>
            <p className="settings-page-subtitle">
              Manage your company information, branding, and hiring preferences live from TechGuild API.
            </p>
          </header>

          <Cards className="settings-section profile-settings-section" padding="32px">
            <div className="settings-section-header">
              <h2 className="settings-section-title">Organization Details</h2>
              <p className="settings-section-desc">
                Provide essential company information visible to freelancers and agencies.
              </p>
            </div>

            <div className="settings-form-grid">
              <Field label="Company Logo" className="pt-2">
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
                      disabled={uploadingLogo}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploadingLogo ? "Uploading..." : "Upload Logo"}
                    </button>
                    {logoUrl && (
                      <button
                        type="button"
                        className="profile-remove-button"
                        onClick={() => {
                          setLogoUrl("");
                          updateUser({ avatar: null });
                        }}
                      >
                        Remove
                      </button>
                    )}
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
                  placeholder="e.g. Acme Technologies Inc."
                />
              </Field>

              <div className="settings-divider" />
              <Field label="Industry">
                <input
                  className="settings-input"
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Software, Fintech, Healthcare"
                />
              </Field>

              <div className="settings-divider" />
              <Field label="Website URL">
                <input
                  className="settings-input"
                  id="websiteUrl"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://company.example.com"
                />
              </Field>

              <div className="settings-divider" />
              <Field label="Company Size">
                <input
                  className="settings-input"
                  id="teamSize"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  placeholder="e.g. 10-50 employees"
                />
              </Field>

              <div className="settings-divider" />
              <Field label="Location">
                <input
                  className="settings-input"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bengaluru, India"
                />
              </Field>

              <div className="settings-divider" />
              <Field label="Timezone">
                <input
                  className="settings-input"
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="e.g. Asia/Kolkata"
                />
              </Field>
            </div>

            <div className="settings-actions">
              <button
                type="button"
                className="settings-btn-secondary"
                onClick={fetchClientProfile}
                disabled={saving}
              >
                Reset
              </button>
              <button
                type="button"
                className="settings-btn-primary"
                onClick={handleSaveChanges}
                disabled={saving}
              >
                {saving ? "Saving Changes..." : "Save Company Profile"}
              </button>
            </div>
          </Cards>
        </div>
      </div>
    </DashboardLayout>
  );
}

