import React from "react";
import { DashboardLayout, Cards, WelcomeBanner } from "@/Components";
import "./dashboard.css";

const metricsData = [
  {
    title: "Active Quests",
    icon: "Files",
    value: "0",
    description: "You don't have any active projects yet",
    delay: "0.12s",
  },
  {
    title: "Application Sent",
    icon: "FileText",
    value: "0",
    description: "You haven't sent any proposals yet",
    delay: "0.16s",
  },
  {
    title: "Total Earnings",
    icon: "IndianRupee",
    value: "₹0",
    description: "Your earnings will appear here once you start working",
    delay: "0.2s",
  },
  {
    title: "Total Reviews",
    icon: "Star",
    value: "0",
    description: "Reviews from clients will appear here",
    delay: "0.24s",
  },
];

export default function DashBoard() {
  return (
    <DashboardLayout>
      <div className="dashboard-content">
        {/* Welcome Banner Row */}
        <div className="db-row-banner">
          <WelcomeBanner />
          <Cards
            variant="trust"
            title="Trust Points"
            points={10}
            unit="TP"
            rank="Rank F"
            badgeText="Email Verified"
            description="Trust Points increase as you complete your profile, finish projects, and receive client reviews."
            linkText="View Trust History"
            linkHref="#trust-history"
            delay="0.08s"
          />
        </div>

        {/* Metrics Row */}
        <div className="db-row-metrics">
          {metricsData.map((metric, index) => (
            <Cards
              key={index}
              variant="metric"
              title={metric.title}
              icon={metric.icon}
              value={metric.value}
              description={metric.description}
              delay={metric.delay}
            />
          ))}
        </div>

        {/* Activity Row */}
        <div className="db-row-activity">
          <Cards
            variant="empty-state"
            headerTitle="Recent Activity"
            icon="Clock9"
            title="No recent activity"
            description="Your activity will appear here."
            delay="0.28s"
          />

          <Cards
            variant="empty-state"
            icon="Files"
            title="No Quests yet"
            description="Browse projects that match your skills and send your first proposal."
            buttonText="Browse Quests"
            delay="0.32s"
          />
        </div>

        {/* Tip Banner Row */}
        <div className="db-row-tip">
          <Cards
            variant="tip"
            message="Tip: Freelancers who complete their profiles and get verified are 5x more likely to get hired."
            actionText="Complete Your Profile >"
            actionHref="#complete-profile"
            delay="0.36s"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
