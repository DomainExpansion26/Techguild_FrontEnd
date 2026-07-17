import "./SocialButton.css";

const SocialButton = ({ text, icon, onClick, type = "button" }) => {
  return (
    <button className="social-btn" type={type} onClick={onClick}>
      {icon && <span className="social-icon">{icon}</span>}
      {text}
    </button>
  );
};

export default SocialButton;
