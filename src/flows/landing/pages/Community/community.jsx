// 03-11-2026
// Community page highlighting the roles, stories, and spaces that make up TechGuild.
import { Link } from "react-router-dom";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Footer from "@/flows/landing/LandingLink/Footer/Footer";
import Icon from "@/Components/icons/Icon";
import heroImage from "@/assets/landing-Img/community-hero.jpg";
import "./community.css";

const ROLES = [
  {
    icon: "User",
    title: "Freelancers",
    text: "Designers, developers, writers, marketers and more — showcasing their skills and finding opportunities.",
    tone: "blue", color: "#3b82f6",
  },
  {
    icon: "Briefcase",
    title: "Clients",
    text: "Startups, businesses and individuals looking to hire skilled talent for their projects.",
    tone: "violet", color: "#a855f7",
  },
  {
    icon: "Users",
    title: "Agencies",
    text: "Teams and agencies collaborating with top freelancers for larger projects.",
    tone: "green", color: "#22c55e",
  },
  {
    icon: "Building2",
    title: "Businesses",
    text: "Companies exploring talent, forming long-term partnerships and scaling their work.",
    tone: "orange", color: "#f97316",
  },
  {
    icon: "GraduationCap",
    title: "Learners & Enthusiasts",
    text: "People learning, sharing knowledge and staying updated with industry trends.",
    tone: "pink", color: "#ec4899",
  },
];

const ACTIONS = [
  {
    icon: "MessageSquareMore",
    title: "Join meaningful discussions",
    text: "Ask questions, share your experiences and get advice from fellow members.",
  },
  {
    icon: "Lightbulb",
    title: "Share your work",
    text: "Showcase your projects, get feedback and gain visibility.",
  },
  {
    icon: "Users",
    title: "Find collaborators",
    text: "Connect with like-minded people for projects, partnerships or long-term opportunities.",
  },
  {
    icon: "NotebookText",
    title: "Learn and stay updated",
    text: "Discover industry insights, tools, resources and career tips.",
  },
  {
    icon: "Star",
    title: "Get support",
    text: "Be part of a helpful and supportive network that cheers you on.",
  },
  {
    icon: "BarChart3",
    title: "Explore opportunities",
    text: "Stay informed about events, openings and collaboration opportunities.",
  },
];

function CommunityFeed() {
  return (
    <div className="cm-feed">
      <div className="cm-composer">
        <span className="cm-avatar cm-avatar-dark">
          <Icon name="User" size={14} color="#ffffff" />
        </span>
        <div className="cm-composer-main">
          <div className="cm-input">What&apos;s on your mind?</div>
          <div className="cm-composer-bar">
            <div className="cm-tools">
              <span><Icon name="FileText" size={13} color="#64748b" />Text</span>
              <span><Icon name="Files" size={13} color="#64748b" />Image</span>
              <span><Icon name="BarChart3" size={13} color="#64748b" />Poll</span>
              <span><Icon name="CircleQuestionMark" size={13} color="#64748b" />Question</span>
            </div>
            <button type="button" className="cm-post-btn">Post</button>
          </div>
        </div>
      </div>

      <div className="cm-post">
        <div className="cm-post-head">
          <span className="cm-avatar cm-avatar-photo">AK</span>
          <div className="cm-post-meta">
            <strong>
              Aditi Kulkarni <span>· 2h ago</span>
            </strong>
            <p>UI/UX Designer</p>
          </div>
          <Icon name="MoreHorizontal" size={16} color="#94a3b8" />
        </div>

        <p className="cm-post-text">
          Just completed a new dashboard design for a project! Would love to hear your thoughts.
        </p>

        <div className="cm-post-media">
          <span className="cm-post-media-icon">
            <Icon name="BarChart3" size={14} color="#ffffff" />
          </span>
          Analytics Dashboard Preview
        </div>
      </div>
    </div>
  );
}

export default function Community() {
  return (
    <div className="cm-page">
      <PublicHeader />

      <main>
        <section className="cm-hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="cm-hero-shade" aria-hidden="true" />
          <div className="cm-wrap cm-hero-inner">
            <p className="cm-eyebrow">Community</p>
            <h1>
              The TechGuild
              <br />
              Community
            </h1>
            <p className="cm-hero-sub">
              A growing community of freelancers, clients, agencies and businesses — all coming
              together to create, collaborate and grow.
            </p>
          </div>
        </section>

        <section className="cm-section cm-who">
          <div className="cm-wrap">
            <h2>Who&apos;s in the TechGuild community?</h2>
            <p className="cm-section-sub">
              TechGuild brings together a diverse group of people from across the tech and creative
              industry.
            </p>

            <div className="cm-role-grid">
              {ROLES.map((role) => (
                <article className="cm-role-card" key={role.title}>
                  <span className={`cm-role-icon cm-tone-${role.tone}`}>
                    <Icon name={role.icon} size={19} color={role.color} />
                  </span>
                  <strong>{role.title}</strong>
                  <p>{role.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cm-section cm-do">
          <div className="cm-wrap">
            <h2>What you can do in the TechGuild community</h2>
            <p className="cm-section-sub">
              The community is designed to help you connect, learn, collaborate and grow.
            </p>

            <div className="cm-action-grid">
              {ACTIONS.map((action) => (
                <article className="cm-action-card" key={action.title}>
                  <span className="cm-action-icon">
                    <Icon name={action.icon} size={18} color="#2f6fed" />
                  </span>
                  <div>
                    <strong>{action.title}</strong>
                    <p>{action.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cm-section cm-guild">
          <div className="cm-wrap">
            <div className="cm-guild-panel">
              <div className="cm-guild-copy">
                <p className="cm-guild-eyebrow">Guild Hall</p>
                <h2>Your community space</h2>
                <p>
                  Guild Hall is the heart of our community — where members connect, share ideas, ask
                  questions, showcase work and collaborate on projects.
                </p>
                <Link to="/login" state={{ from: "/community" }} className="cm-guild-btn">
                  Visit Guild Hall
                  <Icon name="ArrowRight" size={16} color="#ffffff" strokeWidth={2.2} />
                </Link>
              </div>

              <CommunityFeed />
            </div>
          </div>
        </section>
      </main>

      <Footer active="community" />
    </div>
  );
}

