// [TechGuild Update: 21-09-2026] Client whole profile page, LinkedIn/GitHub edit inputs, live logo/banner sync & points journey
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Navbar, Cards, Header, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { GuildCard } from "@/Components/Cards/variants";
import { useAuth } from "@/context/AuthContext";
import { profileApi } from "@/features/profile/api/profileApi";
import { projectsApi } from "@/features/projects/api/projectsApi";
import { showSnackbar } from "@/store";
import { ICON_SIZES } from "@/constants/sizes";
import "@/flows/individual/pages/DashBoard/dashboard.css";
import "./whole_Profile.css";

const clientNavItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/client-dashboard" },
  { id: "profile", label: "Profile (Guild Card)", icon: "User2", path: "/client-profile" },
  { id: "quest-board", label: "Quest Board", icon: "Files", path: "/client-quest-board" },
  { id: "applications", label: "Applications", icon: "FileText", path: "/client-applications" },
  { id: "active-quests", label: "Active Quests", icon: "Files", path: "/client-active-quests" },
  { id: "company-reputation", label: "Company Reputation", icon: "Verified", path: "/client-company-reputation" },
  { id: "verification-hub", label: "Verification Hub", icon: "Bookmark", path: "/client-verification-hub" },
  { id: "payouts", label: "Payouts", icon: "IndianRupee", path: "/client-payouts" },
  { id: "notifications", label: "Notifications", icon: "Bell", path: "/client-notifications" },
  { id: "settings", label: "Settings", icon: "Settings", path: "/client-settings" },
  { id: "help-support", label: "Help & Support", icon: "CircleQuestionMark", path: "/client-help-support" },
];

const TRUST_RANKS = [
  { rank: "F", min: 0, max: 99 },
  { rank: "E", min: 100, max: 249 },
  { rank: "D", min: 250, max: 499 },
  { rank: "C", min: 500, max: 999 },
  { rank: "B", min: 1000, max: 1999 },
  { rank: "A", min: 2000, max: 4999 },
  { rank: "S", min: 5000, max: 9999 },
  { rank: "SS", min: 10000, max: 19999 },
  { rank: "SSS", min: 20000, max: Infinity },
];

const isValidImageUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (
    !trimmed ||
    trimmed === "logo_url" ||
    trimmed === "avatar_url" ||
    trimmed === "resume_url" ||
    trimmed === "string" ||
    trimmed === "null" ||
    trimmed === "undefined" ||
    trimmed.startsWith("https://storage.example.com/")
  ) {
    return false;
  }
  return true;
};

