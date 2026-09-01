import SignupCard from "../../../Components/SignupCard/SignupCard";
import PrimaryButton from "../../../Components/Button/Primarybutton";
import SecondaryButton from "../../../Components/SecondaryButton/SecondaryButton";
import img2 from "../../../assets/img2.png";
import userIcon from "../../../assets/icons/user.svg";
import mailCommentIcon from "../../../assets/mail-comment.png";
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
      <header className="auth-header">
        <div className="auth-header-logo" onClick={() => navigate("/")}>
          <span className="logo-tech">Tech</span>
          <span className="logo-guild">Guild</span>
        </div>
        <div className="auth-header-profile">
          <img src={userIcon} alt="Profile Icon" className="header-profile-icon" />
        </div>
      </header>

      <div className="overlay"></div>

      <SignupCard>
        <div className="verify-content">

          <div className="mail-icon-wrapper">
            <img src={mailCommentIcon} alt="Mail" style={{ width: '130px', height: 'auto' }} />
          </div>

          <h2>Verify Your Email To Continue.</h2>

          <p className="verify-text">
            We just sent an email to the address :
          </p>
          <p className="email">{email}</p>
          <p className="verify-text">
            Please check your email and click the link provided to verify your email address.
          </p>

          <div className="verify-buttons">
            <SecondaryButton
              text="Send Again"
              onClick={handleResend}
            />

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