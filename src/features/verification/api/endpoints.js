export const VERIFICATION = {
  STATUS: "/v1/verification/status",
  IDENTITY_STATUS: "/v1/verification/identity/status",
  IDENTITY_SUBMIT: "/v1/verification/identity/submit",
  BUSINESS_SUBMIT: "/v1/verification/business/submit",
  RESUBMIT: (recordId) => `/v1/verification/resubmit/${recordId}`,
};