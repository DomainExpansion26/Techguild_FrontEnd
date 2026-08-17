import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/Components/icons/Icon";
import "./navbar.css";

const defaultMenuItems = [
  { id: "dashboard",        label: "Dashboard",           icon: "LayoutDashboard"    },
  { id: "profile",          label: "Profile (Guild Card)",icon: "User2"              },
  { id: "quest-board",      label: "Quest Board",         icon: "Files"              },
  { id: "my-applications",  label: "My Applications",     icon: "FileText"           },
  { id: "active-quests",    label: "Active Quests",       icon: "Files"              },
  { id: "party-management", label: "Party Management",    icon: "Group"              },
  { id: "reputation-rank",  label: "Reputation & Rank",   icon: "Verified"           },
  { id: "verification-hub", label: "Verification Hub",    icon: "Bookmark"           },
  { id: "earnings-payouts", label: "Earnings & Payouts",  icon: "IndianRupee"        },
  { id: "reviews-feedback", label: "Reviews & Feedback",  icon: "Star"               },
  { id: "notifications",    label: "Notifications",       icon: "Bell"               },
  { id: "settings",         label: "Settings",            icon: "Settings"           },
  { id: "help-support",     label: "Help & Support",      icon: "CircleQuestionMark" },
];

export default function Navbar({ items = defaultMenuItems }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
      <aside className="card shadow-sm border border-light-subtle rounded-3 p-0 sidebar flex-shrink-0 d-none d-md-flex">
        <div className="card-body p-0 d-flex flex-column h-100 justify-content-between">
          <div className="sidebar-logo-container">
            <div className="sidebar-logo">
              <span className="logo-tech">Tech</span>
              <span className="logo-guild">Guild</span>
            </div>
          </div>

          <div className="sidebar-menu-container flex-grow-1">
            <ul className="sidebar-menu">
              {items.map((item) => {
                const isDashboard = item.id === "dashboard";
                const targetPath = item.path || (isDashboard ? "/dashboard" : `/${item.id}`);
                const isActive = currentPath === targetPath || (isDashboard && currentPath === "/");
                return (
                  <li key={item.id}>
                    <Link
                      to={targetPath}
                      className={`sidebar-item ${isActive ? "active" : ""}`}
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
              <span className="sidebar-role">Freelancer</span>
            </div>
          </div>
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
                {items.map((item) => {
                  const isDashboard = item.id === "dashboard";
                  const targetPath = item.path || (isDashboard ? "/dashboard" : `/${item.id}`);
                  const isActive = currentPath === targetPath || (isDashboard && currentPath === "/");
                  return (
                    <li key={item.id}>
                      <Link
                        to={targetPath}
                        className={`mobile-drawer-item ${isActive ? "active" : ""}`}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <Icon name={item.icon} size={20} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
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
                <span className="sidebar-role">Freelancer</span>
              </div>
            </div>
            <Icon name="ChevronRight" size={18} color="#6b7280" />
          </div>
        </div>
      </div>
    </>
  );
}

