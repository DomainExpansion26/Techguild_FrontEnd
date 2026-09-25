import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ROLES } from "@/permissions/roles";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  TOKEN: "techguild_token",
  USER: "techguild_user",
  ROLE: "techguild_role",
};

function loadInitialSession() {
  let user = null;
  let token = null;
  let role = ROLES.INDIVIDUAL;

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
  }

  return { user, token, role };
}

export function AuthProvider({ children }) {
  const [initial] = useState(loadInitialSession);
  const [user, setUser] = useState(initial.user);
  const [token, setToken] = useState(initial.token);
  const [role, setRole] = useState(initial.role);
  const [isLoading, setIsLoading] = useState(false);

  // Single persist path per slice; effects are the only writers so state
  // stays the source of truth (callers never touch localStorage directly,
  // except Login's remember-me email which is a separate preference key).
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

  const login = useCallback((userData, userToken, userRole) => {
    const activeRole = userRole || userData?.role || ROLES.INDIVIDUAL;
    setIsLoading(true);
    try {
      // Batch-adjacent sets: one render pass commits user+token+role together.
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

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setRole(ROLES.INDIVIDUAL);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    localStorage.removeItem("techguild_pending_user");
  }, []);

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
