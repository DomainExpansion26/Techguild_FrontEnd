// [TechGuild Update: 30-09-2026] Bg uses existing img2.png (no visual change).
import { useEffect, useReducer, useState, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SignupCard from "@/Components/SignupCard/SignupCard";
import { ArrowLeft } from "@/Components/icons";
import img2 from "@/assets/img2.png";
import userIcon from "@/assets/icons/user.svg";
import mailCommentIcon from "@/assets/mail-comment.png";
import "./Verifyemail.css";
import { authApi } from "@/services/api";
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
  const queryToken =
    searchParams.get("token") ||
    searchParams.get("code") ||
    searchParams.get("key") ||
    searchParams.get("verification_token") ||
    "";
  const token = queryToken.trim();
  const email = readPendingEmail(location?.state?.email);

  let pendingPassword = "";
  try {
    pendingPassword = location?.state?.password || sessionStorage.getItem("techguild_pending_password") || "";
  } catch {
    pendingPassword = "";
  }

  const [checking, setChecking] = useState(false);

  // If a token is in the URL, forward directly to email verification
  useEffect(() => {
    if (token) {
      navigate(`/emailverify?token=${encodeURIComponent(token)}`, { replace: true });
    }
  }, [token, navigate]);

  // Cross-tab detection: when another tab completes email verification
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "techguild_email_verified") {
        navigate("/account-type", {
          state: { email, password: pendingPassword },
          replace: true,
        });
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [navigate, email, pendingPassword]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { resending, statusKind, statusMessage } = state;

  // Auto-check if verified (polls every 5s if credentials are in session)
  const checkVerifiedStatus = useCallback(async (isManual = false) => {
    if (!email || checking) return;
    if (isManual) setChecking(true);
    try {
      if (pendingPassword) {
        const res = await authApi.login({ email, password: pendingPassword });
        if (res?.access_token) {
          try {
            localStorage.setItem("techguild_email_verified", Date.now().toString());
          } catch {
            // ignore
          }
          dispatch({ type: "RESEND_SUCCESS", message: "Email verified! Automatically taking you to account setup..." });
          setTimeout(() => {
            navigate("/account-type", {
              state: { email, password: pendingPassword },
              replace: true,
            });
          }, 1000);
          return;
        }
      }
      if (isManual) {
        dispatch({
          type: "RESEND_ERROR",
          message: "Account not verified yet. Please click the link in your email or paste the token below.",
        });
      }
    } catch {
      if (isManual) {
        dispatch({
          type: "RESEND_ERROR",
          message: "Account not verified yet. Please check your email inbox and spam folder.",
        });
      }
    } finally {
      if (isManual) setChecking(false);
    }
  }, [email, pendingPassword, checking, navigate]);

  useEffect(() => {
    if (!email || !pendingPassword) return;
    const interval = setInterval(() => {
      checkVerifiedStatus(false);
    }, 4500);
    return () => clearInterval(interval);
  }, [email, pendingPassword, checkVerifiedStatus]);

  const handleResend = async () => {
    if (resending) return;
    if (!email) {
      dispatch({ type: "RESEND_ERROR", message: STRINGS.NO_EMAIL });
      return;
    }
    dispatch({ type: "RESEND_START" });
    try {
      await authApi.resendVerification({ email });
      dispatch({
        type: "RESEND_SUCCESS",
        message: "New verification email sent! Please check your inbox and Spam / Promotions folder.",
      });
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
              className={`verify-status verify-status-${statusKind} mb-3`}
              role={statusKind === "error" ? "alert" : "status"}
            >
              {statusMessage}
            </div>
          )}

          <p className="verify-desc">
            {STRINGS.INFO_SENT} <strong>{email || "your registered email"}</strong>
            <br />
            {STRINGS.INFO_INSTRUCTIONS}
          </p>

          <div className="alert alert-info py-2 px-3 text-start mb-3" style={{ fontSize: "12px", borderRadius: "8px" }}>
            💡 <strong>Tip:</strong> If you don't see the email within 1-2 minutes, please check your <strong>Spam / Junk</strong> or <strong>Promotions</strong> folder.
          </div>

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

          <div className="mt-3 text-center">
            <button
              type="button"
              className="btn btn-sm btn-link text-decoration-none"
              style={{ color: "#103ca4", fontWeight: 600, fontSize: "13px" }}
              disabled={checking}
              onClick={() => checkVerifiedStatus(true)}
            >
              {checking ? "Checking verification status..." : "I've already clicked the email link"}
            </button>
          </div>

          <p className="verify-trust mt-4">
            {STRINGS.TRUST_LINE1}
            <br />
            {STRINGS.TRUST_LINE2}
          </p>
        </div>
      </SignupCard>
    </div>
  );
}
