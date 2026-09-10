import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  DashboardLayout,
  Cards,
  Toggle,
  TextInput,
  PrimaryButton,
  SecondaryButton,
} from "@/Components";
import { useAuth } from "@/context/AuthContext";
import { profileApi } from "@/features/profile/api/profileApi";
import { showSnackbar } from "@/store";
import "../settings.css";
import "./ProfileSetting.css";

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
        if (profile.hours_per_week) setHoursPerWeek(String(profile.hours_per_week));

        const cityCountry = [profile.city, profile.country].filter(Boolean).join(", ");
        if (cityCountry) setLocation(cityCountry);
      }

      const initialName =
        user?.name ||
        (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : "") ||
        (user?.email ? user.email.split("@")[0] : "");
      setFullName(initialName);
      setUsername(user?.username || (user?.email ? user.email.split("@")[0] : ""));
    } catch (err) {
      console.warn("Could not fetch profile from API, using auth session:", err);
      const initialName =
        user?.name ||
        (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : "") ||
        (user?.email ? user.email.split("@")[0] : "");
      setFullName(initialName);
      setUsername(user?.username || (user?.email ? user.email.split("@")[0] : ""));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // reset input so the same file can be picked again
      if (e.target) e.target.value = "";
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

      await profileApi.saveIndividualProfile(
        {
          headline,
          bio,
          portfolio_url: website,
          timezone,
          preferred_language: languages,
          city,
          country,
          availability: isAvailable ? "available" : "unavailable",
        },
        true
      );

      // Update auth context so headers, navbar, and layouts immediately show the live name & details
      updateUser({
        name: fullName,
        username,
        headline,
        location,
        timezone,
        avatar: avatarUrl || (fullName ? fullName.charAt(0).toUpperCase() : "U"),
      });

      dispatch(
        showSnackbar({
          message: "Profile updated and saved to API successfully!",
          type: "success",
        })
      );
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
      dispatch(
        showSnackbar({
          message: err?.message || "Profile updated locally.",
          type: "info",
        })
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    fetchProfileData();
    dispatch(showSnackbar({ message: "Changes reverted.", type: "info" }));
  };

  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <DashboardLayout
      activeSettingsTab="profile"
      containerClass="settings-layout-collapsed-nav profile-settings-layout"
    >
      <div className="settings-scroll-area">
        <div className="settings-container profile-settings-container">
          <header className="settings-header">
            <h1 className="settings-page-title">Profile</h1>
            <p className="settings-page-subtitle">
              Control how you appear to clients and collaborators on TechGuild.
            </p>
          </header>
          <Cards
            variant="base"
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
              <div className="settings-label">
                <div>Full Name</div>
              </div>
              <div>
                <TextInput
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  disabled={loading}
                />
              </div>
              <div className="settings-label pt-2">
                <div>Profile Photo</div>
              </div>
              <div>
                <div className="settings-photo-container">
                  <div
                    className="settings-avatar-large"
                    aria-label={fullName || "User Profile"}
                    style={
                      avatarUrl
                        ? {
                            backgroundImage: `url(${avatarUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            color: "transparent",
                          }
                        : {}
                    }
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
                    <SecondaryButton
                      text={uploadingPhoto ? "Uploading..." : "Upload Photo"}
                      disabled={uploadingPhoto}
                      onClick={() => fileInputRef.current?.click()}
                    />
                    <button
                      type="button"
                      className="profile-remove-button"
                      onClick={handleRemovePhoto}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div className="settings-label">
                <div>Bio</div>
                <p className="settings-caption">Shown on your public profile</p>
              </div>
              <div>
                <TextInput
                  id="bio"
                  className="profile-bio-input"
                  inputClassName="profile-bio-input-field"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell clients and guild members about your experience and skills..."
                  disabled={loading}
                />
              </div>
              <div className="settings-label">
                <div>Professional Headline</div>
              </div>
              <div>
                <TextInput
                  id="headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Professional Headline"
                  disabled={loading}
                />
              </div>
              <div className="settings-label">
                <div>Username</div>
                <p className="settings-caption">techguild.com/u/{username || "username"}</p>
              </div>
              <div>
                <TextInput
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  disabled={loading}
                />
              </div>
              <div className="settings-label">
                <div>Languages</div>
                <p className="settings-caption">Languages you can communicate in</p>
              </div>
              <div>
                <TextInput
                  id="languages"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  placeholder="Languages"
                  disabled={loading}
                />
              </div>
              <div className="settings-label">
                <div>Location</div>
              </div>
              <div>
                <TextInput
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  disabled={loading}
                />
              </div>
              <div className="settings-label">
                <div>Timezone</div>
              </div>
              <div>
                <TextInput
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="Timezone"
                  disabled={loading}
                />
              </div>
              <div className="settings-label">
                <div>Website / Portfolio</div>
              </div>
              <div>
                <TextInput
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Website / Portfolio"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="settings-actions">
              <SecondaryButton
                text="Cancel"
                className="settings-btn-secondary"
                onClick={handleCancel}
                disabled={saving}
              />
              <PrimaryButton
                text={saving ? "Saving..." : "Save Changes"}
                className="settings-btn-primary"
                onClick={handleSaveChanges}
                disabled={saving}
              />
            </div>
          </Cards>
          <Cards
            variant="base"
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
              <div className="settings-label">
                <div>Availability Status</div>
              </div>
              <div>
                <div className="settings-toggle-container">
                  <Toggle
                    active={isAvailable}
                    size="lg"
                    ariaLabel="Available for work"
                    onClick={() => setIsAvailable((prev) => !prev)}
                  />
                  <span className="settings-status-text available">
                    {isAvailable ? "Available for Work" : "Currently Unavailable"}
                  </span>
                </div>
              </div>
              <div className="settings-label">
                <div>Hours per Week</div>
                <p className="settings-caption">How many hours you can commit</p>
              </div>
              <div>
                <TextInput
                  id="hours"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  placeholder="Hours per Week"
                />
              </div>
            </div>
          </Cards>
        </div>
      </div>
    </DashboardLayout>
  );
}
