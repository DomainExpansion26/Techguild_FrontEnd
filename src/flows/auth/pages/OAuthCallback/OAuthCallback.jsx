import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { oauthApi, profileApi } from "@/services/api";
import { LoadingSpinner } from "@/Components/feedback";
import { prefetchPostLogin } from "@/app/prefetch";
import { APP_STRINGS } from "@/constants/string";
import { ROLES } from "@/permissions/roles";

function resolveDashboardPath(role) {
  if (role === ROLES.CLIENT) return "/client-dashboard";
  if (role === ROLES.AGENCY) return "/agency/dashboard";
  return "/dashboard";
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
          let role = result.user?.role || result.user?.account_type || result?.account_type;

          // Probe profile if account_type is not directly on the auth response
          if (!role) {
            try {
              const profileRes = await profileApi.getProfile({ token: result.access_token });
              if (profileRes?.account_type) {
                role = profileRes.account_type;
              }
            } catch {
              // Fallback to individual
            }
          }

          const activeRole = role || ROLES.INDIVIDUAL;
          const resolvedUser = result.user || {
            name: "User",
            email: "oauth.user@example.com",
            role: activeRole,
          };

          await login(resolvedUser, result.access_token, activeRole);
          prefetchPostLogin(activeRole);

          if (result?.requires_account_type || result?.needs_account_type || (!role && result?.is_new_user)) {
            navigate("/account-type");
          } else {
            navigate(resolveDashboardPath(activeRole));
          }
        } else {
          prefetchPostLogin();
          navigate("/dashboard");
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
          let role = ROLES.INDIVIDUAL;
          try {
            const profileRes = await profileApi.getProfile({ token });
            if (profileRes?.account_type) {
              role = profileRes.account_type;
            }
          } catch {
            // Fallback to individual
          }
          await login({ name: "User", role }, token, role);
          prefetchPostLogin(role);
          navigate(resolveDashboardPath(role));
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
