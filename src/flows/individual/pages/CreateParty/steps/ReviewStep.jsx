// [TechGuild Update: 13-10-2026] Create Party wizard — Step 4 "Review & Submit" (Figma "Party 4", node 193:4051)
import React from "react";
import { Cards, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { MemberAvatar, Token } from "@/flows/shared/party/PartyUi";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import "./review.css";

const { REVIEW, LIMITS } = APP_STRINGS.CREATE_PARTY;

const AVATAR_COLORS = ["#103ca4", "#9810fa", "#0ea5e9", "#00a63e", "#db2777", "#f54900"];

export default function ReviewStep({ draft, goToStep }) {
  const categories = APP_STRINGS.CREATE_PARTY.CATEGORIES.filter((c) =>
    draft.categories.includes(c.id),
  );
  const members = [
    { id: "lead", name: "You", handle: "@arjun.mehta", role: "Lead" },
    ...draft.invited,
  ];
  const memberCount = members.length;
  const metMinimum = memberCount >= LIMITS.MEMBERS_MIN;

  return (
    <div className="cp-fields">
      {/* ---------------- 1. Party details ---------------- */}
      <ReviewSection
        index={1}
        title={REVIEW.SEC_DETAILS}
        onEdit={() => goToStep("details")}
      >
        <div className="cp-review__grid">
          <Field label={REVIEW.LABEL_NAME} value={draft.name || REVIEW.NOT_SET} />
          <Field
            label={REVIEW.LABEL_CATEGORY}
            valueNode={
              categories.length ? (
                <span className="cp-review__cats">
                  {categories.map((c) => (
                    <span key={c.id} className="cp-review__cat">
                      <Icon name="FolderOpen" size={ICON_SIZES.SM} color="#103ca4" stroke="#103ca4" />
                      {c.label}
                    </span>
                  ))}
                </span>
              ) : (
                REVIEW.NOT_SELECTED
              )
            }
          />
          <Field label={REVIEW.LABEL_DESCRIPTION} value={draft.description || REVIEW.NOT_SET} />
          <Field
            label={REVIEW.LABEL_LOGO}
            valueNode={
              <span className="cp-review__logo">
                <Icon name="Shield" size={ICON_SIZES.LG} color="#ffffff" stroke="#ffffff" />
              </span>
            }
          />
        </div>
      </ReviewSection>

      {/* ---------------- 2. Members ---------------- */}
      <ReviewSection
        index={2}
        title={REVIEW.SEC_MEMBERS}
        meta={`(${memberCount} / ${LIMITS.MEMBERS_MIN} minimum)`}
        onEdit={() => goToStep("members")}
      >
        <div className="cp-review__members">
          {members.map((m, i) => (
            <div key={m.id} className="cp-review__member">
              <span className="cp-review__member-avatar">
                <MemberAvatar
                  name={m.name}
                  handle={m.handle}
                  size={44}
                  color={AVATAR_COLORS[i % AVATAR_COLORS.length]}
                />
                {i === 0 && (
                  <span className="cp-review__crown">
                    <Icon name="Star" size={ICON_SIZES["2XS"]} color="#f54900" stroke="#f54900" />
                  </span>
                )}
              </span>
              <p className="cp-review__member-name">{m.name}</p>
              <p className="cp-review__member-handle">{m.handle}</p>
              <p className="cp-review__member-role">{m.role === "Lead" ? "Lead" : m.role}</p>
            </div>
          ))}
        </div>
        {members.length > 5 && (
          <button type="button" className="cp-linkbtn cp-linkbtn--left">
            {REVIEW.VIEW_ALL_MEMBERS}
            <Icon name="ChevronDown" size={ICON_SIZES.SM} color="#103ca4" stroke="#103ca4" />
          </button>
        )}
      </ReviewSection>

      {/* ---------------- 3. Positions (party-level skills were removed with
              the Figma "step-3" redesign — skills now live on each position) */}
      <ReviewSection
        index={3}
        title={REVIEW.SEC_SKILLS}
        onEdit={() => goToStep("skills")}
      >
        {draft.positions.length === 0 ? (
          <p className="cp-review__empty">{REVIEW.EMPTY}</p>
        ) : (
          <div className="cp-review__tokens">
            {draft.positions.map((p) => (
              <Token key={p.id}>{p.name}</Token>
            ))}
          </div>
        )}
      </ReviewSection>

      {/* ---------------- 4. Additional information ---------------- */}
      <ReviewSection index={4} title={REVIEW.SEC_EXTRA}>
        <div className="cp-review__grid cp-review__grid--4">
          <Field label={REVIEW.LABEL_LEAD} value="You (Arjun Mehta)" />
          <Field
            label={REVIEW.LABEL_VISIBILITY}
            valueNode={
              <span className="cp-review__link">
                <Icon name="Globe" size={ICON_SIZES.SM} color="#103ca4" stroke="#103ca4" />
                {REVIEW.VALUE_PUBLIC}
              </span>
            }
          />
          <Field
            label={REVIEW.LABEL_COMMUNICATION}
            valueNode={
              <span className="cp-review__link">
                <Icon name="MessageSquareMore" size={ICON_SIZES.SM} color="#103ca4" stroke="#103ca4" />
                {REVIEW.VALUE_CHAT}
              </span>
            }
          />
          <Field
            label={REVIEW.LABEL_AVAILABILITY}
            valueNode={
              <span className="cp-review__link">
                <Icon name="Calendar" size={ICON_SIZES.SM} color="#00a63e" stroke="#00a63e" />
                {REVIEW.VALUE_OPEN}
              </span>
            }
          />
        </div>
      </ReviewSection>

      {/* ---------------- What happens next ---------------- */}
      <div className="cp-why">
        <Icon name="Shield" size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />
        <div>
          <p className="cp-why__title">{REVIEW.NEXT_TITLE}</p>
          <p className="cp-why__body">{REVIEW.NEXT_BODY_1}</p>
          <p className="cp-why__body">{REVIEW.NEXT_BODY_2}</p>
        </div>
      </div>

      {!metMinimum && (
        <div className="cp-review__block">
          You still need {LIMITS.MEMBERS_MIN - memberCount} more member
          {LIMITS.MEMBERS_MIN - memberCount === 1 ? "" : "s"} to meet the minimum requirement.
        </div>
      )}
    </div>
  );
}

function ReviewSection({ index, title, meta, onEdit, children }) {
  return (
    <Cards
      variant="base"
      className="cp-review"
      radius="md"
      bg="rgba(255,255,255,0.6)"
      border="1px solid #e7edf8"
      padding="24px"
    >
      <div className="cp-review__head">
        <div className="cp-review__head-title">
          <span className="cp-review__index">{index}</span>
          <h4 className="cp-review__title">{title}</h4>
          {meta && <span className="cp-review__meta">{meta}</span>}
        </div>
        {onEdit && (
          <SecondaryButton
            className="cp-edit-btn"
            text={REVIEW.EDIT}
            icon={<Icon name="Pencil" size={ICON_SIZES.SM} color="#374151" stroke="#374151" />}
            iconPosition="left"
            onClick={onEdit}
          />
        )}
      </div>
      {children}
    </Cards>
  );
}

function Field({ label, value, valueNode }) {
  return (
    <div className="cp-review__field">
      <span className="cp-review__label">{label}</span>
      <div className="cp-review__value">{valueNode || value}</div>
    </div>
  );
}
