// 6-11-2026
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingSpinner, NotFound } from "@/Components/feedback";
import { AuthGuard } from "@/permissions";

import { authRoutes } from "@/flows/auth/routes";
import { landingRoutes } from "@/flows/landing/routes";
import { adminRoutes } from "@/flows/admin/routes";
import { agencyRoutes } from "@/flows/agency/routes";
import { clientRoutes } from "@/flows/client/routes";
import { individualRoutes } from "@/flows/individual/routes";
import { AuthGuard } from "@/permissions";

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen text="Loading TechGuild..." />}>
      <Routes>
        {landingRoutes}

        {authRoutes}

        <Route element={<AuthGuard />}>
          {individualRoutes}
        </Route>

        <Route element={<AuthGuard />}>
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
