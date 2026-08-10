import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Eye, EyeOff } from "../../../Components/icons";
import Icon from "../../../Components/icons/Icon";
import TickIcon from "../../../assets/tick.png";
import "./resetpass.css";
import {
  AuthHomeScreen,
  BrandLogo,
  SignupCard,
} from "../../../Components";

export default function ResetPass() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    console.log("Password reset:", { newPassword, confirmPassword });
    setIsSubmitted(true);
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

          {!isSubmitted ? (
            <>
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

              <button
                type="button"
                onClick={handleSubmit}
                className="btn auth-primary-btn w-100"
              >
                Reset Password
              </button>

              <p className="back-to-login">
                <Link to="/login" style={{ gap: "8px" }}>
                  <Icon name="ArrowLeft" size={20} color="#033E8A" />
                  Back to log in
                </Link>
              </p>
            </>
          ) : (
            <>
              <div className="success-icon" style={{ display: 'flex', justifyContent: 'center', margin: '0' }}>
                <img src={TickIcon} alt="Success" width="80" height="80" />
              </div>

              <h2 style={{ textAlign: 'center', fontSize: '20px', fontWeight: '700', color: '#000', marginBottom: '0px' }}>
                Password reset successful !
              </h2>

              <p className="success-message" style={{ textAlign: 'center', fontSize: '13px', color: '#333', marginBottom: '12px', marginTop: '4px' }}>
                Your password has been updated<br />successfully.
              </p>

              <Link to="/login" style={{ textDecoration: 'none', width: '100%', display: 'block' }}>
                <button
                  type="button"
                  className="btn auth-primary-btn w-100"
                >
                  Continue to Log in
                </button>
              </Link>

              <p className="back-to-login" style={{ textAlign: 'center', marginTop: '10px' }}>
                <Link to="/" style={{ color: '#103CA4', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}>
                  Back to Home
                </Link>
              </p>
            </>
          )}
        </SignupCard>
      </div>
    </div>
  );
}
