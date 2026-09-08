import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const adminApi = {
  // Get verification queue
  getVerificationQueue: async () => {
    return apiClient.get(ENDPOINTS.ADMIN_VERIFICATION.QUEUE);
  },

  // Approve verification
  approveVerification: async (id, note) => {
    return apiClient.post(ENDPOINTS.ADMIN_VERIFICATION.APPROVE(id), { note });
  },

  // Reject verification
  rejectVerification: async (id, reason) => {
    return apiClient.post(ENDPOINTS.ADMIN_VERIFICATION.REJECT(id), { reason });
  },
};

export default adminApi;
