/* [TechGuild Update: 13-10-2026] Individual Party Formation landing page — Figma "Party Formation" (1440x1979) */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout, Cards, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import partyHero from "@/assets/party-hero.jpg";
import { ScrollArea } from "@/flows/shared/party/PartyUi";
import "./PartyFormation.css";

const { PAGE, HERO, RANK_PROGRESSION, BENEFITS, HOW_IT_WORKS, CTA } = APP_STRINGS.PARTY;

/**
 * Rank-progression step circle. Renders a letter (F / E) or an icon, tinted per step tone.
 */
function RankNode({ letter, icon, tone }) {
  return (
    <div
      className="pf-rank-node"
      style={{ backgroundColor: tone.bg, borderColor: tone.border }}
    >
      {icon ? (
        <Icon name={icon} size={ICON_SIZES["2XL"]} color={tone.color} stroke={tone.color} />
      ) : (
        <span className="pf-rank-node__letter" style={{ color: tone.color }}>
          {letter}
        </span>
      )}
    </div>
  );
}

/**
 * Horizontal "How it works" step: numbered icon bubble, title, description.
 */
function ProcessStep({ step, index }) {
  return (
    <div className="pf-step">
      <div className={`pf-step__icon pf-step__icon--${step.tone}`}>
        <Icon name={step.icon} size={ICON_SIZES.XL} color={step.iconColor} stroke={step.iconColor} />
        <span className="pf-step__badge">{index + 1}</span>
      </div>
      <h4 className="pf-step__title">{step.title}</h4>
      <p className="pf-step__desc">{step.description}</p>
    </div>
  );
}

