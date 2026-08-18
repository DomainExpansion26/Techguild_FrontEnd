import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, Cards, PrimaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import "@/Modules/Individual/Screen/Pages/DashBoard/dashboard.css";
import uploadIcon from "@/assets/icons/arrow-up-from-line.svg";
import ContinueIcon from "@/assets/icons/arrow-right.svg";
import Back from "@/assets/icons/arrow-left.svg";
import SelectIcon from "@/assets/icons/chevron-down.svg";

import "./Profile.css";

const clientStepSlugMap = {
  1: "company-info",
  2: "hiring-preferences",
  3: "review",
  4: "completed"
};

const clientSlugStepMap = {
  "company-info": 1,
  "hiring-preferences": 2,
  "review": 3,
  "completed": 4
};

export default function ClientProfile() {
  const navigate = useNavigate();
  const { step } = useParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Step 1 Form States
  const [clientName, setClientName] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [step1Errors, setStep1Errors] = useState({});

  // Step 2 Form States
  const [projectTypes, setProjectTypes] = useState("");
  const [budget, setBudget] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [step2Errors, setStep2Errors] = useState({});

  useEffect(() => {
    if (step) {
      if (step === "completed") {
        setIsSubmitted(true);
      } else if (clientSlugStepMap[step]) {
        setIsSubmitted(false);
        setCurrentStep(clientSlugStepMap[step]);
      }
    }
  }, [step]);

  const goToStep = (stepNum) => {
    const slug = clientStepSlugMap[stepNum] || "company-info";
    navigate(`/client-profile/${slug}`);
  };

  const steps = [
    { number: 1, label: "Agency Information" },
    { number: 2, label: "Services" },
    { number: 3, label: "Review and Submit" },
  ];

  // --- Handlers ---
  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
      setStep1Errors((prev) => ({ ...prev, logoFile: "" }));
    }
  };

  const isStep1Complete = clientName.trim() !== "" && industry !== "" && website.trim() !== "" && logoFile !== null;
  const isStep2Complete = projectTypes !== "" && budget !== "" && teamSize !== "";

  const handleCancelEdit = () => {
    setIsEditMode(false);
    goToStep(3);
  };

  const handleStep1Continue = (e) => {
    e.preventDefault();
    const errors = {};
    if (!clientName.trim()) errors.clientName = "Client Name is required";
    if (!logoFile) errors.logoFile = "Logo is required";
    if (!industry) errors.industry = "Industry is required";
    if (!website.trim()) errors.website = "Website is required";

    if (Object.keys(errors).length > 0) {
      setStep1Errors(errors);
      return;
    }
    setStep1Errors({});
    if (isEditMode) {
      setIsEditMode(false);
      goToStep(3);
    } else {
      goToStep(2);
    }
  };

  const handleStep2Continue = (e) => {
    e.preventDefault();
    const errors = {};
    if (!projectTypes) errors.projectTypes = "Project type is required";
    if (!budget) errors.budget = "Budget is required";
    if (!teamSize) errors.teamSize = "Team size is required";

    if (Object.keys(errors).length > 0) {
      setStep2Errors(errors);
      return;
    }
    setStep2Errors({});
    if (isEditMode) {
      setIsEditMode(false);
      goToStep(3);
    } else {
      goToStep(3);
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    goToStep(4);
  };

  // --- Render Helpers ---
  const renderStepper = () => {
    const progressWidth = `${((currentStep - 1) / (steps.length - 1)) * 100}%`;
    return (
      <div className="profile-stepper-container">
        <div className="profile-stepper">
          <div className="stepper-track-line">
            <div className="stepper-active-line" style={{ width: progressWidth }}></div>
          </div>
          {steps.map((step) => {
            const isActive = step.number <= currentStep;
            return (
              <div key={step.number} className={`stepper-item ${isActive ? "active" : ""}`}>
                <div className="stepper-circle">{step.number}</div>
                <span className="stepper-label mt-2">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <form className="profile-step-form" onSubmit={handleStep1Continue}>
      <div className="profile-section-heading">
        <h2 className="section-title">Company Information</h2>
        <p className="section-subtitle">Add your company details</p>
      </div>

      <div className="client-info-row mb-4">
        <div className="profile-field-group client-name-group">
          <label className="field-label fw-bold">Client Name</label>
          <input
            type="text"
            className={`profile-text-input ${step1Errors.clientName ? "input-error" : ""}`}
            placeholder="Enter agency name"
            value={clientName}
            onChange={(e) => { setClientName(e.target.value); setStep1Errors((p) => ({ ...p, clientName: "" })); }}
          />
          {step1Errors.clientName && <span className="field-error">{step1Errors.clientName}</span>}
        </div>

        <div className="profile-field-group client-logo-group">
          <label className="field-label fw-bold">Logo</label>
          <div className="upload-btn-wrapper">
            <label htmlFor="client-logo-input" className="upload-photo-btn cursor-pointer d-inline-flex align-items-center justify-content-center text-white gap-2">
              <span>{logoFile ? "Logo Selected" : "Upload Logo"}</span>
              <img src={uploadIcon} alt="Upload" className="btn-icon-svg" />
            </label>
            <input id="client-logo-input" type="file" accept="image/*" className="hidden-input" onChange={handleLogoUpload} />
          </div>
          {step1Errors.logoFile && <span className="field-error">{step1Errors.logoFile}</span>}
        </div>
      </div>

      <div className="profile-field-group mb-4">
        <div className="custom-dropdown-container">
          <label className="field-label fw-bold">Industry</label>
          <div className={`custom-dropdown-box ${step1Errors.industry ? "dropdown-error" : ""}`}>
            <select className={`custom-dropdown-select ${industry === "" ? "is-placeholder" : ""}`} value={industry} onChange={(e) => { setIndustry(e.target.value); setStep1Errors((p) => ({ ...p, industry: "" })); }}>
              <option value="" disabled hidden>Select Industry</option>
              <option value="IT">Information Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Marketing">Marketing</option>
              <option value="Education">Education</option>
            </select>
            <img src={SelectIcon} alt="Select" className="dropdown-chevron-icon" />
          </div>
          {step1Errors.industry && <span className="field-error">{step1Errors.industry}</span>}
        </div>
      </div>

      <div className="profile-field-group mb-4">
        <label className="field-label fw-bold">Website</label>
        <input
          type="text"
          className={`profile-text-input ${step1Errors.website ? "input-error" : ""}`}
          placeholder="Enter website URL"
          value={website}
          onChange={(e) => { setWebsite(e.target.value); setStep1Errors((p) => ({ ...p, website: "" })); }}
        />
        {step1Errors.website && <span className="field-error">{step1Errors.website}</span>}
      </div>

      <div className="profile-form-actions">
        {isEditMode && (
          <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
        )}
        <div className="continue-btn-wrapper">
          <PrimaryButton
            type="submit"
            disabled={!isStep1Complete}
            text={
              <span className="d-inline-flex align-items-center gap-2">
                <span>{isEditMode ? "Save Changes" : "Continue"}</span>
                {!isEditMode && <img src={ContinueIcon} alt="Continue" className="btn-icon-svg" />}
              </span>
            }
          />
        </div>
      </div>
    </form>
  );

  const renderStep2 = () => (
    <form className="profile-step-form" onSubmit={handleStep2Continue}>
      <div className="profile-section-heading">
        <h2 className="section-title">Hiring Preferences</h2>
        <p className="section-subtitle">Tell us about your project needs..</p>
      </div>

      <div className="profile-field-group mb-4">
        <div className="custom-dropdown-container">
          <label className="field-label fw-bold">Project Types</label>
          <div className={`custom-dropdown-box ${step2Errors.projectTypes ? "dropdown-error" : ""}`}>
            <select className={`custom-dropdown-select ${projectTypes === "" ? "is-placeholder" : ""}`} value={projectTypes} onChange={(e) => { setProjectTypes(e.target.value); setStep2Errors((p) => ({ ...p, projectTypes: "" })); }}>
              <option value="" disabled hidden>Select project types</option>
              <option value="short-term">Short-term Contract</option>
              <option value="long-term">Long-term Contract</option>
              <option value="full-time">Full-time Placement</option>
            </select>
            <img src={SelectIcon} alt="Select" className="dropdown-chevron-icon" />
          </div>
          {step2Errors.projectTypes && <span className="field-error">{step2Errors.projectTypes}</span>}
        </div>
      </div>

      <div className="profile-field-group mb-4">
        <div className="custom-dropdown-container">
          <label className="field-label fw-bold">Budget</label>
          <div className={`custom-dropdown-box ${step2Errors.budget ? "dropdown-error" : ""}`}>
            <select className={`custom-dropdown-select ${budget === "" ? "is-placeholder" : ""}`} value={budget} onChange={(e) => { setBudget(e.target.value); setStep2Errors((p) => ({ ...p, budget: "" })); }}>
              <option value="" disabled hidden>Select budget range</option>
              <option value="under-1k">Under $1,000</option>
              <option value="1k-5k">$1,000 - $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-plus">$10,000+</option>
            </select>
            <img src={SelectIcon} alt="Select" className="dropdown-chevron-icon" />
          </div>
          {step2Errors.budget && <span className="field-error">{step2Errors.budget}</span>}
        </div>
      </div>

      <div className="profile-field-group mb-4">
        <div className="custom-dropdown-container">
          <label className="field-label fw-bold">Team Size</label>
          <div className={`custom-dropdown-box ${step2Errors.teamSize ? "dropdown-error" : ""}`}>
            <select className={`custom-dropdown-select ${teamSize === "" ? "is-placeholder" : ""}`} value={teamSize} onChange={(e) => { setTeamSize(e.target.value); setStep2Errors((p) => ({ ...p, teamSize: "" })); }}>
              <option value="" disabled hidden>Select team size</option>
              <option value="1-5">1-5 Employees</option>
              <option value="6-20">6-20 Employees</option>
              <option value="21-50">21-50 Employees</option>
              <option value="50-plus">50+ Employees</option>
            </select>
            <img src={SelectIcon} alt="Select" className="dropdown-chevron-icon" />
          </div>
          {step2Errors.teamSize && <span className="field-error">{step2Errors.teamSize}</span>}
        </div>
      </div>

      <div className="profile-form-actions">
        {isEditMode && (
          <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
        )}
        <div className="continue-btn-wrapper">
          <PrimaryButton
            type="submit"
            disabled={!isStep2Complete}
            text={
              <span className="d-inline-flex align-items-center gap-2">
                <span>{isEditMode ? "Save Changes" : "Continue"}</span>
                {!isEditMode && <img src={ContinueIcon} alt="Continue" className="btn-icon-svg" />}
              </span>
            }
          />
        </div>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <form className="profile-step-form" onSubmit={handleFinalSubmit}>
      <div className="profile-section-heading">
        <h2 className="section-title">Review & Submit</h2>
        <p className="section-subtitle">Review your information before continuing</p>
      </div>

      <div className="d-flex flex-column gap-3 mb-4">
        <div className="review-summary-card d-flex align-items-center justify-content-between w-100">
          <span className="review-summary-title">Company Information</span>
          <span className="review-edit-btn" onClick={() => { setIsEditMode(true); goToStep(1); }} role="button">Edit</span>
        </div>

        <div className="review-summary-card d-flex align-items-center justify-content-between w-100">
          <span className="review-summary-title">Hiring Preferences</span>
          <span className="review-edit-btn" onClick={() => { setIsEditMode(true); goToStep(2); }} role="button">Edit</span>
        </div>
      </div>

      <div className="profile-form-actions">
        <div className="continue-btn-wrapper">
          <PrimaryButton
            type="submit"
            text={
              <span className="d-inline-flex align-items-center gap-2">
                <span>Continue</span>
                <img src={ContinueIcon} alt="Continue" className="btn-icon-svg" />
              </span>
            }
          />
        </div>
      </div>
    </form>
  );

  const renderCompletionScreen = () => (
    <div className="completion-screen-wrapper d-flex flex-column align-items-center h-100 w-100 py-1">
      <div className="d-flex flex-column align-items-center w-100 my-auto">
        <div className="completion-avatar-circle d-flex align-items-center justify-content-center mb-3">
          <Icon name="User2" size={44} color="#103CA4" />
        </div>
        <h1 className="completion-main-title fw-bold text-center mb-3">
          Profile Setup Completed<br />Successfully !
        </h1>
        <div className="completion-reward-banner text-start mb-4 w-100">
          <h3 className="reward-banner-title fw-bold mb-1">Profile Completed</h3>
          <p className="reward-banner-subtitle mb-0">You have earned +20 trust points!</p>
        </div>

        <div className="completion-stepper-container position-relative w-100 mb-5 mt-3">
          <div className="completion-stepper position-relative d-flex align-items-start justify-content-between w-100">
            <div className="completion-track-line position-absolute">
              <div className="completion-active-line" style={{ width: "33.33%" }}></div>
            </div>

            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle active d-flex align-items-center justify-content-center">
                <span className="dot-white"></span>
              </div>
              <span className="completion-step-title fw-bold text-dark mt-2">Email Verified</span>
              <span className="completion-step-points fw-bold text-primary">+10 Trust Points</span>
            </div>

            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle active d-flex align-items-center justify-content-center">
                <span className="dot-white"></span>
              </div>
              <span className="completion-step-title fw-bold text-dark mt-2">Profile Completed</span>
              <span className="completion-step-points fw-bold text-primary">+20 Trust Points</span>
            </div>

            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle locked d-flex align-items-center justify-content-center bg-white">
                <Icon name="Lock" size={14} color="#9ca3af" />
              </div>
              <span className="completion-step-title text-muted mt-2">Identity Verified</span>
              <span className="completion-step-points text-muted">+40 Trust Points</span>
            </div>

            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle locked d-flex align-items-center justify-content-center bg-white">
                <Icon name="Lock" size={14} color="#9ca3af" />
              </div>
              <span className="completion-step-title text-muted mt-2">First Project/ Proposal</span>
              <span className="completion-step-points text-muted">+30 Trust Points</span>
            </div>
          </div>
        </div>

        <div className="completion-cta-wrapper d-flex justify-content-center mt-4">
          <button type="button" className="completion-cta-btn border-0 text-white fw-bold d-inline-flex align-items-center justify-content-center px-5">
            Continue to Verify Identity
          </button>
        </div>
      </div>
    </div>
  );

  return (
    /* OUTER WRAPPER: Now powered by Flexbox in CSS to side-by-side align */
    <div className="dashboard-layout client-profile-page">
      <Navbar userRole="Client" />

      {/* 2. FRAME / MAIN CONTENT AREA */}
      <main className="main-workspace d-flex flex-column h-100">

        {/* Top Header Card */}
        <Cards className="header-card flex-shrink-0" padding="0">
          <header className="header">
            <div className="header-search-bar">
              <Icon name="Search" size={16} className="search-icon" color="#111827" />
              <input type="text" placeholder="Search for Clients, projects or freelancers.." className="search-input" />
            </div>
            <div className="header-actions">
              <button className="icon-btn"><Icon name="Bell" size={20} color="#111827" /></button>
              <button className="icon-btn"><Icon name="Mail" size={20} color="#111827" /></button>
              <div className="header-avatar">A</div>
            </div>
          </header>
        </Cards>

        {/* Profile Form Card */}
        <div className="profile-page-wrapper">
          <Cards className="profile-main-card" padding="0">
            <div className="profile-card-inner">
              <div className="back-btn-container w-100 d-flex justify-content-start mb-3">
                <button
                  type="button"
                  className="completion-back-btn"
                  onClick={() => {
                    if (isSubmitted) {
                      setIsSubmitted(false);
                    } else if (isEditMode) {
                      setIsEditMode(false);
                      setCurrentStep(3);
                    } else if (currentStep > 1) {
                      setCurrentStep(currentStep - 1);
                    }
                  }}
                  aria-label="Go back"
                >
                  <img src={Back} alt="Back" className="back-icon-svg" />
                </button>
              </div>

              {isSubmitted ? (
                renderCompletionScreen()
              ) : (
                <div className="profile-content-column">
                  <div className="profile-header-section">
                    <h1 className="profile-main-title">Complete Your Profile</h1>
                    <p className="profile-main-subtitle">Lets build your profile step by step.</p>
                  </div>

                  {renderStepper()}

                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                </div>
              )}
            </div>
          </Cards>
        </div>
      </main>

    </div>
  );
}