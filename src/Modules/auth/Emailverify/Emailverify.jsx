import { useNavigate } from "react-router-dom";
import SignupCard from "../../../Components/SignupCard/SignupCard";
import {
  Mail,
  Check,
  Lock
} from "lucide-react";

import img2 from "../../../assets/img2.png";
import "./Emailverify.css";

export default function EmailVerified() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/account-type");
  };
  return (
    <div
      className="verified-page"
      style={{ backgroundImage: `url(${img2})` }}
    >
      <div className="overlay" />

      <SignupCard>

        <div className="verified-container">

          <div className="mailBox">

            <Mail size={55} strokeWidth={1.5} />

            <span className="tick">
              <Check size={18} strokeWidth={3}/>
            </span>

          </div>

          <h2>Email Verified Successfully !</h2>

          <div className="reward-card">

            <h4>Email Verified</h4>

            <p>You have earned +10 trust points!</p>

          </div>

          <div className="progress">

            <div className="line"></div>

            <div className="step active">
              <div className="circle">
                <Check size={14}/>
              </div>
              
              <h5>Email Verified</h5>

              <span>+10 Trust Points</span>
            </div>

            <div className="step">
              <div className="circle">
                <Lock size={14}/>
              </div>

              <h5>Profile Completed</h5>

              <span>+20 Trust Points</span>
            </div>

            <div className="step">
              <div className="circle">
                <Lock size={14}/>
              </div>

              <h5>Identity Verified</h5>

              <span>+40 Trust Points</span>
            </div>

            <div className="step">
              <div className="circle">
                <Lock size={14}/>
              </div>

              <h5>First Project</h5>

              <span>+30 Trust Points</span>
            </div>

          </div>

          <button className="continueBtn" onClick={handleContinue}>
            Continue to account type
          </button>

        </div>

      </SignupCard>

    </div>
  );
}