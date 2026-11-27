// [TechGuild Update: 13-10-2026] Join Party — party card used in the browse grid/list
import React from "react";
import { Cards, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { Stars } from "@/flows/shared/party/PartyUi";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import { RANK_TONES } from "./partyData";
import "./partycard.css";

const { BROWSE } = APP_STRINGS.JOIN_PARTY;

export default function PartyCard({ party, onView, onRequest }) {
  const tone = RANK_TONES[party.rank] || RANK_TONES.F;

  return (
    <Cards
      variant="base"
      className="jc"
      radius="md"
      bg="rgba(255,255,255,0.6)"
      border="1px solid #e7edf8"
      padding="22px"
    >
      <div className="jc__head">
        <span className="jc__avatar" style={{ backgroundColor: party.avatarColor }}>
          {party.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </span>
        <div className="jc__ident">
          <div className="jc__name">
            {party.name}
            {party.verified && (
              <span className="jc__verified" aria-label="Verified">
                <Icon name="CircleCheck" size={ICON_SIZES.SM} color="#103ca4" stroke="#103ca4" />
              </span>
            )}
          </div>
          <div className="jc__meta">
            {party.category}
            <span className="jc__sep">·</span>
            <Icon name="Users" size={ICON_SIZES["2XS"]} color="#94a3b8" stroke="#94a3b8" />
            {party.members} Members
          </div>
        </div>
        <span
          className="jc__rank"
          style={{ backgroundColor: tone.bg, color: tone.fg }}
        >
          Rank {party.rank}
        </span>
      </div>

      <div className="jc__rating">
        <Stars value={party.rating} size={ICON_SIZES.SM} />
        <span className="jc__rating-value">
          {party.rating} ({party.reviewCount})
        </span>
      </div>

      {party.lookingFor.length > 0 && (
        <>
          <p className="jc__label">{BROWSE.LOOKING_FOR}</p>
          <div className="jc__chips">
            {party.lookingFor.map((r) => (
              <span key={r} className="jc__chip jc__chip--role">
                {r}
              </span>
            ))}
          </div>
        </>
      )}

      <p className="jc__label">{BROWSE.SKILLS}</p>
      <div className="jc__chips">
        {party.skills.slice(0, 4).map((s) => (
          <span key={s} className="jc__chip">
            {s}
          </span>
        ))}
      </div>

      <p className="jc__about">{party.about}</p>

      <div className="jc__stats">
        <span>
          <Icon name="Files" size={ICON_SIZES.XS} color="#94a3b8" stroke="#94a3b8" />
          {party.activeQuests} Active Quests
        </span>
        <span>
          <Icon name="TrendingUp" size={ICON_SIZES.XS} color="#94a3b8" stroke="#94a3b8" />
          {party.success}% Success Rate
        </span>
      </div>

      <div className="jc__actions">
        <SecondaryButton
          className="jc__view"
          text={BROWSE.VIEW_PARTY}
          onClick={() => onView(party)}
        />
        <PrimaryButton
          className="jc__join"
          text={BROWSE.REQUEST_TO_JOIN}
          onClick={() => onRequest(party)}
        />
      </div>
    </Cards>
  );
}
