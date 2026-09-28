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
  <Route element={<RoleGuard allowedRoles={[ROLES.ADMIN]} />}>
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/users" element={<AdminUsers />} />
    <Route path="/admin/agencies" element={<AdminAgencies />} />
    <Route path="/admin/clients" element={<AdminClients />} />
    <Route path="/admin/freelancers" element={<AdminFreelancers />} />
    <Route path="/admin/projects" element={<AdminProjects />} />
    <Route path="/admin/payments" element={<AdminPayments />} />
    <Route path="/admin/reports" element={<AdminReports />} />
    <Route path="/admin/analytics" element={<AdminAnalytics />} />
    <Route path="/admin/cms" element={<AdminCms />} />
    <Route path="/admin/settings" element={<AdminSettings />} />
  </Route>
);

export default adminRoutes;
