import { AuthHomeScreen } from "@/Components";
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
   <Signup/>
  );
}

export default App;

