// 03-11-2026
// Reusable content blocks (sections, steps, tips, checklists) used by guide articles.
import { useState } from "react";
import Icon from "@/Components/icons/Icon";

export function CheckBadge() {
  return (
    <span className="fg-check-badge" aria-hidden="true">
      <Icon name="Check" size={8} color="#ffffff" strokeWidth={3.5} />
    </span>
  );
}

function CheckLine({ children }) {
  return (
    <li className="fg-check-line">
      <Icon name="Check" size={12} color="#2563eb" strokeWidth={2.6} />
      <span>{children}</span>
    </li>
  );
}

export function GuideSection({ id, title, subtitle, boxed = false, children }) {
  const [open, setOpen] = useState(true);

  return (
    <section id={`fg-section-${id}`} className={`fg-section${boxed ? " is-boxed" : ""}`}>
      <div className="fg-section-head">
        <span className="fg-section-num">{id}</span>
        <div className="fg-section-heading">
          <h2 className="fg-section-title">{title}</h2>
          {subtitle && <p className="fg-section-sub">{subtitle}</p>}
        </div>
        {boxed && (
          <button
            type="button"
            className={`fg-section-toggle${open ? " is-open" : ""}`}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Collapse section" : "Expand section"}
          >
            <Icon name="ChevronDown" size={15} color="#94a3b8" />
          </button>
        )}
      </div>
      {open && <div className="fg-section-body">{children}</div>}
    </section>
  );
}

export function OverviewBox({ label, items }) {
  return (
    <div className="fg-soft fg-overview">
      {label && <p className="fg-overview-label">{label}</p>}
      <div className="fg-overview-grid">
        {items.map((item) => (
          <div className="fg-overview-item" key={item.title}>
            <CheckBadge />
            <div>
              <strong>{item.title}</strong>
              {item.text && <p>{item.text}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NumberedList({ items }) {
  return (
    <ol className="fg-number-list">
      {items.map((item, index) => (
        <li key={item.title}>
          <span className="fg-number">{index + 1}</span>
          <div>
            <strong>{item.title}</strong>
            {item.text && <p>{item.text}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function StepsFlow({ steps }) {
  return (
    <div className={`fg-steps${steps.length === 3 ? " is-three" : ""}`}>
      {steps.map((step, index) => (
        <div className="fg-step" key={step.title}>
          <span className="fg-step-num">{index + 1}</span>
          <strong className="fg-step-title">{step.title}</strong>
          {step.text && <p className="fg-step-text">{step.text}</p>}
        </div>
      ))}
    </div>
  );
}

export function ChecklistPanel({ title, columns }) {
  return (
    <div className="fg-soft fg-panel">
      {title && <strong className="fg-panel-title">{title}</strong>}
      <div
        className="fg-panel-cols"
        style={{ "--fg-columns": columns.length }}
      >
        {columns.map((column, index) => (
          <ul key={index}>
            {column.map((item) => (
              <CheckLine key={item}>{item}</CheckLine>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function CheckTiles({ items }) {
  return (
    <div className={`fg-tiles${items.length === 3 ? " is-three" : ""}`}>
      {items.map((item) => (
        <div className="fg-tile" key={item}>
          <CheckBadge />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function TipsPanel({ columns }) {
  return (
    <div className="fg-soft fg-tips">
      {columns.map((column, index) => (
        <ul key={index}>
          {column.map((item) => (
            <CheckLine key={item}>{item}</CheckLine>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function MockCard({ children, className = "" }) {
  return (
    <div className={`fg-mock${className ? ` ${className}` : ""}`}>
      <span className="fg-window-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {children}
    </div>
  );
}
