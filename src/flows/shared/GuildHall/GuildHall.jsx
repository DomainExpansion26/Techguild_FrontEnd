import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DashboardLayout, Cards, PrimaryButton, SecondaryButton, TextInput } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { APP_STRINGS } from "@/constants/string";
import { showSnackbar } from "@/store";
import { useAuth } from "@/context/AuthContext";
import "./guildhall.css";
import "./commentsection.css";
import CreatePostModal from "./CreatePostModal";
import HallsModal from "./HallsModal";
import CommentSection from "./CommentSection";

const G = APP_STRINGS.GUILD_HALL;

const CHIP_FORMAT = {
  "photo-media": "photo",
  "ask-a-question": "question",
  "share-a-project": "project",
  "create-a-poll": "poll",
  "share-a-resource": null,
};

const DEFAULT_COMMENTS_POST = "first-freelance-project";

// Deep links (search params, so they work on every role's path — /guild-hall,
// /individual/guild-hall, /client-guild-hall, /client/guild-hall):
// ?create opens the format picker, ?create=<formatId> opens step 2 for that format,
// ?comments=<postId> opens that post's comment section,
// ?halls=1 opens the halls list popup, ?halls=detail opens the hall detail view.
const readUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  const hasCreate = params.has("create");
  const createValue = params.get("create");
  const commentsValue = params.get("comments");
  const knownIds = POSTS.some((post) => post.id === commentsValue);
  const hallsValue = params.get("halls");
  return {
    createOpen: hasCreate,
    presetFormat: hasCreate && createValue && createValue !== "1" ? createValue : null,
    comments: commentsValue ? (knownIds ? commentsValue : null) : DEFAULT_COMMENTS_POST,
    hallsOpen: hallsValue !== null && hallsValue !== "0",
    hallsView: hallsValue === "detail" ? "detail" : "list",
    hallsHallId: params.get("hall") || "ui-ux-designers",
  };
};

// Poll deep links (read once when the poll mounts):
// ?select=<index> pre-selects an option (Cast your vote becomes enabled),
// ?vote=<index> casts that option's vote immediately,
// ?results=1 opens the results preview before voting.
const readPollParams = (optionCount) => {
  const params = new URLSearchParams(window.location.search);
  const parseIndex = (value) => {
    const index = Number.parseInt(value, 10);
    return Number.isInteger(index) && index >= 0 && index < optionCount ? index : null;
  };
  return {
    select: parseIndex(params.get("select")),
    vote: parseIndex(params.get("vote")),
    peek: params.get("results") === "1",
  };
};

const AVATAR = {
  PURPLE: "#8b5cf6",
  GREEN: "#10b981",
  ORANGE: "#f97316",
  CYAN: "#06b6d4",
  RED: "#ef4444",
  BLUE: "#103ca4",
  MINT: "#ccfbf1",
};

const STACK_4 = [AVATAR.PURPLE, AVATAR.GREEN, AVATAR.ORANGE, AVATAR.CYAN];
const STACK_3 = [AVATAR.PURPLE, AVATAR.GREEN, AVATAR.ORANGE];

const ACTIVE_MEMBERS_TEXT = "248 members active now";

