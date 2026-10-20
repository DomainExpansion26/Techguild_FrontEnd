import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

/**
 * TechGuild Centralized Authentication Service
 * Implements the 11 documented Authentication endpoints.
 */

// 1. SET ACCOUNT TYPE FOR ALREADY LOGGED-IN USER (POST /auth/account-type)
export const setAccountType = async ({ account_type, token } = {}) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return apiClient.post(ENDPOINTS.AUTH.ACCOUNT_TYPE, { account_type }, { headers });
};

// 2. CHANGE PASSWORD (POST /auth/change-password)
export const changePassword = async ({ old_password, new_password }) => {
  return apiClient.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, { old_password, new_password });
};

// 3. FORGOT PASSWORD (POST /auth/forgot-password)
export const forgotPassword = async ({ email }) => {
  return apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
};

// 4. USER LOGIN (POST /auth/login)
export const loginUser = async ({ email, password }) => {
  return apiClient.post(ENDPOINTS.AUTH.LOGIN, { email, password });
};

// 5. LOGOUT (POST /auth/logout)
export const logoutUser = async (refreshToken) => {
  const token = refreshToken || localStorage.getItem("techguild_refresh_token") || "";
  return apiClient.post(ENDPOINTS.AUTH.LOGOUT, { refresh_token: token });
};

// 6. REFRESH ACCESS TOKEN (POST /auth/refresh-token)
export const refreshAccessToken = async (refreshToken) => {
  const token = refreshToken || localStorage.getItem("techguild_refresh_token") || "";
  return apiClient.post(ENDPOINTS.AUTH.REFRESH_TOKEN, { refresh_token: token });
};

// 7. REGISTER NEW USER (POST /auth/register)
export const registerUser = async ({ first_name, last_name, email, password }) => {
  return apiClient.post(ENDPOINTS.AUTH.REGISTER, { first_name, last_name, email, password });
};

// 8. SET ACCOUNT TYPE DURING REGISTRATION (POST /auth/register/account-type)
export const setRegisteredAccountType = async ({ email, password, account_type }) => {
  return apiClient.post(ENDPOINTS.AUTH.REGISTER_ACCOUNT_TYPE, { email, password, account_type });
};

// 9. RESEND VERIFICATION EMAIL (POST /auth/resend-verification)
export const resendVerificationEmail = async ({ email }) => {
  return apiClient.post(ENDPOINTS.AUTH.RESEND_VERIFICATION, { email });
};

// 10. RESET PASSWORD (POST /auth/reset-password?token=<token>)
// Token sent in BOTH query param and request body per backend documentation
export const resetPassword = async ({ token, new_password }) => {
  return apiClient.post(
    ENDPOINTS.AUTH.RESET_PASSWORD,
    { token, new_password },
    { params: { token } }
  );
};

// 11. VERIFY EMAIL (GET /auth/verify-email?token=<token>)
export const verifyEmail = async (token) => {
  return apiClient.get(ENDPOINTS.AUTH.VERIFY_EMAIL, { params: { token } });
};

// Preserved helper for account deletion
export const deleteAccount = async () => {
  return apiClient.delete(ENDPOINTS.AUTH.ACCOUNT);
};

// Object export with both canonical and alias names for backwards compatibility
export const authApi = {
  // Canonical functions
  setAccountType,
  changePassword,
  forgotPassword,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  setRegisteredAccountType,
  resendVerificationEmail,
  resetPassword,
  verifyEmail,
  deleteAccount,

  // Aliases matching existing usage across the frontend
  register: registerUser,
  login: loginUser,
  logout: logoutUser,
  refreshToken: refreshAccessToken,
  registerAccountType: setRegisteredAccountType,
  setAccountTypeAuthenticated: setAccountType,
  resendVerification: resendVerificationEmail,
};

export default authApi;
