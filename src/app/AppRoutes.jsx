import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingSpinner, NotFound } from "@/Components/feedback";

import { authRoutes } from "@/flows/auth/routes";
import { landingRoutes } from "@/flows/landing/routes";

// TEMPORARY: dashboard + all role-based flows (individual / client / agency /
// admin) are removed — the app shows ONLY the landing page plus the temporary
// Coming Soon auth entries (/login, /signup). No dashboard navigation exists.
// To restore, re-add the AuthGuard route block and flow imports (see git history).

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen text="Loading TechGuild..." />}>
      <Routes>
        {/* Landing is served at "/" (see landingRoutes) — entry flow: Landing -> Sign In (Coming Soon) */}

        {/* Public Marketing & Landing Flow */}
        {landingRoutes}

        {/* Authentication Flow (temporarily Coming Soon pages) */}
        {authRoutes}

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
