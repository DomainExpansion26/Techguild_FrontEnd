import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/SignUp/SignUp";
import Login from "./Pages/SignIn/Login";
import ForgetPass from "./Pages/ForgotPassword/ForgetPass";
import ResetPass from "./Pages/ResetPassword/ResetPass";

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
