import React from "react";
import "./Primarybutton.css";

const PrimaryButton = ({
  text,
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  style = {},
  icon,
  iconPosition = "right",
  ...props
}) => {
  const content = text || children;

  return (
    <button
      className={`primary-btn ${className}`.trim()}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="btn-icon left-icon">{icon}</span>}
      {content}
      {icon && iconPosition === "right" && <span className="btn-icon right-icon">{icon}</span>}
    </button>
  );
};

export default PrimaryButton;