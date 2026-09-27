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
import { APP_STRINGS, FORM_ERRORS } from "@/constants/string";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(rawValue) {
  const value = rawValue.trim();
  if (!value) return FORM_ERRORS.REQUIRED;
  if (!EMAIL_PATTERN.test(value)) return FORM_ERRORS.INVALID_EMAIL;
  return "";
}

export default function ForgetPass() {
  const STRINGS = APP_STRINGS.AUTH.FORGOT_PASSWORD;
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (loading) return;

    const validationError = validateEmail(email);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const trimmedEmail = email.trim();
    setErrorMessage("");
    setLoading(true);

    try {
      await authApi.forgotPassword({ email: trimmedEmail });
      setEmail(trimmedEmail);
      setIsSubmitted(true);
    } catch (err) {
      setErrorMessage(err?.message || FORM_ERRORS.AUTH.FORGOT_FAILED);
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
          <div className="forget-content">
            <div className={`forget-logo-row${isSubmitted ? " center" : ""}`}>
              <BrandLogo />
            </div>

            {!isSubmitted ? (
              <>
                <h2 className="forget-title">
                  {STRINGS.TITLE}
                </h2>

                <p className="subtitle forget-subtitle">
                  {STRINGS.SUBTITLE}
                </p>

                {errorMessage && (
                  <div className="forget-error" role="alert">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="forget-form">
                  <label htmlFor="forget-email" className="forget-label">
                    {STRINGS.EMAIL_LABEL}
                  </label>

                  <div className="forget-input-group input-group rounded-3 overflow-hidden bg-white">
                    <span className="forget-input-addon input-group-text bg-white border-0 d-flex align-items-center justify-content-center">
                      <Mail width={18} height={18} />
                    </span>
                    <input
                      id="forget-email"
                      type="email"
                      autoComplete="email"
                      className="form-control border-0 shadow-none bg-white"
                      placeholder={STRINGS.EMAIL_PLACEHOLDER}
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn auth-primary-btn forget-submit"
                  >
                    {loading ? STRINGS.SUBMIT_BTN_LOADING : STRINGS.SUBMIT_BTN}
                  </button>

                  <div className="forget-divider">
                    <div className="forget-divider-line"></div>
                    <span className="forget-divider-text">{STRINGS.DIVIDER_OR}</span>
                    <div className="forget-divider-line"></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn btn-light forget-social-btn"
                  >
                    <Google width={18} height={18} />
                    <span>{STRINGS.GOOGLE_BTN}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleGithubLogin}
                    className="btn btn-light forget-social-btn last"
                  >
                    <GitHub width={18} height={18} />
                    <span>{STRINGS.GITHUB_BTN}</span>
                  </button>

                  <div className="forget-footer">
                    <p>
                      {STRINGS.FOOTER_PROMPT}{" "}
                      <Link to="/login">{STRINGS.FOOTER_LINK}</Link>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <div className="forgetpass-success-body">
                <img src={mailImage} alt="Reset link sent" className="forgetpass-success-banner" />

                <h2 className="forgetpass-success-title">{STRINGS.SUCCESS.TITLE}</h2>

                <p className="forgetpass-success-desc">
                  {STRINGS.SUCCESS.DESC_PREFIX}{" "}
                  <span className="forgetpass-email-highlight">{email}</span>
                </p>

                <button
                  type="button"
                  onClick={handleOpenGmail}
                  className="btn auth-primary-btn forget-submit forgetpass-open-email-btn"
                >
                  {STRINGS.SUCCESS.OPEN_EMAIL_BTN}
                </button>

                <div className="forget-footer">
                  <p>
                    {STRINGS.FOOTER_PROMPT}{" "}
                    <Link to="/login">{STRINGS.FOOTER_LINK}</Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </SignupCard>
      </div>
    </div>
  );
}
