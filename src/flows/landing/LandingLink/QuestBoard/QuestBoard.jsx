import { useState } from "react";
import { useDispatch } from "react-redux";
import DashboardShell from "@/flows/landing/LandingLink/DashboardShell/DashboardShell";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import "./QuestBoard.css";

const PROCESS = [
  { title: "1. Create", icon: "FileText", tone: "teal", text: "Draft your scope, requirements, and milestones." },
  { title: "2. Match", icon: "Users", tone: "blue", text: "Our algorithm matches you with S-Rank professionals." },
  { title: "3. Fund", icon: "Lock", tone: "pink", text: "Secure the project by funding the escrow wallet." },
  { title: "4. Collaborate", icon: "CircleCheck", tone: "orange", text: "Work together and release funds per milestone." },
];

const CHECKLIST = [
  { id: "requirements", label: "Requirements ready" },
  { id: "budget", label: "Budget estimated" },
  { id: "timeline", label: "Timeline decided" },
  { id: "skills", label: "Skills identified" },
];

const WHY = [
  {
    title: "Verified Professionals",
    text: "Only engineers who pass our technical audits are eligible to apply.",
  },
  {
    title: "Secure Escrow Protection",
    text: "Your capital stays in a neutral vault until your technical criteria are met.",
  },
  {
    title: "Trust-Based Ranking",
    text: "View real-time reputation scores (F to S Rank) for every applicant.",
  },
  {
    title: "Milestone Tracking",
    text: "Break complex projects into manageable pieces with clear delivery gates.",
  },
];

function QuestArt() {
  return (
    <svg viewBox="0 0 320 260" className="qb-art art" aria-hidden="true">
      <path d="M46 54C78 14 214 16 266 58c46 37 40 126-2 162-45 39-166 42-208 5-38-34-44-130-10-171Z" fill="#bfe8e9" />
      <ellipse cx="160" cy="228" rx="108" ry="13" fill="#d7eef0" />

      <rect x="112" y="100" width="10" height="12" rx="3" fill="#c68a63" />
      <circle cx="118" cy="86" r="18" fill="#c68a63" />
      <path d="M100 82c2-14 10-21 22-20 12 1 18 10 17 22-6-6-13-9-21-9-7 0-13 2-18 7Z" fill="#1c2433" />
      <path d="M98 116c8-8 34-8 42 0l10 52c-20 8-42 8-62 0l10-52Z" fill="#22304f" />
      <path d="M112 116h12l6 13-12 15-12-15 6-13Z" fill="#ffffff" />
      <path d="M98 120c-8 8-10 20-10 30 0 6 4 9 9 9s8-4 8-9l4-22-11-8Z" fill="#22304f" />
      <path d="M136 122c18 2 30 8 36 18 4 7 0 13-6 15-6 2-10-2-12-7-6-9-14-14-22-16l4-10Z" fill="#22304f" />
      <circle cx="168" cy="150" r="8" fill="#c68a63" />
      <path d="M104 164h16l-2 48h-16l2-48Z" fill="#1c2740" />
      <path d="M126 164h16l4 48h-16l-4-48Z" fill="#1c2740" />
      <path d="M96 212h28c5 0 8 3 8 7H94c-3 0-4-2-4-4s2-3 6-3Z" fill="#8b5a3c" />
      <path d="M126 212h28c5 0 8 3 8 7h-38c-3 0-4-2-4-4s2-3 6-3Z" fill="#8b5a3c" />

      <rect x="209" y="113" width="10" height="12" rx="3" fill="#a8724f" />
      <circle cx="214" cy="100" r="17" fill="#a8724f" />
      <path d="M196 96c1-13 9-20 20-19 11 1 17 9 16 20-6-5-12-7-19-7-6 0-12 2-17 6Z" fill="#1c2433" />
      <path d="M197 98c-1-9 6-16 17-16s18 6 17 16" fill="none" stroke="#1c2433" strokeWidth="5" strokeLinecap="round" />
      <circle cx="207" cy="101" r="4.5" fill="none" stroke="#1c2433" strokeWidth="1.6" />
      <circle cx="220" cy="101" r="4.5" fill="none" stroke="#1c2433" strokeWidth="1.6" />
      <path d="M211.5 101h4" stroke="#1c2433" strokeWidth="1.6" />
      <path d="M192 121c10-9 34-9 44 0l8 48c-20 8-40 8-60 0l8-48Z" fill="#1fa3a3" />
      <path d="M196 128c-14 4-26 10-32 18-4 7-1 13 5 15 6 2 10-2 13-7 5-8 12-13 20-15l-6-11Z" fill="#1fa3a3" />
      <circle cx="166" cy="150" r="8" fill="#a8724f" />
      <path d="M238 128c8 6 12 16 14 24 1 6-3 10-8 10-5 0-8-4-8-9l-6-17 8-8Z" fill="#1fa3a3" />
      <path d="M202 166h16l-2 46h-16l2-46Z" fill="#1c2740" />
      <path d="M224 166h16l4 46h-16l-4-46Z" fill="#1c2740" />
      <path d="M194 212h28c5 0 8 3 8 7h-38c-3 0-4-2-4-4s2-3 6-3Z" fill="#8b5a3c" />
      <path d="M224 212h28c5 0 8 3 8 7h-38c-3 0-4-2-4-4s2-3 6-3Z" fill="#8b5a3c" />

      <path d="M252 170v-6c0-3 2-5 5-5h8c3 0 5 2 5 5v6" fill="none" stroke="#1c2740" strokeWidth="3" />
      <rect x="240" y="170" width="38" height="30" rx="5" fill="#1c2740" />
      <path d="M240 181h38" stroke="#42506d" strokeWidth="2" />
      <rect x="254" y="179" width="10" height="4" rx="2" fill="#8ea0c4" />
    </svg>
  );
}

