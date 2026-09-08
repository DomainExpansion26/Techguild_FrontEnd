import React from 'react';

/**
 * Padding token mapping
 */
const PADDING_MAP = {
  none: '0px',
  xs: '8px 12px',
  sm: '12px 16px',
  md: '16px 20px',
  lg: '24px 28px',
  xl: '32px 36px',
  '2xl': '40px 48px',
};

/**
 * Radius token mapping
 */
const RADIUS_MAP = {
  none: '0px',
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
  '2xl': '28px',
  pill: '9999px',
  circle: '50%',
};

/**
 * Shadow token mapping
 */
const SHADOW_MAP = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(16, 60, 164, 0.07), 0 2px 4px -2px rgba(16, 60, 164, 0.05)',
  lg: '0 10px 25px -5px rgba(16, 60, 164, 0.10), 0 8px 10px -6px rgba(16, 60, 164, 0.05)',
  xl: '0 20px 30px -10px rgba(16, 60, 164, 0.15)',
  glow: '0 0 20px rgba(16, 60, 164, 0.25)',
  colored: '0 10px 24px rgba(16, 60, 164, 0.20)',
};

/**
 * Universal BaseCard Component
 * Handles every design angle, layout requirement, and visual state seamlessly.
 */
export default function BaseCard({
  as: Component = 'div',
  children,
  variant = 'default',
  className = '',
  style = {},
  padding,
  radius,
  rounded,
  shadow,
  elevation,
  border,
  bg,
  background,
  color,
  width,
  height,
  minHeight,
  maxHeight,
  maxWidth,
  hoverable = false,
  clickable = false,
  loading = false,
  disabled = false,
  badge,
  badgeVariant = 'primary',
  title,
  subtitle,
  extra,
  headerExtra,
  footer,
  onClick,
  onKeyDown,
  ...props
}) {
  // Resolve variant class
  const variantClass = variant && variant !== 'default' && variant !== 'base'
    ? `tg-card--${variant}`
    : '';

  // Interactivity flags
  const isClickable = clickable || Boolean(onClick);
  const isHoverable = hoverable || variant === 'interactive';

  // Resolve padding
  const resolvedPadding = padding !== undefined
    ? PADDING_MAP[padding] || (typeof padding === 'number' ? `${padding}px` : padding)
    : undefined;

  // Resolve radius
  const radiusKey = radius || rounded;
  const resolvedRadius = radiusKey !== undefined
    ? RADIUS_MAP[radiusKey] || (typeof radiusKey === 'number' ? `${radiusKey}px` : radiusKey)
    : undefined;

  // Resolve shadow
  const shadowKey = shadow || elevation;
  const resolvedShadow = shadowKey !== undefined
    ? SHADOW_MAP[shadowKey] || shadowKey
    : undefined;

  // Resolve border
  let resolvedBorder;
  if (border === false) {
    resolvedBorder = 'none';
  } else if (typeof border === 'string') {
    resolvedBorder = border;
  }

  // Resolve custom CSS variables and overrides
  const customStyles = {
    ...(resolvedPadding !== undefined ? { padding: resolvedPadding } : {}),
    ...(resolvedRadius !== undefined ? { '--tg-card-radius': resolvedRadius, borderRadius: resolvedRadius } : {}),
    ...(resolvedShadow !== undefined ? { '--tg-card-shadow': resolvedShadow, boxShadow: resolvedShadow } : {}),
    ...(resolvedBorder !== undefined ? { '--tg-card-border': resolvedBorder, border: resolvedBorder } : {}),
    ...(bg || background ? { '--tg-card-bg': bg || background, background: bg || background, backgroundColor: bg || background } : {}),
    ...(color ? { '--tg-card-color': color, color } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(minHeight ? { minHeight } : {}),
    ...(maxHeight ? { maxHeight } : {}),
    ...(maxWidth ? { maxWidth } : {}),
    ...style,
  };

  // Keyboard accessibility for clickable cards
  const handleKeyDown = (e) => {
    if (isClickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
    if (onKeyDown) onKeyDown(e);
  };

  const hasHeader = title || subtitle || extra || headerExtra;

  return (
    <Component
      className={`card tg-card ${variantClass} ${isHoverable ? 'tg-card--hoverable' : ''} ${
        isClickable ? 'tg-card--clickable' : ''
      } ${loading ? 'tg-card--loading' : ''} ${disabled ? 'tg-card--disabled' : ''} ${className}`.trim()}
      style={customStyles}
      onClick={disabled ? undefined : onClick}
      onKeyDown={disabled ? undefined : handleKeyDown}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable && !disabled ? 0 : undefined}
      aria-disabled={disabled || undefined}
      {...props}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="tg-card-loading-overlay" aria-live="polite" aria-busy="true">
          <div className="tg-card-spinner" />
        </div>
      )}

      {/* Quick Corner Badge */}
      {badge && (
        typeof badge === 'object' && React.isValidElement(badge) ? (
          badge
        ) : (
          <span className={`tg-card-badge tg-card-badge--${badgeVariant}`}>
            {typeof badge === 'object' ? badge.text || badge.label : badge}
          </span>
        )
      )}

      {/* Quick Header Prop */}
      {hasHeader && (
        <CardHeader extra={extra || headerExtra}>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}

      {/* Main Content */}
      {children}

      {/* Quick Footer Prop */}
      {footer && (
        <CardFooter>
          {footer}
        </CardFooter>
      )}
    </Component>
  );
}

