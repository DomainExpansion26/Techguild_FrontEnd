import { useState } from "react";
import { Link } from "react-router-dom";
import { Google, GitHub, Mail, Lock, Eye, EyeOff } from "../../../Components/icons";
import "./login.css";
import {
  AuthHomeScreen,
  BrandLogo,
  SignupCard,
} from "../../../Components";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e?.preventDefault();
    console.log("Login data:", { email, password, rememberMe });
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  const handleGithubLogin = () => {
    console.log("GitHub login");
  };

  return (
    <div className="login-page">
      <AuthHomeScreen />

      <div className="auth-card-wrapper">
        <SignupCard>
          <form onSubmit={handleLogin} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <BrandLogo />

            <h2 style={{ fontWeight: 700, fontSize: '18px', color: '#111827', margin: '6px 0 1px 0' }}>Welcome back</h2>
            <p style={{ color: '#79797D', fontSize: '13px', margin: '0 0 14px 0' }}>Log in to continue your journey.</p>

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

            <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0 8px 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#B3B3B3' }}></div>
              <span style={{ padding: '0 12px', fontSize: '11px', fontWeight: 600, color: '#4B5563', letterSpacing: '0.05em' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#B3B3B3' }}></div>
            </div>

            <div style={{ height: '188px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <label htmlFor="login-email" style={{ fontWeight: 700, fontSize: '13px', color: '#111827', display: 'block', margin: '0 0 5px 0' }}>Email Address</label>
              <div className="input-group rounded-3 overflow-hidden bg-white" style={{ marginBottom: '10px', border: '1px solid #B3B3B3' }}>
                <span className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center" style={{ padding: '0 10px', minWidth: '36px' }}>
                  <Mail width={16} height={16} color="#6A717D" />
                </span>
                <input
                  id="login-email"
                  type="email"
                  className="form-control border-0 shadow-none bg-white"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ fontSize: '13px', padding: '8px 10px 8px 0' }}
                />
              </div>

              <label htmlFor="login-password" style={{ fontWeight: 700, fontSize: '13px', color: '#111827', display: 'block', margin: '6px 0 5px 0' }}>Password</label>
              <div className="input-group rounded-3 overflow-hidden bg-white" style={{ marginBottom: '12px', border: '1px solid #B3B3B3' }}>
                <span className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center" style={{ padding: '0 10px', minWidth: '36px' }}>
                  <Lock width={16} height={16} />
                </span>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="form-control border-0 shadow-none bg-white"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ fontSize: '13px', padding: '8px 10px 8px 0' }}
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

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="cursor-pointer"
                    style={{ margin: 0 }}
                  />
                  <label htmlFor="rememberMe" className="cursor-pointer" style={{ fontWeight: 600, fontSize: '13px', color: '#111827', margin: 0 }}>
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" style={{ color: '#103CA4', textDecoration: 'none', fontWeight: 600, fontSize: '13px' }}>
                  Forgot Password ?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="btn auth-primary-btn"
            >
              Log in
            </button>

            <p style={{ textAlign: 'center', fontSize: '13px', color: '#000000', margin: 'auto 0 2px 0', fontWeight: 500 }}>
              Dont have an account ?{" "}
              <Link to="/signup" style={{ color: '#103CA4', textDecoration: 'none', fontWeight: 600 }}>Sign up</Link>
            </p>
          </form>
        </SignupCard>
      </div>
    </div>
  );
}
