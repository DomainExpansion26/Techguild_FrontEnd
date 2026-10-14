// [TechGuild Update: 13-10-2026] Create Party wizard — Step 5 "Success" (Figma "Party 5", node 193:3742)
import React from "react";
import { Cards, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import { showSnackbar } from "@/store";
import { useDispatch } from "react-redux";
import "./success.css";

const { SUCCESS, ACTIONS } = APP_STRINGS.CREATE_PARTY;

/**
 * Success mark, rebuilt from Figma node 193:3874/3886/3887/3888:
 * 168px radial glow -> 120px #ecfdf5 -> 88px #dcfce7 -> 52x60 shield (#16a34a)
 * with a 14x10 white check centred inside it.
 * The confetti dots are the 10 real VECTOR nodes read off the frame
 * (offsets relative to the 168px glow's centre, r5-r8).
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

export default function SuccessStep({ draft, submissionId, onViewParty, onGoToManagement }) {
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
        className="cp-success"
        radius="md"
        bg="rgba(255,255,255,0.6)"
        border="1px solid #e7edf8"
        padding="48px 40px"
      >
        <div className="cp-success__mark">
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className="cp-success__confetti"
              style={{
                left: `calc(50% + ${c.x}px)`,
                top: `calc(50% + ${c.y}px)`,
                width: c.r,
                height: c.r,
                backgroundColor: c.color,
              }}
            />
          ))}
          <span className="cp-success__disc cp-success__disc--glow" />
          <span className="cp-success__disc cp-success__disc--outer" />
          <span className="cp-success__disc cp-success__disc--inner">
            <span className="cp-success__shield">
              <Icon
                name="Shield"
                size={48}
                color="#16a34a"
                stroke="#16a34a"
                fill="#16a34a"
                strokeWidth={1.5}
              />
              <span className="cp-success__tick">
                <Icon name="Check" size={13} color="#ffffff" stroke="#ffffff" strokeWidth={3.5} />
              </span>
            </span>
          </span>
        </div>

        <h2 className="cp-success__title">{SUCCESS.TITLE}</h2>
        <p className="cp-success__body">
          {SUCCESS.BODY.replace("{name}", draft.name || "Pixel Masters")}
          <br />
          {SUCCESS.BODY_2}
        </p>

        <div className="cp-success__status">
          <Icon name="Clock" size={ICON_SIZES.XL} color="#00a63e" stroke="#00a63e" />
          <div>
            <span className="cp-success__status-label">{SUCCESS.STATUS_LABEL}</span>
            <span className="cp-success__status-value">{SUCCESS.STATUS_VALUE}</span>
          </div>
        </div>

        <div className="cp-success__id">
          <div>
            <span className="cp-success__id-label">{SUCCESS.SUBMISSION_ID_LABEL}</span>
            <span className="cp-success__id-value">{submissionId}</span>
          </div>
          <SecondaryButton
            className="cp-success__copy"
            text={SUCCESS.COPY_ID}
            icon={<Icon name="Files" size={ICON_SIZES.SM} color="#374151" stroke="#374151" />}
            iconPosition="left"
            onClick={copyId}
          />
        </div>

        <div className="cp-success__actions">
          <SecondaryButton
            className="cp-success__view"
            text={ACTIONS.VIEW_PARTY}
            icon={<Icon name="Eye" size={ICON_SIZES.SM} color="#374151" stroke="#374151" />}
            iconPosition="left"
            onClick={onViewParty}
          />
          <PrimaryButton
            className="cp-success__go"
            text={ACTIONS.GO_TO_MANAGEMENT}
            icon={<Icon name="ArrowRight" size={ICON_SIZES.SM} color="#ffffff" stroke="#ffffff" />}
            iconPosition="right"
            onClick={onGoToManagement}
          />
        </div>
      </Cards>

      <div className="cp-notice">
        <Icon name="CircleQuestionMark" size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />
        <div>
          <p className="cp-notice__title">{SUCCESS.NOTICE_TITLE}</p>
          <p className="cp-notice__body">{SUCCESS.NOTICE_BODY}</p>
        </div>
      </div>
    </>
  );
}
