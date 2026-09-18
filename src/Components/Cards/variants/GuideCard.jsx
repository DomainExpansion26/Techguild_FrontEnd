import React from 'react';
import BaseCard from './BaseCard';
import Icon from '@/Components/icons/Icon';
import { ICON_SIZES } from '@/constants/sizes';

function renderIcon(icon, defaultSize = ICON_SIZES.MD) {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return icon;
  }
  if (typeof icon === 'string') {
    return <Icon name={icon} size={defaultSize} style={{ flexShrink: 0 }} />;
  }
  return null;
}

export default function GuideCard({
  icon,
  title,
  description,
  linkText,
  linkHref = '#',
  onLinkClick,
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
      className={`db-card-fill guide-card-element animate-fade-in ${className}`}
      style={combinedStyle}
      padding={padding}
      {...props}
    >
      <div className="guide-card-inner" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon && renderIcon(icon, ICON_SIZES.DEFAULT)}
          {title && <h4 style={{ fontSize: 'clamp(0.82rem, 0.9vw, 1.15rem)', fontWeight: 600, color: '#111827', margin: 0 }}>{title}</h4>}
        </div>
        {description && (
          <p style={{ fontSize: 'clamp(0.72rem, 0.78vw, 0.98rem)', color: '#6b7280', margin: 0, lineHeight: 1.4 }}>
            {description}
          </p>
        )}
        {linkText && (
          <a
            href={linkHref}
            onClick={onLinkClick}
            className="trust-card-link"
            style={{ marginTop: '4px' }}
          >
            {linkText} <span className="trust-card-arrow">&gt;</span>
          </a>
        )}
      </div>
    </BaseCard>
  );
}
