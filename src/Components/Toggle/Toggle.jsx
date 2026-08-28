import "./Toggle.css";

// --- Toggle Switch Component ---
const Toggle = ({
  active = false,
  onClick,
  onChange,
  size = "md", // "sm" | "md" | "lg"
  activeColor, // background when ON
  inactiveColor, // background when OFF
  thumbColor, // knob color
  disabled = false,
  ariaLabel = "Toggle switch",
  className = "",
  style,
}) => {
  const handleToggle = () => {
    if (!disabled) (onClick || onChange)?.();
  };

  const cssVars = {
    ...(activeColor && { "--toggle-active-bg": activeColor }),
    ...(inactiveColor && { "--toggle-inactive-bg": inactiveColor }),
    ...(thumbColor && { "--toggle-thumb-bg": thumbColor }),
    ...style,
  };

  return (
    <button
      type="button"
      className={`toggle-switch ${size} ${active ? "active" : ""} ${
        disabled ? "disabled" : ""
      } ${className}`}
      style={cssVars}
      onClick={handleToggle}
      disabled={disabled}
      role="switch"
      aria-checked={active}
      aria-label={ariaLabel}
    >
      <span className="toggle-thumb" />
    </button>
  );
};

export default Toggle;
