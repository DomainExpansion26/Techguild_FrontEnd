// 03-11-2026
// Help Center page with search, popular searches, and support topic links.
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Footer from "@/flows/landing/LandingLink/Footer/Footer";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import "./helpcenter.css";

const POPULAR_SEARCHES = [
  "Create a quest",
  "Apply to a quest",
  "Payments",
  "Join a party",
  "Account verification",
];

export default function HelpCenter() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  const runSearch = (value) => {
    const term = value.trim();

    if (!term) {
      inputRef.current?.focus();
      return;
    }

    setQuery(term);
    dispatch(
      showSnackbar({
        message: `Search results for "${term}" are coming soon.`,
        type: "info",
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    runSearch(query);
  };

  const handlePopularSearch = (term) => {
    setQuery(term);
    runSearch(term);
  };

  return (
    <div className="hc-page">
      <PublicHeader />

      <main>
        <section className="hc-hero">
          <div className="hc-wrap hc-hero-inner">
            <p className="hc-eyebrow">Help Center</p>
            <h1>How can we help you?</h1>
            <p className="hc-hero-sub">
              Find answers to your questions, learn how things work, and get the most out of
              TechGuild.
            </p>

            <form className="hc-search" role="search" onSubmit={handleSubmit}>
              <span className="hc-search-icon" aria-hidden="true">
                <Icon name="Search" size={22} color="#94a3b8" />
              </span>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for help articles, topics or keywords..."
                aria-label="Search for help articles, topics or keywords"
              />
              <button type="submit">Search</button>
            </form>

            <div className="hc-popular">
              <h2>Popular searches</h2>
              <p>Try searching for these common topics.</p>
              <div className="hc-chips">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    className="hc-chip"
                    onClick={() => handlePopularSearch(term)}
                  >
                    <Icon name="Search" size={16} color="#334155" />
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="hc-support">
          <div className="hc-wrap">
            <div className="hc-support-card">
              <div className="hc-support-copy">
                <h2>Still need help?</h2>
                <p>
                  Can&apos;t find what you&apos;re looking for? Our support team is here to help
                  you anytime.
                </p>
                <Link to="/contact" className="hc-support-btn">
                  Contact Support
                  <Icon name="ArrowRight" size={18} color="#ffffff" strokeWidth={2.2} />
                </Link>
              </div>

              <span className="hc-support-divider" aria-hidden="true" />

              <div className="hc-support-info">
                <div className="hc-info-row">
                  <span className="hc-info-icon" aria-hidden="true">
                    <Icon name="Mail" size={22} color="#1f49ab" />
                  </span>
                  <div className="hc-info-text">
                    <strong>Email</strong>
                    <a href="mailto:support@techguild.com">support@techguild.com</a>
                    <p>We usually respond within 1–2 business days.</p>
                  </div>
                </div>

                <div className="hc-info-row">
                  <span className="hc-info-icon" aria-hidden="true">
                    <Icon name="Clock" size={22} color="#1f49ab" />
                  </span>
                  <div className="hc-info-text">
                    <strong>Support Hours</strong>
                    <p>Mon – Fri, 9 AM – 6 PM (IST)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer active="help" />
    </div>
  );
}
