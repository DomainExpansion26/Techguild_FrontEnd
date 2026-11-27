// [TechGuild Update: 12-10-26] Individual QuestBoard — wired to the Quest Board API.
// Single JSX + single CSS. Uses shared components (DashboardLayout, Cards,
// PrimaryButton, SecondaryButton, Icon) like client WholeProfile / QuestBoard.
// Flow: intro -> list (+ filter / sort drawers) -> details -> apply modal -> success modal -> home
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { DashboardLayout, Cards, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { ICON_SIZES } from "@/constants/sizes";
import { questsApi } from "@/services/api";
import { showSnackbar } from "@/store";
import { useAuth } from "@/context/AuthContext";
import "./QuestBoard.css";

const PAGE_SIZE = 12;

const PROFILE_FALLBACK = { rank: "Rank F", trust: "96%", skills: 8, quests: 12, strength: 92 };

const QUEST_TYPE_META = {
  standard: { label: "Standard", tone: "standard" },
  emergency: { label: "Emergency", tone: "emergency" },
  long_term: { label: "Long-term", tone: "longterm" },
  multi_skill: { label: "Multi-skill", tone: "multiskill" },
};

const SORT_TO_API = {
  newest: "newest",
  "high-low": "budget_desc",
  "low-high": "budget_asc",
  emergency: "emergency_first",
};

const TIMELINE_TO_API = {
  "Under 7 Days": "under_7",
  "7–15 Days": "7_15",
  "15–30 Days": "15_30",
  "30+ Days": "30_plus",
};

const QUEST_TYPE_TO_API = {
  Standard: "standard",
  Emergency: "emergency",
  "Long-term": "long_term",
  "Multi-skill": "multi_skill",
};

const APPLICATION_STATUS_META = {
  applied: { label: "Application Submitted", tone: "blue", note: "Your application was submitted successfully.", noteIcon: "Send", noteColor: "#6b7280" },
  under_review: { label: "Application Under Review", tone: "amber", note: "Estimated decision within 48h", noteIcon: "Clock", noteColor: "#6b7280" },
  shortlisted: { label: "Shortlisted", tone: "green", note: "Client shortlisted your application.", noteIcon: "Star", noteColor: "#15803d" },
  application_viewed: { label: "Application Viewed", tone: "blue", note: "Viewed by client recently", noteIcon: "Eye", noteColor: "#6b7280" },
  accepted: { label: "Accepted", tone: "green", note: "Client accepted your application.", noteIcon: "CircleCheck", noteColor: "#15803d" },
  rejected: { label: "Not Selected", tone: "amber", note: "Client moved forward with another candidate.", noteIcon: "X", noteColor: "#b45309" },
};

function formatINR(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function timeAgo(value) {
  if (!value) return "recently";
  const then = new Date(value).getTime();
  if (Number.isNaN(then)) return "recently";
  const diff = Date.now() - then;
  if (diff < 0) return "just now";
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(value);
}

function deadlineFrom(publishedAt, timelineDays) {
  if (!publishedAt || !timelineDays) return "—";
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return "—";
  date.setDate(date.getDate() + Number(timelineDays));
  return formatDate(date);
}

function rankTone(rank) {
  const value = String(rank || "").toUpperCase();
  if (value === "B") return "rk-purple";
  if (value === "C") return "rk-orange";
  return "rk-blue";
}

function mapQuest(q) {
  const type = QUEST_TYPE_META[q?.quest_type] || QUEST_TYPE_META.standard;
  const skills = Array.isArray(q?.skills)
    ? q.skills.map((skill) => (typeof skill === "string" ? skill : skill?.name)).filter(Boolean)
    : [];

  return {
    id: q?.id,
    tag: type.label,
    tone: type.tone,
    title: q?.title || "Untitled Quest",
    desc: q?.description || "",
    budget: formatINR(q?.budget_inr),
    type: "Fixed Price",
    dur: q?.timeline_days ? `${q.timeline_days} Days` : "—",
    date: formatDate(q?.published_at || q?.created_at),
    asap: q?.quest_type === "emergency",
    skills,
    skillTone: "blue",
    match: q?.match_percentage ? `Recommended for Your Party • ${q.match_percentage}% Match` : null,
    matchPercent: q?.match_percentage ?? null,
    squad: q?.quest_type === "multi_skill",
    client: q?.client_name || "Client",
    rank: q?.client_rank || q?.required_min_rank || "F",
    rankTone: rankTone(q?.client_rank || q?.required_min_rank),
    trust: q?.client_rank ? `Rank ${q.client_rank} Client` : "Verified Client",
    count: `${q?.milestone_count ?? 0} Milestones`,
    apps: `${q?.applicants_count ?? 0} Applicants`,
    views: `${q?.views_count ?? 0} Views`,
    posted: `Posted ${timeAgo(q?.published_at || q?.created_at)}`,
    saved: Boolean(q?.is_saved),
    seed: q?.id,
    applicantsCount: q?.applicants_count ?? 0,
    viewsCount: q?.views_count ?? 0,
    milestoneCount: q?.milestone_count ?? 0,
    raw: q,
  };
}

/* ---------------- small pieces (same file, imported via composition) ---------------- */
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
      {q.skills.length > 0 && (
        <div className="ind-qb-skills">{q.skills.map((s) => <span key={s} className={`ind-qb-skill ${q.skillTone}`}>{s}</span>)}</div>
      )}
      {q.match && (
        <p className="ind-qb-match">
          <Icon name={q.squad ? "Users" : "UserCheck"} size={ICON_SIZES.MD} color="#2f6bff" strokeWidth={1.8} />
          <span>{q.match}</span>
        </p>
      )}
      <div className="ind-qb-client">
        <span className="ind-qb-logo">{q.client.slice(0, 1)}</span>
        <div className="ind-qb-client-text">
          <strong>{q.client} <Icon name="BadgeCheckFill" size={ICON_SIZES.XS} color="#16a34a" /> <em className={q.rankTone || "rk-blue"}>RANK {q.rank}</em></strong>
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
  const dispatch = useDispatch();
  const { user } = useAuth();

  // step: intro | list | details | home
  const [step, setStep] = useState("intro");
  const [quests, setQuests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loadingQuests, setLoadingQuests] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [questError, setQuestError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalQuests, setTotalQuests] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("newest");
  const [appliedFilters, setAppliedFilters] = useState({});
  const [applyOpen, setApplyOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  // apply form (UI only)
  const [pitch, setPitch] = useState("");
  const [picked, setPicked] = useState([]);
  const [avail, setAvail] = useState("now");
  const [agree, setAgree] = useState(false);
  // filter drafts (UI state; sent to API on Apply Filters)
  const [filterSkills, setFilterSkills] = useState(["UI Design", "Figma"]);
  const [filterTimelines, setFilterTimelines] = useState(["15–30 Days"]);
  const [questType, setQuestType] = useState("Standard");
  const [skillSearch, setSkillSearch] = useState("");
  const [budgetVal, setBudgetVal] = useState(500000);

  const profileName =
    user?.name ||
    user?.full_name ||
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    "Freelancer";
  const profileInitials =
    profileName.split(/\s+/).filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "TG";
  const profileAvatar = user?.avatar_url || user?.avatar || null;
  const profileRank = user?.rank
    ? `Rank ${String(user.rank).replace(/^rank\s*/i, "")}`
    : PROFILE_FALLBACK.rank;

  const fetchSummary = useCallback(async () => {
    try {
      const res = await questsApi.getBoardSummary();
      setSummary(res || null);
    } catch (err) {
      dispatch(showSnackbar({ message: err?.message || "Failed to load your quest board summary.", type: "error" }));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  useEffect(() => {
    if (step === "home") fetchSummary();
  }, [step, fetchSummary]);

  const fetchQuests = useCallback(async ({ append = false, cursor } = {}) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoadingQuests(true);
    }
    setQuestError(null);

    try {
      const params = {
        limit: PAGE_SIZE,
        sort: SORT_TO_API[sort] || "newest",
        ...appliedFilters,
      };
      if (cursor) params.cursor = cursor;

      const res = await questsApi.getQuests(params);
      const list = Array.isArray(res?.quests) ? res.quests.map(mapQuest) : [];

      setQuests((prev) => (append ? [...prev, ...list] : list));
      setNextCursor(res?.next_cursor || null);
      setHasMore(Boolean(res?.has_more));
      setTotalQuests((prev) => {
        const serverTotal = Number(res?.total);
        if (Number.isFinite(serverTotal) && serverTotal > 0) return serverTotal;
        return append ? prev + list.length : list.length;
      });
    } catch (err) {
      setQuestError(err?.message || "Failed to load quests.");
      if (!append) setQuests([]);
      dispatch(showSnackbar({ message: err?.message || "Failed to load quests.", type: "error" }));
    } finally {
      if (append) {
        setLoadingMore(false);
      } else {
        setLoadingQuests(false);
      }
    }
  }, [appliedFilters, sort, dispatch]);

  useEffect(() => {
    if (step !== "list") return undefined;
    fetchQuests();
    return undefined;
  }, [step, fetchQuests]);

  const openDetails = async (q) => {
    if (!q?.id) return;
    setSelected(q);
    setDetail(null);
    setStep("details");
    setDetailLoading(true);
    try {
      const res = await questsApi.getQuestById(q.id);
      setDetail(res || null);
    } catch (err) {
      dispatch(showSnackbar({ message: err?.message || "Failed to load quest details.", type: "error" }));
    } finally {
      setDetailLoading(false);
    }
  };

  const openApply = (q) => {
    const quest = q || selected;
    if (q) setSelected(q);
    const skills = Array.isArray(quest?.skills)
      ? quest.skills.map((skill) => (typeof skill === "string" ? skill : skill?.name)).filter(Boolean)
      : [];
    setPicked(skills.slice(0, 5));
    setApplyOpen(true);
  };

  const toggleSave = async (id) => {
    if (!id) return;
    const current = quests.find((q) => q.id === id) || (selected?.id === id ? selected : null);
    const wasSaved = Boolean(current?.saved);
    const applySaved = (saved) => {
      setQuests((prev) => prev.map((q) => (q.id === id ? { ...q, saved } : q)));
      setSelected((prev) => (prev && prev.id === id ? { ...prev, saved } : prev));
      setDetail((prev) => (prev && prev.id === id ? { ...prev, is_saved: saved } : prev));
    };

    applySaved(!wasSaved);

    try {
      const res = await questsApi.toggleSaveQuest(id);
      const saved = Boolean(res?.saved);
      applySaved(saved);
      dispatch(showSnackbar({ message: saved ? "Quest saved." : "Quest removed from saved.", type: "success" }));
    } catch (err) {
      applySaved(wasSaved);
      dispatch(showSnackbar({ message: err?.message || "Failed to update bookmark.", type: "error" }));
    }
  };

  const toggleSkill = (s) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const applyFilters = () => {
    const params = {};
    if (filterSkills.length > 0) params.skills = filterSkills.join(",");
    const timelineBucket = filterTimelines.map((t) => TIMELINE_TO_API[t]).filter(Boolean)[0];
    if (timelineBucket) params.timeline_bucket = timelineBucket;
    if (questType && QUEST_TYPE_TO_API[questType]) params.quest_type = QUEST_TYPE_TO_API[questType];
    if (budgetVal && budgetVal < 500000) params.max_budget = budgetVal;
    setAppliedFilters(params);
    setFilterOpen(false);
  };

  const clearFilters = () => {
    setFilterSkills([]);
    setFilterTimelines([]);
    setQuestType("");
    setBudgetVal(500000);
    setSkillSearch("");
    setAppliedFilters({});
  };

  const SORT_OPTIONS = [
    { id: "newest", title: "Newest", desc: "Show the most recently posted quests first.", icon: "Clock" },
    { id: "high-low", title: "Budget: High → Low", desc: "Highest paying quests first.", icon: "Banknote" },
    { id: "low-high", title: "Budget: Low → High", desc: "Lowest budget quests first.", icon: "ShoppingBag" },
    { id: "emergency", title: "Emergency First", desc: "Prioritize emergency quests at the top.", icon: "emergency-exclaim" },
  ];
  const sortLabel = (SORT_OPTIONS.find((o) => o.id === sort) || SORT_OPTIONS[0]).title;
  const sortButtonLabel = sort === "newest" ? "Most Recent" : sortLabel;

  const kpis = summary?.kpis || {};
  const homeStats = [
    { label: "APPLIED", value: String(kpis.applied_count ?? 0), sub: "Lifetime submissions", subTone: "gray", color: "#1e5eff", icon: "FileText" },
    { label: "UNDER REVIEW", value: String(kpis.under_review_count ?? 0), sub: "Awaiting client decision", subTone: "orange", color: "#16a34a", icon: "Clock" },
    { label: "SHORTLISTED", value: String(kpis.shortlisted_count ?? 0), sub: "Final candidate stages", subTone: "orange", color: "#f59e0b", icon: "Bookmark" },
    { label: "ACTIVE QUEST", value: String(kpis.active_quests_count ?? 0), sub: "In progress delivery", subTone: "blue", color: "#7c3aed", icon: "NotebookText" },
  ];

  const recentApplications = useMemo(() => {
    return (summary?.recent_applications || []).map((application) => {
      const statusKey = String(application.status || "applied").toLowerCase().replace(/\s+/g, "_");
      const meta = APPLICATION_STATUS_META[statusKey] || APPLICATION_STATUS_META.applied;
      return {
        id: application.quest_id,
        title: application.quest_title || "Quest",
        tag1: "Quest Application",
        tag2: application.budget_inr != null ? formatINR(application.budget_inr) : "",
        meta: application.applied_at ? `Applied ${formatDate(application.applied_at)}` : "",
        status: meta.label,
        tone: meta.tone,
        note: meta.note,
        noteIcon: meta.noteIcon,
        noteColor: meta.noteColor,
        primary: meta.tone === "green",
      };
    });
  }, [summary]);

  const recommendedQuests = useMemo(
    () => (summary?.recommended_quests || []).map(mapQuest),
    [summary]
  );

  const activityItems = useMemo(() => {
    return (summary?.recent_applications || []).slice(0, 4).map((application) => {
      const statusKey = String(application.status || "applied").toLowerCase().replace(/\s+/g, "_");
      const meta = APPLICATION_STATUS_META[statusKey] || APPLICATION_STATUS_META.applied;
      const bg = meta.tone === "green" ? "#dcfce7" : meta.tone === "amber" ? "#fef3c7" : "#e8efff";
      return [meta.label, application.quest_title || "Quest", timeAgo(application.applied_at), meta.noteIcon, meta.noteColor, bg];
    });
  }, [summary]);

  const detailMatchesSelected = Boolean(detail && selected && detail.id === selected.id);
  const detailQuest = detailMatchesSelected ? detail : {};
  const activeQuest = selected || {};
  const detailType = detailQuest.quest_type
    ? QUEST_TYPE_META[detailQuest.quest_type]?.label || "Standard"
    : activeQuest.tag || "Standard";
  const detailSkills = detailMatchesSelected && Array.isArray(detailQuest.skills)
    ? detailQuest.skills.map((skill) => (typeof skill === "string" ? skill : skill?.name)).filter(Boolean)
    : (activeQuest.skills || []);
  const detailMilestones = Array.isArray(detailQuest.milestones) ? detailQuest.milestones : [];
  const detailSaved = detailMatchesSelected ? Boolean(detailQuest.is_saved) : Boolean(activeQuest.saved);
  const detailStatus = String(detailQuest.status || "open").replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  const applySkillOptions = detailSkills.length > 0 ? detailSkills : ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"];

  return (
    <DashboardLayout containerClass="ind-qb-root" mainWorkspaceClass="ind-qb-workspace">
      <div className="ind-qb-scroll">

        {/* ============ 1 · INTRO ============ */}
        {step === "intro" && (
          <>
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
                    <span className="ind-qb-avatar photo">{profileInitials}{profileAvatar && <img src={profileAvatar} alt={profileName} onError={(e) => { e.currentTarget.style.display = "none"; }} />}</span>
                    <div className="ind-qb-me-text"><strong>{profileName}</strong><span className="ind-qb-rank">{profileRank}</span></div>
                  </div>
                  <div className="ind-qb-prow"><span className="ind-qb-plabel"><Icon name="Shield" size={ICON_SIZES.XS} color="#6b7280" /> Trust Score</span><strong className="green">{PROFILE_FALLBACK.trust}</strong></div>
                  <div className="ind-qb-prow"><span className="ind-qb-plabel"><Icon name="Medal" size={ICON_SIZES.XS} color="#6b7280" /> Skills Verified</span><strong>{PROFILE_FALLBACK.skills}</strong></div>
                  <div className="ind-qb-prow"><span className="ind-qb-plabel"><Icon name="CircleCheck" size={ICON_SIZES.XS} color="#6b7280" /> Quests Completed</span><strong>{PROFILE_FALLBACK.quests}</strong></div>
                  <div className="ind-qb-strength">
                    <div className="ind-qb-strength-top"><span>Profile Strength</span><em>{PROFILE_FALLBACK.strength}%</em></div>
                    <div className="ind-qb-bar"><i style={{ width: `${PROFILE_FALLBACK.strength}%` }} /></div>
                  </div>
                  <SecondaryButton text="View Profile →" onClick={() => setStep("list")} className="ind-qb-outline block view-btn" />
                </Cards>
                <Cards variant="base" shadow="none" className="ind-qb-card why-card">
                  <h4 className="ind-qb-h4">Why Freelancers Choose TechGuild</h4>
                  <div className="ind-qb-why">
                    <Cards variant="base" shadow="none" className="ind-qb-why-item"><Icon name="ShieldCheck" size={ICON_SIZES.DEFAULT} color="#103CA4" strokeWidth={1.8} /><span>Verified Opportunities</span></Cards>
                    <Cards variant="base" shadow="none" className="ind-qb-why-item"><Icon name="Eye" size={ICON_SIZES.DEFAULT} color="#7c3aed" strokeWidth={1.8} /><span>Transparent Projects</span></Cards>
                    <Cards variant="base" shadow="none" className="ind-qb-why-item"><Icon name="Medal" size={ICON_SIZES.DEFAULT} color="#0d9488" strokeWidth={1.8} /><span>Reputation That Matters</span></Cards>
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
                <p className="ind-qb-muted">Discover {totalQuests ? `${totalQuests} ` : ""}high-stakes engineering projects matching your party's specialization.</p></div>
              <div className="ind-qb-tools">
                <SecondaryButton text="Filter" icon={<Icon name="Filter" size={ICON_SIZES.MD} />} iconPosition="left" onClick={() => { setFilterOpen(true); setSortOpen(false); }} className="ind-qb-tool" />
                <SecondaryButton text={`Sort: ${sortButtonLabel}`} icon={<Icon name="ChevronDown" size={ICON_SIZES.MD} />} iconPosition="right" onClick={() => { setSortOpen(true); setFilterOpen(false); }} className="ind-qb-tool" />
              </div>
            </div>
            {loadingQuests && quests.length === 0 && (
              <p className="ind-qb-center-muted">Loading quests…</p>
            )}
            {questError && (
              <>
                <p className="ind-qb-center-muted">{questError}</p>
                <div className="ind-qb-center"><SecondaryButton text="Retry" onClick={() => fetchQuests()} className="ind-qb-load" /></div>
              </>
            )}
            {!loadingQuests && !questError && quests.length === 0 && (
              <p className="ind-qb-center-muted">No quests match your filters yet.</p>
            )}
            {quests.length > 0 && (
              <div className="ind-qb-grid">
                {quests.map((q) => <QuestCard key={q.id} q={q} onView={openDetails} onApply={openApply} onSave={toggleSave} />)}
              </div>
            )}
            <p className="ind-qb-center-muted">Showing {quests.length} of {totalQuests || quests.length} active quests</p>
            {hasMore && (
              <div className="ind-qb-center">
                <SecondaryButton
                  text={loadingMore ? "Loading..." : "Load More Quests"}
                  icon={!loadingMore ? <Icon name="ChevronDown" size={ICON_SIZES.MD} /> : undefined}
                  iconPosition="right"
                  onClick={() => fetchQuests({ append: true, cursor: nextCursor })}
                  disabled={loadingMore}
                  className="ind-qb-load"
                />
              </div>
            )}
          </>
        )}

        {/* ============ 3 · DETAILS ============ */}
        {step === "details" && (
          <>
            {detailLoading && <p className="ind-qb-center-muted">Loading latest quest details…</p>}
            <div className="ind-qb-details-grid">
              {/* Top — single full-width card like Figma (hero left + budget panel right) */}
              <div className="ind-qb-card ind-qb-top-card">
                <div className="ind-qb-top-left">
                  <span className="ind-qb-mini">{detailType.toUpperCase()}</span>
                  <h1 className="ind-qb-h1 sm">{activeQuest.title || "Quest"}</h1>
                  <p className="ind-qb-detail-desc">{activeQuest.desc || detailQuest.description || ""}</p>
                  <p className="ind-qb-detail-meta">
                    <span><Icon name="Clock" size={ICON_SIZES.XS} color="#6b7280" /> Posted {timeAgo(detailQuest.published_at || detailQuest.created_at)}</span>
                    <span><Icon name="Eye" size={ICON_SIZES.XS} color="#6b7280" /> Views: {detailQuest.views_count ?? activeQuest.viewsCount ?? 0}</span>
                    <span><Icon name="Users" size={ICON_SIZES.XS} color="#6b7280" /> Applicants: {detailQuest.applicants_count ?? activeQuest.applicantsCount ?? 0}</span>
                  </p>
                </div>
                <div className="ind-qb-top-right">
                  <div className="ind-qb-budget-top">
                    <span className="cap ind-qb-budget-cap">BUDGET</span>
                    <span className="ind-qb-open"><Icon name="CircleCheck" size={12} color="#fff" strokeWidth={2} /> {detailStatus}</span>
                  </div>
                  <strong className="ind-qb-budget-value">{activeQuest.budget || formatINR(detailQuest.budget_inr)}</strong>
                  <span className="ind-qb-muted sm">{activeQuest.type || "Fixed Price"}</span>
                  <div className="ind-qb-budget-grid">
                    <div><span className="ind-qb-budget-label">Timeline</span><strong>{detailQuest.timeline_days ? `${detailQuest.timeline_days} Days` : activeQuest.dur || "—"}</strong></div>
                    <div><span className="ind-qb-budget-label">Deadline</span><strong>{deadlineFrom(detailQuest.published_at || detailQuest.created_at, detailQuest.timeline_days)}</strong></div>
                  </div>
                  <div className="ind-qb-actions ind-qb-budget-actions">
                    <PrimaryButton text="Apply to Quest" onClick={() => openApply(selected)} className="ind-qb-primary ind-qb-budget-apply" />
                    <button type="button" className="ind-qb-bookmark-btn" aria-label="Save quest" onClick={() => toggleSave(selected?.id)}>
                      <Icon name="Bookmark" size={ICON_SIZES.MD} color={detailSaved ? "#0f3d9e" : "#111827"} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              </div>
              <Cards shadow="none" className="ind-qb-card ind-qb-about-card">
                <h3 className="ind-qb-h3">About This Quest</h3>
                {(activeQuest.desc || detailQuest.description || "No description provided.").split(/\n{2,}/).map((para, i) => (
                  <p key={i} className="ind-qb-muted ind-qb-about-text">{para}</p>
                ))}
              </Cards>
              <Cards shadow="none" className="ind-qb-card ind-qb-client-card">
                <span className="cap ind-qb-client-cap">ABOUT THE CLIENT</span>
                <div className="ind-qb-me ind-qb-client-me">
                  <span className="ind-qb-tn">{(detailQuest.client_name || activeQuest.client || "C").slice(0, 2).toUpperCase()}</span>
                  <div className="ind-qb-client-info">
                    <strong>{detailQuest.client_name || activeQuest.client || "Client"} <Icon name="BadgeCheckFill" size={ICON_SIZES.XS} color="#16a34a" /></strong>
                    <span className="ind-qb-muted sm ind-qb-loc"><Icon name="MapPin" size={12} color="#6b7280" /> {detailQuest.industry || detailQuest.category || "TechGuild Client"}</span>
                  </div>
                </div>
                <div className="ind-qb-client-stats">
                  <div><span>Required Rank</span><strong className="blue">{detailQuest.required_min_rank || activeQuest.rank || "—"}</strong></div>
                  <div><span>Milestones</span><strong>{detailMilestones.length || detailQuest.milestone_count || activeQuest.milestoneCount || 0}</strong></div>
                  <div><span>Applicants</span><strong>{detailQuest.applicants_count ?? activeQuest.applicantsCount ?? 0}</strong></div>
                  <div><span>Views</span><strong>{detailQuest.views_count ?? activeQuest.viewsCount ?? 0}</strong></div>
                </div>
                <SecondaryButton text="View Client Profile" onClick={() => {}} className="ind-qb-outline block ind-qb-client-btn" />
              </Cards>
              <Cards shadow="none" className="ind-qb-card ind-qb-skills-card">
                <h3 className="ind-qb-h3">Required Skills</h3>
                <div className="ind-qb-skills ind-qb-req-skills">
                  {detailSkills.length > 0 ? detailSkills.map((skill, index) => (
                    <span key={`${skill}-${index}`} className={`ind-qb-pill-skill ${["pill-blue", "pill-orange", "pill-green", "pill-purple", "pill-navy"][index % 5]}`}>{skill}</span>
                  )) : <span className="ind-qb-muted sm">No specific skills listed.</span>}
                </div>
              </Cards>
              <Cards shadow="none" className="ind-qb-card ind-qb-before-card">
                <span className="cap ind-qb-before-cap">BEFORE YOU ACCEPT</span>
                <p className="ind-qb-before-line"><Icon name="Info" size={ICON_SIZES.SM} color="#6b7280" /> <span>{detailMilestones.length > 0 ? `Review the ${detailMilestones.length} milestone${detailMilestones.length > 1 ? "s" : ""} defined for this quest.` : "Review the full milestone schedule."}</span></p>
                <p className="ind-qb-before-line"><Icon name="Info" size={ICON_SIZES.SM} color="#6b7280" /> <span>{detailSkills.length > 0 ? `Ensure you have the required ${detailSkills[0]} bandwidth.` : "Ensure you have the required bandwidth."}</span></p>
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
            <div className="ind-qb-home-head">
              <div>
                <h1 className="ind-qb-h1">Good morning, {profileName.split(/\s+/)[0]}</h1>
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
                  {homeStats.map((s) => (
                    <Cards key={s.label} shadow="none" className="ind-qb-card ind-qb-stat" style={{ "--stat-color": s.color }}>
                      <div className="ind-qb-stat-top"><span className="cap ind-qb-stat-cap">{s.label}</span><span className="ind-qb-stat-ic" style={{ background: s.color }}><Icon name={s.icon} size={14} color="#fff" strokeWidth={2} /></span></div>
                      <h2 className="ind-qb-stat-val">{s.value}</h2>
                      <span className={`ind-qb-muted sm ind-qb-stat-sub ${s.subTone}`}>{s.sub}</span>
                    </Cards>
                  ))}
                </div>
                <Cards shadow="none" className="ind-qb-card ind-qb-updates-card">
                  <div className="ind-qb-row ind-qb-updates-head">
                    <div><h3 className="ind-qb-h3">Application Updates <em className="ind-qb-recent-pill">{recentApplications.length} Recent</em></h3>
                      <p className="ind-qb-muted sm">Real-time status of your recently submitted proposals</p></div>
                    <button type="button" className="ind-qb-arrow-link" aria-label="See all">→</button>
                  </div>
                  {recentApplications.length === 0 ? (
                    <p className="ind-qb-center-muted">No applications yet. Explore the Quest Board to get started.</p>
                  ) : recentApplications.map((a) => (
                    <div key={a.id || a.title} className="ind-qb-app">
                      <div className="ind-qb-row ind-qb-app-top"><strong className="ind-qb-app-title">{a.title}</strong><span className={`ind-qb-status ${a.tone}`}><i /> {a.status}</span></div>
                      <p className="ind-qb-app-tags">{a.tag1}{a.tag2 ? ` · ${a.tag2}` : ""}</p>
                      <p className="ind-qb-app-meta">{a.meta}</p>
                      <div className="ind-qb-row ind-qb-app-foot">
                        <p className={`ind-qb-muted sm ind-qb-app-note ${a.primary ? "green" : ""}`}><Icon name={a.noteIcon} size={12} color={a.noteColor} /> {a.note}</p>
                        <div className="ind-qb-app-btns">
                          <SecondaryButton text="View Application" onClick={() => openDetails({ id: a.id, title: a.title })} className={a.primary ? "ind-qb-mini-btn ind-qb-mini-primary" : "ind-qb-mini-btn"} />
                          <SecondaryButton text="View Quest" onClick={() => openDetails({ id: a.id, title: a.title })} className="ind-qb-mini-btn" />
                        </div>
                      </div>
                    </div>
                  ))}
                </Cards>
                <Cards shadow="none" className="ind-qb-card ind-qb-rec-card">
                  <div className="ind-qb-row"><div><h3 className="ind-qb-h3">Recommended Quests</h3><p className="ind-qb-muted sm">Opportunities matching your skills and experience.</p></div><button type="button" className="ind-qb-link" onClick={() => setStep("list")}>View Quest Board →</button></div>
                  {recommendedQuests.length === 0 ? (
                    <p className="ind-qb-center-muted">No recommendations yet. Explore the Quest Board to get matched.</p>
                  ) : recommendedQuests.map((r) => (
                    <div key={r.id} className="ind-qb-rec">
                      <div className="ind-qb-rec-left"><strong>{r.title} {r.matchPercent != null && <em className="green">{r.matchPercent}% Match</em>}</strong><p className="ind-qb-rec-meta"><span className="ind-qb-verified-text">Verified Client</span> · Rank {r.rank} · <span className="ind-qb-budget-text">{r.budget}</span> <span className="ind-qb-time-text">{r.dur}</span></p>{r.skills.length > 0 && <div className="ind-qb-skills ind-qb-rec-skills">{r.skills.map((s) => <span key={s} className="ind-qb-rec-skill">{s}</span>)}</div>}</div>
                      <SecondaryButton text="View Quest" onClick={() => openDetails(r)} className="ind-qb-mini-btn ind-qb-rec-btn" />
                    </div>
                  ))}
                </Cards>
              </div>
              <div className="ind-qb-col ind-qb-home-side">
                <Cards shadow="none" className="ind-qb-card ind-qb-profile-card">
                  <div className="ind-qb-row"><span className="cap ind-qb-side-cap">YOUR GUILD PROFILE</span><Icon name="Settings" size={14} color="#9ca3af" /></div>
                  <div className="ind-qb-me"><span className="ind-qb-avatar ind-qb-avatar-blue">{profileInitials}</span><div><strong>{profileRank} Specialist <Icon name="BadgeCheckFill" size={12} color="#16a34a" /></strong><span className="ind-qb-muted sm">Top 5% Guild Performance</span></div></div>
                  <div className="ind-qb-profile-stats">
                    <div><span>Trust Score</span><strong>{PROFILE_FALLBACK.trust}</strong></div>
                    <div><span>Profile Strength</span><strong>{PROFILE_FALLBACK.strength}%</strong></div>
                    <div><span>Skills Verified</span><strong>{PROFILE_FALLBACK.skills}</strong></div>
                    <div><span>Quests Done</span><strong>{PROFILE_FALLBACK.quests}</strong></div>
                  </div>
                  <div className="ind-qb-strength-top"><span>Next Milestone: Rank 5</span><em>{PROFILE_FALLBACK.strength}%</em></div>
                  <div className="ind-qb-bar"><i style={{ width: `${PROFILE_FALLBACK.strength}%` }} /></div>
                  <SecondaryButton text="View Profile" onClick={() => {}} className="ind-qb-outline block" />
                </Cards>
                <Cards shadow="none" className="ind-qb-card ind-qb-activity-card">
                  <span className="cap ind-qb-side-cap">QUEST ACTIVITY</span>
                  <div className="ind-qb-activity-list">
                  {activityItems.length === 0 ? (
                    <p className="ind-qb-muted sm">No quest activity yet.</p>
                  ) : activityItems.map(([t, q, w, ic, c, bg], index) => (
                    <div key={`${t}-${index}`} className="ind-qb-activity-row">
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
                  ["Standard", "#103CA4"],
                  ["Emergency", "#b42318"],
                  ["Long-term", "#7c3aed"],
                  ["Multi-skill", "#0d9488"],
                ].map(([t, dot]) => (
                  <button key={t} type="button" className="ind-qb-qtype-row" onClick={() => setQuestType(t)}>
                    <span className={questType === t ? "ind-qb-qtype-name on" : "ind-qb-qtype-name"}>{t}</span>
                    <span className="ind-qb-qtype-dot" style={{ background: dot }} />
                  </button>
                ))}
              </div>

              <span className="ind-qb-filter-cap">CLIENT RANK</span>
              <span className="ind-qb-rankbox">F</span>

              <PrimaryButton text="Apply Filters" onClick={applyFilters} className="ind-qb-primary block ind-qb-apply-filters" />
              <button
                type="button"
                className="ind-qb-clear-filters"
                onClick={clearFilters}
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
                  <strong>{selected?.title || "Quest"}</strong>
                  <span className="ind-qb-apply-meta"><em className="ind-qb-mini-pill">{detailType} Quest</em> <span className="ind-qb-apply-days"><Icon name="Clock" size={12} color="#6b7280" /> {selected?.dur || "—"}</span></span>
                  <span className="ind-qb-apply-client">
                    <span className="ind-qb-apply-logo">{(selected?.client || "C").slice(0, 1)}</span>
                    <span>{selected?.client || "Client"}</span>
                    <span className="ind-qb-verified"><Icon name="BadgeCheckFill" size={12} color="#16a34a" /> Verified Client</span>
                    <span className="ind-qb-rank-a">· Rank {selected?.rank || "—"}</span>
                  </span>
                </div>
                <strong className="blue ind-qb-apply-budget">{selected?.budget || "—"}</strong>
              </div>
              <label className="ind-qb-field-label">Your Application <span>Tell the client why you're a strong fit.</span></label>
              <div className="ind-qb-textarea-wrap">
                <textarea placeholder="Briefly describe your relevant experience..." value={pitch} maxLength={500} onChange={(e) => setPitch(e.target.value)} />
                <span className="ind-qb-count">{pitch.length} / 500</span>
              </div>
              <label className="ind-qb-field-label">Relevant Skills <span>Select the skills you want to highlight.</span></label>
              <div className="ind-qb-skills ind-qb-pick-skills">
                {applySkillOptions.map((s) => (
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
                <PrimaryButton text="Submit Application" disabled={!pitch.trim() || !agree} onClick={() => { setApplyOpen(false); setSuccessOpen(true); dispatch(showSnackbar({ message: "Application submitted successfully.", type: "success" })); }} className="ind-qb-primary ind-qb-submit-btn" />
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
            <p className="ind-qb-muted sm ind-qb-success-sub">Your application has been submitted successfully. The client will review it shortly.</p>
            <div className="ind-qb-success-box">
              <span className="cap ind-qb-success-cap">QUEST</span>
              <strong className="ind-qb-success-quest">{selected?.title || "Quest"}</strong>
              <div className="ind-qb-success-grid">
                <div><span className="cap ind-qb-success-cap">CLIENT</span><span className="ind-qb-success-val">{selected?.client || "Client"} <Icon name="BadgeCheckFill" size={12} color="#16a34a" /></span></div>
                <div><span className="cap ind-qb-success-cap">STATUS</span><span className="ind-qb-success-status"><i /> Submitted</span></div>
                <div><span className="cap ind-qb-success-cap">BUDGET</span><span className="ind-qb-success-val">{selected?.budget || "—"}</span></div>
                <div><span className="cap ind-qb-success-cap">TIMELINE</span><span className="ind-qb-success-val">{selected?.dur || "—"}</span></div>
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
