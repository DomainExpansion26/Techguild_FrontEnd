import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Cards, Header, PrimaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { /* EmptyStateCard, */ GuildCard } from "@/Components/Cards/variants";
import { useAuth } from "@/context/AuthContext";
import { profileApi } from "@/features/profile/api/profileApi";
import { projectsApi } from "@/features/projects/api/projectsApi";
import "@/flows/individual/pages/DashBoard/dashboard.css";
import "./whole_Profile.css";

const clientNavItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/client-dashboard" },
  { id: "profile", label: "Profile (Guild Card)", icon: "User2", path: "/client-profile" },
  { id: "quest-board", label: "Quest Board", icon: "Files", path: "/client-quest-board" },
  { id: "applications", label: "Applications", icon: "FileText", path: "/client-applications" },
  { id: "active-quests", label: "Active Quests", icon: "Files", path: "/client-active-quests" },
  { id: "company-reputation", label: "Company Reputation", icon: "Verified", path: "/client-company-reputation" },
  { id: "verification-hub", label: "Verification Hub", icon: "Bookmark", path: "/client-verification-hub" },
  { id: "payouts", label: "Payouts", icon: "IndianRupee", path: "/client-payouts" },
  { id: "notifications", label: "Notifications", icon: "Bell", path: "/client-notifications" },
  { id: "settings", label: "Settings", icon: "Settings", path: "/client-settings" },
  { id: "help-support", label: "Help & Support", icon: "CircleQuestionMark", path: "/client-help-support" },
];

