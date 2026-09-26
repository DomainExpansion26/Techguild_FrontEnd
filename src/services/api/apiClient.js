import axios from "axios";

/**
 * Centralized API Client with token injection, standard headers, credentials, and error normalization.
 */

export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL !== undefined
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.DEV
    ? ""
    : "https://techguild-backend.onrender.com";

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // For cookies like refresh_token, oauth_state
});

// Attach the Bearer token when present (never "Bearer null" / empty token).
// An explicit Authorization header always wins so callers can probe with a
// fresh token before it is persisted (e.g. login -> getProfile).
axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    const token = localStorage.getItem("techguild_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Normalize Axios errors into the existing ApiError abstraction
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        console.warn("Session unauthorized or token expired for:", error.config?.url);
      }
      throw new ApiError(extractErrorMessage(data, status), status, data);
    }
    throw new ApiError(error.message || "Network error", 0, null);
  }
);

function extractErrorMessage(data, status) {
  if (data && typeof data === "object") {
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors.map((err) => err.message || err.msg || JSON.stringify(err)).join(". ");
    }
    if (data.message || data.error || data.detail) {
      return data.message || data.error || data.detail;
    }
  } else if (typeof data === "string" && data) {
    return data;
  }
  return `Request failed with status ${status}`;
}

async function request(endpoint, options = {}) {
  const { params, headers, ...rest } = options;

  const config = {
    ...rest,
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data: rest.body,
  };

  // The `body` option (e.g. DELETE with a payload) maps to axios `data`
  if ("body" in rest) {
    delete config.body;
  }

  // Handle FormData: remove Content-Type so browser sets correct boundary
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  // Handle query parameters if provided (same filtering as before)
  if (params && typeof params === "object") {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        searchParams.append(key, val);
      }
    });
    config.params = searchParams;
  }

  const response = await axiosInstance.request(config);
  return response.data;
}

export const apiClient = {
  get: (endpoint, options) => request(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: "POST", body }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: "PUT", body }),
  patch: (endpoint, body, options) => request(endpoint, { ...options, method: "PATCH", body }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: "DELETE" }),
  upload: (endpoint, formData, options) => request(endpoint, { ...options, method: "POST", body: formData }),
};

export default apiClient;
