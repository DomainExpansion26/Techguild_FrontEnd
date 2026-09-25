/**
 * Application centralized string constants, UI copy, options, form errors, and configuration.
 */

// =============================================================================
// 1. APPLICATION STATIC TEXT, HEADINGS, LABELS & DESCRIPTIONS
// =============================================================================

export const APP_STRINGS = {
  // Global & Common UI text
  COMMON: {
    APP_NAME: "Tech Guild",
    SAVE: "Save Changes",
    CANCEL: "Cancel",
    EDIT: "Edit",
    DELETE: "Delete",
    SUBMIT: "Submit",
    CONFIRM: "Confirm",
    BACK: "Back",
    NEXT: "Next",
    SEARCH_PLACEHOLDER: "Search...",
    LOADING: "Loading, please wait...",
    NO_DATA: "No data available.",
    VIEW_ALL: "View All",
    CLOSE: "Close",
  },

  // Authentication flows
  AUTH: {
    // Left hero screen / branding
    HOME_SCREEN: {
      TITLE_LINE1: "Every quest you complete",
      TITLE_LINE2_PREFIX: "builds your ",
      TITLE_HIGHLIGHT: "legacy",
      SUBTITLE_LINE1: "Join a guild of verified professionals.",
      SUBTITLE_LINE2: "complete quests. Earn ranks. Unlock Opportunities.",
      BRAND_TECH: "Tech",
      BRAND_GUILD: "Guild",
    },

    // Login screen
    LOGIN: {
      TITLE: "Welcome back",
      SUBTITLE: "Log in to continue your journey.",
      GOOGLE_BTN: "Continue with Google",
      GITHUB_BTN: "Continue with GitHub",
      DIVIDER_OR: "OR",
      EMAIL_LABEL: "Email Address",
      EMAIL_PLACEHOLDER: "Enter your email",
      PASSWORD_LABEL: "Password",
      PASSWORD_PLACEHOLDER: "Enter your password",
      REMEMBER_ME: "Remember me",
      FORGOT_PASSWORD_LINK: "Forgot Password ?",
      SUBMIT_BTN: "Log in",
      SUBMIT_BTN_LOADING: "Logging in...",
      FOOTER_PROMPT: "Dont have an account ?",
      FOOTER_LINK: "Sign up",
    },

    // Signup / Register screen
    SIGNUP: {
      TITLE: "Sign Up",
      SUBTITLE: "Start your TechGuild Journey",
      GOOGLE_BTN: "Continue with Google",
      GITHUB_BTN: "Continue with GitHub",
      DIVIDER_OR: "OR",
      FIRST_NAME_LABEL: "First Name",
      FIRST_NAME_PLACEHOLDER: "First Name",
      LAST_NAME_LABEL: "Last Name",
      LAST_NAME_PLACEHOLDER: "Last Name",
      EMAIL_LABEL: "Email Address",
      EMAIL_PLACEHOLDER: "Enter your email",
      PASSWORD_LABEL: "Password",
      PASSWORD_PLACEHOLDER: "Enter your password",
      PASSWORD_SHOW_LABEL: "Show password",
      PASSWORD_HIDE_LABEL: "Hide password",
      TERMS_AGREE_PREFIX: "I agree to the",
      TERMS_LINK_TEXT: "TechGuild User Agreement",
      TERMS_AND_TEXT: "and",
      PRIVACY_LINK_TEXT: "Privacy Policy",
      SUBMIT_BTN: "Join TechGuild",
      SUBMIT_BTN_LOADING: "Creating Account...",
      FOOTER_PROMPT: "Already have an account ?",
      FOOTER_LINK: "Login",
    },

    // Forgot password screen
    FORGOT_PASSWORD: {
      TITLE: "Forgot Password ?",
      SUBTITLE: "Enter your email address and we'll send you a link to reset your password.",
      EMAIL_LABEL: "Email Address",
      EMAIL_PLACEHOLDER: "Enter your email",
      SUBMIT_BTN: "Send Reset Link",
      SUBMIT_BTN_LOADING: "Sending link...",
      DIVIDER_OR: "OR",
      GOOGLE_BTN: "Continue with Google",
      GITHUB_BTN: "Continue with GitHub",
      FOOTER_PROMPT: "Remember your password ?",
      FOOTER_LINK: "Log In",
      SUCCESS: {
        TITLE: "Reset Link Sent !",
        DESC_PREFIX: "We’ve sent a password reset link to",
        OPEN_EMAIL_BTN: "Go to gmail inbox",
      },
    },

    // Reset password screen
    RESET_PASSWORD: {
      TITLE: "Reset Your Password",
      SUBTITLE_LINE1: "Enter your new password below.",
      SUBTITLE_LINE2: "Make sure it's strong and unique.",
      NEW_PASSWORD_LABEL: "New Password",
      NEW_PASSWORD_PLACEHOLDER: "Enter new password",
      CONFIRM_PASSWORD_LABEL: "Confirm New Password",
      CONFIRM_PASSWORD_PLACEHOLDER: "Confirm your new password",
      RULES: {
        MIN_LENGTH: "Must be at least 8 characters",
        UPPERCASE: "Must contain an uppercase letter",
        NUMBER: "Must contain a number",
      },
      SUBMIT_BTN: "Reset Password",
      SUBMIT_BTN_LOADING: "Updating...",
      BACK_TO_LOGIN: "Back to log in",
      SUCCESS: {
        TITLE: "Password reset successful !",
        DESC: "Your password has been updated successfully.",
        CONTINUE_BTN: "Continue to Log in",
        BACK_HOME: "Back to Home",
      },
    },

    // Verify email screen (waiting state)
    VERIFY_EMAIL: {
      TITLE: "Verify Your Email To Continue.",
      INFO_SENT: "We just sent an email to the address :",
      INFO_INSTRUCTIONS: "Please check your email and click the link provided to verify your email address.",
      SEND_AGAIN_BTN: "Send Again",
      SENDING_BTN: "Sending...",
      OPEN_EMAIL_BTN: "Go to Gmail Inbox",
      TRUST_LINE1: "Build trust, unlock more opportunities,",
      TRUST_LINE2: "Earn Trust Points !",
      RESEND_SUCCESS: "Verification email resent successfully!",
      RESEND_FAILED: "Failed to resend verification email.",
      NO_EMAIL: "We couldn't find your email address. Please sign up again.",
    },

    // Email verified confirmation screen
    EMAIL_VERIFIED: {
      VERIFYING_TITLE: "Verifying your email...",
      SUCCESS_TITLE: "Email Verified Successfully !",
      REWARD_TITLE: "Email Verified",
      REWARD_SUBTITLE: "You have earned +10 trust points!",
      STEPS: {
        EMAIL_VERIFIED_TITLE: "Email Verified",
        EMAIL_VERIFIED_POINTS: "+10 Trust Points",
        PROFILE_COMPLETED_TITLE: "Profile Completed",
        PROFILE_COMPLETED_POINTS: "+20 Trust Points",
        IDENTITY_VERIFIED_TITLE: "Identity Verified",
        IDENTITY_VERIFIED_POINTS: "+40 Trust Points",
        FIRST_PROJECT_TITLE: "First Project/ Proposal",
        FIRST_PROJECT_POINTS: "+30 Trust Points",
      },
      CONTINUE_BTN: "Continue to account type",
      INVALID_TOKEN_ERROR: "Verification link is invalid or expired.",
    },

    // Account type selection screen
    ACCOUNT_TYPE: {
      TITLE: "Choose Your Account Type",
      SUBTITLE: "Select the option that best describes you",
      CONTINUE_BTN: "Continue",
      PROCESSING_BTN: "Processing...",
      TYPES: {
        INDIVIDUAL: {
          ID: "individual",
          TITLE: "Individual",
          DESCRIPTION: "I am a freelancer or independent professional looking for projects and opportunities.",
          POINTS: [
            "Work on exciting projects",
            "Build your professional reputation",
            "Grow your career",
          ],
        },
        AGENCY: {
          ID: "agency",
          TITLE: "Agency",
          DESCRIPTION: "I represent an agency or company providing professional services.",
          POINTS: [
            "Manage your team",
            "Find new clients",
            "Scale your business",
          ],
        },
        CLIENT: {
          ID: "client",
          TITLE: "Client",
          DESCRIPTION: "I am a business or individual looking to hire professionals for projects.",
          POINTS: [
            "Post projects",
            "Hire verified professionals",
            "Get work done faster",
          ],
        },
      },
    },

    // OAuth callback screen
    OAUTH: {
      ERROR_TITLE: "Authentication Error",
      RETURN_TO_LOGIN: "Return to Login",
      LOADING_TEXT: "Authenticating with provider...",
      DEFAULT_ERROR: "Failed to authenticate with OAuth provider",
    },

    // Two-factor login challenge screen (Figma: "for 6- digit code" / "for 8 digit code")
    TWO_FACTOR: {
      TITLE: "Enter your code",
      SUBTITLE_AUTHENTICATOR: "Enter 6 Digit code from your Authenticator app",
      SUBTITLE_RECOVERY: "Enter 8 Digit code from your Authenticator app",
      AUTHENTICATOR_OPTION: "Select from Authenticator App",
      RECOVERY_OPTION: "Select from Recovery codes",
      SUBMIT_BTN: "Verify & Save",
      SUBMIT_BTN_LOADING: "Verifying...",
    },
  },

  // Profile section (Individual / Client / Agency)
  PROFILE: {
    PAGE_TITLE: "Guild Profile",
    PAGE_SUBTITLE: "Manage your adventurer card, credentials, and achievements",
    PERSONAL_INFO_TAB: "Personal Details",
    EXPERIENCE_TAB: "Experience & Quests",
    SKILLS_TAB: "Skill Matrix",
    PORTFOLIO_TAB: "Portfolio / Projects",
    RESUME_TAB: "Resume & Documents",
    RESUME_UPLOAD_HINT: "Upload PDF or DOCX (Max 5MB)",
    AVATAR_UPLOAD_HINT: "Upload PNG, JPG or WEBP (Max 2MB)",

    // Individual Setup Wizard
    WIZARD: {
      MAIN_TITLE: "Complete Your Profile",
      MAIN_SUBTITLE: "Lets build your profile step by step.",
      STEPS: {
        STEP_1_LABEL: "Basic Information",
        STEP_1_TITLE: "Basic Information",
        STEP_1_SUBTITLE: "Add your basic details.",
        STEP_2_LABEL: "Professional Information",
        STEP_2_TITLE: "Professional Information",
        STEP_2_SUBTITLE: "Tell us about your professional background",
        STEP_3_LABEL: "Skills",
        STEP_3_TITLE: "Skills",
        STEP_3_SUBTITLE: "Add your skills and expertise",
        STEP_4_LABEL: "Portfolio and links",
        STEP_4_TITLE: "Portfolio and links",
        STEP_4_SUBTITLE: "Add your portfolio and social links",
        STEP_5_LABEL: "Review and Submit",
        STEP_5_TITLE: "Review & Submit",
        STEP_5_SUBTITLE: "Review your information before continuing",
      },
      LABELS: {
        PROFILE_PICTURE: "Profile picture",
        FULL_NAME: "Full name",
        COUNTRY: "Country",
        TIME_ZONE: "Time Zone",
        HEADLINE: "Headline",
        BIO: "Bio",
        EXPERIENCE_LEVEL: "Experience Level",
        AVAILABILITY: "Availability",
        SKILLS: "Skills",
        TOOLS: "Tools",
        CATEGORIES: "Categories",
        PORTFOLIO_WEBSITE: "Portfolio website",
        GITHUB: "Github",
        LINKEDIN: "Linkedin",
        RESUME: "Resume",
      },
      PLACEHOLDERS: {
        UPLOAD_PHOTO: "Upload photo",
        FULL_NAME: "Enter your full name",
        SELECT_COUNTRY: "Select your country",
        SELECT_TIME_ZONE: "Select your time zone",
        HEADLINE: "e.g. UI/UX Designer",
        BIO: "Write a short bio about yourself",
        SELECT_EXPERIENCE: "Select experience level",
        SELECT_AVAILABILITY: "Select availability",
        SKILLS: "Add skills",
        TOOLS: "Add tools",
        CATEGORIES: "Add categories",
        ENTER_URL: "Enter URL",
        UPLOAD_PDF: "Upload PDF",
      },
      BUTTONS: {
        SAVE_CHANGES: "Save Changes",
        CONTINUE: "Continue",
        CANCEL: "Cancel",
        SUBMIT: "Submit",
        EDIT: "Edit",
      },
      COMPLETION: {
        MAIN_TITLE_LINE1: "Profile Setup Completed",
        MAIN_TITLE_LINE2: "Successfully !",
        BANNER_TITLE: "Profile Completed",
        BANNER_SUBTITLE: "You have earned +20 trust points!",
        TRUST_POINTS_SUFFIX: "Trust Points",
        CTA_BUTTON: "Continue to Verify Identity",
      },
    },
  },

  // Dashboard & Navigation
  DASHBOARD: {
    WELCOME_BACK: "Welcome back",
    ACTIVE_QUESTS: "Active Quests",
    AVAILABLE_QUESTS: "Available Quests",
    RECENT_ACTIVITIES: "Recent Activities",
    EARNINGS_OVERVIEW: "Earnings Overview",
    INDIVIDUAL: {
      METRICS: {
        ACTIVE_QUESTS_TITLE: "Active Quests",
        ACTIVE_QUESTS_DESC: "You don't have any active projects yet",
        APPLICATION_SENT_TITLE: "Application Sent",
        APPLICATION_SENT_DESC: "You haven't sent any proposals yet",
        TOTAL_EARNINGS_TITLE: "Total Earnings",
        TOTAL_EARNINGS_DEFAULT: "₹0",
        TOTAL_EARNINGS_DESC: "Your earnings will appear here once you start working",
        TOTAL_REVIEWS_TITLE: "Total Reviews",
        TOTAL_REVIEWS_DESC: "Reviews from clients will appear here",
      },
      ACTIVITY: {
        RECENT_ACTIVITY_HEADER: "Recent Activity",
        NO_RECENT_ACTIVITY_TITLE: "No recent activity",
        NO_RECENT_ACTIVITY_DESC: "Your activity will appear here.",
        NO_QUESTS_TITLE: "No Quests yet",
        NO_QUESTS_DESC: "Browse projects that match your skills and send your first proposal.",
        BROWSE_QUESTS_BUTTON: "Browse Quests",
      },
      TIP_BANNER: {
        MESSAGE: "Tip: Freelancers who complete their profiles and get verified are 5x more likely to get hired.",
        ACTION_TEXT: "Complete Your Profile >",
      },
    },
    WELCOME_BANNER: {
      GREETING_PREFIX: "Welcome to TechGuild",
      SUBTITLE: "Complete your profile to stand out",
      DESCRIPTION: "Finish these steps to improve your chances of getting hired.",
      ACTION_BUTTON: "Complete profile",
      PROGRESS_DEFAULT: "0 of 4 steps completed",
      STEP_BASIC_INFO: "Basic Information",
      STEP_SKILLS: "Add Skills",
      STEP_PORTFOLIO: "Add Portfolio",
      STEP_VERIFY: "Verify Identity",
    },
  },

  // Quest Board & Tasks
  QUESTS: {
    BOARD_TITLE: "Quest Board",
    BOARD_SUBTITLE: "Browse and apply for active guild quests",
    CREATE_QUEST: "Post a Quest",
    APPLY_NOW: "Apply for Quest",
    FILTER_BY_CATEGORY: "Filter by Category",
    FILTER_BY_BUDGET: "Filter by Budget",
    FILTER_BY_SKILL: "Filter by Skill",
  },

  // Cards defaults and static labels
  CARDS: {
    GUILD: {
      BRAND_FIRST: "Tech",
      BRAND_SECOND: "Guild",
      BADGE_LABEL: "GUILD CARD",
      VERIFIED_CLIENT: "VERIFIED CLIENT",
      LABEL_GUILD_ID: "GUILD ID",
      LABEL_MEMBER_SINCE: "MEMBER SINCE",
      PREFIX_WEBSITE: "Website:",
      DEFAULT_NAME: "Nexora Solutions",
      DEFAULT_CATEGORY: "HEALTHCARE COMPANY",
      DEFAULT_INITIALS: "NS",
      DEFAULT_LOCATION: "Pune, Maharashtra, India",
      DEFAULT_WEBSITE: "nexorspvtlmt.com",
      DEFAULT_RANK: "F",
      DEFAULT_GUILD_ID: "IND-MH-01-072026",
      DEFAULT_MEMBER_SINCE: "July 2026",
    },
    TRUST: {
      DEFAULT_TITLE: "Trust Points",
      DEFAULT_UNIT: "TP",
      DEFAULT_RANK: "Rank F",
      DEFAULT_BADGE: "Email Verified",
      DEFAULT_DESC: "Trust Points increase as you complete your profile, finish projects, and receive client reviews.",
      DEFAULT_LINK_TEXT: "View Trust History",
    },
    EMPTY_STATE: {
      DEFAULT_TITLE: "No Data Available",
      DEFAULT_DESC: "There are no records to display at this moment.",
    },
  },

  // Settings & Account
  SETTINGS: {
    TITLE: "Settings",
    ACCOUNT_SETTINGS: "Account Settings",
    SECURITY_SETTINGS: "Security & Privacy",
    NOTIFICATION_SETTINGS: "Notification Preferences",
    SIGN_OUT_TITLE: "Sign Out",
    SIGN_OUT_CONFIRMATION: "Are you sure you want to sign out from your account?",
  },
};

