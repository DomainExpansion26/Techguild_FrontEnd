import React from "react";
import { Search, Bell, Mail, Lightbulb } from "lucide-react";
import { Navbar, Cards, WelcomeBanner } from "@/Components";

export default function DashboardCommonScreen({
  children,
  navItems,
  showWelcomeBanner = true,
  welcomeTitle,
  welcomeSubtitle,
  welcomeSteps,
  welcomeActionText,
  welcomeActionLink,
  topRightCard,
  showTipBanner = true,
  tipText = "Tip: Freelancers who complete their profiles and get verified are 5x more likely to get hired.",
  tipLinkText = "Complete Your Profile >",
  tipLink = "#complete-profile",
  onSearch,
  searchPlaceholder = "Search for Clients, projects or freelancers.."
}) {
  return (
    <div className="dashboard-layout">
      <Navbar items={navItems} />

      <main className="main-workspace">
        {/* Header */}
        <Cards className="header-card" padding="0">
          <header className="header">
            <div className="header-search-bar">
              <Search size={15} className="search-icon" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="search-input"
                onChange={(e) => onSearch && onSearch(e.target.value)}
              />
            </div>
            <div className="header-actions">
              <button className="icon-btn"><Bell size={18} /></button>
              <button className="icon-btn"><Mail size={18} /></button>
              <div className="header-avatar">A</div>
            </div>
          </header>
        </Cards>

        <div className="dashboard-content">
          {/* Welcome Banner Row */}
          {showWelcomeBanner && (
            <div className="db-row-banner">
              <WelcomeBanner
                title={welcomeTitle}
                subtitle={welcomeSubtitle}
                steps={welcomeSteps}
                actionText={welcomeActionText}
                actionLink={welcomeActionLink}
              />
              {topRightCard}
            </div>
          )}

          {/* Main Content Area */}
          {children}

          {/* Tip Banner Row */}
          {showTipBanner && (
            <div className="db-row-tip">
              <Cards
                className="tip-banner-card animate-fade-in"
                padding="0"
                style={{ animationDelay: "0.36s" }}
              >
                <div className="tip-banner-inner">
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Lightbulb size={14} color="#D97706" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#92400E" }}>
                      {tipText}
                    </span>
                  </div>
                  <a
                    href={tipLink}
                    style={{
                      fontSize: "0.75rem", fontWeight: 600,
                      color: "#103ca4", textDecoration: "none", flexShrink: 0
                    }}
                  >
                    {tipLinkText}
                  </a>
                </div>
              </Cards>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
