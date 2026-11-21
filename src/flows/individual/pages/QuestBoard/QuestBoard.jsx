// [TechGuild Update: 12-10-26] Individual QuestBoard — UI only.
// Single JSX + single CSS. Uses shared components (DashboardLayout, Cards,
// PrimaryButton, SecondaryButton, Icon) like client WholeProfile / QuestBoard.
// Flow: intro -> list (+ filter / sort drawers) -> details -> apply modal -> success modal -> home
import React, { useState } from "react";
import { DashboardLayout, Cards, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { ICON_SIZES } from "@/constants/sizes";
import "./QuestBoard.css";

/* ---------------- UI-only mock (no API) ---------------- */
const PROFILE = { name: "Arjun Mehta", rank: "Rank A", trust: "96%", skills: 8, quests: 12, strength: 92 };

const QUESTS = [
  { id: "q1", tag: "Standard", tone: "standard", title: "Cloud-Native Architecture Overhaul", desc: "Transition legacy monolith to AWS microservices. Requires deep Kubernetes and Go expertise for high-traffic workloads.", budget: "₹75,000", type: "Fixed Price", dur: "20 Days", date: "15 Aug 2026", skills: ["AWS", "Kubernetes", "Golang"], skillTone: "blue", match: "Recommended for Your Party • 94% Match", squad: false, client: "TechNova Pvt. Ltd.", trust: "92% Trust", count: "148 Quests", apps: "18 Applicants", views: "245 Views", posted: "Posted 2h ago", saved: false, seed: "technova", rankTone: "rk-purple" },
  { id: "q2", tag: "Emergency", tone: "emergency", title: "Security Breach Remediation", desc: "Urgent requirement for a CyberSec Lead to audit and patch vulnerability in a high-traffic e-commerce platform.", budget: "₹1,20,000", type: "Fixed Price", dur: "3 Days", date: "ASAP", asap: true, skills: ["Security Audit", "DevSecOps"], skillTone: "purple", match: null, client: "SecureLink Systems", trust: "99% Trust", count: "842 Quests", apps: "4 Applicants", views: "890 Views", posted: "Posted 15m ago", saved: false, seed: "securelink", rankTone: "rk-purple" },
  { id: "q3", tag: "Long-term", tone: "longterm", title: "Design System Orchestration", desc: "Lead the unification of 4 disparate product lines into a single, cohesive design language. 6-month contract.", budget: "₹3,50,000", type: "Retainer", dur: "180 Days", date: "Rolling", skills: ["Figma", "UI Design", "Storybook"], skillTone: "green", match: "Recommended for Your Party • 98% Match", squad: false, client: "DesignCollective", trust: "95% Trust", count: "32 Quests", apps: "32 Applicants", views: "1,4k Views", posted: "Posted 4h ago", saved: true, seed: "designco", rankTone: "rk-blue" },
  { id: "q4", tag: "Multi-skill", tone: "multiskill", title: "Full-stack Marketplace MVP", desc: "End-to-end development of a niche B2B marketplace. Includes branding, UI/UX, Backend, and Stripe integration.", budget: "₹5,00,000", type: "Project Milestone", dur: "60 Days", date: "30 Sep 2026", skills: ["React", "Node.js", "UI Design", "+2 more"], skillTone: "blue", match: "Perfect for 3-Person Engineering Squads", squad: true, client: "AlphaLaunch Labs", trust: "88% Trust", count: "12 Quests", apps: "12 Applicants", views: "156 Views", posted: "Posted 6h ago", saved: false, seed: "alphalaunch", rankTone: "rk-orange" },
  { id: "q5", tag: "Standard", tone: "standard", title: "API Documentation Overhaul", desc: "Write comprehensive Swagger documentation for a complex financial API suite. Technical writing skills required.", budget: "₹45,000", type: "Project Based", dur: "15 Days", date: "01 Oct 2026", skills: ["Swagger", "REST", "Technical Writing"], skillTone: "blue", match: null, client: "FinStream Inc.", trust: "94% Trust", count: "210 Quests", apps: "8 Applicants", views: "92 Views", posted: "Posted 8h ago", saved: false, seed: "finstream", rankTone: "rk-blue" },
  { id: "q6", tag: "Long-term", tone: "longterm", title: "DevOps Culture Implementation", desc: "Ongoing advisory role for a mid-size enterprise looking to adopt CI/CD and automated scaling best practices.", budget: "₹2,00,000", type: "Monthly Retainer", dur: "1 Year", date: "Recurring", skills: ["Terraform", "Jenkins", "Docker"], skillTone: "purple", match: null, client: "Global Core Tech", trust: "97% Trust", count: "512 Quests", apps: "2 Applicants", views: "45 Views", posted: "Posted 1d ago", saved: false, seed: "globalcore", rankTone: "rk-blue" },
];

const FEATURED = {
  title: "Website Redesign for FinTech Startup",
  desc: "Design a modern responsive website for a growing FinTech startup. The goal is to improve user engagement and streamline the onboarding process for new retail investors.",
  budget: "₹75,000", budgetType: "Fixed Price", timeline: "20 Days", deadline: "15 Aug 2026",
  about: "TechNova is seeking a highly skilled UI/UX designer to overhaul our main marketing website and user dashboard. We are moving towards a more premium, trustworthy aesthetic to appeal to enterprise clients while remaining accessible to retail investors.\n\nThe current platform suffers from high bounce rates on the pricing page and a confusing user flow during the initial KYC onboarding. Your mission is to simplify these flows, introduce a modern visual language, and deliver comprehensive Figma prototypes ready for our dev team.",
  skills: ["Figma", "UI Design", "UX Research", "Prototyping", "FinTech"],
};

const STATS = [
  { label: "APPLIED", value: "2,390", sub: "Lifetime submissions", color: "#1e5eff" },
  { label: "UNDER REVIEW", value: "22", sub: "Awaiting client decision", color: "#16a34a" },
  { label: "SHORTLISTED", value: "22", sub: "Final candidate stages", color: "#f59e0b" },
  { label: "ACTIVE QUEST", value: "22", sub: "In progress delivery", color: "#7c3aed" },
];

/* ---------------- small pieces (same file, imported via composition) ---------------- */
function Crumb({ trail }) {
  return (
    <p className="ind-qb-crumb">
      {trail.map((t, i) => (
        <span key={i}>{i > 0 && " > "}{i === trail.length - 1 ? <strong>{t}</strong> : t}</span>
      ))}
    </p>
  );
}

function QuestCard({ q, onView, onApply, onSave }) {
  return (
    <Cards variant="base" shadow="none" className="ind-qb-card ind-qb-quest">
      <div className="ind-qb-quest-top">
        <span className={`ind-qb-tag ${q.tone}`}>{q.tone === "emergency" ? "⚡ " : ""}{q.tag}</span>
        <button type="button" className={`ind-qb-save ${q.saved ? "on" : ""}`} onClick={() => onSave(q.id)} aria-label="Save quest">
          <Icon name="Bookmark" size={ICON_SIZES.MD} color={q.saved ? "#0f3d9e" : "#6b7280"} strokeWidth={1.8} />
        </button>
      </div>
      <h3 className="ind-qb-quest-title">{q.title}</h3>
      <p className="ind-qb-quest-desc">{q.desc}</p>
      <p className="ind-qb-price"><strong>{q.budget}</strong> {q.type}</p>
      <p className="ind-qb-meta">
        <span><Icon name="Clock" size={ICON_SIZES.XS} color="#6b7280" /> {q.dur}</span>
        {q.asap
          ? <span className="asap"><Icon name="TriangleAlert" size={ICON_SIZES.XS} color="#d92d20" /> ASAP</span>
          : <span><Icon name="Calendar" size={ICON_SIZES.XS} color="#6b7280" /> {q.date}</span>}
      </p>
      <div className="ind-qb-skills">{q.skills.map((s) => <span key={s} className={`ind-qb-skill ${q.skillTone}`}>{s}</span>)}</div>
      {q.match && (
        <p className="ind-qb-match">
          <Icon name={q.squad ? "Users" : "UserCheck"} size={ICON_SIZES.MD} color="#2f6bff" strokeWidth={1.8} />
          <span>{q.match}</span>
        </p>
      )}
      <div className="ind-qb-client">
        <span className="ind-qb-logo">{q.client.slice(0, 1)}<img src={`https://picsum.photos/seed/tg-${q.seed}/72/72`} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} /></span>
        <div className="ind-qb-client-text">
          <strong>{q.client} <Icon name="BadgeCheckFill" size={ICON_SIZES.XS} color="#16a34a" /> <em className={q.rankTone || "rk-blue"}>RANK F</em></strong>
          <span className="ind-qb-muted sm">{q.trust} &nbsp; {q.count}</span>
        </div>
      </div>
      <div className="ind-qb-counts"><span><strong>{q.apps}</strong></span><span>{q.views}</span><span>{q.posted}</span></div>
      <div className="ind-qb-actions">
        <SecondaryButton text="View Details" onClick={() => onView(q)} className="ind-qb-outline ind-qb-view" />
        <PrimaryButton text="Apply Now" onClick={() => onApply(q)} className="ind-qb-primary ind-qb-apply" />
      </div>
    </Cards>
  );
}

