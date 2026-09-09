import {
  DashboardLayout,
  Cards,
  Toggle,
  TextInput,
  PrimaryButton,
  SecondaryButton,
} from "@/Components";
import "../settings.css";
import "./ProfileSetting.css";

export default function ProfileSetting() {
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
                  defaultValue="Arjun Mehta"
                  placeholder="Full Name"
                />
              </div>
              <div className="settings-label pt-2">
                <div>Profile Photo</div>
              </div>
              <div>
                <div className="settings-photo-container">
                  <div
                    className="settings-avatar-large"
                    aria-label="Arjun Mehta"
                  >
                    AM
                  </div>
                  <div className="settings-photo-actions">
                    <SecondaryButton text="Upload Photo" />
                    <button type="button" className="profile-remove-button">
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
                />
              </div>
              <div className="settings-label">
                <div>Professional Headline</div>
              </div>
              <div>
                <TextInput
                  id="headline"
                  defaultValue="Full Stack Developer · React, Node.js, TypeScript"
                  placeholder="Professional Headline"
                />
              </div>
              <div className="settings-label">
                <div>Username</div>
                <p className="settings-caption">techguild.com/u/arjunmehta</p>
              </div>
              <div>
                <TextInput
                  id="username"
                  defaultValue="arjunmehta"
                  placeholder="Username"
                />
              </div>
              <div className="settings-label">
                <div>Languages</div>
                <p className="settings-caption">
                  Languages you can communicate in
                </p>
              </div>
              <div>
                <TextInput
                  id="languages"
                  defaultValue="English, Hindi"
                  placeholder="Languages"
                />
              </div>
              <div className="settings-label">
                <div>Location</div>
              </div>
              <div>
                <TextInput
                  id="location"
                  defaultValue="Pune, India"
                  placeholder="Location"
                />
              </div>
              <div className="settings-label">
                <div>Timezone</div>
              </div>
              <div>
                <TextInput id="timezone" placeholder="Timezone" />
              </div>
              <div className="settings-label">
                <div>Website / Portfolio</div>
              </div>
              <div>
                <TextInput
                  id="website"
                  defaultValue="https://arjunmehta.dev"
                  placeholder="Website / Portfolio"
                />
              </div>
            </div>
            <div className="settings-actions">
              <SecondaryButton
                text="Cancel"
                className="settings-btn-secondary"
                onClick={() => {}}
              />
              <PrimaryButton
                text="Save Changes"
                className="settings-btn-primary"
                onClick={() => {}}
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
                  <Toggle active size="lg" ariaLabel="Available for work" />
                  <span className="settings-status-text available">
                    Available for Work
                  </span>
                </div>
              </div>
              <div className="settings-label">
                <div>Hours per Week</div>
                <p className="settings-caption">
                  How many hours you can commit
                </p>
              </div>
              <div>
                <TextInput id="hours" placeholder="Hours per Week" />
              </div>
            </div>
          </Cards>
        </div>
      </div>
    </DashboardLayout>
  );
}
