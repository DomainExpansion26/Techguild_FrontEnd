import { lazy } from "react";
import { Route } from "react-router-dom";

const ClientDashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const ClientProfile = lazy(() => import("./pages/Profile/Profile"));
const ClientWholeProfile = lazy(() => import("./pages/whole_Profile"));
const ClientQuestBoard = lazy(() => import("./pages/QuestBoard/QuestBoard"));
const ClientApplications = lazy(() => import("./pages/Applications/Applications"));
const ClientActiveQuests = lazy(() => import("./pages/ActiveQuests/ActiveQuests"));
const ClientCompanyReputation = lazy(() => import("./pages/CompanyReputation/CompanyReputation"));
const ClientVerificationHub = lazy(() => import("./pages/VerificationHub/VerificationHub"));
const ClientPayouts = lazy(() => import("./pages/Payouts/Payouts"));
const ClientNotifications = lazy(() => import("./pages/Notifications/Notifications"));
const ClientHelpSupport = lazy(() => import("./pages/HelpSupport/HelpSupport"));
const ClientSettingsWrapper = lazy(() => import("./pages/Settings/Settings"));

export const clientRoutes = (
  <>
    {/* Standard Client URLs */}
    <Route path="/client-dashboard" element={<ClientDashboard />} />
    <Route path="/client-profile" element={<ClientProfile />} />
    <Route path="/client-profile/:step" element={<ClientProfile />} />
    <Route path="/client-whole-profile" element={<ClientWholeProfile />} />
    <Route path="/client-profile/whole" element={<ClientWholeProfile />} />
    <Route path="/client-quest-board" element={<ClientQuestBoard />} />
    <Route path="/client-quest-board/:questId" element={<ClientQuestBoard />} />
    <Route path="/client-applications" element={<ClientApplications />} />
    <Route path="/client-active-quests" element={<ClientActiveQuests />} />
    <Route path="/client-company-reputation" element={<ClientCompanyReputation />} />
    <Route path="/client-verification-hub" element={<ClientVerificationHub />} />
    <Route path="/client-payouts" element={<ClientPayouts />} />
    <Route path="/client-notifications" element={<ClientNotifications />} />
    <Route path="/client-help-support" element={<ClientHelpSupport />} />
    <Route path="/client-settings" element={<ClientSettingsWrapper />} />
    <Route path="/client-settings/:tab" element={<ClientSettingsWrapper />} />

    {/* Namespaced /client/* aliases */}
    <Route path="/client/dashboard" element={<ClientDashboard />} />
    <Route path="/client/profile" element={<ClientProfile />} />
    <Route path="/client/profile/:step" element={<ClientProfile />} />
    <Route path="/client/whole-profile" element={<ClientWholeProfile />} />
    <Route path="/client/quest-board" element={<ClientQuestBoard />} />
    <Route path="/client/projects" element={<ClientQuestBoard />} />
    <Route path="/client/applications" element={<ClientApplications />} />
    <Route path="/client/active-quests" element={<ClientActiveQuests />} />
    <Route path="/client/company-reputation" element={<ClientCompanyReputation />} />
    <Route path="/client/verification-hub" element={<ClientVerificationHub />} />
    <Route path="/client/payouts" element={<ClientPayouts />} />
    <Route path="/client/notifications" element={<ClientNotifications />} />
    <Route path="/client/help-support" element={<ClientHelpSupport />} />
    <Route path="/client/settings" element={<ClientSettingsWrapper />} />
    <Route path="/client/settings/:tab" element={<ClientSettingsWrapper />} />
  </>
);

export default clientRoutes;
