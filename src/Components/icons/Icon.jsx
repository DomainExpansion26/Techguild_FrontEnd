import * as Icons from "./index";

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
