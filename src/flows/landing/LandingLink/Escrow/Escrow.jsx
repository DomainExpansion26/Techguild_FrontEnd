import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import PrimaryButton from "@/Components/Button/Primarybutton";
import Icon from "@/Components/icons/Icon";
import "./Escrow.css";

const STEPS = [
  {
    n: "1",
    icon: "FileText",
    title: "Client funds the project",
    text: "The client deposits the total project amount into escrow before the work begins.",
  },
  {
    n: "2",
    icon: "Briefcase",
    title: "Milestones are set",
    text: "The project is divided into milestones with clear deliverables and payment amounts.",
  },
  {
    n: "3",
    icon: "CircleCheck",
    title: "Work is completed",
    text: "The freelancer delivers the work for each milestone.",
  },
  {
    n: "4",
    icon: "Flag",
    title: "Payment is released",
    text: "The client reviews and approves the work. Once approved, the payment is released to the freelancer from escrow.",
  },
];

const CLIENT_BENEFITS = [
  {
    title: "Peace of mind",
    text: "Pay only when the work is completed and approved.",
  },
  {
    title: "Reduced risk",
    text: "Your payment is safe until you're satisfied with the deliverables.",
  },
  {
    title: "Better quality",
    text: "Encourages freelancers to deliver high-quality work.",
  },
  {
    title: "Clear milestone tracking",
    text: "Track progress and payments easily.",
  },
];

const FREELANCER_BENEFITS = [
  {
    title: "Payment security",
    text: "Your payment is guaranteed once the client approves the work.",
  },
  {
    title: "Fair and transparent process",
    text: "No risk of non-payment after completing the work.",
  },
  {
    title: "Build trust",
    text: "Work with confidence and grow your reputation.",
  },
  {
    title: "Focus on your work",
    text: "Spend less time worrying about payments and more time creating amazing work.",
  },
];

const WHY = [
  {
    title: "For Clients",
    icon: "User",
    iconColor: "#0062FF",
    benefits: CLIENT_BENEFITS,
  },
  {
    title: "For Freelancers",
    icon: "User",
    iconColor: "#0e9f6e",
    benefits: FREELANCER_BENEFITS,
  },
];

const MILESTONES = [
  {
    icon: "FileText",
    title: "Milestone 1",
    sub: "UI Design",
    amount: "₹ 5,000",
    status: "Approved",
    tone: "approved",
    note: "Payment released to freelancer from escrow.",
  },
  {
    icon: "Laptop",
    title: "Milestone 2",
    sub: "Frontend Development",
    amount: "₹ 10,000",
    status: "In Review",
    tone: "review",
    note: "Client is reviewing the deliverables.",
  },
  {
    icon: "Monitor",
    title: "Milestone 3",
    sub: "Final Deployment",
    amount: "₹ 5,000",
    status: "Pending",
    tone: "pending",
    note: "Payment will be released after approval.",
  },
];

const NOTES = [
  {
    icon: "Shield",
    title: "Funds are held securely",
    text: "Client's payment is kept safe in escrow until the work is approved.",
  },
  {
    icon: "FileText",
    title: "Platform fee is deducted",
    text: "The applicable platform fee is deducted as per TechGuild's policy.",
  },
  {
    icon: "RefreshCw",
    title: "Partial releases",
    text: "Payments are released milestone-wise after client approval.",
  },
];

