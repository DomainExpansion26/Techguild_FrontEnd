import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout, Cards, PrimaryButton, SecondaryButton, TextInput, Stepper } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { profileApi } from "@/features/profile/api/profileApi";
import "./profile.css";

const stepSlugMap = {
  1: "basic-info",
  2: "professional",
  3: "skills",
  4: "portfolio",
  5: "review",
  6: "completed"
};

const slugStepMap = {
  "basic-info": 1,
  "professional": 2,
  "skills": 3,
  "portfolio": 4,
  "review": 5,
  "completed": 6
};

const initialFormData = {
  profilePhoto: null,
  profilePhotoName: "",
  fullName: "",
  country: "",
  timeZone: "",
  headline: "",
  bio: "",
  experience: "",
  availability: "",
  skills: "",
  tools: "",
  categories: "",
  portfolioUrl: "",
  githubUrl: "",
  linkedinUrl: "",
  resumeFile: null,
  resumeFileName: "",
};

const getInitialFormData = () => {
  const pendingUser = JSON.parse(localStorage.getItem("techguild_pending_user") || "{}");
  const authUser = JSON.parse(localStorage.getItem("techguild_user") || "{}");
  const defaultFullName = authUser?.name || pendingUser?.name || "";

  const data = { ...initialFormData, fullName: defaultFullName };
  Object.keys(data).forEach((key) => {
    const saved = sessionStorage.getItem(`ind_${key}`);
    if (saved !== null) data[key] = saved;
  });
  return data;
};

const clearDraftStorage = () => {
  Object.keys(sessionStorage)
    .filter((key) => key.startsWith("ind_") && key !== "ind_profile_submitted")
    .forEach((key) => sessionStorage.removeItem(key));
};

const COMPLETION_MILESTONES = [
  { id: 1, title: "Email Verified", points: 10, completed: true },
  { id: 2, title: "Profile Completed", points: 20, completed: true },
  { id: 3, title: "Identity Verified", points: 40, completed: false },
  { id: 4, title: "First Project/ Proposal", points: 30, completed: false },
];