export default function PartyFormation() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Accent palette read straight off the Figma vector strokes (run_script on node 190:96).
  // Do NOT substitute Tailwind-ish equivalents — they read visibly different.
  // Rank rings are the accent colour at 19% paint opacity over a 2px stroke.
  const rankTones = {
    "rank": { color: "#103ca4", bg: "#eff6ff", border: "rgba(16, 60, 164, 0.19)" },
    "projects": { color: "#16a34a", bg: "#f0fdf4", border: "rgba(22, 163, 74, 0.19)" },
    "party": { color: "#949292", bg: "#eef2ff", border: "rgba(124, 58, 237, 0.19)" },
    "next-rank": { color: "#ea580c", bg: "#fff7ed", border: "rgba(234, 88, 12, 0.19)" },
  };

  const benefitTones = [
    { bg: "#f3e8ff", color: "#9810fa" },
    { bg: "#dcfce7", color: "#00a63e" },
    { bg: "#ffedd4", color: "#f54900" },
    { bg: "#ffe2e2", color: "#e7000b" },
  ];

  const stepTones = [
    { tone: "purple", iconColor: "#9810fa" },
    { tone: "blue", iconColor: "#103ca4" },
    { tone: "green", iconColor: "#00a63e" },
    { tone: "orange", iconColor: "#f54900" },
    { tone: "purple", iconColor: "#9810fa" },
    { tone: "green", iconColor: "#00a63e" },
  ];

  const processSteps = HOW_IT_WORKS.STEPS.map((step, i) => ({ ...step, ...stepTones[i] }));

  return (
    <DashboardLayout
      searchPlaceholder={PAGE.SEARCH_PLACEHOLDER}
      searchValue={search}
      onSearchChange={(e) => setSearch(e?.target?.value ?? e)}
    >
      <ScrollArea>
        <div className="pf-page">
        {/* ---------- Page heading ---------- */}
        <div className="pf-page__head">
          <div className="pf-page__head-text">
            <h1 className="pf-page__title">{PAGE.TITLE}</h1>
            <p className="pf-page__subtitle">
              {PAGE.SUBTITLE_LINE1}
              <br />
              {PAGE.SUBTITLE_LINE2}
            </p>
          </div>
          <button
            type="button"
            className="pf-page__link"
            onClick={() => {
              document.getElementById("pf-how-it-works")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {PAGE.HOW_IT_WORKS_LINK}
          </button>
        </div>

        {/* ---------- Hero: create or join ---------- */}
        <section
          className="pf-hero"
          style={{ "--pf-hero-image": `url(${partyHero})` }}
          aria-label={HERO.HEADING}
        >
          <div className="pf-hero__body">
            <div className="pf-hero__copy">
              <h2 className="pf-hero__heading">
                You are not part of
                <br />
                any party yet.
              </h2>
              <p className="pf-hero__desc">{HERO.DESCRIPTION}</p>
              <p className="pf-hero__tagline">{HERO.TAGLINE}</p>
            </div>

            <div className="pf-hero__actions">
              <PrimaryButton
                className="pf-hero__btn pf-hero__btn--primary"
                icon={<Icon name="Plus" size={ICON_SIZES.MD} color="#ffffff" stroke="#ffffff" />}
                iconPosition="left"
                onClick={() => navigate("/party-formation/create")}
              >
                <span className="pf-hero__btn-text">
                  <span className="pf-hero__btn-title">{HERO.CREATE.TITLE}</span>
                  <span className="pf-hero__btn-desc">{HERO.CREATE.DESCRIPTION}</span>
                </span>
              </PrimaryButton>
              <SecondaryButton
                className="pf-hero__btn pf-hero__btn--secondary"
                icon={<Icon name="UserPlus" size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />}
                iconPosition="left"
                onClick={() => navigate("/party-formation/join")}
              >
                <span className="pf-hero__btn-text">
                  <span className="pf-hero__btn-title">{HERO.JOIN.TITLE}</span>
                  <span className="pf-hero__btn-desc">{HERO.JOIN.DESCRIPTION}</span>
                </span>
              </SecondaryButton>
            </div>
          </div>
        </section>

        {/* ---------- Rank progression ---------- */}
        <Cards
          variant="base"
          className="pf-card pf-rank-card"
          radius="md"
          bg="rgba(255,255,255,0.6)"
          border="1px solid #e7edf8"
          padding="40px"
        >
          <h3 className="pf-card__title">{RANK_PROGRESSION.TITLE}</h3>

          <div className="pf-callout">
            <Icon name="CircleQuestionMark" size={ICON_SIZES.DEFAULT} color="#103ca4" stroke="#103ca4" />
            <div className="pf-callout__text">
              <p className="pf-callout__title">{RANK_PROGRESSION.NOTICE}</p>
              <p className="pf-callout__sub">{RANK_PROGRESSION.NOTICE_SUB}</p>
            </div>
          </div>

          <div className="pf-track">
            {RANK_PROGRESSION.STEPS.map((step, index) => (
              <React.Fragment key={step.key}>
                {index > 0 && (
                  <div className="pf-track__connector" aria-hidden="true">
                    <span className="pf-track__line" />
                    <span className="pf-track__arrow">&rarr;</span>
                    <span className="pf-track__line" />
                  </div>
                )}
                <div className="pf-track__step">
                  <RankNode letter={step.letter} icon={step.icon} tone={rankTones[step.key]} />
                  <p className="pf-track__label">{step.label}</p>
                  <p className="pf-track__sub">{step.sub}</p>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="pf-callout pf-callout--muted">
            <Icon name="CircleQuestionMark" size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />
            <div className="pf-callout__text">
              <p className="pf-callout__title pf-callout__title--sm">{RANK_PROGRESSION.IMPORTANT_LABEL}</p>
              <p className="pf-callout__sub">{RANK_PROGRESSION.IMPORTANT_TEXT}</p>
            </div>
          </div>
        </Cards>

        {/* ---------- Benefits ---------- */}
        <section className="pf-section">
          <h2 className="pf-section__title">{BENEFITS.TITLE}</h2>
          <div className="pf-benefits">
            {BENEFITS.ITEMS.map((item, index) => (
              <Cards
                key={item.key}
                variant="base"
                className="pf-card pf-benefit"
                radius="md"
                bg="rgba(255,255,255,0.6)"
                border="1px solid #e7edf8"
                padding="28px"
              >
                <span
                  className="pf-benefit__icon"
                  style={{ backgroundColor: benefitTones[index].bg }}
                >
                  <Icon
                    name={item.icon}
                    size={ICON_SIZES["2XL"]}
                    color={benefitTones[index].color}
                    stroke={benefitTones[index].color}
                  />
                </span>
                <h3 className="pf-benefit__title">{item.title}</h3>
                <p className="pf-benefit__desc">{item.description}</p>
              </Cards>
            ))}
          </div>
        </section>

        {/* ---------- How it works ---------- */}
        <Cards
          variant="base"
          id="pf-how-it-works"
          className="pf-card pf-process"
          radius="md"
          bg="rgba(255,255,255,0.6)"
          border="1px solid #e7edf8"
          padding="40px"
        >
          <h3 className="pf-card__title">{HOW_IT_WORKS.TITLE}</h3>
          <div className="pf-process__row">
            {processSteps.map((step, index) => (
              <React.Fragment key={step.key}>
                {index > 0 && (
                  <span className="pf-process__arrow" aria-hidden="true">
                    &rarr;
                  </span>
                )}
                <ProcessStep step={step} index={index} />
              </React.Fragment>
            ))}
          </div>
        </Cards>

        {/* ---------- CTA ---------- */}
        <section className="pf-cta">
          <div className="pf-cta__left">
            <span className="pf-cta__icon">
              <Icon name="Shield" size={ICON_SIZES["4XL"]} color="#ffffff" stroke="#ffffff" />
            </span>
            <div className="pf-cta__copy">
              <h2 className="pf-cta__title">{CTA.TITLE}</h2>
              <p className="pf-cta__desc">{CTA.DESCRIPTION}</p>
            </div>
          </div>
          <PrimaryButton
            className="pf-cta__btn"
            text={CTA.BUTTON}
            icon={<Icon name="ArrowRight" size={ICON_SIZES.SM} color="#103ca4" stroke="#103ca4" />}
            iconPosition="right"
            onClick={() => navigate("/party-formation/create")}
          />
        </section>
        </div>
      </ScrollArea>
    </DashboardLayout>
  );
}