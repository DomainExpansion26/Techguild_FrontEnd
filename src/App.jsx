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
import ClientSettings from "./Modules/Client/Pages/Settings/Settings";
import ClientHelpSupport from "./Modules/Client/Pages/HelpSupport/HelpSupport";
import Profile from "./Modules/Individual/Screen/Pages/Profile/Profile";
import Projects from "./Modules/Individual/Screen/Pages/Projects/Projects";
import Proposals from "./Modules/Individual/Screen/Pages/Proposals/Proposals";
import Earnings from "./Modules/Individual/Screen/Pages/Earnings/Earnings";
import Reviews from "./Modules/Individual/Screen/Pages/Reviews/Reviews";
import SavedJobs from "./Modules/Individual/Screen/Pages/SavedJobs/SavedJobs";
import Settings from "./Modules/Individual/Screen/Pages/Settings/Settings";
import HelpSupport from "./Modules/Individual/Screen/Pages/HelpSupport/HelpSupport";

import ActiveQuests from "./Modules/Individual/Screen/Pages/ActiveQuests/ActiveQuests";
import PartyManagement from "./Modules/Individual/Screen/Pages/PartyManagement/PartyManagement";
import ReputationRank from "./Modules/Individual/Screen/Pages/ReputationRank/ReputationRank";
import Notifications from "./Modules/Individual/Screen/Pages/Notifications/Notifications";
import Verification from "./Modules/Individual/Screen/Pages/Verification/Verification";
import VerificationHub from "./Modules/Individual/Screen/Pages/VerificationHub/VerificationHub";

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

      { }
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/client-dashboard" element={<ClientDashboard />} />
      <Route path="/client-profile" element={<ClientProfile />} />
      <Route path="/client-quest-board" element={<ClientQuestBoard />} />
      <Route path="/client-applications" element={<ClientApplications />} />
      <Route path="/client-active-quests" element={<ClientActiveQuests />} />
      <Route path="/client-company-reputation" element={<ClientCompanyReputation />} />
      <Route path="/client-verification-hub" element={<ClientVerificationHub />} />
      <Route path="/client-payouts" element={<ClientPayouts />} />
      <Route path="/client-notifications" element={<ClientNotifications />} />
      <Route path="/client-settings" element={<ClientSettings />} />
      <Route path="/client-help-support" element={<ClientHelpSupport />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/quest-board" element={<Projects />} />
      <Route path="/my-applications" element={<Proposals />} />
      <Route path="/active-quests" element={<ActiveQuests />} />
      <Route path="/party-management" element={<PartyManagement />} />
      <Route path="/reputation-rank" element={<ReputationRank />} />
      <Route path="/verification-hub" element={<VerificationHub />} />
      <Route path="/earnings-payouts" element={<Earnings />} />
      <Route path="/reviews-feedback" element={<Reviews />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help-support" element={<HelpSupport />} />
    </Routes>
  );
}

export default App;
