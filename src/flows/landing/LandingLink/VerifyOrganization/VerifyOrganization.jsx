import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DashboardShell from "@/flows/landing/LandingLink/DashboardShell/DashboardShell";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import "./VerifyOrganization.css";

const VERIFY_ITEMS = [
  {
    icon: "Building2",
    tone: "blue",
    title: "Organization Identity",
    text: "Official business registration and legal entity verification.",
  },
  {
    icon: "UserCheck",
    tone: "teal",
    title: "Authorized Representative",
    text: "Confirming your authority to act on behalf of the company.",
  },
  {
    icon: "Briefcase",
    tone: "purple",
    title: "Business Information",
    text: "Validating operational address and corporate details.",
  },
  {
    icon: "Shield",
    tone: "indigo",
    title: "Account Authenticity",
    text: "Ensuring platform security and preventing fraudulent profiles.",
  },
];

const WHY_VERIFY = ["Build Trust with Elite Talent", "Increase Quest Credibility", "Attract Better Professionals"];

const STEPS = [
  {
    n: "01",
    title: "Start Verification",
    text: "Confirm your intent to verify your organization profile.",
  },
  {
    n: "02",
    title: "Verify Organization",
    text: "Submit standard business details securely via our partner.",
  },
  {
    n: "03",
    title: "Get Verified",
    text: "Receive your Verified Organization badge instantly upon approval.",
  },
];

function HexBackdrop() {
  return (
    <svg className="vp-hex art" viewBox="0 0 420 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <polygon
        points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22"
        transform="translate(82 80)"
        fill="none"
        stroke="#2b3a5c"
        strokeWidth="1.5"
      />
      <polygon
        points="0,-17 15,-8 15,8 0,17 -15,8 -15,-8"
        transform="translate(152 40)"
        fill="#2b3a5c"
      />
      <polygon
        points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
        transform="translate(330 92)"
        fill="#1d47b8"
      />
      <polygon
        points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11"
        transform="translate(386 150)"
        fill="#2b3a5c"
      />
      <polygon
        points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15"
        transform="translate(300 232)"
        fill="none"
        stroke="#2b3a5c"
        strokeWidth="1.5"
      />
      <polygon
        points="0,-26 23,-13 23,13 0,26 -23,13 -23,-13"
        transform="translate(62 246)"
        fill="none"
        stroke="#2b3a5c"
        strokeWidth="1.5"
      />
      <polygon
        points="0,-18 16,-9 16,9 0,18 -16,9 -16,-9"
        transform="translate(34 158)"
        fill="#3b4a6b"
      />
      <polygon
        points="0,-14 12,-7 12,7 0,14 -12,7 -12,-7"
        transform="translate(370 244)"
        fill="#1d47b8"
      />
      <polygon
        points="0,-10 9,-5 9,5 0,10 -9,5 -9,-5"
        transform="translate(246 32)"
        fill="#ffffff"
        opacity="0.75"
      />
      <polygon
        points="0,-12 10,-6 10,6 0,12 -10,6 -10,-6"
        transform="translate(204 262)"
        fill="none"
        stroke="#9aabc8"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function VerifyOrganization() {
  const dispatch = useDispatch();

  const comingSoon = () => {
    dispatch(showSnackbar({ message: "Coming Soon", type: "info" }));
  };

  return (
    <DashboardShell>
      <header className="dash-page-head">
        <nav className="dash-crumb" aria-label="Breadcrumb">
          <span>Dashboard</span>
          <Icon name="ChevronRight" size={12} color="#94a3b8" />
          <span className="on">Verification</span>
        </nav>
        <h1>Verify Your Organization</h1>
        <p>Build credibility with professionals and create a more trusted environment for your Quests.</p>
      </header>

      <section className="vp-hero">
        <div className="vp-hero-copy">
          <span className="vp-eyebrow">TECHGUILD CLIENT VERIFICATION</span>
          <h2>Become a Verified Client</h2>
          <p>
            Verify your organization and show professionals that your Quests come from a trusted and authentic
            client.
          </p>
          <div className="vp-actions">
            <Link to="/get-verified" className="dash-btn dash-btn-primary">
              Start Verification
              <span aria-hidden="true">→</span>
            </Link>
            <button type="button" className="dash-btn dash-btn-white" onClick={comingSoon}>
              Learn More
            </button>
          </div>
        </div>

        <div className="vp-hero-art">
          <HexBackdrop />
          <div className="vp-id-card">
            <span className="vp-id-logo">
              <Icon name="Shield" size={22} color="#ffffff" />
            </span>
            <span className="vp-seal">
              <Icon name="BadgeCheck" size={30} color="#ffffff" />
            </span>
            <strong>TechGuild Global</strong>
            <span className="vp-id-sub">Verified Organization</span>
            <div className="vp-id-icons">
              <Icon name="Shield" size={14} color="#0062FF" />
              <Icon name="Lock" size={14} color="#0062FF" />
              <Icon name="Star" size={14} color="#0062FF" />
              <Icon name="BadgeCheck" size={14} color="#0062FF" />
            </div>
          </div>
        </div>
      </section>

      <div className="vp-grid">
        <div className="vp-left">
          <section className="vp-verify-card">
            <h2>What We'll Verify</h2>
            <div className="vp-verify-grid">
              {VERIFY_ITEMS.map(({ icon, tone, title, text }) => (
                <article className="vp-verify-item" key={title}>
                  <span className={`vp-verify-icon ${tone}`}>
                    <Icon name={icon} size={20} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="vp-note">
            <Icon name="Lock" size={20} color="#0062FF" />
            <p>
              Your information is securely encrypted and only used for verification purposes to maintain a trusted,
              professional ecosystem.
            </p>
          </div>
        </div>

        <aside className="vp-right">
          <section className="vp-status-card">
            <span className="vp-status-icon">
              <Icon name="ClipboardList" size={24} color="#334155" />
            </span>
            <h2>Your Verification Status</h2>
            <span className="vp-status-pill">
              <Icon name="Clock" size={14} color="#0062FF" />
              Not Started
            </span>
            <p>Complete the process to unlock the "Verified Organization" badge.</p>
          </section>

          <section className="vp-why">
            <h2>Why Verify?</h2>
            {WHY_VERIFY.map((item) => (
              <div className="vp-why-row" key={item}>
                <Icon name="CircleCheck" size={19} color="#10b981" />
                <span>{item}</span>
              </div>
            ))}
          </section>
        </aside>
      </div>

      <section className="vp-process">
        <h2>Verification Process</h2>
        <div className="vp-steps">
          {STEPS.map(({ n, title, text }) => (
            <div className="vp-step" key={n}>
              <span className="vp-step-num">{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="vp-cta">
        <h2>Ready to Build Trust?</h2>
        <p>Verify your organization and strengthen your TechGuild client profile.</p>
        <Link to="/get-verified" className="dash-btn dash-btn-primary dash-btn-lg">
          Start Verification
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </DashboardShell>
  );
}
