import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Check } from "../../../Components/icons";
import "./forgetpass.css";
import {
  AuthHomeScreen,
  BrandLogo,
  SignupCard,
} from "../../../Components";

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
            <BrandLogo />

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
                    className="btn w-100 fw-bold text-white shadow-sm"
                    style={{ backgroundColor: '#103CA4', borderColor: '#103CA4', padding: '9.5px 0', fontSize: '13.5px', borderRadius: '8px', marginBottom: '26px' }}
                  >
                    Send Reset Link
                  </button>

                  <p style={{ textAlign: 'center', fontSize: '12.5px', color: '#111827', margin: '0 0 4px 0', fontWeight: 500 }}>
                    Remember your password ?{" "}
                    <Link to="/login" style={{ color: '#103CA4', textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
                  </p>
                </form>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', textAlign: 'center' }}>
                {/* Mail Icon Box */}
                <div style={{
                  width: '62px',
                  height: '62px',
                  background: '#FFFFFF',
                  borderRadius: '15px',
                  margin: '22px auto 14px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  color: '#666666'
                }}>
                  <Mail width={36} height={36} color="#555555" />
                  <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    width: '22px',
                    height: '22px',
                    background: '#103CA4',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #FFFFFF'
                  }}>
                    <Check width={13} height={13} color="#FFFFFF" />
                  </span>
                </div>

                {/* Heading */}
                <h2 style={{ fontWeight: 700, fontSize: '18.5px', color: '#111827', margin: '0 0 12px 0' }}>
                  Reset Link Sent !
                </h2>

                {/* Subtitle Line 1 */}
                <p style={{ color: '#6C757D', fontSize: '12.5px', margin: '0 0 6px 0' }}>
                  We've sent a password reset link to
                </p>

                {/* Email Address Line 2 */}
                <p style={{ color: '#111827', fontWeight: 700, fontSize: '13.5px', margin: '0 0 28px 0' }}>
                  {email || "purwarriddhi@gmail.com"}
                </p>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={handleOpenGmail}
                  className="btn w-100 fw-bold text-white shadow-sm"
                  style={{ backgroundColor: '#103CA4', borderColor: '#103CA4', padding: '9.5px 0', fontSize: '13.5px', borderRadius: '8px', marginBottom: '26px' }}
                >
                  Go to gmail inbox
                </button>

                {/* Bottom Footer Link */}
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
