import React from "react";
import { useAuth } from "@/context/AuthContext";
import AccessDenied from "@/Components/feedback/AccessDenied";
import LoadingSpinner from "@/Components/feedback/LoadingSpinner";

export default function RoleGuard({ allowedRoles = [], children }) {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Checking access..." />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <AccessDenied message={`Access restricted. Required role: ${allowedRoles.join(" or ")}`} />;
  }

  return children;
}
