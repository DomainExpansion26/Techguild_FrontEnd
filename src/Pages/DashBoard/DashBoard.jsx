import React from "react";
import {
  Search,
  Bell,
  Mail,
  FileText,
  IndianRupee,
  Star,
  Clock9,
  Briefcase,
  Lightbulb,
  CheckCircle2,
  Verified
} from "lucide-react";
import { Navbar, Cards, WelcomeBanner } from "@/Components";
import Icon from "@/Components/icons/Icon";
import "./dashboard.css";

function MetricCard({ title, icon, value, description, delay }) {
  return (
    <Cards
      className="db-card-fill metric-card-element animate-fade-in"
      style={{ animationDelay: delay }}
    >
      <div className="metric-card-inner">
        <div className="metric-card-header">
          <span className="metric-card-title">{title}</span>
          <span className="metric-card-icon">{icon}</span>
        </div>
        <h4 className="metric-card-value">{value}</h4>
        <p className="metric-card-desc">{description}</p>
      </div>
    </Cards>
  );
}

export default function DashBoard() {
  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="main-workspace">

        {}
        <Cards className="header-card" padding="0">
          <header className="header">
            <div className="header-search-bar">
              <Search size={15} className="search-icon" />
              <input
                type="text"
                placeholder="Search for Clients, projects or freelancers.."
                className="search-input"
              />
            </div>
            <div className="header-actions">
              <button className="icon-btn"><Bell size={18} /></button>
              <button className="icon-btn"><Mail size={18} /></button>
              <div className="header-avatar">A</div>
            </div>
          </header>
        </Cards>

        {}
        <div className="dashboard-content">

          {}
          <div className="db-row-banner">

            {}
            <WelcomeBanner />

            {}
            <Cards className="db-card-fill trust-card-element animate-fade-in" style={{ animationDelay: "0.08s" }}>
              <div className="trust-card-inner">
                <h4 className="trust-card-title">Trust Points</h4>
                <div className="trust-card-value-container">
                  <span className="trust-card-value">10</span>
                  <span className="trust-card-unit">TP</span>
                </div>
                <span className="trust-card-rank">Rank F</span>
                <div className="trust-card-badge">
                  <Verified size={14} strokeWidth={2.5} className="trust-badge-icon" />
                  <span className="trust-badge-text">Email Verified</span>
                </div>
                <p className="trust-card-desc">
                  Trust Points increase as you complete your profile, finish projects, and receive client reviews.
                </p>
                <a href="#trust-history" className="trust-card-link">
                  View Trust History <span className="trust-card-arrow">&gt;</span>
                </a>
              </div>
            </Cards>
          </div>

          {}
          <div className="db-row-metrics">
            <MetricCard
              title="Active Quests"
              icon={<Icon name="Files" size={16} />}
              value="0"
              description="You don't have any active projects yet"
              delay="0.12s"
            />
            <MetricCard
              title="Application Sent"
              icon={<Icon name="FileText" size={16} />}
              value="0"
              description="You haven't sent any proposals yet"
              delay="0.16s"
            />
            <MetricCard
              title="Total Earnings"
              icon={<Icon name="IndianRupee" size={16} />}
              value="₹0"
              description="Your earnings will appear here once you start working"
              delay="0.2s"
            />
            <MetricCard
              title="Total Reviews"
              icon={<Icon name="Star" size={16} />}
              value="0"
              description="Reviews from clients will appear here"
              delay="0.24s"
            />
          </div>

          {}
          <div className="db-row-activity">

            {}
            <Cards className="db-card-fill activity-card-element animate-fade-in" style={{ animationDelay: "0.28s" }}>
              <div className="activity-card-inner">
                <p className="activity-card-title">Recent Activity</p>
                <div className="activity-card-body">
                  <Clock9 size={20} className="activity-card-icon-centered" />
                  <h4 className="activity-card-text-main">No recent activity</h4>
                  <p className="activity-card-text-sub">Your activity will appear here.</p>
                </div>
              </div>
            </Cards>

            {}
            <Cards className="db-card-fill quests-card-element animate-fade-in" style={{ animationDelay: "0.32s" }}>
              <div className="quests-card-inner">
                <Icon name="Files" size={20} className="quests-card-icon-centered" />
                <h4 className="quests-card-text-main">No Quests yet</h4>
                <p className="quests-card-text-sub">
                  Browse projects that match your skills and send your first proposal.
                </p>
                <button className="quests-card-btn">Browse Quests</button>
              </div>
            </Cards>
          </div>

          {}
          <div className="db-row-tip">
            <Cards
              className="tip-banner-card animate-fade-in"
              padding="0"
              style={{
                animationDelay: "0.36s"
              }}
            >
              <div className="tip-banner-inner">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Lightbulb size={14} color="#D97706" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#92400E" }}>
                    Tip: Freelancers who complete their profiles and get verified are 5x more likely to get hired.
                  </span>
                </div>
                <a
                  href="#complete-profile"
                  style={{
                    fontSize: "0.75rem", fontWeight: 600,
                    color: "#103ca4", textDecoration: "none", flexShrink: 0
                  }}
                >
                  Complete Your Profile &gt;
                </a>
              </div>
            </Cards>
          </div>

        </div>{}
      </main>
    </div>
  );
}
