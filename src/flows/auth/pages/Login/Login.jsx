// [TechGuild Update: 30-09-2026] Prefetch post-login chunks + shell bg while user types / on success (no visual change).
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Google, GitHub, Mail, Lock, Eye, EyeOff } from "@/Components/icons";
import "./login.css";
import {
  AuthHomeScreen,
  BrandLogo,
  SignupCard,
  SocialButton,
  Divider,
  TextInput,
  PrimaryButton,
} from "@/Components";
import { authApi } from "@/services/api";
import { oauthApi } from "@/services/api";
import { profileApi } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store";
import { APP_STRINGS, APP_CONFIG, TOAST_MESSAGES, FORM_ERRORS } from "@/constants/string";
import { ROLES } from "@/permissions/roles";
import { prefetchOnPublicPage, prefetchPostLogin } from "@/app/prefetch";

const REMEMBERED_EMAIL_KEY = "techguild_remembered_email";
const PENDING_USER_KEY = "techguild_pending_user";

const initialFormState = {
  email: "",
  password: "",
  rememberMe: false,
  showPassword: false,
  loading: false,
  errorMessage: "",
  fieldErrors: { email: "", password: "" },
};

function formReducer(state, action) {
  switch (action.type) {
    case "CHANGE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errorMessage: "",
        fieldErrors: { ...state.fieldErrors, [action.field]: "" },
      };
    case "TOGGLE_SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    case "TOGGLE_REMEMBER":
      return { ...state, rememberMe: !state.rememberMe };
    case "HYDRATE_REMEMBERED":
      return {
        ...state,
        email: action.email,
        rememberMe: true,
      };
    case "SUBMIT_START":
      return { ...state, loading: true, errorMessage: "" };
    case "SUBMIT_ERROR":
      return {
        ...state,
        loading: false,
        errorMessage: action.message,
        fieldErrors: action.fieldErrors ?? state.fieldErrors,
      };
    case "SUBMIT_END":
      return { ...state, loading: false };
    default:
      return state;
  }
}

function readPendingName(cleanEmail) {
  try {
    const raw = localStorage.getItem(PENDING_USER_KEY);
    if (!raw) return null;
    const pendingUser = JSON.parse(raw);
    if (
      pendingUser?.email?.toLowerCase() === cleanEmail.toLowerCase() &&
      pendingUser?.name
    ) {
      return pendingUser.name;
    }
    return null;
  } catch {
    return null;
  }
}

function deriveDisplayName(cleanEmail) {
  return (
    readPendingName(cleanEmail) ??
    cleanEmail
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
  );
}

function resolveDashboardPath(role) {
  if (role === ROLES.CLIENT || role === "client" || role === "client_admin" || role === "client_member") return "/client-dashboard";
  if (role === ROLES.AGENCY || role === "agency" || role === "agency_admin") return "/agency/dashboard";
  if (role === ROLES.INDIVIDUAL || role === "individual") return "/dashboard";
  return "/account-type";
}

