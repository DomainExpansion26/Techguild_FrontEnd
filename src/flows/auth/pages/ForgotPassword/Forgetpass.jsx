import { useState } from "react";
import { Link } from "react-router-dom";
import { Google, GitHub, Mail } from "@/Components/icons";
import mailImage from "@/assets/mail.png";
import "./forgetpass.css";
import {
  AuthHomeScreen,
  BrandLogo,
  SignupCard,
} from "@/Components";
import authApi from "@/features/auth/api/authApi";
import oauthApi from "@/features/auth/api/oauthApi";

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGoogleLogin = () => {
    oauthApi.redirectToGoogle();
  };

  const handleGithubLogin = () => {
    oauthApi.redirectToGithub();
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      await authApi.forgotPassword({ email });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Forgot password error:", err);
      setErrorMessage(err?.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  return (
    <div className="forgetpass-page">
      <AuthHomeScreen />

      <div className="auth-card-wrapper">
        <SignupCard className={isSubmitted ? "success-state" : ""}>
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <div style={isSubmitted ? { display: 'flex', justifyContent: 'center', width: '100%' } : {}}>
              <BrandLogo />
            </div>

            {!isSubmitted ? (
              <>
                <h2 style={{ fontWeight: 700, fontSize: '18.5px', color: '#111827', margin: '22px 0 10px 0' }}>
                  Forgot Password ?
                </h2>

                <p className="subtitle" style={{ color: '#6C757D', fontSize: '12.5px', margin: '0 0 22px 0', lineHeight: '1.45' }}>
                  Enter your email address and we'll send you a link to reset your password.
                </p>

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

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <label htmlFor="forget-email" style={{ fontWeight: 700, fontSize: '12.5px', color: '#111827', display: 'block', margin: '0 0 8px 0' }}>
                    Email Address
                  </label>

                  <div className="input-group rounded-3 overflow-hidden bg-white" style={{ marginBottom: '24px', border: '1px solid #B3B3B3' }}>
                    <span className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center" style={{ padding: '0 10px', minWidth: '36px' }}>
                      <Mail width={16} height={16} color="#6A717D" />
                    </span>
                    <input
                      id="forget-email"
                      type="email"
                      className="form-control border-0 shadow-none bg-white"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ fontSize: '13px', padding: '8px 10px 8px 0' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn auth-primary-btn"
                  >
                    {loading ? "Sending link..." : "Send Reset Link"}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 16px 0' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#B3B3B3' }}></div>
                    <span style={{ padding: '0 12px', fontSize: '11px', fontWeight: 600, color: '#4B5563', letterSpacing: '0.05em' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#B3B3B3' }}></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn btn-light bg-white border d-flex align-items-center justify-content-center gap-2 w-100 shadow-sm fw-medium rounded-3"
                    style={{ fontSize: '13px', padding: '8px 0', marginBottom: '10px' }}
                  >
                    <Google width={18} height={18} />
                    <span>Continue with Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleGithubLogin}
                    className="btn btn-light bg-white border d-flex align-items-center justify-content-center gap-2 w-100 shadow-sm fw-medium rounded-3"
                    style={{ fontSize: '13px', padding: '8px 0', marginBottom: '0px' }}
                  >
                    <GitHub width={18} height={18} />
                    <span>Continue with GitHub</span>
                  </button>

                  <div style={{ marginTop: 'auto', paddingTop: '20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '13px', color: '#000000', margin: 0, fontWeight: 500 }}>
                      Remember your password ?{" "}
                      <Link to="/login" style={{ color: '#103CA4', textDecoration: 'none', fontWeight: 600 }}>Log In</Link>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <div className="forgetpass-success-body">
                <div className="forgetpass-icon-circle">
                  <img src={mailImage} alt="Mail Sent Icon" className="forgetpass-mail-img" />
                </div>

                <h2 className="forgetpass-success-title">Check your email</h2>

                <p className="forgetpass-success-desc">
                  We sent a password reset link to
                  <br />
                  <span className="forgetpass-email-highlight">{email}</span>
                </p>

                <button
                  type="button"
                  onClick={handleOpenGmail}
                  className="btn auth-primary-btn forgetpass-open-email-btn"
                >
                  Open Email
                </button>

                <div className="forgetpass-resend-wrapper">
                  <span className="forgetpass-resend-text">Didn't receive the email ? </span>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-link p-0 forgetpass-resend-link"
                  >
                    Click to resend
                  </button>
                </div>

                <div className="forgetpass-back-login-wrapper">
                  <Link to="/login" className="forgetpass-back-login-link">
                    Back to log in
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
