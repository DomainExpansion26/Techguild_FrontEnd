// [TechGuild Update: 23-10-2026] Party Management — applicant state
// (Figma "Party management for Applied party screen", node 230:1216).
// Shown after a join request is submitted and until a party responds, via the
// Join wizard's "Go to Party Management" action. Ornamental icons in the hero
// (chat card + hourglass) are decorative like the frame; only the two darker
// rows are interactive, and all actions raise local snackbars (no API yet).
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { ScrollArea } from "@/flows/shared/party/PartyUi";
import PartyCard from "@/flows/individual/pages/JoinParty/PartyCard";
import { PARTIES } from "@/flows/individual/pages/JoinParty/partyData";
import { setPartyStatus, PARTY_STATUS } from "@/flows/shared/party/partyStatus";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import { showSnackbar } from "@/store";
import { RANK_TONES } from "@/flows/individual/pages/JoinParty/partyData";
import { APPLICATIONS, STATUS_STYLES, EXPLORE_IDS } from "./appliedData";
import "./appliedparty.css";

const { HEADER, HERO, APPLICATIONS: A, EXPLORE, TIP, MESSAGES } =
  APP_STRINGS.PARTY_APPLIED;

const STATUS_ICONS = {
  review: "Clock",
  pending: "CircleQuestionMark",
  info: "Bell",
};

