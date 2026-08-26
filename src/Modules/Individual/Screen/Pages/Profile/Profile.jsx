import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout, Cards, PrimaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
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

const clearDraftStorage = () => {
  sessionStorage.removeItem("ind_profilePhotoName");
  sessionStorage.removeItem("ind_fullName");
  sessionStorage.removeItem("ind_country");
  sessionStorage.removeItem("ind_timeZone");
  sessionStorage.removeItem("ind_headline");
  sessionStorage.removeItem("ind_bio");
  sessionStorage.removeItem("ind_experience");
  sessionStorage.removeItem("ind_availability");
  sessionStorage.removeItem("ind_skills");
  sessionStorage.removeItem("ind_tools");
  sessionStorage.removeItem("ind_categories");
  sessionStorage.removeItem("ind_portfolioUrl");
  sessionStorage.removeItem("ind_githubUrl");
  sessionStorage.removeItem("ind_linkedinUrl");
  sessionStorage.removeItem("ind_resumeFileName");
};

export default function Profile() {
  const navigate = useNavigate();
  const { step } = useParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [isEditingFromReview, setIsEditingFromReview] = useState(false);
  const [snapshot, setSnapshot] = useState({});

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoName, setProfilePhotoName] = useState(() => sessionStorage.getItem("ind_profilePhotoName") || "");
  const [fullName, setFullName] = useState(() => sessionStorage.getItem("ind_fullName") || "");
  const [country, setCountry] = useState(() => sessionStorage.getItem("ind_country") || "");
  const [timeZone, setTimeZone] = useState(() => sessionStorage.getItem("ind_timeZone") || "");
  const [step1Errors, setStep1Errors] = useState({});

  const [headline, setHeadline] = useState(() => sessionStorage.getItem("ind_headline") || "");
  const [bio, setBio] = useState(() => sessionStorage.getItem("ind_bio") || "");
  const [experience, setExperience] = useState(() => sessionStorage.getItem("ind_experience") || "");
  const [availability, setAvailability] = useState(() => sessionStorage.getItem("ind_availability") || "");
  const [step2Errors, setStep2Errors] = useState({});

  const [skills, setSkills] = useState(() => sessionStorage.getItem("ind_skills") || "");
  const [tools, setTools] = useState(() => sessionStorage.getItem("ind_tools") || "");
  const [categories, setCategories] = useState(() => sessionStorage.getItem("ind_categories") || "");
  const [step3Errors, setStep3Errors] = useState({});

  const [portfolioUrl, setPortfolioUrl] = useState(() => sessionStorage.getItem("ind_portfolioUrl") || "");
  const [githubUrl, setGithubUrl] = useState(() => sessionStorage.getItem("ind_githubUrl") || "");
  const [linkedinUrl, setLinkedinUrl] = useState(() => sessionStorage.getItem("ind_linkedinUrl") || "");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState(() => sessionStorage.getItem("ind_resumeFileName") || "");
  const [step4Errors, setStep4Errors] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(() => sessionStorage.getItem("ind_profile_submitted") === "true");

  const resetFormState = () => {
    setProfilePhoto(null);
    setProfilePhotoName("");
    setFullName("");
    setCountry("");
    setTimeZone("");
    setStep1Errors({});

    setHeadline("");
    setBio("");
    setExperience("");
    setAvailability("");
    setStep2Errors({});

    setSkills("");
    setTools("");
    setCategories("");
    setStep3Errors({});

    setPortfolioUrl("");
    setGithubUrl("");
    setLinkedinUrl("");
    setResumeFile(null);
    setResumeFileName("");
    setStep4Errors({});
  };

  const cardInnerRef = useRef(null);

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

  const formatFileName = (name) => {
    if (!name) return "";
    const cleanName = name.trim();
    if (cleanName.length > 3) {
      return `${cleanName.slice(0, 3)}...`;
    }
    return cleanName;
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(file);
      setProfilePhotoName(file.name);
      sessionStorage.setItem("ind_profilePhotoName", file.name);
      setStep1Errors((prev) => ({ ...prev, photo: "" }));
    }
  };

  const handleResumeUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setResumeFileName(file.name);
      sessionStorage.setItem("ind_resumeFileName", file.name);
      setStep4Errors((prev) => ({ ...prev, resumeFile: "" }));
    }
  };

  const isStep1Complete = (profilePhoto !== null || profilePhotoName !== "") && fullName.trim() !== "" && country !== "" && timeZone !== "";
  const isStep2Complete = headline.trim() !== "" && bio.trim() !== "" && experience !== "" && availability !== "";
  const isStep3Complete = skills.trim() !== "" && tools.trim() !== "" && categories.trim() !== "";
  const isStep4Complete = portfolioUrl.trim() !== "" || githubUrl.trim() !== "" || linkedinUrl.trim() !== "" || resumeFile !== null || resumeFileName !== "";

  const handleStep1Continue = (e) => {
    e.preventDefault();
    const errors = {};
    if (!profilePhoto && !profilePhotoName) errors.photo = "Profile picture is required";
    if (!fullName.trim()) errors.fullName = "Full name is required";
    if (!country) errors.country = "Country is required";
    if (!timeZone) errors.timeZone = "Time zone is required";
    if (Object.keys(errors).length > 0) { setStep1Errors(errors); return; }
    setStep1Errors({});
    sessionStorage.setItem("ind_fullName", fullName);
    sessionStorage.setItem("ind_country", country);
    sessionStorage.setItem("ind_timeZone", timeZone);
    if (profilePhotoName) sessionStorage.setItem("ind_profilePhotoName", profilePhotoName);
    if (isEditingFromReview) { setIsEditingFromReview(false); goToStep(5); } else { goToStep(2); }
  };

  const handleStep1Cancel = () => {
    const pPhoto = snapshot.profilePhoto ?? profilePhoto;
    const pPhotoName = snapshot.profilePhotoName ?? profilePhotoName;
    const fName = snapshot.fullName ?? fullName;
    const ctry = snapshot.country ?? country;
    const tz = snapshot.timeZone ?? timeZone;

    setProfilePhoto(pPhoto);
    setProfilePhotoName(pPhotoName);
    setFullName(fName);
    setCountry(ctry);
    setTimeZone(tz);

    sessionStorage.setItem("ind_fullName", fName);
    sessionStorage.setItem("ind_country", ctry);
    sessionStorage.setItem("ind_timeZone", tz);
    sessionStorage.setItem("ind_profilePhotoName", pPhotoName);

    setStep1Errors({});
    setIsEditingFromReview(false);
    goToStep(5);
  };

  const handleStep2Continue = (e) => {
    e.preventDefault();
    const errors = {};
    if (!headline.trim()) errors.headline = "Headline is required";
    if (!bio.trim()) errors.bio = "Bio is required";
    if (!experience) errors.experience = "Experience level is required";
    if (!availability) errors.availability = "Availability is required";
    if (Object.keys(errors).length > 0) { setStep2Errors(errors); return; }
    setStep2Errors({});
    if (isEditingFromReview) { setIsEditingFromReview(false); goToStep(5); } else { goToStep(3); }
  };

  const handleStep2Cancel = () => {
    const hd = snapshot.headline ?? headline;
    const b = snapshot.bio ?? bio;
    const exp = snapshot.experience ?? experience;
    const avail = snapshot.availability ?? availability;

    setHeadline(hd);
    setBio(b);
    setExperience(exp);
    setAvailability(avail);

    sessionStorage.setItem("ind_headline", hd);
    sessionStorage.setItem("ind_bio", b);
    sessionStorage.setItem("ind_experience", exp);
    sessionStorage.setItem("ind_availability", avail);

    setStep2Errors({});
    setIsEditingFromReview(false);
    goToStep(5);
  };

  const handleStep3Continue = (e) => {
    e.preventDefault();
    const errors = {};
    if (!skills.trim()) errors.skills = "Skills are required";
    if (!tools.trim()) errors.tools = "Tools are required";
    if (!categories.trim()) errors.categories = "Categories are required";
    if (Object.keys(errors).length > 0) { setStep3Errors(errors); return; }
    setStep3Errors({});
    if (isEditingFromReview) { setIsEditingFromReview(false); goToStep(5); } else { goToStep(4); }
  };

  const handleStep3Cancel = () => {
    const sk = snapshot.skills ?? skills;
    const tl = snapshot.tools ?? tools;
    const cat = snapshot.categories ?? categories;

    setSkills(sk);
    setTools(tl);
    setCategories(cat);

    sessionStorage.setItem("ind_skills", sk);
    sessionStorage.setItem("ind_tools", tl);
    sessionStorage.setItem("ind_categories", cat);

    setStep3Errors({});
    setIsEditingFromReview(false);
    goToStep(5);
  };

  const handleStep4Continue = (e) => {
    e.preventDefault();
    const errors = {};
    if (!portfolioUrl.trim()) errors.portfolioUrl = "Portfolio URL is required";
    if (!githubUrl.trim()) errors.githubUrl = "Github URL is required";
    if (!linkedinUrl.trim()) errors.linkedinUrl = "Linkedin URL is required";
    if (!resumeFile && !resumeFileName) errors.resumeFile = "Resume PDF is required";
    if (Object.keys(errors).length > 0) { setStep4Errors(errors); return; }
    setStep4Errors({});
    if (isEditingFromReview) { setIsEditingFromReview(false); goToStep(5); } else { goToStep(5); }
  };

  const handleStep4Cancel = () => {
    const pUrl = snapshot.portfolioUrl ?? portfolioUrl;
    const ghUrl = snapshot.githubUrl ?? githubUrl;
    const liUrl = snapshot.linkedinUrl ?? linkedinUrl;
    const rFile = snapshot.resumeFile ?? resumeFile;
    const rFileName = snapshot.resumeFileName ?? resumeFileName;

    setPortfolioUrl(pUrl);
    setGithubUrl(ghUrl);
    setLinkedinUrl(liUrl);
    setResumeFile(rFile);
    setResumeFileName(rFileName);

    sessionStorage.setItem("ind_portfolioUrl", pUrl);
    sessionStorage.setItem("ind_githubUrl", ghUrl);
    sessionStorage.setItem("ind_linkedinUrl", liUrl);
    sessionStorage.setItem("ind_resumeFileName", rFileName);

    setStep4Errors({});
    setIsEditingFromReview(false);
    goToStep(5);
  };

  const goToEditStep = (stepNum) => {
    setSnapshot({
      profilePhoto, profilePhotoName, fullName, country, timeZone,
      headline, bio, experience, availability,
      skills, tools, categories,
      portfolioUrl, githubUrl, linkedinUrl, resumeFile, resumeFileName,
    });
    setIsEditingFromReview(true);
    goToStep(stepNum);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("ind_profile_submitted", "true");
    setIsSubmitted(true);
    goToStep(6);
  };

  const renderStepper = () => {
    const progressWidth = `${((currentStep - 1) / (steps.length - 1)) * 100}%`;
    return (
      <div className="profile-stepper-container flex-shrink-0 w-100 position-relative">
        <div className="profile-stepper position-relative d-flex align-items-start justify-content-between w-100">
          <div className="stepper-track-line position-absolute">
            <div className="stepper-active-line" style={{ width: progressWidth }}></div>
          </div>
          {steps.map((step) => (
            <div
              key={step.number}
              className={`stepper-item d-flex flex-column align-items-center position-relative ${step.number <= currentStep ? "active" : ""}`}
              style={{ cursor: "default", pointerEvents: "none" }}
            >
              <div className="stepper-circle d-flex align-items-center justify-content-center">
                {step.number}
              </div>
              <span className="stepper-label">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderActionButtons = (isComplete, onCancel) => (
    <div className="profile-form-actions d-flex justify-content-end flex-shrink-0 gap-2">
      {isEditingFromReview ? (
        <>
          <button type="button" className="profile-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <div className="continue-btn-wrapper">
            <PrimaryButton
              type="submit"
              disabled={!isComplete}
              text={<span className="btn-content text-white d-inline-flex align-items-center gap-2"><span>Save Changes</span></span>}
            />
          </div>
        </>
      ) : (
        <div className="continue-btn-wrapper">
          <PrimaryButton
            type="submit"
            disabled={!isComplete}
            text={
              <span className="btn-content text-white d-inline-flex align-items-center gap-2">
                <span>Continue</span>
                <Icon name="ArrowRight" size={18} color="#ffffff" />
              </span>
            }
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
            <span>{profilePhoto ? formatFileName(profilePhoto.name) : (formatFileName(profilePhotoName) || "Upload photo")}</span>
            <Icon name={profilePhoto || profilePhotoName ? "Check" : "Upload"} size={16} color="#ffffff" />
          </label>
          <input id="profile-photo-input" type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />
        </div>
        {step1Errors.photo && <span className="field-error">{step1Errors.photo}</span>}
      </div>

      <div className="profile-field-group">
        <label className="field-label">Full name</label>
        <input
          type="text"
          className={`profile-text-input w-100 ${step1Errors.fullName ? "input-error" : ""}`}
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => {
            const val = e.target.value;
            setFullName(val);
            sessionStorage.setItem("ind_fullName", val);
            setStep1Errors((p) => ({ ...p, fullName: "" }));
          }}
        />
        {step1Errors.fullName && <span className="field-error">{step1Errors.fullName}</span>}
      </div>

      <div className="profile-field-group">
        <div className="custom-dropdown-container w-100">
          <label className="field-label">Country</label>
          <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${step1Errors.country ? "dropdown-error" : ""}`}>
            <select
              className="custom-dropdown-select w-100 h-100"
              value={country}
              onChange={(e) => {
                const val = e.target.value;
                setCountry(val);
                sessionStorage.setItem("ind_country", val);
                setStep1Errors((p) => ({ ...p, country: "" }));
              }}
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
          {step1Errors.country && <span className="field-error">{step1Errors.country}</span>}
        </div>
      </div>

      <div className="profile-field-group">
        <div className="custom-dropdown-container w-100">
          <label className="field-label">Time Zone</label>
          <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${step1Errors.timeZone ? "dropdown-error" : ""}`}>
            <select
              className="custom-dropdown-select w-100 h-100"
              value={timeZone}
              onChange={(e) => {
                const val = e.target.value;
                setTimeZone(val);
                sessionStorage.setItem("ind_timeZone", val);
                setStep1Errors((p) => ({ ...p, timeZone: "" }));
              }}
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
          {step1Errors.timeZone && <span className="field-error">{step1Errors.timeZone}</span>}
        </div>
      </div>

      {renderActionButtons(isStep1Complete, handleStep1Cancel)}
    </form>
  );

  const renderStep2 = () => (
    <form className="profile-step-form flex-grow-1 d-flex flex-column min-vh-0 h-100" onSubmit={handleStep2Continue}>
      <div className="profile-section-heading flex-shrink-0">
        <h2 className="section-title fw-bold">Professional Information</h2>
        <p className="section-subtitle text-secondary">Tell us about your professional background</p>
      </div>

      <div className="profile-field-group">
        <label className="field-label">Headline</label>
        <input
          type="text"
          className={`profile-text-input w-100 ${step2Errors.headline ? "input-error" : ""}`}
          placeholder="e.g. UI/UX Designer"
          value={headline}
          onChange={(e) => {
            const val = e.target.value;
            setHeadline(val);
            sessionStorage.setItem("ind_headline", val);
            setStep2Errors((p) => ({ ...p, headline: "" }));
          }}
        />
        {step2Errors.headline && <span className="field-error">{step2Errors.headline}</span>}
      </div>

      <div className="profile-field-group">
        <label className="field-label">Bio</label>
        <div className={`bio-textarea-wrapper w-100 ${step2Errors.bio ? "input-error" : ""}`}>
          <textarea
            className="bio-textarea"
            placeholder="Write a short bio about yourself"
            maxLength={300}
            value={bio}
            onChange={(e) => {
              const val = e.target.value;
              setBio(val);
              sessionStorage.setItem("ind_bio", val);
              setStep2Errors((p) => ({ ...p, bio: "" }));
            }}
          />
          <span className="bio-char-count">{bio.length}/300</span>
        </div>
        {step2Errors.bio && <span className="field-error">{step2Errors.bio}</span>}
      </div>

      <div className="profile-field-group">
        <div className="custom-dropdown-container w-100">
          <label className="field-label">Experience Level</label>
          <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${step2Errors.experience ? "dropdown-error" : ""}`}>
            <select
              className="custom-dropdown-select w-100 h-100"
              value={experience}
              onChange={(e) => {
                const val = e.target.value;
                setExperience(val);
                sessionStorage.setItem("ind_experience", val);
                setStep2Errors((p) => ({ ...p, experience: "" }));
              }}
            >
              <option value="" disabled hidden>Select experience level</option>
              <option value="entry">Entry Level (0-2 years)</option>
              <option value="mid">Mid Level (3-5 years)</option>
              <option value="senior">Senior (5-8 years)</option>
              <option value="expert">Expert (8+ years)</option>
            </select>
            <Icon name="ChevronDown" size={18} className="dropdown-chevron-icon position-absolute" />
          </div>
          {step2Errors.experience && <span className="field-error">{step2Errors.experience}</span>}
        </div>
      </div>

      <div className="profile-field-group">
        <div className="custom-dropdown-container w-100">
          <label className="field-label">Availability</label>
          <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${step2Errors.availability ? "dropdown-error" : ""}`}>
            <select
              className="custom-dropdown-select w-100 h-100"
              value={availability}
              onChange={(e) => {
                const val = e.target.value;
                setAvailability(val);
                sessionStorage.setItem("ind_availability", val);
                setStep2Errors((p) => ({ ...p, availability: "" }));
              }}
            >
              <option value="" disabled hidden>Select availability</option>
              <option value="full-time">Full-time (40 hrs/week)</option>
              <option value="part-time">Part-time (20 hrs/week)</option>
              <option value="hourly">Hourly / As needed</option>
              <option value="weekends">Weekends only</option>
            </select>
            <Icon name="ChevronDown" size={18} className="dropdown-chevron-icon position-absolute" />
          </div>
          {step2Errors.availability && <span className="field-error">{step2Errors.availability}</span>}
        </div>
      </div>

      {renderActionButtons(isStep2Complete, handleStep2Cancel)}
    </form>
  );

  const renderStep3 = () => (
    <form className="profile-step-form flex-grow-1 d-flex flex-column min-vh-0 h-100" onSubmit={handleStep3Continue}>
      <div className="profile-section-heading flex-shrink-0">
        <h2 className="section-title fw-bold">Skills</h2>
        <p className="section-subtitle text-secondary">Add your skills and expertise</p>
      </div>

      <div className="profile-field-group">
        <label className="field-label">Skills</label>
        <input
          type="text"
          className={`profile-text-input w-100 ${step3Errors.skills ? "input-error" : ""}`}
          placeholder="Add skills"
          value={skills}
          onChange={(e) => {
            const val = e.target.value;
            setSkills(val);
            sessionStorage.setItem("ind_skills", val);
            setStep3Errors((p) => ({ ...p, skills: "" }));
          }}
        />
        {step3Errors.skills && <span className="field-error">{step3Errors.skills}</span>}
      </div>

      <div className="profile-field-group">
        <label className="field-label">Tools</label>
        <input
          type="text"
          className={`profile-text-input w-100 ${step3Errors.tools ? "input-error" : ""}`}
          placeholder="Add tools"
          value={tools}
          onChange={(e) => {
            const val = e.target.value;
            setTools(val);
            sessionStorage.setItem("ind_tools", val);
            setStep3Errors((p) => ({ ...p, tools: "" }));
          }}
        />
        {step3Errors.tools && <span className="field-error">{step3Errors.tools}</span>}
      </div>

      <div className="profile-field-group">
        <label className="field-label">Categories</label>
        <input
          type="text"
          className={`profile-text-input w-100 ${step3Errors.categories ? "input-error" : ""}`}
          placeholder="Add categories"
          value={categories}
          onChange={(e) => {
            const val = e.target.value;
            setCategories(val);
            sessionStorage.setItem("ind_categories", val);
            setStep3Errors((p) => ({ ...p, categories: "" }));
          }}
        />
        {step3Errors.categories && <span className="field-error">{step3Errors.categories}</span>}
      </div>

      {renderActionButtons(isStep3Complete, handleStep3Cancel)}
    </form>
  );

  const renderStep4 = () => (
    <form className="profile-step-form flex-grow-1 d-flex flex-column min-vh-0 h-100" onSubmit={handleStep4Continue}>
      <div className="profile-section-heading flex-shrink-0">
        <h2 className="section-title fw-bold">Portfolio and links</h2>
        <p className="section-subtitle text-secondary">Add your portfolio and social links</p>
      </div>

      <div className="profile-field-group">
        <label className="field-label">Portfolio website</label>
        <input
          type="text"
          className={`profile-text-input w-100 ${step4Errors.portfolioUrl ? "input-error" : ""}`}
          placeholder="Enter URL"
          value={portfolioUrl}
          onChange={(e) => {
            const val = e.target.value;
            setPortfolioUrl(val);
            sessionStorage.setItem("ind_portfolioUrl", val);
            setStep4Errors((p) => ({ ...p, portfolioUrl: "" }));
          }}
        />
        {step4Errors.portfolioUrl && <span className="field-error">{step4Errors.portfolioUrl}</span>}
      </div>

      <div className="profile-field-group">
        <label className="field-label">Github</label>
        <input
          type="text"
          className={`profile-text-input w-100 ${step4Errors.githubUrl ? "input-error" : ""}`}
          placeholder="Enter URL"
          value={githubUrl}
          onChange={(e) => {
            const val = e.target.value;
            setGithubUrl(val);
            sessionStorage.setItem("ind_githubUrl", val);
            setStep4Errors((p) => ({ ...p, githubUrl: "" }));
          }}
        />
        {step4Errors.githubUrl && <span className="field-error">{step4Errors.githubUrl}</span>}
      </div>

      <div className="profile-field-group">
        <label className="field-label">Linkedin</label>
        <input
          type="text"
          className={`profile-text-input w-100 ${step4Errors.linkedinUrl ? "input-error" : ""}`}
          placeholder="Enter URL"
          value={linkedinUrl}
          onChange={(e) => {
            const val = e.target.value;
            setLinkedinUrl(val);
            sessionStorage.setItem("ind_linkedinUrl", val);
            setStep4Errors((p) => ({ ...p, linkedinUrl: "" }));
          }}
        />
        {step4Errors.linkedinUrl && <span className="field-error">{step4Errors.linkedinUrl}</span>}
      </div>

      <div className="profile-field-group">
        <label className="field-label">Resume</label>
        <label
          htmlFor="resume-file-input"
          className={`profile-file-upload-box d-flex align-items-center justify-content-between w-100 ${step4Errors.resumeFile ? "input-error" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <span className={`file-upload-text ${(resumeFile || resumeFileName) ? "text-dark" : "text-placeholder"}`}>
            {resumeFile ? resumeFile.name : (resumeFileName || "Upload PDF")}
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
        {step4Errors.resumeFile && <span className="field-error">{step4Errors.resumeFile}</span>}
      </div>

      {renderActionButtons(isStep4Complete, handleStep4Cancel)}
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
        <div className="continue-btn-wrapper">
          <PrimaryButton
            type="submit"
            text={<span className="btn-content text-white justify-content-center fw-bold">Submit</span>}
          />
        </div>
      </div>
    </form>
  );

  const renderCompletionScreen = () => (
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
              <div className="completion-circle locked d-flex align-items-center justify-content-center">
                <Icon name="Lock" size={16} color="#9ca3af" />
              </div>
              <span className="completion-step-title text-muted mt-2">Identity Verified</span>
              <span className="completion-step-points text-muted">+40 Trust Points</span>
            </div>

            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle locked d-flex align-items-center justify-content-center">
                <Icon name="Lock" size={16} color="#9ca3af" />
              </div>
              <span className="completion-step-title text-muted mt-2">First Project/ Proposal</span>
              <span className="completion-step-points text-muted">+30 Trust Points</span>
            </div>
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
                {renderStepper()}
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
