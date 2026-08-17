import React from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Header from "@/Components/Header/Header";
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
  mainWorkspaceClass = "",
  containerClass = "",
  style = {},
}) {
  return (
    <div
      className={`dashboard-layout ${containerClass}`}
      style={{ backgroundImage: `url(${dashboardBg})`, ...style }}
    >
      {!hideNavbar && <Navbar items={navbarItems} />}

      <main className={`main-workspace ${mainWorkspaceClass}`}>
        {!hideHeader &&
          (customHeader || (
            <Header
              searchPlaceholder={searchPlaceholder}
              searchValue={searchValue}
              onSearchChange={onSearchChange}
              onSearchSubmit={onSearchSubmit}
              avatarInitial={avatarInitial}
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
