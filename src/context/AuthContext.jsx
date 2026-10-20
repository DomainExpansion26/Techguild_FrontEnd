import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ROLES } from "@/permissions/roles";
import { authApi } from "@/services/api";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  TOKEN: "techguild_token",
  REFRESH_TOKEN: "techguild_refresh_token",
  EXPIRES_AT: "techguild_expires_at",
  USER: "techguild_user",
  ROLE: "techguild_role",
};

function loadInitialSession() {
  let user = null;
  let token = null;
  let role = null;

  try {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      // Purge legacy hardcoded demo profile
      if (parsed && parsed.name === "Arjun Mehta" && parsed.email === "arjun@example.com") {
        localStorage.removeItem(STORAGE_KEYS.USER);
      } else if (parsed) {
        user = parsed;
      }
    }
  } catch {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
  // Purge legacy mock token
  if (savedToken === "mock-jwt-token") {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  } else if (savedToken) {
    token = savedToken;
  }

  const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
  if (savedRole && Object.values(ROLES).includes(savedRole)) {
    role = savedRole;
  } else if (user?.role && Object.values(ROLES).includes(user.role)) {
    role = user.role;
  }

  // No token -> no session: drop stale user/role so a logged-out reload
  // never resurrects a previous identity.
  if (!token) {
    user = null;
    role = null;
  }

  return { user, token, role };
}

export function AuthProvider({ children }) {
  const [initial] = useState(loadInitialSession);
  const [user, setUser] = useState(initial.user);
  const [token, setToken] = useState(initial.token);
  const [role, setRole] = useState(initial.role);
  const [isLoading, setIsLoading] = useState(false);

  // Sync state to storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    if (token && role) {
      localStorage.setItem(STORAGE_KEYS.ROLE, role);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ROLE);
    }
  }, [token, role]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
  }, [token]);

  // Clean local session state
  const clearLocalSession = useCallback(() => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.EXPIRES_AT);
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    localStorage.removeItem("techguild_pending_user");
  }, []);

  // Listen for automatic token refresh failures from apiClient
  useEffect(() => {
    const handleAuthExpired = () => {
      clearLocalSession();
    };

    window.addEventListener("techguild:auth_expired", handleAuthExpired);
    return () => window.removeEventListener("techguild:auth_expired", handleAuthExpired);
  }, [clearLocalSession]);

  const login = useCallback((userData, userToken, userRole, refreshToken, expiresIn) => {
    const activeRole = userRole !== undefined ? userRole : (userData?.role || null);
    setIsLoading(true);
    try {
      if (userToken) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, userToken);
      }
      if (refreshToken) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      }
      if (expiresIn) {
        const expiresAt = Date.now() + expiresIn * 1000;
        localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, String(expiresAt));
      }
      if (userData) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      }
      if (activeRole) {
        localStorage.setItem(STORAGE_KEYS.ROLE, activeRole);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ROLE);
      }

      setUser(userData);
      setToken(userToken || null);
      setRole(activeRole);
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    try {
      // Call documented POST /auth/logout endpoint sending refresh_token
      await authApi.logout(refreshToken).catch(() => {});
    } finally {
      clearLocalSession();
    }
  }, [clearLocalSession]);

  const switchRole = useCallback((newRole) => {
    if (Object.values(ROLES).includes(newRole)) {
      setRole(newRole);
      setUser((prev) => (prev ? { ...prev, role: newRole } : prev));
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      role,
      token,
      isLoading,
      isAuthenticated: Boolean(token && token !== "mock-jwt-token"),
      login,
      logout,
      updateUser,
      switchRole,
    }),
    [user, role, token, isLoading, login, logout, updateUser, switchRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
