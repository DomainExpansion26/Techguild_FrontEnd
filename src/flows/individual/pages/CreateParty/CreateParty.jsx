// [TechGuild Update: 13-10-2026] Create Party wizard — 5-step flow (Figma "Party 1"-"Party 5", nodes 193:5035/193:3335/193:4571/193:4051/193:3742)
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DashboardLayout, Stepper, Cards, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import PartySummary from "./PartySummary";
import PartyDetailsStep from "./steps/PartyDetailsStep";
import InviteMembersStep from "./steps/InviteMembersStep";
import PositionsStep from "./steps/PositionsStep";
import ReviewStep from "./steps/ReviewStep";
import SuccessStep from "./steps/SuccessStep";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import { showSnackbar } from "@/store";
import { ScrollArea, BackLink } from "@/flows/shared/party/PartyUi";
import "./createparty.css";

const { HEADER, STEPS, ACTIONS, LIMITS, VALIDATION } = APP_STRINGS.CREATE_PARTY;

const PANEL_ICONS = {
  details: "Files",
  members: "Users",
  skills: "Briefcase",
  review: "FileText",
  success: "Shield",
};

const PANEL_TITLES = {
  details: APP_STRINGS.CREATE_PARTY.DETAILS.CARD_TITLE,
  members: APP_STRINGS.CREATE_PARTY.MEMBERS.CARD_TITLE,
  skills: APP_STRINGS.CREATE_PARTY.POSITIONS.CARD_TITLE,
  review: APP_STRINGS.CREATE_PARTY.REVIEW.CARD_TITLE,
  success: "",
};

const PANEL_SUBS = {
  details: APP_STRINGS.CREATE_PARTY.DETAILS.CARD_SUBTITLE,
  members: APP_STRINGS.CREATE_PARTY.MEMBERS.CARD_SUBTITLE,
  skills: APP_STRINGS.CREATE_PARTY.POSITIONS.CARD_SUBTITLE,
  review: APP_STRINGS.CREATE_PARTY.REVIEW.CARD_SUBTITLE,
  success: "",
};

/** Submission ID is derived from the draft so it is stable across re-renders. */
function makeSubmissionId(tag) {
  const stamp = new Date();
  const y = stamp.getFullYear();
  const m = String(stamp.getMonth() + 1).padStart(2, "0");
  const d = String(stamp.getDate()).padStart(2, "0");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  const slug = String(tag || "party").replace(/^@/, "").toUpperCase().slice(0, 3) || "PTY";
  return `${slug}-${y}-${m}-${d}-${rand}`;
}

const EMPTY_DRAFT = {
  name: "",
  tag: "",
  description: "",
  categories: [],
  logo: null,
  invited: [],
  positions: [],
};

