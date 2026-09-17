export const MILESTONES = {
  BASE: "/milestones",
  CONTRACT: (contractId) => `/milestones/contract/${contractId}`,
  DETAIL: (id) => `/milestones/${id}`,
  SUBMIT: (id) => `/milestones/${id}/submit`,
  APPROVE: (id) => `/milestones/${id}/approve`,
  REJECT: (id) => `/milestones/${id}/reject`,
  PAY: (id) => `/milestones/${id}/pay`,
};