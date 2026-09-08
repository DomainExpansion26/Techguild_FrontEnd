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
  <>
    <Route
      path="/agency/dashboard"
      element={
        <RoleGuard allowedRoles={[ROLES.AGENCY, ROLES.ADMIN]}>
          <AgencyDashboard />
        </RoleGuard>
      }
    />
    <Route
      path="/agency/projects"
      element={
        <RoleGuard allowedRoles={[ROLES.AGENCY, ROLES.ADMIN]}>
          <AgencyProjects />
        </RoleGuard>
      }
    />
    <Route
      path="/agency/clients"
      element={
        <RoleGuard allowedRoles={[ROLES.AGENCY, ROLES.ADMIN]}>
          <AgencyClients />
        </RoleGuard>
      }
    />
    <Route
      path="/agency/team"
      element={
        <RoleGuard allowedRoles={[ROLES.AGENCY, ROLES.ADMIN]}>
          <AgencyTeam />
        </RoleGuard>
      }
    />
    <Route
      path="/agency/payments"
      element={
        <RoleGuard allowedRoles={[ROLES.AGENCY, ROLES.ADMIN]}>
          <AgencyPayments />
        </RoleGuard>
      }
    />
    <Route
      path="/agency/reports"
      element={
        <RoleGuard allowedRoles={[ROLES.AGENCY, ROLES.ADMIN]}>
          <AgencyReports />
        </RoleGuard>
      }
    />
    <Route
      path="/agency/settings"
      element={
        <RoleGuard allowedRoles={[ROLES.AGENCY, ROLES.ADMIN]}>
          <AgencySettings />
        </RoleGuard>
      }
    />
  </>
);

export default agencyRoutes;
