import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupCard from "../../../Components/SignupCard/SignupCard";
import { User, Building2, Briefcase } from "../../../Components/icons";
import img2 from "../../../assets/img2.png";
import userIcon from "../../../assets/icons/user.svg";
import "./Accounttype.css";

export default function AccountType() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const accountTypes = [
    {
      id: "individual",
      title: "Individual",
      icon: <User width={28} height={28} />,
      description:
        "I am a freelancer or independent professional looking for projects and opportunities.",
      points: [
        "Work on exciting projects",
        "Build your professional reputation",
        "Grow your career",
      ],
    },
    {
      id: "agency",
      title: "Agency",
      icon: <Building2 width={28} height={28} />,
      description:
        "I represent an agency or company providing professional services.",
      points: [
        "Manage your team",
        "Find new clients",
        "Scale your business",
      ],
    },
    {
      id: "client",
      title: "Client",
      icon: <Briefcase width={28} height={28} />,
      description:
        "I am a business or individual looking to hire professionals for projects.",
      points: [
        "Post projects",
        "Hire verified professionals",
        "Get work done faster",
      ],
    },
  ];

  return (
    <div
      className="account-page"
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
        <div className="account-container">
          <h2>Choose Your Account Type</h2>

          <p className="subtitle">
            Select the option that best describes you
          </p>

          <div className="account-list">
            {accountTypes.map((item) => (
              <div
                key={item.id}
                className={`account-card ${selected === item.id ? "active" : ""}`}
                onClick={() => setSelected(item.id)}
              >
                <div className="account-icon">{item.icon}</div>

                <div className="account-info">
                  <h3>{item.title}</h3>

                  <p className="desc">{item.description}</p>

                  <ul>
                    {item.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="radio">
                  <div
                    className={`dot ${selected === item.id ? "selected" : ""}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="continue-btn"
            disabled={!selected}
            onClick={() => navigate(selected === "client" ? "/client-dashboard" : "/dashboard")}
          >
            Continue
          </button>
        </div>
      </SignupCard>
    </div>
  );
}