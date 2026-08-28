import React from 'react';

export default function BaseCard({
  children,
  className = '',
  style = {},
  padding,
  onClick,
  ...props
}) {
  return (
    <div
      className={`card tg-card shadow-sm rounded-3 ${className}`}
      style={{
        ...(padding !== undefined ? { padding } : {}),
        ...style,
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
