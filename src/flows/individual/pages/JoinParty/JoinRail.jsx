// [TechGuild Update: 13-10-2026] Join Party — right rail (browse + detail + request variants)
import React from "react";
import { useNavigate } from "react-router-dom";
import { Cards, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { MemberAvatar, Stars } from "@/flows/shared/party/PartyUi";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import { useDispatch } from "react-redux";
import { shortLocation } from "./partyData";
import { showSnackbar } from "@/store";
import "./joinrail.css";

const { RAIL_BROWSE, DETAIL, REQUEST, MOCK } = APP_STRINGS.JOIN_PARTY;

/** Green/amber/red checklist row with a progress bar underneath. */
export function RequirementList({ items, doneLabel }) {
  const met = items.filter((i) => i.met).length;
  const pct = Math.round((met / items.length) * 100);

  return (
    <>
      <ul className="jr__reqs">
        {items.map((i) => (
          <li key={i.key} className={`jr__req ${i.met ? "is-met" : "is-unmet"}`}>
            <span className="jr__req-icon">
              <Icon
                name={i.met ? "CircleCheck" : "TriangleAlert"}
                size={ICON_SIZES.MD}
                color={i.met ? "#00a63e" : "#e7000b"}
                stroke={i.met ? "#00a63e" : "#e7000b"}
              />
            </span>
            {i.label}
          </li>
        ))}
      </ul>
      <div className="jr__req-meta">
        <span>
          {met} / {items.length} {doneLabel}
        </span>
        <strong>{pct}%</strong>
      </div>
      <div className="jr__progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${pct}%` }} />
      </div>
    </>
  );
}

/* ==========================================================================
   Step 1 rail — Join Requirements / Your Skills / Tips
   ========================================================================== */
export function BrowseRail() {
  const navigate = useNavigate();
  return (
    <>
      <Cards variant="base" className="jr" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="22px">
        <h3 className="jr__title">{RAIL_BROWSE.REQUIREMENTS_TITLE}</h3>
        <RequirementList
          items={RAIL_BROWSE.REQUIREMENTS}
          doneLabel="completed"
        />
        <PrimaryButton
          className="jr__cta"
          text={RAIL_BROWSE.COMPLETE_PROFILE}
          icon={<Icon name="ArrowRight" size={ICON_SIZES.SM} color="#ffffff" stroke="#ffffff" />}
          iconPosition="right"
          onClick={() => navigate("/profile")}
        />
      </Cards>

      <Cards variant="base" className="jr" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="22px">
        <div className="jr__head">
          <h3 className="jr__title">{RAIL_BROWSE.SKILLS_TITLE}</h3>
          <button type="button" className="jr__link" onClick={() => navigate("/profile")}>
            {RAIL_BROWSE.EDIT}
          </button>
        </div>
        <div className="jr__chips">
          {MOCK.MY_SKILLS.map((s) => (
            <span key={s} className="jr__chip">
              {s}
            </span>
          ))}
        </div>
        <div className="jr__matched">
          <div>
            <span className="jr__matched-label">{RAIL_BROWSE.MATCHED_WITH}</span>
            <span className="jr__matched-value">{MOCK.MATCHED_PARTIES} Parties</span>
          </div>
          <span className="jr__matched-icon">
            <Icon name="Users" size={ICON_SIZES.LG} color="#103ca4" stroke="#103ca4" />
          </span>
        </div>
      </Cards>

      <Cards variant="base" className="jr jr--tips" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="22px">
        <div className="jr__head">
          <span className="jr__tipicon">
            <Icon name="Lightbulb" size={ICON_SIZES.LG} color="#f59e0b" stroke="#f59e0b" />
          </span>
          <h3 className="jr__title">{RAIL_BROWSE.TIPS_TITLE}</h3>
        </div>
        <p className="jr__tips-body">{RAIL_BROWSE.TIPS_BODY}</p>
      </Cards>
    </>
  );
}

/* ==========================================================================
   Step 2 rail — Request to Join / Party Lead / Party Info / Guild ID
   ========================================================================== */
export function DetailRail({ party, onRequest }) {
  return (
    <>
      <Cards variant="base" className="jr" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="22px">
        <h3 className="jr__title">{DETAIL.REQUEST_TITLE}</h3>
        <p className="jr__sub">
          {DETAIL.REQUEST_BODY.replace("{party}", party.name)}
        </p>
        <div className="jr__label">{DETAIL.ELIGIBILITY}</div>
        <RequirementList items={RAIL_BROWSE.REQUIREMENTS} doneLabel="requirements met" />
        <PrimaryButton
          className="jr__cta"
          text={DETAIL.REQUEST_TITLE}
          onClick={onRequest}
        />
        <p className="jr__note">{DETAIL.NOTIFIED}</p>
      </Cards>

      <Cards variant="base" className="jr" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="22px">
        <h3 className="jr__title">{DETAIL.LEAD_TITLE}</h3>
        <div className="jr__lead">
          <MemberAvatar name={party.roster[0].name} size={44} color={party.roster[0].color} />
          <div>
            <p className="jr__lead-name">{party.roster[0].name}</p>
            <p className="jr__lead-role">{party.roster[0].role}</p>
            <p className="jr__lead-handle">{party.roster[0].handle}</p>
          </div>
        </div>
        <div className="jr__lead-actions">
          <SecondaryButton className="jr__half" text={DETAIL.MESSAGE} />
          <SecondaryButton
            className="jr__half"
            text={DETAIL.VIEW_PROFILE}
            icon={<Icon name="ExternalLink" size={ICON_SIZES.XS} color="#334155" stroke="#334155" />}
            iconPosition="left"
          />
        </div>
      </Cards>

      <Cards variant="base" className="jr" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="22px">
        <h3 className="jr__title">{DETAIL.INFO_TITLE}</h3>
        <dl className="jr__facts">
          <Fact icon="Globe" label={DETAIL.FACTS.VISIBILITY} value={party.visibility} />
          <Fact icon="MessageSquareMore" label={DETAIL.FACTS.COMMUNICATION} value={party.communication} />
          <Fact icon="Calendar" label={DETAIL.FACTS.AVAILABILITY} value={party.availability} />
          <Fact icon="MapPin" label={DETAIL.FACTS.LOCATION} value={shortLocation(party.location)} />
          <Fact icon="Clock" label={DETAIL.FACTS.MEMBER_SINCE} value={party.since} />
        </dl>
      </Cards>

      <CopyIdCard id={party.guildId} label={DETAIL.GUILD_ID_LABEL} />
    </>
  );
}

function Fact({ icon, label, value }) {
  return (
    <div className="jr__fact">
      <dt>
        <Icon name={icon} size={ICON_SIZES.SM} color="#94a3b8" stroke="#94a3b8" />
        {label}
      </dt>
      <dd>{value}</dd>
    </div>
  );
}

export function CopyIdCard({ id, label }) {
  const dispatch = useDispatch();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      dispatch(showSnackbar({ message: "Copied", type: "success" }));
    } catch {
      dispatch(showSnackbar({ message: id, type: "info" }));
    }
  };
  return (
    <Cards variant="base" className="jr jr--id" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="18px 22px">
      <div className="jr__id">
        <div>
          <span className="jr__id-label">{label}</span>
          <span className="jr__id-value">{id}</span>
        </div>
        <button type="button" className="jr__id-copy" onClick={copy} aria-label={`Copy ${label}`}>
          <Icon name="Files" size={ICON_SIZES.MD} color="#64748b" stroke="#64748b" />
        </button>
      </div>
    </Cards>
  );
}

