// 03-11-2026
// Security page describing account protection and data safety practices.
import LegalPage, {
  CardGrid,
  CheckGrid,
  ContactBox,
  LegalLead,
  LegalSection,
} from "@/flows/landing/pages/Legal/LegalPage";

const ACCOUNT_SECURITY = [
  {
    icon: "Lock",
    title: "Strong Passwords",
    text: "We recommend using a strong, unique password for your TechGuild account.",
  },
  {
    icon: "ShieldCheck",
    title: "Two-Factor Authentication (2FA)",
    text: "Add an extra layer of security with 2FA using an authenticator app or phone number.",
  },
  {
    icon: "Monitor",
    title: "Login Alerts",
    text: "Get notified about new logins or unfamiliar devices.",
  },
  {
    icon: "User",
    title: "Account Controls",
    text: "You can review active sessions, manage devices and update your security settings anytime.",
  },
];

const DATA_PROTECTION = [
  {
    icon: "Server",
    title: "Encryption",
    text: "Your data is encrypted in transit (using TLS) and at rest using industry-standard protocols.",
  },
  {
    icon: "Globe",
    title: "Secure Infrastructure",
    text: "Our platform is hosted on trusted cloud infrastructure with regular security monitoring, firewalls and access controls.",
  },
  {
    icon: "Settings",
    title: "Access Controls",
    text: "Only authorized team members have limited access to user data, and only when necessary for support or legal reasons.",
  },
  {
    icon: "ClipboardList",
    title: "Regular Security Reviews",
    text: "We conduct regular security assessments and follow best practices to identify and address potential risks.",
  },
];

const PAYMENTS = [
  {
    icon: "CreditCard",
    title: "Escrow Protection",
    text: "Project payments are held in secure escrow until milestones are completed and approved.",
  },
  {
    icon: "ShieldCheck",
    title: "Trusted Payment Providers",
    text: "We work with reliable and compliant payment partners to process transactions securely.",
  },
  {
    icon: "Eye",
    title: "Transparent Fees",
    text: "All platform fees are clearly displayed before you confirm a project.",
  },
  {
    icon: "Shield",
    title: "Fraud Monitoring",
    text: "We use automated systems to detect and prevent suspicious or fraudulent transactions.",
  },
];

const IDENTITY = [
  {
    icon: "IdCard",
    title: "Identity Checks",
    text: "We may verify your identity through government-issued ID and other verification methods.",
  },
  {
    icon: "BadgeCheck",
    title: "Verified Profiles",
    text: "Verified users are clearly marked on the platform to increase trust and transparency.",
  },
  {
    icon: "Users",
    title: "Ongoing Monitoring",
    text: "We continuously monitor for fake accounts, impersonation or suspicious activity.",
  },
];

const FRAUD_PREVENTION = [
  "Monitor suspicious login attempts",
  "Detect and block fake or duplicate accounts",
  "Identify unusual payment activity",
  "Review reports from our community",
  "Take action against policy violations",
  "Continue improving our systems to prevent fraud",
];

const STAYING_SECURE = [
  "Use a strong, unique password",
  "Enable two-factor authentication",
  "Do not share your login details",
  "Be cautious of suspicious emails or messages",
  "Report any unusual activity",
  "Follow our Community Guidelines",
];

export default function Security() {
  return (
    <LegalPage
      active="security"
      title="Security"
      subtitle="Your safety and trust matter to us. Learn how TechGuild keeps your account, data and transactions secure."
    >
      <LegalSection index={1} title="Our Commitment">
        <LegalLead>
          At TechGuild, we are committed to keeping your information, transactions and account safe.
          We use industry-standard security practices and continuously improve our systems to protect
          our community of freelancers, clients, agencies and businesses.
        </LegalLead>
      </LegalSection>

      <LegalSection index={2} title="Account Security">
        <LegalLead>
          We provide multiple layers of protection to keep your account safe from unauthorized
          access.
        </LegalLead>
        <CardGrid items={ACCOUNT_SECURITY} />
      </LegalSection>

      <LegalSection index={3} title="Data Protection">
        <LegalLead>
          We take strong measures to protect your personal information and data.
        </LegalLead>
        <CardGrid items={DATA_PROTECTION} columns={2} variant="row" />
      </LegalSection>

      <LegalSection index={4} title="Payments and Transactions">
        <LegalLead>
          Payments on TechGuild are handled securely to protect both clients and freelancers.
        </LegalLead>
        <CardGrid items={PAYMENTS} />
      </LegalSection>

      <LegalSection index={5} title="Identity Verification">
        <LegalLead>
          To build a safe and trustworthy community, we verify the identity of our users.
        </LegalLead>
        <CardGrid items={IDENTITY} columns={3} variant="row" />
      </LegalSection>

      <LegalSection index={6} title="Fraud Prevention">
        <LegalLead>
          We actively work to prevent and detect fraudulent or abusive activity.
        </LegalLead>
        <CheckGrid items={FRAUD_PREVENTION} />
      </LegalSection>

      <LegalSection index={7} title="Your Role in Staying Secure">
        <LegalLead>
          You can also help keep your account and the TechGuild community safe.
        </LegalLead>
        <CheckGrid items={STAYING_SECURE} />
      </LegalSection>

      <LegalSection index={8} title="Reporting Security Issues">
        <LegalLead>
          If you notice any suspicious activity, security vulnerability or believe your account has
          been compromised, please contact us immediately.
        </LegalLead>
        <ContactBox email="security@techguild.com" />
      </LegalSection>
    </LegalPage>
  );
}
