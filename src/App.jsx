import { Routes, Route } from "react-router-dom";
import SignUp from "./Modules/auth/Register/SignUp";
import Login from "./Modules/auth/Login/Login";
import ForgetPass from "./Modules/auth/ForgotPassword/Forgetpass";
import ResetPass from "./Modules/auth/ResetPassword/Resetpass";
import VerifyEmail from "./Modules/auth/Verifyemail/Verifyemail";
import EmailVerified from "./Modules/auth/Emailverify/Emailverify";
import AccountType from "./Modules/auth/Accountype/Accounttype";
import DashBoard from "./Modules/Individual/Screen/Pages/DashBoard/DashBoard";
import ClientDashboard from "./Modules/Client/Pages/Dashboard/Dashboard";
import ClientProfile from "./Modules/Client/Pages/Profile/Profile";
import ClientQuestBoard from "./Modules/Client/Pages/QuestBoard/QuestBoard";
import ClientApplications from "./Modules/Client/Pages/Applications/Applications";
import ClientActiveQuests from "./Modules/Client/Pages/ActiveQuests/ActiveQuests";
import ClientCompanyReputation from "./Modules/Client/Pages/CompanyReputation/CompanyReputation";
import ClientVerificationHub from "./Modules/Client/Pages/VerificationHub/VerificationHub";
import ClientPayouts from "./Modules/Client/Pages/Payouts/Payouts";
import ClientNotifications from "./Modules/Client/Pages/Notifications/Notifications";
import ClientHelpSupport from "./Modules/Client/Pages/HelpSupport/HelpSupport";

// Client Settings Dynamic Wrapper Import
import ClientSettingsWrapper from "./Modules/Client/Pages/Settings/Settings";

// Individual Pages & Settings Dynamic Wrapper Import
import Profile from "./Modules/Individual/Screen/Pages/Profile/Profile";
import Projects from "./Modules/Individual/Screen/Pages/Projects/Projects";
import Proposals from "./Modules/Individual/Screen/Pages/Proposals/Proposals";
import Earnings from "./Modules/Individual/Screen/Pages/Earnings/Earnings";
import Reviews from "./Modules/Individual/Screen/Pages/Reviews/Reviews";
import SavedJobs from "./Modules/Individual/Screen/Pages/SavedJobs/SavedJobs";
import HelpSupport from "./Modules/Individual/Screen/Pages/HelpSupport/HelpSupport";
import ActiveQuests from "./Modules/Individual/Screen/Pages/ActiveQuests/ActiveQuests";
import PartyManagement from "./Modules/Individual/Screen/Pages/PartyManagement/PartyManagement";
import ReputationRank from "./Modules/Individual/Screen/Pages/ReputationRank/ReputationRank";
import Notifications from "./Modules/Individual/Screen/Pages/Notifications/Notifications";
import Verification from "./Modules/Individual/Screen/Pages/Verification/Verification";
import VerificationHub from "./Modules/Individual/Screen/Pages/VerificationHub/VerificationHub";

import IndividualSettingsWrapper from "./Modules/Individual/Screen/Pages/Settings/Settings";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgetPass />} />
      <Route path="/reset-password" element={<ResetPass />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/emailverify" element={<EmailVerified />} />
      <Route path="/account-type" element={<AccountType />} />

      {/* Main Dashboard & Client Routes */}
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/client-dashboard" element={<ClientDashboard />} />
      <Route path="/client-profile" element={<ClientProfile />} />
      <Route path="/client-profile/:step" element={<ClientProfile />} />
      <Route path="/client-quest-board" element={<ClientQuestBoard />} />
      <Route path="/client-quest-board/:questId" element={<ClientQuestBoard />} />
      <Route path="/client-applications" element={<ClientApplications />} />
      <Route path="/client-active-quests" element={<ClientActiveQuests />} />
      <Route path="/client-company-reputation" element={<ClientCompanyReputation />} />
      <Route path="/client-verification-hub" element={<ClientVerificationHub />} />
      <Route path="/client-payouts" element={<ClientPayouts />} />
      <Route path="/client-notifications" element={<ClientNotifications />} />
      <Route path="/client-help-support" element={<ClientHelpSupport />} />

      {/* Client Settings Dynamic Routes */}
      <Route path="/client-settings" element={<ClientSettingsWrapper />} />
      <Route path="/client-settings/:tab" element={<ClientSettingsWrapper />} />

      {/* Individual Routes */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:step" element={<Profile />} />
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

      {/* Individual Settings Dynamic Routes */}
      <Route path="/settings" element={<IndividualSettingsWrapper />} />
      <Route path="/settings/:tab" element={<IndividualSettingsWrapper />} />
    </Routes>
  );
}

export default App;
