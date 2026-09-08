import { apiClient, ENDPOINTS } from "@/services/api";

export const contractsApi = {
  // Create contract
  createContract: async (contractData) => {
    return apiClient.post(ENDPOINTS.CONTRACTS.BASE, contractData);
  },

  // Get client contracts
  getClientContracts: async () => {
    return apiClient.get(ENDPOINTS.CONTRACTS.CLIENT);
  },

  // Get freelancer contracts
  getFreelancerContracts: async () => {
    return apiClient.get(ENDPOINTS.CONTRACTS.FREELANCER);
  },

  // Get contract by ID
  getContractById: async (id) => {
    const contractId = typeof id === "object" ? (id?.id || id?._id) : id;
    return apiClient.get(ENDPOINTS.CONTRACTS.DETAIL(contractId));
  },

  // Sign contract
  signContract: async (id, signature) => {
    const contractId = typeof id === "object" ? (id?.id || id?._id) : id;
    return apiClient.put(ENDPOINTS.CONTRACTS.SIGN(contractId), { signature });
  },

  // Complete contract
  completeContract: async (id, completion_note) => {
    const contractId = typeof id === "object" ? (id?.id || id?._id) : id;
    return apiClient.put(ENDPOINTS.CONTRACTS.COMPLETE(contractId), { completion_note });
  },

  // Cancel contract
  cancelContract: async (id, reason) => {
    const contractId = typeof id === "object" ? (id?.id || id?._id) : id;
    return apiClient.put(ENDPOINTS.CONTRACTS.CANCEL(contractId), { reason });
  },
};

export default contractsApi;
