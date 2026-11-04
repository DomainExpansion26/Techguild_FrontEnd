// [TechGuild Update: 30-09-2026] Reduced card stagger delays so styled content appears instantly (end state unchanged).
import React, { useState } from "react";
import { DashboardLayout, Cards, WelcomeBanner } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { APP_STRINGS } from "@/constants/string";
import "./dashboard.css";

const DASHBOARD_STRINGS = APP_STRINGS.DASHBOARD.INDIVIDUAL;

const metricsData = [
  {
    title: DASHBOARD_STRINGS.METRICS.ACTIVE_QUESTS_TITLE,
    icon: "Files",
    value: "0",
    description: DASHBOARD_STRINGS.METRICS.ACTIVE_QUESTS_DESC,
    delay: "0.03s",
  },
  {
    title: DASHBOARD_STRINGS.METRICS.APPLICATION_SENT_TITLE,
    icon: "FileText",
    value: "0",
    description: DASHBOARD_STRINGS.METRICS.APPLICATION_SENT_DESC,
    delay: "0.05s",
  },
  {
    title: DASHBOARD_STRINGS.METRICS.TOTAL_EARNINGS_TITLE,
    icon: "IndianRupee",
    value: DASHBOARD_STRINGS.METRICS.TOTAL_EARNINGS_DEFAULT,
    description: DASHBOARD_STRINGS.METRICS.TOTAL_EARNINGS_DESC,
    delay: "0.07s",
  },
  {
    title: DASHBOARD_STRINGS.METRICS.TOTAL_REVIEWS_TITLE,
    icon: "Star",
    value: "0",
    description: DASHBOARD_STRINGS.METRICS.TOTAL_REVIEWS_DESC,
    delay: "0.09s",
  },
];

/* ---- Priority badge helper ---- */
function PriorityBadge({ priority }) {
  const tone = priority === "High" ? "db-prio-high" : priority === "Medium" ? "db-prio-medium" : "db-prio-low";
  return <span className={`db-quest-priority ${tone}`}>{priority}</span>;
}

/* ---- Star rating helper ---- */
function StarRating({ value = 3 }) {
  return (
    <span className="db-quest-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Icon
          key={s}
          name="Star"
          size={11}
          color={s <= value ? "#f59e0b" : "#d1d5db"}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

/* ---- Progress bar helper ---- */
function ProgressBar({ pct }) {
  return (
    <div className="db-quest-prog-wrap">
      <span className="db-quest-prog-pct">{pct}%</span>
      <div className="db-quest-prog-track">
        <div className="db-quest-prog-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ---- My Quest table (shown only when quests exist) ---- */
function MyQuestTable({ quests }) {
  const [activeFilter, setActiveFilter] = useState("All Quests");
  const filters = ["All Quests"];

  return (
    <div className="db-my-quest-card">
      {/* Header */}
      <div className="db-my-quest-header">
        <h3 className="db-my-quest-title">My Quest</h3>
        <div className="db-my-quest-toolbar">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`db-my-quest-tab ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
          <button type="button" className="db-my-quest-filter-btn">
            <Icon name="SlidersHorizontal" size={14} color="#374151" />
            <span>Filter</span>
            <Icon name="ChevronDown" size={13} color="#374151" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="db-my-quest-table-wrap">
        <table className="db-my-quest-table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Quest Name</th>
              <th>Priority</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Client Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quests.map((q, i) => (
              <tr key={q.id}>
                <td className="db-my-quest-num">{i + 1}</td>
                <td className="db-my-quest-name">{q.questName}</td>
                <td><PriorityBadge priority={q.priority} /></td>
                <td className="db-my-quest-date">{q.startDate}</td>
                <td className="db-my-quest-date">{q.endDate}</td>
                <td><ProgressBar pct={q.progress} /></td>
                <td><StarRating value={q.rating} /></td>
                <td className="db-my-quest-client">{q.clientName}</td>
                <td>
                  <button type="button" className="db-my-quest-milestone-btn">
                    <Icon name="Plus" size={12} color="#fff" strokeWidth={2.5} />
                    Create Milestones
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function DashBoard() {
  // Replace with real API data when available.
  // Set to [] to show the empty state; populate with objects to show the table.
  const myQuests = [];

  return (
    <DashboardLayout>
      <div className="individual-dashboard-content">
        {/* Welcome Banner Row */}
        <div className="db-row-banner">
          <WelcomeBanner />
          <Cards
            variant="trust"
            delay="0.02s"
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
            delay="0.1s"
          />

          {/* My Quest: table when quests exist, empty state when none */}
          {myQuests.length > 0 ? (
            <MyQuestTable quests={myQuests} />
          ) : (
            <Cards
              variant="empty-state"
              icon="Files"
              title={DASHBOARD_STRINGS.ACTIVITY.NO_QUESTS_TITLE}
              description={DASHBOARD_STRINGS.ACTIVITY.NO_QUESTS_DESC}
              buttonText={DASHBOARD_STRINGS.ACTIVITY.BROWSE_QUESTS_BUTTON}
              delay="0.12s"
            />
          )}
        </div>

        {/* Tip Banner Row */}
        <div className="db-row-tip">
          <Cards
            variant="tip"
            message={DASHBOARD_STRINGS.TIP_BANNER.MESSAGE}
            actionText={DASHBOARD_STRINGS.TIP_BANNER.ACTION_TEXT}
            actionHref="/profile/basic-info"
            delay="0.14s"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
