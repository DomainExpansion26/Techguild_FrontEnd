export const APPLICATIONS = {
  MY: "/v1/applications/my",
  APPLY: (projectId) => `/v1/projects/${projectId}/apply`,
  PROJECT_APPLICATIONS: (projectId) => `/v1/projects/${projectId}/applications`,
  DETAIL: (applicationId) => `/v1/applications/${applicationId}`,
  ACCEPT: (applicationId) => `/v1/applications/${applicationId}/accept`,
  SHORTLIST: (applicationId) => `/v1/applications/${applicationId}/shortlist`,
  REJECT: (applicationId) => `/v1/applications/${applicationId}/reject`,
};