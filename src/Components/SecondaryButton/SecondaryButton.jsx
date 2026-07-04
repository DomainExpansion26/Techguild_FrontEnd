import React from "react";
import SecondaryButtonBase from "./Index";

const handleDefault = () => alert("Sending again!");

const SecondaryButton = ({
  text = "Send again",
  onClick = handleDefault,
  type = "button",
  disabled = false,
  children,
}) => {
  return (
    <SecondaryButtonBase
      text={text}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </SecondaryButtonBase>
  );
};

export default SecondaryButton;
