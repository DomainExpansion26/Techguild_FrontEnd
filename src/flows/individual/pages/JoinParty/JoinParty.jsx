// [TechGuild Update: 13-10-2026] Join Party — 4-step drill-down (Figma "1"-"4", nodes 197:5639/197:6224/197:6850/197:5476)
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DashboardLayout } from "@/Components";
import BrowseParties from "./screens/BrowseParties";
import PartyDetail from "./screens/PartyDetail";
import RequestJoin from "./screens/RequestJoin";
import JoinSuccess from "./screens/JoinSuccess";
import { BrowseRail, DetailRail, RequestRail } from "./JoinRail";
import { findParty } from "./partyData";
import { APP_STRINGS } from "@/constants/string";
import { showSnackbar } from "@/store";
import { ScrollArea, BackLink } from "@/flows/shared/party/PartyUi";
import {
  PARTY_STATUS,
  getPartyStatus,
  setPartyStatus,
} from "@/flows/shared/party/partyStatus";
import "./joinparty.css";

const { HEADER, VALIDATION } = APP_STRINGS.JOIN_PARTY;

const EMPTY_REQUEST = {
  role: null,
  intro: "",
  links: { portfolio: "", behance: "", github: "", linkedin: "" },
  availability: null,
  startDate: "",
};

/** Client-side submission id — no persistence endpoint yet. */
function makeSubmissionId(tag) {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  const slug = String(tag || "pty").replace(/^@/, "").toUpperCase().slice(0, 3) || "PTY";
  return `${slug}-${y}-${m}-${d}-${rand}`;
}

