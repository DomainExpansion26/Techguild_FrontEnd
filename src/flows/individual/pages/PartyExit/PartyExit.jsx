// [TechGuild Update: 14-10-2026] Leave Party — member + lead confirmation screens.
// Figma "Leave Party(Member)" 207:1389 and "Leave Party(Lead)" 207:1632.
// One component serves both; /party-formation/leave-lead selects the lead variant.
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DashboardLayout, Cards, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { ScrollArea } from "@/flows/shared/party/PartyUi";
import { showSnackbar } from "@/store";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import {
  LEAVE_PARTY,
  MEMBER_WARNINGS,
  LEAD_WARNINGS,
  REASONS,
  TRANSFER_CANDIDATES,
} from "./partyExitData";
import "./partypexit.css";

const X = APP_STRINGS.PARTY_EXIT;

/**
 * Party identity strip (logo, name, badges, member/quest/created counts).
 * Shared with PartyDelete — the Delete screen shows the same card for its own
 * party, so it is exported rather than duplicated.
 */
export function PartyIdentityCard({ party, showLeadBadge = false, leadLabel }) {
  return (
    <Cards
      variant="base"
      className="px-party"
      radius="md"
      bg="rgba(255,255,255,0.6)"
      border="1px solid #e7edf6"
      padding="24px 28px"
    >
      <div className="px-party__row">
        <span className="px-party__logo" style={{ backgroundColor: party.color }}>
          {party.initials}
        </span>

        <div className="px-party__body">
          <div className="px-party__nameline">
            <h2 className="px-party__name">{party.name}</h2>
            <Icon name="Verified" size={ICON_SIZES.SM} color="#2563eb" stroke="#2563eb" />
            {showLeadBadge && <span className="px-chip px-chip--lead">{leadLabel}</span>}
          </div>

          <span className="px-chip px-chip--active">
            <span className="px-dot" />
            Active Party
          </span>
        </div>

        <ul className="px-party__meta">
          <li>
            <Icon name="Users" size={ICON_SIZES.XS} color="#64748b" stroke="#64748b" />
            {party.members} Members
          </li>
          <li>
            <Icon name="Briefcase" size={ICON_SIZES.XS} color="#64748b" stroke="#64748b" />
            {party.activeQuests} Active Quests
          </li>
          <li>
            <Icon name="Calendar" size={ICON_SIZES.XS} color="#64748b" stroke="#64748b" />
            Created on {party.created}
          </li>
        </ul>
      </div>
    </Cards>
  );
}

/**
 * Optional exit-reason picker. Rendered as a 2-column grid of radio cards;
 * the final "Other" row spans the full width (matching Figma).
 * Exported so the Delete screen could reuse it if it ever needs an exit survey.
 */
