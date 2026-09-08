import React from "react";
import {
  DashboardLayout,
  Cards,
  WelcomeBanner,
} from "@/Components";

import "./client-dashboard.css";

export default function Dashboard() {
  return (
    <DashboardLayout mainWorkspaceClass="client-dashboard-workspace">
      <div className="dashboard-content">

        {/* TOP SECTION
            Welcome Banner + Trust Points*/}
        <section className="dashboard-top-section">

          <div className="welcome-banner-wrapper">
            <WelcomeBanner />
          </div>

          <div className="trust-points-wrapper">
            <Cards
              variant="trust"
              title="Trust Points"
              points={10}
              rank="Rank F"
              badgeText="Email Verified"
              description="Trust Points increase as you complete your profile, finish projects, and receive client reviews."
              linkText="View Trust History"
            />
          </div>

        </section>


        {/* MAIN CARDS
            Posting Quest + How It Works + Recent Activity */}
        <section className="dashboard-main-cards">

          {/* Posting Quest */}
          <div className="posting-card-wrapper">
            <Cards
              variant="empty-state"
              icon="FolderOpen"
              title="You haven't posted any Quests yet."
              description="Post your Quests to receive applications from top agencies and freelancers."
              buttonText="+ Post Your First Quest"
              onButtonClick={() => {}}
            />
          </div>


          {/* How It Works */}
          <div className="how-it-works-wrapper">
            <Cards
              variant="steps"
              title="How it works"
              steps={[
                {
                  step: 1,
                  title: "Post your Quest",
                  desc: "Describe your requirements and set a budget.",
                },
                {
                  step: 2,
                  title: "Receive Applications",
                  desc: "Agencies and freelancers send tailored bids.",
                },
                {
                  step: 3,
                  title: "Compare & Hire",
                  desc: "Review profiles, compare pricing, and hire confidently.",
                },
              ]}
            />
          </div>


          {/* Recent Activity */}
          <div className="recent-activity-wrapper">
            <Cards
              variant="empty-state"
              headerTitle="Recent Activity"
              icon="Clock9"
              title="No recent activity"
              description="Your activity will appear here."
            />
          </div>

        </section>


        {/* QUEST OVERVIEW SECTION
            LEFT  = Overview Cards + Get Started
            RIGHT = Payout Guide + Need Help */}
        <section className="quest-overview-section">

          {/* LEFT SIDE
              Quest Overview + 4 Cards + Get Started */}
          <div className="quest-overview-left">

            {/* Quest Overview Header */}
            <div className="section-heading">

              <h2>
                Quest Overview
              </h2>

              <button
                type="button"
                className="overview-filter"
              >
                All time
              </button>

            </div>


            {/* FOUR OVERVIEW CARDS */}
            <div className="quest-overview-cards">

              {/* Active Quests */}
              <div className="overview-card-wrapper">
                <Cards
                  variant="metric"
                  title="Active Quests"
                  icon="Files"
                  value="0"
                  description="No active projects"
                  delay="0.1s"
                />
              </div>


              {/* Applications Received */}
              <div className="overview-card-wrapper">
                <Cards
                  variant="metric"
                  title="Applications Received"
                  icon="FileText"
                  value="0"
                  description="No proposals yet"
                  delay="0.2s"
                />
              </div>


              {/* Total Spent */}
              <div className="overview-card-wrapper">
                <Cards
                  variant="metric"
                  title="Total Spent"
                  icon="IndianRupee"
                  value="₹0"
                  description="No payments made"
                  delay="0.3s"
                />
              </div>


              {/* Completed Projects */}
              <div className="overview-card-wrapper">
                <Cards
                  variant="metric"
                  title="Completed Projects"
                  icon="CircleCheck"
                  value="0"
                  description="No completed projects"
                  delay="0.4s"
                />
              </div>

            </div>


            {/* GET STARTED */}
            <div className="get-started-wrapper">

              <Cards
                variant="chips"
                title="Get Started"
                description="Find verified agencies and freelancers grouped by your next quest."
                actionLinkText="Browse All Categories >"
                items={[
                  {
                    icon: "Globe",
                    label: "Web Development",
                  },
                  {
                    icon: "Smartphone",
                    label: "Mobile Development",
                  },
                  {
                    icon: "Palette",
                    label: "UI/UX Design",
                  },
                  {
                    icon: "TrendingUp",
                    label: "Digital Marketing",
                  },
                  {
                    icon: "Tag",
                    label: "Branding",
                  },
                ]}
                onItemClick={(chip) => console.log(chip)}
              />

            </div>

          </div>


          {/* RIGHT SIDE
              Payout Guide + Need Help */}
          <div className="quest-overview-right">

            {/* Payout Guide */}
            <div className="payout-guide-wrapper">

              <Cards
                variant="guide"
                icon="IndianRupee"
                title="Payout Guide"
                description="Not sure about budget? Check our guide to set the right project budget and attract the best proposals."
                linkText="View Budget Guide"
                linkHref="#guide"
              />

            </div>


            {/* Need Help */}
            <div className="need-help-wrapper">

              <Cards
                variant="guide"
                icon="LifeBuoy"
                title="Need Help?"
                description="If you have any questions, our support team is ready to help you get started."
                linkText="Contact Support"
                linkHref="#support"
              />

            </div>

          </div>

        </section>


        {/* TIP BANNER */}
        <section className="dashboard-tip-section">

          <Cards
            variant="tip"
            message="Complete your profile and verify your business to earn more Trust Points and unlock access to premium agencies."
            actionText="Complete Setup >"
            actionHref="#profile"
          />

        </section>

      </div>
    </DashboardLayout>
  );
}


