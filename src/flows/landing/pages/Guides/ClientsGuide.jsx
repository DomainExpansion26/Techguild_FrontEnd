// 03-11-2026
// Step-by-step guide for clients on posting quests, hiring, and managing projects.
import Icon from "@/Components/icons/Icon";
import FullGuideLayout from "./FullGuideLayout";
import {
  ChecklistPanel,
  GuideSection,
  NumberedList,
  OverviewBox,
  StepsFlow,
  TipsPanel,
} from "./guideArticleParts";

const TOC = [
  { id: 1, label: "Overview" },
  { id: 2, label: "Create a Quest" },
  { id: 3, label: "Review Applications" },
  { id: 4, label: "Hire a Freelancer" },
  { id: 5, label: "Manage Your Project" },
  { id: 6, label: "Make Payments" },
  { id: 7, label: "Work with Parties" },
  { id: 8, label: "Close the Project" },
  { id: 9, label: "Tips for Success" },
];

const OVERVIEW = [
  { title: "Post quests and clearly define your requirements." },
  { title: "Find and hire verified, skilled freelancers or parties." },
  { title: "Manage projects with milestones and secure payments." },
  { title: "Get high-quality work delivered on time, with full transparency." },
];

const CREATE_STEPS = [
  {
    title: "Click on Post a Quest",
    text: "Go to the Find Talent section and click on Post a Quest.",
  },
  {
    title: "Fill in project details",
    text: "Add a clear title, description, budget, timeline and required skills.",
  },
  {
    title: "Add deliverables",
    text: "Specify what you expect to receive.",
  },
  {
    title: "Publish your quest",
    text: "Review the details and post it to start receiving applications.",
  },
];

const APPLICANTS = [
  { name: "Aarav Mehta", role: "UI/UX Designer", rating: "4.8" },
  { name: "Priya Sharma", role: "UX/UI Designer", rating: "4.6" },
  { name: "Rohan Patil", role: "UI/UX Designer", rating: "4.7" },
];

const REVIEW_STEPS = [
  {
    title: "Go to Applications",
    text: "View all proposals submitted for your quest.",
  },
  {
    title: "Check profiles and portfolios",
    text: "Review their experience, ratings and previous work.",
  },
  {
    title: "Compare proposals",
    text: "Evaluate their approach, timeline and cost.",
  },
  {
    title: "Ask questions (if needed)",
    text: "Clarify any doubts before making a decision.",
  },
];

const HIRE_STEPS = [
  {
    title: "Select a freelancer",
    text: "Choose the best proposal based on your requirements.",
  },
  {
    title: "Accept the proposal",
    text: "Click on Accept and confirm the project details.",
  },
  {
    title: "Set up milestones",
    text: "Break the project into milestones for secure payments.",
  },
  {
    title: "Start the project",
    text: "The freelancer will be notified and you can begin working together.",
  },
];

const MANAGE_ITEMS = [
  [
    "Use the in-built chat to discuss updates and share files.",
    "Track milestone progress and deadlines.",
    "Request revisions if needed.",
  ],
  [
    "Review submitted work and provide feedback.",
    "Keep all project discussions in one place.",
    "Ensure deliverables meet your requirements.",
  ],
];

const PAYMENT_STEPS = [
  {
    title: "Add funds to escrow",
    text: "The agreed amount is secured in our escrow system.",
  },
  {
    title: "Release payments",
    text: "Approve and release payments when milestones are completed.",
  },
  {
    title: "View invoices",
    text: "Access invoices and payment history in your finance dashboard.",
  },
];

const PARTY_ITEMS = [
  [
    "Browse parties and their previous work.",
    "Review proposals from parties.",
  ],
  [
    "Collaborate with multiple freelancers through a single project.",
    "Manage communication and milestones with the entire party.",
  ],
];

const CLOSE_ITEMS = [
  ["Review the final deliverables.", "Approve the last milestone and release the final payment."],
  [
    "Leave a rating and review to help build the freelancer's reputation.",
    "Mark the project as completed.",
  ],
];

