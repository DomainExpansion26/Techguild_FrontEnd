import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ROLES } from "@/permissions/roles";

function resolveDashboardPath(role) {
  if (role === ROLES.CLIENT || role === "client" || role === "client_admin" || role === "client_member") {
    return "/client-dashboard";
  }
  if (role === ROLES.AGENCY || role === "agency" || role === "agency_admin") {
    return "/agency/dashboard";
  }
  if (role === ROLES.INDIVIDUAL || role === "individual") {
    return "/dashboard";
  }
  if (role === ROLES.ADMIN || role === "admin") {
    return "/admin/dashboard";
  }
  return "/account-type";
}

export default function GuestGuard({ children }) {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  // Already authenticated user must NOT be able to view login / signup as if logged out
  if (isAuthenticated) {
    return <Navigate to={resolveDashboardPath(role)} replace />;
  }

  return children ? children : <Outlet />;
}
