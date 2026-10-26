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

  // Guild Hall (individual community feed)
  GUILD_HALL: {
    TITLE: "Guild Hall",
    SUBTITLE: "Connect, share, learn and grow with the TechGuild community.",
    CREATE_POST: "Create a Post",
    SEARCH_PLACEHOLDER: "Search projects, clients, or freelancers...",
    COMPOSER: {
      PLACEHOLDER: "What's on your mind, Arjun?",
      POST: "Post",
      ACTIONS: [
        { id: "photo-media", label: "Photo / Media", color: "#06b6d4" },
        { id: "ask-a-question", label: "Ask a Question", color: "#8b5cf6" },
        { id: "share-a-project", label: "Share a Project", color: "#10b981" },
        { id: "create-a-poll", label: "Create a Poll", color: "#f97316" },
        { id: "share-a-resource", label: "Share a Resource", color: "#103ca4" },
      ],
    },
    TABS: ["For You", "Following", "Trending", "Questions", "Projects", "Jobs", "Events", "Resources"],
    POST: {
      TYPE_POLL: "Poll",
      TYPE_DISCUSSION: "Discussion",
      TYPE_EVENT: "Event",
      VERIFIED: "Verified",
      MORE_OPTIONS: "More options",
      SEE_MORE: "See more",
      LIKE: "Like",
      COMMENT: "Comment",
      SHARE: "Share",
      SAVE: "Save",
      JOIN_CONVERSATION: "Join conversation",
      RSVP: "RSVP",
      TOP_REPLY: "Top reply",
    },
    POLL: {
      CAST_VOTE: "Cast your vote",
      SEE_RESULTS: "See results",
      UNDO_VOTE: "Undo vote",
      RESULTS_HIDDEN: "results hidden until you vote",
      YOUR_VOTE: "Your vote",
      YOU_VOTED: "You voted",
      TAP_TO_CHANGE: "Tap another option to change your vote",
      VOTED_LABEL: "voted",
      VOTES_LABEL: "votes",
      SEP: "·",
    },
    RAIL: {
      PEOPLE_HEADING: "People to Connect With",
      TRENDING_HEADING: "Trending in TechGuild",
      EVENTS_HEADING: "Upcoming Events",
      RESOURCES_HEADING: "Featured Resources",
      VIEW_ALL: "View all",
      CONNECT: "Connect",
      RSVP: "RSVP",
      OPEN: "Open",
    },
    COMMUNITIES: {
      HEADING: "Communities you may like",
      SUBTITLE: "Small rooms with your people - join the conversations happening right now.",
      BROWSE_ALL: "Browse all communities",
      JOIN: "Join",
    },
    HALLS: {
      TITLE: "The Halls of TechGuild",
      COUNT: "8 halls",
      MEMBERS: "68.3k members",
      INSIDE: "567 inside right now",
      BADGE: "↗ Hall of the week · fastest growing, +38%",
      JOIN: "Join",
      JOINED: "Joined",
      EXPLORE: "Explore",
      TABS: ["All halls", "Open to all", "By intro", "Your halls"],
      SEARCH: "Search halls...",
      INSIDE_NOW: "inside now",
      MEMBERS_SUFFIX: "members",
      INSIDE_SUFFIX: "inside",
      BACK: "All halls",
      INSIDE_LABEL: "Inside right now",
      NOW_DISCUSSING: "Now discussing:",
      WEEKLY_RHYTHM: "Weekly rhythm",
      WHAT_HAPPENS: "What happens here",
      PEOPLE: "People to meet first",
      SAY_HI: "Say hi",
      OPEN_TITLE: "Open to all",
      OPEN_DESC: "One tap and you're in — no approval needed.",
      JOIN_CTA: "Join — become member #12,438",
    },
    CTA: {
      TITLE: "Have something to share with the guild?",
      SUBTITLE:
        "Your post lands in front of 24,000+ members - launches, questions, wins and everything in between.",
      BUTTON: "Create a Post",
    },
    CREATE_MODAL: {
      TITLE: "Create a Post",
      STEP_ONE_SUBTITLE: "Step 1 of 2 · Choose a format",
      STEP_TWO_SUBTITLE: "Step 2 of 2 · Compose your post",
      STEP_ONE_HINT: "Pick the format that fits your post",
      CONTINUE: "Continue",
      BACK: "Back",
      PUBLISH: "Publish",
      CHANGE: "Change",
      CLOSE: "Close",
      ADD_OPTION: "Add option",
      FORMATS: [
        {
          id: "discussion",
          label: "Discussion",
          desc: "Start a conversation or share an opinion.",
          icon: "MessageSquare",
          color: "#103ca4",
          tint: "#eaf1ff",
        },
        {
          id: "question",
          label: "Question",
          desc: "Ask the guild for advice or help.",
          icon: "CircleQuestionMark",
          color: "#8b5cf6",
          tint: "#f1ebfe",
        },
        {
          id: "project",
          label: "Project Showcase",
          desc: "Show your work and get feedback.",
          icon: "Briefcase",
          color: "#10b981",
          tint: "#e5f8f1",
        },
        {
          id: "poll",
          label: "Poll",
          desc: "Put a choice to a community vote.",
          icon: "BarChart3",
          color: "#f97316",
          tint: "#fef1e2",
        },
        {
          id: "opportunity",
          label: "Opportunity",
          desc: "Find collaborators, mentors or hires.",
          icon: "User",
          color: "#ef4444",
          tint: "#fdecee",
        },
        {
          id: "photo",
          label: "Photo / Media",
          desc: "Share a visual update or screenshot.",
          icon: "Image",
          color: "#06b6d4",
          tint: "#e2f6f9",
        },
      ],
      FORMS: {
        discussion: {
          hint: "Add a title to publish",
          fields: [
            {
              type: "text",
              key: "title",
              label: "Title",
              placeholder: "Give it a clear, specific headline",
              max: 120,
              required: true,
            },
            {
              type: "textarea",
              key: "details",
              label: "Details",
              note: "(optional)",
              placeholder: "Share the story, the context, and what you want from the guild...",
              max: 1000,
            },
            {
              type: "tags",
              key: "tags",
              label: "Tags",
              note: "(up to 5)",
              placeholder: "Type a tag and press Enter",
              max: 5,
            },
          ],
        },
        question: {
          hint: "Write your question to publish",
          fields: [
            {
              type: "text",
              key: "question",
              label: "Your question",
              placeholder: "What do you want to know?",
              max: 140,
              required: true,
            },
            {
              type: "textarea",
              key: "context",
              label: "Context",
              note: "(optional)",
              placeholder: "Add background so the guild can answer well...",
              max: 1000,
            },
            {
              type: "tags",
              key: "tags",
              label: "Tags",
              note: "(up to 5)",
              placeholder: "Type a tag and press Enter",
              max: 5,
            },
          ],
        },
        project: {
          hint: "Name your project to publish",
          fields: [
            {
              type: "text",
              key: "name",
              label: "Project name",
              placeholder: "e.g. Nimbus Analytics",
              max: 90,
              required: true,
            },
            {
              type: "textarea",
              key: "description",
              label: "Description",
              placeholder: "What did you build, with what, and what feedback do you want?",
              max: 800,
            },
            {
              type: "text",
              key: "link",
              label: "Live link",
              note: "(optional)",
              placeholder: "app.yourproject.dev",
            },
            {
              type: "tags",
              key: "stack",
              label: "Tech stack & tags",
              note: "(up to 5)",
              placeholder: "React, Node.js... press Enter to add",
              max: 5,
            },
          ],
        },
        poll: {
          hint: "Add at least two options to publish",
          fields: [
            {
              type: "text",
              key: "question",
              label: "Question",
              placeholder: "What should the guild vote on?",
              max: 140,
              required: true,
            },
            {
              type: "options",
              key: "options",
              label: "Options",
              note: "(2–4)",
              minFilled: 2,
              max: 4,
            },
            {
              type: "duration",
              key: "duration",
              label: "Poll runs for",
              options: ["1 day", "3 days", "1 week"],
              defaultValue: "3 days",
            },
          ],
        },
        opportunity: {
          hint: "Add a title to publish",
          fields: [
            {
              type: "text",
              key: "looking",
              label: "What are you looking for?",
              placeholder: "e.g. Looking for a UI/UX designer to collaborate",
              max: 120,
              required: true,
            },
            {
              type: "textarea",
              key: "details",
              label: "Details",
              placeholder:
                "Describe the project, the role and who you'd love to hear from...",
              max: 800,
            },
            {
              type: "facts",
              key: "facts",
              label: "Quick facts",
              note: "(all optional)",
              placeholders: ["Remote · India", "3-month contract", "₹1.5L – ₹2L"],
            },
            {
              type: "tags",
              key: "tags",
              label: "Tags",
              note: "(up to 5)",
              placeholder: "Type a tag and press Enter",
              max: 5,
            },
          ],
        },
        photo: {
          hint: "Write a caption to publish",
          fields: [
            {
              type: "textarea",
              key: "caption",
              label: "Caption",
              placeholder: "Say something about this...",
              max: 600,
              required: true,
            },
            {
              type: "upload",
              key: "media",
              label: "Media",
              placeholder: "Click to upload or drag & drop",
              meta: "PNG, JPG or GIF — up to 10 MB",
              accept: "image/png,image/jpeg,image/gif",
            },
          ],
        },
      },
    },
    COMMENTS: {
      TITLE: "Comments",
      MOST_RECENT: "· most recent",
      TOP: "Top",
      NEWEST: "Newest",
      SORT_LABEL: "Sort comments",
      ADD_PLACEHOLDER: "Add a comment...",
      REPLY_PLACEHOLDER: "Write a reply...",
      REPLY: "Reply",
      CANCEL: "Cancel",
      POST: "Post",
      SHOW_EARLIER: "Show earlier comments",
      LIKE: "Like",
      HEART: "Heart",
    },
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

  // Party Formation (freelancer guild-party landing flow)
  PARTY: {
    PAGE: {
      TITLE: "Party Management",
      SUBTITLE_LINE1: "Build a trusted team, complete larger quests together,",
      SUBTITLE_LINE2: "and earn more as a Party.",
      HOW_IT_WORKS_LINK: "How Parties Work?",
      SEARCH_PLACEHOLDER: "Search projects, clients, or freelancers...",
    },
    HERO: {
      HEADING: "You are not part of any party yet.",
      DESCRIPTION:
        "Create or join a Party to unlock bigger quests, grow your reputation, and level up your rank.",
      TAGLINE: "Every great journey starts with a Party.",
      CREATE: {
        TITLE: "Create a Party",
        DESCRIPTION: "Start your own Party and invite skilled professionals.",
      },
      JOIN: {
        TITLE: "Join a Party",
        DESCRIPTION: "Accept an invitation from another Party Lead.",
      },
    },
    RANK_PROGRESSION: {
      TITLE: "How Rank Progression Works for Freelancers",
      NOTICE: "To move from F Rank to E Rank, you must be part of a Party.",
      NOTICE_SUB: "You can either create your own Party or join an existing one.",
      IMPORTANT_LABEL: "Important",
      IMPORTANT_TEXT:
        "Even if you complete the required number of projects as an individual, you must be part of a Party to rank up to E Rank.",
      STEPS: [
        { key: "rank", icon: null, letter: "F", label: "F Rank", sub: "(Current)" },
        { key: "projects", icon: "Check", letter: null, label: "Complete Required", sub: "Projects" },
        { key: "party", icon: "Users", letter: null, label: "Join/Create", sub: "a Party" },
        { key: "next-rank", icon: null, letter: "E", label: "E Rank", sub: "(Unlocked)" },
      ],
    },
    BENEFITS: {
      TITLE: "Why Join or Create a Party?",
      ITEMS: [
        {
          key: "team-up",
          icon: "Users",
          title: "Team Up",
          description: "Work with skilled professionals and take on complex quests.",
        },
        {
          key: "build-reputation",
          icon: "Star",
          title: "Build Reputation",
          description: "Earn shared Trust Points and improve your Party Rank together.",
        },
        {
          key: "earn-more",
          icon: "TrendingUp",
          title: "Earn More",
          description: "Larger quests come with higher budgets and better opportunities.",
        },
        {
          key: "unlock-guild-quests",
          icon: "Shield",
          title: "Unlock Guild Quests",
          description: "Some premium quests are only available for verified Parties.",
        },
      ],
    },
    HOW_IT_WORKS: {
      TITLE: "How it works",
      STEPS: [
        {
          key: "create-or-join",
          icon: "Plus",
          title: "Create or Join a Party",
          description: "Start your own or accept an invitation.",
        },
        {
          key: "build-team",
          icon: "Users",
          title: "Build Your Team",
          description: "Recruit up to 5 members.",
        },
        {
          key: "verify-party",
          icon: "Shield",
          title: "Verify Party",
          description: "Get verified to unlock quests and safety.",
        },
        {
          key: "accept-quests",
          icon: "Focus",
          title: "Accept Quests",
          description: "Apply and get hired for quests that match your skills.",
        },
        {
          key: "complete-together",
          icon: "TrendingUp",
          title: "Complete Together",
          description: "Work as a team and deliver high-quality results.",
        },
        {
          key: "earn-rank-up",
          icon: "BadgeCheck",
          title: "Earn & Rank Up",
          description: "Get payments, build reputation, and level up.",
        },
      ],
    },
    CTA: {
      TITLE: "Ready to start your journey?",
      DESCRIPTION:
        "Create or join a Party today and take the first step toward higher ranks and bigger opportunities.",
      BUTTON: "Create Your Party",
    },
  },

  // Create Party — 5-step wizard reached from the Party Formation landing page
  CREATE_PARTY: {
    HEADER: {
      TITLE: "Create Your Party",
      BACK: "Back to Party Management",
      SAVE_DRAFT: "Save as Draft",
      CANCEL: "Cancel",
      SEARCH_PLACEHOLDER: "Search projects, clients, or freelancers...",
      SUBTITLES: {
        details: "Build your team, invite skilled professionals, and start your journey together.",
        members: "Invite the right people to build a strong, balanced team.",
        skills: "Show clients what your party is capable of delivering.",
        review: "Review all details before submitting your party for verification.",
        success: "Your party has been successfully submitted for verification.",
      },
    },
    STEPS: [
      // `number` is required: the shared Stepper reads `step.number || step.id`,
      // so an object without it falls back to the id string and no step ever
      // matches `currentStep`.
      { number: 1, id: "details", label: "Party Details" },
      { number: 2, id: "members", label: "Invite Members" },
      { number: 3, id: "skills", label: "Skills & Expertise" },
      { number: 4, id: "review", label: "Review & Submit" },
      { number: 5, id: "success", label: "Success" },
    ],
    ACTIONS: {
      CONTINUE: "Continue",
      BACK: "Back",
      SUBMIT: "Submit Party for Verification",
      VIEW_PARTY: "View Party",
      GO_TO_MANAGEMENT: "Go to Party Management",
    },
    LIMITS: {
      NAME_MAX: 50,
      TAG_MAX: 20,
      DESCRIPTION_MAX: 250,
      SKILLS_MAX: 15,
      MEMBERS_MIN: 5,
      LOGO_MAX_MB: 2,
      LOGO_RECOMMENDED: "512x512px",
    },
    CATEGORIES: [
      { id: "development", label: "Development", icon: "Layers" },
      { id: "design", label: "Design", icon: "Palette" },
      { id: "marketing", label: "Marketing", icon: "TrendingUp" },
      { id: "writing", label: "Writing", icon: "NotebookText" },
      { id: "ai-ml", label: "AI / ML", icon: "Layers" },
      { id: "other", label: "Other", icon: "MoreHorizontal" },
    ],
    DETAILS: {
      CARD_TITLE: "Party Details",
      CARD_SUBTITLE: "Provide basic information about your party.",
      NAME_LABEL: "Party Name",
      NAME_PLACEHOLDER: "Pixel Masters",
      NAME_HINT: "Choose a unique and memorable name for your party.",
      TAG_LABEL: "Party Tag (Username)",
      TAG_PLACEHOLDER: "@pixelmasters",
      TAG_HINT: "Your party tag is used to invite members.",
      TAG_AVAILABLE: "Username is available",
      TAG_TAKEN: "Username is already taken",
      DESCRIPTION_LABEL: "Short Description",
      DESCRIPTION_PLACEHOLDER: "Tell clients what your party does best...",
      DESCRIPTION_HINT: "A short description of your party and what you do.",
      CATEGORY_LABEL: "Party Category",
      CATEGORY_HINT: "Select the categories that best represent your party.",
      LOGO_LABEL: "Party Logo (Optional)",
      LOGO_UPLOAD: "Upload Logo",
      LOGO_FORMATS: "PNG, JPG or SVG (max. 2MB)",
      LOGO_GUIDELINES_TITLE: "Logo Guidelines",
      LOGO_GUIDELINES: [
        "Square image recommended (512x512px)",
        "High resolution, clear and visible",
        "PNG, JPG or SVG format",
        "Maximum file size: 2MB",
      ],
    },
    MEMBERS: {
      CARD_TITLE: "Invite Members",
      CARD_SUBTITLE: "Search and invite TechGuild users or share an invite link to bring members to your party.",
      TAB_SEARCH: "Search Users",
      TAB_LINK: "Invite Link",
      SEARCH_PLACEHOLDER: "Search by name, username, or email...",
      FILTERS: "Filters",
      VIEW_MORE: "View more results",
      EMPTY_SEARCH: "No users matched your search.",
      INVITED_TITLE: "Invited Members",
      CLEAR_ALL: "Clear All",
      ROLE_LEAD: "Party Lead",
      STATUS_LEAD: "Lead",
      STATUS_PENDING: "Pending",
      INVITE: "Invite",
      INVITED: "Invited",
      MIN_HINT_TITLE: "Invite at least {n} more members to continue",
      MIN_HINT_BODY: "Your party must have a minimum of {n} members before submission.",
      INVITE_LINK_TITLE: "Share your invite link",
      INVITE_LINK_BODY: "Anyone with this link can request to join your party.",
      COPY_LINK: "Copy Link",
      LINK_COPIED: "Link copied",
    },
    SKILLS: {
      CARD_TITLE: "Skills & Expertise",
      CARD_SUBTITLE: "Select the skills and specializations your party excels in.",
      ADD_SKILLS_LABEL: "Add Skills",
      ADD_SKILLS_HINT: "Search and add skills relevant to your party. You can add up to {n} skills.",
      SEARCH_PLACEHOLDER: "Search skills (e.g., React, UI/UX, Node.js...)",
      SUGGESTIONS: "Suggestions",
      VIEW_MORE_SKILLS: "View more skills",
      POSITIONS_LABEL: "Positions",
      POSITIONS_HINT: "Choose the roles you need for your party.",
      ADD_POSITION: "Add a position",
      REMOVE_POSITION: "Remove position",
      WHY_TITLE: "Why add skills?",
      WHY_BODY:
        "Adding relevant skills helps clients find your party easily and shows your expertise in specific domains.",
      MAX_REACHED: "You have reached the maximum of {n} skills.",
    },
    REVIEW: {
      CARD_TITLE: "Review Your Party Details",
      CARD_SUBTITLE: "Please review all information carefully. You can go back and edit if needed.",
      EDIT: "Edit",
      SEC_DETAILS: "Party Details",
      SEC_MEMBERS: "Members",
      SEC_SKILLS: "Skills & Positions",
      SEC_EXTRA: "Additional Information",
      VIEW_ALL_MEMBERS: "View all member details",
      VIEW_ALL_SKILLS: "View all skills",
      LABEL_NAME: "Party Name",
      LABEL_DESCRIPTION: "Description",
      LABEL_CATEGORY: "Category",
      LABEL_LOGO: "Party Logo",
      LABEL_SELECTED_SKILLS: "Selected Skills",
      LABEL_POSITIONS: "Positions",
      LABEL_LEAD: "Party Lead",
      LABEL_VISIBILITY: "Visibility",
      LABEL_COMMUNICATION: "Communication",
      LABEL_AVAILABILITY: "Availability",
      VALUE_PUBLIC: "Public",
      VALUE_CHAT: "In-app Chat",
      VALUE_OPEN: "Open to quests",
      NOT_SET: "Not set yet",
      NOT_SELECTED: "Not selected",
      NEXT_TITLE: "What happens next?",
      NEXT_BODY_1: "After you submit, your party will be reviewed by our verification team.",
      NEXT_BODY_2: "You will be notified once your party is verified and ready to accept quests.",
      EMPTY: "Nothing to review yet.",
    },
    SUCCESS: {
      TITLE: "Party Submitted Successfully!",
      BODY: 'Your party "{name}" has been submitted for verification.',
      BODY_2: "Our team will review your details and notify you once approved.",
      STATUS_LABEL: "Current Status",
      STATUS_VALUE: "Pending Verification",
      SUBMISSION_ID_LABEL: "Submission ID",
      COPY_ID: "Copy ID",
      COPIED: "Copied",
      NEXT_TITLE: "What happens next?",
      NEXT_STEPS: [
        {
          key: "review",
          title: "Verification Review",
          body: "Our team will review your party details, members, and skills.",
        },
        {
          key: "approval",
          title: "Approval & Notification",
          body: "You will be notified once your party is verified and approved.",
        },
        {
          key: "journey",
          title: "Start Your Journey",
          body: "Once approved, you can start applying for quests and grow your reputation.",
        },
      ],
      NOTICE_TITLE: "You will receive a notification in-app and via email once your party is verified.",
      NOTICE_BODY: "You can continue exploring the platform in the meantime.",
    },
    VALIDATION: {
      NAME_REQUIRED: "Party name is required.",
      TAG_REQUIRED: "Party tag is required.",
      DESCRIPTION_REQUIRED: "Short description is required.",
      CATEGORY_REQUIRED: "Select at least one party category.",
      MEMBERS_REQUIRED: "Invite at least {n} members before continuing.",
      SKILLS_REQUIRED: "Add at least one skill.",
    },
  },

  // Party Lead dashboard — the "party created" landing page. Reached after the
  // Create Party wizard submits; only rendered for the user who owns the party,
  // because approve/decline of join requests is a lead-only action.
  PARTY_LEAD: {
    HEADER: {
      TITLE: "Party Management",
      SUBTITLE_LEAD: "You are the Party Lead of {party}. Manage your team and get ready to submit.",
      REFRESH: "Refresh",
      HOW_IT_WORKS: "How Parties Work?",
      SETTINGS: "Party Settings",
    },
    HERO: {
      LEAD_CHIP: "You are the Party Lead",
      SLOTS_LABEL: "Member Slots",
      CONFIRMED: "{n} / {max} confirmed",
      WARN: "You need {n} more confirmed members before you can submit your party for verification. {r} join requests waiting for your response.",
      REVIEW_REQUESTS: "Review Requests",
    },
    TABS: {
      MEMBERS: "Members & Requests",
      OVERVIEW: "Overview",
      ACTIVITY: "Activity",
      SETTINGS: "Settings",
    },
    MEMBERS: {
      TITLE: "Confirmed Members",
      COUNT: "{n} / {max}",
      INVITE: "Invite Member",
      CONFIRMED_CHIP: "Confirmed",
      LEAD_CHIP: "Lead",
      YOU: "You",
      REMOVE: "Remove member {name}",
    },
    INVITES: {
      TITLE: "Pending Invites",
      AWAITING: "{n} awaiting",
      PENDING_CHIP: "Invite Pending",
      RESEND: "Resend",
      CANCEL: "Cancel",
      EXPIRY: "Invitee has 7 days to accept before the invite expires.",
    },
    REQUESTS: {
      TITLE: "Join Requests",
      NEW: "{n} new",
      SUBTITLE: "These people found your party and want to join. Review their profiles and accept or decline.",
      WANTS_TO_JOIN: "Wants to Join",
      ACCEPT: "Accept",
      DECLINE: "Decline",
      VIEW_PROFILE: "View Profile",
      EMPTY: "No pending join requests right now.",
    },
    ACTIVITY: {
      TITLE: "Recent Activity",
    },
    CHECKLIST: {
      TITLE: "Submission Checklist",
      CONFIRMED_ROW: "Confirmed members",
      LOCKED: "Need {n} more members",
      HINT: "Accept requests or invite more members to unlock submission.",
    },
    BREAKDOWN: {
      TITLE: "Member Breakdown",
      CONFIRMED: "Confirmed",
      PENDING: "Invite Pending",
      REQUESTS: "Join Requests",
      OPEN: "Open Slots",
    },
    INFO: {
      TITLE: "Party Info",
      EDIT: "Edit",
      CATEGORY: "Category",
      VISIBILITY: "Visibility",
      CHAT: "Chat",
      AVAILABILITY: "Availability",
      GUILD_ID: "Guild ID",
      COPY_ID: "Copy guild ID",
      COPIED: "Guild ID copied.",
    },
    QUICK_ACTIONS: {
      TITLE: "Quick Actions",
    },
    TIPS: {
      TITLE: "Party Lead Tips",
    },
    MESSAGES: {
      MEMBER_REMOVED: "{name} removed from the party.",
      INVITE_RESENT: "Invitation resent to {name}.",
      INVITE_CANCELLED: "Invitation to {name} cancelled.",
      REQUEST_ACCEPTED: "{name} added to your party.",
      REQUEST_DECLINED: "Request from {name} declined.",
    },
  },

  // Leave Party — two confirmation screens (Figma "Leave Party(Member)" 207:1389
  // and "Leave Party(Lead)" 207:1632). One component renders both; `variant`
  // decides whether the leadership-transfer section is shown.
  PARTY_EXIT: {
    BACK: "Back to Party",
    MEMBER: {
      TITLE: "Leave Party",
      SUBTITLE: "You are about to leave this party",
      WARN_TITLE: "Leaving this party will:",
      REASON_TITLE: "Why are you leaving this party?",
      REASON_HINT: "Your feedback helps us improve the community experience.",
      FEEDBACK_LABEL: "Additional feedback",
      FEEDBACK_PLACEHOLDER: "Share your thoughts...",
      OPTIONAL: "(Optional)",
      FOOTER_NOTE: "You can rejoin this party anytime if you've invited again.",
      ACTION: "Leave Party",
    },
    LEAD: {
      SUBTITLE: "You are the {role}. Transfer leadership to a member before leaving.",
      WARN_TITLE: "As the {role}, leaving will:",
      ROLE: "Party Lead",
      TRANSFER_TITLE: "Transfer Party Leadership",
      REQUIRED: "Required",
      TRANSFER_HINT: "Select a member to become the new Party Lead. They will inherit all lead permissions immediately.",
      FOOTER_NOTE: "Select a new Party Lead to enable the Leave button.",
      ACTION: "Transfer & Leave Party",
    },
    CANCEL: "Cancel",
    QUEST: "{n} Quests",
    JOINED: "Joined {date}",
    MESSAGES: {
      LEFT: "You have left {party}.",
      TRANSFERRED: "{party} handed to {name}. You have left the party.",
    },
  },

  // Delete Party — lead-only, irreversible (Figma "Delete Party(Lead)" 207:1989).
  PARTY_DELETE: {
    BACK: "Back to Party",
    TITLE: "Delete Party",
    BADGE: "Irreversible Action",
    SUBTITLE: "Only the {role} can delete the party. All members must consent before deletion is finalised.",
    ROLE: "Party Lead",
    ELIGIBILITY: {
      TITLE: "Deletion Eligibility",
      HINT: "All conditions must be satisfied before the party can be deleted.",
      COUNT: "{met} / {total} conditions met",
      NOTE: "Note: If your party has active quests, the delete option will be permanently blocked until all cases are completed or canceled by the client.",
      WILL_BE_NOTIFIED: "Will be notified",
      AUTO_APPROVED: "Auto-approved",
    },
    HOW_IT_WORKS: "How Party Deletion Works",
    DELETES: "What Gets Deleted",
    KEEPS: "What is Kept",
    CONSENT: {
      TITLE: "Member Consent Required",
      HINT: "All members below will receive a deletion request notification. The party is only deleted once {all} within 48 hours.",
      ALL: "all members approve",
      NOTE: "If any member declines or the 48-hour window expires without full approval, the deletion request is automatically cancelled.",
    },
    CONFIRM: {
      TITLE: "Confirm Deletion",
      HINT: "To confirm, type {name} exactly in the field below.",
      PLACEHOLDER: "Type party name to confirm...",
      UPPER: "PIXEL MASTERS",
    },
    FOOTER_NOTE: "Type the party name above and ensure all eligibility conditions are met.",
    CANCEL: "Cancel",
    ACTION: "Submit Deletion Request",
    MESSAGES: {
      REQUESTED: "Deletion request for {party} submitted. Members have 48 hours to respond.",
    },
  },

  // Join Party — 4-step drill-down reached from the Party Formation landing page.
  // NOTE: these frames use the slate palette (#0f172a / #64748b / #334155 / #475467 /
  // #94a3b8), which differs from the Create Party frames' #111827 / #667085 set.
  // Each flow follows its own design.
  JOIN_PARTY: {
    HEADER: {
      BROWSE_TITLE: "Join a Party",
      BROWSE_SUBTITLE: "Discover trusted teams and join a party to unlock Rank E and grow together.",
      DETAIL_TITLE: "Join a Party",
      REQUEST_TITLE: "Request to Join",
      REQUEST_SUBTITLE: "Send your application to {party}. The Party Lead will review your profile and respond.",
      BACK_TO_MANAGEMENT: "Back to Party Management",
      BACK_TO_BROWSE: "Back to Join a Party",
      BACK_TO_PARTY: "Back to {party}",
      SEARCH_PLACEHOLDER: "Search projects, clients, or freelancers...",
    },
    BROWSE: {
      SEARCH_PLACEHOLDER: "Search parties by name, skills, or keywords...",
      FILTERS: "Filters",
      SORTS: ["Newest", "Highest Rated", "Most Members", "Most Projects"],
      CATEGORIES: ["All Categories", "Development", "Design", "AI / ML", "Marketing", "Writing"],
      MORE_CATEGORIES: ["Video Production", "Content", "Consulting"],
      MORE_LABEL: "More",
      FOUND: "{n} parties found",
      NO_RESULTS: "No parties matched your search.",
      CLEAR_FILTERS: "Clear all filters",
      VIEW_PARTY: "View Party",
      REQUEST_TO_JOIN: "Request to Join",
      LOOKING_FOR: "Looking For",
      SKILLS: "Skills",
      PREVIOUS: "Previous",
      NEXT: "Next",
      MORE_PAGES: "...",
      VIEW_TOGGLE_GRID: "Grid view",
      VIEW_TOGGLE_LIST: "List view",
    },
    RAIL_BROWSE: {
      REQUIREMENTS_TITLE: "Join Requirements",
      REQUIREMENTS: [
        { key: "email", label: "Email Verified", met: true },
        { key: "identity", label: "Identity Verified", met: true },
        { key: "profile", label: "Profile Completed", met: true },
        { key: "portfolio", label: "Portfolio Added", met: false },
      ],
      COMPLETE_PROFILE: "Complete Profile",
      SKILLS_TITLE: "Your Skills",
      EDIT: "Edit",
      MATCHED_WITH: "Auto matched with",
      TIPS_TITLE: "Tips",
      TIPS_BODY:
        "Send a request that stands out! Mention your relevant experience and past work to increase your chances of getting accepted.",
    },
    DETAIL: {
      REQUEST_TITLE: "Request to Join",
      REQUEST_BODY: "Send a join request to {party}. The Party Lead will review your profile.",
      ELIGIBILITY: "Your Eligibility",
      NOTIFIED: "You'll be notified once the Party Lead responds.",
      ABOUT_TITLE: "About {party}",
      LOOKING_FOR_TITLE: "We're Looking For",
      OPEN_POSITIONS: "{n} open positions",
      POSITIONS: [
        { key: "ui", title: "UI Designer", skills: ["Figma", "UI Design", "Wireframing"], desc: "3+ years experience with Figma and design systems.", open: true },
        { key: "react", title: "React Developer", skills: ["React", "TypeScript"], desc: "Strong in React, TypeScript, and component libraries.", open: true },
        { key: "ux", title: "UX Researcher", skills: ["UX Design", "Prototyping"], desc: "Experience in user interviews, testing, and analysis.", open: true },
        { key: "devops", title: "DevOps Engineer", skills: ["AWS", "Docker", "CI/CD"], desc: "AWS, Docker, CI/CD pipelines. Preferred but optional.", open: false },
      ],
      STATUS_OPEN: "Open",
      STATUS_FILLED: "Filled",
      MEMBERS_TITLE: "Party Members",
      MEMBERS_FULL: "Full",
      SKILLS_TITLE: "Skills & Expertise",
      REVIEWS_TITLE: "Client Reviews",
      REVIEWS_SUMMARY: "{n} reviews",
      LEAD_TITLE: "Party Lead",
      MESSAGE: "Message",
      VIEW_PROFILE: "Profile",
      INFO_TITLE: "Party Info",
      GUILD_ID_LABEL: "Guild ID",
      FACTS: {
        VISIBILITY: "Visibility",
        COMMUNICATION: "Communication",
        AVAILABILITY: "Availability",
        MEMBER_SINCE: "Member Since",
        LOCATION: "Location",
        PARTY_TAG: "Party Tag",
      },
      VALUES: {
        VISIBILITY: "Public",
        COMMUNICATION: "In-app Chat",
        AVAILABILITY: "Open to Quests",
        LOCATION: "Pune, India",
      },
    },
    REQUEST: {
      STEP_ROLE: "Select a Role",
      STEP_ROLE_SUB: "Choose which open position you're applying for in this party.",
      ROLES: [
        // `match` is a backend-computed skills-match score, not a simple
        // overlap ratio — mock it rather than deriving it (an overlap ratio
        // yields 100/0/100 here, which reads far too binary next to the design).
        { key: "ui", title: "UI Designer", skills: ["Figma", "UI Design", "Wireframing"], match: 94 },
        { key: "react", title: "React Developer", skills: ["React", "TypeScript"], match: 72 },
        { key: "ux", title: "UX Researcher", skills: ["UX Design", "Prototyping"], match: 88 },
      ],
      ROLE_MATCH: "{n}% match",
      CHIP_LEGEND: "Green chips = skills you already have · Gray chips = skills party also needs",
      STEP_INTRO: "Write Your Introduction",
      STEP_INTRO_SUB:
        "Tell the Party Lead why you'd be a great fit. Mention your experience, past work, and what you can bring to the team.",
      STEP_PORTFOLIO: "Portfolio & Links",
      STEP_PORTFOLIO_SUB: "Share relevant work samples or links to strengthen your application.",
      OPTIONAL: "Optional",
      STEP_AVAILABILITY: "Your Availability",
      STEP_AVAILABILITY_SUB: "Let the party know how much time you can commit each week.",
      INTRO_LABEL: "Your Introduction",
      INTRO_PLACEHOLDER: "Hi, I'm Siddhi — a UI/UX designer with 4 years of experience building SaaS products...",
      SUGGESTED_LABEL: "Suggested Talking Points",
      SUGGESTED: [
        "Your experience level",
        "Relevant past projects",
        "Your availability",
        "Why this party",
        "Tools you use",
      ],
      LINKS: {
        PORTFOLIO: "Portfolio URL",
        BEHANCE: "Behance / Dribbble",
        GITHUB: "GitHub",
        LINKEDIN: "LinkedIn",
      },
      LINK_PLACEHOLDERS: {
        PORTFOLIO: "https://yourportfolio.com",
        BEHANCE: "https://behance.net/you",
        GITHUB: "https://github.com/username",
        LINKEDIN: "https://linkedin.com/in/you",
      },
      AVAILABILITY_OPTIONS: [
        { id: "full", label: "Full-time", hours: "40+ hrs / week" },
        { id: "part", label: "Part-time", hours: "15–25 hrs / week" },
        { id: "weekends", label: "Weekends", hours: "10–15 hrs / week" },
      ],
      START_DATE_LABEL: "Earliest Start Date",
      SUBMIT_WARNING:
        "Once you submit, the Party Lead will review your application. You'll receive an in-app and email notification when they respond. You cannot edit the request after submission.",
      SUBMIT: "Submit Request",
      BACK: "Back",
      LOCKED_NOTE: "You can't edit after submission.",
      APPLYING_TO: "Applying To",
      MATCH_TITLE: "Your Skills Match",
      SKILLS_YOU_HAVE: "Skills you have",
      SKILLS_PARTY_NEEDS: "Skills party also needs",
      ELIGIBILITY_TITLE: "Eligibility Check",
      PORTFOLIO_MISSING_TITLE: "Portfolio missing",
      PORTFOLIO_MISSING_BODY:
        "Adding a portfolio improves your chances of acceptance. You can still apply now.",
      TIPS_TITLE: "Tips for a strong request",
      TIPS: [
        "Be specific about your experience",
        "Mention tools and past projects",
        "Show enthusiasm for the party's mission",
        "Keep your intro under 300 words",
      ],
    },
    SUCCESS: {
      TITLE: "Request Submitted Successfully!",
      BODY: 'Your request to "{party}" has been submitted.',
      BODY_2: "Team will review your details and notify you once approved.",
      STATUS_LABEL: "Current Status",
      STATUS_VALUE: "Pending Approval",
      SUBMISSION_ID_LABEL: "Submission ID",
      COPY_ID: "Copy ID",
      COPIED: "Copied",
      VIEW_PARTY: "View Party",
      GO_TO_MANAGEMENT: "Go to Party Management",
      NOTICE_TITLE: "You will receive a notification in-app and via email once you are approved.",
      NOTICE_BODY: "You can continue exploring the platform in the meantime.",
    },
    VALIDATION: {
      ROLE_REQUIRED: "Select a role to continue.",
      INTRO_REQUIRED: "Write a short introduction before submitting.",
      INTRO_TOO_LONG: "Keep your introduction under 500 characters.",
      URL_INVALID: "Enter a valid URL (starting with http:// or https://).",
    },
    MOCK: {
      // Sample directory used until teamsApi exposes a public party search.
      LEAD: { name: "Arjun Mehta", handle: "@arjun.mehta", role: "Full Stack Developer" },
      ME: { name: "You", handle: "@siddhi", role: "UI/UX Designer" },
      MY_SKILLS: ["Figma", "UI Design", "UX Design", "Wireframing", "Prototyping"],
      MEET_REQUIREMENTS: 3,
      TOTAL_REQUIREMENTS: 4,
      MATCHED_PARTIES: 12,
      TOTAL_PARTIES: 12,
      PAGE_SIZE: 4,
      PAGE_COUNT: 6,
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
