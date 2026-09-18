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
import { APP_STRINGS, TOAST_MESSAGES, FORM_ERRORS } from "@/constants/string";

export default function AccountType() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const STRINGS = APP_STRINGS.AUTH.ACCOUNT_TYPE;
  const BRAND = APP_STRINGS.AUTH.HOME_SCREEN;

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
      id: STRINGS.TYPES.INDIVIDUAL.ID,
      title: STRINGS.TYPES.INDIVIDUAL.TITLE,
      icon: <User width={28} height={28} />,
      description: STRINGS.TYPES.INDIVIDUAL.DESCRIPTION,
      points: STRINGS.TYPES.INDIVIDUAL.POINTS,
    },
    {
      id: STRINGS.TYPES.AGENCY.ID,
      title: STRINGS.TYPES.AGENCY.TITLE,
      icon: <Building2 width={28} height={28} />,
      description: STRINGS.TYPES.AGENCY.DESCRIPTION,
      points: STRINGS.TYPES.AGENCY.POINTS,
    },
    {
      id: STRINGS.TYPES.CLIENT.ID,
      title: STRINGS.TYPES.CLIENT.TITLE,
      icon: <Briefcase width={28} height={28} />,
      description: STRINGS.TYPES.CLIENT.DESCRIPTION,
      points: STRINGS.TYPES.CLIENT.POINTS,
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
          message: TOAST_MESSAGES.AUTH.WELCOME_ROLE(selected),
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
        ? TOAST_MESSAGES.AUTH.VERIFY_EMAIL_REQUIRED
        : (err?.message || FORM_ERRORS.AUTH.ACCOUNT_TYPE_FAILED);
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
          <span className="logo-tech">{BRAND.BRAND_TECH}</span>
          <span className="logo-guild">{BRAND.BRAND_GUILD}</span>
        </div>
        <div className="auth-header-profile">
          <img src={userIcon} alt="Profile Icon" className="header-profile-icon" />
        </div>
      </header>

      <div className="overlay"></div>

      <SignupCard>
        <div className="account-container">
          <h2>{STRINGS.TITLE}</h2>

          <p className="subtitle">
            {STRINGS.SUBTITLE}
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
            {loading ? STRINGS.PROCESSING_BTN : STRINGS.CONTINUE_BTN}
          </button>
        </div>
      </SignupCard>
    </div>
  );
}
