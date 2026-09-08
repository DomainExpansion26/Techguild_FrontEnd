import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { DashboardLayout, Cards, Toggle } from "@/Components";
import { useAuth } from "@/context/AuthContext";
import { profileApi } from "@/features/profile/api/profileApi";
import { showSnackbar } from "@/store";
import Icon from "@/Components/icons/Icon";
import "../settings.css";
import "./ProfileSetting.css";

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

export default function ProfileSetting() {
  const dispatch = useDispatch();
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [languages, setLanguages] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [hoursPerWeek, setHoursPerWeek] = useState("40");

  // Fetch live profile from backend API
  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const res = await profileApi.getProfile();
      const profile = res?.individual || res?.data?.individual || res || {};

      if (profile) {
        if (profile.headline) setHeadline(profile.headline);
        if (profile.bio) setBio(profile.bio);
        if (profile.portfolio_url) setWebsite(profile.portfolio_url);
        if (profile.avatar_url) setAvatarUrl(profile.avatar_url);
        if (profile.timezone) setTimezone(profile.timezone);
        if (profile.preferred_language) setLanguages(profile.preferred_language);
        if (profile.availability) {
          setIsAvailable(profile.availability !== "unavailable");
        }

        const cityCountry = [profile.city, profile.country].filter(Boolean).join(", ");
        if (cityCountry) setLocation(cityCountry);
      }

      const initialName = user?.name || (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : "") || (user?.email ? user.email.split("@")[0] : "");
      setFullName(initialName);
      setUsername(user?.username || (user?.email ? user.email.split("@")[0] : ""));
    } catch (err) {
      console.warn("Could not fetch profile from API, using auth session:", err);
      const initialName = user?.name || (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : "") || (user?.email ? user.email.split("@")[0] : "");
      setFullName(initialName);
      setUsername(user?.username || (user?.email ? user.email.split("@")[0] : ""));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const res = await profileApi.uploadAvatar(file);
      const uploadedUrl = res?.avatar_url || res?.url || URL.createObjectURL(file);
      setAvatarUrl(uploadedUrl);
      updateUser({ avatar: uploadedUrl });
      dispatch(showSnackbar({ message: "Profile photo uploaded successfully!", type: "success" }));
    } catch (err) {
      console.error("Failed to upload avatar:", err);
      // Local preview fallback
      const localUrl = URL.createObjectURL(file);
      setAvatarUrl(localUrl);
      updateUser({ avatar: localUrl });
      dispatch(showSnackbar({ message: "Avatar preview updated.", type: "info" }));
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      await profileApi.deleteAvatar();
    } catch {
      // ignore
    }
    setAvatarUrl("");
    updateUser({ avatar: null });
    dispatch(showSnackbar({ message: "Profile photo removed.", type: "info" }));
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      const [city = "", country = ""] = location.split(",").map((s) => s.trim());

      await profileApi.saveIndividualProfile({
        headline,
        bio,
        portfolio_url: website,
        timezone,
        preferred_language: languages,
        city,
        country,
        availability: isAvailable ? "available" : "unavailable",
      }, true);

      // Update auth context so headers, navbar, and layouts immediately show the live name & details
      updateUser({
        name: fullName,
        username,
        headline,
        location,
        timezone,
        avatar: avatarUrl || (fullName ? fullName.charAt(0).toUpperCase() : "U"),
      });

      dispatch(showSnackbar({
        message: "Profile updated and saved to API successfully!",
        type: "success",
      }));
    } catch (err) {
      console.error("Save profile error:", err);
      // Still update local context so user experience is not blocked
      updateUser({
        name: fullName,
        username,
        headline,
        location,
        timezone,
      });
      dispatch(showSnackbar({
        message: err?.message || "Profile updated locally.",
        type: "info",
      }));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    fetchProfileData();
    dispatch(showSnackbar({ message: "Changes reverted.", type: "info" }));
  };

  const initials = fullName
    ? fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <DashboardLayout
      activeSettingsTab="profile"
      containerClass="profile-settings-layout"
    >
      <div className="settings-scroll-area">
        <div className="settings-container profile-settings-container">
          <header className="settings-header">
            <h1 className="settings-page-title">Profile Settings</h1>
            <p className="settings-page-subtitle">
              Manage your personal information, headline, and availability received live from TechGuild API.
            </p>
          </header>

          <Cards
            className="settings-section profile-settings-section"
            padding="32px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Personal Information</h2>
              <p className="settings-section-desc">
                Update your name, headline, and public-facing details.
              </p>
            </div>

            <div className="settings-form-grid">
              <Field label="Profile Photo" className="pt-2">
                <div className="settings-photo-container">
                  <div
                    className="settings-avatar-large"
                    aria-label={fullName || "User Profile"}
                    style={avatarUrl ? { backgroundImage: `url(${avatarUrl})`, backgroundSize: "cover", color: "transparent" } : {}}
                  >
                    {!avatarUrl && initials}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                  <div className="settings-photo-actions">
                    <button
                      type="button"
                      className="profile-upload-button"
                      disabled={uploadingPhoto}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploadingPhoto ? "Uploading..." : "Upload Photo"}
                    </button>
                    {avatarUrl && (
                      <button
                        type="button"
                        className="profile-remove-button"
                        onClick={handleRemovePhoto}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </Field>

              <div className="settings-divider" />
              <Field label="Full Name">
                <input
                  className="settings-input"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </Field>

              <div className="settings-divider" />
              <Field label="Username" hint={`techguild.com/u/${username || "username"}`}>
                <input
                  className="settings-input"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="yourusername"
                />
              </Field>

              <div className="settings-divider" />
              <Field label="Professional Headline">
                <input
                  className="settings-input"
                  id="headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Senior Full-Stack Engineer · React, Go, Node.js"
                />
              </Field>

              <div className="settings-divider" />
              <Field label="Location">
                <input
                  className="settings-input"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Mumbai, India"
                />
              </Field>

              <div className="settings-divider" />
              <Field label="Timezone">
                <input
                  className="settings-input"
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="e.g. Asia/Kolkata (UTC+05:30)"
                />
              </Field>

              <div className="settings-divider" />
              <Field label="Languages" hint="Languages you can communicate in">
                <input
                  className="settings-input"
                  id="languages"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  placeholder="e.g. English, Hindi"
                />
              </Field>

              <div className="settings-divider" />
              <Field label="Bio" hint="Shown on your public profile">
                <textarea
                  className="settings-input settings-textarea"
                  id="bio"
                  rows="3"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell clients and guild members about your experience and skills..."
                />
              </Field>

              <div className="settings-divider" />
              <Field label="Website / Portfolio">
                <input
                  className="settings-input"
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourportfolio.dev"
                />
              </Field>
            </div>

            <div className="settings-actions">
              <button
                type="button"
                className="settings-btn-secondary"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="button"
                className="settings-btn-primary"
                onClick={handleSaveChanges}
                disabled={saving}
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </Cards>

          <Cards
            className="settings-section profile-settings-section availability-section"
            padding="32px"
          >
            <div className="settings-section-header">
              <h2 className="settings-section-title">Availability</h2>
              <p className="settings-section-desc">
                Let clients know when you are open to new work.
              </p>
            </div>

            <div className="settings-form-grid align-center">
              <Field label="Availability Status">
                <div className="settings-toggle-container d-flex align-items-center gap-3">
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0"
                    onClick={() => setIsAvailable((prev) => !prev)}
                  >
                    <Toggle
                      active={isAvailable}
                      size="lg"
                      ariaLabel="Available for work"
                    />
                  </button>
                  <span className={`settings-status-text ${isAvailable ? "available" : "text-muted"}`}>
                    {isAvailable ? "Available for Work" : "Currently Unavailable"}
                  </span>
                </div>
              </Field>

              <Field
                label="Hours per Week"
                hint="How many hours you can commit"
              >
                <input
                  className="settings-input"
                  id="hours"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  placeholder="e.g. 40"
                />
              </Field>
            </div>

            <div className="settings-actions mt-4">
              <button
                type="button"
                className="settings-btn-primary"
                onClick={handleSaveChanges}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Availability"}
              </button>
            </div>
          </Cards>
        </div>
      </div>
    </DashboardLayout>
  );
}

