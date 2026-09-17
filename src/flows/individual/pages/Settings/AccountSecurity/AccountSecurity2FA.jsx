import { useEffect, useRef, useState } from "react";
import {
  OtpInput,
  PasswordInput,
  Popup,
  PrimaryButton,
  SecondaryButton,
} from "@/Components";
import { CircleCheck, Google, QrCode } from "@/Components/icons";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store";
import { twoFaApi } from "@/features/auth/api/twoFaApi";
import "./AccountSecurity2FA.css";

const OTP_LENGTH = 6;

// A fresh QR code is provisioned every minute. The backend's expires_at is
// provisioned longer (10 min), so the countdown/auto-refresh uses this TTL.
const QR_TTL_MS = 60 * 1000;

const APPS = [
  {
    id: "google",
    name: "Google Authenticator",
    tagline: "Free OTP generator for secure logins",
  },
  {
    id: "microsoft",
    name: "Microsoft Authenticator",
    tagline: "Trusted app with backup & sync",
  },
  {
    id: "authy",
    name: "Authy",
    tagline: "Multi-device support & cloud backup",
  },
];

function AppIcon({ id }) {
  if (id === "google") return <Google width={16} height={16} />;
  return (
    <span className="as2fa-app-badge">
      {id === "microsoft" ? "M" : "A"}
    </span>
  );
}

