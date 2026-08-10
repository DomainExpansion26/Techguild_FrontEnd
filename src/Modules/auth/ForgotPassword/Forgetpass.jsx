import { useState } from "react";
import { Link } from "react-router-dom";
import { Google, GitHub, Mail } from "../../../Components/icons";
import mailImage from "../../../assets/mail.png";
import "./forgetpass.css";
import {
  AuthHomeScreen,
  BrandLogo,
  SignupCard,
} from "../../../Components";

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  const handleGithubLogin = () => {
    console.log("GitHub login");
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    console.log("Password reset for:", email);
    setIsSubmitted(true);
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

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <label htmlFor="forget-email" style={{ fontWeight: 700, fontSize: '12.5px', color: '#111827', display: 'block', margin: '0 0 8px 0' }}>
                    Email Address
                  </label>

                  <div className="input-group rounded-3 overflow-hidden bg-white" style={{ marginBottom: '24px', border: '1px solid #B3B3B3' }}>
                    <span className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center" style={{ padding: '0 10px', minWidth: '36px' }}>
                      <Mail width={15} height={15} color="#6A717D" />
                    </span>
                    <input
                      id="forget-email"
                      type="email"
                      className="form-control border-0 shadow-none bg-white"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ fontSize: '12.5px', padding: '8.5px 10px 8.5px 0', color: '#111827' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn auth-primary-btn"
                  >
                    Send Reset Link
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#D9D9D9' }}></div>
                    <span style={{ padding: '0 12px', fontSize: '11px', fontWeight: 600, color: '#000', letterSpacing: '0.05em' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#D9D9D9' }}></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn btn-light bg-white border d-flex align-items-center justify-content-center gap-2 w-100 shadow-sm fw-medium rounded-3"
                    style={{ fontSize: '13.5px', padding: '9.5px 0', marginBottom: '10px', borderColor: '#D1D5DB' }}
                  >
                    <Google width={18} height={18} />
                    <span style={{ color: '#111827' }}>Continue with Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleGithubLogin}
                    className="btn btn-light bg-white border d-flex align-items-center justify-content-center gap-2 w-100 shadow-sm fw-medium rounded-3"
                    style={{ fontSize: '13.5px', padding: '9.5px 0', marginBottom: '10px', borderColor: '#D1D5DB' }}
                  >
                    <GitHub width={18} height={18} />
                    <span style={{ color: '#111827' }}>Continue with GitHub</span>
                  </button>

                  <p style={{ textAlign: 'center', fontSize: '13px', color: '#111827', margin: '0', fontWeight: 500 }}>
                    Remember your password ?{" "}
                    <Link to="/login" style={{ color: '#103CA4', textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
                  </p>
                </form>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', textAlign: 'center' }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  margin: '10px auto 10px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img src={mailImage} alt="Mail" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.4)' }} />
                </div>

                <h2 style={{ fontWeight: 700, fontSize: '18.5px', color: '#111827', margin: '0 0 12px 0' }}>
                  Reset Link Sent !
                </h2>

                <p style={{ color: '#6C757D', fontSize: '12.5px', margin: '0 0 6px 0' }}>
                  We've sent a password reset link to
                </p>

                <p style={{ color: '#111827', fontWeight: 700, fontSize: '13.5px', margin: '0 0 28px 0' }}>
                  {email || "purwarriddhi@gmail.com"}
                </p>

                <button
                  type="button"
                  onClick={handleOpenGmail}
                  className="btn auth-primary-btn w-100"
                  style={{ marginBottom: '26px' }}
                >
                  Go to gmail inbox
                </button>

                <p style={{ textAlign: 'center', fontSize: '12.5px', color: '#111827', margin: '0 0 4px 0', fontWeight: 500 }}>
                  Remember your password ?{" "}
                  <Link to="/login" style={{ color: '#103CA4', textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
                </p>
              </div>
            )}
          </div>
        </SignupCard>
      </div>
    </div>
  );
}
