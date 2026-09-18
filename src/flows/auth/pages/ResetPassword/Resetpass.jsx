import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Lock, Eye, EyeOff } from "@/Components/icons";
import Icon from "@/Components/icons/Icon";
import TickIcon from "@/assets/tick.png";
import "./resetpass.css";
import {
  AuthHomeScreen,
  BrandLogo,
  SignupCard,
} from "@/Components";
import authApi from "@/features/auth/api/authApi";
import { APP_STRINGS, FORM_ERRORS } from "@/constants/string";

export default function ResetPass() {
  const STRINGS = APP_STRINGS.AUTH.RESET_PASSWORD;
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrorMessage("");

    if (newPassword.length < 8) {
      setErrorMessage(FORM_ERRORS.AUTH.PASSWORD_MIN_LENGTH);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage(FORM_ERRORS.AUTH.PASSWORDS_MUST_MATCH);
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword({ token, new_password: newPassword });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Reset password error:", err);
      setErrorMessage(err?.message || FORM_ERRORS.AUTH.RESET_FAILED);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resetpass-page">
      <AuthHomeScreen />

      <div className="auth-card-wrapper">
        <SignupCard className={isSubmitted ? "success-state-card" : ""}>
          <div style={isSubmitted ? { display: 'flex', justifyContent: 'center', width: '100%' } : {}}>
            <BrandLogo />
          </div>

          {!isSubmitted && (
            <>
              <h2>{STRINGS.TITLE}</h2>
              <p className="subtitle">
                {STRINGS.SUBTITLE_LINE1}
                <br />
                {STRINGS.SUBTITLE_LINE2}
              </p>
            </>
          )}

          {errorMessage && (
            <div
              style={{
                padding: "8px 12px",
                marginBottom: "12px",
                borderRadius: "6px",
                backgroundColor: "#fee2e2",
                color: "#b91c1c",
                fontSize: "12px",
              }}
            >
              {errorMessage}
            </div>
          )}

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <label htmlFor="new-password" style={{ fontWeight: 700, fontSize: '13px', color: '#111827', display: 'block', margin: '6px 0 5px 0' }}>{STRINGS.NEW_PASSWORD_LABEL}</label>
              <div className="input-group rounded-3 overflow-hidden bg-white" style={{ marginBottom: '12px', border: '1px solid #B3B3B3' }}>
                <span className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center" style={{ padding: '0 10px', minWidth: '36px' }}>
                  <Lock width={16} height={16} />
                </span>
                <input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  className="form-control border-0 shadow-none bg-white"
                  placeholder={STRINGS.NEW_PASSWORD_PLACEHOLDER}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  style={{ fontSize: '13px', padding: '8px 10px 8px 0' }}
                />
                <button
                  type="button"
                  className="input-group-text bg-white border-0 btn shadow-none d-flex align-items-center justify-content-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{ padding: '0 10px' }}
                >
                  {showNewPassword ? <Eye width={16} height={16} /> : <EyeOff width={16} height={16} />}
                </button>
              </div>

              <label htmlFor="confirm-password" style={{ fontWeight: 700, fontSize: '13px', color: '#111827', display: 'block', margin: '6px 0 5px 0' }}>{STRINGS.CONFIRM_PASSWORD_LABEL}</label>
              <div className="input-group rounded-3 overflow-hidden bg-white" style={{ marginBottom: '12px', border: '1px solid #B3B3B3' }}>
                <span className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center" style={{ padding: '0 10px', minWidth: '36px' }}>
                  <Lock width={16} height={16} />
                </span>
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control border-0 shadow-none bg-white"
                  placeholder={STRINGS.CONFIRM_PASSWORD_PLACEHOLDER}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{ fontSize: '13px', padding: '8px 10px 8px 0' }}
                />
                <button
                  type="button"
                  className="input-group-text bg-white border-0 btn shadow-none d-flex align-items-center justify-content-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ padding: '0 10px' }}
                >
                  {showConfirmPassword ? <Eye width={16} height={16} /> : <EyeOff width={16} height={16} />}
                </button>
              </div>

              <div className="password-rules">
                <div className={`rule ${newPassword.length >= 8 ? "valid" : ""}`}>
                  <Icon name="Check" size={12} className="rule-icon" />
                  <span>{STRINGS.RULES.MIN_LENGTH}</span>
                </div>
                <div className={`rule ${/[A-Z]/.test(newPassword) ? "valid" : ""}`}>
                  <Icon name="Check" size={12} className="rule-icon" />
                  <span>{STRINGS.RULES.UPPERCASE}</span>
                </div>
                <div className={`rule ${/[0-9]/.test(newPassword) ? "valid" : ""}`}>
                  <Icon name="Check" size={12} className="rule-icon" />
                  <span>{STRINGS.RULES.NUMBER}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn auth-primary-btn reset-btn"
              >
                {loading ? STRINGS.SUBMIT_BTN_LOADING : STRINGS.SUBMIT_BTN}
              </button>

              <div className="back-to-login">
                <Link to="/login" className="back-link">
                  {STRINGS.BACK_TO_LOGIN}
                </Link>
              </div>
            </form>
          ) : (
            <div className="success-state">
              <div className="tick-circle">
                <img src={TickIcon} alt="Success" className="tick-icon-img" />
              </div>

              <h3>{STRINGS.SUCCESS.TITLE}</h3>

              <p className="success-subtitle">
                {STRINGS.SUCCESS.SUBTITLE_LINE1}
                <br />
                {STRINGS.SUCCESS.SUBTITLE_LINE2}
              </p>

              <Link to="/login" className="btn auth-primary-btn continue-btn">
                {STRINGS.SUCCESS.CONTINUE_BTN}
              </Link>

              <div className="back-to-login">
                <Link to="/login" className="back-link">
                  {STRINGS.BACK_TO_LOGIN}
                </Link>
              </div>
            </div>
          )}
        </SignupCard>
      </div>
    </div>
  );
}
