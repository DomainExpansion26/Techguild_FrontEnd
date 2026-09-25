// [TechGuild Update: 21-09-2026] Individual freelancer profile wizard & OpenAPI save integration
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout, Cards, PrimaryButton, SecondaryButton, TextInput, Stepper } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { profileApi } from "@/features/profile/api/profileApi";
import {
  APP_STRINGS,
  COUNTRY_OPTIONS,
  CITY_OPTIONS,
  TIME_ZONE_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  AVAILABILITY_OPTIONS,
  PROFILE_COMPLETION_MILESTONES,
  FORM_ERRORS,
} from "@/constants/string";
import { ICON_SIZES, FORM_SIZES } from "@/constants/sizes";
import "./profile.css";

const WELCOME_STRINGS = APP_STRINGS.PROFILE.WELCOME_SCREEN;
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

const ROLE_SUGGESTIONS_MAP = [
  {
    keywords: ["ui", "ux", "design", "figma", "product design", "visual"],
    skills: ["Figma", "User Research", "Design System", "Prototyping", "Sketch", "Wireframing", "Adobe XD", "Interaction Design", "Usability Testing"],
    tools: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "InVision", "Miro", "Zeplin", "Framer"],
    categories: ["UI/UX Design", "Product Design", "Web Design", "Mobile App Design", "Design Systems"],
  },
  {
    keywords: ["frontend", "front-end", "front end", "react", "vue", "angular", "web dev", "javascript", "typescript", "html", "css", "next"],
    skills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Next.js", "Tailwind CSS", "Redux", "REST API", "Vue.js"],
    tools: ["VS Code", "GitHub", "Chrome DevTools", "Vite", "Webpack", "Postman", "npm", "Figma", "Vercel"],
    categories: ["Frontend Development", "Web Development", "Single Page Applications", "UI Engineering", "Responsive Design"],
  },
  {
    keywords: ["backend", "back-end", "back end", "node", "python", "django", "java", "golang", "php", "laravel", "express", "database", "api"],
    skills: ["Node.js", "Express.js", "Python", "Django", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL", "Redis", "Docker"],
    tools: ["Postman", "Docker", "Git", "VS Code", "TablePlus", "DBeaver", "MongoDB Compass", "AWS", "Swagger"],
    categories: ["Backend & APIs", "Database Design", "Cloud & DevOps", "API Development", "Microservices Architecture"],
  },
  {
    keywords: ["fullstack", "full stack", "full-stack", "software engineer", "developer", "mern", "mean"],
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "Next.js", "MongoDB", "PostgreSQL", "Express.js", "Tailwind CSS", "REST APIs"],
    tools: ["VS Code", "GitHub", "Docker", "Postman", "Vite", "AWS", "Vercel", "npm"],
    categories: ["Full Stack Development", "Web Development", "Frontend Development", "Backend & APIs", "SaaS Applications"],
  },
  {
    keywords: ["mobile", "android", "ios", "flutter", "react native", "swift", "kotlin", "app"],
    skills: ["Flutter", "React Native", "Swift", "Kotlin", "Android Development", "iOS Development", "Dart", "Mobile UI", "Firebase"],
    tools: ["Android Studio", "Xcode", "VS Code", "Firebase Console", "Postman", "GitHub", "Figma"],
    categories: ["Mobile App Development", "Cross-Platform Apps", "iOS Development", "Android Development", "App Development"],
  },
  {
    keywords: ["ai", "machine learning", "ml", "data science", "deep learning", "nlp", "llm", "data"],
    skills: ["Machine Learning", "Deep Learning", "Python", "PyTorch", "TensorFlow", "NLP", "Computer Vision", "LLMs", "Data Analysis", "Pandas"],
    tools: ["Jupyter Notebook", "Google Colab", "Hugging Face", "VS Code", "Docker", "Git", "Weights & Biases"],
    categories: ["AI & Machine Learning", "Data Science", "Generative AI", "Natural Language Processing", "Computer Vision"],
  },
  {
    keywords: ["devops", "cloud", "aws", "azure", "docker", "kubernetes", "sre", "ci/cd", "infra"],
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux", "Jenkins", "Ansible", "GitHub Actions", "Prometheus"],
    tools: ["Docker", "Kubernetes", "AWS Console", "Terraform", "GitHub Actions", "Grafana", "VS Code"],
    categories: ["DevOps & Cloud Infrastructure", "Cloud Architecture", "Site Reliability Engineering", "CI/CD Automation"],
  },
  {
    keywords: ["qa", "test", "automation", "quality assurance", "tester"],
    skills: ["Manual Testing", "Automation Testing", "Selenium", "Cypress", "Playwright", "Jest", "API Testing", "Bug Tracking", "Test Cases"],
    tools: ["Postman", "Selenium", "Cypress", "Jira", "GitHub", "VS Code", "BrowserStack"],
    categories: ["Quality Assurance", "Test Automation", "Performance Testing", "Manual Testing"],
  },
];

