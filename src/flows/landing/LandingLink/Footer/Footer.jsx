// 6-11-2026
// 03-11-2026
// Site-wide footer with TechGuild branding, navigation columns, social links, and legal links.
import { Link, useLocation } from "react-router-dom";
import Icon from "@/Components/icons/Icon";
import logoMark from "@/assets/landing-Img/ttttttt 1@2x.png";
import "./Footer.css";

function Footer({ active = "" }) {
  const { pathname } = useLocation();

  const linkClass = (key, ...paths) => {
    const matches = paths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );
    return active === key || matches ? "ftr-active" : undefined;
  };

  return (
    <footer className="ftr">
      <div className="ftr-wrap">
        <div className="ftr-grid">
          <div className="ftr-brand">
            <Link to="/" className="ftr-logo">
              <img src={logoMark} alt="TechGuild logo" />
              <span>TechGuild</span>
            </Link>
            <p>The trust-first ecosystem for professional collaboration.</p>
            <div className="ftr-social">
              <a
                href="https://www.linkedin.com/company/144693907/admin/dashboard/"
                aria-label="LinkedIn"
                className="ftr-social-linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="Linkedin" size={18} color="#ffffff" />
              </a>
            </div>
          </div>

          <div className="ftr-col">
            <strong>Platform</strong>
            <Link to="/features/quest-board" className={linkClass("quest-board", "/features/quest-board", "/quest-board")}>Quest Board</Link>
            <Link to="/party" className={linkClass("party", "/party")}>Parties</Link>
            <Link to="/ranking" className={linkClass("ranking", "/ranking")}>Ranks</Link>
            <Link to="/escrow" className={linkClass("escrow", "/escrow")}>Escrow</Link>
          </div>

          <div className="ftr-col">
            <strong>Company</strong>
            <Link to="/about" className={linkClass("about", "/about")}>About</Link>
            <Link to="/careers" className={linkClass("careers", "/careers")}>Careers</Link>
            <Link to="/contact" className={linkClass("contact", "/contact")}>Contact</Link>
            <Link to="/partnerships" className={linkClass("partners", "/partnerships")}>Partners</Link>
          </div>

          <div className="ftr-col">
            <strong>Resources</strong>
            <Link to="/help-center" className={linkClass("help", "/help-center")}>Help Center</Link>
            <Link to="/guides" className={linkClass("guides", "/guides")}>Guides</Link>
            <Link to="/community" className={linkClass("community", "/community")}>Community</Link>
          </div>

          <div className="ftr-col">
            <strong>Legal</strong>
            <Link to="/privacy-policy" className={linkClass("privacy", "/privacy-policy")}>Privacy</Link>
            <Link to="/terms" className={linkClass("terms", "/terms")}>Terms</Link>
            <Link to="/security" className={linkClass("security", "/security")}>Security</Link>
          </div>
        </div>

        <div className="ftr-giant">TECHGUILD</div>
        <p className="ftr-copy">© 2026 TechGuild. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
