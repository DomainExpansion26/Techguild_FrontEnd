import { lazy } from "react";
import { Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Features = lazy(() => import("./pages/Features/Features"));
const Pricing = lazy(() => import("./pages/Pricing/pricing"));

export const landingRoutes = (
  <>
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/features" element={<Features />} />
    <Route path="/pricing" element={<Pricing />} />
  </>
);

export default landingRoutes;
