import { lazy } from "react";
import { Route } from "react-router-dom";
import { RoleGuard } from "@/permissions";
import { ROLES } from "@/permissions/roles";

const AgencyDashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const AgencyProjects = lazy(() => import("./pages/Projects/Project"));
const AgencyClients = lazy(() => import("./pages/Clients/Clients"));
const AgencyTeam = lazy(() => import("./pages/Team/Team"));
const AgencyPayments = lazy(() => import("./pages/Payments/Payment"));
const AgencyReports = lazy(() => import("./pages/Reports/Reports"));
const AgencySettings = lazy(() => import("./pages/Settings/Settings"));

export const agencyRoutes = (
  <Route element={<RoleGuard allowedRoles={[ROLES.AGENCY, ROLES.ADMIN]} />}>
    <Route path="/agency/dashboard" element={<AgencyDashboard />} />
    <Route path="/agency/projects" element={<AgencyProjects />} />
    <Route path="/agency/clients" element={<AgencyClients />} />
    <Route path="/agency/team" element={<AgencyTeam />} />
    <Route path="/agency/payments" element={<AgencyPayments />} />
    <Route path="/agency/reports" element={<AgencyReports />} />
    <Route path="/agency/settings" element={<AgencySettings />} />
  </Route>
);

export default agencyRoutes;