export default function JoinParty() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { partyId, step } = useParams();

  const [form, setForm] = useState(EMPTY_REQUEST);
  const [errors, setErrors] = useState({});
  const [submissionId, setSubmissionId] = useState(null);

  const party = useMemo(
    () => (partyId ? findParty(partyId) : null),
    [partyId],
  );

  const update = useCallback((key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }, []);

  /**
   * `success` is terminal — it must only render after an actual submit, so a
   * hand-typed deep link cannot show a fake confirmation. Same guard as
   * Create Party. Steps 2-4 also need a resolvable `:partyId`.
   *
   * NOTE: `step === undefined && party` is the *normal* detail-page state, not
   * a bad one — do not add it here, or "View Party" bounces straight back to
   * the browse list.
   */
  useEffect(() => {
    if (!party && step !== undefined) navigate("/party-formation/join", { replace: true });
    else if (step === "success" && !submissionId && party) {
      navigate(`/party-formation/join/${party.id}/request`, { replace: true });
    }
  }, [party, step, submissionId, navigate]);

  const goView = (p) => navigate(`/party-formation/join/${p.id}`);
  const goRequest = (p) => navigate(`/party-formation/join/${p.id}/request`);

  const validate = () => {
    const next = {};
    if (!form.role) next.role = VALIDATION.ROLE_REQUIRED;
    if (!form.intro.trim()) next.intro = VALIDATION.INTRO_REQUIRED;
    else if (form.intro.length > 500) next.intro = VALIDATION.INTRO_TOO_LONG;
    Object.entries(form.links).forEach(([key, value]) => {
      // All four link fields are Optional — an empty value is valid, only a
      // filled-in one has to look like a URL.
      if (value.trim() && !/^https?:\/\/.+\..+/.test(value.trim())) {
        next[key] = VALIDATION.URL_INVALID;
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      dispatch(showSnackbar({ message: "Please fix the highlighted fields.", type: "error" }));
      return;
    }
    // The request is pending → Party Management shows the applicant state
    // until a party accepts (then the demo flag flips it to the joined view).
    setPartyStatus(PARTY_STATUS.APPLIED);
    setSubmissionId(makeSubmissionId(party.tag));
    navigate(`/party-formation/join/${party.id}/success`);
  };

  // Backend-computed skills-match score; mocked per party in partyData.js.
  const matchPct = party?.skillsMatch ?? 0;

  /* ---------------- Step 1: browse ----------------
     Keyed off `party`, not `step` — the detail screen has a `:partyId` but no
     `:step`, so testing `!step` here would render browse for step 2 as well. */
  if (!party) {
    return (
      <DashboardLayout searchPlaceholder={HEADER.SEARCH_PLACEHOLDER}>
        <ScrollArea>
          <div className="jp-page">
            <BackLink label={HEADER.BACK_TO_MANAGEMENT} onClick={() => navigate("/party-formation")} />
            <div className="jp-head">
              <h1 className="jp-title">{HEADER.BROWSE_TITLE}</h1>
              <p className="jp-sub">{HEADER.BROWSE_SUBTITLE}</p>
            </div>
            <div className="jp-layout">
              <div className="jp-main">
                <BrowseParties onView={goView} onRequest={goRequest} />
              </div>
              <aside className="jp-rail">
                <BrowseRail />
              </aside>
            </div>
          </div>
        </ScrollArea>
      </DashboardLayout>
    );
  }

  /* ---------------- Step 4: success ---------------- */
  if (step === "success") {
    return (
      <DashboardLayout searchPlaceholder={HEADER.SEARCH_PLACEHOLDER}>
        <ScrollArea>
          <div className="jp-page jp-page--narrow">
            <BackLink
              label={HEADER.BACK_TO_PARTY.replace("{party}", party.name)}
              onClick={() => navigate(`/party-formation/join/${party.id}`)}
            />
            <div className="jp-head">
              <h1 className="jp-title">{HEADER.REQUEST_TITLE}</h1>
            </div>
            <JoinSuccess
              party={party}
              submissionId={submissionId}
              onViewParty={() => navigate(`/party-formation/join/${party.id}`)}
              // "Go to Party Management" lands on the applicant screen while
              // the request is pending; once accepted (demo: ?accept=1) the
              // joined-member screen takes over. The lead's own dashboard at
              // /party-formation/lead is only for party owners.
              onGoToManagement={() =>
                navigate(
                  getPartyStatus() === PARTY_STATUS.MEMBER
                    ? "/party-formation/member"
                    : "/party-formation/applied",
                )
              }
            />
          </div>
        </ScrollArea>
      </DashboardLayout>
    );
  }

  /* ---------------- Step 3: request ---------------- */
  if (step === "request") {
    return (
      <DashboardLayout searchPlaceholder={HEADER.SEARCH_PLACEHOLDER}>
        <ScrollArea>
          <div className="jp-page">
            <BackLink
              label={HEADER.BACK_TO_PARTY.replace("{party}", party.name)}
              onClick={() => navigate(`/party-formation/join/${party.id}`)}
            />
            <div className="jp-head">
              <h1 className="jp-title">{HEADER.REQUEST_TITLE}</h1>
              <p className="jp-sub">
                {HEADER.REQUEST_SUBTITLE.replace("{party}", party.name)}
              </p>
            </div>
            <div className="jp-layout">
              <div className="jp-main">
                <RequestJoin
                  form={form}
                  update={update}
                  errors={errors}
                  onBack={() => navigate(`/party-formation/join/${party.id}`)}
                  onSubmit={handleSubmit}
                />
              </div>
              <aside className="jp-rail">
                <RequestRail party={party} matchPct={matchPct} />
              </aside>
            </div>
          </div>
        </ScrollArea>
      </DashboardLayout>
    );
  }

  /* ---------------- Step 2: detail ---------------- */
  return (
    <DashboardLayout searchPlaceholder={HEADER.SEARCH_PLACEHOLDER}>
      <ScrollArea>
        <div className="jp-page">
          <BackLink label={HEADER.BACK_TO_BROWSE} onClick={() => navigate("/party-formation/join")} />
          <div className="jp-layout">
            <div className="jp-main">
              <PartyDetail
                party={party}
                onRequest={() => navigate(`/party-formation/join/${party.id}/request`)}
              />
            </div>
            <aside className="jp-rail">
              <DetailRail party={party} onRequest={() => navigate(`/party-formation/join/${party.id}/request`)} />
            </aside>
          </div>
        </div>
        </ScrollArea>
      </DashboardLayout>
    );
  }
