import { useEffect, useReducer } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SignupCard from "@/Components/SignupCard/SignupCard";
import { ArrowLeft } from "@/Components/icons";
import img2 from "@/assets/img2.png";
import userIcon from "@/assets/icons/user.svg";
import mailCommentIcon from "@/assets/mail-comment.png";
import "./Verifyemail.css";
import authApi from "@/features/auth/api/authApi";
import { APP_STRINGS, FORM_ERRORS } from "@/constants/string";

function readPendingEmail(stateEmail) {
  if (stateEmail) return stateEmail;
  try {
    const pending = JSON.parse(localStorage.getItem("techguild_pending_user") || "{}");
    return pending?.email || "";
  } catch {
    return "";
  }
}

const initialState = {
  resending: false,
  statusKind: "",
  statusMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "RESEND_START":
      return { resending: true, statusKind: "", statusMessage: "" };
    case "RESEND_SUCCESS":
      return { resending: false, statusKind: "success", statusMessage: action.message };
    case "RESEND_ERROR":
      return { resending: false, statusKind: "error", statusMessage: action.message };
    default:
      return state;
  }
}

export default function VerifyEmail() {
  const STRINGS = APP_STRINGS.AUTH.VERIFY_EMAIL;
  const BRAND = APP_STRINGS.AUTH.HOME_SCREEN;

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = (searchParams.get("token") || "").trim();
  const email = readPendingEmail(location?.state?.email);

  // If a token is in the URL (user clicked a verification link pointing to /verify-email?token=...)
  useEffect(() => {
    if (token) {
      navigate(`/emailverify?token=${encodeURIComponent(token)}`, { replace: true });
    }
  }, [token, navigate]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { resending, statusKind, statusMessage } = state;

  const handleResend = async () => {
    if (resending) return;
    if (!email) {
      dispatch({ type: "RESEND_ERROR", message: STRINGS.NO_EMAIL });
      return;
    }
    dispatch({ type: "RESEND_START" });
    try {
      await authApi.resendVerification({ email });
      dispatch({ type: "RESEND_SUCCESS", message: STRINGS.RESEND_SUCCESS });
    } catch (err) {
      dispatch({
        type: "RESEND_ERROR",
        message: err?.message || FORM_ERRORS.AUTH.RESEND_FAILED || STRINGS.RESEND_FAILED,
      });
    }
  };

  const handleOpenGmail = () => {
    window.open("https://mail.google.com", "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="verify-page"
      style={{ backgroundImage: `url(${img2})` }}
    >
      <header className="verify-header">
        <div className="verify-header-logo" onClick={() => navigate("/")}>
          <span className="logo-tech">{BRAND.BRAND_TECH}</span>
          <span className="logo-guild">{BRAND.BRAND_GUILD}</span>
        </div>
        <div className="verify-header-profile" aria-hidden="true">
          <img src={userIcon} alt="" className="verify-profile-icon" />
        </div>
      </header>

      <SignupCard>
        <div className="verify-content">
          <button
            type="button"
            className="verify-back-btn"
            onClick={() => navigate("/signup")}
            aria-label="Back to sign up"
          >
            <ArrowLeft width={30} height={30} />
          </button>

          <div className="verify-illust">
            <img src={mailCommentIcon} alt="Verification email sent" />
          </div>

          <h2 className="verify-title">{STRINGS.TITLE}</h2>

          {statusMessage && (
            <div
              className={`verify-status verify-status-${statusKind}`}
              role={statusKind === "error" ? "alert" : "status"}
            >
              {statusMessage}
            </div>
          )}

          <p className="verify-desc">
            {STRINGS.INFO_SENT} {email}
            <br />
            {STRINGS.INFO_INSTRUCTIONS}
          </p>

          <div className="verify-buttons">
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="verify-btn-outline"
            >
              {resending ? STRINGS.SENDING_BTN : STRINGS.SEND_AGAIN_BTN}
            </button>
            <button
              type="button"
              onClick={handleOpenGmail}
              className="verify-btn-primary"
            >
              {STRINGS.OPEN_EMAIL_BTN}
            </button>
          </div>

          <p className="verify-trust">
            {STRINGS.TRUST_LINE1}
            <br />
            {STRINGS.TRUST_LINE2}
          </p>
        </div>
      </SignupCard>
    </div>
  );
}
