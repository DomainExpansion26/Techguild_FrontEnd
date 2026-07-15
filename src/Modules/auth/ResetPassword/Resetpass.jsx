<<<<<<< HEAD
<<<<<<< HEAD
=======
﻿import React from 'react';
=======
>>>>>>> 2365e99 (import right place:)
import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";
import "./resetpass.css";
import {
  AuthHomeScreen,
  BrandLogo,
  PasswordInput,
  PrimaryButton,
  SignupCard,
} from "../../../Components";

export default function ResetPass() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log("Password reset:", { newPassword, confirmPassword });
    setIsSubmitted(true);
  };
<<<<<<< HEAD
=======
﻿import React from 'react';
>>>>>>> d25f5d6 (feat: update dashboard UI)
=======
>>>>>>> 96bef49 (import right place:)
>>>>>>> 2365e99 (import right place:)

  return (
    <div className="resetpass-page">
      <AuthHomeScreen />

      <SignupCard>
        <BrandLogo />

        <h2>Reset Password</h2>

        <p className="subtitle">
  {isSubmitted ? (
    "Password reset successful"
  ) : (
    <>
      Enter your new password below.
      <br />
      Make sure it's strong and unique.
    </>
  )}
        </p>

        {!isSubmitted ? (
          <>
            <label className="input-label">New Password</label>
            <PasswordInput
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              icon={<Lock size={18} />}
            />

            <label className="input-label">Confirm Password</label>
            <PasswordInput
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock size={18} />}
            />

            <PrimaryButton text="Reset Password" onClick={handleSubmit} />

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
              Your password has been successfully reset. You can now use your new password to login to your account.
            </p>

            <Link to="/login">
              <PrimaryButton text="Go to Login" onClick={() => {}} />
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
