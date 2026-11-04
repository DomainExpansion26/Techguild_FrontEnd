export const ENDPOINTS = {
  // 1. Authentication
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    REGISTER_ACCOUNT_TYPE: "/auth/register/account-type",
    ACCOUNT_TYPE: "/auth/account-type",
    CHANGE_PASSWORD: "/auth/change-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    RESEND_VERIFICATION: "/auth/resend-verification",
    VERIFY_EMAIL: "/auth/verify-email",
    ACCOUNT: "/auth/account",

   // Two-factor authentication
    TWO_FA: {
      SETUP: "/auth/2fa/setup",
      VERIFY_SETUP: "/auth/2fa/verify-setup",
      VERIFY_LOGIN: "/auth/2fa/verify-login",
      VERIFY_RECOVERY_CODE: "/auth/2fa/verify-recovery-code",
      DISABLE: "/auth/2fa/disable",
      REGENERATE_RECOVERY_CODES: "/auth/2fa/recovery-codes/regenerate",
    },
  },

  // 2. OAuth
  OAUTH: {
    GOOGLE_LOGIN: "/oauth/google/login",
    GOOGLE_CALLBACK: "/oauth/google/callback",
    GITHUB_LOGIN: "/oauth/github/login",
    GITHUB_CALLBACK: "/oauth/github/callback",
  },

  // 3. Profile
  PROFILE: {
    BASE: "/v1/profile",
    INDIVIDUAL: "/v1/profile/individual",
    AGENCY: "/v1/profile/agency",
    CLIENT: "/v1/profile/client",
    AVATAR: "/v1/profile/avatar",
    LOGO: "/v1/profile/logo",
    UPLOAD_RESUME: "/v1/profile/upload-resume",
    RESUME: "/v1/profile/resume",
    CHECK_SLUG: "/v1/profile/check-slug",
    POINTS: "/v1/profile/points",
    EXPORT: "/v1/profile/export",
    PUBLIC_PROFILE: (slug) => `/v1/u/${slug}`,
  },

  // 4. Projects
  PROJECTS: {
    BASE: "/v1/projects",
    MY: "/v1/projects/my",
    SEARCH: "/v1/projects/search",
    DETAIL: (projectId) => `/v1/projects/${projectId}`,
    PUBLISH: (projectId) => `/v1/projects/${projectId}/publish`,
    CLOSE: (projectId) => `/v1/projects/${projectId}/close`,
    REOPEN: (projectId) => `/v1/projects/${projectId}/reopen`,
  },

  // 4a. Quests and quest milestones
  QUESTS: {
    BASE: "/v1/quests",
    MY_WORK: "/v1/quests/my-work",
    DETAIL: (questId) => `/v1/quests/${questId}`,
    ACCEPT: (questId) => `/v1/quests/${questId}/accept`,
    APPLICATIONS: (questId) => `/v1/quests/${questId}/applications`,
    ACCEPT_APPLICATION: (questId, applicationId) =>
      `/v1/quests/${questId}/applications/${applicationId}/accept`,
    REJECT_APPLICATION: (questId, applicationId) =>
      `/v1/quests/${questId}/applications/${applicationId}/reject`,
    WITHDRAW_APPLICATION: (questId, applicationId) =>
      `/v1/quests/${questId}/applications/${applicationId}/withdraw`,
    APPLY: (questId) => `/v1/quests/${questId}/apply`,
    MILESTONES: (questId) => `/v1/quests/${questId}/milestones`,
    APPROVE_ROADMAP: (questId) => `/v1/quests/${questId}/milestones/approve-roadmap`,
    SUBMIT_ROADMAP: (questId) => `/v1/quests/${questId}/milestones/submit-roadmap`,
    MILESTONE: (questId, milestoneId) =>
      `/v1/quests/${questId}/milestones/${milestoneId}`,
    APPROVE_MILESTONE: (questId, milestoneId) =>
      `/v1/quests/${questId}/milestones/${milestoneId}/approve`,
    FUND_MILESTONE: (questId, milestoneId) =>
      `/v1/quests/${questId}/milestones/${milestoneId}/fund`,
    CONFIRM_MILESTONE_FUNDING: (questId, milestoneId) =>
      `/v1/quests/${questId}/milestones/${milestoneId}/fund/confirm`,
    MILESTONE_PAYMENT: (questId, milestoneId) =>
      `/v1/quests/${questId}/milestones/${milestoneId}/payment`,
    MILESTONE_REFUND: (questId, milestoneId) =>
      `/v1/quests/${questId}/milestones/${milestoneId}/refund`,
    RELEASE_MILESTONE: (questId, milestoneId) =>
      `/v1/quests/${questId}/milestones/${milestoneId}/release`,
    REQUEST_MILESTONE_REVISION: (questId, milestoneId) =>
      `/v1/quests/${questId}/milestones/${milestoneId}/request-revision`,
    RESUBMIT_MILESTONE: (questId, milestoneId) =>
      `/v1/quests/${questId}/milestones/${milestoneId}/resubmit`,
    MILESTONE_REVISIONS: (questId, milestoneId) =>
      `/v1/quests/${questId}/milestones/${milestoneId}/revisions`,
    SEND_MILESTONE_FOR_REVIEW: (questId, milestoneId) =>
      `/v1/quests/${questId}/milestones/${milestoneId}/send-for-review`,
    SUBMIT_MILESTONE_FOR_RELEASE: (questId, milestoneId) =>
      `/v1/quests/${questId}/milestones/${milestoneId}/submit-for-release`,
    PUBLISH: (questId) => `/v1/quests/${questId}/publish`,
    REJECT: (questId) => `/v1/quests/${questId}/reject`,
  },

  // 4b. Client task-management dashboard and task operations
  CLIENT_TASK_MANAGEMENT: {
    METRICS: "/v1/client/task-management/metrics",
    ACTIVE_QUESTS: "/v1/client/task-management/quests/active",
    QUEST_ACTIVITIES: (questId) =>
      `/v1/client/task-management/quests/${questId}/activities`,
    APPROVE_QUEST: (questId) =>
      `/v1/client/task-management/quests/${questId}/approve`,
    CANCEL_QUEST_APPROVAL: (questId) =>
      `/v1/client/task-management/quests/${questId}/cancel-approval`,
    QUEST_DASHBOARD: (questId) =>
      `/v1/client/task-management/quests/${questId}/dashboard`,
    QUEST_MILESTONES: (questId) =>
      `/v1/client/task-management/quests/${questId}/milestones`,
    MILESTONE: (milestoneId) =>
      `/v1/client/task-management/milestones/${milestoneId}`,
    APPROVE_MILESTONE: (milestoneId) =>
      `/v1/client/task-management/milestones/${milestoneId}/approve`,
    CANCEL_MILESTONE_APPROVAL: (milestoneId) =>
      `/v1/client/task-management/milestones/${milestoneId}/cancel-approval`,
    MILESTONE_TASKS: (milestoneId) =>
      `/v1/client/task-management/milestones/${milestoneId}/tasks`,
    TASK_STATUS: (taskId) =>
      `/v1/client/task-management/tasks/${taskId}/status`,
  },

  // 5. Applications
  APPLICATIONS: {
    MY: "/v1/applications/my",
    APPLY: (projectId) => `/v1/projects/${projectId}/apply`,
    PROJECT_APPLICATIONS: (projectId) => `/v1/projects/${projectId}/applications`,
    DETAIL: (applicationId) => `/v1/applications/${applicationId}`,
    ACCEPT: (applicationId) => `/v1/applications/${applicationId}/accept`,
    SHORTLIST: (applicationId) => `/v1/applications/${applicationId}/shortlist`,
    REJECT: (applicationId) => `/v1/applications/${applicationId}/reject`,
  },

  // 6. Contracts
  CONTRACTS: {
    BASE: "/contracts",
    CLIENT: "/contracts/client",
    FREELANCER: "/contracts/freelancer",
    DETAIL: (id) => `/contracts/${id}`,
    SIGN: (id) => `/contracts/${id}/sign`,
    COMPLETE: (id) => `/contracts/${id}/complete`,
    CANCEL: (id) => `/contracts/${id}/cancel`,
  },

  // 7. Milestones
  MILESTONES: {
    BASE: "/milestones",
    CONTRACT: (contractId) => `/milestones/contract/${contractId}`,
    DETAIL: (id) => `/milestones/${id}`,
    SUBMIT: (id) => `/milestones/${id}/submit`,
    APPROVE: (id) => `/milestones/${id}/approve`,
    REJECT: (id) => `/milestones/${id}/reject`,
    PAY: (id) => `/milestones/${id}/pay`,
  },

  // 8. Settings
  SETTINGS: {
    ACCOUNT: "/v1/settings/account",
    NOTIFICATIONS: "/v1/settings/notifications",
    PRIVACY: "/v1/settings/privacy",
  },

  // 9. Admin Verification
  ADMIN_VERIFICATION: {
    QUEUE: "/v1/admin/verification/queue",
    APPROVE: (id) => `/v1/admin/verification/${id}/approve`,
    REJECT: (id) => `/v1/admin/verification/${id}/reject`,
  },

  // 10. Submissions
  SUBMISSIONS: {
    BASE: "/v1/submissions",
    MILESTONE: (milestoneId) => `/v1/submissions/milestone/${milestoneId}`,
    DETAIL: (id) => `/v1/submissions/${id}`,
    APPROVE: (id) => `/v1/submissions/${id}/approve`,
    REJECT: (id) => `/v1/submissions/${id}/reject`,
  },

  // 11. Teams
  TEAMS: {
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
  },

  // 12. Verification
  VERIFICATION: {
    STATUS: "/v1/verification/status",
    IDENTITY_STATUS: "/v1/verification/identity/status",
    IDENTITY_SUBMIT: "/v1/verification/identity/submit",
    BUSINESS_SUBMIT: "/v1/verification/business/submit",
    RESUBMIT: (recordId) => `/v1/verification/resubmit/${recordId}`,
  },
};

export default ENDPOINTS;
