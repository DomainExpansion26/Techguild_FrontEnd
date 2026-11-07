// 6-11-2026
// 03-11-2026
// Shared layout for full guide articles with hero, sticky table of contents, and search.
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Footer from "@/flows/landing/LandingLink/Footer/Footer";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import "./guideArticle.css";

export default function FullGuideLayout({
  title,
  subtitle,
  icon,
  toc,
  children,
  heroVariant = "band",
}) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState(1);

  const handleSearch = (event) => {
    event.preventDefault();
    if (!query.trim()) {
      inputRef.current?.focus();
      return;
    }
    dispatch(
      showSnackbar({
        message: `Search results for "${query.trim()}" are coming soon.`,
        type: "info",
      })
    );
  };

  return (
    <div className="fg-page">
      <PublicHeader />

      <main>
        <section className={`fg-hero${heroVariant === "card" ? " is-card" : ""}`}>
          <div className="fg-wrap fg-hero-inner">
            <div className="fg-hero-copy">
              <h1>{title}</h1>
              <p className="fg-hero-sub">{subtitle}</p>
            </div>

            <div className="fg-hero-art" aria-hidden="true">
              <span className="fg-art-strokes">
                <i />
                <i />
              </span>
              <div className="fg-art-card">
                <span className="fg-art-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="fg-art-icon">
                  <Icon name={icon} size={16} color="#ffffff" />
                </span>
                <span className="fg-art-lines">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <span className="fg-art-cursor">
                <svg width="16" height="19" viewBox="0 0 18 22" fill="none">
                  <path
                    d="M1.4 1.2 16 10.9l-6.2 1.4-3.1 6.2L1.4 1.2Z"
                    fill="#1e40af"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                  />
                </svg>
              </span>
            </div>
          </div>
        </section>

        <div className="fg-wrap">
          <form className="fg-search" role="search" onSubmit={handleSearch}>
            <span className="fg-search-icon" aria-hidden="true">
              <Icon name="Search" size={14} color="#94a3b8" />
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search in this guide..."
              aria-label="Search in this guide"
            />
            <button type="submit">Search</button>
          </form>

          <div className="fg-layout">
            <aside className="fg-toc" aria-label="On this page">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#fg-section-${item.id}`}
                  className={activeSection === item.id ? "is-active" : undefined}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.id}. {item.label}
                </a>
              ))}
            </aside>

            <div className="fg-sections">{children}</div>
          </div>
        </div>
      </main>

      <Footer active="guides" />
    </div>
  );
}
