import { useEffect, useReducer, useRef } from "react";
import { useNavigate, useSearchParams, useParams, Link } from "react-router-dom";
import SignupCard from "@/Components/SignupCard/SignupCard";
import { Lock } from "@/Components/icons";
import img2 from "@/assets/img2.png";
import userIcon from "@/assets/icons/user.svg";
import mailImage from "@/assets/mail.png";
import "./Emailverify.css";
import { authApi } from "@/services/api";
import { APP_STRINGS, FORM_ERRORS } from "@/constants/string";

const initialState = {
  status: "verifying", // verifying | success | error
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "VERIFY_START":
      return { status: "verifying", errorMessage: "" };
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
  const { token: pathToken } = useParams();
  const [searchParams] = useSearchParams();
  const queryToken =
    searchParams.get("token") ||
    searchParams.get("code") ||
    searchParams.get("key") ||
    searchParams.get("verification_token") ||
    "";
  const token = (pathToken || queryToken || "").trim();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, errorMessage } = state;
  const mountedRef = useRef(true);
  const hasFiredRef = useRef(false);
  const verifyFailedMsg = FORM_ERRORS.AUTH.VERIFY_FAILED || STRINGS.INVALID_TOKEN_ERROR;

  const executeVerify = async (tokenToVerify) => {
    if (!tokenToVerify) {
      dispatch({ type: "VERIFY_ERROR", error: "Verification token is missing. Please check your link or paste the token below." });
      return;
    }
    dispatch({ type: "VERIFY_START" });
    try {
      await authApi.verifyEmail(tokenToVerify);
      try {
        localStorage.setItem("techguild_email_verified", Date.now().toString());
      } catch {
        // ignore
      }
      if (mountedRef.current) dispatch({ type: "VERIFY_SUCCESS" });
    } catch (err) {
      const msg = String(err?.message || "").toLowerCase();
      if (msg.includes("already verified") || msg.includes("already active")) {
        try {
          localStorage.setItem("techguild_email_verified", Date.now().toString());
        } catch {
          // ignore
        }
        if (mountedRef.current) dispatch({ type: "VERIFY_SUCCESS" });
        return;
      }
      if (mountedRef.current) {
        dispatch({ type: "VERIFY_ERROR", error: err?.message || verifyFailedMsg });
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    if (!token) {
      dispatch({ type: "VERIFY_ERROR", error: "No verification token found in link. Please paste your token or check your email." });
      return;
    }
    if (hasFiredRef.current) return;
    hasFiredRef.current = true;

    executeVerify(token);

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
            <div className="mt-3 mb-3 text-center">
              <div className="verified-error mb-3" role="alert">
                {errorMessage}
              </div>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <Link to="/verify-email" className="btn btn-sm btn-outline-secondary">
                  Resend Verification Email
                </Link>
                <Link to="/login" className="btn btn-sm text-white" style={{ backgroundColor: "#103ca4" }}>
                  Sign In
                </Link>
              </div>
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
