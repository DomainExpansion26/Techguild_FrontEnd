const TextInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}) => {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}

      <div className="input-box">
        {icon && <span className="input-icon">{icon}</span>}

        <input
          type={type}
          className="text-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TextInput;