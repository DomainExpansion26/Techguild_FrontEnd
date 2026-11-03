// 03-11-2026
// Site-wide footer with TechGuild branding, navigation columns, social links, and legal links.
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Icon from "@/Components/icons/Icon";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import logoMark from "@/assets/landing-Img/ttttttt 1@2x.png";
import "./Footer.css";

const XLogo = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.5 22H3.4l7.3-8.3L1.2 2h6.4l4.4 5.8L18.9 2Zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20Z" />
  </svg>
);

function Footer({ active = "" }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleComingSoon = (event) => {
    if (event) event.preventDefault();
    dispatch(showSnackbar({ message: "Coming Soon", type: "info" }));
  };

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
              <a href="#linkedin" aria-label="LinkedIn" className="ftr-social-linkedin">
                <Icon name="Linkedin" size={18} color="#ffffff" />
              </a>
              <a href="#instagram" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#x" aria-label="X">
                <XLogo />
              </a>
            </div>
          </div>

          <div className="ftr-col">
            <strong>Platform</strong>
            <Link to="/features/quest-board" className={linkClass("quest-board", "/features/quest-board", "/quest-board")}>Quest Board</Link>
            <Link to="/party" className={linkClass("party", "/party")}>Parties</Link>
            <Link to="/trust-points" className={linkClass("trust", "/trust-points")}>Trust System</Link>
            <Link to="/ranking" className={linkClass("ranking", "/ranking")}>Rankings</Link>
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

        <div className="ftr-newsletter">
          <div>
            <strong>Stay updated with TechGuild.</strong>
            <p>Get product updates, guides, and Quest highlights.</p>
          </div>
          <form onSubmit={handleComingSoon}>
            <input type="email" placeholder="Enter your email" aria-label="Email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className="ftr-giant">TECHGUILD</div>
        <p className="ftr-copy">© 2026 TechGuild. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
