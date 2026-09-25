import { useReducer } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowLeft, Check } from "@/Components/icons";
import "./resetpass.css";
import {
  AuthHomeScreen,
  BrandLogo,
  SignupCard,
} from "@/Components";
import authApi from "@/features/auth/api/authApi";
import { APP_STRINGS, FORM_ERRORS } from "@/constants/string";

const initialState = {
  newPassword: "",
  confirmPassword: "",
  showNewPassword: false,
  showConfirmPassword: false,
  loading: false,
  errorMessage: "",
  isSubmitted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "FIELD":
      return { ...state, [action.field]: action.value, errorMessage: "" };
    case "TOGGLE":
      return { ...state, [action.field]: !state[action.field] };
    case "SUBMIT_START":
      return { ...state, loading: true, errorMessage: "" };
    case "SUBMIT_SUCCESS":
      // Clear sensitive fields — passwords must not linger in state.
      return { ...state, loading: false, isSubmitted: true, newPassword: "", confirmPassword: "" };
    case "SUBMIT_ERROR":
      return { ...state, loading: false, errorMessage: action.error };
    default:
      return state;
  }
}

export default function ResetPass() {
  const STRINGS = APP_STRINGS.AUTH.RESET_PASSWORD;
  const [searchParams] = useSearchParams();
  const token = (searchParams.get("token") || "").trim();
  const hasToken = token.length > 0;

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    newPassword,
    confirmPassword,
    showNewPassword,
    showConfirmPassword,
    loading,
    errorMessage,
    isSubmitted,
  } = state;

  const setField = (field) => (e) =>
    dispatch({ type: "FIELD", field, value: e.target.value });

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (loading) return;

    if (!hasToken) {
      dispatch({ type: "SUBMIT_ERROR", error: FORM_ERRORS.AUTH.RESET_FAILED });
      return;
    }

    if (newPassword.length < 8) {
      dispatch({ type: "SUBMIT_ERROR", error: FORM_ERRORS.AUTH.PASSWORD_MIN_LENGTH });
      return;
    }

    if (newPassword !== confirmPassword) {
      dispatch({ type: "SUBMIT_ERROR", error: FORM_ERRORS.AUTH.PASSWORDS_MUST_MATCH });
      return;
    }

    dispatch({ type: "SUBMIT_START" });
    try {
      await authApi.resetPassword({ token, new_password: newPassword });
      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch (err) {
      dispatch({
        type: "SUBMIT_ERROR",
        error: err?.message || FORM_ERRORS.AUTH.RESET_FAILED,
      });
    }
  };

  const showError = errorMessage || (!hasToken && !isSubmitted)
    ? errorMessage || FORM_ERRORS.AUTH.RESET_FAILED
    : "";

  return (
    <div className="resetpass-page">
      <AuthHomeScreen />

      <div className="auth-card-wrapper">
        <SignupCard className={isSubmitted ? "reset-success-state" : ""}>
          <div className="reset-content">
            <div className={`reset-logo-row${isSubmitted ? " center" : ""}`}>
              <BrandLogo />
            </div>

            {!isSubmitted ? (
              <>
                <h2 className="reset-title">{STRINGS.TITLE}</h2>
                <p className="reset-subtitle">
                  {STRINGS.SUBTITLE_LINE1}
                  <br />
                  {STRINGS.SUBTITLE_LINE2}
                </p>

                {showError && (
                  <div className="reset-error" role="alert">
                    {showError}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="reset-form">
                  <label className="reset-label" htmlFor="new-password">
                    {STRINGS.NEW_PASSWORD_LABEL}
                  </label>
                  <div className="input-group reset-input-group">
                    <span className="input-group-text reset-input-addon">
                      <Lock width={16} height={16} />
                    </span>
                    <input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      className="form-control border-0 shadow-none bg-white"
                      placeholder={STRINGS.NEW_PASSWORD_PLACEHOLDER}
                      value={newPassword}
                      onChange={setField("newPassword")}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="input-group-text reset-input-toggle"
                      onClick={() => dispatch({ type: "TOGGLE", field: "showNewPassword" })}
                      aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                    >
                      {showNewPassword ? <Eye width={16} height={16} /> : <EyeOff width={16} height={16} />}
                    </button>
                  </div>

                  <label className="reset-label" htmlFor="confirm-password">
                    {STRINGS.CONFIRM_PASSWORD_LABEL}
                  </label>
                  <div className="input-group reset-input-group">
                    <span className="input-group-text reset-input-addon">
                      <Lock width={16} height={16} />
                    </span>
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control border-0 shadow-none bg-white"
                      placeholder={STRINGS.CONFIRM_PASSWORD_PLACEHOLDER}
                      value={confirmPassword}
                      onChange={setField("confirmPassword")}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="input-group-text reset-input-toggle"
                      onClick={() => dispatch({ type: "TOGGLE", field: "showConfirmPassword" })}
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                      {showConfirmPassword ? <Eye width={16} height={16} /> : <EyeOff width={16} height={16} />}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !hasToken}
                    className="btn auth-primary-btn reset-submit"
                  >
                    {loading ? STRINGS.SUBMIT_BTN_LOADING : STRINGS.SUBMIT_BTN}
                  </button>

                  <div className="reset-back-row">
                    <ArrowLeft width={24} height={24} className="reset-back-icon" />
                    <Link to="/login" className="reset-back-link">
                      {STRINGS.BACK_TO_LOGIN}
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <div className="reset-success-body">
                <div className="reset-success-badge" aria-hidden="true">
                  <Check width={52} height={52} />
                </div>

                <h2 className="reset-success-title">{STRINGS.SUCCESS.TITLE}</h2>

                <p className="reset-success-desc">
                  {STRINGS.SUCCESS.DESC}
                </p>

                <Link to="/login" className="btn auth-primary-btn reset-submit reset-success-btn">
                  {STRINGS.SUCCESS.CONTINUE_BTN}
                </Link>

                <div className="reset-success-home">
                  <Link to="/home" className="reset-home-link">
                    {STRINGS.SUCCESS.BACK_HOME}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </SignupCard>
      </div>
    </div>
  );
}
