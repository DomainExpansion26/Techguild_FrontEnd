import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const profileApi = {
  // Get logged-in user profile
  getProfile: async () => {
    return apiClient.get(ENDPOINTS.PROFILE.BASE);
  },

  // Delete profile
  deleteProfile: async (password) => {
    return apiClient.delete(ENDPOINTS.PROFILE.BASE, { body: { password } });
  },

  // Create or update individual profile
  saveIndividualProfile: async (data, isPatch = false) => {
    return isPatch
      ? apiClient.patch(ENDPOINTS.PROFILE.INDIVIDUAL, data)
      : apiClient.post(ENDPOINTS.PROFILE.INDIVIDUAL, data);
  },

  // Create or update agency profile
  saveAgencyProfile: async (data, isPatch = false) => {
    return isPatch
      ? apiClient.patch(ENDPOINTS.PROFILE.AGENCY, data)
      : apiClient.post(ENDPOINTS.PROFILE.AGENCY, data);
  },

  // Create or update client profile
  saveClientProfile: async (data, isPatch = false) => {
    return isPatch
      ? apiClient.patch(ENDPOINTS.PROFILE.CLIENT, data)
      : apiClient.post(ENDPOINTS.PROFILE.CLIENT, data);
  },

  // Avatar upload / delete
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return apiClient.upload(ENDPOINTS.PROFILE.AVATAR, formData);
  },
  deleteAvatar: async () => {
    return apiClient.delete(ENDPOINTS.PROFILE.AVATAR);
  },

  // Logo upload / delete
  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append("logo", file);
    return apiClient.upload(ENDPOINTS.PROFILE.LOGO, formData);
  },
  deleteLogo: async () => {
    return apiClient.delete(ENDPOINTS.PROFILE.LOGO);
  },

  // Resume upload / delete
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append("resume", file);
    return apiClient.upload(ENDPOINTS.PROFILE.UPLOAD_RESUME, formData);
  },
  deleteResume: async () => {
    return apiClient.delete(ENDPOINTS.PROFILE.RESUME);
  },

  // Check username/slug availability
  checkSlug: async (slug) => {
    return apiClient.get(ENDPOINTS.PROFILE.CHECK_SLUG, { params: { slug } });
  },

  // Get trust points and rank
  getPoints: async () => {
    return apiClient.get(ENDPOINTS.PROFILE.POINTS);
  },

  // Export profile data
  exportProfile: async () => {
    return apiClient.post(ENDPOINTS.PROFILE.EXPORT);
  },

  // Lookup public profile by slug
  getPublicProfile: async (slug) => {
    return apiClient.get(ENDPOINTS.PROFILE.PUBLIC_PROFILE(slug));
  },
};

export default profileApi;
