/**
 * Centralized sizing constants for the Tech Guild design system.
 * Includes icon sizes, spacing, border radii, font sizes, avatar dimensions,
 * layout breakpoints, and component-specific dimensions.
 */

// ==========================================
// 1. COMMON DESIGN SYSTEM SIZES
// ==========================================

/** Icon size scale in pixels */
export const ICON_SIZES = {
  "2XS": 12,
  XS: 14,
  SM: 15,
  MD: 16,
  DEFAULT: 18,
  LG: 20,
  XL: 22,
  "2XL": 24,
  "3XL": 26,
  "4XL": 28,
  "5XL": 32,
  "6XL": 36,
  HERO: 44,
  MAX: 48,
};

/** Spacing & gap scale in pixels */
export const SPACING = {
  NONE: 0,
  "3XS": 2,
  "2XS": 4,
  XS: 6,
  SM: 8,
  MD: 10,
  DEFAULT: 12,
  LG: 14,
  XL: 16,
  "2XL": 20,
  "3XL": 24,
  "4XL": 32,
  "5XL": 40,
  "6XL": 48,
  "7XL": 64,
};

/** Border radius tokens */
export const BORDER_RADIUS = {
  NONE: "0px",
  XS: "4px",
  SM: "5px",
  MD: "6px",
  DEFAULT: "8px",
  LG: "10px",
  XL: "12px",
  "2XL": "16px",
  "3XL": "24px",
  CARD: "16px",
  ROUNDED_FULL: "50%",
  PILL: "9999px",
};

/** Standard typography font sizes */
export const FONT_SIZES = {
  "2XS": "10px",
  XS: "11px",
  SM: "12px",
  BASE: "13px",
  MD: "14px",
  LG: "15px",
  XL: "16px",
  "2XL": "18px",
  "3XL": "20px",
  "4XL": "24px",
  "5XL": "28px",
  "6XL": "32px",
  TITLE: "36px",
};

/** Avatar image / placeholder dimensions in pixels */
export const AVATAR_SIZES = {
  "2XS": 20,
  XS: 24,
  SM: 32,
  MD: 40,
  LG: 48,
  XL: 56,
  "2XL": 64,
  "3XL": 80,
  HERO: 118,
};

/** Responsive viewport breakpoints in pixels */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
};

// ==========================================
// 2. COMPONENT-SPECIFIC SIZES & DIMENSIONS
// ==========================================

/** Specific dimensions for complex UI cards */
export const CARD_SIZES = {
  GUILD_CARD: {
    DEFAULT_WIDTH: "530px",
    DEFAULT_HEIGHT: "275.6px",
    ASPECT_RATIO: "530 / 275.6",
    BORDER_RADIUS: "16px",
    AVATAR_CONTAINER_SIZE: "118px",
    BADGE_RADIUS: "999px",
  },
  METRIC_CARD: {
    MIN_HEIGHT: "110px",
    BORDER_RADIUS: "12px",
  },
  ACTIVITY_CARD: {
    BORDER_RADIUS: "12px",
    ICON_BOX_SIZE: "48px",
  },
  MODAL: {
    SM: "400px",
    MD: "500px",
    LG: "640px",
    XL: "800px",
  },
};

/** Input and form control dimensions */
export const FORM_SIZES = {
  INPUT_HEIGHT_SM: "36px",
  INPUT_HEIGHT_MD: "42px",
  INPUT_HEIGHT_LG: "48px",
  INPUT_RADIUS: "8px",
  TEXTAREA_MIN_HEIGHT: "90px",
  MAX_BIO_LENGTH: 300,
};

/** Button dimensions and padding */
export const BUTTON_SIZES = {
  SM: {
    HEIGHT: "32px",
    PADDING: "6px 12px",
    FONT_SIZE: "12px",
    BORDER_RADIUS: "6px",
  },
  MD: {
    HEIGHT: "40px",
    PADDING: "8px 16px",
    FONT_SIZE: "14px",
    BORDER_RADIUS: "8px",
  },
  LG: {
    HEIGHT: "48px",
    PADDING: "12px 24px",
    FONT_SIZE: "16px",
    BORDER_RADIUS: "10px",
  },
};

// ==========================================
// 3. MASTER SIZES OBJECT
// ==========================================
export const SIZES = {
  ICON: ICON_SIZES,
  SPACING,
  RADIUS: BORDER_RADIUS,
  FONT: FONT_SIZES,
  AVATAR: AVATAR_SIZES,
  BREAKPOINTS,
  CARD: CARD_SIZES,
  FORM: FORM_SIZES,
  BUTTON: BUTTON_SIZES,
};

export default SIZES;
