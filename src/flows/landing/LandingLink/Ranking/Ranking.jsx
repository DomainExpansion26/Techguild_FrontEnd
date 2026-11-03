// 03-11-2026
// Ranking feature page explaining trust points and rank progression.
import { useDispatch } from "react-redux";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Footer from "@/flows/landing/LandingLink/Footer/Footer";
import { PrimaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store";
import rankingArt from "@/assets/landing-Img/Right Hero Graphic_ Ascending Staircase Graphic.png";
import "./Ranking.css";

const HOW_IT_WORKS = [
  {
    icon: "Shield",
    tone: "blue",
    title: "Reach 100 Trust Points",
    text: "Complete the required steps to collect 100 TP and unlock your first rank (F).",
  },
  {
    icon: "Shield",
    tone: "green",
    title: "Complete Projects",
    text: "Finish successful projects and deliver quality work.",
  },
  {
    icon: "Star",
    tone: "purple",
    title: "Maintain a Good Record",
    text: "Get positive reviews and follow platform guidelines.",
  },
  {
    icon: "BarChart3",
    tone: "yellow",
    title: "Rank Up",
    text: "Once you meet the requirements, you'll move to the next rank.",
  },
];

const BENEFITS = [
  {
    icon: "Eye",
    title: "Higher Visibility",
    text: "Appear higher in search results and application lists.",
  },
  {
    icon: "Gem",
    title: "Access to Premium Opportunities",
    text: "Get invited to high-value and exclusive quests.",
  },
  {
    icon: "Users",
    title: "More Client Trust",
    text: "A higher rank shows your reliability and proven track record.",
  },
  {
    icon: "BarChart3",
    title: "Greater Growth Potential",
    text: "Build a stronger profile and unlock long-term opportunities on the platform.",
  },
];

export default function Ranking() {
  const dispatch = useDispatch();

  const comingSoon = () => {
    dispatch(showSnackbar({ message: "Coming Soon", type: "info" }));
  };

  return (
    <div className="rk-page">
      <PublicHeader />

      <main className="rk-main">
        <section className="rk-hero">
          <div className="rk-hero-copy">
            <p className="rk-eyebrow">RANKING SYSTEM</p>
            <h1>
              Progress further.
              <br />
              Unlock bigger opportunities.
            </h1>
            <p className="rk-hero-text">
              Your rank reflects your experience, reliability and contribution on TechGuild. As you complete
              successful projects and maintain a good track record, you move to higher ranks and gain more visibility
              and opportunities.
            </p>
            <PrimaryButton className="rk-cta" onClick={comingSoon}>
              View my rank
              <span aria-hidden="true">→</span>
            </PrimaryButton>
          </div>

          <div className="rk-hero-art">
            <img
              src={rankingArt}
              alt="Rank progression from F to SSS shown as ascending bars with rank badges and a crown"
              className="rk-hero-img"
            />
          </div>
        </section>

        <section className="rk-how">
          <h2>How Ranking Works</h2>
          <p className="rk-sub">
            You start at Rank F after reaching 100 Trust Points. Complete successful projects and maintain a good
            track record to move to higher ranks.
          </p>

          <div className="rk-how-grid">
            {HOW_IT_WORKS.map(({ icon, tone, title, text }) => (
              <article className="rk-how-card" key={title}>
                <span className={`rk-how-icon ${tone}`}>
                  <Icon name={icon} size={22} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rk-benefits">
          <h2>Benefits of a Higher Rank</h2>
          <p className="rk-sub">
            As you move up the ranks, you unlock more visibility, credibility and opportunities on TechGuild.
          </p>

          <div className="rk-benefit-grid">
            {BENEFITS.map(({ icon, title, text }) => (
              <article className="rk-benefit" key={title}>
                <span className="rk-benefit-icon">
                  <Icon name={icon} size={24} color="#0062FF" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
