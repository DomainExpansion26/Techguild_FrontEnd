export const SUBMISSIONS = {
  BASE: "/v1/submissions",
  MILESTONE: (milestoneId) => `/v1/submissions/milestone/${milestoneId}`,
  DETAIL: (id) => `/v1/submissions/${id}`,
  APPROVE: (id) => `/v1/submissions/${id}/approve`,
  REJECT: (id) => `/v1/submissions/${id}/reject`,
};