import { temporaryNavigationApi } from "./api/temporaryNavigationApi";

// Temporary profile-based navigation.
// After fetching GET /v1/profile, only the `account_type` field is used to
// decide the landing route. Everything lives in this folder so the whole
// feature can be deleted later without touching other code.

export const TEMP_DEFAULT_ROUTE = "/dashboard";

export const ACCOUNT_TYPE_TO_ROUTE = {
  client: "/client-profile",
  individual: "/profile",
  agency: "/agency/dashboard",
};

export function getAccountTypeRoute(accountType) {
  return ACCOUNT_TYPE_TO_ROUTE[accountType] || null;
}

export async function resolveAccountType() {
  try {
    const profile = await temporaryNavigationApi.getProfile();
    return profile?.account_type || null;
  } catch (err) {
    console.warn("Temporary profile-based navigation skipped:", err?.message || err);
    return null;
  }
}

export async function navigateByAccountType(navigate) {
  const accountType = await resolveAccountType();
  const route = getAccountTypeRoute(accountType);
  if (!route) {
    return false;
  }
  navigate(route);
  return true;
}