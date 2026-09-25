// [TechGuild Update: 21-09-2026] Complete Profile OpenAPI SDK layer & strict payload builders
import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

/**
 * TechGuild Profile API layer.
 *
 * Mirrors the backend OpenAPI (Profile tag):
 *  GET   /v1/profile                 -> get-my-profile
 *  POST  /v1/profile/client          -> create-client-profile (wizard step-save)
 *  PATCH /v1/profile/client          -> update-client-profile
 *  POST  /v1/profile/individual      -> create-individual-profile
 *  PATCH /v1/profile/individual      -> update-individual-profile
 *  POST  /v1/profile/avatar          -> upload-avatar       (multipart field: avatar)
 *  POST  /v1/profile/logo            -> upload-logo         (multipart field: logo)
 *  POST  /v1/profile/upload-resume   -> upload-resume       (multipart field: resume)
 *  GET   /v1/profile/check-slug?slug -> check-slug          ({ available, alternatives })
 *  GET   /v1/profile/points          -> get-user-points     ({ points, account_type, profile_complete })
 *  POST  /v1/profile/export          -> export-profile      ({ message, download_url, expires_in })
 *
 * NOTE: create/update schemas use `additionalProperties: false`, so request
 * bodies MUST contain only the documented keys. Always build payloads with
 * the builders below instead of hand-rolling objects at call sites.
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const toStringArray = (value) => {
  if (Array.isArray(value)) return value.map((v) => `${v}`.trim()).filter(Boolean);
  if (typeof value === "string") return value.split(",").map((v) => v.trim()).filter(Boolean);
  return [];
};

const first = (...values) => values.find((v) => v !== undefined && v !== null && v !== "");

/** Pick only spec-allowed keys; missing keys become null (schemas are nullable). */
const pickStrict = (data, fields) => {
  const out = {};
  fields.forEach((key) => {
    const value = data?.[key];
    out[key] = value === undefined ? null : value;
  });
  return out;
};

// ---------------------------------------------------------------------------
// Spec field allowlists
// ---------------------------------------------------------------------------

/** CreateClientProfileRequest: all 11 keys required. */
const CLIENT_CREATE_FIELDS = [
  "phone",
  "company_name",
  "logo_url",
  "industry",
  "website_url",
  "project_types",
  "budget_range",
  "team_size",
  "country",
  "city",
  "timezone",
];

/** UpdateClientProfileRequest: same minus phone. */
const CLIENT_UPDATE_FIELDS = [
  "company_name",
  "logo_url",
  "industry",
  "website_url",
  "project_types",
  "budget_range",
  "team_size",
  "country",
  "city",
  "timezone",
];

/** CreateIndividualProfileRequest: all 20 keys required. */
const INDIVIDUAL_CREATE_FIELDS = [
  "phone",
  "date_of_birth",
  "gender",
  "avatar_url",
  "bio",
  "country",
  "city",
  "headline",
  "preferred_language",
  "timezone",
  "experience_level",
  "availability",
  "skills",
  "tools_technologies",
  "service_categories",
  "portfolio_url",
  "github_url",
  "linkedin_url",
  "resume_url",
  "terms_confirmed",
];

/** UpdateIndividualProfileRequest: same minus phone. */
const INDIVIDUAL_UPDATE_FIELDS = INDIVIDUAL_CREATE_FIELDS.filter((k) => k !== "phone");

/** CreateAgencyProfileRequest: all 12 keys required. */
const AGENCY_CREATE_FIELDS = [
  "phone",
  "agency_name",
  "logo_url",
  "description",
  "website_url",
  "services_offered",
  "industries",
  "team_size",
  "contact_name",
  "country",
  "city",
  "timezone",
];

/** UpdateAgencyProfileRequest: same minus phone. */
const AGENCY_UPDATE_FIELDS = AGENCY_CREATE_FIELDS.filter((k) => k !== "phone");

// ---------------------------------------------------------------------------
// Payload builders (tolerate frontend form aliases, emit strict spec bodies)
// ---------------------------------------------------------------------------

