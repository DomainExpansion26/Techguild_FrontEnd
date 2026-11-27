import { Link } from "react-router-dom";
import "./ComingSoon.css";

export default function ComingSoon({ title = "Sign In", subtitle = "We're getting authentication ready. Please check back soon." }) {
  return (
    <div className="comingsoon-page">
      <Link to="/home" className="comingsoon-logo">
        <span className="comingsoon-logo-tech">Tech</span>
        <span className="comingsoon-logo-guild">Guild</span>
      </Link>

      <div className="comingsoon-card">
        <span className="comingsoon-badge">Coming Soon</span>
        <h1>{title} is coming soon</h1>
        <p>{subtitle}</p>
        <div className="comingsoon-actions">
          <Link to="/home" className="comingsoon-btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