/**
 * Card.Header Subcomponent
 */
export function CardHeader({ children, extra, action, className = '', style = {}, ...props }) {
  const actions = extra || action;
  return (
    <div className={`tg-card-header ${className}`.trim()} style={style} {...props}>
      <div className="tg-card-header-content">
        {children}
      </div>
      {actions && (
        <div className="tg-card-extra">
          {actions}
        </div>
      )}
    </div>
  );
}

/**
 * Card.Title Subcomponent
 */
export function CardTitle({ as: Tag = 'h3', children, className = '', style = {}, size, ...props }) {
  const sizeStyle = size ? { fontSize: size } : {};
  return (
    <Tag className={`tg-card-title ${className}`.trim()} style={{ ...sizeStyle, ...style }} {...props}>
      {children}
    </Tag>
  );
}

/**
 * Card.Subtitle Subcomponent
 */
export function CardSubtitle({ as: Tag = 'p', children, className = '', style = {}, ...props }) {
  return (
    <Tag className={`tg-card-subtitle ${className}`.trim()} style={style} {...props}>
      {children}
    </Tag>
  );
}

/**
 * Card.Body Subcomponent
 */
export function CardBody({ children, className = '', style = {}, padding, ...props }) {
  const resolvedPadding = padding !== undefined
    ? PADDING_MAP[padding] || (typeof padding === 'number' ? `${padding}px` : padding)
    : undefined;

  return (
    <div
      className={`tg-card-body ${className}`.trim()}
      style={{ ...(resolvedPadding ? { padding: resolvedPadding } : {}), ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card.Footer Subcomponent
 */
export function CardFooter({ children, className = '', style = {}, justify = 'between', ...props }) {
  const justifyStyle = justify === 'start'
    ? { justifyContent: 'flex-start' }
    : justify === 'end'
    ? { justifyContent: 'flex-end' }
    : justify === 'center'
    ? { justifyContent: 'center' }
    : { justifyContent: 'space-between' };

  return (
    <div className={`tg-card-footer ${className}`.trim()} style={{ ...justifyStyle, ...style }} {...props}>
      {children}
    </div>
  );
}

/**
 * Card.Divider Subcomponent
 */
export function CardDivider({ className = '', style = {}, ...props }) {
  return <hr className={`tg-card-divider ${className}`.trim()} style={style} {...props} />;
}

/**
 * Card.Media Subcomponent
 */
export function CardMedia({
  src,
  alt = '',
  aspectRatio = '16 / 9',
  height,
  children,
  className = '',
  style = {},
  ...props
}) {
  return (
    <div
      className={`tg-card-media ${className}`.trim()}
      style={{ aspectRatio, ...(height ? { height } : {}), ...style }}
      {...props}
    >
      {src && <img src={src} alt={alt} className="tg-card-media-img" />}
      {children}
    </div>
  );
}

/**
 * Card.Badge Subcomponent
 */
export function CardBadge({ children, variant = 'primary', className = '', style = {}, ...props }) {
  return (
    <span className={`tg-card-badge tg-card-badge--${variant} ${className}`.trim()} style={style} {...props}>
      {children}
    </span>
  );
}

/**
 * Card.Section Subcomponent
 */
export function CardSection({ children, className = '', style = {}, ...props }) {
  return (
    <div className={`tg-card-section ${className}`.trim()} style={style} {...props}>
      {children}
    </div>
  );
}

// Attach subcomponents to BaseCard
BaseCard.Header = CardHeader;
BaseCard.Title = CardTitle;
BaseCard.Subtitle = CardSubtitle;
BaseCard.Body = CardBody;
BaseCard.Footer = CardFooter;
BaseCard.Divider = CardDivider;
BaseCard.Media = CardMedia;
BaseCard.Image = CardMedia;
BaseCard.Badge = CardBadge;
BaseCard.Section = CardSection;
