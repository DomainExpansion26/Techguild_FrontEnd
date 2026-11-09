// 9-11-2026
// 03-11-2026
// Contact Us page with a support form and social/contact channels.
import { useState } from "react";
import { useDispatch } from "react-redux";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Footer from "@/flows/landing/LandingLink/Footer/Footer";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import "./contactus.css";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

const XLogo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.5 22H3.4l7.3-8.3L1.2 2h6.4l4.4 5.8L18.9 2Zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20Z" />
  </svg>
);

const DiscordLogo = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.32 4.37a19.79 19.79 0 0 0-4.89-1.52.07.07 0 0 0-.07.04c-.21.37-.45.86-.61 1.25a18.27 18.27 0 0 0-5.49 0c-.16-.4-.4-.88-.62-1.25a.08.08 0 0 0-.08-.04c-1.71.3-3.35.81-4.88 1.52a.07.07 0 0 0-.04.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.05 19.9 19.9 0 0 0 6 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.3 1.22-1.99a.08.08 0 0 0-.04-.11c-.65-.25-1.27-.55-1.87-.89a.08.08 0 0 1 0-.13l.37-.29a.07.07 0 0 1 .08-.01 14.2 14.2 0 0 0 12.06 0 .07.07 0 0 1 .08.01l.37.29a.08.08 0 0 1-.01.13c-.6.35-1.22.64-1.87.89a.08.08 0 0 0-.04.11c.36.7.77 1.36 1.22 1.99a.08.08 0 0 0 .09.03 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.68-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.17 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42s.95-2.42 2.15-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z" />
  </svg>
);

function ContactUs() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      showSnackbar({
        message: "Thanks for reaching out! We'll get back to you within 24 hours.",
        type: "success",
      })
    );
    setForm(INITIAL_FORM);
  };

  return (
    <div className="ctu-page">
      <PublicHeader hideLogin />

      <main className="ctu-top">
        <div className="ctu-wrap ctu-hero">
          <p className="ctu-eyebrow">CONTACT US</p>
          <h1>
            Let&apos;s build a better way
            <br className="ctu-hero-break" /> to work together.
          </h1>
          <p className="ctu-hero-sub">
            Have a question, suggestion, or just want to say hello?
            <br className="ctu-hero-break" /> We&apos;d love to hear from you.
          </p>
        </div>

        <div className="ctu-wrap ctu-grid">
          <section className="ctu-card ctu-form-card">
            <h2>Send us a message</h2>
            <p className="ctu-card-sub">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>

            <form className="ctu-form" onSubmit={handleSubmit}>
              <div className="ctu-name-row">
                <label className="ctu-field">
                  <span>
                    First name <em>*</em>
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    required
                  />
                </label>
                <label className="ctu-field">
                  <span>
                    Last name <em>*</em>
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    required
                  />
                </label>
              </div>

              <label className="ctu-field">
                <span>
                  Email address <em>*</em>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                />
              </label>

              <label className="ctu-field">
                <span>
                  Subject <em>*</em>
                </span>
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter a subject"
                  value={form.subject}
                  onChange={handleChange("subject")}
                  required
                />
              </label>

              <label className="ctu-field ctu-message-field">
                <span>
                  Message <em>*</em>
                </span>
                <textarea
                  name="message"
                  placeholder="Type your message here..."
                  maxLength={500}
                  value={form.message}
                  onChange={handleChange("message")}
                  required
                />
              </label>

              <div className="ctu-counter">{form.message.length}/500</div>

              <button type="submit" className="ctu-submit">
                <span>Send Message</span>
                <Icon name="ArrowRight" size={16} color="currentColor" />
              </button>
            </form>
          </section>

          <div className="ctu-side">
            <section className="ctu-card ctu-reach">
              <h2>Other ways to reach us</h2>
              <p className="ctu-card-sub">
                Prefer a different way to connect? Here are our contact details.
              </p>

              <div className="ctu-reach-list">
                <div className="ctu-reach-row">
                  <span className="ctu-reach-icon">
                    <Icon name="Mail" size={20} color="#103CA4" />
                  </span>
                  <div className="ctu-reach-text">
                    <strong>Email</strong>
                    <a href="mailto:support@techguild.com">support@techguild.com</a>
                  </div>
                  <span className="ctu-badge">
                    We usually respond
                    <br />
                    within 24 hours
                  </span>
                </div>

                <div className="ctu-reach-row">
                  <span className="ctu-reach-icon">
                    <Icon name="Phone" size={20} color="#103CA4" />
                  </span>
                  <div className="ctu-reach-text">
                    <strong>Phone</strong>
                    <a href="tel:+919876543210">+91 98765 43210</a>
                  </div>
                  <span className="ctu-badge">
                    Mon &ndash; Fri
                    <br />
                    9:00 AM &ndash; 6:00 PM (IST)
                  </span>
                </div>

                <div className="ctu-reach-row">
                  <span className="ctu-reach-icon">
                    <Icon name="MapPin" size={20} color="#103CA4" />
                  </span>
                  <div className="ctu-reach-text">
                    <strong>Headquarters</strong>
                    <span>Pune, Maharashtra, India</span>
                    <span className="ctu-reach-note">(Remote-friendly team)</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="ctu-card ctu-offices">
              <h2>Our Offices</h2>
              <p className="ctu-card-sub">
                We&apos;re a global, remote-first team with key hubs in:
              </p>

              <div className="ctu-office-grid">
                <div className="ctu-office">
                  <span className="ctu-office-icon">
                    <Icon name="Building2" size={18} color="#103CA4" />
                  </span>
                  <div>
                    <strong>Pune, India</strong>
                    <span>Headquarters</span>
                  </div>
                </div>
                <div className="ctu-office">
                  <span className="ctu-office-icon">
                    <Icon name="Globe" size={18} color="#103CA4" />
                  </span>
                  <div>
                    <strong>Global</strong>
                    <span>Remote team across regions</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="ctu-wrap">
          <section className="ctu-card ctu-follow">
            <h2>Follow us</h2>
            <p className="ctu-card-sub">
              Stay updated with our latest news, features and opportunities.
            </p>
            <div className="ctu-social">
              <a href="#linkedin" aria-label="LinkedIn" className="ctu-social-linkedin">
                <Icon name="Linkedin" size={17} color="currentColor" />
              </a>
              <a href="#x" aria-label="X">
                <XLogo />
              </a>
              <a href="#discord" aria-label="Discord">
                <DiscordLogo />
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer active="contact" />
    </div>
  );
}

export default ContactUs;
