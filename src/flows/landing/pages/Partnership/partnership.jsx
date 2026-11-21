// 9-11-2026
// 03-11-2026
// Partnership page describing partner types, benefits, and the partnership application form.
import { useState } from "react";
import { useDispatch } from "react-redux";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Footer from "@/flows/landing/LandingLink/Footer/Footer";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import heroArt from "@/assets/landing-Img/partnership-hero.jpg";
import "./partnership.css";

const PARTNER_CARDS = [
  {
    icon: "Building2",
    title: "Agency Partners",
    text: "Connect with clients, access a wider talent pool, and create new business opportunities.",
  },
  {
    icon: "Users",
    title: "Community Partners",
    text: "Work with communities, creator networks, and freelancer groups to empower more talent.",
  },
  {
    icon: "GraduationCap",
    title: "Education Partners",
    text: "Partner with colleges, institutes, and skill-development organizations to connect learners with real opportunities.",
  },
  {
    icon: "Code",
    title: "Technology Partners",
    text: "Integrate, co-build, and create tools and service providers that enhance the TechGuild experience.",
  },
];

const BENEFITS = [
  {
    icon: "Megaphone",
    title: "Reach the right audience",
    text: "Connect with a diverse community of clients, freelancers, parties, and agencies.",
  },
  {
    icon: "Lightbulb",
    title: "Discover new opportunities",
    text: "Collaborate on quests, co-marketing initiatives, and strategic programs.",
  },
  {
    icon: "TrendingUp",
    title: "Help people grow",
    text: "Support skill development, employment, and meaningful collaboration.",
  },
  {
    icon: "ShieldCheck",
    title: "Be part of a trusted platform",
    text: "Contribute to a more transparent, fair, and opportunity-driven professional world.",
  },
];

const STEPS = [
  {
    icon: "Mail",
    title: "Tell us about your organization",
    text: "Share your goals, audience and areas of interest.",
  },
  {
    icon: "Compass",
    title: "Explore opportunities",
    text: "We'll discuss how we can collaborate and create value together.",
  },
  {
    icon: "Handshake",
    title: "Build together",
    text: "Define the partnership, set next steps, and start creating impact.",
  },
];

const ORGANIZATION_TYPES = [
  "Agency",
  "Community",
  "Education",
  "Technology",
  "Other",
];

const PARTNERSHIP_TYPES = [
  "Strategic partnership",
  "Technology partnership",
  "Community partnership",
  "Education partnership",
  "Affiliate partnership",
  "Other",
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  workEmail: "",
  contactNumber: "",
  organizationName: "",
  organizationType: "",
  partnershipType: "",
  website: "",
  tellUsMore: "",
};

function ChartVisual() {
  return (
    <div className="pp-chart-visual" aria-hidden="true">
      <div className="pp-chart-card">
        <div className="pp-chart-top">
          <span />
          <span />
          <span />
          <Icon name="TrendingUp" size={14} color="#16a34a" />
        </div>
        <div className="pp-chart-bars">
          <span style={{ height: "38%" }} />
          <span style={{ height: "56%" }} />
          <span style={{ height: "46%" }} />
          <span style={{ height: "84%" }} />
        </div>
      </div>
      <span className="pp-tg-badge">TG</span>
      <span className="pp-chart-spark" />
    </div>
  );
}