/** Normalize free-form agency form state into canonical spec keys. */
const normalizeAgencyForm = (form = {}) => ({
  phone: first(form.phone, form.contact_phone, null),
  agency_name: first(form.agency_name, form.agencyName, form.company_name, form.companyName, ""),
  logo_url: first(form.logo_url, form.logoUrl, null),
  description: first(form.description, form.about, null),
  website_url: first(form.website_url, form.websiteUrl, form.website, null),
  services_offered: toStringArray(first(form.services_offered, form.servicesOffered, form.services, [])),
  industries: toStringArray(first(form.industries, form.industry, [])),
  team_size: first(form.team_size, form.teamSize, null),
  contact_name: first(form.contact_name, form.contactName, null),
  country: first(form.country, null),
  city: first(form.city, null),
  timezone: first(form.timezone, form.time_zone, form.timeZone, null),
});

export const buildAgencyCreatePayload = (form = {}) =>
  pickStrict(normalizeAgencyForm(form), AGENCY_CREATE_FIELDS);

export const buildAgencyUpdatePayload = (form = {}) =>
  pickStrict(normalizeAgencyForm(form), AGENCY_UPDATE_FIELDS);

/** Normalize free-form client form state into canonical spec keys. */
const normalizeClientForm = (form = {}) => ({
  phone: first(form.phone, form.contact_phone, null),
  company_name: first(form.company_name, form.companyName, form.clientName, ""),
  logo_url: first(form.logo_url, form.logoUrl, null),
  industry: first(form.industry, null),
  website_url: first(form.website_url, form.websiteUrl, form.website, null),
  project_types: toStringArray(first(form.project_types, form.projectTypes, [])),
  budget_range: first(form.budget_range, form.budgetRange, form.budget, null),
  team_size: first(form.team_size, form.teamSize, null),
  country: first(form.country, null),
  city: first(form.city, null),
  timezone: first(form.timezone, form.time_zone, form.timeZone, null),
});

export const buildClientCreatePayload = (form = {}) =>
  pickStrict(normalizeClientForm(form), CLIENT_CREATE_FIELDS);

export const buildClientUpdatePayload = (form = {}) =>
  pickStrict(normalizeClientForm(form), CLIENT_UPDATE_FIELDS);

/** Normalize free-form individual form state into canonical spec keys. */
const normalizeIndividualForm = (form = {}) => ({
  phone: first(form.phone, null),
  date_of_birth: first(form.date_of_birth, form.dateOfBirth, form.dob, null),
  gender: first(form.gender, null),
  avatar_url: first(form.avatar_url, form.avatarUrl, null),
  bio: first(form.bio, form.about, null),
  country: first(form.country, null),
  city: first(form.city, null),
  headline: first(form.headline, null),
  preferred_language: first(form.preferred_language, form.preferredLanguage, form.language, null),
  timezone: first(form.timezone, form.time_zone, form.timeZone, null),
  experience_level: first(form.experience_level, form.experienceLevel, form.experience, null),
  availability: first(form.availability, null),
  skills: toStringArray(first(form.skills, [])),
  tools_technologies: toStringArray(first(form.tools_technologies, form.toolsTechnologies, form.tools, [])),
  service_categories: toStringArray(first(form.service_categories, form.serviceCategories, form.categories, [])),
  portfolio_url: first(form.portfolio_url, form.portfolioUrl, null),
  github_url: first(form.github_url, form.githubUrl, null),
  linkedin_url: first(form.linkedin_url, form.linkedinUrl, null),
  resume_url: first(form.resume_url, form.resumeUrl, null),
  terms_confirmed: first(form.terms_confirmed, form.termsConfirmed, null),
});

export const buildIndividualCreatePayload = (form = {}) =>
  pickStrict(normalizeIndividualForm(form), INDIVIDUAL_CREATE_FIELDS);

export const buildIndividualUpdatePayload = (form = {}) =>
  pickStrict(normalizeIndividualForm(form), INDIVIDUAL_UPDATE_FIELDS);

// ---------------------------------------------------------------------------
// Response normalizer for get-my-profile
// ---------------------------------------------------------------------------

/**
 * Normalize GET /v1/profile into { account_type, individual, client, agency }.
 * Tolerates both bare and `{ data: ... }` envelopes (GetMyProfileResponse).
 */
