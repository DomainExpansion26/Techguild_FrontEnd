export const PROFILE = {
  BASE: "/v1/profile",
  INDIVIDUAL: "/v1/profile/individual",
  AGENCY: "/v1/profile/agency",
  CLIENT: "/v1/profile/client",
  AVATAR: "/v1/profile/avatar",
  LOGO: "/v1/profile/logo",
  UPLOAD_RESUME: "/v1/profile/upload-resume",
  RESUME: "/v1/profile/resume",
  CHECK_SLUG: "/v1/profile/check-slug",
  POINTS: "/v1/profile/points",
  EXPORT: "/v1/profile/export",
  PUBLIC_PROFILE: (slug) => `/v1/u/${slug}`,
};