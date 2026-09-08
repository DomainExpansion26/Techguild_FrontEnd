import React, { createContext, useContext, useState, useEffect } from "react";
import { ROLES } from "@/permissions/roles";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  TOKEN: "techguild_token",
  USER: "techguild_user",
  ROLE: "techguild_role",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Purge legacy hardcoded demo profile
        if (parsed && parsed.name === "Arjun Mehta" && parsed.email === "arjun@example.com") {
          localStorage.removeItem(STORAGE_KEYS.USER);
          return null;
        }
        return parsed;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
    return savedRole || (user?.role || ROLES.INDIVIDUAL);
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    // Purge legacy mock token
    if (savedToken === "mock-jwt-token") {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      return null;
    }
    return savedToken || null;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    if (role) {
      localStorage.setItem(STORAGE_KEYS.ROLE, role);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ROLE);
    }
  }, [role]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
  }, [token]);

  const login = async (userData, userToken, userRole) => {
    setIsLoading(true);
    try {
      const activeRole = userRole || userData?.role || ROLES.INDIVIDUAL;
      setUser(userData);
      setToken(userToken || null);
      setRole(activeRole);
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(ROLES.INDIVIDUAL);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    localStorage.removeItem("techguild_pending_user");
  };

  const switchRole = (newRole) => {
    if (Object.values(ROLES).includes(newRole)) {
      setRole(newRole);
      if (user) {
        setUser({ ...user, role: newRole });
      }
    }
  };

  const value = {
    user,
    role,
    token,
    isLoading,
    isAuthenticated: Boolean(token && token !== "mock-jwt-token"),
    login,
    logout,
    updateUser,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
