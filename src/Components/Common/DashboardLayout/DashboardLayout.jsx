import React from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Header from "@/Components/Header/Header";
import { useAuth } from "@/context/AuthContext";
import dashboardBg from "@/assets/dashboard.bg.png";
import "./dashboard-layout.css";

export default function DashboardLayout({
  children,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  avatarInitial,
  onBellClick,
  onMailClick,
  onAvatarClick,
  hideHeader = false,
  hideNavbar = false,
  customHeader,
  navbarItems,
  activeSettingsTab,
  onSelectSettingsTab,
  mainWorkspaceClass = "",
  containerClass = "",
  style = {},
}) {
  const { user } = useAuth();
  const displayName = user?.name || (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : null) || user?.email || "U";
  const resolvedAvatar = avatarInitial || user?.avatar || displayName.charAt(0).toUpperCase();
  return (
    <div
      className={`dashboard-layout ${containerClass}`}
      style={{ backgroundImage: `url(${dashboardBg})`, ...style }}
    >
      {!hideNavbar && (
        <Navbar
          items={navbarItems}
          activeSettingsTab={activeSettingsTab}
          onSelectSettingsTab={onSelectSettingsTab}
        />
      )}

      <main className={`main-workspace ${mainWorkspaceClass}`}>
        {!hideHeader &&
          (customHeader || (
            <Header
              searchPlaceholder={searchPlaceholder}
              searchValue={searchValue}
              onSearchChange={onSearchChange}
              onSearchSubmit={onSearchSubmit}
              avatarInitial={resolvedAvatar}
              onBellClick={onBellClick}
              onMailClick={onMailClick}
              onAvatarClick={onAvatarClick}
            />
          ))}

        {children}
      </main>
    </div>
  );
}
