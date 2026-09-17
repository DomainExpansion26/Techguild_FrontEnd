export const CONTRACTS = {
  BASE: "/contracts",
  CLIENT: "/contracts/client",
  FREELANCER: "/contracts/freelancer",
  DETAIL: (id) => `/contracts/${id}`,
  SIGN: (id) => `/contracts/${id}/sign`,
  COMPLETE: (id) => `/contracts/${id}/complete`,
  CANCEL: (id) => `/contracts/${id}/cancel`,
};