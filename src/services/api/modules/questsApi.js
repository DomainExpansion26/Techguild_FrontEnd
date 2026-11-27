import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

// 27-11-2026
export const questsApi = {
  // List tier-locked quests with cursor pagination + filters
  getQuests: async (params = {}) => {
    return apiClient.get(ENDPOINTS.QUESTS.BASE, { params });
  },

  // Create a quest draft (client only)
  createQuest: async (questData) => {
    return apiClient.post(ENDPOINTS.QUESTS.BASE, questData);
  },

  // Freelancer quest board KPIs, recent applications and recommended quests
  getBoardSummary: async () => {
    return apiClient.get(ENDPOINTS.QUESTS.BOARD_SUMMARY);
  },

  // Every quest bookmarked by the caller
  getSavedQuests: async (params = {}) => {
    return apiClient.get(ENDPOINTS.QUESTS.SAVED, { params });
  },

  // Full quest details including milestones and required skills
  getQuestById: async (questId) => {
    return apiClient.get(ENDPOINTS.QUESTS.DETAIL(questId));
  },

  // Update a draft quest (client only)
  updateQuest: async (questId, questData) => {
    return apiClient.patch(ENDPOINTS.QUESTS.DETAIL(questId), questData);
  },

  // Publish a draft quest (client only)
  publishQuest: async (questId, payload = {}) => {
    return apiClient.post(ENDPOINTS.QUESTS.PUBLISH(questId), payload);
  },

  // Reject / cancel a quest and refund escrow (client only)
  rejectQuest: async (questId, reason) => {
    return apiClient.post(ENDPOINTS.QUESTS.REJECT(questId), { reason });
  },

  // Bookmark / unbookmark a quest
  toggleSaveQuest: async (questId) => {
    return apiClient.post(ENDPOINTS.QUESTS.SAVE(questId));
  },

  // Apply to a quest (freelancer)
  applyToQuest: async (questId, { cover_letter, proposed_budget, currency, estimated_duration }) => {
    return apiClient.post(ENDPOINTS.QUESTS.APPLY(questId), {
      cover_letter,
      proposed_budget,
      currency,
      estimated_duration,
    });
  },

  // Get applications for a quest (client only)
  getQuestApplications: async (questId) => {
    return apiClient.get(ENDPOINTS.QUESTS.QUEST_APPLICATIONS(questId));
  },

  // Fund a milestone for a quest (client only)
  fundQuestMilestone: async (questId, milestoneId, payload = {}) => {
    return apiClient.post(ENDPOINTS.QUESTS.FUND_MILESTONE(questId, milestoneId), payload);
  },
};

export default questsApi;
