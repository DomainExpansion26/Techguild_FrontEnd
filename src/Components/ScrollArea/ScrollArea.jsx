import React, { forwardRef } from "react";
import "./scrollarea.css";

const ScrollArea = forwardRef(({
  children,
  className = "",
  style = {},
  trackMargin,
  thumbColor,
  thumbHoverColor,
  scrollbarWidth,
  ...props
}, ref) => {
  const customStyles = {
    ...(trackMargin && { "--scrollbar-track-margin": trackMargin }),
    ...(thumbColor && { "--scrollbar-thumb-color": thumbColor }),
    ...(thumbHoverColor && { "--scrollbar-thumb-hover-color": thumbHoverColor }),
    ...(scrollbarWidth && { "--scrollbar-width": scrollbarWidth }),
    ...style,
  };

  return (
    <div
      ref={ref}
      className={`custom-scroll-area ${className}`.trim()}
      style={customStyles}
      {...props}
    >
      {children}
    </div>
  );
});

ScrollArea.displayName = "ScrollArea";

export default ScrollArea;
