// [TechGuild Update: 14-10-2026] Create Party — Step 3 "Add Positions" (Figma
// "step-3" 223:117 + "popup" 223:596). Replaces the retired party-level skill
// picker: skills now live on each position card. The step id stays "skills" so
// the URL and the review step's edit link are unaffected.
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Cards, TextInput, PrimaryButton, SecondaryButton, Popup } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import { showSnackbar } from "@/store";
import "./positions.css";

const P = APP_STRINGS.CREATE_PARTY.POSITIONS;

export default function PositionsStep({ draft, update }) {
  const dispatch = useDispatch();

  // null = closed; { mode: "add" } = new position; { mode: "edit", id } = change one.
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: "", skills: [] });
  const [skillInput, setSkillInput] = useState("");

  const setPositions = (next) => update("positions", next);

  /**
   * The panel head + footer live in the wizard shell, so this step renders only
   * the position list. Draft shape: { id, name, description, skills[] } — the
   * Figma popup has no description field but the field survives edit mode, and
   * the review step can still show it once it exists.
   */
  const openModal = (payload) => {
    if (payload.mode === "edit") {
      const p = draft.positions.find((x) => x.id === payload.id);
      if (!p) return;
      setForm({ name: p.name, skills: [...p.skills] });
    } else {
      setForm({ name: "", skills: [] });
    }
    setSkillInput("");
    setModal(payload);
  };

  const closeModal = () => setModal(null);

  const addSkillInForm = () => {
    const label = skillInput.trim();
    if (!label) return;
    setForm((f) => (f.skills.includes(label) ? f : { ...f, skills: [...f.skills, label] }));
    setSkillInput("");
  };

  const removeSkillInForm = (label) =>
    setForm((f) => ({ ...f, skills: f.skills.filter((s) => s !== label) }));

  const savePosition = () => {
    if (!form.name.trim()) {
      dispatch(showSnackbar({ message: P.POPUP.NAME_REQUIRED, type: "error" }));
      return;
    }
    if (form.skills.length === 0) {
      dispatch(showSnackbar({ message: P.POPUP.SKILLS_REQUIRED, type: "error" }));
      return;
    }

    if (modal.mode === "edit") {
      setPositions(
        draft.positions.map((p) =>
          p.id === modal.id ? { ...p, name: form.name.trim(), skills: form.skills } : p,
        ),
      );
    } else {
      setPositions([
        ...draft.positions,
        {
          id: `pos-${Date.now()}`,
          name: form.name.trim(),
          description: "",
          skills: form.skills,
        },
      ]);
    }
    closeModal();
  };

  const removePosition = (id) => setPositions(draft.positions.filter((p) => p.id !== id));

  const removeSkillFromCard = (id, label) =>
    setPositions(
      draft.positions.map((p) =>
        p.id === id ? { ...p, skills: p.skills.filter((s) => s !== label) } : p,
      ),
    );

  return (
    <div className="cp-fields">
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
              border="1px solid #e5e7eb"
              padding="18px 20px"
            >
              <div className="cp-position__main">
                <span className="cp-position__icon">
                  <Icon name="Briefcase" size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />
                </span>

                <div className="cp-position__body">
                  <h4 className="cp-position__title">{p.name}</h4>
                  {p.description && <p className="cp-position__desc">{p.description}</p>}
                  <div className="cp-position__skillslabel">{P.REQUIRED_SKILLS}</div>
                  <div className="cp-position__chips">
                    {p.skills.length === 0 ? (
                      <span className="cp-position__none">{P.EMPTY_SKILLS}</span>
                    ) : (
                      p.skills.map((s) => (
                        <span key={s} className="cp-skillchip">
                          {s}
                          <button
                            type="button"
                            className="cp-skillchip__x"
                            aria-label={P.REMOVE_SKILL.replace("{skill}", s)}
                            onClick={() => removeSkillFromCard(p.id, s)}
                          >
                            <Icon name="X" size={10} color="#6a717d" stroke="#6a717d" strokeWidth={2.4} />
                          </button>
                        </span>
                      ))
                    )}
                    <button
                      type="button"
                      className="cp-skillchip cp-skillchip--add"
                      onClick={() => openModal({ mode: "edit", id: p.id })}
                    >
                      <Icon name="Plus" size={12} color="#103ca4" stroke="#103ca4" strokeWidth={2.2} />
                      {P.ADD_SKILL}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="cp-position__del"
                  aria-label={P.REMOVE_POSITION}
                  onClick={() => removePosition(p.id)}
                >
                  <Icon name="Trash" size={ICON_SIZES.SM} color="#9ca3af" stroke="#9ca3af" />
                </button>
              </div>
            </Cards>
          ))}
        </div>
      )}

      <button type="button" className="cp-addpos-dashed" onClick={() => openModal({ mode: "add" })}>
        <span className="cp-addpos-dashed__circle">
          <Icon name="Plus" size={ICON_SIZES.SM} color="#103ca4" stroke="#103ca4" strokeWidth={2.4} />
        </span>
        {P.ADD_ANOTHER}
      </button>

      <Popup
        open={Boolean(modal)}
        onClose={closeModal}
        title={modal?.mode === "edit" ? P.POPUP.EDIT_TITLE : P.POPUP.TITLE}
        cardClassName="cp-addpos-modal"
        bodyClassName="cp-addpos-modal__body"
        footerClassName="cp-addpos-modal__footer"
        footer={
          <>
            <SecondaryButton
              className="cp-addpos-modal__cancel"
              text={P.POPUP.CANCEL}
              onClick={closeModal}
            />
            <PrimaryButton
              className="cp-addpos-modal__save"
              text={P.POPUP.SAVE}
              onClick={savePosition}
            />
          </>
        }
      >
        <label className="cp-addpos-modal__label" htmlFor="cp-addpos-name">
          {P.POPUP.NAME_LABEL}
        </label>
        <TextInput
          id="cp-addpos-name"
          name="position-name"
          placeholder={P.POPUP.NAME_PLACEHOLDER}
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />

        <label className="cp-addpos-modal__label cp-addpos-modal__label--gap" htmlFor="cp-addpos-skill">
          {P.POPUP.SKILLS_LABEL}
        </label>
        <TextInput
          id="cp-addpos-skill"
          name="position-skill"
          placeholder={P.POPUP.SKILLS_PLACEHOLDER}
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkillInForm();
            }
          }}
        />

        {form.skills.length > 0 && (
          <div className="cp-addpos-modal__chips">
            {form.skills.map((s) => (
              <span key={s} className="cp-skillchip">
                {s}
                <button
                  type="button"
                  className="cp-skillchip__x"
                  aria-label={P.REMOVE_SKILL.replace("{skill}", s)}
                  onClick={() => removeSkillInForm(s)}
                >
                  <Icon name="X" size={10} color="#6a717d" stroke="#6a717d" strokeWidth={2.4} />
                </button>
              </span>
            ))}
          </div>
        )}

        <button type="button" className="cp-addpos-modal__addskill" onClick={addSkillInForm}>
          <Icon name="Plus" size={ICON_SIZES.SM} color="#103ca4" stroke="#103ca4" strokeWidth={2.2} />
          {P.ADD_SKILL}
        </button>
      </Popup>
    </div>
  );
}
