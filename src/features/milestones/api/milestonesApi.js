import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const milestonesApi = {
  // Create milestone
  createMilestone: async ({ contract_id, title, description, amount, due_date }) => {
    return apiClient.post(ENDPOINTS.MILESTONES.BASE, {
      contract_id,
      title,
      description,
      amount,
      due_date,
    });
  },

  // Get milestones by contract ID
  getMilestonesByContract: async (contractId) => {
    return apiClient.get(ENDPOINTS.MILESTONES.CONTRACT(contractId));
  },

  // Get milestone by ID
  getMilestoneById: async (id) => {
    return apiClient.get(ENDPOINTS.MILESTONES.DETAIL(id));
  },

  // Update milestone
  updateMilestone: async (id, { title, description, amount, due_date }) => {
    return apiClient.put(ENDPOINTS.MILESTONES.DETAIL(id), {
      title,
      description,
      amount,
      due_date,
    });
  },

  // Delete milestone
  deleteMilestone: async (id) => {
    return apiClient.delete(ENDPOINTS.MILESTONES.DETAIL(id));
  },

  // Submit milestone
  submitMilestone: async (id, { deliverable_url, notes }) => {
    return apiClient.post(ENDPOINTS.MILESTONES.SUBMIT(id), { deliverable_url, notes });
  },

  // Approve milestone
  approveMilestone: async (id, note) => {
    return apiClient.post(ENDPOINTS.MILESTONES.APPROVE(id), { note });
  },

  // Reject milestone
  rejectMilestone: async (id, reason) => {
    return apiClient.post(ENDPOINTS.MILESTONES.REJECT(id), { reason });
  },

  // Pay milestone
  payMilestone: async (id, payment_reference) => {
    return apiClient.post(ENDPOINTS.MILESTONES.PAY(id), { payment_reference });
  },
};

export default milestonesApi;
