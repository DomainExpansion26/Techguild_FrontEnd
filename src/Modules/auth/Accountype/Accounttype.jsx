import { useState } from "react";
import SignupCard from "../../../Components/SignupCard/SignupCard";
import { User, Building2, Briefcase } from "lucide-react";
import img2 from "../../../assets/img2.png";
import "./Accounttype.css";

export default function AccountType() {
  const [selected, setSelected] = useState("individual");

  const accountTypes = [
    {
      id: "individual",
      title: "Individual",
      icon: <User size={22} />,
      description:
        "Join as a freelancer, student or professional to find opportunities and build trust."
    },
    {
      id: "agency",
      title: "Agency",
      icon: <Building2 size={22} />,
      description:
        "Manage multiple team members and showcase your agency's services."
    },
    {
      id: "client",
      title: "Client",
      icon: <Briefcase size={22} />,
      description:
        "Hire freelancers, agencies and manage your projects efficiently."
    }
  ];

  return (
    <div
      className="account-page"
      style={{ backgroundImage: `url(${img2})` }}
    >
      <div className="overlay"></div>

      <SignupCard>
        <div className="account-container">
          <h2>Choose Your Account Type</h2>

          <p className="subtitle">
            Select the option that best describes how you'll use TechGuild.
          </p>

          <div className="account-list">
            {accountTypes.map((item) => (
              <div
                key={item.id}
                className={`account-card ${
                  selected === item.id ? "active" : ""
                }`}
                onClick={() => setSelected(item.id)}
              >
                <div className="account-icon">
                  {item.icon}
                </div>

                <div className="account-info">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="radio">
                  <div
                    className={`dot ${
                      selected === item.id ? "selected" : ""
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button className="continue-btn">
            Continue
          </button>
        </div>
      </SignupCard>
    </div>
  );
}