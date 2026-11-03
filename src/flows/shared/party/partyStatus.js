// [TechGuild Update: 23-10-2026] Party-membership demo status store.
//
// The Figma "Party Management" screens (nodes 230:1216 applicant, 230:1663
// member, 205:704 lead) map to three states. Until an applications API exists
// the state persists in localStorage so the "Go to Party Management" action
// can land on the right screen:
//   - Join Party request submit          -> "applied"
//   - applications API ping when accepted -> "member" (wire when the API lands)
//   - demo shortcut: /party-formation/applied?accept=1 -> "member"
// The lead state is implied by owning a party (Create Party -> /party-formation/lead).

export const PARTY_STATUS = {
  NONE: "none",
  APPLIED: "applied",
  MEMBER: "member",
};

const KEY = "techguild_party_status";

export function getPartyStatus() {
  try {
    return window.localStorage.getItem(KEY) || PARTY_STATUS.NONE;
  } catch {
    return PARTY_STATUS.NONE;
  }
}

export function setPartyStatus(status) {
  try {
    window.localStorage.setItem(KEY, status);
  } catch {
    /* storage unavailable — state simply is not persisted */
  }
}
