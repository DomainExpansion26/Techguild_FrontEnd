// [TechGuild Update: 14-10-2026] Leave / Delete party screens — placeholder data.
// These flows are confirmation screens: the submit handlers are intentionally
// inert until teamsApi exposes leave / transfer-lead / request-deletion.

/**
 * Party shown on both Leave screens. HealthPlus Developers is distinct from the
 * PartyLead dashboard's "Pixel Masters" because Figma specifies it that way.
 */
export const LEAVE_PARTY = {
  initials: "H+",
  name: "HealthPlus Developers",
  color: "#103ca4",
  members: 5,
  activeQuests: 2,
  created: "10 May 2026",
};

/** Party shown on the Delete screen. */
export const DELETE_PARTY = {
  initials: "PM",
  name: "Pixel Masters",
  color: "#2563eb",
  members: 5,
  activeQuests: 0,
  created: "10 May 2026",
};

/** Consequences of leaving as a plain member. */
export const MEMBER_WARNINGS = [
  "You will no longer have access to party projects, files, discussions, and milestones.",
  "You will be removed from all active quests associated with this party.",
  "You can rejoin the party later if invited again.",
];

/** The lead has one extra, blocking consequence. */
export const LEAD_WARNINGS = [
  "You must transfer Party Lead to another member before you can leave.",
  "You will lose access to all party projects, files, discussions, and milestones.",
  "You will be removed from all active quests associated with this party.",
  "You can rejoin the party later only if you are invited again.",
];

/**
 * Optional exit reasons. Shared by both Leave screens — the member variant
 * pre-selects the first one, the lead variant pre-selects none because the
 * leadership transfer must be chosen explicitly first.
 */
export const REASONS = [
  { key: "mismatch", label: "Not a good fit", desc: "The party is not aligned with my skills or goals.", icon: "Target" },
  { key: "busy", label: "Too busy", desc: "I don't have enough time to contribute.", icon: "Clock" },
  { key: "done", label: "Project completed", desc: "The project / quest is completed.", icon: "ClipboardList" },
  { key: "elsewhere", label: "Found another opportunity", desc: "I found a better opportunity elsewhere.", icon: "Building2" },
  { key: "other", label: "Other", desc: "Something else (you can tell us more).", icon: "MoreHorizontal" },
];

/** Members the lead can hand Party Lead to. */
export const TRANSFER_CANDIDATES = [
  { id: "t1", name: "Rahul Sharma", initials: "RS", color: "#7c3aed", role: "UI/UX Designer", quests: 2, joined: "10 May 2026" },
  { id: "t2", name: "Sneha Patel", initials: "SP", color: "#2563eb", role: "Frontend Developer", quests: 2, joined: "10 May 2026" },
  { id: "t3", name: "Vikram Nair", initials: "VN", color: "#f59e0b", role: "Backend Developer", quests: 1, joined: "12 May 2026" },
  { id: "t4", name: "Meera Iyer", initials: "MI", color: "#16a34a", role: "QA Engineer", quests: 1, joined: "14 May 2026" },
];

/** Deletion gates. Only the unmet one blocks the confirm step. */
export const ELIGIBILITY = [
  { key: "quests", label: "No active quests", note: "0 ongoing quests found", met: true },
  { key: "payments", label: "No pending payments", note: "All milestone payments are settled", met: true },
  { key: "lead", label: "Party Lead verified", note: "You are the verified Party Lead", met: true },
  { key: "notified", label: "All members notified", note: "Members will be notified after you submit request", met: false },
];

export const DELETION_STEPS = [
  { n: 1, label: "Submit Deletion Request", desc: "You confirm and submit the party deletion request.", tone: "red" },
  { n: 2, label: "Members Are Notified", desc: "All 4 members receive an in-app + email notification to approve or decline.", tone: "amber" },
  { n: 3, label: "Approval Window (48 hrs)", desc: "All members must approve within 48 hours. One decline cancels the deletion.", tone: "blue" },
  { n: 4, label: "Party Permanently Deleted", desc: "Once all approve, the party and all its data are permanently removed.", tone: "green" },
];

export const DELETES = [
  "All party chats & messages",
  "Shared files & documents",
  "Party profile & reputation score",
  "Party channels & member connections",
];

export const KEEPS = [
  "Individual member profiles & XP",
  "Completed quest history & earnings",
  "Personal reputation and rank",
];

/**
 * Roster on the Delete screen. `auto` marks the lead, who is pre-approved so
 * only the other four members can actually block deletion.
 */
export const CONSENT_MEMBERS = [
  { id: "c1", name: "You", initials: "AM", color: "#103ca4", role: "Full Stack Developer", auto: true },
  { id: "c2", name: "Rahul", initials: "RS", color: "#7c3aed", role: "UI/UX Designer" },
  { id: "c3", name: "Sneha", initials: "SP", color: "#2563eb", role: "Frontend Developer" },
  { id: "c4", name: "Vikram", initials: "VN", color: "#f59e0b", role: "Backend Developer" },
  { id: "c5", name: "Meera", initials: "MI", color: "#16a34a", role: "QA Engineer" },
];