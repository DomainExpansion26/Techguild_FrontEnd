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

  // Quest Board Flow
  QUEST_BOARD: {
    HEADER: {
      TITLE: "Quest Board",
      SUBTITLE_LINE1: "Create a trusted project and connect with verified professionals.",
      SUBTITLE_LINE2: "Define your requirements, set your milestones, and start building with confidence.",
    },
    ACTIONS: {
      START_CREATING_QUEST: "Start Creating Quest",
    },
    WELCOME_CARD: {
      BADGE: "GETTING STARTED",
      TITLE: "Welcome to Quest Creation",
      PARAGRAPH_1: "TechGuild is built on the pillars of transparency and institutional trust.",
      PARAGRAPH_2: 'By posting a "Quest," you aren\'t just listing a job, you\'re initiating a secure, milestone-driven collaboration.',
      PARAGRAPH_3: "Every Quest includes our mandatory Escrow protection, ensuring that funds are only released when you've approved the work delivered.",
      TAG_VERIFIED: "Verified Experts",
      TAG_ESCROW: "Escrow Protected",
    },
    BEFORE_YOU_BEGIN: {
      TITLE: "Before You Begin Make Sure :",
      CHECKLIST: [
        "Requirements are ready.",
        "Budget is estimated.",
        "Timeline is decided.",
        "Skills are identified.",
      ],
    },
    PROCESS: {
      TITLE: "How the Process Works",
      STEPS: [
        {
          STEP: 1,
          TITLE: "1. Create",
          DESCRIPTION: "Draft your scope, requirements, and milestones.",
          ICON: "FileText",
        },
        {
          STEP: 2,
          TITLE: "2. Choose",
          DESCRIPTION: "Our algorithm suggests you verified professionals.",
          ICON: "Users",
        },
        {
          STEP: 3,
          TITLE: "3. Fund",
          DESCRIPTION: "Secure the project by funding the escrow wallet.",
          ICON: "Lock",
        },
        {
          STEP: 4,
          TITLE: "4. Collaborate",
          DESCRIPTION: "Work together and release funds per milestone.",
          ICON: "CircleCheck",
        },
      ],
    },
    HELP_CARD: {
      TITLE: "Need Help?",
      DESCRIPTION: "Unsure about how to structure your escrow? Our guides cover best practices for client-contractor relations.",
      LINK_TEXT: "Contact Support",
    },
    WHY_POST: {
      TITLE: "Why Post a Quest on TechGuild?",
      BENEFITS: [
        {
          TITLE: "Trust-Based Ranking",
          DESCRIPTION: "View real-time reputation scores (F to S Rank) for every applicant.",
        },
        {
          TITLE: "Milestone Tracking",
          DESCRIPTION: "Break complex projects into manageable pieces with clear delivery gates.",
        },
        {
          TITLE: "Verified Professionals",
          DESCRIPTION: "Only engineers who pass our technical audits are eligible to apply.",
        },
        {
          TITLE: "Secure Escrow Protection",
          DESCRIPTION: "Your capital stays in a neutral vault until your technical criteria are met.",
        },
      ],
    },
    CREATE_QUEST: {
      HEADER: {
        TITLE: "Basic Information",
      },
      STEPS: [
        { number: 1, label: "Basic Info" },
        { number: 2, label: "Budget & Timeline" },
        { number: 3, label: "Review" },
        { number: 4, label: "Publish" },
      ],
      ESSENTIALS_CARD: {
        TITLE: "Quest Essentials",
        SUBTITLE: "Define the core identity of your technical project.",
        TITLE_LABEL: "Quest Title",
        TITLE_PLACEHOLDER: "Enterprise-Grade Multi-Tenant Dashboard",
        TITLE_VALID_MSG: "Great title! It's specific and professional.",
        TITLE_MAX_LEN: 80,
        DESC_LABEL: "Quest Description",
        DESC_PLACEHOLDER: "Explain the technical challenges, goals, and specific outcomes you expect from this quest...",
        DESC_HINT: "Provide context on architecture, legacy systems, and integration points.",
        DESC_MAX_LEN: 2000,
        CATEGORY_LABEL: "Category",
        CATEGORY_DEFAULT: "Full-Stack Web Development",
        CATEGORY_OPTIONS: [
          "Full-Stack Web Development",
          "Frontend Web Development",
          "Backend API & Services",
          "Mobile App Development",
          "DevOps & Cloud Architecture",
          "AI & Machine Learning",
          "Blockchain & Smart Contracts",
        ],
        COMPLEXITY_LABEL: "Project Complexity",
        COMPLEXITIES: [
          {
            ID: "beginner",
            TITLE: "Beginner",
            DESCRIPTION: "Simple tasks, clear documentation provided.",
            ICON: "Sprout",
          },
          {
            ID: "intermediate",
            TITLE: "Intermediate",
            DESCRIPTION: "Refactoring existing code or adding modules.",
            ICON: "Trees",
          },
          {
            ID: "advanced",
            TITLE: "Advanced",
            DESCRIPTION: "New architecture, high security requirements.",
            ICON: "Gem",
          },
          {
            ID: "enterprise",
            TITLE: "Enterprise",
            DESCRIPTION: "Mission-critical systems, massive scaling needs.",
            ICON: "Network",
          },
        ],
      },
      COMPLETION_CARD: {
        TITLE: "Completion",
        PERCENT: "0%",
        STEP_TEXT: "Step 1 of 4: Core Identity",
      },
      SUMMARY_CARD: {
        TITLE: "Quest Summary",
        FIELDS: {
          PROJECT_TITLE: "Project Title",
          CATEGORY: "Category",
          BUDGET: "Budget",
          TIMELINE: "Timeline",
          TYPE: "Type",
          PENDING: "Pending...",
        },
      },
      SUGGESTIONS_CARD: {
        TITLE: "Techguild Suggestions :",
        SUGGESTIONS: [
          'Consider adding "Next.js" or "React" to your title to attract specific experts.',
          "The description is good but could use a list of technical requirements.",
        ],
      },
      ACTIONS: {
        PREVIOUS: "Previous",
        SAVE_DRAFT: "Save Draft",
        NEXT_STEP: "Next Step",
      },
      STEP_2: {
        HEADER: {
          TITLE: "Budget & Timeline",
          SUBTITLE: "Set your project budget, expected duration and quest type. TechGuild uses this information to match your quest with the most suitable verified professionals.",
        },
        BUDGET_SECTION: {
          TITLE: "Project Budget",
          LABEL: "Budget (₹)",
          DEFAULT_VALUE: "75,000",
          RANGE_TITLE: "ESTIMATED BUDGET RANGE",
          RANGES: [
            { id: "small", title: "Small", range: "10k-50k" },
            { id: "medium", title: "Medium", range: "50k-200k" },
            { id: "enterprise", title: "Enterprise", range: "200k+" },
          ],
        },
        TIMELINE_SECTION: {
          TITLE: "Project Timeline",
          LABEL: "Number of Days",
          DEFAULT_DAYS: "20",
          DAY_OPTIONS: ["7 Days", "14 Days", "20 Days", "30 Days", "60 Days", "90 Days"],
          COMPLETION_LABEL: "Estimated Completion Date:",
          DEFAULT_DATE: "Nov 28, 2024",
        },
        QUEST_TYPE_SECTION: {
          TITLE: "Quest Type",
          TYPES: [
            {
              id: "standard",
              title: "Standard",
              description: "Ideal for most professional projects.",
              icon: "ClipboardList",
            },
            {
              id: "emergency",
              title: "Emergency",
              description: "Your quest receives higher visibility and faster responses.",
              badge: "1.5x PRIORITY",
              icon: "Zap",
            },
            {
              id: "long-term",
              title: "Long-Term",
              description: "Best for ongoing collaborations and recurring work.",
              icon: "RotateCw",
            },
          ],
        },
        COMPLETION_CARD: {
          TITLE: "COMPLETION",
          PERCENT: "50%",
          STEP_TEXT: "Step 2 of 4: Budget & Timeline",
        },
        SUMMARY_CARD: {
          TITLE: "Quest Summary",
          DEFAULT_PROJECT_TITLE: "Website Redesign for FinTech Startup",
          DEFAULT_CATEGORY: "UI/UX Design",
          FIELDS: {
            PROJECT_TITLE: "Project Title",
            CATEGORY: "Category",
            BUDGET: "Budget",
            TIMELINE: "Timeline",
            SKILLS: "Skills",
            PENDING: "Pending...",
          },
        },
        HELPFUL_TIPS_CARD: {
          TITLE: "HELPFUL TIPS",
          TIPS: [
            "Competitive budgets attract top-tier global talent.",
            "Emergency quests receive priority visibility in professional feeds.",
            "Professionals often favor clearly defined 2-4 week timelines.",
          ],
        },
      },

      STEP_3: {
        HEADER: {
          TITLE: "Review & Publish",
          SUBTITLE:
            "Review your quest details before publishing. You can edit any section if needed.",
        },
        BASIC_INFO_CARD: {
          TITLE: "Basic Information",
          FIELDS: {
            QUEST_TITLE_LABEL: "QUEST TITLE",
            QUEST_TITLE_VAL: "Website Redesign for FinTech Startup",
            CATEGORY_LABEL: "CATEGORY",
            CATEGORY_VAL: "UI/UX Design",
            SCOPE_LABEL: "SCOPE",
            SCOPE_VAL: "Medium",
            INDUSTRY_LABEL: "INDUSTRY",
            INDUSTRY_VAL: "FinTech",
            DESCRIPTION_LABEL: "DESCRIPTION",
            DESCRIPTION_VAL:
              "Project focuses on modernizing the user interface and streamlining the user experience for our flagship digital banking dashboard. We aim to achieve high conversion rates through data-driven design ...",
            VIEW_MORE: "View More",
          },
        },
        BUDGET_TIMELINE_CARD: {
          TITLE: "Budget & Timeline",
          FIELDS: {
            TOTAL_BUDGET_LABEL: "TOTAL BUDGET",
            TOTAL_BUDGET_VAL: "₹75,000",
            TIMELINE_LABEL: "TIMELINE",
            TIMELINE_VAL: "20 Days",
            TYPE_LABEL: "TYPE",
            TYPE_VAL: "Standard",
            REC_RANK_LABEL: "REC. RANK",
            REC_RANK_VAL: "Rank A",
          },
        },
        PREVIEW_SECTION: {
          TITLE: "QUEST PREVIEW (AS SEEN BY FREELANCERS)",
          BADGE_QUEST: "STANDARD QUEST",
          BADGE_RANK: "RANK A",
          PRICE: "₹75k",
          PROJECT_TITLE: "Website Redesign for FinTech Startup",
          TAGS: ["UI Design", "Figma", "+5 more"],
          CLIENT_INITIALS: "FT",
          CLIENT_NAME: "FinTech Solutions Inc.",
          CLIENT_VERIFIED: "VERIFIED CLIENT",
          DURATION_LABEL: "Duration",
          DURATION_VAL: "20 Days",
        },
        COMPLETION_CARD: {
          TITLE: "COMPLETION",
          PERCENT: "75%",
          STEP_TEXT: "Step 3 of 4: Review & Publish",
        },
        READY_CARD: {
          TITLE: "Ready to Publish",
          ITEMS: [
            "Quest Title & Type",
            "Project Description",
            "Category Selection",
            "Total Budget Set",
            "Timeline Specified",
          ],
          BANNER_TEXT: "Your quest is ready to be published.",
        },
        SUMMARY_CARD: {
          TITLE: "Quest Summary",
          DEFAULT_PROJECT_TITLE: "Website Redesign for FinTech Startup",
          DEFAULT_CATEGORY: "UI/UX Design",
          DEFAULT_BUDGET: "₹75,000",
          DEFAULT_TIMELINE: "20 Days",
          FIELDS: {
            PROJECT_TITLE: "Project Title",
            CATEGORY: "Category",
            BUDGET: "Budget",
            TIMELINE: "Timeline",
          },
        },

        ACTIONS: {
          PUBLISH: "Publish",
        },
      },
      STEP_4: {
        HEADER: {
          TITLE: "Quest Published Successfully",
          SUBTITLE:
            "Your quest is now live and visible to verified professionals across the TechGuild ecosystem.",
        },
        CONGRATS_CARD: {
          BADGE: "QUEST LIVE",
          TITLE: "Congratulations!",
          DESCRIPTION:
            "Your quest has been successfully published and is now being matched with top-tier technology experts. Expect your first applications within the next 24 hours.",
        },
        QUEST_DETAILS_CARD: {
          TITLE: "Website Redesign for FinTech Startup",
          REF: "Ref: TQ-2023-9842",
          CATEGORY: "UI/UX Design",
          FUNDED_BADGE: "• Funded",
          METRICS: [
            { label: "BUDGET", value: "₹75,000" },
            { label: "TIMELINE", value: "20 Days" },
            { label: "STATUS", value: "Live", isGreen: true },
            { label: "ESCROW", value: "Secure" },
          ],
        },
        WHATS_NEXT: {
          TITLE: "What's Next?",
          STEPS: [
            {
              icon: "Users",
              iconBg: "#eff6ff",
              iconColor: "#0051DF",
              title: "Receive Applications",
              description: "Experts review your scope and submit bids.",
            },
            {
              icon: "Search",
              iconBg: "#f5f3ff",
              iconColor: "#7c3aed",
              title: "Review Candidates",
              description: "Vett profiles, portfolios, and ratings.",
            },
            {
              icon: "Handshake",
              iconBg: "#0086781A",
              iconColor: "#008678",
              title: "Start Collaboration",
              description: "Award the quest and sign contracts.",
            },
            {
              icon: "ChartNoAxesCombined",
              iconBg: "#fffbeb",
              iconColor: "#d97706",
              title: "Track Progress",
              description: "Manage milestones and verify deliverables.",
            },
          ],
        },
        COMPLETION_CARD: {
          TITLE: "COMPLETION",
          PERCENT: "100%",
          STEP_TEXT: "Step 4 of 4: Published!",
        },
        VISIBILITY_CARD: {
          TITLE: "REAL-TIME VISIBILITY",
          ITEMS: [
            {
              label: "Live Status",
              value: "Publicly Visible",
              dot: true,
            },
            {
              icon: "Users",
              label: "Applications",
              value: "0 Received",
            },
            {
              icon: "ShieldCheck",
              label: "Escrow Status",
              value: "Secured & Funded",
              isGreen: true,
            },
          ],
        },
        ACTIONS_CARD: {
          TITLE: "ACTIONS",
          ITEMS: [
            { icon: "Eye", label: "View My Quest" },
            { icon: "UserRoundCog", label: "Manage Applications" },
            { icon: "Share2", label: "Share Quest" },
            { icon: "Copy", label: "Duplicate Quest" },
          ],
        },
        PRO_TIP_CARD: {
          TITLE: "Pro Tip",
          DESCRIPTION:
            "Sharing your quest link on LinkedIn or X (formerly Twitter) can increase visibility to elite talent outside our immediate network by up to 40%.",
          LINK_TEXT: "Read more tips",
        },
        BOTTOM_BAR: {
          VIEW_QUEST: "View My Quest",
          GO_DASHBOARD: "Go to Dashboard",
          CREATE_ANOTHER: "Create Another Quest",
        },
      },
    },
    VIEW_QUEST_DETAIL: {
      HEADER: {
        TITLE: "Website Redesign for FinTech Startup",
        SUBTITLE:
          "Your Quest is live. Manage progress, milestones, communication, and escrow from one place.",
        BADGE: "Published",
        BADGE_SUB: "Published just now",
      },
      ALERT_BANNER: {
        TITLE: "Quest Published Successfully",
        DESCRIPTION:
          "Your Quest is now live and ₹75,000 is securely held in TechGuild Escrow.",
        ESCROW_FUNDED_TAG: "[Escrow Funded ✓]",
      },
      METRICS: [
        { label: "QUEST STATUS", value: "Published", isLive: true, dot: true },
        { label: "ESCROW SECURED", value: "₹75,000", isBlue: true },
        { label: "TIMELINE", value: "20 Days" },
        { label: "MILESTONES", value: "4 Total" },
      ],
      OVERVIEW_CARD: {
        TITLE: "Quest Overview",
        VIEW_DETAILS: "View Full Details",
        DESCRIPTION:
          "Comprehensive redesign of the core user dashboard for our B2B FinTech platform. The goal is to improve user engagement metrics by streamlining complex financial data visualization and optimizing the transaction flow. Requires deep expertise in designing for trust and clarity in enterprise SaaS environments.",
        SKILLS_LABEL: "REQUIRED SKILLS",
        SKILLS: ["Figma", "UI Design", "UX Research", "Prototyping", "FinTech"],
        TIMELINE_LABEL: "Expected Timeline: 15 Aug 2026 - 03 Sep 2026",
      },
      MILESTONE_PROGRESS_CARD: {
        TITLE: "Milestone Progress",
        COMPLETED_TEXT: "0% Completed",
        EMPTY_TITLE: "No milestones created",
        EMPTY_STATUS: "Not Started",
        VIEW_BREAKDOWN: "View Full Milestone Breakdown",
      },
      RECENT_ACTIVITY_CARD: {
        TITLE: "Recent Activity",
        ACTIVITIES: [
          {
            title: "Freelancer matching started",
            subtitle: "In progress",
            type: "progress",
          },
          {
            title: "Escrow securely funded (₹75,000)",
            subtitle: "Just now",
            type: "success",
          },
          {
            title: "Quest published to network",
            subtitle: "Just now",
            type: "default",
          },
        ],
      },
      ESCROW_CARD: {
        TITLE: "Escrow & Payments",
        AMOUNT: "₹75,000",
        STATUS: "Escrow Funded",
        INFO_TEXT:
          "UPI payment successful. Funds are secured and will only be released upon milestone approval.",
        VIEW_DETAILS: "View Payment Details",
      },
      STATUS_CHECKLIST_CARD: {
        TITLE: "Status Checklist",
        ITEMS: [
          { title: "Quest Published", status: "completed" },
          { title: "Freelancer Matching", subtitle: "In Progress", status: "in_progress" },
          { title: "Work Started", subtitle: "Pending", status: "pending" },
        ],
      },
      COMMUNICATION_CARD: {
        TITLE: "Communication",
        SUBTITLE: "Keep all project communication in one trusted place.",
        UNREAD_LABEL: "Unread Messages",
        UNREAD_COUNT: "0",
        CHAT_BTN: "Open Quest Chat",
      },
      BOTTOM_BAR: {
        TITLE: "Website Redesign for FinTech Startup",
        STATUS: "Live",
        EDIT_QUEST: "Edit Quest",
        VIEW_WORKSPACE: "View Quest Workspace",
      },
    },
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

    // Individual Profile Welcome / Intro Screen (Initial Landing)
    WELCOME_SCREEN: {
      HERO: {
        TITLE_PREFIX: "Let's build your ",
        TITLE_HIGHLIGHT: "profile!",
        SUBTITLE: "Complete your profile to unlock personalized opportunities, get discovered by clients, and grow your network.",
        CTA_BUTTON: "Complete Your Profile",
        SECURITY_NOTE: "100% secure • Only visible to verified clients",
      },
      WHY_COMPLETE: {
        SECTION_TITLE: "Why complete your profile?",
        ITEMS: [
          {
            ID: "get_discovered",
            TITLE: "Get Discovered",
            DESCRIPTION: "Clients can find you based on your skills and expertise.",
          },
          {
            ID: "unlock_opportunities",
            TITLE: "Unlock Opportunities",
            DESCRIPTION: "Access projects that match your profile and preferences.",
          },
          {
            ID: "build_trust",
            TITLE: "Build Trust",
            DESCRIPTION: "A complete profile helps clients trust and hire you faster.",
          },
          {
            ID: "showcase_work",
            TITLE: "Showcase Your Work",
            DESCRIPTION: "Highlight your skills, experience, and portfolio.",
          },
        ],
      },
      SETUP_STEPS: {
        SECTION_TITLE: "Profile setup in 4 simple steps",
        STEPS: [
          {
            STEP_NUMBER: 1,
            TITLE: "Basic Information",
            DESCRIPTION: "Add your name, location, and profile details.",
          },
          {
            STEP_NUMBER: 2,
            TITLE: "Skills & Expertise",
            DESCRIPTION: "List your skills and areas of expertise.",
          },
          {
            STEP_NUMBER: 3,
            TITLE: "Portfolio & Links",
            DESCRIPTION: "Add your portfolio, links, and documents.",
          },
          {
            STEP_NUMBER: 4,
            TITLE: "Verify & Publish",
            DESCRIPTION: "Verify your identity and go live.",
          },
        ],
      },
      FOOTER_NOTE: "Your data is safe with us. You can update your profile anytime.",
    },

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
        CITY: "City",
        TIME_ZONE: "Time Zone",
        HEADLINE: "Headline",
        BIO: "Bio",
        EXPERIENCE_LEVEL: "Experience Level",
        AVAILABILITY: "Availability",
        SKILLS: "Skills",
        TOOLS: "Tools",
        CATEGORIES: "Categories",
        PREFERRED_LANGUAGES: "Preferred Languages",
        PORTFOLIO_WEBSITE: "Portfolio website",
        GITHUB: "Github",
        LINKEDIN: "Linkedin",
        RESUME: "Resume",
        SUGGESTED_SKILLS_ROLE: "Suggested skills based on your role",
      },
      PLACEHOLDERS: {
        UPLOAD_PHOTO: "Upload photo",
        FULL_NAME: "Enter your full name",
        SELECT_COUNTRY: "Select your country",
        SELECT_CITY: "Select your city",
        SELECT_TIME_ZONE: "Select your time zone",
        HEADLINE: "e.g. UI/UX Designer",
        BIO: "Write a short bio about yourself",
        SELECT_EXPERIENCE: "Select experience level",
        SELECT_AVAILABILITY: "Select availability",
        SKILLS: "Search skills (e.g. Figma, Reactjs)",
        TOOLS: "Add tools",
        CATEGORIES: "Select categories (e.g. UI/UX, Design, Web Development)",
        PREFERRED_LANGUAGES: "Select languages (e.g. English, Hindi)",
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

  // Verification Hub & Flows
  VERIFICATION: {
    HUB: {
      TITLE: "Get Verified on TechGuild",
      SUBTITLE: "Verification helps build trust, keeps the community safe, and unlocks more opportunities.",
      BUSINESS_TITLE: "I'm a Business",
      BUSINESS_DESC: "Verify your business to build credibility and attract top talent.",
      INDIVIDUAL_TITLE: "I'm an Individual",
      INDIVIDUAL_DESC: "Verify your identity to get started and hire with confidence.",
      BENEFIT_TRUST_TITLE: "Build Trust",
      BENEFIT_TRUST_DESC: "Verified clients are more trusted.",
      BENEFIT_VISIBILITY_TITLE: "Higher Visibility",
      BENEFIT_VISIBILITY_DESC: "Get noticed by top freelancers.",
      BENEFIT_COMMUNITY_TITLE: "A Safer Community",
      BENEFIT_COMMUNITY_DESC: "Helps us keep TechGuild secure.",
      SKIP: "Skip for now",
    },
    CLIENT: {
      STEPS: ["Business Information", "Upload Documents", "Bank Details", "Review"],
      INTRO: {
        TITLE: "Verify Your Business",
        DESCRIPTION: "Business verification helps client trust your organization.",
        BENEFITS: ["Enterprise Badge", "Higher Visibility", "Compliance Ready"],
        START_BTN: "Let's Get Started",
        SKIP_BTN: "Skip for now",
      },
      BUSINESS_INFO: {
        PAGE_TITLE: "Verify Your Identity",
        CARD_TITLE: "Tell us about your business",
        CARD_DESC: "Please provide accurate information about your organisation. this helps us verify your business faster.",
        CONTINUE_BTN: "Continue",
      },
      DOCUMENTS: {
        PAGE_TITLE: "Verify Your Identity",
        CARD_TITLE: "Upload Business Documents",
        CARD_DESC: "Please upload clear and valid documents. All files must be in PDF, PNG, or JPEG format.",
        DOCS: [
          { id: "gst", title: "GST Certificate", desc: "Upload your GST certificate", label: "Upload Certificate" },
          { id: "incorporation", title: "Incorporation Certificate", desc: "Upload incorporation certificate", label: "Upload Certificate" },
          { id: "pan", title: "PAN Card", desc: "Upload your PAN card", label: "Upload Card" },
          { id: "registration", title: "Business Registration", desc: "Upload business registration proof", label: "Upload Registration" },
        ],
        CONTINUE_BTN: "Continue",
      },
      BANK_DETAILS: {
        PAGE_TITLE: "Verify Your Identity",
        CARD_TITLE: "Add Your Bank Details",
        CARD_DESC: "This information is used for payouts and billing.",
        CHEQUE_UPLOAD_TITLE: "Upload cancelled Cheque",
        CHEQUE_UPLOAD_HINT: "JPG, PNG or PDF (Max 5MB)",
        CONTINUE_BTN: "Continue",
      },
      REVIEW: {
        PAGE_TITLE: "Verify Your Identity",
        CARD_TITLE: "Review Your Information",
        CARD_DESC: "Please review the details below. Make sure everything is correct before you submit.",
        BUSINESS_INFO_LABEL: "Business Information",
        DOCUMENTS_LABEL: "Upload Documents",
        BANK_LABEL: "Bank Details",
        REVIEW_TIME_LABEL: "Estimated review time",
        REVIEW_TIME_VALUE: "24-48 Hours",
        SECURITY_LABEL: "Your data is secure",
        SECURITY_DESC: "We use bank-level encryption to protect your information.",
        SUBMIT_BTN: "Submit",
      },
      SUBMITTED: {
        TITLE: "Verification Submitted",
        DESC: "Your documents have been received successfully.",
        REVIEW_LABEL: "Estimated Review",
        REVIEW_VALUE: "24-48 Hours",
        DASHBOARD_BTN: "Go To Dashboard",
      },
      UNDER_REVIEW: {
        TITLE: "Business Verification Under Review",
        DESC: "Your business details and documents have been submitted successfully and are currently being reviewed by our team.",
        TIME_LABEL: "Estimated Verification Time",
        TIME_VALUE: "24 \u2013 48 hours",
        TIME_NOTE: "We\u2019ll notify you as soon as your verification is complete. You can continue using TechGuild while we review your documents.",
        NEXT_TITLE: "What happens next?",
        NEXT_STEPS: [
          "Our team will review your business information and documents",
          "We may contact you if additional information is needed",
          "You\u2019ll receive a notification once verified",
          "After verification, you\u2019ll get a verified business badge",
        ],
        INFO_TITLE: "Submitted Business Information",
        INFO_DESC: "Here is the information you provided for verification.",
        DOCS_TITLE: "Submitted Documents",
        DOCS_DESC: "The following documents have been submitted and are under review.",
        DOC_NAMES: ["GST Certificate", "Incorporation Certificate", "PAN Card", "Business Registration"],
        HELP_TITLE: "Need help?",
        HELP_DESC: "If you have any questions, feel free to contact our support team.",
        CONTACT_BTN: "Contact Support",
      },
      COMPLETE: {
        TITLE: "Business Verification Complete",
        DESC: "Your business has been successfully verified. You now have access to all features on TechGuild.",
        VERIFIED_LABEL: "Verified Successfully",
        VERIFIED_HEADING: "Your business is verified",
        VERIFIED_BADGE: "Verified Business",
        VERIFIED_DESC: "You now have a verified business badge and can securely post projects, hire freelancers, and grow your business on TechGuild.",
        NEXT_TITLE: "What's next?",
        NEXT_STEPS: [
          "You can now access all client features",
          "Your verified business profile will be visible to freelancers",
          "You can start posting projects and hiring",
          "If you ever need to update your information, you can manage it in settings",
        ],
        INFO_TITLE: "Verified Business Information",
        INFO_DESC: "Here is the information you provided for verification.",
        DOCS_TITLE: "Verified Documents",
        DOCS_DESC: "The following documents have been reviewed and verified.",
        DOC_NAMES: ["GST Certificate", "Incorporation Certificate", "PAN Card", "Business Registration"],
        HELP_TITLE: "Need help?",
        HELP_DESC: "If you have any questions, feel free to contact our support team.",
        CONTACT_BTN: "Contact Support",
      },
      SUCCESS: {
        TITLE: "Business Identity Verified Successfully !",
        TRUST_TITLE: "Verification Completed",
        TRUST_DESC: "You have earned +40 trust points!",
        DASHBOARD_BTN: "Go To Dashboard",
      },
    },
    INDIVIDUAL: {
      STEPS: ["Verification Document", "Upload Documents", "Take Selfie", "Review Information"],
      INTRO: {
        TITLE: "Verify Your Identity",
        DESCRIPTION: "To build a trusted marketplace, every member complete a quick identity verification, Your information is securely encrypted and used only to verify your account.",
        BENEFITS: ["Verified profile badge", "Higher trust .", "Higher Visibility.", "Secure marketplace for everyone"],
        START_BTN: "Let's Get Started",
        SKIP_BTN: "Skip for now",
      },
      IDENTITY: {
        PAGE_TITLE: "Verify Your Identity",
        CARD_TITLE: "Choose Verification Document",
        CARD_DESC: "Select the type of government-issued ID you would like to use for verification.",
        DOCS: [
          { id: "aadhaar", title: "Aadhaar Card", desc: "Unique 12-digit identification number issued bu UIDAI.", icon: "CreditCard" },
          { id: "pan", title: "PAN Card", desc: "Permanent Account Number issued by Income Tax Department.", icon: "CreditCard" },
          { id: "passport", title: "Passport", desc: "International travel document issued by goverment.", icon: "BookOpen" },
          { id: "driving-license", title: "Driving License", desc: "Government-issued driving license.", icon: "CreditCard" },
        ],
        CONTINUE_BTN: "Continue",
      },
      UPLOAD: {
        PAGE_TITLE: "Verify Your Identity",
        CARD_TITLE: "Upload Government ID",
        CARD_DESC: "Upload a clear, valid government-issued ID. All details must be clearly visible.",
        DROPZONE_TITLE: "Drag & Drop your file here",
        DROPZONE_OR: "or",
        BROWSE_BTN: "Browse Files",
        FORMAT_HINT: "PNG, JPEG, PDF | Max 10 MB",
        SECURITY_TITLE: "Your information is secure",
        SECURITY_DESC: "Your documents are encrypted and used only for verification purposes.",
        BACK_BTN: "Back",
        CONTINUE_BTN: "Continue",
      },
      SELFIE: {
        PAGE_TITLE: "Verify Your Identity",
        CARD_TITLE: "Take A Selfie",
        CARD_DESC: "We'll compare your photo with your ID document.",
        REQUIREMENTS: ["Good lighting", "Face camera", "Remove glasses", "Neutral expression"],
        CAMERA_BTN: "Open Camera",
        CONTINUE_BTN: "Continue",
      },
      REVIEW: {
        PAGE_TITLE: "Verify Your Identity",
        CARD_TITLE: "Review Your Information",
        CARD_DESC: "Please review the details below. Make sure everything is correct before you submit.",
        DOC_LABEL: "Verification Document",
        UPLOAD_LABEL: "Upload Document",
        SELFIE_LABEL: "Selfie",
        BACK_BTN: "Back",
        CONTINUE_BTN: "Continue",
      },
      SUBMITTED: {
        TITLE: "Verification Submitted",
        DESC: "Your documents have been received successfully.",
        REVIEW_LABEL: "Estimated Review",
        REVIEW_VALUE: "24-48 Hours",
        DASHBOARD_BTN: "Go To Dashboard",
      },
      UNDER_REVIEW: {
        TITLE: "Verification Under Review",
        DESC: "Your documents have been submitted successfully and are currently being reviewed by our team.",
        TIME_LABEL: "Estimated Verification Time",
        TIME_VALUE: "24 \u2013 48 hours",
        TIME_NOTE: "We\u2019ll notify you as soon as your verification is complete. You can continue using TechGuild while we review your documents.",
        NEXT_TITLE: "What happens next?",
        NEXT_STEPS: [
          "Our team will review your submitted documents",
          "We may contact you if additional information is needed",
          "You\u2019ll receive a notification once verified",
          "After verification, you\u2019ll get a verified profile badge",
        ],
        DOCS_TITLE: "Submitted Documents",
        DOCS_DESC: "Here are the documents you've submitted for verification.",
        DOCS: [
          { id: "gov-id", title: "Government ID", desc: "Aadhaar Card", icon: "CreditCard" },
          { id: "selfie", title: "Selfie", desc: "Live photo for identity verification", icon: "User" },
        ],
        HELP_TITLE: "Need help?",
        HELP_DESC: "If you have any questions, feel free to contact our support team.",
        CONTACT_BTN: "Contact Support",
      },
      COMPLETE: {
        TITLE: "Verification Complete",
        DESC: "Your identity has been successfully verified. You now have access to all features on TechGuild.",
        VERIFIED_LABEL: "Verified Successfully",
        VERIFIED_HEADING: "Your identity is verified",
        VERIFIED_BADGE: "Verified",
        VERIFIED_DESC: "You now have a verified profile badge and can securely hire freelancers on TechGuild.",
        NEXT_TITLE: "What's next?",
        NEXT_STEPS: [
          "You can now access all client features",
          "Your verified business profile will be visible to freelancers",
          "You can start posting projects and hiring",
          "If you ever need to update your information, you can manage it in settings",
        ],
        DOCS_TITLE: "Submitted Documents",
        DOCS_DESC: "Your documents have been reviewed and verified.",
        DOCS_BADGE: "All Documents Verified",
        DOCS: [
          { id: "gov-id", title: "Government ID", desc: "Aadhaar Card", icon: "CreditCard" },
          { id: "selfie", title: "Selfie", desc: "Live photo for identity verification", icon: "User" },
        ],
        HELP_TITLE: "Need help?",
        HELP_DESC: "If you have any questions, feel free to contact our support team.",
        CONTACT_BTN: "Contact Support",
      },
      SUCCESS: {
        TITLE: "Identity Verified Successfully !",
        TRUST_TITLE: "Verification Completed",
        TRUST_DESC: "You have earned +40 trust points!",
        DASHBOARD_BTN: "Go To Dashboard",
      },
    },
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

// City list
export const CITY_OPTIONS = [
  { value: "Mumbai", label: "Mumbai" },
  { value: "Delhi", label: "Delhi" },
  { value: "Bengaluru", label: "Bengaluru" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Ahmedabad", label: "Ahmedabad" },
  { value: "Chennai", label: "Chennai" },
  { value: "Kolkata", label: "Kolkata" },
  { value: "Surat", label: "Surat" },
  { value: "Pune", label: "Pune" },
  { value: "Jaipur", label: "Jaipur" },
  { value: "Lucknow", label: "Lucknow" },
  { value: "Kanpur", label: "Kanpur" },
  { value: "Nagpur", label: "Nagpur" },
  { value: "Indore", label: "Indore" },
  { value: "Thane", label: "Thane" },
  { value: "Bhopal", label: "Bhopal" },
  { value: "Visakhapatnam", label: "Visakhapatnam" },
  { value: "Patna", label: "Patna" },
  { value: "Vadodara", label: "Vadodara" },
  { value: "Ghaziabad", label: "Ghaziabad" },
  { value: "Ludhiana", label: "Ludhiana" },
  { value: "Agra", label: "Agra" },
  { value: "Nashik", label: "Nashik" },
  { value: "Faridabad", label: "Faridabad" },
  { value: "Meerut", label: "Meerut" },
  { value: "Rajkot", label: "Rajkot" },
  { value: "Varanasi", label: "Varanasi" },
  { value: "Srinagar", label: "Srinagar" },
  { value: "Aurangabad", label: "Aurangabad" },
  { value: "Dhanbad", label: "Dhanbad" },
  { value: "Amritsar", label: "Amritsar" },
  { value: "Navi Mumbai", label: "Navi Mumbai" },
  { value: "Allahabad", label: "Allahabad" },
  { value: "Ranchi", label: "Ranchi" },
  { value: "Howrah", label: "Howrah" },
  { value: "Coimbatore", label: "Coimbatore" },
  { value: "Jabalpur", label: "Jabalpur" },
  { value: "Gwalior", label: "Gwalior" },
  { value: "Vijayawada", label: "Vijayawada" },
  { value: "Jodhpur", label: "Jodhpur" },
  { value: "Madurai", label: "Madurai" },
  { value: "Raipur", label: "Raipur" },
  { value: "Kota", label: "Kota" },
  { value: "Guwahati", label: "Guwahati" },
  { value: "Chandigarh", label: "Chandigarh" },
  { value: "Noida", label: "Noida" },
  { value: "Gurgaon", label: "Gurgaon" },
  { value: "Kochi", label: "Kochi" },
  { value: "Dehradun", label: "Dehradun" },
  { value: "Bhubaneswar", label: "Bhubaneswar" },
  { value: "New York", label: "New York" },
  { value: "San Francisco", label: "San Francisco" },
  { value: "London", label: "London" },
  { value: "Toronto", label: "Toronto" },
  { value: "Sydney", label: "Sydney" },
  { value: "Berlin", label: "Berlin" },
  { value: "Paris", label: "Paris" },
  { value: "Tokyo", label: "Tokyo" },
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
    CITY_REQUIRED: "City is required",
    TIME_ZONE_REQUIRED: "Time zone is required",
    HEADLINE_REQUIRED: "Headline is required",
    BIO_REQUIRED: "Bio is required",
    EXPERIENCE_REQUIRED: "Experience level is required",
    AVAILABILITY_REQUIRED: "Availability is required",
    SKILLS_REQUIRED: "Skills are required",
    TOOLS_REQUIRED: "Tools are required",
    CATEGORIES_REQUIRED: "Categories are required",
    PREFERRED_LANGUAGES_REQUIRED: "Preferred languages are required",
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
