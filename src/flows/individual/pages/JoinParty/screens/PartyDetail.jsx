// [TechGuild Update: 13-10-2026] Join Party — Step 2 party detail (Figma "2", node 197:6224)
import React from "react";
import { Cards, PrimaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { MemberAvatar, Stars } from "@/flows/shared/party/PartyUi";
import { RANK_TONES, shortLocation } from "../partyData";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import "./partydetail.css";

const { DETAIL } = APP_STRINGS.JOIN_PARTY;

export default function PartyDetail({ party, onRequest }) {
  const tone = RANK_TONES[party.rank] || RANK_TONES.F;
  const openCount = DETAIL.POSITIONS.filter((p) => p.open).length;

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <Cards
        variant="base"
        className="jd-hero"
        radius="md"
        bg="rgba(255,255,255,0.6)"
        border="1px solid #e7edf8"
        padding="28px"
      >
        <div className="jd-hero__main">
          <span className="jd-hero__avatar" style={{ backgroundColor: party.avatarColor }}>
            {party.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </span>
          <div className="jd-hero__ident">
            <div className="jd-hero__title">
              <h1 className="jd-hero__name">{party.name}</h1>
              {party.verified && (
                <span className="jd-hero__verified" aria-label="Verified">
                  <Icon name="CircleCheck" size={ICON_SIZES["2XL"]} color="#103ca4" stroke="#103ca4" />
                </span>
              )}
              <span className="jd-hero__rank" style={{ backgroundColor: tone.bg, color: tone.fg }}>
                Rank {party.rank}
              </span>
              {party.active && (
                <span className="jd-hero__active">
                  <span className="jd-hero__dot" />
                  Active
                </span>
              )}
            </div>
            <p className="jd-hero__sub">
              {party.tag} · {party.category} · {party.location}
            </p>
            <div className="jd-hero__facts">
              <span>
                <Stars value={party.rating} size={ICON_SIZES.XS} />
                <strong>{party.rating}</strong>
                <span className="jd-hero__muted">({party.reviewCount} reviews)</span>
              </span>
              <span>
                <Icon name="Users" size={ICON_SIZES.XS} color="#94a3b8" stroke="#94a3b8" />
                {party.members} Members
              </span>
              <span>
                <Icon name="Files" size={ICON_SIZES.XS} color="#94a3b8" stroke="#94a3b8" />
                {party.projects} Projects
              </span>
              <span>
                <Icon name="TrendingUp" size={ICON_SIZES.XS} color="#94a3b8" stroke="#94a3b8" />
                {party.success}% Success
              </span>
            </div>
          </div>
        </div>

        <div className="jd-hero__actions">
          <button type="button" className="jd-iconbtn" aria-label="Bookmark">
            <Icon name="Bookmark" size={ICON_SIZES.LG} color="#334155" stroke="#334155" />
          </button>
          <button type="button" className="jd-iconbtn" aria-label="Share">
            <Icon name="ExternalLink" size={ICON_SIZES.LG} color="#334155" stroke="#334155" />
          </button>
          <PrimaryButton className="jd-hero__cta" text={DETAIL.REQUEST_TITLE} onClick={onRequest} />
        </div>

        <div className="jd-stats">
          <Stat icon="Shield" value={party.trustPoints} label="Trust Points" />
          <Stat icon="Briefcase" value={party.projects} label="Projects Completed" />
          <Stat icon="Star" value={`${party.rating}★`} label="Avg. Rating" />
        </div>
      </Cards>

      {/* ---------------- About ---------------- */}
      <Cards variant="base" className="jd" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="26px">
        <h2 className="jd__title">{DETAIL.ABOUT_TITLE.replace("{party}", party.name)}</h2>
        <p className="jd__p">{party.about}</p>
        {party.aboutMore && <p className="jd__p">{party.aboutMore}</p>}
        <div className="jd__facts">
          <Fact icon="Globe" label={DETAIL.FACTS.VISIBILITY} value={party.visibility} />
          <Fact icon="MessageSquareMore" label={DETAIL.FACTS.COMMUNICATION} value={party.communication} />
          <Fact icon="Calendar" label={DETAIL.FACTS.AVAILABILITY} value={party.availability} />
          <Fact icon="Clock" label={DETAIL.FACTS.MEMBER_SINCE} value={party.since} />
          <Fact icon="MapPin" label={DETAIL.FACTS.LOCATION} value={shortLocation(party.location)} />
          <Fact icon="Hash" label={DETAIL.FACTS.PARTY_TAG} value={party.tag} />
        </div>
      </Cards>

      {/* ---------------- Open positions ---------------- */}
      <Cards variant="base" className="jd" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="26px">
        <div className="jd__head">
          <h2 className="jd__title">{DETAIL.LOOKING_FOR_TITLE}</h2>
          <span className="jd__meta">{DETAIL.OPEN_POSITIONS.replace("{n}", openCount)}</span>
        </div>
        <div className="jd__positions">
          {DETAIL.POSITIONS.map((p) => (
            <div key={p.key} className={`jd__position ${p.open ? "is-open" : "is-filled"}`}>
              <span className="jd__position-icon">
                <Icon name="Briefcase" size={ICON_SIZES.MD} color={p.open ? "#103ca4" : "#94a3b8"} stroke={p.open ? "#103ca4" : "#94a3b8"} />
              </span>
              <div className="jd__position-body">
                <p className="jd__position-title">{p.title}</p>
                <p className="jd__position-desc">{p.desc}</p>
              </div>
              <span className={`jd__tag ${p.open ? "jd__tag--open" : "jd__tag--filled"}`}>
                {p.open ? DETAIL.STATUS_OPEN : DETAIL.STATUS_FILLED}
              </span>
            </div>
          ))}
        </div>
      </Cards>

      {/* ---------------- Members ---------------- */}
      <Cards variant="base" className="jd" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="26px">
        <div className="jd__head">
          <h2 className="jd__title">{DETAIL.MEMBERS_TITLE}</h2>
          <span className="jd__meta">
            {party.members} / {party.memberLimit} · <strong className="jd__full">{DETAIL.MEMBERS_FULL}</strong>
          </span>
        </div>
        <div className="jd__members">
          {party.roster.map((m) => (
            <div key={m.id} className="jd__member">
              <MemberAvatar name={m.name} size={40} color={m.color} />
              <div className="jd__member-who">
                <p className="jd__member-name">
                  {m.name}
                  {m.lead && <span className="jd__leadpill">Party Lead</span>}
                </p>
                <p className="jd__member-sub">
                  {m.handle} · {m.role}
                </p>
              </div>
              <button type="button" className="jd-iconbtn jd-iconbtn--sm" aria-label={`Message ${m.name}`}>
                <Icon name="Mail" size={ICON_SIZES.MD} color="#64748b" stroke="#64748b" />
              </button>
            </div>
          ))}
        </div>
      </Cards>

      {/* ---------------- Skills ---------------- */}
      <Cards variant="base" className="jd" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="26px">
        <h2 className="jd__title">{DETAIL.SKILLS_TITLE}</h2>
        <div className="jd__skills">
          {party.skills.map((s) => (
            <span key={s} className="jd__skill">
              {s}
            </span>
          ))}
        </div>
      </Cards>

      {/* ---------------- Reviews ---------------- */}
      <Cards variant="base" className="jd" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="26px">
        <div className="jd__head">
          <h2 className="jd__title">{DETAIL.REVIEWS_TITLE}</h2>
          <span className="jd__rating">
            <Stars value={party.rating} size={ICON_SIZES.SM} />
            <strong>{party.rating}</strong>
            <span className="jd__meta">· {DETAIL.REVIEWS_SUMMARY.replace("{n}", party.reviewCount)}</span>
          </span>
        </div>
        <div className="jd__reviews">
          {party.reviews.map((r) => (
            <div key={r.id} className="jd__review">
              <MemberAvatar name={r.name} size={36} color={r.color} />
              <div className="jd__review-body">
                <p className="jd__review-name">{r.name}</p>
                <p className="jd__review-when">{r.when}</p>
                <p className="jd__review-text">{r.body}</p>
              </div>
              <Stars value={r.rating} size={ICON_SIZES.XS} />
            </div>
          ))}
        </div>
      </Cards>
    </>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="jd-stat">
      <span className="jd-stat__icon">
        <Icon name={icon} size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />
      </span>
      <div>
        <p className="jd-stat__value">{value}</p>
        <p className="jd-stat__label">{label}</p>
      </div>
    </div>
  );
}

function Fact({ icon, label, value }) {
  return (
    <div className="jd__fact">
      <dt>
        <Icon name={icon} size={ICON_SIZES.SM} color="#94a3b8" stroke="#94a3b8" />
        {label}
      </dt>
      <dd>{value}</dd>
    </div>
  );
}
