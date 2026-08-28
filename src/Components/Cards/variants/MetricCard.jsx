import React from 'react';
import BaseCard from './BaseCard';
import Icon from '@/Components/icons/Icon';

function renderIcon(icon, defaultSize = 16, defaultProps = {}) {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return icon;
  }
  if (typeof icon === 'string') {
    return <Icon name={icon} size={defaultSize} {...defaultProps} />;
  }
  return null;
}

export default function MetricCard({
  title,
  value = '0',
  icon,
  description,
  delay,
  className = '',
  style = {},
  padding,
  onClick,
  ...props
}) {
  const combinedStyle = {
    ...(delay ? { animationDelay: delay } : {}),
    ...style,
  };

  return (
    <BaseCard
      className={`db-card-fill metric-card-element animate-fade-in ${className}`}
      style={combinedStyle}
      padding={padding}
      onClick={onClick}
      {...props}
    >
      <div className="metric-card-inner">
        <div className="metric-card-header">
          <span className="metric-card-title">{title}</span>
          {icon && (
            <span className="metric-card-icon">
              {renderIcon(icon, 16)}
            </span>
          )}
        </div>
        <h4 className="metric-card-value">{value}</h4>
        {description && <p className="metric-card-desc">{description}</p>}
      </div>
    </BaseCard>
  );
}