const DEFAULT_SUGGESTED_SKILLS = [
  "Figma", "User Research", "Design System", "Prototyping", "Sketch"
];

const MASTER_SKILLS_LIST = [
  "Figma", "Figma UI", "Figma Design", "User Research", "Design System", "Prototyping", "Wireframing", "Sketch", "Adobe XD", "Interaction Design", "Usability Testing", "Information Architecture", "Visual Design",
  "React", "React.js", "React Native", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Vue.js", "Angular", "Svelte", "Redux", "Zustand", "GraphQL", "REST APIs",
  "Node.js", "Express.js", "NestJS", "Python", "Django", "FastAPI", "Flask", "Java", "Spring Boot", "Golang", "PHP", "Laravel", "Ruby on Rails", "C#", ".NET",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Firebase", "Prisma",
  "Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Git", "GitHub", "Terraform", "Linux",
  "Flutter", "Swift", "Kotlin", "Android Development", "iOS Development", "Dart",
  "Machine Learning", "Deep Learning", "Data Analysis", "NLP", "Computer Vision", "LLMs", "TensorFlow", "PyTorch", "Pandas", "Scikit-Learn",
  "Manual Testing", "Automation Testing", "Selenium", "Cypress", "Playwright", "Jest", "API Testing",
  "Cybersecurity", "Blockchain", "Solidity", "Web3", "SEO Optimization", "Content Writing", "Copywriting", "Project Management", "Agile", "Scrum"
];

const MASTER_TOOLS_LIST = [
  "Figma", "VS Code", "GitHub", "GitLab", "Postman", "Docker", "Jira", "Trello", "Notion", "Slack", "Adobe XD", "Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects", "Sketch", "InVision", "Framer", "Miro", "Zeplin", "Canva", "Linear", "Asana", "TablePlus", "DBeaver", "MongoDB Compass", "Vercel", "Netlify", "AWS Console", "Firebase", "Supabase", "Xcode", "Android Studio", "Postgres", "RedisInsight", "Swagger", "Jupyter Notebook", "Google Colab", "Chrome DevTools", "Webpack", "Vite", "npm", "Yarn", "pnpm"
];

const MASTER_CATEGORIES_LIST = [
  "UI/UX Design", "Product Design", "Web Design", "Mobile App Design", "Design Systems", "User Research", "Visual Design", "Frontend Development", "Backend & APIs", "Full Stack Development", "Web Development", "Mobile App Development", "iOS Development", "Android Development", "Cross-Platform Apps", "Application", "App Development", "Application Management", "Software Architecture", "API Development", "Database Design", "Cloud & DevOps", "DevOps & Cloud Infrastructure", "AI & Machine Learning", "Data Science", "Natural Language Processing", "Computer Vision", "Quality Assurance", "Test Automation", "Web3 & Blockchain", "Cybersecurity", "Technical Writing", "E-commerce Development", "SaaS Development"
];

const MASTER_LANGUAGES_LIST = [
  "English", "Hindi", "Spanish", "French", "German", "Japanese", "Mandarin Chinese", "Marathi", "Bengali", "Telugu", "Tamil", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Arabic", "Portuguese", "Russian", "Korean", "Italian"
];

