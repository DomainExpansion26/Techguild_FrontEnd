import { lazy } from "react";
import { Route } from "react-router-dom";

const DashBoard = lazy(() => import("./pages/DashBoard/DashBoard"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const WholeProfile = lazy(() => import("./pages/WholeProfile/WholeProfile"));
const Verification = lazy(() => import("./pages/Verification/Verification"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const QuestBoard = lazy(() => import("./pages/QuestBoard/QuestBoard"));
const Proposals = lazy(() => import("./pages/Proposals/Proposals"));
const Messages = lazy(() => import("./pages/Messages/Messages"));
const ActiveQuests = lazy(() => import("./pages/ActiveQuests/ActiveQuests"));
const PartyManagement = lazy(() => import("./pages/PartyManagement/PartyManagement"));
const PartyFormation = lazy(() => import("./pages/PartyFormation/PartyFormation"));
const CreateParty = lazy(() => import("./pages/CreateParty/CreateParty"));
const JoinParty = lazy(() => import("./pages/JoinParty/JoinParty"));
const PartyLead = lazy(() => import("./pages/PartyLead/PartyLead"));
const PartyExit = lazy(() => import("./pages/PartyExit/PartyExit"));
const PartyDelete = lazy(() => import("./pages/PartyExit/PartyDelete"));
const AppliedParty = lazy(() => import("./pages/PartyApplied/AppliedParty"));
const PartyMember = lazy(() => import("./pages/PartyMember/MemberParty"));
const ReputationRank = lazy(() => import("./pages/ReputationRank/ReputationRank"));
const Earnings = lazy(() => import("./pages/Earnings/Earnings"));
const Reviews = lazy(() => import("./pages/Reviews/Reviews"));
const GuildHall = lazy(() => import("../shared/GuildHall/GuildHall"));
const Notifications = lazy(() => import("./pages/Notifications/Notifications"));
const HelpSupport = lazy(() => import("./pages/HelpSupport/HelpSupport"));
const IndividualSettingsWrapper = lazy(() => import("./pages/Settings/Settings"));

export const individualRoutes = (
  <>
    {/* Standard Individual URLs */}
    <Route path="/dashboard" element={<DashBoard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/profile/:step" element={<Profile />} />
    <Route path="/whole-profile" element={<WholeProfile />} />
    <Route path="/wholeprofile" element={<WholeProfile />} />
    <Route path="/verification" element={<Verification />} />
    <Route path="/quest-board" element={<QuestBoard />} />
    <Route path="/quest-board/:questId" element={<QuestBoard />} />
    <Route path="/my-applications" element={<Proposals />} />
    <Route path="/communication" element={<Messages />} />
    <Route path="/active-quests" element={<ActiveQuests />} />
    <Route path="/task-management" element={<ActiveQuests />} />
    <Route path="/party-management" element={<PartyManagement />} />
    <Route path="/party-formation" element={<PartyFormation />} />
    <Route path="/party-formation/create" element={<CreateParty />} />
    <Route path="/party-formation/create/:step" element={<CreateParty />} />
    <Route path="/party-formation/join" element={<JoinParty />} />
    <Route path="/party-formation/join/:partyId" element={<JoinParty />} />
    {/* `:step` (not literal request/success) — JoinParty reads it from useParams() */}
    <Route path="/party-formation/join/:partyId/:step" element={<JoinParty />} />
    {/* Party Lead dashboard — the "party created" landing page. Separate from
        /party-management, which stays the legacy multi-team list. */}
    <Route path="/party-formation/lead" element={<PartyLead />} />
    {/* Leave / Delete confirmations. PartyExit renders both leave variants —
        /leave-lead adds the mandatory leadership-transfer section. */}
    <Route path="/party-formation/leave" element={<PartyExit />} />
    <Route path="/party-formation/leave-lead" element={<PartyExit />} />
    <Route path="/party-formation/delete" element={<PartyDelete />} />
    {/* Party Management member states — the applicant view (Figma
        "Party management for Applied party screen" 230:1216) and the
        joined-member view (Figma "Party management Joined screen" 230:1663).
        "Go to Party Management" after joining lands on one of these based on
        the persisted status; create-party owners go to /party-formation/lead.
        Demo: /party-formation/applied?accept=1 simulates being accepted. */}
    <Route path="/party-formation/applied" element={<AppliedParty />} />
    <Route path="/party-formation/member" element={<PartyMember />} />
    <Route path="/reputation-rank" element={<ReputationRank />} />
    <Route path="/analytics" element={<ReputationRank />} />
    <Route path="/verification-hub" element={<Verification />} />
    <Route path="/subscription" element={<Verification />} />
    <Route path="/earnings-payouts" element={<Earnings />} />
    <Route path="/finance" element={<Earnings />} />
    <Route path="/reviews-feedback" element={<Reviews />} />
    <Route path="/guild-hall" element={<GuildHall />} />
    <Route path="/notifications" element={<Notifications />} />
    <Route path="/help-support" element={<HelpSupport />} />
    <Route path="/settings" element={<IndividualSettingsWrapper />} />
    <Route path="/settings/:tab" element={<IndividualSettingsWrapper />} />

    {/* Namespaced /individual/* aliases */}
    <Route path="/individual/dashboard" element={<DashBoard />} />
    <Route path="/individual/profile" element={<Profile />} />
    <Route path="/individual/profile/:step" element={<Profile />} />
    <Route path="/individual/whole-profile" element={<WholeProfile />} />
    <Route path="/individual/quest-board" element={<QuestBoard />} />
    <Route path="/individual/projects" element={<QuestBoard />} />
    <Route path="/individual/proposals" element={<Proposals />} />
    <Route path="/individual/active-quests" element={<ActiveQuests />} />
    <Route path="/individual/party" element={<PartyManagement />} />
    <Route path="/individual/earnings" element={<Earnings />} />
    <Route path="/individual/reviews" element={<Reviews />} />
    <Route path="/individual/guild-hall" element={<GuildHall />} />
    <Route path="/individual/settings" element={<IndividualSettingsWrapper />} />
    <Route path="/individual/settings/:tab" element={<IndividualSettingsWrapper />} />
  </>
);

export default individualRoutes;