const TIPS = [
  ["Be clear and detailed in your requirements.", "Set realistic timelines and budgets."],
  [
    "Communicate regularly and provide feedback.",
    "Build long-term relationships with great freelancers.",
  ],
];

function CreateQuestMock() {
  return (
    <div className="fg-mock">
      <strong className="fg-form-title">Create a Quest</strong>
      <span className="fg-form-label">Project title</span>
      <div className="fg-fake-input">e.g. UI/UX for mobile app</div>
      <span className="fg-form-label">Category</span>
      <div className="fg-fake-select">
        Select category
        <Icon name="ChevronDown" size={10} color="#94a3b8" />
      </div>
      <div className="fg-fake-btn">Post Quest</div>
    </div>
  );
}

function ApplicationsMock() {
  return (
    <div className="fg-mock">
      <strong className="fg-apps-title">Applications (12)</strong>
      {APPLICANTS.map((applicant) => (
        <div className="fg-applicant" key={applicant.name}>
          <span className="fg-avatar">
            <Icon name="User" size={10} color="#94a3b8" />
          </span>
          <div className="fg-applicant-info">
            <strong>{applicant.name}</strong>
            <span>{applicant.role}</span>
            <span className="fg-rating">
              <Icon name="Star" size={8} color="#f5a623" />
              {applicant.rating}
            </span>
          </div>
          <span className="fg-view-btn">View</span>
        </div>
      ))}
    </div>
  );
}

export default function ClientsGuide() {
  return (
    <FullGuideLayout
      title="For Clients"
      subtitle="A complete guide to posting quests, finding the right talent, managing projects and getting the best results on TechGuild."
      icon="Briefcase"
      toc={TOC}
    >
      <GuideSection
        id={1}
        title="Overview"
        subtitle="TechGuild helps you find skilled freelancers and teams to complete your projects through quests."
      >
        <OverviewBox label="As a client, you can:" items={OVERVIEW} />
      </GuideSection>

      <GuideSection
        id={2}
        title="Create a Quest"
        subtitle="A quest is a project posting where you describe your requirements and invite freelancers to apply."
      >
        <div className="fg-split">
          <CreateQuestMock />
          <NumberedList items={CREATE_STEPS} />
        </div>
      </GuideSection>

      <GuideSection
        id={3}
        title="Review Applications"
        subtitle="After posting a quest, freelancers and parties will submit their proposals."
      >
        <div className="fg-split">
          <ApplicationsMock />
          <NumberedList items={REVIEW_STEPS} />
        </div>
      </GuideSection>

      <GuideSection
        id={4}
        title="Hire a Freelancer"
        subtitle="Once you find the right match, you can accept a proposal and start the project."
      >
        <StepsFlow steps={HIRE_STEPS} />
      </GuideSection>

      <GuideSection
        id={5}
        title="Manage Your Project"
        subtitle="Track progress, communicate with your freelancer and ensure smooth delivery."
      >
        <ChecklistPanel columns={MANAGE_ITEMS} />
      </GuideSection>

      <GuideSection
        id={6}
        title="Make Payments"
        subtitle="Payments on TechGuild are held securely in escrow and released as milestones are completed."
      >
        <StepsFlow steps={PAYMENT_STEPS} />
      </GuideSection>

      <GuideSection
        id={7}
        title="Work with Parties"
        subtitle="You can also hire a party (a group of freelancers) for larger or more complex projects."
      >
        <ChecklistPanel columns={PARTY_ITEMS} />
      </GuideSection>

      <GuideSection
        id={8}
        title="Close the Project"
        subtitle="Once all milestones are completed and you are satisfied with the work, you can close the project."
      >
        <ChecklistPanel columns={CLOSE_ITEMS} />
      </GuideSection>

      <GuideSection
        id={9}
        title="Tips for Success"
        subtitle="Make the most of your client experience on TechGuild."
      >
        <TipsPanel columns={TIPS} />
      </GuideSection>
    </FullGuideLayout>
  );
}
