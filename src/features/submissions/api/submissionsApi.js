import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const submissionsApi = {
  // Create submission
  createSubmission: async ({ attachment_url, message, milestone_id, submission_url }) => {
    return apiClient.post(ENDPOINTS.SUBMISSIONS.BASE, {
      attachment_url,
      message,
      milestone_id,
      submission_url,
    });
  },

  // Get submissions by milestone ID
  getSubmissionsByMilestone: async (milestoneId) => {
    return apiClient.get(ENDPOINTS.SUBMISSIONS.MILESTONE(milestoneId));
  },

  // Get submission by ID
  getSubmissionById: async (id) => {
    return apiClient.get(ENDPOINTS.SUBMISSIONS.DETAIL(id));
  },

  // Update submission
  updateSubmission: async (id, { attachment_url, message, submission_url }) => {
    return apiClient.put(ENDPOINTS.SUBMISSIONS.DETAIL(id), {
      attachment_url,
      message,
      submission_url,
    });
  },

  // Delete submission
  deleteSubmission: async (id) => {
    return apiClient.delete(ENDPOINTS.SUBMISSIONS.DETAIL(id));
  },

  // Approve submission
  approveSubmission: async (id, message) => {
    return apiClient.post(ENDPOINTS.SUBMISSIONS.APPROVE(id), { message });
  },

  // Reject submission
  rejectSubmission: async (id, reason) => {
    return apiClient.post(ENDPOINTS.SUBMISSIONS.REJECT(id), { reason });
  },
};

export default submissionsApi;
