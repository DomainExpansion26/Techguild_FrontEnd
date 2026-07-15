import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Modules/auth/Register/SignUp";
import Login from "./Modules/auth/Login/Login";
import ForgetPass from "./Modules/auth/ForgotPassword/Forgetpass";
import ResetPass from "./Modules/auth/ResetPassword/ResetPass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgetPass />} />
        <Route path="/reset-password" element={<ResetPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
