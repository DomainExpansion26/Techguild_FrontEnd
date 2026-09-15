import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "@/Components/icons";
import "./Popup.css";

const ANIMATION_DURATION = 200;

const Popup = ({
  open = false,
  onClose = () => {},
  children,
  title,
  subtitle,
  icon,
  footer,
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEsc = true,
  lockScroll = true,
  overlayClassName = "",
  cardClassName = "",
  closeClassName = "",
  iconClassName = "",
  headerClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  bodyClassName = "",
  footerClassName = "",
  style,
}) => {
  const cardRef = useRef(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(open);

  // Keep the popup mounted while the exit animation finishes.
  if (open && !mounted) setMounted(true);
  const closing = mounted && !open;

  useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => setMounted(false), ANIMATION_DURATION);
    return () => clearTimeout(timer);
  }, [closing]);

  useEffect(() => {
    if (!open || !lockScroll) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open, lockScroll]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    return () => {
      if (previouslyFocused?.focus) previouslyFocused.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    cardRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event) => {
      if (closeOnEsc && event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEsc, onClose]);

  const handleOverlayClick = (event) => {
    if (closing || !closeOnBackdrop) return;
    if (event.target !== event.currentTarget) return;
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`popup-overlay ${closing ? "popup-overlay--closing" : ""} ${overlayClassName}`.trim()}
      onClick={handleOverlayClick}
    >
      <div className="popup-wrap">
        {showCloseButton && (
          <button
            type="button"
            aria-label="Close popup"
            onClick={onClose}
            className={`popup-close ${closeClassName}`.trim()}
          >
            <X width={22} height={22} />
          </button>
        )}

        <div
          ref={cardRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          className={`popup-card ${cardClassName}`.trim()}
          style={style}
        >
          {icon && <div className={`popup-icon ${iconClassName}`.trim()}>{icon}</div>}

          {(title || subtitle) && (
            <div className={`popup-header ${headerClassName}`.trim()}>
              {title && (
                <h2 id={titleId} className={`popup-title ${titleClassName}`.trim()}>
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className={`popup-subtitle ${subtitleClassName}`.trim()}>{subtitle}</p>
              )}
            </div>
          )}

          <div className={`popup-body ${bodyClassName}`.trim()}>{children}</div>

          {footer && <div className={`popup-footer ${footerClassName}`.trim()}>{footer}</div>}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Popup;