import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

export const projectsApi = {
  // Browse published projects
  getProjects: async (filters = {}) => {
    return apiClient.get(ENDPOINTS.PROJECTS.BASE, { params: filters });
  },

  // Create new project with OpenAPI schema normalization
  createProject: async (projectData) => {
    const now = new Date();
    const defaultDeadline = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();
    const defaultStart = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();
    const defaultEnd = new Date(now.getTime() + 32 * 24 * 60 * 60 * 1000).toISOString();

    const minB = Number(projectData.min_budget) || Number(projectData.budget) || 100;
    const maxB = Number(projectData.max_budget) || Number(projectData.budget) || minB || 1000;

    let skills = [];
    if (Array.isArray(projectData.required_skills)) {
      skills = projectData.required_skills;
    } else if (Array.isArray(projectData.skills)) {
      skills = projectData.skills;
    } else if (typeof projectData.skills === "string") {
      skills = projectData.skills.split(",").map((s) => s.trim()).filter(Boolean);
    } else if (typeof projectData.required_skills === "string") {
      skills = projectData.required_skills.split(",").map((s) => s.trim()).filter(Boolean);
    }

    if (skills.length === 0) {
      skills = ["Full Stack", "JavaScript"];
    }

    const payload = {
      title: (projectData.title || "").trim(),
      description: (projectData.description || "").trim(),
      category: projectData.category || "Full Stack",
      budget_type: projectData.budget_type || "fixed",
      min_budget: minB,
      max_budget: maxB,
      currency: projectData.currency || "USD",
      experience_level: projectData.experience_level || "intermediate",
      project_type: projectData.project_type || "remote",
      duration: projectData.duration || "1 month",
      required_skills: skills,
      visibility: projectData.visibility || "public",
      application_deadline: projectData.application_deadline ? new Date(projectData.application_deadline).toISOString() : defaultDeadline,
      estimated_start_date: projectData.estimated_start_date ? new Date(projectData.estimated_start_date).toISOString() : defaultStart,
      estimated_end_date: projectData.estimated_end_date ? new Date(projectData.estimated_end_date).toISOString() : defaultEnd,
      max_applications: Number(projectData.max_applications) || 25,
      is_featured: Boolean(projectData.is_featured),
      is_urgent: Boolean(projectData.is_urgent),
      ...projectData,
      required_skills: skills,
    };

    return apiClient.post(ENDPOINTS.PROJECTS.BASE, payload);
  },

  // Client's own projects
  getMyProjects: async () => {
    return apiClient.get(ENDPOINTS.PROJECTS.MY);
  },

  // Search / filter projects
  searchProjects: async (filters = {}) => {
    return apiClient.get(ENDPOINTS.PROJECTS.SEARCH, { params: filters });
  },

  // Get single project by ID
  getProjectById: async (projectId) => {
    return apiClient.get(ENDPOINTS.PROJECTS.DETAIL(projectId));
  },

  // Update project
  updateProject: async (projectId, projectData) => {
    return apiClient.patch(ENDPOINTS.PROJECTS.DETAIL(projectId), projectData);
  },

  // Delete project
  deleteProject: async (projectId) => {
    return apiClient.delete(ENDPOINTS.PROJECTS.DETAIL(projectId));
  },

  // Publish project
  publishProject: async (projectId) => {
    return apiClient.post(ENDPOINTS.PROJECTS.PUBLISH(projectId));
  },

  // Close project
  closeProject: async (projectId, reason) => {
    return apiClient.post(ENDPOINTS.PROJECTS.CLOSE(projectId), { reason });
  },

  // Reopen project
  reopenProject: async (projectId, reason) => {
    return apiClient.post(ENDPOINTS.PROJECTS.REOPEN(projectId), { reason });
  },
};

export default projectsApi;