export function ReasonPicker({ value, onChange, title, hint }) {
  return (
    <section className="px-section">
      <h3 className="px-section__title">
        {title}
        <span className="px-optional">{X.MEMBER.OPTIONAL}</span>
      </h3>
      <p className="px-section__hint">{hint}</p>

      <div className="px-reasons" role="radiogroup" aria-label={title}>
        {REASONS.map((r) => {
          const on = value === r.key;
          return (
            <button
              key={r.key}
              type="button"
              role="radio"
              aria-checked={on}
              className={`px-reason ${on ? "is-on" : ""} ${r.key === "other" ? "px-reason--wide" : ""}`}
              onClick={() => onChange(on ? null : r.key)}
            >
              <span className={`px-radio ${on ? "is-on" : ""}`} />
              <span className="px-reason__icon">
                <Icon name={r.icon} size={ICON_SIZES.SM} color="#64748b" stroke="#64748b" />
              </span>
              <span className="px-reason__body">
                <span className="px-reason__label">{r.label}</span>
                <span className="px-reason__desc">{r.desc}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Sticky footer bar: a lock note on the left, Cancel + the primary action on
 * the right. Shared with PartyDelete.
 */
export function ActionFooter({ note, noteTone = "muted", cancelText, actionText, disabled, onCancel, onAction }) {
  return (
    <div className="px-footer">
      <p className={`px-footer__note px-footer__note--${noteTone}`}>
        <Icon name="Lock" size={ICON_SIZES.XS} color="#94a3b8" stroke="#94a3b8" />
        {note}
      </p>

      <div className="px-footer__actions">
        <SecondaryButton className="px-btn" text={cancelText} onClick={onCancel} />
        <PrimaryButton className="px-btn px-btn--danger" text={actionText} disabled={disabled} onClick={onAction} />
      </div>
    </div>
  );
}

/** Amber consequence banner with a bullet list. */
function WarnBanner({ title, items }) {
  return (
    <div className="px-warn">
      <Icon name="TriangleAlert" size={ICON_SIZES.MD} color="#d97706" stroke="#d97706" />
      <div>
        <p className="px-warn__title">{title}</p>
        <ul className="px-warn__list">
          {items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PartyExit({ onDone }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isLead = pathname.endsWith("/leave-lead");

  const cfg = isLead ? X.LEAD : X.MEMBER;
  const warnings = isLead ? LEAD_WARNINGS : MEMBER_WARNINGS;

  const [reason, setReason] = useState(isLead ? null : REASONS[0].key);
  const [feedback, setFeedback] = useState("");
  const [successor, setSuccessor] = useState(null);

  // The lead cannot leave until a successor is chosen — that is the whole point
  // of the extra section, and it gates the footer note + button.
  const blocked = isLead && !successor;

  const submit = () => {
    const picked = TRANSFER_CANDIDATES.find((c) => c.id === successor);
    const msg = isLead
      ? X.MESSAGES.TRANSFERRED.replace("{party}", LEAVE_PARTY.name).replace("{name}", picked?.name ?? "")
      : X.MESSAGES.LEFT.replace("{party}", LEAVE_PARTY.name);
    dispatch(showSnackbar({ message: msg, type: "success" }));
    if (onDone) onDone();
  };

  return (
    <DashboardLayout searchPlaceholder={APP_STRINGS.PARTY.PAGE.SEARCH_PLACEHOLDER}>
      <ScrollArea>
        <div className="px-page">
          {/* ---------------- Header ---------------- */}
          <header className="px-head">
            <div>
              <h1 className="px-head__title">{X.MEMBER.TITLE}</h1>
              <p className="px-head__sub">
                {isLead
                  ? X.LEAD.SUBTITLE.replace("{role}", X.LEAD.ROLE)
                  : X.MEMBER.SUBTITLE}
              </p>
            </div>
            <SecondaryButton
              className="px-btn"
              text={X.BACK}
              icon={<Icon name="ArrowLeft" size={ICON_SIZES.XS} color="#103ca4" stroke="#103ca4" />}
              iconPosition="left"
            />
          </header>

          <PartyIdentityCard party={LEAVE_PARTY} showLeadBadge={isLead} leadLabel={X.LEAD.ROLE} />

          <WarnBanner
            title={isLead ? X.LEAD.WARN_TITLE.replace("{role}", X.LEAD.ROLE) : X.MEMBER.WARN_TITLE}
            items={warnings}
          />

          {/* ---------------- Leadership transfer (lead only) ---------------- */}
          {isLead && (
            <section className="px-section">
              <h3 className="px-section__title">
                <Icon name="BadgeCheck" size={ICON_SIZES.MD} color="#d97706" stroke="#d97706" />
                {X.LEAD.TRANSFER_TITLE}
                <span className="px-chip px-chip--required">{X.LEAD.REQUIRED}</span>
              </h3>
              <p className="px-section__hint">{X.LEAD.TRANSFER_HINT}</p>

              <div className="px-successors" role="radiogroup" aria-label={X.LEAD.TRANSFER_TITLE}>
                {TRANSFER_CANDIDATES.map((c) => {
                  const on = successor === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      className={`px-successor ${on ? "is-on" : ""}`}
                      onClick={() => setSuccessor(c.id)}
                    >
                      <span className="px-avatar" style={{ backgroundColor: c.color }}>
                        {c.initials}
                      </span>
                      <span className="px-successor__body">
                        <span className="px-successor__name">{c.name}</span>
                        <span className="px-successor__role">{c.role}</span>
                        <span className="px-successor__meta">
                          {X.QUEST.replace("{n}", c.quests)} &middot; {X.JOINED.replace("{date}", c.joined)}
                        </span>
                      </span>
                      <span className={`px-radio px-radio--end ${on ? "is-on" : ""}`} />
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          <ReasonPicker
            value={reason}
            onChange={setReason}
            title={X.MEMBER.REASON_TITLE}
            hint={X.MEMBER.REASON_HINT}
          />

          {/* ---------------- Feedback ---------------- */}
          <section className="px-section">
            <h3 className="px-section__title">
              {X.MEMBER.FEEDBACK_LABEL}
              <span className="px-optional">{X.MEMBER.OPTIONAL}</span>
            </h3>
            <div className="px-textarea">
              <textarea
                className="px-textarea__field"
                placeholder={X.MEMBER.FEEDBACK_PLACEHOLDER}
                value={feedback}
                maxLength={300}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <span className="px-textarea__count">
                {feedback.length}/300
              </span>
            </div>
          </section>

          <ActionFooter
            note={isLead ? X.LEAD.FOOTER_NOTE : X.MEMBER.FOOTER_NOTE}
            noteTone={blocked ? "muted" : "muted"}
            cancelText={X.CANCEL}
            actionText={cfg.ACTION}
            disabled={blocked}
            onCancel={() => window.history.back()}
            onAction={submit}
          />
        </div>
      </ScrollArea>
    </DashboardLayout>
  );
}