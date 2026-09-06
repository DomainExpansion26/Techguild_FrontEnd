import React from 'react';
import BaseCard from './BaseCard';
import Icon from '@/Components/icons/Icon';

function renderIcon(icon, defaultSize = 14, iconColor = '#FF9D3B') {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return icon;
  }
  if (typeof icon === 'string') {
    return <Icon name={icon} size={defaultSize} color={iconColor} stroke={iconColor} style={{ flexShrink: 0 }} />;
  }
  return null;
}

export default function TipBannerCard({
  icon = 'Lightbulb',
  iconColor = '#FF9D3B',
  message,
  text,
  children,
  actionText,
  linkText,
  actionHref = '#complete-profile',
  linkHref,
  onActionClick,
  delay = '0.36s',
  className = '',
  style = {},
  padding = '0',
  ...props
}) {
  const displayMsg = message || text || children;
  const displayAction = actionText || linkText;
  const displayHref = linkHref || actionHref;

  const combinedStyle = {
    ...(delay ? { animationDelay: delay } : {}),
    ...style,
  };

  return (
    <BaseCard
      className={`tip-banner-card animate-fade-in ${className}`}
      padding={padding}
      style={combinedStyle}
      {...props}
    >
      <div className="tip-banner-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {renderIcon(icon, 14, iconColor)}
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#92400E' }}>
            {displayMsg}
          </span>
        </div>
        {displayAction && (
          <a
            href={displayHref}
            onClick={onActionClick}
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#103ca4',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            {displayAction}
          </a>
        )}
      </div>
    </BaseCard>
  );
}
