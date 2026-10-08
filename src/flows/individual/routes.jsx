import { lazy } from "react";
import { Route } from "react-router-dom";

const DashBoard = lazy(() => import("./pages/DashBoard/DashBoard"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const WholeProfile = lazy(() => import("./pages/WholeProfile/WholeProfile"));
const Verification = lazy(() => import("./pages/Verification/Verification"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const Proposals = lazy(() => import("./pages/Proposals/Proposals"));
const Messages = lazy(() => import("./pages/Messages/Messages"));
const ActiveQuests = lazy(() => import("./pages/ActiveQuests/ActiveQuests"));
const PartyManagement = lazy(() => import("./pages/PartyManagement/PartyManagement"));
const ReputationRank = lazy(() => import("./pages/ReputationRank/ReputationRank"));
const Earnings = lazy(() => import("./pages/Earnings/Earnings"));
const Reviews = lazy(() => import("./pages/Reviews/Reviews"));
const GuildHall = lazy(() => import("../shared/GuildHall/GuildHall"));
const Notifications = lazy(() => import("./pages/Notifications/Notifications"));
const HelpSupport = lazy(() => import("./pages/HelpSupport/HelpSupport"));
const IndividualSettingsWrapper = lazy(() => import("./pages/Settings/Settings"));

// Consolidated Individual Identity Verification Flow
const IndividualFlow = lazy(() => import("../client/pages/VerificationHub/individualflow"));

export const individualRoutes = (
  <>
    {/* Standard Individual URLs */}
    <Route path="/dashboard" element={<DashBoard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/profile/:step" element={<Profile />} />
    <Route path="/whole-profile" element={<WholeProfile />} />
    <Route path="/wholeprofile" element={<WholeProfile />} />
    <Route path="/verification" element={<Verification />} />
    <Route path="/quest-board" element={<Projects />} />
    <Route path="/quest-board/:questId" element={<Projects />} />
    <Route path="/my-applications" element={<Proposals />} />
    <Route path="/communication" element={<Messages />} />
    <Route path="/active-quests" element={<ActiveQuests />} />
    <Route path="/task-management" element={<ActiveQuests />} />
    <Route path="/party-management" element={<PartyManagement />} />
    <Route path="/party-formation" element={<PartyManagement />} />
    <Route path="/reputation-rank" element={<ReputationRank />} />
    <Route path="/analytics" element={<ReputationRank />} />
    <Route path="/verification-hub" element={<IndividualFlow defaultStep="intro" />} />
    {/* <Route path="/subscription" element={<VerificationHub />} /> */}
    <Route path="/earnings-payouts" element={<Earnings />} />
    <Route path="/finance" element={<Earnings />} />
    <Route path="/reviews-feedback" element={<Reviews />} />
    <Route path="/guild-hall" element={<GuildHall />} />
    <Route path="/notifications" element={<Notifications />} />
    <Route path="/help-support" element={<HelpSupport />} />
    <Route path="/settings" element={<IndividualSettingsWrapper />} />
    <Route path="/settings/:tab" element={<IndividualSettingsWrapper />} />

    {/* Individual Identity Verification Flow */}
    <Route path="/individual-verification" element={<IndividualFlow defaultStep="intro" />} />
    <Route path="/individual-verification/identity" element={<IndividualFlow defaultStep="identity" />} />
    <Route path="/individual-verification/upload" element={<IndividualFlow defaultStep="upload" />} />
    <Route path="/individual-verification/selfie" element={<IndividualFlow defaultStep="selfie" />} />
    <Route path="/individual-verification/review" element={<IndividualFlow defaultStep="review" />} />
    <Route path="/individual-verification/submitted" element={<IndividualFlow defaultStep="submitted" />} />
    <Route path="/individual-verification/under-review" element={<IndividualFlow defaultStep="under-review" />} />
    <Route path="/individual-verification/complete" element={<IndividualFlow defaultStep="complete" />} />
    <Route path="/individual-verification/success" element={<IndividualFlow defaultStep="success" />} />

    <Route path="/verification/individual" element={<IndividualFlow defaultStep="intro" />} />
    <Route path="/verification/individual/identity" element={<IndividualFlow defaultStep="identity" />} />
    <Route path="/verification/individual/upload" element={<IndividualFlow defaultStep="upload" />} />
    <Route path="/verification/individual/selfie" element={<IndividualFlow defaultStep="selfie" />} />
    <Route path="/verification/individual/review" element={<IndividualFlow defaultStep="review" />} />
    <Route path="/verification/individual/submitted" element={<IndividualFlow defaultStep="submitted" />} />
    <Route path="/verification/individual/under-review" element={<IndividualFlow defaultStep="under-review" />} />
    <Route path="/verification/individual/complete" element={<IndividualFlow defaultStep="complete" />} />
    <Route path="/verification/individual/success" element={<IndividualFlow defaultStep="success" />} />

    {/* Namespaced /individual/* aliases */}
    <Route path="/individual/dashboard" element={<DashBoard />} />
    <Route path="/individual/profile" element={<Profile />} />
    <Route path="/individual/profile/:step" element={<Profile />} />
    <Route path="/individual/whole-profile" element={<WholeProfile />} />
    <Route path="/individual/quest-board" element={<Projects />} />
    <Route path="/individual/projects" element={<Projects />} />
    <Route path="/individual/proposals" element={<Proposals />} />
    <Route path="/individual/active-quests" element={<ActiveQuests />} />
    <Route path="/individual/party" element={<PartyManagement />} />
    <Route path="/individual/earnings" element={<Earnings />} />
    <Route path="/individual/reviews" element={<Reviews />} />
    <Route path="/individual/guild-hall" element={<GuildHall />} />
    <Route path="/individual/verification" element={<IndividualFlow defaultStep="intro" />} />
    <Route path="/individual/verification-hub" element={<IndividualFlow defaultStep="intro" />} />
    <Route path="/individual/settings" element={<IndividualSettingsWrapper />} />
    <Route path="/individual/settings/:tab" element={<IndividualSettingsWrapper />} />
  </>
);

export default individualRoutes;
