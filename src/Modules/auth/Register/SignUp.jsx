import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Google, GitHub, Mail, Lock, Eye, EyeOff } from "../../../Components/icons";
import "./SignUp.css";
import {
  AuthHomeScreen,
  BrandLogo,
  SignupCard,
} from "../../../Components";

export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e?.preventDefault();
    console.log("Signup data:", { firstName, lastName, email, password, termsAccepted });
    navigate("/verify-email");
  };

  const handleGoogleSignup = () => {
    console.log("Google signup");
  };

  const handleGithubSignup = () => {
    console.log("GitHub signup");
  };

  return (
    <div className="signup-page">
      <AuthHomeScreen />

      <div className="auth-card-wrapper">
        <SignupCard>
          <form onSubmit={handleSignup} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <BrandLogo />

            <h2 style={{ fontWeight: 700, fontSize: '18px', color: '#111827', margin: '6px 0 1px 0' }}>Sign Up</h2>
            <p style={{ color: '#79797D', fontSize: '13px', margin: '0 0 14px 0' }}>Start your TechGuild Journey</p>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="btn btn-light bg-white border d-flex align-items-center justify-content-center gap-2 w-100 shadow-sm fw-medium rounded-3"
              style={{ fontSize: '13px', padding: '8px 0', marginBottom: '10px' }}
            >
              <Google width={18} height={18} />
              <span>Continue with Google</span>
            </button>
            <button
              type="button"
              onClick={handleGithubSignup}
              className="btn btn-light bg-white border d-flex align-items-center justify-content-center gap-2 w-100 shadow-sm fw-medium rounded-3"
              style={{ fontSize: '13px', padding: '8px 0', marginBottom: '0px' }}
            >
              <GitHub width={18} height={18} />
              <span>Continue with GitHub</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0 8px 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#B3B3B3' }}></div>
              <span style={{ padding: '0 12px', fontSize: '11px', fontWeight: 600, color: '#4B5563', letterSpacing: '0.05em' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#B3B3B3' }}></div>
            </div>

            <div style={{ height: '188px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '10px', marginTop: '0px', marginBottom: '10px' }}>
                <input
                  type="text"
                  className="form-control rounded-3 bg-white shadow-none"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  style={{ fontSize: '13px', padding: '8px 12px', flex: 1, border: '1px solid #B3B3B3', color: '#111827' }}
                />
                <input
                  type="text"
                  className="form-control rounded-3 bg-white shadow-none"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  style={{ fontSize: '13px', padding: '8px 12px', flex: 1, border: '1px solid #B3B3B3', color: '#111827' }}
                />
              </div>

              <div className="input-group rounded-3 overflow-hidden bg-white" style={{ marginBottom: '10px', border: '1px solid #B3B3B3' }}>
                <span className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center" style={{ padding: '0 10px', minWidth: '36px' }}>
                  <Mail width={16} height={16} color="#6A717D" />
                </span>
                <input
                  type="email"
                  className="form-control border-0 shadow-none bg-white"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ fontSize: '13px', padding: '8px 10px 8px 0', color: '#111827' }}
                />
              </div>

              <div className="input-group rounded-3 overflow-hidden bg-white" style={{ marginBottom: '12px', border: '1px solid #B3B3B3' }}>
                <span className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center" style={{ padding: '0 10px', minWidth: '36px' }}>
                  <Lock width={16} height={16} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control border-0 shadow-none bg-white"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ fontSize: '13px', padding: '8px 10px 8px 0', color: '#111827' }}
                />
                <button
                  type="button"
                  className="input-group-text bg-white border-0 btn shadow-none d-flex align-items-center justify-content-center"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ padding: '0 10px' }}
                >
                  {showPassword ? <Eye width={16} height={16} /> : <EyeOff width={16} height={16} />}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '0px' }}>
                <input
                  type="checkbox"
                  id="termsAccepted"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                  className="cursor-pointer"
                  style={{ margin: '3px 0 0 0' }}
                />
                <label htmlFor="termsAccepted" className="cursor-pointer" style={{ color: '#6c757d', fontSize: '12px', margin: 0, lineHeight: 1.35 }}>
                  I agree to the TechGuild <a href="#" style={{ color: '#103CA4', textDecoration: 'none', fontWeight: 600 }}>User Agreement</a> and <a href="#" style={{ color: '#103CA4', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn auth-primary-btn"
            >
              Join TechGuild
            </button>

            <p style={{ textAlign: 'center', fontSize: '13px', color: '#000000', margin: 'auto 0 2px 0', fontWeight: 500 }}>
              Already have an account ?{" "}
              <Link to="/login" style={{ color: '#103CA4', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
            </p>
          </form>
        </SignupCard>
      </div>
    </div>
  );
}
