// [TechGuild Update: 13-10-2026] Create Party wizard — Step 1 "Party Details" (Figma "Party 1", node 193:5035)
import React, { useRef, useState } from "react";
import { Cards, TextInput } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { PartyTextarea, charCounter, FieldHint } from "@/flows/shared/party/PartyUi";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import "./partydetails.css";

const { DETAILS, CATEGORIES, LIMITS } = APP_STRINGS.CREATE_PARTY;
const TAG_TAKEN = ["admin", "techguild", "support", "root", "verified"];

/** Local mock of the availability check — no backend call yet. */
function tagAvailability(tag) {
  const clean = String(tag || "").replace(/^@/, "").trim().toLowerCase();
  if (!clean) return "idle";
  return TAG_TAKEN.includes(clean) ? "error" : "success";
}

export default function PartyDetailsStep({ draft, update, errors }) {
  const logoInputRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoName, setLogoName] = useState(null);
  const [logoError, setLogoError] = useState("");

  const tagState = tagAvailability(draft.tag);

  const handleLogo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoError("");
    if (file.size > LIMITS.LOGO_MAX_MB * 1024 * 1024) {
      setLogoError(`Maximum file size: ${LIMITS.LOGO_MAX_MB}MB`);
      setLogoPreview(null);
      return;
    }
    setLogoName(file.name);
    setLogoPreview(URL.createObjectURL(file));
    update("logo", file);
  };

  return (
    <div className="cp-fields">
      <div className="cp-fields__row cp-fields__row--2">
        <div className="cp-has-counter">
          <TextInput
            label={DETAILS.NAME_LABEL}
            name="party-name"
            required
            placeholder={DETAILS.NAME_PLACEHOLDER}
            value={draft.name}
            onChange={(e) => update("name", e.target.value)}
            maxLength={LIMITS.NAME_MAX}
            error={errors.name}
            rightIcon={charCounter(draft.name, LIMITS.NAME_MAX)}
          />
          <FieldHint>{errors.name || DETAILS.NAME_HINT}</FieldHint>
        </div>

        <div className="cp-has-counter">
          <TextInput
            label={DETAILS.TAG_LABEL}
            name="party-tag"
            required
            placeholder={DETAILS.TAG_PLACEHOLDER}
            value={draft.tag}
            onChange={(e) => update("tag", e.target.value)}
            maxLength={LIMITS.TAG_MAX}
            error={errors.tag || (tagState === "error" ? DETAILS.TAG_TAKEN : "")}
            rightIcon={charCounter(draft.tag, LIMITS.TAG_MAX)}
          />
          <FieldHint
            status={tagState === "error" ? "error" : tagState === "success" ? "success" : undefined}
          >
            {tagState === "error"
              ? DETAILS.TAG_TAKEN
              : tagState === "success"
                ? DETAILS.TAG_AVAILABLE
                : DETAILS.TAG_HINT}
          </FieldHint>
        </div>
      </div>

      <PartyTextarea
        label={DETAILS.DESCRIPTION_LABEL}
        name="party-description"
        required
        rows={3}
        max={LIMITS.DESCRIPTION_MAX}
        placeholder={DETAILS.DESCRIPTION_PLACEHOLDER}
        value={draft.description}
        onChange={(e) => update("description", e.target.value)}
        hint={DETAILS.DESCRIPTION_HINT}
        error={errors.description}
      />

      <div className="cp-fieldset">
        <div className="cp-fieldset__label">
          {DETAILS.CATEGORY_LABEL}
          <span className="required-star">*</span>
        </div>
        <div className="cp-categories" role="group" aria-label={DETAILS.CATEGORY_LABEL}>
          {CATEGORIES.map((c) => {
            const selected = draft.categories.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                role="checkbox"
                aria-checked={selected}
                className={`cp-chip ${selected ? "is-selected" : ""}`}
                onClick={() =>
                  update("categories", (prev) =>
                    prev.includes(c.id) ? prev.filter((x) => x !== c.id) : [...prev, c.id],
                  )
                }
              >
                <Icon
                  name={c.icon}
                  size={ICON_SIZES.MD}
                  color={selected ? "#103ca4" : "#667085"}
                  stroke={selected ? "#103ca4" : "#667085"}
                />
                {c.label}
              </button>
            );
          })}
        </div>
        <FieldHint status={errors.category ? "error" : undefined}>
          {errors.category || DETAILS.CATEGORY_HINT}
        </FieldHint>
      </div>

      <div className="cp-fieldset">
        <div className="cp-fieldset__label">{DETAILS.LOGO_LABEL}</div>
        <div className="cp-logo-row">
          <button
            type="button"
            className="cp-dropzone"
            onClick={() => logoInputRef.current?.click()}
            aria-label={DETAILS.LOGO_UPLOAD}
          >
            {logoPreview ? (
              <img src={logoPreview} alt="Party logo preview" className="cp-dropzone__preview" />
            ) : (
              <>
                <span className="cp-dropzone__icon">
                  <Icon name="Upload" size={ICON_SIZES.LG} color="#667085" stroke="#667085" />
                </span>
                <span className="cp-dropzone__title">
                  {logoName || DETAILS.LOGO_UPLOAD}
                </span>
                <span className="cp-dropzone__hint">{DETAILS.LOGO_FORMATS}</span>
              </>
            )}
          </button>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            onChange={handleLogo}
            className="cp-visually-hidden"
          />

          <Cards
            variant="base"
            className="cp-guidelines"
            radius="md"
            bg="rgba(255,255,255,0.6)"
            border="1px solid #e7edf8"
            padding="20px"
          >
            <p className="cp-guidelines__title">{DETAILS.LOGO_GUIDELINES_TITLE}</p>
            <ul className="cp-guidelines__list">
              {DETAILS.LOGO_GUIDELINES.map((g) => (
                <li key={g}>
                  <Icon name="Check" size={ICON_SIZES.XS} color="#00a63e" stroke="#00a63e" strokeWidth={2.5} />
                  {g}
                </li>
              ))}
            </ul>
          </Cards>
        </div>
        {logoError && <span className="text-input-error-msg">{logoError}</span>}
      </div>
    </div>
  );
}