export default function Login() {
  const dispatch = useDispatch();
  const STRINGS = APP_STRINGS.AUTH.LOGIN;

  const [state, formDispatch] = useReducer(formReducer, initialFormState);
  const { email, password, rememberMe, showPassword, loading, errorMessage, fieldErrors } = state;

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTimer = useRef(null);

  // Display OAuth redirect error if returned from provider callback
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      let friendlyMsg = "Authentication failed. Please try again.";
      if (errorParam === "oauth_exchange_failed") {
        friendlyMsg = "Social login authorization failed. Please try again.";
      } else if (errorParam === "invalid_state") {
        friendlyMsg = "Authentication session expired or invalid. Please try again.";
      } else if (errorParam === "missing_code" || errorParam === "missing_state") {
        friendlyMsg = "Authentication was interrupted. Please try again.";
      } else if (errorParam === "email_not_verified") {
        friendlyMsg = "Your social account's primary email address is not verified.";
      } else if (errorParam === "login_failed") {
        friendlyMsg = "Account sign-in failed. Please try again.";
      }
      formDispatch({ type: "SUBMIT_ERROR", message: friendlyMsg });
      dispatch(showSnackbar({ message: friendlyMsg, type: "error" }));
    }
  }, [searchParams, dispatch]);

  // Restore remembered email (rememberMe now actually persists).
  // Also warm the post-login dashboard chunks + shell background while
  // the user types, so the first protected navigation is instant.
  useEffect(() => {
    prefetchOnPublicPage();
    const remembered = localStorage.getItem(REMEMBERED_EMAIL_KEY);
    if (remembered) {
      formDispatch({ type: "HYDRATE_REMEMBERED", email: remembered });
    }
    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, []);

  const setField = useCallback(
    (field) => (e) => formDispatch({ type: "CHANGE_FIELD", field, value: e.target.value }),
    []
  );

  const fail = useCallback(
    (message, fieldErrors) => {
      formDispatch({ type: "SUBMIT_ERROR", message, fieldErrors });
      dispatch(showSnackbar({ message, type: "error" }));
    },
    [dispatch]
  );

  const handleLogin = useCallback(
    async (e) => {
      e?.preventDefault();
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        fail(
          FORM_ERRORS.INVALID_EMAIL,
          { email: FORM_ERRORS.INVALID_EMAIL, password: "" }
        );
        return;
      }
      if (!password) {
        fail(
          FORM_ERRORS.AUTH.EMAIL_PASSWORD_REQUIRED,
          { email: "", password: FORM_ERRORS.REQUIRED }
        );
        return;
      }

      formDispatch({ type: "SUBMIT_START" });

      try {
        const response = await authApi.login({ email: cleanEmail, password });

        // 2FA challenge: the backend withholds the access token and issues a
        // temporary_token instead. Stash it (survives refresh) and hand off
        // to the /verify-2fa challenge page without creating a session.
        if (response?.requires_2fa || response?.temporary_token) {
          sessionStorage.setItem(
            APP_CONFIG.AUTH.STORAGE_KEYS.TWO_FA_CHALLENGE,
            JSON.stringify({
              temporaryToken: response.temporary_token,
              email: cleanEmail,
            })
          );
          navigate("/verify-2fa", {
            state: {
              temporary_token: response.temporary_token,
              email: cleanEmail,
            },
          });
          return;
        }

        const token = response?.access_token;

        if (!token) {
          throw new Error(response?.message || "Login failed: No access token returned.");
        }

        const resolvedName = deriveDisplayName(cleanEmail);

        // Resolve the user's selected account type without assuming a default role
        let role = response?.user?.account_type || response?.account_type || null;

        // 1. Probe points endpoint with explicit token (direct DB check for user.AccountType)
        if (!role) {
          try {
            const pointsRes = await profileApi.getPoints({ token });
            const resType = pointsRes?.account_type || pointsRes?.data?.account_type;
            if (resType && typeof resType === "string" && resType.trim()) {
              role = resType.trim();
            }
          } catch {
            // Ignore points failure, proceed to profile probe
          }
        }

        // 2. Probe profile endpoint with explicit token
        if (!role) {
          try {
            const profileRes = await profileApi.getProfile({ token });
            const resType =
              profileRes?.account_type ||
              profileRes?.data?.account_type ||
              (profileRes?.client || profileRes?.data?.client ? ROLES.CLIENT : null) ||
              (profileRes?.agency || profileRes?.data?.agency ? ROLES.AGENCY : null) ||
              (profileRes?.individual || profileRes?.data?.individual ? ROLES.INDIVIDUAL : null);
            if (resType && typeof resType === "string" && resType.trim()) {
              role = resType.trim();
            }
          } catch {
            // Fallback: profile unreachable or account type not yet selected
          }
        }

        await login(
          {
            email: cleanEmail,
            name: resolvedName,
            role: role || null,
            avatar: resolvedName.charAt(0).toUpperCase(),
          },
          token,
          role || null,
          response?.refresh_token,
          response?.expires_in
        );

        if (rememberMe) {
          localStorage.setItem(REMEMBERED_EMAIL_KEY, cleanEmail);
        } else {
          localStorage.removeItem(REMEMBERED_EMAIL_KEY);
        }

        dispatch(
          showSnackbar({
            message: TOAST_MESSAGES.AUTH.LOGIN_SUCCESS,
            type: "success",
          })
        );

        // If the user has not chosen an account type yet, navigate to account-type
        if (!role) {
          navigate("/account-type", { state: { email: cleanEmail } });
        } else {
          prefetchPostLogin(role);
          navigate(resolveDashboardPath(role));
        }
      } catch (err) {
        const errData = err?.data || err?.response?.data;
        if (errData?.requires_2fa || errData?.temporary_token) {
          const tempToken = errData.temporary_token || errData.temporaryToken;
          sessionStorage.setItem(
            APP_CONFIG.AUTH.STORAGE_KEYS.TWO_FA_CHALLENGE,
            JSON.stringify({
              temporaryToken: tempToken,
              email: cleanEmail,
            })
          );
          navigate("/verify-2fa", {
            state: {
              temporary_token: tempToken,
              email: cleanEmail,
            },
          });
          return;
        }

        const isUnverified =
          err?.status === 401 && err?.message?.toLowerCase().includes("verify your email");
        const msg = isUnverified
          ? TOAST_MESSAGES.AUTH.VERIFY_EMAIL_REQUIRED
          : err?.message || FORM_ERRORS.AUTH.INVALID_CREDENTIALS;
        fail(msg);

        if (isUnverified) {
          redirectTimer.current = setTimeout(() => {
            navigate("/verify-email", { state: { email: cleanEmail } });
          }, 1800);
        }
      } finally {
        formDispatch({ type: "SUBMIT_END" });
      }
    },
    [email, password, rememberMe, login, navigate, dispatch, fail]
  );

  const handleGoogleLogin = useCallback(() => {
    oauthApi.redirectToGoogle();
  }, []);

  const handleGithubLogin = useCallback(() => {
    oauthApi.redirectToGithub();
  }, []);

  const canSubmit = useMemo(
    () => email.trim().length > 0 && password.length > 0 && !loading,
    [email, password, loading]
  );

  return (
    <div className="login-page">
      <AuthHomeScreen />

      <div className="auth-card-wrapper">
        <SignupCard>
          <form onSubmit={handleLogin} className="login-form" noValidate>
            <BrandLogo />

            <h2 className="login-title">{STRINGS.TITLE}</h2>
            <p className="login-subtitle">{STRINGS.SUBTITLE}</p>

            {errorMessage && (
              <div className="login-error" role="alert" aria-live="assertive">
                <div>{errorMessage}</div>
                <div style={{ marginTop: "6px", fontSize: "13px", opacity: 0.95 }}>
                  Signed up with Google or need to set a password?{" "}
                  <Link
                    to="/forgot-password"
                    state={{ email }}
                    style={{ color: "inherit", fontWeight: 600, textDecoration: "underline" }}
                  >
                    Set or reset password
                  </Link>
                </div>
              </div>
            )}

            <div className="login-oauth-stack">
              <SocialButton
                text={STRINGS.GOOGLE_BTN}
                icon={<Google width={18} height={18} />}
                onClick={handleGoogleLogin}
                disabled={loading}
              />
              <SocialButton
                text={STRINGS.GITHUB_BTN}
                icon={<GitHub width={18} height={18} />}
                onClick={handleGithubLogin}
                disabled={loading}
              />
            </div>

            <div className="login-divider-wrap">
              <Divider text={STRINGS.DIVIDER_OR} />
            </div>

            <div className="login-fields">
              <label className="login-label" htmlFor="login-email">
                {STRINGS.EMAIL_LABEL}
              </label>
              <TextInput
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={STRINGS.EMAIL_PLACEHOLDER}
                aria-label={STRINGS.EMAIL_LABEL}
                value={email}
                onChange={setField("email")}
                required
                disabled={loading}
                error={fieldErrors.email}
                aria-invalid={Boolean(fieldErrors.email)}
                leftIcon={<Mail width={16} height={16} color="#6A717D" aria-hidden="true" />}
                containerClassName="login-textinput"
              />

              <label className="login-label" htmlFor="login-password">
                {STRINGS.PASSWORD_LABEL}
              </label>
              <TextInput
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={rememberMe ? "current-password" : "off"}
                placeholder={STRINGS.PASSWORD_PLACEHOLDER}
                aria-label={STRINGS.PASSWORD_LABEL}
                value={password}
                onChange={setField("password")}
                required
                disabled={loading}
                error={fieldErrors.password}
                aria-invalid={Boolean(fieldErrors.password)}
                leftIcon={<Lock width={16} height={16} aria-hidden="true" />}
                rightIcon={
                  <button
                    type="button"
                    className="login-eye-btn"
                    onClick={() => formDispatch({ type: "TOGGLE_SHOW_PASSWORD" })}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    disabled={loading}
                  >
                    {showPassword ? <Eye width={16} height={16} /> : <EyeOff width={16} height={16} />}
                  </button>
                }
                containerClassName="login-textinput"
              />

              <div className="login-options">
                <div className="login-remember">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => formDispatch({ type: "TOGGLE_REMEMBER" })}
                    className="cursor-pointer"
                    disabled={loading}
                  />
                  <label htmlFor="rememberMe" className="cursor-pointer">
                    {STRINGS.REMEMBER_ME}
                  </label>
                </div>
                <Link to="/forgot-password" state={{ email }} className="login-forgot">
                  {STRINGS.FORGOT_PASSWORD_LINK}
                </Link>
              </div>
            </div>

            <PrimaryButton
              type="submit"
              disabled={!canSubmit}
              className="login-submit"
              text={loading ? STRINGS.SUBMIT_BTN_LOADING : STRINGS.SUBMIT_BTN}
            />

            <p className="login-footer">
              {STRINGS.FOOTER_PROMPT}{" "}
              <Link to="/signup">{STRINGS.FOOTER_LINK}</Link>
            </p>
          </form>
        </SignupCard>
      </div>
    </div>
  );
}
