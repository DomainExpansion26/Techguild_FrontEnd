import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Cards, Header, PrimaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
// =============================================================================
// CARD COMPONENTS USED IN WHOLE PROFILE:
//
// 1. Cards (variant="base" / BaseCard) -> Imported from "@/Components"
//    - Card 1:  Top Banner & Identity Container (.wp-top-section-card)
//    - Card 2:  About Me (Empty) / About Company (Populated) (.wp-about-me-card / .wp-card)
//    - Card 3:  Hiring Interests (.wp-card)
//    - Card 4:  Company Details Metadata (.wp-card.gray-card)
//    - Card 5:  Active Quests (.wp-card)
//    - Card 6:  Freelancer Reviews (.wp-card)
//    - Card 7:  Company Links & Documents (.wp-card)
//    - Card 8:  Profile Completion Checklist & Progress (.wp-card)
//    - Card 9:  Recent Activity Timeline (.wp-card)
//    - Card 10: Hiring Statistics Grid (.wp-card.gray-card)
//    - Card 11: Quick Actions List (.wp-card.gray-card)
//    - Card 12: Trust Journey Gamified Progression (.wp-card.wp-trust-card)
//
// 2. GuildCard -> Imported from "@/Components/Cards/variants"
//    - Card 1.1: Official company Guild Card badge & rank (.wp-identity-right)
//
// 3. EmptyStateCard -> Imported from "@/Components/Cards/variants"
//    - Card 9:  Recent Activity empty fallback ("No recent activity")
// =============================================================================
import {
  EmptyStateCard,
  GuildCard,
} from "@/Components/Cards/variants";
import "@/Modules/Individual/Screen/Pages/DashBoard/dashboard.css";
import "./whole_Profile.css";

// ---- mock data ----
const company = {
  name: "Nexora Solutions",
  tagline: "Healthcare Solutions Company",
  location: "Pune, India",
  memberSince: "July 2024",
  logoInitial: "N",
  logoName: "NEXORA",
  intro: "Empowering businesses with innovative and scalable technology solutions.",
  guildCard: {
    logoInitials: "NS",
    category: "HEALTHCARE COMPANY",
    starRating: 4,
    location: "Pune, Maharashtra, India",
    website: "Website: nexoraprint.com",
    guildId: "IND-MH-01-072026",
    memberSince: "July 2026",
    rank: "F",
  },
  about: "",
  hiringInterests: [
    "UI/UX Design",
    "Web Development",
    "Mobile Development",
    "AI / Machine Learning",
    "DevOps",
    "QA Testing",
    "Cloud Computing",
    "Branding",
    "Product Management",
  ],
  details: [
    { iconName: "Briefcase", label: "Industry", value: "Software Development" },
    { iconName: "Users", label: "Company Size", value: "51 - 100" },
    { iconName: "Calendar", label: "Founded", value: "2020" },
    { iconName: "Hash", label: "Projects Posted", value: "46" },
    { iconName: "MapPin", label: "Location", value: "Pune, India" },
  ],
  activeQuests: [],
  rating: {
    score: 0,
    reviews: 0,
    breakdown: [],
  },
  links: [
    { iconName: "Globe", label: "Website", value: "nexorasolutions.com", action: "external", tone: "blue" },
    { iconName: "Linkedin", label: "LinkedIn", value: "linkedin.com/company/nexora", action: "external", tone: "linkedin" },
    { iconName: "GitHub", label: "GitHub", value: "github.com/nexora-solutions", action: "external", tone: "github" },
    { iconName: "FileText", label: "Company Deck", value: "Nexora_Company_Deck.pdf", action: "download", tone: "red" },
    { iconName: "FileText", label: "Brochure", value: "Nexora_Brochure.pdf", action: "download", tone: "gray" },
  ],
  checklist: [
    { label: "Company Info", done: true },
    { label: "About Company", done: true },
    { label: "Services / Hiring Interests", done: true },
    { label: "Verification", done: true },
    { label: "Billing & Payment", done: true },
  ],
  recentActivity: [
    { iconName: "Briefcase", text: "Posted Website Redesign Quest", time: "2 hours ago" },
    { iconName: "CheckCircle2", text: "Milestone Approved by Freelancer", time: "5 hours ago" },
    { iconName: "Shield", text: "Verified Company", time: "1 day ago" },
    { iconName: "CreditCard", text: "Completed Payment", time: "3 days ago" },
    { iconName: "Users", text: "Joined TechGuild", time: "1 week ago" },
  ],
  //hiringStats
  hiringStats: [
    { iconName: "Building2", bg: "#eff6ff", tone: "blue", value: "42", label: "Projects Posted" },
    { iconName: "Layers", bg: "#f0fdf4", tone: "green", value: "31", label: "Projects Completed" },
    { iconName: "Users", bg: "#faf5ff", tone: "purple", value: "95", label: "Freelancers Hired" },
    { iconName: "Star", bg: "#fffbeb", tone: "orange", value: "4.8", label: "Average Rating" },
    { iconName: "Clock", bg: "#ecfeff", tone: "cyan", value: "2 hrs", label: "Response Time" },
    { iconName: "TrendingUp", bg: "#f0fdf4", tone: "emerald", value: "96%", label: "Success Rate" },
  ],
  quickActions: [
    { iconName: "Plus", label: "Create New Quest" },
    { iconName: "UserPlus", label: "Invite Freelancer" },
    { iconName: "ClipboardList", label: "Manage Applications" },
    { iconName: "Upload", label: "Upload Company Deck" },
    { iconName: "Pencil", label: "Edit Profile" },
    { iconName: "Shield", label: "Verify Company" },
  ],
  trustJourney: {
    ranks: ["F", "E", "D", "C", "B", "A", "S", "SS", "SSS"],
    currentIndex: 0,
    points: 100,
    pointsNeeded: 100,
  },
};

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

