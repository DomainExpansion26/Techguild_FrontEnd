import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Icon from "@/Components/icons/Icon";
import "./TrustPoints.css";

const STEPS = [
  {
    step: "STEP 1",
    icon: "Mail",
    tone: "blue",
    title: "Verify your email",
    text: "Confirm your email address to create your account.",
    points: "+ 10 TP",
  },
  {
    step: "STEP 2",
    icon: "User",
    tone: "green",
    title: "Set up your profile",
    text: "Add your basic details, skills and experience.",
    points: "+ 20 TP",
  },
  {
    step: "STEP 3",
    icon: "Shield",
    tone: "purple",
    title: "Complete identity verification",
    text: "Verify your identity to show that you are genuine and trustworthy.",
    points: "+ 40 TP",
  },
  {
    step: "STEP 4",
    icon: "FileText",
    tone: "orange",
    title: "Complete your first project",
    text: "Finish your first project successfully on TechGuild.",
    points: "+ 30 TP",
  },
];

export default function TrustPoints() {
  return (
    <div className="tp-page">
      <PublicHeader />

      <main className="tp-main">
        <section className="tp-hero">
          <div className="tp-hero-copy">
            <p className="tp-eyebrow">TRUST POINTS</p>
            <h1>
              Start your journey with
              <br />
              Trust Points
            </h1>
            <p className="tp-hero-text">
              Trust Points (TP) help build trust between freelancers and clients on TechGuild. When you are new,
              Trust Points show that you are a genuine and active member. Complete simple steps, earn Trust Points
              and unlock your first rank.
            </p>
          </div>

          <div className="tp-hero-art" aria-hidden="true">
            <span className="tp-shape tp-triangle" />
            <span className="tp-shape tp-diamond tp-d1" />
            <span className="tp-shape tp-diamond tp-d2" />
            <span className="tp-shape tp-diamond tp-d3" />

            <div className="tp-stack-card">
              <span className="tp-stack-line w1" />
              <span className="tp-stack-line w2" />
              <span className="tp-stack-line w3" />
              <span className="tp-stack-line w4" />
            </div>

            <div className="tp-progress-card">
              <div className="tp-progress-head">
                <span className="tp-check">
                  <Icon name="Check" size={24} color="#ffffff" strokeWidth={2.5} />
                </span>
                <p className="tp-score">
                  <strong>70</strong>
                  <span>TP</span>
                </p>
              </div>
              <div className="tp-progress-track">
                <i style={{ width: "70%" }} />
              </div>
              <p className="tp-progress-note">
                Complete the remaining steps to reach 100 TP and unlock Rank F.
              </p>
            </div>

            <span className="tp-star">
              <Icon name="Star" size={24} color="#ffffff" fill="#ffffff" />
            </span>
          </div>
        </section>

        <section className="tp-earn">
          <h2>How to Earn Trust Points</h2>
          <p className="tp-sub">
            Complete these steps to earn 100 Trust Points. Once you reach 100 TP, you&apos;ll unlock your first rank
            (F) on TechGuild.
          </p>

          <div className="tp-steps">
            {STEPS.map(({ step, icon, tone, title, text, points }) => (
              <article className="tp-step" key={step}>
                <span className={`tp-step-icon ${tone}`}>
                  <Icon name={icon} size={22} />
                </span>
                <p className="tp-step-label">{step}</p>
                <h3>{title}</h3>
                <p className="tp-step-text">{text}</p>
                <span className={`tp-points ${tone}`}>{points}</span>
              </article>
            ))}

            <article className="tp-total">
              <div className="tp-total-head">
                <span className="tp-total-icon">
                  <Icon name="Flag" size={22} color="#ffffff" fill="#ffffff" />
                </span>
                <div className="tp-total-copy">
                  <span>Total</span>
                  <strong>
                    100 <em>TP</em>
                  </strong>
                </div>
              </div>
              <span className="tp-total-arrow">
                <Icon name="ArrowDown" size={18} color="#0062FF" />
              </span>
              <div className="tp-unlock">
                <span className="tp-unlock-rank">F</span>
                <div>
                  <strong>Unlock Rank F</strong>
                  <p>Once you reach 100 Trust Points, you will be assigned your first rank (F).</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <div className="tp-info">
          <span className="tp-info-icon">i</span>
          <p>
            Trust Points are the same for both freelancers and clients. Everyone starts with 0 TP and can earn up to
            100 TP by completing the above steps.
          </p>
        </div>
      </main>
    </div>
  );
}
