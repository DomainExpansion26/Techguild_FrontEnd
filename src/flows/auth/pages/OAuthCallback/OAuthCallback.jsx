import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { oauthApi, profileApi } from "@/services/api";
import { LoadingSpinner } from "@/Components/feedback";
import { prefetchPostLogin } from "@/app/prefetch";
import { APP_STRINGS, APP_CONFIG } from "@/constants/string";
import { ROLES } from "@/permissions/roles";

function resolveDashboardPath(role) {
  if (role === ROLES.CLIENT || role === "client" || role === "client_admin" || role === "client_member") return "/client-dashboard";
  if (role === ROLES.AGENCY || role === "agency" || role === "agency_admin") return "/agency/dashboard";
  if (role === ROLES.INDIVIDUAL || role === "individual") return "/dashboard";
  if (role === ROLES.ADMIN || role === "admin") return "/admin/dashboard";
  return "/account-type";
}

function decodeJwtPayload(token) {
  try {
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

async function resolveUserAccountType(token, directAccountType) {
  if (directAccountType && typeof directAccountType === "string" && directAccountType.trim()) {
    return directAccountType.trim().toLowerCase();
  }

  // 1. Check decoded JWT payload claims (quickest offline check)
  const jwt = decodeJwtPayload(token);
  const jwtType =
    jwt?.role ||
    jwt?.account_type ||
    jwt?.user?.role ||
    jwt?.user?.account_type;
  if (jwtType && typeof jwtType === "string" && jwtType.trim()) {
    return jwtType.trim().toLowerCase();
  }

  // 2. Probe points endpoint with explicit token (quickest check for user.AccountType)
  try {
    const pointsRes = await profileApi.getPoints({ token });
    const resType =
      pointsRes?.account_type ||
      pointsRes?.data?.account_type ||
      pointsRes?.role ||
      pointsRes?.data?.role;
    if (resType && typeof resType === "string" && resType.trim()) {
      return resType.trim().toLowerCase();
    }
  } catch {
    // Ignore points check error and proceed to profile probe
  }

  // 3. Probe profile endpoint with explicit token
  try {
    const profileRes = await profileApi.getProfile({ token });
    const resType =
      profileRes?.account_type ||
      profileRes?.data?.account_type ||
      profileRes?.role ||
      profileRes?.data?.role ||
      profileRes?.user?.account_type ||
      profileRes?.user?.role ||
      profileRes?.data?.user?.account_type ||
      profileRes?.data?.user?.role ||
      (profileRes?.client || profileRes?.data?.client ? ROLES.CLIENT : null) ||
      (profileRes?.agency || profileRes?.data?.agency ? ROLES.AGENCY : null) ||
      (profileRes?.individual || profileRes?.data?.individual ? ROLES.INDIVIDUAL : null);
    if (resType && typeof resType === "string" && resType.trim()) {
      return resType.trim().toLowerCase();
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
    const directToken = searchParams.get("token") || searchParams.get("access_token");
    const provider = window.location.pathname.includes("github") ? "github" : "google";

    async function processOAuth() {
      try {
        let result;
        if (provider === "github") {
          result = await oauthApi.handleGithubCallback(code, state);
        } else {
          result = await oauthApi.handleGoogleCallback(code, state);
        }

        // Always take the generated access token if present
        const token =
          result?.access_token ||
          result?.token ||
          result?.data?.access_token ||
          result?.data?.token;

        if (token) {
          const refreshToken =
            result?.refresh_token ||
            result?.data?.refresh_token ||
            null;
          const expiresIn =
            result?.expires_in ||
            result?.data?.expires_in ||
            null;

          const userData =
            result?.user ||
            result?.data?.user ||
            result?.data ||
            {};

          const directType =
            userData?.role ||
            userData?.account_type ||
            result?.role ||
            result?.account_type ||
            result?.data?.role ||
            result?.data?.account_type ||
            null;

          const selectedAccountType = await resolveUserAccountType(token, directType);

          const resolvedUser = {
            name:
              userData?.name ||
              (userData?.first_name ? `${userData.first_name} ${userData.last_name || ""}`.trim() : null) ||
              "User",
            email:
              userData?.email ||
              result?.email ||
              result?.data?.email ||
              "oauth.user@example.com",
            role: selectedAccountType || null,
            avatar: (userData?.name || userData?.first_name || "U").charAt(0).toUpperCase(),
            two_factor_enabled: Boolean(userData?.two_factor_enabled ?? result?.two_factor_enabled),
          };

          if (selectedAccountType && !result?.requires_account_type && !result?.needs_account_type) {
            // Existing member with role: log in with their actual role and open their role dashboard
            await login(resolvedUser, token, selectedAccountType, refreshToken, expiresIn);
            prefetchPostLogin(selectedAccountType);
            navigate(resolveDashboardPath(selectedAccountType), { replace: true });
          } else {
            // New user without role: do not default to any role, prompt account type selection
            await login(resolvedUser, token, null, refreshToken, expiresIn);
            navigate("/account-type", { replace: true, state: { email: resolvedUser.email } });
          }
          return;
        }

        // Only if NO access token was generated, check for 2FA temporary challenge
        const tempToken =
          result?.temporary_token ||
          result?.temporaryToken ||
          result?.data?.temporary_token ||
          result?.data?.temporaryToken;

        const is2fa =
          Boolean(result?.requires_2fa) ||
          Boolean(result?.requires_two_factor) ||
          Boolean(result?.two_factor_required);

        if ((is2fa || tempToken) && tempToken) {
          const userEmail =
            result?.email ||
            result?.user?.email ||
            result?.data?.email ||
            result?.data?.user?.email ||
            searchParams.get("email") ||
            "";
          sessionStorage.setItem(
            APP_CONFIG.AUTH.STORAGE_KEYS.TWO_FA_CHALLENGE,
            JSON.stringify({
              temporaryToken: tempToken,
              email: userEmail,
            })
          );
          navigate("/verify-2fa", {
            replace: true,
            state: {
              temporary_token: tempToken,
              email: userEmail,
            },
          });
          return;
        }

        prefetchPostLogin();
        navigate("/login", { replace: true });
      } catch (err) {
        // Only if request failed with an error, check if 2FA temporary token was returned in error response
        const errData = err?.data || err?.response?.data;
        const errTempToken =
          errData?.temporary_token ||
          errData?.temporaryToken ||
          errData?.data?.temporary_token;
        const isErr2fa =
          Boolean(errData?.requires_2fa) ||
          Boolean(errData?.requires_two_factor) ||
          Boolean(errData?.two_factor_required);

        if (isErr2fa && errTempToken) {
          const userEmail = errData?.email || errData?.user?.email || "";
          sessionStorage.setItem(
            APP_CONFIG.AUTH.STORAGE_KEYS.TWO_FA_CHALLENGE,
            JSON.stringify({
              temporaryToken: errTempToken,
              email: userEmail,
            })
          );
          navigate("/verify-2fa", {
            replace: true,
            state: {
              temporary_token: errTempToken,
              email: userEmail,
            },
          });
          return;
        }

        console.error("OAuth callback error:", err?.message || "Authentication failed");
        setError(err.message || STRINGS.DEFAULT_ERROR);
      }
    }

    if (code) {
      processOAuth();
    } else if (directToken) {
      // Direct token redirect fallback: always take the generated token
      async function handleDirectToken() {
        const refreshToken = searchParams.get("refresh_token") || searchParams.get("refreshToken");
        const directRole = searchParams.get("role") || searchParams.get("account_type");
        const selectedAccountType = await resolveUserAccountType(directToken, directRole);
        const jwtPayload = decodeJwtPayload(directToken);
        const resolvedEmail =
          searchParams.get("email") ||
          jwtPayload?.email ||
          "oauth.user@example.com";
        const resolvedName =
          searchParams.get("name") ||
          jwtPayload?.name ||
          "User";

        const resolvedUser = {
          name: resolvedName,
          email: resolvedEmail,
          role: selectedAccountType || null,
          avatar: resolvedName.charAt(0).toUpperCase(),
        };

        if (selectedAccountType) {
          await login(resolvedUser, directToken, selectedAccountType, refreshToken);
          prefetchPostLogin(selectedAccountType);
          navigate(resolveDashboardPath(selectedAccountType), { replace: true });
        } else {
          await login(resolvedUser, directToken, null, refreshToken);
          navigate("/account-type", { replace: true, state: { email: resolvedEmail } });
        }
      }
      handleDirectToken();
    } else {
      // Direct 2FA query param only if no token was generated
      const queryTempToken =
        searchParams.get("temporary_token") ||
        searchParams.get("temporaryToken") ||
        searchParams.get("temp_token");

      if (queryTempToken) {
        const email = searchParams.get("email") || "";
        sessionStorage.setItem(
          APP_CONFIG.AUTH.STORAGE_KEYS.TWO_FA_CHALLENGE,
          JSON.stringify({
            temporaryToken: queryTempToken,
            email,
          })
        );
        navigate("/verify-2fa", {
          replace: true,
          state: {
            temporary_token: queryTempToken,
            email,
          },
        });
        return;
      }

      navigate("/login", { replace: true });
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
