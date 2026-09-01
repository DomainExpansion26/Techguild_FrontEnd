import React from "react";
import "./secondary.css";

const SecondaryButton = ({
  text,
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  style = {},
  icon,
  iconPosition = "left",
  ...props
}) => {
  const content = text || children;

  return (
    <button
      className={`secondary-btn ${className}`.trim()}
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

export default SecondaryButton;

