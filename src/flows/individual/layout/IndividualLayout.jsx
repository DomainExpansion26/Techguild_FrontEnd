import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "@/Components/Common/DashboardLayout/DashboardLayout";
import { INDIVIDUAL_MENU_ITEMS } from "@/constants/navigation";

export default function IndividualLayout({ children }) {
  return (
    <DashboardLayout navbarItems={INDIVIDUAL_MENU_ITEMS}>
      {children || <Outlet />}
    </DashboardLayout>
  );
}
