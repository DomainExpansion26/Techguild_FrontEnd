import React from 'react';
import BaseCard from './BaseCard';
import Icon from '@/Components/icons/Icon';

function renderBadgeIcon(icon, defaultSize = 14) {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return icon;
  }
  if (typeof icon === 'string') {
    return <Icon name={icon} size={defaultSize} strokeWidth={2.5} className="trust-badge-icon" />;
  }
  return null;
}

export default function TrustCard({
  title = 'Trust Points',
  points = 10,
  value,
  unit = 'TP',
  rank = 'Rank F',
  badgeText = 'Email Verified',
  badgeIcon = 'Verified',
  description = 'Trust Points increase as you complete your profile, finish projects, and receive client reviews.',
  linkText = 'View Trust History',
  linkHref = '#trust-history',
  onLinkClick,
  delay = '0.08s',
  className = '',
  style = {},
  padding,
  ...props
}) {
  const displayPoints = value !== undefined ? value : points;
  const combinedStyle = {
    ...(delay ? { animationDelay: delay } : {}),
    ...style,
  };

  return (
    <BaseCard
      className={`db-card-fill trust-card-element animate-fade-in ${className}`}
      style={combinedStyle}
      padding={padding}
      {...props}
    >
      <div className="trust-card-inner">
        {title && <h4 className="trust-card-title">{title}</h4>}
        
        <div className="trust-card-value-container">
          <span className="trust-card-value">{displayPoints}</span>
          {unit && <span className="trust-card-unit">{unit}</span>}
        </div>

        {rank && <span className="trust-card-rank">{rank}</span>}

        {badgeText && (
          <div className="trust-card-badge">
            {renderBadgeIcon(badgeIcon, 14)}
            <span className="trust-badge-text">{badgeText}</span>
          </div>
        )}

        {description && (
          <p className="trust-card-desc">{description}</p>
        )}

        {linkText && (
          <a
            href={linkHref}
            onClick={onLinkClick}
            className="trust-card-link"
          >
            {linkText} <span className="trust-card-arrow">&gt;</span>
          </a>
        )}
      </div>
    </BaseCard>
  );
}
