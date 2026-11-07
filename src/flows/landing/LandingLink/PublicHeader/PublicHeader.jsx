// 6-11-2026
// 03-11-2026
// Public site header with TechGuild branding, login, and signup actions.
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import logoMark from "@/assets/landing-Img/ttttttt 1@2x.png";
import "./PublicHeader.css";

export default function PublicHeader({ hideLogin = false }) {
  const dispatch = useDispatch();

  const handleComingSoon = (event) => {
    if (event) event.preventDefault();
    dispatch(showSnackbar({ message: "Coming Soon", type: "info" }));
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
            <>
              {/* Auth navigation disabled until launch — show "Coming Soon" instead. */}
              {/* <Link to="/login" state={{ from: `${location.pathname}${location.search}${location.hash}` }} className="pub-login">
                Log in
              </Link> */}
              <button type="button" className="pub-login" onClick={handleComingSoon}>
                Log in
              </button>
            </>
          )}
          {/* <Link to="/signup" className="pub-cta">
            Get started
          </Link> */}
          <button type="button" className="pub-cta" onClick={handleComingSoon}>
            Get started
          </button>
        </nav>
      </div>
    </header>
  );
}
