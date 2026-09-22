import { apiClient } from "@/services/api";

// Self-contained API for the temporary profile-based navigation.
// Uses the shared apiClient so the existing authenticated access token is
// reused automatically (no separate token handling here).

const PROFILE_ENDPOINT = "/v1/profile";

export const temporaryNavigationApi = {
  getProfile: async () => {
    return apiClient.get(PROFILE_ENDPOINT);
  },
};

export default temporaryNavigationApi;