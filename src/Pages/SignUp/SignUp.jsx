import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
} from "lucide-react";

import "./SignUp.css";
import { TextInput } from "@/Components";

import Logo from "../../assets/Logo.png";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20.5H24v7h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-4.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.5 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.6 0-14.1 4.3-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 45c5.5 0 10.4-2.1 14.1-5.6l-6.5-5.5c-2 1.4-4.6 2.2-7.6 2.2-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.9 40.6 16.4 45 24 45z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20.5H24v7h11.3c-.8 2.3-2.2 4.2-4 5.6l6.5 5.5C41.6 35.7 45 30.4 45 24c0-1.4-.1-2.7-.4-4.5z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#181717"
        d="M12 .3A12 12 0 000 12.3a12 12 0 008.2 11.4c.6.1.8-.2.8-.6v-2.2c-3.4.8-4.1-1.5-4.1-1.5-.6-1.3-1.4-1.7-1.4-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.7.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0024 .3 12 12 0 0012 .3z"
      />
    </svg>
  );
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (field) => (e) =>
    setForm({
      ...form,
      [field]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="page-wrapper">
      <div className="signup-container">

        <div className="form-section">

          <h1 className="heading">
            {isLoginMode ? "Login" : "Sign Up"}
          </h1>

          <p className="subheading">
            {isLoginMode ? "Welcome back to TechGuild" : "Start your TechGuild Journey"}
          </p>

          <button className="oauth-btn">
            <GoogleIcon />
            Continue with Google
          </button>

          <button className="oauth-btn">
            <GitHubIcon />
            Continue with GitHub
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <form onSubmit={handleSubmit}>

            {!isLoginMode && (
              <div className="name-row">

                <TextInput
                  placeholder="First Name"
                  icon={<User size={16} />}
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                />

                <TextInput
                  placeholder="Last Name"
                  icon={<User size={16} />}
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                />

              </div>
            )}

            <TextInput
              placeholder="Enter your email"
              type="email"
              icon={<Mail size={16} />}
              value={form.email}
              onChange={handleChange("email")}
            />

            <div className="password-input-wrap">

              <TextInput
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                icon={<Lock size={16} />}
                value={form.password}
                onChange={handleChange("password")}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            <label className="agree-row">
              <input type="checkbox" />

              <span>
                I agree to the TechGuild
                <a href="#"> User Agreement </a>
                and
                <a href="#"> Privacy Policy</a>.
              </span>
            </label>

            <button className="submit-btn">
              {isLoginMode ? "Login" : "Join TechGuild"}
            </button>

          </form>

          <p className="login-row">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginMode(!isLoginMode); }}>
              {isLoginMode ? " Sign Up" : " Login"}
            </a>
          </p>

        </div>

        <div className="logo-section">
          <img src={Logo} alt="TechGuild Logo" className="logo-bg" />

          <div className="overlay"></div>

          <div className="content">

            <h1 className="hero-title">
              Rise by your work.
              <br />
              Grow by trust.
            </h1>

            <p className="hero-text">
              For agencies, freelancers and business owners
              creating real impact.
            </p>
            <div className="brand-logo">
              <h2 className="brand-white">
                Tech<span>Guild</span>
              </h2>
            </div>
          </div>
        </div>

        </div>

      </div>

  );
}
