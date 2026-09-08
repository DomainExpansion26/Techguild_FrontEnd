import { ROLE_PERMISSIONS } from "./rolePermissions";
import { ROLES } from "./roles";

/**
 * Check if a user with a given role has a specific permission.
 * @param {string} role - The user's role (e.g., 'individual', 'client', 'agency', 'admin')
 * @param {string} permission - The permission key to check
 * @returns {boolean}
 */
export function hasPermission(role, permission) {
  if (!role || !permission) return false;
  if (role === ROLES.ADMIN) return true;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

/**
 * Check if a user has all of the specified permissions.
 * @param {string} role 
 * @param {string[]} requiredPermissions 
 * @returns {boolean}
 */
export function hasAllPermissions(role, requiredPermissions = []) {
  if (!role) return false;
  if (role === ROLES.ADMIN) return true;
  return requiredPermissions.every((perm) => hasPermission(role, perm));
}

/**
 * Check if a user has any of the specified permissions.
 * @param {string} role 
 * @param {string[]} permissionsList 
 * @returns {boolean}
 */
export function hasAnyPermission(role, permissionsList = []) {
  if (!role) return false;
  if (role === ROLES.ADMIN) return true;
  return permissionsList.some((perm) => hasPermission(role, perm));
}
