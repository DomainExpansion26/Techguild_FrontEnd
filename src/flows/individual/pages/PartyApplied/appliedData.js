// [TechGuild Update: 23-10-2026] Party Management — applicant-state sample data
// (Figma "Party management for Applied party screen", node 230:1216).
// Placeholder until an applications API exists; withdraw / respond are
// local snackbars.

/** The applicant view of the user, mirrored on the member screen's roster. */
export const ME = {
  name: "Arjun Mehta",
  initials: "AM",
};

/** Applications list, in the Figma order. `statusKey` maps to APPLICATIONS
 *  strings + STATUS_STYLES in AppliedParty.jsx, `actionKey` picks the
 *  action-button label. */
export const APPLICATIONS = [
  {
    id: "pixel-masters",
    initials: "PM",
    color: "#2563eb",
    name: "Pixel Masters",
    tagline: "UI/UX Design · Development",
    members: 5,
    rank: "E",
    appliedWhen: "2 days ago",
    date: "Aug 12, 2026",
    statusKey: "review",
    actionKey: "view",
  },
  {
    id: "creative-circuit",
    initials: "CC",
    color: "#ec4899",
    name: "Creative Circuit",
    tagline: "Product Design · Research",
    members: 4,
    rank: "D",
    appliedWhen: "4 days ago",
    date: "Aug 10, 2026",
    statusKey: "pending",
    actionKey: "view",
  },
  {
    id: "launch-crew",
    initials: "LC",
    color: "#22c55e",
    name: "Launch Crew",
    tagline: "Web Development · SaaS",
    members: 3,
    rank: "E",
    appliedWhen: "6 days ago",
    date: "Aug 8, 2026",
    statusKey: "info",
    actionKey: "respond",
  },
];

/** Chip colours read from the frame (rounded to comfortable values). */
export const STATUS_STYLES = {
  review: { bg: "#fff2d1", fg: "#b96b00" },
  pending: { bg: "#eaf2ff", fg: "#1869d7" },
  info: { bg: "#f4e8ff", fg: "#8028df" },
};

/** Party ids from JoinParty/partyData.js rendered in the Explore section. */
export const EXPLORE_IDS = ["pixel-masters", "creative-forge"];
