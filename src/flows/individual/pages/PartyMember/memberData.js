// [TechGuild Update: 23-10-2026] Party Management — member-state sample data
// (Figma "Party management Joined screen", node 230:1663). Placeholder until
// teamsApi exposes membership; accept/decline-adjacent actions and quick
// actions stay local.

export const PARTY = {
  id: "pixel-masters",
  name: "Pixel Masters",
  initials: "PM",
  logoColor: "#2563eb",
  rank: "E",
  tag: "@pixelmasters",
  category: "Development",
  location: "Pune, India",
  visibility: "Public",
  chat: "In-app Chat",
  availability: "Open to Quests",
  guildId: "TG-IND-2026-001245",
};

/** The signed-in user's membership view (roster id m2 below). */
export const ME = {
  memberId: "m2",
  role: "UI Designer",
  joinedAt: "2 hours ago",
  trustPoints: "120 pts",
  rating: "4.8 ★",
};

/** Hero stat tiles, in frame order. */
export const STATS = [
  { key: "members", value: "5" },
  { key: "quests", value: "2" },
  { key: "rating", value: "4.8★" },
  { key: "success", value: "92%" },
];

export const QUESTS = [
  {
    id: "q1",
    title: "SaaS Dashboard Redesign",
    client: "StartupXYZ",
    budget: "₹45,000",
    skills: ["UI Design", "React", "Figma"],
    role: "Lead Designer",
    statusKey: "progress",
    due: "Aug 15, 2026",
    progress: 65,
  },
  {
    id: "q2",
    title: "E-Commerce Platform MVP",
    client: "RetailCo",
    budget: "₹80,000",
    skills: ["Full Stack", "Next.js", "MongoDB"],
    role: "UI Designer",
    statusKey: "started",
    due: "Sep 1, 2026",
    progress: 20,
  },
];

export const MEMBERS = [
  {
    id: "m1",
    name: "Arjun Mehta",
    initials: "AM",
    color: "#2563eb",
    role: "Full Stack Dev",
    handle: "@arjun.mehta",
    isLead: true,
    online: true,
  },
  {
    id: "m2",
    name: "Priya Verma",
    initials: "PV",
    color: "#db2777",
    role: "UI Designer",
    handle: "@priyadesign",
    isYou: true,
    online: true,
  },
  {
    id: "m3",
    name: "Rahul Sharma",
    initials: "RS",
    color: "#ec4899",
    role: "React Developer",
    handle: "@rahul.dev",
    online: false,
  },
  {
    id: "m4",
    name: "Sneha Patel",
    initials: "SP",
    color: "#0ea5e9",
    role: "UX Researcher",
    handle: "@snehaui",
    online: true,
  },
  {
    id: "m5",
    name: "Arjun Nair",
    initials: "AN",
    color: "#16a34a",
    role: "Backend Dev",
    handle: "@arjun.backend",
    online: false,
  },
];

export const ACTIVITY = [
  { key: "joined", text: "You joined Pixel Masters as UI Designer", time: "2 hours ago" },
  { key: "progress", text: "SaaS Dashboard Redesign quest progress updated to 65%", time: "5 hours ago" },
  { key: "chat", text: "Arjun Mehta posted a message in Party Chat", time: "Yesterday" },
  { key: "quest", text: "New quest assigned: E-Commerce Platform MVP", time: "Yesterday" },
  { key: "review", text: "Party received a 5★ review from StartupXYZ", time: "2 days ago" },
];

/** All four are read as satisfied (green checks) in the frame. */
export const RANK_GOALS = [
  { text: "Complete 5 Quests", value: "0 / 5" },
  { text: "Earn 200 Trust Points", value: "200 / 200" },
  { text: "Maintain 4.5+ Rating", value: "4.8 ★" },
  { text: "Join a Party", value: "" },
];
