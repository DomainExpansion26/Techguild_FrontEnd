// [TechGuild Update: 13-10-2026] Create Party wizard — right-rail "Party Summary" card
import React from "react";
import { Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { MemberAvatar } from "@/flows/shared/party/PartyUi";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import "./partysummary.css";

const { REVIEW, LIMITS } = APP_STRINGS.CREATE_PARTY;

const AVATAR_COLORS = ["#103ca4", "#e7000b", "#9810fa", "#f54900", "#00a63e", "#103ca4"];

/**
 * Right rail for every step. The card is intentionally step-aware: it mirrors
 * the Figma frames, where each step shows a different level of detail
 * (step 1 shows empty placeholders, later steps show real values + a checklist).
 */
export default function PartySummary({ step, draft, leadName = "You (Arjun Mehta)", submissionId }) {
  const total = LIMITS.MEMBERS_MIN;
  const memberCount = 1 + draft.invited.length;
  const metMinimum = memberCount >= total;

  const categoryLabels = APP_STRINGS.CREATE_PARTY.CATEGORIES.filter((c) =>
    draft.categories.includes(c.id),
  ).map((c) => c.label);
  const categoryText = categoryLabels.length ? categoryLabels.join(", ") : null;

  /* ---------------- Step 1: nothing entered yet ---------------- */
  if (step === 1) {
    return (
      <Cards
        variant="base"
        className="cp-summary"
        radius="md"
        bg="rgba(255,255,255,0.6)"
        border="1px solid #e7edf8"
        padding="24px"
      >
        <h3 className="cp-summary__title">Party Summary</h3>
        <p className="cp-summary__sub">Your party overview (will update as you progress).</p>

        <div className="cp-summary__identity">
          <span className="cp-summary__avatar">
            <Icon name="Users" size={ICON_SIZES.LG} color="#9ca3af" stroke="#9ca3af" />
          </span>
          <div>
            <div className="cp-summary__name">Party Name</div>
            <div className="cp-summary__value">{REVIEW.NOT_SET}</div>
            <div className="cp-summary__muted">
              {draft.tag ? draft.tag : "@username"}
              {draft.tag && (
                <Icon name="Files" size={ICON_SIZES["2XS"]} color="#9ca3af" stroke="#9ca3af" />
              )}
            </div>
          </div>
        </div>

        <dl className="cp-summary__rows">
          <Row label={REVIEW.LABEL_DESCRIPTION} value={draft.description ? draft.description : REVIEW.NOT_SET} />
          <Row label={REVIEW.LABEL_CATEGORY} value={categoryText || REVIEW.NOT_SELECTED} />
          <Row label={REVIEW.LABEL_SELECTED_SKILLS} value={draft.skills.length ? `${draft.skills.length} skills` : REVIEW.NOT_SELECTED} />
          <Row
            label={REVIEW.SEC_MEMBERS}
            value={
              <>
                1 (Only you)&nbsp;
                <span className="cp-summary__badge cp-summary__badge--warn">
                  Min. {LIMITS.MEMBERS_MIN} required
                </span>
              </>
            }
          />
          <Row
            label={REVIEW.LABEL_LEAD}
            value={
              <span className="cp-summary__lead">
                <MemberAvatar name={leadName} size={22} color="#103ca4" />
                You
              </span>
            }
          />
          <Row label="Status" value={<span className="cp-summary__dot">Draft</span>} />
        </dl>

        <div className="cp-summary__note">
          <Icon name="Shield" size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />
          <span>
            To create a party, you need at least {LIMITS.MEMBERS_MIN} members including you.
          </span>
        </div>
      </Cards>
    );
  }

  /* ---------------- Step 5: post-submit ---------------- */
  if (step === 5) {
    return (
      <>
        <Cards
          variant="base"
          className="cp-summary"
          radius="md"
          bg="rgba(255,255,255,0.6)"
          border="1px solid #e7edf8"
          padding="24px"
        >
          <h3 className="cp-summary__title">Party Summary</h3>

          <div className="cp-summary__identity cp-summary__identity--compact">
            <span className="cp-summary__logo">
              <Icon name="Shield" size={ICON_SIZES.LG} color="#ffffff" stroke="#ffffff" />
            </span>
            <div>
              <div className="cp-summary__name">{draft.name || "Pixel Masters"}</div>
              <div className="cp-summary__meta">
                <span className="cp-summary__pill">Draft</span>
                <span className="cp-summary__muted-inline">
                  <Icon name="FolderOpen" size={ICON_SIZES["2XS"]} color="#9ca3af" stroke="#9ca3af" />
                  {categoryText || "—"}
                </span>
              </div>
            </div>
          </div>

          <dl className="cp-summary__rows cp-summary__rows--labels">
            <Row label="DESCRIPTION" value={draft.description || REVIEW.NOT_SET} />
            <Row
              label="MEMBERS"
              value={
                <span className="cp-summary__members">
                  <AvatarStack names={["You", ...draft.invited.map((m) => m.name)]} />
                  <strong>
                    {memberCount} / {total}
                  </strong>
                </span>
              }
            />
            <Row label="PARTY LEAD" value={leadName} />
            <Row label="SKILLS" value={`${draft.skills.length} skills`} />
            <Row label={REVIEW.LABEL_VISIBILITY.toUpperCase()} value={REVIEW.VALUE_PUBLIC} />
            <Row
              label="SUBMITTED ON"
              value={submissionId?.submittedOn || "20 May 2025, 11:30 AM"}
            />
          </dl>
        </Cards>

        <Cards
          variant="base"
          className="cp-summary cp-summary--next"
          radius="md"
          bg="rgba(255,255,255,0.6)"
          border="1px solid #e7edf8"
          padding="24px"
        >
          <h3 className="cp-summary__title">{APP_STRINGS.CREATE_PARTY.SUCCESS.NEXT_TITLE}</h3>
          <ul className="cp-next-list">
            {APP_STRINGS.CREATE_PARTY.SUCCESS.NEXT_STEPS.map((s) => (
              <li key={s.key} className="cp-next-list__item">
                <span className={`cp-next-list__icon cp-next-list__icon--${s.key}`}>
                  <Icon
                    name={s.key === "review" ? "Users" : s.key === "approval" ? "Shield" : "TrendingUp"}
                    size={ICON_SIZES.MD}
                    color={s.key === "review" ? "#9810fa" : s.key === "approval" ? "#103ca4" : "#00a63e"}
                    stroke={s.key === "review" ? "#9810fa" : s.key === "approval" ? "#103ca4" : "#00a63e"}
                  />
                </span>
                <div>
                  <p className="cp-next-list__title">{s.title}</p>
                  <p className="cp-next-list__body">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Cards>
      </>
    );
  }

  /* ---------------- Steps 2-4: live values + progress checklist ---------------- */
  const checklist = [
    { label: "Party details added", done: Boolean(draft.name && draft.category) },
    {
      label: `${LIMITS.MEMBERS_MIN} members added`,
      done: metMinimum,
      current: !metMinimum,
    },
    {
      label: "Add skills & expertise",
      done: draft.skills.length > 0,
      current: metMinimum && draft.skills.length === 0,
    },
    { label: "Review and submit", done: step === 4, current: step === 4 },
  ];

  const incomplete = checklist.findIndex((c) => !c.done);

  return (
    <Cards
      variant="base"
      className="cp-summary"
      radius="md"
      bg="rgba(255,255,255,0.6)"
      border="1px solid #e7edf8"
      padding="24px"
    >
      <h3 className="cp-summary__title">Party Summary</h3>
      <p className="cp-summary__sub">This will update as you progress.</p>

      <div className="cp-summary__identity cp-summary__identity--compact">
        <span className="cp-summary__logo">
          <Icon name="Shield" size={ICON_SIZES.LG} color="#ffffff" stroke="#ffffff" />
        </span>
        <div>
          <div className="cp-summary__name">{draft.name || "Pixel Masters"}</div>
          <div className="cp-summary__meta">
            <span className="cp-summary__pill">Draft</span>
            <span className="cp-summary__muted-inline">
              <Icon name="FolderOpen" size={ICON_SIZES["2XS"]} color="#9ca3af" stroke="#9ca3af" />
              {categoryText || "—"}
            </span>
          </div>
        </div>
      </div>

      {draft.description && (
        <>
          <div className="cp-summary__label">DESCRIPTION</div>
          <p className="cp-summary__desc">
            {draft.description}
            {draft.description.length > 90 && (
              <>
                {" "}
                <button type="button" className="cp-summary__link">
                  See more
                </button>
              </>
            )}
          </p>
        </>
      )}

      <div className="cp-summary__label">MEMBERS</div>
      <div className="cp-summary__members">
        <AvatarStack names={["You", ...draft.invited.map((m) => m.name)]} />
        <span className={metMinimum ? "cp-summary__ok" : "cp-summary__pending"}>
          <strong>
            {memberCount} / {total} minimum
          </strong>
        </span>
      </div>
      {metMinimum && <div className="cp-summary__progress cp-summary__progress--full" />}

      <dl className="cp-summary__rows cp-summary__rows--labels">
        <Row label="PARTY LEAD" value={leadName} />
        <Row label="SKILLS" value={draft.skills.length ? `${draft.skills.length} skills` : "Not added yet"} />
        <Row label="Status" value={<span className="cp-summary__dot">Draft</span>} />
      </dl>

      <div className="cp-summary__checklist">
        <p className="cp-summary__checklist-title">
          {step === 4 ? "Completed Steps" : "Complete these steps to proceed"}
        </p>
        {checklist.map((c, i) => (
          <div key={c.label} className="cp-check">
            <span
              className={`cp-check__dot ${c.done ? "is-done" : c.current && i === incomplete ? "is-current" : ""}`}
            >
              {c.done && (
                <Icon name="Check" size={10} color="#ffffff" stroke="#ffffff" strokeWidth={3} />
              )}
              {!c.done && !c.current && <span className="cp-check__hollow" />}
            </span>
            <span className={`cp-check__label ${c.done || c.current ? "is-active" : ""}`}>{c.label}</span>
          </div>
        ))}
      </div>

      {step === 4 && metMinimum && (
        <div className="cp-summary__alert">
          <Icon name="Lock" size={ICON_SIZES.MD} color="#ea580c" stroke="#ea580c" />
          <div>
            <p className="cp-summary__alert-title">Minimum requirement met</p>
            <p className="cp-summary__alert-body">You have added {memberCount} members.</p>
            <p className="cp-summary__alert-body">Your party is ready to be submitted.</p>
          </div>
        </div>
      )}

      {step === 4 && !metMinimum && (
        <div className="cp-summary__alert cp-summary__alert--warn">
          <Icon name="TriangleAlert" size={ICON_SIZES.MD} color="#b45309" stroke="#b45309" />
          <div>
            <p className="cp-summary__alert-title">Minimum requirement not met</p>
            <p className="cp-summary__alert-body">
              You have {memberCount} of {total} members. Invite {total - memberCount} more to
              continue.
            </p>
          </div>
        </div>
      )}
    </Cards>
  );
}

function Row({ label, value }) {
  return (
    <div className="cp-summary__row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function AvatarStack({ names }) {
  const shown = names.slice(0, 4);
  return (
    <span className="cp-avatar-stack">
      {shown.map((n, i) => (
        <MemberAvatar
          key={`${n}-${i}`}
          name={n}
          size={26}
          ring
          color={AVATAR_COLORS[i % AVATAR_COLORS.length]}
        />
      ))}
      {names.length > shown.length && (
        <span className="cp-avatar-stack__more" style={{ width: 26, height: 26 }}>
          +{names.length - shown.length}
        </span>
      )}
    </span>
  );
}
