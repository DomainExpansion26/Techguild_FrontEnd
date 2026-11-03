// 03-11-2026
// Account security guide article covering passwords, 2FA, devices, and recovery.
import Icon from "@/Components/icons/Icon";
import FullGuideLayout from "./FullGuideLayout";
import {
  ChecklistPanel,
  GuideSection,
  NumberedList,
  OverviewBox,
  StepsFlow,
  TipsPanel,
} from "./guideArticleParts";

const TOC = [
  { id: 1, label: "Overview" },
  { id: 2, label: "Strong Password" },
  { id: 3, label: "Two-Factor Authentication" },
  { id: 4, label: "Login and Devices" },
  { id: 5, label: "Personal Information" },
  { id: 6, label: "Account Activity" },
  { id: 7, label: "Phishing and Scams" },
  { id: 8, label: "Account Recovery" },
  { id: 9, label: "Tips for Staying Safe" },
];

const OVERVIEW = [
  { title: "Keep your personal information safe" },
  { title: "Protect your projects and payments" },
  { title: "Prevent unauthorized access" },
  { title: "Have a safe and reliable experience on TechGuild" },
];

const PASSWORD_RULES = [
  "Be at least 8 characters long",
  "Include a mix of letters, numbers and symbols",
  "Not be easy to guess (avoid your name, birthdate, etc.)",
  "Be different from your other accounts",
];

const TWO_FACTOR_REASONS = [
  "Prevents unauthorized login",
  "Keeps your account safe even if your password is leaked",
  "Adds an extra verification step",
];

const TWO_FACTOR_STEPS = [
  {
    title: "Go to Account Settings",
    text: "Open the Security section in your account settings.",
  },
  {
    title: "Enable Two-Factor Authentication",
    text: "Click on Enable 2FA.",
  },
  {
    title: "Choose a verification method",
    text: "Select OTP via authenticator or phone number.",
  },
  {
    title: "Verify and activate",
    text: "Enter the code and complete the setup.",
  },
];

const DEVICES = [
  {
    icon: "Monitor",
    device: "Windows · Chrome",
    meta: "Current session · Active now",
    current: true,
  },
  {
    icon: "Smartphone",
    device: "Android · Chrome",
    meta: "Pune, India · 5 days ago",
  },
  {
    icon: "Smartphone",
    device: "iPhone · Safari",
    meta: "Mumbai, India · 2 days ago",
  },
];

const DEVICE_STEPS = [
  {
    title: "Go to Security",
    text: "Open the Login and Devices section.",
  },
  {
    title: "View active sessions",
    text: "See all devices where your account is logged in.",
  },
  {
    title: "Log out from unknown devices",
    text: "Remove access from any unrecognized device.",
  },
  {
    title: "Keep your devices secure",
    text: "Enable screen locks and avoid public devices.",
  },
];

const PERSONAL_TIPS = [
  "Use a valid email address and phone number",
  "Keep your profile information accurate",
  "Do not share sensitive information (e.g. OTP, password)",
  "Update your information if anything changes",
];

const PERSONAL_MANAGE = [
  "Email address",
  "Phone number",
  "Profile details",
  "Communication preferences",
];

const ACTIVITY_ITEMS = [
  "View your recent logins",
  "Check security-related changes",
  "See important account actions (e.g. password change, 2FA enabled)",
];

const ACTIVITY_STEPS = [
  {
    title: "Go to Account Activity",
    text: "Open the Security section.",
  },
  {
    title: "Review recent activity",
    text: "See your recent logins and actions.",
  },
  {
    title: "Report anything suspicious",
    text: "Contact support if you notice unusual activity.",
  },
];

const PHISHING_ITEMS = [
  [
    "TechGuild will never ask for your password or OTP via email or chat.",
    "Do not click on suspicious links.",
  ],
  [
    "Verify the sender before sharing any information.",
    "Report suspicious messages to our support team.",
  ],
];

const RECOVERY_STEPS = [
  {
    title: "Click on Forgot Password",
    text: "On the login page.",
  },
  {
    title: "Verify your identity",
    text: "Using your registered email or phone number.",
  },
  {
    title: "Reset your password",
    text: "Follow the instructions to create a new password.",
  },
  {
    title: "Regain access",
    text: "Log in with your new password.",
  },
];

const TIPS = [
  [
    "Use a strong and unique password.",
    "Enable two-factor authentication.",
    "Regularly check your account activity.",
  ],
  [
    "Do not share your login details.",
    "Log out from shared or public devices.",
    "Keep your email and phone number updated.",
  ],
];