// =============================================================================
// 2. DROPDOWN OPTIONS & STATUS DEFINITIONS
// =============================================================================

// Account and User Types
export const ACCOUNT_TYPES = {
  INDIVIDUAL: "individual",
  CLIENT: "client",
  AGENCY: "agency",
};

// Experience levels for profiles and job filters
export const EXPERIENCE_LEVEL_OPTIONS = [
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior (5-8 years)" },
  { value: "expert", label: "Expert (8+ years)" },
];

// Availability options for freelancers / profiles
export const AVAILABILITY_OPTIONS = [
  { value: "full-time", label: "Full-time (40 hrs/week)" },
  { value: "part-time", label: "Part-time (20 hrs/week)" },
  { value: "hourly", label: "Hourly / As needed" },
  { value: "weekends", label: "Weekends only" },
];

// Country list
export const COUNTRY_OPTIONS = [
  { value: "India", label: "India" },
  { value: "United States", label: "United States" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Japan", label: "Japan" },
];

// Time zone list
export const TIME_ZONE_OPTIONS = [
  { value: "(UTC+05:30) India Standard Time", label: "(UTC+05:30) India Standard Time" },
  { value: "(UTC-05:00) Eastern Time (US & Canada)", label: "(UTC-05:00) Eastern Time (US & Canada)" },
  { value: "(UTC-08:00) Pacific Time (US & Canada)", label: "(UTC-08:00) Pacific Time (US & Canada)" },
  { value: "(UTC+00:00) Greenwich Mean Time", label: "(UTC+00:00) Greenwich Mean Time" },
  { value: "(UTC+01:00) Central European Time", label: "(UTC+01:00) Central European Time" },
  { value: "(UTC+09:00) Japan Standard Time", label: "(UTC+09:00) Japan Standard Time" },
];

// Profile setup completion milestones
export const PROFILE_COMPLETION_MILESTONES = [
  { id: 1, title: "Email Verified", points: 10, completed: true },
  { id: 2, title: "Profile Completed", points: 20, completed: true },
  { id: 3, title: "Identity Verified", points: 40, completed: false },
  { id: 4, title: "First Project/ Proposal", points: 30, completed: false },
];

// Quest / Task status definitions and badge styling
export const QUEST_STATUS_OPTIONS = [
  { value: "draft", label: "Draft", badgeClass: "badge-gray" },
  { value: "open", label: "Open for Bidding", badgeClass: "badge-blue" },
  { value: "in_progress", label: "In Progress", badgeClass: "badge-yellow" },
  { value: "review", label: "Under Review", badgeClass: "badge-purple" },
  { value: "completed", label: "Completed", badgeClass: "badge-green" },
  { value: "cancelled", label: "Cancelled", badgeClass: "badge-red" },
];

// Project / Quest categories
export const QUEST_CATEGORY_OPTIONS = [
  { value: "frontend", label: "Frontend Development" },
  { value: "backend", label: "Backend & APIs" },
  { value: "fullstack", label: "Full Stack Development" },
  { value: "mobile", label: "Mobile App Development" },
  { value: "ui_ux", label: "UI / UX Design" },
  { value: "devops", label: "DevOps & Cloud Infrastructure" },
  { value: "ai_ml", label: "AI & Machine Learning" },
  { value: "blockchain", label: "Web3 & Blockchain" },
];

// Currency options
export const CURRENCY_OPTIONS = [
  { value: "INR", label: "₹ INR (Indian Rupee)", symbol: "₹" },
  { value: "USD", label: "$ USD (US Dollar)", symbol: "$" },
  { value: "EUR", label: "€ EUR (Euro)", symbol: "€" },
  { value: "GBP", label: "£ GBP (British Pound)", symbol: "£" },
];

// Gender / Pronoun options
export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non_binary", label: "Non-Binary" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

// =============================================================================
// 3. TOAST & NOTIFICATION MESSAGES
// =============================================================================

export const TOAST_MESSAGES = {
  PROFILE: {
    UPDATE_SUCCESS: "Profile updated successfully!",
    AVATAR_SUCCESS: "Profile picture uploaded successfully!",
    RESUME_SUCCESS: "Resume uploaded successfully!",
    SKILL_ADDED: "Skill added to your guild card.",
  },
  AUTH: {
    LOGIN_SUCCESS: "Signed in successfully! Welcome back.",
    REGISTER_SUCCESS: "Registration successful! Please check your email inbox to verify your account.",
    LOGOUT_SUCCESS: "You have been logged out successfully.",
    PASSWORD_RESET_SENT: "Password reset link sent to your email.",
    PASSWORD_CHANGE_SUCCESS: "Password changed successfully!",
    VERIFY_EMAIL_REQUIRED: "Please verify your email address first before logging in. Check your inbox.",
    RESEND_SUCCESS: "Verification email resent successfully!",
    WELCOME_ROLE: (role) => `Welcome to TechGuild as a ${role}!`,
    TWO_FA_SUCCESS: "Two-factor verification successful! Welcome back.",
    TWO_FA_CHALLENGE_MISSING: "Your verification session expired. Please log in again.",
  },
  QUESTS: {
    APPLIED_SUCCESS: "Your quest application has been submitted!",
    CREATED_SUCCESS: "Quest created and posted to the board!",
    UPDATED_SUCCESS: "Quest details updated successfully!",
  },
  ERROR: {
    GENERIC: "Something went wrong. Please try again later.",
    NETWORK_ERROR: "Unable to connect to server. Please check your network.",
    UNAUTHORIZED: "Your session has expired. Please log in again.",
    FORBIDDEN: "You do not have permission to perform this action.",
  },
};

// Form validation feedback messages
export const FORM_ERRORS = {
  REQUIRED: "This field is required.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_PHONE: "Please enter a valid phone number.",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters.",
  PASSWORDS_MUST_MATCH: "Passwords do not match.",
  FILE_TOO_LARGE: (maxMb) => `File size must not exceed ${maxMb}MB.`,
  INVALID_FILE_FORMAT: (formats) => `Allowed formats: ${formats.join(", ")}.`,
  URL_INVALID: "Please enter a valid URL (e.g. https://example.com).",
  AUTH: {
    NAME_REQUIRED: "Please enter both First Name and Last Name.",
    EMAIL_PASSWORD_REQUIRED: "Please enter both Email and Password.",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters.",
    PASSWORDS_MUST_MATCH: "Passwords do not match.",
    TERMS_REQUIRED: "Please accept the Terms of Service & Privacy Policy to continue.",
    ACCOUNT_TYPE_REQUIRED: "Please select an account type to continue.",
    INVALID_CREDENTIALS: "Invalid email or password. Please try again.",
    REGISTER_FAILED: "Failed to create account. Please check your credentials.",
    FORGOT_FAILED: "Failed to send reset email. Please try again.",
    RESET_FAILED: "Failed to reset password. Link may be invalid or expired.",
    VERIFY_FAILED: "Verification link is invalid or expired.",
    RESEND_FAILED: "Failed to resend verification email.",
    ACCOUNT_TYPE_FAILED: "Failed to set account type. Please try again.",
    TWO_FA_FAILED: "The code you entered is incorrect. Please try again.",
    TWO_FA_INCOMPLETE: "Please enter the complete code.",
  },
  PROFILE: {
    PHOTO_REQUIRED: "Profile picture is required",
    FULL_NAME_REQUIRED: "Full name is required",
    COUNTRY_REQUIRED: "Country is required",
    TIME_ZONE_REQUIRED: "Time zone is required",
    HEADLINE_REQUIRED: "Headline is required",
    BIO_REQUIRED: "Bio is required",
    EXPERIENCE_REQUIRED: "Experience level is required",
    AVAILABILITY_REQUIRED: "Availability is required",
    SKILLS_REQUIRED: "Skills are required",
    TOOLS_REQUIRED: "Tools are required",
    CATEGORIES_REQUIRED: "Categories are required",
    PORTFOLIO_REQUIRED: "Portfolio URL is required",
    GITHUB_REQUIRED: "Github URL is required",
    LINKEDIN_REQUIRED: "Linkedin URL is required",
    RESUME_REQUIRED: "Resume PDF is required",
  },
};

// =============================================================================
// 4. APP CONFIGURATION & LIMITS
// =============================================================================

export const APP_CONFIG = {
  APP_NAME: "Tech Guild",
  SUPPORT_EMAIL: "support@techguild.io",
  HELP_CENTER_URL: "https://support.techguild.io",

  // File upload restrictions
  UPLOADS: {
    MAX_AVATAR_SIZE_MB: 2,
    MAX_RESUME_SIZE_MB: 5,
    ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
    ALLOWED_RESUME_TYPES: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },

  // Pagination defaults
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50],
  },

  // Auth flow: storage keys, validation rules, timings
  AUTH: {
    STORAGE_KEYS: {
      PENDING_USER: "techguild_pending_user",
      REMEMBERED_EMAIL: "techguild_remembered_email",
      TWO_FA_CHALLENGE: "techguild_2fa_challenge",
    },
    PASSWORD_MIN_LENGTH: 8,
    /** Delay before navigating after a successful signup (lets the toast read) */
    SIGNUP_REDIRECT_DELAY_MS: 1000,
    /** Login-time 2FA challenge lengths: 6-digit TOTP, and 9 exact chars
        for recovery codes (e.g. "Zpp_-Sf2s" — mixed case, "_" and "-"
        included, sent verbatim — see TwoFactor.jsx). */
    TWO_FA_CODE_LENGTHS: {
      AUTHENTICATOR: 6,
      RECOVERY: 9,
    },
  },

  // Social / Community links
  SOCIAL_LINKS: {
    DISCORD: "https://discord.gg/techguild",
    TWITTER: "https://twitter.com/techguild",
    GITHUB: "https://github.com/techguild",
    LINKEDIN: "https://linkedin.com/company/techguild",
  },
};

export default APP_STRINGS;
