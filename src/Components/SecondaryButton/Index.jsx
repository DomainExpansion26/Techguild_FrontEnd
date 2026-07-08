import React from "react";
import "./Index.css";

const SecondaryButtonBase = ({
  text,
  onClick,
  type = "button",
  disabled = false,
  children,
}) => {
  return (
    <button
      className="secondary-btn"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text || children}
    </button>
  );
};

export default SecondaryButtonBase;