function ChangePasswordMock() {
  return (
    <div className="fg-soft fg-panel">
      <strong className="fg-panel-title">Change Password</strong>
      <span className="fg-form-label">Current password</span>
      <div className="fg-fake-input">Enter current password</div>
      <span className="fg-form-label">New password</span>
      <div className="fg-fake-input">
        Enter new password
        <Icon name="Eye" size={10} color="#94a3b8" />
      </div>
      <span className="fg-form-label">Confirm new password</span>
      <div className="fg-fake-input">
        Confirm new password
        <Icon name="Eye" size={10} color="#94a3b8" />
      </div>
      <div className="fg-fake-btn">Update Password</div>
    </div>
  );
}

function DevicesMock() {
  return (
    <div className="fg-mock">
      <strong className="fg-devices-title">Your Logged In Devices</strong>
      {DEVICES.map((device) => (
        <div className="fg-device" key={device.device}>
          <span className="fg-device-icon">
            <Icon name={device.icon} size={10} color="#64748b" />
          </span>
          <div className="fg-device-info">
            <strong>{device.device}</strong>
            <span>{device.meta}</span>
          </div>
          {device.current ? (
            <span className="fg-current-badge">Current</span>
          ) : (
            <span className="fg-logout-btn">Log out</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function AccountSecurityGuide() {
  return (
    <FullGuideLayout
      title="My Account Security"
      subtitle="A complete guide to keeping your TechGuild account safe and secure."
      icon="ShieldCheck"
      toc={TOC}
      heroVariant="card"
    >
      <GuideSection
        id={1}
        title="Overview"
        subtitle="Your account security is important to us. Follow these guidelines to keep your TechGuild account safe."
        boxed
      >
        <OverviewBox label="With a secure account, you can:" items={OVERVIEW} />
      </GuideSection>

      <GuideSection
        id={2}
        title="Strong Password"
        subtitle="Use a strong and unique password to protect your account from unauthorized access."
        boxed
      >
        <div className="fg-two-panels">
          <ChecklistPanel title="A strong password should:" columns={[PASSWORD_RULES]} />
          <ChangePasswordMock />
        </div>
      </GuideSection>

      <GuideSection
        id={3}
        title="Two-Factor Authentication (2FA)"
        subtitle="Add an extra layer of security to your account with 2FA."
        boxed
      >
        <div className="fg-two-panels">
          <ChecklistPanel title="Why enable 2FA?" columns={[TWO_FACTOR_REASONS]} />
          <NumberedList items={TWO_FACTOR_STEPS} />
        </div>
      </GuideSection>

      <GuideSection
        id={4}
        title="Login and Devices"
        subtitle="Keep track of where your account is logged in and manage your devices."
        boxed
      >
        <div className="fg-split">
          <DevicesMock />
          <NumberedList items={DEVICE_STEPS} />
        </div>
      </GuideSection>

      <GuideSection
        id={5}
        title="Personal Information"
        subtitle="Keep your personal information up to date and share only what is necessary."
        boxed
      >
        <div className="fg-two-panels">
          <ChecklistPanel title="Important tips:" columns={[PERSONAL_TIPS]} />
          <ChecklistPanel title="You can manage:" columns={[PERSONAL_MANAGE]} />
        </div>
      </GuideSection>

      <GuideSection
        id={6}
        title="Account Activity"
        subtitle="Regularly review your account activity to ensure there are no unauthorized actions."
        boxed
      >
        <div className="fg-two-panels">
          <ChecklistPanel title="In Account Activity, you can:" columns={[ACTIVITY_ITEMS]} />
          <NumberedList items={ACTIVITY_STEPS} />
        </div>
      </GuideSection>

      <GuideSection
        id={7}
        title="Phishing and Scams"
        subtitle="Be aware of common scams and keep your account safe."
        boxed
      >
        <ChecklistPanel title="Things to remember:" columns={PHISHING_ITEMS} />
      </GuideSection>

      <GuideSection
        id={8}
        title="Account Recovery"
        subtitle="If you are unable to access your account, you can recover it using your registered email or phone number."
        boxed
      >
        <StepsFlow steps={RECOVERY_STEPS} />
      </GuideSection>

      <GuideSection
        id={9}
        title="Tips for Staying Safe"
        subtitle="Practice these habits to keep your TechGuild account secure."
        boxed
      >
        <TipsPanel columns={TIPS} />
      </GuideSection>
    </FullGuideLayout>
  );
}
