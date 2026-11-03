// [TechGuild Update: 13-10-2026] Join Party — Step 1 browse/discover (Figma "1", node 197:5639)
import React, { useMemo, useState } from "react";
import { Cards, TextInput, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import PartyCard from "../PartyCard";
import { PARTIES } from "../partyData";
import { APP_STRINGS } from "@/constants/string";
import { ICON_SIZES } from "@/constants/sizes";
import "./browse.css";

const { BROWSE, MOCK } = APP_STRINGS.JOIN_PARTY;

export default function BrowseParties({ onView, onRequest }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(BROWSE.CATEGORIES[0]);
  const [sort, setSort] = useState(BROWSE.SORTS[0]);
  const [page, setPage] = useState(1);
  const [listView, setListView] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PARTIES.filter((p) => {
      if (category !== BROWSE.CATEGORIES[0] && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q)) ||
        p.lookingFor.some((r) => r.toLowerCase().includes(q))
      );
    });

    list = [...list].sort((a, b) => {
      if (sort === BROWSE.SORTS[1]) return b.rating - a.rating;
      if (sort === BROWSE.SORTS[2]) return b.members - a.members;
      if (sort === BROWSE.SORTS[3]) return b.projects - a.projects;
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [query, category, sort]);

  const pages = Math.max(1, Math.ceil(results.length / MOCK.PAGE_SIZE));
  const visible = results.slice((page - 1) * MOCK.PAGE_SIZE, page * MOCK.PAGE_SIZE);

  const resetTo = (fn) => (v) => {
    fn(v);
    setPage(1);
  };

  return (
    <>
      {/* ---------------- Search + filters ---------------- */}
      <Cards
        variant="base"
        className="jb-filterbar"
        radius="md"
        bg="rgba(255,255,255,0.6)"
        border="1px solid #e7edf8"
        padding="20px"
      >
        <div className="jb-searchrow">
          <TextInput
            name="party-search"
            placeholder={BROWSE.SEARCH_PLACEHOLDER}
            value={query}
            onChange={(e) => resetTo(setQuery)(e.target.value)}
            leftIcon={<Icon name="Search" size={ICON_SIZES.MD} color="#94a3b8" stroke="#94a3b8" />}
            containerClassName="jb-grow"
          />
          <SecondaryButton
            className="jb-btn"
            text={BROWSE.FILTERS}
            icon={<Icon name="Settings" size={ICON_SIZES.MD} color="#334155" stroke="#334155" />}
            iconPosition="left"
          />
          <label className="jb-sort">
            <span className="jb-visually-hidden">Sort</span>
            <select value={sort} onChange={(e) => resetTo(setSort)(e.target.value)}>
              {BROWSE.SORTS.map((s) => (
                <option key={s} value={s}>
                  Sort: {s}
                </option>
              ))}
            </select>
            <Icon name="ChevronDown" size={ICON_SIZES.MD} color="#334155" stroke="#334155" />
          </label>
        </div>

        <div className="jb-cats" role="group" aria-label="Category">
          {BROWSE.CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              className={`jb-cat ${category === c ? "is-active" : ""}`}
              onClick={() => resetTo(setCategory)(c)}
            >
              {c}
            </button>
          ))}
          <button
            type="button"
            className="jb-cat jb-cat--more"
            onClick={() => resetTo(setCategory)(BROWSE.MORE_CATEGORIES[0])}
          >
            More
            <Icon name="ChevronDown" size={ICON_SIZES.XS} color="#334155" stroke="#334155" />          </button>
        </div>
      </Cards>

      {/* ---------------- Result meta + view toggle ---------------- */}
      <div className="jb-meta">
        <span className="jb-count">{BROWSE.FOUND.replace("{n}", results.length)}</span>
        <div className="jb-views">
          <button
            type="button"
            aria-label={BROWSE.VIEW_TOGGLE_GRID}
            aria-pressed={!listView}
            className={`jb-view ${!listView ? "is-active" : ""}`}
            onClick={() => setListView(false)}
          >
            <Icon name="LayoutDashboard" size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />
          </button>
          <button
            type="button"
            aria-label={BROWSE.VIEW_TOGGLE_LIST}
            aria-pressed={listView}
            className={`jb-view ${listView ? "is-active" : ""}`}
            onClick={() => setListView(true)}
          >
            <Icon name="ClipboardList" size={ICON_SIZES.MD} color="#103ca4" stroke="#103ca4" />
          </button>
        </div>
      </div>

      {/* ---------------- Results ---------------- */}
      {visible.length === 0 ? (
        <p className="jb-empty">{BROWSE.NO_RESULTS}</p>
      ) : (
        <div className={`jb-grid ${listView ? "is-list" : ""}`}>
          {visible.map((p) => (
            <PartyCard key={p.id} party={p} onView={onView} onRequest={onRequest} />
          ))}
        </div>
      )}

      {/* ---------------- Pagination ---------------- */}
      {results.length > MOCK.PAGE_SIZE && (
        <nav className="jb-pager" aria-label="Pagination">
          <button
            type="button"
            className="jb-page jb-page--nav"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <Icon name="ChevronRight" size={ICON_SIZES.SM} color="#334155" stroke="#334155" style={{ transform: "rotate(180deg)" }} />
            {BROWSE.PREVIOUS}
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              aria-current={page === n ? "page" : undefined}
              className={`jb-page ${page === n ? "is-active" : ""}`}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className="jb-page jb-page--nav"
            disabled={page === pages}
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
          >
            {BROWSE.NEXT}
            <Icon name="ChevronRight" size={ICON_SIZES.SM} color="#334155" stroke="#334155" />
          </button>
        </nav>
      )}
    </>
  );
}
