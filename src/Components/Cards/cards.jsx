import React from 'react';

function Cards({ children, className = '', style = {}, padding = '24px', ...props }) {
  return (
    <div 
      className={`card shadow-sm rounded-3 ${className}`} 
      style={{ padding, ...style }} 
      {...props}
    >
      {children}
    </div>
  );
}

export default Cards;