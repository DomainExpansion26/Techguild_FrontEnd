import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SignupCard from "@/Components/SignupCard/SignupCard";
import { Check, Lock } from "@/Components/icons";
import img2 from "@/assets/img2.png";
import userIcon from "@/assets/icons/user.svg";
import mailImage from "@/assets/mail.png";
import "./Emailverify.css";
import authApi from "@/features/auth/api/authApi";

export default function EmailVerified() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isVerifying, setIsVerifying] = useState(Boolean(token));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (token) {
      async function verify() {
        try {
          await authApi.verifyEmail(token);
        } catch (err) {
          console.error("Verification error:", err);
          setErrorMessage(err?.message || "Verification link is invalid or expired.");
        } finally {
          setIsVerifying(false);
        }
      }
      verify();
    }
  }, [token]);

  const handleContinue = () => {
    navigate("/account-type");
  };

  return (
    <div
      className="verified-page"
      style={{ backgroundImage: `url(${img2})` }}
    >
      <header className="auth-header">
        <div className="auth-header-logo" onClick={() => navigate("/")}>
          <span className="logo-tech">Tech</span>
          <span className="logo-guild">Guild</span>
        </div>
        <div className="auth-header-profile">
          <img src={userIcon} alt="Profile Icon" className="header-profile-icon" />
        </div>
      </header>

      <div className="overlay" />

      <SignupCard>
        <div className="verified-container">
          <div className="mailBox">
            <img src={mailImage} alt="Mail" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>

          <h2>{isVerifying ? "Verifying your email..." : "Email Verified Successfully !"}</h2>

          {errorMessage ? (
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
          ) : (
            <div className="reward-card">
              <h4>Email Verified</h4>
              <p>You have earned +10 trust points!</p>
            </div>
          )}

          <div className="verify-progress">
            <div className="line"></div>

            <div className="step active">
              <div className="circle">
                <Check width={14} height={14} />
              </div>
              <h5>Email Verified</h5>
              <span>+10 Trust Points</span>
            </div>

            <div className="step">
              <div className="circle">
                <Lock width={14} height={14} />
              </div>
              <h5>Profile Completed</h5>
              <span>+20 Trust Points</span>
            </div>

            <div className="step">
              <div className="circle">
                <Lock width={14} height={14} />
              </div>
              <h5>Identity Verified</h5>
              <span>+40 Trust Points</span>
            </div>

            <div className="step">
              <div className="circle">
                <Lock width={14} height={14} />
              </div>
              <h5>First Project</h5>
              <span>+30 Trust Points</span>
            </div>
          </div>

          <button className="continueBtn" onClick={handleContinue}>
            Continue to account type
          </button>
        </div>
      </SignupCard>
    </div>
  );
}
