import * as Icons from "./index";

/**
 * Icon Component
 * Renders any dashboard navigation SVG icon by name.
 * All icons default to size 20px.
 *
 * Usage:
 *   <Icon name="LayoutGrid" />
 *   <Icon name="Bell" size={24} className="my-icon" />
 *
 * Available names: LayoutGrid, User, File, FileText, Copy,
 *   Users, BadgeCheck, Bookmark, IndianRupee, Star,
 *   Bell, Settings, CircleHelp
 */
function Icon({ name, size = 20, color = "currentColor", ...props }) {
  const SvgIcon = Icons[name];

  if (!SvgIcon) {
    console.warn(`Icon "${name}" not found. Check src/Components/icons/index.js`);
    return null;
  }

  return (
    <SvgIcon
      width={size}
      height={size}
      color={color}
      aria-hidden="true"
      {...props}
    />
  );
}

export default Icon;
