import { Fragment, useEffect, useRef, useState } from "react";
import {
  Popup,
  PrimaryButton,
  SecondaryButton,
} from "@/Components";
import {
  CheckCircle2,
  Google,
  QrCode,
} from "@/Components/icons";
import "./AccountSecurity2FA.css";

// Stub verification: only this code "passes" until a backend exists.
const VALID_CODE = "123456";

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

const OTP_LENGTH = 6;

function AppIcon({ id }) {
  if (id === "google") return <Google width={16} height={16} />;
  return (
    <span className="as2fa-app-badge">
      {id === "microsoft" ? "M" : "A"}
    </span>
  );
}

// Figma "Manage-2FA scan QR": QR frame + 1-minute note pill only.
function ScanQr() {
  return (
    <>
      <div className="as2fa-qr-frame">
        <div className="as2fa-qr-box" aria-hidden="true">
          <QrCode width={120} height={120} />
        </div>
      </div>
      <p className="as2fa-qr-note">
        &bull; Please scan this QR code within 1 minute. If not scanned, a
        new QR will be generated.
      </p>
    </>
  );
}

function OtpInput({ values, onChange, error }) {
  const refs = useRef([]);

  const update = (index, char) => {
    const next = [...values];
    if (char === "") {
      next[index] = "";
    } else {
      next[index] = char.slice(-1);
      if (index < OTP_LENGTH - 1 && char) {
        refs.current[index + 1]?.focus();
      }
    }
    onChange(next);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (index, event) => {
    const text = event.clipboardData.getData("text");
    if (!/^\d{1,6}$/.test(text)) return;
    event.preventDefault();
    const digits = text.split("").slice(0, OTP_LENGTH);
    const next = [...values];
    digits.forEach((d, i) => {
      if (index + i < OTP_LENGTH) next[index + i] = d;
    });
    onChange(next);
    refs.current[Math.min(index + digits.length, OTP_LENGTH - 1)]?.focus();
  };

  return (
    <div
      className={`as2fa-otp${error ? " as2fa-otp--error" : ""}`}
      role="group"
      aria-label="One time password"
    >
      {Array.from({ length: OTP_LENGTH }, (_, i) => (
        <Fragment key={i}>
          <input
            ref={(el) => (refs.current[i] = el)}
            className="as2fa-otp-input"
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-label={`One time password digit ${i + 1}`}
            value={values[i] || ""}
            onChange={(event) => update(i, event.target.value)}
            onKeyDown={(event) => handleKeyDown(i, event)}
            onPaste={(event) => handlePaste(i, event)}
            maxLength={1}
          />
          {i === OTP_LENGTH / 2 - 1 && (
            <span className="as2fa-otp-sep" aria-hidden="true">
              -
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default function AccountSecurity2FA({ open, onClose = () => {} }) {
  const [step, setStep] = useState(1);
  const [selectedApp, setSelectedApp] = useState(null);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Reset internal state every time the popup is (re)opened.
  useEffect(() => {
    if (!open) return;
    setStep(1);
    setSelectedApp(null);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError(false);
    setSuccess(false);
  }, [open]);

  // Figma's scan-QR frame has no buttons, so the scan step auto-advances.
  // Stub for backend "scan detected" polling until a real API exists.
  useEffect(() => {
    if (!open || success || step !== 2) return;
    const timer = setTimeout(() => setStep(3), 5000);
    return () => clearTimeout(timer);
  }, [open, success, step]);

  const close = () => {
    onClose();
  };

  const handleContinue = () => {
    if (!selectedApp) return;
    setStep(2);
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) return;
    if (code === VALID_CODE) {
      setError(false);
      setSuccess(true);
    } else {
      setError(true);
    }
  };

  const handleDone = () => {
    close();
  };

  const isWide = step === 1;

  const renderStep = () => {
    if (success) {
      return (
        <div className="as2fa-success">
          <CheckCircle2 className="as2fa-success-icon" width={192} height={192} />
          <p className="as2fa-success-title">
            Authenticator App linked successfully!
          </p>
        </div>
      );
    }

    switch (step) {
      case 1:
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
      case 2:
        return (
          <div className="as2fa-body as2fa-scan-body">
            <ScanQr />
          </div>
        );
      case 3:
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
                The code you entered is incorrect. Please try again
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const renderFooter = () => {
    if (success) {
      return <PrimaryButton text="Done" onClick={handleDone} className="as2fa-footer-btn" />;
    }

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

    // Step 2 (scan QR) has no footer in Figma — it auto-advances (see effect above).
    if (step === 2) {
      return null;
    }

    // step 3
    return (
      <div className="as2fa-footer-row">
        <SecondaryButton text="Back" onClick={() => setStep(2)} className="as2fa-footer-secondary" />
        <PrimaryButton
          text="Verify & Save"
          onClick={handleVerify}
          disabled={otp.join("").length !== OTP_LENGTH}
          className="as2fa-footer-primary"
        />
      </div>
    );
  };

  return (
    <Popup
      open={open}
      onClose={close}
      title={success
        ? undefined
        : step === 1
          ? "Choose & Download "
          : step === 2
            ? "Scan this barcode/QR code"
            : "Verify your code"}
      subtitle={
        success
          ? undefined
          : step === 1
            ? "Select one of the authenticator apps below and download it on your mobile device."
            : step === 2
              ? "Scan this barcode/QR code in the authentication app"
              : "Enter 6 Digit code from your app"
      }
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
