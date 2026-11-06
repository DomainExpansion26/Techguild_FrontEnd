// 6-11-2026
// 03-11-2026
// Guide topic landing page that lists guides for a selected topic.
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Footer from "@/flows/landing/LandingLink/Footer/Footer";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import { getGuideTopic } from "./guideTopics";
import "./GuideTopic.css";

export default function GuideTopic() {
  const { topicSlug } = useParams();
  const dispatch = useDispatch();
  const topic = getGuideTopic(topicSlug);

  if (!topic) {
    return <Navigate to="/guides" replace />;
  }

  const handleSoon = (title) => {
    dispatch(
      showSnackbar({
        message: `"${title}" guide is coming soon.`,
        type: "info",
      })
    );
  };

  return (
    <div className="gt-page">
      <PublicHeader />

      <main>
        <section className="gt-hero">
          <div className="gt-wrap">
            <div className="gt-hero-main">
              <span className="gt-hero-icon" aria-hidden="true">
                <Icon name={topic.icon} size={22} color="#2563eb" />
              </span>
              <div className="gt-hero-copy">
                <p className="gt-eyebrow">Guide topic</p>
                <h1>{topic.title}</h1>
                <p className="gt-hero-sub">{topic.text}</p>
                <span className="gt-hero-count">
                  <Icon name="NotebookText" size={12} color="#3b6fd4" />
                  {topic.guides.length} guides
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="gt-list">
          <div className="gt-wrap">
            <div className="gt-section-head">
              <h2>All guides</h2>
              <p>Step-by-step help for {topic.title.toLowerCase()}.</p>
            </div>

            <div className="gt-grid">
              {topic.guides.map((guide, index) => {
                const Card = guide.to ? Link : "button";
                return (
                  <Card
                    key={guide.title}
                    {...(guide.to
                      ? { to: guide.to }
                      : { type: "button", onClick: () => handleSoon(guide.title) })}
                    className="gt-card"
                  >
                    <span className="gt-card-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="gt-card-copy">
                      <strong className="gt-card-title">{guide.title}</strong>
                      <span className="gt-card-text">{guide.text}</span>
                    </span>
                    <Icon name="ChevronRight" size={16} color="#9aa8ba" />
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <div className="gt-wrap">
          <div className="gt-support">
            <span className="gt-support-icon" aria-hidden="true">
              <Icon name="LifeBuoy" size={20} color="#2563eb" />
            </span>
            <div className="gt-support-copy">
              <strong>Can&apos;t find what you&apos;re looking for?</strong>
              <p>Our support team is here to help. Reach out anytime and we&apos;ll get back to you.</p>
            </div>
            <Link to="/contact" className="gt-support-btn">
              <Icon name="MessageSquareMore" size={13} color="#103ca4" />
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <Footer active="guides" />
    </div>
  );
}
