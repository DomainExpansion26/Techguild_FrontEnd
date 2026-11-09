// 9-11-2026
// 6-11-2026
// 03-11-2026
// Public site header matching the landing page floating navbar design.
import { Link, useNavigate } from "react-router-dom";
import logoMark from "@/assets/landing-Img/ttttttt 1@2x.png";
import "./PublicHeader.css";

export default function PublicHeader({ hideLogin = false }) {
  const navigate = useNavigate();

  const goToLogin = (event) => {
    if (event) event.preventDefault();
    navigate("/login");
  };

  return (
    <header className="pub-header">
      <div className="pub-header-inner">
        <Link to="/" className="pub-logo" aria-label="TechGuild home">
          <img src={logoMark} className="pub-logo-mark" alt="TechGuild logo" />
          <span>TechGuild</span>
        </Link>
        <nav className="pub-actions" aria-label="Account">
          {!hideLogin && (
            <button type="button" className="pub-login" onClick={goToLogin}>
              Sign In
            </button>
          )}
          <button type="button" className="pub-cta" onClick={goToLogin}>
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
}
