import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/SignUp/SignUp";
import Login from "./Pages/SignIn/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
