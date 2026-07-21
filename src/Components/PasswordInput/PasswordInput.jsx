import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./PasswordInput.css";

const PasswordInput = ({
  label,
  placeholder = "Enter your password",
  value,
  onChange,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input-container">
      {label && <label className="input-label">{label}</label>}
      <div className="input-box">
        {icon && <span className="input-icon">{icon}</span>}

        <input
          type={showPassword ? "text" : "password"}
          className="password-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <button
          type="button"
          className="eye-btn"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
