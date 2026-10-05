/**
 * TWO-FACTOR AUTHENTICATION SERVICE (AWAITING BACKEND SPECIFICATION)
 *
 * IMPORTANT:
 * The official TechGuild backend documentation specifies that during login:
 *   POST /auth/login
 * Can return:
 *   {
 *     "requires_2fa": true,
 *     "temporary_token": "<token>"
 *   }
 *
 * However, the backend documentation does NOT provide the actual 2FA verification
 * endpoints, request body schemas, or parameter names (e.g. OTP verification endpoint,
 * recovery code endpoint, setup, disable, or resend OTP).
 *
 * Per instructions:
 * DO NOT invent fake endpoints or request schemas.
 * This service defines the frontend architecture and placeholder interface ready
 * to be wired up as soon as the backend contract is supplied.
 */

export const twoFaApi = {
  // TODO: Connect to backend 2FA verification endpoint once documented
  verifyLogin: async ({ temporary_token, code }) => {
    throw new Error(
      "Two-factor authentication verification endpoint contract has not yet been documented in the TechGuild API spec. Please configure the verified endpoint once provided."
    );
  },

  // TODO: Connect to backend recovery code verification endpoint once documented
  verifyRecoveryCode: async ({ temporary_token, code }) => {
    throw new Error(
      "Two-factor authentication recovery code endpoint contract has not yet been documented in the TechGuild API spec. Please configure the verified endpoint once provided."
    );
  },

  // TODO: Connect to backend 2FA setup endpoint once documented
  setup: async () => {
    throw new Error(
      "2FA setup endpoint contract is pending backend API specification."
    );
  },

  // TODO: Connect to backend 2FA verify-setup endpoint once documented
  verifySetup: async ({ code }) => {
    throw new Error(
      "2FA verify setup endpoint contract is pending backend API specification."
    );
  },

  // TODO: Connect to backend 2FA disable endpoint once documented
  disable: async ({ password, code }) => {
    throw new Error(
      "2FA disable endpoint contract is pending backend API specification."
    );
  },

  // TODO: Connect to backend regenerate recovery codes endpoint once documented
  regenerateRecoveryCodes: async ({ password }) => {
    throw new Error(
      "2FA regenerate recovery codes endpoint contract is pending backend API specification."
    );
  },
};

export default twoFaApi;