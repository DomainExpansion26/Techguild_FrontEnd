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

  const isStep1Complete = profilePhoto !== null && fullName.trim() !== "" && country !== "" && timeZone !== "";
  const isStep2Complete = headline.trim() !== "" && bio.trim() !== "" && experience !== "" && availability !== "";

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
              className={`stepper-item d-flex flex-column align-items-center position-relative ${
                step.number <= currentStep ? "active" : ""
              }`}
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
          <label className="field-label fw-semibold">Profile picture</label>
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
          <label className="field-label fw-semibold">Full name</label>
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
            <label className="field-label fw-semibold">Country</label>
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
            <label className="field-label fw-semibold">Time Zone</label>
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
          <label className="field-label fw-semibold">Headline</label>
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
          <label className="field-label fw-semibold">Bio</label>
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
            <label className="field-label fw-semibold">Experience Level</label>
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
            <label className="field-label fw-semibold">Availability</label>
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
            <div className="profile-card-inner d-flex flex-column justify-content-between h-100 overflow-hidden">

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

            </div>
          </Cards>
        </div>
      </main>
    </div>
  );
}