export default function CreateParty() {
  const navigate = useNavigate();
  const { step: stepParam } = useParams();
  const dispatch = useDispatch();

  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [errors, setErrors] = useState({});
  const [submissionId, setSubmissionId] = useState(null);

  const goToStep = useCallback(
    (id) => navigate(`/party-formation/create/${id}`),
    [navigate],
  );

  const requestedIndex = Math.max(
    0,
    STEPS.findIndex((s) => s.id === (stepParam || STEPS[0].id)),
  );

  /**
   * Step 5 is terminal: it must only render after an actual submit, otherwise a
   * hand-typed /party-formation/create/success deep link would show a fake
   * confirmation. Redirect back to review instead of rendering it.
   */
  const blocked =
    STEPS[requestedIndex].id === "success" && !submissionId;
  const currentIndex = blocked ? STEPS.length - 2 : requestedIndex;
  const current = STEPS[currentIndex];

  useEffect(() => {
    if (blocked) goToStep(STEPS[currentIndex].id);
  }, [blocked, currentIndex, goToStep]);

  /**
   * `value` may be a value OR a function of the current value.
   * The function form matters for array fields: clicking several suggestion
   * chips in one tick would otherwise compute each new value from the same
   * stale `draft` closure and the last click would silently win.
   */
  const update = (key, value) => {
    setDraft((d) => ({
      ...d,
      [key]: typeof value === "function" ? value(d[key]) : value,
    }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const validate = (id) => {
    const next = {};
    if (id === "details") {
      if (!draft.name.trim()) next.name = VALIDATION.NAME_REQUIRED;
      if (!draft.tag.trim()) next.tag = VALIDATION.TAG_REQUIRED;
      if (!draft.description.trim()) next.description = VALIDATION.DESCRIPTION_REQUIRED;
      if (!draft.categories.length) next.category = VALIDATION.CATEGORY_REQUIRED;
    }
    if (id === "members" && 1 + draft.invited.length < LIMITS.MEMBERS_MIN) {
      next.members = VALIDATION.MEMBERS_REQUIRED.replace("{n}", LIMITS.MEMBERS_MIN);
    }
    if (id === "skills" && draft.positions.length === 0) {
      next.skills = VALIDATION.POSITIONS_REQUIRED;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (!validate(current.id)) {
      dispatch(
        showSnackbar({ message: "Please fix the highlighted fields.", type: "error" }),
      );
      return;
    }
    if (currentIndex < STEPS.length - 2) goToStep(STEPS[currentIndex + 1].id);
  };

  const handleSubmit = () => {
    if (!validate("skills")) return;
    if (1 + draft.invited.length < LIMITS.MEMBERS_MIN) {
      dispatch(
        showSnackbar({
          message: VALIDATION.MEMBERS_REQUIRED.replace("{n}", LIMITS.MEMBERS_MIN),
          type: "error",
        }),
      );
      return;
    }
    setSubmissionId(makeSubmissionId(draft.tag));
    goToStep("success");
  };

  const handleSaveDraft = () => {
    // No persistence endpoint yet — this is where a draft PATCH would go.
    dispatch(showSnackbar({ message: "Draft saved.", type: "success" }));
  };

  const handleCancel = () => navigate("/party-formation");

  const submittedOn = useMemo(() => {
    if (!submissionId) return null;
    return new Date().toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [submissionId]);

  const isSuccess = current.id === "success";

  return (
    <DashboardLayout searchPlaceholder={HEADER.SEARCH_PLACEHOLDER}>
      <ScrollArea>
        <div className="cp-page">
          {/* ---------------- Back + header actions ---------------- */}
          <BackLink label={HEADER.BACK} onClick={() => navigate("/party-formation")} />

          <div className="cp-head">
            <div className="cp-head__text">
              <h1 className="cp-head__title">{HEADER.TITLE}</h1>
              <p className="cp-head__sub">{HEADER.SUBTITLES[current.id]}</p>
            </div>

            {!isSuccess && (
              <div className="cp-head__actions">
                <SecondaryButton
                  className="cp-head__ghost"
                  text={HEADER.SAVE_DRAFT}
                  onClick={handleSaveDraft}
                />
                <SecondaryButton
                  className="cp-head__ghost"
                  text={HEADER.CANCEL}
                  onClick={handleCancel}
                />
              </div>
            )}
          </div>

          {/* ---------------- Stepper ---------------- */}
          <Stepper
            className="cp-stepper"
            steps={STEPS}
            currentStep={currentIndex + 1}
            allowClick
            onStepClick={(_, s) => {
              // Completed steps are navigable; the success step is terminal.
              if (s.id === "success") return;
              const target = STEPS.findIndex((x) => x.id === s.id);
              if (target <= currentIndex) goToStep(s.id);
            }}
          />

          {/* ---------------- Body ---------------- */}
          <div className="cp-layout">
            <div className="cp-layout__main">
              <Cards
                variant="base"
                className="cp-panel"
                radius="md"
                bg="rgba(255,255,255,0.6)"
                border="1px solid #e7edf8"
                padding={isSuccess ? "0" : "28px"}
              >
                {!isSuccess && (
                  <div className="cp-panel__head">
                    <span className="cp-panel__icon">
                      <Icon
                        name={PANEL_ICONS[current.id]}
                        size={ICON_SIZES.LG}
                        color="#103ca4"
                        stroke="#103ca4"
                      />
                    </span>
                    <div>
                      <h2 className="cp-panel__title">{PANEL_TITLES[current.id]}</h2>
                      <p className="cp-panel__sub">{PANEL_SUBS[current.id]}</p>
                    </div>
                  </div>
                )}

                <div className={isSuccess ? "cp-panel--flush" : "cp-panel__body"}>
                  {current.id === "details" && (
                    <PartyDetailsStep draft={draft} update={update} errors={errors} />
                  )}
                  {current.id === "members" && (
                    <InviteMembersStep draft={draft} update={update} />
                  )}
                  {current.id === "skills" && <PositionsStep draft={draft} update={update} />}
                  {current.id === "review" && (
                    <ReviewStep draft={draft} goToStep={goToStep} />
                  )}
                  {current.id === "success" && (
                    <SuccessStep
                      draft={draft}
                      submissionId={submissionId || makeSubmissionId(draft.tag)}
                      // Both actions land on the Party Management screen — the
                      // new Figma flow has no verification wait, the lead goes
                      // straight to managing the freshly created party.
                      onViewParty={() => navigate("/party-formation/lead")}
                      onGoToManagement={() => navigate("/party-formation/lead")}
                    />
                  )}
                </div>
              </Cards>

              {/* ---------------- Footer ---------------- */}
              {!isSuccess && (
                <div className="cp-footer">
                  <SecondaryButton
                    className="cp-footer__back"
                    text={ACTIONS.BACK}
                    icon={
                      <Icon name="ArrowLeft" size={ICON_SIZES.SM} color="#374151" stroke="#374151" />
                    }
                    iconPosition="left"
                    disabled={currentIndex === 0}
                    onClick={() => goToStep(STEPS[Math.max(0, currentIndex - 1)].id)}
                  />

                  <div className="cp-footer__right">
                    <SecondaryButton
                      className="cp-footer__draft"
                      text={HEADER.SAVE_DRAFT}
                      onClick={handleSaveDraft}
                    />
                    {current.id === "review" ? (
                      <PrimaryButton
                        className="cp-footer__next"
                        text={ACTIONS.SUBMIT}
                        icon={
                          <Icon
                            name="ArrowRight"
                            size={ICON_SIZES.SM}
                            color="#ffffff"
                            stroke="#ffffff"
                          />
                        }
                        iconPosition="right"
                        onClick={handleSubmit}
                      />
                    ) : (
                      <PrimaryButton
                        className="cp-footer__next"
                        text={ACTIONS.CONTINUE}
                        icon={
                          <Icon
                            name="ArrowRight"
                            size={ICON_SIZES.SM}
                            color="#ffffff"
                            stroke="#ffffff"
                          />
                        }
                        iconPosition="right"
                        onClick={handleNext}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ---------------- Right rail ---------------- */}
            <aside className="cp-layout__rail">
              <PartySummary
                step={currentIndex + 1}
                draft={draft}
                submissionId={{ submittedOn }}
              />
            </aside>
          </div>
        </div>
      </ScrollArea>
    </DashboardLayout>
  );
}
