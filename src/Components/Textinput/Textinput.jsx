import React from "react";
import "./textinput.css";

const TextInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon,
  leftIcon,
  rightIcon,
  className = "",
  inputClassName = "",
  containerClassName = "",
  id,
  name,
  disabled = false,
  required = false,
  ...props
}) => {
  const actualLeftIcon = leftIcon || icon;
  const inputId = id || (name ? `input-${name}` : undefined);

  return (
    <div className={`text-input-group ${containerClassName}`.trim()}>
      {label && (
        <label htmlFor={inputId} className="text-input-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}

      <div
        className={`text-input-wrapper ${actualLeftIcon ? "has-left-icon" : ""} ${rightIcon ? "has-right-icon" : ""} ${error ? "has-error" : ""} ${disabled ? "is-disabled" : ""} ${className}`.trim()}
      >
        {actualLeftIcon && <span className="text-input-icon left-icon">{actualLeftIcon}</span>}

        <input
          id={inputId}
          name={name}
          type={type}
          className={`text-input-field ${error ? "input-error" : ""} ${inputClassName}`.trim()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...props}
        />

        {rightIcon && <span className="text-input-icon right-icon">{rightIcon}</span>}
      </div>

      {error && <span className="text-input-error-msg">{error}</span>}
    </div>
  );
};

export default TextInput;