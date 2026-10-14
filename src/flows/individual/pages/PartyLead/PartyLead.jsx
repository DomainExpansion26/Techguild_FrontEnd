// [TechGuild Update: 14-10-2026] Party Lead dashboard — the "party created" landing page
// (Figma "Party mngnt create", node 205:704). Lead-only view: the owner accepts /
// declines join requests, invites members and tracks submission readiness.
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { DashboardLayout, Cards, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { ScrollArea } from "@/flows/shared/party/PartyUi";
import { showSnackbar } from "@/store";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import {
  PARTY,
  MEMBERS,
  PENDING_INVITES,
  JOIN_REQUESTS,
  ACTIVITY,
  CHECKLIST,
  QUICK_ACTIONS,
  LEAD_TIPS,
} from "./partyLeadData";
import "./partylead.css";

const { HEADER, HERO, TABS, MEMBERS: M, INVITES, REQUESTS, ACTIVITY: A, CHECKLIST: C, BREAKDOWN, INFO, QUICK_ACTIONS: QA, TIPS } =
  APP_STRINGS.PARTY_LEAD;

const TONE = {
  green: "#16a34a",
  blue: "#2563eb",
  amber: "#d97706",
  purple: "#7c3aed",
  red: "#ef4444",
};

/** Member-slot strip in the hero: filled avatars then dashed placeholders. */
function SlotStack({ confirmed, max }) {
  const empty = Math.max(0, max - confirmed.length);

  return (
    <div className="pl-slots">
      {confirmed.map((m) => (
        <span
          key={m.id}
          className="pl-slot pl-slot--filled"
          style={{ backgroundColor: m.color }}
          title={m.name}
        >
          {m.initials}
        </span>
      ))}
      {Array.from({ length: empty }, (_, i) => (
        <span key={`empty-${i}`} className="pl-slot pl-slot--empty" aria-hidden="true">
          <Icon name="Plus" size={ICON_SIZES.XS} color="#94a3b8" stroke="#94a3b8" strokeWidth={2.4} />
        </span>
      ))}
    </div>
  );
}

/** One confirmed member. The lead row has no remove control. */
function MemberRow({ member, onRemove }) {
  return (
    <li className="pl-member">
      <span className="pl-avatar" style={{ backgroundColor: member.color }}>
        {member.initials}
      </span>

      <div className="pl-member__id">
        <div className="pl-member__name">
          {member.name}
          {member.isLead && <span className="pl-chip pl-chip--lead">{M.LEAD_CHIP}</span>}
          {member.isYou && <span className="pl-you">{M.YOU}</span>}
        </div>
        <div className="pl-member__role">
          {member.role} &middot; {member.handle}
        </div>
      </div>

      <span className="pl-member__end">
        {member.isLead ? (
          <span className="pl-member__meta">{member.meta}</span>
        ) : (
          <span className="pl-member__meta">{member.meta}</span>
        )}
        {member.isLead ? (
          <span className="pl-chip pl-chip--confirmed">
            <Icon name="Check" size={ICON_SIZES["2XS"]} color="#16a34a" stroke="#16a34a" strokeWidth={3} />
            {M.CONFIRMED_CHIP}
          </span>
        ) : (
          <>
            <span className="pl-chip pl-chip--confirmed">
              <Icon name="Check" size={ICON_SIZES["2XS"]} color="#16a34a" stroke="#16a34a" strokeWidth={3} />
              {M.CONFIRMED_CHIP}
            </span>
            <button
              type="button"
              className="pl-iconbtn pl-iconbtn--danger"
              aria-label={M.REMOVE.replace("{name}", member.name)}
              onClick={() => onRemove(member)}
            >
              <Icon name="Trash" size={ICON_SIZES.XS} color="#ef4444" stroke="#ef4444" />
            </button>
          </>
        )}
      </span>
    </li>
  );
}

/** One outstanding invite with resend / cancel. */
function InviteRow({ invite, onResend, onCancel }) {
  return (
    <li className="pl-member">
      <span className="pl-avatar" style={{ backgroundColor: invite.color }}>
        {invite.initials}
      </span>

      <div className="pl-member__id">
        <div className="pl-member__name">
          {invite.name}
          <span className="pl-chip pl-chip--pending">{INVITES.PENDING_CHIP}</span>
        </div>
        <div className="pl-member__role">
          {invite.role} &middot; {invite.handle}
        </div>
      </div>

      <span className="pl-member__end">
        <span className="pl-member__meta">{invite.meta}</span>
        <SecondaryButton className="pl-btn--sm" text={INVITES.RESEND} onClick={() => onResend(invite)} />
        <SecondaryButton className="pl-btn--sm pl-btn--danger" text={INVITES.CANCEL} onClick={() => onCancel(invite)} />
      </span>
    </li>
  );
}

/** One join request — the lead's approve / reject card. */
function RequestCard({ request, onAccept, onDecline }) {
  return (
    <article className="pl-req">
      <header className="pl-req__head">
        <span className="pl-avatar" style={{ backgroundColor: request.color }}>
          {request.initials}
        </span>

        <div className="pl-req__id">
          <div className="pl-req__name">
            {request.name}
            <span className="pl-chip pl-chip--wants">
              <Icon name="UserPlus" size={ICON_SIZES["2XS"]} color="#103ca4" stroke="#103ca4" />
              {REQUESTS.WANTS_TO_JOIN}
            </span>
          </div>
          <div className="pl-member__role">
            {request.role} &middot; {request.handle}
          </div>
        </div>

        <div className="pl-req__actions">
          <PrimaryButton
            className="pl-btn--sm"
            text={REQUESTS.ACCEPT}
            icon={<Icon name="Check" size={ICON_SIZES["2XS"]} color="#ffffff" stroke="#ffffff" strokeWidth={3} />}
            iconPosition="left"
            onClick={() => onAccept(request)}
          />
          <SecondaryButton
            className="pl-btn--sm"
            text={REQUESTS.DECLINE}
            icon={<Icon name="X" size={ICON_SIZES["2XS"]} color="#ef4444" stroke="#ef4444" strokeWidth={3} />}
            iconPosition="left"
            onClick={() => onDecline(request)}
          />
          <SecondaryButton
            className="pl-btn--sm"
            text={REQUESTS.VIEW_PROFILE}
            icon={<Icon name="Eye" size={ICON_SIZES["2XS"]} color="#64748b" stroke="#64748b" />}
            iconPosition="left"
          />
        </div>
      </header>

      <div className="pl-req__skills">
        {request.skills.map((s) => (
          <span key={s} className="pl-chip pl-chip--skill">
            {s}
          </span>
        ))}
      </div>

      <blockquote className="pl-req__quote">&ldquo;{request.message}&rdquo;</blockquote>
    </article>
  );
}

export default function PartyLead() {
  const dispatch = useDispatch();

  const [members, setMembers] = useState(MEMBERS);
  const [invites, setInvites] = useState(PENDING_INVITES);
  const [requests, setRequests] = useState(JOIN_REQUESTS);
  const [tab, setTab] = useState("members");

  const confirmedCount = members.length;
  const openSlots = Math.max(0, PARTY.memberLimit - confirmedCount);
  const needed = Math.max(0, PARTY.memberLimit - confirmedCount);
  const filled = Math.round((confirmedCount / PARTY.memberLimit) * 100);

  const warnText = useMemo(
    () =>
      HERO.WARN.replace("{n}", String(needed)).replace(
        "{r}",
        String(requests.length),
      ),
    [needed, requests.length],
  );

  const say = (message) => dispatch(showSnackbar({ message, type: "success" }));

  /* ---------------- lead actions (local until teamsApi exposes the queue) ---------------- */
  const removeMember = (member) => {
    setMembers((list) => list.filter((m) => m.id !== member.id));
    say(APP_STRINGS.PARTY_LEAD.MESSAGES.MEMBER_REMOVED.replace("{name}", member.name));
  };

  const resendInvite = (invite) =>
    say(APP_STRINGS.PARTY_LEAD.MESSAGES.INVITE_RESENT.replace("{name}", invite.name));

  const cancelInvite = (invite) => {
    setInvites((list) => list.filter((i) => i.id !== invite.id));
    say(APP_STRINGS.PARTY_LEAD.MESSAGES.INVITE_CANCELLED.replace("{name}", invite.name));
  };

  const acceptRequest = (request) => {
    setMembers((list) =>
      list.length < PARTY.memberLimit
        ? [...list, { ...request, meta: "Just now" }]
        : list,
    );
    setRequests((list) => list.filter((r) => r.id !== request.id));
    say(APP_STRINGS.PARTY_LEAD.MESSAGES.REQUEST_ACCEPTED.replace("{name}", request.name));
  };

  const declineRequest = (request) => {
    setRequests((list) => list.filter((r) => r.id !== request.id));
    say(APP_STRINGS.PARTY_LEAD.MESSAGES.REQUEST_DECLINED.replace("{name}", request.name));
  };

  const copyGuildId = async () => {
    try {
      await navigator.clipboard.writeText(PARTY.guildId);
      say(INFO.COPIED);
    } catch {
      // Clipboard is unavailable over plain http — the id is still visible on screen.
    }
  };

  const tabItems = [
    { key: "members", label: TABS.MEMBERS, badge: requests.length },
    { key: "overview", label: TABS.OVERVIEW },
    { key: "activity", label: TABS.ACTIVITY },
    { key: "settings", label: TABS.SETTINGS },
  ];

  return (
    <DashboardLayout searchPlaceholder={APP_STRINGS.PARTY.PAGE.SEARCH_PLACEHOLDER}>
      <ScrollArea>
        <div className="pl-page">
          {/* ---------------- Header ---------------- */}
          <header className="pl-head">
            <div>
              <h1 className="pl-head__title">{HEADER.TITLE}</h1>
              <p className="pl-head__sub">
                {HEADER.SUBTITLE_LEAD.replace("{party}", PARTY.name)}
              </p>
            </div>

            <div className="pl-head__actions">
              <button type="button" className="pl-iconbtn" aria-label={HEADER.REFRESH}>
                <Icon name="RefreshCw" size={ICON_SIZES.SM} color="#334155" stroke="#334155" />
              </button>
              <SecondaryButton
                className="pl-btn--sm"
                text={HEADER.HOW_IT_WORKS}
                icon={<Icon name="CircleQuestionMark" size={ICON_SIZES.XS} color="#334155" stroke="#334155" />}
                iconPosition="left"
              />
              <SecondaryButton
                className="pl-btn--sm"
                text={HEADER.SETTINGS}
                icon={<Icon name="Settings" size={ICON_SIZES.XS} color="#334155" stroke="#334155" />}
                iconPosition="left"
              />
            </div>
          </header>

          {/* ---------------- Hero ---------------- */}
          <Cards variant="base" className="pl-hero" radius="md" bg="#e1ebff" border="1.5px solid #bfdbfe" padding="28px 32px">
            <div className="pl-hero__top">
              <div className="pl-hero__id">
                <span className="pl-hero__logo">{PARTY.initials}</span>
                <div>
                  <div className="pl-hero__nameline">
                    <h2 className="pl-hero__name">{PARTY.name}</h2>
                    <span className="pl-badge pl-badge--rank">
                      <Icon name="Star" size={ICON_SIZES["2XS"]} color="#92400e" stroke="#92400e" />
                      {PARTY.rank}
                    </span>
                    <span className="pl-badge">{PARTY.status}</span>
                  </div>
                  <p className="pl-hero__meta">
                    {PARTY.tag} &middot; {PARTY.category} &middot; {PARTY.location}
                  </p>
                  <span className="pl-chip pl-chip--hero">
                    <Icon name="BadgeCheck" size={ICON_SIZES.XS} color="#92400e" stroke="#92400e" />
                    {HERO.LEAD_CHIP}
                  </span>
                </div>
              </div>

              <div className="pl-hero__slots">
                <span className="pl-hero__slotslabel">{HERO.SLOTS_LABEL}</span>
                <SlotStack confirmed={members} max={PARTY.memberLimit} />
                <span className="pl-hero__count">
                  {HERO.CONFIRMED.replace("{n}", confirmedCount).replace("{max}", PARTY.memberLimit)}
                </span>
              </div>
            </div>

            <div className="pl-warn">
              <Icon name="TriangleAlert" size={ICON_SIZES.SM} color="#d97706" stroke="#d97706" />
              <p>{warnText}</p>
              <PrimaryButton
                className="pl-btn--sm"
                text={HERO.REVIEW_REQUESTS}
                onClick={() => {
                  setTab("members");
                  document.getElementById("pl-join-requests")?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          </Cards>

          {/* ---------------- Tabs ---------------- */}
          <nav className="pl-tabs" role="tablist">
            {tabItems.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                className={`pl-tab ${tab === t.key ? "is-active" : ""}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
                {t.badge ? <span className="pl-tab__badge">{t.badge}</span> : null}
              </button>
            ))}
          </nav>

          <div className="pl-layout">
            {/* ================= Main ================= */}
            <div className="pl-main">
              {tab === "members" && (
                <>
                  {/* Confirmed members */}
                  <Cards variant="base" className="pl-card" radius="lg" bg="#ffffff" border="1px solid #e6ecf5" padding="22px 24px">
                    <header className="pl-card__head">
                      <h3 className="pl-card__title">
                        {M.TITLE}
                        <span className="pl-card__count">
                          {M.COUNT.replace("{n}", confirmedCount).replace("{max}", PARTY.memberLimit)}
                        </span>
                      </h3>
                      <SecondaryButton
                        className="pl-btn--sm"
                        text={M.INVITE}
                        icon={<Icon name="UserPlus" size={ICON_SIZES.XS} color="#103ca4" stroke="#103ca4" />}
                        iconPosition="left"
                      />
                    </header>

                    {members.length === 0 ? (
                      <p className="pl-empty">No confirmed members yet.</p>
                    ) : (
                      <ul className="pl-list">
                        {members.map((m) => (
                          <MemberRow key={m.id} member={m} onRemove={removeMember} />
                        ))}
                      </ul>
                    )}
                  </Cards>

                  {/* Pending invites */}
                  <Cards variant="base" className="pl-card" radius="lg" bg="#ffffff" border="1px solid #e6ecf5" padding="22px 24px">
                    <header className="pl-card__head">
                      <h3 className="pl-card__title">
                        {INVITES.TITLE}
                        <span className="pl-badge pl-badge--warn">{INVITES.AWAITING.replace("{n}", invites.length)}</span>
                      </h3>
                    </header>

                    {invites.length === 0 ? (
                      <p className="pl-empty">No pending invites.</p>
                    ) : (
                      <ul className="pl-list">
                        {invites.map((i) => (
                          <InviteRow key={i.id} invite={i} onResend={resendInvite} onCancel={cancelInvite} />
                        ))}
                      </ul>
                    )}

                    {invites.length > 0 && (
                      <div className="pl-note">
                        <Icon name="Clock" size={ICON_SIZES.XS} color="#d97706" stroke="#d97706" />
                        <span>{INVITES.EXPIRY}</span>
                      </div>
                    )}
                  </Cards>

                  {/* Join requests */}
                  <Cards
                    id="pl-join-requests"
                    variant="base"
                    className="pl-card"
                    radius="lg"
                    bg="#ffffff"
                    border="1px solid #e6ecf5"
                    padding="22px 24px"
                  >
                    <header className="pl-card__head">
                      <h3 className="pl-card__title">
                        {REQUESTS.TITLE}
                        <span className="pl-badge pl-badge--info">{REQUESTS.NEW.replace("{n}", requests.length)}</span>
                      </h3>
                    </header>
                    <p className="pl-card__hint">{REQUESTS.SUBTITLE}</p>

                    {requests.length === 0 ? (
                      <p className="pl-empty">{REQUESTS.EMPTY}</p>
                    ) : (
                      <div className="pl-reqs">
                        {requests.map((r) => (
                          <RequestCard key={r.id} request={r} onAccept={acceptRequest} onDecline={declineRequest} />
                        ))}
                      </div>
                    )}
                  </Cards>
                </>
              )}

              {tab === "activity" && (
                <Cards variant="base" className="pl-card" radius="lg" bg="#ffffff" border="1px solid #e6ecf5" padding="22px 24px">
                  <header className="pl-card__head">
                    <h3 className="pl-card__title">{A.TITLE}</h3>
                  </header>
                  <ul className="pl-timeline">
                    {ACTIVITY.map((a) => (
                      <li key={a.id} className="pl-tl">
                        <span className="pl-tl__dot" style={{ backgroundColor: TONE[a.tone] }}>
                          <Icon name={a.icon} size={ICON_SIZES["2XS"]} color="#ffffff" stroke="#ffffff" />
                        </span>
                        <div>
                          <p className="pl-tl__text">{a.text}</p>
                          <span className="pl-tl__time">{a.time}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Cards>
              )}

              {(tab === "overview" || tab === "settings") && (
                <Cards variant="base" className="pl-card" radius="lg" bg="#ffffff" border="1px solid #e6ecf5" padding="22px 24px">
                  <header className="pl-card__head">
                    <h3 className="pl-card__title">{tab === "overview" ? TABS.OVERVIEW : TABS.SETTINGS}</h3>
                  </header>
                  <p className="pl-empty">
                    {tab === "overview"
                      ? "Overview is not designed yet — Members & Requests is the lead view."
                      : "Party settings are not designed yet."}
                  </p>
                </Cards>
              )}
            </div>

            {/* ================= Rail ================= */}
            <aside className="pl-rail">
              {/* Submission checklist */}
              <Cards variant="base" className="pl-card" radius="lg" bg="#ffffff" border="1px solid #e6ecf5" padding="20px">
                <h3 className="pl-rail__title">{C.TITLE}</h3>

                <ul className="pl-check">
                  {CHECKLIST.map((c) => (
                    <li key={c.key} className={`pl-check__row ${c.done ? "is-done" : ""}`}>
                      <span className="pl-check__mark">
                        {c.done ? (
                          <Icon name="CircleCheck" size={ICON_SIZES.SM} color="#16a34a" stroke="#16a34a" />
                        ) : (
                          <Icon name="Circle" size={ICON_SIZES.SM} color="#cbd5e1" stroke="#cbd5e1" />
                        )}
                      </span>
                      <span className="pl-check__text">
                        {c.text}
                        {c.note && <em className="pl-check__note">{c.note}</em>}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pl-progress">
                  <div className="pl-progress__row">
                    <span>{C.CONFIRMED_ROW}</span>
                    <span>
                      {confirmedCount} / {PARTY.memberLimit}
                    </span>
                  </div>
                  <div
                    className="pl-progress__track"
                    role="progressbar"
                    aria-valuenow={confirmedCount}
                    aria-valuemin={0}
                    aria-valuemax={PARTY.memberLimit}
                  >
                    <span className="pl-progress__fill" style={{ width: `${filled}%` }} />
                  </div>
                  <p className="pl-locked">
                    <Icon name="Lock" size={ICON_SIZES["2XS"]} color="#94a3b8" stroke="#94a3b8" />
                    {C.LOCKED.replace("{n}", needed)}
                  </p>
                  <p className="pl-rail__hint">{C.HINT}</p>
                </div>
              </Cards>

              {/* Member breakdown */}
              <Cards variant="base" className="pl-card" radius="lg" bg="#ffffff" border="1px solid #e6ecf5" padding="20px">
                <h3 className="pl-rail__title">{BREAKDOWN.TITLE}</h3>
                <ul className="pl-break">
                  <li><span>{BREAKDOWN.CONFIRMED}</span><b className="t-green">{confirmedCount}</b></li>
                  <li><span>{BREAKDOWN.PENDING}</span><b className="t-amber">{invites.length}</b></li>
                  <li><span>{BREAKDOWN.REQUESTS}</span><b className="t-blue">{requests.length}</b></li>
                  <li><span>{BREAKDOWN.OPEN}</span><b className="t-muted">{openSlots}</b></li>
                </ul>
              </Cards>

              {/* Party info */}
              <Cards variant="base" className="pl-card" radius="lg" bg="#ffffff" border="1px solid #e6ecf5" padding="20px">
                <header className="pl-card__head">
                  <h3 className="pl-rail__title">{INFO.TITLE}</h3>
                  <button type="button" className="pl-linkbtn">
                    <Icon name="Pencil" size={ICON_SIZES["2XS"]} color="#103ca4" stroke="#103ca4" />
                    {INFO.EDIT}
                  </button>
                </header>

                <ul className="pl-info">
                  <li><span>{INFO.CATEGORY}</span><b>{PARTY.category}</b></li>
                  <li><span>{INFO.VISIBILITY}</span><b>{PARTY.visibility}</b></li>
                  <li><span>{INFO.CHAT}</span><b>{PARTY.chat}</b></li>
                  <li><span>{INFO.AVAILABILITY}</span><b>{PARTY.availability}</b></li>
                </ul>

                <div className="pl-guild">
                  <span className="pl-guild__label">{INFO.GUILD_ID}</span>
                  <div className="pl-guild__row">
                    <code>{PARTY.guildId}</code>
                    <button
                      type="button"
                      className="pl-iconbtn pl-iconbtn--sm"
                      aria-label={INFO.COPY_ID}
                      onClick={copyGuildId}
                    >
                      <Icon name="Copy" size={ICON_SIZES.XS} color="#64748b" stroke="#64748b" />
                    </button>
                  </div>
                </div>
              </Cards>

              {/* Quick actions */}
              <Cards variant="base" className="pl-card" radius="lg" bg="#ffffff" border="1px solid #e6ecf5" padding="16px">
                <h3 className="pl-rail__title pl-rail__title--pad">{QA.TITLE}</h3>
                <ul className="pl-qa">
                  {QUICK_ACTIONS.map((a) => (
                    <li key={a.key}>
                      <button type="button" className={`pl-qa__btn pl-qa__btn--${a.tone}`}>
                        <Icon name={a.icon} size={ICON_SIZES.SM} color={TONE[a.tone]} stroke={TONE[a.tone]} />
                        <span>{a.label}</span>
                        <Icon name="ChevronRight" size={ICON_SIZES.XS} color="#94a3b8" stroke="#94a3b8" />
                      </button>
                    </li>
                  ))}
                </ul>
              </Cards>

              {/* Lead tips */}
              <Cards variant="base" className="pl-tips" radius="lg" bg="#eef4ff" border="1px solid #bfd2ff" padding="20px">
                <h3 className="pl-rail__title">
                  <Icon name="Lightbulb" size={ICON_SIZES.SM} color="#103ca4" stroke="#103ca4" />
                  {TIPS.TITLE}
                </h3>
                <ul className="pl-tips__list">
                  {LEAD_TIPS.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Cards>
            </aside>
          </div>
        </div>
      </ScrollArea>
    </DashboardLayout>
  );
}