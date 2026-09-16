import { Fragment, useRef } from "react";
import "./OtpInput.css";

// 6 (or `length`) digit one-time-password input with auto-advance,
// backspace navigation, arrow-key navigation, and paste support.
const OtpInput = ({
  values = [],
  onChange,
  error = false,
  length = 6,
  separator = true,
  autoComplete = "one-time-code",
}) => {
  const refs = useRef([]);

  const update = (index, char) => {
    const next = [...values];
    if (char === "") {
      next[index] = "";
    } else {
      next[index] = char.slice(-1);
      if (index < length - 1 && char) {
        refs.current[index + 1]?.focus();
      }
    }
    onChange(next);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (index, event) => {
    const text = event.clipboardData.getData("text");
    if (!/^\d{1,6}$/.test(text)) return;
    event.preventDefault();
    const digits = text.split("").slice(0, length);
    const next = [...values];
    digits.forEach((d, i) => {
      if (index + i < length) next[index + i] = d;
    });
    onChange(next);
    refs.current[Math.min(index + digits.length, length - 1)]?.focus();
  };

  return (
    <div
      className={`otp-group${error ? " otp-group--error" : ""}`}
      role="group"
      aria-label="One time password"
    >
      {Array.from({ length }, (_, i) => (
        <Fragment key={i}>
          <input
            ref={(el) => (refs.current[i] = el)}
            className="otp-input"
            inputMode="numeric"
            autoComplete={autoComplete}
            aria-label={`One time password digit ${i + 1}`}
            value={values[i] || ""}
            onChange={(event) => update(i, event.target.value)}
            onKeyDown={(event) => handleKeyDown(i, event)}
            onPaste={(event) => handlePaste(i, event)}
            maxLength={1}
          />
          {separator && i === length / 2 - 1 && (
            <span className="otp-sep" aria-hidden="true">
              -
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default OtpInput;