export default function Profile() {
  const navigate = useNavigate();
  const { step } = useParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [isEditingFromReview, setIsEditingFromReview] = useState(false);
  const [snapshot, setSnapshot] = useState(null);

  const [formData, setFormData] = useState(getInitialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(() => sessionStorage.getItem("ind_profile_submitted") === "true");

  const cardInnerRef = useRef(null);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (typeof value === "string") {
      sessionStorage.setItem(`ind_${field}`, value);
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const resetFormState = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  useEffect(() => {
    if (cardInnerRef.current) {
      cardInnerRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [currentStep, step]);

  useEffect(() => {
    if (!step) {
      if (!isSubmitted) {
        clearDraftStorage();
        resetFormState();
        setCurrentStep(1);
      }
    } else if (step === "completed") {
      setIsSubmitted(true);
      setCurrentStep(6);
    } else if (slugStepMap[step]) {
      setIsSubmitted(false);
      setCurrentStep(slugStepMap[step]);
    }
  }, [step]);

  const handleBackTop = () => {
    if (isEditingFromReview) {
      setIsEditingFromReview(false);
      goToStep(5);
    } else if (currentStep > 1 && currentStep <= 5) {
      goToStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const goToStep = (stepNum) => {
    const slug = stepSlugMap[stepNum] || "basic-info";
    navigate(`/profile/${slug}`);
  };

  const steps = [
    { number: 1, label: "Basic Information", active: currentStep === 1 },
    { number: 2, label: "Professional Information", active: currentStep === 2 },
    { number: 3, label: "Skills", active: currentStep === 3 },
    { number: 4, label: "Portfolio and links", active: currentStep === 4 },
    { number: 5, label: "Review and Submit", active: currentStep === 5 },
  ];

  const formatFileName = (name, maxWords = 3) => {
    if (!name) return "";
    const cleanName = name.trim();
    const words = cleanName.split(/\s+/);
    if (words.length > maxWords) {
      return `${words.slice(0, maxWords).join(" ")}...`;
    }
    return cleanName;
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        profilePhoto: file,
        profilePhotoName: file.name,
      }));
      sessionStorage.setItem("ind_profilePhotoName", file.name);
      setErrors((prev) => ({ ...prev, photo: "" }));
    }
  };

  const handleResumeUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        resumeFile: file,
        resumeFileName: file.name,
      }));
      sessionStorage.setItem("ind_resumeFileName", file.name);
      setErrors((prev) => ({ ...prev, resumeFile: "" }));
    }
  };

  const isStep1Complete = (formData.profilePhoto !== null || formData.profilePhotoName !== "") && formData.fullName.trim() !== "" && formData.country !== "" && formData.timeZone !== "";
  const isStep2Complete = formData.headline.trim() !== "" && formData.bio.trim() !== "" && formData.experience !== "" && formData.availability !== "";
  const isStep3Complete = formData.skills.trim() !== "" && formData.tools.trim() !== "" && formData.categories.trim() !== "";
  const isStep4Complete = formData.portfolioUrl.trim() !== "" || formData.githubUrl.trim() !== "" || formData.linkedinUrl.trim() !== "" || formData.resumeFile !== null || formData.resumeFileName !== "";

  const handleCancel = () => {
    if (snapshot) {
      setFormData(snapshot);
      Object.keys(snapshot).forEach((key) => {
        if (typeof snapshot[key] === "string") {
          sessionStorage.setItem(`ind_${key}`, snapshot[key]);
        }
      });
    }
    setErrors({});
    setIsEditingFromReview(false);
    goToStep(5);
  };

  const handleStep1Continue = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.profilePhoto && !formData.profilePhotoName) newErrors.photo = "Profile picture is required";
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.timeZone) newErrors.timeZone = "Time zone is required";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    if (isEditingFromReview) { setIsEditingFromReview(false); goToStep(5); } else { goToStep(2); }
  };

  const handleStep2Continue = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.headline.trim()) newErrors.headline = "Headline is required";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";
    if (!formData.experience) newErrors.experience = "Experience level is required";
    if (!formData.availability) newErrors.availability = "Availability is required";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    if (isEditingFromReview) { setIsEditingFromReview(false); goToStep(5); } else { goToStep(3); }
  };

  const handleStep3Continue = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.skills.trim()) newErrors.skills = "Skills are required";
    if (!formData.tools.trim()) newErrors.tools = "Tools are required";
    if (!formData.categories.trim()) newErrors.categories = "Categories are required";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    if (isEditingFromReview) { setIsEditingFromReview(false); goToStep(5); } else { goToStep(4); }
  };

  const handleStep4Continue = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.portfolioUrl.trim()) newErrors.portfolioUrl = "Portfolio URL is required";
    if (!formData.githubUrl.trim()) newErrors.githubUrl = "Github URL is required";
    if (!formData.linkedinUrl.trim()) newErrors.linkedinUrl = "Linkedin URL is required";
    if (!formData.resumeFile && !formData.resumeFileName) newErrors.resumeFile = "Resume PDF is required";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    if (isEditingFromReview) { setIsEditingFromReview(false); goToStep(5); } else { goToStep(5); }
  };

  const goToEditStep = (stepNum) => {
    setSnapshot({ ...formData });
    setIsEditingFromReview(true);
    goToStep(stepNum);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      // 1. Upload avatar if selected
      if (formData.profilePhoto instanceof File) {
        await profileApi.uploadAvatar(formData.profilePhoto);
      }
      // 2. Upload resume if selected
      if (formData.resumeFile instanceof File) {
        await profileApi.uploadResume(formData.resumeFile);
      }
      // 3. Save profile data
      await profileApi.saveIndividualProfile({
        full_name: formData.fullName,
        country: formData.country,
        time_zone: formData.timeZone,
        headline: formData.headline,
        bio: formData.bio,
        experience_level: formData.experience,
        availability: formData.availability,
        skills: formData.skills ? formData.skills.split(",").map(s => s.trim()) : [],
        tools: formData.tools ? formData.tools.split(",").map(t => t.trim()) : [],
        categories: formData.categories ? formData.categories.split(",").map(c => c.trim()) : [],
        portfolio_url: formData.portfolioUrl,
        github_url: formData.githubUrl,
        linkedin_url: formData.linkedinUrl,
      });
      sessionStorage.setItem("ind_profile_submitted", "true");
      setIsSubmitted(true);
      goToStep(6);
    } catch (err) {
      console.error("Failed to save profile:", err);
      // Still allow completed navigation if backend is offline or mock
      sessionStorage.setItem("ind_profile_submitted", "true");
      setIsSubmitted(true);
      goToStep(6);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderActionButtons = (isComplete) => (
    <div className="profile-form-actions d-flex justify-content-end flex-shrink-0 gap-3">
      {isEditingFromReview ? (
        <>
          <div className="profile-btn-wrapper">
            <SecondaryButton
              type="button"
              onClick={handleCancel}
              text="Cancel"
            />
          </div>
          <div className="profile-btn-wrapper">
            <PrimaryButton
              type="submit"
              disabled={!isComplete}
              text="Save Changes"
            />
          </div>
        </>
      ) : (
        <div className="profile-btn-wrapper">
          <PrimaryButton
            type="submit"
            disabled={!isComplete}
            text="Continue"
            icon={<Icon name="ArrowRight" size={18} color="#ffffff" />}
            iconPosition="right"
          />
        </div>
      )}
    </div>
  );

  const renderStep1 = () => (
    <form className="profile-step-form flex-grow-1 d-flex flex-column min-vh-0 h-100" onSubmit={handleStep1Continue}>
      <div className="profile-section-heading flex-shrink-0">
        <h2 className="section-title fw-bold">Basic Information</h2>
        <p className="section-subtitle text-secondary">Add your basic details.</p>
      </div>

      <div className="profile-field-group">
        <label className="field-label">Profile picture</label>
        <div className="upload-btn-wrapper d-flex align-items-center gap-3">
          <label htmlFor="profile-photo-input" className="upload-photo-btn d-inline-flex align-items-center justify-content-center text-white gap-2" style={{ cursor: "pointer" }}>
            <span>{formData.profilePhoto ? formatFileName(formData.profilePhoto.name) : (formatFileName(formData.profilePhotoName) || "Upload photo")}</span>
            <Icon name={formData.profilePhoto || formData.profilePhotoName ? "Check" : "Upload"} size={16} color="#ffffff" />
          </label>
          <input id="profile-photo-input" type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />
        </div>
        {errors.photo && <span className="field-error">{errors.photo}</span>}
      </div>

      <TextInput
        label="Full name"
        placeholder="Enter your full name"
        value={formData.fullName}
        error={errors.fullName}
        onChange={(e) => updateField("fullName", e.target.value)}
      />

      <div className="profile-field-group">
        <div className="custom-dropdown-container w-100">
          <label className="field-label">Country</label>
          <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${errors.country ? "dropdown-error" : ""}`}>
            <select
              className="custom-dropdown-select w-100 h-100"
              value={formData.country}
              onChange={(e) => updateField("country", e.target.value)}
            >
              <option value="" disabled hidden>Select your country</option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
            </select>
            <Icon name="ChevronDown" size={18} className="dropdown-chevron-icon position-absolute" />
          </div>
          {errors.country && <span className="field-error">{errors.country}</span>}
        </div>
      </div>

      <div className="profile-field-group">
        <div className="custom-dropdown-container w-100">
          <label className="field-label">Time Zone</label>
          <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${errors.timeZone ? "dropdown-error" : ""}`}>
            <select
              className="custom-dropdown-select w-100 h-100"
              value={formData.timeZone}
              onChange={(e) => updateField("timeZone", e.target.value)}
            >
              <option value="" disabled hidden>Select your time zone</option>
              <option value="(UTC+05:30) India Standard Time">(UTC+05:30) India Standard Time</option>
              <option value="(UTC-05:00) Eastern Time (US & Canada)">(UTC-05:00) Eastern Time (US & Canada)</option>
              <option value="(UTC-08:00) Pacific Time (US & Canada)">(UTC-08:00) Pacific Time (US & Canada)</option>
              <option value="(UTC+00:00) Greenwich Mean Time">(UTC+00:00) Greenwich Mean Time</option>
              <option value="(UTC+01:00) Central European Time">(UTC+01:00) Central European Time</option>
              <option value="(UTC+09:00) Japan Standard Time">(UTC+09:00) Japan Standard Time</option>
            </select>
            <Icon name="ChevronDown" size={18} className="dropdown-chevron-icon position-absolute" />
          </div>
          {errors.timeZone && <span className="field-error">{errors.timeZone}</span>}
        </div>
      </div>

      {renderActionButtons(isStep1Complete)}
    </form>
  );

  const renderStep2 = () => (
    <form className="profile-step-form flex-grow-1 d-flex flex-column min-vh-0 h-100" onSubmit={handleStep2Continue}>
      <div className="profile-section-heading flex-shrink-0">
        <h2 className="section-title fw-bold">Professional Information</h2>
        <p className="section-subtitle text-secondary">Tell us about your professional background</p>
      </div>

      <TextInput
        label="Headline"
        placeholder="e.g. UI/UX Designer"
        value={formData.headline}
        error={errors.headline}
        onChange={(e) => updateField("headline", e.target.value)}
      />

      <div className="profile-field-group">
        <label className="field-label">Bio</label>
        <div className={`bio-textarea-wrapper w-100 ${errors.bio ? "input-error" : ""}`}>
          <textarea
            className="bio-textarea"
            placeholder="Write a short bio about yourself"
            maxLength={300}
            value={formData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
          />
          <span className="bio-char-count">{formData.bio.length}/300</span>
        </div>
        {errors.bio && <span className="field-error">{errors.bio}</span>}
      </div>

      <div className="profile-field-group">
        <div className="custom-dropdown-container w-100">
          <label className="field-label">Experience Level</label>
          <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${errors.experience ? "dropdown-error" : ""}`}>
            <select
              className="custom-dropdown-select w-100 h-100"
              value={formData.experience}
              onChange={(e) => updateField("experience", e.target.value)}
            >
              <option value="" disabled hidden>Select experience level</option>
              <option value="entry">Entry Level (0-2 years)</option>
              <option value="mid">Mid Level (3-5 years)</option>
              <option value="senior">Senior (5-8 years)</option>
              <option value="expert">Expert (8+ years)</option>
            </select>
            <Icon name="ChevronDown" size={18} className="dropdown-chevron-icon position-absolute" />
          </div>
          {errors.experience && <span className="field-error">{errors.experience}</span>}
        </div>
      </div>

      <div className="profile-field-group">
        <div className="custom-dropdown-container w-100">
          <label className="field-label">Availability</label>
          <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${errors.availability ? "dropdown-error" : ""}`}>
            <select
              className="custom-dropdown-select w-100 h-100"
              value={formData.availability}
              onChange={(e) => updateField("availability", e.target.value)}
            >
              <option value="" disabled hidden>Select availability</option>
              <option value="full-time">Full-time (40 hrs/week)</option>
              <option value="part-time">Part-time (20 hrs/week)</option>
              <option value="hourly">Hourly / As needed</option>
              <option value="weekends">Weekends only</option>
            </select>
            <Icon name="ChevronDown" size={18} className="dropdown-chevron-icon position-absolute" />
          </div>
          {errors.availability && <span className="field-error">{errors.availability}</span>}
        </div>
      </div>

      {renderActionButtons(isStep2Complete)}
    </form>
  );

  const renderStep3 = () => (
    <form className="profile-step-form flex-grow-1 d-flex flex-column min-vh-0 h-100" onSubmit={handleStep3Continue}>
      <div className="profile-section-heading flex-shrink-0">
        <h2 className="section-title fw-bold">Skills</h2>
        <p className="section-subtitle text-secondary">Add your skills and expertise</p>
      </div>

      <TextInput
        label="Skills"
        placeholder="Add skills"
        value={formData.skills}
        error={errors.skills}
        onChange={(e) => updateField("skills", e.target.value)}
      />

      <TextInput
        label="Tools"
        placeholder="Add tools"
        value={formData.tools}
        error={errors.tools}
        onChange={(e) => updateField("tools", e.target.value)}
      />

      <TextInput
        label="Categories"
        placeholder="Add categories"
        value={formData.categories}
        error={errors.categories}
        onChange={(e) => updateField("categories", e.target.value)}
      />

      {renderActionButtons(isStep3Complete)}
    </form>
  );

  const renderStep4 = () => (
    <form className="profile-step-form flex-grow-1 d-flex flex-column min-vh-0 h-100" onSubmit={handleStep4Continue}>
      <div className="profile-section-heading flex-shrink-0">
        <h2 className="section-title fw-bold">Portfolio and links</h2>
        <p className="section-subtitle text-secondary">Add your portfolio and social links</p>
      </div>

      <TextInput
        label="Portfolio website"
        type="url"
        placeholder="Enter URL"
        value={formData.portfolioUrl}
        error={errors.portfolioUrl}
        onChange={(e) => updateField("portfolioUrl", e.target.value)}
      />

      <TextInput
        label="Github"
        type="url"
        placeholder="Enter URL"
        value={formData.githubUrl}
        error={errors.githubUrl}
        onChange={(e) => updateField("githubUrl", e.target.value)}
      />

      <TextInput
        label="Linkedin"
        type="url"
        placeholder="Enter URL"
        value={formData.linkedinUrl}
        error={errors.linkedinUrl}
        onChange={(e) => updateField("linkedinUrl", e.target.value)}
      />

      <div className="profile-field-group">
        <label className="field-label">Resume</label>
        <label
          htmlFor="resume-file-input"
          className={`profile-file-upload-box d-flex align-items-center justify-content-between w-100 ${errors.resumeFile ? "input-error" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <span className={`file-upload-text ${(formData.resumeFile || formData.resumeFileName) ? "text-dark" : "text-placeholder"}`}>
            {formData.resumeFile ? formData.resumeFile.name : (formData.resumeFileName || "Upload PDF")}
          </span>
          <Icon name="Upload" size={18} className="upload-icon-right" />
        </label>
        <input
          id="resume-file-input"
          type="file"
          accept=".pdf,application/pdf"
          style={{ display: "none" }}
          onChange={handleResumeUpload}
        />
        {errors.resumeFile && <span className="field-error">{errors.resumeFile}</span>}
      </div>

      {renderActionButtons(isStep4Complete)}
    </form>
  );

  const renderStep5 = () => (
    <form className="profile-step-form flex-grow-1 d-flex flex-column min-vh-0" onSubmit={handleFinalSubmit}>
      <div className="profile-section-heading flex-shrink-0 mb-4">
        <h2 className="section-title fw-bold">Review & Submit</h2>
        <p className="section-subtitle text-secondary">Review your information before continuing</p>
      </div>

      <div className="review-summary-card d-flex align-items-center justify-content-between w-100">
        <span className="review-summary-title fw-bold">Basic Information</span>
        <span className="review-edit-btn fw-bold" onClick={() => goToEditStep(1)} role="button">Edit</span>
      </div>

      <div className="review-summary-card d-flex align-items-center justify-content-between w-100">
        <span className="review-summary-title fw-bold">Professional Information</span>
        <span className="review-edit-btn fw-bold" onClick={() => goToEditStep(2)} role="button">Edit</span>
      </div>

      <div className="review-summary-card d-flex align-items-center justify-content-between w-100">
        <span className="review-summary-title fw-bold">Skills</span>
        <span className="review-edit-btn fw-bold" onClick={() => goToEditStep(3)} role="button">Edit</span>
      </div>

      <div className="review-summary-card d-flex align-items-center justify-content-between w-100">
        <span className="review-summary-title fw-bold">Portfolio and links</span>
        <span className="review-edit-btn fw-bold" onClick={() => goToEditStep(4)} role="button">Edit</span>
      </div>

      <div className="profile-form-actions d-flex justify-content-end flex-shrink-0">
        <div className="profile-btn-wrapper">
          <PrimaryButton
            type="submit"
            text="Submit"
          />
        </div>
      </div>
    </form>
  );

  const renderCompletionScreen = () => {
    const completedIndex = COMPLETION_MILESTONES.findLastIndex((m) => m.completed);
    const progressWidth = `${(completedIndex / (COMPLETION_MILESTONES.length - 1)) * 100}%`;

    return (
      <div className="completion-screen-wrapper d-flex flex-column align-items-center h-100 w-100 py-1">
        <div className="w-100 d-flex justify-content-start flex-shrink-0 mb-1">
          <button
            type="button"
            className="completion-back-btn"
            onClick={() => navigate("/whole-profile")}
            aria-label="Go back"
          >
            <Icon name="ArrowLeft" size={24} color="#103CA4" />
          </button>
        </div>

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

          <div className="completion-stepper-container position-relative w-100 mb-4">
            <div className="completion-stepper position-relative d-flex align-items-start justify-content-between w-100">
              <div className="completion-track-line position-absolute">
                <div className="completion-active-line" style={{ width: progressWidth }}></div>
              </div>

              {COMPLETION_MILESTONES.map((item) => (
                <div key={item.id} className="completion-step-item d-flex flex-column align-items-center">
                  <div className={`completion-circle ${item.completed ? "active" : "locked"} d-flex align-items-center justify-content-center`}>
                    {item.completed ? <span className="dot-white"></span> : <Icon name="Lock" size={16} color="#9ca3af" />}
                  </div>
                  <span className={`completion-step-title mt-2 ${item.completed ? "fw-bold text-dark" : "text-muted"}`}>
                    {item.title}
                  </span>
                  <span className={`completion-step-points ${item.completed ? "fw-bold text-primary" : "text-muted"}`}>
                    +{item.points} Trust Points
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="completion-cta-wrapper d-flex justify-content-center mt-2">
            <button
              type="button"
              className="completion-cta-btn border-0 text-white fw-bold d-inline-flex align-items-center justify-content-center"
              onClick={() => navigate("/verification")}
            >
              Continue to Verify Identity
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="profile-page-wrapper flex-grow-1 min-vh-0 d-flex flex-column w-100">
        <Cards className="profile-main-card flex-grow-1 h-100 d-flex flex-column overflow-hidden w-100" padding="0">
          <div ref={cardInnerRef} className="profile-card-inner d-flex flex-column h-100">
            {isSubmitted ? (
              renderCompletionScreen()
            ) : (
              <>
                <div className="profile-top-back-wrapper flex-shrink-0 w-100 d-flex justify-content-start">
                  <button
                    type="button"
                    className="profile-top-back-btn"
                    onClick={handleBackTop}
                    aria-label="Go back"
                  >
                    <Icon name="ArrowLeft" size={24} color="#0b38a8" />
                  </button>
                </div>
                <div className="profile-header-section flex-shrink-0">
                  <h1 className="profile-main-title fw-bold">Complete Your Profile</h1>
                  <p className="profile-main-subtitle text-secondary">Lets build your profile step by step.</p>
                </div>
                <Stepper steps={steps} currentStep={currentStep} className="profile-stepper-container" />
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
                {currentStep === 5 && renderStep5()}
              </>
            )}
          </div>
        </Cards>
      </div>
    </DashboardLayout>
  );
}

