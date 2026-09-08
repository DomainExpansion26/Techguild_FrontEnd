import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "@/Components/Common/DashboardLayout/DashboardLayout";
import { ADMIN_MENU_ITEMS } from "@/constants/navigation";

export default function AdminLayout({ children }) {
  return (
    <DashboardLayout navbarItems={ADMIN_MENU_ITEMS}>
      {children || <Outlet />}
    </DashboardLayout>
  );
}
