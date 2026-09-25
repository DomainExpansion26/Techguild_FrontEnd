import React from "react";
import { DashboardLayout, Cards, WelcomeBanner } from "@/Components";
import { APP_STRINGS } from "@/constants/string";
import "./dashboard.css";

const DASHBOARD_STRINGS = APP_STRINGS.DASHBOARD.INDIVIDUAL;

const metricsData = [
  {
    title: DASHBOARD_STRINGS.METRICS.ACTIVE_QUESTS_TITLE,
    icon: "Files",
    value: "0",
    description: DASHBOARD_STRINGS.METRICS.ACTIVE_QUESTS_DESC,
    delay: "0.12s",
  },
  {
    title: DASHBOARD_STRINGS.METRICS.APPLICATION_SENT_TITLE,
    icon: "FileText",
    value: "0",
    description: DASHBOARD_STRINGS.METRICS.APPLICATION_SENT_DESC,
    delay: "0.16s",
  },
  {
    title: DASHBOARD_STRINGS.METRICS.TOTAL_EARNINGS_TITLE,
    icon: "IndianRupee",
    value: DASHBOARD_STRINGS.METRICS.TOTAL_EARNINGS_DEFAULT,
    description: DASHBOARD_STRINGS.METRICS.TOTAL_EARNINGS_DESC,
    delay: "0.2s",
  },
  {
    title: DASHBOARD_STRINGS.METRICS.TOTAL_REVIEWS_TITLE,
    icon: "Star",
    value: "0",
    description: DASHBOARD_STRINGS.METRICS.TOTAL_REVIEWS_DESC,
    delay: "0.24s",
  },
];

export default function DashBoard() {
  return (
    <DashboardLayout>
      <div className="individual-dashboard-content">
        {/* Welcome Banner Row */}
        <div className="db-row-banner">
          <WelcomeBanner />
          <Cards
            variant="trust"
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
            headerTitle={DASHBOARD_STRINGS.ACTIVITY.RECENT_ACTIVITY_HEADER}
            icon="Clock9"
            title={DASHBOARD_STRINGS.ACTIVITY.NO_RECENT_ACTIVITY_TITLE}
            description={DASHBOARD_STRINGS.ACTIVITY.NO_RECENT_ACTIVITY_DESC}
            delay="0.28s"
          />

          <Cards
            variant="empty-state"
            icon="Files"
            title={DASHBOARD_STRINGS.ACTIVITY.NO_QUESTS_TITLE}
            description={DASHBOARD_STRINGS.ACTIVITY.NO_QUESTS_DESC}
            buttonText={DASHBOARD_STRINGS.ACTIVITY.BROWSE_QUESTS_BUTTON}
            delay="0.32s"
          />
        </div>

        {/* Tip Banner Row */}
        <div className="db-row-tip">
          <Cards
            variant="tip"
            message={DASHBOARD_STRINGS.TIP_BANNER.MESSAGE}
            actionText={DASHBOARD_STRINGS.TIP_BANNER.ACTION_TEXT}
            actionHref="/profile/basic-info"
            delay="0.36s"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
