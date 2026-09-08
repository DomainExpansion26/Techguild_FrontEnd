import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const teamsApi = {
  // Create team
  createTeam: async ({ banner_url, description, is_hiring, logo_url, name, slug }) => {
    return apiClient.post(ENDPOINTS.TEAMS.BASE, {
      banner_url,
      description,
      is_hiring,
      logo_url,
      name,
      slug,
    });
  },

  // Get user's teams
  getMyTeams: async () => {
    return apiClient.get(ENDPOINTS.TEAMS.MY);
  },

  // Get team by ID
  getTeamById: async (teamId) => {
    return apiClient.get(ENDPOINTS.TEAMS.DETAIL(teamId));
  },

  // Update team
  updateTeam: async (teamId, { banner_url, description, is_hiring, logo_url, name }) => {
    return apiClient.put(ENDPOINTS.TEAMS.DETAIL(teamId), {
      banner_url,
      description,
      is_hiring,
      logo_url,
      name,
    });
  },

  // Delete team
  deleteTeam: async (teamId) => {
    return apiClient.delete(ENDPOINTS.TEAMS.DETAIL(teamId));
  },

  // Accept team invitation
  acceptInvitation: async (invitationId) => {
    return apiClient.post(ENDPOINTS.TEAMS.ACCEPT_INVITATION(invitationId));
  },

  // Reject team invitation
  rejectInvitation: async (invitationId, reason) => {
    return apiClient.post(ENDPOINTS.TEAMS.REJECT_INVITATION(invitationId), { reason });
  },

  // Invite user to team
  inviteMember: async (teamId, { user_id, message }) => {
    return apiClient.post(ENDPOINTS.TEAMS.INVITE(teamId), { user_id, message });
  },

  // Leave team
  leaveTeam: async (teamId, reason) => {
    return apiClient.post(ENDPOINTS.TEAMS.LEAVE(teamId), { reason });
  },

  // Remove team member
  removeMember: async (teamId, memberId) => {
    return apiClient.delete(ENDPOINTS.TEAMS.MEMBER(teamId, memberId));
  },

  // Add team portfolio item
  addPortfolio: async (teamId, { description, github_url, image_url, project_url, title }) => {
    return apiClient.post(ENDPOINTS.TEAMS.PORTFOLIO(teamId), {
      description,
      github_url,
      image_url,
      project_url,
      title,
    });
  },

  // Update team portfolio item
  updatePortfolio: async (portfolioId, { description, github_url, image_url, project_url, title }) => {
    return apiClient.put(ENDPOINTS.TEAMS.PORTFOLIO_DETAIL(portfolioId), {
      description,
      github_url,
      image_url,
      project_url,
      title,
    });
  },

  // Delete team portfolio item
  deletePortfolio: async (portfolioId) => {
    return apiClient.delete(ENDPOINTS.TEAMS.PORTFOLIO_DETAIL(portfolioId));
  },

  // Add team skill
  addSkill: async (teamId, { experience_level, skill_name }) => {
    return apiClient.post(ENDPOINTS.TEAMS.SKILLS(teamId), { experience_level, skill_name });
  },

  // Update team skill
  updateSkill: async (skillId, { experience_level, skill_name }) => {
    return apiClient.put(ENDPOINTS.TEAMS.SKILLS_DETAIL(skillId), { experience_level, skill_name });
  },

  // Delete team skill
  deleteSkill: async (skillId) => {
    return apiClient.delete(ENDPOINTS.TEAMS.SKILLS_DETAIL(skillId));
  },
};

export default teamsApi;
