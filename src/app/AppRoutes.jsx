import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoadingSpinner, NotFound } from "@/Components/feedback";
import { AuthGuard } from "@/permissions";

import { authRoutes } from "@/flows/auth/routes";
import { landingRoutes } from "@/flows/landing/routes";
import { individualRoutes } from "@/flows/individual/routes";
import { clientRoutes } from "@/flows/client/routes";
import { agencyRoutes } from "@/flows/agency/routes";
import { adminRoutes } from "@/flows/admin/routes";

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen text="Loading TechGuild..." />}>
      <Routes>
        {/* Default Landing / Auth Redirect */}
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {/* Public Marketing & Landing Flow */}
        {landingRoutes}

        {/* Authentication Flow */}
        {authRoutes}

        {/* Protected Role-Based Flows (Requires Active Session) */}
        <Route element={<AuthGuard />}>
          {individualRoutes}
          {clientRoutes}
          {agencyRoutes}
          {adminRoutes}
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
