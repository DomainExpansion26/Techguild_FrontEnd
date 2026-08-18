import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "@/Components/icons/Icon";
import "./navbar.css";

export const defaultMenuItems = [
  { id: "dashboard",        label: "Dashboard",           icon: "LayoutDashboard",    path: "/dashboard" },
  { id: "profile",          label: "Profile (Guild Card)",icon: "User",               path: "/profile" },
  { id: "quest-board",      label: "Quest Board",         icon: "Files",              path: "/quest-board" },
  { id: "communication",    label: "Communication",       icon: "FileText",           path: "/communication" },
  { id: "task-management", label: "Task Management",     icon: "Files",              path: "/task-management" },
  { id: "analytics",        label: "Analytics",           icon: "Settings",           path: "/analytics" },
  { id: "finance",          label: "Finance",             icon: "IndianRupee",        path: "/finance" },
  { id: "party-formation", label: "Party Formation",     icon: "Focus",              path: "/party-formation" },
  { id: "guild-hall",       label: "Guild Hall",          icon: "Star",               path: "/guild-hall" },
  { id: "subscription",     label: "Subscription",        icon: "CircleCheck",        path: "/subscription" },
  { id: "verification",     label: "Verification",        icon: "Bookmark",           path: "/verification" },
  { id: "settings",         label: "Settings",            icon: "Settings",           path: "/settings" },
  { id: "help-support",     label: "Help & Support",      icon: "CircleQuestionMark", path: "/help-support" },
];

export const clientMenuItems = [
  { id: "dashboard",        label: "Dashboard",           icon: "LayoutDashboard",    path: "/client-dashboard" },
  { id: "profile",          label: "Profile (Guild Card)",icon: "User",               path: "/client-profile" },
  { id: "quest-board",      label: "Quest Board",         icon: "Files",              path: "/client-quest-board" },
  { id: "communication",    label: "Communication",       icon: "FileText",           path: "/client-applications" },
  { id: "task-management", label: "Task Management",     icon: "Files",              path: "/client-active-quests" },
  { id: "analytics",        label: "Analytics",           icon: "Settings",           path: "/client-company-reputation" },
  { id: "finance",          label: "Finance",             icon: "IndianRupee",        path: "/client-payouts" },
  { id: "guild-hall",       label: "Guild Hall",          icon: "Star",               path: "/client-notifications" },
  { id: "subscription",     label: "Subscription",        icon: "CircleCheck",        path: "/client-verification-hub" },
  { id: "verification",     label: "Verification",        icon: "Bookmark",           path: "/client-verification-hub" },
  { id: "settings",         label: "Settings",            icon: "Settings",           path: "/client-settings" },
  { id: "help-support",     label: "Help & Support",      icon: "CircleQuestionMark", path: "/client-help-support" },
];

export const settingsSubMenuItems = [
  { id: "profile",            label: "Profile",             icon: "User",       path: "/settings/profile",            clientPath: "/client-settings/profile" },
  { id: "account-security",  label: "Account & Security",  icon: "Shield",     path: "/settings/account-security",   clientPath: "/client-settings/account-security" },
  { id: "notifications",     label: "Notifications",       icon: "Bell",       path: "/settings/notifications",      clientPath: "/client-settings/notifications" },
  { id: "privacy",           label: "Privacy",             icon: "Eye",        path: "/settings/privacy",            clientPath: "/client-settings/privacy" },
  { id: "billing-payments",  label: "Billing & Payments",  icon: "CreditCard", path: "/settings/billing-payments",   clientPath: "/client-settings/billing-payments" },
  { id: "deactivate-account",label: "Deactivate Account",  icon: "Trash",      path: "/settings/deactivate-account", clientPath: "/client-settings/deactivate-account" },
  { id: "sign-out",          label: "Sign Out",            icon: "LogOut",     path: "/settings/sign-out",           clientPath: "/client-settings/sign-out", isDanger: true },
];

