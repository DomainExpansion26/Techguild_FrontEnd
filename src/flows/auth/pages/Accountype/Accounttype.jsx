import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignupCard from "@/Components/SignupCard/SignupCard";
import { User, Building2, Briefcase, CircleCheck, Lock } from "@/Components/icons";
import img2 from "@/assets/img2.png";
import userIcon from "@/assets/icons/user.svg";
import "./Accounttype.css";
import authApi from "@/features/auth/api/authApi";
import { useAuth } from "@/context/AuthContext";
import { showSnackbar } from "@/store";
import { APP_STRINGS, TOAST_MESSAGES, FORM_ERRORS } from "@/constants/string";
import { ROLES } from "@/permissions/roles";

const PENDING_USER_KEY = "techguild_pending_user";

// First-run destinations (profile setup), matching TEMP_DEFAULT_ROUTE.
// Returning-user landing pages (/dashboard, /client-quest-board) live in Login.
function resolveOnboardingPath(accountType) {
  if (accountType === ROLES.CLIENT) return "/client-profile";
  if (accountType === ROLES.AGENCY) return "/agency/dashboard";
  return "/profile";
}

function loadPendingCredentials(routeState) {
  let pending;
  try {
    pending = JSON.parse(localStorage.getItem(PENDING_USER_KEY) || "{}");
  } catch {
    pending = {};
  }
  const email = routeState?.email || pending?.email || "";
  const password = routeState?.password || pending?.password || "";
  const firstName = routeState?.firstName || pending?.firstName || "";
  const lastName = routeState?.lastName || pending?.lastName || "";
  const fullName =
    firstName && lastName
      ? `${firstName} ${lastName}`.trim()
      : pending?.name || (email ? email.split("@")[0] : "User");
  return { email, password, firstName, lastName, fullName };
}

// Scrub the plaintext password Signup cached, keeping identity for display.
function scrubPendingPassword() {
  try {
    const raw = localStorage.getItem(PENDING_USER_KEY);
    if (!raw) return;
    const pending = JSON.parse(raw);
    delete pending.password;
    localStorage.setItem(PENDING_USER_KEY, JSON.stringify(pending));
  } catch {
    localStorage.removeItem(PENDING_USER_KEY);
  }
}

const initialSelectionState = { selected: "", loading: false, error: "" };

function selectionReducer(state, action) {
  switch (action.type) {
    case "SELECT":
      return { ...state, selected: action.id, error: "" };
    case "SUBMIT_START":
      return { ...state, loading: true, error: "" };
    case "SUBMIT_ERROR":
      return { ...state, loading: false, error: action.message };
    case "SUBMIT_END":
      return { ...state, loading: false };
    default:
      return state;
  }
}

