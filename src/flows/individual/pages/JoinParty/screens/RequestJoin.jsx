// [TechGuild Update: 13-10-2026] Join Party — Step 3 request form (Figma "3", node 197:6850)
import React from "react";
import { Cards, TextInput, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { PartyTextarea } from "@/flows/shared/party/PartyUi";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import { showSnackbar } from "@/store";
import { useDispatch } from "react-redux";
import "./requestjoin.css";

const { REQUEST, MOCK } = APP_STRINGS.JOIN_PARTY;
const INTRO_MAX = 500;

const URL_FIELDS = [
  { key: "portfolio", label: REQUEST.LINKS.PORTFOLIO, placeholder: REQUEST.LINK_PLACEHOLDERS.PORTFOLIO },
  { key: "behance", label: REQUEST.LINKS.BEHANCE, placeholder: REQUEST.LINK_PLACEHOLDERS.BEHANCE },
  { key: "github", label: REQUEST.LINKS.GITHUB, placeholder: REQUEST.LINK_PLACEHOLDERS.GITHUB },
  { key: "linkedin", label: REQUEST.LINKS.LINKEDIN, placeholder: REQUEST.LINK_PLACEHOLDERS.LINKEDIN },
];

export default function RequestJoin({ form, update, errors, onBack, onSubmit }) {
  const dispatch = useDispatch();

  const applySuggestion = (text) => {
    const prefix = form.intro.trim() ? `${form.intro.trim()}\n` : "";
    update("intro", `${prefix}${text}: `);
    dispatch(showSnackbar({ message: "Talking point added.", type: "success" }));
  };

  return (
    <>
      <Cards variant="base" className="jq" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="26px">
        <SectionHead n={1} title={REQUEST.STEP_ROLE} sub={REQUEST.STEP_ROLE_SUB} />
        <div className="jq__roles" role="radiogroup" aria-label={REQUEST.STEP_ROLE}>
          {REQUEST.ROLES.map((r) => {
            const selected = form.role === r.key;
            const pct = r.match;
            return (
              <button
                key={r.key}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`jq__role ${selected ? "is-selected" : ""}`}
                onClick={() => update("role", selected ? null : r.key)}
              >
                <span className={`jq__radio ${selected ? "is-on" : ""}`} />
                <span className="jq__role-body">
                  <span className="jq__role-title">{r.title}</span>
                  <span className="jq__role-chips">
                    {r.skills.map((s) => (
                      <span
                        key={s}
                        className={`jq__chip ${MOCK.MY_SKILLS.includes(s) ? "jq__chip--have" : ""}`}
                      >
                        {s}
                      </span>
                    ))}
                  </span>
                </span>
                <span
                  className={`jq__match ${pct >= 90 ? "jq__match--high" : pct >= 80 ? "jq__match--mid" : "jq__match--low"}`}
                >
                  {REQUEST.ROLE_MATCH.replace("{n}", pct)}
                </span>
              </button>
            );
          })}
        </div>
        <p className="jq__legend">
          <Icon name="CircleQuestionMark" size={ICON_SIZES.MD} color="#64748b" stroke="#64748b" />
          {REQUEST.CHIP_LEGEND}
        </p>
        {errors.role && <span className="text-input-error-msg">{errors.role}</span>}
      </Cards>

      <Cards variant="base" className="jq" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="26px">
        <SectionHead n={2} title={REQUEST.STEP_INTRO} sub={REQUEST.STEP_INTRO_SUB} />
        <PartyTextarea
          name="intro"
          required
          rows={6}
          max={INTRO_MAX}
          placeholder={REQUEST.INTRO_PLACEHOLDER}
          value={form.intro}
          onChange={(e) => update("intro", e.target.value)}
          error={errors.intro}
        />
        <div className="jq__label">{REQUEST.SUGGESTED_LABEL}</div>
        <div className="jq__suggestions">
          {REQUEST.SUGGESTED.map((s) => (
            <button key={s} type="button" className="jq__suggestion" onClick={() => applySuggestion(s)}>
              <Icon name="Plus" size={ICON_SIZES.XS} color="#103ca4" stroke="#103ca4" strokeWidth={2.4} />
              {s}
            </button>
          ))}
        </div>
      </Cards>

      <Cards variant="base" className="jq" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="26px">
        <SectionHead
          n={3}
          title={REQUEST.STEP_PORTFOLIO}
          sub={REQUEST.STEP_PORTFOLIO_SUB}
          tag={REQUEST.OPTIONAL}
        />
        <div className="jq__links">
          {URL_FIELDS.map((f) => (
            <TextInput
              key={f.key}
              name={f.key}
              label={f.label}
              placeholder={f.placeholder}
              value={form.links[f.key]}
              onChange={(e) => update("links", { ...form.links, [f.key]: e.target.value })}
              error={errors[f.key]}
            />
          ))}
        </div>
      </Cards>

      <Cards variant="base" className="jq" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="26px">
        <SectionHead n={4} title={REQUEST.STEP_AVAILABILITY} sub={REQUEST.STEP_AVAILABILITY_SUB} />
        <div className="jq__availability" role="radiogroup" aria-label={REQUEST.STEP_AVAILABILITY}>
          {REQUEST.AVAILABILITY_OPTIONS.map((o) => {
            const selected = form.availability === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`jq__avail ${selected ? "is-selected" : ""}`}
                onClick={() => update("availability", selected ? null : o.id)}
              >
                <span className="jq__avail-label">{o.label}</span>
                <span className="jq__avail-hours">{o.hours}</span>
              </button>
            );
          })}
        </div>
        <div className="jq__startdate">
          <TextInput
            name="startDate"
            type="date"
            label={REQUEST.START_DATE_LABEL}
            value={form.startDate}
            onChange={(e) => update("startDate", e.target.value)}
          />
        </div>
      </Cards>

      <Cards variant="base" className="jq jq--footer" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="22px">
        <div className="jq__warn">
          <Icon name="CircleQuestionMark" size={ICON_SIZES.LG} color="#b45309" stroke="#b45309" />
          <p>{REQUEST.SUBMIT_WARNING}</p>
        </div>
        <div className="jq__actions">
          <SecondaryButton
            className="jq__back"
            text={REQUEST.BACK}
            icon={<Icon name="ArrowLeft" size={ICON_SIZES.SM} color="#334155" stroke="#334155" />}
            iconPosition="left"
            onClick={onBack}
          />
          <div className="jq__submit-wrap">
            <PrimaryButton
              className="jq__submit"
              text={REQUEST.SUBMIT}
              icon={<Icon name="ArrowRight" size={ICON_SIZES.SM} color="#ffffff" stroke="#ffffff" />}
              iconPosition="right"
              onClick={onSubmit}
            />
            <span className="jq__locked">
              <Icon name="Lock" size={ICON_SIZES["2XS"]} color="#94a3b8" stroke="#94a3b8" />
              {REQUEST.LOCKED_NOTE}
            </span>
          </div>
        </div>
      </Cards>
    </>
  );
}

/** Numbered section header used by each card in this form. */
function SectionHead({ n, title, sub, tag }) {
  return (
    <div className="jq__head">
      <span className="jq__num">{n}</span>
      <div>
        <div className="jq__head-title">
          {title}
          {tag && <span className="jq__tag">{tag}</span>}
        </div>
        <p className="jq__head-sub">{sub}</p>
      </div>
    </div>
  );
}
