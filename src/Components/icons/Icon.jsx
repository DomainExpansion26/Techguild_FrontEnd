import * as Icons from "./index";
import "./icon.css";

/**
 * SVG icon wrapper.
 *
 * COLOUR NOTE (fixed 2026-10-13): every source SVG in `src/assets/icons/` bakes a
 * `stroke="#6A717D"` presentation attribute onto its `<path>`. A presentation
 * attribute is an author-level declaration *on that element*, so it beats the
 * stroke inherited from the wrapping `<svg>` — meaning the `color`/`stroke` props
 * were silently ignored and every such icon rendered grey. `icon.css` forces
 * `stroke: currentColor` on descendants so `color` actually works.
 *
 * The default `color` is therefore `#6A717D` (not `currentColor`) so that icons
 * rendered without a colour look exactly the same as before the fix.
 *
 * KNOWN LIMITATION: the same problem applies to `stroke-width`, which is also
 * baked into the paths. It is deliberately NOT overridden here, because doing so
 * would silently thin every icon in the app from its authored `2` to the `1.75`
 * default. Pass a per-call `style={{ strokeWidth: n }}` plus a class if you need it.
 */
function Icon({
  name,
  size = 20,
  color = "#6A717D",
  stroke,
  strokeWidth = 1.75,
  fill = "none",
  className = "",
  style,
  ...props
}) {
  const SvgIcon = Icons[name];

  if (!SvgIcon) {
    console.warn(`Icon "${name}" not found. Check src/Components/icons/index.js`);
    return null;
  }

  const effectiveFill = fill || "none";
  const effectiveStroke = stroke || color;

  return (
    <SvgIcon
      width={size}
      height={size}
      color={color}
      stroke={effectiveStroke}
      strokeWidth={strokeWidth}
      fill={effectiveFill}
      className={`tg-icon ${className}`.trim()}
      style={{
        color: color,
        stroke: effectiveStroke,
        fill: effectiveFill,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

export default Icon;
