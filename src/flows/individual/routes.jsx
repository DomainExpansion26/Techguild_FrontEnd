import { lazy } from "react";
import { Route } from "react-router-dom";

const DashBoard = lazy(() => import("./pages/DashBoard/DashBoard"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const WholeProfile = lazy(() => import("./pages/WholeProfile/WholeProfile"));
const Verification = lazy(() => import("./pages/Verification/Verification"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const Proposals = lazy(() => import("./pages/Proposals/Proposals"));
const ActiveQuests = lazy(() => import("./pages/ActiveQuests/ActiveQuests"));
const PartyManagement = lazy(() => import("./pages/PartyManagement/PartyManagement"));
const ReputationRank = lazy(() => import("./pages/ReputationRank/ReputationRank"));
const VerificationHub = lazy(() => import("./pages/VerificationHub/VerificationHub"));
const Earnings = lazy(() => import("./pages/Earnings/Earnings"));
const Reviews = lazy(() => import("./pages/Reviews/Reviews"));
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
    <Route path="/quest-board" element={<Projects />} />
    <Route path="/quest-board/:questId" element={<Projects />} />
    <Route path="/my-applications" element={<Proposals />} />
    <Route path="/communication" element={<Proposals />} />
    <Route path="/active-quests" element={<ActiveQuests />} />
    <Route path="/task-management" element={<ActiveQuests />} />
    <Route path="/party-management" element={<PartyManagement />} />
    <Route path="/party-formation" element={<PartyManagement />} />
    <Route path="/reputation-rank" element={<ReputationRank />} />
    <Route path="/analytics" element={<ReputationRank />} />
    <Route path="/verification-hub" element={<VerificationHub />} />
    <Route path="/subscription" element={<VerificationHub />} />
    <Route path="/earnings-payouts" element={<Earnings />} />
    <Route path="/finance" element={<Earnings />} />
    <Route path="/reviews-feedback" element={<Reviews />} />
    <Route path="/guild-hall" element={<Reviews />} />
    <Route path="/notifications" element={<Notifications />} />
    <Route path="/help-support" element={<HelpSupport />} />
    <Route path="/settings" element={<IndividualSettingsWrapper />} />
    <Route path="/settings/:tab" element={<IndividualSettingsWrapper />} />

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
    <Route path="/individual/settings" element={<IndividualSettingsWrapper />} />
    <Route path="/individual/settings/:tab" element={<IndividualSettingsWrapper />} />
  </>
);

export default individualRoutes;
