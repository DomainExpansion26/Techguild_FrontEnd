// 03-11-2026
// Privacy Policy page built on the shared LegalPage layout.
import LegalPage, {
  CardGrid,
  ContactBox,
  LegalLead,
  LegalSection,
} from "@/flows/landing/pages/Legal/LegalPage";

const INFORMATION_COLLECTED = [
  {
    icon: "User",
    title: "Information you provide",
    lines: [
      "Name, email address, phone number",
      "Profile information (skills, experience, portfolio, bio)",
      "Payment and bank details (for payouts and withdrawals)",
      "Identity verification documents (if required)",
      "Communications with us (e.g. support requests)",
    ],
  },
  {
    icon: "Monitor",
    title: "Information we collect automatically",
    lines: [
      "Device and browser information",
      "IP address and location (approximate)",
      "Usage data and activity on the platform",
      "Cookies and similar tracking technologies",
    ],
  },
  {
    icon: "Users",
    title: "Information from third parties",
    lines: [
      "Identity verification providers",
      "Payment partners (for secure transactions)",
      "Social login providers (e.g. Google, LinkedIn)",
      "Publicly available information (e.g. for fraud prevention)",
    ],
  },
];

const INFORMATION_USE = [
  {
    icon: "ClipboardList",
    title: "Provide and operate the TechGuild platform",
    text: "Create and manage your account, enable core features.",
  },
  {
    icon: "MessageSquareMore",
    title: "Communicate with you",
    text: "Send important updates, notifications and support messages.",
  },
  {
    icon: "Users",
    title: "Facilitate connections",
    text: "Help clients and freelancers find and collaborate with each other.",
  },
  {
    icon: "Settings",
    title: "Improve our services",
    text: "Understand how the platform is used and enhance features.",
  },
  {
    icon: "CreditCard",
    title: "Process payments",
    text: "Manage escrow, payouts and transaction records.",
  },
  {
    icon: "Megaphone",
    title: "Send marketing communications",
    text: "With your consent, we may send product updates, news and promotional content (you can opt out anytime).",
  },
  {
    icon: "Shield",
    title: "Keep our platform safe",
    text: "Prevent fraud, abuse and security risks.",
  },
  {
    icon: "FileText",
    title: "Comply with legal obligations",
    text: "Meet regulatory and legal requirements.",
  },
];

const INFORMATION_SHARED = [
  {
    icon: "Users",
    title: "With other users",
    text: "Your public profile information (e.g. name, skills, portfolio) is visible to other members on the platform.",
  },
  {
    icon: "Handshake",
    title: "With your consent",
    text: "We may share information if you agree to share information (e.g. for collaborations).",
  },
  {
    icon: "Building2",
    title: "With trusted service providers",
    text: "Payment processors, identity verification partners, cloud hosting providers and analytics tools.",
  },
  {
    icon: "Briefcase",
    title: "In business transfers",
    text: "If TechGuild is involved in a merger, acquisition or asset sale.",
  },
  {
    icon: "Shield",
    title: "For legal and safety reasons",
    text: "When required by law or to protect our rights, users or the platform.",
  },
];

const RIGHTS_AND_CHOICES = [
  {
    icon: "User",
    title: "Access and update your information",
    text: "Edit your profile and account settings anytime.",
  },
  {
    icon: "Mail",
    title: "Opt out of marketing communications",
    text: "Unsubscribe from promotional emails at any time.",
  },
  {
    icon: "Trash",
    title: "Request deletion",
    text: "You can request to delete your account and data (subject to legal obligations).",
  },
  {
    icon: "Download",
    title: "Download your data",
    text: "Request a copy of your personal information we hold.",
  },
];

export default function Privacy() {
  return (
    <LegalPage
      active="privacy"
      title="Privacy Policy"
      subtitle="Your privacy matters to us. This policy explains how TechGuild collects, uses, protects and shares your information."
    >
      <LegalSection index={1} title="Introduction">
        <LegalLead>
          At TechGuild, we are committed to protecting your personal information and your right to
          privacy. This Privacy Policy explains how we collect, use, disclose and safeguard your
          information when you use our platform.
        </LegalLead>
      </LegalSection>

      <LegalSection index={2} title="Information We Collect">
        <LegalLead>
          We collect information that you provide to us directly, information collected
          automatically when you use our platform, and information from third parties.
        </LegalLead>
        <CardGrid items={INFORMATION_COLLECTED} columns={3} />
      </LegalSection>

      <LegalSection index={3} title="How We Use Your Information">
        <LegalLead>
          We use the information to provide, improve and secure our services, and to create a better
          experience for our community.
        </LegalLead>
        <CardGrid items={INFORMATION_USE} columns={2} variant="row" />
      </LegalSection>

      <LegalSection index={4} title="How We Share Your Information">
        <LegalLead>
          We do not sell your personal information. We only share your information in the following
          cases:
        </LegalLead>
        <CardGrid items={INFORMATION_SHARED} columns={2} variant="row" />
      </LegalSection>

      <LegalSection index={5} title="Data Security">
        <LegalLead>
          We use industry-standard security measures to protect your information, including
          encryption, secure servers, access controls and regular security reviews. While we take
          strong precautions, no method of transmission over the Internet is 100% secure.
        </LegalLead>
      </LegalSection>

      <LegalSection index={6} title="Your Rights and Choices">
        <LegalLead>You have control over your personal information. You can:</LegalLead>
        <CardGrid items={RIGHTS_AND_CHOICES} columns={2} variant="row" />
      </LegalSection>

      <LegalSection index={7} title="Cookies and Tracking Technologies">
        <LegalLead>
          We use cookies and similar technologies to improve your experience, analyze usage and
          personalize content. You can manage your cookie preferences through your browser settings.
        </LegalLead>
      </LegalSection>

      <LegalSection index={8} title="Changes to This Policy">
        <LegalLead>
          We may update this Privacy Policy from time to time. We will notify you of any significant
          changes via email or a notice on our platform. Continued use of TechGuild after changes
          means you accept the updated policy.
        </LegalLead>
      </LegalSection>

      <LegalSection index={9} title="Contact Us">
        <LegalLead>
          If you have any questions or concerns about this Privacy Policy or your data, please
          contact us at:
        </LegalLead>
        <ContactBox email="privacy@techguild.com" />
      </LegalSection>
    </LegalPage>
  );
}
