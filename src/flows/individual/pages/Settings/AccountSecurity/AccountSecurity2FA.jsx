import { useEffect, useRef, useState } from "react";
import {
  OtpInput,
  PasswordInput,
  Popup,
  PrimaryButton,
  SecondaryButton,
} from "@/Components";
import {
  Check,
  Download,
  Files,
  Google,
  QrCode,
  Shield,
  TriangleAlert,
} from "@/Components/icons";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store";
import { twoFaApi } from "@/features/auth/api/twoFaApi";
import "./AccountSecurity2FA.css";

const OTP_LENGTH = 6;

// A fresh QR code is provisioned for the 10-minute window below. The
// backend's expires_at is provisioned to match, so the countdown uses
// this TTL before auto-refreshing the QR.
const QR_TTL_MS = 10 * 60 * 1000;

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

const MANAGE_CHOICES = [
  {
    id: "disable",
    title: "Disable 2FA",
    desc: "Turn off Two-Factor Authentication. Your account will only require a password to log in",
    Icon: Shield,
  },
  {
    id: "regenerate",
    title: "Regenerate Backup Codes",
    desc: "Generate a new set of 10 one-time 8-digit backup codes. Old codes will no longer work",
    Icon: Files,
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

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
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
        &bull; Please scan this QR code within 10 minutes. If not scanned, a new
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

function BackupGrid({ recoveryCodes }) {
  return (
    <div className="as2fa-codes-box">
      <ol className="as2fa-backup-list">
        {recoveryCodes.map((code) => (
          <li key={code} className="as2fa-backup-code">
            {code}
          </li>
        ))}
      </ol>
    </div>
  );
}

function BackupCodes({ recoveryCodes, variant = "setup" }) {
  if (variant === "manage") {
    return (
      <div className="as2fa-backup as2fa-backup--manage">
        <BackupGrid recoveryCodes={recoveryCodes} />
        <p className="as2fa-codes-warning">
          <TriangleAlert width={10} height={10} aria-hidden="true" />
          <span>
            Save these codes securely. They won&rsquo;t be shown again.
          </span>
        </p>
      </div>
    );
  }
  return (
    <div className="as2fa-backup">
      <div className="as2fa-codes-card">
        <p className="as2fa-codes-title">Save Your Backup Codes :</p>
        <p className="as2fa-codes-desc">
          Use these codes if you don&rsquo;t have access to your
          authenticator app. Each code can be used once.
        </p>
        <BackupGrid recoveryCodes={recoveryCodes} />
        <p className="as2fa-codes-warning">
          <TriangleAlert width={10} height={10} aria-hidden="true" />
          <span>
            If you lose these codes, you may need to contact support to
            regain access.
          </span>
        </p>
      </div>
    </div>
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
  const [recoveryCodes, setRecoveryCodes] = useState([]);

  // Manage mode (2FA enabled)
  const [view, setView] = useState("overview");
  const [manageChoice, setManageChoice] = useState("disable");
  const [password, setPassword] = useState("");
  const [manageOtp, setManageOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [manageError, setManageError] = useState("");
  const [busy, setBusy] = useState(false);

  // Tracks the absolute instant the current QR code expires (in the UI),
  // plus a guard so a single expiry only triggers one regeneration.
  const qrExpiresAtRef = useRef(0);
  const qrRefreshingRef = useRef(false);

  // Guards the setup "success" finalization (updateUser + toast) so it only
  // runs once regardless of whether the popup is closed via Close, X,
  // backdrop, or Esc. State (not a ref) keeps the guard compatible with the
  // render-phase reset below.
  const [finalized, setFinalized] = useState(false);

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
      setRecoveryCodes([]);
      setFinalized(false);
      if (enabled) {
        setView("overview");
        setManageChoice("disable");
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

  // Count down over the fixed 10-minute window and auto-generate a new QR
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

  const finalizeEnable = () => {
    setFinalized(true);
    updateUser({ two_factor_enabled: true });
    dispatch(
      showSnackbar({
        message: "Two-factor authentication enabled.",
        type: "success",
      })
    );
  };

  const close = () => {
    // 2FA was already activated on the backend once verifySetup succeeds.
    // Finalize the local state + toast on ANY exit from the success step
    // (Close button, X, backdrop, Esc) so the account never appears
    // un-enabled if the user skips the Close button.
    if (!enabled && step === 4 && !finalized) {
      finalizeEnable();
    }
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
      const res = await twoFaApi.verifySetup({ code });
      setRecoveryCodes(res?.recovery_codes || []);
      setStep(4);
    } catch (err) {
      setError(true);
      setErrorMessage(
        err?.message || "The code you entered is incorrect. Please try again"
      );
      setOtp(Array(OTP_LENGTH).fill(""));
    } finally {
      setVerifying(false);
    }
  };

  const handleSetupDone = () => {
    close();
  };

  const handleCopyCodes = async () => {
    const copied = await copyText(recoveryCodes.join("\n"));
    dispatch(
      showSnackbar({
        message: copied
          ? "Recovery codes copied to clipboard."
          : "Could not copy recovery codes. Save them manually.",
        type: copied ? "success" : "error",
      })
    );
  };

  const handleDownloadCodes = () => {
    if (recoveryCodes.length === 0) return;
    const blob = new Blob(
      [
        "TechGuild backup codes\n",
        "Keep these codes somewhere safe. Each code can be used once.\n\n",
        recoveryCodes.join("\n"),
        "\n",
      ],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "techguild-backup-codes.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    dispatch(
      showSnackbar({
        message: "Backup codes downloaded.",
        type: "success",
      })
    );
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

  const handleRegenerate = async () => {
    if (!password) return;
    setBusy(true);
    setManageError("");
    try {
      const res = await twoFaApi.regenerateRecoveryCodes({ password });
      setRecoveryCodes(res?.recovery_codes || []);
      setPassword("");
      setView("backup");
    } catch (err) {
      setManageError(err?.message || "Failed to regenerate recovery codes.");
    } finally {
      setBusy(false);
    }
  };

  const handleRegenerateDone = () => {
    dispatch(
      showSnackbar({
        message: "Recovery codes regenerated.",
        type: "success",
      })
    );
    close();
  };

  const isWide =
    (!enabled && (step === 1 || step === 4)) ||
    (enabled && (view === "overview" || view === "backup"));

  const getTitle = () => {
    if (enabled) {
      return view === "overview"
        ? "Manage Two-Factor Authentication"
        : view === "disable"
          ? "Disable 2FA"
          : view === "regenerate"
            ? "Regenerate recovery codes"
            : "Backup Codes";
    }
    if (step === 4) {
      return (
        <span className="as2fa-success-title">
          <span className="as2fa-success-title-tick" aria-hidden="true">
            <Check width={16} height={16} />
          </span>
          Authenticator App linked successfully!
        </span>
      );
    }
    return step === 1
      ? "Choose & Download "
      : step === 2
        ? "Scan this barcode/QR code"
        : step === 3
          ? "Verify your code"
          : "Authenticator App linked successfully!";
  };

  const getSubtitle = () => {
    if (enabled) {
      return view === "overview"
        ? "Your account is protected with Two-Factor Authentication. You can disable it or regenerate your backup codes if needed."
        : view === "disable"
          ? "Enter your password and the current code from your authenticator app to disable two-factor authentication."
          : view === "regenerate"
            ? "Enter your password to generate a fresh set of recovery codes. Your old codes will stop working."
            : "";
    }
    return step === 1
      ? "Select one of the authenticator apps below and download it on your mobile device."
      : step === 2
        ? "Scan this barcode/QR code in the authentication app"
        : step === 3
          ? "Enter 6 Digit code from your app"
          : "";
  };

  const renderStep = () => {
    // Manage mode
    if (enabled) {
      if (view === "overview") {
        return (
          <div
            className="as2fa-manage-overview"
            role="radiogroup"
            aria-label="Manage two-factor authentication"
          >
            {MANAGE_CHOICES.map(({ id, title, desc, Icon }) => {
              const selected = manageChoice === id;
              return (
                <label
                  key={id}
                  className={`as2fa-choice${selected ? " as2fa-choice--selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="as2fa-manage-choice"
                    value={id}
                    checked={selected}
                    onChange={() => setManageChoice(id)}
                    className="as2fa-choice-input"
                  />
                  <span className="as2fa-choice-radio" aria-hidden="true" />
                  <span className="as2fa-choice-chip" aria-hidden="true">
                    <Icon width={20} height={20} />
                  </span>
                  <span className="as2fa-choice-text">
                    <span className="as2fa-choice-title">{title}</span>
                    <span className="as2fa-choice-desc">{desc}</span>
                  </span>
                </label>
              );
            })}
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
      if (view === "regenerate" || view === "backup") {
        return view === "backup" ? (
          <BackupCodes recoveryCodes={recoveryCodes} variant="manage" />
        ) : (
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
            {manageError && <p className="as2fa-error">{manageError}</p>}
            <p className="as2fa-manage-warning">
              Regenerating invalidates your existing recovery codes.
            </p>
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
            onEnter={handleVerify}
            autoFocus
          />
          {error && (
            <p className="as2fa-error">
              {errorMessage || "The code you entered is incorrect. Please try again"}
            </p>
          )}
        </div>
      );
    }
    return <BackupCodes recoveryCodes={recoveryCodes} variant="setup" />;
  };

  const handleManageContinue = () => {
    setPassword("");
    setManageOtp(Array(OTP_LENGTH).fill(""));
    setManageError("");
    setView(manageChoice);
  };

  const renderCodesFooter = (primaryText, onPrimary) => (
    <div className="as2fa-footer-row as2fa-success-footer">
      <SecondaryButton
        text="Download Codes"
        icon={<Download width={20} height={20} aria-hidden="true" />}
        iconPosition="left"
        onClick={handleDownloadCodes}
        className="as2fa-footer-light"
      />
      <SecondaryButton
        text="Copy Codes"
        icon={<Files width={20} height={20} aria-hidden="true" />}
        iconPosition="left"
        onClick={handleCopyCodes}
        className="as2fa-footer-light"
      />
      <PrimaryButton
        text={primaryText}
        onClick={onPrimary}
        className="as2fa-footer-solid"
      />
    </div>
  );

  const renderFooter = () => {
    // Manage mode
    if (enabled) {
      if (view === "overview") {
        return (
          <div className="as2fa-footer-row">
            <SecondaryButton
              text="Cancel"
              onClick={close}
              className="as2fa-footer-secondary"
            />
            <PrimaryButton
              text="Continue"
              onClick={handleManageContinue}
              className="as2fa-footer-primary"
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
      if (view === "regenerate") {
        return (
          <div className="as2fa-footer-row">
            <SecondaryButton
              text="Back"
              onClick={() => setView("overview")}
              className="as2fa-footer-secondary"
              disabled={busy}
            />
            <PrimaryButton
              text={busy ? "Regenerating…" : "Regenerate Codes"}
              onClick={handleRegenerate}
              disabled={busy || !password}
              className="as2fa-footer-primary"
            />
          </div>
        );
      }
      // view === "backup"
      return renderCodesFooter("Done", handleRegenerateDone);
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
    // step === 4 backup codes
    return renderCodesFooter("Close", handleSetupDone);
  };

  return (
    <Popup
      open={open}
      onClose={close}
      title={getTitle()}
      subtitle={getSubtitle()}
      footer={renderFooter()}
      cardClassName={`as2fa-card${
        !enabled && step === 1 ? " as2fa-card--step1" : ""
      }`}
      headerClassName="as2fa-header"
      footerClassName="as2fa-footer"
      style={
        !enabled && step === 1
          ? { "--popup-width": "833px", padding: "48px 55px 50px" }
          : isWide
            ? { "--popup-width": "700px", padding: "10px" }
            : { "--popup-width": "596px", padding: "30px 38px" }
      }
    >
      {renderStep()}
    </Popup>
  );
}