export const INDIVIDUAL_MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/dashboard", aliases: ["/", "/individual/dashboard"] },
  { id: "profile", label: "Profile (Guild Card)", icon: "User", path: "/profile", aliases: ["/individual/profile"] },
  { id: "quest-board", label: "Quest Board", icon: "Files", path: "/quest-board", aliases: ["/individual/quest-board", "/individual/projects"] },
  { id: "communication", label: "Communication", icon: "MessageSquareMore", path: "/communication", aliases: [] },
  { id: "task-management", label: "Task Management", icon: "NotebookText", path: "/task-management", aliases: ["/active-quests", "/individual/active-quests"] },
  { id: "analytics", label: "Analytics", icon: "BarChart3", path: "/analytics", aliases: ["/reputation-rank"] },
  { id: "finance", label: "Finance", icon: "IndianRupee", path: "/finance", aliases: ["/earnings-payouts"] },
  { id: "party-formation", label: "Party Formation", icon: "Group", path: "/party-formation", aliases: ["/party-management", "/individual/party"] },
  { id: "guild-hall", label: "Guild Hall", icon: "Building2", path: "/guild-hall", aliases: ["/reviews-feedback", "/individual/guild-hall"] },
  { id: "subscription", label: "Subscription", icon: "Star", path: "/subscription", aliases: [] },
  { id: "verification", label: "Verification", icon: "Verified", path: "/verification", aliases: ["/verification-hub"] },
  { id: "settings", label: "Settings", icon: "Settings", path: "/settings", aliases: ["/individual/settings"] },
  { id: "help-support", label: "Help & Support", icon: "CircleQuestionMark", path: "/help-support", aliases: [] },
];

export const CLIENT_MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/client-dashboard", aliases: ["/client/dashboard"] },
  { id: "profile", label: "Profile (Guild Card)", icon: "User", path: "/client-profile", aliases: ["/client/profile"] },
  { id: "quest-board", label: "Quest Board", icon: "Files", path: "/client-quest-board", aliases: ["/client/quest-board", "/client/projects"] },
  { id: "communication", label: "Communication", icon: "MessageSquareMore", path: "/client-communication", aliases: ["/client-applications", "/client/applications", "/client/communication"] },
  { id: "task-management", label: "Task Management", icon: "NotebookText", path: "/client-task-management", aliases: ["/client-active-quests", "/client/active-quests", "/client/task-management"] },
  { id: "analytics", label: "Analytics", icon: "BarChart3", path: "/client-analytics", aliases: ["/client-company-reputation", "/client/company-reputation", "/client/analytics"] },
  { id: "finance", label: "Finance", icon: "IndianRupee", path: "/client-finance", aliases: ["/client-payouts", "/client/payouts", "/client/finance"] },
  { id: "party-formation", label: "Party Formation", icon: "Group", path: "/client-party-formation", aliases: ["/client/party-formation"] },
  { id: "guild-hall", label: "Guild Hall", icon: "Building2", path: "/client-guild-hall", aliases: ["/client/guild-hall"] },
  { id: "subscription", label: "Subscription", icon: "Star", path: "/client-subscription", aliases: ["/client/subscription"] },
  { id: "verification", label: "Verification", icon: "Verified", path: "/client-verification", aliases: ["/client-verification-hub", "/client/verification-hub", "/client/verification"] },
  { id: "settings", label: "Settings", icon: "Settings", path: "/client-settings", aliases: ["/client/settings"] },
  { id: "help-support", label: "Help & Support", icon: "CircleQuestionMark", path: "/client-help-support", aliases: ["/client/help-support"] },
];

export const AGENCY_MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/agency/dashboard" },
  { id: "projects", label: "Projects", icon: "Files", path: "/agency/projects" },
  { id: "clients", label: "Clients", icon: "Building2", path: "/agency/clients" },
  { id: "team", label: "Team Management", icon: "Group", path: "/agency/team" },
  { id: "payments", label: "Payments", icon: "IndianRupee", path: "/agency/payments" },
  { id: "reports", label: "Reports", icon: "BarChart3", path: "/agency/reports" },
  { id: "settings", label: "Settings", icon: "Settings", path: "/agency/settings" },
];

export const ADMIN_MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/admin/dashboard" },
  { id: "users", label: "Users", icon: "User", path: "/admin/users" },
  { id: "agencies", label: "Agencies", icon: "Building2", path: "/admin/agencies" },
  { id: "clients", label: "Clients", icon: "Files", path: "/admin/clients" },
  { id: "freelancers", label: "Freelancers", icon: "Group", path: "/admin/freelancers" },
  { id: "projects", label: "Projects", icon: "Files", path: "/admin/projects" },
  { id: "payments", label: "Payments", icon: "IndianRupee", path: "/admin/payments" },
  { id: "reports", label: "Reports", icon: "BarChart3", path: "/admin/reports" },
  { id: "analytics", label: "Analytics", icon: "BarChart3", path: "/admin/analytics" },
  { id: "cms", label: "CMS", icon: "NotebookText", path: "/admin/cms" },
  { id: "settings", label: "Settings", icon: "Settings", path: "/admin/settings" },
];

export const SETTINGS_SUBMENU_ITEMS = [
  { id: "profile", label: "Profile", icon: "User", path: "/settings/profile", clientPath: "/client-settings/profile", agencyPath: "/agency/settings/profile", adminPath: "/admin/settings/profile" },
  { id: "account-security", label: "Account & Security", icon: "Shield", path: "/settings/account-security", clientPath: "/client-settings/account-security", agencyPath: "/agency/settings/security", adminPath: "/admin/settings/security" },
  { id: "notifications", label: "Notifications", icon: "Bell", path: "/settings/notifications", clientPath: "/client-settings/notifications", agencyPath: "/agency/settings/notifications", adminPath: "/admin/settings/notifications" },
  { id: "privacy", label: "Privacy", icon: "Eye", path: "/settings/privacy", clientPath: "/client-settings/privacy", agencyPath: "/agency/settings/privacy", adminPath: "/admin/settings/privacy" },
  { id: "billing-payments", label: "Billing & Payments", icon: "CreditCard", path: "/settings/billing-payments", clientPath: "/client-settings/billing-payments", agencyPath: "/agency/settings/billing", adminPath: "/admin/settings/billing" },
  { id: "deactivate-account", label: "Deactivate Account", icon: "Trash", path: "/settings/deactivate-account", clientPath: "/client-settings/deactivate-account", agencyPath: "/agency/settings/deactivate", adminPath: "/admin/settings/deactivate" },
  { id: "sign-out", label: "Sign Out", icon: "LogOut", path: "/settings/sign-out", clientPath: "/client-settings/sign-out", agencyPath: "/agency/settings/sign-out", adminPath: "/admin/settings/sign-out", isDanger: true },
];

/** App route paths touched by the auth flow */
export const AUTH_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  VERIFY_EMAIL: "/verify-email",
  VERIFY_2FA: "/verify-2fa",
  TERMS: "/terms",
  PRIVACY: "/privacy",
};
