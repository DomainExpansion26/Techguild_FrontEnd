// 03-11-2026
// Guide article explaining how to create, join, and manage a party.
import Icon from "@/Components/icons/Icon";
import FullGuideLayout from "./FullGuideLayout";
import {
  GuideSection,
  MockCard,
  NumberedList,
  OverviewBox,
  StepsFlow,
  TipsPanel,
} from "./guideArticleParts";

const TOC = [
  { id: 1, label: "Overview" },
  { id: 2, label: "Create a Party" },
  { id: 3, label: "Join a Party" },
  { id: 4, label: "Manage Your Party" },
  { id: 5, label: "Invite Members" },
  { id: 6, label: "Find Party Opportunities" },
  { id: 7, label: "Work on Projects" },
  { id: 8, label: "Payments and Earnings" },
  { id: 9, label: "Tips for Success" },
];

const OVERVIEW = [
  { title: "Collaborate with trusted freelancers." },
  { title: "Take on larger and higher-value quests." },
  { title: "Share work, responsibilities and earnings fairly." },
  { title: "Build a stronger reputation together." },
];

const CREATE_STEPS = [
  {
    title: "Go to Create Party",
    text: "Click on Create Party in the Parties section.",
  },
  {
    title: "Add party details",
    text: "Enter a name, description and relevant skills or expertise.",
  },
  {
    title: "Set party preferences",
    text: "Choose a communication method and any joining requirements.",
  },
  {
    title: "Create your party",
    text: "Review the details and create the party.",
  },
];

const JOIN_STEPS = [
  {
    title: "Browse parties",
    text: "Explore available parties based on skills and interests.",
  },
  {
    title: "View party details",
    text: "Check the party's skills, ongoing projects and requirements.",
  },
  {
    title: "Send a join request",
    text: "Click on Join and wait for the party admin to approve.",
  },
  {
    title: "Start collaborating",
    text: "Once approved, you can start working on projects with the party.",
  },
];

const MANAGE_STEPS = [
  {
    title: "Manage members",
    text: "View, invite or remove members.",
  },
  {
    title: "Track projects",
    text: "See all ongoing and completed quests.",
  },
  {
    title: "Manage earnings",
    text: "Monitor payments and distribution.",
  },
  {
    title: "Update settings",
    text: "Edit party details, skills and joining preferences.",
  },
];

const INVITE_STEPS = [
  {
    title: "Click on Invite Members",
    text: "Go to your party and select Invite Members.",
  },
  {
    title: "Send invite",
    text: "Enter the freelancer's username or share an invite link.",
  },
  {
    title: "Wait for approval",
    text: "The freelancer will receive the request and can join after approval.",
  },
];

const FIND_STEPS = [
  {
    title: "Browse quests",
    text: "Explore quests marked as suitable for parties.",
  },
  {
    title: "Check requirements",
    text: "Make sure the project matches your party's skills.",
  },
  {
    title: "Apply as a party",
    text: "Submit a single proposal on behalf of your party.",
  },
];

const PROJECT_STEPS = [
  {
    title: "Plan and divide work",
    text: "Discuss the scope and assign tasks among members.",
  },
  {
    title: "Communicate regularly",
    text: "Use the in-built chat to stay aligned.",
  },
  {
    title: "Track milestones",
    text: "Monitor progress and complete milestones on time.",
  },
];

const PAYMENT_STEPS = [
  {
    title: "Receive payment",
    text: "The client pays the total amount, which is held in escrow.",
  },
  {
    title: "Complete milestones",
    text: "Payments are released as milestones are completed.",
  },
  {
    title: "Distribute earnings",
    text: "The admin can distribute earnings to party members based on the agreed split.",
  },
];

const TIPS = [
  [
    "Choose members with complementary skills.",
    "Be clear about roles and responsibilities.",
    "Communicate regularly.",
  ],
  [
    "Set realistic timelines.",
    "Maintain a good reputation.",
    "Keep track of earnings and ensure fair distribution.",
  ],
];

function CreatePartyMock() {
  return (
    <div className="fg-mock">
      <strong className="fg-form-title">Create a Party</strong>
      <span className="fg-form-label">Party name</span>
      <div className="fg-fake-input">e.g. Creative Crew</div>
      <span className="fg-form-label">Short description</span>
      <div className="fg-fake-input">Write a brief description...</div>
      <div className="fg-fake-btn">Create Party</div>
    </div>
  );
}