const WholeProfile = () => {
  const navigate = useNavigate();
  const completedCount = company.checklist.filter((c) => c.done).length;
  const completionPct = company.checklist.length
    ? Math.round((completedCount / company.checklist.length) * 100)
    : 0;

  return (
    <div className="dashboard-layout client-profile-page wp-page-root">
      <Navbar items={clientNavItems} userRole="Client" />

      <main className="main-workspace">
        <Header />

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
                  <span className="wp-logo-initial">{company.logoInitial}</span>
                  <span className="wp-logo-name">{company.logoName}</span>
                  <button className="wp-logo-edit" aria-label="Edit logo">
                    <Icon name="Pencil" size={14} />
                  </button>
                </div>

                <div className="wp-company-details-main">
                  <h1 className="wp-company-name">{company.name}</h1>
                  <p className="wp-company-tagline">{company.tagline}</p>

                  <div className="wp-badge-row">
                    <span className="wp-badge verified">
                      <Icon name="CheckCircle2" size={14} /> Verified Company
                    </span>
                    <span className="wp-badge hiring">
                      <span className="wp-dot" /> Actively Hiring
                    </span>
                    <span className="wp-badge healthcare">Healthcare Company</span>
                    <button className="wp-more-btn" aria-label="More options">
                      <Icon name="MoreHorizontal" size={16} />
                    </button>
                  </div>

                  <div className="wp-meta-row">
                    <span className="wp-meta-item">
                      <Icon name="MapPin" size={15} /> {company.location}
                    </span>
                    <span className="wp-meta-item">
                      <Icon name="Calendar" size={15} /> Member since {company.memberSince}
                    </span>
                  </div>

                  <p className="wp-intro-text">{company.intro}</p>

                  <span className="wp-badge verified wp-hiring-top-talent">
                    <Icon name="CheckCircle2" size={14} /> Hiring Top Talent
                  </span>
                </div>
              </div>

              {/* Guild Card Badge */}
              <div className="wp-identity-right">
                <GuildCard
                  name={company.name}
                  guildCard={company.guildCard}
                />
              </div>
            </div>
          </Cards>

          <div className="wp-grid cols-2">
            {/* About Me / About Company */}
            {!company.about ? (
              <Cards variant="base" className="wp-card wp-about-me-card" padding="0">
                <div className="wp-card-inner wp-about-me-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title wp-about-me-title">About Me</h3>
                  </div>
                  <div className="wp-about-me-body">
                    <div className="wp-about-me-icon-box">
                      <Icon name="User" size={24} strokeWidth={1.8} />
                    </div>
                    <h4 className="wp-about-me-heading">
                      Tell Freelancers and Agencies about yourself
                    </h4>
                    <p className="wp-about-me-desc">
                      Tell freelancers and agencies about your business, goals, and expectations to attract the right professionals for your projects.
                    </p>
                    <PrimaryButton
                      className="wp-about-me-btn"
                      type="button"
                    >
                      + Add About Me
                    </PrimaryButton>
                  </div>
                </div>
              </Cards>
            ) : (
              <Cards
                variant="base"
                className="wp-card"
                padding="0"
              >
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">About Company</h3>
                    <button className="wp-link-btn" type="button">
                      <Icon name="Pencil" size={14} /> Edit
                    </button>
                  </div>
                  <p className="wp-about-text">
                    {company.about.split("\n\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                  <button className="wp-readmore" type="button">
                    Read More <Icon name="ChevronRight" size={14} />
                  </button>
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
                  >
                    <Icon name="Pencil" size={13} /> Edit
                  </button>
                </div>
                <div className="wp-chips-wrap">
                  {company.hiringInterests.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="wp-chip-item"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </Cards>
          </div>

          <div className="wp-grid cols-3 wp-highlight-cards">
            {/* Company Details */}
            <Cards
              variant="base"
              className="wp-card gray-card"
              padding="0"
            >
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Company Details</h3>
                </div>
                <div className="wp-detail-list">
                  {company.details.map((d) => (
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
            {company.activeQuests.length === 0 ? (
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Active Quests</h3>
                    <button
                      className="wp-link-btn"
                      type="button"
                    >
                      View All
                    </button>
                  </div>
                  <div className="wp-empty-card-body">
                    <div className="wp-empty-icon-box">
                      <Icon name="Briefcase" size={32} />
                    </div>
                    <h4 className="wp-empty-heading">No active quests.</h4>
                    <p className="wp-empty-desc">
                      You haven't posted any projects yet. Post a quest and get applications from freelancers and agencies.
                    </p>
                    <PrimaryButton
                      className="wp-primary-cta-btn"
                      type="button"
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
                      Active Quests <span className="wp-title-sub">(Hiring Now)</span>
                    </h3>
                    <button className="wp-link-btn" type="button">
                      View All
                    </button>
                  </div>
                  <div className="wp-quest-list">
                    {company.activeQuests.map((q) => (
                      <div className="wp-quest-row" key={q.title}>
                        <span className="wp-quest-icon">
                          <Icon name="Briefcase" size={16} />
                        </span>
                        <div className="wp-quest-info">
                          <p className="wp-quest-title">{q.title}</p>
                          <p className="wp-quest-sub">{q.sub}</p>
                        </div>
                        <span className="wp-quest-status">{q.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Cards>
            )}

            {/* Freelancer Reviews */}
            {!company.rating || company.rating.reviews === 0 ? (
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Freelancer Reviews</h3>
                    <button
                      className="wp-link-btn"
                      type="button"
                    >
                      View All
                    </button>
                  </div>
                  <div className="wp-empty-card-body">
                    <div className="wp-empty-icon-box">
                      <Icon name="Star" size={32} />
                    </div>
                    <h4 className="wp-empty-heading">No reviews yet.</h4>
                    <p className="wp-empty-desc">
                      Complete your first project to start receiving client reviews.
                    </p>
                  </div>
                </div>
              </Cards>
            ) : (
              <Cards variant="base" className="wp-card gray-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Freelancer Reviews</h3>
                    <button className="wp-link-btn" type="button">
                      View All
                    </button>
                  </div>

                  <div className="wp-rating-big">
                    <span className="wp-rating-number">{company.rating.score}</span>
                    <div className="wp-rating-col">
                      <span className="wp-rating-stars" aria-label="5 out of 5 stars">
                        <span className="wp-review-star">★</span>
                        <span className="wp-review-star">★</span>
                        <span className="wp-review-star">★</span>
                        <span className="wp-review-star">★</span>
                        <span className="wp-review-star">★</span>
                      </span>
                      <p className="wp-rating-count">{company.rating.reviews} Reviews</p>
                    </div>
                  </div>

                  <div className="wp-review-bars">
                    {company.rating.breakdown.map((b) => (
                      <div className="wp-bar-row" key={b.label}>
                        <div className="wp-bar-top">
                          <span className="wp-bar-label">{b.label}</span>
                          <span className="wp-bar-pct">{b.pct}%</span>
                        </div>
                        <span className="wp-bar-track">
                          <span className="wp-bar-fill" style={{ width: `${b.pct}%` }} />
                        </span>
                      </div>
                    ))}
                  </div>

                  <button className="wp-see-reviews" type="button">
                    See all reviews <Icon name="ChevronRight" size={14} />
                  </button>
                </div>
              </Cards>
            )}
          </div>

          <div className="wp-grid cols-3">
            {/* Company Links */}
            <Cards
              variant="base"
              className="wp-card"
              padding="0"
            >
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Company Links</h3>
                  <button
                    className="wp-link-btn"
                    type="button"
                  >
                    <Icon name="Pencil" size={13} color="#103CA4" /> Edit
                  </button>
                </div>
                <div className="wp-link-list">
                  {company.links.map((l) => (
                    <div className="wp-link-row" key={l.label}>
                      <div className="wp-link-left">
                        <span className={`wp-link-icon-bare ${l.tone}`}>
                          <Icon name={l.iconName} size={18} />
                        </span>
                        <span className="wp-link-label">{l.label}</span>
                      </div>
                      <span className="wp-link-name">{l.value}</span>
                      <button
                        type="button"
                        className="wp-link-action"
                        aria-label={l.action}
                      >
                        {l.action === "download" ? (
                          <Icon name="Download" size={16} color="#94a3b8" />
                        ) : (
                          <Icon name="ExternalLink" size={16} color="#94a3b8" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Cards>

            {/* Profile Completion */}
            <Cards
              variant="base"
              className="wp-card"
              padding="0"
            >
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Profile Completion</h3>
                  <span className="wp-progress-pct">{completionPct}%</span>
                </div>
                <div className="wp-progress-track">
                  <div
                    className="wp-progress-fill"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
                <div className="wp-checklist">
                  {company.checklist.map((c) => (
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

            {/* Recent Activity */}
            {company.recentActivity.length === 0 ? (
              <EmptyStateCard
                headerTitle="Recent Activity"
                icon="Clock9"
                title="No recent activity"
                description="Your activity will appear here."
                delay="0.18s"
              />
            ) : (
              <Cards
                variant="base"
                className="wp-card"
                padding="0"
              >
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Recent Activity</h3>
                    <button
                      className="wp-link-btn"
                      type="button"
                    >
                      View All <Icon name="ChevronRight" size={14} />
                    </button>
                  </div>
                  <div className="wp-activity-list">
                    {company.recentActivity.map((a, i) => (
                      <div className="wp-activity-row" key={i}>
                        <span className="wp-activity-icon">
                          <Icon name={a.iconName} size={15} />
                        </span>
                        <span className="wp-activity-text">{a.text}</span>
                        <span className="wp-activity-time">{a.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Cards>
            )}
          </div>

          <div className="wp-grid cols-2">
            {/* Hiring Statistics */}
            <Cards variant="base" className="wp-card gray-card" padding="0">
              <div className="wp-card-inner stat-padding">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Hiring Statistics</h3>
                </div>
                <div className="wp-stat-grid">
                  {company.hiringStats.map((s) => (
                    <div className="wp-stat-card" key={s.label}>
                      <div className={`wp-stat-icon-wrap ${s.tone}`}>
                        <Icon name={s.iconName} size={20} />
                      </div>
                      <span className="wp-stat-value">{s.value}</span>
                      <span className="wp-stat-label">{s.label}</span>
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
                  <button
                    className="wp-link-btn"
                    type="button"
                  >
                    <Icon name="Pencil" size={14} color="#103CA4" /> Edit
                  </button>
                </div>
                <div className="wp-action-list">
                  {company.quickActions.map((a) => (
                    <button
                      key={a.label}
                      type="button"
                      className="wp-action-btn"
                    >
                      <div className="wp-action-left">
                        <div className="wp-action-icon-wrap">
                          <Icon name={a.iconName} size={16} />
                        </div>
                        <span className="wp-action-text">{a.label}</span>
                      </div>
                      <Icon name="ChevronRight" size={16} className="wp-action-chevron" />
                    </button>
                  ))}
                </div>
              </div>
            </Cards>
          </div>

          {/* Trust Journey */}
          <Cards variant="base" className="wp-card wp-trust-card" padding="0">
            <div className="wp-card-inner">
              <div className="wp-card-head">
                <h3 className="wp-card-title">Trust Journey</h3>
                <button className="wp-link-btn" type="button">
                  View all <Icon name="ChevronRight" size={14} />
                </button>
              </div>

              <div className="wp-trust-scroll-wrapper">
                <div className="wp-trust-scroll-inner">
                  <div className="wp-trust-nodes">
                    {company.trustJourney.ranks.map((rank, i) => (
                      <div
                        className={`wp-trust-node ${
                          i === company.trustJourney.currentIndex ? "active" : ""
                        }`}
                        key={rank}
                      >
                        <span className="wp-trust-circle">{rank}</span>
                        <span className="wp-trust-node-label">
                          {i === company.trustJourney.currentIndex ? "You" : "\u00A0"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="wp-trust-progress-bar">
                    <div
                      className="wp-trust-progress-fill"
                      style={{
                        width: `${Math.max(
                          12,
                          (company.trustJourney.currentIndex /
                            (company.trustJourney.ranks.length - 1)) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="wp-trust-footer">
                <span className="wp-trust-rank">
                  Rank {company.trustJourney.ranks[company.trustJourney.currentIndex]}
                </span>
                <span className="wp-trust-next">
                  Next Rank: <b>Reach {company.trustJourney.pointsNeeded} Trust Points</b> {company.trustJourney.points}/
                  {company.trustJourney.pointsNeeded} TP
                </span>
              </div>
            </div>
          </Cards>
        </div>
      </main>
    </div>
  );
};
export default WholeProfile;