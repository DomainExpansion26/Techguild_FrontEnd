import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "@/Components/Common/DashboardLayout/DashboardLayout";
import { AGENCY_MENU_ITEMS } from "@/constants/navigation";

export default function AgencyLayout({ children }) {
  return (
    <DashboardLayout navbarItems={AGENCY_MENU_ITEMS}>
      {children || <Outlet />}
    </DashboardLayout>
  );
}
