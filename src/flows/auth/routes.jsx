import { lazy } from "react";
import { Route } from "react-router-dom";

const SignUp = lazy(() => import("./pages/Register/SignUp"));
const Login = lazy(() => import("./pages/Login/Login"));
const ForgetPass = lazy(() => import("./pages/ForgotPassword/Forgetpass"));
const ResetPass = lazy(() => import("./pages/ResetPassword/Resetpass"));
const VerifyEmail = lazy(() => import("./pages/Verifyemail/Verifyemail"));
const EmailVerified = lazy(() => import("./pages/Emailverify/Emailverify"));
const AccountType = lazy(() => import("./pages/Accountype/Accounttype"));
const OAuthCallback = lazy(() => import("./pages/OAuthCallback/OAuthCallback"));

export const authRoutes = (
  <>
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgetPass />} />
    <Route path="/reset-password" element={<ResetPass />} />
    <Route path="/verify-email" element={<VerifyEmail />} />
    <Route path="/emailverify" element={<EmailVerified />} />
    <Route path="/account-type" element={<AccountType />} />
    <Route path="/oauth/callback" element={<OAuthCallback />} />
    <Route path="/oauth/google/callback" element={<OAuthCallback />} />
    <Route path="/oauth/github/callback" element={<OAuthCallback />} />
  </>
);

export default authRoutes;
