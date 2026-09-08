import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const applicationsApi = {
  // Freelancer applications list
  getMyApplications: async () => {
    return apiClient.get(ENDPOINTS.APPLICATIONS.MY);
  },

  // Apply to a project
  applyForProject: async (projectId, { cover_letter, proposed_budget, currency, estimated_duration }) => {
    return apiClient.post(ENDPOINTS.APPLICATIONS.APPLY(projectId), {
      cover_letter,
      proposed_budget,
      currency,
      estimated_duration,
    });
  },

  // Client review list for a project
  getProjectApplications: async (projectId) => {
    return apiClient.get(ENDPOINTS.APPLICATIONS.PROJECT_APPLICATIONS(projectId));
  },

  // Withdraw application
  withdrawApplication: async (applicationId) => {
    return apiClient.delete(ENDPOINTS.APPLICATIONS.DETAIL(applicationId));
  },

  // Accept application
  acceptApplication: async (applicationId, message) => {
    return apiClient.post(ENDPOINTS.APPLICATIONS.ACCEPT(applicationId), { message });
  },

  // Shortlist application
  shortlistApplication: async (applicationId, message) => {
    return apiClient.post(ENDPOINTS.APPLICATIONS.SHORTLIST(applicationId), { message });
  },

  // Reject application
  rejectApplication: async (applicationId, reason) => {
    return apiClient.post(ENDPOINTS.APPLICATIONS.REJECT(applicationId), { reason });
  },
};

export default applicationsApi;
