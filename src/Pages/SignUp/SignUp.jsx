import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
} from "lucide-react";

import "./signup.css";
import { AuthHomeScreen } from "../../Components"; 

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signup-page">

      <AuthHomeScreen />

      <div className="signup-card">

        <div className="brand">
          <span className="tech">Tech</span>
          <span className="guild">Guild</span>
        </div>

        <h2>Sign Up</h2>

        <p className="subtitle">
          Start your TechGuild Journey
        </p>

        <button className="social-btn">
          Continue with Google
        </button>

        <button className="social-btn">
          Continue with GitHub
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="name-row">

          <div className="input-box">
            <User size={18} />
            <input
              type="text"
              placeholder="First Name"
            />
          </div>

          <div className="input-box">
            <User size={18} />
            <input
              type="text"
              placeholder="Last Name"
            />
          </div>

        </div>

        <div className="input-box">
          <Mail size={18} />
          <input
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="input-box">
          <Lock size={18} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
          />

          <button
            type="button"
            className="eye-btn"
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

        <label className="checkbox">
          <input type="checkbox" />
          <span>
            I agree to the TechGuild
            <a href="/"> User Agreement </a>
            and
            <a href="/"> Privacy Policy</a>.
          </span>
        </label>

        <button className="join-btn">
          Join TechGuild
        </button>

        <p className="login">
          Already have an account ?
          <a href="/"> Login</a>
        </p>

      </div>

    </div>
  );
}