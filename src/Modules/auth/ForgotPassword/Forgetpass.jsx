<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
﻿import React from 'react';
=======
>>>>>>> 52f54a8 (import right place:)
=======
>>>>>>> 6aa0f4c (resolve:)
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import "./forgetpass.css";
import {
  AuthHomeScreen,
  BrandLogo,
  TextInput,
  PrimaryButton,
  SignupCard,
} from "../../../Components";

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log("Password reset for:", email);
    setIsSubmitted(true);
  };
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4628298 (import right place:)
>>>>>>> 52f54a8 (import right place:)
=======
>>>>>>> 6aa0f4c (resolve:)

  return (
    <div className="forgetpass-page">
      <AuthHomeScreen />

      <SignupCard>
        <BrandLogo />

        <h2>Forgot Password?</h2>

        <p className="subtitle">
          {isSubmitted
            ? "Check your email for reset instructions"
            : "Enter your email address and we’ll send you a link to reset your password."}
        </p>

        {!isSubmitted ? (
          <>
            <label className="input-label">Email Address</label>
            <TextInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
            />

            <PrimaryButton text="Send Reset Link" onClick={handleSubmit} />

            <p className="back-to-login">
              <Link to="/login">
                <ArrowLeft size={14} />
                Back to Login
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="32" fill="#10B981" fillOpacity="0.1"/>
                <circle cx="32" cy="32" r="24" fill="#10B981" fillOpacity="0.2"/>
                <path d="M20 32L28 40L44 24" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <p className="success-message">
              We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
            </p>

            <Link to="/reset-password">
              <PrimaryButton text="Go To Email box" onClick={() => {}} />
            </Link>

            <p className="back-to-login">
              <Link to="/login">
                <ArrowLeft size={14} />
                Back to Login
              </Link>
            </p>
          </>
        )}
      </SignupCard>
    </div>
  );
}
