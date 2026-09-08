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

export default function ResetPass() {
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
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword({ token, new_password: newPassword });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Reset password error:", err);
      setErrorMessage(err?.message || "Failed to reset password. Link may be invalid or expired.");
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
              <h2>Reset Your Password</h2>
              <p className="subtitle">
                Enter your new password below.
                <br />
                Make sure it's strong and unique.
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
              <label htmlFor="new-password" style={{ fontWeight: 700, fontSize: '13px', color: '#111827', display: 'block', margin: '6px 0 5px 0' }}>New Password</label>
              <div className="input-group rounded-3 overflow-hidden bg-white" style={{ marginBottom: '12px', border: '1px solid #B3B3B3' }}>
                <span className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center" style={{ padding: '0 10px', minWidth: '36px' }}>
                  <Lock width={16} height={16} />
                </span>
                <input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  className="form-control border-0 shadow-none bg-white"
                  placeholder="Enter new password"
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

              <label htmlFor="confirm-password" style={{ fontWeight: 700, fontSize: '13px', color: '#111827', display: 'block', margin: '6px 0 5px 0' }}>Confirm Password</label>
              <div className="input-group rounded-3 overflow-hidden bg-white" style={{ marginBottom: '12px', border: '1px solid #B3B3B3' }}>
                <span className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center" style={{ padding: '0 10px', minWidth: '36px' }}>
                  <Lock width={16} height={16} />
                </span>
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control border-0 shadow-none bg-white"
                  placeholder="Confirm new password"
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
                  <span>Must be at least 8 characters</span>
                </div>
                <div className={`rule ${/[A-Z]/.test(newPassword) ? "valid" : ""}`}>
                  <Icon name="Check" size={12} className="rule-icon" />
                  <span>Must contain an uppercase letter</span>
                </div>
                <div className={`rule ${/[0-9]/.test(newPassword) ? "valid" : ""}`}>
                  <Icon name="Check" size={12} className="rule-icon" />
                  <span>Must contain a number</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn auth-primary-btn reset-btn"
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>

              <div className="back-to-login">
                <Link to="/login" className="back-link">
                  Back to log in
                </Link>
              </div>
            </form>
          ) : (
            <div className="success-state">
              <div className="tick-circle">
                <img src={TickIcon} alt="Success" className="tick-icon-img" />
              </div>

              <h3>Password reset</h3>

              <p className="success-subtitle">
                Your password has been successfully reset.
                <br />
                Click below to log in.
              </p>

              <Link to="/login" className="btn auth-primary-btn continue-btn">
                Continue
              </Link>

              <div className="back-to-login">
                <Link to="/login" className="back-link">
                  Back to log in
                </Link>
              </div>
            </div>
          )}
        </SignupCard>
      </div>
    </div>
  );
}
