import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import authApi from "@/features/auth/api/authApi";
import oauthApi from "@/features/auth/api/oauthApi";
import profileApi from "@/features/profile/api/profileApi";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store";
import { APP_STRINGS, APP_CONFIG, TOAST_MESSAGES, FORM_ERRORS } from "@/constants/string";
import { ROLES } from "@/permissions/roles";

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
  if (role === ROLES.CLIENT) return "/client-quest-board";
  if (role === ROLES.AGENCY) return "/agency/dashboard";
  return "/dashboard";
}

export default function Login() {
  const dispatch = useDispatch();
  const STRINGS = APP_STRINGS.AUTH.LOGIN;

  const [state, formDispatch] = useReducer(formReducer, initialFormState);
  const { email, password, rememberMe, showPassword, loading, errorMessage, fieldErrors } = state;

  const { login } = useAuth();
  const navigate = useNavigate();
  const redirectTimer = useRef(null);

  // Restore remembered email (rememberMe now actually persists).
  useEffect(() => {
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

        // Single write path: AuthContext.login persists token/user/role.
        // Probe profile first (token passed explicitly so apiClient doesn't
        // depend on storage ordering), defaulting to individual.
        let role = ROLES.INDIVIDUAL;
        try {
          const profileRes = await profileApi.getProfile({ token });
          if (profileRes?.account_type) {
            role = profileRes.account_type;
          }
        } catch {
          // Fallback to individual when profile is unreachable.
        }

        await login(
          {
            email: cleanEmail,
            name: resolvedName,
            role,
            avatar: resolvedName.charAt(0).toUpperCase(),
          },
          token,
          role
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

        navigate(resolveDashboardPath(role));
      } catch (err) {
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
                {errorMessage}
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
                <Link to="/forgot-password" className="login-forgot">
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
