// [TechGuild Update: 14-10-2026] Join Party — Step 4 success (Figma "Party 6", node 227:1036)
import React from "react";
import { Cards, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import { showSnackbar } from "@/store";
import { useDispatch } from "react-redux";
import "./joinsuccess.css";

const { SUCCESS } = APP_STRINGS.JOIN_PARTY;

/**
 * Same mark as Create Party step 5 — identical Figma construction
 * (radial glow -> #ecfdf5 -> #dcfce7 -> shield + centred white check).
 */
const CONFETTI = [
  { x: 151, y: -84, r: 8, color: "#3b82f6" },
  { x: -116, y: -81, r: 8, color: "#ef4444" },
  { x: 97, y: -69, r: 7, color: "#f59e0b" },
  { x: -154, y: -59, r: 8, color: "#f59e0b" },
  { x: -83, y: -54, r: 7, color: "#3b82f6" },
  { x: 129, y: -41, r: 8, color: "#ef4444" },
  { x: 69, y: -16, r: 7, color: "#10b981" },
  { x: -55, y: -10, r: 5, color: "#a855f7" },
  { x: 148, y: 7, r: 5, color: "#f59e0b" },
  { x: -138, y: 17, r: 6, color: "#a855f7" },
];

export default function JoinSuccess({ party, submissionId, onViewParty, onGoToManagement }) {
  const dispatch = useDispatch();

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(submissionId);
      dispatch(showSnackbar({ message: SUCCESS.COPIED, type: "success" }));
    } catch {
      dispatch(showSnackbar({ message: submissionId, type: "info" }));
    }
  };

  return (
    <>
      <Cards
        variant="base"
        className="js"
        radius="md"
        bg="#ffffff"
        border="1px solid #e5e7eb"
        padding="40px"
      >
        <div className="js__mark">
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className="js__confetti"
              style={{
                left: `calc(50% + ${c.x}px)`,
                top: `calc(50% + ${c.y}px)`,
                width: c.r,
                height: c.r,
                backgroundColor: c.color,
              }}
            />
          ))}
          <span className="js__disc js__disc--glow" />
          <span className="js__disc js__disc--outer" />
          <span className="js__disc js__disc--inner">
            <span className="js__shield">
              <Icon
                name="Shield"
                size={48}
                color="#16a34a"
                stroke="#16a34a"
                fill="#16a34a"
                strokeWidth={1.5}
              />
              <span className="js__tick">
                <Icon name="Check" size={13} color="#ffffff" stroke="#ffffff" strokeWidth={3.5} />
              </span>
            </span>
          </span>
        </div>

        <h1 className="js__title">{SUCCESS.TITLE}</h1>
        <p className="js__body">
          {SUCCESS.BODY.split("{party}")[0]}
          <strong className="js__body-name">{party.name}</strong>
          {SUCCESS.BODY.split("{party}")[1]}
          <br />
          {SUCCESS.BODY_2}
        </p>

        <div className="js__status">
          <Icon name="Clock" size={18} color="#00a63e" stroke="#00a63e" />
          <div>
            <span className="js__status-label">{SUCCESS.STATUS_LABEL}</span>
            <span className="js__status-value">{SUCCESS.STATUS_VALUE}</span>
          </div>
        </div>

        <div className="js__id">
          <div>
            <span className="js__id-label">{SUCCESS.SUBMISSION_ID_LABEL}</span>
            <span className="js__id-value">{submissionId}</span>
          </div>
          <SecondaryButton
            className="js__copy"
            text={SUCCESS.COPY_ID}
            icon={<Icon name="Files" size={ICON_SIZES.SM} color="#334155" stroke="#334155" />}
            iconPosition="left"
            onClick={copyId}
          />
        </div>

        <div className="js__actions">
          <SecondaryButton
            className="js__view"
            text={SUCCESS.VIEW_PARTY}
            icon={<Icon name="Eye" size={ICON_SIZES.SM} color="#334155" stroke="#334155" />}
            iconPosition="left"
            onClick={onViewParty}
          />
          <PrimaryButton
            className="js__go"
            text={SUCCESS.GO_TO_MANAGEMENT}
            icon={<Icon name="ArrowRight" size={ICON_SIZES.SM} color="#ffffff" stroke="#ffffff" />}
            iconPosition="right"
            onClick={onGoToManagement}
          />
        </div>
      </Cards>

      <div className="js__notice">
        <Icon name="CircleQuestionMark" size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />
        <div>
          <p className="js__notice-title">{SUCCESS.NOTICE_TITLE}</p>
          <p className="js__notice-body">{SUCCESS.NOTICE_BODY}</p>
        </div>
      </div>
    </>
  );
}
