// 17-11-2026
import { ROLES } from "@/permissions/roles";

export const POST_LOGIN_REDIRECT_KEY = "techguild_post_login_redirect";

const QUEST_BOARD_PATHS = new Set([
  "/quest-board",
  "/features/quest-board",
  "/individual/quest-board",
  "/individual/projects",
]);

function normalizeRole(role) {
  return typeof role === "string" ? role.trim().toLowerCase() : "";
}

export function resolveDashboardPath(role) {
  const normalized = normalizeRole(role);
  if (normalized === ROLES.CLIENT || normalized === "client_admin" || normalized === "client_member") {
    return "/client-dashboard";
  }
  if (normalized === ROLES.AGENCY || normalized === "agency_admin") return "/agency/dashboard";
  if (normalized === ROLES.INDIVIDUAL) return "/dashboard";
  if (normalized === ROLES.ADMIN) return "/admin/dashboard";
  return "/account-type";
}

export function resolveQuestBoardPath(role) {
  const normalized = normalizeRole(role);
  if (normalized === ROLES.CLIENT || normalized === "client_admin" || normalized === "client_member") {
    return "/client-quest-board";
  }
  if (normalized === ROLES.INDIVIDUAL) return "/individual/quest-board";
  if (normalized === ROLES.AGENCY || normalized === "agency_admin") return "/agency/projects";
  return null;
}

export function resolvePostLoginPath(role, from) {
  const target =
    typeof from === "string" && from.startsWith("/") && !from.startsWith("//")
      ? from
      : null;

  if (!target) return resolveDashboardPath(role);
  if (QUEST_BOARD_PATHS.has(target)) {
    return resolveQuestBoardPath(role) ?? resolveDashboardPath(role);
  }
  return target;
}

export function savePendingRedirect(from) {
  const target =
    typeof from === "string" && from.startsWith("/") && !from.startsWith("//")
      ? from
      : null;
  if (!target) return;
  try {
    sessionStorage.setItem(POST_LOGIN_REDIRECT_KEY, target);
  } catch {
    // Storage unavailable: fall back to normal post-login routing
  }
}

export function readPendingRedirect() {
  try {
    return sessionStorage.getItem(POST_LOGIN_REDIRECT_KEY);
  } catch {
    return null;
  }
}

export function clearPendingRedirect() {
  try {
    sessionStorage.removeItem(POST_LOGIN_REDIRECT_KEY);
  } catch {
    // Nothing to clear
  }
}
