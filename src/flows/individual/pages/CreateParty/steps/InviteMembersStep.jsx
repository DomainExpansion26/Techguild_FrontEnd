// [TechGuild Update: 13-10-2026] Create Party wizard — Step 2 "Invite Members" (Figma "Party 2", node 193:3335)
import React, { useMemo, useState } from "react";
import { Cards, TextInput, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { MemberAvatar } from "@/flows/shared/party/PartyUi";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import { showSnackbar } from "@/store";
import { useDispatch } from "react-redux";
import "./invitemembers.css";

const { MEMBERS, LIMITS } = APP_STRINGS.CREATE_PARTY;

const AVATAR_COLORS = ["#e7000b", "#0ea5e9", "#00a63e", "#db2777", "#f54900"];

/** Mock directory — the search/filter UI is real, the data is local until the API lands. */
const DIRECTORY = [
  { id: "u1", name: "Rahul Sharma", handle: "@rahul.dev", role: "Full Stack Developer", skills: ["React"] },
  { id: "u2", name: "Sneha Patel", handle: "@snehaui", role: "UI/UX Designer", skills: ["Figma"] },
  { id: "u3", name: "Arjun Nair", handle: "@arjun.backend", role: "Backend Developer", skills: ["Node.js"] },
  { id: "u4", name: "Meera Iyer", handle: "@meeradesigns", role: "Graphic Designer", skills: ["Branding"] },
  { id: "u5", name: "Vikram Singh", handle: "@vikram.code", role: "Mobile Developer", skills: ["Flutter"] },
  { id: "u6", name: "Kavya Rao", handle: "@kavya.data", role: "Data Scientist", skills: ["Python", "ML"] },
  { id: "u7", name: "Imran Qureshi", handle: "@imran.sec", role: "Security Engineer", skills: ["DevOps"] },
];

const VISIBLE = 5;

export default function InviteMembersStep({ draft, update }) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("search");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DIRECTORY;
    return DIRECTORY.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.handle.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.skills.some((s) => s.toLowerCase().includes(q)),
    );
  }, [query]);

  const invitedIds = draft.invited.map((m) => m.id);
  const visible = showAll ? results : results.slice(0, VISIBLE);
  const remaining = Math.max(0, LIMITS.MEMBERS_MIN - (1 + draft.invited.length));

  const invite = (user) => {
    update("invited", (prev) =>
      prev.some((m) => m.id === user.id) ? prev : [...prev, { ...user, status: "pending" }],
    );
    dispatch(showSnackbar({ message: `Invitation sent to ${user.name}.`, type: "success" }));
  };

  const removeInvite = (id) => {
    update("invited", (prev) => prev.filter((m) => m.id !== id));
  };

  const copyInviteLink = async () => {
    const link = `${window.location.origin}/join/${draft.tag || "party"}`;
    try {
      await navigator.clipboard.writeText(link);
      dispatch(showSnackbar({ message: MEMBERS.LINK_COPIED, type: "success" }));
    } catch {
      dispatch(showSnackbar({ message: link, type: "info" }));
    }
  };

  return (
    <div className="cp-fields">
      {/* ---------------- Tabs ---------------- */}
      <div className="cp-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "search"}
          className={`cp-tab ${tab === "search" ? "is-active" : ""}`}
          onClick={() => setTab("search")}
        >
          {MEMBERS.TAB_SEARCH}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "link"}
          className={`cp-tab ${tab === "link" ? "is-active" : ""}`}
          onClick={() => setTab("link")}
        >
          {MEMBERS.TAB_LINK}
        </button>
      </div>

      {/* ---------------- Search tab ---------------- */}
      {tab === "search" && (
        <>
          <div className="cp-searchbar">
            <TextInput
              name="member-search"
              placeholder={MEMBERS.SEARCH_PLACEHOLDER}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              leftIcon={
                <Icon name="Search" size={ICON_SIZES.MD} color="#9ca3af" stroke="#9ca3af" />
              }
              containerClassName="cp-grow"
            />
            <SecondaryButton
              className="cp-filters-btn"
              text={MEMBERS.FILTERS}
              icon={<Icon name="Settings" size={ICON_SIZES.MD} color="#374151" stroke="#374151" />}
              iconPosition="left"
            />
          </div>

          <div className="cp-userlist">
            {visible.length === 0 && <p className="cp-empty">{MEMBERS.EMPTY_SEARCH}</p>}
            {visible.map((u, i) => {
              const already = invitedIds.includes(u.id);
              return (
                <div key={u.id} className="cp-user">
                  <MemberAvatar
                    name={u.name}
                    size={40}
                    color={AVATAR_COLORS[i % AVATAR_COLORS.length]}
                  />
                  <div className="cp-user__who">
                    <p className="cp-user__name">{u.name}</p>
                    <p className="cp-user__handle">{u.handle}</p>
                  </div>
                  <div className="cp-user__meta">
                    <span className="cp-tagline">{u.role}</span>
                    {u.skills.map((s) => (
                      <span key={s} className="cp-token cp-token--sm">
                        {s}
                      </span>
                    ))}
                  </div>
                  <SecondaryButton
                    className={`cp-invite-btn ${already ? "is-invited" : ""}`}
                    text={already ? MEMBERS.INVITED : MEMBERS.INVITE}
                    disabled={already}
                    onClick={() => invite(u)}
                  />
                </div>
              );
            })}
          </div>

          {results.length > VISIBLE && (
            <button type="button" className="cp-linkbtn" onClick={() => setShowAll((v) => !v)}>
              {showAll ? "Show fewer results" : MEMBERS.VIEW_MORE}
              <Icon
                name={showAll ? "ChevronDown" : "ChevronRight"}
                size={ICON_SIZES.SM}
                color="#103ca4"
                stroke="#103ca4"
                style={{ transform: showAll ? "rotate(180deg)" : "none" }}
              />
            </button>
          )}

          {/* ---------------- Invited list ---------------- */}
          <div className="cp-invited">
            <div className="cp-invited__head">
              <h4 className="cp-invited__title">
                {MEMBERS.INVITED_TITLE}{" "}
                <span className="cp-invited__count">
                  (2 / {LIMITS.MEMBERS_MIN} minimum required)
                </span>
              </h4>
              {draft.invited.length > 0 && (
                <button
                  type="button"
                  className="cp-linkbtn cp-linkbtn--danger"
                  onClick={() => update("invited", [])}
                >
                  {MEMBERS.CLEAR_ALL}
                </button>
              )}
            </div>

            <div className="cp-invited__list">
              <div className="cp-user cp-user--invited">
                <MemberAvatar name="Arjun Mehta" size={40} color="#103ca4" />
                <div className="cp-user__who">
                  <p className="cp-user__name">
                    You (Arjun Mehta) <span className="cp-role-pill">{MEMBERS.ROLE_LEAD}</span>
                  </p>
                </div>
                <span className="cp-lead-tag">
                  {MEMBERS.STATUS_LEAD}
                  <Icon name="Star" size={ICON_SIZES["2XS"]} color="#f54900" stroke="#f54900" />
                </span>
              </div>

              {draft.invited.map((m, i) => (
                <div key={m.id} className="cp-user cp-user--invited">
                  <MemberAvatar
                    name={m.name}
                    size={40}
                    color={AVATAR_COLORS[i % AVATAR_COLORS.length]}
                  />
                  <div className="cp-user__who">
                    <p className="cp-user__name">{m.name}</p>
                    <p className="cp-user__handle">{m.handle}</p>
                  </div>
                  <span className="cp-pending-tag">{MEMBERS.STATUS_PENDING}</span>
                  <button
                    type="button"
                    className="cp-iconbtn"
                    onClick={() => removeInvite(m.id)}
                    aria-label={`Remove ${m.name}`}
                  >
                    <Icon name="Trash" size={ICON_SIZES.MD} color="#9ca3af" stroke="#9ca3af" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {remaining > 0 ? (
            <div className="cp-minhint">
              <span className="cp-minhint__icon">
                <Icon name="Users" size={ICON_SIZES.LG} color="#9ca3af" stroke="#9ca3af" />
              </span>
              <p className="cp-minhint__title">
                {MEMBERS.MIN_HINT_TITLE.replace("{n}", remaining)}
              </p>
              <p className="cp-minhint__body">
                {MEMBERS.MIN_HINT_BODY.replace("{n}", LIMITS.MEMBERS_MIN)}
              </p>
            </div>
          ) : (
            <div className="cp-minhint cp-minhint--done">
              <span className="cp-minhint__icon">
                <Icon name="CircleCheck" size={ICON_SIZES.LG} color="#00a63e" stroke="#00a63e" />
              </span>
              <p className="cp-minhint__title">
                {LIMITS.MEMBERS_MIN} members reached — you can continue.
              </p>
            </div>
          )}
        </>
      )}

      {/* ---------------- Invite-link tab ---------------- */}
      {tab === "link" && (
        <Cards
          variant="base"
          className="cp-linkcard"
          radius="md"
          bg="rgba(255,255,255,0.6)"
          border="1px solid #e7edf8"
          padding="28px"
        >
          <h4 className="cp-linkcard__title">{MEMBERS.INVITE_LINK_TITLE}</h4>
          <p className="cp-linkcard__body">{MEMBERS.INVITE_LINK_BODY}</p>
          <div className="cp-linkcard__row">
            <code className="cp-linkcard__url">
              {window.location.origin}/join/{draft.tag || "party"}
            </code>
            <PrimaryButton
              className="cp-linkcard__copy"
              text={MEMBERS.COPY_LINK}
              icon={<Icon name="Files" size={ICON_SIZES.SM} color="#ffffff" stroke="#ffffff" />}
              iconPosition="left"
              onClick={copyInviteLink}
            />
          </div>
        </Cards>
      )}
    </div>
  );
}