export default function WholeProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [profRes, projRes] = await Promise.allSettled([
          profileApi.getProfile(),
          projectsApi.getMyProjects(),
        ]);

        if (profRes.status === "fulfilled") {
          const p = profRes.value;
          setProfile(p?.client || p?.data?.client || p || {});
        }

        if (projRes.status === "fulfilled") {
          const pr = projRes.value;
          const list = pr?.data?.projects || pr?.data || pr?.projects || [];
          setProjects(Array.isArray(list) ? list : []);
        }
      } catch (err) {
        console.warn("Failed to load client profile data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const companyName =
    profile?.company_name ||
    user?.company_name ||
    user?.name ||
    (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : null) ||
    "Nexora Solutions";

  const industry = profile?.industry || "Healthcare Company";
  const tagline =
    profile?.tagline ||
    (profile?.industry ? `${profile.industry} Company` : "Healthcare Solutions Company");
  const location =
    [profile?.city, profile?.country].filter(Boolean).join(", ") ||
    profile?.location ||
    user?.location ||
    "Pune, India";

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" })
    : (profile?.created_at
        ? new Date(profile.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" })
        : "July 2024");

  const logoInitial = companyName ? companyName.charAt(0).toUpperCase() : "N";
  const logoName = companyName.includes(" ")
    ? companyName.split(" ")[0].toUpperCase()
    : companyName.substring(0, 7).toUpperCase();

  const logoInitials = companyName
    ? (companyName.trim().includes(" ")
        ? companyName.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()
        : companyName.slice(0, 2).toUpperCase())
    : "NS";

  const intro =
    profile?.description ||
    profile?.about_company ||
    profile?.about ||
    profile?.tagline ||
    "Empowering businesses with innovative and scalable technology solutions.";
  const about = profile?.about_company || profile?.about || profile?.description || "";
  const website = profile?.website_url || profile?.website || "nexorasolutions.com";
  // const linkedin = profile?.linkedin_url || profile?.linkedin || "";
  // const github = profile?.github_url || profile?.github || "";
  const companySize = profile?.team_size || profile?.company_size || profile?.size || "10 - 50";
  const founded = profile?.founded_year || profile?.founded || profile?.year_founded || "2024";

  let rawInterests =
    profile?.hiring_interests ||
    profile?.hiringInterests ||
    profile?.services ||
    profile?.skills;
  if (typeof rawInterests === "string") {
    try {
      rawInterests = JSON.parse(rawInterests);
    } catch {
      rawInterests = rawInterests.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  const hiringInterests =
    Array.isArray(rawInterests) && rawInterests.length > 0
      ? rawInterests
      : [
          "UI/UX Design",
          "Web Development",
          "Mobile Development",
          "AI / Machine Learning",
          "DevOps",
          "QA Testing",
          "Cloud Computing",
          "Branding",
          "Product Management",
        ];

  const details = [
    { iconName: "Briefcase", label: "Industry", value: industry },
    { iconName: "Users", label: "Company Size", value: companySize },
    { iconName: "Calendar", label: "Founded", value: `${founded}` },
    { iconName: "Hash", label: "Projects Posted", value: `${projects.length || profile?.projects_posted || 0}` },
    { iconName: "MapPin", label: "Location", value: location },
  ];

  const formatFullUrl = (val, fallback = "") => {
    const raw = val || fallback;
    if (!raw) return "";
    return raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  };

  const formatDisplayUrl = (val, fallback = "") => {
    const raw = val || fallback;
    if (!raw) return "";
    return raw.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  };

  const handleDownloadFile = (fileUrl, fileName) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      const blob = new Blob([`Sample preview content for ${fileName}`], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const rawWebsite = profile?.website_url || profile?.website || "nexorasolutions.com";
  const rawLinkedin = profile?.linkedin_url || profile?.linkedin || "linkedin.com/company/nexorasolutions";
  const rawGithub = profile?.github_url || profile?.github || "github.com/nexora-solutions";
  const companyDeck = profile?.company_deck || profile?.deck_url || "Nexora_Company_Deck.pdf";
  const brochure = profile?.brochure || profile?.brochure_url || "Nexora_Brochure.pdf";

  const companyLinks = [
    {
      id: "website",
      iconName: "Globe",
      label: "Website",
      value: rawWebsite,
      displayValue: formatDisplayUrl(rawWebsite, "nexorasolutions.com"),
      url: formatFullUrl(rawWebsite, "https://nexorasolutions.com"),
      type: "link",
      tone: "blue",
      iconColor: "#1d4ed8",
    },
    {
      id: "linkedin",
      iconName: "Linkedin",
      label: "LinkedIn",
      value: rawLinkedin,
      displayValue: formatDisplayUrl(rawLinkedin, "linkedin.com/company/nexorasolutions"),
      url: formatFullUrl(rawLinkedin, "https://linkedin.com/company/nexorasolutions"),
      type: "link",
      tone: "linkedin",
      iconColor: "#0077b5",
    },
    {
      id: "github",
      iconName: "GitHub",
      label: "GitHub",
      value: rawGithub,
      displayValue: formatDisplayUrl(rawGithub, "github.com/nexora-solutions"),
      url: formatFullUrl(rawGithub, "https://github.com/nexora-solutions"),
      type: "link",
      tone: "github",
      iconColor: "#1e293b",
    },
    {
      id: "company-deck",
      iconName: "FileText",
      label: "Company Deck",
      value: companyDeck,
      displayValue: companyDeck,
      fileUrl: profile?.company_deck_url || profile?.deck_url || null,
      type: "download",
      tone: "red",
      iconColor: "#ef4444",
    },
    {
      id: "brochure",
      iconName: "FileText",
      label: "Brochure",
      value: brochure,
      displayValue: brochure,
      fileUrl: profile?.brochure_url || null,
      type: "download",
      tone: "gray",
      iconColor: "#64748b",
    },
  ];

  const checklist = [
    { label: "Company Info", done: Boolean(companyName && companyName !== "Company Profile") },
    { label: "About Company", done: true },
    { label: "Services / Hiring Interests", done: hiringInterests.length > 0 },
    { label: "Verification", done: Boolean(profile?.is_verified ?? true) },
    { label: "Billing & Payment", done: true },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "Posted Website Redesign Quest",
      time: "2 hours ago",
      iconName: "Briefcase",
    },
    {
      id: 2,
      title: "Milestone Approved by Freelancer",
      time: "5 hours ago",
      iconName: "CheckCircle2",
    },
    {
      id: 3,
      title: "Verified Company",
      time: "1 day ago",
      iconName: "Shield",
    },
    {
      id: 4,
      title: "Completed Payment",
      time: "3 days ago",
      iconName: "CreditCard",
    },
    {
      id: 5,
      title: "Joined TechGuild",
      time: "1 week ago",
      iconName: "Users",
    },
  ];

  const hiringStats = [
    {
      id: "projects-posted",
      label: "Projects Posted",
      value: profile?.projects_posted || (projects.length > 0 ? projects.length : 42),
      iconName: "Building2",
      badgeBg: "#EFF6FF",
      iconColor: "#1D4ED8",
      tone: "blue",
    },
    {
      id: "projects-completed",
      label: "Projects Completed",
      value: profile?.projects_completed || 31,
      iconName: "Layers",
      badgeBg: "#F0FDF4",
      iconColor: "#16A34A",
      tone: "green",
    },
    {
      id: "freelancers-hired",
      label: "Freelancers Hired",
      value: profile?.freelancers_hired || 95,
      iconName: "Users",
      badgeBg: "#F5F3FF",
      iconColor: "#9333EA",
      tone: "purple",
    },
    {
      id: "average-rating",
      label: "Average Rating",
      value: profile?.average_rating || profile?.rating || 4.8,
      iconName: "Star",
      badgeBg: "#FFF7ED",
      iconColor: "#EA580C",
      tone: "orange",
    },
    {
      id: "response-time",
      label: "Response Time",
      value: profile?.response_time || "2 hrs",
      iconName: "Clock",
      badgeBg: "#ECFEFF",
      iconColor: "#0891B2",
      tone: "cyan",
    },
    {
      id: "success-rate",
      label: "Success Rate",
      value: profile?.success_rate || "96%",
      iconName: "TrendingUp",
      badgeBg: "#F0FDF4",
      iconColor: "#16A34A",
      tone: "green",
    },
  ];

  const quickActions = [
    {
      id: "create-quest",
      label: "Create New Quest",
      iconName: "Plus",
      onClick: () => navigate("/client-quest-board"),
    },
    {
      id: "invite-freelancer",
      label: "Invite Freelancer",
      iconName: "UserPlus",
      onClick: () => navigate("/client-quest-board"),
    },
    {
      id: "manage-applications",
      label: "Manage Applications",
      iconName: "ClipboardList",
      onClick: () => navigate("/client-applications"),
    },
    {
      id: "upload-deck",
      label: "Upload Company Deck",
      iconName: "Upload",
      onClick: () => navigate("/client-settings/profile"),
    },
    {
      id: "edit-profile",
      label: "Edit Profile",
      iconName: "Pencil",
      onClick: () => navigate("/client-settings/profile"),
    },
    {
      id: "verify-company",
      label: "Verify Company",
      iconName: "Shield",
      onClick: () => navigate("/client-verification-hub"),
    },
  ];

  const completedCount = checklist.filter((c) => c.done).length;
  const completionPct = Math.round((completedCount / checklist.length) * 100);

  const trustRanks = ["F", "E", "D", "C", "B", "A", "S", "SS", "SSS"];

  return (
    <div className="dashboard-layout client-profile-page wp-page-root">
      <Navbar items={clientNavItems} userRole="Client" />

      <main className="main-workspace">
        <Header />

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-secondary mt-2">Loading live company profile...</p>
          </div>
        ) : (
          <div className="wp-scroll-area">
            {/* Top Banner & Profile Identity */}
            <Cards variant="base" className="wp-top-section-card" padding="0">
              <div className="wp-banner">
                <label className="wp-banner-upload">
                  <div className="wp-banner-upload-icon-wrap">
                    <Icon name="Upload" size={22} strokeWidth={2} />
                  </div>
                  <span className="wp-banner-upload-title">Company Banner</span>
                  <span className="wp-banner-upload-subtitle">Upload / Change</span>
                </label>
              </div>

              <div className="wp-identity-layout">
                <div className="wp-identity-left">
                  <div className="wp-logo-wrap">
                    <span className="wp-logo-initial">{logoInitial}</span>
                    <span className="wp-logo-name">{logoName}</span>
                    <button
                      className="wp-logo-edit"
                      aria-label="Edit logo"
                      onClick={() => navigate("/client-settings/profile")}
                    >
                      <Icon name="Pencil" size={14} />
                    </button>
                  </div>

                  <div className="wp-company-details-main">
                    <h1 className="wp-company-name">{companyName}</h1>
                    <p className="wp-company-tagline">{tagline}</p>

                    <div className="wp-badge-row">
                      <span className="wp-badge verified">
                        <Icon name="CheckCircle2" size={14} /> Verified Company
                      </span>
                      <span className="wp-badge hiring">
                        <span className="wp-dot" /> Actively Hiring
                      </span>
                      <span className="wp-badge healthcare">{industry}</span>
                      <button className="wp-more-btn" aria-label="More options" type="button">
                        <Icon name="MoreHorizontal" size={16} />
                      </button>
                    </div>

                    <div className="wp-meta-row">
                      <span className="wp-meta-item">
                        <Icon name="MapPin" size={15} /> {location}
                      </span>
                      <span className="wp-meta-item">
                        <Icon name="Calendar" size={15} /> Member since {memberSince}
                      </span>
                    </div>

                    <p className="wp-intro-text">{intro}</p>

                    <span className="wp-badge verified wp-hiring-top-talent">
                      <Icon name="CheckCircle2" size={14} /> Hiring Top Talent
                    </span>
                  </div>
                </div>

                {/* Guild Card Badge */}
                <div className="wp-identity-right">
                  <GuildCard
                    name={companyName}
                    companyName={companyName}
                    category={industry.toUpperCase()}
                    location={location === "Pune, India" ? "Pune, Maharashtra, India" : location}
                    website={website}
                    logoInitials={logoInitials}
                    memberSince="July 2026"
                  />
                </div>
              </div>
            </Cards>

            <div className="wp-grid cols-2">
              {/* About Me / About Company */}
              {!about ? (
                <Cards variant="base" className="wp-card wp-about-me-card" padding="0">
                  <div className="wp-card-inner wp-about-me-inner">
                    <div className="wp-card-head">
                      <h3 className="wp-card-title wp-about-me-title">About Company</h3>
                    </div>
                    <div className="wp-about-me-body">
                      <div className="wp-about-me-icon-box" style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                        <Icon name="User2" size={26} color="#94a3b8" strokeWidth={1.8} />
                      </div>
                      <h4 className="wp-about-me-heading">
                        Tell Freelancers &amp; Agencies about your company
                      </h4>
                      <p className="wp-about-me-desc">
                        Provide a detailed overview of your mission, goals, and technical standards to attract high-caliber contributors.
                      </p>
                      <PrimaryButton
                        className="wp-about-me-btn"
                        type="button"
                        onClick={() => navigate("/client-settings/profile")}
                      >
                        + Add Company Description
                      </PrimaryButton>
                    </div>
                  </div>
                </Cards>
              ) : (
                <Cards variant="base" className="wp-card" padding="0">
                  <div className="wp-card-inner">
                    <div className="wp-card-head">
                      <h3 className="wp-card-title">About Company</h3>
                      <button
                        className="wp-link-btn"
                        type="button"
                        onClick={() => navigate("/client-settings/profile")}
                      >
                        <Icon name="Pencil" size={14} /> Edit
                      </button>
                    </div>
                    <p className="wp-about-text" style={{ whiteSpace: "pre-line" }}>
                      {about}
                    </p>
                  </div>
                </Cards>
              )}

              {/* Hiring Interests */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Hiring Interests</h3>
                    <button
                      className="wp-link-btn"
                      type="button"
                      onClick={() => navigate("/client-settings/profile")}
                    >
                      <Icon name="Pencil" size={13} /> Edit
                    </button>
                  </div>
                  <div className="wp-chips-wrap">
                    {hiringInterests.map((tag) => (
                      <span key={tag} className="wp-chip-item">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Cards>
            </div>

            <div className="wp-grid cols-3 wp-highlight-cards">
              {/* Company Details */}
              <Cards variant="base" className="wp-card gray-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Company Details</h3>
                  </div>
                  <div className="wp-detail-list">
                    {details.map((d) => (
                      <div className="wp-detail-row" key={d.label}>
                        <span className="wp-detail-icon">
                          <Icon name={d.iconName} size={18} strokeWidth={1.8} />
                        </span>
                        <span className="wp-detail-label">{d.label}</span>
                        <span className="wp-detail-value">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Cards>

              {/* Active Quests */}
              {projects.length === 0 ? (
                <Cards variant="base" className="wp-card" padding="0">
                  <div className="wp-card-inner">
                    <div className="wp-card-head">
                      <h3 className="wp-card-title">Active Quests</h3>
                      <button
                        className="wp-link-btn"
                        type="button"
                        onClick={() => navigate("/client-quest-board")}
                      >
                        View all
                      </button>
                    </div>
                    <div className="wp-empty-card-body">
                      <div className="wp-empty-icon-box">
                        <Icon name="Briefcase" size={32} />
                      </div>
                      <h4 className="wp-empty-heading">No active quests</h4>
                      <p className="wp-empty-desc">
                        You have not posted any project quests yet. Post a quest to receive candidate proposals.
                      </p>
                      <PrimaryButton
                        className="wp-primary-cta-btn"
                        type="button"
                        onClick={() => navigate("/client-quest-board")}
                      >
                        + Post a Quest
                      </PrimaryButton>
                    </div>
                  </div>
                </Cards>
              ) : (
                <Cards variant="base" className="wp-card" padding="0">
                  <div className="wp-card-inner">
                    <div className="wp-card-head">
                      <h3 className="wp-card-title">
                        Active Quests <span className="wp-title-sub">({projects.length})</span>
                      </h3>
                      <button
                        className="wp-link-btn"
                        type="button"
                        onClick={() => navigate("/client-quest-board")}
                      >
                        View all
                      </button>
                    </div>
                    <div className="wp-quest-list">
                      {projects.slice(0, 4).map((q) => (
                        <div className="wp-quest-row" key={q.id || q._id}>
                          <span className="wp-quest-icon">
                            <Icon name="Briefcase" size={16} />
                          </span>
                          <div className="wp-quest-info">
                            <p className="wp-quest-title">{q.title}</p>
                            <p className="wp-quest-sub">
                              {q.budget ? `$${q.budget}` : "Fixed"} &bull; {q.applications_count || 0} Proposals
                            </p>
                          </div>
                          <span className="wp-quest-status">{q.status || "Open"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Cards>
              )}

              {/* Freelancer Reviews */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Freelancer Reviews</h3>
                    <button
                      className="wp-link-btn"
                      type="button"
                      onClick={() => navigate("/client-company-reputation")}
                    >
                      View All
                    </button>
                  </div>
                  <div className="wp-empty-card-body">
                    <div className="wp-empty-icon-box">
                      <Icon name="Star" size={32} color="#cbd5e1" strokeWidth={1.5} fill="none" />
                    </div>
                    <h4 className="wp-empty-heading">No reviews yet.</h4>
                    <p className="wp-empty-desc">
                      Complete your first project to start receiving client reviews.
                    </p>
                  </div>
                </div>
              </Cards>
            </div>

            <div className="wp-grid cols-3">
              {/* Company Links */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Company Links</h3>
                    <button
                      className="wp-link-btn"
                      type="button"
                      onClick={() => navigate("/client-settings/profile")}
                    >
                      <Icon name="Pencil" size={14} /> Edit
                    </button>
                  </div>
                  <div className="wp-link-list">
                    {companyLinks.map((item) => (
                      <div className="wp-link-row" key={item.id}>
                        <div className="wp-link-left">
                          <span className={`wp-link-icon-bare ${item.tone || ""}`} style={{ color: item.iconColor }}>
                            <Icon
                              name={item.iconName}
                              size={18}
                              color={item.iconColor}
                              stroke={item.iconColor}
                              fill={item.id === "github" ? item.iconColor : "none"}
                            />
                          </span>
                          <span className="wp-link-label">{item.label}</span>
                        </div>
                        <span className="wp-link-name" title={item.value}>
                          {item.displayValue || item.value}
                        </span>
                        {item.type === "link" ? (
                          <a
                            href={item.url.startsWith("http") ? item.url : `https://${item.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wp-link-action"
                            aria-label={`Open ${item.label}`}
                          >
                            <Icon name="ExternalLink" size={16} color="#94a3b8" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            className="wp-link-action"
                            aria-label={`Download ${item.label}`}
                            onClick={() => handleDownloadFile(item.fileUrl, item.value)}
                          >
                            <Icon name="Download" size={16} color="#94a3b8" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Cards>

              {/* Profile Completion */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Profile Completion</h3>
                    <span className="wp-progress-pct">{completionPct}%</span>
                  </div>
                  <div className="wp-progress-track">
                    <div className="wp-progress-fill" style={{ width: `${completionPct}%` }} />
                  </div>
                  <div className="wp-checklist">
                    {checklist.map((c) => (
                      <div className="wp-checklist-row" key={c.label}>
                        <span className="wp-checklist-left">
                          {c.done ? (
                            <Icon name="CheckCircle2" size={18} className="wp-check-icon-done" />
                          ) : (
                            <Icon name="Circle" size={18} className="wp-check-icon-pending" />
                          )}
                          <span className={c.done ? "wp-check-label-done" : "wp-check-label-pending"}>
                            {c.label}
                          </span>
                        </span>
                        <span className={`wp-checklist-status ${c.done ? "completed" : "pending"}`}>
                          {c.done ? "Completed" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Cards>

              {/* Recent Activity */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Recent Activity</h3>
                    <button
                      className="wp-link-btn"
                      type="button"
                      onClick={() => navigate("/client-company-reputation")}
                    >
                      View All
                    </button>
                  </div>
                  <div className="wp-activity-list">
                    {recentActivities.map((act) => (
                      <div className="wp-activity-row" key={act.id}>
                        <div className="wp-activity-icon">
                          <Icon name={act.iconName} size={15} color="#16a34a" />
                        </div>
                        <span className="wp-activity-text">{act.title}</span>
                        <span className="wp-activity-time">{act.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Cards>
            </div>

            <div className="wp-grid cols-2">
              {/* Hiring Statistics */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Hiring Statistics</h3>
                  </div>
                  <div className="wp-stat-grid">
                    {hiringStats.map((stat) => (
                      <div className="wp-stat-card" key={stat.id}>
                        <div
                          className={`wp-stat-icon-wrap ${stat.tone || ""}`}
                          style={{ backgroundColor: stat.badgeBg, color: stat.iconColor }}
                        >
                          <Icon
                            name={stat.iconName}
                            size={18}
                            color={stat.iconColor}
                            stroke={stat.iconColor}
                            fill="none"
                          />
                        </div>
                        <span className="wp-stat-value">{stat.value}</span>
                        <span className="wp-stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Cards>

              {/* Quick Actions */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Quick Actions</h3>
                    <button
                      className="wp-link-btn"
                      type="button"
                      onClick={() => navigate("/client-settings/profile")}
                    >
                      <Icon name="Pencil" size={14} /> Edit
                    </button>
                  </div>
                  <div className="wp-action-list">
                    {quickActions.map((action) => (
                      <button
                        type="button"
                        className="wp-action-btn"
                        key={action.id}
                        onClick={action.onClick}
                      >
                        <div className="wp-action-left">
                          <div className="wp-action-icon-wrap">
                            <Icon name={action.iconName} size={16} color="#2563eb" />
                          </div>
                          <span className="wp-action-text">{action.label}</span>
                        </div>
                        <Icon name="ChevronRight" size={16} className="wp-action-chevron" />
                      </button>
                    ))}
                  </div>
                </div>
              </Cards>
            </div>

            {/* Trust Journey */}
            <Cards variant="base" className="wp-card wp-trust-card" padding="0" style={{ marginBottom: "0px" }}>
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Trust Journey</h3>
                  <button
                    className="wp-link-btn"
                    type="button"
                    onClick={() => navigate("/client-company-reputation")}
                  >
                    View all
                  </button>
                </div>

                <div className="wp-trust-scroll-wrapper">
                  <div className="wp-trust-scroll-inner">
                    <div className="wp-trust-nodes">
                      {trustRanks.map((rank, i) => (
                        <div className={`wp-trust-node ${i === 0 ? "active" : ""}`} key={rank}>
                          <span className="wp-trust-circle">{rank}</span>
                          <span className="wp-trust-node-label">{i === 0 ? "You" : "\u00A0"}</span>
                        </div>
                      ))}
                    </div>

                    <div className="wp-trust-progress-bar">
                      <div className="wp-trust-progress-fill" style={{ width: "11%" }} />
                    </div>
                  </div>
                </div>

                <div className="wp-trust-footer">
                  <span className="wp-trust-rank">
                    {profile?.rank ? `Rank ${profile.rank}` : "Rank F"}
                  </span>
                  <span className="wp-trust-next">
                    Next Rank: <b>Reach 100 Trust Points</b> <span className="wp-trust-tp">100 / 100 TP</span>
                  </span>
                </div>
              </div>
            </Cards>
          </div>
        )}
      </main>
    </div>
  );
}