export default function AppliedParty() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* Demo shortcut for the (not-yet-existing) acceptance callback:
     /party-formation/applied?accept=1 flips the status to member and lands on
     the joined screen so the whole transition is visible locally. */
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("accept")) {
      setPartyStatus(PARTY_STATUS.MEMBER);
      navigate("/party-formation/member", { replace: true });
    }
  }, [navigate]);

  const explore = useMemo(
    () =>
      EXPLORE_IDS.map((id) => PARTIES.find((p) => p.id === id)).filter(Boolean),
    [],
  );

  const noop = () =>
    dispatch(showSnackbar({ message: MESSAGES.WITHDRAWN.body }));

  return (
    <DashboardLayout searchPlaceholder={HEADER.SEARCH_PLACEHOLDER}>
      <ScrollArea>
        <div className="pa-page">
          {/* ---------------- Page head ---------------- */}
          <div className="pa-head">
            <h1 className="pa-title">{HEADER.TITLE}</h1>
            <p className="pa-sub">{HEADER.SUBTITLE}</p>
          </div>

          {/* ---------------- Blue hero card ---------------- */}
          <Cards
            variant="base"
            className="pa-hero"
            radius="md"
            bg="#eaf2ff"
            border="1px solid #dbe7f8"
            padding="28px 32px"
          >
            <div className="pa-hero__row">
              <div className="pa-hero__text">
                <button
                  type="button"
                  className="pa-hero__switch"
                  onClick={noop}
                  aria-label={HERO.SWITCH}
                >
                  {HERO.SWITCH}
                  <Icon
                    name="ChevronDown"
                    size={ICON_SIZES["2XS"]}
                    color="#075bff"
                    stroke="#075bff"
                    strokeWidth={2}
                  />
                </button>
                <h2 className="pa-hero__title">
                  {HERO.TITLE.replace("{n}", APPLICATIONS.length)}
                </h2>
                <p className="pa-hero__body">{HERO.BODY}</p>
              </div>

              {/* Decoration — matches the frame's chat-card + hourglass cluster */}
              <div className="pa-hero__art" aria-hidden="true">
                <span className="pa-hero__arrow">
                  <Icon name="ArrowRight" size={16} color="#93b4f0" stroke="#93b4f0" />
                </span>
                <span className="pa-hero__tile">
                  <Icon name="Send" size={26} color="#075bff" stroke="#075bff" />
                  <span className="pa-hero__chat">
                    <span style={{ backgroundColor: "#2563eb" }} />
                    <span style={{ backgroundColor: "#a855f7" }} />
                    <span style={{ backgroundColor: "#22c55e" }} />
                  </span>
                </span>
                <span className="pa-hero__bell">
                  <Icon name="Clock" size={22} color="#93b4f0" stroke="#93b4f0" />
                </span>
              </div>
            </div>
          </Cards>

          {/* ---------------- Your Applications ---------------- */}
          <Cards
            variant="base"
            className="pa-panel"
            radius="md"
            bg="#ffffff"
            border="1px solid #e2e9f4"
            padding="28px 28px"
          >
            <div className="pa-panel__head">
              <h3 className="pa-panel__title">
                {A.TITLE}
                <span className="pa-badge">{APPLICATIONS.length}</span>
              </h3>
            </div>

            <ul className="pa-apps">
              {APPLICATIONS.map((a) => {
                const tone = STATUS_STYLES[a.statusKey];
                const rank = RANK_TONES[a.rank] || RANK_TONES.E;
                const actionText =
                  a.actionKey === "respond" ? A.ACTION_RESPOND : A.ACTION_VIEW;
                return (
                  <li key={a.id} className="pa-app">
                    <span
                      className="pa-app__logo"
                      style={{ backgroundColor: a.color }}
                    >
                      {a.initials}
                    </span>

                    <div className="pa-app__ident">
                      <div className="pa-app__name">{a.name}</div>
                      <div className="pa-app__tagline">{a.tagline}</div>
                      <div className="pa-app__facts">
                        <span>
                          <Icon
                            name="Users"
                            size={ICON_SIZES["2XS"]}
                            color="#93a3c0"
                            stroke="#93a3c0"
                          />
                          {a.members} members
                        </span>
                        <span
                          className="pa-chip"
                          style={{ backgroundColor: rank.bg, color: rank.fg }}
                        >
                          Rank {a.rank}
                        </span>
                      </div>
                    </div>

                    <div className="pa-app__when">
                      <span className="pa-app__applied">
                        Applied {a.appliedWhen}
                      </span>
                      <span className="pa-app__date">{a.date}</span>
                    </div>

                    <span
                      className="pa-chip pa-chip--status"
                      style={{ backgroundColor: tone.bg, color: tone.fg }}
                    >
                      <Icon
                        name={STATUS_ICONS[a.statusKey]}
                        size={ICON_SIZES.XS}
                        color={tone.fg}
                        stroke={tone.fg}
                      />
                      {a.statusKey === "review" && A.STATUS_REVIEW}
                      {a.statusKey === "pending" && A.STATUS_PENDING}
                      {a.statusKey === "info" && A.STATUS_INFO}
                    </span>

                    <button
                      type="button"
                      className="pa-app__action"
                      onClick={noop}
                    >
                      {actionText}
                      <Icon
                        name="ChevronRight"
                        size={ICON_SIZES.SM}
                        color="#075bff"
                        stroke="#075bff"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="pa-strip">
              <Icon
                name="CircleQuestionMark"
                size={ICON_SIZES.SM}
                color="#075bff"
                stroke="#075bff"
              />
              <p>{A.NOTE}</p>
            </div>
          </Cards>

          {/* ---------------- Explore More Parties ---------------- */}
          <Cards
            variant="base"
            className="pa-panel"
            radius="md"
            bg="#ffffff"
            border="1px solid #e2e9f4"
            padding="28px 28px"
          >
            <div className="pa-panel__head pa-panel__head--split">
              <div>
                <h3 className="pa-panel__title">{EXPLORE.TITLE}</h3>
                <p className="pa-panel__sub">{EXPLORE.SUB}</p>
              </div>
              <button type="button" className="pa-linkout" onClick={noop}>
                {EXPLORE.VIEW_ALL}
                <Icon
                  name="ArrowRight"
                  size={ICON_SIZES.SM}
                  color="#075bff"
                  stroke="#075bff"
                />
              </button>
            </div>

            <div className="pa-explore">
              {explore.map((p) => (
                <PartyCard key={p.id} party={p} onView={noop} onRequest={noop} />
              ))}
            </div>

            <div className="pa-strip">
              <Icon
                name="Lightbulb"
                size={ICON_SIZES.SM}
                color="#f59e0b"
                stroke="#f59e0b"
              />
              <p>{TIP.TEXT}</p>
              <button type="button" className="pa-strip__cta" onClick={noop}>
                {TIP.CTA}
                <Icon
                  name="ArrowRight"
                  size={ICON_SIZES.SM}
                  color="#075bff"
                  stroke="#075bff"
                />
              </button>
            </div>
          </Cards>
        </div>
      </ScrollArea>
    </DashboardLayout>
  );
}
