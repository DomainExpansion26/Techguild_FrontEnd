import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";
import "./verification.css";

export default function Verification() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // 0: Start Screen, 1: Choose Document Screen
  const [selectedDoc, setSelectedDoc] = useState("aadhaar");

  const steps = [
    { number: 1, label: "Verification Document" },
    { number: 2, label: "Upload Documents" },
    { number: 3, label: "Take Selfie" },
    { number: 4, label: "Review Information" },
  ];

  const docOptions = [
    {
      id: "aadhaar",
      name: "Aadhaar Card",
      desc: "Unique 12-digit identification number issued bu UIDAI.",
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
      desc: "International travel document issued by goverment.",
      icon: "IdCardLanyard",
    },
    {
      id: "license",
      name: "Driving License",
      desc: "Government-issued driving license.",
      icon: "CreditCard",
    },
  ];

  const renderStepper = () => (
    <div className="verification-stepper-outer">
      <div className="v-stepper-outer-line"></div>
      {steps.map((step) => (
        <div
          key={step.number}
          className={`v-outer-step ${step.number === 1 ? "active" : ""}`}
        >
          <div className="v-outer-circle">{step.number}</div>
          <span className="v-outer-label">{step.label}</span>
        </div>
      ))}
    </div>
  );

  const renderStartScreen = () => (
    <div className="v-start-container">
      <h1 className="v-start-title">Verify Your Identity</h1>
      <p className="v-start-desc">
        To build a trusted marketplace, every member complete a quick identity verification, Your information is securely encrypted and used only to verify your account.
      </p>

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
          <span className="v-checklist-text">Access to verified projects</span>
        </div>
        <div className="v-checklist-item">
          <Icon name="Check" size={20} color="#103CA4" stroke="#103CA4" strokeWidth={2.5} className="v-checklist-icon" />
          <span className="v-checklist-text">Secure marketplace for everyone</span>
        </div>
      </div>

      <button
        type="button"
        className="v-start-btn"
        onClick={() => setCurrentStep(1)}
      >
        Let's Get Started
      </button>

      <button
        type="button"
        className="v-skip-btn"
        onClick={() => navigate("/profile")}
      >
        Skip for now
      </button>
    </div>
  );

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

      <button
        type="button"
        className="v-continue-btn"
        onClick={() => {}}
      >
        <span>Continue</span>
        <Icon name="ArrowRight" size={18} color="#ffffff" />
      </button>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="verification-workspace">
        {/* Back Button */}
        <button
          type="button"
          className="verification-back-arrow"
          onClick={() => {
            if (currentStep === 1) setCurrentStep(0);
            else navigate("/profile");
          }}
        >
          <Icon name="ArrowLeft" size={24} color="#103ca4" />
        </button>

        {/* Page Heading & Stepper (Visible on Step 1) */}
        {currentStep === 1 && (
          <>
            <h1 className="verification-page-heading">Verify Your Identity</h1>
            {renderStepper()}
          </>
        )}

        <Cards className="verification-main-card">
          <div className="verification-card-inner">
            {currentStep === 0 && renderStartScreen()}
            {currentStep === 1 && renderChooseDocScreen()}
          </div>
        </Cards>
      </div>
    </DashboardLayout>
  );
}
