// [TechGuild Update: 23-10-2026] Party Management — member state
// (Figma "Party management Joined screen", node 230:1663). Reached from the
// applicant view once a join request is accepted (demo: ?accept=1 on
// /party-formation/applied). Member-only view — the lead's own dashboard is
// PARTY_LEAD / /party-formation/lead. Actions raise local snackbars until a
// teams API exists; Leave Party routes to the member leave screen.
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { ScrollArea } from "@/flows/shared/party/PartyUi";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import { showSnackbar } from "@/store";
import {
  PARTY,
  ME,
  STATS,
  QUESTS,
  MEMBERS,
  ACTIVITY,
  RANK_GOALS,
} from "./memberData";
import "./memberparty.css";

const { HEADER, HERO, TABS, QUESTS: Q, MEMBERS: M, ACTIVITY: A, PROFILE, RANK_PROGRESS, LEAD, INFO, QUICK_ACTIONS } =
  APP_STRINGS.PARTY_MEMBER;

/* Rail identity rows reuse the roster entries so "You" and "Lead" never drift
   from the frame data (roster id m2 = the member view, m1 = the lead). */
const YOU = MEMBERS.find((m) => m.isYou);
const LEAD_MEMBER = MEMBERS.find((m) => m.isLead);

const ACTIVITY_ICONS = {
  joined: { icon: "CircleCheck", bg: "#dcfce7", fg: "#16a34a" },
  progress: { icon: "TrendingUp", bg: "#eaf2ff", fg: "#075bff" },
  chat: { icon: "MessageSquareMore", bg: "#f4e8ff", fg: "#8028df" },
  quest: { icon: "Bell", bg: "#fff2d1", fg: "#b96b00" },
  review: { icon: "Star", bg: "#fff2d1", fg: "#ef8c00" },
};

const QA = [
  { key: "chat", label: "Open Party Chat", icon: "MessageSquareMore", color: "#075bff" },
  { key: "quests", label: "Browse Quests", icon: "Bookmark", color: "#8028df" },
  { key: "leaderboard", label: "View Leaderboard", icon: "Star", color: "#ef8c00" },
  { key: "leave", label: "Leave Party", icon: "LogOut", color: "#ef4444" },
];

