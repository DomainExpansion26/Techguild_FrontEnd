// 03-11-2026
// Public site header with TechGuild branding, login, and signup actions.
import { Link, useLocation } from "react-router-dom";
import logoMark from "@/assets/landing-Img/ttttttt 1@2x.png";
import "./PublicHeader.css";

export default function PublicHeader({ hideLogin = false }) {
  const location = useLocation();

  return (
    <header className="pub-header">
      <div className="pub-header-inner">
        <Link to="/" className="pub-logo" aria-label="TechGuild home">
          <img src={logoMark} className="pub-logo-mark" alt="TechGuild logo" />
          <span>TechGuild</span>
        </Link>
        <nav className="pub-actions" aria-label="Account">
          {!hideLogin && (
            <Link to="/login" state={{ from: `${location.pathname}${location.search}${location.hash}` }} className="pub-login">
              Log in
            </Link>
          )}
          <Link to="/signup" className="pub-cta">
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
