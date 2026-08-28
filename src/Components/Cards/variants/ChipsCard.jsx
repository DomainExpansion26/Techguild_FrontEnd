import React from 'react';
import BaseCard from './BaseCard';
import Icon from '@/Components/icons/Icon';

function renderIcon(icon, defaultSize = 14) {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return icon;
  }
  if (typeof icon === 'string') {
    return <Icon name={icon} size={defaultSize} style={{ flexShrink: 0 }} />;
  }
  return null;
}

export default function ChipsCard({
  title = 'Get Started',
  actionLinkText = 'Browse All Categories >',
  actionLinkHref = '#',
  onActionLinkClick,
  description = 'Find verified agencies and freelancers grouped by your next quest.',
  items = [],
  chips,
  onItemClick,
  delay,
  className = '',
  style = {},
  padding = 'clamp(14px, 1.5vw, 24px)',
  ...props
}) {
  const chipList = chips || items;
  const combinedStyle = {
    ...(delay ? { animationDelay: delay } : {}),
    ...style,
  };

  return (
    <BaseCard
      className={`db-card-fill chips-card-element animate-fade-in ${className}`}
      style={combinedStyle}
      padding={padding}
      {...props}
    >
      <div className="chips-card-inner" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {title && <h4 style={{ fontSize: 'clamp(0.82rem, 0.9vw, 1.15rem)', fontWeight: 600, color: '#111827', margin: 0 }}>{title}</h4>}
          {actionLinkText && (
            <a href={actionLinkHref} onClick={onActionLinkClick} className="trust-card-link" style={{ fontSize: '0.75rem' }}>
              {actionLinkText}
            </a>
          )}
        </div>
        {description && (
          <p style={{ fontSize: 'clamp(0.72rem, 0.78vw, 0.98rem)', color: '#6b7280', margin: 0, lineHeight: 1.3 }}>
            {description}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
          {chipList.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onItemClick && onItemClick(chip)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '50rem',
                border: '1px solid #E5E7EB',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                color: '#374151',
                fontSize: '0.75rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#103ca4';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#103ca4';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.color = '#374151';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              {chip.icon && renderIcon(chip.icon, 13)}
              <span>{chip.label || chip.name || chip}</span>
            </button>
          ))}
        </div>
      </div>
    </BaseCard>
  );
}
