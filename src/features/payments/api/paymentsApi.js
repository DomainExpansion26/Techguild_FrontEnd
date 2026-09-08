import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const paymentsApi = {
  getEarnings: async () => {
    return { balance: 0, pending: 0, history: [] };
  },
  getPayouts: async () => {
    return { payouts: [], totalPaid: 0 };
  },
  requestPayout: async (amount, method) => {
    return { success: true, amount, method, status: "pending" };
  },
};

export default paymentsApi;
