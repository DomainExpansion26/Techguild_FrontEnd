import React from 'react';
import BaseCard from './BaseCard';
import Icon from '@/Components/icons/Icon';
import PrimaryButton from '@/Components/Button/Primarybutton';

function renderIcon(icon, defaultSize = 20, className = '') {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, {
      className: `${icon.props.className || ''} ${className}`.trim(),
    });
  }
  if (typeof icon === 'string') {
    return <Icon name={icon} size={defaultSize} className={className} />;
  }
  return null;
}

export default function EmptyStateCard({
  headerTitle,
  icon,
  iconSize = 20,
  title,
  mainText,
  description,
  subText,
  buttonText,
  onButtonClick,
  buttonClassName = 'quests-card-btn',
  linkText,
  linkHref = '#',
  onLinkClick,
  delay,
  className = '',
  style = {},
  padding,
  ...props
}) {
  const displayTitle = title || mainText;
  const displayDesc = description || subText;
  const combinedStyle = {
    ...(delay ? { animationDelay: delay } : {}),
    ...style,
  };

  // If headerTitle is present, render with top header + centered body
  if (headerTitle) {
    return (
      <BaseCard
        className={`db-card-fill activity-card-element animate-fade-in ${className}`}
        style={combinedStyle}
        padding={padding}
        {...props}
      >
        <div className="activity-card-inner">
          <p className="activity-card-title">{headerTitle}</p>
          <div className="activity-card-body">
            {icon && renderIcon(icon, iconSize, 'activity-card-icon-centered')}
            {displayTitle && <h4 className="activity-card-text-main">{displayTitle}</h4>}
            {displayDesc && <p className="activity-card-text-sub">{displayDesc}</p>}
            {buttonText && (
              <PrimaryButton
                className={buttonClassName}
                onClick={onButtonClick}
                text={buttonText}
              />
            )}
            {linkText && (
              <a href={linkHref} onClick={onLinkClick} className="trust-card-link">
                {linkText} <span className="trust-card-arrow">&gt;</span>
              </a>
            )}
          </div>
        </div>
      </BaseCard>
    );
  }

  return (
    <BaseCard
      className={`db-card-fill quests-card-element animate-fade-in ${className}`}
      style={combinedStyle}
      padding={padding}
      {...props}
    >
      <div className="quests-card-inner">
        {icon && renderIcon(icon, iconSize, 'quests-card-icon-centered')}
        {displayTitle && <h4 className="quests-card-text-main">{displayTitle}</h4>}
        {displayDesc && <p className="quests-card-text-sub">{displayDesc}</p>}
        {buttonText && (
          <PrimaryButton
            className={buttonClassName}
            onClick={onButtonClick}
            text={buttonText}
          />
        )}
        {linkText && (
          <a href={linkHref} onClick={onLinkClick} className="trust-card-link">
            {linkText} <span className="trust-card-arrow">&gt;</span>
          </a>
        )}
      </div>
    </BaseCard>
  );
}
