import { BASE_URL } from "@/services/api/apiClient";
import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const oauthApi = {
  getGoogleLoginUrl: () => `${BASE_URL}${ENDPOINTS.OAUTH.GOOGLE_LOGIN}`,
  getGithubLoginUrl: () => `${BASE_URL}${ENDPOINTS.OAUTH.GITHUB_LOGIN}`,

  redirectToGoogle: () => {
    window.location.href = `${BASE_URL}${ENDPOINTS.OAUTH.GOOGLE_LOGIN}`;
  },

  redirectToGithub: () => {
    window.location.href = `${BASE_URL}${ENDPOINTS.OAUTH.GITHUB_LOGIN}`;
  },

  handleGoogleCallback: async (code, state) => {
    return apiClient.get(ENDPOINTS.OAUTH.GOOGLE_CALLBACK, { params: { code, state } });
  },

  handleGithubCallback: async (code, state) => {
    return apiClient.get(ENDPOINTS.OAUTH.GITHUB_CALLBACK, { params: { code, state } });
  },
};

export default oauthApi;
