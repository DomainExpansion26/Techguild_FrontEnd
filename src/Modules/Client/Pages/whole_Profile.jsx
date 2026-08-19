import React from "react";
import { Navbar, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";
import "@/Modules/Individual/Pages/DashBoard/dashboard.css";
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
  about:
    "We build scalable SaaS products for healthcare and fintech. Our mission is to create innovative digital solutions that help businesses grow and make a meaningful impact. \n\nWe are currently hiring talented professionals to join our passionate team and build the future together.",
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
  activeQuests: [
    { title: "Website Redesign", sub: "5 Applicants • ₹60K – ₹90K", status: "Open" },
    { title: "React Developer", sub: "7 Applicants • ₹80K – ₹1.2L", status: "Open" },
    { title: "Flutter App Development", sub: "3 Applicants • ₹70K – ₹1L", status: "Open" },
    { title: "Backend API Development", sub: "4 Applicants • ₹50K – ₹90K", status: "Open" },
  ],
  rating: {
    score: 4.8,
    reviews: 124,
    breakdown: [
      { label: "Excellent client", pct: 82 },
      { label: "Clear requirements", pct: 90 },
      { label: "Quick payments", pct: 88 },
    ],
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
  hiringStats: [
    { iconName: "Building2", tone: "blue", value: "42", label: "Projects Posted" },
    { iconName: "Layers", tone: "green", value: "31", label: "Projects Completed" },
    { iconName: "Users", tone: "purple", value: "95", label: "Freelancers Hired" },
    { iconName: "Star", tone: "yellow", value: "4.8", label: "Average Rating" },
    { iconName: "Clock", tone: "teal", value: "2 hrs", label: "Response Time" },
    { iconName: "TrendingUp", tone: "mint", value: "96%", label: "Success Rate" },
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

const whole_Profile = () => {
  return (
    <div className="dashboard-layout client-profile-page wp-page-root">
      <Navbar items={clientNavItems} userRole="Client" />

      <main className="main-workspace d-flex flex-column h-100">
        <Cards className="header-card flex-shrink-0" padding="0">
          <header className="header">
            <div className="header-search-bar">
              <Icon
                name="Search"
                size={16}
                className="search-icon"
                color="#111827"
              />
              <input
                type="text"
                placeholder="Search for Clients, projects or freelancers.."
                className="search-input"
              />
            </div>

            <div className="header-actions">
              <button className="icon-btn" type="button">
                <Icon name="Bell" size={20} color="#111827" />
              </button>
              <button className="icon-btn" type="button">
                <Icon name="Mail" size={20} color="#111827" />
              </button>
              <div className="header-avatar">A</div>
            </div>
          </header>
        </Cards>

        <div className="wp-scroll-area">
          <div className="wp-top-section-card">
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

              <div className="wp-identity-right">
                <div className="wp-guild-card">

                  {/* HEADER */}
                  <div className="wp-guild-card-header">
                    <div className="wp-guild-card-logo">
                      <span className="logo-tech">Tech</span>
                      <span className="logo-guild">Guild</span>
                    </div>
                    <span className="wp-guild-card-label">GUILD CARD</span>
                  </div>

                  {/* MAIN CONTENT */}
                  <div className="wp-guild-card-body">

                    {/* NS LOGO */}
                    <div className="wp-guild-mark-wrap">
                      <div className="wp-guild-mark">
                        {company.guildCard.logoInitials}
                      </div>

                      <span className="wp-guild-mark-check" aria-label="Verified">
                        <Icon name="Check" size={11} color="#ffffff" strokeWidth={3} />
                      </span>
                    </div>

                    {/* COMPANY INFORMATION */}
                    <div className="wp-guild-card-info">
                      <div className="wp-guild-card-name">
                        {company.name}
                      </div>

                      <div className="wp-guild-card-category">
                        {company.guildCard.category}
                      </div>

                      <div className="wp-guild-card-stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon
                            name="Star"
                            key={i}
                            size={12}
                            fill={
                              i < company.guildCard.starRating
                                ? "#ffce4a"
                                : "none"
                            }
                            color={
                              i < company.guildCard.starRating
                                ? "#ffce4a"
                                : "#5c6bb0"
                            }
                          />
                        ))}
                      </div>

                      <span className="wp-guild-card-verified">
                        VERIFIED CLIENT
                      </span>

                      <div className="wp-guild-card-line">
                        <Icon name="MapPin" size={11} />
                        {company.guildCard.location}
                      </div>

                      <div className="wp-guild-card-line">
                        <Icon name="Globe" size={11} />
                        {company.guildCard.website}
                      </div>
                    </div>
                  </div>

                  {/* CSS SHIELD BACKGROUND */}
                  <div className="wp-guild-card-shield" aria-hidden="true">
                    <span className="wp-shield-back-shape"></span>
                    <span className="wp-shield-front-shape"></span>
                    <span className="wp-shield-rank">
                      {company.guildCard.rank}
                    </span>
                  </div>

                  {/* FOOTER */}
                  <div className="wp-guild-card-footer">
                    <div>
                      <span className="wp-guild-card-footlabel">
                        GUILD ID
                      </span>
                      <span className="wp-guild-card-footvalue">
                        {company.guildCard.guildId}
                      </span>
                    </div>

                    <div className="wp-guild-card-footright">
                      <span className="wp-guild-card-footlabel">
                        MEMBER SINCE
                      </span>
                      <span className="wp-guild-card-footvalue">
                        {company.guildCard.memberSince}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="wp-grid cols-2">
            <Cards className="wp-card" padding="0">
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">About Company</h3>
                  <button className="wp-link-btn">
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
                <button className="wp-readmore">Read More <Icon name="ChevronRight" size={14} /></button>
              </div>
            </Cards>

            <Cards className="wp-card" padding="0">
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Hiring Interests</h3>
                  <button className="wp-link-btn">
                    <Icon name="Pencil" size={14} /> Edit
                  </button>
                </div>
                <div className="wp-tag-row">
                  {company.hiringInterests.map((tag) => (
                    <span className="wp-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Cards>
          </div>

          {/* EXACT MATCH SECTIONS START HERE */}
          <div className="wp-grid cols-3 wp-highlight-cards">
            {/* COMPANY DETAILS */}
            <Cards className="wp-card gray-card" padding="0">
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Company Details</h3>
                </div>
                <div className="wp-detail-list">
                  {company.details.map((d) => (
                    <div className="wp-detail-row" key={d.label}>
                      <span className="wp-detail-icon">
                        <Icon name={d.iconName} size={16} />
                      </span>
                      <span className="wp-detail-label">{d.label}</span>
                      <span className="wp-detail-value">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Cards>

            {/* ACTIVE QUESTS */}
            <Cards className="wp-card gray-card" padding="0">
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">
                    Active Quests <span className="wp-title-sub">(Hiring Now)</span>
                  </h3>
                  <button className="wp-link-btn">View All</button>
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

            {/* FREELANCER REVIEWS */}
            <Cards className="wp-card gray-card" padding="0">
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Freelancer Reviews</h3>
                  <button className="wp-link-btn">View All</button>
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
                
                <button className="wp-see-reviews">See all reviews <Icon name="ChevronRight" size={14} /></button>
              </div>
            </Cards>
          </div>
          {/* EXACT MATCH SECTIONS END HERE */}

          <div className="wp-grid cols-3">
            <Cards className="wp-card" padding="0">
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Company Links</h3>
                  <button className="wp-link-btn">
                    <Icon name="Pencil" size={14} /> Edit
                  </button>
                </div>
                <div className="wp-link-list">
                  {company.links.map((l) => (
                    <div className="wp-link-row" key={l.label}>
                      <span className={`wp-link-icon ${l.tone || ""}`}>
                        <Icon name={l.iconName} size={17} />
                      </span>
                      <span className="wp-link-label">{l.label}</span>
                      <span className="wp-link-name">{l.value}</span>
                      <button className="wp-link-action" aria-label={l.action}>
                        {l.action === "download" ? (
                          <Icon name="Download" size={15} />
                        ) : (
                          <Icon name="ExternalLink" size={15} />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Cards>

            <Cards className="wp-card" padding="0">
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Profile Completion</h3>
                  <span className="wp-progress-pct">100%</span>
                </div>
                <div className="wp-progress-track">
                  <div className="wp-progress-fill" style={{ width: "100%" }} />
                </div>
                <div className="wp-checklist">
                  {company.checklist.map((c) => (
                    <div className="wp-checklist-row" key={c.label}>
                      <span className="wp-checklist-left">
                        {c.done ? <Icon name="CheckCircle2" size={16} /> : <Icon name="Circle" size={16} />}
                        {c.label}
                      </span>
                      <span className="wp-checklist-status">
                        {c.done ? "Completed" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Cards>

            <Cards className="wp-card" padding="0">
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Recent Activity</h3>
                  <button className="wp-link-btn">
                    View All <Icon name="ChevronRight" size={14} />
                  </button>
                </div>
                <div className="wp-activity-list">
                  {company.recentActivity.map((a, i) => (
                    <div className="wp-activity-row" key={i}>
                      <span className="wp-activity-icon">
                        <Icon name={a.iconName} size={14} />
                      </span>
                      <span className="wp-activity-text">{a.text}</span>
                      <span className="wp-activity-time">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Cards>
          </div>

          <div className="wp-grid cols-2">
            <Cards className="wp-card gray-card" padding="0">
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Hiring Statistics</h3>
                </div>
                <div className="wp-stat-grid">
                  {company.hiringStats.map((s) => (
                    <div className="wp-stat-item" key={s.label}>
                      <span className={`wp-stat-icon ${s.tone}`}>
                        <Icon name={s.iconName} size={18} />
                      </span>
                      <span className="wp-stat-value">{s.value}</span>
                      <span className="wp-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Cards>

            {/* QUICK ACTIONS SECTION */}
            <Cards className="wp-card gray-card" padding="0">
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">Quick Actions</h3>
                  <button className="wp-link-btn">
                    <Icon name="Pencil" size={14} color="#103CA4" /> Edit
                  </button>
                </div>
                <div className="wp-action-list">
                  {company.quickActions.map((a) => (
                    <button className="wp-action-row" key={a.label}>
                      <span className="wp-action-icon">
                        <Icon name={a.iconName} size={18} color="#103CA4" strokeWidth={2} />
                      </span>
                      <span className="wp-action-label">{a.label}</span>
                      <Icon name="ChevronRight" size={16} className="wp-action-chevron" />
                    </button>
                  ))}
                </div>
              </div>
            </Cards>
          </div>

          <Cards className="wp-card wp-trust-card" padding="0">
            <div className="wp-card-inner">
              <div className="wp-card-head">
                <h3 className="wp-card-title">Trust Journey</h3>
                <button className="wp-link-btn">
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
export default whole_Profile;