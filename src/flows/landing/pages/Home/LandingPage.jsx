import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/Components/icons/Icon";
import "./LandingPage.css";

import heroBg from "@/assets/landing-Img/Thumbnail.png";
import papersBg from "@/assets/landing-Img/pexels-ds-stories-6991360 (1) 2.png";
import aiTexture from "@/assets/landing-Img/toa-heftiba-i0p916iq-ew-unsplash 2.png";
import questBoard from "@/assets/landing-Img/QuestBoardShot.png";
import taskMgmt from "@/assets/landing-Img/TaskMgmtShot.png";
import milestonePlanner from "@/assets/landing-Img/MilestoneShot.png";
import cardWeb from "@/assets/landing-Img/Frame 1707482912.png";
import cardBrand from "@/assets/landing-Img/Frame 1707482913.png";
import cardAI from "@/assets/landing-Img/Frame 1707482914.png";
import cardMobile from "@/assets/landing-Img/Frame 1707482915.png";
import cardUIUX from "@/assets/landing-Img/Frame 1707482916.png";
import frontCard from "@/assets/landing-Img/GuildCardFront.png";
import backCard from "@/assets/landing-Img/GuildCardBack.png";

/* ---------- data ---------- */

const PROCESS_STEPS = [
  { n: "01", title: "Create Account", text: "Sign up as a Freelancer, Client, Agency, or Party." },
  { n: "02", title: "Get Verified", text: "Verify your identity, skills, and professional profile." },
  { n: "03", title: "Discover or Post Quests", text: "Browse opportunities or create a Quest with requirements, budget, and milestones." },
  { n: "04", title: "Collaborate & Execute", text: "Work with your team, manage milestones, communicate, and track progress." },
  { n: "05", title: "Secure Milestone Payments", text: "Funds are protected through escrow and released after milestone approval." },
  { n: "06", title: "Earn Trust & Grow", text: "Complete Quests, earn Trust Points, increase your Rank, and unlock better opportunities." },
];

const RANKS = [
  { r: "F", label: "Rank F", sub: "Getting started" },
  { r: "E", label: "Rank E", sub: "Building profile" },
  { r: "D", label: "Rank D", sub: "Trusted member" },
  { r: "C", label: "Rank C", sub: "Established pro" },
  { r: "B", label: "Rank B", sub: "Top performer" },
  { r: "A", label: "Rank A", sub: "Elite talent" },
  { r: "S", label: "Rank S", sub: "Guild legend" },
];

const TRUST_CARDS = [
  { icon: "Shield", title: "Verified Identity", text: "Know who you are working with." },
  { icon: "BadgeCheck", title: "Verified Skills", text: "Build confidence through professional verification." },
  { icon: "Lock", title: "Secure Escrow", text: "Protect payments throughout every milestone." },
  { icon: "TrendingUp", title: "Transparent Reputation", text: "Make better decisions using real performance history." },
];

const ESCROW_STEPS = [
  "Client funds Quest",
  "Funds held in escrow",
  "Work begins",
  "Milestone submitted",
  "Client approves",
  "Payment released",
];

const FAQS = [
  { q: "What is TechGuild?", a: "TechGuild is a trust-first ecosystem for professional collaboration — discover Quests, build Parties, and grow your Rank with verified identity and escrow protection." },
  { q: "What is a Quest?", a: "A Quest is a structured work opportunity with clear requirements, budget, milestones, and timelines posted by verified clients." },
  { q: "What is a Party?", a: "A Party is a trusted team of professionals with complementary skills who collaborate together on Quests." },
  { q: "How does verification work?", a: "Verify your identity, skills, and professional profile to earn Verified status, Trust Points, and higher Ranks." },
  { q: "How does AI matching work?", a: "TechGuild uses intelligent recommendations to match professionals with relevant Quests and compatible Party members based on skills, experience, and trust." },
];

const PARTY_MEMBERS = [
  { init: "AM", role: "UI/UX Designer" },
  { init: "RK", role: "Developer" },
  { init: "SV", role: "Product Manager" },
  { init: "PT", role: "QA Engineer" },
  { init: "NK", role: "Marketing" },
  { init: "DG", role: "AI Specialist" },
];

const MILESTONES = [
  ["Discovery & Research", "100%"],
  ["Wireframes", "100%"],
  ["UI Design", "62%"],
  ["Prototype", "0%"],
];

