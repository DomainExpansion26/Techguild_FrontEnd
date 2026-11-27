// 6-11-2026
// 03-11-2026
// Getting Started guide article for new TechGuild users.
import { useState } from "react";
import { Link } from "react-router-dom";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Footer from "@/flows/landing/LandingLink/Footer/Footer";
import Icon from "@/Components/icons/Icon";
import "./guide.css";

const TOC = [
  { id: 1, label: "Introduction" },
  { id: 2, label: "Create an Account" },
  { id: 3, label: "Account Verification" },
  { id: 4, label: "Set Up Your Profile" },
  { id: 5, label: "Explore the Platform" },
  { id: 6, label: "Next Steps" },
];

const INTRO_FEATURES = [
  {
    icon: "Search",
    title: "Find opportunities",
    text: "Explore quests that match your skills and interests.",
  },
  {
    icon: "Users",
    title: "Work with great people",
    text: "Collaborate with clients and freelancers from different fields.",
  },
  {
    icon: "CreditCard",
    title: "Get paid securely",
    text: "Payments are held in escrow for a safe and transparent process.",
  },
  {
    icon: "TrendingUp",
    title: "Grow your reputation",
    text: "Build your profile, earn ratings and unlock more opportunities.",
  },
];

const CREATE_STEPS = [
  {
    title: "Click on Create Account",
    text: "Go to the top right corner and click on Create Account.",
  },
  {
    title: "Enter your details",
    text: "Provide your name, email address and create a password.",
  },
  {
    title: "Verify your email",
    text: "Check your inbox and click the verification link to activate your account.",
  },
];

const VERIFY_ITEMS = [
  "Email address (required)",
  "Phone number (recommended)",
  "Identity document (for higher trust and ranking)",
];

const PROFILE_CARDS = [
  {
    icon: "User",
    title: "For Freelancers",
    items: [
      "Add your skills and experience",
      "Showcase your portfolio",
      "Set your hourly rate and availability",
      "Write a short and compelling bio",
    ],
  },
  {
    icon: "Briefcase",
    title: "For Clients",
    items: [
      "Add your company details (optional)",
      "Describe your goals and project needs",
      "Build your team or find freelancers",
      "Start posting quests",
    ],
  },
];

const EXPLORE_TILES = [
  { icon: "Search", label: "Browse quests" },
  { icon: "UserPlus", label: "Find talent" },
  { icon: "Users", label: "Join or create a party" },
  { icon: "ClipboardList", label: "Manage projects" },
  { icon: "CreditCard", label: "Make secure payments" },
];

const NEXT_STEPS = [
  "Complete your profile and verification",
  "Explore quests or post your first quest",
  "Connect with freelancers or clients",
  "Join or create a party",
  "Start collaborating and building your reputation",
];

function CheckItem({ children }) {
  return (
    <li className="gd-check">
      <span className="gd-check-icon" aria-hidden="true">
        <Icon name="Check" size={9} color="#ffffff" strokeWidth={3} />
      </span>
      <span>{children}</span>
    </li>
  );
}

function Section({ id, icon, title, subtitle, children }) {
  return (
    <section className="gd-section" id={`gd-section-${id}`}>
      <div className="gd-section-head">
        <span className="gd-section-icon" aria-hidden="true">
          <Icon name={icon} size={15} color="#2563eb" />
        </span>
        <div>
          <h2 className="gd-section-title">
            {id}. {title}
          </h2>
          {subtitle && <p className="gd-section-sub">{subtitle}</p>}
        </div>
      </div>
      <div className="gd-section-body">{children}</div>
    </section>
  );
}

function AccountMock() {
  return (
    <div className="gd-mock gd-mock-account">
      <div className="gd-mock-dots">
        <i />
        <i />
        <i />
      </div>
      <div className="gd-mock-brand">
        <span className="gd-mock-mark" />
        <strong>TechGuild</strong>
      </div>
      <span className="gd-mock-btn">Create Account</span>
    </div>
  );
}

function FormMock() {
  return (
    <div className="gd-mock gd-mock-form">
      <div className="gd-mock-field">
        <span>Full name</span>
        <i />
      </div>
      <div className="gd-mock-field">
        <span>Email address</span>
        <i />
      </div>
      <div className="gd-mock-field">
        <span>Password</span>
        <i />
      </div>
    </div>
  );
}

function MailMock() {
  return (
    <div className="gd-mock gd-mock-mail">
      <span className="gd-mock-mail-icon">
        <Icon name="Mail" size={18} color="#ffffff" />
      </span>
      <span className="gd-mock-mail-check">
        <Icon name="Check" size={7} color="#ffffff" strokeWidth={3.5} />
      </span>
    </div>
  );
}

function StepVisual({ index }) {
  if (index === 0) return <AccountMock />;
  if (index === 1) return <FormMock />;
  return <MailMock />;
}

