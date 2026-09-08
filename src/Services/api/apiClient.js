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

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("techguild_token");

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config = {
    credentials: "include", // For cookies like refresh_token, oauth_state
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // If body is an object and not FormData, stringify it
  if (config.body && typeof config.body === "object" && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  // Handle FormData: remove Content-Type so browser sets correct boundary
  if (config.body instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  // Handle query parameters if provided
  let url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;
  if (options.params && typeof options.params === "object") {
    const searchParams = new URLSearchParams();
    Object.entries(options.params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        searchParams.append(key, val);
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  try {
    const response = await fetch(url, config);

    if (response.status === 401) {
      console.warn("Session unauthorized or token expired for:", endpoint);
    }

    const contentType = response.headers.get("content-type");
    let data = null;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      let errorMessage = "";
      if (typeof data === "object" && data !== null) {
        if (Array.isArray(data.errors) && data.errors.length > 0) {
          errorMessage = data.errors.map((err) => err.message || err.msg || JSON.stringify(err)).join(". ");
        } else {
          errorMessage = data.message || data.error || data.detail;
        }
      }
      if (!errorMessage) {
        errorMessage = `Request failed with status ${response.status}`;
      }
      throw new ApiError(errorMessage, response.status, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || "Network error", 0, null);
  }
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
