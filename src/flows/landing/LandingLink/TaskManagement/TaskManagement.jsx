import { useDispatch } from "react-redux";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import FeatureHelp from "@/flows/landing/LandingLink/FeatureHelp/FeatureHelp";
import PrimaryButton from "@/Components/Button/Primarybutton";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import "./TaskManagement.css";

const NAV = ["Dashboard", "My Quests", "Task Management", "Communication", "Finance", "Guild Hall", "Rank Progression", "Subscription", "Settings"];

const STEPS = ["Milestones Created", "Sent for Approval", "Client Approved", "Work in Progress", "Completed"];

const MILESTONES = [
  { title: "UI Design", status: "Approved", tone: "approved", due: "15 Aug 2024", amount: "₹10,000" },
  { title: "Frontend Development", status: "Pending Approval", tone: "pending", due: "30 Aug 2024", amount: "₹15,000" },
  { title: "Testing & Deployment", status: "Not Started", tone: "idle", due: "15 Sep 2024", amount: "₹10,000" },
];

const HELP = [
  {
    type: "freelancers",
    icon: "User",
    title: "For Freelancers",
    text: "Break your accepted quest into milestones and tasks, stay organized and deliver your work smoothly.",
    points: [
      "Create milestones for the project after your application is accepted",
      "Add tasks under each milestone with clear deliverables and deadlines",
      "Submit milestones for client approval",
      "Track progress and stay aligned with your client",
    ],
  },
  {
    type: "clients",
    icon: "Building2",
    title: "For Clients",
    text: "Review and approve the project plan created by the freelancer, and track the progress easily.",
    points: [
      "View milestones and tasks created by the freelancer",
      "Review deliverables, timelines and requirements",
      "Approve milestones and release payments",
      "Track progress in one place",
    ],
  },
];

function TaskDashboard() {
  return (
    <div className="tm-dash" aria-hidden="true">
      <div className="tm-dash-top">
        <span className="tm-brand">TechGuild</span>
        <span className="tm-search">
          <Icon name="Search" size={10} color="#94a3b8" />
          Search quests, clients or keywords...
        </span>
        <span className="tm-tools">
          <Icon name="Bell" size={12} color="#64748b" />
          <Icon name="MessageSquareMore" size={12} color="#64748b" />
          <span className="tm-avatar">A</span>
        </span>
      </div>

      <div className="tm-body">
        <aside className="tm-side">
          {NAV.map((item) => (
            <span key={item} className={item === "Task Management" ? "on" : ""}>
              <Icon name={item === "Task Management" ? "ClipboardList" : "Circle"} size={10} />
              {item}
            </span>
          ))}
        </aside>

        <div className="tm-main">
          <div className="tm-head">
            <div>
              <strong>Task Management</strong>
              <span>Manage milestones and tasks for your active quests.</span>
            </div>
            <span className="tm-view">
              View Quest Details
              <Icon name="ExternalLink" size={8} />
            </span>
          </div>

          <div className="tm-tabs">
            <span className="on">Active Quests</span>
            <span>Pending Approval</span>
            <span>Completed</span>
          </div>

          <div className="tm-quest">
            <div className="tm-quest-head">
              <strong>E-Commerce Website Redesign</strong>
              <span>In Progress</span>
            </div>

            <div className="tm-steprow">
              {STEPS.map((step, i) => (
                <span key={step} className={i < 3 ? "done" : ""}>
                  <i />
                  {step}
                </span>
              ))}
            </div>

            <div className="tm-ms-head">
              <strong>Milestones (3)</strong>
              <span>Tasks (5)</span>
              <em>Create Milestone</em>
            </div>

            <div className="tm-ms-list">
              {MILESTONES.map((m) => (
                <div className="tm-ms" key={m.title}>
                  <Icon name="ClipboardList" size={12} color="#0062FF" />
                  <strong>{m.title}</strong>
                  <span className={`tm-status ${m.tone}`}>{m.status}</span>
                  <span>{m.due}</span>
                  <b>{m.amount}</b>
                  <em>{m.tone === "idle" ? "Create Tasks" : "View Tasks"}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TaskManagement() {
  const dispatch = useDispatch();

  const comingSoon = () => {
    dispatch(showSnackbar({ message: "Coming Soon", type: "info" }));
  };

  return (
    <div className="tm-page">
      <PublicHeader />

      <main className="tm-main">
        <nav className="tm-crumb" aria-label="Breadcrumb">
          <span>Home</span>
          <Icon name="ChevronRight" size={11} color="#94a3b8" />
          <span>Features</span>
          <Icon name="ChevronRight" size={11} color="#94a3b8" />
          <span className="on">Task Management</span>
        </nav>

        <section className="tm-hero">
          <div className="tm-hero-copy">
            <p className="tm-eyebrow">FEATURE</p>
            <h1>
              Task
              <br />
              Management
            </h1>
            <p className="tm-lead">Plan, track and deliver your work with clarity.</p>
            <p className="tm-text">
              Task Management helps freelancers and clients stay aligned after a quest is accepted. Freelancers
              create milestones and tasks for the project, and send them to the client for approval. Clients can
              review, approve and track the progress — all in one place.
            </p>
            <PrimaryButton className="tm-cta" onClick={comingSoon}>
              Explore Task Management
            </PrimaryButton>
          </div>

          <div className="tm-hero-art">
            <TaskDashboard />
          </div>
        </section>

        <section className="tm-help">
          <FeatureHelp items={HELP} variant="stacked" />
        </section>
      </main>
    </div>
  );
}
