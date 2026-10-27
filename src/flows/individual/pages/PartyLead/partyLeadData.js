// [TechGuild Update: 14-10-2026] Party Lead dashboard — sample party roster.
// Placeholder data until teamsApi exposes the lead-queue endpoints; the
// accept / decline / remove / resend actions below are wired to local state.

/** Member slots are fixed at 5 by LIMITS.MEMBERS_MIN in CREATE_PARTY. */
export const PARTY = {
  id: "pixel-masters",
  name: "Pixel Masters",
  initials: "PM",
  logoColor: "#2563eb",
  rank: "F",
  status: "Draft",
  tag: "@pixelmasters",
  category: "Development",
  location: "Pune, India",
  memberLimit: 5,
  guildId: "TG-IND-2026-001245",
  visibility: "Public",
  chat: "In-app Chat",
  availability: "Open to Quests",
};

/** Confirmed members — `isLead` renders the amber Lead chip, `isYou` the You badge. */
export const MEMBERS = [
  {
    id: "m1",
    name: "Arjun Mehta",
    initials: "AM",
    color: "#103ca4",
    role: "Full Stack Developer",
    handle: "@arjun.mehta",
    isLead: true,
    isYou: true,
    meta: "Party Lead",
  },
  {
    id: "m2",
    name: "Priya Verma",
    initials: "PV",
    color: "#ec4899",
    role: "UI Designer",
    handle: "@priyadesign",
    meta: "Accepted 1 hr ago",
  },
];

/** Invites sent but not yet accepted. */
export const PENDING_INVITES = [
  {
    id: "i1",
    name: "Rahul Sharma",
    initials: "RS",
    color: "#7c3aed",
    role: "React Developer",
    handle: "@rahul.dev",
    meta: "Invited 3 hrs ago",
  },
];

/** People who found the party and asked to join — the lead's approve/reject queue. */
export const JOIN_REQUESTS = [
  {
    id: "r1",
    name: "Sneha Patel",
    initials: "SP",
    color: "#2563eb",
    role: "UI Researcher",
    handle: "@snehaui",
    skills: ["Figma", "UI Design", "Wireframing"],
    message:
      '"Hi! I\'m a UI/UX designer with 3 years of experience. I\'d love to contribute to your team\'s design work."',
  },
  {
    id: "r2",
    name: "Vikram Singh",
    initials: "VK",
    color: "#f59e0b",
    role: "Mobile Developer",
    handle: "@vikram.code",
    skills: ["Flutter", "Dart", "Firebase"],
    message:
      '"Hey! Flutter dev here. I build beautiful cross-platform apps and would love to join Pixel Masters."',
  },
];

/** Newest first. `tone` drives the timeline dot colour. */
export const ACTIVITY = [
  {
    id: "a1",
    icon: "UserPlus",
    tone: "green",
    text: "Priya Verma accepted your party invitation.",
    time: "1 hr ago",
  },
  {
    id: "a2",
    icon: "UserPlus",
    tone: "blue",
    text: "Sneha Patel sent a request to join your party.",
    time: "2 hrs ago",
  },
  {
    id: "a3",
    icon: "Send",
    tone: "amber",
    text: "You invited Rahul Sharma to join Pixel Masters.",
    time: "3 hrs ago",
  },
  {
    id: "a4",
    icon: "UserPlus",
    tone: "purple",
    text: "Vikram Singh sent a request to join your party.",
    time: "5 hrs ago",
  },
  {
    id: "a5",
    icon: "CheckCircle2",
    tone: "green",
    text: "Party created successfully. Waiting for members.",
    time: "6 hrs ago",
  },
];

/**
 * Submission checklist. `done` drives the filled/hollow circle; the bar under
 * "Confirmed members" is driven by confirmedCount / memberLimit.
 */
export const CHECKLIST = [
  { key: "details", text: "Party details added", done: true },
  { key: "invite", text: "Invite 5 members", done: false, note: "2 / 5 confirmed" },
  { key: "skills", text: "Add skills & expertise", done: false },
  { key: "submit", text: "Review & submit", done: false },
];

export const QUICK_ACTIONS = [
  { key: "chat", label: "Open Party Chat", icon: "MessageSquareMore", tone: "blue" },
  { key: "quests", label: "Browse Quests", icon: "Bookmark", tone: "purple" },
  { key: "leaderboard", label: "View Leaderboard", icon: "Star", tone: "amber" },
  { key: "leave", label: "Leave Party", icon: "LogOut", tone: "red" },
  { key: "delete", label: "Delete Party", icon: "Trash", tone: "red" },
];

export const LEAD_TIPS = [
  "Accept join requests to fill slots faster.",
  "You can remove a member anytime before submission.",
  "Party needs exactly 5 members to submit.",
  "Invites expire in 7 days if not accepted.",
];