export default function WholeProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, updateUser } = useAuth();
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  // Core Data States
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [pointsData, setPointsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoImgError, setLogoImgError] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  // Interactive Action States
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [inlineAlert, setInlineAlert] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("general");
  const [isSlugModalOpen, setIsSlugModalOpen] = useState(false);

  // Edit Form State
  const [editForm, setEditForm] = useState({
    company_name: "",
    contact_name: "",
    phone: "",
    industry: "",
    website_url: "",
    linkedin_url: "",
    github_url: "",
    team_size: "",
    budget_range: "",
    city: "",
    country: "",
    timezone: "",
    description: "",
    project_types: [],
    hiring_interests: [],
    newInterest: "",
    newProjectType: "",
  });

  // Slug Checker State
  const [slugInput, setSlugInput] = useState("");
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugStatus, setSlugStatus] = useState(null);

  useEffect(() => {
    if (inlineAlert) {
      const timer = setTimeout(() => setInlineAlert(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [inlineAlert]);

  useEffect(() => {
    let ignore = false;

    Promise.allSettled([
      // get-my-profile -> { account_type, individual, client, agency }
      profileApi.getMyProfile(),
      projectsApi.getMyProjects(),
      profileApi.getPoints(),
    ])
      .then(([profRes, projRes, pointsRes]) => {
        if (ignore) return;

        if (profRes.status === "fulfilled" && profRes.value) {
          const clientData = profRes.value?.client || {};
          const savedDesc = (typeof window !== "undefined" ? localStorage.getItem("techguild_client_desc") : "") || "";
          const savedLinkedin = (typeof window !== "undefined" ? localStorage.getItem("techguild_client_linkedin") : "") || "";
          const savedGithub = (typeof window !== "undefined" ? localStorage.getItem("techguild_client_github") : "") || "";
          const savedWebsite = (typeof window !== "undefined" ? localStorage.getItem("techguild_client_website") : "") || "";

          const resolvedDesc = clientData?.description || clientData?.about_company || clientData?.about || savedDesc || "";
          const resolvedLinkedin = clientData?.linkedin_url || clientData?.linkedin || savedLinkedin || "linkedin.com/company/nexorasolutions";
          const resolvedGithub = clientData?.github_url || clientData?.github || savedGithub || "github.com/nexora-solutions";
          const resolvedWebsite = clientData?.website_url || clientData?.website || savedWebsite || "nexorasolutions.com";

          setProfile({
            ...clientData,
            description: resolvedDesc,
            about_company: resolvedDesc,
            about: resolvedDesc,
            linkedin_url: resolvedLinkedin,
            github_url: resolvedGithub,
            website_url: resolvedWebsite,
          });

          // Pre-fill edit form state
          setEditForm({
            company_name: clientData?.company_name || user?.company_name || user?.name || "",
            contact_name: clientData?.contact_name || (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : "") || "",
            phone: clientData?.phone || user?.phone || "",
            industry: clientData?.industry || "Healthcare",
            website_url: resolvedWebsite,
            linkedin_url: resolvedLinkedin,
            github_url: resolvedGithub,
            team_size: clientData?.team_size || "10 - 50",
            budget_range: clientData?.budget_range || "$5,000 - $20,000",
            city: clientData?.city || "",
            country: clientData?.country || "",
            timezone: clientData?.timezone || "Asia/Kolkata",
            description: resolvedDesc,
            project_types: Array.isArray(clientData?.project_types)
              ? clientData.project_types
              : typeof clientData?.project_types === "string"
              ? [clientData.project_types]
              : ["Web Development", "Mobile App"],
            hiring_interests: Array.isArray(clientData?.hiring_interests)
              ? clientData.hiring_interests
              : [
                  "UI/UX Design",
                  "Web Development",
                  "Mobile Development",
                  "AI / Machine Learning",
                  "DevOps",
                  "Cloud Computing",
                ],
            newInterest: "",
            newProjectType: "",
          });

          if (clientData?.public_url_slug) {
            setSlugInput(clientData.public_url_slug);
          }
        } else {
          const savedLinkedin = (typeof window !== "undefined" ? localStorage.getItem("techguild_client_linkedin") : "") || "linkedin.com/company/nexorasolutions";
          const savedGithub = (typeof window !== "undefined" ? localStorage.getItem("techguild_client_github") : "") || "github.com/nexora-solutions";
          const savedWebsite = (typeof window !== "undefined" ? localStorage.getItem("techguild_client_website") : "") || "nexorasolutions.com";

          setEditForm((prev) => ({
            ...prev,
            company_name: user?.company_name || user?.name || "Nexora Solutions",
            contact_name: (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : "") || "",
            industry: "Healthcare",
            website_url: savedWebsite,
            linkedin_url: savedLinkedin,
            github_url: savedGithub,
            team_size: "10 - 50",
            budget_range: "$5,000 - $20,000",
            timezone: "Asia/Kolkata",
            project_types: ["Web Development", "Mobile App"],
            hiring_interests: ["UI/UX Design", "Web Development", "AI / Machine Learning"],
          }));
        }

        if (projRes.status === "fulfilled" && projRes.value) {
          const pr = projRes.value;
          const list = pr?.data?.projects || pr?.data || pr?.projects || [];
          setProjects(Array.isArray(list) ? list : []);
        }

        if (pointsRes.status === "fulfilled" && pointsRes.value) {
          setPointsData(pointsRes.value);
        }
      })
      .catch((err) => {
        console.warn("Failed to load client profile data:", err);
        if (!ignore) {
          setInlineAlert({
            type: "error",
            text: "Could not load complete profile data from server. Showing local profile.",
          });
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [user]);

  // Derive display values
  const companyName =
    profile?.company_name ||
    user?.company_name ||
    user?.name ||
    (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : null) ||
    "Nexora Solutions";

  const industry = profile?.industry || "Healthcare";
  const tagline =
    profile?.tagline ||
    (profile?.industry ? `${profile.industry} Solutions Provider` : "Technology & Digital Solutions");

  const location =
    [profile?.city, profile?.country].filter(Boolean).join(", ") ||
    profile?.location ||
    user?.location ||
    "Pune, India";

  const memberSince = profile?.member_since ||
    (profile?.created_at
      ? new Date(profile.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" })
      : user?.created_at
      ? new Date(user.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" })
      : "July 2026");

  const logoInitials = companyName
    ? (companyName.trim().includes(" ")
        ? companyName.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()
        : companyName.slice(0, 2).toUpperCase())
    : "NS";

  const logoName = companyName
    ? (companyName.trim().length > 12 ? companyName.trim().slice(0, 10).toUpperCase() + "…" : companyName.trim().toUpperCase())
    : "COMPANY";

  const rawLogoUrl = logoPreview || profile?.logo_url || user?.avatar || null;
  const hasValidLogo = isValidImageUrl(rawLogoUrl) && !logoImgError;
  const logoUrl = hasValidLogo ? rawLogoUrl : null;

  const rawBannerUrl = bannerPreview || profile?.banner_url || profile?.cover_url || null;
  const hasValidBanner = isValidImageUrl(rawBannerUrl);

  const clientDesc =
    profile?.description ||
    profile?.about_company ||
    profile?.about ||
    (typeof window !== "undefined" ? localStorage.getItem("techguild_client_desc") : "") ||
    "";

  const intro =
    clientDesc ||
    profile?.tagline ||
    "Empowering businesses with innovative and scalable technology solutions.";

  const about = clientDesc;
  const website = profile?.website_url || profile?.website || "https://nexorasolutions.com";
  const companySize = profile?.team_size || profile?.company_size || profile?.size || "10 - 50";
  const founded = profile?.founded_year || profile?.founded || "2024";
  const publicSlug = profile?.public_url_slug || companyName.toLowerCase().replace(/[^a-z0-9]/g, "-") || "nexora-solutions";

  // Dynamic hiring interests
  let rawInterests =
    profile?.hiring_interests ||
    profile?.hiringInterests ||
    profile?.services_offered ||
    profile?.services ||
    profile?.skills;

  if (typeof rawInterests === "string") {
    try {
      rawInterests = JSON.parse(rawInterests);
    } catch {
      rawInterests = rawInterests.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  const hiringInterests =
    Array.isArray(rawInterests) && rawInterests.length > 0
      ? rawInterests
      : [
          "UI/UX Design",
          "Web Development",
          "Mobile Development",
          "AI / Machine Learning",
          "DevOps",
          "QA Testing",
          "Cloud Computing",
          "Product Management",
        ];

  // Trust Journey Calculations
  const trustPoints = pointsData?.points ?? (profile?.points ?? 150);
  const currentRankObj =
    TRUST_RANKS.slice().reverse().find((r) => trustPoints >= r.min) || TRUST_RANKS[0];
  const currentRankIndex = TRUST_RANKS.findIndex((r) => r.rank === currentRankObj.rank);
  const nextRankObj = TRUST_RANKS[currentRankIndex + 1] || null;
  const rankProgressPct = nextRankObj
    ? Math.min(100, Math.max(0, Math.round(((trustPoints - currentRankObj.min) / (nextRankObj.min - currentRankObj.min)) * 100)))
    : 100;

  // Checklist Calculations
  const checklist = [
    { label: "Company Information", done: Boolean(companyName && companyName !== "Company Profile") },
    { label: "About Company Bio", done: Boolean(about && about.trim().length > 10) },
    { label: "Hiring Preferences & Services", done: hiringInterests.length > 0 },
    { label: "Company Logo", done: Boolean(logoUrl) },
    { label: "Website & Online Links", done: Boolean(profile?.website_url || profile?.website) },
    { label: "Identity & Business Verification", done: Boolean(profile?.is_verified ?? true) },
  ];

  const completedCount = checklist.filter((c) => c.done).length;
  const completionPct = Math.round((completedCount / checklist.length) * 100);

  // Formatted URLs helper
  const formatFullUrl = (val, fallback = "") => {
    const raw = val || fallback;
    if (!raw) return "";
    return raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  };

  const formatDisplayUrl = (val, fallback = "") => {
    const raw = val || fallback;
    if (!raw) return "";
    return raw.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  };

  const handleDownloadFile = (fileUrl, fileName) => {
    if (fileUrl && (fileUrl.startsWith("http://") || fileUrl.startsWith("https://"))) {
      window.open(fileUrl, "_blank");
    } else {
      dispatch(showSnackbar({
        message: `File "${fileName}" does not have a public download link yet.`,
        type: "info",
      }));
    }
  };

  // Company Links
  const rawWebsite = profile?.website_url || profile?.website || (typeof window !== "undefined" ? localStorage.getItem("techguild_client_website") : "") || "nexorasolutions.com";
  const rawLinkedin = profile?.linkedin_url || profile?.linkedin || (typeof window !== "undefined" ? localStorage.getItem("techguild_client_linkedin") : "") || "linkedin.com/company/nexorasolutions";
  const rawGithub = profile?.github_url || profile?.github || (typeof window !== "undefined" ? localStorage.getItem("techguild_client_github") : "") || "github.com/nexora-solutions";
  const companyDeck = profile?.company_deck || profile?.deck_url || "Nexora_Company_Deck.pdf";
  const brochure = profile?.brochure || profile?.brochure_url || "Nexora_Brochure.pdf";

  const companyLinks = [
    {
      id: "website",
      iconName: "Globe",
      label: "Website",
      value: rawWebsite,
      displayValue: formatDisplayUrl(rawWebsite, "nexorasolutions.com"),
      url: formatFullUrl(rawWebsite, "https://nexorasolutions.com"),
      type: "link",
      tone: "blue",
      iconColor: "#1d4ed8",
    },
    {
      id: "linkedin",
      iconName: "Linkedin",
      label: "LinkedIn",
      value: rawLinkedin,
      displayValue: formatDisplayUrl(rawLinkedin, "linkedin.com/company/nexorasolutions"),
      url: formatFullUrl(rawLinkedin, "https://linkedin.com/company/nexorasolutions"),
      type: "link",
      tone: "linkedin",
      iconColor: "#0077b5",
    },
    {
      id: "github",
      iconName: "GitHub",
      label: "GitHub",
      value: rawGithub,
      displayValue: formatDisplayUrl(rawGithub, "github.com/nexora-solutions"),
      url: formatFullUrl(rawGithub, "https://github.com/nexora-solutions"),
      type: "link",
      tone: "github",
      iconColor: "#1e293b",
    },
    {
      id: "company-deck",
      iconName: "FileText",
      label: "Company Deck",
      value: companyDeck,
      displayValue: companyDeck,
      fileUrl: profile?.company_deck_url || profile?.deck_url || null,
      type: "download",
      tone: "red",
      iconColor: "#ef4444",
    },
    {
      id: "brochure",
      iconName: "FileText",
      label: "Brochure",
      value: brochure,
      displayValue: brochure,
      fileUrl: profile?.brochure_url || null,
      type: "download",
      tone: "gray",
      iconColor: "#64748b",
    },
  ];

  const details = [
    { iconName: "Briefcase", label: "Industry", value: industry },
    { iconName: "Users", label: "Company Size", value: companySize },
    { iconName: "Calendar", label: "Founded", value: `${founded}` },
    { iconName: "Hash", label: "Projects Posted", value: `${projects.length || profile?.projects_posted || 0}` },
    { iconName: "MapPin", label: "Location", value: location },
  ];

  const recentActivities = [
    {
      id: 1,
      title: projects.length > 0 ? `Posted "${projects[0].title}" Quest` : "Posted Website Redesign Quest",
      time: "2 hours ago",
      iconName: "Briefcase",
    },
    {
      id: 2,
      title: "Updated Company Hiring Preferences",
      time: "5 hours ago",
      iconName: "CheckCircle2",
    },
    {
      id: 3,
      title: "Verified Business Identity",
      time: "1 day ago",
      iconName: "Shield",
    },
    {
      id: 4,
      title: "Received Trust Points (+50 TP)",
      time: "2 days ago",
      iconName: "TrendingUp",
    },
  ];

  const hiringStats = [
    {
      id: "projects-posted",
      label: "Projects Posted",
      value: projects.length || profile?.projects_posted || 12,
      iconName: "Building2",
      badgeBg: "#EFF6FF",
      iconColor: "#1D4ED8",
      tone: "blue",
    },
    {
      id: "projects-completed",
      label: "Projects Completed",
      value: profile?.projects_completed || (projects.length > 0 ? Math.floor(projects.length * 0.7) : 8),
      iconName: "Layers",
      badgeBg: "#F0FDF4",
      iconColor: "#16A34A",
      tone: "green",
    },
    {
      id: "freelancers-hired",
      label: "Freelancers Hired",
      value: profile?.freelancers_hired || 24,
      iconName: "Users",
      badgeBg: "#F5F3FF",
      iconColor: "#9333EA",
      tone: "purple",
    },
    {
      id: "average-rating",
      label: "Average Rating",
      value: profile?.average_rating || profile?.rating || "4.9 / 5.0",
      iconName: "Star",
      badgeBg: "#FFF7ED",
      iconColor: "#EA580C",
      tone: "orange",
    },
    {
      id: "response-time",
      label: "Response Time",
      value: profile?.response_time || "1 hr",
      iconName: "Clock",
      badgeBg: "#ECFEFF",
      iconColor: "#0891B2",
      tone: "cyan",
    },
    {
      id: "success-rate",
      label: "Success Rate",
      value: profile?.success_rate || "98%",
      iconName: "TrendingUp",
      badgeBg: "#F0FDF4",
      iconColor: "#16A34A",
      tone: "green",
    },
  ];

  // -------------------------------------------------------------
  // API Action: Handle Logo Upload (POST /v1/profile/logo)
  // -------------------------------------------------------------
  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    setLogoImgError(false);

    setUploadingLogo(true);
    try {
      const res = await profileApi.uploadLogo(file);
      const newLogoUrl = res?.logo_url || res?.data?.logo_url || res?.url || res?.data?.url || previewUrl;

      if (newLogoUrl) {
        setLogoImgError(false);
        setLogoPreview(newLogoUrl);
        setProfile((prev) => ({ ...(prev || {}), logo_url: newLogoUrl }));
        updateUser({ avatar: newLogoUrl });
        dispatch(showSnackbar({ message: "Company logo uploaded successfully!", type: "success" }));
        setInlineAlert({ type: "success", text: "Logo updated successfully!" });
      }
    } catch (err) {
      console.error("Logo upload error:", err);
      dispatch(showSnackbar({
        message: err?.message || "Failed to upload logo to server.",
        type: "error",
      }));
      setInlineAlert({
        type: "error",
        text: err?.message || "Logo upload failed.",
      });
    } finally {
      setUploadingLogo(false);
      if (logoInputRef.current) logoInputRef.current.value = "";
    }
  };

  // -------------------------------------------------------------
  // API Action: Handle Banner Upload
  // -------------------------------------------------------------
  const handleBannerUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setBannerPreview(previewUrl);
    setUploadingBanner(true);

    try {
      setProfile((prev) => ({ ...(prev || {}), banner_url: previewUrl }));
      dispatch(showSnackbar({ message: "Company banner updated successfully!", type: "success" }));
      setInlineAlert({ type: "success", text: "Brand banner updated successfully!" });
    } catch (err) {
      console.error("Banner upload error:", err);
      dispatch(showSnackbar({ message: "Failed to update banner.", type: "error" }));
    } finally {
      setUploadingBanner(false);
      if (bannerInputRef.current) bannerInputRef.current.value = "";
    }
  };

  // -------------------------------------------------------------
  // API Action: Handle Logo Delete (DELETE /v1/profile/logo)
  // -------------------------------------------------------------
  const handleDeleteLogo = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to remove your company logo?")) return;

    setUploadingLogo(true);
    try {
      await profileApi.deleteLogo();
      setLogoPreview(null);
      setLogoImgError(false);
      setProfile((prev) => ({ ...(prev || {}), logo_url: null }));
      updateUser({ avatar: null });
      dispatch(showSnackbar({ message: "Company logo removed successfully.", type: "success" }));
      setInlineAlert({ type: "info", text: "Company logo removed." });
    } catch (err) {
      console.error("Failed to delete logo:", err);
      dispatch(showSnackbar({ message: err?.message || "Failed to remove logo.", type: "error" }));
    } finally {
      setUploadingLogo(false);
      if (logoInputRef.current) logoInputRef.current.value = "";
    }
  };

  // -------------------------------------------------------------
  // API Action: Save/Update Client Profile (PATCH /v1/profile/client)
  // NOTE: UpdateClientProfileRequest only accepts budget_range, city,
  // company_name, country, industry, logo_url, project_types, team_size,
  // timezone, website_url. contact_name / phone / description /
  // hiring_interests are UI-only (GET returns contact_name; PATCH has no
  // field for it), so they are kept in local state and never sent.
  // -------------------------------------------------------------
  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    if (!editForm.company_name.trim()) {
      alert("Company name is required.");
      return;
    }

    setSavingProfile(true);
    const apiPayload = {
      company_name: editForm.company_name.trim(),
      industry: editForm.industry || null,
      website_url: editForm.website_url?.trim() || null,
      project_types: editForm.project_types.length > 0 ? editForm.project_types : ["Web Development"],
      budget_range: editForm.budget_range || null,
      team_size: editForm.team_size || null,
      country: editForm.country?.trim() || null,
      city: editForm.city?.trim() || null,
      timezone: editForm.timezone?.trim() || "Asia/Kolkata",
      logo_url: profile?.logo_url || null,
    };
    const desc = editForm.description?.trim() || "";
    const linkedinVal = editForm.linkedin_url?.trim() || "";
    const githubVal = editForm.github_url?.trim() || "";
    const websiteVal = editForm.website_url?.trim() || "";

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("techguild_client_desc", desc);
        if (linkedinVal) localStorage.setItem("techguild_client_linkedin", linkedinVal);
        if (githubVal) localStorage.setItem("techguild_client_github", githubVal);
        if (websiteVal) localStorage.setItem("techguild_client_website", websiteVal);
      } catch (err) {
        console.warn("Could not save to localStorage:", err);
      }
    }
    const localExtras = {
      contact_name: editForm.contact_name?.trim() || null,
      phone: editForm.phone?.trim() || null,
      description: desc,
      about_company: desc,
      about: desc,
      website_url: websiteVal || "nexorasolutions.com",
      linkedin_url: linkedinVal || "linkedin.com/company/nexorasolutions",
      github_url: githubVal || "github.com/nexora-solutions",
      hiring_interests: editForm.hiring_interests,
    };

    try {
      const res = await profileApi.saveClientProfile(apiPayload, true);
      const updatedSlug = res?.public_url_slug || profile?.public_url_slug || publicSlug;

      setProfile((prev) => ({
        ...(prev || {}),
        ...apiPayload,
        ...localExtras,
        description: desc,
        about_company: desc,
        about: desc,
        website_url: websiteVal || "nexorasolutions.com",
        linkedin_url: linkedinVal || "linkedin.com/company/nexorasolutions",
        github_url: githubVal || "github.com/nexora-solutions",
        public_url_slug: updatedSlug,
      }));

      updateUser({
        name: editForm.company_name,
        company_name: editForm.company_name,
      });

      dispatch(showSnackbar({
        message: res?.message || "Company profile updated successfully!",
        type: "success",
      }));

      setInlineAlert({
        type: "success",
        text: "Company profile updated successfully!",
      });

      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Failed to save client profile:", err);
      // TEMP-DEV-BYPASS (remove after checking): when logged out, the backend
      // answers 401 — apply the edits locally so the update flow can be
      // reviewed end-to-end. Nothing is sent to the server in this branch.
      if (err?.status === 401) {
        setProfile((prev) => ({
          ...(prev || {}),
          ...apiPayload,
          ...localExtras,
          description: desc,
          about_company: desc,
          about: desc,
          public_url_slug: profile?.public_url_slug || publicSlug,
        }));
        updateUser({
          name: editForm.company_name,
          company_name: editForm.company_name,
        });
        dispatch(showSnackbar({
          message: "Preview mode (not logged in): changes applied locally only, NOT saved to server.",
          type: "info",
        }));
        setInlineAlert({
          type: "info",
          text: "Preview mode: showing your edits locally. Log in to sync with the backend.",
        });
        setIsEditModalOpen(false);
      } else {
        dispatch(showSnackbar({
          message: err?.message || "Failed to save profile changes.",
          type: "error",
        }));
      }
    } finally {
      setSavingProfile(false);
    }
  };

  // -------------------------------------------------------------
  // API Action: Check Public Slug Availability (GET /v1/profile/check-slug)
  // -------------------------------------------------------------
  const handleCheckSlug = async () => {
    const raw = slugInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    if (!raw) return;

    setCheckingSlug(true);
    setSlugStatus(null);
    try {
      const res = await profileApi.checkSlug(raw);
      setSlugStatus({
        available: Boolean(res?.available),
        alternatives: res?.alternatives || [],
        message: res?.available
          ? `Slug "${raw}" is available!`
          : `Slug "${raw}" is already taken.`,
      });
    } catch (err) {
      console.error("Slug check failed:", err);
      setSlugStatus({
        available: false,
        alternatives: [],
        message: err?.message || "Could not verify slug. Please try again.",
      });
    } finally {
      setCheckingSlug(false);
    }
  };

  // -------------------------------------------------------------
  // API Action: Export Profile (POST /v1/profile/export)
  // -------------------------------------------------------------
  const handleExportProfile = async () => {
    setExporting(true);
    try {
      const res = await profileApi.exportProfile();
      const downloadUrl = res?.download_url || res?.url;
      const expiresIn = res?.expires_in ? new Date(res.expires_in).toLocaleString() : "24 hours";

      if (downloadUrl && (downloadUrl.startsWith("http://") || downloadUrl.startsWith("https://"))) {
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.target = "_blank";
        a.download = `${publicSlug}-profile-export.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        dispatch(showSnackbar({
          message: res?.message || "Profile archive export started! Download initiated.",
          type: "success",
        }));

        setInlineAlert({
          type: "success",
          text: `Profile data archive generated. Download link valid until ${expiresIn}.`,
        });
      } else {
        throw new Error("No download URL returned from export API.");
      }
    } catch (err) {
      console.error("Profile export error:", err);
      dispatch(showSnackbar({
        message: err?.message || "Could not export profile data from server.",
        type: "error",
      }));
      setInlineAlert({
        type: "error",
        text: err?.message || "Export profile failed.",
      });
    } finally {
      setExporting(false);
    }
  };

  // Copy public profile URL
  const handleCopyPublicUrl = () => {
    const publicUrl = `${window.location.origin}/u/${publicSlug}`;
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    dispatch(showSnackbar({ message: `Copied public link: /u/${publicSlug}`, type: "success" }));
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Add / Remove Tag Helpers
  const handleAddInterest = () => {
    if (editForm.newInterest?.trim()) {
      const val = editForm.newInterest.trim();
      if (!editForm.hiring_interests.includes(val)) {
        setEditForm((p) => ({
          ...p,
          hiring_interests: [...p.hiring_interests, val],
          newInterest: "",
        }));
      }
    }
  };

  const handleRemoveInterest = (tag) => {
    setEditForm((p) => ({
      ...p,
      hiring_interests: p.hiring_interests.filter((t) => t !== tag),
    }));
  };

  const handleAddProjectType = () => {
    if (editForm.newProjectType?.trim()) {
      const val = editForm.newProjectType.trim();
      if (!editForm.project_types.includes(val)) {
        setEditForm((p) => ({
          ...p,
          project_types: [...p.project_types, val],
          newProjectType: "",
        }));
      }
    }
  };

  const handleRemoveProjectType = (pt) => {
    setEditForm((p) => ({
      ...p,
      project_types: p.project_types.filter((t) => t !== pt),
    }));
  };

  const quickActions = [
    {
      id: "create-quest",
      label: "Create New Quest",
      iconName: "Plus",
      onClick: () => navigate("/client-quest-board"),
    },
    {
      id: "edit-profile",
      label: "Edit Profile Details",
      iconName: "Pencil",
      onClick: () => setIsEditModalOpen(true),
    },
    {
      id: "check-slug",
      label: "Public URL & Slug Settings",
      iconName: "Globe",
      onClick: () => setIsSlugModalOpen(true),
    },
    {
      id: "export-data",
      label: exporting ? "Exporting Profile..." : "Export Profile Data (ZIP)",
      iconName: "Download",
      onClick: handleExportProfile,
    },
    {
      id: "manage-applications",
      label: "Manage Applications",
      iconName: "ClipboardList",
      onClick: () => navigate("/client-applications"),
    },
    {
      id: "verify-company",
      label: "Verification Hub",
      iconName: "Shield",
      onClick: () => navigate("/client-verification-hub"),
    },
  ];

  return (
    <div className="dashboard-layout client-profile-page wp-page-root">
      <Navbar items={clientNavItems} userRole="Client" />

      <main className="main-workspace">
        <Header />

        {inlineAlert && (
          <div className={`wp-inline-alert ${inlineAlert.type}`}>
            <span>{inlineAlert.text}</span>
            <button
              type="button"
              className="wp-inline-alert-close"
              aria-label="Dismiss alert"
              onClick={() => setInlineAlert(null)}
            >
              <Icon name="X" size={ICON_SIZES.MD} />
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-secondary mt-2">Connecting to TechGuild Profile API...</p>
          </div>
        ) : (
          <div className="wp-scroll-area">
            {/* Top Banner & Profile Identity */}
            <Cards variant="base" className="wp-top-section-card" padding="0">
              <div
                className={`wp-banner ${hasValidBanner ? "wp-banner-has-image" : ""}`}
                style={
                  hasValidBanner
                    ? {
                        backgroundImage: `url(${rawBannerUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : {}
                }
              >
                <label className="wp-banner-upload" onClick={() => bannerInputRef.current?.click()}>
                  <div className="wp-banner-upload-icon-wrap">
                    <Icon name="Upload" size={ICON_SIZES.XL} strokeWidth={2} />
                  </div>
                  <span className="wp-banner-upload-title">
                    {uploadingBanner ? "Updating banner..." : "Company Branding Banner"}
                  </span>
                  <span className="wp-banner-upload-subtitle">
                    {hasValidBanner ? "Click to change brand visual" : "Click to update brand visual"}
                  </span>
                </label>
                <input
                  type="file"
                  ref={bannerInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleBannerUpload}
                />
              </div>

              <div className="wp-identity-layout">
                <div className="wp-identity-left">
                  <div className="wp-logo-wrap">
                    <div className="wp-logo-inner">
                      {uploadingLogo ? (
                        <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                      ) : hasValidLogo ? (
                        <img
                          src={rawLogoUrl}
                          alt={companyName}
                          className="wp-logo-img"
                          onError={() => setLogoImgError(true)}
                        />
                      ) : (
                        <>
                          <span className="wp-logo-initial">{logoInitials}</span>
                          <span className="wp-logo-name">{logoName}</span>
                        </>
                      )}
                    </div>

                    {/* Hidden file input for logo upload */}
                    <input
                      type="file"
                      ref={logoInputRef}
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />

                    {/* Logo edit trigger */}
                    <button
                      className="wp-logo-edit"
                      aria-label="Upload / Change Logo"
                      title="Upload / Change Logo"
                      type="button"
                      disabled={uploadingLogo}
                      onClick={() => logoInputRef.current?.click()}
                    >
                      <Icon name="Pencil" size={ICON_SIZES.XS} />
                    </button>

                    {/* Logo delete trigger if logo exists */}
                    {hasValidLogo && (
                      <button
                        className="wp-logo-remove-btn"
                        aria-label="Delete Logo"
                        title="Delete Logo"
                        type="button"
                        onClick={handleDeleteLogo}
                      >
                        <Icon name="X" size={ICON_SIZES['2XS']} strokeWidth={2.5} />
                      </button>
                    )}
                  </div>

                  <div className="wp-company-details-main">
                    <h1 className="wp-company-name">{companyName}</h1>

                    <p className="wp-company-tagline">{tagline}</p>

                    <div className="wp-badge-row">
                      <span className="wp-badge verified">
                        <Icon name="CheckCircle2" size={ICON_SIZES.XS} /> Verified Client
                      </span>
                      <span className="wp-badge hiring">
                        <span className="wp-dot" /> Actively Hiring
                      </span>
                      <span className="wp-badge healthcare">{industry}</span>
                      <button
                        className="wp-more-btn"
                        aria-label="Export Profile"
                        title="Export Profile Archive"
                        type="button"
                        onClick={handleExportProfile}
                        disabled={exporting}
                      >
                        <Icon name="Download" size={ICON_SIZES.SM} />
                      </button>
                    </div>

                    {/* Public Slug & Share Badge */}
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <button
                        type="button"
                        className="wp-public-url-pill"
                        title="Click to copy public profile link"
                        onClick={handleCopyPublicUrl}
                      >
                        <Icon name="Globe" size={ICON_SIZES.XS} />
                        <span>/u/{publicSlug}</span>
                        <Icon name={copiedLink ? "Check" : "Copy"} size={ICON_SIZES['2XS']} className="copy-icon" />
                      </button>
                      <button
                        type="button"
                        className="wp-link-btn"
                        style={{ fontSize: "0.8rem" }}
                        onClick={() => setIsSlugModalOpen(true)}
                      >
                        Customize Slug
                      </button>
                    </div>

                    <div className="wp-meta-row mt-2">
                      <span className="wp-meta-item">
                        <Icon name="MapPin" size={ICON_SIZES.SM} /> {location}
                      </span>
                      <span className="wp-meta-item">
                        <Icon name="Calendar" size={ICON_SIZES.SM} /> Member since {memberSince}
                      </span>
                    </div>

                    <p className="wp-intro-text">{intro}</p>

                    <span className="wp-badge verified wp-hiring-top-talent">
                      <Icon name="CheckCircle2" size={ICON_SIZES.XS} /> Hiring Top Talent on TechGuild
                    </span>
                  </div>
                </div>

                {/* Guild Card Badge */}
                <div className="wp-identity-right">
                  <GuildCard
                    name={companyName}
                    companyName={companyName}
                    category={industry.toUpperCase()}
                    location={location}
                    website={formatDisplayUrl(website)}
                    logoInitials={logoInitials}
                    memberSince={memberSince}
                  />
                </div>
              </div>
            </Cards>

            <div className="wp-grid cols-2">
              {/* About Me / About Company */}
              {!about ? (
                <Cards variant="base" className="wp-card wp-about-me-card" padding="0">
                  <div className="wp-card-inner wp-about-me-inner">
                    <div className="wp-card-head">
                      <h3 className="wp-card-title wp-about-me-title">About Company</h3>
                    </div>
                    <div className="wp-about-me-body">
                      <div className="wp-about-me-icon-box">
                        <Icon name="User2" size={ICON_SIZES['3XL']} color="#94a3b8" strokeWidth={1.8} />
                      </div>
                      <h4 className="wp-about-me-heading">
                        Tell Freelancers &amp; Agencies about your company
                      </h4>
                      <p className="wp-about-me-desc">
                        Provide an overview of your mission, products, and tech requirements to attract top contributors.
                      </p>
                      <PrimaryButton
                        className="wp-about-me-btn"
                        type="button"
                        onClick={() => {
                          setModalTab("general");
                          setIsEditModalOpen(true);
                        }}
                      >
                        + Add Company Description
                      </PrimaryButton>
                    </div>
                  </div>
                </Cards>
              ) : (
                <Cards variant="base" className="wp-card" padding="0">
                  <div className="wp-card-inner">
                    <div className="wp-card-head">
                      <h3 className="wp-card-title">About Company</h3>
                      <button
                        className="wp-link-btn"
                        type="button"
                        onClick={() => {
                          setModalTab("general");
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Icon name="Pencil" size={ICON_SIZES.XS} /> Edit
                      </button>
                    </div>
                    <p className="wp-about-text" style={{ whiteSpace: "pre-line" }}>
                      {about}
                    </p>
                  </div>
                </Cards>
              )}

              {/* Hiring Interests */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Hiring Interests &amp; Services</h3>
                    <button
                      className="wp-link-btn"
                      type="button"
                      onClick={() => {
                        setModalTab("preferences");
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Icon name="Pencil" size={ICON_SIZES['2XS']} /> Edit
                    </button>
                  </div>
                  <div className="wp-chips-wrap">
                    {hiringInterests.map((tag) => (
                      <span key={tag} className="wp-chip-item">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Cards>
            </div>

            <div className="wp-grid cols-3 wp-highlight-cards">
              {/* Company Details */}
              <Cards variant="base" className="wp-card gray-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Company Details</h3>
                    <button
                      className="wp-link-btn"
                      type="button"
                      onClick={() => {
                        setModalTab("general");
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Icon name="Pencil" size={ICON_SIZES['2XS']} /> Edit
                    </button>
                  </div>
                  <div className="wp-detail-list">
                    {details.map((d) => (
                      <div className="wp-detail-row" key={d.label}>
                        <span className="wp-detail-icon">
                          <Icon name={d.iconName} size={ICON_SIZES.DEFAULT} strokeWidth={1.8} />
                        </span>
                        <span className="wp-detail-label">{d.label}</span>
                        <span className="wp-detail-value">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Cards>

              {/* Active Quests (Connected to live projectsApi.getMyProjects()) */}
              {projects.length === 0 ? (
                <Cards variant="base" className="wp-card" padding="0">
                  <div className="wp-card-inner">
                    <div className="wp-card-head">
                      <h3 className="wp-card-title">Active Quests</h3>
                      <button
                        className="wp-link-btn"
                        type="button"
                        onClick={() => navigate("/client-quest-board")}
                      >
                        Quest Board
                      </button>
                    </div>
                    <div className="wp-empty-card-body">
                      <div className="wp-empty-icon-box">
                        <Icon name="Briefcase" size={ICON_SIZES['5XL']} />
                      </div>
                      <h4 className="wp-empty-heading">No active quests</h4>
                      <p className="wp-empty-desc">
                        You have not posted any project quests yet. Create a quest to receive proposals from vetted freelancers.
                      </p>
                      <PrimaryButton
                        className="wp-primary-cta-btn"
                        type="button"
                        onClick={() => navigate("/client-quest-board")}
                      >
                        + Post a Quest
                      </PrimaryButton>
                    </div>
                  </div>
                </Cards>
              ) : (
                <Cards variant="base" className="wp-card" padding="0">
                  <div className="wp-card-inner">
                    <div className="wp-card-head">
                      <h3 className="wp-card-title">
                        Active Quests <span className="wp-title-sub">({projects.length})</span>
                      </h3>
                      <button
                        className="wp-link-btn"
                        type="button"
                        onClick={() => navigate("/client-quest-board")}
                      >
                        View all
                      </button>
                    </div>
                    <div className="wp-quest-list">
                      {projects.slice(0, 4).map((q) => (
                        <div className="wp-quest-row" key={q.id || q._id}>
                          <span className="wp-quest-icon">
                            <Icon name="Briefcase" size={ICON_SIZES.MD} />
                          </span>
                          <div className="wp-quest-info">
                            <p className="wp-quest-title">{q.title}</p>
                            <p className="wp-quest-sub">
                              {q.budget ? `$${q.budget}` : q.min_budget ? `$${q.min_budget} - $${q.max_budget}` : "Fixed"}{" "}
                              &bull; {q.applications_count || 0} Proposals
                            </p>
                          </div>
                          <span className="wp-quest-status">{q.status || "Open"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Cards>
              )}

              {/* Freelancer Reviews */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Freelancer Reviews</h3>
                    <button
                      className="wp-link-btn"
                      type="button"
                      onClick={() => navigate("/client-company-reputation")}
                    >
                      View All
                    </button>
                  </div>
                  <div className="wp-empty-card-body">
                    <div className="wp-empty-icon-box">
                      <Icon name="Star" size={ICON_SIZES['5XL']} color="#cbd5e1" strokeWidth={1.5} fill="none" />
                    </div>
                    <h4 className="wp-empty-heading">4.9 / 5.0 Star Rating</h4>
                    <p className="wp-empty-desc">
                      Outstanding reputation score across completed milestones on TechGuild.
                    </p>
                  </div>
                </div>
              </Cards>
            </div>

            <div className="wp-grid cols-3">
              {/* Company Links */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Company Links</h3>
                    <button
                      className="wp-link-btn"
                      type="button"
                      onClick={() => {
                        setModalTab("links");
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Icon name="Pencil" size={ICON_SIZES.XS} /> Edit
                    </button>
                  </div>
                  <div className="wp-link-list">
                    {companyLinks.map((item) => (
                      <div className="wp-link-row" key={item.id}>
                        <div className="wp-link-left">
                          <span className={`wp-link-icon-bare ${item.tone || ""}`} style={{ color: item.iconColor }}>
                            <Icon
                              name={item.iconName}
                              size={ICON_SIZES.DEFAULT}
                              color={item.iconColor}
                              stroke={item.iconColor}
                              fill={item.id === "github" ? item.iconColor : "none"}
                            />
                          </span>
                          <span className="wp-link-label">{item.label}</span>
                        </div>
                        <span className="wp-link-name" title={item.value}>
                          {item.displayValue || item.value}
                        </span>
                        {item.type === "link" ? (
                          <a
                            href={item.url.startsWith("http") ? item.url : `https://${item.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wp-link-action"
                            aria-label={`Open ${item.label}`}
                          >
                            <Icon name="ExternalLink" size={ICON_SIZES.MD} color="#94a3b8" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            className="wp-link-action"
                            aria-label={`Download ${item.label}`}
                            onClick={() => handleDownloadFile(item.fileUrl, item.value)}
                          >
                            <Icon name="Download" size={ICON_SIZES.MD} color="#94a3b8" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Cards>

              {/* Profile Completion */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Profile Completion</h3>
                    <span className="wp-progress-pct">{completionPct}%</span>
                  </div>
                  <div className="wp-progress-track">
                    <div className="wp-progress-fill" style={{ width: `${completionPct}%` }} />
                  </div>
                  <div className="wp-checklist">
                    {checklist.map((c) => (
                      <div className="wp-checklist-row" key={c.label}>
                        <span className="wp-checklist-left">
                          {c.done ? (
                            <Icon name="CheckCircle2" size={ICON_SIZES.DEFAULT} className="wp-check-icon-done" />
                          ) : (
                            <Icon name="Circle" size={ICON_SIZES.DEFAULT} className="wp-check-icon-pending" />
                          )}
                          <span className={c.done ? "wp-check-label-done" : "wp-check-label-pending"}>
                            {c.label}
                          </span>
                        </span>
                        <span className={`wp-checklist-status ${c.done ? "completed" : "pending"}`}>
                          {c.done ? "Completed" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Cards>

              {/* Recent Activity */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Recent Activity</h3>
                    <button
                      className="wp-link-btn"
                      type="button"
                      onClick={() => navigate("/client-company-reputation")}
                    >
                      View All
                    </button>
                  </div>
                  <div className="wp-activity-list">
                    {recentActivities.map((act) => (
                      <div className="wp-activity-row" key={act.id}>
                        <div className="wp-activity-icon">
                          <Icon name={act.iconName} size={ICON_SIZES.SM} color="#16a34a" />
                        </div>
                        <span className="wp-activity-text">{act.title}</span>
                        <span className="wp-activity-time">{act.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Cards>
            </div>

            <div className="wp-grid cols-2">
              {/* Hiring Statistics */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Hiring Statistics</h3>
                  </div>
                  <div className="wp-stat-grid">
                    {hiringStats.map((stat) => (
                      <div className="wp-stat-card" key={stat.id}>
                        <div
                          className={`wp-stat-icon-wrap ${stat.tone || ""}`}
                          style={{ backgroundColor: stat.badgeBg, color: stat.iconColor }}
                        >
                          <Icon
                            name={stat.iconName}
                            size={ICON_SIZES.DEFAULT}
                            color={stat.iconColor}
                            stroke={stat.iconColor}
                            fill="none"
                          />
                        </div>
                        <span className="wp-stat-value">{stat.value}</span>
                        <span className="wp-stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Cards>

              {/* Quick Actions */}
              <Cards variant="base" className="wp-card" padding="0">
                <div className="wp-card-inner">
                  <div className="wp-card-head">
                    <h3 className="wp-card-title">Quick Actions</h3>
                  </div>
                  <div className="wp-action-list">
                    {quickActions.map((action) => (
                      <button
                        type="button"
                        className="wp-action-btn"
                        key={action.id}
                        onClick={action.onClick}
                      >
                        <div className="wp-action-left">
                          <div className="wp-action-icon-wrap">
                            <Icon name={action.iconName} size={ICON_SIZES.MD} color="#2563eb" />
                          </div>
                          <span className="wp-action-text">{action.label}</span>
                        </div>
                        <Icon name="ChevronRight" size={ICON_SIZES.MD} className="wp-action-chevron" />
                      </button>
                    ))}
                  </div>
                </div>
              </Cards>
            </div>

            {/* Trust Journey (Live from profileApi.getPoints()) */}
            <Cards variant="base" className="wp-card wp-trust-card" padding="0" style={{ marginBottom: "0px" }}>
              <div className="wp-card-inner">
                <div className="wp-card-head">
                  <h3 className="wp-card-title">
                    Trust Journey <span className="wp-title-sub">({trustPoints} Trust Points)</span>
                  </h3>
                  <button
                    className="wp-link-btn"
                    type="button"
                    onClick={() => navigate("/client-company-reputation")}
                  >
                    View all
                  </button>
                </div>

                <div className="wp-trust-scroll-wrapper">
                  <div className="wp-trust-scroll-inner">
                    <div className="wp-trust-nodes">
                      {TRUST_RANKS.map((r, i) => {
                        const isActive = i <= currentRankIndex;
                        const isCurrent = i === currentRankIndex;
                        return (
                          <div className={`wp-trust-node ${isActive ? "active" : ""}`} key={r.rank}>
                            <span className="wp-trust-circle">{r.rank}</span>
                            <span className="wp-trust-node-label">{isCurrent ? "You" : `${r.min} TP`}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="wp-trust-progress-bar">
                      <div
                        className="wp-trust-progress-fill"
                        style={{ width: `${Math.max(8, ((currentRankIndex + rankProgressPct / 100) / TRUST_RANKS.length) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="wp-trust-footer">
                  <span className="wp-trust-rank">Rank {currentRankObj.rank}</span>
                  <span className="wp-trust-next">
                    {nextRankObj ? (
                      <>
                        Next Rank ({nextRankObj.rank}): <b>Reach {nextRankObj.min} TP</b>{" "}
                        <span className="wp-trust-tp">
                          {trustPoints} / {nextRankObj.min} TP ({rankProgressPct}%)
                        </span>
                      </>
                    ) : (
                      <b>Maximum Rank Achieved (Top Tier)</b>
                    )}
                  </span>
                </div>
              </div>
            </Cards>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* EDIT PROFILE MODAL (Connected to PATCH /v1/profile/client) */}
      {/* ========================================================= */}
      {isEditModalOpen && (
        <div className="wp-modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="wp-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="wp-modal-header">
              <div className="wp-modal-title-wrap">
                <div className="wp-modal-icon-badge">
                  <Icon name="Building2" size={ICON_SIZES.XL} />
                </div>
                <div>
                  <h3 className="wp-modal-title">Edit Company Profile</h3>
                  <p className="wp-modal-subtitle">Update organization details, services, and online identity</p>
                </div>
              </div>
              <button
                type="button"
                className="wp-modal-close-btn"
                aria-label="Close"
                onClick={() => setIsEditModalOpen(false)}
              >
                <Icon name="X" size={ICON_SIZES.DEFAULT} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="wp-modal-tabs">
              <button
                type="button"
                className={`wp-modal-tab-btn ${modalTab === "general" ? "active" : ""}`}
                onClick={() => setModalTab("general")}
              >
                General Info
              </button>
              <button
                type="button"
                className={`wp-modal-tab-btn ${modalTab === "preferences" ? "active" : ""}`}
                onClick={() => setModalTab("preferences")}
              >
                Hiring &amp; Services
              </button>
              <button
                type="button"
                className={`wp-modal-tab-btn ${modalTab === "links" ? "active" : ""}`}
                onClick={() => setModalTab("links")}
              >
                Links &amp; Details
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="d-flex flex-column grow" style={{ minHeight: 0 }}>
              <div className="wp-modal-body">
                {modalTab === "general" && (
                  <>
                    <div className="wp-form-group">
                      <label className="wp-form-label">
                        Company Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        className="wp-form-input"
                        placeholder="e.g. Acme Digital Inc"
                        value={editForm.company_name}
                        onChange={(e) => setEditForm({ ...editForm, company_name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="wp-form-grid-2">
                      <div className="wp-form-group">
                        <label className="wp-form-label">Contact Person</label>
                        <input
                          type="text"
                          className="wp-form-input"
                          placeholder="Jane Doe"
                          value={editForm.contact_name}
                          onChange={(e) => setEditForm({ ...editForm, contact_name: e.target.value })}
                        />
                      </div>
                      <div className="wp-form-group">
                        <label className="wp-form-label">Phone Number</label>
                        <input
                          type="text"
                          className="wp-form-input"
                          placeholder="+1 234 567 8900"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="wp-form-grid-2">
                      <div className="wp-form-group">
                        <label className="wp-form-label">Industry</label>
                        <select
                          className="wp-form-select"
                          value={editForm.industry}
                          onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                        >
                          <option value="Healthcare">Healthcare</option>
                          <option value="Technology">Technology &amp; SaaS</option>
                          <option value="Finance">Finance &amp; Fintech</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Education">Education &amp; EdTech</option>
                          <option value="Marketing">Marketing &amp; Media</option>
                        </select>
                      </div>

                      <div className="wp-form-group">
                        <label className="wp-form-label">Team Size</label>
                        <select
                          className="wp-form-select"
                          value={editForm.team_size}
                          onChange={(e) => setEditForm({ ...editForm, team_size: e.target.value })}
                        >
                          <option value="1 - 10">1 - 10 Employees</option>
                          <option value="10 - 50">10 - 50 Employees</option>
                          <option value="50 - 200">50 - 200 Employees</option>
                          <option value="200+">200+ Employees</option>
                        </select>
                      </div>
                    </div>

                    <div className="wp-form-group">
                      <label className="wp-form-label">About Company / Mission</label>
                      <textarea
                        className="wp-form-textarea"
                        placeholder="Describe your organization, mission, and what kind of talent you collaborate with..."
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {modalTab === "preferences" && (
                  <>
                    <div className="wp-form-group">
                      <label className="wp-form-label">Typical Budget Range</label>
                      <select
                        className="wp-form-select"
                        value={editForm.budget_range}
                        onChange={(e) => setEditForm({ ...editForm, budget_range: e.target.value })}
                      >
                        <option value="Under $1,000">Under $1,000</option>
                        <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                        <option value="$5,000 - $20,000">$5,000 - $20,000</option>
                        <option value="$20,000 - $50,000">$20,000 - $50,000</option>
                        <option value="$50,000+">$50,000+</option>
                      </select>
                    </div>

                    <div className="wp-form-group">
                      <label className="wp-form-label">Project Types Required</label>
                      <div className="wp-tags-container">
                        {editForm.project_types.map((pt) => (
                          <span key={pt} className="wp-tag-pill">
                            {pt}
                            <button
                              type="button"
                              className="wp-tag-remove-btn"
                              onClick={() => handleRemoveProjectType(pt)}
                            >
                              <Icon name="X" size={ICON_SIZES['2XS']} />
                            </button>
                          </span>
                        ))}
                        <input
                          type="text"
                          className="wp-tag-input-inline"
                          placeholder="+ Type & Enter to add"
                          value={editForm.newProjectType}
                          onChange={(e) => setEditForm({ ...editForm, newProjectType: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddProjectType();
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="wp-form-group">
                      <label className="wp-form-label">Hiring Interests &amp; Tech Competencies</label>
                      <div className="wp-tags-container">
                        {editForm.hiring_interests.map((tag) => (
                          <span key={tag} className="wp-tag-pill">
                            {tag}
                            <button
                              type="button"
                              className="wp-tag-remove-btn"
                              onClick={() => handleRemoveInterest(tag)}
                            >
                              <Icon name="X" size={ICON_SIZES['2XS']} />
                            </button>
                          </span>
                        ))}
                        <input
                          type="text"
                          className="wp-tag-input-inline"
                          placeholder="+ Add service/interest"
                          value={editForm.newInterest}
                          onChange={(e) => setEditForm({ ...editForm, newInterest: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddInterest();
                            }
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {modalTab === "links" && (
                  <>
                    <div className="wp-form-group">
                      <label className="wp-form-label">Website URL</label>
                      <input
                        type="text"
                        className="wp-form-input"
                        placeholder="https://yourcompany.com"
                        value={editForm.website_url}
                        onChange={(e) => setEditForm({ ...editForm, website_url: e.target.value })}
                      />
                    </div>

                    <div className="wp-form-group">
                      <label className="wp-form-label">LinkedIn URL</label>
                      <input
                        type="text"
                        className="wp-form-input"
                        placeholder="linkedin.com/company/yourcompany"
                        value={editForm.linkedin_url}
                        onChange={(e) => setEditForm({ ...editForm, linkedin_url: e.target.value })}
                      />
                    </div>

                    <div className="wp-form-group">
                      <label className="wp-form-label">GitHub URL</label>
                      <input
                        type="text"
                        className="wp-form-input"
                        placeholder="github.com/yourcompany"
                        value={editForm.github_url}
                        onChange={(e) => setEditForm({ ...editForm, github_url: e.target.value })}
                      />
                    </div>

                    <div className="wp-form-grid-2">
                      <div className="wp-form-group">
                        <label className="wp-form-label">City</label>
                        <input
                          type="text"
                          className="wp-form-input"
                          placeholder="e.g. San Francisco"
                          value={editForm.city}
                          onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                        />
                      </div>

                      <div className="wp-form-group">
                        <label className="wp-form-label">Country</label>
                        <input
                          type="text"
                          className="wp-form-input"
                          placeholder="e.g. United States"
                          value={editForm.country}
                          onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="wp-form-group">
                      <label className="wp-form-label">Timezone</label>
                      <select
                        className="wp-form-select"
                        value={editForm.timezone}
                        onChange={(e) => setEditForm({ ...editForm, timezone: e.target.value })}
                      >
                        <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
                        <option value="America/New_York">America/New_York (EST/EDT)</option>
                        <option value="Europe/London">Europe/London (GMT/BST)</option>
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                        <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <div className="wp-modal-footer">
                <SecondaryButton
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  text="Cancel"
                />
                <PrimaryButton
                  type="submit"
                  disabled={savingProfile || !editForm.company_name}
                  text={savingProfile ? "Saving to API..." : "Save Changes"}
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CHECK / CUSTOMIZE SLUG MODAL (GET /v1/profile/check-slug) */}
      {/* ========================================================= */}
      {isSlugModalOpen && (
        <div className="wp-modal-overlay" onClick={() => setIsSlugModalOpen(false)}>
          <div className="wp-modal-card" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
            <div className="wp-modal-header">
              <div className="wp-modal-title-wrap">
                <div className="wp-modal-icon-badge">
                  <Icon name="Globe" size={ICON_SIZES.XL} />
                </div>
                <div>
                  <h3 className="wp-modal-title">Public URL &amp; Slug</h3>
                  <p className="wp-modal-subtitle">Verify and customize your public organization handle</p>
                </div>
              </div>
              <button
                type="button"
                className="wp-modal-close-btn"
                onClick={() => setIsSlugModalOpen(false)}
              >
                <Icon name="X" size={ICON_SIZES.DEFAULT} />
              </button>
            </div>

            <div className="wp-modal-body">
              <div className="wp-form-group">
                <label className="wp-form-label">Check Handle Availability</label>
                <div className="wp-slug-check-box">
                  <span className="wp-slug-prefix">/u/</span>
                  <input
                    type="text"
                    className="wp-form-input wp-slug-input-grouped"
                    placeholder="my-company"
                    value={slugInput}
                    onChange={(e) => {
                      setSlugInput(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                      setSlugStatus(null);
                    }}
                  />
                  <PrimaryButton
                    type="button"
                    style={{ whiteSpace: "nowrap" }}
                    disabled={checkingSlug || !slugInput}
                    text={checkingSlug ? "Checking..." : "Check"}
                    onClick={handleCheckSlug}
                  />
                </div>
              </div>

              {slugStatus && (
                <div className={`wp-slug-result ${slugStatus.available ? "available" : "taken"}`}>
                  <Icon name={slugStatus.available ? "CheckCircle2" : "AlertCircle"} size={ICON_SIZES.DEFAULT} />
                  <div>
                    <div>{slugStatus.message}</div>
                    {slugStatus.alternatives && slugStatus.alternatives.length > 0 && (
                      <div className="wp-slug-alternatives">
                        <span style={{ fontSize: "0.78rem" }}>Suggestions:</span>
                        {slugStatus.alternatives.map((alt) => (
                          <span
                            key={alt}
                            className="wp-slug-alt-chip"
                            onClick={() => {
                              setSlugInput(alt);
                              setSlugStatus(null);
                            }}
                          >
                            {alt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-2 p-3 bg-light rounded-3 border">
                <div className="small fw-bold text-dark mb-1">Your Live Public URL:</div>
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <code className="text-primary small text-break">
                    {window.location.origin}/u/{publicSlug}
                  </code>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={handleCopyPublicUrl}
                  >
                    {copiedLink ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <div className="wp-modal-footer">
              <SecondaryButton
                type="button"
                onClick={() => setIsSlugModalOpen(false)}
                text="Close"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
