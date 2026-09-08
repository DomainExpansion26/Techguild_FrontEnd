import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const settingsApi = {
  // Update account security password
  updateAccount: async ({ password, new_password }) => {
    return apiClient.patch(ENDPOINTS.SETTINGS.ACCOUNT, { password, new_password });
  },

  // Update notification preferences
  updateNotifications: async ({ preferences }) => {
    return apiClient.patch(ENDPOINTS.SETTINGS.NOTIFICATIONS, { preferences });
  },

  // Update privacy visibility
  updatePrivacy: async ({ profile_visibility }) => {
    return apiClient.patch(ENDPOINTS.SETTINGS.PRIVACY, { profile_visibility });
  },
};

export default settingsApi;
