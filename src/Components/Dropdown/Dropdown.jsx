import React from "react";
import { ChevronDown } from "../icons";
import "./dropdown.css";

const normalizeOptions = (options = []) =>
  options.map((option) =>
    typeof option === "string" || typeof option === "number"
      ? { value: option, label: String(option) }
      : option,
  );

const Dropdown = ({
  label,
  placeholder = "Select an option",
  value,
  onChange,
  options = [],
  children,
  error,
  icon,
  leftIcon,
  rightIcon,
  id,
  name,
  disabled = false,
  required = false,
  containerClassName = "",
  className = "",
  selectClassName = "",
  ...props
}) => {
  const actualLeftIcon = leftIcon || icon;
  const selectId = id || (name ? `select-${name}` : undefined);
  const normalizedOptions = normalizeOptions(options);
  const isPlaceholder = value === "" || value === undefined || value === null;

  return (
    <div className={`dropdown-group ${containerClassName}`.trim()}>
      {label && (
        <label htmlFor={selectId} className="dropdown-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}

      <div
        className={`dropdown-wrapper ${actualLeftIcon ? "has-left-icon" : ""} ${error ? "has-error" : ""} ${disabled ? "is-disabled" : ""} ${className}`.trim()}
      >
        {actualLeftIcon && (
          <span className="dropdown-icon left-icon">{actualLeftIcon}</span>
        )}

        <select
          id={selectId}
          name={name}
          className={`dropdown-select ${isPlaceholder ? "is-placeholder" : ""} ${selectClassName}`.trim()}
          value={value ?? ""}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {children ||
            normalizedOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
        </select>

        <span className="dropdown-icon right-icon">
          {rightIcon || <ChevronDown width={16} height={16} />}
        </span>
      </div>

      {error && <span className="dropdown-error-msg">{error}</span>}
    </div>
  );
};

export default Dropdown;
