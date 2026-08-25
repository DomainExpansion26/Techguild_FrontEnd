import React from "react";
import { DashboardLayout, Cards, WelcomeBanner } from "@/Components";
import "./client-dashboard.css";
import verifiedIcon from "@/assets/icons/verified.svg";
import folderOpenIcon from "@/assets/icons/folder-open.svg";
import dollarSignIcon from "@/assets/icons/dollar-sign.svg";
import indianRupeeIcon from "@/assets/icons/indian-rupee.svg";
import clock4Icon from "@/assets/icons/clock4.svg";
import fileTextIcon from "@/assets/icons/file-text.svg";
import lifeBuoyIcon from "@/assets/icons/life-buoy.svg";
import globeIcon from "@/assets/icons/globe.svg";
import smartphoneIcon from "@/assets/icons/smartphone.svg";
import paletteIcon from "@/assets/icons/palette.svg";
import trendingUpIcon from "@/assets/icons/trending-up.svg";
import Icon from "@/Components/icons/Icon";
import tagIcon from "@/assets/icons/tag.svg";
import dashboardBg from "@/assets/dashboard.bg.png";

export default function Dashboard() {

  

  return (
    <DashboardLayout
  mainWorkspaceClass="client-dashboard-workspace"
  style={{ "--dashboard-bg": `url(${dashboardBg})` }}
>


      <div className="dashboard-content">

        {/*  TOP DASHBOARD AREA  */}
        <section className="dashboard-top-section">

          {/* Welcome Banner */}
          <div className="welcome-banner-wrapper">
            <WelcomeBanner />
          </div>

          {/* Trust Points */}
          <div className="trust-card">
            <div className="trust-card-header">
              <h3>Trust Points</h3>
            </div>

            <div className="trust-points">
              <span className="trust-points-number">10</span>
              <span className="trust-points-label">TP</span>
            </div>

            <div className="trust-rank">
              Rank F
            </div>

            <div className="trust-verified">
              <img src={verifiedIcon} alt="Verified" />
              <span>Email Verified</span>
            </div>
            
            <p className="trust-description">
              Trust Points increase as you complete your profile,
              finish projects, and receive client reviews.
            </p>

            <button className="trust-history-btn">
              View Trust History →
            </button>
          </div>

        </section>


        {/* ================= MAIN CARDS ================= */}
        <section className="dashboard-main-cards">

          {/* Posting Card */}
<div className="posting-card">
  <Cards>
    <div className="posting-card-content">

      <div className="posting-card-icon">
        <img
          src={folderOpenIcon}
          alt=""
          className="posting-card-icon-image"
        />
      </div>

      <h3>You haven't posted any Quests yet.</h3>

      <p>
        Post your quests to receive applications
        from top agencies and freelancers.
      </p>

      <button className="post-quest-button">
        + Post Your First Quest
      </button>

    </div>
  </Cards>
</div>


          {/* How It Works */}
          <div className="how-it-works-card">
            <Cards>
              <div className="how-it-works-content">

                <h3>How it works</h3>

                <div className="how-it-works-step">
                  <span className="step-number">1</span>

                  <div>
                    <h4>Post your Quest</h4>
                    <p>
                      Describe your requirements and set a budget.
                    </p>
                  </div>
                </div>

                <div className="how-it-works-step">
                  <span className="step-number">2</span>

                  <div>
                    <h4>Receive Applications</h4>
                    <p>
                      Agencies and freelancers send tailored bids.
                    </p>
                  </div>
                </div>

                <div className="how-it-works-step">
                  <span className="step-number">3</span>

                  <div>
                    <h4>Compare & Hire</h4>
                    <p>
                      Review profiles, compare pricing, and hire confidently.
                    </p>
                  </div>
                </div>

              </div>
            </Cards>
          </div>


          {/* Recent Activity */}
<div className="recent-activity-card">
  <Cards>
    <div className="recent-activity-content">

      <h3>Recent Activity</h3>

      <div className="recent-activity-empty">
        <div className="activity-icon">
          <img
            src={clock4Icon}
            alt="Recent Activity"
            className="activity-icon-image"
          />
        </div>

        <p>No recent activity</p>

        <span>
          Your activity will appear here.
        </span>
      </div>

    </div>
  </Cards>
</div>

        </section>


       {/* =========================================================
    QUEST OVERVIEW + BOTTOM CONTENT
    ========================================================= */}

<section className="dashboard-lower-grid">

  {/* ================= LEFT COLUMN ================= */}
  <div className="dashboard-left-column">

    {/* ================= QUEST OVERVIEW ================= */}
    <section className="quest-overview-section">

      <div className="section-header">

        <h2>Quest Overview</h2>

        <span className="overview-filter">
          All time
        </span>

      </div>

      <div className="quest-overview-cards">

        {/* Active Quests */}
        <div className="overview-card">
  <div className="overview-card-header">
    <span className="overview-card-title">
      Active Quests
    </span>

    <img
      src={folderOpenIcon}
      alt=""
      className="overview-card-icon"
    />
  </div>

  <strong>0</strong>

  <span className="overview-card-description">
    No active projects
  </span>
</div>


  {/* Applications Received */}
<div className="overview-card">
  <div className="overview-card-header">
    <span className="overview-card-title">
      Applications Received
    </span>

    <img
      src={fileTextIcon}
      alt=""
      className="overview-card-icon"
    />
  </div>

  <strong>0</strong>

  <span className="overview-card-description">
    No proposals yet
  </span>
</div>


        {/* Total Spent */}
        <div className="overview-card">
  <div className="overview-card-header">
    <span className="overview-card-title">
      Total Spent
    </span>

    <img
      src={dollarSignIcon}
      alt=""
      className="overview-card-icon"
    />
  </div>

  <strong>₹0</strong>

  <span className="overview-card-description">
    No payments made
  </span>
</div>


        {/* Completed Projects */}
        <div className="overview-card">
  <div className="overview-card-header">
    <span className="overview-card-title">
      Completed Projects
    </span>

    <img
      src={verifiedIcon}
      alt=""
      className="overview-card-icon"
    />
  </div>

  <strong>0</strong>

  <span className="overview-card-description">
    No completed projects
  </span>
 </div>
</div>

</section>


    {/* ================= GET STARTED ================= */}
    <div className="get-started-card">

      <Cards>

        <div className="get-started-content">

          <div className="get-started-header">

            <h3>Get Started</h3>

            <button>
              Browse All Categories →
            </button>

          </div>

          <p>
            Find verified agencies and freelancers grouped by
            your next quest.
          </p>

          <div className="category-list">

            <span className="category-tag-with-icon">
            <img src={globeIcon} alt="" />
             Web Development
            </span>


            <span className="category-tag-with-icon">
            <img src={smartphoneIcon} alt="" />
             Mobile Development
            </span>


            <span className="category-tag-with-icon">
            <img src={paletteIcon} alt="" />
             UI/UX Design
            </span>


            <span className="category-tag-with-icon">
            <img src={trendingUpIcon} alt="" />
             Digital Marketing
            </span>


            <span className="category-tag-with-icon">
              <img src={tagIcon} alt="" />
              Branding
            </span>

          </div>

        </div>

      </Cards>

    </div>

  </div>


  {/* ================= RIGHT COLUMN ================= */}
  <div className="dashboard-right-column">

    {/* ================= PAYOUT GUIDE ================= */}
<div className="payout-guide-card">

  <Cards>

    <div className="payout-guide-header">
      <img
        src={indianRupeeIcon}
        alt="Payout Guide"
        className="payout-guide-icon"
      />

      <h3>Payout Guide</h3>
    </div>

    <p>
      Not sure about budget? Check our guide to set the
      right project budget and attract the best proposals.
    </p>

    <button>
      View Budget Guide →
    </button>

  </Cards>

</div>


    {/* ================= NEED HELP ================= */}
<div className="need-help-card">

  <Cards>

    <div className="need-help-header">
      <img
        src={lifeBuoyIcon}
        alt="Need Help"
        className="need-help-icon"
      />

      <h3>Need Help?</h3>
    </div>

    <p>
      If you have any questions, our support team is ready
      to help you get started.
    </p>

    <button>
      Contact Support →
    </button>

  </Cards>

</div>

  </div>

</section>


       {/* Tip Banner Row */}
          <div className="db-row-tip">
            <Cards
              className="tip-banner-card animate-fade-in"
              padding="0"
              style={{ animationDelay: "0.36s" }}
            >
              <div className="tip-banner-inner">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon name="Lightbulb" size={14} color="#D97706" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#92400E" }}>
                    Tip: Complete your profile and verify your business to earn more Trust Points and unlock access to premium agencies.
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

      </div>

    </DashboardLayout>
  );
}