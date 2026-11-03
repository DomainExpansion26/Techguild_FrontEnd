// 03-11-2026
// Marketing About page describing TechGuild's purpose, approach, and ecosystem.
import { Link } from "react-router-dom";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Footer from "@/flows/landing/LandingLink/Footer/Footer";
import Icon from "@/Components/icons/Icon";
import heroArt from "@/assets/landing-Img/Group 38022.png";
import ecosystem from "@/assets/landing-Img/about-ecosystem.png";
import "./About.css";

const PURPOSE_POINTS = [
  {
    icon: "Shield",
    title: "Trust by design",
    text: "Verified profiles, transparent reputation signals and a trust-driven system to build credibility.",
  },
  {
    icon: "FileText",
    title: "Work with clarity",
    text: "Clear quests, defined milestones and structured collaboration to keep everyone aligned.",
  },
  {
    icon: "CreditCard",
    title: "Payments with confidence",
    text: "Secure escrow payments protect both clients and freelancers, with releases tied to milestone completion.",
  },
];

const APPROACH_POINTS = [
  "Transparent and fair processes",
  "Tools that support real collaboration",
  "A safer and more reliable way to work together",
];

function About() {
  return (
    <div className="ab-page">
      <PublicHeader />

      <main>
        <section className="ab-hero">
          <img className="ab-hero-art" src={heroArt} alt="" aria-hidden="true" />
          <div className="ab-sr-only">
            <h1>Building a more trusted future for professional collaboration.</h1>
            <p>
              TechGuild brings clients, freelancers, parties, and agencies together through
              transparent collaboration, secure payments, and meaningful opportunities — creating
              a better way to work, grow, and succeed together.
            </p>
          </div>
        </section>

        <section className="ab-overview">
          <div className="ab-wrap ab-overview-grid">
            <div className="ab-overview-art">
              <img
                src={ecosystem}
                alt="TechGuild ecosystem connecting clients, freelancers, parties, agencies and quests"
              />
            </div>
            <div className="ab-overview-copy">
              <h2>Company Overview</h2>
              <p>
                TechGuild is a professional collaboration platform that brings clients,
                freelancers, parties, and agencies together to turn ideas into meaningful
                outcomes.
              </p>
              <p>
                We make collaboration more transparent through verified profiles, structured
                quests, milestone-based task management, and secure escrow payments. Whether
                you&apos;re looking to hire the right talent, work with a team, or grow your
                professional journey, TechGuild provides the tools and trusted environment to
                help you collaborate with confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="ab-purpose">
          <div className="ab-wrap">
            <div className="ab-purpose-card">
              <div className="ab-purpose-top">
                <div className="ab-purpose-intro">
                  <p className="ab-eyebrow">OUR PURPOSE</p>
                  <h2>Why TechGuild exists</h2>
                  <p className="ab-muted">
                    We believe professional collaboration should be reliable, transparent and
                    accessible. TechGuild exists to make it easier for clients and freelancers to
                    work together with trust, clarity and fewer uncertainties.
                  </p>
                </div>
                <div className="ab-purpose-aside">
                  <span className="ab-aside-icon">
                    <Icon name="Users" size={22} color="#1d4ed8" />
                  </span>
                  <h3>A trusted ecosystem for modern work</h3>
                  <p className="ab-muted">
                    Whether you&apos;re hiring or looking for opportunities, TechGuild gives you
                    the tools and structure to collaborate with confidence.
                  </p>
                </div>
              </div>

              <div className="ab-purpose-bottom">
                {PURPOSE_POINTS.map((point) => (
                  <article key={point.title} className="ab-purpose-point">
                    <span className="ab-round-icon">
                      <Icon name={point.icon} size={20} color="#1d4ed8" />
                    </span>
                    <h4>{point.title}</h4>
                    <p>{point.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="ab-approach">
          <div className="ab-wrap">
            <div className="ab-approach-card">
              <div className="ab-approach-top">
                <div className="ab-approach-intro">
                  <p className="ab-eyebrow">OUR APPROACH</p>
                  <h2>Built around trust, designed for real work.</h2>
                  <p className="ab-muted">
                    TechGuild is more than just a marketplace. It&apos;s a structured ecosystem
                    where trust, transparency and professional collaboration come together — so
                    both clients and freelancers can focus on what really matters: great work.
                  </p>
                </div>
                <ul className="ab-approach-list">
                  {APPROACH_POINTS.map((point) => (
                    <li key={point}>
                      <span>
                        <Icon name="Check" size={13} color="#ffffff" strokeWidth={2.5} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ab-cta">
                <div>
                  <p className="ab-eyebrow">GET STARTED</p>
                  <h3>Explore TechGuild</h3>
                  <p>
                    Discover opportunities, connect with trusted professionals and experience a
                    better way to work.
                  </p>
                </div>
                <div className="ab-cta-actions">
                  <Link to="/login" state={{ from: "/quest-board" }} className="ab-btn ab-btn-primary">
                    Explore quests <Icon name="ArrowRight" size={16} color="#ffffff" />
                  </Link>
                  <Link to="/login" state={{ from: "/escrow" }} className="ab-btn ab-btn-light">
                    Learn about escrow <Icon name="ArrowRight" size={16} color="#0062ff" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer active="about" />
    </div>
  );
}

export default About;
