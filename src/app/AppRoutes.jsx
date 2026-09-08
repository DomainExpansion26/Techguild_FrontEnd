import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoadingSpinner, NotFound } from "@/Components/feedback";

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

        {/* Individual (Freelancer) User Flow */}
        {individualRoutes}

        {/* Client User Flow */}
        {clientRoutes}

        {/* Agency User Flow (Guarded) */}
        {agencyRoutes}

        {/* Admin User Flow (Guarded) */}
        {adminRoutes}

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