export default function Escrow() {
  return (
    <div className="es-page">
      <PublicHeader />

      <main className="es-main">
        <section className="es-hero">
          <div className="es-hero-copy">
            <p className="es-eyebrow">ESCROW PAYMENT</p>
            <h1>Secure payments for a trusted collaboration.</h1>
            <p className="es-hero-text">
              Escrow keeps your project payments safe on TechGuild. The client&apos;s payment is held securely and
              released to the freelancer as milestones are completed, ensuring safety, transparency and trust for
              both sides.
            </p>
            <PrimaryButton
              className="es-cta"
              onClick={() => document.getElementById("how-escrow")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn how it works
              <span aria-hidden="true">→</span>
            </PrimaryButton>
          </div>

          <div className="es-flow" aria-hidden="true">
            <svg className="es-flow-lines" viewBox="0 0 600 280" preserveAspectRatio="none">
              <path
                d="M60 134C130 76 225 70 300 100"
                fill="none"
                stroke="#9db9f7"
                strokeWidth="1.8"
                strokeDasharray="4 6"
              />
              <path
                d="M540 134C470 76 375 70 300 100"
                fill="none"
                stroke="#9db9f7"
                strokeWidth="1.8"
                strokeDasharray="4 6"
              />
            </svg>

            <div className="es-side-card">
              <span className="es-side-icon">
                <Icon name="User" size={24} color="#0062FF" />
              </span>
              <strong>Client</strong>
              <p>Funds are secured in escrow</p>
            </div>

            <div className="es-escrow-card">
              <span className="es-arch">
                <span className="es-lock">
                  <Icon name="Lock" size={22} color="#ffffff" fill="#ffffff" />
                </span>
              </span>
              <strong>TechGuild Escrow</strong>
              <p>Payment is held securely until milestones are completed.</p>
            </div>

            <div className="es-side-card">
              <span className="es-side-icon green">
                <Icon name="UserCheck" size={24} color="#0e9f6e" />
              </span>
              <strong>Freelancer</strong>
              <p>Payment is released after approval</p>
            </div>
          </div>
        </section>

        <section className="es-what">
          <div>
            <h2>What is Escrow?</h2>
            <p>
              Escrow is a secure payment system where the client&apos;s payment is held safely by TechGuild and
              released to the freelancer only after the agreed work is completed. It protects both clients and
              freelancers and ensures a smooth, fair and transparent collaboration.
            </p>
          </div>
          <aside className="es-safe-card">
            <span className="es-safe-icon">
              <Icon name="Check" size={22} color="#ffffff" strokeWidth={2.5} />
            </span>
            <div>
              <h3>Safe. Transparent. Fair.</h3>
              <p>Escrow reduces payment risks and helps both sides focus on delivering great work.</p>
            </div>
          </aside>
        </section>

        <section className="es-how" id="how-escrow">
          <h2>How Escrow Works</h2>
          <p className="es-sub">A simple and secure process from start to finish.</p>

          <div className="es-steps">
            {STEPS.map(({ n, icon, title, text }) => (
              <article className="es-step" key={n}>
                <div className="es-step-top">
                  <span className="es-step-num">{n}</span>
                  <Icon name={icon} size={21} color="#0062FF" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="es-why">
          <h2>Why Escrow?</h2>
          <p className="es-sub">Escrow creates a safer and more reliable experience for everyone on TechGuild.</p>

          <div className="es-why-grid">
            {WHY.map(({ title, icon, iconColor, benefits }) => (
              <article className="es-why-card" key={title}>
                <div className="es-why-head">
                  <span className="es-why-icon">
                    <Icon name={icon} size={22} color={iconColor} />
                  </span>
                  <h3>{title}</h3>
                </div>
                <div className="es-benefit-list">
                  {benefits.map(({ title: benefitTitle, text }) => (
                    <div className="es-benefit-row" key={benefitTitle}>
                      <span className="es-check">
                        <Icon name="Check" size={11} color="#ffffff" strokeWidth={3} />
                      </span>
                      <div>
                        <strong>{benefitTitle}</strong>
                        <p>{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="es-example">
          <h2>Example: A Project with Milestones</h2>
          <p className="es-sub">Here&apos;s how escrow works for a typical project.</p>

          <div className="es-example-card">
            <div className="es-project">
              <span className="es-project-icon">
                <Icon name="FileText" size={26} color="#0062FF" />
              </span>
              <strong>Website Redesign</strong>
              <span className="es-project-label">Total Project Amount</span>
              <p className="es-project-total">₹ 20,000</p>
              <span className="es-held">
                <Icon name="Lock" size={14} color="#0062FF" />
                Held in Escrow
              </span>
            </div>

            <div className="es-ms-list">
              {MILESTONES.map(({ icon, title, sub, amount, status, tone, note }) => (
                <div className="es-ms" key={title}>
                  <span className="es-ms-dot" />
                  <span className="es-ms-icon">
                    <Icon name={icon} size={18} color="#0062FF" />
                  </span>
                  <div className="es-ms-info">
                    <strong>{title}</strong>
                    <span>{sub}</span>
                  </div>
                  <strong className="es-ms-amount">{amount}</strong>
                  <span className={`es-status ${tone}`}>{status}</span>
                  <p className="es-ms-note">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="es-notes">
          <h2>Important Notes</h2>
          <div className="es-notes-grid">
            {NOTES.map(({ icon, title, text }) => (
              <article className="es-note" key={title}>
                <span className="es-note-icon">
                  <Icon name={icon} size={20} color="#0062FF" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