const POSTS = [
  {
    id: "poll-skills-2026",
    type: "poll",
    author: {
      name: "Sana Khan",
      initials: "SK",
      color: AVATAR.MINT,
      role: "Product Designer · 8h ago",
      verified: false,
    },
    title: "Which skill is most important for a product designer in 2026?",
    poll: {
      options: [
        { label: "Systems thinking", votes: 815 },
        { label: "AI-assisted workflows", votes: 580 },
        { label: "Data literacy", votes: 451 },
        { label: "Business storytelling", votes: 302 },
      ],
      daysLeft: "3 days left",
    },
    stats: { likes: 156, comments: 38 },
  },
  {
    id: "first-freelance-project",
    type: "discussion",
    author: {
      name: "Priya Sharma",
      initials: "PS",
      color: AVATAR.PURPLE,
      role: "Senior Product Designer • 1d ago",
      verified: true,
    },
    title: "What's one thing you wish you knew before taking your first freelance project?",
    body:
      'Mine: a 3-week "small build" quietly became a 4-month engagement with zero scope boundaries. Freelancing isn\'t a smaller version of a job - it\'s a completely different game. Contracts,...',
    truncated: true,
    tags: ["#Freelancing", "#CareerAdvice", "#Contracts", "#ClientManagement"],
    reply: {
      author: { name: "Rohan Verma", initials: "RV", color: AVATAR.ORANGE, verified: true },
      quote:
        '"Contracts aren\'t paperwork - they\'re the cheapest insurance you\'ll ever buy. Scope, revisions and late fees: get all three in writing before you open your IDE."',
      link: "View all 64 replies",
    },
    stats: { likes: 186, comments: 36 },
  },
  {
    id: "discovery-calls",
    type: "discussion",
    author: {
      name: "Meera Patel",
      initials: "MP",
      color: AVATAR.ORANGE,
      role: "Frontend Engineer • 1d ago",
      verified: true,
    },
    title: "Discovery calls are harder than the actual build.",
    body:
      '"How much for a quick website?" - five words that ruin my week every time. I\'ve started charging for discovery sprints and suddenly clients respect the process (and my calendar). Sharing the exa...',
    truncated: true,
    tags: ["#Freelancing", "#Pricing", "#Clients", "#DiscoveryCalls"],
    stats: { likes: 77, comments: 41 },
  },
  {
    id: "portfolio-review-night",
    type: "event",
    author: {
      name: "TechGuild Events",
      initials: "TE",
      color: AVATAR.BLUE,
      role: "Official guild account • 5h ago",
      verified: true,
    },
    title: "Portfolio Review Night - August Edition",
    event: {
      month: "AUG",
      day: "22",
      time: "Fri • 7:00 PM IST",
      place: "Online • Guild Stage",
      going: "87 going",
      stack: STACK_4,
    },
    stats: { likes: 45, comments: 12 },
  },
];

const PEOPLE = [
  {
    id: "meera-patel",
    name: "Meera Patel",
    initials: "MP",
    color: AVATAR.ORANGE,
    role: "Frontend Engineer",
    skills: ["React", "Next.js"],
  },
  {
    id: "arnav-gupta",
    name: "Arnav Gupta",
    initials: "AG",
    color: AVATAR.PURPLE,
    role: "Motion Designer",
    skills: ["After Effects", "Lottie"],
  },
  {
    id: "sana-khan",
    name: "Sana Khan",
    initials: "SK",
    color: AVATAR.GREEN,
    role: "Product Designer",
    skills: ["Figma", "Design Systems"],
  },
  {
    id: "devang-shah",
    name: "Devang Shah",
    initials: "DS",
    color: AVATAR.RED,
    role: "Growth Marketer",
    skills: ["SEO", "Analytics"],
  },
];

const TRENDING = [
  { rank: "01", title: "AI & Design", count: "342 posts this week", delta: "↑ 18%" },
  { rank: "02", title: "Freelancing", count: "289 posts this week", delta: "↑ 12%" },
  { rank: "03", title: "Product Design", count: "256 posts this week", delta: "↑ 9%" },
  { rank: "04", title: "Web Development", count: "231 posts this week", delta: "↑ 7%" },
  { rank: "05", title: "Fintech", count: "154 posts this week", delta: "↑ 22%" },
];

const UPCOMING_EVENTS = [
  {
    id: "design-systems-ama",
    month: "AUG",
    day: "14",
    title: "Design Systems AMA",
    meta: "with Aditi Rao, Design Lead • Online",
    going: "128 going",
    stack: STACK_3,
  },
  {
    id: "pricing-your-work",
    month: "AUG",
    day: "19",
    title: "Pricing Your Work",
    meta: "Freelancer workshop • Pune Hub",
    going: "64 going",
    stack: STACK_3,
  },
  {
    id: "founders-builders-mixer",
    month: "AUG",
    day: "28",
    title: "Founders • Builders Mixer",
    meta: "Online • 7:30 PM IST",
    going: "212 going",
    stack: STACK_3,
  },
];

