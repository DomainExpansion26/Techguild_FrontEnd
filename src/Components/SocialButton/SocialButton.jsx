import "./SocialButton.css";

const SocialButton = ({ text, icon, onClick, type = "button", disabled = false }) => {
  return (
    <button className="social-btn" type={type} onClick={onClick} disabled={disabled}>
      {icon && <span className="social-icon">{icon}</span>}
      {text}
    </button>
  );
};

export default SocialButton;