export default function AccountType() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const [state, selectionDispatch] = useReducer(selectionReducer, initialSelectionState);
  const { selected, loading, error } = state;
  const redirectTimer = useRef(null);

  const STRINGS = APP_STRINGS.AUTH.ACCOUNT_TYPE;
  const BRAND = APP_STRINGS.AUTH.HOME_SCREEN;

  // Safe single read of the signup handoff (location.state wins over cache).
  const credentials = useMemo(
    () => loadPendingCredentials(location?.state),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const { email, password, firstName, lastName, fullName } = credentials;

  useEffect(
    () => () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    },
    []
  );

  const accountTypes = useMemo(
    () => [
      {
        id: STRINGS.TYPES.INDIVIDUAL.ID,
        title: STRINGS.TYPES.INDIVIDUAL.TITLE,
        icon: <User width={32} height={32} />,
        description: STRINGS.TYPES.INDIVIDUAL.DESCRIPTION,
        points: STRINGS.TYPES.INDIVIDUAL.POINTS,
      },
      {
        id: STRINGS.TYPES.AGENCY.ID,
        title: STRINGS.TYPES.AGENCY.TITLE,
        icon: <Building2 width={32} height={32} />,
        description: STRINGS.TYPES.AGENCY.DESCRIPTION,
        points: STRINGS.TYPES.AGENCY.POINTS,
      },
      {
        id: STRINGS.TYPES.CLIENT.ID,
        title: STRINGS.TYPES.CLIENT.TITLE,
        icon: <Briefcase width={32} height={32} />,
        description: STRINGS.TYPES.CLIENT.DESCRIPTION,
        points: STRINGS.TYPES.CLIENT.POINTS,
      },
    ],
    [STRINGS]
  );

  const fail = useCallback(
    (message) => {
      selectionDispatch({ type: "SUBMIT_ERROR", message });
      dispatch(showSnackbar({ message, type: "error" }));
    },
    [dispatch]
  );

  const handleContinue = useCallback(async () => {
    if (!selected || loading) return;

    // Account-type registration needs the signup credentials. Without them
    // (deep link / cleared storage) never navigate session-less: send back.
    if (!email || !password) {
      const msg = "Session expired. Please sign up again to choose an account type.";
      fail(msg);
      redirectTimer.current = setTimeout(() => navigate("/signup"), 1800);
      return;
    }

    selectionDispatch({ type: "SUBMIT_START" });

    try {
      // 1. Register account type on backend
      await authApi.registerAccountType({
        email,
        password,
        account_type: selected,
      });

      // 2. Log in with the same credentials to obtain a real JWT.
      // No rollback is possible server-side if this fails, so surface the
      // error and route to login instead of entering the app session-less.
      const loginRes = await authApi.login({ email, password });
      const realToken = loginRes?.access_token;
      if (!realToken) {
        throw new Error(loginRes?.message || FORM_ERRORS.AUTH.ACCOUNT_TYPE_FAILED);
      }

      await login(
        {
          email,
          name: fullName,
          role: selected,
          avatar: fullName.charAt(0).toUpperCase(),
        },
        realToken,
        selected
      );
      scrubPendingPassword();

      dispatch(
        showSnackbar({
          message: TOAST_MESSAGES.AUTH.WELCOME_ROLE(selected),
          type: "success",
        })
      );

      navigate(resolveOnboardingPath(selected));
    } catch (err) {
      const isUnverified =
        (err?.status === 400 || err?.status === 401) ||
        err?.message?.toLowerCase().includes("verify");
      const msg = isUnverified
        ? TOAST_MESSAGES.AUTH.VERIFY_EMAIL_REQUIRED
        : err?.message || FORM_ERRORS.AUTH.ACCOUNT_TYPE_FAILED;
      fail(msg);

      if (isUnverified) {
        redirectTimer.current = setTimeout(() => {
          navigate("/verify-email", {
            state: { email, firstName, lastName },
          });
        }, 1800);
      }
    } finally {
      selectionDispatch({ type: "SUBMIT_END" });
    }
  }, [selected, loading, email, password, firstName, lastName, fullName, login, navigate, dispatch, fail]);

  const selectedTitle = accountTypes.find((t) => t.id === selected)?.title ?? "";

  return (
    <div
      className="account-page"
      style={{ backgroundImage: `url(${img2})` }}
    >
      <header className="auth-header">
        <div className="auth-header-logo" onClick={() => navigate("/")}>
          <span className="logo-tech">{BRAND.BRAND_TECH}</span>
          <span className="logo-guild">{BRAND.BRAND_GUILD}</span>
        </div>
        <div className="auth-header-profile">
          <img src={userIcon} alt="Profile Icon" className="header-profile-icon" />
        </div>
      </header>

      <div className="overlay"></div>

      <SignupCard>
        <div className="account-container">
          <h2>{STRINGS.TITLE}</h2>

          <p className="subtitle">
            {STRINGS.SUBTITLE}
          </p>

          {error && (
            <div className="account-error" role="alert" aria-live="assertive">
              {error}
            </div>
          )}

          <div
            className="account-list"
            role="radiogroup"
            aria-label={STRINGS.TITLE}
          >
            {accountTypes.map((item) => {
              const isActive = selected === item.id;
              return (
                <div
                  key={item.id}
                  role="radio"
                  aria-checked={isActive}
                  aria-disabled={loading}
                  tabIndex={loading ? -1 : 0}
                  className={`account-card ${isActive ? "active" : ""}`}
                  onClick={() => {
                    if (!loading) selectionDispatch({ type: "SELECT", id: item.id });
                  }}
                  onKeyDown={(e) => {
                    if (!loading && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      selectionDispatch({ type: "SELECT", id: item.id });
                    }
                  }}
                >
                  <div className="account-icon" aria-hidden="true">{item.icon}</div>

                  <div className="account-info">
                    <h3>{item.title}</h3>

                    <p className="desc">{item.description}</p>

                    <ul aria-label={`${item.title} benefits`}>
                      {item.points.map((point, index) => (
                        <li key={index}>
                          <CircleCheck width={15} height={15} aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="radio" aria-hidden="true">
                    <div
                      className={`dot ${isActive ? "selected" : ""}`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="continue-btn"
            disabled={!selected || loading}
            onClick={handleContinue}
            aria-live="polite"
          >
            {loading
              ? STRINGS.PROCESSING_BTN
              : selected
                ? `${STRINGS.CONTINUE_BTN} as ${selectedTitle}`
                : STRINGS.CONTINUE_BTN}
          </button>

          <p className="account-trust-note">
            <Lock width={14} height={14} aria-hidden="true" />
            <span>Your information is safe and secure with us.</span>
          </p>
        </div>
      </SignupCard>
    </div>
  );
}
