import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Modules/auth/Register/SignUp";
import Login from "./Modules/auth/Login/Login";
import ForgetPass from "./Modules/auth/ForgotPassword/Forgetpass";
import ResetPass from "./Modules/auth/ResetPassword/ResetPass";
import VerifyEmail from "./Modules/auth/Verifyemail/Verifyemail";
import EmailVerified from "./Modules/auth/Emailverify/Emailverify";
import AccountType from "./Modules/auth/Accountype/Accounttype";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/emailverify" element={<EmailVerified />} />
        <Route path="/account-type" element={<AccountType />} />
        <Route path="/forgot-password" element={<ForgetPass />} />
        <Route path="/reset-password" element={<ResetPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
