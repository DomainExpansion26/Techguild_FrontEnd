import { Routes, Route } from "react-router-dom";
import { AuthHomeScreen } from "@/Components";
import DashBoard from "./Pages/DashBoard/DashBoard";
import SignUp from "./Pages/SignUp/SignUp";
import Profile from "./Pages/Profile/Profile";
import Projects from "./Pages/Projects/Projects";
import Proposals from "./Pages/Proposals/Proposals";
import Earnings from "./Pages/Earnings/Earnings";
import Reviews from "./Pages/Reviews/Reviews";
import SavedJobs from "./Pages/SavedJobs/SavedJobs";
import Settings from "./Pages/Settings/Settings";
import HelpSupport from "./Pages/HelpSupport/HelpSupport";

// Newly created pages
import ActiveQuests from "./Pages/ActiveQuests/ActiveQuests";
import PartyManagement from "./Pages/PartyManagement/PartyManagement";
import ReputationRank from "./Pages/ReputationRank/ReputationRank";
import Notifications from "./Pages/Notifications/Notifications";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthHomeScreen />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Sidebar Pages */}
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/quest-board" element={<Projects />} />
      <Route path="/my-applications" element={<Proposals />} />
      <Route path="/active-quests" element={<ActiveQuests />} />
      <Route path="/party-management" element={<PartyManagement />} />
      <Route path="/reputation-rank" element={<ReputationRank />} />
      <Route path="/verification-hub" element={<SavedJobs />} />
      <Route path="/earnings-payouts" element={<Earnings />} />
      <Route path="/reviews-feedback" element={<Reviews />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help-support" element={<HelpSupport />} />
    </Routes>
  );
}

export default App;
