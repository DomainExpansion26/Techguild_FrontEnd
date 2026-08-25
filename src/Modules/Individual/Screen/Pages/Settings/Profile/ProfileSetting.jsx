import { DashboardLayout, Cards, Toggle } from "@/Components";
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
  return (
    <DashboardLayout
      activeSettingsTab="profile"
      containerClass="profile-settings-layout"
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
                    aria-label="Arjun Mehta"
                  >
                    AM
                  </div>
                  <div className="settings-photo-actions">
                    <button type="button" className="profile-upload-button">
                      Upload Photo
                    </button>
                    <button type="button" className="profile-remove-button">
                      Remove
                    </button>
                  </div>
                </div>
              </Field>
              <div className="settings-divider" />
              <Field label="Full Name">
                <input
                  className="settings-input"
                  id="fullName"
                  defaultValue="Arjun Mehta"
                />
              </Field>
              <div className="settings-divider" />
              <Field label="Username" hint="techguild.com/u/arjunmehta">
                <input
                  className="settings-input"
                  id="username"
                  defaultValue="arjunmehta"
                />
              </Field>
              <div className="settings-divider" />
              <Field label="Professional Headline">
                <input
                  className="settings-input"
                  id="headline"
                  defaultValue="Full Stack Developer · React, Node.js, TypeScript"
                />
              </Field>
              <div className="settings-divider" />
              <Field label="Location">
                <input
                  className="settings-input"
                  id="location"
                  defaultValue="Pune, India"
                />
              </Field>
              <div className="settings-divider" />
              <Field label="Timezone">
                <input className="settings-input" id="timezone" />
              </Field>
              <div className="settings-divider" />
              <Field label="Languages" hint="Languages you can communicate in">
                <input
                  className="settings-input"
                  id="languages"
                  defaultValue="English, Hindi"
                />
              </Field>
              <div className="settings-divider" />
              <Field label="Bio" hint="Shown on your public profile">
                <textarea
                  className="settings-input settings-textarea"
                  id="bio"
                  rows="3"
                />
              </Field>
              <div className="settings-divider" />
              <Field label="Website / Portfolio">
                <input
                  className="settings-input"
                  id="website"
                  defaultValue="https://arjunmehta.dev"
                />
              </Field>
            </div>
            <div className="settings-actions">
              <button type="button" className="settings-btn-secondary">
                Cancel
              </button>
              <button type="button" className="settings-btn-primary">
                Save Changes
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
                <div className="settings-toggle-container">
                  <Toggle
                    active
                    size="lg"
                    ariaLabel="Available for work"
                  />
                  <span className="settings-status-text available">
                    Available for Work
                  </span>
                </div>
              </Field>
              <Field
                label="Hours per Week"
                hint="How many hours you can commit"
              >
                <input className="settings-input" id="hours" />
              </Field>
            </div>
          </Cards>
        </div>
      </div>
    </DashboardLayout>
  );
}
