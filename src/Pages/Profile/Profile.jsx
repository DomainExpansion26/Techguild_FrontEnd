import React, { useState } from "react";
import { Navbar, Cards, PrimaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import "../DashBoard/dashboard.css";
import "./profile.css";

export default function Profile() {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 Form States
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [step1Errors, setStep1Errors] = useState({});

  // Step 2 Form States
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");
  const [step2Errors, setStep2Errors] = useState({});

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8a51e02 (feat: Profile Page)
  // Step 3 Form States (Skills)
  const [skills, setSkills] = useState("");
  const [tools, setTools] = useState("");
  const [categories, setCategories] = useState("");
  const [step3Errors, setStep3Errors] = useState({});

  // Step 4 Form States (Portfolio and links)
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [step4Errors, setStep4Errors] = useState({});

<<<<<<< HEAD
=======
>>>>>>> 618466b (feat : Updated Profile Page)
=======
>>>>>>> 8a51e02 (feat: Profile Page)
  const steps = [
    { number: 1, label: "Basic Information", active: currentStep === 1 },
    { number: 2, label: "Professional Information", active: currentStep === 2 },
    { number: 3, label: "Skills", active: currentStep === 3 },
    { number: 4, label: "Portfolio and links", active: currentStep === 4 },
    { number: 5, label: "Review and Submit", active: currentStep === 5 },
  ];

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
      setStep1Errors((prev) => ({ ...prev, photo: "" }));
    }
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8a51e02 (feat: Profile Page)
  const handleResumeUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setStep4Errors((prev) => ({ ...prev, resumeFile: "" }));
    }
  };

  const isStep1Complete = profilePhoto !== null && fullName.trim() !== "" && country !== "" && timeZone !== "";
  const isStep2Complete = headline.trim() !== "" && bio.trim() !== "" && experience !== "" && availability !== "";
  const isStep3Complete = skills.trim() !== "" && tools.trim() !== "" && categories.trim() !== "";
  const isStep4Complete = portfolioUrl.trim() !== "" || githubUrl.trim() !== "" || linkedinUrl.trim() !== "" || resumeFile !== null;
<<<<<<< HEAD
=======
  const isStep1Complete = profilePhoto !== null && fullName.trim() !== "" && country !== "" && timeZone !== "";
  const isStep2Complete = headline.trim() !== "" && bio.trim() !== "" && experience !== "" && availability !== "";
