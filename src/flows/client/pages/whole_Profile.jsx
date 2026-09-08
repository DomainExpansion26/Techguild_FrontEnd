import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Cards, Header, PrimaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { EmptyStateCard, GuildCard } from "@/Components/Cards/variants";
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
    "Company Profile";

  const tagline = profile?.tagline || profile?.industry || "Technology Company";
  const location = [profile?.city, profile?.country].filter(Boolean).join(", ") || user?.location || "Location not set";
  const memberSince = user?.created_at ? new Date(user.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" }) : "Active Member";
  const logoInitial = companyName ? companyName.charAt(0).toUpperCase() : "C";
  const logoName = companyName.substring(0, 10).toUpperCase();
  const intro = profile?.description || profile?.about_company || "Welcome to our company profile on TechGuild.";
  const about = profile?.about_company || profile?.description || "";
  const website = profile?.website || "";
  const linkedin = profile?.linkedin_url || "";
  const github = profile?.github_url || "";
  const industry = profile?.industry || "Software Development";
  const companySize = profile?.company_size || "10 - 50";
  const founded = profile?.founded_year || "2024";

  const hiringInterests = Array.isArray(profile?.hiring_interests) && profile.hiring_interests.length > 0
    ? profile.hiring_interests
    : ["UI/UX Design", "Web Development", "Mobile Development", "AI & Machine Learning", "DevOps", "Cloud Computing"];

  const details = [
    { iconName: "Briefcase", label: "Industry", value: industry },
    { iconName: "Users", label: "Company Size", value: companySize },
    { iconName: "Calendar", label: "Founded", value: `${founded}` },
    { iconName: "Hash", label: "Projects Posted", value: `${projects.length}` },
    { iconName: "MapPin", label: "Location", value: location },
  ];

  const links = [
    { iconName: "Globe", label: "Website", value: website || "Add website", action: "external", tone: "blue" },
    { iconName: "Linkedin", label: "LinkedIn", value: linkedin || "Add LinkedIn", action: "external", tone: "linkedin" },
    { iconName: "GitHub", label: "GitHub", value: github || "Add GitHub", action: "external", tone: "github" },
  ];

  const checklist = [
    { label: "Company Info", done: Boolean(companyName && companyName !== "Company Profile") },
    { label: "About Company", done: Boolean(about) },
    { label: "Hiring Interests", done: hiringInterests.length > 0 },
    { label: "Verification", done: Boolean(profile?.is_verified) },
    { label: "Billing & Payment", done: false },
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
                      {profile?.is_verified ? (
                        <span className="wp-badge verified">
                          <Icon name="CheckCircle2" size={14} /> Verified Company
                        </span>
                      ) : (
                        <span className="wp-badge" style={{ backgroundColor: "#fef3c7", color: "#92400e" }}>
                          Verification Pending
                        </span>
                      )}
                      <span className="wp-badge hiring">
                        <span className="wp-dot" /> Actively Hiring
                      </span>
                      <span className="wp-badge healthcare">{industry}</span>
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
                    location={location}
                    website={website}
                    memberSince={memberSince}
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
                      <div className="wp-about-me-icon-box">
                        <Icon name="Building" size={24} strokeWidth={1.8} />
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
                    <h3 className="wp-card-title">Hiring Interests &amp; Focus Areas</h3>
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
                        View Board
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
                <Cards variant="base" className="wp-card gray-card" padding="0">
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
                        Manage
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
                      <Icon name="Pencil" size={13} color="#103CA4" /> Edit
                    </button>
                  </div>
                  <div className="wp-link-list">
                    {links.map((l) => (
                      <div className="wp-link-row" key={l.label}>
                        <div className="wp-link-left">
                          <span className={`wp-link-icon-bare ${l.tone}`}>
                            <Icon name={l.iconName} size={18} />
                          </span>
                          <span className="wp-link-label">{l.label}</span>
                        </div>
                        <span className="wp-link-name">{l.value}</span>
                        {l.value && !l.value.startsWith("Add") && (
                          <a
                            href={l.value.startsWith("http") ? l.value : `https://${l.value}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wp-link-action"
                            aria-label={l.label}
                          >
                            <Icon name="ExternalLink" size={16} color="#94a3b8" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Cards>
            </div>

            <div className="wp-grid cols-2">
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
                            <Icon name="CheckCircle2" size={16} className="wp-check-icon-done" />
                          ) : (
                            <Icon name="Circle" size={16} className="wp-check-icon-pending" />
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

              {/* Quick Actions */}
              <Cards variant="base" className="wp-card gray-card" padding="0">
                <div className="wp-card-inner stat-padding">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Quick Actions</h3>
                  </div>
                  <div className="wp-action-list">
                    <button
                      type="button"
                      className="wp-action-btn"
                      onClick={() => navigate("/client-quest-board")}
                    >
                      <div className="wp-action-left">
                        <div className="wp-action-icon-wrap">
                          <Icon name="Plus" size={16} />
                        </div>
                        <span className="wp-action-text">Create New Quest</span>
                      </div>
                      <Icon name="ChevronRight" size={16} className="wp-action-chevron" />
                    </button>

                    <button
                      type="button"
                      className="wp-action-btn"
                      onClick={() => navigate("/client-applications")}
                    >
                      <div className="wp-action-left">
                        <div className="wp-action-icon-wrap">
                          <Icon name="ClipboardList" size={16} />
                        </div>
                        <span className="wp-action-text">Review Candidate Applications</span>
                      </div>
                      <Icon name="ChevronRight" size={16} className="wp-action-chevron" />
                    </button>

                    <button
                      type="button"
                      className="wp-action-btn"
                      onClick={() => navigate("/client-active-quests")}
                    >
                      <div className="wp-action-left">
                        <div className="wp-action-icon-wrap">
                          <Icon name="Files" size={16} />
                        </div>
                        <span className="wp-action-text">Active Contracts &amp; Workrooms</span>
                      </div>
                      <Icon name="ChevronRight" size={16} className="wp-action-chevron" />
                    </button>

                    <button
                      type="button"
                      className="wp-action-btn"
                      onClick={() => navigate("/client-settings/profile")}
                    >
                      <div className="wp-action-left">
                        <div className="wp-action-icon-wrap">
                          <Icon name="Pencil" size={16} />
                        </div>
                        <span className="wp-action-text">Edit Company Profile</span>
                      </div>
                      <Icon name="ChevronRight" size={16} className="wp-action-chevron" />
                    </button>
                  </div>
                </div>
              </Cards>
            </div>

            {/* Trust Journey */}
            <Cards variant="base" className="wp-card wp-trust-card" padding="0">
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Trust Journey</h3>
                  <button
                    className="wp-link-btn"
                    type="button"
                    onClick={() => navigate("/client-company-reputation")}
                  >
                    View details <Icon name="ChevronRight" size={14} />
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
                      <div className="wp-trust-progress-fill" style={{ width: "12%" }} />
                    </div>
                  </div>
                </div>

                <div className="wp-trust-footer">
                  <span className="wp-trust-rank">Rank F (New Client)</span>
                  <span className="wp-trust-next">
                    Complete contracts and verify your organization to level up to Rank E.
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