export default function Navbar({ items, userRole, activeSettingsTab, onSelectSettingsTab }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const isClientFlow = userRole === "Client" || currentPath.startsWith("/client");
  const menuItems = items || (isClientFlow ? clientMenuItems : defaultMenuItems);

  const isSettingsPath = currentPath.startsWith("/settings") || currentPath.startsWith("/client-settings");
  const [isSettingsMode, setIsSettingsMode] = useState(isSettingsPath);
  const [currentTab, setCurrentTab] = useState(activeSettingsTab || "profile");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (isSettingsPath) {
      setIsSettingsMode(true);
      const pathParts = currentPath.split("/").filter(Boolean);
      if (pathParts.length >= 2) {
        setCurrentTab(pathParts[1]);
      } else {
        setCurrentTab("profile");
      }
    }
  }, [currentPath, isSettingsPath]);

  useEffect(() => {
    if (activeSettingsTab) {
      setCurrentTab(activeSettingsTab);
    }
  }, [activeSettingsTab]);

  const handleSettingsSubClick = (subItem) => {
    setCurrentTab(subItem.id);
    if (onSelectSettingsTab) {
      onSelectSettingsTab(subItem.id);
    }
    const target = isClientFlow ? subItem.clientPath : subItem.path;
    navigate(target);
  };

  const handleMainItemClick = (item, e) => {
    if (item.id === "settings") {
      e.preventDefault();
      const settingsTarget = isClientFlow ? "/client-settings/profile" : "/settings/profile";
      if (!isSettingsPath) {
        setIsSettingsMode(true);
        navigate(settingsTarget);
      } else {
        setIsSettingsMode(!isSettingsMode);
      }
    } else {
      setIsSettingsMode(false);
    }
  };

  const activeTabId = activeSettingsTab || currentTab;

  return (
    <>
      {/* Mobile Top Header Bar (< 768px) */}
      <div className="mobile-header-bar d-flex d-md-none align-items-center justify-content-between w-100">
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="mobile-hamburger-btn border-0 bg-transparent p-0 d-flex align-items-center justify-content-center"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open Menu"
          >
            <Icon name="Menu" size={24} color="#111827" />
          </button>
          <div className="sidebar-logo">
            <span className="logo-tech">Tech</span>
            <span className="logo-guild">Guild</span>
          </div>
        </div>
        <div className="mobile-header-actions d-flex align-items-center gap-2">
          <button type="button" className="icon-btn"><Icon name="Bell" size={20} /></button>
          <button type="button" className="icon-btn"><Icon name="Mail" size={20} /></button>
          <div className="header-avatar">A</div>
        </div>
      </div>

      {/* Desktop Sidebar (>= 768px) */}
      <aside className={`card shadow-sm border border-light-subtle rounded-3 p-0 sidebar flex-shrink-0 d-none d-md-flex ${isSettingsMode ? "settings-mode" : ""}`}>
        <div className="card-body p-0 d-flex flex-column h-100 justify-content-between">
          
          {/* Logo Header Header */}
          <div className="sidebar-logo-container">
            <div className="sidebar-logo">
              <span className="logo-tech">Tech</span>
              <span className="logo-guild">Guild</span>
            </div>
          </div>

          {/* Standard Main Menu View (ss1) */}
          {!isSettingsMode && (
            <>
              <div className="sidebar-menu-container flex-grow-1">
                <ul className="sidebar-menu">
                  {menuItems.map((item) => {
                    const isDashboard = item.id === "dashboard";
                    const targetPath = item.path || (isDashboard ? "/dashboard" : `/${item.id}`);
                    const isActive = currentPath === targetPath || (isDashboard && currentPath === "/");
                    return (
                      <li key={item.id}>
                        <Link
                          to={targetPath}
                          className={`sidebar-item ${isActive ? "active" : ""}`}
                          onClick={(e) => handleMainItemClick(item, e)}
                        >
                          <Icon name={item.icon} size={20} />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="sidebar-footer">
                <div className="sidebar-avatar">A</div>
                <div className="sidebar-user-info">
                  <span className="sidebar-username">Arjun Mehta</span>
                  <span className="sidebar-role">{isClientFlow ? "Client" : "Freelancer"}</span>
                </div>
              </div>
            </>
          )}

          {/* Split Settings Sub-Menu View (ss2) */}
          {isSettingsMode && (
            <div className="sidebar-split-body">
              {/* Left Thin Icon Rail */}
              <div className="sidebar-rail">
                <ul className="sidebar-rail-menu">
                  {menuItems.map((item) => {
                    const isDashboard = item.id === "dashboard";
                    const targetPath = item.path || (isDashboard ? "/dashboard" : `/${item.id}`);
                    const isSettingsItem = item.id === "settings";
                    const isActive = isSettingsItem || currentPath === targetPath;
                    return (
                      <li key={item.id}>
                        <Link
                          to={targetPath}
                          className={`sidebar-rail-item ${isActive ? "active" : ""}`}
                          title={item.label}
                          onClick={(e) => handleMainItemClick(item, e)}
                        >
                          <Icon name={item.icon} size={18} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="sidebar-rail-footer">
                  <div className="sidebar-avatar">A</div>
                </div>
              </div>

              {/* Right Settings Submenu Panel */}
              <div className="sidebar-panel">
                <div className="sidebar-panel-header">SETTINGS</div>
                <ul className="sidebar-sub-menu">
                  {settingsSubMenuItems.map((subItem) => {
                    const isSubActive = subItem.id === activeTabId;
                    return (
                      <li key={subItem.id}>
                        <button
                          type="button"
                          className={`sidebar-sub-item ${isSubActive ? "active" : ""} ${subItem.isDanger ? "danger" : ""}`}
                          onClick={() => handleSettingsSubClick(subItem)}
                        >
                          <Icon name={subItem.icon} size={18} />
                          <span>{subItem.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

        </div>
      </aside>

      {/* Mobile Drawer Off-Canvas Navigation (< 768px) */}
      <div className={`mobile-drawer-wrapper d-md-none ${isMobileOpen ? "is-open" : ""}`}>
        <div className="mobile-drawer-backdrop" onClick={() => setIsMobileOpen(false)} />
        <div className="mobile-drawer-content d-flex flex-column justify-content-between">
          <div className="d-flex flex-column overflow-hidden h-100">
            {/* Drawer Header */}
            <div className="mobile-drawer-header d-flex align-items-center justify-content-between flex-shrink-0">
              <div className="d-flex align-items-center gap-2">
                <div className="sidebar-logo">
                  <span className="logo-tech">Tech</span>
                  <span className="logo-guild">Guild</span>
                </div>
                <button
                  type="button"
                  className="mobile-drawer-close border-0 bg-transparent p-1 ms-2 d-flex align-items-center justify-content-center"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close Menu"
                >
                  <Icon name="X" size={18} color="#111827" />
                </button>
              </div>
              <div className="header-avatar ms-auto">A</div>
            </div>

            {/* Drawer Menu List */}
            <div className="mobile-drawer-body flex-grow-1 overflow-y-auto">
              <ul className="mobile-drawer-menu">
                {menuItems.map((item) => {
                  const isDashboard = item.id === "dashboard";
                  const targetPath = item.path || (isDashboard ? "/dashboard" : `/${item.id}`);
                  const isActive = currentPath === targetPath || (isDashboard && currentPath === "/");
                  return (
                    <React.Fragment key={item.id}>
                      <li>
                        <Link
                          to={targetPath}
                          className={`mobile-drawer-item ${isActive ? "active" : ""}`}
                          onClick={(e) => {
                            if (item.id === "settings") {
                              handleMainItemClick(item, e);
                            } else {
                              setIsMobileOpen(false);
                              setIsSettingsMode(false);
                            }
                          }}
                        >
                          <Icon name={item.icon} size={20} />
                          <span>{item.label}</span>
                        </Link>
                      </li>

                      {/* If Settings is expanded in Mobile Drawer */}
                      {item.id === "settings" && isSettingsMode && (
                        <li className="ms-3 my-1">
                          <div className="sidebar-panel-header px-2 py-1 mb-1">SETTINGS</div>
                          <ul className="sidebar-sub-menu">
                            {settingsSubMenuItems.map((subItem) => {
                              const isSubActive = subItem.id === activeTabId;
                              return (
                                <li key={subItem.id}>
                                  <button
                                    type="button"
                                    className={`sidebar-sub-item ${isSubActive ? "active" : ""} ${subItem.isDanger ? "danger" : ""}`}
                                    onClick={() => {
                                      handleSettingsSubClick(subItem);
                                      setIsMobileOpen(false);
                                    }}
                                  >
                                    <Icon name={subItem.icon} size={18} />
                                    <span>{subItem.label}</span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      )}
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Drawer Footer User Card */}
          <div className="mobile-drawer-footer d-flex align-items-center justify-content-between flex-shrink-0">
            <div className="d-flex align-items-center gap-2">
              <div className="sidebar-avatar">A</div>
              <div className="sidebar-user-info">
                <span className="sidebar-username">Arjun Mehta</span>
                <span className="sidebar-role">{isClientFlow ? "Client" : "Freelancer"}</span>
              </div>
            </div>
            <Icon name="ChevronRight" size={18} color="#6b7280" />
          </div>
        </div>
      </div>
    </>
  );
}
