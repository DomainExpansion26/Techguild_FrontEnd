import { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  LoadingSpinner,
  NotFound,
  ServerError,
  OfflineError,
  SessionExpired,
  AccessDenied,
  ErrorBoundary,
} from "@/Components/feedback";
import { ErrorPreviewPage } from "@/shared/ErrorPages/ErrorPages";
import { AuthGuard } from "@/permissions";

import { authRoutes } from "@/flows/auth/routes";
import { landingRoutes } from "@/flows/landing/routes";

// TEMPORARY: dashboard + all role-based flows (individual / client / agency /
// admin) are removed — the app shows ONLY the landing page plus the temporary
// Coming Soon auth entries (/login, /signup). No dashboard navigation exists.
// To restore, re-add the AuthGuard route block and flow imports (see git history).

export default function AppRoutes() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const location = useLocation();

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const isPreviewOrManualOffline =
    location.pathname === "/error-preview" ||
    location.pathname === "/errors" ||
    location.pathname === "/offline" ||
    location.pathname === "/no-internet";

  if (isOffline && !isPreviewOrManualOffline) {
    return (
      <OfflineError
        onRetry={() => {
          if (navigator.onLine) {
            setIsOffline(false);
          } else {
            window.location.reload();
          }
        }}
      />
    );
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner fullScreen text="Loading TechGuild..." />}>
        <Routes>
          {/* Default Landing / Auth Redirect */}
          <Route path="/" element={<Navigate to="/signup" replace />} />

          {/* Public Marketing & Landing Flow */}
          {landingRoutes}

          {/* Authentication Flow */}
          {authRoutes}

          {/* Dedicated Error Screen Routes (Accessible across all flows) */}
          <Route path="/404" element={<NotFound />} />
          <Route path="/500" element={<ServerError />} />
          <Route path="/505" element={<ServerError />} />
          <Route path="/offline" element={<OfflineError />} />
          <Route path="/no-internet" element={<OfflineError />} />
          <Route path="/session-expired" element={<SessionExpired />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="/403" element={<AccessDenied />} />
          <Route path="/error-preview" element={<ErrorPreviewPage />} />
          <Route path="/errors" element={<ErrorPreviewPage />} />

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
    </ErrorBoundary>
  );
}
