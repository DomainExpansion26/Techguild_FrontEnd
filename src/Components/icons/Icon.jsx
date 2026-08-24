import * as Icons from "./index";

function Icon({
  name,
  size = 20,
  color = "currentColor",
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