const getRoleSuggestions = (headline) => {
  if (!headline || !headline.trim()) {
    return {
      skills: DEFAULT_SUGGESTED_SKILLS,
    };
  }
  const cleanHeadline = headline.toLowerCase();
  const matched = ROLE_SUGGESTIONS_MAP.find((entry) =>
    entry.keywords.some((kw) => cleanHeadline.includes(kw))
  );
  if (matched) {
    return {
      skills: matched.skills.slice(0, 6),
    };
  }
  return {
    skills: DEFAULT_SUGGESTED_SKILLS,
  };
};

function TagInput({
  label,
  placeholder,
  value = "",
  onChange,
  suggestions = [],
  error,
  id,
  extraContent,
}) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const tags = typeof value === "string"
    ? value.split(",").map((s) => s.trim()).filter(Boolean)
    : (Array.isArray(value) ? value : []);

  const setTags = (newTags) => {
    onChange(newTags.join(", "));
  };

  const addTag = (tagText) => {
    const trimmed = tagText.trim();
    if (!trimmed) return;
    const exists = tags.some((t) => t.toLowerCase() === trimmed.toLowerCase());
    if (!exists) {
      setTags([...tags, trimmed]);
    }
    setInputValue("");
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t.toLowerCase() !== tagToRemove.toLowerCase()));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  };

  const filteredSuggestions = suggestions.filter((item) => {
    const notSelected = !tags.some((t) => t.toLowerCase() === item.toLowerCase());
    if (!inputValue.trim()) {
      return notSelected;
    }
    return notSelected && item.toLowerCase().includes(inputValue.toLowerCase().trim());
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        if (inputValue.trim()) {
          addTag(inputValue);
        }
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputValue, tags]);

  return (
    <div className="profile-field-group" ref={containerRef}>
      {label && <label className="field-label" htmlFor={id}>{label}</label>}
      <div
        className={`profile-tag-input-box d-flex flex-wrap align-items-center position-relative w-100 ${error ? "input-error" : ""
          } ${isOpen ? "is-focused" : ""}`}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <span key={tag} className="profile-tag-pill d-inline-flex align-items-center">
            <span className="profile-tag-text">{tag}</span>
            <button
              type="button"
              className="profile-tag-pill-close d-inline-flex align-items-center justify-content-center"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          id={id}
          type="text"
          className="profile-tag-input-field grow border-0"
          placeholder={tags.length === 0 ? placeholder : ""}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />

        {isOpen && filteredSuggestions.length > 0 && (
          <div className="profile-suggestions-dropdown position-absolute w-100">
            {filteredSuggestions.slice(0, 8).map((suggestion) => (
              <div
                key={suggestion}
                className="profile-suggestion-item"
                onMouseDown={(e) => {
                  e.preventDefault();
                  addTag(suggestion);
                }}
              >
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {extraContent}

      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

const initialFormData = {
  profilePhoto: null,
  profilePhotoName: "",
  fullName: "",
  country: "",
  city: "",
  timeZone: "",
  headline: "",
  bio: "",
  experience: "",
  availability: "",
  skills: "",
  tools: "",
  categories: "",
  preferredLanguages: "",
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
      navigate("/dashboard");
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
    formData.city !== "" &&
    formData.timeZone !== "";
  const isStep2Complete =
    formData.headline.trim() !== "" &&
    formData.bio.trim() !== "" &&
    formData.experience !== "" &&
    formData.availability !== "";
  const isStep3Complete =
    formData.skills.trim() !== "" &&
    formData.tools.trim() !== "" &&
    formData.categories.trim() !== "" &&
    formData.preferredLanguages.trim() !== "";
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
    if (!formData.city) newErrors.city = ERRORS.CITY_REQUIRED || "City is required";
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
    if (!formData.preferredLanguages.trim()) newErrors.preferredLanguages = ERRORS.PREFERRED_LANGUAGES_REQUIRED || "Preferred languages are required";
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
        city: formData.city,
        time_zone: formData.timeZone,
        headline: formData.headline,
        timezone: formData.timeZone,
        experience_level: formData.experience,
        availability: formData.availability,
        skills: formData.skills ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
        tools: formData.tools ? formData.tools.split(",").map((t) => t.trim()).filter(Boolean) : [],
        categories: formData.categories ? formData.categories.split(",").map((c) => c.trim()).filter(Boolean) : [],
        preferred_languages: formData.preferredLanguages ? formData.preferredLanguages.split(",").map((l) => l.trim()).filter(Boolean) : [],
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
          <label className="field-label">{WIZARD_STRINGS.LABELS.CITY || "City"}</label>
          <div className={`custom-dropdown-box d-flex align-items-center position-relative w-100 ${errors.city ? "dropdown-error" : ""}`}>
            <select
              className="custom-dropdown-select w-100 h-100"
              value={formData.city}
              onChange={(e) => updateField("city", e.target.value)}
            >
              <option value="" disabled hidden>{WIZARD_STRINGS.PLACEHOLDERS.SELECT_CITY || "Select your city"}</option>
              {CITY_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.DEFAULT} className="dropdown-chevron-icon position-absolute" />
          </div>
          {errors.city && <span className="field-error">{errors.city}</span>}
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

  const renderStep3 = () => {
    const roleSuggestions = getRoleSuggestions(formData.headline);
    const currentSkills = formData.skills
      ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const handleToggleSkill = (skill) => {
      const exists = currentSkills.some((s) => s.toLowerCase() === skill.toLowerCase());
      if (exists) {
        const updated = currentSkills.filter((s) => s.toLowerCase() !== skill.toLowerCase());
        updateField("skills", updated.join(", "));
      } else {
        updateField("skills", [...currentSkills, skill].join(", "));
      }
    };

    return (
      <form className="profile-step-form grow d-flex flex-column min-vh-0 h-100" onSubmit={handleStep3Continue}>
        <div className="profile-section-heading shrink-0">
          <h2 className="section-title fw-bold">{WIZARD_STRINGS.STEPS.STEP_3_TITLE}</h2>
          <p className="section-subtitle text-secondary">{WIZARD_STRINGS.STEPS.STEP_3_SUBTITLE}</p>
        </div>

        <TagInput
          label={WIZARD_STRINGS.LABELS.SKILLS}
          placeholder={WIZARD_STRINGS.PLACEHOLDERS.SKILLS}
          value={formData.skills}
          error={errors.skills}
          onChange={(val) => updateField("skills", val)}
          suggestions={MASTER_SKILLS_LIST}
          id="profile-skills-input"
          extraContent={
            <div className="profile-suggested-skills-wrapper">
              <span className="profile-suggested-skills-title">
                {WIZARD_STRINGS.LABELS.SUGGESTED_SKILLS_ROLE || "Suggested skills based on your role"}
              </span>
              <div className="profile-suggested-chips-list">
                {roleSuggestions.skills.map((skill) => {
                  const isSelected = currentSkills.some((s) => s.toLowerCase() === skill.toLowerCase());
                  return (
                    <button
                      key={skill}
                      type="button"
                      className={`profile-suggested-chip-btn ${isSelected ? "selected" : ""}`}
                      onClick={() => handleToggleSkill(skill)}
                    >
                      <span className="chip-icon-symbol">{isSelected ? "✓" : "+"}</span>
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          }
        />

        <TagInput
          label={WIZARD_STRINGS.LABELS.TOOLS}
          placeholder={WIZARD_STRINGS.PLACEHOLDERS.TOOLS}
          value={formData.tools}
          error={errors.tools}
          onChange={(val) => updateField("tools", val)}
          suggestions={MASTER_TOOLS_LIST}
          id="profile-tools-input"
        />

        <TagInput
          label={WIZARD_STRINGS.LABELS.CATEGORIES}
          placeholder={WIZARD_STRINGS.PLACEHOLDERS.CATEGORIES}
          value={formData.categories}
          error={errors.categories}
          onChange={(val) => updateField("categories", val)}
          suggestions={MASTER_CATEGORIES_LIST}
          id="profile-categories-input"
        />

        <TagInput
          label={WIZARD_STRINGS.LABELS.PREFERRED_LANGUAGES || "Preferred Languages"}
          placeholder={WIZARD_STRINGS.PLACEHOLDERS.PREFERRED_LANGUAGES || "Select languages (e.g. English, Hindi)"}
          value={formData.preferredLanguages}
          error={errors.preferredLanguages}
          onChange={(val) => updateField("preferredLanguages", val)}
          suggestions={MASTER_LANGUAGES_LIST}
          id="profile-languages-input"
        />

        {renderActionButtons(isStep3Complete)}
      </form>
    );
  };

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

  const renderWelcomeScreen = () => (
    <div className="profile-welcome-wrapper">
      <div className="profile-welcome-container">
        {/* 1. Top Hero Card */}
        <Cards className="profile-welcome-hero-card" padding="0" shadow="none">
          <div className="profile-hero-illustration-wrapper">
            <div className="profile-hero-icon-container">
              <Icon name="IdCard" size={36} color="#103ca4" />
            </div>
          </div>

          <h1 className="profile-welcome-hero-title">
            {WELCOME_STRINGS.HERO.TITLE_PREFIX}
            <span className="profile-welcome-highlight">{WELCOME_STRINGS.HERO.TITLE_HIGHLIGHT}</span>
          </h1>

          <p className="profile-welcome-hero-subtitle">
            {WELCOME_STRINGS.HERO.SUBTITLE}
          </p>

          <PrimaryButton
            type="button"
            text={WELCOME_STRINGS.HERO.CTA_BUTTON}
            onClick={() => goToStep(1)}
            className="profile-welcome-cta-btn"
            id="btn-complete-your-profile"
          />

          <div className="profile-welcome-security-badge">
            <Icon name="Shield" size={ICON_SIZES.SM || 16} color="#64748b" />
            <span>{WELCOME_STRINGS.HERO.SECURITY_NOTE}</span>
          </div>
        </Cards>

        {/* 2. Section: Why complete your profile? */}
        <section className="profile-welcome-section">
          <h2 className="profile-welcome-section-title">
            {WELCOME_STRINGS.WHY_COMPLETE.SECTION_TITLE}
          </h2>

          <div className="profile-benefits-list">
            {WELCOME_STRINGS.WHY_COMPLETE.ITEMS.map((item) => (
              <Cards key={item.ID} className="profile-benefit-card" padding="0" shadow="none">
                <h3 className="profile-benefit-title">{item.TITLE}</h3>
                <p className="profile-benefit-desc">{item.DESCRIPTION}</p>
              </Cards>
            ))}
          </div>
        </section>

        {/* 3. Section: Profile setup in 4 simple steps */}
        <section className="profile-welcome-section">
          <h2 className="profile-welcome-section-title">
            {WELCOME_STRINGS.SETUP_STEPS.SECTION_TITLE}
          </h2>

          <Cards className="profile-steps-container-card" padding="0" shadow="none">
            <div className="profile-setup-stepper-row">
              {WELCOME_STRINGS.SETUP_STEPS.STEPS.map((stepItem, idx) => {
                const isLast = idx === WELCOME_STRINGS.SETUP_STEPS.STEPS.length - 1;
                return (
                  <div key={stepItem.STEP_NUMBER} className="profile-step-column">
                    <div className="profile-step-number-container">
                      <div className="profile-step-number-circle">
                        {stepItem.STEP_NUMBER}
                      </div>
                      {!isLast && <div className="profile-step-connector-line"></div>}
                    </div>

                    <div className="profile-step-info">
                      <h3 className="profile-step-item-title">{stepItem.TITLE}</h3>
                      <p className="profile-step-item-desc">{stepItem.DESCRIPTION}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Cards>
        </section>

        {/* 4. Footer Note */}
        <footer className="profile-welcome-footer-note">
          <Icon name="Lock" size={ICON_SIZES.SM || 14} color="#64748b" />
          <span>{WELCOME_STRINGS.FOOTER_NOTE}</span>
        </footer>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      {!step && !isSubmitted ? (
        renderWelcomeScreen()
      ) : (
        <div className="profile-page-wrapper grow min-vh-0 d-flex flex-column w-100">
          <Cards className="profile-main-card grow h-100 d-flex flex-column overflow-hidden w-100" padding="0" shadow="none">
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
      )}
    </DashboardLayout>
  );
}