const formatRemaining = (ms) => {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

function ScanQr({ setup, loading, error, expired, retry, disabled, remaining }) {
  return (
    <>
      <div className="as2fa-qr-frame">
        <div className="as2fa-qr-box">
          {loading ? (
            <span className="as2fa-qr-status">Generating QR code…</span>
          ) : error ? (
            <span className="as2fa-qr-status">{error}</span>
          ) : expired ? (
            <span className="as2fa-qr-status">QR code expired</span>
          ) : setup?.qr_code_image ? (
            <img
              className="as2fa-qr-img"
              src={setup.qr_code_image}
              alt="Two-factor authentication (2FA) QR code"
            />
          ) : setup?.provisioning_uri ? (
            <div className="as2fa-qr-provisioning" title={setup.provisioning_uri}>
              <QrCode width={120} height={120} />
              <span>{setup.provisioning_uri}</span>
            </div>
          ) : (
            <div className="as2fa-qr-box-placeholder">
              <QrCode width={120} height={120} />
            </div>
          )}
        </div>
      </div>
      <p className="as2fa-qr-note">
        &bull; Please scan this QR code within 1 minute. If not scanned, a new
        QR will be generated.
        {!loading && !error && !expired && remaining > 0 && (
          <span className="as2fa-qr-expiry">
            {" "}
            Time remaining: {formatRemaining(remaining)}
          </span>
        )}
      </p>
      {expired && (
        <SecondaryButton
          text={loading ? "Generating…" : "Generate new QR code"}
          className="as2fa-qr-retry"
          onClick={retry}
          disabled={disabled}
        />
      )}
    </>
  );
}

export default function AccountSecurity2FA({ open, onClose = () => {}, enabled = false }) {
  const dispatch = useDispatch();
  const { updateUser } = useAuth();

  // Setup flow (2FA not yet enabled)
  const [step, setStep] = useState(1);
  const [selectedApp, setSelectedApp] = useState(null);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [setup, setSetup] = useState(null);
  const [setupLoading, setSetupLoading] = useState(false);
  const [setupError, setSetupError] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);
  const [verifying, setVerifying] = useState(false);

  // Manage mode (2FA enabled)
  const [view, setView] = useState("overview");
  const [password, setPassword] = useState("");
  const [manageOtp, setManageOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [manageError, setManageError] = useState("");
  const [busy, setBusy] = useState(false);

  // Tracks the absolute instant the current QR code expires (in the UI),
  // plus a guard so a single expiry only triggers one regeneration.
  const qrExpiresAtRef = useRef(0);
  const qrRefreshingRef = useRef(false);

  // Reset internal state every time the popup is (re)opened.
  // Adjusting state during render (instead of in an effect) keeps the
  // popup fully clicking/re-fetching fresh on every open.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setError(false);
      setErrorMessage("");
      setVerifying(false);
      setBusy(false);
      setManageError("");
      setPassword("");
      if (enabled) {
        setView("overview");
      } else {
        setStep(1);
        setSelectedApp(null);
        setOtp(Array(OTP_LENGTH).fill(""));
        setSetup(null);
        setSetupError("");
        setIsExpired(false);
        setRemainingMs(0);
      }
    }
  }

  const loadSetup = async () => {
    setSetupLoading(true);
    setSetupError("");
    setSetup(null);
    setRemainingMs(QR_TTL_MS);
    setIsExpired(false);
    qrExpiresAtRef.current = Date.now() + QR_TTL_MS;
    try {
      const res = await twoFaApi.setup();
      setSetup(res);
    } catch (err) {
      setSetupError(err?.message || "Could not generate a QR code. Please try again.");
    } finally {
      setSetupLoading(false);
    }
  };

  // Fetch a fresh TOTP secret + QR when the scan step is reached.
  useEffect(() => {
    if (!open || enabled || step !== 2 || setup || setupLoading) return;
    qrRefreshingRef.current = false;
    const id = setTimeout(loadSetup, 0);
    return () => clearTimeout(id);
  }, [open, enabled, step, setup, setupLoading]);

  // Count down over the fixed 1-minute window and auto-generate a new QR
  // when it expires.
  useEffect(() => {
    if (!open || enabled || !setup) return;
    const id = setInterval(() => {
      const remaining = qrExpiresAtRef.current - Date.now();
      setRemainingMs(Math.max(0, remaining));
      if (remaining <= 0 && !qrRefreshingRef.current) {
        qrRefreshingRef.current = true;
        setSetup(null); // the fetch effect above mints a fresh QR
        setIsExpired(true);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [open, enabled, setup]);

  const close = () => {
    onClose();
  };

  const handleContinue = () => {
    if (!selectedApp) return;
    setStep(2);
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) return;
    setVerifying(true);
    setError(false);
    setErrorMessage("");
    try {
      await twoFaApi.verifySetup({ code });
      updateUser({ two_factor_enabled: true });
      dispatch(
        showSnackbar({
          message: "Two-factor authentication enabled.",
          type: "success",
        })
      );
      close();
    } catch (err) {
      setError(true);
      setErrorMessage(err?.message || "The code you entered is incorrect. Please try again");
    } finally {
      setVerifying(false);
    }
  };

  const handleDisable = async () => {
    if (!password || manageOtp.join("").length !== OTP_LENGTH) return;
    setBusy(true);
    setManageError("");
    try {
      await twoFaApi.disable({ password, code: manageOtp.join("") });
      updateUser({ two_factor_enabled: false });
      dispatch(
        showSnackbar({
          message: "Two-factor authentication disabled.",
          type: "success",
        })
      );
      close();
    } catch (err) {
      setManageError(err?.message || "Failed to disable 2FA. Check your password and code.");
    } finally {
      setBusy(false);
    }
  };

  const isWide = !enabled && step === 1;

  const getTitle = () => {
    if (enabled) {
      return view === "overview"
        ? "Two-Factor Authentication"
        : "Disable 2FA";
    }
    return step === 1
      ? "Choose & Download "
      : step === 2
        ? "Scan this barcode/QR code"
        : "Verify your code";
  };

  const getSubtitle = () => {
    if (enabled) {
      return view === "overview"
        ? "2FA is enabled. Manage your security settings below."
        : "Enter your password and the current code from your authenticator app to disable two-factor authentication.";
    }
    return step === 1
      ? "Select one of the authenticator apps below and download it on your mobile device."
      : step === 2
        ? "Scan this barcode/QR code in the authentication app"
        : "Enter 6 Digit code from your app";
  };

  const renderStep = () => {
    // Manage mode
    if (enabled) {
      if (view === "overview") {
        return (
          <div className="as2fa-manage-overview">
            <div className="as2fa-manage-status">
              <CircleCheck width={16} height={16} />
              <span>
                2FA is enabled — you use an authenticator app for sign-in.
              </span>
            </div>
          </div>
        );
      }
      if (view === "disable") {
        return (
          <div className="as2fa-manage-form">
            <PasswordInput
              label="Current Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (manageError) setManageError("");
              }}
            />
            <div className="as2fa-manage-otp">
              <span className="as2fa-manage-field-label">
                Authenticator code
              </span>
              <OtpInput
                values={manageOtp}
                onChange={(next) => {
                  setManageOtp(next);
                  if (manageError) setManageError("");
                }}
                error={!!manageError}
              />
            </div>
            {manageError && <p className="as2fa-error">{manageError}</p>}
          </div>
        );
      }
    }

    // Setup mode
    if (step === 1) {
      return (
        <div className="as2fa-body">
          <div className="as2fa-app-grid">
            {APPS.map((app) => {
              const selected = selectedApp === app.id;
              return (
                <button
                  key={app.id}
                  type="button"
                  className={`as2fa-app-card${selected ? " as2fa-app-card--selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => setSelectedApp(app.id)}
                >
                  <span className="as2fa-app-top">
                    <span className="as2fa-app-logo">
                      <AppIcon id={app.id} />
                    </span>
                    <span className="as2fa-app-name">{app.name}</span>
                  </span>
                  <span className="as2fa-app-tagline">{app.tagline}</span>
                </button>
              );
            })}
          </div>
        </div>
      );
    }
    if (step === 2) {
      return (
        <div className="as2fa-body as2fa-scan-body">
          <ScanQr
            setup={setup}
            loading={setupLoading}
            error={setupError}
            expired={isExpired}
            retry={loadSetup}
            disabled={setupLoading}
            remaining={remainingMs}
          />
        </div>
      );
    }
    if (step === 3) {
      return (
        <div className="as2fa-body as2fa-verify-body">
          <OtpInput
            values={otp}
            onChange={(next) => {
              setOtp(next);
              if (error) setError(false);
            }}
            error={error}
          />
          {error && (
            <p className="as2fa-error">
              {errorMessage || "The code you entered is incorrect. Please try again"}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderFooter = () => {
    // Manage mode
    if (enabled) {
      if (view === "overview") {
        return (
          <div className="as2fa-footer-row">
            <PrimaryButton
              text="Disable 2FA"
              onClick={() => {
                setPassword("");
                setManageOtp(Array(OTP_LENGTH).fill(""));
                setManageError("");
                setView("disable");
              }}
              className="as2fa-footer-primary as2fa-danger-btn"
            />
          </div>
        );
      }
      if (view === "disable") {
        const canSubmit =
          !busy && password && manageOtp.join("").length === OTP_LENGTH;
        return (
          <div className="as2fa-footer-row">
            <SecondaryButton
              text="Back"
              onClick={() => setView("overview")}
              className="as2fa-footer-secondary"
              disabled={busy}
            />
            <PrimaryButton
              text={busy ? "Disabling…" : "Disable 2FA"}
              onClick={handleDisable}
              disabled={!canSubmit}
              className="as2fa-footer-primary as2fa-danger-btn"
            />
          </div>
        );
      }
      return null;
    }

    // Setup mode
    if (step === 1) {
      return (
        <div className="as2fa-footer-row">
          <SecondaryButton text="Cancel" onClick={close} className="as2fa-footer-secondary" />
          <PrimaryButton
            text="Continue"
            onClick={handleContinue}
            disabled={!selectedApp}
            className="as2fa-footer-primary"
          />
        </div>
      );
    }
    if (step === 2) {
      const canContinue = !setupLoading && !!setup && !setupError && !isExpired;
      return (
        <div className="as2fa-footer-row">
          <SecondaryButton
            text="Back"
            onClick={() => setStep(1)}
            className="as2fa-footer-secondary"
          />
          <PrimaryButton
            text="I've scanned the code"
            onClick={() => {
              setOtp(Array(OTP_LENGTH).fill(""));
              setError(false);
              setStep(3);
            }}
            disabled={!canContinue}
            className="as2fa-footer-primary"
          />
        </div>
      );
    }
    if (step === 3) {
      return (
        <div className="as2fa-footer-row">
          <SecondaryButton
            text="Back"
            onClick={() => setStep(2)}
            className="as2fa-footer-secondary"
            disabled={verifying}
          />
          <PrimaryButton
            text={verifying ? "Verifying…" : "Verify & Save"}
            onClick={handleVerify}
            disabled={verifying || otp.join("").length !== OTP_LENGTH}
            className="as2fa-footer-primary"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <Popup
      open={open}
      onClose={close}
      title={getTitle()}
      subtitle={getSubtitle()}
      footer={renderFooter()}
      cardClassName="as2fa-card"
      headerClassName="as2fa-header"
      footerClassName="as2fa-footer"
      style={
        isWide
          ? { "--popup-width": "833px", padding: "10px" }
          : { "--popup-width": "596px", padding: "30px 38px" }
      }
    >
      {renderStep()}
    </Popup>
  );
}