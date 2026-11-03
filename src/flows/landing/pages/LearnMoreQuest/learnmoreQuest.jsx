// 03-11-2026
// Learn More About Quests page explaining how quests work for freelancers and clients.
import { Link } from "react-router-dom";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Footer from "@/flows/landing/LandingLink/Footer/Footer";
import Icon from "@/Components/icons/Icon";
import questBoardShot from "@/assets/landing-Img/Right Column_ Interactive App Interface Preview (1).png";
import "./learnmoreQuest.css";

const FREELANCER_POINTS = [
  "Browse all available quests in one place",
  "Filter by category, budget, deadline, difficulty level and more",
  "View complete project details before applying",
  "Apply to quests that match your skills and interests",
  "Track your applications and stay updated on client responses",
];

const CLIENT_POINTS = [
  "Create and post your project as a quest",
  "Set your budget, timeline, required skills and project details",
  "Receive applications from verified freelancers or agencies",
  "Compare profiles and choose the best fit",
  "Start collaborating and manage the project in one place",
];

const FILTERS = [
  {
    icon: "LayoutDashboard",
    title: "Category",
    text: "Development, Design, Marketing, Writing and more.",
  },
  {
    icon: "IndianRupee",
    title: "Budget Range",
    text: "Find projects within your preferred budget.",
  },
  {
    icon: "Clock",
    title: "Deadline",
    text: "Choose from urgent, short-term or long-term quests.",
  },
  {
    icon: "ChartNoAxesColumn",
    title: "Difficulty Level",
    text: "Filter by beginner, intermediate or advanced.",
  },
  {
    icon: "Tag",
    title: "Quest Type",
    text: "Emergency, Standard, Long-term or Multi-skill.",
  },
  {
    icon: "Settings",
    title: "More Filters",
    text: "Client rank, payment type, skills and other preferences.",
  },
];

function HelpCard({ icon, title, subtitle, points }) {
  return (
    <article className="lmq-help-card">
      <div className="lmq-help-head">
        <span className="lmq-help-icon">
          <Icon name={icon} size={24} color="#0062ff" />
        </span>
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>

      <ul className="lmq-help-list">
        {points.map((point) => (
          <li key={point}>
            <span className="lmq-bullet">
              <Icon name="Check" size={11} color="#ffffff" strokeWidth={3} />
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function LearnMoreQuest() {
  return (
    <div className="lmq-page">
      <PublicHeader />

      <main>
        <div className="lmq-wrap">
          <nav className="lmq-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/features">Features</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Quest Board</span>
          </nav>
        </div>

        <section className="lmq-hero">
          <div className="lmq-wrap lmq-hero-grid">
            <div className="lmq-hero-copy">
              <p className="lmq-eyebrow">FEATURE</p>
              <h1>Quest Board</h1>
              <p className="lmq-hero-lede">
                Post, discover and collaborate on real opportunities.
              </p>
              <p className="lmq-hero-text">
                The Quest Board is the central space on TechGuild where clients post their
                projects (quests) and freelancers or agencies discover opportunities that match
                their skills. It makes it easy to find the right talent or the right project
                &mdash; with transparent details, filters and a smooth application process.
              </p>
            </div>

            <div className="lmq-hero-shot">
              <img
                src={questBoardShot}
                alt="TechGuild Quest Board dashboard showing open quests"
              />
            </div>
          </div>
        </section>

        <section className="lmq-help">
          <div className="lmq-wrap">
            <h2 className="lmq-section-title">How it helps</h2>

            <div className="lmq-help-grid">
              <HelpCard
                icon="Users"
                title="For Freelancers"
                subtitle="Find the right projects and grow your career."
                points={FREELANCER_POINTS}
              />
              <HelpCard
                icon="ClipboardList"
                title="For Clients"
                subtitle="Post your projects and find the right talent."
                points={CLIENT_POINTS}
              />
            </div>
          </div>
        </section>

        <section className="lmq-filters">
          <div className="lmq-wrap">
            <h2 className="lmq-section-title">Explore quests with powerful filters</h2>
            <p className="lmq-filters-sub">
              Quickly find opportunities that match your goals using advanced filters.
            </p>

            <div className="lmq-filter-grid">
              {FILTERS.map(({ icon, title, text }) => (
                <article className="lmq-filter-card" key={title}>
                  <span className="lmq-filter-icon">
                    <Icon name={icon} size={20} color="#0062ff" />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lmq-cta-section">
          <div className="lmq-wrap">
            <div className="lmq-cta">
              <span className="lmq-cta-icon">
                <Icon name="Lightbulb" size={28} color="#0062ff" />
              </span>

              <div className="lmq-cta-copy">
                <h2>The right opportunities, for the right people.</h2>
                <p>
                  Whether you&apos;re a freelancer looking for your next challenge or a client
                  searching for trusted talent, the Quest Board brings the right people and
                  projects together.
                </p>
              </div>

              <Link to="/quest-board" className="lmq-cta-btn">
                Explore the Quest Board
                <Icon name="ArrowRight" size={16} color="#ffffff" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer active="quest-board" />
    </div>
  );
}
