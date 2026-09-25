import { useCallback, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BrandLogo, OtpInput, PrimaryButton } from "@/Components";
import { Check } from "@/Components/icons";
import twoFaApi from "@/features/auth/api/twoFaApi";
import profileApi from "@/features/profile/api/profileApi";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store";
import {
  APP_STRINGS,
  APP_CONFIG,
  FORM_ERRORS,
  TOAST_MESSAGES,
} from "@/constants/string";
import { AUTH_ROUTES } from "@/constants/navigation";
import { ROLES } from "@/permissions/roles";
import authBg from "@/assets/img1.png";
import "./TwoFactor.css";

const { AUTHENTICATOR, RECOVERY } = APP_CONFIG.AUTH.TWO_FA_CODE_LENGTHS;
const CHALLENGE_KEY = APP_CONFIG.AUTH.STORAGE_KEYS.TWO_FA_CHALLENGE;

const MODES = {
  AUTHENTICATOR: "authenticator",
  RECOVERY: "recovery",
};

const initialState = {
  mode: MODES.AUTHENTICATOR,
  code: Array(AUTHENTICATOR).fill(""),
  error: false,
  errorMessage: "",
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_MODE":
      return {
        ...state,
        mode: action.mode,
        code: Array(
          action.mode === MODES.RECOVERY ? RECOVERY : AUTHENTICATOR
        ).fill(""),
        error: false,
        errorMessage: "",
      };
    case "SET_CODE":
      return { ...state, code: action.code, error: false, errorMessage: "" };
    case "SUBMIT_START":
      return { ...state, loading: true, error: false, errorMessage: "" };
    case "SUBMIT_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.message,
        code: Array(state.code.length).fill(""),
      };
    case "SUBMIT_END":
      return { ...state, loading: false };
    default:
      return state;
  }
}

function readChallenge(locationState) {
  const fromState = locationState?.temporary_token
    ? {
        temporaryToken: locationState.temporary_token,
        email: locationState.email ?? "",
      }
    : null;
  if (fromState) return fromState;
  try {
    const raw = sessionStorage.getItem(CHALLENGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.temporaryToken) return null;
    return { temporaryToken: parsed.temporaryToken, email: parsed.email ?? "" };
  } catch {
    return null;
  }
}

