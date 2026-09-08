import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const authApi = {
  register: async ({ first_name, last_name, email, password }) => {
    return apiClient.post(ENDPOINTS.AUTH.REGISTER, { first_name, last_name, email, password });
  },

  login: async ({ email, password }) => {
    return apiClient.post(ENDPOINTS.AUTH.LOGIN, { email, password });
  },

  logout: async (refreshToken) => {
    return apiClient.post(ENDPOINTS.AUTH.LOGOUT, { refresh_token: refreshToken });
  },

  refreshToken: async (refreshToken) => {
    return apiClient.post(ENDPOINTS.AUTH.REFRESH_TOKEN, { refresh_token: refreshToken });
  },

  registerAccountType: async ({ email, password, account_type }) => {
    return apiClient.post(ENDPOINTS.AUTH.REGISTER_ACCOUNT_TYPE, { email, password, account_type });
  },

  changePassword: async ({ old_password, new_password }) => {
    return apiClient.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, { old_password, new_password });
  },

  forgotPassword: async ({ email }) => {
    return apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  resetPassword: async ({ token, new_password }) => {
    return apiClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, { token, new_password }, { params: { token } });
  },

  resendVerification: async ({ email }) => {
    return apiClient.post(ENDPOINTS.AUTH.RESEND_VERIFICATION, { email });
  },

  verifyEmail: async (token) => {
    return apiClient.get(ENDPOINTS.AUTH.VERIFY_EMAIL, { params: { token } });
  },

  deleteAccount: async () => {
    return apiClient.delete(ENDPOINTS.AUTH.ACCOUNT);
  },
};

export default authApi;
