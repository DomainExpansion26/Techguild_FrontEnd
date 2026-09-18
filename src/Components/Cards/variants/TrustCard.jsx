import React from 'react';
import BaseCard from './BaseCard';
import Icon from '@/Components/icons/Icon';
import { APP_STRINGS } from '@/constants/string';
import { ICON_SIZES } from '@/constants/sizes';

function renderBadgeIcon(icon, defaultSize = ICON_SIZES.XS) {
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
  title = APP_STRINGS.CARDS.TRUST.DEFAULT_TITLE,
  points = 10,
  value,
  unit = APP_STRINGS.CARDS.TRUST.DEFAULT_UNIT,
  rank = APP_STRINGS.CARDS.TRUST.DEFAULT_RANK,
  badgeText = APP_STRINGS.CARDS.TRUST.DEFAULT_BADGE,
  badgeIcon = 'Verified',
  description = APP_STRINGS.CARDS.TRUST.DEFAULT_DESC,
  linkText = APP_STRINGS.CARDS.TRUST.DEFAULT_LINK_TEXT,
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