>>>>>>> 618466b (feat : Updated Profile Page)
=======
>>>>>>> 8a51e02 (feat: Profile Page)

  const handleStep1Continue = (e) => {
    e.preventDefault();
    const errors = {};
    if (!profilePhoto) errors.photo = "Profile picture is required";
    if (!fullName.trim()) errors.fullName = "Full name is required";
    if (!country) errors.country = "Country is required";
    if (!timeZone) errors.timeZone = "Time zone is required";

    if (Object.keys(errors).length > 0) {
      setStep1Errors(errors);
      return;
    }

    setStep1Errors({});
    setCurrentStep(2);
  };

  const handleStep2Continue = (e) => {
    e.preventDefault();
    const errors = {};
    if (!headline.trim()) errors.headline = "Headline is required";
    if (!bio.trim()) errors.bio = "Bio is required";
    if (!experience) errors.experience = "Experience level is required";
    if (!availability) errors.availability = "Availability is required";

    if (Object.keys(errors).length > 0) {
      setStep2Errors(errors);
      return;
    }

    setStep2Errors({});
    setCurrentStep(3);
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8a51e02 (feat: Profile Page)
  const handleStep3Continue = (e) => {
    e.preventDefault();
    const errors = {};
    if (!skills.trim()) errors.skills = "Skills are required";
    if (!tools.trim()) errors.tools = "Tools are required";
    if (!categories.trim()) errors.categories = "Categories are required";

    if (Object.keys(errors).length > 0) {
      setStep3Errors(errors);
      return;
    }

    setStep3Errors({});
    setCurrentStep(4);
  };

  const handleStep4Continue = (e) => {
    e.preventDefault();
    const errors = {};
    if (!portfolioUrl.trim()) errors.portfolioUrl = "Portfolio URL is required";
    if (!githubUrl.trim()) errors.githubUrl = "Github URL is required";
    if (!linkedinUrl.trim()) errors.linkedinUrl = "Linkedin URL is required";
    if (!resumeFile) errors.resumeFile = "Resume PDF is required";

    if (Object.keys(errors).length > 0) {
      setStep4Errors(errors);
      return;
    }

    setStep4Errors({});
    setCurrentStep(5);
  };

<<<<<<< HEAD
=======
>>>>>>> 618466b (feat : Updated Profile Page)
=======
>>>>>>> 8a51e02 (feat: Profile Page)
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
              onClick={() => setCurrentStep(step.number)}
<<<<<<< HEAD
<<<<<<< HEAD
              className={`stepper-item d-flex flex-column align-items-center position-relative ${step.number <= currentStep ? "active" : ""
                }`}
=======
              className={`stepper-item d-flex flex-column align-items-center position-relative ${
                step.number <= currentStep ? "active" : ""
              }`}
>>>>>>> 618466b (feat : Updated Profile Page)
=======
              className={`stepper-item d-flex flex-column align-items-center position-relative ${step.number <= currentStep ? "active" : ""
                }`}
>>>>>>> 8a51e02 (feat: Profile Page)
              style={{ cursor: "pointer" }}
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

  const renderStep1 = () => (
    <div className="profile-form-section flex-grow-1 d-flex flex-column justify-content-between min-vh-0">
      <div className="profile-section-heading flex-shrink-0">
        <h2 className="section-title fw-bold">Basic information</h2>
        <p className="section-subtitle text-secondary">Add your basic details.</p>
      </div>

      <form className="profile-form d-flex flex-column justify-content-between flex-grow-1" onSubmit={handleStep1Continue}>
        {/* Profile Picture */}
        <div className="profile-field-group">
<<<<<<< HEAD
<<<<<<< HEAD
          <label className="field-label">Profile picture</label>
=======
          <label className="field-label fw-semibold">Profile picture</label>
>>>>>>> 618466b (feat : Updated Profile Page)
=======
          <label className="field-label">Profile picture</label>
>>>>>>> 8a51e02 (feat: Profile Page)
          <div className="upload-btn-wrapper d-flex align-items-center gap-3">
            <label htmlFor="profile-photo-input" className="upload-photo-btn d-inline-flex align-items-center justify-content-center text-white gap-2" style={{ cursor: "pointer" }}>
              <span>{profilePhoto ? profilePhoto.name : "Upload photo"}</span>
              <Icon name={profilePhoto ? "Check" : "Upload"} size={15} color="#ffffff" />
            </label>
            <input id="profile-photo-input" type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />
          </div>
          {step1Errors.photo && <span className="field-error">{step1Errors.photo}</span>}
        </div>

        {/* Full Name */}
        <div className="profile-field-group">
<<<<<<< HEAD
<<<<<<< HEAD
          <label className="field-label">Full name</label>
=======
          <label className="field-label fw-semibold">Full name</label>
>>>>>>> 618466b (feat : Updated Profile Page)
=======
          <label className="field-label">Full name</label>
>>>>>>> 8a51e02 (feat: Profile Page)
          <input
            type="text"
            className={`profile-text-input w-100 ${step1Errors.fullName ? "input-error" : ""}`}
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => { setFullName(e.target.value); setStep1Errors((p) => ({ ...p, fullName: "" })); }}
          />
          {step1Errors.fullName && <span className="field-error">{step1Errors.fullName}</span>}
        </div>

        {/* Country */}
        <div className="profile-field-group">
          <div className="custom-dropdown-container w-100">
<<<<<<< HEAD
<<<<<<< HEAD
            <label className="field-label">Country</label>
=======
            <label className="field-label fw-semibold">Country</label>
>>>>>>> 618466b (feat : Updated Profile Page)
=======
            <label className="field-label">Country</label>
>>>>>>> 8a51e02 (feat: Profile Page)
            <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${step1Errors.country ? "dropdown-error" : ""}`}>
              <select className="custom-dropdown-select w-100 h-100" value={country} onChange={(e) => { setCountry(e.target.value); setStep1Errors((p) => ({ ...p, country: "" })); }}>
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

        {/* Time Zone */}
        <div className="profile-field-group">
          <div className="custom-dropdown-container w-100">
<<<<<<< HEAD
<<<<<<< HEAD
            <label className="field-label">Time Zone</label>
=======
            <label className="field-label fw-semibold">Time Zone</label>
>>>>>>> 618466b (feat : Updated Profile Page)
=======
            <label className="field-label">Time Zone</label>
>>>>>>> 8a51e02 (feat: Profile Page)
            <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${step1Errors.timeZone ? "dropdown-error" : ""}`}>
              <select className="custom-dropdown-select w-100 h-100" value={timeZone} onChange={(e) => { setTimeZone(e.target.value); setStep1Errors((p) => ({ ...p, timeZone: "" })); }}>
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

        {/* Continue Button */}
        <div className="profile-form-actions mt-auto d-flex justify-content-end flex-shrink-0">
          <div className="continue-btn-wrapper">
            <PrimaryButton
              type="submit"
              disabled={!isStep1Complete}
              text={
                <span className="btn-content text-white d-inline-flex align-items-center gap-2">
                  <span>Continue</span>
                  <Icon name="ArrowRight" size={18} color="#ffffff" />
                </span>
              }
            />
          </div>
        </div>
      </form>
    </div>
  );

  const renderStep2 = () => (
    <div className="profile-form-section flex-grow-1 d-flex flex-column justify-content-between min-vh-0">
      <div className="profile-section-heading flex-shrink-0">
        <h2 className="section-title fw-bold">Professional Information</h2>
        <p className="section-subtitle text-secondary">Tell us about your professional background</p>
      </div>

      <form className="profile-form d-flex flex-column justify-content-between flex-grow-1" onSubmit={handleStep2Continue}>
        {/* Headline */}
        <div className="profile-field-group">
<<<<<<< HEAD
<<<<<<< HEAD
          <label className="field-label">Headline</label>
=======
          <label className="field-label fw-semibold">Headline</label>
>>>>>>> 618466b (feat : Updated Profile Page)
=======
          <label className="field-label">Headline</label>
>>>>>>> 8a51e02 (feat: Profile Page)
          <input
            type="text"
            className={`profile-text-input w-100 ${step2Errors.headline ? "input-error" : ""}`}
            placeholder="e.g. UI/UX Designer"
            value={headline}
            onChange={(e) => { setHeadline(e.target.value); setStep2Errors((p) => ({ ...p, headline: "" })); }}
          />
          {step2Errors.headline && <span className="field-error">{step2Errors.headline}</span>}
        </div>

        {/* Bio */}
        <div className="profile-field-group">
<<<<<<< HEAD
<<<<<<< HEAD
          <label className="field-label">Bio</label>
=======
          <label className="field-label fw-semibold">Bio</label>
>>>>>>> 618466b (feat : Updated Profile Page)
=======
          <label className="field-label">Bio</label>
>>>>>>> 8a51e02 (feat: Profile Page)
          <div className={`bio-textarea-wrapper w-100 ${step2Errors.bio ? "input-error" : ""}`}>
            <textarea
              className="bio-textarea"
              placeholder="Write a short bio about yourself"
              maxLength={300}
              value={bio}
              onChange={(e) => { setBio(e.target.value); setStep2Errors((p) => ({ ...p, bio: "" })); }}
            />
            <span className="bio-char-count">{bio.length}/300</span>
          </div>
          {step2Errors.bio && <span className="field-error">{step2Errors.bio}</span>}
        </div>

        {/* Experience Level */}
        <div className="profile-field-group">
          <div className="custom-dropdown-container w-100">
<<<<<<< HEAD
<<<<<<< HEAD
            <label className="field-label">Experience Level</label>
=======
            <label className="field-label fw-semibold">Experience Level</label>
>>>>>>> 618466b (feat : Updated Profile Page)
=======
            <label className="field-label">Experience Level</label>
>>>>>>> 8a51e02 (feat: Profile Page)
            <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${step2Errors.experience ? "dropdown-error" : ""}`}>
              <select className="custom-dropdown-select w-100 h-100" value={experience} onChange={(e) => { setExperience(e.target.value); setStep2Errors((p) => ({ ...p, experience: "" })); }}>
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

        {/* Availability */}
        <div className="profile-field-group">
          <div className="custom-dropdown-container w-100">
<<<<<<< HEAD
<<<<<<< HEAD
            <label className="field-label">Availability</label>
=======
            <label className="field-label fw-semibold">Availability</label>
>>>>>>> 618466b (feat : Updated Profile Page)
=======
            <label className="field-label">Availability</label>
>>>>>>> 8a51e02 (feat: Profile Page)
            <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${step2Errors.availability ? "dropdown-error" : ""}`}>
              <select className="custom-dropdown-select w-100 h-100" value={availability} onChange={(e) => { setAvailability(e.target.value); setStep2Errors((p) => ({ ...p, availability: "" })); }}>
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

        {/* Continue Button */}
        <div className="profile-form-actions mt-auto d-flex justify-content-end flex-shrink-0">
          <div className="continue-btn-wrapper">
            <PrimaryButton
              type="submit"
              disabled={!isStep2Complete}
              text={
                <span className="btn-content text-white d-inline-flex align-items-center gap-2">
                  <span>Continue</span>
                  <Icon name="ArrowRight" size={18} color="#ffffff" />
                </span>
              }
            />
          </div>
        </div>
      </form>
    </div>
  );

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8a51e02 (feat: Profile Page)
  const renderStep3 = () => (
    <div className="profile-form-section flex-grow-1 d-flex flex-column justify-content-between min-vh-0">
      <div className="profile-section-heading flex-shrink-0">
        <h2 className="section-title fw-bold">Skills</h2>
        <p className="section-subtitle text-secondary">Add your skills and expertise</p>
      </div>

      <form className="profile-form d-flex flex-column justify-content-between flex-grow-1" onSubmit={handleStep3Continue}>
        <div className="d-flex flex-column gap-2">
          {/* Skills */}
          <div className="profile-field-group">
            <label className="field-label">Skills</label>
            <input
              type="text"
              className={`profile-text-input w-100 ${step3Errors.skills ? "input-error" : ""}`}
              placeholder="Add skills"
              value={skills}
              onChange={(e) => { setSkills(e.target.value); setStep3Errors((p) => ({ ...p, skills: "" })); }}
            />
            {step3Errors.skills && <span className="field-error">{step3Errors.skills}</span>}
          </div>

          {/* Tools */}
          <div className="profile-field-group">
            <label className="field-label">Tools</label>
            <input
              type="text"
              className={`profile-text-input w-100 ${step3Errors.tools ? "input-error" : ""}`}
              placeholder="Add tools"
              value={tools}
              onChange={(e) => { setTools(e.target.value); setStep3Errors((p) => ({ ...p, tools: "" })); }}
            />
            {step3Errors.tools && <span className="field-error">{step3Errors.tools}</span>}
          </div>

          {/* Categories */}
          <div className="profile-field-group">
            <label className="field-label">Categories</label>
            <input
              type="text"
              className={`profile-text-input w-100 ${step3Errors.categories ? "input-error" : ""}`}
              placeholder="Add categories"
              value={categories}
              onChange={(e) => { setCategories(e.target.value); setStep3Errors((p) => ({ ...p, categories: "" })); }}
            />
            {step3Errors.categories && <span className="field-error">{step3Errors.categories}</span>}
          </div>
        </div>

        {/* Continue Button */}
        <div className="profile-form-actions mt-auto d-flex justify-content-end flex-shrink-0">
          <div className="continue-btn-wrapper">
            <PrimaryButton
              type="submit"
              disabled={!isStep3Complete}
              text={
                <span className="btn-content text-white d-inline-flex align-items-center gap-2">
                  <span>Continue</span>
                  <Icon name="ArrowRight" size={18} color="#ffffff" />
                </span>
              }
            />
          </div>
        </div>
      </form>
    </div>
  );

  const renderStep4 = () => (
    <div className="profile-form-section flex-grow-1 d-flex flex-column justify-content-between min-vh-0">
      <div className="profile-section-heading flex-shrink-0">
        <h2 className="section-title fw-bold">Portfolio and links</h2>
        <p className="section-subtitle text-secondary">Add your portfolio and social links</p>
      </div>

      <form className="profile-form d-flex flex-column justify-content-between flex-grow-1" onSubmit={handleStep4Continue}>
        <div className="d-flex flex-column gap-2">
          {/* Portfolio website */}
          <div className="profile-field-group">
            <label className="field-label">Portfolio website</label>
            <input
              type="text"
              className={`profile-text-input w-100 ${step4Errors.portfolioUrl ? "input-error" : ""}`}
              placeholder="Enter URL"
              value={portfolioUrl}
              onChange={(e) => { setPortfolioUrl(e.target.value); setStep4Errors((p) => ({ ...p, portfolioUrl: "" })); }}
            />
            {step4Errors.portfolioUrl && <span className="field-error">{step4Errors.portfolioUrl}</span>}
          </div>

          {/* Github */}
          <div className="profile-field-group">
            <label className="field-label">Github</label>
            <input
              type="text"
              className={`profile-text-input w-100 ${step4Errors.githubUrl ? "input-error" : ""}`}
              placeholder="Enter URL"
              value={githubUrl}
              onChange={(e) => { setGithubUrl(e.target.value); setStep4Errors((p) => ({ ...p, githubUrl: "" })); }}
            />
            {step4Errors.githubUrl && <span className="field-error">{step4Errors.githubUrl}</span>}
          </div>

          {/* Linkedin */}
          <div className="profile-field-group">
            <label className="field-label">Linkedin</label>
            <input
              type="text"
              className={`profile-text-input w-100 ${step4Errors.linkedinUrl ? "input-error" : ""}`}
              placeholder="Enter URL"
              value={linkedinUrl}
              onChange={(e) => { setLinkedinUrl(e.target.value); setStep4Errors((p) => ({ ...p, linkedinUrl: "" })); }}
            />
            {step4Errors.linkedinUrl && <span className="field-error">{step4Errors.linkedinUrl}</span>}
          </div>

          {/* Resume */}
          <div className="profile-field-group">
            <label className="field-label">Resume</label>
            <label
              htmlFor="resume-file-input"
              className={`profile-file-upload-box d-flex align-items-center justify-content-between w-100 ${step4Errors.resumeFile ? "input-error" : ""}`}
              style={{ cursor: "pointer" }}
            >
              <span className={`file-upload-text ${resumeFile ? "text-dark" : "text-placeholder"}`}>
                {resumeFile ? resumeFile.name : "Upload PDF"}
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
        </div>

        {/* Continue Button */}
        <div className="profile-form-actions mt-auto d-flex justify-content-end flex-shrink-0">
          <div className="continue-btn-wrapper">
            <PrimaryButton
              type="submit"
              disabled={!isStep4Complete}
              text={
                <span className="btn-content text-white d-inline-flex align-items-center gap-2">
                  <span>Continue</span>
                  <Icon name="ArrowRight" size={18} color="#ffffff" />
                </span>
              }
            />
          </div>
        </div>
      </form>
    </div>
  );

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const renderStep5 = () => (
    <div className="profile-form-section flex-grow-1 d-flex flex-column justify-content-between min-vh-0">
      <div className="profile-section-heading flex-shrink-0">
        <h2 className="section-title fw-bold">Review & Submit</h2>
        <p className="section-subtitle text-secondary">Review your information before continuing</p>
      </div>

      <form className="profile-form d-flex flex-column justify-content-between flex-grow-1" onSubmit={handleFinalSubmit}>
        <div className="d-flex flex-column gap-3 mt-1">
          {/* Basic Information Review Box */}
          <div className="review-summary-card d-flex align-items-center justify-content-between w-100">
            <span className="review-summary-title fw-bold">Basic Information</span>
            <span className="review-edit-btn fw-bold" onClick={() => setCurrentStep(1)} role="button">
              Edit
            </span>
          </div>

          {/* Professional Information Review Box */}
          <div className="review-summary-card d-flex align-items-center justify-content-between w-100">
            <span className="review-summary-title fw-bold">Professional Information</span>
            <span className="review-edit-btn fw-bold" onClick={() => setCurrentStep(2)} role="button">
              Edit
            </span>
          </div>

          {/* Skills Review Box */}
          <div className="review-summary-card d-flex align-items-center justify-content-between w-100">
            <span className="review-summary-title fw-bold">Skills</span>
            <span className="review-edit-btn fw-bold" onClick={() => setCurrentStep(3)} role="button">
              Edit
            </span>
          </div>

          {/* Portfolio and links Review Box */}
          <div className="review-summary-card d-flex align-items-center justify-content-between w-100">
            <span className="review-summary-title fw-bold">Portfolio and links</span>
            <span className="review-edit-btn fw-bold" onClick={() => setCurrentStep(4)} role="button">
              Edit
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="profile-form-actions mt-auto d-flex justify-content-end flex-shrink-0">
          <div className="continue-btn-wrapper">
            <PrimaryButton
              type="submit"
              text={<span className="btn-content text-white justify-content-center fw-bold">Submit</span>}
            />
          </div>
        </div>
      </form>
    </div>
  );

  const renderCompletionScreen = () => (
    <div className="completion-screen-wrapper d-flex flex-column align-items-center h-100 w-100 py-1">
      {/* Top Left Back Button */}
      <div className="w-100 d-flex justify-content-start flex-shrink-0 mb-1">
        <button
          type="button"
          className="completion-back-btn"
          onClick={() => setIsSubmitted(false)}
          aria-label="Go back"
        >
          <Icon name="ArrowLeft" size={24} color="#103CA4" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="d-flex flex-column align-items-center w-100 my-auto">
        {/* User Avatar Circle */}
        <div className="completion-avatar-circle d-flex align-items-center justify-content-center mb-3">
          <Icon name="User2" size={44} color="#103CA4" />
        </div>

        {/* Title */}
        <h1 className="completion-main-title fw-bold text-center mb-3">
          Profile Setup Completed<br />Successfully !
        </h1>

        {/* Reward Banner */}
        <div className="completion-reward-banner text-start mb-4 w-100">
          <h3 className="reward-banner-title fw-bold mb-1">Profile Completed</h3>
          <p className="reward-banner-subtitle mb-0">You have earned +20 trust points!</p>
        </div>

        {/* Trust Points Stepper Roadmap */}
        <div className="completion-stepper-container position-relative w-100 mb-4">
          <div className="completion-stepper position-relative d-flex align-items-start justify-content-between w-100">
            {/* Track Line */}
            <div className="completion-track-line position-absolute">
              <div className="completion-active-line" style={{ width: "33.33%" }}></div>
            </div>

            {/* Step 1: Email Verified */}
            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle active d-flex align-items-center justify-content-center">
                <span className="dot-white"></span>
              </div>
              <span className="completion-step-title fw-bold text-dark mt-2">Email Verified</span>
              <span className="completion-step-points fw-bold text-primary">+10 Trust Points</span>
            </div>

            {/* Step 2: Profile Completed */}
            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle active d-flex align-items-center justify-content-center">
                <span className="dot-white"></span>
              </div>
              <span className="completion-step-title fw-bold text-dark mt-2">Profile Completed</span>
              <span className="completion-step-points fw-bold text-primary">+20 Trust Points</span>
            </div>

            {/* Step 3: Identity Verified */}
            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle locked d-flex align-items-center justify-content-center">
                <Icon name="Lock" size={16} color="#9ca3af" />
              </div>
              <span className="completion-step-title text-muted mt-2">Identity Verified</span>
              <span className="completion-step-points text-muted">+40 Trust Points</span>
            </div>

            {/* Step 4: First Project/ Proposal */}
            <div className="completion-step-item d-flex flex-column align-items-center">
              <div className="completion-circle locked d-flex align-items-center justify-content-center">
                <Icon name="Lock" size={16} color="#9ca3af" />
              </div>
              <span className="completion-step-title text-muted mt-2">First Project/ Proposal</span>
              <span className="completion-step-points text-muted">+30 Trust Points</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="completion-cta-wrapper d-flex justify-content-center mt-2">
          <button type="button" className="completion-cta-btn border-0 text-white fw-bold d-inline-flex align-items-center justify-content-center">
            Continue to Verify Identity
          </button>
        </div>
      </div>
    </div>
  );

