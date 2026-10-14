// [TechGuild Update: 13-10-2026] Create Party wizard — Step 3 "Skills & Expertise" (Figma "Party 3", node 193:4571)
import React, { useMemo, useState } from "react";
import { Cards, TextInput, PrimaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { Token } from "@/flows/shared/party/PartyUi";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import "./skills.css";

const { SKILLS, LIMITS } = APP_STRINGS.CREATE_PARTY;

const SUGGESTIONS = [
  { id: "web", label: "Web Development", icon: "Globe" },
  { id: "mobile", label: "Mobile Development", icon: "Smartphone" },
  { id: "uiux", label: "UI/UX Design", icon: "Palette" },
  { id: "devops", label: "DevOps", icon: "Layers" },
  { id: "cloud", label: "Cloud Computing", icon: "Monitor" },
  { id: "ai", label: "AI / Machine Learning", icon: "TriangleAlert" },
  { id: "data", label: "Data Science", icon: "BarChart3" },
  { id: "cyber", label: "Cybersecurity", icon: "Shield" },
  { id: "blockchain", label: "Blockchain", icon: "Hash" },
  { id: "content", label: "Content Writing", icon: "NotebookText" },
  { id: "video", label: "Video Production", icon: "TvMinimal" },
  { id: "growth", label: "Growth Marketing", icon: "TrendingUp" },
];

export default function SkillsStep({ draft, update }) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Order is derived from SUGGESTIONS only. Selected skills are rendered in the
  // block above, so prepending them here would reshuffle the grid on every click
  // and make rapid selection unreliable.
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SUGGESTIONS;
    return SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(q));
  }, [query]);

  const visible = showAll ? matches : matches.slice(0, 9);
  const atMax = draft.skills.length >= LIMITS.SKILLS_MAX;

  const addSkill = (label) => {
    update("skills", (prev) =>
      prev.length >= LIMITS.SKILLS_MAX || prev.includes(label) ? prev : [...prev, label],
    );
    setQuery("");
  };

  const removeSkill = (label) =>
    update("skills", (prev) => prev.filter((s) => s !== label));

  const addPosition = () => {
    update("positions", [...draft.positions, { id: `p${Date.now()}`, title: "New Position", tags: [] }]);
  };

  const removePosition = (id) =>
    update(
      "positions",
      draft.positions.filter((p) => p.id !== id),
    );

  return (
    <div className="cp-fields">
      {/* ---------------- Selected skills ---------------- */}
      {draft.skills.length > 0 && (
        <div className="cp-selected">
          <div className="cp-selected__head">
            <span className="cp-selected__count">
              {draft.skills.length} / {LIMITS.SKILLS_MAX} skills selected
            </span>
            {atMax && (
              <span className="cp-selected__max">{SKILLS.MAX_REACHED.replace("{n}", LIMITS.SKILLS_MAX)}</span>
            )}
          </div>
          <div className="cp-selected__list">
            {draft.skills.map((s) => (
              <Token key={s} onRemove={() => removeSkill(s)} removeLabel={`Remove ${s}`}>
                {s}
              </Token>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- Search ---------------- */}
      <div className="cp-fieldset">
        <div className="cp-fieldset__label">{SKILLS.ADD_SKILLS_LABEL}</div>
        <TextInput
          name="skill-search"
          placeholder={SKILLS.SEARCH_PLACEHOLDER}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Icon name="Search" size={ICON_SIZES.MD} color="#9ca3af" stroke="#9ca3af" />}
          containerClassName="cp-skill-search"
        />
        <span className="cp-hint">{SKILLS.ADD_SKILLS_HINT.replace("{n}", LIMITS.SKILLS_MAX)}</span>
      </div>

      {/* ---------------- Suggestions ---------------- */}
      <div className="cp-fieldset">
        <div className="cp-fieldset__label">{SKILLS.SUGGESTIONS}</div>
        <div className="cp-suggestions">
          {visible.map((s) => {
            const added = draft.skills.includes(s.label);
            return (
              <button
                key={s.label}
                type="button"
                className={`cp-suggestion ${added ? "is-added" : ""}`}
                onClick={() => (added ? removeSkill(s.label) : addSkill(s.label))}
                disabled={!added && atMax}
              >
                <Icon
                  name={s.icon}
                  size={ICON_SIZES.MD}
                  color={added ? "#103ca4" : "#667085"}
                  stroke={added ? "#103ca4" : "#667085"}
                />
                <span className="cp-suggestion__label">{s.label}</span>
                <Icon
                  name={added ? "Check" : "Plus"}
                  size={ICON_SIZES.SM}
                  color={added ? "#103ca4" : "#9ca3af"}
                  stroke={added ? "#103ca4" : "#9ca3af"}
                  strokeWidth={2.2}
                />
              </button>
            );
          })}
        </div>
        {matches.length > 9 && (
          <button type="button" className="cp-linkbtn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show fewer skills" : SKILLS.VIEW_MORE_SKILLS}
            <Icon
              name="ChevronDown"
              size={ICON_SIZES.SM}
              color="#103ca4"
              stroke="#103ca4"
              style={{ transform: showAll ? "rotate(180deg)" : "none" }}
            />
          </button>
        )}
      </div>

      {/* ---------------- Positions ---------------- */}
      <div className="cp-fieldset">
        <div className="cp-positions__head">
          <div>
            <div className="cp-fieldset__label">{SKILLS.POSITIONS_LABEL}</div>
            <span className="cp-hint">{SKILLS.POSITIONS_HINT}</span>
          </div>
          <PrimaryButton
            className="cp-addpos"
            text={SKILLS.ADD_POSITION}
            icon={<Icon name="Plus" size={ICON_SIZES.SM} color="#ffffff" stroke="#ffffff" />}
            iconPosition="left"
            onClick={addPosition}
          />
        </div>

        {draft.positions.length === 0 ? (
          <p className="cp-positions__empty">No positions added yet.</p>
        ) : (
          <div className="cp-positions">
            {draft.positions.map((p) => (
              <Cards
                key={p.id}
                variant="base"
                className="cp-position"
                radius="md"
                bg="rgba(255,255,255,0.6)"
                border="1px solid #e7edf8"
                padding="18px"
              >
                <div className="cp-position__head">
                  <p className="cp-position__title">{p.title}</p>
                  <button
                    type="button"
                    className="cp-iconbtn"
                    onClick={() => removePosition(p.id)}
                    aria-label={SKILLS.REMOVE_POSITION}
                  >
                    <Icon name="Trash" size={ICON_SIZES.SM} color="#9ca3af" stroke="#9ca3af" />
                  </button>
                </div>
                <div className="cp-position__tags">
                  {p.tags.length === 0 ? (
                    <span className="cp-position__none">No skills tagged</span>
                  ) : (
                    p.tags.map((t) => <Token key={t}>{t}</Token>)
                  )}
                </div>
              </Cards>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- Why box ---------------- */}
      <div className="cp-why">
        <Icon name="CircleQuestionMark" size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />
        <div>
          <p className="cp-why__title">{SKILLS.WHY_TITLE}</p>
          <p className="cp-why__body">{SKILLS.WHY_BODY}</p>
        </div>
      </div>
    </div>
  );
}
