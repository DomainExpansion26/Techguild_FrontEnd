import React from "react";
import "./secondary.css";

const handleDefault = () => alert("Sending again!");

const SecondaryButton = ({
  text = "Send again",
  onClick = handleDefault,
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

export default SecondaryButton;
