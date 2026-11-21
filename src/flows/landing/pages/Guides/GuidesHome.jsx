// 9-11-2026
// 03-11-2026
// Guides home page with topic browsing, popular guides, and search.
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Footer from "@/flows/landing/LandingLink/Footer/Footer";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import { GUIDE_TOPICS } from "./guideTopics";
import "./GuidesHome.css";

const POPULAR = [
  {
    tag: "Getting Started",
    title: "How to create a TechGuild account",
    text: "A step-by-step guide to signing up and setting up your account.",
    to: "/guides/getting-started/create-account",
  },
  {
    tag: "For Freelancers",
    title: "How to apply for a quest",
    text: "Learn how to find the right quest and submit a strong proposal.",
    to: "/guides/freelancers",
  },
  {
    tag: "For Clients",
    title: "How to post a quest",
    text: "Create a quest, set requirements and start receiving applications.",
    to: "/guides/clients",
  },
  {
    tag: "Payments & Finance",
    title: "Understanding escrow payments",
    text: "Learn how escrow works and when payments are released.",
    to: "/guides/payments-finance",
  },
  {
    tag: "Parties",
    title: "How to join or create a party",
    text: "Collaborate with other freelancers to take on bigger projects.",
    to: "/guides/parties",
  },
  {
    tag: "Account & Security",
    title: "How to verify your account",
    text: "Complete verification to access all platform features.",
    to: "/guides/account-security",
  },
];

export default function GuidesHome() {
  const dispatch = useDispatch();

  const handleSoon = (title) => {
    dispatch(
      showSnackbar({
        message: `"${title}" guide is coming soon.`,
        type: "info",
      })
    );
  };

  return (
    <div className="gh-page">
      <PublicHeader />

      <main>
        <section className="gh-hero">
          <div className="gh-wrap gh-hero-inner">
            <div className="gh-hero-copy">
              <p className="gh-eyebrow">Guides</p>
              <h1>
                Learn how to use
                <br />
                TechGuild
              </h1>
              <p className="gh-hero-sub">
                Step-by-step guides to help you get started, complete tasks and make the most out of
                TechGuild.
              </p>
            </div>

            <div className="gh-hero-art" aria-hidden="true">
              <span className="gh-art-dot" />
              <span className="gh-art-chevron">
                <Icon name="ChevronRight" size={22} color="#2563eb" />
              </span>

              <div className="gh-art-window">
                <span className="gh-art-user">
                  <Icon name="User" size={12} color="#ffffff" />
                </span>
                <span className="gh-art-lines">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </div>

              <div className="gh-art-player">
                <span className="gh-art-player-dot" />
                <span className="gh-art-player-line" />
                <span className="gh-art-play">
                  <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
                    <path d="M10 5.13a1 1 0 0 1 0 1.74l-8 4.62a1 1 0 0 1-1.5-.87V1.38A1 1 0 0 1 2 .51l8 4.62Z" fill="#ffffff" />
                  </svg>
                </span>
              </div>

              <span className="gh-art-cursor">
                <svg width="20" height="24" viewBox="0 0 18 22" fill="none">
                  <path
                    d="M1.4 1.2 16 10.9l-6.2 1.4-3.1 6.2L1.4 1.2Z"
                    fill="#103CA4"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                  />
                </svg>
              </span>
            </div>
          </div>
        </section>

        <section className="gh-topics">
          <div className="gh-wrap">
            <div className="gh-section-head">
              <h2>Browse guides by topic</h2>
              <p>Choose a topic to explore step-by-step guides.</p>
            </div>

            <div className="gh-topic-grid">
              {GUIDE_TOPICS.map((topic) => (
                <Link
                  key={topic.slug}
                  to={topic.to || `/guides/${topic.slug}`}
                  className="gh-topic-card"
                >
                  <span className="gh-topic-top">
                    <span className="gh-topic-icon">
                      <Icon name={topic.icon} size={16} color="#2563eb" />
                    </span>
                    <Icon name="ChevronRight" size={16} color="#9aa8ba" />
                  </span>
                  <strong className="gh-topic-title">{topic.title}</strong>
                  <p className="gh-topic-text">{topic.text}</p>
                  <span className="gh-topic-count">{topic.guides.length} guides</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="gh-popular">
          <div className="gh-wrap">
            <div className="gh-section-head">
              <h2>Popular guides</h2>
              <p>Here are some of the most helpful step-by-step guides.</p>
            </div>

            <div className="gh-popular-grid">
              {POPULAR.map((guide) => {
                const Card = guide.to ? Link : "button";
                return (
                  <Card
                    key={guide.title}
                    {...(guide.to
                      ? { to: guide.to }
                      : { type: "button", onClick: () => handleSoon(guide.title) })}
                    className="gh-popular-card"
                  >
                    <span className="gh-popular-copy">
                      <span className="gh-popular-tag">{guide.tag}</span>
                      <strong className="gh-popular-title">{guide.title}</strong>
                      <span className="gh-popular-text">{guide.text}</span>
                    </span>
                    <Icon name="ChevronRight" size={16} color="#9aa8ba" />
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <div className="gh-wrap">
          <div className="gh-support">
            <span className="gh-support-icon" aria-hidden="true">
              <Icon name="LifeBuoy" size={20} color="#2563eb" />
            </span>
            <div className="gh-support-copy">
              <strong>Can&apos;t find what you&apos;re looking for?</strong>
              <p>Our support team is here to help. Reach out anytime and we&apos;ll get back to you.</p>
            </div>
            <Link to="/contact" className="gh-support-btn">
              <Icon name="MessageSquareMore" size={13} color="#103CA4" />
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <Footer active="guides" />
    </div>
  );
}
