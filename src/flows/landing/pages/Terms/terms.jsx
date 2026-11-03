// 03-11-2026
// Terms of Service page built on the shared LegalPage layout.
import LegalPage, {
  Callout,
  CardGrid,
  CheckList,
  ContactBox,
  LegalLead,
  LegalSection,
} from "@/flows/landing/pages/Legal/LegalPage";

const USER_ROLES = [
  {
    icon: "User",
    title: "Freelancers",
    lines: [
      "Provide accurate skills and experience details",
      "Deliver work as agreed",
      "Communicate professionally",
      "Follow project and payment policies",
    ],
  },
  {
    icon: "Briefcase",
    title: "Clients",
    lines: [
      "Provide clear project details and requirements",
      "Review and approve work fairly",
      "Make payments as per the agreed milestones",
      "Maintain respectful communication",
    ],
  },
  {
    icon: "Users",
    title: "Agencies",
    lines: [
      "Ensure team members follow these Terms",
      "Provide accurate business information",
      "Be responsible for the work delivered by their team",
    ],
  },
  {
    icon: "Building2",
    title: "Businesses",
    lines: [
      "Use the platform for legitimate project and talent needs",
      "Follow fair hiring practices",
      "Respect intellectual property rights",
    ],
  },
];

export default function Terms() {
  return (
    <LegalPage
      active="terms"
      title="Terms of Service"
      subtitle="These Terms of Service outline the rules and guidelines for using TechGuild. By accessing or using our platform, you agree to these terms."
      art="terms"
    >
      <LegalSection index={1} title="Introduction">
        <LegalLead>
          These Terms of Service (“Terms”) govern your access to and use of the TechGuild platform,
          including our website, mobile application and related services.
        </LegalLead>
        <Callout icon="User" title="By using TechGuild, you agree to:">
          <CheckList
            items={[
              "Be at least 18 years old (or the age of majority in your country).",
              "Follow these Terms and all applicable laws.",
              "Use the platform in a fair, safe and responsible manner.",
              "Accept any future updates to these Terms.",
            ]}
          />
        </Callout>
      </LegalSection>

      <LegalSection index={2} title="About TechGuild">
        <LegalLead>
          TechGuild is a platform that connects clients, freelancers, agencies and businesses for
          project-based work. We provide tools for collaboration, project management, secure payments
          and community engagement.
        </LegalLead>
        <Callout icon="User" title="TechGuild allows you to:">
          <CheckList
            items={[
              "Post and apply for projects (quests)",
              "Collaborate with individuals or teams (parties)",
              "Manage projects, milestones and payments",
              "Build your profile, showcase your work and grow your reputation",
            ]}
          />
        </Callout>
      </LegalSection>

      <LegalSection index={3} title="User Accounts">
        <LegalLead>
          To use certain features, you must create an account and provide accurate and complete
          information.
        </LegalLead>
        <Callout icon="User" title="You agree to:">
          <CheckList
            items={[
              "Keep your account information up to date",
              "Maintain the security of your login credentials",
              "Be responsible for all activity under your account",
              "Notify us immediately if you suspect unauthorized access",
            ]}
          />
        </Callout>
      </LegalSection>

      <LegalSection index={4} title="User Roles and Responsibilities">
        <LegalLead>
          TechGuild is used by freelancers, clients, agencies and businesses. Each user is
          responsible for their own actions.
        </LegalLead>
        <CardGrid items={USER_ROLES} />
      </LegalSection>

      <LegalSection index={5} title="Projects, Payments and Escrow">
        <LegalLead>
          TechGuild uses a secure escrow system to ensure safe and transparent transactions.
        </LegalLead>
        <Callout icon="CreditCard">
          <p>Payments are held in escrow and released based on milestone approvals.</p>
          <p>
            TechGuild may charge a platform fee, which will be clearly shown before you confirm a
            project.
          </p>
          <p>Users must not make off-platform payments to avoid fees.</p>
          <p>Disputes will be handled as per our dispute resolution process.</p>
        </Callout>
      </LegalSection>

      <LegalSection index={6} title="Acceptable Use">
        <LegalLead>
          You agree not to use TechGuild for any illegal, harmful or abusive purpose. You must not:
        </LegalLead>
        <Callout icon="Shield">
          <CheckList
            items={[
              "Post false, misleading or fraudulent information",
              "Harass, abuse or discriminate against other users",
              "Share spam, unsolicited promotions or irrelevant content",
              "Attempt to hack, disrupt or misuse the platform",
              "Use TechGuild for any activity that violates applicable laws",
            ]}
          />
        </Callout>
      </LegalSection>

      <LegalSection index={7} title="Intellectual Property">
        <LegalLead>
          All content on TechGuild, including our logo, design, text, features and software, is owned
          by TechGuild or its licensors.
        </LegalLead>
        <Callout icon="FileText">
          <p>You may not copy, modify or distribute our content without permission.</p>
          <p>
            You retain ownership of the work you create, but you grant TechGuild a limited license to
            display it on the platform. You are responsible for ensuring that your content does not
            infringe on third-party rights.
          </p>
        </Callout>
      </LegalSection>

      <LegalSection index={8} title="Account Suspension or Termination">
        <LegalLead>
          We may suspend or terminate your account if you violate these Terms, engage in fraudulent
          activity, or use the platform in a way that harms other users or TechGuild.
        </LegalLead>
      </LegalSection>

      <LegalSection index={9} title="Disclaimers and Limitation of Liability">
        <LegalLead>
          TechGuild is provided “as is” and “as available”. We do not guarantee that the platform
          will be error-free, uninterrupted or meet your specific requirements. We are not liable for
          any indirect, incidental or consequential damages arising from your use of the platform.
        </LegalLead>
      </LegalSection>

      <LegalSection index={10} title="Changes to These Terms">
        <LegalLead>
          We may update these Terms from time to time. We will notify you of any significant changes
          via email or through the platform. Continued use of TechGuild after changes means you
          accept the updated Terms.
        </LegalLead>
      </LegalSection>

      <LegalSection index={11} title="Contact Us">
        <LegalLead>If you have any questions about these Terms, please contact us at:</LegalLead>
        <ContactBox email="legal@techguild.com" />
        <p className="lg-updated">Last updated: 1 October 2026</p>
      </LegalSection>
    </LegalPage>
  );
}
