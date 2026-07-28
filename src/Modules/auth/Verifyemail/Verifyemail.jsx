import { Mail, CheckCircle2 } from "lucide-react";
import SignupCard from "../../../Components/SignupCard/SignupCard";
import PrimaryButton from "../../../Components/Button/Primarybutton";
import img2 from "../../../assets/img2.png"; // change extension if png/webp
import { useNavigate } from "react-router-dom";

import "./Verifyemail.css";

export default function VerifyEmail() {
  const email = "enteremailaddress@gmail.com";
  const navigate = useNavigate();

  const handleResend = () => {
    navigate("/emailverify");
  };

  const handleOpenGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  return (
    <div
      className="verify-page"
      style={{ backgroundImage: `url(${img2})` }}
    >
      <div className="overlay"></div>

      <SignupCard>
        <div className="verify-content">

          <div className="mail-icon-wrapper">
            <Mail size={48} strokeWidth={1.8} />
            <span className="badge">
              <CheckCircle2 size={16} />
            </span>
          </div>

          <h2>Verify Your Email To Continue.</h2>

          <p className="verify-text">
            We just sent an email to the address :
          </p>

          <p className="email">{email}</p>

          <p className="verify-text">
            Please check your email and click the link provided to ,
             <br /> 
            verify your email address.
          </p>

          <div className="verify-buttons">
            <button
              className="secondary-btn"
              onClick={handleResend}
            >
              Send Again
            </button>

            <PrimaryButton
              text="Go to Gmail Inbox"
              onClick={handleOpenGmail}
            />
          </div>

          <p className="footer-text">
            Build trust, unlock more opportunities,
            <br />
            Earn Trust Points !
          </p>

        </div>
      </SignupCard>
    </div>
  );
}