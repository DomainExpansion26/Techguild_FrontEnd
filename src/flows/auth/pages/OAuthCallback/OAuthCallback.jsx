import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { oauthApi, profileApi } from "@/services/api";
import { LoadingSpinner } from "@/Components/feedback";
import { prefetchPostLogin } from "@/app/prefetch";
import { APP_STRINGS } from "@/constants/string";
import { ROLES } from "@/permissions/roles";

function resolveDashboardPath(role) {
  if (role === ROLES.CLIENT || role === "client" || role === "client_admin" || role === "client_member") return "/client-dashboard";
  if (role === ROLES.AGENCY || role === "agency" || role === "agency_admin") return "/agency/dashboard";
  if (role === ROLES.INDIVIDUAL || role === "individual") return "/dashboard";
  return "/account-type";
}

async function resolveUserAccountType(token, directAccountType) {
  if (directAccountType && typeof directAccountType === "string" && directAccountType.trim()) {
    return directAccountType.trim();
  }

  // 1. Probe points endpoint with explicit token (quickest check for user.AccountType)
  try {
    const pointsRes = await profileApi.getPoints({ token });
    const resType = pointsRes?.account_type || pointsRes?.data?.account_type;
    if (resType && typeof resType === "string" && resType.trim()) {
      return resType.trim();
    }
  } catch {
    // Ignore points check error and proceed to profile probe
  }

  // 2. Probe profile endpoint with explicit token
  try {
    const profileRes = await profileApi.getProfile({ token });
    const resType =
      profileRes?.account_type ||
      profileRes?.data?.account_type ||
      (profileRes?.client || profileRes?.data?.client ? ROLES.CLIENT : null) ||
      (profileRes?.agency || profileRes?.data?.agency ? ROLES.AGENCY : null) ||
      (profileRes?.individual || profileRes?.data?.individual ? ROLES.INDIVIDUAL : null);
    if (resType && typeof resType === "string" && resType.trim()) {
      return resType.trim();
    }
  } catch {
    // Profile not found or account type not set yet
  }

  return null;
}

export default function OAuthCallback() {
  const STRINGS = APP_STRINGS.AUTH.OAUTH;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const provider = window.location.pathname.includes("github") ? "github" : "google";

    async function processOAuth() {
      try {
        let result;
        if (provider === "github") {
          result = await oauthApi.handleGithubCallback(code, state);
        } else {
          result = await oauthApi.handleGoogleCallback(code, state);
        }

        if (result?.access_token) {
          const token = result.access_token;
          const directType = result.user?.account_type || result?.account_type || null;
          const selectedAccountType = await resolveUserAccountType(token, directType);

          const resolvedUser = {
            name: result.user?.name || "User",
            email: result.user?.email || "oauth.user@example.com",
            role: selectedAccountType || null,
            avatar: (result.user?.name || "U").charAt(0).toUpperCase(),
          };

          if (selectedAccountType && !result?.requires_account_type && !result?.needs_account_type) {
            // Existing member with role: log in with their actual role and open their role dashboard
            await login(resolvedUser, token, selectedAccountType);
            prefetchPostLogin(selectedAccountType);
            navigate(resolveDashboardPath(selectedAccountType));
          } else {
            // New user without role: do not default to any role, prompt account type selection
            await login(resolvedUser, token, null);
            navigate("/account-type");
          }
        } else {
          prefetchPostLogin();
          navigate("/login");
        }
      } catch (err) {
        console.error("OAuth callback error:", err?.message || "Authentication failed");
        setError(err.message || STRINGS.DEFAULT_ERROR);
      }
    }

    if (code) {
      processOAuth();
    } else {
      // Direct token redirect fallback
      const token = searchParams.get("token") || searchParams.get("access_token");
      if (token) {
        async function handleDirectToken() {
          const selectedAccountType = await resolveUserAccountType(token, null);
          const resolvedUser = {
            name: "User",
            role: selectedAccountType || null,
          };

          if (selectedAccountType) {
            await login(resolvedUser, token, selectedAccountType);
            prefetchPostLogin(selectedAccountType);
            navigate(resolveDashboardPath(selectedAccountType));
          } else {
            await login(resolvedUser, token, null);
            navigate("/account-type");
          }
        }
        handleDirectToken();
      } else {
        navigate("/login");
      }
    }
  }, [searchParams, login, navigate, STRINGS.DEFAULT_ERROR]);

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h3 style={{ color: "#dc2626" }}>{STRINGS.ERROR_TITLE}</h3>
        <p style={{ color: "#4b5563" }}>{error}</p>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-primary"
          style={{ marginTop: "16px" }}
        >
          {STRINGS.RETURN_TO_LOGIN}
        </button>
      </div>
    );
  }

  return <LoadingSpinner fullScreen text={STRINGS.LOADING_TEXT} />;
}
