import { useAuth } from "@/context/AuthContext";
import { hasPermission, hasAllPermissions, hasAnyPermission } from "./accessControl";

/**
 * Custom hook to verify permissions for the currently authenticated user.
 */
export function usePermission() {
  const { user, role } = useAuth();

  const can = (permission) => {
    return hasPermission(role, permission);
  };

  const canAll = (permissions) => {
    return hasAllPermissions(role, permissions);
  };

  const canAny = (permissions) => {
    return hasAnyPermission(role, permissions);
  };

  return {
    can,
    canAll,
    canAny,
    role,
    user,
  };
}
