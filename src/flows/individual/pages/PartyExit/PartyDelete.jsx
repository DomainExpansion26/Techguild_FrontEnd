// [TechGuild Update: 14-10-2026] Delete Party — lead-only, irreversible confirmation
// (Figma "Delete Party(Lead)" 207:1989). Gated on typing the party name exactly;
// the API call is not wired yet.
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { DashboardLayout, Cards, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { ScrollArea } from "@/flows/shared/party/PartyUi";
import { showSnackbar } from "@/store";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import { PartyIdentityCard, ActionFooter } from "./PartyExit";
import {
  DELETE_PARTY,
  ELIGIBILITY,
  DELETION_STEPS,
  DELETES,
  KEEPS,
  CONSENT_MEMBERS,
} from "./partyExitData";
import "./partypexit.css";

const D = APP_STRINGS.PARTY_DELETE;
const { ELIGIBILITY: EL } = D;

const STEP_TONE = { red: "#dc2626", amber: "#d97706", blue: "#2563eb", green: "#16a34a" };

/** 2×2 grid of deletion gates; met ones are green, the rest neutral. */
function EligibilityGrid() {
  const met = ELIGIBILITY.filter((c) => c.met).length;

  return (
    <Cards
      variant="base"
      className="px-card"
      radius="md"
      bg="rgba(255,255,255,0.6)"
      border="1px solid #e7edf6"
      padding="24px 28px"
    >
      <header className="px-card__head">
        <h3 className="px-card__title">
          <Icon name="CircleQuestionMark" size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />
          {EL.TITLE}
        </h3>
        <span className="px-chip px-chip--count">
          {EL.COUNT.replace("{met}", met).replace("{total}", ELIGIBILITY.length)}
        </span>
      </header>
      <p className="px-section__hint">{EL.HINT}</p>

      <div className="px-eligibility">
        {ELIGIBILITY.map((c) => (
          <div key={c.key} className={`px-elig ${c.met ? "is-met" : "is-unmet"}`}>
            <Icon
              name={c.met ? "CircleCheck" : "Circle"}
              size={ICON_SIZES.SM}
              color={c.met ? "#16a34a" : "#94a3b8"}
              stroke={c.met ? "#16a34a" : "#94a3b8"}
            />
            <span>
              <b>{c.label}</b>
              <em>{c.note}</em>
            </span>
          </div>
        ))}
      </div>

      <div className="px-note px-note--danger">
        <Icon name="ShieldAlert" size={ICON_SIZES.SM} color="#dc2626" stroke="#dc2626" />
        <span>{EL.NOTE}</span>
      </div>
    </Cards>
  );
}

/** How deletion proceeds — 4 numbered steps beside the deleted/kept lists. */
function DeletionExplainer() {
  return (
    <div className="px-explainer">
      <Cards
        variant="base"
        className="px-card"
        radius="md"
        bg="rgba(255,255,255,0.6)"
        border="1px solid #e7edf6"
        padding="24px 28px"
      >
        <h3 className="px-card__title">{D.HOW_IT_WORKS}</h3>
        <ol className="px-steps">
          {DELETION_STEPS.map((s) => (
            <li key={s.n} className="px-step">
              <span className="px-step__n" style={{ backgroundColor: STEP_TONE[s.tone] }}>
                {s.n}
              </span>
              <span>
                <b>{s.label}</b>
                <em>{s.desc}</em>
              </span>
            </li>
          ))}
        </ol>
      </Cards>

      <Cards
        variant="base"
        className="px-card"
        radius="md"
        bg="rgba(255,255,255,0.6)"
        border="1px solid #e7edf6"
        padding="24px 28px"
      >
        <h3 className="px-card__title">{D.DELETES}</h3>
        <ul className="px-list">
          {DELETES.map((t) => (
            <li key={t} className="px-list__item px-list__item--bad">
              <Icon name="X" size={ICON_SIZES.XS} color="#dc2626" stroke="#dc2626" />
              {t}
            </li>
          ))}
        </ul>

        <h3 className="px-card__title px-card__title--gap">{D.KEEPS}</h3>
        <ul className="px-list">
          {KEEPS.map((t) => (
            <li key={t} className="px-list__item px-list__item--good">
              <Icon name="Check" size={ICON_SIZES.XS} color="#16a34a" stroke="#16a34a" strokeWidth={3} />
              {t}
            </li>
          ))}
        </ul>
      </Cards>
    </div>
  );
}

/** The roster that must consent. The lead is auto-approved and highlighted. */
function ConsentPanel() {
  return (
    <Cards
      variant="base"
      className="px-card"
      radius="md"
      bg="rgba(255,255,255,0.6)"
      border="1px solid #e7edf6"
      padding="24px 28px"
    >
      <h3 className="px-card__title">
        <Icon name="ClipboardList" size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />
        {EL.TITLE}
      </h3>
      <p className="px-section__hint">
        {EL.HINT.replace("{all}", EL.ALL)}
      </p>

      <div className="px-consent">
        {CONSENT_MEMBERS.map((m) => (
          <div key={m.id} className={`px-consent__card ${m.auto ? "is-auto" : ""}`}>
            <span className="px-avatar px-avatar--lg" style={{ backgroundColor: m.color }}>
              {m.initials}
            </span>
            <span className="px-consent__name">{m.name}</span>
            <span className="px-consent__role">{m.role}</span>
            <span className={`px-consent__state ${m.auto ? "is-auto" : ""}`}>
              {m.auto ? EL.AUTO_APPROVED : EL.WILL_BE_NOTIFIED}
            </span>
          </div>
        ))}
      </div>

      <div className="px-note">
        <Icon name="Clock" size={ICON_SIZES.SM} color="#d97706" stroke="#d97706" />
        <span>{EL.NOTE}</span>
      </div>
    </Cards>
  );
}

export default function PartyDelete() {
  const dispatch = useDispatch();
  const [typed, setTyped] = useState("");

  // Case-insensitive on purpose: Figma shows an upper-case hint but asking a
  // user to match letter-case as well as spelling is a papercut, not a safeguard.
  const matches = useMemo(
    () => typed.trim().toUpperCase() === DELETE_PARTY.name.toUpperCase(),
    [typed],
  );
  const unmet = ELIGIBILITY.filter((c) => !c.met).length;
  const blocked = !matches || unmet > 0;

  const submit = () => {
    dispatch(
      showSnackbar({
        message: D.MESSAGES.REQUESTED.replace("{party}", DELETE_PARTY.name),
        type: "success",
      }),
    );
  };

  return (
    <DashboardLayout searchPlaceholder={APP_STRINGS.PARTY.PAGE.SEARCH_PLACEHOLDER}>
      <ScrollArea>
        <div className="px-page">
          <header className="px-head">
            <div>
              <h1 className="px-head__title">
                {D.TITLE}
                <span className="px-chip px-chip--danger">
                  <Icon name="TriangleAlert" size={ICON_SIZES.XS} color="#dc2626" stroke="#dc2626" />
                  {D.BADGE}
                </span>
              </h1>
              <p className="px-head__sub">{D.SUBTITLE.replace("{role}", D.ROLE)}</p>
            </div>
            <SecondaryButton
              className="px-btn"
              text={D.BACK}
              icon={<Icon name="ArrowLeft" size={ICON_SIZES.XS} color="#103ca4" stroke="#103ca4" />}
              iconPosition="left"
            />
          </header>

          <PartyIdentityCard party={DELETE_PARTY} showLeadBadge leadLabel={D.ROLE} />

          <EligibilityGrid />
          <DeletionExplainer />
          <ConsentPanel />

          {/* ---------------- Confirm ---------------- */}
          <Cards
            variant="base"
            className="px-card"
            radius="md"
            bg="rgba(255,255,255,0.6)"
            border="1px solid #e7edf6"
            padding="24px 28px"
          >
            <h3 className="px-card__title">
              <Icon name="Trash" size={ICON_SIZES.MD} color="#dc2626" stroke="#dc2626" />
              {D.CONFIRM.TITLE}
            </h3>
            <p className="px-section__hint">
              {D.CONFIRM.HINT.replace("{name}", DELETE_PARTY.name)}
            </p>
            <input
              type="text"
              className="px-confirm"
              placeholder={D.CONFIRM.PLACEHOLDER}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
            />
          </Cards>

          <ActionFooter
            note={D.FOOTER_NOTE}
            cancelText={D.CANCEL}
            actionText={D.ACTION}
            disabled={blocked}
            onCancel={() => window.history.back()}
            onAction={submit}
          />
        </div>
      </ScrollArea>
    </DashboardLayout>
  );
}