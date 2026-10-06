import { useEffect, useRef, useState } from "react";
import { Popup, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { APP_STRINGS } from "@/constants/string";
import "./createpost.css";

const C = APP_STRINGS.GUILD_HALL.CREATE_MODAL;

const count = (n) => n.toLocaleString("en-US");

const safeFormat = (id) => (id && C.FORMS[id] ? id : null);

const buildDefaults = (formatId) => {
  const form = C.FORMS[formatId];
  if (!form) return {};
  const values = {};
  form.fields.forEach((field) => {
    switch (field.type) {
      case "options":
        values[field.key] = (field.placeholders || ["Option 1", "Option 2"]).map(() => "");
        break;
      case "duration":
        values[field.key] = field.defaultValue;
        break;
      case "facts":
        values[field.key] = (field.placeholders || []).map(() => "");
        break;
      case "tags":
        values[field.key] = [];
        break;
      default:
        values[field.key] = "";
    }
  });
  return values;
};

export default function CreatePostModal({ open = false, onClose = () => {}, initialFormat = null }) {
  const [step, setStep] = useState(() => (safeFormat(initialFormat) ? 2 : 1));
  const [formatId, setFormatId] = useState(() => safeFormat(initialFormat));
  const [values, setValues] = useState(() => {
    const id = safeFormat(initialFormat);
    return id ? { [id]: buildDefaults(id) } : {};
  });
  const [tagDraft, setTagDraft] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const id = safeFormat(initialFormat);
    setStep(id ? 2 : 1);
    setFormatId(id);
    setValues(id ? { [id]: buildDefaults(id) } : {});
    setTagDraft("");
  }, [open, initialFormat]);

  const format = C.FORMATS.find((item) => item.id === formatId) || null;
  const form = formatId ? C.FORMS[formatId] : null;
  const formValues = formatId ? values[formatId] || buildDefaults(formatId) : {};

  const setValue = (key, value) => {
    setValues((prev) => ({
      ...prev,
      [formatId]: { ...(prev[formatId] || buildDefaults(formatId)), [key]: value },
    }));
  };

  const isFormValid = () => {
    if (!form) return false;
    return form.fields.every((field) => {
      const value = formValues[field.key];
      if (field.type === "options") {
        return (value || []).filter((option) => option.trim()).length >= field.minFilled;
      }
      if (field.type === "text" || field.type === "textarea") {
        if (!field.required) return true;
        return Boolean((value || "").trim());
      }
      return true;
    });
  };

  const handleContinue = () => {
    if (!formatId) return;
    setValues((prev) => (prev[formatId] ? prev : { ...prev, [formatId]: buildDefaults(formatId) }));
    setTagDraft("");
    setStep(2);
  };

  const handleTagKeyDown = (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const tag = event.currentTarget.value.trim();
    const field = form.fields.find((item) => item.type === "tags");
    if (!tag || !field) return;
    const tags = formValues[field.key] || [];
    if (tags.length >= field.max || tags.includes(tag)) return;
    setValue(field.key, [...tags, tag]);
    setTagDraft("");
  };

  const removeTag = (field, tag) => {
    setValue(
      field.key,
      (formValues[field.key] || []).filter((item) => item !== tag)
    );
  };

  const handleFiles = (field, files) => {
    const file = files && files[0];
    if (file) setValue(field.key, file.name);
  };

  const renderField = (field) => {
    const value = formValues[field.key];

    const labelRow = (
      <span className="cp-label">
        {field.label}
        {field.note && <span className="cp-note">{field.note}</span>}
      </span>
    );

    const counter =
      field.max && (field.type === "text" || field.type === "textarea") ? (
        <span className="cp-count">
          {count((value || "").length)} / {count(field.max)}
        </span>
      ) : null;

    switch (field.type) {
      case "text":
        return (
          <div className="cp-field" key={field.key}>
            {labelRow}
            <input
              className="cp-input"
              type="text"
              placeholder={field.placeholder}
              value={value || ""}
              maxLength={field.max}
              onChange={(event) => setValue(field.key, event.target.value)}
            />
            {counter}
          </div>
        );

      case "textarea":
        return (
          <div className="cp-field" key={field.key}>
            {labelRow}
            <textarea
              className="cp-area"
              placeholder={field.placeholder}
              value={value || ""}
              maxLength={field.max}
              onChange={(event) => setValue(field.key, event.target.value)}
            />
            {counter}
          </div>
        );

      case "tags": {
        const tags = value || [];
        return (
          <div className="cp-field" key={field.key}>
            {labelRow}
            <input
              className="cp-input"
              type="text"
              placeholder={field.placeholder}
              value={tagDraft}
              onChange={(event) => setTagDraft(event.target.value)}
              onKeyDown={handleTagKeyDown}
            />
            {tags.length > 0 && (
              <div className="cp-tags">
                {tags.map((tag) => (
                  <span className="cp-tag" key={tag}>
                    {tag}
                    <button
                      type="button"
                      className="cp-tag-x"
                      aria-label={`Remove ${tag}`}
                      onClick={() => removeTag(field, tag)}
                    >
                      <Icon name="X" size={12} strokeWidth={2.2} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      }

      case "facts":
        return (
          <div className="cp-field" key={field.key}>
            {labelRow}
            <div className="cp-facts">
              {(field.placeholders || []).map((placeholder, index) => (
                <input
                  className="cp-input"
                  type="text"
                  placeholder={placeholder}
                  value={(value || [])[index] || ""}
                  onChange={(event) => {
                    const next = [...(value || [])];
                    next[index] = event.target.value;
                    setValue(field.key, next);
                  }}
                  key={placeholder}
                />
              ))}
            </div>
          </div>
        );

      case "options": {
        const options = value || [];
        return (
          <div className="cp-field" key={field.key}>
            {labelRow}
            <div className="cp-options">
              {options.map((option, index) => (
                <input
                  className="cp-input"
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  maxLength={80}
                  onChange={(event) => {
                    const next = [...options];
                    next[index] = event.target.value;
                    setValue(field.key, next);
                  }}
                  key={`option-${index}`}
                />
              ))}
              {options.length < field.max && (
                <button
                  type="button"
                  className="cp-add"
                  onClick={() => setValue(field.key, [...options, ""])}
                >
                  <Icon name="Plus" size={15} strokeWidth={2.2} />
                  {C.ADD_OPTION}
                </button>
              )}
            </div>
          </div>
        );
      }

      case "duration":
        return (
          <div className="cp-field" key={field.key}>
            {labelRow}
            <div className="cp-duration" role="group" aria-label={field.label}>
              {field.options.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`cp-seg ${value === option ? "is-active" : ""}`}
                  aria-pressed={value === option}
                  onClick={() => setValue(field.key, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case "upload":
        return (
          <div className="cp-field" key={field.key}>
            {labelRow}
            <button
              type="button"
              className="cp-upload"
              onClick={() => fileRef.current?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                handleFiles(field, event.dataTransfer.files);
              }}
            >
              <Icon name="Image" size={26} color="#103ca4" strokeWidth={1.7} />
              <span className="cp-upload-cta">{field.placeholder}</span>
              <span className="cp-upload-meta">{field.meta}</span>
            </button>
            {value && (
              <div className="cp-tags">
                <span className="cp-tag">
                  {value}
                  <button
                    type="button"
                    className="cp-tag-x"
                    aria-label={`Remove ${value}`}
                    onClick={() => setValue(field.key, "")}
                  >
                    <Icon name="X" size={12} strokeWidth={2.2} />
                  </button>
                </span>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept={field.accept}
              hidden
              onChange={(event) => handleFiles(field, event.target.files)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const renderStepOne = () => (
    <div className="cp-body">
      <button type="button" className="cp-x" aria-label={C.CLOSE} onClick={onClose}>
        <Icon name="X" size={20} strokeWidth={1.8} />
      </button>
      <div className="cp-grid">
        {C.FORMATS.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`cp-option ${formatId === item.id ? "is-selected" : ""}`}
            aria-pressed={formatId === item.id}
            onClick={() => setFormatId(item.id)}
          >
            <span className="cp-option-tile" style={{ backgroundColor: item.tint }}>
              <Icon name={item.icon} size={18} color={item.color} strokeWidth={1.8} />
            </span>
            <span className="cp-option-text">
              <span className="cp-option-title">{item.label}</span>
              <span className="cp-option-desc">{item.desc}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="cp-body">
      <button type="button" className="cp-x" aria-label={C.CLOSE} onClick={onClose}>
        <Icon name="X" size={20} strokeWidth={1.8} />
      </button>
      <div className="cp-chip">
        <span className="cp-chip-tile" style={{ backgroundColor: format.tint }}>
          <Icon name={format.icon} size={18} color={format.color} strokeWidth={1.8} />
        </span>
        <span className="cp-chip-text">
          <span className="cp-chip-name">{format.label}</span>
          <span className="cp-chip-desc">{format.desc}</span>
        </span>
        <button type="button" className="cp-change" onClick={() => setStep(1)}>
          {C.CHANGE}
        </button>
      </div>
      <div className="cp-fields">{form.fields.map(renderField)}</div>
    </div>
  );

  const valid = step === 2 && isFormValid();

  const footer = (
    <>
      <span className="cp-hint">
        {step === 1 ? C.STEP_ONE_HINT : !valid ? form?.hint : ""}
      </span>
      <div className="cp-actions">
        {step === 2 && (
          <SecondaryButton text={C.BACK} className="cp-btn cp-btn-back" onClick={() => setStep(1)} />
        )}
        {step === 1 ? (
          <PrimaryButton
            text={C.CONTINUE}
            className="cp-btn"
            disabled={!formatId}
            onClick={handleContinue}
          />
        ) : (
          <PrimaryButton
            text={C.PUBLISH}
            className="cp-btn"
            disabled={!valid}
            onClick={onClose}
          />
        )}
      </div>
    </>
  );

  return (
    <Popup
      open={open}
      onClose={onClose}
      title={C.TITLE}
      subtitle={step === 1 ? C.STEP_ONE_SUBTITLE : C.STEP_TWO_SUBTITLE}
      footer={footer}
      closeOnBackdrop={false}
      cardClassName="cp-modal"
      headerClassName="cp-header"
      titleClassName="cp-title"
      subtitleClassName="cp-subtitle"
      footerClassName="cp-footer"
      style={{ "--popup-width": step === 1 ? "880px" : "760px" }}
    >
      {step === 1 ? renderStepOne() : renderStepTwo()}
    </Popup>
  );
}
