// [TechGuild Update: 21-09-2026] Client profile onboarding wizard & OpenAPI step-save integration
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, Cards, Header, PrimaryButton, SecondaryButton, TextInput, Stepper } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { useAuth } from "@/context/AuthContext";
import { profileApi } from "@/features/profile/api/profileApi";
import { ICON_SIZES } from "@/constants/sizes";
import dashboardBg from "@/assets/dashboard.bg.png";
import "@/flows/individual/pages/DashBoard/dashboard.css";
import "./Profile.css";

/**
 * ============================================================================
 * TECHGUILD UNIFIED DESIGN SYSTEM USAGE IN CLIENT PROFILE:
 * 
 * 1. Stepper Component (from "@/Components") -> 3-step progress bar (Agency Info -> Services -> Review)
 * 2. Header Component (from "@/Components")  -> Top workspace bar with Search & Account
 * 3. variant="base" (Profile Main Card)      -> Main custom form & multi-step layout container
 * 4. Step 3 Summary Cards                    -> Review & Submit overview blocks
 * 5. Completion Reward Banner                -> Trust Points milestone notification
 * ============================================================================
 */

const clientNavItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/client-dashboard" },
  { id: "profile", label: "Profile (Guild Card)", icon: "User2", path: "/client-profile" },
  { id: "quest-board", label: "Quest Board", icon: "Files", path: "/client-quest-board" },
  { id: "applications", label: "Applications", icon: "FileText", path: "/client-applications" },
  { id: "active-quests", label: "Active Quests", icon: "Files", path: "/client-active-quests" },
  { id: "company-reputation", label: "Company Reputation", icon: "Verified", path: "/client-company-reputation" },
  { id: "verification-hub", label: "Verification Hub", icon: "Bookmark", path: "/client-verification-hub" },
  { id: "payouts", label: "Payouts", icon: "IndianRupee", path: "/client-payouts" },
  { id: "notifications", label: "Notifications", icon: "Bell", path: "/client-notifications" },
  { id: "settings", label: "Settings", icon: "Settings", path: "/client-settings" },
  { id: "help-support", label: "Help & Support", icon: "CircleQuestionMark", path: "/client-help-support" },
];

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
  const { user } = useAuth();

  // Derive current step and completion state directly from URL params
  const currentStep = clientSlugStepMap[step] || 1;
  const isSubmitted = step === "completed";

  const [profile, setProfile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Step 1 Form States
  const [clientName, setClientName] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  // Required by CreateClientProfileRequest (all keys required, no extras)
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [timezone, setTimezone] = useState("");
  const [step1Errors, setStep1Errors] = useState({});

  // Step 2 Form States
  const [projectTypes, setProjectTypes] = useState("");
  const [budget, setBudget] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [step2Errors, setStep2Errors] = useState({});

  useEffect(() => {
    async function loadData() {
      try {
        // get-my-profile: { account_type, individual, client, agency }
        const profRes = await profileApi.getMyProfile();
        const p = profRes?.client || {};
        setProfile(p);

        const initialName =
          p?.company_name ||
          user?.company_name ||
          user?.name ||
          (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : null) ||
          "";

        if (initialName) setClientName(initialName);
        if (p?.industry) setIndustry(p.industry);
        if (p?.website_url || p?.website) setWebsite(p.website_url || p.website);
        if (p?.team_size || p?.company_size || p?.size) setTeamSize(p.team_size || p.company_size || p.size);
        if (p?.budget_range || p?.budget) setBudget(p.budget_range || p.budget);
        if (p?.project_types) {
          const pt = Array.isArray(p.project_types) ? p.project_types[0] : p.project_types;
          setProjectTypes(pt || "");
        }
        // Spec-required contact + location fields
        if (p?.phone) setPhone(p.phone);
        if (p?.country) setCountry(p.country);
        if (p?.city) setCity(p.city);
        if (p?.timezone) setTimezone(p.timezone);
        if (p?.logo_url) setLogoUrl(p.logo_url);
      } catch (err) {
        console.warn("Failed to pre-fill client profile:", err);
      }
    }
    loadData();
  }, [user]);

  const goToStep = (stepNum) => {
    const slug = clientStepSlugMap[stepNum] || "company-info";
    navigate(`/client-profile/${slug}`);
  };

  const steps = [
    { number: 1, label: "Agency Information" },
    { number: 2, label: "Services" },
    { number: 3, label: "Review and Submit" },
  ];

  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
      setStep1Errors((prev) => ({ ...prev, logoFile: "" }));
    }
  };

  const isPhoneValid = (v) => /^[+\d][\d\s-]{6,}$/.test((v || "").trim());

  const isStep1Complete =
    clientName.trim() !== "" &&
    isPhoneValid(phone) &&
    industry !== "" &&
    website.trim() !== "" &&
    country.trim() !== "" &&
    city.trim() !== "" &&
    timezone !== "" &&
    (logoFile !== null || logoUrl !== "");
  const isStep2Complete = projectTypes !== "" && budget !== "" && teamSize !== "";

  const handleCancelEdit = () => {
    setIsEditMode(false);
    goToStep(3);
  };

  const handleStep1Continue = (e) => {
    e.preventDefault();
    const errors = {};
    if (!clientName.trim()) errors.clientName = "Client Name is required";
    if (!logoFile && !logoUrl) errors.logoFile = "Logo is required";
    if (!isPhoneValid(phone)) errors.phone = "Valid phone number is required";
    if (!industry) errors.industry = "Industry is required";
    if (!website.trim()) errors.website = "Website is required";
    if (!country.trim()) errors.country = "Country is required";
    if (!city.trim()) errors.city = "City is required";
    if (!timezone) errors.timezone = "Time zone is required";

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

  /**
   * STEPPER COMPONENT:
   * - Component: <Stepper /> imported from "@/Components"
   * - Location: Client Profile Multi-step flow
   * - Purpose: Renders the horizontal 3-step numbered tracker (Agency Info -> Services -> Review & Submit)
   */
  const renderStepper = () => (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      activeColor="#0b38a8"
      className="profile-stepper-container"
    />
  );

  const renderStep1 = () => (
    <form className="profile-step-form" onSubmit={handleStep1Continue}>
      <div className="profile-section-heading">
        <h2 className="section-title">Company Information</h2>
        <p className="section-subtitle">Add your company details</p>
      </div>

      <div className="client-info-row mb-4">
        <div className="client-name-group" style={{ flex: 1 }}>
          <TextInput
            label="Client Name"
            placeholder="Enter agency name"
            value={clientName}
            error={step1Errors.clientName}
            required
            onChange={(e) => { setClientName(e.target.value); setStep1Errors((p) => ({ ...p, clientName: "" })); }}
          />
        </div>

        <div className="profile-field-group client-logo-group">
          <label className="field-label">Logo</label>
          <div className="upload-btn-wrapper">
            <label
              htmlFor="client-logo-input"
              className="upload-photo-btn cursor-pointer d-inline-flex align-items-center justify-content-center text-white gap-2"
              title={logoFile ? (logoFile.name || "Logo Selected") : "Upload Logo"}
            >
              <span className="upload-btn-text">
                {logoFile ? (logoFile.name || "Logo Selected") : "Upload Logo"}
              </span>
              <Icon name="Upload" size={ICON_SIZES.MD} color="#ffffff" />
            </label>
            <input id="client-logo-input" type="file" accept="image/*" className="hidden-input" onChange={handleLogoUpload} />
          </div>
          {step1Errors.logoFile && <span className="field-error">{step1Errors.logoFile}</span>}
        </div>
      </div>

      <div className="profile-field-group mb-4">
        <div className="custom-dropdown-container">
          <label className="field-label">Industry</label>
          <div className={`custom-dropdown-box ${step1Errors.industry ? "dropdown-error" : ""}`}>
            <select className={`custom-dropdown-select ${industry === "" ? "is-placeholder" : ""}`} value={industry} onChange={(e) => { setIndustry(e.target.value); setStep1Errors((p) => ({ ...p, industry: "" })); }}>
              <option value="" disabled hidden>Select Industry</option>
              <option value="IT">Information Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Marketing">Marketing</option>
              <option value="Education">Education</option>
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {step1Errors.industry && <span className="field-error">{step1Errors.industry}</span>}
        </div>
      </div>

      <div className="mb-4">
        <TextInput
          label="Website"
          placeholder="Enter website URL"
          value={website}
          error={step1Errors.website}
          required
          onChange={(e) => { setWebsite(e.target.value); setStep1Errors((p) => ({ ...p, website: "" })); }}
        />
      </div>

      <div className="mb-4">
        <TextInput
          label="Phone Number"
          type="tel"
          placeholder="e.g. +919876543210"
          value={phone}
          error={step1Errors.phone}
          required
          onChange={(e) => { setPhone(e.target.value); setStep1Errors((p) => ({ ...p, phone: "" })); }}
        />
      </div>

      <div className="client-info-row mb-4">
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <TextInput
            label="Country"
            placeholder="e.g. India"
            value={country}
            error={step1Errors.country}
            required
            onChange={(e) => { setCountry(e.target.value); setStep1Errors((p) => ({ ...p, country: "" })); }}
          />
        </div>

        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <TextInput
            label="City"
            placeholder="e.g. Pune"
            value={city}
            error={step1Errors.city}
            required
            onChange={(e) => { setCity(e.target.value); setStep1Errors((p) => ({ ...p, city: "" })); }}
          />
        </div>
      </div>

      <div className="profile-field-group mb-4">
        <div className="custom-dropdown-container">
          <label className="field-label">Time Zone</label>
          <div className={`custom-dropdown-box ${step1Errors.timezone ? "dropdown-error" : ""}`}>
            <select className={`custom-dropdown-select ${timezone === "" ? "is-placeholder" : ""}`} value={timezone} onChange={(e) => { setTimezone(e.target.value); setStep1Errors((p) => ({ ...p, timezone: "" })); }}>
              <option value="" disabled hidden>Select time zone</option>
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST/EDT)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
              <option value="Europe/London">Europe/London (GMT/BST)</option>
              <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
              <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {step1Errors.timezone && <span className="field-error">{step1Errors.timezone}</span>}
        </div>
      </div>

      <div className="profile-form-actions d-flex justify-content-end align-items-center shrink-0 mt-auto gap-3">
        {isEditMode && (
          <SecondaryButton type="button" onClick={handleCancelEdit} text="Cancel" />
        )}
        <div className="continue-btn-wrapper">
          <PrimaryButton
            type="submit"
            disabled={!isStep1Complete}
            text={isEditMode ? "Save Changes" : "Continue"}
            icon={!isEditMode && <Icon name="ArrowRight" size={ICON_SIZES.DEFAULT} color="#ffffff" />}
            iconPosition="right"
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
          <label className="field-label">Project Types</label>
          <div className={`custom-dropdown-box ${step2Errors.projectTypes ? "dropdown-error" : ""}`}>
            <select className={`custom-dropdown-select ${projectTypes === "" ? "is-placeholder" : ""}`} value={projectTypes} onChange={(e) => { setProjectTypes(e.target.value); setStep2Errors((p) => ({ ...p, projectTypes: "" })); }}>
              <option value="" disabled hidden>Select project types</option>
              <option value="short-term">Short-term Contract</option>
              <option value="long-term">Long-term Contract</option>
              <option value="full-time">Full-time Placement</option>
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {step2Errors.projectTypes && <span className="field-error">{step2Errors.projectTypes}</span>}
        </div>
      </div>

      <div className="profile-field-group mb-4">
        <div className="custom-dropdown-container">
          <label className="field-label">Budget</label>
          <div className={`custom-dropdown-box ${step2Errors.budget ? "dropdown-error" : ""}`}>
            <select className={`custom-dropdown-select ${budget === "" ? "is-placeholder" : ""}`} value={budget} onChange={(e) => { setBudget(e.target.value); setStep2Errors((p) => ({ ...p, budget: "" })); }}>
              <option value="" disabled hidden>Select budget range</option>
              <option value="under-1k">Under $1,000</option>
              <option value="1k-5k">$1,000 - $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-plus">$10,000+</option>
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {step2Errors.budget && <span className="field-error">{step2Errors.budget}</span>}
        </div>
      </div>

      <div className="profile-field-group mb-4">
        <div className="custom-dropdown-container">
          <label className="field-label">Team Size</label>
          <div className={`custom-dropdown-box ${step2Errors.teamSize ? "dropdown-error" : ""}`}>
            <select className={`custom-dropdown-select ${teamSize === "" ? "is-placeholder" : ""}`} value={teamSize} onChange={(e) => { setTeamSize(e.target.value); setStep2Errors((p) => ({ ...p, teamSize: "" })); }}>
              <option value="" disabled hidden>Select team size</option>
              <option value="1-5">1-5 Employees</option>
              <option value="6-20">6-20 Employees</option>
              <option value="21-50">21-50 Employees</option>
              <option value="50-plus">50+ Employees</option>
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {step2Errors.teamSize && <span className="field-error">{step2Errors.teamSize}</span>}
        </div>
      </div>

      <div className="profile-form-actions d-flex justify-content-end align-items-center shrink-0 mt-auto gap-3">
        {isEditMode && (
          <SecondaryButton type="button" onClick={handleCancelEdit} text="Cancel" />
        )}
        <div className="continue-btn-wrapper">
          <PrimaryButton
            type="submit"
            disabled={!isStep2Complete}
            text={isEditMode ? "Save Changes" : "Continue"}
            icon={!isEditMode && <Icon name="ArrowRight" size={ICON_SIZES.DEFAULT} color="#ffffff" />}
            iconPosition="right"
          />
        </div>
      </div>
    </form>
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  /**
   * Final Submission Handler (POST /v1/profile/client wizard step-save):
   * 1. Uploads company logo file -> captures `logo_url` from UploadLogoResponse.
   * 2. Saves via strict CreateClientProfileRequest body (all 11 keys, no extras).
   *    PATCH /v1/profile/client is used when a profile already exists.
   * 3. Transitions to Step 4 (Completed / Reward Screen) only on success.
   */
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      // 1. Upload logo if selected as a File instance
      let resolvedLogoUrl = logoUrl || profile?.logo_url || null;
      if (logoFile instanceof File) {
        const uploadRes = await profileApi.uploadLogo(logoFile);
        resolvedLogoUrl = uploadRes?.logo_url || resolvedLogoUrl;
        if (resolvedLogoUrl) setLogoUrl(resolvedLogoUrl);
      }

      // 2. Persist company & hiring preferences (strict spec body built inside)
      const profileExists = Boolean(profile?.public_url_slug || profile?.company_name);
      await profileApi.saveClientProfile(
        {
          company_name: clientName,
          phone,
          logo_url: resolvedLogoUrl,
          industry,
          website_url: website,
          project_types: projectTypes,
          budget_range: budget,
          team_size: teamSize,
          country,
          city,
          timezone,
        },
        profileExists
      );

      // 3. Navigate to completion step
      goToStep(4);
    } catch (err) {
      console.error("Failed to save client profile:", err);
      setSubmitError(err?.message || "Failed to save profile. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep3 = () => (
    <form className="profile-step-form" onSubmit={handleFinalSubmit}>
      <div className="profile-section-heading">
        <h2 className="section-title">Review & Submit</h2>
        <p className="section-subtitle">Review your information before continuing</p>
      </div>

      {/* 
        CARD COMPONENT: Review Summary Cards
        - Variant: variant="base" (BaseCard)
        - Location: renderStep3() (Review & Submit Step)
        - Purpose: Preview cards displaying completed Company Info & Hiring Preferences sections with Edit shortcuts
      */}
      <div className="d-flex flex-column gap-3 mb-4">
        <Cards variant="base" radius="md" className="review-summary-card">
          <span className="review-summary-title">Company Information</span>
          <span className="review-edit-btn" onClick={() => { setIsEditMode(true); goToStep(1); }} role="button">Edit</span>
        </Cards>

        <Cards variant="base" radius="md" className="review-summary-card">
          <span className="review-summary-title">Hiring Preferences</span>
          <span className="review-edit-btn" onClick={() => { setIsEditMode(true); goToStep(2); }} role="button">Edit</span>
        </Cards>
      </div>

      <div className="profile-form-actions d-flex justify-content-end align-items-center shrink-0 mt-auto gap-3">
        <div className="continue-btn-wrapper">
          <PrimaryButton
            type="submit"
            disabled={isSubmitting}
            text={isSubmitting ? "Submitting..." : "Continue"}
            icon={!isSubmitting && <Icon name="ArrowRight" size={ICON_SIZES.DEFAULT} color="#ffffff" />}
            iconPosition="right"
          />
        </div>
      </div>
      {submitError && (
        <div
          role="alert"
          className="mt-3"
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            borderRadius: "10px",
            padding: "10px 14px",
            fontSize: "0.85rem",
          }}
        >
          {submitError}
        </div>
      )}
    </form>
  );

  const renderCompletionScreen = () => (
    <div className="completion-screen-wrapper d-flex flex-column align-items-center h-100 w-100 py-1">
      <div className="d-flex flex-column align-items-center w-100 my-auto">
        <div className="completion-avatar-circle d-flex align-items-center justify-content-center mb-3">
          <Icon name="User" size={ICON_SIZES.HERO} color="#103CA4" stroke="#103CA4" strokeWidth={2.2} />
        </div>
        <h1 className="completion-main-title fw-bold text-center mb-3">
          Profile Setup Completed<br />Successfully !
        </h1>
        {/* 
          CARD COMPONENT: Completion Reward Banner Card
          - Variant: variant="base" (BaseCard)
          - Location: renderCompletionScreen() (Step 4 / Completed Screen)
          - Purpose: Notification banner displaying +20 Trust Points awarded for profile completion
        */}
        <Cards
          variant="base"
          radius="md"
          bg="#E9F0FF"
          className="completion-reward-banner text-start mb-4"
          style={{ backgroundColor: '#E9F0FF', background: '#E9F0FF', border: 'none', boxShadow: 'none' }}
        >
          <h3 className="reward-banner-title fw-bold mb-0">Profile Completed</h3>
          <p className="reward-banner-subtitle mb-0">You have earned +20 trust points!</p>
        </Cards>

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
                <Icon name="Lock" size={ICON_SIZES.XS} color="#9ca3af" />
              </div>
              <span className="completion-step-title text-muted mt-2">Identity Verified</span>
              <span className="completion-step-points text-muted">+40 Trust Points</span>
            </div>

            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle locked d-flex align-items-center justify-content-center bg-white">
                <Icon name="Lock" size={ICON_SIZES.XS} color="#9ca3af" />
              </div>
              <span className="completion-step-title text-muted mt-2">First Project/ Proposal</span>
              <span className="completion-step-points text-muted">+30 Trust Points</span>
            </div>
          </div>
        </div>

        <div className="completion-cta-wrapper d-flex justify-content-center mt-4">
          <PrimaryButton
            text="Continue to Verify Identity"
            onClick={() => navigate("/client-verification-hub")}
            className="completion-cta-btn border-0 text-white fw-bold d-inline-flex align-items-center justify-content-center px-5"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="dashboard-layout client-profile-page"
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      <Navbar items={clientNavItems} userRole="Client" />

      <main className="main-workspace d-flex flex-column h-100">
        <Header />

        <div className="profile-page-wrapper">
          {/* 
            CARD COMPONENT: Profile Main Card (Core Layout Container)
            - Variant: variant="base" (BaseCard)
            - Location: Main Workspace
            - Purpose: Main white elevated container enclosing the entire multi-step profile flow (Steps 1-3 & Completion Screen)
          */}
          <Cards variant="base" radius="md" className="profile-main-card" padding="0">
            <div className="profile-card-inner">
              <div className="back-btn-container w-100 d-flex justify-content-start mb-3">
                <button
                  type="button"
                  className="completion-back-btn"
                  onClick={() => {
                    if (isSubmitted) {
                      navigate("/client-whole-profile");
                    } else if (isEditMode) {
                      setIsEditMode(false);
                      goToStep(3);
                    } else if (currentStep > 1) {
                      goToStep(currentStep - 1);
                    } else {
                      navigate("/client-whole-profile");
                    }
                  }}
                  aria-label="Go back"
                >
                  <Icon name="ArrowLeft" size={ICON_SIZES['2XL']} color="#0b38a8" />
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
