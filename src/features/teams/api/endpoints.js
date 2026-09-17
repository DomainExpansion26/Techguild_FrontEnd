export const TEAMS = {
  BASE: "/v1/teams",
  MY: "/v1/teams/my",
  DETAIL: (teamId) => `/v1/teams/${teamId}`,
  ACCEPT_INVITATION: (invitationId) => `/v1/teams/invitation/${invitationId}/accept`,
  REJECT_INVITATION: (invitationId) => `/v1/teams/invitation/${invitationId}/reject`,
  INVITE: (teamId) => `/v1/teams/${teamId}/invite`,
  LEAVE: (teamId) => `/v1/teams/${teamId}/leave`,
  MEMBER: (teamId, memberId) => `/v1/teams/${teamId}/member/${memberId}`,
  PORTFOLIO: (teamId) => `/v1/teams/${teamId}/portfolio`,
  PORTFOLIO_DETAIL: (portfolioId) => `/v1/teams/portfolio/${portfolioId}`,
  SKILLS: (teamId) => `/v1/teams/${teamId}/skills`,
  SKILLS_DETAIL: (skillId) => `/v1/teams/skills/${skillId}`,
};