// 03-11-2026
// Shared legal page layout and content primitives used by the Privacy, Terms, and Security pages.
import { useState } from "react";
import { Link } from "react-router-dom";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Footer from "@/flows/landing/LandingLink/Footer/Footer";
import Icon from "@/Components/icons/Icon";
import "./legal.css";

const NAV_ITEMS = [
  { key: "privacy", label: "Privacy Policy", icon: "FileText", to: "/privacy-policy" },
  { key: "terms", label: "Terms of Service", icon: "Bookmark", to: "/terms" },
  { key: "security", label: "Security", icon: "Shield", to: "/security" },
];

function ShieldArt() {
  return (
    <svg viewBox="0 0 300 180" role="img" aria-label="Shield with a lock">
      <g stroke="#dae6f6" strokeWidth="10" strokeLinecap="round" opacity="0.9">
        <path d="M16 62h96" />
        <path d="M8 84h108" />
        <path d="M20 106h96" />
        <path d="M30 128h72" />
        <path d="M208 62h76" />
        <path d="M198 84h86" />
        <path d="M214 106h70" />
        <path d="M226 128h54" />
      </g>

      <g fill="#2f7cf6" strokeLinecap="round">
        <path d="M246 22l14-8" stroke="#2f7cf6" strokeWidth="3" />
        <path d="M250 33l16-5" stroke="#2f7cf6" strokeWidth="3" />
        <path d="M248 44l13 2" stroke="#2f7cf6" strokeWidth="3" />
      </g>

      <defs>
        <linearGradient id="lgShieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4d93ff" />
          <stop offset="1" stopColor="#1b46c9" />
        </linearGradient>
      </defs>

      <path
        d="M165 18c20 9 37 12 50 14v34c0 34-20 57-50 70-30-13-50-36-50-70V32c13-2 30-5 50-14Z"
        fill="url(#lgShieldGrad)"
        stroke="#1740b4"
        strokeWidth="2"
      />
      <path d="M165 30c15 7 28 9 38 11v25c0 26-15 44-38 54-23-10-38-28-38-54V41c10-2 23-4 38-11Z" fill="#ffffff" opacity="0.1" />

      <rect x="146" y="66" width="38" height="30" rx="5" fill="#ffffff" />
      <path d="M154 66v-8a11 11 0 0 1 22 0v8" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <circle cx="165" cy="80" r="4" fill="#2f7cf6" />
      <rect x="163" y="82" width="4" height="8" rx="2" fill="#2f7cf6" />

      <circle cx="119" cy="101" r="15" fill="#21c45d" />
      <path d="M112 101l5 5 9-10" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TermsArt() {
  return (
    <svg viewBox="0 0 300 180" role="img" aria-label="Document with a check mark">
      <rect x="196" y="20" width="40" height="116" rx="18" fill="#0b63f6" transform="rotate(7 216 78)" />
      <rect x="70" y="30" width="146" height="118" rx="18" fill="#ffffff" />
      <rect x="92" y="54" width="82" height="13" rx="6.5" fill="#1e63f0" />
      <rect x="92" y="79" width="100" height="9" rx="4.5" fill="#dfe9f8" />
      <rect x="92" y="97" width="82" height="9" rx="4.5" fill="#e8effa" />
      <rect x="92" y="115" width="94" height="9" rx="4.5" fill="#e8effa" />
      <circle cx="78" cy="46" r="16" fill="#21c45d" />
      <path d="M70 46l6 6 10-12" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M96 26c18-8 42-9 60-4" fill="none" stroke="#dbe7f8" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export default function LegalPage({ active, title, subtitle, art = "shield", children }) {
  return (
    <div className="lg-page">
      <PublicHeader />

      <div className="lg-wrap">
        <section className="lg-hero">
          <div className="lg-hero-copy">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="lg-hero-art" aria-hidden="true">
            {art === "terms" ? <TermsArt /> : <ShieldArt />}
          </div>
        </section>

        <div className="lg-layout">
          <aside className="lg-side">
            <nav className="lg-side-nav" aria-label="Legal pages">
              {NAV_ITEMS.map((item) => {
                const isActive = item.key === active;

                return (
                  <Link
                    key={item.key}
                    to={item.to}
                    className={`lg-side-link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="lg-side-icon">
                      <Icon name={item.icon} size={14} color={isActive ? "#ffffff" : "#475569"} />
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main className="lg-sections">{children}</main>
        </div>
      </div>

      <Footer active={active} />
    </div>
  );
}

export function LegalSection({ index, title, children }) {
  const [open, setOpen] = useState(true);

  return (
    <section className="lg-section">
      <button
        type="button"
        className="lg-section-head"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="lg-section-num">{index}</span>
        <span className="lg-section-title">{title}</span>
        <Icon
          name="ChevronDown"
          size={14}
          color="#94a3b8"
          className={`lg-chevron${open ? " is-open" : ""}`}
        />
      </button>

      {open ? <div className="lg-section-body">{children}</div> : null}
    </section>
  );
}

export function LegalLead({ children }) {
  return <p className="lg-lead">{children}</p>;
}

export function CardGrid({ columns = 4, variant = "top", items = [] }) {
  return (
    <div className={`lg-cards lg-cols-${columns} lg-cards-${variant}`}>
      {items.map((item) => (
        <article className="lg-card" key={item.title}>
          <span className="lg-card-icon">
            <Icon name={item.icon} size={15} color="#2f6fed" />
          </span>
          <div className="lg-card-copy">
            <strong>{item.title}</strong>
            {item.text ? <p>{item.text}</p> : null}
            {item.lines ? (
              <ul className="lg-card-lines">
                {item.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function Callout({ icon, title, children }) {
  return (
    <div className="lg-callout">
      <span className="lg-callout-icon">
        <Icon name={icon} size={15} color="#2f6fed" />
      </span>
      <div className="lg-callout-body">
        {title ? <strong>{title}</strong> : null}
        {children}
      </div>
    </div>
  );
}

export function CheckList({ items = [] }) {
  return (
    <ul className="lg-checks">
      {items.map((item) => (
        <li className="lg-check-item" key={item}>
          <span className="lg-check-dot">
            <Icon name="Check" size={9} color="#ffffff" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CheckGrid({ items = [] }) {
  return (
    <div className="lg-check-grid">
      {items.map((item) => (
        <div className="lg-check-item" key={item}>
          <span className="lg-check-dot">
            <Icon name="Check" size={9} color="#ffffff" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function ContactBox({ email }) {
  return (
    <div className="lg-contact">
      <a href={`mailto:${email}`} className="lg-contact-item">
        <Icon name="Mail" size={15} color="#2f6fed" />
        {email}
      </a>
      <span className="lg-contact-divider" aria-hidden="true" />
      <Link to="/help-center" className="lg-contact-item">
        <Icon name="LifeBuoy" size={15} color="#2f6fed" />
        via our Help &amp; Support page
      </Link>
    </div>
  );
}
