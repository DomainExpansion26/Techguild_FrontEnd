import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "@/Components/Common/DashboardLayout/DashboardLayout";
import { CLIENT_MENU_ITEMS } from "@/constants/navigation";

export default function ClientLayout({ children }) {
  return (
    <DashboardLayout navbarItems={CLIENT_MENU_ITEMS} mainWorkspaceClass="client-dashboard-workspace">
      {children || <Outlet />}
    </DashboardLayout>
  );
}
