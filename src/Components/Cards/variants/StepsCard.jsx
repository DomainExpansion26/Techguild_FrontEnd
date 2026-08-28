import React from 'react';
import BaseCard from './BaseCard';

export default function StepsCard({
  title = 'How it works',
  steps = [],
  delay,
  className = '',
  style = {},
  padding = 'clamp(14px, 1.5vw, 24px)',
  ...props
}) {
  const combinedStyle = {
    ...(delay ? { animationDelay: delay } : {}),
    ...style,
  };

  return (
    <BaseCard
      className={`db-card-fill steps-card-element animate-fade-in ${className}`}
      style={combinedStyle}
      padding={padding}
      {...props}
    >
      <div className="steps-card-inner" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '12px' }}>
        {title && (
          <h4 style={{ fontSize: 'clamp(0.82rem, 0.9vw, 1.15rem)', fontWeight: 600, color: '#111827', margin: 0 }}>
            {title}
          </h4>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'space-around' }}>
          {steps.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: '#103ca4',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {item.step || idx + 1}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1f2937' }}>
                  {item.title}
                </span>
                {item.desc && (
                  <span style={{ fontSize: '0.72rem', color: '#6b7280', lineHeight: 1.3 }}>
                    {item.desc}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseCard>
  );
}
