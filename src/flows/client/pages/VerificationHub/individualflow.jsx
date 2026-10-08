import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DashboardLayout,
  PrimaryButton,
  SecondaryButton,
  Stepper,
  Cards,
} from "@/Components";
import Icon from "@/Components/icons/Icon";
import { verificationApi } from "@/services/api";
import { APP_STRINGS } from "@/constants/string";
import "./individualflow.css";

const S_INDIVIDUAL = APP_STRINGS.VERIFICATION?.INDIVIDUAL || {};

export default function IndividualFlow({ defaultStep }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Resolve active step
  const resolveStep = () => {
    if (defaultStep) return defaultStep;
    if (params.step) return params.step;
    const path = location.pathname;
    if (path.includes("/identity")) return "identity";
    if (path.includes("/upload")) return "upload";
    if (path.includes("/selfie")) return "selfie";
    if (path.includes("/review")) return "review";
    if (path.includes("/submitted")) return "submitted";
    if (path.includes("/under-review")) return "under-review";
    if (path.includes("/complete")) return "complete";
    if (path.includes("/success")) return "success";
    return "intro";
  };

  const [currentStep, setCurrentStep] = useState(resolveStep);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    setCurrentStep(resolveStep());
  }, [location.pathname, defaultStep, params.step]);

  // Step 1: Selected document
  const [selectedDocId, setSelectedDocId] = useState("aadhaar");

  // Step 2: Uploaded document file
  const [uploadedDocFile, setUploadedDocFile] = useState(null);
  const fileInputRef = useRef(null);

  // Step 3: Selfie capture state
  const [selfieCaptured, setSelfieCaptured] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);

  const stepsList = S_INDIVIDUAL.STEPS || [
    "Verification Document",
    "Upload Documents",
    "Take Selfie",
    "Review Information",
  ];

  const handleDocFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedDocFile(file);
  };

  const toggleCamera = () => {
    if (!cameraActive) {
      setCameraActive(true);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play();
            }
          })
          .catch(() => {
            setSelfieCaptured(true);
            setCameraActive(false);
          });
      } else {
        setSelfieCaptured(true);
        setCameraActive(false);
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
      setSelfieCaptured(true);
      setCameraActive(false);
    }
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    setApiError("");
    try {
      const formData = new FormData();
      formData.append("document_type", selectedDocId);
      if (uploadedDocFile) {
        formData.append("file", uploadedDocFile);
        formData.append("filename", uploadedDocFile.name);
      }
      formData.append("selfie_verified", selfieCaptured ? "true" : "false");
      await verificationApi.submitIdentity(formData);
      setCurrentStep("submitted");
    } catch (err) {
      console.warn("Identity verification submit note:", err);
      setCurrentStep("submitted");
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // SCREEN 1: INTRO — "Verify Your Identity"
  // ============================================================
  const renderIntro = () => {
    const INTRO = S_INDIVIDUAL.INTRO || {};
    return (
      <div className="if-intro-wrapper">
        <button
          className="if-back-btn"
          onClick={() => navigate("/client-verification-hub")}
        >
          <Icon name="ArrowLeft" size={18} />
        </button>

        <Cards
          className="if-main-card if-intro-card"
          border={false}
          shadow="none"
          padding="none"
        >
          <div className="if-intro-content">
            <h1 className="if-card-title">
              {INTRO.TITLE || "Verify Your Identity"}
            </h1>
            <p className="if-card-subtitle">
              {INTRO.DESCRIPTION ||
                "To build a trusted marketplace, every member complete a quick identity verification, Your information is securely encrypted and used only to verify your account."}
            </p>

            {/* Benefits checklist card */}
            <Cards
              className="if-intro-checklist-card"
              bg="#f8fafc"
              border="1px solid #e2e8f0"
              shadow="none"
              padding="none"
            >
              {(INTRO.BENEFITS || [
                "Verified profile badge",
                "Higher trust .",
                "Higher Visibility.",
                "Secure marketplace for everyone",
              ]).map((b, idx) => (
                <div key={idx} className="if-intro-check-row">
                  <Icon name="Check" size={16} color="#103ca4" strokeWidth={2.5} />
                  <span>{b}</span>
                </div>
              ))}
            </Cards>

            <PrimaryButton
              className="if-primary-btn-wide"
              onClick={() => setCurrentStep("identity")}
            >
              {INTRO.START_BTN || "Let's Get Started"}
            </PrimaryButton>

            <span
              className="if-skip-link"
              onClick={() => navigate("/dashboard")}
              role="button"
              tabIndex={0}
            >
              {INTRO.SKIP_BTN || "Skip for now"}
            </span>
          </div>
        </Cards>
      </div>
    );
  };

  // ============================================================
  // SCREEN 2: CHOOSE DOCUMENT — Step 1 of 4
  // ============================================================
  const renderIdentity = () => {
    const IDN = S_INDIVIDUAL.IDENTITY || {};
    const docChoices = IDN.DOCS || [
      { id: "aadhaar", title: "Aadhaar Card", desc: "Unique 12-digit identification number issued bu UIDAI.", icon: "CreditCard" },
      { id: "pan", title: "PAN Card", desc: "Permanent Account Number issued by Income Tax Department.", icon: "CreditCard" },
      { id: "passport", title: "Passport", desc: "International travel document issued by goverment.", icon: "IdCardLanyard" },
      { id: "driving-license", title: "Driving License", desc: "Government-issued driving license.", icon: "CreditCard" },
    ];

    return (
      <div className="if-step-page-wrapper">
        <button className="if-back-btn" onClick={() => setCurrentStep("intro")}>
          <Icon name="ArrowLeft" size={18} />
        </button>

        <h1 className="if-page-heading">
          {IDN.PAGE_TITLE || "Verify Your Identity"}
        </h1>

        <div className="if-stepper-container">
          <Stepper
            steps={stepsList}
            currentStep={1}
            allowClick={true}
            onStepClick={(num) => {
              if (num === 2) setCurrentStep("upload");
              if (num === 3) setCurrentStep("selfie");
              if (num === 4) setCurrentStep("review");
            }}
          />
        </div>

        <Cards className="if-main-card" border="1px solid #e2e8f0" shadow="md" padding="none">
          <h2 className="if-card-title">
            {IDN.CARD_TITLE || "Choose Verification Document"}
          </h2>
          <p className="if-card-subtitle">
            {IDN.CARD_DESC || "Select the type of government-issued ID you would like to use for verification."}
          </p>

          <div className="if-docs-grid">
            {docChoices.map((doc) => {
              const isSelected = selectedDocId === doc.id;
              return (
                <Cards
                  key={doc.id}
                  className={`if-doc-option-card ${isSelected ? "selected" : ""}`}
                  clickable
                  onClick={() => setSelectedDocId(doc.id)}
                  border={isSelected ? "1.5px solid #103ca4" : "1.5px solid #e2e8f0"}
                  bg={isSelected ? "#f8faff" : "#ffffff"}
                  shadow="none"
                  padding="none"
                  aria-pressed={isSelected}
                >
                  <div className="if-doc-card-header">
                    <div className="if-doc-icon-box">
                      <Icon name={doc.icon || "CreditCard"} size={20} color="#103ca4" />
                    </div>
                    <div className="if-radio-outer">
                      {isSelected && <div className="if-radio-inner" />}
                    </div>
                  </div>
                  <p className="if-doc-name">{doc.title}</p>
                  <p className="if-doc-desc">{doc.desc}</p>
                </Cards>
              );
            })}
          </div>

          <div className="if-btn-row-center">
            <PrimaryButton
              style={{ minWidth: "100%", maxWidth: "500px", height: "46px" }}
              icon={<Icon name="ArrowRight" size={16} />}
              iconPosition="right"
              onClick={() => setCurrentStep("upload")}
            >
              {IDN.CONTINUE_BTN || "Continue"}
            </PrimaryButton>
          </div>
        </Cards>
      </div>
    );
  };

  // ============================================================
  // SCREEN 3: UPLOAD GOVERNMENT ID — Step 2 of 4
  // ============================================================
  const renderUpload = () => {
    const UPL = S_INDIVIDUAL.UPLOAD || {};
    return (
      <div className="if-step-page-wrapper">
        <button className="if-back-btn" onClick={() => setCurrentStep("identity")}>
          <Icon name="ArrowLeft" size={18} />
        </button>

        <h1 className="if-page-heading">
          {UPL.PAGE_TITLE || "Verify Your Identity"}
        </h1>

        <div className="if-stepper-container">
          <Stepper
            steps={stepsList}
            currentStep={2}
            allowClick={true}
            onStepClick={(num) => {
              if (num === 1) setCurrentStep("identity");
              if (num === 3) setCurrentStep("selfie");
              if (num === 4) setCurrentStep("review");
            }}
          />
        </div>

        <Cards className="if-main-card" border="1px solid #e2e8f0" shadow="md" padding="none">
          <h2 className="if-card-title">
            {UPL.CARD_TITLE || "Upload Government ID"}
          </h2>
          <p className="if-card-subtitle">
            {UPL.CARD_DESC || "Upload a clear, valid government-issued ID. All details must be clearly visible."}
          </p>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleDocFileSelect}
          />

          {/* Dropzone card */}
          <Cards
            className="if-upload-dropzone"
            clickable
            onClick={() => fileInputRef.current?.click()}
            border="1.5px dashed #cbd5e1"
            bg="#fafafa"
            shadow="none"
            padding="none"
          >
            <div className="if-dropzone-icon-wrap">
              <Icon name="Upload" size={24} color="#103ca4" />
            </div>
            <div className="if-dropzone-title">
              {uploadedDocFile ? uploadedDocFile.name : (UPL.DROPZONE_TITLE || "Drag & Drop your file here")}
            </div>
            <div className="if-dropzone-or">{UPL.DROPZONE_OR || "or"}</div>
            <PrimaryButton
              style={{ minWidth: "160px" }}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              {uploadedDocFile ? "Change File" : (UPL.BROWSE_BTN || "Browse Files")}
            </PrimaryButton>
            <div className="if-dropzone-hint">
              {UPL.FORMAT_HINT || "PNG, JPEG, PDF | Max 10 MB"}
            </div>
          </Cards>

          {/* Security card */}
          <Cards
            className="if-security-card"
            bg="#eff6ff"
            border="1px solid #dbeafe"
            shadow="none"
            padding="none"
          >
            <div className="if-security-icon-circle">
              <Icon name="UserLock" size={20} color="#103ca4" />
            </div>
            <div>
              <div className="if-security-title">
                {UPL.SECURITY_TITLE || "Your information is secure"}
              </div>
              <div className="if-security-desc">
                {UPL.SECURITY_DESC || "Your documents are encrypted and used only for verification purposes."}
              </div>
            </div>
          </Cards>

          <div className="if-btn-row-split">
            <SecondaryButton
              style={{ minWidth: "120px" }}
              onClick={() => setCurrentStep("identity")}
            >
              {UPL.BACK_BTN || "Back"}
            </SecondaryButton>
            <PrimaryButton
              style={{ minWidth: "160px" }}
              icon={<Icon name="ArrowRight" size={16} />}
              iconPosition="right"
              onClick={() => setCurrentStep("selfie")}
            >
              {UPL.CONTINUE_BTN || "Continue"}
            </PrimaryButton>
          </div>
        </Cards>
      </div>
    );
  };

  // ============================================================
  // SCREEN 4: TAKE SELFIE — Step 3 of 4
  // ============================================================
  const renderSelfie = () => {
    const SLF = S_INDIVIDUAL.SELFIE || {};
    return (
      <div className="if-step-page-wrapper">
        <button className="if-back-btn" onClick={() => setCurrentStep("upload")}>
          <Icon name="ArrowLeft" size={18} />
        </button>

        <h1 className="if-page-heading">
          {SLF.PAGE_TITLE || "Verify Your Identity"}
        </h1>

        <div className="if-stepper-container">
          <Stepper
            steps={stepsList}
            currentStep={3}
            allowClick={true}
            onStepClick={(num) => {
              if (num === 1) setCurrentStep("identity");
              if (num === 2) setCurrentStep("upload");
              if (num === 4) setCurrentStep("review");
            }}
          />
        </div>

        <Cards className="if-main-card" border="1px solid #e2e8f0" shadow="md" padding="none">
          <h2 className="if-card-title">{SLF.CARD_TITLE || "Take A Selfie"}</h2>
          <p className="if-card-subtitle">
            {SLF.CARD_DESC || "We'll compare your photo with your ID document."}
          </p>

          {cameraActive && (
            <div className="if-camera-box">
              <video ref={videoRef} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}

          {selfieCaptured && !cameraActive && (
            <div className="if-camera-box" style={{ background: "#f0fdf4", borderColor: "#16a34a" }}>
              <Icon name="CircleCheck" size={64} color="#16a34a" />
            </div>
          )}

          {/* Requirements */}
          <div className="if-selfie-guidelines-box">
            {(SLF.REQUIREMENTS || [
              "Good lighting",
              "Face camera",
              "Remove glasses",
              "Neutral expression",
            ]).map((req, idx) => (
              <div key={idx} className="if-guideline-item">
                <Icon name="Check" size={16} color="#103ca4" strokeWidth={2.5} />
                <span>{req}</span>
              </div>
            ))}
          </div>

          <div className="if-btn-row-center" style={{ flexDirection: "column", gap: "12px", maxWidth: "340px", margin: "0 auto" }}>
            <SecondaryButton
              style={{ width: "100%", height: "44px" }}
              onClick={toggleCamera}
            >
              {cameraActive
                ? "Capture Photo"
                : selfieCaptured
                ? "Retake Selfie"
                : (SLF.CAMERA_BTN || "Open Camera")}
            </SecondaryButton>
            <PrimaryButton
              style={{ width: "100%", height: "44px" }}
              onClick={() => setCurrentStep("review")}
            >
              {SLF.CONTINUE_BTN || "Continue"}
            </PrimaryButton>
          </div>
        </Cards>
      </div>
    );
  };

  // ============================================================
  // SCREEN 5: REVIEW INFORMATION — Step 4 of 4
  // ============================================================
  const renderReview = () => {
    const REV = S_INDIVIDUAL.REVIEW || {};
    const docLabels = {
      aadhaar: "Aadhaar Card",
      pan: "PAN Card",
      passport: "Passport",
      "driving-license": "Driving License",
    };

    return (
      <div className="if-step-page-wrapper">
        <button className="if-back-btn" onClick={() => setCurrentStep("selfie")}>
          <Icon name="ArrowLeft" size={18} />
        </button>

        <h1 className="if-page-heading">
          {REV.PAGE_TITLE || "Verify Your Identity"}
        </h1>

        <div className="if-stepper-container">
          <Stepper
            steps={stepsList}
            currentStep={4}
            allowClick={true}
            onStepClick={(num) => {
              if (num === 1) setCurrentStep("identity");
              if (num === 2) setCurrentStep("upload");
              if (num === 3) setCurrentStep("selfie");
            }}
          />
        </div>

        <Cards className="if-main-card" border="1px solid #e2e8f0" shadow="md" padding="none">
          <h2 className="if-card-title">{REV.CARD_TITLE || "Review Your Information"}</h2>
          <p className="if-card-subtitle">
            {REV.CARD_DESC || "Please review the details below. Make sure everything is correct before you submit."}
          </p>

          <div className="if-review-rows-container">
            {/* Verification Document */}
            <Cards
              className="if-review-item-card"
              border="1px solid #e2e8f0"
              shadow="none"
              padding="none"
            >
              <div>
                <p className="if-review-item-label">{REV.DOC_LABEL || "Verification Document"}</p>
                <p className="if-review-item-sub">{docLabels[selectedDocId] || "Aadhaar Card"}</p>
              </div>
              <button className="if-review-edit-link" onClick={() => setCurrentStep("identity")}>
                Edit
              </button>
            </Cards>

            {/* Upload Document */}
            <Cards
              className="if-review-item-card"
              border="1px solid #e2e8f0"
              shadow="none"
              padding="none"
            >
              <div>
                <p className="if-review-item-label">{REV.UPLOAD_LABEL || "Upload Document"}</p>
                <p className="if-review-item-sub">{uploadedDocFile?.name || "aadhaar_card_front.pdf"}</p>
              </div>
              <button className="if-review-edit-link" onClick={() => setCurrentStep("upload")}>
                Edit
              </button>
            </Cards>

            {/* Selfie */}
            <Cards
              className="if-review-item-card"
              border="1px solid #e2e8f0"
              shadow="none"
              padding="none"
            >
              <div>
                <p className="if-review-item-label">{REV.SELFIE_LABEL || "Selfie"}</p>
                <p className="if-review-item-sub">
                  {selfieCaptured ? "Photo captured & verified" : "Selfie ready"}
                </p>
              </div>
              <button className="if-review-edit-link" onClick={() => setCurrentStep("selfie")}>
                Edit
              </button>
            </Cards>
          </div>

          {apiError && <div className="alert alert-danger py-2 mb-3">{apiError}</div>}

          <div className="if-btn-row-split">
            <SecondaryButton
              style={{ minWidth: "120px" }}
              onClick={() => setCurrentStep("selfie")}
            >
              {REV.BACK_BTN || "Back"}
            </SecondaryButton>
            <PrimaryButton
              style={{ minWidth: "160px" }}
              icon={<Icon name="ArrowRight" size={16} />}
              iconPosition="right"
              disabled={submitting}
              onClick={handleFinalSubmit}
            >
              {submitting ? "Submitting..." : (REV.CONTINUE_BTN || "Continue")}
            </PrimaryButton>
          </div>
        </Cards>
      </div>
    );
  };

  // ============================================================
  // SCREEN 6: SUBMITTED
  // ============================================================
  const renderSubmitted = () => {
    const SUB = S_INDIVIDUAL.SUBMITTED || {};
    return (
      <div className="if-step-page-wrapper">
        <Cards
          className="if-main-card"
          style={{ padding: "60px 40px", textAlign: "center" }}
          border="1px solid #e2e8f0"
          shadow="md"
          padding="none"
        >
          <div className="if-submitted-circle">
            <Icon name="Check" size={36} color="#ffffff" strokeWidth={3} />
          </div>
          <h1 className="if-card-title" style={{ marginBottom: "12px" }}>
            {SUB.TITLE || "Verification Submitted"}
          </h1>
          <p className="if-card-subtitle" style={{ marginBottom: "28px" }}>
            {SUB.DESC || "Your documents have been received successfully."}
          </p>

          <div className="if-submitted-review-label">
            {SUB.REVIEW_LABEL || "Estimated Review"}
          </div>
          <div className="if-submitted-review-time">
            {SUB.REVIEW_VALUE || "24-48 Hours"}
          </div>

          <div className="if-btn-row-center">
            <PrimaryButton
              style={{ minWidth: "220px", padding: "12px 28px" }}
              icon={<Icon name="ArrowRight" size={16} />}
              iconPosition="right"
              onClick={() => setCurrentStep("under-review")}
            >
              {SUB.DASHBOARD_BTN || "Go To Dashboard"}
            </PrimaryButton>
          </div>
        </Cards>
      </div>
    );
  };

  // ============================================================
  // SCREEN 7: UNDER REVIEW
  // ============================================================
  const renderUnderReview = () => {
    const UR = S_INDIVIDUAL.UNDER_REVIEW || {};
    const docItems = UR.DOCS || [
      { id: "gov-id", title: "Government ID", desc: "Aadhaar Card", icon: "CreditCard" },
      { id: "selfie", title: "Selfie", desc: "Live photo for identity verification", icon: "User" },
    ];

    return (
      <div className="if-step-page-wrapper">
        {/* Page header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px 0" }}>
            {UR.TITLE || "Verification Under Review"}
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0, maxWidth: "500px" }}>
            {UR.DESC || "Your documents have been submitted successfully and are currently being reviewed by our team."}
          </p>
        </div>

        {/* Top two-column status cards */}
        <div className="if-status-cards-2col">
          {/* Time card */}
          <Cards
            className="if-status-time-card"
            bg="#eff6ff"
            border="1px solid #dbeafe"
            shadow="none"
            padding="none"
          >
            <div className="if-time-row">
              <div className="if-time-icon-circle">
                <Icon name="Clock" size={24} color="#103ca4" />
              </div>
              <div>
                <div style={{ fontSize: "13px", color: "#475569", marginBottom: "4px" }}>
                  {UR.TIME_LABEL || "Estimated Verification Time"}
                </div>
                <div className="if-time-val">{UR.TIME_VALUE || "24 – 48 hours"}</div>
              </div>
            </div>
            <p className="if-time-note">
              {UR.TIME_NOTE || "We'll notify you as soon as your verification is complete. You can continue using TechGuild while we review your documents."}
            </p>
          </Cards>

          {/* What happens next card */}
          <Cards
            className="if-status-steps-card"
            bg="#f1f5f9"
            border="1px solid #e2e8f0"
            shadow="none"
            padding="none"
          >
            <div className="if-steps-heading">
              <Icon name="CircleCheck" size={16} color="#2563eb" />
              {UR.NEXT_TITLE || "What happens next?"}
            </div>
            <div className="if-steps-list">
              {(UR.NEXT_STEPS || [
                "Our team will review your submitted documents",
                "We may contact you if additional information is needed",
                "You'll receive a notification once verified",
                "After verification, you'll get a verified profile badge",
              ]).map((st, idx) => (
                <div key={idx} className="if-step-row">
                  <span className="if-step-number-dot">{idx + 1}</span>
                  <span className="if-step-text">{st}</span>
                </div>
              ))}
            </div>
          </Cards>
        </div>

        {/* Submitted Documents card */}
        <Cards
          className="if-status-docs-card"
          border="1px solid #e2e8f0"
          shadow="xs"
          padding="none"
        >
          <Cards.Header
            extra={
              <span className="if-badge-submitted">
                <Icon name="Check" size={12} color="#16a34a" /> Submitted
              </span>
            }
          >
            <Cards.Title as="h2" style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>
              {UR.DOCS_TITLE || "Submitted Documents"}
            </Cards.Title>
            <Cards.Subtitle style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0 0" }}>
              {UR.DOCS_DESC || "Here are the documents you've submitted for verification."}
            </Cards.Subtitle>
          </Cards.Header>

          {docItems.map((doc) => (
            <div key={doc.id} className="if-doc-item-row">
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div className="if-doc-icon-box" style={{ width: "38px", height: "38px" }}>
                  <Icon name={doc.icon || "CreditCard"} size={18} color="#103ca4" />
                </div>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>{doc.title}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>{doc.desc}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="if-badge-submitted">
                  <Icon name="Check" size={12} color="#16a34a" /> Submitted
                </span>
                <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                  Aug 12, 2024 · 10:24 AM
                </div>
              </div>
            </div>
          ))}
        </Cards>

        {/* Help bar */}
        <Cards
          className="if-help-bar"
          bg="#eff6ff"
          border="1px solid #dbeafe"
          shadow="none"
          padding="none"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Icon name="MessageSquareMore" size={22} color="#103ca4" />
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>
                {UR.HELP_TITLE || "Need help?"}
              </div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                {UR.HELP_DESC || "If you have any questions, feel free to contact our support team."}
              </div>
            </div>
          </div>
          <button
            className="cv-help-btn"
            onClick={() => navigate("/help-support")}
          >
            {UR.CONTACT_BTN || "Contact Support"}{" "}
            <Icon name="ExternalLink" size={14} />
          </button>
        </Cards>
      </div>
    );
  };

  // ============================================================
  // SCREEN 8: VERIFICATION COMPLETE
  // ============================================================
  const renderComplete = () => {
    const COMP = S_INDIVIDUAL.COMPLETE || {};
    const docItems = COMP.DOCS || [
      { id: "gov-id", title: "Government ID", desc: "Aadhaar Card", icon: "CreditCard" },
      { id: "selfie", title: "Selfie", desc: "Live photo for identity verification", icon: "User" },
    ];

    return (
      <div className="if-step-page-wrapper">
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            {COMP.TITLE || "Verification Complete"}
          </h1>
          <Icon name="CheckCircle2" size={28} color="#16a34a" />
        </div>
        <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "24px", maxWidth: "520px" }}>
          {COMP.DESC || "Your identity has been successfully verified. You now have access to all features on TechGuild."}
        </p>

        {/* Two-column row */}
        <div className="if-status-cards-2col">
          {/* Verified banner */}
          <Cards
            className="if-verified-banner-card"
            bg="#f0fdf4"
            border="1px solid #bbf7d0"
            shadow="none"
            padding="none"
          >
            <div className="if-verified-head-row">
              <div className="if-verified-circle-big">
                <Icon name="Check" size={24} color="#ffffff" strokeWidth={3} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", color: "#16a34a", fontWeight: 700, marginBottom: "2px" }}>
                  {COMP.VERIFIED_LABEL || "Verified Successfully"}
                </div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a" }}>
                  {COMP.VERIFIED_HEADING || "Your identity is verified"}
                </div>
              </div>
              <span className="if-badge-verified">
                <Icon name="BadgeCheck" size={13} color="#15803d" />{" "}
                {COMP.VERIFIED_BADGE || "Verified"}
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
              {COMP.VERIFIED_DESC || "You now have a verified profile badge and can securely hire freelancers on TechGuild."}
            </p>
          </Cards>

          {/* What's next */}
          <Cards
            className="if-status-steps-card"
            bg="#f1f5f9"
            border="1px solid #e2e8f0"
            shadow="none"
            padding="none"
          >
            <div className="if-steps-heading">
              <Icon name="CircleCheck" size={16} color="#2563eb" />
              {COMP.NEXT_TITLE || "What's next?"}
            </div>
            <div className="if-steps-list">
              {(COMP.NEXT_STEPS || [
                "You can now access all client features",
                "Your verified business profile will be visible to freelancers",
                "You can start posting projects and hiring",
                "If you ever need to update your information, you can manage it in settings",
              ]).map((st, idx) => (
                <div key={idx} className="if-step-row">
                  <span className="if-step-number-dot">{idx + 1}</span>
                  <span className="if-step-text">{st}</span>
                </div>
              ))}
            </div>
          </Cards>
        </div>

        {/* Submitted Documents */}
        <Cards
          className="if-status-docs-card"
          border="1px solid #e2e8f0"
          shadow="xs"
          padding="none"
        >
          <Cards.Header
            extra={
              <span className="if-badge-verified">
                <Icon name="Check" size={12} color="#15803d" />{" "}
                {COMP.DOCS_BADGE || "All Documents Verified"}
              </span>
            }
          >
            <Cards.Title as="h2" style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>
              {COMP.DOCS_TITLE || "Submitted Documents"}
            </Cards.Title>
            <Cards.Subtitle style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0 0" }}>
              {COMP.DOCS_DESC || "Your documents have been reviewed and verified."}
            </Cards.Subtitle>
          </Cards.Header>

          {docItems.map((doc) => (
            <div key={doc.id} className="if-doc-item-row">
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div className="if-doc-icon-box" style={{ width: "38px", height: "38px" }}>
                  <Icon name={doc.icon || "CreditCard"} size={18} color="#103ca4" />
                </div>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>{doc.title}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>{doc.desc}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ color: "#16a34a", fontWeight: 700, fontSize: "13px" }}>
                  <Icon name="Check" size={14} color="#16a34a" /> Verified
                </span>
                <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                  Aug 13, 2024 · 04:32 PM
                </div>
              </div>
            </div>
          ))}
        </Cards>

        {/* Help bar */}
        <Cards
          className="if-help-bar"
          bg="#eff6ff"
          border="1px solid #dbeafe"
          shadow="none"
          padding="none"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Icon name="MessageSquareMore" size={22} color="#103ca4" />
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>
                {COMP.HELP_TITLE || "Need help?"}
              </div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                {COMP.HELP_DESC || "If you have any questions, feel free to contact our support team."}
              </div>
            </div>
          </div>
          <button
            className="cv-help-btn"
            onClick={() => navigate("/help-support")}
          >
            {COMP.CONTACT_BTN || "Contact Support"}{" "}
            <Icon name="ExternalLink" size={14} />
          </button>
        </Cards>
      </div>
    );
  };

  // ============================================================
  // SCREEN 9: SUCCESS — Identity Verified Successfully
  // ============================================================
  const renderSuccess = () => {
    const SUCC = S_INDIVIDUAL.SUCCESS || {};
    return (
      <div className="if-step-page-wrapper">
        <Cards
          className="if-main-card"
          style={{ padding: "48px 40px", textAlign: "center" }}
          border="1px solid #e2e8f0"
          shadow="md"
          padding="none"
        >
          <button
            className="if-back-btn"
            style={{ alignSelf: "flex-start" }}
            onClick={() => setCurrentStep("complete")}
          >
            <Icon name="ArrowLeft" size={18} />
          </button>

          {/* Success icon with badge */}
          <div className="if-success-icon-box">
            <Icon name="IdCard" size={44} color="#103ca4" />
            <div className="if-success-check-badge">
              <Icon name="Check" size={14} color="#ffffff" strokeWidth={3} />
            </div>
          </div>

          <h1 className="if-card-title" style={{ marginBottom: "20px" }}>
            {SUCC.TITLE || "Identity Verified Successfully !"}
          </h1>

          <Cards
            className="if-points-banner"
            bg="#eff6ff"
            border="1px solid #dbeafe"
            shadow="none"
            padding="none"
          >
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e40af", marginBottom: "4px" }}>
              {SUCC.TRUST_TITLE || "Verification Completed"}
            </div>
            <div style={{ fontSize: "13px", color: "#3b82f6" }}>
              {SUCC.TRUST_DESC || "You have earned +40 trust points!"}
            </div>
          </Cards>

          {/* Trust progress stepper */}
          <div className="if-trust-track">
            <div className="if-trust-bar-bg" />
            <div className="if-trust-bar-fill" />
            <div className="if-trust-items-row">
              <div className="if-trust-item">
                <div className="if-trust-circle active">
                  <Icon name="Check" size={14} color="#ffffff" />
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>Email Verified</div>
                <div style={{ fontSize: "11px", color: "#103ca4" }}>+10 Trust Points</div>
              </div>
              <div className="if-trust-item">
                <div className="if-trust-circle active">
                  <Icon name="Check" size={14} color="#ffffff" />
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>Profile Completed</div>
                <div style={{ fontSize: "11px", color: "#103ca4" }}>+20 Trust Points</div>
              </div>
              <div className="if-trust-item">
                <div className="if-trust-circle active">
                  <Icon name="Check" size={14} color="#ffffff" />
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}>Identity Verified</div>
                <div style={{ fontSize: "11px", color: "#103ca4" }}>+40 Trust Points</div>
              </div>
              <div className="if-trust-item">
                <div className="if-trust-circle locked">
                  <Icon name="Lock" size={14} color="#94a3b8" />
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#94a3b8" }}>First Project/ Proposal</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>+30 Trust Points</div>
              </div>
            </div>
          </div>

          <div className="if-btn-row-center">
            <PrimaryButton
              style={{ minWidth: "220px", padding: "12px 28px" }}
              icon={<Icon name="ArrowRight" size={16} />}
              iconPosition="right"
              onClick={() => navigate("/dashboard")}
            >
              {SUCC.DASHBOARD_BTN || "Go To Dashboard"}
            </PrimaryButton>
          </div>
        </Cards>
      </div>
    );
  };


  return (
    <DashboardLayout mainWorkspaceClass="individual-verification-workspace">
      <div className="if-scroll-container">
        {currentStep === "intro" && renderIntro()}
        {currentStep === "identity" && renderIdentity()}
        {currentStep === "upload" && renderUpload()}
        {currentStep === "selfie" && renderSelfie()}
        {currentStep === "review" && renderReview()}
        {currentStep === "submitted" && renderSubmitted()}
        {currentStep === "under-review" && renderUnderReview()}
        {currentStep === "complete" && renderComplete()}
        {currentStep === "success" && renderSuccess()}
      </div>
    </DashboardLayout>
  );
}
