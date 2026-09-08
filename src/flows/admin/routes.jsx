import { lazy } from "react";
import { Route } from "react-router-dom";
import { RoleGuard } from "@/permissions";
import { ROLES } from "@/permissions/roles";

const AdminDashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const AdminUsers = lazy(() => import("./pages/Users/User"));
const AdminAgencies = lazy(() => import("./pages/Agencies/Agencies"));
const AdminClients = lazy(() => import("./pages/Clients/Clients"));
const AdminFreelancers = lazy(() => import("./pages/Freelancers/Freelancers"));
const AdminProjects = lazy(() => import("./pages/Project/Project"));
const AdminPayments = lazy(() => import("./pages/Payments/Payment"));
const AdminReports = lazy(() => import("./pages/Reports/Reports"));
const AdminAnalytics = lazy(() => import("./pages/Analytics/Analytics"));
const AdminCms = lazy(() => import("./pages/CMS/Cms"));
const AdminSettings = lazy(() => import("./pages/Settings/Settings"));

export const adminRoutes = (
  <>
    <Route
      path="/admin/dashboard"
      element={
        <RoleGuard allowedRoles={[ROLES.ADMIN]}>
          <AdminDashboard />
        </RoleGuard>
      }
    />
    <Route
      path="/admin/users"
      element={
        <RoleGuard allowedRoles={[ROLES.ADMIN]}>
          <AdminUsers />
        </RoleGuard>
      }
    />
    <Route
      path="/admin/agencies"
      element={
        <RoleGuard allowedRoles={[ROLES.ADMIN]}>
          <AdminAgencies />
        </RoleGuard>
      }
    />
    <Route
      path="/admin/clients"
      element={
        <RoleGuard allowedRoles={[ROLES.ADMIN]}>
          <AdminClients />
        </RoleGuard>
      }
    />
    <Route
      path="/admin/freelancers"
      element={
        <RoleGuard allowedRoles={[ROLES.ADMIN]}>
          <AdminFreelancers />
        </RoleGuard>
      }
    />
    <Route
      path="/admin/projects"
      element={
        <RoleGuard allowedRoles={[ROLES.ADMIN]}>
          <AdminProjects />
        </RoleGuard>
      }
    />
    <Route
      path="/admin/payments"
      element={
        <RoleGuard allowedRoles={[ROLES.ADMIN]}>
          <AdminPayments />
        </RoleGuard>
      }
    />
    <Route
      path="/admin/reports"
      element={
        <RoleGuard allowedRoles={[ROLES.ADMIN]}>
          <AdminReports />
        </RoleGuard>
      }
    />
    <Route
      path="/admin/analytics"
      element={
        <RoleGuard allowedRoles={[ROLES.ADMIN]}>
          <AdminAnalytics />
        </RoleGuard>
      }
    />
    <Route
      path="/admin/cms"
      element={
        <RoleGuard allowedRoles={[ROLES.ADMIN]}>
          <AdminCms />
        </RoleGuard>
      }
    />
    <Route
      path="/admin/settings"
      element={
        <RoleGuard allowedRoles={[ROLES.ADMIN]}>
          <AdminSettings />
        </RoleGuard>
      }
    />
  </>
);

export default adminRoutes;
