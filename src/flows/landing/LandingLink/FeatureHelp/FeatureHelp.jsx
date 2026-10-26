import Icon from "@/Components/icons/Icon";
import "./FeatureHelp.css";

export default function FeatureHelp({ items, variant = "inline" }) {
  return (
    <div className={`fh-grid ${variant}`.trim()}>
      {items.map(({ type, icon, iconColor, title, text, points }) => (
        <article className={`fh-card ${type}`} key={title}>
          <div className="fh-head">
            <span className="fh-icon">
              <Icon name={icon} size={21} color={iconColor || "#0062FF"} />
            </span>
            <h3>{title}</h3>
          </div>
          <p className="fh-sub">{text}</p>
          <ul className="fh-list">
            {points.map((point) => (
              <li key={point}>
                <span className="fh-check">
                  <Icon name="Check" size={10} color="#ffffff" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
