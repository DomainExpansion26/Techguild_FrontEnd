import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import "./login.css";
import {
  AuthHomeScreen,
  BrandLogo,
  SocialButton,
  Divider,
  TextInput,
  PasswordInput,
  PrimaryButton,
  SignupCard,
} from "../../../Components";

// Google Icon SVG
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
    <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
    <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
    <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
  </svg>
);

// GitHub Icon SVG
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M9 0C4.02944 0 0 4.02944 0 9C0 12.9756 2.56672 16.3428 6.15369 17.5386C6.60375 17.6168 6.76925 17.3425 6.76925 17.1057C6.76925 16.8944 6.76022 16.2955 6.75684 15.5288C4.25431 16.0794 3.71197 14.3619 3.71197 14.3619C3.28853 13.2813 2.68016 13.0047 2.68016 13.0047C1.83231 12.4384 2.74519 12.4503 2.74519 12.4503C3.68359 12.5111 4.17019 13.4073 4.17019 13.4073C5.00281 14.8057 6.31919 14.3931 6.78719 14.164C6.86438 13.5684 7.09556 13.1569 7.35047 12.9329C5.35697 12.7055 3.26556 11.9496 3.26556 8.50856C3.26556 7.52806 3.61047 6.72338 4.16553 6.08969C4.08113 5.86344 3.77778 4.94953 4.25034 3.71344C4.25034 3.71344 5.00544 3.47281 6.74559 4.63313C7.46175 4.43578 8.23241 4.33709 9 4.33444C9.76759 4.33709 10.5392 4.43578 11.2563 4.63313C12.9946 3.47281 13.7488 3.71344 13.7488 3.71344C14.2223 4.94953 13.9189 5.86344 13.8345 6.08969C14.3905 6.72338 14.7344 7.52806 14.7344 8.50856C14.7344 11.9576 12.6396 12.7037 10.6396 12.9267C10.9595 13.2001 11.2432 13.7401 11.2432 14.5668C11.2432 15.7456 11.2332 16.6973 11.2332 17.1057C11.2332 17.3444 11.3977 17.6206 11.8513 17.5377C15.435 16.3401 18 12.9748 18 9C18 4.02944 13.9706 0 9 0Z" fill="#24292E"/>
  </svg>
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log("Login data:", {
      email,
      password,
    });
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

      <SignupCard>
        <BrandLogo />

        <h2>Login</h2>

        <p className="subtitle">Continue your TechGuild Journey</p>

        <SocialButton text="Continue with Google" onClick={handleGoogleLogin} icon={<GoogleIcon />} />

        <SocialButton text="Continue with GitHub" onClick={handleGithubLogin} icon={<GitHubIcon />} />

        <Divider />

        <label className="input-label">Email Address</label>
        <TextInput
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={18} />}
        />

        <label className="input-label">Password</label>
        <PasswordInput
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock size={18} />}
        />

        <div className="forgot-password-row">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <PrimaryButton text="Login" onClick={handleLogin} />

        <p className="signup">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </SignupCard>
    </div>
  );
}
