import { apiClient, BASE_URL, ENDPOINTS } from "@/services/api";

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