const FEATURED_RESOURCES = [
  {
    id: "client-proposal-template",
    title: "Client Proposal Template",
    meta: "Docs • 12.4K downloads",
    icon: "FileText",
  },
  {
    id: "freelance-contract",
    title: "Freelance Contract (Editable)",
    meta: "Docs • 9.1K downloads",
    icon: "FileText",
  },
  {
    id: "rate-calculator",
    title: "Rate Calculator",
    meta: "Tool • 7.8K uses",
    icon: "ClipboardList",
    variant: "amber",
  },
];

const COMMUNITIES = [
  { id: "ui-ux-designers", name: "UI/UX Designers", meta: "12.4K members • 86 online", stack: STACK_3 },
  { id: "developers", name: "Developers", meta: "18.9K members • 240 online", stack: STACK_3 },
  { id: "founders", name: "Founders", meta: "6.2K members • 31 online", stack: STACK_3 },
  { id: "product-growth", name: "Product & Growth", meta: "9.8K members • 54 online", stack: STACK_3 },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    meta: "7.5K members • 47 online",
    stack: [AVATAR.RED, AVATAR.GREEN, AVATAR.ORANGE],
  },
];

const CARD_TOKENS = {
  bg: "rgba(255, 255, 255, 0.6)",
  border: "1px solid #e2e8f3",
  radius: "md",
  shadow: "0px 1px 6px 0px rgba(33, 97, 234, 0.05)",
};

// Poll post card: solid white, 1.5px hairline, 16px radius, dual blue-tinted shadow.
const POLL_CARD_TOKENS = {
  bg: "#ffffff",
  border: "1.5px solid #dde5f4",
  radius: 16,
  shadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.05), 0px 2px 16px 0px rgba(33, 97, 234, 0.07)",
};

function GhCard({ className = "", children, ...props }) {
  return (
    <Cards variant="base" {...CARD_TOKENS} className={`gh-card ${className}`.trim()} {...props}>
      {children}
    </Cards>
  );
}

function AvatarStack({ colors = STACK_4 }) {
  return (
    <span className="gh-stack" aria-hidden="true">
      {colors.map((color, index) => (
        <span key={`${color}-${index}`} className="gh-stack-item" style={{ backgroundColor: color }} />
      ))}
    </span>
  );
}

function VerifiedBadge() {
  return (
    <span className="gh-verified" role="img" aria-label={G.POST.VERIFIED}>
      <Icon name="Check" size={8} color="#ffffff" strokeWidth={3} />
    </span>
  );
}