export default function Guides() {
  const [activeSection, setActiveSection] = useState(1);

  return (
    <div className="gd-page">
      <PublicHeader />

      <main>
        <section className="gd-hero">
          <div className="gd-wrap gd-hero-inner">
            <h1>Getting Started with TechGuild</h1>
            <p className="gd-hero-sub">
              Follow these step-by-step guides to create your account, complete verification and
              start your journey on TechGuild.
            </p>

            <div className="gd-hero-art" aria-hidden="true">
              <div className="gd-browser">
                <span className="gd-browser-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="gd-browser-image" />
                <span className="gd-browser-cursor">
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                    <path
                      d="M1.4 1.2 16 10.9l-6.2 1.4-3.1 6.2L1.4 1.2Z"
                      fill="#0f172a"
                      stroke="#ffffff"
                      strokeWidth="1.2"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="gd-wrap">
          <div className="gd-layout">
            <aside className="gd-toc" aria-label="On this page">
              {TOC.map((item) => (
                <a
                  key={item.id}
                  href={`#gd-section-${item.id}`}
                  className={activeSection === item.id ? "is-active" : undefined}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.label}
                </a>
              ))}
            </aside>

            <div className="gd-sections">
              <Section
                id={1}
                icon="Bookmark"
                title="Introduction"
                subtitle=""
              >
                <p className="gd-copy">
                  TechGuild is a platform that connects clients, freelancers and parties to work
                  together on meaningful projects called quests.
                </p>
                <p className="gd-copy gd-copy-strong">With TechGuild, you can:</p>
                <div className="gd-feature-grid">
                  {INTRO_FEATURES.map((feature) => (
                    <div className="gd-feature" key={feature.title}>
                      <span className="gd-feature-icon" aria-hidden="true">
                        <Icon name={feature.icon} size={14} color="#2563eb" />
                      </span>
                      <div>
                        <strong>{feature.title}</strong>
                        <p>{feature.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section
                id={2}
                icon="UserPlus"
                title="Create an Account"
                subtitle="It only takes a few minutes to create your TechGuild account."
              >
                <div className="gd-steps">
                  {CREATE_STEPS.map((step, index) => (
                    <div className="gd-step" key={step.title}>
                      <StepVisual index={index} />
                      <div className="gd-step-copy">
                        <span className="gd-step-number">{index + 1}</span>
                        <div>
                          <strong>{step.title}</strong>
                          <p>{step.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section
                id={3}
                icon="ShieldCheck"
                title="Account Verification"
                subtitle="Verification helps keep TechGuild safe and trustworthy for everyone."
              >
                <div className="gd-verify">
                  <div className="gd-verify-art" aria-hidden="true">
                    <div className="gd-verify-card">
                      <span className="gd-verify-avatar">
                        <Icon name="User" size={18} color="#ffffff" />
                      </span>
                      <span className="gd-verify-lines">
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>
                    <span className="gd-verify-badge">
                      <Icon name="Check" size={9} color="#ffffff" strokeWidth={3} />
                    </span>
                  </div>
                  <div className="gd-verify-list">
                    <strong>You may need to verify:</strong>
                    <ul>
                      {VERIFY_ITEMS.map((item) => (
                        <CheckItem key={item}>{item}</CheckItem>
                      ))}
                    </ul>
                  </div>
                </div>
              </Section>

              <Section
                id={4}
                icon="UserCheck"
                title="Set Up Your Profile"
                subtitle="A complete profile helps you get noticed and connect with the right people."
              >
                <div className="gd-profile-grid">
                  {PROFILE_CARDS.map((card) => (
                    <div className="gd-profile-card" key={card.title}>
                      <strong className="gd-profile-title">
                        <Icon name={card.icon} size={13} color="#2563eb" />
                        {card.title}
                      </strong>
                      <ul>
                        {card.items.map((item) => (
                          <CheckItem key={item}>{item}</CheckItem>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>

              <Section
                id={5}
                icon="Compass"
                title="Explore the Platform"
                subtitle="Once your profile is ready, explore everything TechGuild has to offer."
              >
                <div className="gd-explore">
                  {EXPLORE_TILES.map((tile) => (
                    <div className="gd-explore-tile" key={tile.label}>
                      <Icon name={tile.icon} size={16} color="#2563eb" />
                      <span>{tile.label}</span>
                    </div>
                  ))}
                </div>
              </Section>

              <Section
                id={6}
                icon="Flag"
                title="Next Steps"
                subtitle="You're all set to start your journey on TechGuild!"
              >
                <ul className="gd-next-list">
                  {NEXT_STEPS.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
              </Section>
            </div>
          </div>

          <div className="gd-support-card">
            <span className="gd-support-icon" aria-hidden="true">
              <Icon name="LifeBuoy" size={20} color="#2563eb" />
            </span>
            <div className="gd-support-copy">
              <strong>Need help getting started?</strong>
              <p>Our support team is here to help. Reach out anytime and we&apos;ll get back to you.</p>
            </div>
            <Link to="/contact" className="gd-support-btn">
              <Icon name="MessageSquareMore" size={13} color="#ffffff" />
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <Footer active="guides" />
    </div>
  );
}