<<<<<<< HEAD
=======
>>>>>>> 618466b (feat : Updated Profile Page)
=======
>>>>>>> 8a51e02 (feat: Profile Page)
  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="main-workspace d-flex flex-column h-100">
        <Cards className="header-card flex-shrink-0" padding="0">
          <header className="header">
            <div className="header-search-bar">
              <Icon name="Search" size={16} className="search-icon" />
              <input type="text" placeholder="Search for Clients, projects or freelancers.." className="search-input" />
            </div>
            <div className="header-actions">
              <button className="icon-btn"><Icon name="Bell" size={20} /></button>
              <button className="icon-btn"><Icon name="Mail" size={20} /></button>
              <div className="header-avatar">A</div>
            </div>
          </header>
        </Cards>

        <div className="profile-page-wrapper flex-grow-1 min-vh-0 d-flex flex-column w-100">
          <Cards className="profile-main-card flex-grow-1 h-100 d-flex flex-column overflow-hidden w-100" padding="0">
<<<<<<< HEAD
<<<<<<< HEAD
            <div className="profile-card-inner d-flex flex-column h-100">

              {isSubmitted ? (
                renderCompletionScreen()
              ) : (
                <>
                  {/* Header */}
                  <div className="profile-header-section flex-shrink-0">
                    <h1 className="profile-main-title fw-bold">Complete Your Profile</h1>
                    <p className="profile-main-subtitle text-secondary">Lets build your profile step by step.</p>
                  </div>

                  {/* Stepper */}
                  {renderStepper()}

                  {/* Step Content */}
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                  {currentStep === 4 && renderStep4()}
                  {currentStep === 5 && renderStep5()}
                </>
              )}
=======
            <div className="profile-card-inner d-flex flex-column justify-content-between h-100 overflow-hidden">
=======
            <div className="profile-card-inner d-flex flex-column h-100">
>>>>>>> 8a51e02 (feat: Profile Page)

              {isSubmitted ? (
                renderCompletionScreen()
              ) : (
                <>
                  {/* Header */}
                  <div className="profile-header-section flex-shrink-0">
                    <h1 className="profile-main-title fw-bold">Complete Your Profile</h1>
                    <p className="profile-main-subtitle text-secondary">Lets build your profile step by step.</p>
                  </div>

                  {/* Stepper */}
                  {renderStepper()}

<<<<<<< HEAD
              {/* Step Content */}
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
>>>>>>> 618466b (feat : Updated Profile Page)
=======
                  {/* Step Content */}
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                  {currentStep === 4 && renderStep4()}
                  {currentStep === 5 && renderStep5()}
                </>
              )}
>>>>>>> 8a51e02 (feat: Profile Page)

            </div>
          </Cards>
        </div>
      </main>
    </div>
  );
}
