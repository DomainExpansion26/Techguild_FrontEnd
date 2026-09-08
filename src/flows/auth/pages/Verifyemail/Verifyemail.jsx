import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignupCard from "@/Components/SignupCard/SignupCard";
import PrimaryButton from "@/Components/Button/Primarybutton";
import SecondaryButton from "@/Components/SecondaryButton/SecondaryButton";
import img2 from "@/assets/img2.png";
import userIcon from "@/assets/icons/user.svg";
import mailCommentIcon from "@/assets/mail-comment.png";
import "./Verifyemail.css";
import authApi from "@/features/auth/api/authApi";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const pendingUser = JSON.parse(localStorage.getItem("techguild_pending_user") || "{}");
  const email = location?.state?.email || pendingUser?.email || "";

  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState("");

  const handleResend = async () => {
    setResending(true);
    setResendStatus("");
    try {
      await authApi.resendVerification({ email });
      setResendStatus("Verification email resent successfully!");
    } catch (err) {
      console.error("Resend error:", err);
      setResendStatus(err?.message || "Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  const handleOpenGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  return (
    <div
      className="verify-page"
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

      <div className="overlay"></div>

      <SignupCard>
        <div className="verify-content">
          <div className="mail-icon-wrapper">
            <img src={mailCommentIcon} alt="Mail" style={{ width: '130px', height: 'auto' }} />
          </div>

          <h2>Verify Your Email To Continue.</h2>

          {resendStatus && (
            <div
              style={{
                padding: "8px 12px",
                marginBottom: "12px",
                borderRadius: "6px",
                backgroundColor: resendStatus.includes("success") ? "#dcfce7" : "#fee2e2",
                color: resendStatus.includes("success") ? "#15803d" : "#b91c1c",
                fontSize: "12px",
              }}
            >
              {resendStatus}
            </div>
          )}

          <p className="verify-text">
            We just sent an email to the address :
          </p>
          <p className="email">{email}</p>
          <p className="verify-text">
            Please check your email and click the link provided to verify your email address.
          </p>

          <div className="verify-buttons">
            <SecondaryButton
              text={resending ? "Sending..." : "Send Again"}
              onClick={handleResend}
              className="send-again-btn"
              disabled={resending}
            />
            <PrimaryButton
              text="Open Email"
              onClick={handleOpenGmail}
              className="open-email-btn"
            />
          </div>

          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <button
              type="button"
              onClick={() => navigate("/account-type", { state: location?.state })}
              className="btn btn-link text-decoration-none"
              style={{ fontSize: "13px", color: "#103ca4", fontWeight: 600 }}
            >
              I've verified my email → Choose Account Type
            </button>
          </div>
        </div>
      </SignupCard>
    </div>
  );
}