export default function MemberParty() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("overview");

  const questCount = QUESTS.length;
  const memberCount = MEMBERS.length;

  const noop = () =>
    dispatch(showSnackbar({ message: "Demo screen — no endpoint yet." }));

  const quickAction = {
    chat: noop,
    quests: noop,
    leaderboard: noop,
    // A member leaving = the plain member-variant screen. Delete is lead-only.
    leave: () => navigate("/party-formation/leave"),
  };

  const panels = {
      quests: (
        <Cards
          variant="base"
          className="pmb-panel"
          radius="md"
          bg="#ffffff"
          border="1px solid #e6ecf5"
          padding="24px"
        >
          <div className="pmb-panel__head">
            <h3 className="pmb-panel__title">{Q.TITLE}</h3>
            <button type="button" className="pmb-solid" onClick={noop}>
              <Icon name="Plus" size={ICON_SIZES.SM} color="#ffffff" stroke="#ffffff" strokeWidth={2.2} />
              {Q.NEW}
            </button>
          </div>

          <ul className="pmb-quests">
            {QUESTS.map((q) => (
              <li key={q.id} className="pmb-quest">
                <div className="pmb-quest__head">
                  <span className="pmb-quest__tile">
                    <Icon name="Briefcase" size={ICON_SIZES.MD} color="#075bff" stroke="#075bff" />
                  </span>
                  <div>
                    <div className="pmb-quest__title">{q.title}</div>
                    <div className="pmb-quest__client">
                      {Q.META.replace("{client}", q.client).replace("{budget}", q.budget)}
                    </div>
                  </div>
                  <div className="pmb-quest__end">
                    <span
                      className={`pmb-status ${q.statusKey === "progress" ? "pmb-status--amber" : "pmb-status--purple"}`}
                    >
                      {q.statusKey === "progress" ? Q.STATUS_PROGRESS : Q.STATUS_STARTED}
                    </span>
                    <span className="pmb-quest__due">
                      <Icon name="Clock" size={ICON_SIZES["2XS"]} color="#94a3b8" stroke="#94a3b8" />
                      {Q.DUE.replace("{date}", q.due)}
                    </span>
                  </div>
                </div>

                <div className="pmb-quest__chips">
                  {q.skills.map((s) => (
                    <span key={s} className="pmb-tag">
                      {s}
                    </span>
                  ))}
                  <span className="pmb-tag pmb-tag--you">
                    {Q.YOUR_ROLE.replace("{role}", q.role)}
                  </span>
                </div>

                <div className="pmb-quest__progress">
                  <span className="pmb-quest__progress-label">{Q.PROGRESS}</span>
                  <div className="pmb-bar">
                    <span className="pmb-bar__fill" style={{ width: `${q.progress}%` }} />
                  </div>
                  <span className="pmb-quest__pct">{q.progress}%</span>
                </div>
              </li>
            ))}
          </ul>
        </Cards>
      ),
      members: (
        <Cards
          variant="base"
          className="pmb-panel"
          radius="md"
          bg="#ffffff"
          border="1px solid #e6ecf5"
          padding="24px"
        >
          <div className="pmb-panel__head">
            <h3 className="pmb-panel__title">{M.TITLE}</h3>
            <button type="button" className="pmb-viewall" onClick={noop}>
              {M.VIEW_ALL}
              <Icon name="ArrowRight" size={ICON_SIZES.SM} color="#103ca4" stroke="#103ca4" />
            </button>
          </div>

          <ul className="pmb-members">
            {MEMBERS.map((m) => (
              <li
                key={m.id}
                className={`pmb-member ${m.isYou ? "pmb-member--you" : ""}`}
              >
                <span className="pmb-avatar" style={{ backgroundColor: m.color }}>
                  {m.initials}
                </span>
                <div className="pmb-member__ident">
                  <div className="pmb-member__name">
                    {m.name}
                    {m.isLead && <span className="pmb-chip pmb-chip--lead">{M.LEAD_CHIP}</span>}
                    {m.isYou && <span className="pmb-you">{M.YOU}</span>}
                  </div>
                  <div className="pmb-member__role">
                    {m.role} · {m.handle}
                  </div>
                </div>
                <span className={`pmb-online ${m.online ? "" : "pmb-online--off"}`}>
                  <i />
                  {m.online ? M.ONLINE : M.OFFLINE}
                </span>
                <button
                  type="button"
                  className="pmb-member__open"
                  aria-label={m.name}
                  onClick={noop}
                >
                  <Icon name="ExternalLink" size={ICON_SIZES.XS} color="#94a3b8" stroke="#94a3b8" />
                </button>
              </li>
            ))}
          </ul>
        </Cards>
      ),
      activity: (
        <Cards
          variant="base"
          className="pmb-panel"
          radius="md"
          bg="#ffffff"
          border="1px solid #e6ecf5"
          padding="24px"
        >
          <div className="pmb-panel__head">
            <h3 className="pmb-panel__title">{A.TITLE}</h3>
          </div>
          <ul className="pmb-activity">
            {ACTIVITY.map((a) => {
              const tone = ACTIVITY_ICONS[a.key];
              return (
                <li key={a.key} className="pmb-activity__row">
                  <span className="pmb-activity__tile" style={{ backgroundColor: tone.bg }}>
                    <Icon name={tone.icon} size={ICON_SIZES.SM} color={tone.fg} stroke={tone.fg} />
                  </span>
                  <p className="pmb-activity__text">{a.text}</p>
                  <span className="pmb-activity__time">{a.time}</span>
                </li>
              );
            })}
          </ul>
        </Cards>
      ),
  };

  return (
    <DashboardLayout searchPlaceholder={HEADER.SEARCH_PLACEHOLDER}>
      <ScrollArea>
        <div className="pmb-page">
          {/* ---------------- Page head ---------------- */}
          <div className="pmb-headrow">
            <div className="pmb-head">
              <h1 className="pmb-title">{HEADER.TITLE}</h1>
              <p className="pmb-sub">
                {HEADER.SUBTITLE.replace("{party}", PARTY.name)}
              </p>
            </div>
            <div className="pmb-headactions">
              <button
                type="button"
                className="pmb-iconbtn"
                aria-label="Refresh"
                onClick={noop}
              >
                <Icon name="Settings" size={ICON_SIZES.SM} color="#0f172a" stroke="#0f172a" />
              </button>
              <button type="button" className="pmb-how" onClick={noop}>
                <span className="pmb-how__dot" aria-hidden="true" />
                {HEADER.HOW_IT_WORKS}
              </button>
            </div>
          </div>

          {/* ---------------- Hero ---------------- */}
          <Cards
            variant="base"
            className="pmb-hero"
            radius="md"
            bg="#f2f7ff"
            border="1px solid #dbe7f8"
            padding="24px 28px"
          >
            <div className="pmb-hero__row">
              <div className="pmb-hero__ident">
                <span className="pmb-hero__logo" style={{ backgroundColor: PARTY.logoColor }}>
                  {PARTY.initials}
                </span>
                <div>
                  <div className="pmb-hero__name">
                    {PARTY.name}
                    <span className="pmb-chip pmb-chip--rank">Rank {PARTY.rank}</span>
                    <span className="pmb-chip pmb-chip--live">
                      <Icon name="CircleCheck" size={ICON_SIZES["2XS"]} color="#16a34a" stroke="#16a34a" />
                      {HERO.ACTIVE}
                    </span>
                  </div>
                  <div className="pmb-hero__meta">
                    {PARTY.tag} · {PARTY.category} · {PARTY.location}
                  </div>
                  <div className="pmb-pill">
                    {HERO.ROLE_YOU.replace("{role}", ME.role)}
                    <span className="pmb-pill__dot" aria-hidden="true" />
                    {HERO.JOINED.replace("{when}", ME.joinedAt)}
                  </div>
                </div>
              </div>

              <div className="pmb-hero__stats">
                {STATS.map((s) => (
                  <div key={s.key} className="pmb-stat">
                    <span className="pmb-stat__value">{s.value}</span>
                    <span className="pmb-stat__label">
                      {HERO.STATS[s.key.toUpperCase()]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Cards>

          {/* ---------------- Tabs ---------------- */}
          <nav className="pmb-tabs" role="tablist">
            {[
              ["overview", TABS.OVERVIEW],
              ["quests", TABS.QUESTS.replace("{n}", questCount)],
              ["members", TABS.MEMBERS.replace("{n}", memberCount)],
              ["activity", TABS.ACTIVITY],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                className={`pmb-tab ${tab === key ? "is-active" : ""}`}
                onClick={() => setTab(key)}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* ---------------- Main + rail ---------------- */}
          <div className="pmb-layout">
            <div className="pmb-main">
              {tab === "overview" && (
                <>
                  {panels.quests}
                  {panels.members}
                  {panels.activity}
                </>
              )}
              {tab === "quests" && panels.quests}
              {tab === "members" && panels.members}
              {tab === "activity" && panels.activity}
            </div>

            <aside className="pmb-rail">
              {/* Your Party Profile */}
              <Cards
                variant="base"
                className="pmb-card"
                radius="md"
                bg="#ffffff"
                border="1px solid #e6ecf5"
                padding="20px"
              >
                <h3 className="pmb-card__title">{PROFILE.TITLE}</h3>
                <div className="pmb-card__me">
                  <span className="pmb-avatar" style={{ backgroundColor: YOU.color }}>
                    {YOU.initials}
                  </span>
                  <div>
                    <div className="pmb-card__name">{YOU.name}</div>
                    <div className="pmb-card__handle">{PROFILE.ROLE}: {ME.role}</div>
                    <div className="pmb-card__handle">{YOU.handle}</div>
                  </div>
                </div>
                <dl className="pmb-rows">
                  <div className="pmb-row"><dt>{PROFILE.ROLE}</dt><dd>{ME.role}</dd></div>
                  <div className="pmb-row"><dt>{PROFILE.TRUST_POINTS}</dt><dd>{ME.trustPoints}</dd></div>
                  <div className="pmb-row"><dt>{PROFILE.JOINED}</dt><dd>{ME.joinedAt}</dd></div>
                  <div className="pmb-row"><dt>{PROFILE.CURRENT_RANK}</dt><dd>{PROFILE.IN_PROGRESS}</dd></div>
                </dl>
              </Cards>

              {/* Rank progress */}
              <Cards
                variant="base"
                className="pmb-card"
                radius="md"
                bg="#ffffff"
                border="1px solid #e6ecf5"
                padding="20px"
              >
                <div className="pmb-card__headrow">
                  <h3 className="pmb-card__title">{RANK_PROGRESS.TITLE}</h3>
                  <span className="pmb-chip pmb-chip--rank">
                    {RANK_PROGRESS.BADGE}
                  </span>
                </div>
                <p className="pmb-card__sub">{RANK_PROGRESS.SUB}</p>
                <ul className="pmb-goals">
                  {RANK_GOALS.map((g) => (
                    <li key={g.text} className="pmb-goal">
                      <Icon name="CircleCheck" size={ICON_SIZES.SM} color="#16a34a" stroke="#16a34a" />
                      <span>{g.text}</span>
                      {g.value && <b>{g.value}</b>}
                    </li>
                  ))}
                </ul>
              </Cards>

              {/* Party Lead */}
              <Cards
                variant="base"
                className="pmb-card"
                radius="md"
                bg="#ffffff"
                border="1px solid #e6ecf5"
                padding="20px"
              >
                <h3 className="pmb-card__title">{LEAD.TITLE}</h3>
                <div className="pmb-card__me">
                  <span className="pmb-avatar pmb-avatar--sm" style={{ backgroundColor: LEAD_MEMBER.color }}>
                    {LEAD_MEMBER.initials}
                  </span>
                  <div>
                    <div className="pmb-card__name">{LEAD_MEMBER.name}</div>
                    <div className="pmb-card__handle">{M.ROLE_LEAD}</div>
                  </div>
                </div>
                <button type="button" className="pmb-message" onClick={noop}>
                  <Icon name="Mail" size={ICON_SIZES.SM} color="#103ca4" stroke="#103ca4" />
                  {LEAD.MESSAGE}
                </button>
              </Cards>

              {/* Party Info */}
              <Cards
                variant="base"
                className="pmb-card"
                radius="md"
                bg="#ffffff"
                border="1px solid #e6ecf5"
                padding="20px"
              >
                <h3 className="pmb-card__title">{INFO.TITLE}</h3>
                <dl className="pmb-rows">
                  <div className="pmb-row"><dt>{INFO.VISIBILITY}</dt><dd>{PARTY.visibility}</dd></div>
                  <div className="pmb-row"><dt>{INFO.CHAT}</dt><dd>{PARTY.chat}</dd></div>
                  <div className="pmb-row"><dt>{INFO.AVAILABILITY}</dt><dd>{PARTY.availability}</dd></div>
                  <div className="pmb-row">
                    <dt>{INFO.GUILD_ID}</dt>
                    <dd className="pmb-row__code">
                      {PARTY.guildId}
                      <button
                        type="button"
                        className="pmb-copy"
                        aria-label={INFO.COPY_ID}
                        onClick={() => {
                          navigator.clipboard?.writeText(PARTY.guildId).catch(() => {});
                          dispatch(showSnackbar({ message: INFO.COPIED }));
                        }}
                      >
                        <Icon name="Copy" size={ICON_SIZES.XS} color="#64748b" stroke="#64748b" />
                      </button>
                    </dd>
                  </div>
                </dl>
              </Cards>

              {/* Quick actions */}
              <Cards
                variant="base"
                className="pmb-card"
                radius="md"
                bg="#ffffff"
                border="1px solid #e6ecf5"
                padding="20px"
              >
                <h3 className="pmb-card__title">{QUICK_ACTIONS.TITLE}</h3>
                <ul className="pmb-qa">
                  {QA.map((a) => (
                    <li key={a.key}>
                      <button
                        type="button"
                        className={`pmb-qa__btn ${a.key === "leave" ? "pmb-qa__btn--leave" : ""}`}
                        onClick={quickAction[a.key]}
                      >
                        <Icon
                          name={a.icon}
                          size={ICON_SIZES.SM}
                          color={a.color}
                          stroke={a.color}
                        />
                        <span>{a.label}</span>
                        <Icon
                          name="ChevronRight"
                          size={ICON_SIZES["2XS"]}
                          color="#94a3b8"
                          stroke="#94a3b8"
                        />
                      </button>
                    </li>
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
