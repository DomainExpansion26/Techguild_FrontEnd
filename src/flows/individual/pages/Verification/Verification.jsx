import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { verificationApi } from "@/features/verification/api/verificationApi";
import { useAuth } from "@/context/AuthContext";
import "./verification.css";

export default function Verification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(0); // 0: Start Screen, 1: Choose Doc, 2: Upload Files, 3: Review & Submit
  const [selectedDoc, setSelectedDoc] = useState("aadhaar");
  const [frontDoc, setFrontDoc] = useState(null);
  const [backDoc, setBackDoc] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [idNumber, setIdNumber] = useState("");
  
  const [statusLoading, setStatusLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    checkCurrentStatus();
  }, []);

  const checkCurrentStatus = async () => {
    setStatusLoading(true);
    try {
      const res = await verificationApi.getStatus();
      setVerificationStatus(res?.data || res);
    } catch (err) {
      console.warn("Could not fetch verification status:", err);
    } finally {
      setStatusLoading(false);
    }
  };

  const steps = [
    { number: 1, label: "Verification Document" },
    { number: 2, label: "Upload Documents" },
    { number: 3, label: "Take Selfie / Photo" },
    { number: 4, label: "Review & Submit" },
  ];

  const docOptions = [
    {
      id: "aadhaar",
      name: "Aadhaar Card",
      desc: "Unique 12-digit identification number issued by UIDAI.",
      icon: "IdCard",
    },
    {
      id: "pan",
      name: "PAN Card",
      desc: "Permanent Account Number Issued by Income Tax Department.",
      icon: "IdCard",
    },
    {
      id: "passport",
      name: "Passport",
      desc: "International travel document issued by government.",
      icon: "IdCardLanyard",
    },
    {
      id: "license",
      name: "Driving License",
      desc: "Government-issued driving license.",
      icon: "CreditCard",
    },
  ];

  const handleSubmitVerification = async () => {
    if (!isAuthenticated || !token || token === "mock-jwt-token") {
      const msg = "Please sign in to your verified account before submitting identity documents.";
      setSubmitError(msg);
      dispatch(showSnackbar({ message: msg, type: "warning" }));
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const formData = new FormData();
      formData.append("document_type", selectedDoc);
      formData.append("name", selectedDoc);
      if (idNumber) formData.append("id_number", idNumber);
      if (frontDoc) {
        formData.append("file", frontDoc, frontDoc.name);
        formData.append("filename", frontDoc, frontDoc.name);
        formData.append("front_image", frontDoc, frontDoc.name);
      }
      if (backDoc) formData.append("back_image", backDoc, backDoc.name);
      if (selfie) formData.append("selfie_image", selfie, selfie.name);

      await verificationApi.submitIdentity(formData);
      dispatch(showSnackbar({
        message: "Identity documents submitted successfully for compliance review!",
        type: "success",
      }));
      await checkCurrentStatus();
      setCurrentStep(0);
    } catch (err) {
      console.error("Verification submit error:", err);
      const is401 = err?.status === 401 || String(err?.message || "").includes("401");
      const msg = is401
        ? "Session expired or unauthenticated. Please sign in to verify your identity."
        : (err?.message || "Failed to submit verification request. Please check files.");
      setSubmitError(msg);
      dispatch(showSnackbar({ message: msg, type: "error" }));
    } finally {
      setSubmitting(false);
    }
  };

  const renderStartScreen = () => {
    const isApproved = verificationStatus?.identity_status === "approved" || verificationStatus?.status === "approved";
    const isPending = verificationStatus?.identity_status === "pending" || verificationStatus?.status === "pending";

    return (
      <div className="v-start-container">
        <h1 className="v-start-title">Verify Your Identity</h1>
        <p className="v-start-desc">
          To build a trusted marketplace, every member completes a quick identity verification. Your data is encrypted and used only for compliance.
        </p>

        {isApproved && (
          <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
            <span>🛡️</span>
            <strong>Your Identity is Verified! You have full access to high-value projects.</strong>
          </div>
        )}

        {isPending && (
          <div className="alert alert-warning d-flex align-items-center gap-2 mb-4">
            <span>⏳</span>
            <strong>Your verification is under review by the trust team. We will notify you shortly.</strong>
          </div>
        )}

        <div className="v-checklist-card">
          <div className="v-checklist-item">
            <Icon name="Check" size={20} color="#103CA4" stroke="#103CA4" strokeWidth={2.5} className="v-checklist-icon" />
            <span className="v-checklist-text">Verified profile badge</span>
          </div>
          <div className="v-checklist-item">
            <Icon name="Check" size={20} color="#103CA4" stroke="#103CA4" strokeWidth={2.5} className="v-checklist-icon" />
            <span className="v-checklist-text">Higher trust with clients</span>
          </div>
          <div className="v-checklist-item">
            <Icon name="Check" size={20} color="#103CA4" stroke="#103CA4" strokeWidth={2.5} className="v-checklist-icon" />
            <span className="v-checklist-text">Access to high-budget verified projects</span>
          </div>
          <div className="v-checklist-item">
            <Icon name="Check" size={20} color="#103CA4" stroke="#103CA4" strokeWidth={2.5} className="v-checklist-icon" />
            <span className="v-checklist-text">Instant escrow releases</span>
          </div>
        </div>

        {!isApproved && !isPending && (
          <button
            type="button"
            className="v-start-btn"
            onClick={() => setCurrentStep(1)}
          >
            Let's Get Started
          </button>
        )}

        <button
          type="button"
          className="v-skip-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  };

  const renderChooseDocScreen = () => (
    <div className="v-choose-doc-container">
      <h2 className="v-choose-title">Choose Verification Document</h2>
      <p className="v-choose-subtitle">
        Select the type of government-issued ID you would like to use for verification.
      </p>

      <div className="v-doc-options-grid">
        {docOptions.map((doc) => (
          <div
            key={doc.id}
            className={`v-doc-option-card ${selectedDoc === doc.id ? "selected" : ""}`}
            onClick={() => setSelectedDoc(doc.id)}
          >
            <div className="v-doc-card-top">
              <div className="v-doc-icon-box">
                <Icon name={doc.icon} size={24} color="#103ca4" />
              </div>
              <div className="v-radio-indicator"></div>
            </div>
            <div className="v-doc-card-body">
              <span className="v-doc-name">{doc.name}</span>
              <span className="v-doc-desc">{doc.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 mb-4">
        <label className="fw-semibold mb-2 d-block">ID / Document Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your document ID number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="v-continue-btn"
        onClick={() => setCurrentStep(2)}
      >
        <span>Continue to Upload</span>
        <Icon name="ArrowRight" size={18} color="#ffffff" />
      </button>
    </div>
  );

  const renderUploadScreen = () => (
    <div className="v-choose-doc-container">
      <h2 className="v-choose-title">Upload Documents &amp; Selfie</h2>
      <p className="v-choose-subtitle">Upload clear photos of your ID document (front &amp; back) and a recent selfie.</p>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="fw-semibold mb-2 d-block">Document Front Image</label>
          <input
            type="file"
            accept="image/*,.pdf"
            className="form-control"
            onChange={(e) => setFrontDoc(e.target.files[0])}
          />
          {frontDoc && <small className="text-success mt-1 d-block">Selected: {frontDoc.name}</small>}
        </div>

        <div className="col-md-6">
          <label className="fw-semibold mb-2 d-block">Document Back Image</label>
          <input
            type="file"
            accept="image/*,.pdf"
            className="form-control"
            onChange={(e) => setBackDoc(e.target.files[0])}
          />
          {backDoc && <small className="text-success mt-1 d-block">Selected: {backDoc.name}</small>}
        </div>

        <div className="col-12 mt-3">
          <label className="fw-semibold mb-2 d-block">Selfie / Live Face Photo</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => setSelfie(e.target.files[0])}
          />
          {selfie && <small className="text-success mt-1 d-block">Selected: {selfie.name}</small>}
        </div>
      </div>

      {submitError && (
        <div className="alert alert-danger mb-3 d-flex align-items-center justify-content-between">
          <span>{submitError}</span>
          {(submitError.toLowerCase().includes("sign in") ||
            submitError.toLowerCase().includes("log in") ||
            submitError.toLowerCase().includes("unauthenticated") ||
            submitError.includes("401")) && (
            <button
              type="button"
              className="btn btn-sm text-white ms-3 flex-shrink-0"
              style={{ backgroundColor: "#103ca4" }}
              onClick={() => navigate("/login")}
            >
              Sign In Now
            </button>
          )}
        </div>
      )}

      <div className="d-flex justify-content-end gap-3 mt-4">
        <button type="button" className="btn btn-outline-secondary" onClick={() => setCurrentStep(1)}>
          Back
        </button>
        <button
          type="button"
          className="v-continue-btn"
          disabled={submitting || (!frontDoc && !idNumber)}
          onClick={handleSubmitVerification}
        >
          {submitting ? "Submitting..." : "Submit for Verification"}
        </button>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="verification-workspace">
        <button
          type="button"
          className="verification-back-arrow"
          onClick={() => {
            if (currentStep > 0) setCurrentStep((prev) => prev - 1);
            else navigate("/dashboard");
          }}
        >
          <Icon name="ArrowLeft" size={24} color="#103ca4" />
        </button>

        {currentStep > 0 && (
          <h1 className="verification-page-heading">Verify Your Identity</h1>
        )}

        <Cards className="verification-main-card">
          <div className="verification-card-inner">
            {currentStep === 0 && renderStartScreen()}
            {currentStep === 1 && renderChooseDocScreen()}
            {currentStep === 2 && renderUploadScreen()}
          </div>
        </Cards>
      </div>
    </DashboardLayout>
  );
}