function Marquee({ items }) {
  const row = items.map((t) => (
    <span className="tg-mq-item" key={t}>{t}<i>◆</i></span>
  ));
  return (
    <div className="tg-marquee" aria-hidden="true">
      <div className="tg-mq-track">{row}{row}</div>
    </div>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1.4" fill="currentColor" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="tg-landing">
      {/* ============ NAV ============ */}
      <header className="tg-nav-float">
        <Link to="/home" className="tg-logo">
          <span className="tg-logo-tech">Tech</span><span className="tg-logo-guild">Guild</span>
        </Link>
        <nav className="tg-nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#services">Services</a>
          <a href="#quests">Quests</a>
          <a href="#trust">Trust System</a>
        </nav>
        <div className="tg-nav-cta">
          <Link to="/login" className="tg-signin">Sign In</Link>
          <Link to="/signup" className="tg-btn-primary">Get Started</Link>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="tg-hero" id="home">
        <img className="tg-hero-art" src={heroBg} alt="" aria-hidden="true" />
        <div className="tg-hero-glow" />
        <div className="tg-wrap tg-hero-grid">
          <div className="tg-hero-copy">
            <p className="tg-hero-eyebrow"><i>•</i> THE TRUST-FIRST PROFESSIONAL ECOSYSTEM</p>
            <h1>Build trust.<br />Find better projects.<br /><span>Collaborate<br />without limits.</span></h1>
            <p className="tg-hero-sub">
              TechGuild connects verified freelancers, agencies, Parties, and clients through a
              trusted ecosystem where professionals collaborate on meaningful projects, build
              reputation, and unlock better opportunities.
            </p>
            <div className="tg-hero-actions">
              <Link to="/signup" className="tg-btn-primary lg">Get Started <span aria-hidden="true">→</span></Link>
              <Link to="#quests" className="tg-btn-white">Explore Quest Board</Link>
            </div>
            <ul className="tg-hero-ticks">
              <li><span className="tick">✓</span>Verified Professionals</li>
              <li><span className="tick">✓</span>Secure Escrow Payments</li>
              <li><span className="tick">✓</span>Trust-Based Ranking</li>
              <li><span className="tick">✓</span>AI-Powered Collaboration</li>
            </ul>
          </div>

          <div className="tg-hero-visual">
            <div className="tg-dash">
              <div className="tg-dash-url"><Icon name="Shield" size={12} color="#2456e6" /> app.techguild.io</div>
              <div className="tg-dash-body">
                <aside className="tg-dash-side">
                  <p className="tg-dash-brand"><b>TG</b> TechGuild</p>
                  <ul>
                    <li className="on"><Icon name="Layers" size={14} color="#2456e6" /> Dashboard</li>
                    <li><Icon name="Search" size={14} color="#94a3b8" /> Quest Board</li>
                    <li><Icon name="Users" size={14} color="#94a3b8" /> My Party</li>
                    <li><Icon name="Lock" size={14} color="#94a3b8" /> Escrow</li>
                    <li><Icon name="Star" size={14} color="#94a3b8" /> Rank</li>
                  </ul>
                </aside>
                <div className="tg-dash-main">
                  <p className="tg-dash-welcome">Welcome back,</p>
                  <p className="tg-dash-user">Aarav Mehta · <span>Rank D</span></p>
                  <div className="tg-dash-stats">
                    <div><span>Trust Points</span><strong>8,420</strong></div>
                    <div><span>Active Quests</span><strong>5</strong></div>
                    <div><span>In Escrow</span><strong>₹2.4L</strong></div>
                  </div>
                  <div className="tg-dash-ms">
                    <p><strong>Milestone progress</strong><span>Website Redesign</span></p>
                    {MILESTONES.map(([k, v]) => (
                      <div className="tg-dash-bar-row" key={k}>
                        <span>{k}</span><em>{v}</em>
                        <div className="tg-bar"><i style={{ width: v }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="tg-chip c1"><span>Verified Client</span><p>Trust Score <em>✓ 98</em></p></div>
            <div className="tg-chip c2"><span>Quest Budget</span><strong>₹ 75,000</strong></div>
            <div className="tg-chip c3"><span className="pill">✦ Party</span><strong className="blue">94% Match</strong></div>
            <div className="tg-chip c4"><span>Escrow</span><p className="green">Protected</p><b>A</b></div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="tg-stats-band">
        <div className="tg-wrap tg-stats-grid">
          <div><strong>120K+</strong><span>Verified Professionals</span></div>
          <div><strong>25K+</strong><span>Trusted Parties</span></div>
          <div><strong>600K+</strong><span>Completed Quests</span></div>
          <div><strong>97%</strong><span>Average Trust Score</span></div>
        </div>
      </section>

      <Marquee items={["SECURE ESCROW", "TRUST-BASED RANKING", "AI COLLABORATION", "TRANSPARENT MILESTONES", "REPUTATION SYSTEM"]} />

      {/* ============ ABOUT ============ */}
      <section className="tg-about" id="about">
        <div className="tg-wrap tg-split">
          <div>
            <p className="tg-eyebrow">ABOUT TECHGUILD</p>
            <h2>Where trust meets opportunity</h2>
            <p className="tg-muted">TechGuild is a professional collaboration platform that brings together verified freelancers, agencies, Parties, and clients in one trusted ecosystem.</p>
            <p className="tg-muted">Instead of competing in crowded marketplaces, professionals collaborate through structured projects called <strong>Quests</strong>, supported by transparent milestones, secure escrow payments, reputation-based rankings, and intelligent recommendations.</p>
            <p className="tg-muted">Our mission is to help professionals build trust, grow their reputation, and unlock better opportunities through meaningful collaboration.</p>
          </div>
          <div className="tg-eco-card">
            <div className="tg-eco-grid">
              {[
                ["Users", "Freelancer", false],
                ["Users", "Party", false],
                ["Building2", "Agency", false],
                ["UserCheck", "Client", false],
                ["Star", "Quest", true],
                ["Shield", "Trust Score", false],
              ].map(([icon, label, on]) => (
                <div key={label} className={`tg-eco-tile${on ? " on" : ""}`}>
                  <span className="tg-eco-ico"><Icon name={icon} size={20} color={on ? "#ffffff" : "#2456e6"} /></span>
                  <strong>{label}</strong>
                </div>
              ))}
            </div>
            <div className="tg-eco-foot"><strong>Connected ecosystem</strong><span><b>A</b><em>✓ 97%</em></span></div>
          </div>
        </div>
      </section>

      {/* ============ WHY ============ */}
      <section className="tg-why">
        <div className="tg-wrap">
          <p className="tg-eyebrow">WHY TECHGUILD</p>
          <h2>Why choose TechGuild?</h2>
          <p className="tg-muted">A smarter way to collaborate, build trust, and grow your professional career.</p>
          <div className="tg-why-grid">
            {[
              ["Shield", "Trust-First Ecosystem", "Verified professionals and transparent workflows create a safer environment for collaboration."],
              ["Users", "Smart Collaboration", "Create or join Parties and work with professionals who complement your skills."],
              ["Layers", "Structured Quests", "Clear budgets, milestones, timelines, requirements, and outcomes."],
            ].map(([icon, t, d]) => (
              <div key={t} className="tg-why-card">
                <span className="tg-why-ico"><Icon name={icon} size={22} color="#2456e6" /></span>
                <h3>{t}</h3><p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={["100% VERIFIED", "SECURE ESCROW", "TRUST-BASED RANKING", "AI COLLABORATION", "TRANSPARENT MILESTONES"]} />

      {/* ============ SERVICES (dark cards) ============ */}
      <section className="tg-services-dark" id="services">
        <div className="tg-wrap">
          <p className="tg-eyebrow">OUR SERVICES</p>
          <h2>We provide best services</h2>
          <p className="tg-muted narrow">Everything you need to connect, collaborate, manage projects, and grow your professional reputation—all in one platform.</p>
          <div className="tg-svc-grid">
            {[
              ["01", "BadgeCheck", "Verified Talent Network", "Connect with trusted freelancers, agencies, and Parties through identity and skill verification."],
              ["02", "Layers", "Smart Quest Collaboration", "Manage projects through structured Quests, milestones, timelines, and AI-powered collaboration."],
              ["03", "Lock", "Secure Escrow Payments", "Protect every project with milestone-based escrow payments for transparent and secure transactions."],
            ].map(([n, icon, t, d]) => (
              <div
                key={n}
                className="tg-svc-card"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <p className="tg-svc-num">SERVICE {n}</p>
                <span className="tg-svc-ico"><Icon name={icon} size={24} color="#ffffff" /></span>
                <h3>{t}</h3><p>{d}</p>
                <span className="tg-svc-arrow" aria-hidden="true">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRINCIPLES ============ */}
      <section className="tg-principles">
        <div className="tg-wrap tg-prin-grid">
          <div>
            <p className="tg-eyebrow blue">OUR PRINCIPLES</p>
            <h2 className="light">Four core values.</h2>
          </div>
          <div className="tg-prin-list">
            {[
              ["01", "Trust", "Build professional relationships through verification and transparent collaboration."],
              ["02", "Collaboration", "Work together with skilled professionals, Parties, Agencies, and Clients."],
              ["03", "Growth", "Earn Trust Points, increase your Rank, and unlock better opportunities."],
              ["04", "Security", "Protect projects and payments with secure workflows and escrow."],
            ].map(([n, t, d]) => (
              <div key={n} className="tg-prin-row">
                <span className="tg-prin-num">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="tg-process" id="how" style={{ backgroundImage: `url(${papersBg})` }}>
        <div className="tg-wrap">
          <p className="tg-eyebrow">HOW IT WORKS</p>
          <h2>Our working process</h2>
          <p className="tg-muted narrow">Every great collaboration begins with trust—our process keeps every Quest simple, transparent, and secure.</p>
          <div className="tg-steps">
            {PROCESS_STEPS.map((s) => (
              <div className="tg-step" key={s.n}>
                <span className="tg-step-num">{s.n}</span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PLATFORM FEATURES ============ */}
      <section className="tg-features" id="features">
        <div className="tg-wrap">
          <p className="tg-eyebrow">PLATFORM FEATURES</p>
          <h2>Powerful features for<br />modern collaboration</h2>
          <p className="tg-muted narrow">Everything you need to manage professional opportunities and collaborations from<br />one platform.</p>

          <div className="tg-feature-row">
            <div className="tg-feature-text">
              <p className="tg-eyebrow sm">FEATURE 01</p>
              <h3>Quest Board</h3>
              <p className="tg-muted">Discover verified opportunities with transparent budgets, skills, timelines, client ranks, and Quest types.</p>
              <Link to="/features" className="tg-learn">Learn more <span aria-hidden="true">→</span></Link>
            </div>
            <div className="tg-shot-wrap"><img className="tg-shot" src={questBoard} alt="Quest Board dashboard" loading="lazy" /></div>
          </div>

          <div className="tg-feature-row reverse">
            <div className="tg-shot-wrap"><img className="tg-shot" src={taskMgmt} alt="Task Management Dashboard" loading="lazy" /></div>
            <div className="tg-feature-text">
              <p className="tg-eyebrow sm">FEATURE 02</p>
              <h3>Task Management Dashboard</h3>
              <p className="tg-muted">Track Quests, monitor milestones, manage deadlines, and collaborate seamlessly from one centralized workspace.</p>
              <Link to="/features" className="tg-learn">Learn more <span aria-hidden="true">→</span></Link>
            </div>
          </div>

          <div className="tg-feature-row">
            <div className="tg-feature-text">
              <p className="tg-eyebrow sm">FEATURE 03</p>
              <h3>Milestone Planner</h3>
              <p className="tg-muted">Build a structured roadmap for your Quest.<br />AI suggests milestones while you stay in control.</p>
              <Link to="/features" className="tg-learn">Learn more <span aria-hidden="true">→</span></Link>
            </div>
            <div className="tg-shot-wrap"><img className="tg-shot" src={milestonePlanner} alt="AI Milestone Planner" loading="lazy" /></div>
          </div>
        </div>
      </section>

      {/* ============ IMAGE SERVICES RAIL ============ */}
      <section className="tg-services">
        <div className="tg-wrap">
          <h2>Services Built for Your Next Quest</h2>
          <p className="tg-muted narrow">From AI and app development to design, cybersecurity, cloud, and digital growth — access the expertise you need to bring your ideas to life.</p>
        </div>
        <div className="tg-service-marquee">
          <div className="tg-service-track">
            {[0, 1].map((copy) => (
              <div className="tg-service-group" key={copy} aria-hidden={copy === 1}>
                {[cardWeb, cardBrand, cardAI, cardMobile, cardUIUX].map((src, i) => (
                  <img key={i} src={src} alt={copy === 0 ? `Service card ${i + 1}` : ""} loading="lazy" className="tg-service-card" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DISCOVER QUEST ============ */}
      <section className="tg-dark" id="quests">
        <div className="tg-wrap tg-split">
          <div>
            <h3 className="tg-dark-title-sm">Feature we have</h3>
            <p className="tg-eyebrow blue">QUEST BOARD</p>
            <h2 className="light">Discover your next Quest</h2>
            <p className="tg-dark-muted">Find meaningful opportunities from trusted clients with complete transparency.</p>
            <div className="tg-quest-card">
              <h4>Website Redesign for FinTech Startup</h4>
              <div className="tg-tags"><span>Figma</span><span>UI Design</span><span>UX Research</span><span>Prototype</span></div>
              <div className="tg-quest-meta">
                <div><span>Budget</span><strong>₹ 75,000</strong></div>
                <div><span>Timeline</span><strong>20 Days</strong></div>
              </div>
              <p className="tg-client">TechNova Pvt. Ltd.</p>
              <p className="tg-verified">✓ Verified Client · Rank A · Trust 92%</p>
              <div className="tg-counts"><span>18<br />Applicants</span><i>·</i><span>245<br />Views</span></div>
            </div>
            <Link to="/signup" className="tg-btn-primary">Explore Quest Board <span aria-hidden="true">→</span></Link>
          </div>
          <div className="tg-browser">
            <div className="tg-browser-bar"><span className="dot r" /><span className="dot y" /><span className="dot g" /><span className="tg-url">✓ techguild.io/quests</span></div>
            <div className="tg-browser-body">
              <div className="tg-browse-top"><span className="tg-browse-label">All Quests</span><span className="tg-search">Search quests</span></div>
              <div className="tg-tabs"><span className="on">All</span><span>Design</span><span>Development</span><span>AI</span><span>Research</span></div>
              <div className="tg-mini-quest">
                <p className="tg-mini-client">TechNova Pvt. Ltd.</p>
                <div className="tg-tags light"><span>Figma</span><span>UI Design</span><span>UX</span></div>
                <p className="tg-mini-foot">◷ 20 Days<span><b>A</b><em>✓ 92%</em></span></p>
              </div>
              <div className="tg-mini-quest hot">
                <p className="tg-mini-client">NeuralEdge Labs<em className="prio">Priority</em></p>
                <div className="tg-tags light"><span>AI</span><span>Product</span><span>Automation</span></div>
                <p className="tg-mini-foot">◷ 30 Days<span><b className="s">S</b><em>✓ 97%</em></span></p>
              </div>
              <div className="tg-mini-quest">
                <p className="tg-mini-client">Loop Health</p>
                <div className="tg-tags light"><span>UX Research</span><span>Mobile</span></div>
                <p className="tg-mini-foot">◷ 15 Days<span><b>B</b><em>✓ 88%</em></span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PARTY ============ */}
      <section className="tg-party" id="party">
        <div className="tg-wrap tg-split">
          <div>
            <p className="tg-eyebrow">PARTY COLLABORATION</p>
            <h2>Great work is built together</h2>
            <p className="tg-muted">Build trusted Parties with professionals who bring complementary skills to every Quest.</p>
            <div className="tg-party-stats">
              <div><strong>94%</strong><span>Party Trust</span></div>
              <div><strong>28</strong><span>Completed Quests</span></div>
              <div><strong>A</strong><span>Rank</span></div>
            </div>
            <Link to="/signup" className="tg-btn-primary">Build Your Party +</Link>
          </div>
          <div className="tg-party-card">
            <div className="tg-browser-bar"><span className="dot r" /><span className="dot y" /><span className="dot g" /><span className="tg-url">✓ techguild.io/party</span></div>
            <div className="tg-party-inner">
              <div className="tg-party-head"><strong>Verified Party</strong><span>✦ 94% Match</span></div>
              <div className="tg-party-top">
                <div><span>Party Trust</span><strong>94%</strong></div>
                <div><span>Completed</span><strong>28</strong></div>
                <div><span>Rank</span><strong>A</strong></div>
              </div>
              <div className="tg-party-grid">
                {PARTY_MEMBERS.map((m) => (
                  <div key={m.init} className="tg-member"><b>{m.init}</b><div><strong>{m.role}</strong><span>✓ Verified</span></div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RANK ============ */}
      <section className="tg-rank">
        <div className="tg-wrap">
          <p className="tg-eyebrow">RANK &amp; REPUTATION</p>
          <h2>Your reputation is your<br />career</h2>
          <p className="tg-muted">Every successful Quest strengthens your professional reputation.</p>
          <div className="tg-rank-row">
            {RANKS.map((x) => (
              <div key={x.r} className={`tg-rank-card${x.active ? " active" : ""}`}>
                <b>{x.r}</b><strong>{x.label}</strong><span>{x.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRUST ============ */}
      <section className="tg-trust" id="trust">
        <div className="tg-wrap">
          <p className="tg-eyebrow">TRUST &amp; SECURITY</p>
          <h2>Built on trust. Protected at<br />every step.</h2>
          <div className="tg-trust-grid">
            {TRUST_CARDS.map((c) => (
              <div key={c.title} className="tg-trust-card">
                <span className="tg-trust-ico"><Icon name={c.icon} size={22} color="#2456e6" /></span>
                <h4>{c.title}</h4><p>{c.text}</p>
              </div>
            ))}
          </div>
          <div className="tg-escrow">
            <p className="tg-eyebrow blue center">ESCROW FLOW</p>
            <div className="tg-escrow-steps">
              {ESCROW_STEPS.map((s, i) => (
                <div key={s} className="tg-escrow-step">
                  <b className={i < 4 ? "on" : ""}>{i + 1}</b>
                  <span>{s}</span>
                  {i < ESCROW_STEPS.length - 1 && <em>→</em>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ AI ============ */}
      <section className="tg-ai" style={{ backgroundImage: `url(${aiTexture})` }}>
        <div className="tg-ai-overlay" />
        <div className="tg-wrap tg-split tg-ai-inner">
          <div>
            <p className="tg-eyebrow light">AI-POWERED COLLABORATION</p>
            <h2 className="light">Find the right people.<br />Build the right Party.</h2>
            <p className="tg-ai-sub">TechGuild uses intelligent recommendations to help professionals discover relevant Quests and connect with compatible Party members.</p>
            <Link to="/signup" className="tg-btn-primary light">Find Your Match ✦</Link>
          </div>
          <div className="tg-match-frame">
            <div className="tg-match-card">
              <span className="tg-reco">✦ Recommended for your Party</span>
              <div className="tg-match-head"><b>DG</b><div><strong>Diya Gupta</strong><span>AI Specialist · Rank A</span></div><strong className="pct">94%</strong></div>
              {[["Skills Match", "98%"], ["Experience Match", "92%"], ["Trust Compatibility", "95%"], ["Availability", "90%"]].map(([k, v]) => (
                <div key={k} className="tg-bar-row"><span>{k}</span><em>{v}</em><div className="tg-bar"><i style={{ width: v }} /></div></div>
              ))}
              <button type="button" className="tg-btn-primary full">Find Your Match</button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DIFFERENCE ============ */}
      <section className="tg-diff">
        <div className="tg-wrap">
          <p className="tg-eyebrow">THE DIFFERENCE</p>
          <h2>Why TechGuild is different</h2>
          <div className="tg-diff-grid">
            <div className="tg-diff-card old">
              <p className="tg-diff-label">TRADITIONAL FREELANCING</p>
              <ul>
                <li>Endless bidding</li>
                <li>Unverified profiles</li>
                <li>Solo work</li>
                <li>Unclear reputation</li>
                <li>Payment uncertainty</li>
                <li>Short-term relationships</li>
              </ul>
            </div>
            <div className="tg-diff-card new">
              <p className="tg-diff-label light">TECHGUILD</p>
              <ul>
                <li>Trust-based matching</li>
                <li>Verified professionals</li>
                <li>Party collaboration</li>
                <li>Rank-based reputation</li>
                <li>Escrow protection</li>
                <li>Long-term professional growth</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMMUNITY ============ */}
      <section className="tg-community">
        <p className="tg-eyebrow blue center">COMMUNITY</p>
        <h2 className="light center">Trusted by professionals worldwide</h2>
        <div className="tg-stats-dark">
          <div><strong>120K+</strong><span>Verified Professionals</span></div>
          <div><strong>25K+</strong><span>Trusted Parties</span></div>
          <div><strong>600K+</strong><span>Completed Quests</span></div>
          <div><strong>₹120Cr+</strong><span>Protected Payments</span></div>
          <div><strong>97%</strong><span>Project Success</span></div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="tg-testimonials">
        <div className="tg-wrap">
          <p className="tg-eyebrow">TESTIMONIALS</p>
          <h2>Built for people who build</h2>
          <div className="tg-t-grid">
            {[
              { tag: "Freelancer", text: "TechGuild helped me find trusted, high-value projects and build a reputation that actually opens doors.", n: "Aarav Mehta", r: "Freelancer", i: "AM", b: "A", bc: "", t: "96%" },
              { tag: "Client", text: "Verified talent and escrow protection mean I get quality delivery every single time, without the guesswork.", n: "Sneha Iyer", r: "Client", i: "SI", b: "A", bc: "", t: "94%" },
              { tag: "Agency", text: "Managing teams and larger collaborations through Parties and milestones has completely streamlined our delivery.", n: "Rohan Kapoor", r: "Agency", i: "RK", b: "S", bc: "s", t: "98%" },
            ].map((t) => (
              <div key={t.n} className="tg-t-card">
                <span className="tg-tag">{t.tag}</span>
                <p className="tg-t-quote">“{t.text}”</p>
                <div className="tg-t-foot">
                  <b>{t.i}</b>
                  <div><strong>{t.n}</strong><span>{t.r}</span></div>
                  <div className="tg-t-right"><span className={`tg-rank-dot${t.bc}`}>{t.b}</span><em>✓ {t.t}</em></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="tg-faq" id="faq">
        <div className="tg-wrap tg-split">
          <div>
            <p className="tg-eyebrow">FAQ</p>
            <h2>Questions,<br />answered.</h2>
            <p className="tg-muted">Everything you need to know about how TechGuild keeps collaboration trusted and transparent.</p>
          </div>
          <div className="tg-faq-list">
            {FAQS.map((f, i) => (
              <div key={f.q} className={`tg-faq-item${openFaq === i ? " open" : ""}`}>
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}<span>{openFaq === i ? "˄" : "˅"}</span>
                </button>
                {openFaq === i && <p>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GUILD CARDS ============ */}
      <section className="tg-cards">
        <div className="tg-wrap tg-cards-row">
          <div className="tg-card-frame">
            <img className="tg-card-img front" src={frontCard} alt="TechGuild Guild Card front - Arjun Mehta" loading="lazy" />
          </div>
          <div className="tg-card-frame">
            <img className="tg-card-img back" src={backCard} alt="TechGuild Guild Card back - F Rank performance" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="tg-footer">
        <div className="tg-wrap">
          <div className="tg-foot-grid">
            <div>
              <p className="tg-logo"><span className="tg-logo-tech light">Tech</span><span className="tg-logo-guild">Guild</span></p>
              <p className="tg-dark-muted sm">The trust-first ecosystem for professional collaboration.</p>
              <div className="tg-social">
                <a href="#home" aria-label="LinkedIn"><Icon name="Linkedin" size={18} color="#ffffff" /></a>
                <a href="#home" aria-label="Instagram"><InstagramGlyph /></a>
                <a href="#home" aria-label="X"><XGlyph /></a>
              </div>
            </div>
            <div><strong>Platform</strong><span>Quest Board</span><span>Parties</span><span>Trust System</span><span>Rankings</span><span>Escrow</span></div>
            <div><strong>Company</strong><span>About</span><span>Careers</span><span>Contact</span><span>Partners</span></div>
            <div><strong>Resources</strong><span>Help Center</span><span>Guides</span><span>Community</span><span>FAQ</span></div>
            <div><strong>Legal</strong><span>Privacy</span><span>Terms</span><span>Security</span></div>
          </div>
          <div className="tg-sub">
            <div><strong>Stay updated with TechGuild.</strong><p className="tg-dark-muted sm">Get product updates, guides, and Quest highlights.</p></div>
            <form className="tg-sub-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" aria-label="Email" />
              <button type="submit" className="tg-btn-primary">Subscribe</button>
            </form>
          </div>
          <div className="tg-giant">TECHGUILD</div>
        </div>
      </footer>
    </div>
  );
}