function Partnership() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const firstName = formData.firstName.trim();
    dispatch(
      showSnackbar({
        message: `Thanks${firstName ? `, ${firstName}` : ""}! Your partnership inquiry has been submitted. Our team will get back to you within 2 business days.`,
        type: "success",
      })
    );
    setFormData(INITIAL_FORM);
  };

  return (
    <div className="pp-page">
      <PublicHeader />

      <main>
        <section className="pp-hero">
          <img className="pp-hero-art" src={heroArt} alt="" aria-hidden="true" />
          <div className="pp-hero-overlay" />
          <div className="pp-wrap pp-hero-inner">
            <h1>
              Better work
              <br />
              starts with
              <br />
              better
              <br />
              partnerships.
            </h1>
            <a href="#partnership-inquiry" className="pp-btn pp-btn-primary">
              Become a Partner
              <Icon name="ArrowRight" size={16} color="#ffffff" />
            </a>
          </div>
        </section>

        <section className="pp-partners">
          <div className="pp-wrap">
            <div className="pp-section-head">
              <p className="pp-eyebrow">WHO CAN PARTNER WITH TECHGUILD?</p>
              <h2>Partner with us, grow together.</h2>
              <p className="pp-section-sub">
                We collaborate with forward-thinking organizations that share our vision for a
                more open, trustworthy and opportunity-driven professional world.
              </p>
            </div>

            <div className="pp-partner-grid">
              {PARTNER_CARDS.map((card) => (
                <article key={card.title} className="pp-partner-card">
                  <span className="pp-partner-icon">
                    <Icon name={card.icon} size={21} color="#103CA4" />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <a href="#partnership-inquiry" className="pp-learn">
                    Learn more
                    <Icon name="ArrowRight" size={14} color="#103CA4" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pp-why">
          <div className="pp-wrap">
            <div className="pp-why-grid">
              <div className="pp-why-copy">
                <p className="pp-eyebrow">WHY PARTNER WITH TECHGUILD?</p>
                <h2>
                  Create more opportunities.
                  <br />
                  Make a bigger impact.
                </h2>
                <p className="pp-section-sub">
                  Partnering with TechGuild means being part of a growing ecosystem that&apos;s
                  shaping the future of professional collaboration.
                </p>
              </div>
              <ChartVisual />
            </div>

            <div className="pp-benefits">
              {BENEFITS.map((benefit) => (
                <article key={benefit.title} className="pp-benefit">
                  <span className="pp-benefit-icon">
                    <Icon name={benefit.icon} size={20} color="#103CA4" />
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pp-process">
          <div className="pp-wrap">
            <div className="pp-section-head">
              <p className="pp-eyebrow">HOW PARTNERSHIPS WORK</p>
              <h2>A simple and collaborative process.</h2>
              <p className="pp-section-sub">
                We keep it straightforward — from your first message to a meaningful partnership.
              </p>
            </div>

            <div className="pp-steps">
              {STEPS.map((step, index) => (
                <article key={step.title} className="pp-step">
                  <span className="pp-step-num">{index + 1}</span>
                  <div className="pp-step-card">
                    <span className="pp-step-icon">
                      <Icon name={step.icon} size={18} color="#103CA4" />
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pp-inquiry" id="partnership-inquiry">
          <div className="pp-wrap">
            <div className="pp-section-head">
              <p className="pp-eyebrow">PARTNERSHIP INQUIRY</p>
              <h2>Let&apos;s start a conversation.</h2>
              <p className="pp-section-sub">
                Fill out the form and our team will get back to you soon.
              </p>
            </div>

            <div className="pp-inquiry-grid">
              <form className="pp-form-card" onSubmit={handleSubmit}>
                <div className="pp-form-grid">
                  <div className="pp-field">
                    <label htmlFor="firstName">
                      First name<span className="pp-required">*</span>
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="pp-field">
                    <label htmlFor="lastName">
                      Last name<span className="pp-required">*</span>
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="pp-field">
                    <label htmlFor="workEmail">
                      Work email address<span className="pp-required">*</span>
                    </label>
                    <input
                      id="workEmail"
                      name="workEmail"
                      type="email"
                      placeholder="Enter your work email"
                      autoComplete="email"
                      value={formData.workEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="pp-field">
                    <label htmlFor="contactNumber">
                      Contact number<span className="pp-required">*</span>
                    </label>
                    <div className="pp-phone-input">
                      <span className="pp-prefix">+91</span>
                      <input
                        id="contactNumber"
                        name="contactNumber"
                        type="tel"
                        placeholder="Enter your number"
                        autoComplete="tel-national"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="pp-field pp-field-full">
                    <label htmlFor="organizationName">
                      Organization name<span className="pp-required">*</span>
                    </label>
                    <input
                      id="organizationName"
                      name="organizationName"
                      type="text"
                      placeholder="Enter your organization name"
                      autoComplete="organization"
                      value={formData.organizationName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="pp-field">
                    <label htmlFor="organizationType">
                      Organization type<span className="pp-required">*</span>
                    </label>
                    <select
                      id="organizationType"
                      name="organizationType"
                      value={formData.organizationType}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select organization type
                      </option>
                      {ORGANIZATION_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pp-field">
                    <label htmlFor="partnershipType">
                      Type of partnership<span className="pp-required">*</span>
                    </label>
                    <select
                      id="partnershipType"
                      name="partnershipType"
                      value={formData.partnershipType}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select partnership type
                      </option>
                      {PARTNERSHIP_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pp-field pp-field-full">
                    <label htmlFor="website">Website or LinkedIn URL (optional)</label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://"
                      autoComplete="url"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="pp-field pp-field-full">
                    <label htmlFor="tellUsMore">Tell us more</label>
                    <textarea
                      id="tellUsMore"
                      name="tellUsMore"
                      placeholder="Share your goals, ideas or how you'd like to partner with TechGuild..."
                      maxLength={500}
                      value={formData.tellUsMore}
                      onChange={handleChange}
                    />
                    <span className="pp-counter">{formData.tellUsMore.length}/500</span>
                  </div>
                </div>

                <button type="submit" className="pp-submit">
                  Submit Partnership Inquiry
                  <Icon name="ArrowRight" size={15} color="#ffffff" />
                </button>
              </form>

              <aside className="pp-info-card">
                <h3>Interested in partnering?</h3>
                <p>
                  We&apos;d love to hear from you. Whether you want to run a community initiative,
                  integrate your product, collaborate on programs, or explore any other
                  opportunity — our team is here to help.
                </p>

                <div className="pp-contact-list">
                  <div className="pp-contact-item">
                    <span className="pp-contact-icon">
                      <Icon name="Mail" size={18} color="#103CA4" />
                    </span>
                    <div>
                      <p className="pp-contact-label">Email</p>
                      <p className="pp-contact-value">partners@techguild.com</p>
                      <p className="pp-contact-note">We&apos;ll respond within 2 business days</p>
                    </div>
                  </div>

                  <div className="pp-contact-item">
                    <span className="pp-contact-icon">
                      <Icon name="Phone" size={18} color="#103CA4" />
                    </span>
                    <div>
                      <p className="pp-contact-label">Phone</p>
                      <p className="pp-contact-value">+91 98765 43210</p>
                      <p className="pp-contact-note">Mon - Fri, 9 AM - 6 PM (IST)</p>
                    </div>
                  </div>

                  <div className="pp-contact-item">
                    <span className="pp-contact-icon">
                      <Icon name="MapPin" size={18} color="#103CA4" />
                    </span>
                    <div>
                      <p className="pp-contact-label">Our office</p>
                      <p className="pp-contact-value">Pune, Maharashtra, India</p>
                      <p className="pp-contact-note">Partnerships team only</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="pp-cta">
          <div className="pp-wrap">
            <div className="pp-cta-panel">
              <p className="pp-eyebrow">BECOME A PARTNER</p>
              <h2>Let&apos;s create more opportunities together.</h2>
              <p>
                Have an idea for working together? Share your goals, and let&apos;s explore how we
                can build a stronger, more inclusive professional ecosystem.
              </p>
              <a href="#partnership-inquiry" className="pp-btn pp-btn-primary">
                Start a Partnership
                <Icon name="ArrowRight" size={16} color="#ffffff" />
              </a>

              <div className="pp-cta-bars" aria-hidden="true">
                <span style={{ height: "28%" }} />
                <span style={{ height: "48%" }} />
                <span style={{ height: "70%" }} />
                <span style={{ height: "96%" }} />
              </div>
              <Icon
                name="TrendingUp"
                size={30}
                color="#2f6fe4"
                className="pp-cta-trend"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer active="partners" />
    </div>
  );
}

export default Partnership;
