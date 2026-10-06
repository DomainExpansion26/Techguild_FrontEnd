import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { DashboardLayout, PrimaryButton, Stepper, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import "./QuestBoard.css";

const questStepSlugMap = {
  1: "basic-info",
  2: "budget-timeline",
  3: "review",
  4: "published",
};

const questSlugStepMap = {
  create: 1,
  "basic-info": 1,
  details: 1,
  "1": 1,
  "budget-timeline": 2,
  budget: 2,
  "2": 2,
  review: 3,
  "3": 3,
  published: 4,
  completed: 4,
  success: 4,
  "4": 4,
};

export default function QuestBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questId, step } = useParams();
  const pageContainerRef = useRef(null);

  const basePath = location.pathname.startsWith("/client/quest-board")
    ? "/client/quest-board"
    : location.pathname.startsWith("/client/projects")
      ? "/client/projects"
      : "/client-quest-board";

  const isCreateRoute = location.pathname.includes("/create");
  const isViewRoute = location.pathname.includes("/view");
  const rawParam = step || questId;

  let isCreating = false;
  let isViewingQuest = false;
  let currentStep = 1;
  let activeQuestId = null;

  if (isCreateRoute) {
    isCreating = true;
    currentStep = questSlugStepMap[rawParam] || 1;
  } else if (isViewRoute) {
    isViewingQuest = true;
    activeQuestId = rawParam || "TQ-2023-9842";
  } else if (rawParam) {
    if (questSlugStepMap[rawParam]) {
      isCreating = true;
      currentStep = questSlugStepMap[rawParam];
    } else {
      isViewingQuest = true;
      activeQuestId = rawParam;
    }
  }

  const [showPublishedSnackbar, setShowPublishedSnackbar] = useState(true);
  const [isSnackbarClosing, setIsSnackbarClosing] = useState(false);

  const goToStep = (stepNum) => {
    const slug = questStepSlugMap[stepNum] || "basic-info";
    navigate(`${basePath}/create/${slug}`);
  };

  const goToOverview = () => {
    navigate(basePath);
  };

  const goToViewQuest = (id = "TQ-2023-9842") => {
    navigate(`${basePath}/view/${id}`);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarClosing(true);
    setTimeout(() => {
      setShowPublishedSnackbar(false);
      setIsSnackbarClosing(false);
    }, 280);
  };

  // Step 1 Form State
  const [questTitle, setQuestTitle] = useState("Enterprise-Grade Multi-Tenant Dashboard");
  const [questDesc, setQuestDesc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Full-Stack Web Development");
  const [selectedComplexity, setSelectedComplexity] = useState("intermediate");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  // Step 2 Form State
  const [budgetVal, setBudgetVal] = useState("₹ 75,000");
  const [selectedRange, setSelectedRange] = useState("medium");
  const [timelineDays, setTimelineDays] = useState("20");
  const [selectedQuestType, setSelectedQuestType] = useState("standard");

  const qbStrings = APP_STRINGS.QUEST_BOARD;
  const createStrings = qbStrings.CREATE_QUEST;
  const step2Strings = createStrings.STEP_2;
  const step3Strings = createStrings.STEP_3; // Review
  const step4Strings = createStrings.STEP_4; // Publish
  const viewQuestStrings = qbStrings.VIEW_QUEST_DETAIL;

  const handlePublish = () => {
    goToStep(4);
  };

  useEffect(() => {
    if (isViewingQuest) {
      setShowPublishedSnackbar(true);
      setIsSnackbarClosing(false);
      const timer = setTimeout(() => {
        handleCloseSnackbar();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isViewingQuest]);

  useEffect(() => {
    const scrollToTop = () => {
      if (pageContainerRef.current) {
        pageContainerRef.current.scrollTop = 0;
      }
      const workspace = document.querySelector(".main-workspace");
      if (workspace) {
        workspace.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    };

    scrollToTop();
    const frameId = requestAnimationFrame(scrollToTop);
    return () => cancelAnimationFrame(frameId);
  }, [currentStep, isCreating, isViewingQuest, location.pathname]);

  const handleStartCreating = () => {
    goToStep(1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    } else {
      goToOverview();
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      goToStep(currentStep + 1);
    }
  };

  return (
    <DashboardLayout>
      <div className="qb-page-container" ref={pageContainerRef}>
        {/* Floating Published Snackbar Notification */}
        {isViewingQuest && showPublishedSnackbar && (
          <div
            className={`vq-snackbar ${isSnackbarClosing ? "closing" : ""}`}
            role="status"
            aria-live="polite"
          >
            <div className="vq-snackbar-icon-box">
              <Icon name="ShieldCheck" size={ICON_SIZES.DEFAULT} color="#059669" />
            </div>
            <div className="vq-snackbar-content">
              <div className="vq-snackbar-title">{viewQuestStrings.ALERT_BANNER.TITLE}</div>
              <div className="vq-snackbar-desc">
                {viewQuestStrings.ALERT_BANNER.DESCRIPTION}{" "}
                <span className="vq-snackbar-escrow-tag">
                  {viewQuestStrings.ALERT_BANNER.ESCROW_FUNDED_TAG}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="vq-snackbar-close"
              onClick={handleCloseSnackbar}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
            <div className="vq-snackbar-progress">
              <div className="vq-snackbar-progress-bar" />
            </div>
          </div>
        )}

        {isViewingQuest ? (
          /* ==========================================
             SCREEN 3: VIEW MY QUEST (LIVE DETAILS)
             ========================================== */
          <div className="vq-container">
            {/* Header Row: Title, Subtitle, and Published Pill */}
            <div className="vq-header-row">
              <div className="vq-header-left">
                <h1 className="vq-title">{viewQuestStrings.HEADER.TITLE}</h1>
                <p className="vq-subtitle">{viewQuestStrings.HEADER.SUBTITLE}</p>
              </div>
              <div className="vq-header-right">
                <div className="vq-published-pill">
                  <span>{viewQuestStrings.HEADER.BADGE}</span>
                  <Icon name="CircleCheck" size={ICON_SIZES.XS} strokeWidth={2.2} color="#16A34A" stroke="#16A34A" />
                </div>
                <span className="vq-published-time">{viewQuestStrings.HEADER.BADGE_SUB}</span>
              </div>
            </div>

            {/* 4 Metric Cards Row */}
            <div className="vq-metrics-grid">
              {viewQuestStrings.METRICS.map((m, idx) => (
                <Cards key={idx} shadow="none" className="vq-metric-card">
                  <span className="vq-metric-label">{m.label}</span>
                  <div className="vq-metric-value-row">
                    {m.dot && <span className="vq-metric-dot" />}
                    <span className={`vq-metric-value ${m.isBlue ? "blue" : ""}`}>{m.value}</span>
                  </div>
                </Cards>
              ))}
            </div>

            {/* 2-Column Main Content Grid */}
            <div className="vq-main-grid">
              {/* Left Column */}
              <div className="vq-left-col">
                {/* Card 1: Quest Overview */}
                <Cards shadow="none" className="vq-card">
                  <div className="vq-card-header">
                    <h3 className="vq-card-title">{viewQuestStrings.OVERVIEW_CARD.TITLE}</h3>
                    <button type="button" className="vq-link-btn">
                      <span>{viewQuestStrings.OVERVIEW_CARD.VIEW_DETAILS}</span>
                      <Icon name="ArrowRight" size={ICON_SIZES.XS} color="#103ca4" />
                    </button>
                  </div>
                  <p className="vq-overview-desc">{viewQuestStrings.OVERVIEW_CARD.DESCRIPTION}</p>

                  <div className="vq-skills-section">
                    <span className="vq-section-caption">{viewQuestStrings.OVERVIEW_CARD.SKILLS_LABEL}</span>
                    <div className="vq-skills-wrap">
                      {viewQuestStrings.OVERVIEW_CARD.SKILLS.map((sk, idx) => (
                        <span key={idx} className="vq-skill-tag">{sk}</span>
                      ))}
                    </div>
                  </div>

                  <div className="vq-timeline-footer">
                    <Icon name="Calendar" size={ICON_SIZES.SM} color="#64748b" />
                    <span>{viewQuestStrings.OVERVIEW_CARD.TIMELINE_LABEL}</span>
                  </div>
                </Cards>

                {/* Card 2: Milestone Progress */}
                <Cards shadow="none" className="vq-card">
                  <div className="vq-card-header">
                    <h3 className="vq-card-title">{viewQuestStrings.MILESTONE_PROGRESS_CARD.TITLE}</h3>
                    <span className="vq-completed-badge">{viewQuestStrings.MILESTONE_PROGRESS_CARD.COMPLETED_TEXT}</span>
                  </div>

                  <div className="vq-milestones-empty-state">
                    <div className="vq-milestone-lock-circle">
                      <Icon name="Lock" size={ICON_SIZES.MD} color="#475569" strokeWidth={1.8} />
                    </div>
                    <div className="vq-milestones-empty-title">
                      {viewQuestStrings.MILESTONE_PROGRESS_CARD.EMPTY_TITLE}
                    </div>
                    <div className="vq-milestones-empty-status">
                      {viewQuestStrings.MILESTONE_PROGRESS_CARD.EMPTY_STATUS}
                    </div>
                  </div>

                  <div className="vq-milestone-breakdown-row">
                    <button type="button" className="vq-link-btn">
                      <span>{viewQuestStrings.MILESTONE_PROGRESS_CARD.VIEW_BREAKDOWN}</span>
                      <Icon name="ArrowRight" size={ICON_SIZES.XS} color="#103ca4" />
                    </button>
                  </div>
                </Cards>

                {/* Card 3: Recent Activity */}
                <Cards shadow="none" className="vq-card">
                  <h3 className="vq-card-title" style={{ marginBottom: "16px" }}>
                    {viewQuestStrings.RECENT_ACTIVITY_CARD.TITLE}
                  </h3>
                  <div className="vq-activity-timeline">
                    {viewQuestStrings.RECENT_ACTIVITY_CARD.ACTIVITIES.map((act, idx) => (
                      <div key={idx} className="vq-activity-item">
                        <div className="vq-activity-dot-col">
                          <div className={`vq-activity-dot-disc ${act.type}`}>
                            <div className={`vq-activity-dot-inner ${act.type}`} />
                          </div>
                          {idx < viewQuestStrings.RECENT_ACTIVITY_CARD.ACTIVITIES.length - 1 && (
                            <div className="vq-activity-connector" />
                          )}
                        </div>
                        <div className="vq-activity-text">
                          <span className="vq-activity-title">{act.title}</span>
                          <span className="vq-activity-time">{act.subtitle}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Cards>
              </div>

              {/* Right Column */}
              <div className="vq-right-col">
                {/* Card 1: Escrow & Payments */}
                <Cards shadow="none" className="vq-card">
                  <div className="vq-card-header">
                    <h3 className="vq-card-title">{viewQuestStrings.ESCROW_CARD.TITLE}</h3>
                    <Icon name="Wallet" size={ICON_SIZES.DEFAULT} color="#94a3b8" />
                  </div>
                  <div className="vq-escrow-amount">{viewQuestStrings.ESCROW_CARD.AMOUNT}</div>
                  <div className="vq-escrow-funded-row">
                    <Icon name="CircleCheckFill" size={ICON_SIZES.XS} color="#16A34A" />
                    <span>{viewQuestStrings.ESCROW_CARD.STATUS}</span>
                  </div>
                  <div className="vq-escrow-callout">
                    <Icon name="CircleAlert" size={ICON_SIZES.SM} color="#3b82f6" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <p className="vq-escrow-callout-text">{viewQuestStrings.ESCROW_CARD.INFO_TEXT}</p>
                  </div>
                  <button type="button" className="vq-link-btn">
                    <span>{viewQuestStrings.ESCROW_CARD.VIEW_DETAILS}</span>
                    <Icon name="ArrowRight" size={ICON_SIZES.XS} color="#103ca4" />
                  </button>
                </Cards>

                {/* Card 2: Status Checklist */}
                <Cards shadow="none" className="vq-card">
                  <h3 className="vq-card-title" style={{ marginBottom: "16px" }}>
                    {viewQuestStrings.STATUS_CHECKLIST_CARD.TITLE}
                  </h3>
                  <div className="vq-checklist">
                    {viewQuestStrings.STATUS_CHECKLIST_CARD.ITEMS.map((item, idx) => (
                      <div key={idx} className="vq-checklist-row">
                        <div className="vq-checklist-icon-col">
                          {item.status === "completed" && (
                            <div className="vq-checklist-completed-circle">
                              <Icon name="Check" size={ICON_SIZES.MICRO} strokeWidth={2.8} color="#ffffff" stroke="#ffffff" />
                            </div>
                          )}
                          {item.status === "in_progress" && (
                            <div className="vq-checklist-progress-ring">
                              <div className="vq-checklist-progress-center" />
                            </div>
                          )}
                          {item.status === "pending" && (
                            <div className="vq-checklist-pending-circle" />
                          )}
                          {idx < viewQuestStrings.STATUS_CHECKLIST_CARD.ITEMS.length - 1 && (
                            <div className={`vq-checklist-connector ${item.status === "completed" ? "completed" : ""}`} />
                          )}
                        </div>
                        <div className="vq-checklist-text">
                          <span className={`vq-checklist-name ${item.status}`}>
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span className="vq-checklist-sub">{item.subtitle}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Cards>

                {/* Card 3: Communication */}
                <Cards shadow="none" className="vq-card">
                  <div className="vq-comm-header">
                    <div className="vq-comm-icon-box">
                      <Icon name="MessageSquare" size={ICON_SIZES.DEFAULT} color="#6B38D4" stroke="#6B38D4" />
                    </div>
                    <h3 className="vq-card-title">{viewQuestStrings.COMMUNICATION_CARD.TITLE}</h3>
                  </div>
                  <p className="vq-comm-sub">{viewQuestStrings.COMMUNICATION_CARD.SUBTITLE}</p>

                  <div className="vq-unread-box">
                    <span className="vq-unread-label">{viewQuestStrings.COMMUNICATION_CARD.UNREAD_LABEL}</span>
                    <span className="vq-unread-count">{viewQuestStrings.COMMUNICATION_CARD.UNREAD_COUNT}</span>
                  </div>

                  <button type="button" className="vq-open-chat-btn">
                    <span>{viewQuestStrings.COMMUNICATION_CARD.CHAT_BTN}</span>
                    <Icon name="ArrowRight" size={ICON_SIZES.XS} />
                  </button>
                </Cards>
              </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="vq-bottom-bar">
              <div className="vq-bottom-left">
                <span className="vq-bottom-title">{viewQuestStrings.BOTTOM_BAR.TITLE}</span>
                <div className="vq-bottom-status">
                  <span className="vq-bottom-dot" />
                  <span>{viewQuestStrings.BOTTOM_BAR.STATUS}</span>
                </div>
              </div>
              <div className="vq-bottom-right">
                <button
                  type="button"
                  className="vq-edit-btn"
                  onClick={() => goToStep(1)}
                >
                  {viewQuestStrings.BOTTOM_BAR.EDIT_QUEST}
                </button>
                <button
                  type="button"
                  className="vq-workspace-btn"
                  onClick={() => navigate("/client-active-quests")}
                >
                  <span>{viewQuestStrings.BOTTOM_BAR.VIEW_WORKSPACE}</span>
                  <Icon name="ArrowRight" size={ICON_SIZES.XS} />
                </button>
              </div>
            </div>
          </div>
        ) : !isCreating ? (
          /* ==========================================
             SCREEN 1: QUEST BOARD OVERVIEW
             ========================================== */
          <>
            {/* Header Title & Subtitle */}
            <header className="qb-header">
              <h1 className="qb-header-title">{qbStrings.HEADER.TITLE}</h1>
              <p className="qb-header-subtitle">{qbStrings.HEADER.SUBTITLE_LINE1}</p>
              <p className="qb-header-subtitle">{qbStrings.HEADER.SUBTITLE_LINE2}</p>
            </header>

            {/* Top & Middle Main Grid */}
            <div className="qb-main-grid">
              {/* Left Column */}
              <div className="qb-left-col">
                {/* Welcome to Quest Creation Card */}
                <Cards shadow="none" className="qb-welcome-card">
                  <span className="qb-pill-badge">{qbStrings.WELCOME_CARD.BADGE}</span>
                  <h2 className="qb-welcome-title">{qbStrings.WELCOME_CARD.TITLE}</h2>
                  <p className="qb-welcome-para">{qbStrings.WELCOME_CARD.PARAGRAPH_1}</p>
                  <p className="qb-welcome-para">{qbStrings.WELCOME_CARD.PARAGRAPH_2}</p>
                  <p className="qb-welcome-para">{qbStrings.WELCOME_CARD.PARAGRAPH_3}</p>

                  <div className="qb-trust-tags">
                    <div className="qb-trust-tag">
                      <Icon name="CircleCheck" size={ICON_SIZES.MD} color="#103CA4" />
                      <span>{qbStrings.WELCOME_CARD.TAG_VERIFIED}</span>
                    </div>
                    <div className="qb-trust-tag">
                      <Icon name="ShieldCheck" size={ICON_SIZES.MD} color="#103CA4" />
                      <span>{qbStrings.WELCOME_CARD.TAG_ESCROW}</span>
                    </div>
                  </div>
                </Cards>

                {/* How the Process Works Section */}
                <section className="qb-process-section">
                  <h3 className="qb-section-title">{qbStrings.PROCESS.TITLE}</h3>
                  <div className="qb-steps-grid">
                    {qbStrings.PROCESS.STEPS.map((step) => (
                      <Cards key={step.STEP} shadow="none" className="qb-step-card">
                        <div className="qb-step-icon-box">
                          <Icon name={step.ICON} size={ICON_SIZES.DEFAULT} color="#E1EBFF" />
                        </div>
                        <h4 className="qb-step-title">{step.TITLE}</h4>
                        <p className="qb-step-desc">{step.DESCRIPTION}</p>
                      </Cards>
                    ))}
                  </div>
                </section>

                {/* Bottom Card: Why Post a Quest on TechGuild? */}
                <Cards shadow="none" className="qb-why-post-card">
                  <h3 className="qb-why-title">{qbStrings.WHY_POST.TITLE}</h3>
                  <div className="qb-benefits-grid">
                    {qbStrings.WHY_POST.BENEFITS.map((benefit, idx) => (
                      <div key={idx} className="qb-benefit-item">
                        <div className="qb-check-badge">
                          <Icon name="Check" size={ICON_SIZES["2XS"]} color="#006A5F" strokeWidth={3} />
                        </div>
                        <div>
                          <h4 className="qb-benefit-title">{benefit.TITLE}</h4>
                          <p className="qb-benefit-desc">{benefit.DESCRIPTION}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Cards>
              </div>

              {/* Right Column */}
              <div className="qb-right-col">
                {/* Start Creating Quest Button */}
                <PrimaryButton
                  text={qbStrings.ACTIONS.START_CREATING_QUEST}
                  onClick={handleStartCreating}
                  className="qb-start-btn"
                />

                {/* Before You Begin Make Sure : Card */}
                <Cards shadow="none" className="qb-before-begin-card">
                  <h4 className="qb-before-begin-title">{qbStrings.BEFORE_YOU_BEGIN.TITLE}</h4>
                  <Cards shadow="none" className="qb-checklist-box">
                    {qbStrings.BEFORE_YOU_BEGIN.CHECKLIST.map((item, idx) => (
                      <div key={idx} className="qb-checklist-item">
                        {item}
                      </div>
                    ))}
                  </Cards>
                </Cards>

                {/* Need Help? Card */}
                <Cards shadow="none" className="qb-need-help-card">
                  <div className="qb-need-help-header">
                    <Icon name="CircleQuestionMark" size={ICON_SIZES.DEFAULT} color="#103ca4" />
                    <h4 className="qb-need-help-title">{qbStrings.HELP_CARD.TITLE}</h4>
                  </div>
                  <p className="qb-need-help-desc">{qbStrings.HELP_CARD.DESCRIPTION}</p>
                  <a
                    href="#help"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="qb-contact-link"
                  >
                    {qbStrings.HELP_CARD.LINK_TEXT}
                  </a>
                </Cards>
              </div>
            </div>
          </>
        ) : (
          /* ==========================================
             SCREEN 2: QUEST CREATION FLOW
             ========================================== */
          <div className="qc-screen-container">
            {/* Top Back Button */}
            {/* Top Back Button (hidden on Step 6) */}
            {currentStep < 4 && (
              <button
                type="button"
                className="qc-back-btn"
                onClick={handleBack}
                aria-label="Go back"
              >
                <Icon name="ArrowLeft" size={ICON_SIZES.XL} color="#0C2F82" />
              </button>
            )}

            {/* Screen Title */}
            <h1 className="qc-page-title">
              {currentStep === 1
                ? createStrings.HEADER.TITLE
                : currentStep === 2
                  ? step2Strings.HEADER.TITLE
                  : currentStep === 3
                    ? step3Strings.HEADER.TITLE
                    : step4Strings.HEADER.TITLE}
            </h1>

            {/* Subtitle for Step 2 */}
            {currentStep === 2 && (
              <p className="qc-header-desc">{step2Strings.HEADER.SUBTITLE}</p>
            )}
            {/* Subtitle for Step 3 (Review) */}
            {currentStep === 3 && (
              <p className="qc-header-desc">{step3Strings.HEADER.SUBTITLE}</p>
            )}
            {/* Subtitle for Step 4 (Publish) */}
            {currentStep === 4 && (
              <p className="qc-header-desc">{step4Strings.HEADER.SUBTITLE}</p>
            )}

            {/* Stepper Component from Component Folder */}
            <div className="qc-stepper-wrapper">
              <Stepper
                steps={createStrings.STEPS}
                currentStep={currentStep}
                onStepClick={(s) => {
                  if (s < currentStep) goToStep(s);
                }}
              />
            </div>

            {/* STEP 1: BASIC INFORMATION */}
            {currentStep === 1 && (
              <div className="qc-main-grid">
                {/* Left Column: Quest Essentials Card */}
                <Cards shadow="none" className="qc-card">
                  <div className="qc-card-header">
                    <h2 className="qc-card-title">{createStrings.ESSENTIALS_CARD.TITLE}</h2>
                    <p className="qc-card-subtitle">{createStrings.ESSENTIALS_CARD.SUBTITLE}</p>
                  </div>

                  {/* Field 1: Quest Title */}
                  <div className="qc-field-group">
                    <div className="qc-label-row">
                      <label className="qc-label">{createStrings.ESSENTIALS_CARD.TITLE_LABEL}</label>
                      <span className="qc-char-counter">
                        {questTitle.length} / {createStrings.ESSENTIALS_CARD.TITLE_MAX_LEN}
                      </span>
                    </div>
                    <div className="qc-input-wrapper">
                      <input
                        type="text"
                        className="qc-text-input"
                        value={questTitle}
                        maxLength={createStrings.ESSENTIALS_CARD.TITLE_MAX_LEN}
                        onChange={(e) => setQuestTitle(e.target.value)}
                        placeholder={createStrings.ESSENTIALS_CARD.TITLE_PLACEHOLDER}
                      />
                      <div className="qc-input-icon">
                        <Icon name="Check" size={ICON_SIZES["2XS"]} color="#ffffff" strokeWidth={3} />
                      </div>
                    </div>
                    <p className="qc-helper-msg">{createStrings.ESSENTIALS_CARD.TITLE_VALID_MSG}</p>
                  </div>

                  {/* Field 2: Quest Description */}
                  <div className="qc-field-group">
                    <div className="qc-label-row">
                      <label className="qc-label">{createStrings.ESSENTIALS_CARD.DESC_LABEL}</label>
                      <span className="qc-char-counter">
                        {questDesc.length} / {createStrings.ESSENTIALS_CARD.DESC_MAX_LEN}
                      </span>
                    </div>
                    <textarea
                      className="qc-textarea"
                      value={questDesc}
                      maxLength={createStrings.ESSENTIALS_CARD.DESC_MAX_LEN}
                      onChange={(e) => setQuestDesc(e.target.value)}
                      placeholder={createStrings.ESSENTIALS_CARD.DESC_PLACEHOLDER}
                    />
                    <p className="qc-hint-msg">{createStrings.ESSENTIALS_CARD.DESC_HINT}</p>
                  </div>

                  {/* Field 3: Category */}
                  <div className="qc-field-group" style={{ position: "relative" }}>
                    <label className="qc-label" style={{ display: "block", marginBottom: "6px" }}>
                      {createStrings.ESSENTIALS_CARD.CATEGORY_LABEL}
                    </label>
                    <div
                      className="qc-select-box"
                      onClick={() => setCategoryDropdownOpen((prev) => !prev)}
                    >
                      <div className="qc-select-left">
                        <Icon name="Layers" size={ICON_SIZES.DEFAULT} color="#475569" />
                        <span>{selectedCategory}</span>
                      </div>
                      <Icon name="ChevronDown" size={ICON_SIZES.MD} color="#64748b" />
                    </div>

                    {categoryDropdownOpen && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          backgroundColor: "#ffffff",
                          border: "1px solid #cbd5e1",
                          borderRadius: "10px",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                          marginTop: "4px",
                          zIndex: 20,
                          maxHeight: "220px",
                          overflowY: "auto",
                        }}
                      >
                        {createStrings.ESSENTIALS_CARD.CATEGORY_OPTIONS.map((cat, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              cursor: "pointer",
                              backgroundColor: selectedCategory === cat ? "#f0f5ff" : "transparent",
                              color: selectedCategory === cat ? "#103ca4" : "#111827",
                              fontWeight: selectedCategory === cat ? 600 : 400,
                            }}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setCategoryDropdownOpen(false);
                            }}
                          >
                            {cat}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Field 4: Project Complexity */}
                  <div className="qc-field-group" style={{ marginTop: "20px" }}>
                    <label className="qc-label" style={{ display: "block", marginBottom: "12px" }}>
                      {createStrings.ESSENTIALS_CARD.COMPLEXITY_LABEL}
                    </label>
                    <div className="qc-complexity-grid">
                      {createStrings.ESSENTIALS_CARD.COMPLEXITIES.map((item) => {
                        const isSelected = selectedComplexity === item.ID;
                        return (
                          <div
                            key={item.ID}
                            className={`qc-complexity-card ${isSelected ? "selected" : ""}`}
                            onClick={() => setSelectedComplexity(item.ID)}
                          >
                            <div className="qc-complexity-icon">
                              <Icon
                                name={item.ICON}
                                size={ICON_SIZES.LG}
                                color={isSelected ? "#103CA4" : "#434655"}
                              />
                            </div>
                            <h4 className="qc-complexity-title">{item.TITLE}</h4>
                            <p className="qc-complexity-desc">{item.DESCRIPTION}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Cards>

                {/* Right Column: Cards */}
                <div className="qc-side-col">
                  {/* Card 1: Completion */}
                  <Cards shadow="none" className="qc-side-card">
                    <div className="qc-completion-header">
                      <h4 className="qc-completion-title">{createStrings.COMPLETION_CARD.TITLE}</h4>
                      <span className="qc-completion-percent">
                        {createStrings.COMPLETION_CARD.PERCENT}
                      </span>
                    </div>
                    <div className="qc-progress-track">
                      <div className="qc-progress-bar" style={{ width: "0%" }} />
                    </div>
                    <p className="qc-step-info">{createStrings.COMPLETION_CARD.STEP_TEXT}</p>
                  </Cards>

                  {/* Card 2: Quest Summary */}
                  <Cards shadow="none" className="qc-side-card">
                    <h4 className="qc-summary-title">{createStrings.SUMMARY_CARD.TITLE}</h4>

                    <div className="qc-summary-group">
                      <div className="qc-summary-label">
                        {createStrings.SUMMARY_CARD.FIELDS.PROJECT_TITLE}
                      </div>
                      <div className="qc-summary-val">
                        {createStrings.SUMMARY_CARD.FIELDS.PENDING}
                      </div>
                    </div>

                    <div className="qc-summary-grid">
                      <div className="qc-summary-group">
                        <div className="qc-summary-label">
                          {createStrings.SUMMARY_CARD.FIELDS.CATEGORY}
                        </div>
                        <div className="qc-summary-val">
                          {createStrings.SUMMARY_CARD.FIELDS.PENDING}
                        </div>
                      </div>
                      <div className="qc-summary-group">
                        <div className="qc-summary-label">
                          {createStrings.SUMMARY_CARD.FIELDS.BUDGET}
                        </div>
                        <div className="qc-summary-val">
                          {createStrings.SUMMARY_CARD.FIELDS.PENDING}
                        </div>
                      </div>
                      <div className="qc-summary-group">
                        <div className="qc-summary-label">
                          {createStrings.SUMMARY_CARD.FIELDS.TIMELINE}
                        </div>
                        <div className="qc-summary-val">
                          {createStrings.SUMMARY_CARD.FIELDS.PENDING}
                        </div>
                      </div>
                      <div className="qc-summary-group">
                        <div className="qc-summary-label">
                          {createStrings.SUMMARY_CARD.FIELDS.TYPE}
                        </div>
                        <div className="qc-summary-val">
                          {createStrings.SUMMARY_CARD.FIELDS.PENDING}
                        </div>
                      </div>
                    </div>
                  </Cards>

                  {/* Card 3: Techguild Suggestions */}
                  <Cards shadow="none" className="qc-suggestions-card">
                    <h4 className="qc-suggestions-title">{createStrings.SUGGESTIONS_CARD.TITLE}</h4>
                    <ul className="qc-suggestions-list">
                      {createStrings.SUGGESTIONS_CARD.SUGGESTIONS.map((sugg, idx) => (
                        <li key={idx} className="qc-suggestion-item">
                          {sugg}
                        </li>
                      ))}
                    </ul>
                  </Cards>
                </div>
              </div>
            )}

            {/* STEP 2: BUDGET & TIMELINE */}
            {currentStep === 2 && (
              <div className="qc-main-grid">
                {/* Left Column: Budget & Timeline Card */}
                <Cards shadow="none" className="qc-card">
                  {/* Section 1: Project Budget */}
                  <div>
                    <h3 className="qc-section-heading">
                      {step2Strings.BUDGET_SECTION.TITLE}
                    </h3>

                    <label className="qc-label" style={{ display: "block", marginBottom: "6px" }}>
                      {step2Strings.BUDGET_SECTION.LABEL}
                    </label>

                    <input
                      type="text"
                      className="qc-budget-input"
                      value={budgetVal}
                      onChange={(e) => setBudgetVal(e.target.value)}
                    />

                    {/* Estimated Budget Range Box */}
                    <div className="qc-range-box">
                      <div className="qc-range-title">
                        {step2Strings.BUDGET_SECTION.RANGE_TITLE}
                      </div>
                      <div className="qc-range-grid">
                        {step2Strings.BUDGET_SECTION.RANGES.map((item) => {
                          const isSel = selectedRange === item.id;
                          return (
                            <div
                              key={item.id}
                              className={`qc-range-item ${isSel ? "selected" : ""}`}
                              onClick={() => setSelectedRange(item.id)}
                            >
                              <div className="qc-range-item-title">{item.title}</div>
                              <div className="qc-range-item-sub">{item.range}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Section Divider */}
                  <div className="qc-section-divider" />

                  {/* Section 2: Project Timeline */}
                  <div>
                    <h3 className="qc-section-heading">
                      {step2Strings.TIMELINE_SECTION.TITLE}
                    </h3>

                    <label className="qc-label" style={{ display: "block", marginBottom: "6px" }}>
                      {step2Strings.TIMELINE_SECTION.LABEL}
                    </label>

                    <div className="qc-timeline-input-wrapper">
                      <input
                        type="text"
                        className="qc-timeline-input"
                        value={timelineDays}
                        onChange={(e) => setTimelineDays(e.target.value)}
                      />
                      <div className="qc-timeline-icon">
                        <Icon name="Pencil" size={ICON_SIZES.MD} />
                      </div>
                    </div>

                    {/* Day Pill Chips */}
                    <div className="qc-chips-row">
                      {step2Strings.TIMELINE_SECTION.DAY_OPTIONS.map((opt, idx) => {
                        const num = opt.split(" ")[0];
                        const isSel = timelineDays === num;
                        return (
                          <div
                            key={idx}
                            className={`qc-day-chip ${isSel ? "selected" : ""}`}
                            onClick={() => setTimelineDays(num)}
                          >
                            {opt}
                          </div>
                        );
                      })}
                    </div>

                    {/* Estimated Completion Date Row */}
                    <div className="qc-completion-date-row">
                      <Icon name="Calendar" size={ICON_SIZES.SM} color="#475569" />
                      <span>{step2Strings.TIMELINE_SECTION.COMPLETION_LABEL}</span>
                      <span style={{ fontWeight: 700, color: "#111827" }}>
                        {step2Strings.TIMELINE_SECTION.DEFAULT_DATE}
                      </span>
                    </div>
                  </div>

                  {/* Section Divider */}
                  <div className="qc-section-divider" />

                  {/* Section 3: Quest Type */}
                  <div>
                    <h3 className="qc-section-heading">
                      {step2Strings.QUEST_TYPE_SECTION.TITLE}
                    </h3>

                    <div className="qc-type-grid">
                      {step2Strings.QUEST_TYPE_SECTION.TYPES.map((t) => {
                        const isSel = selectedQuestType === t.id;
                        return (
                          <div
                            key={t.id}
                            className={`qc-type-card ${isSel ? "selected" : ""}`}
                            onClick={() => setSelectedQuestType(t.id)}
                          >
                            <div className="qc-type-card-top">
                              <div className={`qc-type-icon-box ${t.id === "emergency" ? "emergency" : t.id === "long-term" ? "longterm" : "standard"}`}>
                                <Icon
                                  name={t.icon}
                                  size={ICON_SIZES.DEFAULT}
                                  color={t.id === "emergency" ? "#BA1A1A" : t.id === "long-term" ? "#6B38D4" : "#0051DF"}
                                />
                              </div>
                              {t.badge && (
                                <span className="qc-priority-badge">{t.badge}</span>
                              )}
                              {isSel && !t.badge && (
                                <div className="qc-type-check-badge">
                                  <Icon name="Check" size={ICON_SIZES.MICRO} color="#ffffff" />
                                </div>
                              )}
                            </div>
                            <h4 className="qc-type-title">{t.title}</h4>
                            <p className="qc-type-desc">{t.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Cards>

                {/* Right Column: Cards */}
                <div className="qc-side-col">
                  {/* Card 1: Completion (12%) */}
                  <Cards shadow="none" className="qc-side-card">
                    <div className="qc-completion-header">
                      <h4 className="qc-completion-title">{step2Strings.COMPLETION_CARD.TITLE}</h4>
                      <span className="qc-completion-percent">
                        {step2Strings.COMPLETION_CARD.PERCENT}
                      </span>
                    </div>
                    <div className="qc-progress-track">
                      <div className="qc-progress-bar" style={{ width: "12%" }} />
                    </div>
                    <p className="qc-step-info">{step2Strings.COMPLETION_CARD.STEP_TEXT}</p>
                  </Cards>

                  {/* Card 2: Quest Summary */}
                  <Cards shadow="none" className="qc-side-card">
                    <h4 className="qc-summary-title">{step2Strings.SUMMARY_CARD.TITLE}</h4>

                    <div className="qc-summary-group">
                      <div className="qc-summary-label">
                        {step2Strings.SUMMARY_CARD.FIELDS.PROJECT_TITLE}
                      </div>
                      <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#111827" }}>
                        {step2Strings.SUMMARY_CARD.DEFAULT_PROJECT_TITLE}
                      </div>
                    </div>

                    <div className="qc-summary-grid">
                      <div className="qc-summary-group">
                        <div className="qc-summary-label">
                          {step2Strings.SUMMARY_CARD.FIELDS.CATEGORY}
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>
                          {step2Strings.SUMMARY_CARD.DEFAULT_CATEGORY}
                        </div>
                      </div>
                      <div className="qc-summary-group">
                        <div className="qc-summary-label">
                          {step2Strings.SUMMARY_CARD.FIELDS.BUDGET}
                        </div>
                        <div className="qc-summary-val">
                          {step2Strings.SUMMARY_CARD.FIELDS.PENDING}
                        </div>
                      </div>
                      <div className="qc-summary-group">
                        <div className="qc-summary-label">
                          {step2Strings.SUMMARY_CARD.FIELDS.TIMELINE}
                        </div>
                        <div className="qc-summary-val">
                          {step2Strings.SUMMARY_CARD.FIELDS.PENDING}
                        </div>
                      </div>
                      <div className="qc-summary-group">
                        <div className="qc-summary-label">
                          {step2Strings.SUMMARY_CARD.FIELDS.SKILLS}
                        </div>
                        <div className="qc-summary-val">
                          {step2Strings.SUMMARY_CARD.FIELDS.PENDING}
                        </div>
                      </div>
                    </div>
                  </Cards>

                  {/* Card 3: Helpful Tips */}
                  <Cards shadow="none" className="qc-helpful-tips-card">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                      <Icon name="Lightbulb" size={ICON_SIZES.MID} color="#103ca4" />
                      <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#103ca4", margin: 0, letterSpacing: "0.5px" }}>
                        {step2Strings.HELPFUL_TIPS_CARD.TITLE}
                      </h4>
                    </div>
                    <ul style={{ listStyle: "disc", paddingLeft: "18px", margin: 0 }}>
                      {step2Strings.HELPFUL_TIPS_CARD.TIPS.map((tip, idx) => (
                        <li key={idx} style={{ fontSize: "11.5px", color: "#334155", lineHeight: 1.45, marginBottom: "8px" }}>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </Cards>
                </div>
              </div>
            )}



            {/* STEP 3: REVIEW & PUBLISH */}
            {currentStep === 3 && (
              <div className="qc-main-grid">
                {/* Left Column: Review Cards & Preview */}
                <div className="qc-review-left-col">
                  {/* Card 1: Basic Information */}
                  <Cards shadow="none" className="qc-card qc-review-card">
                    <div className="qc-review-card-header">
                      <div className="qc-review-title-group">
                        <div className="qc-review-icon-box">
                          <Icon name="Info" size={ICON_SIZES.SM} color="#0051DF" />
                        </div>
                        <h3 className="qc-review-card-title">{step3Strings.BASIC_INFO_CARD.TITLE}</h3>
                      </div>
                      <button
                        type="button"
                        className="qc-review-edit-btn"
                        onClick={() => goToStep(1)}
                      >
                        <Icon name="Pencil" size={ICON_SIZES["2XS"]} color="#0051DF" />
                        <span>Edit</span>
                      </button>
                    </div>

                    <div className="qc-review-fields-grid">
                      <div>
                        <div className="qc-review-field-label">{step3Strings.BASIC_INFO_CARD.FIELDS.QUEST_TITLE_LABEL}</div>
                        <div className="qc-review-field-val bold">{step3Strings.BASIC_INFO_CARD.FIELDS.QUEST_TITLE_VAL}</div>
                      </div>
                      <div>
                        <div className="qc-review-field-label">{step3Strings.BASIC_INFO_CARD.FIELDS.CATEGORY_LABEL}</div>
                        <div className="qc-review-field-val bold">{step3Strings.BASIC_INFO_CARD.FIELDS.CATEGORY_VAL}</div>
                      </div>
                      <div>
                        <div className="qc-review-field-label">{step3Strings.BASIC_INFO_CARD.FIELDS.SCOPE_LABEL}</div>
                        <div className="qc-review-field-val bold">{step3Strings.BASIC_INFO_CARD.FIELDS.SCOPE_VAL}</div>
                      </div>
                      <div>
                        <div className="qc-review-field-label">{step3Strings.BASIC_INFO_CARD.FIELDS.INDUSTRY_LABEL}</div>
                        <div className="qc-review-field-val bold">{step3Strings.BASIC_INFO_CARD.FIELDS.INDUSTRY_VAL}</div>
                      </div>
                    </div>

                    <div className="qc-review-desc-group">
                      <div className="qc-review-field-label">{step3Strings.BASIC_INFO_CARD.FIELDS.DESCRIPTION_LABEL}</div>
                      <div className="qc-review-desc-text">
                        {step3Strings.BASIC_INFO_CARD.FIELDS.DESCRIPTION_VAL}{" "}
                        <span className="qc-review-view-more">{step3Strings.BASIC_INFO_CARD.FIELDS.VIEW_MORE}</span>
                      </div>
                    </div>
                  </Cards>

                  {/* Card 2: Budget & Timeline */}
                  <Cards shadow="none" className="qc-card qc-review-card">
                    <div className="qc-review-card-header">
                      <div className="qc-review-title-group">
                        <div className="qc-review-icon-box">
                          <Icon name="CreditCard" size={ICON_SIZES.SM} color="#0051DF" />
                        </div>
                        <h3 className="qc-review-card-title">{step3Strings.BUDGET_TIMELINE_CARD.TITLE}</h3>
                      </div>
                      <button
                        type="button"
                        className="qc-review-edit-btn"
                        onClick={() => goToStep(2)}
                      >
                        <Icon name="Pencil" size={ICON_SIZES["2XS"]} color="#0051DF" />
                        <span>Edit</span>
                      </button>
                    </div>

                    <div className="qc-review-4col-grid">
                      <div>
                        <div className="qc-review-field-label">{step3Strings.BUDGET_TIMELINE_CARD.FIELDS.TOTAL_BUDGET_LABEL}</div>
                        <div className="qc-review-field-val blue-large">{step3Strings.BUDGET_TIMELINE_CARD.FIELDS.TOTAL_BUDGET_VAL}</div>
                      </div>
                      <div>
                        <div className="qc-review-field-label">{step3Strings.BUDGET_TIMELINE_CARD.FIELDS.TIMELINE_LABEL}</div>
                        <div className="qc-review-field-val bold">{step3Strings.BUDGET_TIMELINE_CARD.FIELDS.TIMELINE_VAL}</div>
                      </div>
                      <div>
                        <div className="qc-review-field-label">{step3Strings.BUDGET_TIMELINE_CARD.FIELDS.TYPE_LABEL}</div>
                        <div className="qc-review-field-val bold">{step3Strings.BUDGET_TIMELINE_CARD.FIELDS.TYPE_VAL}</div>
                      </div>
                      <div>
                        <div className="qc-review-field-label">{step3Strings.BUDGET_TIMELINE_CARD.FIELDS.REC_RANK_LABEL}</div>
                        <span className="qc-rank-a-badge">{step3Strings.BUDGET_TIMELINE_CARD.FIELDS.REC_RANK_VAL}</span>
                      </div>
                    </div>
                  </Cards>

                  {/* QUEST PREVIEW SECTION */}
                  <div className="qc-preview-section">
                    <div className="qc-preview-heading">{step3Strings.PREVIEW_SECTION.TITLE}</div>

                    <Cards shadow="none" className="qc-card qc-preview-card">
                      <div className="qc-preview-top-row">
                        <div className="qc-preview-badges">
                          <span className="qc-preview-quest-badge">{step3Strings.PREVIEW_SECTION.BADGE_QUEST}</span>
                          <span className="qc-rank-a-badge">{step3Strings.PREVIEW_SECTION.BADGE_RANK}</span>
                        </div>
                        <div className="qc-preview-price">{step3Strings.PREVIEW_SECTION.PRICE}</div>
                      </div>

                      <h3 className="qc-preview-title">{step3Strings.PREVIEW_SECTION.PROJECT_TITLE}</h3>

                      <div className="qc-preview-tags-row">
                        {step3Strings.PREVIEW_SECTION.TAGS.map((t, idx) => (
                          <span key={idx} className="qc-preview-tag">{t}</span>
                        ))}
                      </div>

                      <div className="qc-preview-bottom-row">
                        <div className="qc-preview-client-left">
                          <div className="qc-client-avatar">{step3Strings.PREVIEW_SECTION.CLIENT_INITIALS}</div>
                          <div>
                            <div className="qc-client-name">{step3Strings.PREVIEW_SECTION.CLIENT_NAME}</div>
                            <div className="qc-client-verified-row">
                              <div className="qc-verified-client-badge">
                                <Icon name="Check" size={ICON_SIZES["4XS"]} strokeWidth={3} color="#ffffff" />
                              </div>
                              <span>{step3Strings.PREVIEW_SECTION.CLIENT_VERIFIED}</span>
                            </div>
                          </div>
                        </div>

                        <div className="qc-preview-duration-col">
                          <span className="qc-preview-duration-label">{step3Strings.PREVIEW_SECTION.DURATION_LABEL}</span>
                          <span className="qc-preview-duration-val">{step3Strings.PREVIEW_SECTION.DURATION_VAL}</span>
                        </div>
                      </div>
                    </Cards>
                  </div>
                </div>

                {/* Right Column: Cards */}
                <div className="qc-side-col">
                  {/* Card 1: Completion (75%) */}
                  <Cards shadow="none" className="qc-side-card">
                    <div className="qc-completion-header">
                      <h4 className="qc-completion-title">{step3Strings.COMPLETION_CARD.TITLE}</h4>
                      <span className="qc-completion-percent">{step3Strings.COMPLETION_CARD.PERCENT}</span>
                    </div>
                    <div className="qc-progress-track">
                      <div className="qc-progress-bar" style={{ width: "75%" }} />
                    </div>
                    <p className="qc-step-info">{step3Strings.COMPLETION_CARD.STEP_TEXT}</p>
                  </Cards>

                  {/* Card 2: Ready to Publish */}
                  <Cards shadow="none" className="qc-side-card">
                    <h4 className="qc-ready-title">{step3Strings.READY_CARD.TITLE}</h4>
                    <div className="qc-ready-list">
                      {step3Strings.READY_CARD.ITEMS.map((item, idx) => (
                        <div key={idx} className="qc-ready-item">
                          <div className="qc-ready-check-icon">
                            <Icon name="Check" size={ICON_SIZES["3XS"]} color="#ffffff" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="qc-ready-banner">
                      {step3Strings.READY_CARD.BANNER_TEXT}
                    </div>
                  </Cards>

                  {/* Card 3: Quest Summary */}
                  <Cards shadow="none" className="qc-side-card">
                    <h4 className="qc-summary-title">{step3Strings.SUMMARY_CARD.TITLE}</h4>

                    <div className="qc-summary-group">
                      <div className="qc-summary-label">
                        {step3Strings.SUMMARY_CARD.FIELDS.PROJECT_TITLE}
                      </div>
                      <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#111827" }}>
                        {step3Strings.SUMMARY_CARD.DEFAULT_PROJECT_TITLE}
                      </div>
                    </div>

                    <div className="qc-summary-grid">
                      <div className="qc-summary-group">
                        <div className="qc-summary-label">
                          {step3Strings.SUMMARY_CARD.FIELDS.CATEGORY}
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>
                          {step3Strings.SUMMARY_CARD.DEFAULT_CATEGORY}
                        </div>
                      </div>
                      <div className="qc-summary-group">
                        <div className="qc-summary-label">
                          {step3Strings.SUMMARY_CARD.FIELDS.BUDGET}
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>
                          {step3Strings.SUMMARY_CARD.DEFAULT_BUDGET}
                        </div>
                      </div>
                      <div className="qc-summary-group">
                        <div className="qc-summary-label">
                          {step3Strings.SUMMARY_CARD.FIELDS.TIMELINE}
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>
                          {step3Strings.SUMMARY_CARD.DEFAULT_TIMELINE}
                        </div>
                      </div>
                    </div>
                  </Cards>


                </div>
              </div>
            )}

            {/* STEP 4: QUEST PUBLISHED SUCCESSFULLY */}
            {currentStep === 4 && (
              <div className="qc-main-grid step4-grid">
                {/* Left Column: Congratulations, Quest Details & What's Next */}
                <div className="qc-published-left-col">
                  {/* Card 1: Congratulations Card */}
                  <Cards shadow="none" className="qc-card qc-congrats-card">
                    <div className="qc-congrats-circle">
                      <Icon name="BadgeCheckFill" size={ICON_SIZES.HERO} color="#008678" />
                    </div>

                    <span className="qc-quest-live-badge">{step4Strings.CONGRATS_CARD.BADGE}</span>

                    <h2 className="qc-congrats-title">{step4Strings.CONGRATS_CARD.TITLE}</h2>
                    <p className="qc-congrats-desc">{step4Strings.CONGRATS_CARD.DESCRIPTION}</p>
                  </Cards>

                  {/* Card 2: Quest Details Card */}
                  <Cards shadow="none" className="qc-card qc-details-summary-card">
                    <div className="qc-details-header-row">
                      <div>
                        <h3 className="qc-details-title">{step4Strings.QUEST_DETAILS_CARD.TITLE}</h3>
                        <span className="qc-details-ref">{step4Strings.QUEST_DETAILS_CARD.REF}</span>
                      </div>
                      <div className="qc-details-badge-group">
                        <span className="qc-details-category">{step4Strings.QUEST_DETAILS_CARD.CATEGORY}</span>
                        <span className="qc-funded-badge">{step4Strings.QUEST_DETAILS_CARD.FUNDED_BADGE}</span>
                      </div>
                    </div>

                    <div className="qc-details-metrics-grid">
                      {step4Strings.QUEST_DETAILS_CARD.METRICS.map((m, idx) => (
                        <div key={idx} className="qc-metric-box">
                          <span className="qc-metric-label">{m.label}</span>
                          <span className={`qc-metric-val ${m.isGreen ? "green" : ""}`}>{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </Cards>

                  {/* Section 3: What's Next? */}
                  <div className="qc-whats-next-section">
                    <h3 className="qc-whats-next-heading">{step4Strings.WHATS_NEXT.TITLE}</h3>
                    <div className="qc-whats-next-grid">
                      {step4Strings.WHATS_NEXT.STEPS.map((step, idx) => (
                        <Cards key={idx} shadow="none" className="qc-card qc-whats-next-card">
                          <div
                            className="qc-wn-icon-box"
                            style={{ backgroundColor: step.iconBg }}
                          >
                            <Icon name={step.icon} size={ICON_SIZES.DEFAULT} color={step.iconColor} />
                          </div>
                          <h4 className="qc-wn-title">{step.title}</h4>
                          <p className="qc-wn-desc">{step.description}</p>
                        </Cards>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Cards */}
                <div className="qc-side-col">
                  {/* Card 1: Completion (100%) */}
                  <Cards shadow="none" className="qc-side-card">
                    <div className="qc-completion-header">
                      <h4 className="qc-completion-title">{step4Strings.COMPLETION_CARD.TITLE}</h4>
                      <span className="qc-completion-percent">{step4Strings.COMPLETION_CARD.PERCENT}</span>
                    </div>
                    <div className="qc-progress-track">
                      <div className="qc-progress-bar" style={{ width: "100%" }} />
                    </div>
                    <p className="qc-step-info">{step4Strings.COMPLETION_CARD.STEP_TEXT}</p>
                  </Cards>

                  {/* Card 2: Real-Time Visibility */}
                  <Cards shadow="none" className="qc-side-card">
                    <h4 className="qc-side-header-title">{step4Strings.VISIBILITY_CARD.TITLE}</h4>
                    <div className="qc-visibility-list">
                      <div className="qc-visibility-item">
                        <div className="qc-visibility-dot" />
                        <div>
                          <div className="qc-visibility-label">{step4Strings.VISIBILITY_CARD.ITEMS[0].label}</div>
                          <div className="qc-visibility-val bold">{step4Strings.VISIBILITY_CARD.ITEMS[0].value}</div>
                        </div>
                      </div>

                      <div className="qc-visibility-item">
                        <div className="qc-visibility-icon">
                          <Icon name="Users" size={ICON_SIZES.SM} color="#475569" />
                        </div>
                        <div>
                          <div className="qc-visibility-label">{step4Strings.VISIBILITY_CARD.ITEMS[1].label}</div>
                          <div className="qc-visibility-val bold">{step4Strings.VISIBILITY_CARD.ITEMS[1].value}</div>
                        </div>
                      </div>

                      <div className="qc-visibility-item">
                        <div className="qc-visibility-icon">
                          <Icon name="ShieldCheck" size={ICON_SIZES.SM} color="#475569" />
                        </div>
                        <div>
                          <div className="qc-visibility-label">{step4Strings.VISIBILITY_CARD.ITEMS[2].label}</div>
                          <div className="qc-visibility-val green bold">{step4Strings.VISIBILITY_CARD.ITEMS[2].value}</div>
                        </div>
                      </div>
                    </div>
                  </Cards>

                  {/* Card 3: Actions */}
                  <Cards shadow="none" className="qc-side-card">
                    <h4 className="qc-side-header-title">{step4Strings.ACTIONS_CARD.TITLE}</h4>
                    <div className="qc-actions-list">
                      {step4Strings.ACTIONS_CARD.ITEMS.map((act, idx) => (
                        <div
                          key={idx}
                          className="qc-action-row-item"
                          onClick={() => {
                            if (act.icon === "Eye") {
                              goToViewQuest(activeQuestId || "TQ-2023-9842");
                            } else if (act.icon === "UserCheck") {
                              navigate("/client-applications");
                            }
                          }}
                        >
                          <div className="qc-action-row-left">
                            <Icon name={act.icon} size={ICON_SIZES.SM} color="#64748b" />
                            <span>{act.label}</span>
                          </div>
                          <Icon name="ChevronRight" size={ICON_SIZES.XS} color="#94a3b8" />
                        </div>
                      ))}
                    </div>
                  </Cards>

                  {/* Card 4: Pro Tip Card */}
                  <Cards shadow="none" className="qc-pro-tip-card">
                    <div className="qc-pro-tip-header">
                      <Icon name="Lightbulb" size={ICON_SIZES.SM} color="#103ca4" />
                      <span className="qc-pro-tip-title">{step4Strings.PRO_TIP_CARD.TITLE}</span>
                    </div>
                    <p className="qc-pro-tip-desc">{step4Strings.PRO_TIP_CARD.DESCRIPTION}</p>
                    <a href="#tips" className="qc-pro-tip-link">
                      <span>{step4Strings.PRO_TIP_CARD.LINK_TEXT}</span>
                      <Icon name="ExternalLink" size={ICON_SIZES.XS} color="#103ca4" />
                    </a>
                  </Cards>
                </div>
              </div>
            )}

            {/* Bottom Actions Row */}
            {currentStep === 4 ? (
              <div className="qc-published-bottom-bar">
                <div className="qc-published-left-actions">
                  <button
                    type="button"
                    className="qc-published-view-btn"
                    onClick={() => goToViewQuest(activeQuestId || "TQ-2023-9842")}
                  >
                    <Icon name="Eye" size={ICON_SIZES.MD} color="#ffffff" stroke="#ffffff" />
                    <span>{step4Strings.BOTTOM_BAR.VIEW_QUEST}</span>
                  </button>
                  <button
                    type="button"
                    className="qc-published-dash-btn"
                    onClick={() => navigate("/client-dashboard")}
                  >
                    <span>{step4Strings.BOTTOM_BAR.GO_DASHBOARD}</span>
                  </button>
                </div>

                <button
                  type="button"
                  className="qc-published-create-btn"
                  onClick={() => goToStep(1)}
                >
                  <span>{step4Strings.BOTTOM_BAR.CREATE_ANOTHER}</span>
                </button>
              </div>
            ) : (
              <div className="qc-bottom-actions">
                <button
                  type="button"
                  className="qc-prev-btn"
                  onClick={handleBack}
                >
                  <Icon name="ArrowLeft" size={ICON_SIZES.DEFAULT} color="#0C2F82" strokeWidth={2.2} />
                  <span>{createStrings.ACTIONS.PREVIOUS}</span>
                </button>

                <div className="qc-actions-right">
                  <button type="button" className="qc-draft-btn">
                    {createStrings.ACTIONS.SAVE_DRAFT}
                  </button>
                  <button
                    type="button"
                    className="qc-next-btn"
                    onClick={currentStep === 3 ? handlePublish : handleNextStep}
                  >
                    <span>
                      {currentStep === 3
                        ? step3Strings.ACTIONS.PUBLISH
                        : createStrings.ACTIONS.NEXT_STEP}
                    </span>
                    <Icon name="ArrowRight" size={ICON_SIZES.MD} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