/* ==========================================================================
   Step 3 rail — Applying To / Skills Match / Eligibility / Tips
   ========================================================================== */
export function RequestRail({ party, matchPct }) {
  return (
    <>
      <Cards variant="base" className="jr" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="22px">
        <div className="jr__label">{REQUEST.APPLYING_TO}</div>
        <div className="jr__ident">
          <span className="jr__logo" style={{ backgroundColor: party.avatarColor }}>
            {party.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </span>
          <div>
            <div className="jr__ident-name">
              {party.name}
              {party.verified && <Icon name="CircleCheck" size={ICON_SIZES.SM} color="#103ca4" stroke="#103ca4" />}
            </div>
            <div className="jr__rating">
              <Stars value={party.rating} size={ICON_SIZES.XS} />
              <span className="jr__rating-value">
                {party.rating} · {party.reviewCount} reviews
              </span>
            </div>
          </div>
        </div>
        <dl className="jr__facts jr__facts--tight">
          <Fact icon="Users" label="Members" value={`${party.members} / ${party.memberLimit}`} />
          <Fact icon="Files" label="Projects" value={`${party.projects} completed`} />
          <Fact icon="TrendingUp" label="Success" value={`${party.success}%`} />
          <Fact icon="Star" label="Rank" value={`Rank ${party.rank}`} />
        </dl>
        <div className="jr__label">{PARTY_MEMBERS_LABEL}</div>
        <div className="jr__stack">
          {party.roster.slice(0, 5).map((m) => (
            <MemberAvatar key={m.id} name={m.name} size={26} ring color={m.color} />
          ))}
          {party.members > 5 && <span className="cp-avatar-stack__more jr__more">+{party.members - 5}</span>}
        </div>
      </Cards>

      <Cards variant="base" className="jr" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="22px">
        <div className="jr__head">
          <h3 className="jr__title">{REQUEST.MATCH_TITLE}</h3>
          <span className="jr__pill jr__pill--green">{matchPct}%</span>
        </div>
        <div className="jr__progress" role="progressbar" aria-valuenow={matchPct} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: `${matchPct}%`, backgroundColor: "#00a63e" }} />
        </div>
        <div className="jr__label jr__label--green">
          <Icon name="Check" size={ICON_SIZES.XS} color="#00a63e" stroke="#00a63e" strokeWidth={3} />
          {REQUEST.SKILLS_YOU_HAVE}
        </div>
        <div className="jr__chips">
          {MOCK.MY_SKILLS.slice(0, 2).map((s) => (
            <span key={s} className="jr__chip jr__chip--have">{s}</span>
          ))}
        </div>
        <div className="jr__label">{REQUEST.SKILLS_PARTY_NEEDS}</div>
        <div className="jr__chips">
          {party.skills.slice(0, 2).map((s) => (
            <span key={s} className="jr__chip">{s}</span>
          ))}
        </div>
      </Cards>

      <Cards variant="base" className="jr" radius="md" bg="rgba(255,255,255,0.6)" border="1px solid #e7edf8" padding="22px">
        <h3 className="jr__title">{REQUEST.ELIGIBILITY_TITLE}</h3>
        <RequirementList items={RAIL_BROWSE.REQUIREMENTS} doneLabel="requirements met" />
        <div className="jr__warn">
          <p className="jr__warn-title">
            <Icon name="TriangleAlert" size={ICON_SIZES.SM} color="#b45309" stroke="#b45309" />
            {REQUEST.PORTFOLIO_MISSING_TITLE}
          </p>
          <p className="jr__warn-body">{REQUEST.PORTFOLIO_MISSING_BODY}</p>
        </div>
      </Cards>

      <Cards variant="base" className="jr jr--tips" radius="md" bg="#eef4ff" border="1px solid #c7d7fe" padding="22px">
        <h3 className="jr__title jr__title--blue">
          <Icon name="Lightbulb" size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />
          {REQUEST.TIPS_TITLE}
        </h3>
        <ul className="jr__bullets">
          {REQUEST.TIPS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Cards>
    </>
  );
}

const PARTY_MEMBERS_LABEL = "Current Members";
