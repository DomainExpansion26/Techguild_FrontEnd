// 03-11-2026
// Step-by-step guide for freelancers on finding quests, applying, and getting paid.
import Icon from "@/Components/icons/Icon";
import FullGuideLayout from "./FullGuideLayout";
import {
  CheckTiles,
  ChecklistPanel,
  GuideSection,
  MockCard,
  NumberedList,
  OverviewBox,
  StepsFlow,
  TipsPanel,
} from "./guideArticleParts";

const TOC = [
  { id: 1, label: "Overview" },
  { id: 2, label: "Find Opportunities" },
  { id: 3, label: "Apply to a Quest" },
  { id: 4, label: "Work with Clients" },
  { id: 5, label: "Join or Create a Party" },
  { id: 6, label: "Get Paid" },
  { id: 7, label: "Manage Your Profile" },
  { id: 8, label: "Build Your Reputation" },
  { id: 9, label: "Tips for Success" },
];

const OVERVIEW = [
  {
    title: "Find relevant opportunities",
    text: "Explore quests that match your skills and experience.",
  },
  {
    title: "Work with trusted clients",
    text: "Collaborate with clients and parties with clear milestones.",
  },
  {
    title: "Get paid securely",
    text: "Payments are held in escrow and released on milestone completion.",
  },
  {
    title: "Grow your profile and ranking",
    text: "Build your reputation and unlock bigger opportunities.",
  },
];

const FIND_OPPORTUNITIES = [
  {
    title: "Browse available quests",
    text: "Go to the Find Work section to explore open quests.",
  },
  {
    title: "Use filters",
    text: "Filter by skills, budget, duration, location and more.",
  },
  {
    title: "Read quest details",
    text: "Check the requirements, deliverables, budget, timeline and client profile before applying.",
  },
];

const APPLY_STEPS = [
  {
    title: "Review requirements",
    text: "Understand the project goals and required skills.",
  },
  {
    title: "Write a compelling proposal",
    text: "Explain why you're a good fit and share relevant experience.",
  },
  {
    title: "Attach portfolio or samples",
    text: "Add your previous work to showcase your skills.",
  },
  {
    title: "Submit your application",
    text: "Review and submit your proposal to the client.",
  },
];

const CLIENT_STEPS = [
  {
    title: "Discuss project details",
    text: "Align on scope, timeline and milestones.",
  },
  {
    title: "Work on milestones",
    text: "Complete tasks and submit for review.",
  },
  {
    title: "Get feedback",
    text: "Incorporate feedback and make revisions if required.",
  },
  {
    title: "Complete the quest",
    text: "Once all milestones are approved, you'll receive your payment.",
  },
];

const JOIN_ITEMS = [
  "Find existing parties",
  "View party details and requirements",
  "Send a join request",
];

const CREATE_ITEMS = [
  "Create a new party",
  "Invite members",
  "Collaborate on bigger quests together",
];

const PAYMENT_TILES = [
  "Payments are held in escrow",
  "Get paid on milestone approval",
  "View earnings and invoices in Finance",
  "Withdraw to your bank account",
];

const PROFILE_TILES = [
  "Add your skills and experience",
  "Showcase your portfolio",
  "Set your availability and hourly rate",
  "Write a compelling bio",
];

const REPUTATION_TILES = [
  "Earn trust points through successful quests",
  "Receive client reviews and ratings",
  "Unlock higher ranks and better opportunities",
];

const TIPS = [
  [
    "Keep your profile updated",
    "Write clear and professional proposals",
    "Communicate regularly with clients",
  ],
  [
    "Deliver high-quality work on time",
    "Maintain a good rating",
    "Explore party opportunities for bigger quests",
  ],
];

function FindWorkMock() {
  return (
    <MockCard>
      <div className="fg-mock-title">
        <Icon name="Search" size={10} color="#2563eb" />
        Find Work
      </div>
      <div className="fg-mock-search">
        <Icon name="Search" size={9} color="#94a3b8" />
        Search quests...
      </div>
      <div className="fg-chips">
        <span className="is-active">All</span>
        <span>UI/UX</span>
        <span>Development</span>
        <span>Design</span>
      </div>
    </MockCard>
  );
}

export default function FreelancersGuide() {
  return (
    <FullGuideLayout
      title="For Freelancers"
      subtitle="A complete guide to finding opportunities, submitting proposals, working with clients and growing your freelance career on TechGuild."
      icon="User"
      toc={TOC}
    >
      <GuideSection
        id={1}
        title="Overview"
        subtitle="TechGuild connects you with clients and parties to work on meaningful projects based on your skills and interests."
      >
        <OverviewBox label="AS A FREELANCER, YOU CAN:" items={OVERVIEW} />
      </GuideSection>

      <GuideSection
        id={2}
        title="Find Opportunities"
        subtitle="Browse and find quests that match your skills, experience and availability."
      >
        <div className="fg-split">
          <FindWorkMock />
          <NumberedList items={FIND_OPPORTUNITIES} />
        </div>
      </GuideSection>

      <GuideSection
        id={3}
        title="Apply to a Quest"
        subtitle="Submit a strong proposal to increase your chances of getting selected."
      >
        <StepsFlow steps={APPLY_STEPS} />
      </GuideSection>

      <GuideSection
        id={4}
        title="Work with Clients"
        subtitle="After your application is accepted, collaborate with your client to complete the project."
      >
        <StepsFlow steps={CLIENT_STEPS} />
      </GuideSection>

      <GuideSection
        id={5}
        title="Join or Create a Party"
        subtitle="Team up with other freelancers to take on bigger and more complex quests."
      >
        <div className="fg-two-panels">
          <ChecklistPanel title="Join a Party" columns={[JOIN_ITEMS]} />
          <ChecklistPanel title="Create a Party" columns={[CREATE_ITEMS]} />
        </div>
      </GuideSection>

      <GuideSection
        id={6}
        title="Get Paid"
        subtitle="TechGuild ensures secure and transparent payments for your work."
      >
        <CheckTiles items={PAYMENT_TILES} />
      </GuideSection>

      <GuideSection
        id={7}
        title="Manage Your Profile"
        subtitle="A strong profile helps you attract more clients and better opportunities."
      >
        <CheckTiles items={PROFILE_TILES} />
      </GuideSection>

      <GuideSection
        id={8}
        title="Build Your Reputation"
        subtitle="Complete projects, get positive reviews and improve your ranking."
      >
        <CheckTiles items={REPUTATION_TILES} />
      </GuideSection>

      <GuideSection
        id={9}
        title="Tips for Success"
        subtitle="Make the most of your freelance journey on TechGuild."
      >
        <TipsPanel columns={TIPS} />
      </GuideSection>
    </FullGuideLayout>
  );
}
