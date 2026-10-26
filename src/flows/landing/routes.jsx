import { lazy } from "react";
import { Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Features = lazy(() => import("./pages/Features/Features"));
const Pricing = lazy(() => import("./pages/Pricing/pricing"));
const QuestBoard = lazy(() => import("./LandingLink/QuestBoard/QuestBoard"));
const VerifyOrganization = lazy(() => import("./LandingLink/VerifyOrganization/VerifyOrganization"));
const GetVerified = lazy(() => import("./LandingLink/GetVerified/GetVerified"));
const TrustPoints = lazy(() => import("./LandingLink/TrustPoints/TrustPoints"));
const Ranking = lazy(() => import("./LandingLink/Ranking/Ranking"));
const Escrow = lazy(() => import("./LandingLink/Escrow/Escrow"));
const Party = lazy(() => import("./LandingLink/Party/Party"));
const TaskManagement = lazy(() => import("./LandingLink/TaskManagement/TaskManagement"));

export const landingRoutes = (
  <>
    {/* Landing is the first page of the app */}
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/features" element={<Features />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/quest-board" element={<QuestBoard />} />
    <Route path="/verify-organization" element={<VerifyOrganization />} />
    <Route path="/get-verified" element={<GetVerified />} />
    <Route path="/trust-points" element={<TrustPoints />} />
    <Route path="/ranking" element={<Ranking />} />
    <Route path="/escrow" element={<Escrow />} />
    <Route path="/party" element={<Party />} />
    <Route path="/task-management" element={<TaskManagement />} />
  </>
);

export default landingRoutes;
