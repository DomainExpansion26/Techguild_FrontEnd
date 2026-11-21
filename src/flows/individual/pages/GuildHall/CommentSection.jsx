import { useState } from "react";
import { Cards, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { APP_STRINGS } from "@/constants/string";
import "./commentsection.css";

const G = APP_STRINGS.GUILD_HALL;
const C = G.COMMENTS;

const ME = {
  name: "Aarav Menon",
  initials: "AM",
  role: "Full-Stack Developer",
  color: "#2161ea",
  ink: "#ffffff",
};

const BASE_COUNT = 47;

const INITIAL_COMMENTS = [
  {
    id: "c1",
    author: {
      name: "Priya Sharma",
      initials: "PS",
      color: "#ede9fe",
      ink: "#6d28d9",
      role: "Senior Product Designer",
      verified: true,
    },
    time: "1h",
    mins: 60,
    likes: 21,
    text:
      "I position it openly: I use AI for volume exploration, then apply systems thinking, accessibility and edge-case coverage AI can't see. Clients pay for judgment, not pixels.",
    replies: [
      {
        id: "c1r1",
        author: {
          name: "Devang Shah",
          initials: "DS",
          color: "#fee2e2",
          ink: "#b91c1c",
          role: "Growth Marketer",
        },
        time: "45m",
        mins: 45,
        likes: 8,
        text:
          'Risk framing works. I\'ve started attaching a one-page "what AI can\'t do" doc to every quote — closes the conversation fast.',
      },
    ],
  },
  {
    id: "c2",
    author: {
      name: "Arnav Gupta",
      initials: "AG",
      color: "#e0e7ff",
      ink: "#4338ca",
      role: "Motion Designer",
    },
    time: "2h",
    mins: 120,
    likes: 14,
    text:
      "Frame it around risk, not tools. AI output looks fine until licensing gets checked or the pattern breaks on real data. That conversation wins every time.",
    replies: [],
  },
  {
    id: "c3",
    author: {
      name: "Meera Patel",
      initials: "MP",
      color: "#fef3c7",
      ink: "#b45309",
      role: "Frontend Engineer",
    },
    time: "4h",
    mins: 240,
    likes: 11,
    text:
      "Charging 10× for craft is a pricing story, not a tooling story. Anchor on outcomes — retention, accessibility scores, speed — and the prompt comparison disappears.",
    replies: [],
  },
];

const EARLIER_COMMENTS = [
  {
    id: "c0",
    author: {
      name: "Kabir Sen",
      initials: "KS",
      color: "#dcfce7",
      ink: "#15803d",
      role: "UX Researcher",
    },
    time: "6h",
    mins: 360,
    likes: 6,
    text:
      "I keep a one-line outcome summary at the top of every deliverable — it's the part clients actually read, so the tooling debate never starts.",
    replies: [],
  },
];

function Avatar({ person, variant = "sm" }) {
  return (
    <span className={`gh-avatar gh-avatar--${variant}`} style={{ backgroundColor: person.color, color: person.ink }}>
      {person.initials}
    </span>
  );
}

function VerifiedBadge() {
  return (
    <span className="cm-verified" role="img" aria-label={G.POST.VERIFIED}>
      <Icon name="Check" size={8} color="#ffffff" strokeWidth={3} />
    </span>
  );
}

function LikeButton({ comment, liked, onToggle }) {
  const count = comment.likes + (liked ? 1 : 0);
  return (
    <button
      type="button"
      className={`cm-like ${liked ? "is-liked" : ""}`}
      aria-pressed={liked}
      aria-label={`${C.LIKE} (${count})`}
      onClick={onToggle}
    >
      <Icon
        name="Heart"
        size={15}
        color={liked ? "#2161ea" : "#6b7a99"}
        fill={liked ? "#2161ea" : "none"}
        strokeWidth={1.6}
      />
      <span className="cm-like-count">{count}</span>
    </button>
  );
}

function CommentHead({ author, time }) {
  return (
    <div className="cm-comment-head">
      <span className="cm-comment-name">{author.name}</span>
      {author.verified && <VerifiedBadge />}
      <span className="cm-comment-role">
        {author.role} · {time}
      </span>
    </div>
  );
}

// Deep links for shareable states (same pattern as ?create):
// ?reply=<commentId> opens that inline reply composer,
// ?liked=<id,id> pre-likes comments/replies, ?compose=<text> opens the
// top composer with a draft.
const readInitialParams = () => {
  const params = new URLSearchParams(window.location.search);
  const likedIds = (params.get("liked") || "").split(",").filter(Boolean);
  return {
    reply: params.get("reply"),
    liked: Object.fromEntries(likedIds.map((likedId) => [likedId, true])),
    compose: params.has("compose") ? params.get("compose") || "" : null,
  };
};

export default function CommentSection({ id }) {
  const [initial] = useState(readInitialParams);
  const [sort, setSort] = useState("top");
  const [posted, setPosted] = useState([]);
  const [earlierShown, setEarlierShown] = useState(false);
  const [composing, setComposing] = useState(() => initial.compose !== null);
  const [draft, setDraft] = useState(() => initial.compose || "");
  const [replyTo, setReplyTo] = useState(initial.reply);
  const [replyDraft, setReplyDraft] = useState("");
  const [liked, setLiked] = useState(initial.liked);
  const [extraReplies, setExtraReplies] = useState({});
  const [count, setCount] = useState(BASE_COUNT);

  const withReplies = [...INITIAL_COMMENTS, ...posted].map((comment) =>
    extraReplies[comment.id]
      ? { ...comment, replies: [...comment.replies, ...extraReplies[comment.id]] }
      : comment
  );
  const list = [...withReplies, ...(earlierShown ? EARLIER_COMMENTS : [])];
  const sorted = [...list].sort((a, b) =>
    sort === "top"
      ? b.likes + (liked[b.id] ? 1 : 0) - (a.likes + (liked[a.id] ? 1 : 0))
      : a.mins - b.mins
  );

  const toggleLike = (commentId) => {
    setLiked((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const submitDraft = () => {
    const text = draft.trim();
    if (!text) return;
    setPosted((prev) => [
      { id: `me-${Date.now()}`, author: ME, time: "now", mins: 0, likes: 0, replies: [], text },
      ...prev,
    ]);
    setDraft("");
    setComposing(false);
    setCount((n) => n + 1);
    setSort("newest");
  };

  const cancelDraft = () => {
    setDraft("");
    setComposing(false);
  };

  const submitReply = (commentId) => {
    const text = replyDraft.trim();
    if (!text) return;
    setExtraReplies((prev) => ({
      ...prev,
      [commentId]: [
        ...(prev[commentId] || []),
        { id: `me-r-${Date.now()}`, author: ME, time: "now", mins: 0, likes: 0, text },
      ],
    }));
    setReplyDraft("");
    setReplyTo(null);
  };

  const cancelReply = () => {
    setReplyDraft("");
    setReplyTo(null);
  };

  const renderReply = (reply) => (
    <div className="cm-reply" key={reply.id}>
      <Avatar person={reply.author} variant="reply" />
      <div className="cm-reply-body">
        <CommentHead author={reply.author} time={reply.time} />
        <p className="cm-comment-text">{reply.text}</p>
        <div className="cm-actions cm-actions--nested">
          <LikeButton comment={reply} liked={!!liked[reply.id]} onToggle={() => toggleLike(reply.id)} />
        </div>
      </div>
    </div>
  );

  return (
    <Cards
      variant="base"
      bg="#ffffff"
      border="1px solid #eef2f9"
      radius="md"
      shadow="0px 1px 6px 0px rgba(33, 97, 234, 0.05)"
      className="cm-card"
      id={id}
    >
      <div className="cm-head">
        <div className="cm-head-left">
          <h2 className="cm-title">{C.TITLE}</h2>
          <span className="cm-count">{count}</span>
          <span className="cm-sub">{C.MOST_RECENT}</span>
        </div>
        <div className="cm-sort" role="group" aria-label={C.SORT_LABEL}>
          <button
            type="button"
            className={`cm-sort-btn ${sort === "top" ? "is-active" : ""}`}
            aria-pressed={sort === "top"}
            onClick={() => setSort("top")}
          >
            {C.TOP}
          </button>
          <button
            type="button"
            className={`cm-sort-btn ${sort === "newest" ? "is-active" : ""}`}
            aria-pressed={sort === "newest"}
            onClick={() => setSort("newest")}
          >
            {C.NEWEST}
          </button>
        </div>
      </div>

      <div className="cm-composer">
        <Avatar person={ME} />
        <div className="cm-composer-main">
          {composing ? (
            <textarea
              className="cm-field cm-field--active"
              placeholder={C.ADD_PLACEHOLDER}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              autoFocus
              rows={3}
            />
          ) : (
            <input
              className="cm-field"
              placeholder={C.ADD_PLACEHOLDER}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onFocus={() => setComposing(true)}
              aria-label={C.ADD_PLACEHOLDER}
            />
          )}
          {composing && (
            <div className="cm-composer-actions">
              <SecondaryButton text={C.CANCEL} className="cm-btn cm-btn--ghost" onClick={cancelDraft} />
              <PrimaryButton
                text={C.POST}
                className="cm-btn cm-btn--primary"
                disabled={!draft.trim()}
                onClick={submitDraft}
              />
            </div>
          )}
        </div>
      </div>

      <div className="cm-list">
        {sorted.map((comment) => (
          <div className="cm-comment" key={comment.id}>
            <Avatar person={comment.author} />
            <div className="cm-comment-body">
              <CommentHead author={comment.author} time={comment.time} />
              <p className="cm-comment-text">{comment.text}</p>
              <div className="cm-actions">
                <LikeButton comment={comment} liked={!!liked[comment.id]} onToggle={() => toggleLike(comment.id)} />
                <button
                  type="button"
                  className="cm-reply-link"
                  aria-label={`${C.REPLY} — ${comment.author.name}`}
                  onClick={() => {
                    setReplyTo(comment.id);
                    setReplyDraft("");
                  }}
                >
                  {C.REPLY}
                </button>
              </div>

              {comment.replies.length > 0 && (
                <div className="cm-replies">{comment.replies.map(renderReply)}</div>
              )}

              {replyTo === comment.id && (
                <div className="cm-replyform">
                  <Avatar person={ME} variant="reply" />
                  <textarea
                    className="cm-field cm-field--reply"
                    placeholder={C.REPLY_PLACEHOLDER}
                    value={replyDraft}
                    onChange={(event) => setReplyDraft(event.target.value)}
                    autoFocus
                    rows={2}
                  />
                  <div className="cm-replyform-actions">
                    <PrimaryButton
                      text={C.REPLY}
                      className="cm-btn cm-btn--primary cm-btn--sm"
                      disabled={!replyDraft.trim()}
                      onClick={() => submitReply(comment.id)}
                    />
                    <SecondaryButton text={C.CANCEL} className="cm-btn cm-btn--ghost cm-btn--sm" onClick={cancelReply} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {!earlierShown && (
        <div className="cm-footer">
          <SecondaryButton
            text={`${C.SHOW_EARLIER} (${EARLIER_COMMENTS.length})`}
            className="cm-btn cm-btn--outline"
            onClick={() => setEarlierShown(true)}
          />
        </div>
      )}
    </Cards>
  );
}
