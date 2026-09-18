import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SignupCard from "@/Components/SignupCard/SignupCard";
import { Check, Lock } from "@/Components/icons";
import img2 from "@/assets/img2.png";
import userIcon from "@/assets/icons/user.svg";
import mailImage from "@/assets/mail.png";
import "./Emailverify.css";
import authApi from "@/features/auth/api/authApi";
import { APP_STRINGS, FORM_ERRORS } from "@/constants/string";

export default function EmailVerified() {
  const STRINGS = APP_STRINGS.AUTH.EMAIL_VERIFIED;
  const BRAND = APP_STRINGS.AUTH.HOME_SCREEN;

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
          setErrorMessage(err?.message || FORM_ERRORS.AUTH.VERIFY_FAILED || STRINGS.INVALID_TOKEN_ERROR);
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
          <span className="logo-tech">{BRAND.BRAND_TECH}</span>
          <span className="logo-guild">{BRAND.BRAND_GUILD}</span>
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

          <h2>{isVerifying ? STRINGS.VERIFYING_TITLE : STRINGS.SUCCESS_TITLE}</h2>

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
              <h4>{STRINGS.REWARD_TITLE}</h4>
              <p>{STRINGS.REWARD_SUBTITLE}</p>
            </div>
          )}

          <div className="verify-progress">
            <div className="line"></div>

            <div className="step active">
              <div className="circle">
                <Check width={14} height={14} />
              </div>
              <h5>{STRINGS.STEPS.EMAIL_VERIFIED_TITLE}</h5>
              <span>{STRINGS.STEPS.EMAIL_VERIFIED_POINTS}</span>
            </div>

            <div className="step">
              <div className="circle">
                <Lock width={14} height={14} />
              </div>
              <h5>{STRINGS.STEPS.PROFILE_COMPLETED_TITLE}</h5>
              <span>{STRINGS.STEPS.PROFILE_COMPLETED_POINTS}</span>
            </div>

            <div className="step">
              <div className="circle">
                <Lock width={14} height={14} />
              </div>
              <h5>{STRINGS.STEPS.IDENTITY_VERIFIED_TITLE}</h5>
              <span>{STRINGS.STEPS.IDENTITY_VERIFIED_POINTS}</span>
            </div>

            <div className="step">
              <div className="circle">
                <Lock width={14} height={14} />
              </div>
              <h5>{STRINGS.STEPS.FIRST_PROJECT_TITLE}</h5>
              <span>{STRINGS.STEPS.FIRST_PROJECT_POINTS}</span>
            </div>
          </div>

          <button className="continueBtn" onClick={handleContinue}>
            {STRINGS.CONTINUE_BTN}
          </button>
        </div>
      </SignupCard>
    </div>
  );
}