/* ---------------- main page ---------------- */
export default function QuestBoard() {
  // step: intro | list | details | home
  const [step, setStep] = useState("intro");
  const [quests, setQuests] = useState(QUESTS);
  const [selected, setSelected] = useState(QUESTS[0]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("newest");
  const [applyOpen, setApplyOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  // apply form (UI only)
  const [pitch, setPitch] = useState("");
  const [picked, setPicked] = useState(["Figma", "UX Research"]);
  const [avail, setAvail] = useState("now");
  const [agree, setAgree] = useState(false);
  // filter (UI only, defaults match reference)
  const [filterSkills, setFilterSkills] = useState(["UI Design", "Figma"]);
  const [filterTimelines, setFilterTimelines] = useState(["15–30 Days"]);
  const [questType, setQuestType] = useState("Standard");
  const [skillSearch, setSkillSearch] = useState("");
  const [budgetVal, setBudgetVal] = useState(500000);

  const openDetails = (q) => { setSelected(q); setStep("details"); };
  const openApply = (q) => { if (q) setSelected(q); setApplyOpen(true); };
  const toggleSave = (id) => setQuests((p) => p.map((q) => (q.id === id ? { ...q, saved: !q.saved } : q)));
  const toggleSkill = (s) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const SORT_OPTIONS = [
    { id: "newest", title: "Newest", desc: "Show the most recently posted quests first.", icon: "Clock" },
    { id: "high-low", title: "Budget: High → Low", desc: "Highest paying quests first.", icon: "Banknote" },
    { id: "low-high", title: "Budget: Low → High", desc: "Lowest budget quests first.", icon: "ShoppingBag" },
    { id: "emergency", title: "Emergency First", desc: "Prioritize emergency quests at the top.", icon: "emergency-exclaim" },
  ];
  const sortLabel = (SORT_OPTIONS.find((o) => o.id === sort) || SORT_OPTIONS[0]).title;
  const sortButtonLabel = sort === "newest" ? "Most Recent" : sortLabel;

  const parseBudget = (b) => Number(String(b || "").replace(/[^0-9]/g, "")) || 0;
  const ordered = (() => {
    if (sort === "emergency") return [...quests].sort((a, b) => (b.tone === "emergency") - (a.tone === "emergency"));
    if (sort === "high-low") return [...quests].sort((a, b) => parseBudget(b.budget) - parseBudget(a.budget));
    if (sort === "low-high") return [...quests].sort((a, b) => parseBudget(a.budget) - parseBudget(b.budget));
    return quests;
  })();

  return (
    <DashboardLayout containerClass="ind-qb-root" mainWorkspaceClass="ind-qb-workspace">
      <div className="ind-qb-scroll">

        {/* ============ 1 · INTRO ============ */}
        {step === "intro" && (
          <>
            <Crumb trail={["Dashboard", "Quest Board"]} />
            <h1 className="ind-qb-h1">Welcome to the Quest Board</h1>
            <p className="ind-qb-sub">Discover trusted projects, connect with verified clients, and build your reputation through meaningful work.</p>
            <div className="ind-qb-intro-grid">
              <div className="ind-qb-col main">
                <Cards shadow="none" className="ind-qb-card hero">
                  <span className="ind-qb-pill"><span className="ind-qb-pill-dot">◆</span> GETTING STARTED</span>
                  <h2 className="ind-qb-hero-title">Your Next Opportunity Starts Here</h2>
                  <p className="ind-qb-hero-desc">TechGuild Quests connect skilled professionals with clients looking for trusted expertise.<br />Explore projects that match your skills, understand the requirements, and apply with confidence.</p>
                  <div className="ind-qb-points">
                    {[
                      ["Verified Clients:", "Work with trusted clients across the TechGuild ecosystem."],
                      ["Skill-Matched Opportunities:", "Discover Quests aligned with your skills and experience."],
                      ["Trust-Based Growth:", "Build your Trust Score through successful project delivery."],
                    ].map(([b, d]) => (
                      <div key={b} className="ind-qb-point"><Icon name="CircleCheck" size={ICON_SIZES.DEFAULT} color="#16a34a" strokeWidth={1.8} /><p><strong>{b}</strong> {d}</p></div>
                    ))}
                  </div>
                  <div><PrimaryButton text="Explore Available Quests →" onClick={() => setStep("list")} className="ind-qb-primary slim" /></div>
                  <button type="button" className="ind-qb-link" onClick={() => setStep("list")}>Learn How Quests Work</button>
                </Cards>
                <div className="ind-qb-how-head">
                  <h3>How Quest Works</h3>
                  <p>From discovering an opportunity to building your reputation.</p>
                </div>
                <div className="ind-qb-steps">
                  {[
                    ["Search", "Discover", "Explore Quests that match your skills and interests.", "#1e40af", "ic-blue"],
                    ["BadgeCheck", "Review", "Check project requirements, budget, timeline, and client details.", "#7c3aed", "ic-purple"],
                    ["Send", "Apply", "Submit your application and showcase why you're the right fit.", "#0f766e", "ic-teal"],
                    ["Trophy", "Deliver & Grow", "Complete the Quest, earn trust, and strengthen your Guild reputation.", "#1e3a8a", "ic-navy"],
                  ].map(([icon, t, d, color, tone]) => (
                    <Cards key={t} variant="base" shadow="none" className="ind-qb-card step">
                      <span className={`ind-qb-step-ic ${tone}`}><Icon name={icon} size={ICON_SIZES.XL} color={color} strokeWidth={1.8} /></span>
                      <strong className="ind-qb-step-t">{t}</strong><p className="ind-qb-step-d">{d}</p>
                    </Cards>
                  ))}
                </div>
              </div>
              <div className="ind-qb-col side">
                <Cards shadow="none" className="ind-qb-card profile">
                  <PrimaryButton text="Explore Available Quests →" onClick={() => setStep("list")} className="ind-qb-primary block top-cta" />
                  <h4 className="ind-qb-h4">Your Profile</h4>
                  <div className="ind-qb-me">
                    <span className="ind-qb-avatar photo">AM<img src="https://randomuser.me/api/portraits/men/32.jpg" alt={PROFILE.name} onError={(e) => { e.currentTarget.style.display = "none"; }} /></span>
                    <div className="ind-qb-me-text"><strong>{PROFILE.name}</strong><span className="ind-qb-rank">{PROFILE.rank}</span></div>
                  </div>
                  <div className="ind-qb-prow"><span className="ind-qb-plabel"><Icon name="Shield" size={ICON_SIZES.XS} color="#6b7280" /> Trust Score</span><strong className="green">96%</strong></div>
                  <div className="ind-qb-prow"><span className="ind-qb-plabel"><Icon name="Medal" size={ICON_SIZES.XS} color="#6b7280" /> Skills Verified</span><strong>8</strong></div>
                  <div className="ind-qb-prow"><span className="ind-qb-plabel"><Icon name="CircleCheck" size={ICON_SIZES.XS} color="#6b7280" /> Quests Completed</span><strong>12</strong></div>
                  <div className="ind-qb-strength">
                    <div className="ind-qb-strength-top"><span>Profile Strength</span><em>92%</em></div>
                    <div className="ind-qb-bar"><i style={{ width: "92%" }} /></div>
                  </div>
                  <SecondaryButton text="View Profile →" onClick={() => setStep("list")} className="ind-qb-outline block view-btn" />
                </Cards>
                <Cards variant="base" shadow="none" className="ind-qb-card why-card">
                  <h4 className="ind-qb-h4">Why Freelancers Choose TechGuild</h4>
                  <div className="ind-qb-why">
                    <Cards variant="base" shadow="none" className="ind-qb-why-item"><Icon name="ShieldCheck" size={ICON_SIZES.DEFAULT} color="#2f6bff" strokeWidth={1.8} /><span>Verified Opportunities</span></Cards>
                    <Cards variant="base" shadow="none" className="ind-qb-why-item"><Icon name="Eye" size={ICON_SIZES.DEFAULT} color="#7c3aed" strokeWidth={1.8} /><span>Transparent Projects</span></Cards>
                    <Cards variant="base" shadow="none" className="ind-qb-why-item"><Icon name="Medal" size={ICON_SIZES.DEFAULT} color="#0e9f8a" strokeWidth={1.8} /><span>Reputation That Matters</span></Cards>
                    <Cards variant="base" shadow="none" className="ind-qb-why-item"><Icon name="TrendingUp" size={ICON_SIZES.DEFAULT} color="#16a34a" strokeWidth={1.8} /><span>Professional Growth</span></Cards>
                  </div>
                </Cards>
              </div>
            </div>
          </>
        )}

        {/* ============ 2 · LIST ============ */}
        {step === "list" && (
          <>
            <div className="ind-qb-list-head">
              <div><h1 className="ind-qb-h1">Available Quests</h1>
                <p className="ind-qb-muted">Discover 42 high-stakes engineering projects matching your party's specialization.</p></div>
              <div className="ind-qb-tools">
                <SecondaryButton text="Filter" icon={<Icon name="Filter" size={ICON_SIZES.MD} />} iconPosition="left" onClick={() => { setFilterOpen(true); setSortOpen(false); }} className="ind-qb-tool" />
                <SecondaryButton text={`Sort: ${sortButtonLabel}`} icon={<Icon name="ChevronDown" size={ICON_SIZES.MD} />} iconPosition="right" onClick={() => { setSortOpen(true); setFilterOpen(false); }} className="ind-qb-tool" />
              </div>
            </div>
            <div className="ind-qb-grid">
              {ordered.map((q) => <QuestCard key={q.id} q={q} onView={openDetails} onApply={openApply} onSave={toggleSave} />)}
            </div>
            <p className="ind-qb-center-muted">Showing {ordered.length} of 42 active quests</p>
            <div className="ind-qb-center"><SecondaryButton text="Load More Quests" icon={<Icon name="ChevronDown" size={ICON_SIZES.MD} />} iconPosition="right" onClick={() => {}} className="ind-qb-load" /></div>
          </>
        )}

        {/* ============ 3 · DETAILS ============ */}
        {step === "details" && (
          <>
            <Crumb trail={["Quest Board", "Quest Details"]} />
            <div className="ind-qb-details-grid">
              {/* Top — single full-width card like Figma (hero left + budget panel right) */}
              <div className="ind-qb-card ind-qb-top-card">
                <div className="ind-qb-top-left">
                  <span className="ind-qb-mini">STANDARD</span>
                  <h1 className="ind-qb-h1 sm">{FEATURED.title}</h1>
                  <p className="ind-qb-detail-desc">{FEATURED.desc}</p>
                  <p className="ind-qb-detail-meta">
                    <span><Icon name="Clock" size={ICON_SIZES.XS} color="#6b7280" /> Posted 2 hours ago</span>
                    <span><Icon name="Eye" size={ICON_SIZES.XS} color="#6b7280" /> Views: 245</span>
                    <span><Icon name="Users" size={ICON_SIZES.XS} color="#6b7280" /> Applicants: 18</span>
                  </p>
                </div>
                <div className="ind-qb-top-right">
                  <div className="ind-qb-budget-top">
                    <span className="cap ind-qb-budget-cap">BUDGET</span>
                    <span className="ind-qb-open"><Icon name="CircleCheck" size={12} color="#fff" strokeWidth={2} /> Open</span>
                  </div>
                  <strong className="ind-qb-budget-value">{FEATURED.budget}</strong>
                  <span className="ind-qb-muted sm">{FEATURED.budgetType}</span>
                  <div className="ind-qb-budget-grid">
                    <div><span className="ind-qb-budget-label">Timeline</span><strong>{FEATURED.timeline}</strong></div>
                    <div><span className="ind-qb-budget-label">Deadline</span><strong>{FEATURED.deadline}</strong></div>
                  </div>
                  <div className="ind-qb-actions ind-qb-budget-actions">
                    <PrimaryButton text="Apply to Quest" onClick={() => openApply(selected)} className="ind-qb-primary ind-qb-budget-apply" />
                    <button type="button" className="ind-qb-bookmark-btn" aria-label="Save quest">
                      <Icon name="Bookmark" size={ICON_SIZES.MD} color="#111827" strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              </div>
              <Cards shadow="none" className="ind-qb-card ind-qb-about-card">
                <h3 className="ind-qb-h3">About This Quest</h3>
                {FEATURED.about.split("\n\n").map((para, i) => (
                  <p key={i} className="ind-qb-muted ind-qb-about-text">{para}</p>
                ))}
              </Cards>
              <Cards shadow="none" className="ind-qb-card ind-qb-client-card">
                <span className="cap ind-qb-client-cap">ABOUT THE CLIENT</span>
                <div className="ind-qb-me ind-qb-client-me">
                  <span className="ind-qb-tn">TN</span>
                  <div className="ind-qb-client-info">
                    <strong>TechNova Pvt. Ltd. <Icon name="BadgeCheckFill" size={ICON_SIZES.XS} color="#16a34a" /></strong>
                    <span className="ind-qb-muted sm ind-qb-loc"><Icon name="MapPin" size={12} color="#6b7280" /> Mumbai, IN</span>
                  </div>
                </div>
                <div className="ind-qb-client-stats">
                  <div><span>Trust Score</span><strong className="green">94%</strong></div>
                  <div><span>Completed</span><strong>20</strong></div>
                  <div><span>On-time payment</span><strong>96%</strong></div>
                  <div><span>Avg Rating</span><strong className="amber">4.8 <Icon name="Star" size={12} color="#f59e0b" /></strong></div>
                </div>
                <SecondaryButton text="View Client Profile" onClick={() => {}} className="ind-qb-outline block ind-qb-client-btn" />
              </Cards>
              <Cards shadow="none" className="ind-qb-card ind-qb-skills-card">
                <h3 className="ind-qb-h3">Required Skills</h3>
                <div className="ind-qb-skills ind-qb-req-skills">
                  <span className="ind-qb-pill-skill pill-blue">Figma</span>
                  <span className="ind-qb-pill-skill pill-orange">UI Design</span>
                  <span className="ind-qb-pill-skill pill-green">UX Research</span>
                  <span className="ind-qb-pill-skill pill-purple">Prototyping</span>
                  <span className="ind-qb-pill-skill pill-navy">FinTech</span>
                </div>
              </Cards>
              <Cards shadow="none" className="ind-qb-card ind-qb-before-card">
                <span className="cap ind-qb-before-cap">BEFORE YOU ACCEPT</span>
                <p className="ind-qb-before-line"><Icon name="Info" size={ICON_SIZES.SM} color="#6b7280" /> <span>Review the full milestone schedule.</span></p>
                <p className="ind-qb-before-line"><Icon name="Info" size={ICON_SIZES.SM} color="#6b7280" /> <span>Ensure you have the required Figma bandwidth.</span></p>
              </Cards>
              <div className="ind-qb-nav">
                <SecondaryButton
                  text="Previous"
                  icon={<Icon name="ArrowLeft" size={ICON_SIZES.SM} />}
                  iconPosition="left"
                  onClick={() => setStep("list")}
                  className="ind-qb-outline ind-qb-prev"
                />
                <PrimaryButton
                  text="Apply Quest"
                  icon={<Icon name="ArrowRight" size={ICON_SIZES.SM} color="#fff" />}
                  iconPosition="right"
                  onClick={() => openApply(selected)}
                  className="ind-qb-primary ind-qb-apply-quest"
                />
              </div>
            </div>
          </>
        )}

        {/* ============ 6 · HOME (freelancer dashboard after apply) ============ */}
        {step === "home" && (
          <>
            <Crumb trail={["Dashboard", "Quest Board"]} />
            <div className="ind-qb-home-head">
              <div>
                <h1 className="ind-qb-h1">Good morning,</h1>
                <p className="ind-qb-muted">Here&apos;s what&apos;s happening with your quests and applications.</p>
              </div>
              <PrimaryButton
                text="Explore Available Quests"
                icon={<Icon name="ArrowRight" size={14} color="#fff" />}
                iconPosition="right"
                onClick={() => setStep("list")}
                className="ind-qb-primary ind-qb-explore-btn"
              />
            </div>
            <div className="ind-qb-home-grid">
              <div className="ind-qb-col ind-qb-home-main">
                <div className="ind-qb-stats">
                  {[
                    { label: "APPLIED", value: "2,390", sub: "Lifetime submissions", subTone: "gray", color: "#1e5eff", icon: "FileText" },
                    { label: "UNDER REVIEW", value: "22", sub: "Awaiting client decision", subTone: "orange", color: "#16a34a", icon: "Clock" },
                    { label: "SHORTLISTED", value: "22", sub: "Final candidate stages", subTone: "orange", color: "#f59e0b", icon: "Bookmark" },
                    { label: "ACTIVE QUEST", value: "22", sub: "In progress delivery", subTone: "blue", color: "#7c3aed", icon: "NotebookText" },
                  ].map((s) => (
                    <Cards key={s.label} shadow="none" className="ind-qb-card ind-qb-stat" style={{ "--stat-color": s.color }}>
                      <div className="ind-qb-stat-top"><span className="cap ind-qb-stat-cap">{s.label}</span><span className="ind-qb-stat-ic" style={{ background: s.color }}><Icon name={s.icon} size={14} color="#fff" strokeWidth={2} /></span></div>
                      <h2 className="ind-qb-stat-val">{s.value}</h2>
                      <span className={`ind-qb-muted sm ind-qb-stat-sub ${s.subTone}`}>{s.sub}</span>
                    </Cards>
                  ))}
                </div>
                <Cards shadow="none" className="ind-qb-card ind-qb-updates-card">
                  <div className="ind-qb-row ind-qb-updates-head">
                    <div><h3 className="ind-qb-h3">Application Updates <em className="ind-qb-recent-pill">3 Recent</em></h3>
                      <p className="ind-qb-muted sm">Real-time status of your recently submitted proposals</p></div>
                    <button type="button" className="ind-qb-arrow-link" aria-label="See all">→</button>
                  </div>
                  {[
                    { title: "Website Redesign for SaaS Platform", tag1: "Standard Quest", tag2: "Rank A Client", meta: "Applied Aug 4, 2026 · ₹45,000 – ₹60,000", skills: ["UI/UX Design", "Figma", "SaaS"], status: "Application Under Review", tone: "amber", note: "Estimated decision within 48h", noteIcon: "Clock", noteColor: "#6b7280", primary: false },
                    { title: "Mobile App UI/UX Design", tag1: "Multi-Skill Quest", tag2: "Rank A Client", meta: "Applied Aug 2, 2026 · ₹35,000 – ₹50,000", skills: ["UI/UX", "Figma", "Mobile Design"], status: "Shortlisted", tone: "green", note: "Client initiated collaboration chat", noteIcon: "MessageSquare", noteColor: "#15803d", primary: true },
                    { title: "E-Commerce Website Redesign", tag1: "Standard Quest", tag2: "Rank A Client", meta: "Applied Jul 30, 2026 · ₹25,000 – ₹40,000", skills: ["UI/UX", "E-Commerce", "Figma"], status: "Application Viewed", tone: "blue", note: "Viewed by client 1 hour ago", noteIcon: "Eye", noteColor: "#6b7280", primary: false },
                  ].map((a) => (
                    <div key={a.title} className="ind-qb-app">
                      <div className="ind-qb-row ind-qb-app-top"><strong className="ind-qb-app-title">{a.title}</strong><span className={`ind-qb-status ${a.tone}`}><i /> {a.status}</span></div>
                      <p className="ind-qb-app-tags">{a.tag1} · {a.tag2}</p>
                      <p className="ind-qb-app-meta">{a.meta}</p>
                      <div className="ind-qb-skills ind-qb-app-skills">{a.skills.map((s) => <span key={s} className="ind-qb-app-skill">{s}</span>)}</div>
                      <div className="ind-qb-row ind-qb-app-foot">
                        <p className={`ind-qb-muted sm ind-qb-app-note ${a.primary ? "green" : ""}`}><Icon name={a.noteIcon} size={12} color={a.noteColor} /> {a.note}</p>
                        <div className="ind-qb-app-btns">
                          <SecondaryButton text="View Application" onClick={() => setStep("details")} className={a.primary ? "ind-qb-mini-btn ind-qb-mini-primary" : "ind-qb-mini-btn"} />
                          <SecondaryButton text="View Quest" onClick={() => setStep("list")} className="ind-qb-mini-btn" />
                        </div>
                      </div>
                    </div>
                  ))}
                </Cards>
                <Cards shadow="none" className="ind-qb-card ind-qb-rec-card">
                  <div className="ind-qb-row"><div><h3 className="ind-qb-h3">Recommended Quests</h3><p className="ind-qb-muted sm">Opportunities matching your skills and experience.</p></div><button type="button" className="ind-qb-link" onClick={() => setStep("list")}>View Quest Board →</button></div>
                  {[
                    { t: "Fintech Dashboard UI Design", m: "92% Match", rank: "Rank A", budget: "₹35,000 – ₹50,000", time: "3–4 weeks", skills: ["UI/UX Design", "Figma", "Dashboard Design"] },
                    { t: "Healthcare Mobile App Design", m: "88% Match", rank: "Rank A", budget: "₹40,000 – ₹55,000", time: "4 weeks", skills: ["Mobile UI", "Healthcare", "iOS Guidelines"] },
                    { t: "SaaS Landing Page Redesign", m: "85% Match", rank: "Rank B", budget: "₹25,000 – ₹35,000", time: "2 weeks", skills: ["Web Design", "Landing Page", "Conversion"] },
                  ].map((r) => (
                    <div key={r.t} className="ind-qb-rec">
                      <div className="ind-qb-rec-left"><strong>{r.t} <em className="green">{r.m}</em></strong><p className="ind-qb-rec-meta"><span className="ind-qb-verified-text">Verified Client</span> · {r.rank} · <span className="ind-qb-budget-text">{r.budget}</span> <span className="ind-qb-time-text">{r.time}</span></p><div className="ind-qb-skills ind-qb-rec-skills">{r.skills.map((s) => <span key={s} className="ind-qb-rec-skill">{s}</span>)}</div></div>
                      <SecondaryButton text="View Quest" onClick={() => setStep("list")} className="ind-qb-mini-btn ind-qb-rec-btn" />
                    </div>
                  ))}
                </Cards>
              </div>
              <div className="ind-qb-col ind-qb-home-side">
                <Cards shadow="none" className="ind-qb-card ind-qb-profile-card">
                  <div className="ind-qb-row"><span className="cap ind-qb-side-cap">YOUR GUILD PROFILE</span><Icon name="Settings" size={14} color="#9ca3af" /></div>
                  <div className="ind-qb-me"><span className="ind-qb-avatar ind-qb-avatar-blue">A</span><div><strong>Rank F Specialist <Icon name="BadgeCheckFill" size={12} color="#16a34a" /></strong><span className="ind-qb-muted sm">Top 5% Guild Performance</span></div></div>
                  <div className="ind-qb-profile-stats">
                    <div><span>Trust Score</span><strong>96%</strong></div>
                    <div><span>Profile Strength</span><strong>92%</strong></div>
                    <div><span>Skills Verified</span><strong>6</strong></div>
                    <div><span>Quests Done</span><strong>12</strong></div>
                  </div>
                  <div className="ind-qb-strength-top"><span>Next Milestone: Rank 5</span><em>92%</em></div>
                  <div className="ind-qb-bar"><i style={{ width: "92%" }} /></div>
                  <SecondaryButton text="View Profile" onClick={() => {}} className="ind-qb-outline block" />
                </Cards>
                <Cards shadow="none" className="ind-qb-card ind-qb-activity-card">
                  <span className="cap ind-qb-side-cap">QUEST ACTIVITY</span>
                  <div className="ind-qb-activity-list">
                  {[
                    ["Application viewed by client", "Website Redesign for SaaS Platform", "1 hour ago", "Eye", "#2f6bff", "#e8efff"],
                    ["Application submitted", "Website Redesign for SaaS Platform", "2 hours ago", "Send", "#475569", "#f1f5f9"],
                    ["Shortlisted", "Mobile App UI/UX Design", "Yesterday", "Star", "#16a34a", "#dcfce7"],
                    ["Quest saved", "Fintech Dashboard UI Design", "Yesterday", "Bookmark", "#475569", "#f1f5f9"],
                  ].map(([t, q, w, ic, c, bg]) => (
                    <div key={t} className="ind-qb-activity-row">
                      <span className="ind-qb-activity-ic" style={{ background: bg }}><Icon name={ic} size={14} color={c} strokeWidth={1.9} /></span>
                      <div className="ind-qb-activity-text"><strong>{t}</strong><p className="ind-qb-activity-quest">{q}</p><p className="ind-qb-activity-time">{w}</p></div>
                    </div>
                  ))}
                  </div>
                  <button type="button" className="ind-qb-activity-log" onClick={() => {}}>View complete activity log <span>›</span></button>
                </Cards>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ============ filter drawer ============ */}
      {filterOpen && (
        <>
          <div className="ind-qb-scrim" onClick={() => setFilterOpen(false)} />
          <aside className="ind-qb-drawer ind-qb-filter-drawer">
            <header className="ind-qb-filter-head">
              <span className="ind-qb-filter-head-title"><Icon name="ListFilter" size={16} color="#fff" /> Filter</span>
              <button type="button" className="ind-qb-filter-close" onClick={() => setFilterOpen(false)} aria-label="Close filter">
                <Icon name="X" size={14} color="#fff" strokeWidth={2} />
              </button>
            </header>
            <div className="ind-qb-filter-body">
              <span className="ind-qb-filter-cap">BUDGET RANGE</span>
              <input
                type="range"
                className="ind-qb-range ind-qb-budget-range"
                value={budgetVal}
                min={5000}
                max={500000}
                onChange={(e) => setBudgetVal(Number(e.target.value))}
              />
              <div className="ind-qb-budget-labels"><span>₹5,000</span><span>₹500,000+</span></div>

              <span className="ind-qb-filter-cap">REQUIRED SKILLS</span>
              <div className="ind-qb-skill-search">
                <Icon name="Search" size={14} color="#9ca3af" />
                <input placeholder="Search here" value={skillSearch} onChange={(e) => setSkillSearch(e.target.value)} />
              </div>
              <div className="ind-qb-filter-skills">
                {["UI Design", "UX Research", "Figma", "React", "Flutter"]
                  .filter((s) => s.toLowerCase().includes(skillSearch.toLowerCase()))
                  .map((s) => {
                    const on = filterSkills.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        className={`ind-qb-fskill ${on ? "on" : ""}`}
                        onClick={() => setFilterSkills((p) => (on ? p.filter((x) => x !== s) : [...p, s]))}
                      >
                        {s}
                      </button>
                    );
                  })}
              </div>

              <span className="ind-qb-filter-cap">TIMELINE</span>
              <div className="ind-qb-timeline-list">
                {["Under 7 Days", "7–15 Days", "15–30 Days", "30+ Days"].map((t) => {
                  const on = filterTimelines.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      className="ind-qb-timeline-row"
                      onClick={() => setFilterTimelines((p) => (on ? p.filter((x) => x !== t) : [...p, t]))}
                    >
                      <span className={`ind-qb-checkbox ${on ? "on" : ""}`}>
                        {on && <Icon name="Check" size={12} color="#fff" strokeWidth={3} />}
                      </span>
                      <span>{t}</span>
                    </button>
                  );
                })}
              </div>

              <span className="ind-qb-filter-cap">QUEST TYPE</span>
              <div className="ind-qb-qtype-list">
                {[
                  ["Standard", "#2f6bff"],
                  ["Emergency", "#b42318"],
                  ["Long-term", "#7c3aed"],
                ].map(([t, dot]) => (
                  <button key={t} type="button" className="ind-qb-qtype-row" onClick={() => setQuestType(t)}>
                    <span className={questType === t ? "ind-qb-qtype-name on" : "ind-qb-qtype-name"}>{t}</span>
                    <span className="ind-qb-qtype-dot" style={{ background: dot }} />
                  </button>
                ))}
              </div>

              <span className="ind-qb-filter-cap">CLIENT RANK</span>
              <span className="ind-qb-rankbox">F</span>

              <PrimaryButton text="Apply Filters" onClick={() => setFilterOpen(false)} className="ind-qb-primary block ind-qb-apply-filters" />
              <button
                type="button"
                className="ind-qb-clear-filters"
                onClick={() => { setFilterSkills([]); setFilterTimelines([]); setQuestType(""); setBudgetVal(500000); setSkillSearch(""); }}
              >
                Clear Filters
              </button>
            </div>
          </aside>
        </>
      )}

      {/* ============ sort drawer ============ */}
      {sortOpen && (
        <>
          <div className="ind-qb-scrim" onClick={() => setSortOpen(false)} />
          <aside className="ind-qb-drawer ind-qb-sort-drawer">
            <header className="ind-qb-sort-head">
              <span className="ind-qb-sort-head-title"><Icon name="ListFilter" size={16} color="#fff" /> Sort</span>
              <button type="button" className="ind-qb-sort-close" onClick={() => setSortOpen(false)} aria-label="Close sort">
                <Icon name="X" size={14} color="#fff" strokeWidth={2} />
              </button>
            </header>
            <div className="ind-qb-sort-body">
              <strong className="ind-qb-sort-title">Sort Quests</strong>
              <p className="ind-qb-muted sm ind-qb-sort-sub">Choose how quests are displayed.</p>
              <div className="ind-qb-sort-divider" />
              <div className="ind-qb-sort-list">
                {SORT_OPTIONS.map((opt) => {
                  const active = sort === opt.id;
                  const isEmergency = opt.id === "emergency";
                  const iconColor = isEmergency ? "#d92d20" : active ? "#0f3d9e" : "#4b5563";
                  return (
                    <button key={opt.id} type="button" className={`ind-qb-sort ${active ? "on" : ""}`} onClick={() => { setSort(opt.id); setSortOpen(false); }}>
                      <span className="ind-qb-sort-ic">
                        {isEmergency
                          ? <span className="ind-qb-emergency-mark">!</span>
                          : <Icon name={opt.icon} size={20} color={iconColor} strokeWidth={1.8} />}
                      </span>
                      <span className="ind-qb-sort-text"><strong className={active ? "active-t" : ""}>{opt.title}</strong><em>{opt.desc}</em></span>
                      {active && (
                        <span className="ind-qb-sort-check">
                          <Icon name="CircleCheck" size={18} color="#0f3d9e" strokeWidth={2} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="ind-qb-sort-divider" />
              <div className="ind-qb-sort-foot">
                <span className="ind-qb-sort-note">Sorting updates your quest list instantly.</span>
                <button type="button" className="ind-qb-sort-reset" onClick={() => { setSort("newest"); setSortOpen(false); }}>Reset to<br />Default</button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* ============ 4 · apply modal ============ */}
      {applyOpen && (
        <div className="ind-qb-scrim center ind-qb-modal-scrim" onClick={() => setApplyOpen(false)}>
          <div className="ind-qb-modal ind-qb-apply-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ind-qb-modal-head">
              <div><h2>Apply to Quest</h2><p className="ind-qb-muted sm">Submit your application for this Quest.</p></div>
              <button type="button" className="ind-qb-x" onClick={() => setApplyOpen(false)} aria-label="Close">
                <Icon name="X" size={16} color="#111827" strokeWidth={2} />
              </button>
            </div>
            <div className="ind-qb-modal-body">
              <div className="ind-qb-apply-sum">
                <div className="ind-qb-apply-sum-left">
                  <strong>{selected?.title || FEATURED.title}</strong>
                  <span className="ind-qb-apply-meta"><em className="ind-qb-mini-pill">Standard Quest</em> <span className="ind-qb-apply-days"><Icon name="Clock" size={12} color="#6b7280" /> 20 Days</span></span>
                  <span className="ind-qb-apply-client">
                    <span className="ind-qb-apply-logo">T</span>
                    <span>TechNova Pvt. Ltd.</span>
                    <span className="ind-qb-verified"><Icon name="BadgeCheckFill" size={12} color="#16a34a" /> Verified Client</span>
                    <span className="ind-qb-rank-a">· Rank A</span>
                  </span>
                </div>
                <strong className="blue ind-qb-apply-budget">₹75,000</strong>
              </div>
              <label className="ind-qb-field-label">Your Application <span>Tell the client why you're a strong fit.</span></label>
              <div className="ind-qb-textarea-wrap">
                <textarea placeholder="Briefly describe your relevant experience..." value={pitch} maxLength={500} onChange={(e) => setPitch(e.target.value)} />
                <span className="ind-qb-count">{pitch.length} / 500</span>
              </div>
              <label className="ind-qb-field-label">Relevant Skills <span>Select the skills you want to highlight.</span></label>
              <div className="ind-qb-skills ind-qb-pick-skills">
                {["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"].map((s) => (
                  <button key={s} type="button" className={picked.includes(s) ? "ind-qb-pick on" : "ind-qb-pick"} onClick={() => toggleSkill(s)}>
                    {picked.includes(s) ? <Icon name="Check" size={12} color="#0f3d9e" strokeWidth={2.5} /> : null}{s}
                  </button>
                ))}
              </div>
              <label className="ind-qb-field-label">Your Availability <span>When can you start?</span></label>
              <div className="ind-qb-avail-list">
                {[["now", "Available now"], ["7days", "Available within 7 days"], ["14days", "Available within 14 days"]].map(([v, l]) => (
                  <label key={v} className={`ind-qb-radio ${avail === v ? "on" : ""}`}>
                    <span className={`ind-qb-radio-dot ${avail === v ? "on" : ""}`} />
                    <input type="radio" checked={avail === v} onChange={() => setAvail(v)} hidden /> {l}
                  </label>
                ))}
              </div>
              <label className="ind-qb-agree">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <span><strong>I can commit to the Quest timeline, scope, and milestone requirements.</strong><em>Review the Quest details and milestones before submitting.</em></span>
              </label>
              <div className="ind-qb-modal-btns ind-qb-apply-btns">
                <SecondaryButton text="Cancel" onClick={() => setApplyOpen(false)} className="ind-qb-outline ind-qb-cancel-btn" />
                <PrimaryButton text="Submit Application" disabled={!pitch.trim() || !agree} onClick={() => { setApplyOpen(false); setSuccessOpen(true); }} className="ind-qb-primary ind-qb-submit-btn" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ 5 · success modal ============ */}
      {successOpen && (
        <div className="ind-qb-scrim center ind-qb-modal-scrim" onClick={() => { setSuccessOpen(false); setStep("list"); }}>
          <div className="ind-qb-modal narrow ind-qb-success-modal" onClick={(e) => e.stopPropagation()}>
            <span className="ind-qb-tick"><Icon name="Check" size={20} color="#fff" strokeWidth={2.5} /></span>
            <h2 className="ind-qb-success-title">Quest Applied!</h2>
            <p className="ind-qb-muted sm ind-qb-success-sub">You've successfully accepted this Quest. The Quest has been added to your active work.</p>
            <div className="ind-qb-success-box">
              <span className="cap ind-qb-success-cap">QUEST</span>
              <strong className="ind-qb-success-quest">{selected?.title || FEATURED.title}</strong>
              <div className="ind-qb-success-grid">
                <div><span className="cap ind-qb-success-cap">CLIENT</span><span className="ind-qb-success-val">TechNova Pvt. Ltd. <Icon name="BadgeCheckFill" size={12} color="#16a34a" /></span></div>
                <div><span className="cap ind-qb-success-cap">STATUS</span><span className="ind-qb-success-status"><i /> Accepted</span></div>
                <div><span className="cap ind-qb-success-cap">BUDGET</span><span className="ind-qb-success-val">₹75,000</span></div>
                <div><span className="cap ind-qb-success-cap">TIMELINE</span><span className="ind-qb-success-val">20 Days</span></div>
              </div>
            </div>
            <div className="ind-qb-next">
              <strong className="ind-qb-next-title">What's Next?</strong>
              {[["01", "Start Collaboration", "Introduce yourself to the client and clarify any initial requirements."], ["02", "Create Milestones", "Check the project timeline and deliverables to plan your work."], ["03", "Track Progress", "Use the workspace to log time, submit work, and manage tasks."]].map(([n, t, d]) => (
                <div key={n} className="ind-qb-next-row"><span className="ind-qb-next-num">{n}</span><div><strong>{t}</strong><p className="ind-qb-muted sm">{d}</p></div></div>
              ))}
            </div>
            <div className="ind-qb-success-info">
              <Icon name="Info" size={14} color="#2f6bff" />
              <span>Quest added to your Active Quests. Your Quest workspace is now ready. You can start collaborating with the client and track your progress from Task Management.</span>
            </div>
            <div className="ind-qb-modal-btns center ind-qb-success-btns">
              <SecondaryButton text="View My Quests" onClick={() => { setSuccessOpen(false); setStep("home"); }} className="ind-qb-outline ind-qb-view-btn" />
              <PrimaryButton text="Go to Quest Board" icon={<Icon name="ArrowRight" size={14} color="#fff" />} iconPosition="right" onClick={() => { setSuccessOpen(false); setStep("list"); }} className="ind-qb-primary ind-qb-go-btn" />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
