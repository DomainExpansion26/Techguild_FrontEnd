export const ADMIN_VERIFICATION = {
  QUEUE: "/v1/admin/verification/queue",
  APPROVE: (id) => `/v1/admin/verification/${id}/approve`,
  REJECT: (id) => `/v1/admin/verification/${id}/reject`,
};