import { useDispatch } from "react-redux";
import DashboardShell from "@/flows/landing/LandingLink/DashboardShell/DashboardShell";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import "./GetVerified.css";

const WHY_CARDS = [
  {
    icon: "UserCheck",
    tone: "blue",
    title: "Verified Profile",
    text: "Show enterprise clients that your identity is fully authenticated and credible.",
  },
  {
    icon: "Shield",
    tone: "teal",
    title: "Build Trust",
    text: "Earn a trusted verification badge that displays prominently across your profile.",
  },
  {
    icon: "TrendingUp",
    tone: "purple",
    title: "Better Opportunities",
    text: "Improve your visibility in search results and gain exclusive access to premium Quests.",
  },
  {
    icon: "Fingerprint",
    tone: "mint",
    title: "Stronger Matching",
    text: "Help our algorithm identify you as a highly credible professional for top-tier clients.",
  },
];

const NEEDED = [
  { icon: "IdCard", title: "Identity Document", text: "Valid government-issued identification" },
  { icon: "FileText", title: "Professional Information", text: "Accurate profile and contact details" },
  { icon: "Briefcase", title: "Work Evidence", text: "Portfolio links or relevant credentials" },
];

export default function GetVerified() {
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
        <h1>Get Verified</h1>
        <p>
          Build trust, strengthen your professional profile, and unlock better opportunities across the TechGuild
          ecosystem.
        </p>
      </header>

      <section className="gv-hero">
        <div className="gv-hero-copy">
          <span className="gv-status">
            <i aria-hidden="true" />
            Verification Status · Not Started
          </span>
          <h2>Build Trust. Get Verified.</h2>
          <p>
            Confirming your credibility is the first step to unlocking premium enterprise opportunities. The
            verification process is secure, quick, and helps establish a trusted environment for all professionals.
          </p>
          <button type="button" className="dash-btn dash-btn-primary" onClick={comingSoon}>
            Start Verification
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="gv-hero-art">
          <span className="gv-glow" aria-hidden="true" />
          <span className="gv-panel" aria-hidden="true" />
          <span className="gv-ring" aria-hidden="true" />
          <span className="gv-shield">
            <Icon name="Shield" size={58} color="#0062FF" />
          </span>
          <span className="gv-check">
            <Icon name="Check" size={19} color="#ffffff" />
          </span>
          <span className="gv-mini gv-finger">
            <Icon name="Fingerprint" size={30} color="#4f46e5" />
          </span>
          <span className="gv-mini gv-id">
            <Icon name="IdCard" size={30} color="#0f766e" />
          </span>
        </div>
      </section>

      <div className="gv-grid">
        <div className="gv-left">
          <h2 className="gv-sub">Why Get Verified?</h2>
          <div className="gv-cards">
            {WHY_CARDS.map(({ icon, tone, title, text }) => (
              <article className="gv-card" key={title}>
                <span className={`gv-card-icon ${tone}`}>
                  <Icon name={icon} size={23} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="gv-right">
          <section className="gv-need">
            <div className="gv-need-head">
              <h2>What You'll Need</h2>
              <p>Keep these details ready before starting.</p>
            </div>
            <div className="gv-need-list">
              {NEEDED.map(({ icon, title, text }) => (
                <div className="gv-need-row" key={title}>
                  <Icon name={icon} size={20} color="#334155" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="gv-protected">
            <Icon name="Lock" size={21} color="#0062FF" />
            <div>
              <h3>Your information is protected</h3>
              <p>
                TechGuild uses your verification information only for establishing professional trust and maintaining
                a secure ecosystem. We never share raw documents.
              </p>
            </div>
          </section>
        </aside>
      </div>

      <div className="gv-foot">
        <span>
          <Icon name="Clock" size={20} color="#334155" />
          Verification takes only a few minutes to begin.
        </span>
        <button type="button" className="dash-btn dash-btn-primary" onClick={comingSoon}>
          Start Verification
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </DashboardShell>
  );
}
