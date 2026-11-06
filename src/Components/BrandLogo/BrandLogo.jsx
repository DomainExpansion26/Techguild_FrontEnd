// 6-11-2026
// Last Changed: 06-11-2026 - uses the same logo icon as the navbar
import logoMark from "@/assets/landing-Img/ttttttt 1@2x.png";
import "./BrandLogo.css";

const BrandLogo = () => {
  return (
    <div className="brand">
      <img src={logoMark} className="brand-mark" alt="TechGuild logo" />
      <span className="tech">Tech</span>
      <span className="guild">Guild</span>
    </div>
  );
};

export default BrandLogo;
