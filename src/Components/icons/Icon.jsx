// 03-11-2026
// Generic icon renderer that resolves an icon by name from the icon registry.
import * as Icons from "./index";

function Icon({
  name,
  size = 20,
  color = "#6A717D",
  stroke,
  strokeWidth = 1.75,
  fill = "none",
  style,
  ...props
}) {
  const SvgIcon = Icons[name];

  if (!SvgIcon) {
    console.warn(`Icon "${name}" not found. Check src/Components/icons/index.js`);
    return null;
  }

  const effectiveFill = fill || "none";

  return (
    <SvgIcon
      width={size}
      height={size}
      color={color}
      stroke={stroke || color}
      strokeWidth={strokeWidth}
      fill={effectiveFill}
      style={{
        color: color,
        stroke: stroke || color,
        strokeWidth: strokeWidth,
        fill: effectiveFill,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

export default Icon;