export const normalizeMyProfile = (res) => {
  const root = res?.data && typeof res.data === "object" && ("account_type" in res.data || "individual" in res.data || "client" in res.data)
    ? res.data
    : res || {};
  return {
    account_type: root.account_type || null,
    individual: root.individual || null,
    client: root.client || null,
    agency: root.agency || null,
  };
};

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

export const profileApi = {
  // Get logged-in user profile. Accepts an explicit token so login can probe
  // the role before persisting session (single-write path in AuthContext).
  getProfile: async (options = {}) => {
    const { token, ...rest } = options;
    if (token) {
      return apiClient.get(ENDPOINTS.PROFILE.BASE, {
        ...rest,
        headers: { ...rest.headers, Authorization: `Bearer ${token}` },
      });
    }
    return apiClient.get(ENDPOINTS.PROFILE.BASE, rest);
  },

  // Same, but normalized to { account_type, individual, client, agency }
  getMyProfile: async () => {
    const res = await apiClient.get(ENDPOINTS.PROFILE.BASE);
    return normalizeMyProfile(res);
  },

  // Delete profile
  deleteProfile: async (password) => {
    return apiClient.delete(ENDPOINTS.PROFILE.BASE, { body: { password } });
  },

  // Create or update individual profile (strict spec bodies)
  saveIndividualProfile: async (data, isPatch = false) => {
    const payload = isPatch ? buildIndividualUpdatePayload(data) : buildIndividualCreatePayload(data);
    return isPatch
      ? apiClient.patch(ENDPOINTS.PROFILE.INDIVIDUAL, payload)
      : apiClient.post(ENDPOINTS.PROFILE.INDIVIDUAL, payload);
  },

  // Create or update agency profile (strict spec bodies)
  saveAgencyProfile: async (data, isPatch = false) => {
    const payload = isPatch ? buildAgencyUpdatePayload(data) : buildAgencyCreatePayload(data);
    return isPatch
      ? apiClient.patch(ENDPOINTS.PROFILE.AGENCY, payload)
      : apiClient.post(ENDPOINTS.PROFILE.AGENCY, payload);
  },

  // Create (wizard step-save) or update client profile (strict spec bodies)
  saveClientProfile: async (data, isPatch = false) => {
    const payload = isPatch ? buildClientUpdatePayload(data) : buildClientCreatePayload(data);
    return isPatch
      ? apiClient.patch(ENDPOINTS.PROFILE.CLIENT, payload)
      : apiClient.post(ENDPOINTS.PROFILE.CLIENT, payload);
  },

  // Avatar upload / delete -> { message, avatar_url }
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return apiClient.upload(ENDPOINTS.PROFILE.AVATAR, formData);
  },
  deleteAvatar: async () => {
    return apiClient.delete(ENDPOINTS.PROFILE.AVATAR);
  },

  // Logo upload / delete -> { message, logo_url }
  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append("logo", file);
    return apiClient.upload(ENDPOINTS.PROFILE.LOGO, formData);
  },
  deleteLogo: async () => {
    return apiClient.delete(ENDPOINTS.PROFILE.LOGO);
  },

  // Resume upload / delete -> { message, resume_url }
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append("resume", file);
    return apiClient.upload(ENDPOINTS.PROFILE.UPLOAD_RESUME, formData);
  },
  deleteResume: async () => {
    return apiClient.delete(ENDPOINTS.PROFILE.RESUME);
  },

  // Check username/slug availability -> { available, alternatives }
  checkSlug: async (slug) => {
    return apiClient.get(ENDPOINTS.PROFILE.CHECK_SLUG, { params: { slug } });
  },

  // Get trust points and rank -> { points, account_type, profile_complete }
  getPoints: async () => {
    return apiClient.get(ENDPOINTS.PROFILE.POINTS);
  },

  // Export profile data -> { message, download_url, expires_in }
  exportProfile: async () => {
    return apiClient.post(ENDPOINTS.PROFILE.EXPORT);
  },

  // Lookup public profile by slug
  getPublicProfile: async (slug) => {
    return apiClient.get(ENDPOINTS.PROFILE.PUBLIC_PROFILE(slug));
  },
};

export default profileApi;
