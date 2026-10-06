import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

/**
 * Two-Factor Authentication (2FA) API layer.
 * Connects to documented backend endpoints for TOTP setup, verification, login challenge, and recovery codes.
 */
export const twoFaApi = {
  // Generate a fresh TOTP secret and QR provisioning URI
  setup: async () => {
    return apiClient.post(ENDPOINTS.AUTH.TWO_FA.SETUP);
  },

  // Verify the initial TOTP code and enable 2FA (returns recovery codes)
  verifySetup: async ({ code }) => {
    return apiClient.post(ENDPOINTS.AUTH.TWO_FA.VERIFY_SETUP, { code });
  },

  // Disable 2FA after verifying password and TOTP
  disable: async ({ password, code }) => {
    return apiClient.post(ENDPOINTS.AUTH.TWO_FA.DISABLE, { password, code });
  },

  // Invalidate old recovery codes and generate new ones
  regenerateRecoveryCodes: async ({ password }) => {
    return apiClient.post(ENDPOINTS.AUTH.TWO_FA.REGENERATE_RECOVERY_CODES, { password });
  },

  // Verify TOTP during login-time 2FA challenge (email/password or OAuth)
  verifyLogin: async ({ temporary_token, code }) => {
    return apiClient.post(ENDPOINTS.AUTH.TWO_FA.VERIFY_LOGIN, { temporary_token, code });
  },

  // Authenticate using a single-use recovery code
  verifyRecoveryCode: async ({ temporary_token, code }) => {
    return apiClient.post(ENDPOINTS.AUTH.TWO_FA.VERIFY_RECOVERY_CODE, { temporary_token, code });
  },
};

export default twoFaApi;