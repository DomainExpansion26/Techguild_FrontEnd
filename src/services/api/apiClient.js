import axios from "axios";
import { ENDPOINTS } from "./endpoints";

/**
 * Centralized API Client with token injection, standard headers, credentials,
 * automatic token refresh on 401 expiration, and comprehensive error normalization.
 */

// Base URL configurable via environment variables with fallback to documented production URL
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  import.meta.env.NEXT_PUBLIC_API_URL ||
  "https://techguild-backend.onrender.com";

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

// Storage keys
const TOKEN_KEY = "techguild_token";
const REFRESH_TOKEN_KEY = "techguild_refresh_token";

// Attach the Bearer token when present (never "Bearer null" / empty token).
// An explicit Authorization header always wins so callers can probe with a
// fresh token before it is persisted (e.g. login -> getProfile).
axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && token !== "mock-jwt-token") {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Automatic token refresh queue management to avoid concurrent refresh loops
let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(newAccessToken) {
  refreshSubscribers.forEach((cb) => cb(newAccessToken));
  refreshSubscribers = [];
}

function onRefreshFailed(error) {
  refreshSubscribers.forEach((cb) => cb(null, error));
  refreshSubscribers = [];
}

function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem("techguild_expires_at");
  localStorage.removeItem("techguild_user");
  localStorage.removeItem("techguild_role");
  localStorage.removeItem("techguild_pending_user");
  window.dispatchEvent(new CustomEvent("techguild:auth_expired"));
}

// Normalize Axios errors and handle automatic token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      const { status, data } = error.response;

      // Handle 401 Unauthorized: Attempt automatic token refresh
      const isAuthEndpoint =
        originalRequest?.url?.includes(ENDPOINTS.AUTH.LOGIN) ||
        originalRequest?.url?.includes(ENDPOINTS.AUTH.REFRESH_TOKEN) ||
        originalRequest?.url?.includes(ENDPOINTS.AUTH.REGISTER);

      if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
        const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

        // If we have no refresh token stored, fail immediately
        if (!storedRefreshToken) {
          clearAuthSession();
          throw new ApiError(extractErrorMessage(data, status), status, data);
        }

        // If a refresh is already in flight, queue this request
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            subscribeTokenRefresh((newAccessToken, refreshErr) => {
              if (refreshErr || !newAccessToken) {
                reject(new ApiError(extractErrorMessage(data, 401), 401, data));
                return;
              }
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              resolve(axiosInstance(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Call POST /auth/refresh-token with refresh_token in request body
          const refreshResponse = await axios.post(
            `${BASE_URL}${ENDPOINTS.AUTH.REFRESH_TOKEN}`,
            { refresh_token: storedRefreshToken },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );

          const newAccessToken =
            refreshResponse.data?.access_token ||
            refreshResponse.data?.token;

          if (!newAccessToken) {
            throw new Error("No access token returned from refresh endpoint.");
          }

          localStorage.setItem(TOKEN_KEY, newAccessToken);
          if (refreshResponse.data?.expires_in) {
            const expiresAt = Date.now() + refreshResponse.data.expires_in * 1000;
            localStorage.setItem("techguild_expires_at", String(expiresAt));
          }

          isRefreshing = false;
          onRefreshed(newAccessToken);

          // Retry the original request with new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          onRefreshFailed(refreshError);
          clearAuthSession();
          throw new ApiError("Session expired. Please sign in again.", 401, null);
        }
      }

      throw new ApiError(extractErrorMessage(data, status), status, data);
    }

    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      throw new ApiError("Request timed out. Please check your connection and try again.", 408, null);
    }

    throw new ApiError(error.message || "Network error. Please check your connection.", 0, null);
  }
);

export function extractErrorMessage(data, status) {
  if (data && typeof data === "object") {
    // Array of errors: [{ message: '...' }, { msg: '...' }]
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors
        .map((err) => err.message || err.msg || (typeof err === "string" ? err : JSON.stringify(err)))
        .join(". ");
    }
    // FastAPI / Pydantic style 422 detail array
    if (Array.isArray(data.detail) && data.detail.length > 0) {
      return data.detail
        .map((err) => err.msg || err.message || (typeof err === "string" ? err : JSON.stringify(err)))
        .join(". ");
    }
    if (data.message && typeof data.message === "string") {
      return data.message;
    }
    if (data.error && typeof data.error === "string") {
      return data.error;
    }
    if (data.detail && typeof data.detail === "string") {
      return data.detail;
    }
  } else if (typeof data === "string" && data.trim()) {
    return data;
  }

  // Fallbacks for standard HTTP status codes
  switch (status) {
    case 400:
      return "Bad request. Please verify the provided details.";
    case 401:
      return "Unauthorized. Please check your credentials or log in again.";
    case 403:
      return "Forbidden. You do not have permission to access this resource.";
    case 404:
      return "The requested resource was not found.";
    case 409:
      return "A conflict occurred with an existing record.";
    case 422:
      return "Validation failed. Please verify your input fields.";
    case 429:
      return "Too many requests. Please slow down and try again later.";
    case 500:
    case 502:
    case 503:
    case 504:
      return "Server error. Please try again later.";
    default:
      return status ? `Request failed with status ${status}` : "Network error. Please check your connection.";
  }
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

  // Handle query parameters if provided
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
