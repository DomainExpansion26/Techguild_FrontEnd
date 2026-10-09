import { useState } from "react";
import { Popup, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { APP_STRINGS } from "@/constants/string";
import "./hallsmodal.css";

const G = APP_STRINGS.GUILD_HALL;
const H = G.HALLS;

// Avatar chip tones: initials -> [background, text].
const AVATAR_TONES = {
  PS: ["#f0ebff", "#7c3aed"],
  RS: ["#e0fff4", "#059669"],
  NK: ["#ffe4ec", "#e11d48"],
  JT: ["#fff3e0", "#d97706"],
  AG: ["#fde8ff", "#9333ea"],
  AI: ["#e0edff", "#103ca4"],
  SK: ["#fff0e0", "#c2410c"],
  RV: ["#e0f0ff", "#103ca4"],
  KN: ["#f0fff4", "#059669"],
  MP: ["#e0ffe8", "#16a34a"],
  MF: ["#fff0fb", "#be185d"],
};

const DEFAULT_TONE = ["#e0edff", "#103ca4"];

const FEATURED = {
  id: "ai-builders",
  name: "AI Builders",
  sub: "Prompt, ship, iterate",
  desc: "Prompt, ship, iterate — 4.1k builders, and 62 inside right now.",
  stack: ["PS", "RS", "NK", "JT", "AG", "AI"],
  icon: "Star",
  tileBg: "rgba(180, 245, 230, 0.45)",
  tileFg: "#0f766e",
  status: { label: "Live", bg: "rgba(240, 245, 255, 0.9)", dot: "#22c55e" },
  inside: 62,
  members: "4.1k members",
  topic: "Weekly prompt teardowns",
};

const HALLS = [
  {
    id: "ui-ux-designers",
    name: "UI/UX Designers",
    sub: "Where pixels meet opinions",
    icon: "Layers",
    tileBg: "rgba(139, 92, 246, 0.12)",
    tileFg: "#7c3aed",
    status: { label: "Warm", bg: "#e1ebff", dot: "#103ca4" },
    inside: 86,
    topic: "Critique thread: onboarding flows",
    stack: ["SK", "RV", "PS"],
    members: "12.4k members",
  },
  {
    id: "developers",
    name: "Developers",
    sub: "Ship, debug, repeat",
    icon: "Code",
    tileBg: "#e1ebff",
    tileFg: "#103ca4",
    status: { label: "Live", bg: "rgba(240, 245, 255, 0.9)", dot: "#22c55e" },
    inside: 240,
    topic: "React 19 migration war stories",
    stack: ["MP", "SK", "RV"],
    members: "18.9k members",
  },
  {
    id: "founders",
    name: "Founders",
    sub: "Zero to one, together",
    icon: "Zap",
    tileBg: "rgba(251, 146, 60, 0.14)",
    tileFg: "#ea580c",
    status: { label: "Cozy", bg: "rgba(240, 242, 248, 0.9)", dot: "#94a3b8" },
    inside: 31,
    topic: "Finding your first 10 customers",
    stack: ["KN", "MF", "SK"],
    members: "6.2k members",
  },
  {
    id: "product-growth",
    name: "Product & Growth",
    sub: "Metrics with meaning",
    icon: "TrendingUp",
    tileBg: "rgba(34, 197, 94, 0.12)",
    tileFg: "#16a34a",
    status: { label: "Warm", bg: "#e1ebff", dot: "#103ca4" },
    inside: 54,
    topic: "Retention benchmarks for 2026",
    stack: ["AI", "KN", "MF"],
    members: "9.8k members",
  },
];

const DETAIL_INSIDE = ["NK", "JT", "AG", "AI", "KN", "MP", "SK", "RV", "PS"];

const RHYTHM = [
  { day: "M", height: 38 },
  { day: "T", height: 52 },
  { day: "W", height: 68 },
  { day: "T", height: 82 },
  { day: "F", height: 120, active: true },
  { day: "S", height: 60 },
  { day: "S", height: 30 },
];

const HAPPENS = [
  "Daily critique threads on real work",
  "Monthly portfolio roast — the kind kind",
  "Design-system clinics every other week",
];

const PEOPLE = [
  { initials: "PS", name: "Priya Sharma", role: "Senior Product Designer" },
  { initials: "SK", name: "Sana Khan", role: "Product Designer" },
  { initials: "AI", name: "Ananya Iyer", role: "UX Researcher" },
];

function Avatar({ initials, variant = "sm", online = false }) {
  const [bg, fg] = AVATAR_TONES[initials] || DEFAULT_TONE;
  return (
    <span
      className={`hm-av hm-av--${variant}${online ? " is-online" : ""}`}
      style={{ backgroundColor: bg, color: fg }}
    >
      {initials}
    </span>
  );
}

function AvatarStack({ items, variant = "sm" }) {
  const ordered = [...items].reverse();
  return (
    <span className={`hm-stack hm-stack--${variant}`} aria-hidden="true">
      {ordered.map((initials, index) => (
        <Avatar key={`${initials}-${index}`} initials={initials} variant={variant} />
      ))}
    </span>
  );
}

function StatusPill({ status }) {
  return (
    <span className="hm-pill" style={{ backgroundColor: status.bg }}>
      <span className="hm-dot" style={{ backgroundColor: status.dot }} />
      {status.label}
    </span>
  );
}

function ListView({ onExplore }) {
  const [filter, setFilter] = useState(H.TABS[0]);
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const visible = HALLS.filter((hall) => hall.name.toLowerCase().includes(search));

  return (
    <>
      <div className="hm-banner">
        <span className="hm-banner-tile" aria-hidden="true">
          <Icon
            name="Star"
            size={22}
            color="#0d9488"
            fill="#0d9488"
            strokeWidth={0}
            style={{ opacity: 0.85 }}
          />
        </span>
        <div className="hm-banner-mid">
          <span className="hm-banner-badge">{H.BADGE}</span>
          <span className="hm-banner-name">{FEATURED.name}</span>
          <span className="hm-banner-desc">{FEATURED.desc}</span>
        </div>
        <div className="hm-banner-side">
          <AvatarStack items={FEATURED.stack} variant="md" />
          <div className="hm-banner-btns">
            <SecondaryButton text={H.JOIN} className="hm-btn hm-btn--join" />
            <PrimaryButton
              text={H.EXPLORE}
              className="hm-btn hm-btn--explore"
              onClick={() => onExplore(FEATURED.id)}
            />
          </div>
        </div>
      </div>

      <div className="hm-tools">
        <div className="hm-filters" role="group" aria-label={H.TITLE}>
          {H.TABS.map((tab) => (
            <button
              type="button"
              key={tab}
              className={`hm-chip${filter === tab ? " is-active" : ""}`}
              aria-pressed={filter === tab}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <label className="hm-search">
          <Icon name="Search" size={13} color="#8898aa" strokeWidth={1.5} />
          <input
            type="search"
            className="hm-search-input"
            placeholder={H.SEARCH}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <div className="hm-grid">
        {visible.length === 0 && <p className="hm-empty">No halls match your search.</p>}
        {visible.map((hall) => (
          <div className="hm-card" key={hall.id}>
            <div className="hm-card-head">
              <span
                className="hm-tile"
                style={{ backgroundColor: hall.tileBg, color: hall.tileFg }}
                aria-hidden="true"
              >
                <Icon name={hall.icon} size={20} color={hall.tileFg} strokeWidth={1.7} />
              </span>
              <span className="hm-card-text">
                <span className="hm-card-name">{hall.name}</span>
                <span className="hm-card-sub">{hall.sub}</span>
              </span>
              <StatusPill status={hall.status} />
            </div>
            <div className="hm-strip">
              <span className="hm-dot" style={{ backgroundColor: "#22c55e" }} />
              <strong className="hm-strip-count">{hall.inside}</strong>
              <span className="hm-strip-label">{H.INSIDE_NOW}</span>
              <span className="hm-strip-sep">·</span>
              <span className="hm-strip-topic">{hall.topic}</span>
            </div>
            <div className="hm-card-foot">
              <span className="hm-card-meta">
                <AvatarStack items={hall.stack} variant="xs" />
                <span className="hm-card-members">{hall.members}</span>
              </span>
              <span className="hm-card-btns">
                <SecondaryButton text={H.JOIN} className="hm-btn hm-btn--sm-join" />
                <PrimaryButton
                  text={H.EXPLORE}
                  className="hm-btn hm-btn--sm-explore"
                  onClick={() => onExplore(hall.id)}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function DetailView({ hall, onBack }) {
  return (
    <>
      <button type="button" className="hm-back" onClick={onBack}>
        <Icon name="ChevronLeft" size={14} color="#103ca4" strokeWidth={1.7} />
        {H.BACK}
      </button>

      <div className="hm-hero">
        <span
          className="hm-hero-tile"
          style={{ backgroundColor: hall.tileBg }}
          aria-hidden="true"
        >
          <Icon name={hall.icon} size={20} color={hall.tileFg} strokeWidth={1.6} />
        </span>
        <span className="hm-hero-text">
          <span className="hm-hero-name">{hall.name}</span>
          <span className="hm-hero-sub">{hall.sub}</span>
        </span>
        <span className="hm-hero-pills">
          <span className="hm-hero-pill">
            <span className="hm-dot" style={{ backgroundColor: hall.status.dot }} />
            {hall.status.label}
          </span>
          <span className="hm-hero-pill">{hall.members}</span>
          <span className="hm-hero-pill">
            <span className="hm-dot" style={{ backgroundColor: "#22c55e" }} />
            {hall.inside} {H.INSIDE_SUFFIX}
          </span>
        </span>
      </div>

      <div className="hm-inside">
        <div className="hm-inside-label">
          <span className="hm-dot" style={{ backgroundColor: "#22c55e" }} />
          {H.INSIDE_LABEL}
        </div>
        <div className="hm-inside-people">
          <AvatarStack items={DETAIL_INSIDE} variant="lg" online />
        </div>
        <div className="hm-inside-topic">
          <strong>{H.NOW_DISCUSSING}</strong> {hall.topic}
        </div>
      </div>

      <div className="hm-cols">
        <div className="hm-panel hm-rhythm">
          <h3 className="hm-panel-title">{H.WEEKLY_RHYTHM}</h3>
          <div className="hm-chart">
            {RHYTHM.map((bar, index) => (
              <span className="hm-chart-col" key={`${bar.day}-${index}`}>
                <span
                  className={`hm-bar${bar.active ? " is-active" : ""}`}
                  style={{ height: bar.height }}
                />
                <span className={`hm-chart-day${bar.active ? " is-active" : ""}`}>
                  {bar.day}
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="hm-panel hm-happens">
          <h3 className="hm-panel-title">{H.WHAT_HAPPENS}</h3>
          <ul className="hm-list">
            {HAPPENS.map((item) => (
              <li className="hm-list-item" key={item}>
                <Icon name="Check" size={16} color="#103ca4" strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hm-panel hm-people">
        <h3 className="hm-panel-title">{H.PEOPLE}</h3>
        <div className="hm-people-rows">
          {PEOPLE.map((person) => (
            <div className="hm-person" key={person.name}>
              <Avatar initials={person.initials} variant="person" />
              <span className="hm-person-text">
                <span className="hm-person-name">{person.name}</span>
                <span className="hm-person-role">{person.role}</span>
              </span>
              <SecondaryButton text={H.SAY_HI} className="hm-btn hm-btn--sayhi" />
            </div>
          ))}
        </div>
      </div>

      <div className="hm-joinbar">
        <span className="hm-joinbar-text">
          <span className="hm-joinbar-title">{H.OPEN_TITLE}</span>
          <span className="hm-joinbar-desc">{H.OPEN_DESC}</span>
        </span>
        <PrimaryButton text={H.JOIN_CTA} className="hm-btn hm-btn--ctajoin" />
      </div>
    </>
  );
}

export default function HallsModal({
  open = false,
  view = "list",
  hallId = "ui-ux-designers",
  onClose = () => {},
  onBack = () => {},
  onExplore = () => {},
}) {
  const hall =
    HALLS.find((item) => item.id === hallId) ||
    (hallId === FEATURED.id ? FEATURED : HALLS[0]);

  return (
    <Popup
      open={open}
      onClose={onClose}
      title={H.TITLE}
      subtitle={
        <span className="hm-stats">
          <strong>{H.COUNT}</strong>
          <span>·</span>
          <span>{H.MEMBERS}</span>
          <span>·</span>
          <span>{H.INSIDE}</span>
        </span>
      }
      showCloseButton={false}
      cardClassName={`hm-modal${view === "detail" ? " hm-modal--detail" : ""}`}
      headerClassName="hm-header"
      titleClassName="hm-title"
      subtitleClassName="hm-statsline"
      bodyClassName={`hm-body${view === "detail" ? " hm-body--detail" : ""}`}
      style={{ "--popup-width": "900px" }}
    >
      <button type="button" className="hm-close" aria-label="Close" onClick={onClose}>
        <Icon name="X" size={18} color="#7d8eaa" strokeWidth={1.8} />
      </button>
      {view === "detail" ? (
        <DetailView hall={hall} onBack={onBack} />
      ) : (
        <ListView onExplore={onExplore} />
      )}
    </Popup>
  );
}
