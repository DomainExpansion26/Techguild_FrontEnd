import React from "react";
import { usePermission } from "@/permissions/usePermission";
import AccessDenied from "@/Components/feedback/AccessDenied";

export default function PermissionGuard({ permission, requiredPermissions = [], fallback, children }) {
  const { can, canAll } = usePermission();

  const isAllowed = permission
    ? can(permission)
    : requiredPermissions.length > 0
    ? canAll(requiredPermissions)
    : true;

  if (!isAllowed) {
    if (fallback !== undefined) return fallback;
    return <AccessDenied message="You do not have the required permissions to access this page." />;
  }

  return children;
}