function PollBlock({ poll }) {
  const optionCount = poll.options.length;
  const initial = React.useMemo(() => readPollParams(optionCount), [optionCount]);
  const [votes, setVotes] = useState(() =>
    poll.options.map((option, index) => option.votes + (initial.vote === index ? 1 : 0)),
  );
  const [mode, setMode] = useState(() => {
    if (initial.vote !== null) return "voted";
    if (initial.select !== null) return "selected";
    if (initial.peek) return "peek";
    return "idle";
  });
  const [choice, setChoice] = useState(() => initial.select);
  const [votedFor, setVotedFor] = useState(() => initial.vote);

  const total = votes.reduce((sum, count) => sum + count, 0);
  const isResults = mode === "voted" || mode === "peek";
  const formatCount = (count) => count.toLocaleString("en-US");

  const applyVote = (index) => {
    setVotes((current) =>
      current.map((count, i) => {
        if (i === index) return count + 1;
        if (votedFor !== null && i === votedFor) return count - 1;
        return count;
      }),
    );
    setVotedFor(index);
    setMode("voted");
  };

  const selectOption = (index) => {
    if (mode === "voted") {
      if (index !== votedFor) applyVote(index);
      return;
    }
    if (mode === "peek") {
      applyVote(index);
      return;
    }
    setChoice(index);
    setMode("selected");
  };

  const castVote = () => {
    if (choice === null) return;
    applyVote(choice);
  };

  const undoVote = () => {
    if (votedFor === null) return;
    setVotes((current) => current.map((count, i) => (i === votedFor ? count - 1 : count)));
    setVotedFor(null);
    setChoice(null);
    setMode("idle");
  };

  const seeResults = () => setMode("peek");

  if (isResults) {
    return (
      <div className="gh-poll" data-poll-state={mode}>
        <div className="gh-poll-list gh-poll-list--results" role="group" aria-label={poll.title}>
          {poll.options.map((option, index) => {
            const pct = total ? Math.round((votes[index] / total) * 100) : 0;
            const mine = mode === "voted" && votedFor === index;
            return (
              <button
                type="button"
                key={option.label}
                className={`gh-poll-result${mine ? " is-mine" : ""}`}
                onClick={() => selectOption(index)}
              >
                <span className="gh-poll-result-top">
                  <span className="gh-poll-result-left">
                    <span className="gh-poll-result-label">{option.label}</span>
                    {mine && <span className="gh-poll-badge">{G.POLL.YOUR_VOTE}</span>}
                    <span className="gh-poll-result-votes">
                      {formatCount(votes[index])} {G.POLL.VOTES_LABEL}
                    </span>
                  </span>
                  <span className="gh-poll-result-pct">{pct}%</span>
                </span>
                <span className="gh-poll-bar" aria-hidden="true">
                  <span className="gh-poll-bar-fill" style={{ width: `${pct}%` }} />
                </span>
              </button>
            );
          })}
        </div>
        <div className="gh-poll-meta-block">
          <div className="gh-poll-meta">
            <strong className="gh-poll-meta-strong">
              {formatCount(total)} {G.POLL.VOTED_LABEL}
            </strong>
            <span className="gh-poll-sep">{G.POLL.SEP}</span>
            <span className="gh-poll-meta-item">{poll.daysLeft}</span>
            {mode === "voted" && (
              <>
                <span className="gh-poll-sep gh-poll-sep--wide">{G.POLL.SEP}</span>
                <span className="gh-poll-youvoted">
                  <Icon name="Check" size={12} color="#16a34a" strokeWidth={1.8} />
                  {G.POLL.YOU_VOTED}
                </span>
                <span className="gh-poll-hint">{G.POLL.TAP_TO_CHANGE}</span>
              </>
            )}
          </div>
          {mode === "voted" && (
            <button type="button" className="gh-poll-link gh-poll-link--undo" onClick={undoVote}>
              {G.POLL.UNDO_VOTE}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="gh-poll" data-poll-state={mode}>
      <div className="gh-poll-list" role="radiogroup" aria-label={poll.title}>
        {poll.options.map((option, index) => (
          <button
            type="button"
            key={option.label}
            role="radio"
            aria-checked={choice === index}
            className={`gh-poll-option${choice === index ? " is-selected" : ""}`}
            onClick={() => selectOption(index)}
          >
            <span className="gh-poll-radio" aria-hidden="true" />
            <span className="gh-poll-opt-label">{option.label}</span>
          </button>
        ))}
      </div>
      <div className="gh-poll-actions">
        <button type="button" className="gh-poll-cast" disabled={choice === null} onClick={castVote}>
          {G.POLL.CAST_VOTE}
        </button>
        <div className="gh-poll-meta">
          <strong className="gh-poll-meta-strong">
            {formatCount(total)} {G.POLL.VOTED_LABEL}
          </strong>
          <span className="gh-poll-sep">{G.POLL.SEP}</span>
          <span className="gh-poll-meta-item">{poll.daysLeft}</span>
          <span className="gh-poll-sep">{G.POLL.SEP}</span>
          <span className="gh-poll-meta-item">{G.POLL.RESULTS_HIDDEN}</span>
        </div>
        <button type="button" className="gh-poll-link" onClick={seeResults}>
          {G.POLL.SEE_RESULTS}
        </button>
      </div>
    </div>
  );
}

function ReplyBlock({ reply }) {
  return (
    <div className="gh-reply-wrap">
      <div className="gh-reply">
        <div className="gh-reply-head">
          <span className="gh-avatar gh-avatar--reply" style={{ backgroundColor: reply.author.color }}>
            {reply.author.initials}
          </span>
          <span className="gh-reply-name">{reply.author.name}</span>
          {reply.author.verified && <VerifiedBadge />}
          <span className="gh-pill gh-pill--top">{G.POST.TOP_REPLY}</span>
        </div>
        <p className="gh-reply-quote">{reply.quote}</p>
        <button type="button" className="gh-reply-link">
          {reply.link} <span aria-hidden="true">&gt;</span>
        </button>
      </div>
    </div>
  );
}

function EventBlock({ event }) {
  return (
    <div className="gh-event-row">
      <div className="gh-event-date">
        <span className="gh-event-month">{event.month}</span>
        <span className="gh-event-day">{event.day}</span>
      </div>
      <div className="gh-event-meta">
        <span className="gh-event-meta-line">
          <Icon name="Calendar" size={13} color="#71809f" strokeWidth={1.6} />
          {event.time}
        </span>
        <span className="gh-event-meta-line">
          <Icon name="MapPin" size={12} color="#71809f" strokeWidth={1.6} />
          {event.place}
        </span>
        <span className="gh-event-going">
          <AvatarStack colors={event.stack} />
          <span className="gh-event-going-text">{event.going}</span>
        </span>
      </div>
      <PrimaryButton text={G.POST.RSVP} className="gh-btn-rsvp" />
    </div>
  );
}

function PostFooter({ stats, postId, commentsOpen, onToggleComments, onOpenComments }) {
  const commentsId = `comments-${postId}`;
  return (
    <div className="gh-post-footer">
      <div className="gh-actions">
        <button type="button" className="gh-action" aria-label={`${G.POST.LIKE} (${stats.likes})`}>
          <Icon name="Heart" size={15} color="#71809f" strokeWidth={1.6} />
          <span>{stats.likes}</span>
        </button>
        <button
          type="button"
          className={`gh-action gh-action--comment ${commentsOpen ? "is-active" : ""}`}
          aria-label={`${G.POST.COMMENT} (${stats.comments})`}
          aria-expanded={commentsOpen}
          aria-controls={commentsId}
          onClick={() => onToggleComments(postId)}
        >
          <Icon name="MessageSquare" size={15} color={commentsOpen ? "#103ca4" : "#71809f"} strokeWidth={1.6} />
          <span>{stats.comments}</span>
        </button>
        <button type="button" className="gh-action" aria-label={G.POST.SHARE}>
          <Icon name="Share2" size={15} color="#71809f" strokeWidth={1.6} />
          <span>{G.POST.SHARE}</span>
        </button>
        <button type="button" className="gh-action gh-action--save" aria-label={G.POST.SAVE}>
          <Icon name="Bookmark" size={15} color="#71809f" strokeWidth={1.6} />
          <span>{G.POST.SAVE}</span>
        </button>
      </div>
      <SecondaryButton
        text={G.POST.JOIN_CONVERSATION}
        icon={<Icon name="ArrowRight" size={13} color="#103ca4" strokeWidth={1.8} />}
        iconPosition="right"
        className="gh-btn-join-conv"
        onClick={() => onOpenComments(postId)}
      />
    </div>
  );
}

function PostCard({ post, commentsOpen, onToggleComments, onOpenComments }) {
  const isPoll = post.type === "poll";
  const typeLabel = isPoll
    ? G.POST.TYPE_POLL
    : post.type === "event"
      ? G.POST.TYPE_EVENT
      : G.POST.TYPE_DISCUSSION;

  return (
    <GhCard
      id={isPoll ? post.id : undefined}
      className={`gh-post${isPoll ? " gh-post--poll" : ""}`}
      {...(isPoll ? POLL_CARD_TOKENS : {})}
    >
      <div className="gh-post-head">
        <div className="gh-post-author">
          <span className="gh-avatar" style={{ backgroundColor: post.author.color }}>
            {post.author.initials}
          </span>
          <div className="gh-post-author-text">
            <span className="gh-post-name-row">
              <span className="gh-post-name">{post.author.name}</span>
              {post.author.verified && <VerifiedBadge />}
            </span>
            <span className="gh-post-role">{post.author.role}</span>
          </div>
        </div>
        <div className="gh-post-head-right">
          <span className={`gh-pill ${post.type === "event" ? "gh-pill--event" : isPoll ? "gh-pill--poll" : ""}`}>
            {isPoll && <Icon name="BarChart3" size={14} color="#d97706" strokeWidth={1.7} />}
            {typeLabel}
          </span>
          <button type="button" className="gh-dots" aria-label={G.POST.MORE_OPTIONS}>
            <Icon name="MoreHorizontal" size={16} color="#71809f" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <h3 className="gh-post-title">{post.title}</h3>

      {post.body && (
        <p className="gh-post-body">
          {post.body}{" "}
          {post.truncated && (
            <button type="button" className="gh-see-more">
              {G.POST.SEE_MORE}
            </button>
          )}
        </p>
      )}

      {post.tags && (
        <div className="gh-tags">
          {post.tags.map((tag) => (
            <span className="gh-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {post.media && (
        <span className="gh-post-media">
          <Icon name="Image" size={13} color="#103ca4" strokeWidth={1.7} />
          {post.media}
        </span>
      )}

      {post.poll && <PollBlock poll={post.poll} />}
      {post.reply && <ReplyBlock reply={post.reply} />}
      {post.event && <EventBlock event={post.event} />}

      <PostFooter
        stats={post.stats}
        postId={post.id}
        commentsOpen={commentsOpen}
        onToggleComments={onToggleComments}
        onOpenComments={onOpenComments}
      />
    </GhCard>
  );
}

export default function GuildHall() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(G.TABS[0]);
  const [composerText, setComposerText] = useState("");
  const [feedPosts, setFeedPosts] = useState(POSTS);
  const [createOpen, setCreateOpen] = useState(() => readUrlParams().createOpen);
  const [presetFormat, setPresetFormat] = useState(() => readUrlParams().presetFormat);
  const [openComments, setOpenComments] = useState(() => readUrlParams().comments);
  const [hallsOpen, setHallsOpen] = useState(() => readUrlParams().hallsOpen);
  const [hallsView, setHallsView] = useState(() => readUrlParams().hallsView);
  const [hallsHallId, setHallsHallId] = useState(() => readUrlParams().hallsHallId);

  const openCreate = (formatId = null) => {
    setPresetFormat(formatId);
    setCreateOpen(true);
  };

  // Local optimistic publish: prepend to the in-memory feed (session-only,
  // swap for a posts API call + refetch when an endpoint exists).
  const handlePublish = (draft) => {
    const name = user?.name || "Aarav Sharma";
    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");
    setFeedPosts((current) => [
      {
        id: `post-${Date.now()}`,
        author: {
          name,
          initials: initials || "AM",
          color: AVATAR.MINT,
          role: "Member • just now",
          verified: false,
        },
        stats: { likes: 0, comments: 0 },
        ...draft,
      },
      ...current,
    ]);
    dispatch(showSnackbar({ message: "Post published to your feed.", type: "success" }));
  };

  const toggleComments = (postId) => {
    setOpenComments((current) => (current === postId ? null : postId));
  };

  // Deep-link anchors: <any-route>#<post-id> scrolls to that post's section
  // after the SPA mounts (the browser can't hash-scroll an element that
  // doesn't exist at initial load).
  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    if (!anchor) return;
    document.getElementById(anchor)?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <DashboardLayout searchPlaceholder={G.SEARCH_PLACEHOLDER}>
      <div className="gh-page">
        <header className="gh-top">
          <div className="gh-top-text">
            <h1 className="gh-title">{G.TITLE}</h1>
            <p className="gh-subtitle">{G.SUBTITLE}</p>
          </div>
          <PrimaryButton
            text={G.CREATE_POST}
            icon={<Icon name="Plus" size={16} color="#ffffff" strokeWidth={2.2} />}
            iconPosition="left"
            className="gh-btn-create"
            onClick={() => openCreate()}
          />
        </header>

        <GhCard className="gh-composer">
          <div className="gh-composer-row">
            <span className="gh-avatar gh-avatar--me">AM</span>
            <TextInput
              name="guild-hall-composer"
              placeholder={G.COMPOSER.PLACEHOLDER}
              value={composerText}
              onChange={(event) => setComposerText(event.target.value)}
              containerClassName="gh-composer-input"
            />
          </div>
          <div className="gh-composer-chips">
            {G.COMPOSER.ACTIONS.map((action) => (
              <button
                type="button"
                className="gh-chip"
                key={action.id}
                onClick={() => openCreate(CHIP_FORMAT[action.id])}
              >
                <span className="gh-chip-dot" style={{ backgroundColor: action.color }} />
                {action.label}
              </button>
            ))}
            <span className="gh-spacer" />
            <SecondaryButton text={G.COMPOSER.POST} className="gh-btn-post" />
          </div>
        </GhCard>

        <GhCard className="gh-tabs-card">
          <div className="gh-tabs">
            {G.TABS.map((tab) => (
              <button
                type="button"
                key={tab}
                className={`gh-tab ${activeTab === tab ? "is-active" : ""}`}
                aria-pressed={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </GhCard>

        <div className="gh-main">
          <div className="gh-feed">
            {feedPosts.map((post) => (
              <React.Fragment key={post.id}>
                <PostCard
                  post={post}
                  commentsOpen={openComments === post.id}
                  onToggleComments={toggleComments}
                  onOpenComments={setOpenComments}
                />
                {openComments === post.id && <CommentSection id={`comments-${post.id}`} />}
              </React.Fragment>
            ))}
          </div>

          <aside className="gh-rail">
            <GhCard className="gh-active-card">
              <div className="gh-active-row">
                <div className="gh-active-left">
                  <span className="gh-active-dot" aria-hidden="true" />
                  <AvatarStack colors={STACK_4} />
                  <span className="gh-active-text">{ACTIVE_MEMBERS_TEXT}</span>
                </div>
                <Icon name="ChevronRight" size={13} color="#71809f" strokeWidth={1.8} />
              </div>
            </GhCard>

            <GhCard className="gh-rail-card">
              <div className="gh-rail-head">
                <h2 className="gh-rail-title">{G.RAIL.PEOPLE_HEADING}</h2>
                <button type="button" className="gh-link-btn">
                  {G.RAIL.VIEW_ALL}
                  <Icon name="ChevronRight" size={13} color="#103ca4" strokeWidth={1.8} />
                </button>
              </div>
              {PEOPLE.map((person, index) => (
                <div className={`gh-person ${index === PEOPLE.length - 1 ? "is-last" : ""}`} key={person.id}>
                  <span className="gh-avatar gh-avatar--sm" style={{ backgroundColor: person.color }}>
                    {person.initials}
                  </span>
                  <div className="gh-person-text">
                    <span className="gh-person-name">{person.name}</span>
                    <span className="gh-person-role">{person.role}</span>
                    <span className="gh-person-skills">
                      {person.skills.map((skill) => (
                        <span className="gh-skill" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </span>
                  </div>
                  <PrimaryButton text={G.RAIL.CONNECT} className="gh-btn-connect" />
                </div>
              ))}
            </GhCard>

            <GhCard className="gh-rail-card">
              <div className="gh-rail-head">
                <h2 className="gh-rail-title">{G.RAIL.TRENDING_HEADING}</h2>
                <button type="button" className="gh-link-btn">
                  {G.RAIL.VIEW_ALL}
                  <Icon name="ChevronRight" size={13} color="#103ca4" strokeWidth={1.8} />
                </button>
              </div>
              {TRENDING.map((topic, index) => (
                <div
                  className={`gh-trend ${index === TRENDING.length - 1 ? "is-last" : ""}`}
                  key={topic.rank}
                >
                  <span className="gh-trend-rank">{topic.rank}</span>
                  <div className="gh-trend-text">
                    <span className="gh-trend-title">{topic.title}</span>
                    <span className="gh-trend-meta">{topic.count}</span>
                  </div>
                  <span className="gh-trend-delta">{topic.delta}</span>
                </div>
              ))}
            </GhCard>

            <GhCard className="gh-rail-card">
              <div className="gh-rail-head">
                <h2 className="gh-rail-title">{G.RAIL.EVENTS_HEADING}</h2>
                <button type="button" className="gh-link-btn">
                  {G.RAIL.VIEW_ALL}
                  <Icon name="ChevronRight" size={13} color="#103ca4" strokeWidth={1.8} />
                </button>
              </div>
              {UPCOMING_EVENTS.map((event, index) => (
                <div
                  className={`gh-upcoming ${index === UPCOMING_EVENTS.length - 1 ? "is-last" : ""}`}
                  key={event.id}
                >
                  <div className="gh-upcoming-date">
                    <span className="gh-upcoming-month">{event.month}</span>
                    <span className="gh-upcoming-day">{event.day}</span>
                  </div>
                  <div className="gh-upcoming-text">
                    <span className="gh-upcoming-title">{event.title}</span>
                    <span className="gh-upcoming-meta">{event.meta}</span>
                    <span className="gh-upcoming-going">
                      <AvatarStack colors={event.stack} />
                      <span className="gh-upcoming-going-text">{event.going}</span>
                    </span>
                  </div>
                  <SecondaryButton text={G.RAIL.RSVP} className="gh-btn-rsvp-outline" />
                </div>
              ))}
            </GhCard>

            <GhCard className="gh-rail-card">
              <div className="gh-rail-head">
                <h2 className="gh-rail-title">{G.RAIL.RESOURCES_HEADING}</h2>
                <button type="button" className="gh-link-btn">
                  {G.RAIL.VIEW_ALL}
                  <Icon name="ChevronRight" size={13} color="#103ca4" strokeWidth={1.8} />
                </button>
              </div>
              {FEATURED_RESOURCES.map((resource, index) => (
                <div
                  className={`gh-resource ${index === FEATURED_RESOURCES.length - 1 ? "is-last" : ""}`}
                  key={resource.id}
                >
                  <span
                    className={`gh-resource-icon ${resource.variant === "amber" ? "is-amber" : ""}`}
                    aria-hidden="true"
                  >
                    <Icon
                      name={resource.icon}
                      size={16}
                      color={resource.variant === "amber" ? "#f97316" : "#103ca4"}
                      strokeWidth={1.6}
                    />
                  </span>
                  <div className="gh-resource-text">
                    <span className="gh-resource-title">{resource.title}</span>
                    <span className="gh-resource-meta">{resource.meta}</span>
                  </div>
                  <Icon name="ChevronRight" size={13} color="#71809f" strokeWidth={1.8} />
                </div>
              ))}
            </GhCard>
          </aside>
        </div>

        <section className="gh-communities-section">
          <div className="gh-section-head">
            <div className="gh-section-head-text">
              <h2 className="gh-section-title">{G.COMMUNITIES.HEADING}</h2>
              <p className="gh-section-subtitle">{G.COMMUNITIES.SUBTITLE}</p>
            </div>
            <button
              type="button"
              className="gh-link-btn"
              onClick={() => {
                setHallsView("list");
                setHallsOpen(true);
              }}
            >
              {G.COMMUNITIES.BROWSE_ALL}
              <Icon name="ChevronRight" size={13} color="#103ca4" strokeWidth={1.8} />
            </button>
          </div>
          <div className="gh-communities">
            {COMMUNITIES.map((community) => (
              <GhCard className="gh-community" key={community.id}>
                <span className="gh-community-icon" aria-hidden="true">
                  <Icon name="Users" size={18} color="#103ca4" strokeWidth={1.6} />
                </span>
                <span className="gh-community-name">{community.name}</span>
                <span className="gh-community-meta">{community.meta}</span>
                <AvatarStack colors={community.stack} />
                <SecondaryButton text={G.COMMUNITIES.JOIN} className="gh-btn-join" />
              </GhCard>
            ))}
          </div>
        </section>

        <GhCard className="gh-cta" bg="#103ca4" border={false} shadow="none">
          <span className="gh-cta-icon" aria-hidden="true">
            <Icon name="Users" size={18} color="#ffffff" strokeWidth={1.6} />
          </span>
          <div className="gh-cta-text">
            <span className="gh-cta-title">{G.CTA.TITLE}</span>
            <span className="gh-cta-subtitle">{G.CTA.SUBTITLE}</span>
          </div>
          <SecondaryButton
            text={G.CTA.BUTTON}
            icon={<Icon name="ArrowRight" size={13} color="#103ca4" strokeWidth={1.8} />}
            iconPosition="right"
            className="gh-btn-cta"
            onClick={() => openCreate()}
          />
        </GhCard>
      </div>

      <CreatePostModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onPublish={handlePublish}
        initialFormat={presetFormat}
      />

      <HallsModal
        open={hallsOpen}
        view={hallsView}
        hallId={hallsHallId}
        onClose={() => setHallsOpen(false)}
        onBack={() => setHallsView("list")}
        onExplore={(hallId) => {
          setHallsHallId(hallId);
          setHallsView("detail");
        }}
      />
    </DashboardLayout>
  );
}