function FindPartyMock() {
  return (
    <MockCard>
      <div className="fg-mock-title">Find a Party</div>
      <div className="fg-mock-search">
        <Icon name="Search" size={9} color="#94a3b8" />
        Search parties...
      </div>
      <div className="fg-chips">
        <span className="is-active">All</span>
        <span>Design</span>
        <span>Development</span>
        <span>Marketing</span>
      </div>
      <div className="fg-party-result">
        <span className="fg-party-avatar">
          <Icon name="Users" size={11} color="#2563eb" />
        </span>
        <div className="fg-party-info">
          <strong>Pixel Crew</strong>
          <span>4 members · 3 active quests</span>
        </div>
        <span className="fg-view-btn">View</span>
      </div>
    </MockCard>
  );
}

const SETTINGS_ROWS = [
  { icon: "Users", label: "Members" },
  { icon: "FolderOpen", label: "Ongoing Projects" },
  { icon: "CreditCard", label: "Earnings & Payouts" },
  { icon: "Settings", label: "Party Settings" },
];

function PartySettingsMock() {
  return (
    <div className="fg-mock">
      <strong className="fg-settings-title">Party Settings</strong>
      {SETTINGS_ROWS.map((row) => (
        <div className="fg-settings-row" key={row.label}>
          <Icon name={row.icon} size={10} color="#64748b" />
          <span>{row.label}</span>
          <Icon name="ChevronRight" size={9} color="#94a3b8" />
        </div>
      ))}
    </div>
  );
}

export default function PartiesGuide() {
  return (
    <FullGuideLayout
      title="For Parties"
      subtitle="A complete guide to creating or joining a party, collaborating with other freelancers and taking on bigger opportunities together on TechGuild."
      icon="Users"
      toc={TOC}
      heroVariant="card"
    >
      <GuideSection
        id={1}
        title="Overview"
        subtitle="Parties help freelancers come together, combine their skills and take on bigger and more complex projects on TechGuild."
        boxed
      >
        <OverviewBox label="With a party, you can:" items={OVERVIEW} />
      </GuideSection>

      <GuideSection
        id={2}
        title="Create a Party"
        subtitle="Start a new party to collaborate with other freelancers."
        boxed
      >
        <div className="fg-split">
          <CreatePartyMock />
          <NumberedList items={CREATE_STEPS} />
        </div>
      </GuideSection>

      <GuideSection
        id={3}
        title="Join a Party"
        subtitle="You can join an existing party if you want to collaborate with other freelancers."
        boxed
      >
        <div className="fg-split">
          <FindPartyMock />
          <NumberedList items={JOIN_STEPS} />
        </div>
      </GuideSection>

      <GuideSection
        id={4}
        title="Manage Your Party"
        subtitle="As a party admin, you can manage members, projects and settings."
        boxed
      >
        <div className="fg-split">
          <PartySettingsMock />
          <NumberedList items={MANAGE_STEPS} />
        </div>
      </GuideSection>

      <GuideSection
        id={5}
        title="Invite Members"
        subtitle="Invite trusted freelancers to join your party."
        boxed
      >
        <StepsFlow steps={INVITE_STEPS} />
      </GuideSection>

      <GuideSection
        id={6}
        title="Find Party Opportunities"
        subtitle="Look for quests that are suitable for parties."
        boxed
      >
        <StepsFlow steps={FIND_STEPS} />
      </GuideSection>

      <GuideSection
        id={7}
        title="Work on Projects"
        subtitle="Once your party's proposal is accepted, you can collaborate and complete the project together."
        boxed
      >
        <StepsFlow steps={PROJECT_STEPS} />
      </GuideSection>

      <GuideSection
        id={8}
        title="Payments and Earnings"
        subtitle="Payments for party projects are held securely in escrow and released after milestone completion."
        boxed
      >
        <StepsFlow steps={PAYMENT_STEPS} />
      </GuideSection>

      <GuideSection
        id={9}
        title="Tips for Success"
        subtitle="Make the most of your party experience on TechGuild."
        boxed
      >
        <TipsPanel columns={TIPS} />
      </GuideSection>
    </FullGuideLayout>
  );
}
