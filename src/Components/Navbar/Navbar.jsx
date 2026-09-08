import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "@/Components/icons/Icon";
import { useAuth } from "@/context/AuthContext";
import {
  INDIVIDUAL_MENU_ITEMS,
  CLIENT_MENU_ITEMS,
  AGENCY_MENU_ITEMS,
  ADMIN_MENU_ITEMS,
  SETTINGS_SUBMENU_ITEMS,
} from "@/constants/navigation";
import "./navbar.css";

export const defaultMenuItems = INDIVIDUAL_MENU_ITEMS;
export const clientMenuItems = CLIENT_MENU_ITEMS;
export const agencyMenuItems = AGENCY_MENU_ITEMS;
export const adminMenuItems = ADMIN_MENU_ITEMS;
export const settingsSubMenuItems = SETTINGS_SUBMENU_ITEMS;

export default function Navbar({ items, userRole, activeSettingsTab, onSelectSettingsTab }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentPath = location.pathname;

  const displayName = user?.name || (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : null) || user?.email?.split("@")[0] || "User";
  const displayAvatar = user?.avatar || displayName.charAt(0).toUpperCase();

  const isAdminFlow = userRole === "admin" || userRole === "Admin" || currentPath.startsWith("/admin");
  const isAgencyFlow = userRole === "agency" || userRole === "Agency" || currentPath.startsWith("/agency");
  const isClientFlow = userRole === "client" || userRole === "Client" || currentPath.startsWith("/client");

  const resolvedMenuItems = isAdminFlow
    ? adminMenuItems
    : isAgencyFlow
    ? agencyMenuItems
    : isClientFlow
    ? clientMenuItems
    : defaultMenuItems;

  const menuItems = items || resolvedMenuItems;

  const roleLabel = isAdminFlow
    ? "Administrator"
    : isAgencyFlow
    ? "Agency"
    : isClientFlow
    ? "Client"
    : "Freelancer";

  const isSettingsPath = currentPath.startsWith("/settings") ||
    currentPath.startsWith("/client-settings") ||
    currentPath.startsWith("/agency/settings") ||
    currentPath.startsWith("/admin/settings");

  const [isSettingsMode, setIsSettingsMode] = useState(isSettingsPath);
  const [currentTab, setCurrentTab] = useState(activeSettingsTab || "profile");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (isSettingsPath) {
      setIsSettingsMode(true);
      const pathParts = currentPath.split("/").filter(Boolean);
      if (pathParts.length >= 2) {
        setCurrentTab(pathParts[pathParts.length - 1]);
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
          <div
            className="header-avatar"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(isClientFlow ? "/client-settings/profile" : "/settings/profile")}
          >
            {displayAvatar}
          </div>
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

              <div
                className="sidebar-footer"
                style={{ cursor: "pointer" }}
                title="View Profile & Settings"
                onClick={() => navigate(isClientFlow ? "/client-settings/profile" : "/settings/profile")}
              >
                <div className="sidebar-avatar">{displayAvatar}</div>
                <div className="sidebar-user-info">
                  <span className="sidebar-username">{displayName}</span>
                  <span className="sidebar-role">{roleLabel}</span>
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
              <div
                className="header-avatar ms-auto"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsMobileOpen(false);
                  navigate(isClientFlow ? "/client-settings/profile" : "/settings/profile");
                }}
              >
                {displayAvatar}
              </div>
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
          <div
            className="mobile-drawer-footer d-flex align-items-center justify-content-between flex-shrink-0"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsMobileOpen(false);
              navigate(isClientFlow ? "/client-settings/profile" : "/settings/profile");
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <div className="sidebar-avatar">{displayAvatar}</div>
              <div className="sidebar-user-info">
                <span className="sidebar-username">{displayName}</span>
                <span className="sidebar-role">{roleLabel}</span>
              </div>
            </div>
            <Icon name="ChevronRight" size={18} color="#6b7280" />
          </div>
        </div>
      </div>
    </>
  );
}
