import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Info,
  Check,
  ArrowRight,
  FileText,
  Database,
  Users,
  Trophy,
  Eye,
  BarChart3,
  Gift,
  Lightbulb,
  Lock,
} from "lucide-react";
import { DashboardLayout, BaseCard, SecondaryButton } from "@/Components";
import "./reputation-rank.css";

const RANKS_LADDER = [
  { code: "F", status: "Current", state: "current" },
  { code: "E", status: "Next", state: "next" },
  { code: "D", status: "Locked", state: "locked" },
  { code: "C", status: "Locked", state: "locked" },
  { code: "B", status: "Locked", state: "locked" },
  { code: "A", status: "Locked", state: "locked" },
  { code: "S", status: "Locked", state: "locked" },
  { code: "SS", status: "Locked", state: "locked" },
  { code: "SSS", status: "Locked", state: "locked" },
];

const STEPPER_RANKS = ["F", "E", "D", "C", "B", "A", "S", "SS", "SSS"];

export default function ReputationRank() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="rank-progression-container">
        {/* Page Header */}
        <div className="rank-page-header">
          <div>
            <h1 className="rank-page-title">Rank Progression</h1>
            <p className="rank-page-subtitle">
              Complete quests, build trust, and grow in TechGuild. Higher ranks unlock better opportunities, visibility and rewards.
            </p>
          </div>

          <SecondaryButton
            type="button"
            className="rank-help-btn"
            onClick={() => navigate("/help-support")}
            icon={<Info size={16} color="#2563eb" />}
          >
            Need Help ? Contact us
          </SecondaryButton>
        </div>

        {/* Row 1: Progress to Rank E Banner + Next Rank Preview */}
        <div className="rank-grid-row">
          {/* Progress to Rank E Banner */}
          <BaseCard
            variant="base"
            className="rank-card"
            padding="24px"
          >
            <BaseCard.Body padding="0">
              <div className="rank-progress-banner">
                {/* Left Shield Box */}
                <BaseCard
                  variant="base"
                  className="rank-shield-box"
                  radius="14px"
                  bg="#edf5ff"
                  border={false}
                  shadow="none"
                  padding="20px 14px"
                >
                  <div className="rank-shield-graphic">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Background Shield */}
                      <path
                        d="M62 14L84 22V50C84 68 62 82 62 82C62 82 40 68 40 50V22L62 14Z"
                        fill="#bfdbfe"
                        fillOpacity="0.5"
                      />
                      {/* Foreground Shield */}
                      <path
                        d="M48 10L72 19V48C72 67 48 81 48 81C48 81 24 67 24 48V19L48 10Z"
                        fill="#dbeafe"
                        stroke="#93c5fd"
                        strokeWidth="2"
                      />
                      {/* Inner F symbol with Serif styling matching Figma */}
                      <text
                        x="48"
                        y="51"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontFamily="Georgia, 'Times New Roman', serif"
                        fontWeight="700"
                        fontSize="38"
                        fill="#103ca4"
                      >
                        F
                      </text>
                    </svg>
                  </div>

                  <BaseCard.Badge className="rank-shield-pill">
                    Freelancer
                  </BaseCard.Badge>
                </BaseCard>

                {/* Right Details */}
                <div className="rank-progress-details">
                  <BaseCard.Header style={{ padding: 0, border: "none", marginBottom: "14px" }}>
                    <BaseCard.Title className="rank-card-title">Progress to Rank E</BaseCard.Title>
                    <BaseCard.Subtitle className="rank-card-subtitle" style={{ margin: 0 }}>
                      You&apos;re on your way! Complete the requirements below to unlock Rank E.
                    </BaseCard.Subtitle>
                  </BaseCard.Header>

                  {/* Stepper */}
                  <div className="rank-stepper-wrap">
                    <div className="rank-stepper">
                      {STEPPER_RANKS.map((rank, index) => {
                        const isCompleted = index === 0;
                        const isTarget = index === 1;

                        return (
                          <React.Fragment key={rank}>
                            <BaseCard
                              variant="base"
                              className={`rank-step-node ${
                                isCompleted
                                  ? "completed"
                                  : isTarget
                                  ? "active-target"
                                  : "locked"
                              }`}
                              radius="circle"
                              border={isTarget ? "1.5px solid #3b82f6" : false}
                              shadow={isCompleted ? "0 2px 6px rgba(16, 60, 164, 0.35)" : "none"}
                              bg={isCompleted ? "#103ca4" : isTarget ? "#ffffff" : "#f1f5f9"}
                              color={isCompleted ? "#ffffff" : isTarget ? "#1d4ed8" : "#94a3b8"}
                              padding="0"
                            >
                              {rank}
                            </BaseCard>

                            {index < STEPPER_RANKS.length - 1 && (
                              <div
                                className={`rank-step-line ${index === 0 ? "completed" : ""}`}
                              />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary Bar */}
                  <BaseCard
                    variant="base"
                    className="rank-summary-bar"
                    radius="10px"
                    bg="rgba(255, 255, 255, 0.4)"
                    border="1px solid #edf2f7"
                    shadow="none"
                    padding="12px 24px"
                  >
                    <div className="rank-summary-col">
                      <span className="rank-summary-label">Complete all requirements to reach</span>
                      <span
                        className="rank-summary-value interactive"
                        onClick={() => {
                          const el = document.getElementById("rank-requirements-section");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Rank E <ArrowRight size={15} />
                      </span>
                    </div>

                    <div className="rank-summary-divider" />

                    <div className="rank-summary-col" style={{ textAlign: "right" }}>
                      <span className="rank-summary-label">Your Progress</span>
                      <span className="rank-summary-value" style={{ justifyContent: "flex-end" }}>50%</span>
                    </div>
                  </BaseCard>
                </div>
              </div>
            </BaseCard.Body>
          </BaseCard>

          {/* Next Rank Preview Card */}
          <BaseCard
            variant="base"
            className="rank-card"
            padding="24px"
          >
            <BaseCard.Header style={{ padding: 0, border: "none", marginBottom: "14px" }}>
              <BaseCard.Subtitle className="rank-summary-label" style={{ margin: 0, fontWeight: 600 }}>
                Next Rank Preview
              </BaseCard.Subtitle>
            </BaseCard.Header>

            <BaseCard.Body padding="0">
              <div className="next-rank-badge-row">
                <BaseCard
                  variant="base"
                  className="next-rank-badge"
                  radius="8px"
                  bg="#eff6ff"
                  border={false}
                  shadow="none"
                  padding="0"
                >
                  E
                </BaseCard>
                <div className="next-rank-name">Rank E</div>
              </div>

              <div className="next-rank-perks">
                {[
                  "Access to more quest categories",
                  "Higher project visibility",
                  "Build stronger credibility",
                  "Unlock new opportunities",
                ].map((perk) => (
                  <BaseCard
                    key={perk}
                    variant="base"
                    className="next-rank-perk-item"
                    radius="8px"
                    bg="transparent"
                    border={false}
                    shadow="none"
                    padding="0"
                  >
                    <BaseCard
                      variant="base"
                      className="next-rank-check-circle"
                      radius="circle"
                      border={false}
                      shadow="none"
                      padding="0"
                    >
                      <Check size={11} strokeWidth={2.5} />
                    </BaseCard>
                    <span>{perk}</span>
                  </BaseCard>
                ))}
              </div>
            </BaseCard.Body>
          </BaseCard>
        </div>

        {/* Row 2: Requirements + Why Rank Up? */}
        <div className="rank-grid-row" id="rank-requirements-section">
          {/* Rank E Requirements */}
          <BaseCard
            variant="base"
            className="rank-card"
            padding="24px"
          >
            <BaseCard.Header style={{ padding: 0, border: "none", marginBottom: "16px" }}>
              <BaseCard.Title className="rank-card-title">Rank E Requirements</BaseCard.Title>
              <BaseCard.Subtitle className="rank-card-subtitle" style={{ margin: 0 }}>
                Complete all the requirements below to reach Rank E.
              </BaseCard.Subtitle>
            </BaseCard.Header>

            <BaseCard.Body padding="0">
              <div className="rank-requirements-list">
                {/* Item 1: Identity Verification */}
                <BaseCard
                  variant="base"
                  className="rank-requirement-item"
                  radius="12px"
                  bg="rgba(255, 255, 255, 0.3)"
                  border="1px solid rgba(226, 232, 240, 0.6)"
                  shadow="none"
                  padding="14px 18px"
                >
                  <div className="rank-requirement-left">
                    <BaseCard
                      variant="base"
                      className="rank-req-icon-box green"
                      radius="10px"
                      border={false}
                      shadow="none"
                      padding="0"
                    >
                      <Check size={20} strokeWidth={2.5} />
                    </BaseCard>
                    <div>
                      <h3 className="rank-req-title">Identity Verification</h3>
                      <p className="rank-req-desc">Complete identity verification to build trust.</p>
                    </div>
                  </div>

                  <div className="rank-requirement-right">
                    <BaseCard.Badge className="rank-badge completed">
                      <Check size={13} strokeWidth={2.5} /> Completed
                    </BaseCard.Badge>
                  </div>
                </BaseCard>

                {/* Item 2: Successful Quests */}
                <BaseCard
                  variant="base"
                  className="rank-requirement-item"
                  radius="12px"
                  bg="rgba(255, 255, 255, 0.3)"
                  border="1px solid rgba(226, 232, 240, 0.6)"
                  shadow="none"
                  padding="14px 18px"
                >
                  <div className="rank-requirement-left">
                    <BaseCard
                      variant="base"
                      className="rank-req-icon-box blue"
                      radius="10px"
                      border={false}
                      shadow="none"
                      padding="0"
                    >
                      <FileText size={20} />
                    </BaseCard>
                    <div>
                      <h3 className="rank-req-title">Successful Quests</h3>
                      <p className="rank-req-desc">Complete 5 successful quests as a freelancer.</p>
                    </div>
                  </div>

                  <div className="rank-requirement-right">
                    <span className="rank-req-progress-text">2 / 5</span>
                    <BaseCard.Badge className="rank-badge in-progress">In Progress</BaseCard.Badge>
                  </div>
                </BaseCard>

                {/* Item 3: Trust Points */}
                <BaseCard
                  variant="base"
                  className="rank-requirement-item"
                  radius="12px"
                  bg="rgba(255, 255, 255, 0.3)"
                  border="1px solid rgba(226, 232, 240, 0.6)"
                  shadow="none"
                  padding="14px 18px"
                >
                  <div className="rank-requirement-left">
                    <BaseCard
                      variant="base"
                      className="rank-req-icon-box blue"
                      radius="10px"
                      border={false}
                      shadow="none"
                      padding="0"
                    >
                      <Database size={20} />
                    </BaseCard>
                    <div>
                      <h3 className="rank-req-title">Trust Points</h3>
                      <p className="rank-req-desc">Earn 100 Trust Points through completed work and positive activity.</p>
                    </div>
                  </div>

                  <div className="rank-requirement-right">
                    <span className="rank-req-progress-text">60 / 100 TP</span>
                    <BaseCard.Badge className="rank-badge in-progress">In Progress</BaseCard.Badge>
                  </div>
                </BaseCard>

                {/* Item 4: Party Membership */}
                <BaseCard
                  variant="base"
                  className="rank-requirement-item"
                  radius="12px"
                  bg="rgba(255, 255, 255, 0.3)"
                  border="1px solid rgba(226, 232, 240, 0.6)"
                  shadow="none"
                  padding="14px 18px"
                >
                  <div className="rank-requirement-left">
                    <BaseCard
                      variant="base"
                      className="rank-req-icon-box blue"
                      radius="10px"
                      border={false}
                      shadow="none"
                      padding="0"
                    >
                      <Users size={20} />
                    </BaseCard>
                    <div>
                      <h3 className="rank-req-title">Party Membership</h3>
                      <p className="rank-req-desc">Join or create a Party to collaborate on projects.</p>
                    </div>
                  </div>

                  <div className="rank-requirement-right">
                    <div className="rank-req-party-status">
                      <span className="rank-req-party-label">Not Joined</span>
                      <span
                        className="rank-req-party-link"
                        onClick={() => navigate("/party-formation")}
                      >
                        Explore Parties <ArrowRight size={12} />
                      </span>
                    </div>
                    <BaseCard.Badge className="rank-badge required">Required</BaseCard.Badge>
                  </div>
                </BaseCard>
              </div>
            </BaseCard.Body>
          </BaseCard>

          {/* Why Rank Up? */}
          <BaseCard
            variant="base"
            className="rank-card"
            padding="24px"
          >
            <BaseCard.Header style={{ padding: 0, border: "none", marginBottom: "22px" }}>
              <BaseCard.Title className="rank-card-title" style={{ margin: 0 }}>
                Why Rank Up?
              </BaseCard.Title>
            </BaseCard.Header>

            <BaseCard.Body padding="0">
              <div className="why-rank-list">
                {[
                  { icon: <Trophy size={22} className="why-rank-icon" />, title: "Access to Better Projects", desc: "Higher ranks give you access to premium and high-value quests." },
                  { icon: <Eye size={22} className="why-rank-icon" />, title: "More Visibility", desc: "Your profile gets higher visibility in search and recommendations." },
                  { icon: <BarChart3 size={22} className="why-rank-icon" />, title: "Build Credibility", desc: "Higher ranks demonstrate your expertise, reliability and contribution." },
                  { icon: <Gift size={22} className="why-rank-icon" />, title: "Unlock New Features", desc: "Gain access to advanced tools, collaborations and exclusive opportunities." },
                ].map((item) => (
                  <BaseCard
                    key={item.title}
                    variant="base"
                    className="why-rank-item"
                    radius="10px"
                    bg="transparent"
                    border={false}
                    shadow="none"
                    padding="0"
                  >
                    {item.icon}
                    <div>
                      <h3 className="why-rank-title">{item.title}</h3>
                      <p className="why-rank-desc">{item.desc}</p>
                    </div>
                  </BaseCard>
                ))}
              </div>
            </BaseCard.Body>
          </BaseCard>
        </div>

        {/* Row 3: Your Rank Journey + Tips to Rank Up Faster */}
        <div className="rank-grid-row">
          {/* Your Rank Journey */}
          <BaseCard
            variant="base"
            className="rank-card"
            padding="24px"
          >
            <BaseCard.Header style={{ padding: 0, border: "none", marginBottom: "18px" }}>
              <BaseCard.Title className="rank-card-title">Your Rank Journey</BaseCard.Title>
              <BaseCard.Subtitle className="rank-card-subtitle" style={{ margin: 0 }}>
                Here&apos;s the complete TechGuild rank ladder. Keep going!
              </BaseCard.Subtitle>
            </BaseCard.Header>

            <BaseCard.Body padding="0">
              <div className="rank-ladder-wrapper">
                <div className="rank-ladder-track-line" />
                <div className="rank-ladder-list">
                  {RANKS_LADDER.map((item) => {
                    const isCurrent = item.state === "current";
                    const isNext = item.state === "next";

                    return (
                      <div key={item.code} className="rank-ladder-col">
                        <BaseCard
                          variant="base"
                          className={`rank-ladder-card ${
                            isCurrent ? "current" : isNext ? "next" : "locked"
                          }`}
                          radius="8px"
                          border={isNext ? "1.5px solid #bfdbfe" : isCurrent ? false : "1px solid #e2e8f0"}
                          bg={isCurrent ? "#103ca4" : isNext ? "#ffffff" : "#f1f5f9"}
                          color={isCurrent ? "#ffffff" : isNext ? "#1e40af" : "#64748b"}
                          shadow={isCurrent ? "0 4px 8px rgba(16, 60, 164, 0.35)" : "none"}
                          padding="0"
                        >
                          <span
                            className={`rank-ladder-card-letter ${item.code.length > 1 ? "small" : ""}`}
                          >
                            {item.code}
                          </span>
                          {!isCurrent && !isNext && (
                            <Lock size={11} className="rank-ladder-lock-icon" />
                          )}
                        </BaseCard>

                        <div className="rank-ladder-meta">
                          <span className={`rank-ladder-code ${isCurrent ? "current" : ""}`}>
                            {item.code}
                          </span>
                          <span className={`rank-ladder-status ${isCurrent ? "current" : isNext ? "next" : ""}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </BaseCard.Body>
          </BaseCard>

          {/* Tips to Rank Up Faster */}
          <BaseCard
            variant="base"
            className="rank-card"
            padding="24px"
          >
            <BaseCard.Header style={{ padding: 0, border: "none", marginBottom: "18px" }}>
              <div className="rank-tips-header" style={{ margin: 0 }}>
                <Lightbulb size={20} className="rank-tips-icon" />
                <BaseCard.Title className="rank-card-title" style={{ margin: 0, fontSize: "16px" }}>
                  Tips to Rank Up Faster
                </BaseCard.Title>
              </div>
            </BaseCard.Header>

            <BaseCard.Body padding="0">
              <div className="rank-tips-list">
                {[
                  "Complete your active quests successfully",
                  "Deliver high-quality work and earn positive reviews",
                  "Build your Trust Points",
                  "Complete all verification requirements",
                  "Join or create a Party",
                  "Maintain strong communication and reliability",
                ].map((tip) => (
                  <BaseCard
                    key={tip}
                    variant="base"
                    className="rank-tip-item"
                    radius="8px"
                    bg="transparent"
                    border={false}
                    shadow="none"
                    padding="0"
                  >
                    <Check size={14} strokeWidth={2.5} className="rank-tip-check" />
                    <span className="rank-tip-text">{tip}</span>
                  </BaseCard>
                ))}
              </div>
            </BaseCard.Body>
          </BaseCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
