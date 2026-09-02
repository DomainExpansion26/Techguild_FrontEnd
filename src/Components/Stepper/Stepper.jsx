import React from 'react';
import './stepper.css';

/**
 * Reusable Stepper Component
 * 
 * @param {Array} steps - Array of step strings (e.g. ['Step 1', 'Step 2']) or objects (e.g. [{ number: 1, label: 'Step 1' }])
 * @param {number} currentStep - 1-based index for current active step (e.g. 1, 2, 3...)
 * @param {function} onStepClick - Optional callback when a step circle/label is clicked
 * @param {boolean} allowClick - Whether steps can be clicked to navigate
 * @param {string} activeColor - Custom active/completed highlight color (default: #103ca4)
 * @param {string} className - Additional CSS class
 * @param {object} style - Additional inline styles
 */
export default function Stepper({
  steps = [],
  currentStep = 1,
  onStepClick,
  allowClick = false,
  activeColor = '#103ca4',
  className = '',
  style = {},
}) {
  if (!steps || steps.length === 0) return null;

  const totalSteps = steps.length;
  // Automatically compute dynamic track offsets so the line aligns with circle centers for any step count (3, 4, 5, etc.)
  const offsetPct = totalSteps > 1 ? 100 / (2 * totalSteps) : 50;
  const progressPct =
    totalSteps > 1
      ? Math.min(100, Math.max(0, ((currentStep - 1) / (totalSteps - 1)) * 100))
      : 100;

  const isClickable = Boolean(onStepClick || allowClick);

  return (
    <div className={`stepper-container ${className}`} style={style}>
      <div className="stepper-track">
        {/* Track Line */}
        <div
          className="stepper-track-line"
          style={{
            left: `${offsetPct}%`,
            right: `${offsetPct}%`,
          }}
        >
          <div
            className="stepper-active-line"
            style={{
              width: `${progressPct}%`,
              ...(activeColor ? { backgroundColor: activeColor } : {}),
            }}
          />
        </div>

        {/* Step Items */}
        {steps.map((step, index) => {
          const stepNumber = typeof step === 'object' && (step.number || step.id) ? (step.number || step.id) : index + 1;
          const stepLabel = typeof step === 'string' ? step : step.label || step.title || step.name || `Step ${stepNumber}`;
          const isActive = stepNumber <= currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={stepNumber || index}
              className={`stepper-item ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''} ${isClickable ? 'clickable' : ''}`}
              onClick={() => isClickable && onStepClick && onStepClick(stepNumber, step)}
              style={!isClickable ? { cursor: 'default', pointerEvents: 'none' } : {}}
            >
              <div
                className="stepper-circle"
                style={isActive && activeColor ? { backgroundColor: activeColor, borderColor: activeColor } : {}}
              >
                {stepNumber}
              </div>
              <span className="stepper-label">{stepLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
