export const PROJECTS = {
  BASE: "/v1/projects",
  MY: "/v1/projects/my",
  SEARCH: "/v1/projects/search",
  DETAIL: (projectId) => `/v1/projects/${projectId}`,
  PUBLISH: (projectId) => `/v1/projects/${projectId}/publish`,
  CLOSE: (projectId) => `/v1/projects/${projectId}/close`,
  REOPEN: (projectId) => `/v1/projects/${projectId}/reopen`,
};