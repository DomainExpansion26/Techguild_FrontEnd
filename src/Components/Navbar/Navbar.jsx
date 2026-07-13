import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/Components/icons/Icon";
import "./navbar.css";

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
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

  return (
    <aside className="card shadow-sm border border-light-subtle rounded-3 p-0 sidebar flex-shrink-0">
      <div className="card-body p-0 d-flex flex-column h-100 justify-content-between">
        <div className="sidebar-logo-container">
          <div className="sidebar-logo">
            <span className="logo-tech">Tech</span>
            <span className="logo-guild">Guild</span>
          </div>
        </div>

        <div className="sidebar-menu-container flex-grow-1">
          <ul className="sidebar-menu">
            {menuItems.map((item) => {
              const isDashboard = item.id === "dashboard";
              const targetPath = isDashboard ? "/dashboard" : `/${item.id}`;
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
  );
}

