import "./Primarybutton.css";

const PrimaryButton = ({
  text,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      className="primary-btn"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;