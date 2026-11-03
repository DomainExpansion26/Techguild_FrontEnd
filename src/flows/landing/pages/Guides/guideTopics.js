// 03-11-2026
// Static data describing guide topics and their individual guides.
export const GUIDE_TOPICS = [
  {
    slug: "getting-started",
    icon: "User",
    title: "Getting Started",
    to: "/guides/getting-started/create-account",
    text: "Learn the basics and set up your TechGuild account.",
    guides: [
      {
        title: "How to create a TechGuild account",
        text: "A step-by-step guide to signing up and setting up your account.",
        to: "/guides/getting-started/create-account",
      },
      {
        title: "Complete your profile",
        text: "Add your details, skills and preferences to get the most out of TechGuild.",
      },
      {
        title: "Tour your dashboard",
        text: "Understand the main areas of your account and where to find everything.",
      },
      {
        title: "Find your first quest",
        text: "Use search and filters to discover quests that match your skills.",
      },
      {
        title: "Set up notifications",
        text: "Stay up to date with quest updates, messages and payments.",
      },
    ],
  },
  {
    slug: "freelancers",
    icon: "Monitor",
    title: "For Freelancers",
    text: "Find work, submit proposals and manage your projects.",
    guides: [
      {
        title: "How to apply for a quest",
        text: "Learn how to find the right quest and submit a strong proposal.",
      },
      {
        title: "Build a standout profile",
        text: "Showcase your skills, experience and portfolio to attract clients.",
      },
      {
        title: "Write winning proposals",
        text: "Structure your proposal to stand out and win more quests.",
      },
      {
        title: "Manage active quests",
        text: "Track deadlines, communicate with clients and deliver on time.",
      },
      {
        title: "Get paid for your work",
        text: "Understand milestones, approvals and how escrow releases funds.",
      },
      {
        title: "Grow your reputation",
        text: "Earn reviews and ratings that unlock better opportunities.",
      },
      {
        title: "Join a party as a freelancer",
        text: "Collaborate with other freelancers on larger quests.",
      },
      {
        title: "Withdraw your earnings",
        text: "Learn how to move your available balance to your bank account.",
      },
    ],
  },
  {
    slug: "clients",
    icon: "Briefcase",
    title: "For Clients",
    text: "Post quests, review applications and manage projects.",
    guides: [
      {
        title: "How to post a quest",
        text: "Create a quest, set requirements and start receiving applications.",
      },
      {
        title: "Write clear quest requirements",
        text: "Define scope, deliverables and timelines so the right freelancers apply.",
      },
      {
        title: "Review applications",
        text: "Compare proposals, profiles and ratings to shortlist the best talent.",
      },
      {
        title: "Hire the right freelancer",
        text: "Ask the right questions and make confident hiring decisions.",
      },
      {
        title: "Manage quests and milestones",
        text: "Keep work on track with clear milestones and regular check-ins.",
      },
      {
        title: "Release escrow payments",
        text: "Approve completed work and release funds securely.",
      },
      {
        title: "Leave a review for a freelancer",
        text: "Share feedback that helps the community and builds trust.",
      },
    ],
  },
  {
    slug: "parties",
    icon: "Users",
    title: "Parties",
    text: "Create or join a party and collaborate on bigger opportunities.",
    guides: [
      {
        title: "How to join or create a party",
        text: "Collaborate with other freelancers to take on bigger projects.",
      },
      {
        title: "Invite members to your party",
        text: "Grow your party with freelancers who complement your skills.",
      },
      {
        title: "Understand party roles",
        text: "Learn how members, leads and roles work inside a party.",
      },
      {
        title: "Collaborate on a quest",
        text: "Coordinate tasks, share updates and deliver as a team.",
      },
      {
        title: "Build your party reputation",
        text: "Earn ratings and rankings that help your party win more work.",
      },
    ],
  },
  {
    slug: "payments-finance",
    icon: "CreditCard",
    title: "Payments & Finance",
    text: "Understand escrow, payments and withdrawals.",
    guides: [
      {
        title: "Understanding escrow payments",
        text: "Learn how escrow works and when payments are released.",
      },
      {
        title: "Add a payout method",
        text: "Set up the bank account where your earnings will be sent.",
      },
      {
        title: "Withdraw your funds",
        text: "Move your available balance out of TechGuild securely.",
      },
      {
        title: "Payment timelines and fees",
        text: "Know when payments arrive and what fees may apply.",
      },
      {
        title: "Refunds and disputes",
        text: "Understand your options if a quest does not go as planned.",
      },
      {
        title: "View your transaction history",
        text: "Track payments, withdrawals and escrow activity in one place.",
      },
    ],
  },
  {
    slug: "account-security",
    icon: "ShieldCheck",
    title: "Account & Security",
    text: "Keep your account safe and manage your settings.",
    guides: [
      {
        title: "How to verify your account",
        text: "Complete verification to access all platform features.",
      },
      {
        title: "Set up two-factor authentication",
        text: "Add an extra layer of protection to your account.",
      },
      {
        title: "Manage your password",
        text: "Change your password and keep your login details secure.",
      },
      {
        title: "Control your privacy settings",
        text: "Choose what others can see on your profile.",
      },
      {
        title: "Keep your account secure",
        text: "Spot suspicious activity and follow security best practices.",
      },
    ],
  },
];

export const getGuideTopic = (slug) => GUIDE_TOPICS.find((topic) => topic.slug === slug);
