import React from 'react';
import { DashboardCommonScreen } from "@/Components";
import "./client-dashboard.css";

export default function Dashboard() {
  const clientNavItems = [
    { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/client-dashboard" },
    { id: "profile", label: "Profile", icon: "User2", path: "/client-profile" },
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

  return (
    <DashboardCommonScreen navItems={clientNavItems}>
      <div className="client-db-grid">
        {/* Skeleton layout left for the person who will work on the client flow */}
      </div>
    </DashboardCommonScreen>
  );
}
