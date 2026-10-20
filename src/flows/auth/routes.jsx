import { lazy } from "react";
import { Route } from "react-router-dom";
import { GuestGuard } from "@/permissions";

const SignUp = lazy(() => import("./pages/Register/SignUp"));
const Login = lazy(() => import("./pages/Login/Login"));
const ForgetPass = lazy(() => import("./pages/ForgotPassword/Forgetpass"));
const ResetPass = lazy(() => import("./pages/ResetPassword/Resetpass"));
const VerifyEmail = lazy(() => import("./pages/Verifyemail/Verifyemail"));
const EmailVerified = lazy(() => import("./pages/Emailverify/Emailverify"));
const AccountType = lazy(() => import("./pages/AccountType/AccountType"));
const TwoFactor = lazy(() => import("./pages/TwoFactor/TwoFactor"));
const OAuthCallback = lazy(() => import("./pages/OAuthCallback/OAuthCallback"));
const ComingSoon = lazy(() => import("./pages/ComingSoon/ComingSoon"));

// TEMPORARY (revert to go live): when true, /login + /signup render a
// "Coming Soon" placeholder instead of the real auth forms.
// Set to false to restore the real Sign In / Sign Up pages — no other change needed.
const AUTH_COMING_SOON = true;

export const authRoutes = (
  <>
    {/* Public-only routes: logged in users are redirected to dashboard */}
    <Route element={<GuestGuard />}>
      {AUTH_COMING_SOON ? (
        <>
          <Route path="/signup" element={<ComingSoon title="Sign Up" subtitle="We're getting registration ready. Please check back soon." />} />
          <Route path="/login" element={<ComingSoon title="Sign In" subtitle="We're getting authentication ready. Please check back soon." />} />
        </>
      ) : (
        <>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </>
      )}
      <Route path="/forgot-password" element={<ForgetPass />} />
    </Route>

    {/* Reset password routes: accessible regardless of session status */}
    <Route path="/reset-password" element={<ResetPass />} />
    <Route path="/reset-password/:token" element={<ResetPass />} />
    <Route path="/auth/reset-password" element={<ResetPass />} />
    <Route path="/auth/reset-password/:token" element={<ResetPass />} />
    <Route path="/resetpassword" element={<ResetPass />} />
    <Route path="/resetpassword/:token" element={<ResetPass />} />
    <Route path="/reset-pass" element={<ResetPass />} />
    <Route path="/reset-pass/:token" element={<ResetPass />} />
    <Route path="/verify-email" element={<VerifyEmail />} />

    <Route path="/verify-email/:token" element={<EmailVerified />} />
    <Route path="/verify" element={<EmailVerified />} />
    <Route path="/verify/:token" element={<EmailVerified />} />
    <Route path="/emailverify" element={<EmailVerified />} />
    <Route path="/emailverify/:token" element={<EmailVerified />} />
    <Route path="/email-verify" element={<EmailVerified />} />
    <Route path="/email-verify/:token" element={<EmailVerified />} />
    <Route path="/verifyemail" element={<EmailVerified />} />
    <Route path="/verifyemail/:token" element={<EmailVerified />} />
    <Route path="/auth/verify-email" element={<EmailVerified />} />
    <Route path="/auth/verify-email/:token" element={<EmailVerified />} />
    <Route path="/account-type" element={<AccountType />} />
    <Route path="/verify-2fa" element={<TwoFactor />} />
    <Route path="/oauth/callback" element={<OAuthCallback />} />
    <Route path="/oauth/callback/" element={<OAuthCallback />} />
    <Route path="/oauth/google/callback" element={<OAuthCallback />} />
    <Route path="/oauth/google/callback/" element={<OAuthCallback />} />
    <Route path="/oauth/github/callback" element={<OAuthCallback />} />
    <Route path="/oauth/github/callback/" element={<OAuthCallback />} />
  </>
);

export default authRoutes;