function deriveDisplayName(cleanEmail) {
  if (!cleanEmail) return "there";
  return cleanEmail
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function resolveDashboardPath(role) {
  if (role === ROLES.CLIENT) return "/client-quest-board";
  if (role === ROLES.AGENCY) return "/agency/dashboard";
  return "/dashboard";
}

// Login-time 2FA challenge (Figma "for 6- digit code" / "for 8 digit code").
// Reached from Login when the backend answers with requires_2fa /
// temporary_token. Authenticator mode takes a 6-digit TOTP; recovery mode
// takes the exact 9-char backup code (e.g. "Zpp_-Sf2s" — mixed case, may
// contain "_" and "-") across 9 boxes with NO transforms: the dash is
// data, not a separator, so nothing is uppercased, stripped, or inserted.
export default function TwoFactor() {
  const dispatch = useDispatch();
  const STRINGS = APP_STRINGS.AUTH.TWO_FACTOR;
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [state, stateDispatch] = useReducer(reducer, initialState);
  const { mode, code, error, errorMessage, loading } = state;

  const challenge = readChallenge(location.state);
  const isRecovery = mode === MODES.RECOVERY;
  const codeLength = isRecovery ? RECOVERY : AUTHENTICATOR;

  // A challenge token is required — without one this page cannot verify
  // anything, so bounce back to login instead of rendering a dead form.
  useEffect(() => {
    if (!challenge) {
      dispatch(
        showSnackbar({
          message: TOAST_MESSAGES.AUTH.TWO_FA_CHALLENGE_MISSING,
          type: "error",
        })
      );
      navigate(AUTH_ROUTES.LOGIN, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fail = useCallback(
    (message) => {
      stateDispatch({ type: "SUBMIT_ERROR", message });
      dispatch(showSnackbar({ message, type: "error" }));
    },
    [dispatch]
  );

  const handleVerify = useCallback(async () => {
    if (!challenge) return;
    const joined = code.join("");
    if (joined.length !== codeLength) {
      fail(FORM_ERRORS.AUTH.TWO_FA_INCOMPLETE);
      return;
    }

    stateDispatch({ type: "SUBMIT_START" });
    try {
      const response =
        mode === MODES.RECOVERY
          ? await twoFaApi.verifyRecoveryCode({
              temporary_token: challenge.temporaryToken,
              code: joined,
            })
          : await twoFaApi.verifyLogin({
              temporary_token: challenge.temporaryToken,
              code: joined,
            });

      const token = response?.access_token ?? response?.token;
      if (!token) {
        throw new Error(response?.message || "Verification failed: no session returned.");
      }

      const cleanEmail = (challenge.email || response?.user?.email || "")
        .trim()
        .toLowerCase();
      const resolvedName =
        response?.user?.name ?? deriveDisplayName(cleanEmail);

      // Role comes from the verify payload when present, otherwise probe
      // the profile (token passed explicitly), defaulting to individual.
      let role = response?.user?.account_type ?? ROLES.INDIVIDUAL;
      if (!response?.user?.account_type) {
        try {
          const profileRes = await profileApi.getProfile({ token });
          if (profileRes?.account_type) role = profileRes.account_type;
        } catch {
          // Fallback to individual when profile is unreachable.
        }
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
      sessionStorage.removeItem(CHALLENGE_KEY);

      dispatch(
        showSnackbar({
          message: TOAST_MESSAGES.AUTH.TWO_FA_SUCCESS,
          type: "success",
        })
      );
      navigate(resolveDashboardPath(role), { replace: true });
    } catch (err) {
      fail(err?.message || FORM_ERRORS.AUTH.TWO_FA_FAILED);
    } finally {
      stateDispatch({ type: "SUBMIT_END" });
    }
  }, [challenge, code, codeLength, mode, login, navigate, dispatch, fail]);

  const canSubmit = code.join("").length === codeLength && !loading;

  if (!challenge) return null;

  return (
    <div
      className="twofa-page"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <div className="twofa-brand">
        <BrandLogo />
      </div>

      <main className="twofa-card-wrap">
        <section
          className={`twofa-card${isRecovery ? " twofa-card--wide" : ""}`}
          aria-labelledby="twofa-title"
        >
          <h2 id="twofa-title" className="twofa-title">
            {STRINGS.TITLE}
          </h2>
          <p className="twofa-subtitle">
            {mode === MODES.RECOVERY
              ? STRINGS.SUBTITLE_RECOVERY
              : STRINGS.SUBTITLE_AUTHENTICATOR}
          </p>

          {errorMessage && (
            <div className="twofa-error" role="alert" aria-live="assertive">
              {errorMessage}
            </div>
          )}

          <div className="twofa-code-block">
            <div className={`twofa-otp${isRecovery ? " twofa-otp--rec" : ""}`}>
              <OtpInput
                values={code}
                onChange={(next) =>
                  stateDispatch({ type: "SET_CODE", code: next })
                }
                length={codeLength}
                separator={!isRecovery}
                inputMode={isRecovery ? "text" : "numeric"}
                acceptPattern={isRecovery ? "[A-Za-z0-9_-]" : "\\d"}
                error={error}
                onEnter={handleVerify}
                autoFocus
              />
            </div>

            <div
              className="twofa-options"
              role="radiogroup"
              aria-label="Verification code source"
            >
              <label className="twofa-option">
                <input
                  type="radio"
                  name="twofa-mode"
                  value={MODES.AUTHENTICATOR}
                  checked={mode === MODES.AUTHENTICATOR}
                  onChange={() =>
                    stateDispatch({
                      type: "SET_MODE",
  mode: MODES.AUTHENTICATOR,
                    })
                  }
                  disabled={loading}
                  className="twofa-option-input"
                />
                <span className="twofa-checkbox" aria-hidden="true">
                  {mode === MODES.AUTHENTICATOR && (
                    <Check width={14} height={14} />
                  )}
                </span>
                <span className="twofa-option-label">
                  {STRINGS.AUTHENTICATOR_OPTION}
                </span>
              </label>

              <label className="twofa-option">
                <input
                  type="radio"
                  name="twofa-mode"
                  value={MODES.RECOVERY}
                  checked={mode === MODES.RECOVERY}
                  onChange={() =>
                    stateDispatch({ type: "SET_MODE", mode: MODES.RECOVERY })
                  }
                  disabled={loading}
                  className="twofa-option-input"
                />
                <span className="twofa-checkbox" aria-hidden="true">
                  {mode === MODES.RECOVERY && <Check width={14} height={14} />}
                </span>
                <span className="twofa-option-label">
                  {STRINGS.RECOVERY_OPTION}
                </span>
              </label>
            </div>
          </div>

          <PrimaryButton
            type="button"
            className="twofa-submit"
            text={loading ? STRINGS.SUBMIT_BTN_LOADING : STRINGS.SUBMIT_BTN}
            onClick={handleVerify}
            disabled={!canSubmit}
          />
        </section>
      </main>
    </div>
  );
}
