// [TechGuild Update: 13-10-2026] Shared party-flow UI primitives (used by Create Party + Join Party)
import React from "react";
import Icon from "@/Components/icons/Icon";
import { ICON_SIZES } from "@/constants/sizes";
import "./partyui.css";

/**
 * Multiline variant of `TextInput`.
 * Reuses the TextInput design-system class names (`.text-input-group`,
 * `.text-input-label`, `.text-input-field`) so it stays visually identical to the
 * shared component — the barrel has no textarea, so this fills the gap rather
 * than introducing a second input style.
 */
export function PartyTextarea({
  label,
  required,
  value,
  onChange,
  placeholder,
  max,
  rows = 3,
  error,
  hint,
  id,
  name,
  disabled = false,
}) {
  const inputId = id || (name ? `party-${name}` : undefined);
  const count = typeof value === "string" ? value.length : 0;

  return (
    <div className="text-input-group cp-textarea-group">
      {label && (
        <label htmlFor={inputId} className="text-input-label cp-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}

      <div className={`text-input-wrapper cp-textarea-wrap ${error ? "has-error" : ""}`}>
        <textarea
          id={inputId}
          name={name}
          className="text-input-field cp-textarea"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          disabled={disabled}
          maxLength={max}
        />
        {max ? <span className="cp-char-count cp-textarea-count">{count}/{max}</span> : null}
      </div>

      {hint && !error && <span className="cp-hint">{hint}</span>}
      {error && <span className="text-input-error-msg">{error}</span>}
    </div>
  );
}

/**
 * Character counter for `TextInput`, rendered through its `rightIcon` slot.
 * Turns amber near the limit and red once exceeded.
 */
export function charCounter(value = "", max) {
  const count = typeof value === "string" ? value.length : 0;
  const tone = count >= max ? "danger" : count >= max * 0.9 ? "warn" : "normal";
  return <span className={`cp-char-count cp-char-count--${tone}`}>{count}/{max}</span>;
}

/** Validated helper line under a `TextInput` (green when the tag is free). */
export function FieldHint({ status, children }) {
  if (!children) return null;
  const tone = status === "success" ? "success" : status === "error" ? "error" : "muted";
  return (
    <span className={`cp-hint cp-hint--${tone}`}>
      {status === "success" && (
        <Icon name="CircleCheck" size={ICON_SIZES.XS} color="#00a63e" stroke="#00a63e" />
      )}
      {children}
    </span>
  );
}

/** Initial-letter avatar used by the member lists and review grid. */
export function MemberAvatar({ name = "", src, color, size = 40, ring = false }) {
  const initials = name
    ? name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <span
      className={`cp-avatar ${ring ? "cp-avatar--ring" : ""}`}
      style={{
        width: size,
        height: size,
        backgroundColor: src ? "transparent" : color || "#103ca4",
      }}
    >
      {src ? <img src={src} alt={name} /> : initials}
    </span>
  );
}

/** Small removable token used for skills and positions. */
export function Token({ children, onRemove, removeLabel = "Remove" }) {
  return (
    <span className="cp-token">
      {children}
      {onRemove && (
        <button type="button" className="cp-token__x" onClick={onRemove} aria-label={removeLabel}>
          <Icon name="X" size={ICON_SIZES["2XS"]} color="#667085" stroke="#667085" strokeWidth={2.2} />
        </button>
      )}
    </span>
  );
}

/**
 * Read-only 5-star rating. Fills `value` stars and renders the remaining as
 * outlines, matching the Figma party cards / review summaries.
 */
export function Stars({ value = 0, size = ICON_SIZES.SM, className = "" }) {
  return (
    <span className={`cp-stars ${className}`.trim()} role="img" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon
          key={n}
          name="Star"
          size={size}
          color={n <= Math.round(value) ? "#f59e0b" : "#d0d5dd"}
          stroke={n <= Math.round(value) ? "#f59e0b" : "#d0d5dd"}
          fill={n <= Math.round(value) ? "#f59e0b" : "none"}
        />
      ))}
    </span>
  );
}

/**
 * Page-level scroll container. `.main-workspace` is `overflow: hidden`, so each
 * party page owns its own scroller instead of scrolling the shared workspace.
 * Scrollbar is hidden but the region stays keyboard/wheel scrollable.
 */
export function ScrollArea({ children, className = "", ...rest }) {
  return (
    <div className={`party-scroll ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

/** Back link used at the top of every Create Party / Join Party screen. */
export function BackLink({ label, onClick }) {
  return (
    <button type="button" className="party-back" onClick={onClick}>
      <Icon name="ArrowLeft" size={ICON_SIZES.SM} color="#103ca4" stroke="#103ca4" />
      {label}
    </button>
  );
}