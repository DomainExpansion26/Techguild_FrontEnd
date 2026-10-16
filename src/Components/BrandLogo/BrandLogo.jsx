// Last Changed: 16-10-2026 - added TechGuildMark SVG (exact box+t mark) with color prop
import "./BrandLogo.css";

export const TechGuildMark = ({ size = 30, color = "#0B3DAD" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* outer box — open corner at bottom-right like reference */}
    <path
      d="M5 4H27V26H11"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    />
    <path
      d="M5 4V28H27V22"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    />
    {/* inner t */}
    <path
      d="M11.5 14.5H20.5M16 10V24C16 26 17 27 19.5 27H21"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    />
  </svg>
);

const BrandLogo = () => {
  return (
    <div className="brand">
      <TechGuildMark />
      <span className="tech">Tech</span>
      <span className="guild">Guild</span>
    </div>
  );
};

export default BrandLogo;
