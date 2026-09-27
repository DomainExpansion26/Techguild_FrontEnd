import { useEffect, useReducer, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SignupCard from "@/Components/SignupCard/SignupCard";
import { Lock } from "@/Components/icons";
import img2 from "@/assets/img2.png";
import userIcon from "@/assets/icons/user.svg";
import mailImage from "@/assets/mail.png";
import "./Emailverify.css";
import authApi from "@/features/auth/api/authApi";
import { APP_STRINGS, FORM_ERRORS } from "@/constants/string";

const initialState = {
  status: "verifying", // verifying | success | error
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "VERIFY_SUCCESS":
      return { status: "success", errorMessage: "" };
    case "VERIFY_ERROR":
      return { status: "error", errorMessage: action.error };
    default:
      return state;
  }
}

export default function EmailVerified() {
  const STRINGS = APP_STRINGS.AUTH.EMAIL_VERIFIED;
  const BRAND = APP_STRINGS.AUTH.HOME_SCREEN;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = (searchParams.get("token") || "").trim();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, errorMessage } = state;
  const mountedRef = useRef(true);
  const verifyFailedMsg = FORM_ERRORS.AUTH.VERIFY_FAILED || STRINGS.INVALID_TOKEN_ERROR;

  useEffect(() => {
    mountedRef.current = true;
    if (!token) {
      dispatch({ type: "VERIFY_ERROR", error: verifyFailedMsg });
      return;
    }
    async function verify() {
      try {
        await authApi.verifyEmail(token);
        if (mountedRef.current) dispatch({ type: "VERIFY_SUCCESS" });
      } catch (err) {
        if (mountedRef.current) {
          dispatch({ type: "VERIFY_ERROR", error: err?.message || verifyFailedMsg });
        }
      }
    }
    verify();
    return () => {
      mountedRef.current = false;
    };
  }, [token, verifyFailedMsg]);

  const steps = [
    {
      title: STRINGS.STEPS.EMAIL_VERIFIED_TITLE,
      points: STRINGS.STEPS.EMAIL_VERIFIED_POINTS,
      active: true,
    },
    {
      title: STRINGS.STEPS.PROFILE_COMPLETED_TITLE,
      points: STRINGS.STEPS.PROFILE_COMPLETED_POINTS,
      active: false,
    },
    {
      title: STRINGS.STEPS.IDENTITY_VERIFIED_TITLE,
      points: STRINGS.STEPS.IDENTITY_VERIFIED_POINTS,
      active: false,
    },
    {
      title: STRINGS.STEPS.FIRST_PROJECT_TITLE,
      points: STRINGS.STEPS.FIRST_PROJECT_POINTS,
      active: false,
    },
  ];

  const handleContinue = () => {
    navigate("/account-type");
  };

  return (
    <div
      className="verified-page"
      style={{ backgroundImage: `url(${img2})` }}
    >
      <header className="verified-header">
        <div className="verified-header-logo" onClick={() => navigate("/")}>
          <span className="logo-tech">{BRAND.BRAND_TECH}</span>
          <span className="logo-guild">{BRAND.BRAND_GUILD}</span>
        </div>
        <div className="verified-header-profile" aria-hidden="true">
          <img src={userIcon} alt="" className="verified-profile-icon" />
        </div>
      </header>

      <SignupCard>
        <div className="verified-container">
          <div className="verified-illust">
            <img src={mailImage} alt="Email verified" />
          </div>

          <h2 className="verified-title">
            {status === "verifying" ? STRINGS.VERIFYING_TITLE : STRINGS.SUCCESS_TITLE}
          </h2>

          {status === "error" ? (
            <div className="verified-error" role="alert">
              {errorMessage}
            </div>
          ) : (
            <div className="reward-card">
              <h4>{STRINGS.REWARD_TITLE}</h4>
              <p>{STRINGS.REWARD_SUBTITLE}</p>
            </div>
          )}

          <div className="verify-progress">
            <div className="line"></div>

            {steps.map((step) => (
              <div key={step.title} className={`step${step.active ? " active" : ""}`}>
                <div className="circle">
                  {!step.active && <Lock width={20} height={20} />}
                </div>
                <h5>{step.title}</h5>
                <span>{step.points}</span>
              </div>
            ))}
          </div>

          <button
            className="continueBtn"
            onClick={handleContinue}
            disabled={status !== "success"}
          >
            {STRINGS.CONTINUE_BTN}
          </button>
        </div>
      </SignupCard>
    </div>
  );
}
