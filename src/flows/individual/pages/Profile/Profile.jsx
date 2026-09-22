// [TechGuild Update: 21-09-2026] Individual freelancer profile wizard & OpenAPI save integration
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout, Cards, PrimaryButton, SecondaryButton, TextInput, Stepper } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { profileApi } from "@/features/profile/api/profileApi";
import {
  APP_STRINGS,
  COUNTRY_OPTIONS,
  TIME_ZONE_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  AVAILABILITY_OPTIONS,
  PROFILE_COMPLETION_MILESTONES,
  FORM_ERRORS,
} from "@/constants/string";
import { ICON_SIZES, FORM_SIZES } from "@/constants/sizes";
import "./profile.css";

const WIZARD_STRINGS = APP_STRINGS.PROFILE.WIZARD;
const ERRORS = FORM_ERRORS.PROFILE;

const stepSlugMap = {
  1: "basic-info",
  2: "professional",
  3: "skills",
  4: "portfolio",
  5: "review",
  6: "completed",
};

const slugStepMap = {
  "basic-info": 1,
  "professional": 2,
  "skills": 3,
  "portfolio": 4,
  "review": 5,
  "completed": 6,
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

export default function Profile() {
  const navigate = useNavigate();
  const { step } = useParams();

  // Derive current step and submission status directly from URL params
  const currentStep = slugStepMap[step] || (sessionStorage.getItem("ind_profile_submitted") === "true" ? 6 : 1);
  const isSubmitted = step === "completed" || currentStep === 6;

  const [isEditingFromReview, setIsEditingFromReview] = useState(false);
  const [snapshot, setSnapshot] = useState(null);

  const [formData, setFormData] = useState(getInitialFormData);
  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    if (cardInnerRef.current) {
      cardInnerRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
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
    { number: 1, label: WIZARD_STRINGS.STEPS.STEP_1_LABEL, active: currentStep === 1 },
    { number: 2, label: WIZARD_STRINGS.STEPS.STEP_2_LABEL, active: currentStep === 2 },
    { number: 3, label: WIZARD_STRINGS.STEPS.STEP_3_LABEL, active: currentStep === 3 },
    { number: 4, label: WIZARD_STRINGS.STEPS.STEP_4_LABEL, active: currentStep === 4 },
    { number: 5, label: WIZARD_STRINGS.STEPS.STEP_5_LABEL, active: currentStep === 5 },
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

  const isStep1Complete =
    (formData.profilePhoto !== null || formData.profilePhotoName !== "") &&
    formData.fullName.trim() !== "" &&
    formData.country !== "" &&
    formData.timeZone !== "";
  const isStep2Complete =
    formData.headline.trim() !== "" &&
    formData.bio.trim() !== "" &&
    formData.experience !== "" &&
    formData.availability !== "";
  const isStep3Complete =
    formData.skills.trim() !== "" &&
    formData.tools.trim() !== "" &&
    formData.categories.trim() !== "";
  const isStep4Complete =
    formData.portfolioUrl.trim() !== "" ||
    formData.githubUrl.trim() !== "" ||
    formData.linkedinUrl.trim() !== "" ||
    formData.resumeFile !== null ||
    formData.resumeFileName !== "";

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
    if (!formData.profilePhoto && !formData.profilePhotoName) newErrors.photo = ERRORS.PHOTO_REQUIRED;
    if (!formData.fullName.trim()) newErrors.fullName = ERRORS.FULL_NAME_REQUIRED;
    if (!formData.country) newErrors.country = ERRORS.COUNTRY_REQUIRED;
    if (!formData.timeZone) newErrors.timeZone = ERRORS.TIME_ZONE_REQUIRED;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    if (isEditingFromReview) {
      setIsEditingFromReview(false);
      goToStep(5);
    } else {
      goToStep(2);
    }
  };

  const handleStep2Continue = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.headline.trim()) newErrors.headline = ERRORS.HEADLINE_REQUIRED;
    if (!formData.bio.trim()) newErrors.bio = ERRORS.BIO_REQUIRED;
    if (!formData.experience) newErrors.experience = ERRORS.EXPERIENCE_REQUIRED;
    if (!formData.availability) newErrors.availability = ERRORS.AVAILABILITY_REQUIRED;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    if (isEditingFromReview) {
      setIsEditingFromReview(false);
      goToStep(5);
    } else {
      goToStep(3);
    }
  };

  const handleStep3Continue = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.skills.trim()) newErrors.skills = ERRORS.SKILLS_REQUIRED;
    if (!formData.tools.trim()) newErrors.tools = ERRORS.TOOLS_REQUIRED;
    if (!formData.categories.trim()) newErrors.categories = ERRORS.CATEGORIES_REQUIRED;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    if (isEditingFromReview) {
      setIsEditingFromReview(false);
      goToStep(5);
    } else {
      goToStep(4);
    }
  };

  const handleStep4Continue = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.portfolioUrl.trim()) newErrors.portfolioUrl = ERRORS.PORTFOLIO_REQUIRED;
    if (!formData.githubUrl.trim()) newErrors.githubUrl = ERRORS.GITHUB_REQUIRED;
    if (!formData.linkedinUrl.trim()) newErrors.linkedinUrl = ERRORS.LINKEDIN_REQUIRED;
    if (!formData.resumeFile && !formData.resumeFileName) newErrors.resumeFile = ERRORS.RESUME_REQUIRED;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    if (isEditingFromReview) {
      setIsEditingFromReview(false);
      goToStep(5);
    } else {
      goToStep(5);
    }
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
      // 1. Upload avatar if selected -> capture avatar_url (UploadAvatarResponse)
      let avatarUrl = null;
      if (formData.profilePhoto instanceof File) {
        const avatarRes = await profileApi.uploadAvatar(formData.profilePhoto);
        avatarUrl = avatarRes?.avatar_url || null;
      }
      // 2. Upload resume if selected -> capture resume_url (UploadResumeResponse)
      let resumeUrl = null;
      if (formData.resumeFile instanceof File) {
        const resumeRes = await profileApi.uploadResume(formData.resumeFile);
        resumeUrl = resumeRes?.resume_url || null;
      }
      // 3. Save profile data (strict CreateIndividualProfileRequest body is
      //    built inside saveIndividualProfile: only documented keys are sent)
      await profileApi.saveIndividualProfile({
        avatar_url: avatarUrl,
        bio: formData.bio,
        country: formData.country,
        city: null,
        headline: formData.headline,
        timezone: formData.timeZone,
        experience_level: formData.experience,
        availability: formData.availability,
        skills: formData.skills ? formData.skills.split(",").map((s) => s.trim()) : [],
        tools_technologies: formData.tools ? formData.tools.split(",").map((t) => t.trim()) : [],
        service_categories: formData.categories ? formData.categories.split(",").map((c) => c.trim()) : [],
        portfolio_url: formData.portfolioUrl,
        github_url: formData.githubUrl,
        linkedin_url: formData.linkedinUrl,
        resume_url: resumeUrl,
      });
      sessionStorage.setItem("ind_profile_submitted", "true");
      goToStep(6);
    } catch (err) {
      console.error("Failed to save profile:", err);
      setSubmitError(err?.message || "Failed to save profile. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderActionButtons = (isComplete) => (
    <div className="profile-form-actions d-flex justify-content-end shrink-0 gap-3">
      {isEditingFromReview ? (
        <>
          <div className="profile-btn-wrapper">
            <SecondaryButton
              type="button"
              onClick={handleCancel}
              text={WIZARD_STRINGS.BUTTONS.CANCEL}
            />
          </div>
          <div className="profile-btn-wrapper">
            <PrimaryButton
              type="submit"
              disabled={!isComplete}
              text={WIZARD_STRINGS.BUTTONS.SAVE_CHANGES}
            />
          </div>
        </>
      ) : (
        <div className="profile-btn-wrapper">
          <PrimaryButton
            type="submit"
            disabled={!isComplete}
            text={WIZARD_STRINGS.BUTTONS.CONTINUE}
            icon={<Icon name="ArrowRight" size={ICON_SIZES.DEFAULT} color="#ffffff" />}
            iconPosition="right"
          />
        </div>
      )}
    </div>
  );

  const renderStep1 = () => (
    <form className="profile-step-form grow d-flex flex-column min-vh-0 h-100" onSubmit={handleStep1Continue}>
      <div className="profile-section-heading shrink-0">
        <h2 className="section-title fw-bold">{WIZARD_STRINGS.STEPS.STEP_1_TITLE}</h2>
        <p className="section-subtitle text-secondary">{WIZARD_STRINGS.STEPS.STEP_1_SUBTITLE}</p>
      </div>

      <div className="profile-field-group">
        <label className="field-label">{WIZARD_STRINGS.LABELS.PROFILE_PICTURE}</label>
        <div className="upload-btn-wrapper d-flex align-items-center gap-3">
          <label
            htmlFor="profile-photo-input"
            className="upload-photo-btn d-inline-flex align-items-center justify-content-center text-white gap-2"
            style={{ cursor: "pointer" }}
          >
            <span>
              {formData.profilePhoto
                ? formatFileName(formData.profilePhoto.name)
                : formatFileName(formData.profilePhotoName) || WIZARD_STRINGS.PLACEHOLDERS.UPLOAD_PHOTO}
            </span>
            <Icon
              name={formData.profilePhoto || formData.profilePhotoName ? "Check" : "Upload"}
              size={ICON_SIZES.MD}
              color="#ffffff"
            />
          </label>
          <input
            id="profile-photo-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoUpload}
          />
        </div>
        {errors.photo && <span className="field-error">{errors.photo}</span>}
      </div>

      <TextInput
        label={WIZARD_STRINGS.LABELS.FULL_NAME}
        placeholder={WIZARD_STRINGS.PLACEHOLDERS.FULL_NAME}
        value={formData.fullName}
        error={errors.fullName}
        onChange={(e) => updateField("fullName", e.target.value)}
      />

      <div className="profile-field-group">
        <div className="custom-dropdown-container w-100">
          <label className="field-label">{WIZARD_STRINGS.LABELS.COUNTRY}</label>
          <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${errors.country ? "dropdown-error" : ""}`}>
            <select
              className="custom-dropdown-select w-100 h-100"
              value={formData.country}
              onChange={(e) => updateField("country", e.target.value)}
            >
              <option value="" disabled hidden>{WIZARD_STRINGS.PLACEHOLDERS.SELECT_COUNTRY}</option>
              {COUNTRY_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {errors.country && <span className="field-error">{errors.country}</span>}
        </div>
      </div>

      <div className="profile-field-group">
        <div className="custom-dropdown-container w-100">
          <label className="field-label">{WIZARD_STRINGS.LABELS.TIME_ZONE}</label>
          <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${errors.timeZone ? "dropdown-error" : ""}`}>
            <select
              className="custom-dropdown-select w-100 h-100"
              value={formData.timeZone}
              onChange={(e) => updateField("timeZone", e.target.value)}
            >
              <option value="" disabled hidden>{WIZARD_STRINGS.PLACEHOLDERS.SELECT_TIME_ZONE}</option>
              {TIME_ZONE_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {errors.timeZone && <span className="field-error">{errors.timeZone}</span>}
        </div>
      </div>

      {renderActionButtons(isStep1Complete)}
    </form>
  );

  const renderStep2 = () => (
    <form className="profile-step-form grow d-flex flex-column min-vh-0 h-100" onSubmit={handleStep2Continue}>
      <div className="profile-section-heading shrink-0">
        <h2 className="section-title fw-bold">{WIZARD_STRINGS.STEPS.STEP_2_TITLE}</h2>
        <p className="section-subtitle text-secondary">{WIZARD_STRINGS.STEPS.STEP_2_SUBTITLE}</p>
      </div>

      <TextInput
        label={WIZARD_STRINGS.LABELS.HEADLINE}
        placeholder={WIZARD_STRINGS.PLACEHOLDERS.HEADLINE}
        value={formData.headline}
        error={errors.headline}
        onChange={(e) => updateField("headline", e.target.value)}
      />

      <div className="profile-field-group">
        <label className="field-label">{WIZARD_STRINGS.LABELS.BIO}</label>
        <div className={`bio-textarea-wrapper w-100 ${errors.bio ? "input-error" : ""}`}>
          <textarea
            className="bio-textarea"
            placeholder={WIZARD_STRINGS.PLACEHOLDERS.BIO}
            maxLength={FORM_SIZES.MAX_BIO_LENGTH}
            value={formData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
          />
          <span className="bio-char-count">{formData.bio.length}/{FORM_SIZES.MAX_BIO_LENGTH}</span>
        </div>
        {errors.bio && <span className="field-error">{errors.bio}</span>}
      </div>

      <div className="profile-field-group">
        <div className="custom-dropdown-container w-100">
          <label className="field-label">{WIZARD_STRINGS.LABELS.EXPERIENCE_LEVEL}</label>
          <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${errors.experience ? "dropdown-error" : ""}`}>
            <select
              className="custom-dropdown-select w-100 h-100"
              value={formData.experience}
              onChange={(e) => updateField("experience", e.target.value)}
            >
              <option value="" disabled hidden>{WIZARD_STRINGS.PLACEHOLDERS.SELECT_EXPERIENCE}</option>
              {EXPERIENCE_LEVEL_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {errors.experience && <span className="field-error">{errors.experience}</span>}
        </div>
      </div>

      <div className="profile-field-group">
        <div className="custom-dropdown-container w-100">
          <label className="field-label">{WIZARD_STRINGS.LABELS.AVAILABILITY}</label>
          <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${errors.availability ? "dropdown-error" : ""}`}>
            <select
              className="custom-dropdown-select w-100 h-100"
              value={formData.availability}
              onChange={(e) => updateField("availability", e.target.value)}
            >
              <option value="" disabled hidden>{WIZARD_STRINGS.PLACEHOLDERS.SELECT_AVAILABILITY}</option>
              {AVAILABILITY_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {errors.availability && <span className="field-error">{errors.availability}</span>}
        </div>
      </div>

      {renderActionButtons(isStep2Complete)}
    </form>
  );

  const renderStep3 = () => (
    <form className="profile-step-form grow d-flex flex-column min-vh-0 h-100" onSubmit={handleStep3Continue}>
      <div className="profile-section-heading shrink-0">
        <h2 className="section-title fw-bold">{WIZARD_STRINGS.STEPS.STEP_3_TITLE}</h2>
        <p className="section-subtitle text-secondary">{WIZARD_STRINGS.STEPS.STEP_3_SUBTITLE}</p>
      </div>

      <TextInput
        label={WIZARD_STRINGS.LABELS.SKILLS}
        placeholder={WIZARD_STRINGS.PLACEHOLDERS.SKILLS}
        value={formData.skills}
        error={errors.skills}
        onChange={(e) => updateField("skills", e.target.value)}
      />

      <TextInput
        label={WIZARD_STRINGS.LABELS.TOOLS}
        placeholder={WIZARD_STRINGS.PLACEHOLDERS.TOOLS}
        value={formData.tools}
        error={errors.tools}
        onChange={(e) => updateField("tools", e.target.value)}
      />

      <TextInput
        label={WIZARD_STRINGS.LABELS.CATEGORIES}
        placeholder={WIZARD_STRINGS.PLACEHOLDERS.CATEGORIES}
        value={formData.categories}
        error={errors.categories}
        onChange={(e) => updateField("categories", e.target.value)}
      />

      {renderActionButtons(isStep3Complete)}
    </form>
  );

  const renderStep4 = () => (
    <form className="profile-step-form grow d-flex flex-column min-vh-0 h-100" onSubmit={handleStep4Continue}>
      <div className="profile-section-heading shrink-0">
        <h2 className="section-title fw-bold">{WIZARD_STRINGS.STEPS.STEP_4_TITLE}</h2>
        <p className="section-subtitle text-secondary">{WIZARD_STRINGS.STEPS.STEP_4_SUBTITLE}</p>
      </div>

      <TextInput
        label={WIZARD_STRINGS.LABELS.PORTFOLIO_WEBSITE}
        type="url"
        placeholder={WIZARD_STRINGS.PLACEHOLDERS.ENTER_URL}
        value={formData.portfolioUrl}
        error={errors.portfolioUrl}
        onChange={(e) => updateField("portfolioUrl", e.target.value)}
      />

      <TextInput
        label={WIZARD_STRINGS.LABELS.GITHUB}
        type="url"
        placeholder={WIZARD_STRINGS.PLACEHOLDERS.ENTER_URL}
        value={formData.githubUrl}
        error={errors.githubUrl}
        onChange={(e) => updateField("githubUrl", e.target.value)}
      />

      <TextInput
        label={WIZARD_STRINGS.LABELS.LINKEDIN}
        type="url"
        placeholder={WIZARD_STRINGS.PLACEHOLDERS.ENTER_URL}
        value={formData.linkedinUrl}
        error={errors.linkedinUrl}
        onChange={(e) => updateField("linkedinUrl", e.target.value)}
      />

      <div className="profile-field-group">
        <label className="field-label">{WIZARD_STRINGS.LABELS.RESUME}</label>
        <label
          htmlFor="resume-file-input"
          className={`profile-file-upload-box d-flex align-items-center justify-content-between w-100 ${errors.resumeFile ? "input-error" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <span className={`file-upload-text ${(formData.resumeFile || formData.resumeFileName) ? "text-dark" : "text-placeholder"}`}>
            {formData.resumeFile
              ? formData.resumeFile.name
              : formData.resumeFileName || WIZARD_STRINGS.PLACEHOLDERS.UPLOAD_PDF}
          </span>
          <Icon name="Upload" size={ICON_SIZES.DEFAULT} className="upload-icon-right" />
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
    <form className="profile-step-form grow d-flex flex-column min-vh-0" onSubmit={handleFinalSubmit}>
      <div className="profile-section-heading shrink-0 mb-4">
        <h2 className="section-title fw-bold">{WIZARD_STRINGS.STEPS.STEP_5_TITLE}</h2>
        <p className="section-subtitle text-secondary">{WIZARD_STRINGS.STEPS.STEP_5_SUBTITLE}</p>
      </div>

      <Cards variant="base" radius="md" className="review-summary-card d-flex align-items-center justify-content-between w-100 mb-3">
        <span className="review-summary-title fw-bold">{WIZARD_STRINGS.STEPS.STEP_1_LABEL}</span>
        <span className="review-edit-btn fw-bold" onClick={() => goToEditStep(1)} role="button">
          {WIZARD_STRINGS.BUTTONS.EDIT}
        </span>
      </Cards>

      <Cards variant="base" radius="md" className="review-summary-card d-flex align-items-center justify-content-between w-100 mb-3">
        <span className="review-summary-title fw-bold">{WIZARD_STRINGS.STEPS.STEP_2_LABEL}</span>
        <span className="review-edit-btn fw-bold" onClick={() => goToEditStep(2)} role="button">
          {WIZARD_STRINGS.BUTTONS.EDIT}
        </span>
      </Cards>

      <Cards variant="base" radius="md" className="review-summary-card d-flex align-items-center justify-content-between w-100 mb-3">
        <span className="review-summary-title fw-bold">{WIZARD_STRINGS.STEPS.STEP_3_LABEL}</span>
        <span className="review-edit-btn fw-bold" onClick={() => goToEditStep(3)} role="button">
          {WIZARD_STRINGS.BUTTONS.EDIT}
        </span>
      </Cards>

      <Cards variant="base" radius="md" className="review-summary-card d-flex align-items-center justify-content-between w-100 mb-4">
        <span className="review-summary-title fw-bold">{WIZARD_STRINGS.STEPS.STEP_4_LABEL}</span>
        <span className="review-edit-btn fw-bold" onClick={() => goToEditStep(4)} role="button">
          {WIZARD_STRINGS.BUTTONS.EDIT}
        </span>
      </Cards>

      {submitError && (
        <div
          role="alert"
          className="mb-3"
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

      <div className="profile-form-actions d-flex justify-content-end shrink-0">
        <div className="profile-btn-wrapper">
          <PrimaryButton
            type="submit"
            disabled={isSubmitting}
            text={isSubmitting ? "Submitting..." : WIZARD_STRINGS.BUTTONS.SUBMIT}
          />
        </div>
      </div>
    </form>
  );

  const renderCompletionScreen = () => {
    const completedIndex = PROFILE_COMPLETION_MILESTONES.findLastIndex((m) => m.completed);
    const progressWidth = `${(completedIndex / (PROFILE_COMPLETION_MILESTONES.length - 1)) * 100}%`;

    return (
      <div className="completion-screen-wrapper d-flex flex-column align-items-center h-100 w-100 py-1">
        <div className="w-100 d-flex justify-content-start shrink-0 mb-1">
          <button
            type="button"
            className="completion-back-btn"
            onClick={() => navigate("/whole-profile")}
            aria-label="Go back"
          >
            <Icon name="ArrowLeft" size={ICON_SIZES['2XL']} color="#103CA4" />
          </button>
        </div>

        <div className="d-flex flex-column align-items-center w-100 my-auto">
          <div className="completion-avatar-circle d-flex align-items-center justify-content-center mb-3">
            <Icon name="User2" size={ICON_SIZES.HERO} color="#103CA4" />
          </div>

          <h1 className="completion-main-title fw-bold text-center mb-3">
            {WIZARD_STRINGS.COMPLETION.MAIN_TITLE_LINE1}<br />{WIZARD_STRINGS.COMPLETION.MAIN_TITLE_LINE2}
          </h1>

          <Cards
            variant="base"
            radius="md"
            bg="#E9F0FF"
            className="completion-reward-banner text-start mb-4 w-100"
            style={{ backgroundColor: '#E9F0FF', background: '#E9F0FF', border: 'none', boxShadow: 'none' }}
          >
            <h3 className="reward-banner-title fw-bold mb-1">{WIZARD_STRINGS.COMPLETION.BANNER_TITLE}</h3>
            <p className="reward-banner-subtitle mb-0">{WIZARD_STRINGS.COMPLETION.BANNER_SUBTITLE}</p>
          </Cards>

          <div className="completion-stepper-container position-relative w-100 mb-4">
            <div className="completion-stepper position-relative d-flex align-items-start justify-content-between w-100">
              <div className="completion-track-line position-absolute">
                <div className="completion-active-line" style={{ width: progressWidth }}></div>
              </div>

              {PROFILE_COMPLETION_MILESTONES.map((item) => (
                <div key={item.id} className="completion-step-item d-flex flex-column align-items-center">
                  <div className={`completion-circle ${item.completed ? "active" : "locked"} d-flex align-items-center justify-content-center`}>
                    {item.completed ? <span className="dot-white"></span> : <Icon name="Lock" size={ICON_SIZES.MD} color="#9ca3af" />}
                  </div>
                  <span className={`completion-step-title mt-2 ${item.completed ? "fw-bold text-dark" : "text-muted"}`}>
                    {item.title}
                  </span>
                  <span className={`completion-step-points ${item.completed ? "fw-bold text-primary" : "text-muted"}`}>
                    +{item.points} {WIZARD_STRINGS.COMPLETION.TRUST_POINTS_SUFFIX}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="completion-cta-wrapper d-flex justify-content-center mt-2">
            <PrimaryButton
              type="button"
              className="completion-cta-btn border-0 text-white fw-bold d-inline-flex align-items-center justify-content-center px-5"
              onClick={() => navigate("/verification")}
              text={WIZARD_STRINGS.COMPLETION.CTA_BUTTON}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="profile-page-wrapper grow min-vh-0 d-flex flex-column w-100">
        <Cards className="profile-main-card grow h-100 d-flex flex-column overflow-hidden w-100" padding="0">
          <div ref={cardInnerRef} className="profile-card-inner d-flex flex-column h-100">
            {isSubmitted ? (
              renderCompletionScreen()
            ) : (
              <>
                <div className="profile-top-back-wrapper shrink-0 w-100 d-flex justify-content-start">
                  <button
                    type="button"
                    className="profile-top-back-btn"
                    onClick={handleBackTop}
                    aria-label="Go back"
                  >
                    <Icon name="ArrowLeft" size={ICON_SIZES['2XL']} color="#0b38a8" />
                  </button>
                </div>
                <div className="profile-header-section shrink-0">
                  <h1 className="profile-main-title fw-bold">{WIZARD_STRINGS.MAIN_TITLE}</h1>
                  <p className="profile-main-subtitle text-secondary">{WIZARD_STRINGS.MAIN_SUBTITLE}</p>
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
