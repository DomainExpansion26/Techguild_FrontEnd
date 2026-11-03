// 03-11-2026
// Lazy-loaded route definitions for the public landing pages and feature pages.
import { lazy } from "react";
import { Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/contactus"));
const Features = lazy(() => import("./pages/Features/Features"));
const LearnMoreQuest = lazy(() => import("./pages/LearnMoreQuest/learnmoreQuest"));
const Pricing = lazy(() => import("./pages/Pricing/pricing"));
const QuestBoard = lazy(() => import("./LandingLink/QuestBoard/QuestBoard"));
const VerifyOrganization = lazy(() => import("./LandingLink/VerifyOrganization/VerifyOrganization"));
const GetVerified = lazy(() => import("./LandingLink/GetVerified/GetVerified"));
const TrustPoints = lazy(() => import("./LandingLink/TrustPoints/TrustPoints"));
const Ranking = lazy(() => import("./LandingLink/Ranking/Ranking"));
const Escrow = lazy(() => import("./LandingLink/Escrow/Escrow"));
const Party = lazy(() => import("./LandingLink/Party/Party"));
const TaskManagement = lazy(() => import("./LandingLink/TaskManagement/TaskManagement"));
const Careers = lazy(() => import("./pages/Careers/carrier"));
const Partnership = lazy(() => import("./pages/Partnership/partnership"));
const HelpCenter = lazy(() => import("./pages/HelpCenter/helpcenter"));
const GuidesHome = lazy(() => import("./pages/Guides/GuidesHome"));
const GuideTopic = lazy(() => import("./pages/Guides/GuideTopic"));
const Guides = lazy(() => import("./pages/Guides/guide"));
const FreelancersGuide = lazy(() => import("./pages/Guides/FreelancersGuide"));
const ClientsGuide = lazy(() => import("./pages/Guides/ClientsGuide"));
const PartiesGuide = lazy(() => import("./pages/Guides/PartiesGuide"));
const PaymentsGuide = lazy(() => import("./pages/Guides/PaymentsGuide"));
const AccountSecurityGuide = lazy(() => import("./pages/Guides/AccountSecurityGuide"));
const PrivacyPolicy = lazy(() => import("./pages/Privacy/privacy"));
const TermsOfService = lazy(() => import("./pages/Terms/terms"));
const SecurityPage = lazy(() => import("./pages/Security/security"));
const CommunityPage = lazy(() => import("./pages/Community/community"));

export const landingRoutes = (
  <>
    {/* Landing is the first page of the app */}
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/features" element={<Features />} />
    <Route path="/features/quest-board" element={<LearnMoreQuest />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/quest-board" element={<QuestBoard />} />
    <Route path="/verify-organization" element={<VerifyOrganization />} />
    <Route path="/get-verified" element={<GetVerified />} />
    <Route path="/trust-points" element={<TrustPoints />} />
    <Route path="/ranking" element={<Ranking />} />
    <Route path="/escrow" element={<Escrow />} />
    <Route path="/party" element={<Party />} />
    <Route path="/task-management" element={<TaskManagement />} />
    <Route path="/careers" element={<Careers />} />
    <Route path="/partnerships" element={<Partnership />} />
    <Route path="/help-center" element={<HelpCenter />} />
    <Route path="/guides" element={<GuidesHome />} />
    <Route path="/guides/getting-started/create-account" element={<Guides />} />
    <Route path="/guides/freelancers" element={<FreelancersGuide />} />
    <Route path="/guides/clients" element={<ClientsGuide />} />
    <Route path="/guides/parties" element={<PartiesGuide />} />
    <Route path="/guides/payments-finance" element={<PaymentsGuide />} />
    <Route path="/guides/account-security" element={<AccountSecurityGuide />} />
    <Route path="/guides/:topicSlug" element={<GuideTopic />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms" element={<TermsOfService />} />
    <Route path="/security" element={<SecurityPage />} />
    <Route path="/community" element={<CommunityPage />} />
  </>
);

export default landingRoutes;
