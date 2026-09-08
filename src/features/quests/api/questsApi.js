import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const questsApi = {
  getQuests: async (params) => {
    // In actual backend integration: return apiClient.get(ENDPOINTS.QUESTS.LIST, { params });
    return { data: [], total: 0 };
  },
  getQuestById: async (id) => {
    return { data: { id, title: `Quest #${id}` } };
  },
  createQuest: async (questData) => {
    return { data: { ...questData, id: Date.now().toString() } };
  },
  applyForQuest: async (questId, proposalData) => {
    return { success: true, questId, proposalData };
  },
};

export default questsApi;
