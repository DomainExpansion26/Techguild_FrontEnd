import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignupCard from "@/Components/SignupCard/SignupCard";
import { User, Building2, Briefcase } from "@/Components/icons";
import img2 from "@/assets/img2.png";
import userIcon from "@/assets/icons/user.svg";
import "./Accounttype.css";
import authApi from "@/features/auth/api/authApi";
import { useAuth } from "@/context/AuthContext";
import { showSnackbar } from "@/store";

export default function AccountType() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const pendingUser = JSON.parse(localStorage.getItem("techguild_pending_user") || "{}");
  const email = location?.state?.email || pendingUser?.email || "";
  const password = location?.state?.password || pendingUser?.password || "";
  const firstName = location?.state?.firstName || pendingUser?.firstName || "";
  const lastName = location?.state?.lastName || pendingUser?.lastName || "";
  const fullName = (firstName && lastName)
    ? `${firstName} ${lastName}`.trim()
    : (pendingUser?.name || (email ? email.split("@")[0] : "User"));

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

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    setErrorMessage("");

    try {
      if (email && password) {
        // 1. Register account type on backend
        await authApi.registerAccountType({
          email,
          password,
          account_type: selected,
        });

        // 2. Automatically log in with credentials to obtain a real JWT Bearer token
        const loginRes = await authApi.login({ email, password });
        const realToken = loginRes?.access_token;

        if (realToken) {
          await login({
            email,
            name: fullName,
            role: selected,
            avatar: fullName.charAt(0).toUpperCase(),
          }, realToken, selected);
        }

        dispatch(showSnackbar({
          message: `Welcome to TechGuild as a ${selected}!`,
          type: "success",
        }));
      }

      if (selected === "client") {
        navigate("/client-profile");
      } else if (selected === "agency") {
        navigate("/agency/dashboard");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Account type selection error:", err);
      const isUnverified = err?.status === 400 || err?.message?.toLowerCase().includes("verify your email");
      const msg = isUnverified
        ? "Please verify your email first before continuing. Check your inbox."
        : (err?.message || "Failed to set account type. Please try again.");
      setErrorMessage(msg);
      dispatch(showSnackbar({ message: msg, type: "error" }));

      if (isUnverified) {
        setTimeout(() => {
          navigate("/verify-email", {
            state: { email, firstName, lastName, password },
          });
        }, 1800);
      }
    } finally {
      setLoading(false);
    }
  };

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

          {errorMessage && (
            <div
              style={{
                padding: "8px 12px",
                marginBottom: "12px",
                borderRadius: "6px",
                backgroundColor: "#fee2e2",
                color: "#b91c1c",
                fontSize: "12px",
              }}
            >
              {errorMessage}
            </div>
          )}

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
            disabled={!selected || loading}
            onClick={handleContinue}
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        </div>
      </SignupCard>
    </div>
  );
}
