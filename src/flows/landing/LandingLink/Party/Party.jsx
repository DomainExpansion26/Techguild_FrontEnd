import { useDispatch } from "react-redux";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import FeatureHelp from "@/flows/landing/LandingLink/FeatureHelp/FeatureHelp";
import PrimaryButton from "@/Components/Button/Primarybutton";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import "./Party.css";

const HELP = [
  {
    type: "freelancers",
    icon: "UserPlus",
    title: "For Freelancers",
    text: "Team up, take on bigger opportunities and grow together.",
    points: [
      "Create a Party or join an existing one",
      "Invite members with complementary skills",
      "View member roles and verification status",
      "Apply to quests together as a team",
      "Contribute your skills and build reputation together",
    ],
  },
  {
    type: "clients",
    icon: "Briefcase",
    iconColor: "#b45309",
    title: "For Clients",
    text: "Find and work with pre-formed, skilled teams.",
    points: [
      "Discover Parties with the skills you require",
      "Review member profiles and verified status",
      "Compare Party rank and completed quests",
      "Understand the team's composition before accepting",
      "Choose the right team for a single or multi-skill project",
    ],
  },
];

function PartyDashboard() {
  return (
    <div className="pt-dash" aria-hidden="true">
      <div className="pt-dash-top">
        <span className="pt-dash-brand">TechGuild</span>
        <span className="pt-dash-search">
          <Icon name="Search" size={10} color="#94a3b8" />
          Search parties, skills or keywords...
        </span>
        <span className="pt-dash-tools">
          <Icon name="Bell" size={12} color="#64748b" />
          <Icon name="MessageSquareMore" size={12} color="#64748b" />
          <span className="pt-dash-avatar">AM</span>
        </span>
      </div>

      <div className="pt-dash-body">
        <aside className="pt-dash-side">
          <span><Icon name="LayoutDashboard" size={11} /> Dashboard</span>
          <span><Icon name="FileText" size={11} /> My Quests</span>
          <span><Icon name="Search" size={11} /> Find Talents</span>
          <span className="on"><Icon name="Users" size={11} /> Party Management</span>
          <span><Icon name="MessageSquareMore" size={11} /> Messages</span>
          <span><Icon name="Bell" size={11} /> Notifications</span>
          <span><Icon name="Settings" size={11} /> Settings</span>
        </aside>

        <div className="pt-dash-main">
          <div className="pt-dash-party">
            <span className="pt-dash-logo">PF</span>
            <div className="pt-dash-title">
              <strong>
                PixelForge
                <Icon name="BadgeCheck" size={10} color="#0062FF" fill="#0062FF" />
              </strong>
              <span>Product Design + Development + AI Solutions</span>
              <p>A team of passionate builders creating digital products.</p>
            </div>
            <div className="pt-dash-btns">
              <span>Edit Party</span>
              <span className="primary">Invite member</span>
            </div>
          </div>

          <div className="pt-dash-tags">
            <span>UI/UX Design</span>
            <span>Frontend Development</span>
            <span>Backend Development</span>
            <span>AI/ML</span>
            <span>+2</span>
          </div>

          <div className="pt-dash-stats">
            <div>
              <strong>94%</strong>
              <span>Party Trust <Icon name="CircleQuestionMark" size={7} /></span>
            </div>
            <div>
              <strong>28</strong>
              <span>Completed Quests <Icon name="CircleQuestionMark" size={7} /></span>
            </div>
            <div>
              <strong>A</strong>
              <span>Party Rank <Icon name="CircleQuestionMark" size={7} /></span>
            </div>
            <div>
              <strong>6</strong>
              <span>Members <Icon name="CircleQuestionMark" size={7} /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Party() {
  const dispatch = useDispatch();

  const comingSoon = () => {
    dispatch(showSnackbar({ message: "Coming Soon", type: "info" }));
  };

  return (
    <div className="pt-page">
      <PublicHeader />

      <main className="pt-main">
        <section className="pt-hero">
          <div className="pt-hero-copy">
            <p className="pt-eyebrow">FEATURE</p>
            <h1>Party Management</h1>
            <p className="pt-lead">Bring the right people together. Build stronger teams.</p>
            <p className="pt-text">
              Create or join a Party with complementary skills, build a trusted team and apply to quests together.
              Clients can explore Party profiles, review collective skills, verified members, completed quests and
              rank before choosing the right team for their project.
            </p>
            <PrimaryButton className="pt-cta" onClick={comingSoon}>
              Explore Party Management
              <span aria-hidden="true">→</span>
            </PrimaryButton>
          </div>

          <div className="pt-hero-art">
            <PartyDashboard />
          </div>
        </section>

        <section className="pt-help">
          <h2>How Party Management helps</h2>
          <FeatureHelp items={HELP} />
        </section>
      </main>
    </div>
  );
}