export default function QuestBoard() {
  const dispatch = useDispatch();
  const [checks, setChecks] = useState({
    requirements: false,
    budget: false,
    timeline: false,
    skills: false,
  });

  const comingSoon = () => {
    dispatch(showSnackbar({ message: "Coming Soon", type: "info" }));
  };

  const toggleCheck = (id) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <DashboardShell>
      <header className="dash-page-head qb-head">
        <h1>Quest Board</h1>
        <p>
          Create a trusted project and connect with verified professionals. Define your requirements, set your
          milestones, and start building with confidence.
        </p>
      </header>

      <div className="qb-layout">
        <div className="qb-main">
          <section className="qb-welcome">
            <div className="qb-welcome-copy">
              <span className="qb-pill">
                <Icon name="Sparkles" size={14} color="#0062FF" />
                GETTING STARTED
              </span>
              <h2>Welcome to Quest Creation</h2>
              <p>
                TechGuild is built on the pillars of transparency and institutional trust. By posting a "Quest," you
                aren't just listing a job; you're initiating a secure, milestone-driven collaboration. Every Quest
                includes our mandatory Escrow protection, ensuring that funds are only released when you've approved
                the work delivered.
              </p>
              <div className="qb-trust">
                <span>
                  <Icon name="BadgeCheck" size={17} color="#0062FF" />
                  Verified Experts
                </span>
                <span>
                  <Icon name="Lock" size={17} color="#0062FF" />
                  Escrow Protected
                </span>
              </div>
            </div>
            <div className="qb-welcome-art">
              <QuestArt />
            </div>
          </section>

          <h2 className="qb-subtitle">How the Process Works</h2>
          <div className="qb-process">
            {PROCESS.map(({ title, icon, tone, text }) => (
              <article className="qb-process-card" key={title}>
                <span className={`qb-process-icon ${tone}`}>
                  <Icon name={icon} size={22} color="#ffffff" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <section className="qb-why">
            <div className="qb-why-head">
              <h2>Why Post a Quest on TechGuild?</h2>
              <Icon name="Sparkles" size={20} color="#0062FF" />
            </div>
            <div className="qb-why-grid">
              {WHY.map(({ title, text }) => (
                <div className="qb-why-item" key={title}>
                  <Icon name="CircleCheck" size={20} color="#10b981" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="qb-side">
          <button type="button" className="dash-btn dash-btn-primary qb-start" onClick={comingSoon}>
            Start Creating Quest
          </button>

          <section className="qb-side-card qb-setup">
            <span className="qb-setup-icon">
              <Icon name="Clock" size={23} color="#334155" />
            </span>
            <p className="qb-side-label">SETUP TIME</p>
            <strong>5 - 10 Minutes</strong>
            <p>Average time to complete draft.</p>
          </section>

          <section className="qb-side-card qb-checklist">
            <p className="qb-side-label">BEFORE YOU BEGIN</p>
            {CHECKLIST.map(({ id, label }) => (
              <label className="qb-check-row" key={id}>
                <input type="checkbox" checked={checks[id]} onChange={() => toggleCheck(id)} />
                <span>{label}</span>
              </label>
            ))}
          </section>

          <section className="qb-help">
            <Icon name="CircleQuestionMark" size={25} color="#0062FF" />
            <h2>Need Help?</h2>
            <p>
              Unsure about how to structure your escrow? Our guides cover best practices for client-contractor
              relations.
            </p>
            <button type="button" className="qb-help-link" onClick={comingSoon}>
              View Guide
            </button>
            <button type="button" className="qb-help-link" onClick={comingSoon}>
              Contact Support
            </button>
          </section>
        </aside>
      </div>
    </DashboardShell>
  );
}
