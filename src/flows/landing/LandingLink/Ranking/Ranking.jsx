import { useDispatch } from "react-redux";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import PrimaryButton from "@/Components/Button/Primarybutton";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import "./Ranking.css";

const RANKS = [
  { label: "F", tone: "f", height: 50 },
  { label: "E", tone: "e", height: 72 },
  { label: "D", tone: "d", height: 96 },
  { label: "C", tone: "c", height: 126 },
  { label: "B", tone: "b", height: 160 },
  { label: "A", tone: "a", height: 196 },
  { label: "S", tone: "s", height: 232 },
  { label: "SS", tone: "ss", height: 262 },
  { label: "SSS", tone: "sss", height: 300, dark: true, crown: true },
];

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
            <div className="rk-hint">
              <span className="rk-hint-icon">
                <Icon name="BarChart3" size={18} color="#0062FF" />
              </span>
              <span>
                Complete successful
                <br />
                projects to rank up
              </span>
            </div>

            <div className="rk-chart" aria-hidden="true">
              <svg className="rk-dashline" viewBox="0 0 524 360" preserveAspectRatio="none">
                <polyline
                  points="22,280 80,258 138,234 196,204 254,170 312,134 370,98 428,68 494,28"
                  fill="none"
                  stroke="#9db9f7"
                  strokeWidth="1.6"
                  strokeDasharray="5 5"
                />
              </svg>

              <div className="rk-cols">
                {RANKS.map((rank) => (
                  <div className="rk-col" key={rank.label}>
                    {rank.crown && (
                      <span className="rk-crown">
                        <Icon name="Crown" size={28} color="#f4b400" fill="#f4b400" />
                      </span>
                    )}
                    <span className={`rk-hex ${rank.tone}`}>{rank.label}</span>
                    <span
                      className={`rk-bar${rank.dark ? " dark" : ""}`}
                      style={{ height: `${rank.height}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>
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
    </div>
  );
}
