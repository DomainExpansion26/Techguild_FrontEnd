// [TechGuild Update: 21-09-2026] Individual whole profile page, resume upload, live avatar preview & Trust rank journey
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DashboardLayout, Cards, PrimaryButton, SecondaryButton } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { GuildCard } from "@/Components/Cards/variants";
import { useAuth } from "@/context/AuthContext";
import { profileApi } from "@/features/profile/api/profileApi";
import { showSnackbar } from "@/store";
import { ICON_SIZES } from "@/constants/sizes";
import "./WholeProfile.css";

const TRUST_RANKS = ["F", "E", "D", "C", "B", "A", "S", "SS", "SSS"];
const TRUST_RANK_MIN = { F: 0, E: 100, D: 250, C: 500, B: 1000, A: 2000, S: 5000, SS: 10000, SSS: 20000 };

const FALLBACK_SKILLS = ["React", "Node.js", "TypeScript", "Next.js", "MongoDB", "Docker", "Tailwind CSS", "Express.js", "REST APIs", "GraphQL"];
const FALLBACK_TOOLS = ["Figma", "VS Code", "GitHub", "Postman", "Docker", "PostgreSQL"];
const FALLBACK_TOP_SKILLS = ["React", "Node.js", "TypeScript", "Next.js"];

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
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [pointsData, setPointsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [avatarImgError, setAvatarImgError] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [avatarJustApplied, setAvatarJustApplied] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarWrapRef = useRef(null);

  useEffect(() => {
    if (!avatarMenuOpen) return;
    const onDown = (e) => {
      if (avatarWrapRef.current && !avatarWrapRef.current.contains(e.target)) {
        setAvatarMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [avatarMenuOpen]);

  // Client-style scoped edit modal: section cards pass "about" | "skills" |
  // "experience" | "links", header passes "all" with tabs.
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editScope, setEditScope] = useState("all");
  const [modalTab, setModalTab] = useState("general");
  const [savingProfile, setSavingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    headline: "",
    bio: "",
    skills: "",
    tools: "",
    experience_level: "",
    availability: "",
    portfolio_url: "",
    github_url: "",
    linkedin_url: "",
    city: "",
    country: "",
  });

  const toCommaString = (v) => (Array.isArray(v) ? v.join(", ") : typeof v === "string" ? v : "");
  const syncEditForm = (data = {}) => {
    setEditForm({
      headline: data?.headline || "",
      bio: data?.bio || data?.about || "",
      skills: toCommaString(data?.skills),
      tools: toCommaString(data?.tools || data?.tools_technologies),
      experience_level: data?.experience_level || data?.experience || "",
      availability: data?.availability || "",
      portfolio_url: data?.portfolio_url || "",
      github_url: data?.github_url || "",
      linkedin_url: data?.linkedin_url || "",
      city: data?.city || "",
      country: data?.country || "",
    });
  };
  const openEdit = (scope = "all", tab = "general") => {
    syncEditForm(profile);
    setEditScope(scope);
    setModalTab(tab);
    setIsEditModalOpen(true);
  };
  const EDIT_SCOPE_META = {
    all: { title: "Edit Profile", subtitle: "Update headline, bio, skills and links" },
    about: { title: "Edit About Me", subtitle: "Update your headline and overview only" },
    skills: { title: "Edit Skills & Tools", subtitle: "Update skills and tools only" },
    experience: { title: "Edit Experience", subtitle: "Update experience and availability only" },
    links: { title: "Edit Portfolio & Links", subtitle: "Update portfolio and social links only" },
  };
  const editMeta = EDIT_SCOPE_META[editScope] || EDIT_SCOPE_META.all;

  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    setSavingProfile(true);
    const toArray = (v) =>
      typeof v === "string" ? v.split(",").map((s) => s.trim()).filter(Boolean) : Array.isArray(v) ? v : [];
    const merged = {
      ...(profile || {}),
      headline: editForm.headline?.trim() || null,
      bio: editForm.bio?.trim() || null,
      skills: toArray(editForm.skills),
      tools_technologies: toArray(editForm.tools),
      experience_level: editForm.experience_level || null,
      availability: editForm.availability || null,
      portfolio_url: editForm.portfolio_url?.trim() || null,
      github_url: editForm.github_url?.trim() || null,
      linkedin_url: editForm.linkedin_url?.trim() || null,
      city: editForm.city?.trim() || null,
      country: editForm.country?.trim() || null,
    };
    try {
      await profileApi.saveIndividualProfile(merged, true);
      setProfile((p) => ({ ...(p || {}), ...merged }));
      setIsEditModalOpen(false);
    } catch (err) {
      // Preview mode when logged out: apply locally so flow can be reviewed
      if (err?.status === 401) {
        setProfile((p) => ({ ...(p || {}), ...merged }));
        setIsEditModalOpen(false);
      } else {
        console.warn("Failed to save individual profile:", err);
      }
    } finally {
      setSavingProfile(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      try {
        // get-my-profile -> { account_type, individual, client, agency }
        // get-user-points -> { points, account_type, profile_complete }
        const [profRes, pointsRes] = await Promise.allSettled([
          profileApi.getMyProfile(),
          profileApi.getPoints(),
        ]);
        if (ignore) return;
        if (profRes.status === "fulfilled" && profRes.value) {
          setProfile(profRes.value?.individual || {});
        }
        if (pointsRes.status === "fulfilled" && pointsRes.value) {
          setPointsData(pointsRes.value);
        }
      } catch (err) {
        console.warn("Error fetching individual whole profile:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  // ---------- Derived display values (fallbacks match design mock) ----------
  const displayName =
    profile?.full_name ||
    user?.name ||
    (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : null) ||
    user?.email?.split("@")[0] ||
    "Arjun Mehta";

  const headline = profile?.headline || user?.headline || "Full Stack Developer";

  const city = profile?.city || "";
  const country = profile?.country || "";
  const location =
    [city, country].filter(Boolean).join(", ") ||
    profile?.location ||
    user?.location ||
    "Pune, India";

  const memberSince =
    profile?.member_since ||
    (profile?.created_at
      ? new Date(profile.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" })
      : user?.created_at
      ? new Date(user.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" })
      : "July 2026");

  const initials = displayName
    ? displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AM";

  const rawAvatarUrl = avatarPreview || profile?.avatar_url || user?.avatar || null;
  const hasValidAvatar = isValidImageUrl(rawAvatarUrl) && !avatarImgError;
  const avatarUrl = hasValidAvatar ? rawAvatarUrl : null;

  let rawSkills = profile?.skills;
  if (typeof rawSkills === "string") rawSkills = rawSkills.split(",").map((s) => s.trim()).filter(Boolean);
  const skills = Array.isArray(rawSkills) && rawSkills.length > 0 ? rawSkills : FALLBACK_SKILLS;
  const topSkills = skills.slice(0, 4).length >= 4 ? skills.slice(0, 4) : FALLBACK_TOP_SKILLS;

  let rawTools = profile?.tools || profile?.tools_technologies;
  if (typeof rawTools === "string") rawTools = rawTools.split(",").map((s) => s.trim()).filter(Boolean);
  const tools = Array.isArray(rawTools) && rawTools.length > 0 ? rawTools : FALLBACK_TOOLS;

  const bio = profile?.bio || profile?.about || "";
  const hasAbout = Boolean(bio && bio.trim().length > 0);

  const experienceLabel =
    profile?.experience_level || profile?.experience || "3+ Years";
  const specializations =
    profile?.specializations ||
    (skills.length > 0 ? `${skills[0]} · ${skills[1] || "Node.js"} · ${skills[3] || "Next.js"} · ${skills[2] || "TypeScript"}` : "React · Node.js · Next.js · TypeScript");
  const languages = profile?.languages || "English · Hindi";
  const availability = profile?.availability || "Full-time";

  const portfolioUrl = profile?.portfolio_url || "arjunmehta.dev";
  const githubUrl = profile?.github_url || "github.com/arjunmehta";
  const linkedinUrl = profile?.linkedin_url || "linkedin.com/in/arjunmehta";
  const resumeName = profile?.resume_name || profile?.resume_url?.split("/")?.pop() || "ArjunMehta_Resume.pdf";
  const resumeUrl = profile?.resume_url || null;

  // Trust journey
  const trustPoints = pointsData?.points ?? pointsData?.data?.points ?? profile?.points ?? 10;
  let currentRank = "F";
  for (const r of TRUST_RANKS) {
    if (trustPoints >= (TRUST_RANK_MIN[r] ?? 0)) currentRank = r;
  }
  const currentRankIndex = TRUST_RANKS.indexOf(currentRank);
  const nextRank = TRUST_RANKS[currentRankIndex + 1] || null;
  const nextRankMin = nextRank ? TRUST_RANK_MIN[nextRank] : null;

  // Profile completion
  const checklist = [
    { label: "Basic Information", done: true },
    { label: "Skills & Expertise", done: skills.length > 0 },
    { label: "Experience", done: true },
    { label: "About Me", done: hasAbout },
    { label: "Portfolio Projects", done: Boolean(profile?.portfolio_url) },
    { label: "Identity Verification", done: Boolean(profile?.is_verified) },
  ];
  const completedCount = checklist.filter((c) => c.done).length;

  const guildId = profile?.guild_id || "IND-MH-01-072026";

  // ---------- Handlers ----------
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    setAvatarImgError(false);
    setUploadingAvatar(true);
    try {
      const res = await profileApi.uploadAvatar(file);
      const newUrl = res?.avatar_url || res?.url;
      if (newUrl) {
        setProfile((p) => ({ ...(p || {}), avatar_url: newUrl }));
        updateUser({ avatar: newUrl });
      }
      dispatch(showSnackbar({ message: "Profile photo uploaded successfully!", type: "success" }));
      setAvatarJustApplied(true);
      setTimeout(() => setAvatarJustApplied(false), 2500);
    } catch (err) {
      dispatch(showSnackbar({ message: err?.message || "Failed to upload photo to server.", type: "error" }));
    } finally {
      setUploadingAvatar(false);
      setAvatarMenuOpen(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  const handleRemoveAvatar = async (e) => {
    e?.stopPropagation?.();
    setAvatarMenuOpen(false);
    if (!window.confirm("Are you sure you want to remove your profile photo?")) return;
    setUploadingAvatar(true);
    try {
      await profileApi.deleteAvatar();
      setAvatarPreview(null);
      setAvatarImgError(false);
      setProfile((p) => ({ ...(p || {}), avatar_url: null }));
      updateUser({ avatar: null });
      dispatch(showSnackbar({ message: "Profile photo removed successfully.", type: "success" }));
    } catch (err) {
      dispatch(showSnackbar({ message: err?.message || "Failed to remove photo.", type: "error" }));
    } finally {
      setUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await profileApi.uploadResume(file);
      const newUrl = res?.resume_url || res?.url;
      setProfile((p) => ({ ...(p || {}), resume_url: newUrl || p?.resume_url, resume_name: file.name }));
    } catch {
      setProfile((p) => ({ ...(p || {}), resume_name: file.name }));
    }
  };

  const openUrl = (val) => {
    if (!val) return;
    const url = val.startsWith("http") ? val : `https://${val}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const quickActions = [
    { id: "about", label: "Add About Me", icon: "User" },
    { id: "portfolio", label: "Upload Portfolio", icon: "Briefcase" },
    { id: "cover", label: "Upload Cover Image", icon: "Upload" },
    { id: "verify", label: "Verify Identity", icon: "Shield" },
    { id: "preview", label: "View Profile Preview", icon: "Monitor" },
  ];

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case "about":
        navigate("/profile/professional");
        break;
      case "portfolio":
        navigate("/profile/portfolio");
        break;
      case "cover":
        coverInputRef.current?.click();
        break;
      case "verify":
        navigate("/verification");
        break;
      case "preview":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <DashboardLayout containerClass="ind-wp-root" mainWorkspaceClass="ind-wp-workspace">
      <div className="ind-wp-scroll">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted small">Loading live profile from API...</p>
          </div>
        ) : (
          <>
            {/* ================= HERO / BANNER + IDENTITY ================= */}
            <Cards variant="base" className="ind-wp-hero" padding="0">
              <div
                className={`ind-wp-banner ${coverPreview ? "ind-wp-banner-has-image" : ""}`}
                style={
                  coverPreview
                    ? { backgroundImage: `url(${coverPreview})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : { background: "radial-gradient(circle, #194fd6 0%, #0c266a 80%, #081a4a 100%)", backgroundColor: "#0c266a" }
                }
              >
                <label className="ind-wp-banner-upload" onClick={() => coverInputRef.current?.click()}>
                  <div className="ind-wp-banner-upload-icon-wrap">
                    <Icon name="Upload" size={ICON_SIZES.XL} strokeWidth={2} />
                  </div>
                  <span className="ind-wp-banner-upload-title">
                    {coverPreview ? "Cover Image" : "Upload a cover image"}
                  </span>
                  <span className="ind-wp-banner-upload-subtitle">
                    {coverPreview ? "Click to change cover visual" : "Profiles with banners get more views."}
                  </span>
                </label>
                <input ref={coverInputRef} type="file" accept="image/*" hidden onChange={handleCoverChange} />
              </div>

              <div className="ind-wp-identity">
                <div className="ind-wp-identity-left">
                  <div
                    className="ind-wp-avatar"
                    ref={avatarWrapRef}
                    style={hasValidAvatar ? {} : { background: "#d9e6fd", backgroundColor: "#d9e6fd", color: "#2450a8" }}
                    title="Upload profile photo"
                  >
                    {uploadingAvatar ? (
                      <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                    ) : hasValidAvatar ? (
                      <img
                        src={avatarUrl}
                        alt={displayName}
                        onError={() => setAvatarImgError(true)}
                      />
                    ) : (
                      <span>{initials}</span>
                    )}
                    <input ref={avatarInputRef} type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                    <button
                      className="ind-wp-avatar-edit"
                      aria-label="Edit photo"
                      title="Edit photo"
                      type="button"
                      disabled={uploadingAvatar}
                      aria-expanded={avatarMenuOpen}
                      onClick={(e) => { e.stopPropagation(); setAvatarMenuOpen((o) => !o); }}
                    >
                      <Icon name={avatarJustApplied ? "Check" : "Pencil"} size={ICON_SIZES.XS} />
                    </button>
                    {avatarMenuOpen && (
                      <div className="ind-wp-avatar-menu" role="menu">
                        <button
                          type="button"
                          className="ind-wp-avatar-menu-item"
                          role="menuitem"
                          onClick={() => { setAvatarMenuOpen(false); avatarInputRef.current?.click(); }}
                        >
                          <Icon name={hasValidAvatar ? "Pencil" : "Upload"} size={ICON_SIZES.XS} />
                          <span>{hasValidAvatar ? "Update logo" : "Upload logo"}</span>
                        </button>
                        {hasValidAvatar && (
                          <button
                            type="button"
                            className="ind-wp-avatar-menu-item danger"
                            role="menuitem"
                            onClick={handleRemoveAvatar}
                          >
                            <Icon name="Trash" size={ICON_SIZES.XS} />
                            <span>Remove logo</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="ind-wp-id-text">
                    <h1 className="ind-wp-name">{displayName}</h1>
                    <p className="ind-wp-headline">{headline}</p>
                    <div className="ind-wp-meta">
                      <span className="ind-wp-meta-item">
                        <Icon name="MapPin" size={ICON_SIZES.SM} /> {location}
                      </span>
                    </div>
                    <p className="ind-wp-member">Member since {memberSince}</p>
                    <div className="ind-wp-top-skills">
                      {topSkills.map((s) => (
                        <span key={s} className="ind-wp-pill-blue">{s}</span>
                      ))}
                    </div>
                    <span className="ind-wp-available">
                      <span className="ind-wp-dot" /> Available for work
                    </span>
                  </div>
                </div>

                <div className="ind-wp-identity-right">
                  <GuildCard
                    name={displayName}
                    subtitle={headline}
                    category={headline}
                    location={location}
                    website={portfolioUrl}
                    skills={topSkills}
                    rank={currentRank}
                    guildId={guildId}
                    memberSince={memberSince}
                    logoInitials={initials}
                    logoUrl={avatarUrl}
                    logo={avatarUrl}
                    verifiedText="VERIFIED MEMBER"
                    starRating={5}
                    width="100%"
                    style={{ maxWidth: "430px", width: "100%", margin: "0 auto" }}
                  />
                </div>
              </div>
            </Cards>

            {/* ================= ABOUT + SKILLS ================= */}
            <div className="ind-wp-grid-2">
              <Cards variant="base" className="ind-wp-card" padding="0">
                <div className="ind-wp-card-inner">
                  <div className="ind-wp-card-head">
                    <h3 className="ind-wp-card-title">About Me</h3>
                    <button type="button" className="ind-wp-link" onClick={() => openEdit("about")}>
                      <Icon name="Pencil" size={ICON_SIZES.XS} /> Edit
                    </button>
                  </div>
                  {!hasAbout ? (
                    <div className="ind-wp-empty">
                      <span className="ind-wp-empty-icon">
                        <Icon name="User" size={ICON_SIZES['2XL']} color="#94a3b8" />
                      </span>
                      <h4>Tell clients about yourself</h4>
                      <p>A strong introduction helps clients connect with you and increases your chances of getting hired.</p>
                      <PrimaryButton
                        text="+ Add About Me"
                        onClick={() => openEdit("about")}
                        className="ind-wp-btn-primary"
                      />
                    </div>
                  ) : (
                    <p className="ind-wp-about-text" style={{ whiteSpace: "pre-line" }}>{bio}</p>
                  )}
                </div>
              </Cards>

              <Cards variant="base" className="ind-wp-card" padding="0">
                <div className="ind-wp-card-inner">
                  <div className="ind-wp-card-head">
                    <h3 className="ind-wp-card-title">Skills &amp; Tools</h3>
                    <button type="button" className="ind-wp-link" onClick={() => openEdit("skills")}>
                      <Icon name="Pencil" size={ICON_SIZES.XS} /> Edit
                    </button>
                  </div>
                  <p className="ind-wp-sub-label">SKILLS</p>
                  <div className="ind-wp-chips">
                    {skills.map((s) => (
                      <span key={s} className="ind-wp-chip">{s}</span>
                    ))}
                  </div>
                  <div className="ind-wp-divider" />
                  <p className="ind-wp-sub-label">TOOLS</p>
                  <div className="ind-wp-chips">
                    {tools.map((t) => (
                      <span key={t} className="ind-wp-chip">{t}</span>
                    ))}
                  </div>
                </div>
              </Cards>
            </div>

            {/* ================= EXPERIENCE + FEATURED PROJECTS ================= */}
            <div className="ind-wp-grid-exp">
              <div className="ind-wp-exp-left">
                <Cards variant="base" className="ind-wp-card" padding="0">
                  <div className="ind-wp-card-inner">
                    <div className="ind-wp-card-head">
                      <h3 className="ind-wp-card-title">Experience</h3>
                      <button type="button" className="ind-wp-link" onClick={() => openEdit("experience")}>
                        <Icon name="Pencil" size={ICON_SIZES.XS} /> Edit
                      </button>
                    </div>
                    <div className="ind-wp-exp-grid">
                      <div>
                        <p className="ind-wp-sub-label">EXPERIENCE</p>
                        <p className="ind-wp-exp-value">{experienceLabel}</p>
                      </div>
                      <div>
                        <p className="ind-wp-sub-label">SPECIALIZATIONS</p>
                        <p className="ind-wp-exp-value small">{specializations}</p>
                      </div>
                      <div>
                        <p className="ind-wp-sub-label">LANGUAGES</p>
                        <p className="ind-wp-exp-value small">{languages}</p>
                      </div>
                      <div>
                        <p className="ind-wp-sub-label">AVAILABILITY</p>
                        <p className="ind-wp-exp-value">{availability}</p>
                      </div>
                    </div>
                  </div>
                </Cards>

                <Cards variant="base" className="ind-wp-card" padding="0">
                  <div className="ind-wp-card-inner">
                    <div className="ind-wp-card-head">
                      <h3 className="ind-wp-card-title">Client Reviews</h3>
                      <button type="button" className="ind-wp-link" onClick={() => navigate("/reviews-feedback")}>
                        View all reviews
                      </button>
                    </div>
                    <div className="ind-wp-empty">
                      <span className="ind-wp-empty-icon star">
                        <Icon name="Star" size={ICON_SIZES['3XL']} color="#cbd5e1" />
                      </span>
                      <h4>No reviews yet.</h4>
                      <p>Complete your first project to start receiving client reviews.</p>
                    </div>
                  </div>
                </Cards>
              </div>

              <Cards variant="base" className="ind-wp-card ind-wp-featured" padding="0">
                <div className="ind-wp-card-inner">
                  <div className="ind-wp-card-head">
                    <h3 className="ind-wp-card-title">Featured Projects</h3>
                    <button type="button" className="ind-wp-link" onClick={() => navigate("/quest-board")}>
                      View all projects
                    </button>
                  </div>
                  <div className="ind-wp-empty tall">
                    <span className="ind-wp-empty-icon">
                      <Icon name="Briefcase" size={ICON_SIZES['3XL']} color="#cbd5e1" />
                    </span>
                    <h4>You haven&apos;t added any projects yet.</h4>
                    <p>Showcase your best work to attract clients. Projects with screenshots get more views.</p>
                    <PrimaryButton
                      text="+ Add First Project"
                      onClick={() => navigate("/profile/portfolio")}
                      className="ind-wp-btn-primary"
                    />
                  </div>
                </div>
              </Cards>
            </div>

            {/* ================= PORTFOLIO + COMPLETION + RECENT ================= */}
            <div className="ind-wp-grid-3">
              <Cards variant="base" className="ind-wp-card" padding="0">
                <div className="ind-wp-card-inner">
                  <div className="ind-wp-card-head">
                    <h3 className="ind-wp-card-title">Portfolio &amp; Links</h3>
                    <button type="button" className="ind-wp-link" onClick={() => openEdit("links")}>
                      <Icon name="Pencil" size={ICON_SIZES.XS} /> Edit
                    </button>
                  </div>
                  <div className="ind-wp-links">
                    <div className="ind-wp-link-row">
                      <span className="ind-wp-link-ico"><Icon name="Globe" size={ICON_SIZES.DEFAULT} color="#1d4ed8" /></span>
                      <span className="ind-wp-link-meta">
                        <span className="ind-wp-link-top">Portfolio Website</span>
                        <button type="button" className="ind-wp-link-url" onClick={() => openUrl(portfolioUrl)}>{portfolioUrl.replace(/^https?:\/\//, "")}</button>
                      </span>
                      <button type="button" className="ind-wp-ext" aria-label="Open website" onClick={() => openUrl(portfolioUrl)}>
                        <Icon name="ExternalLink" size={ICON_SIZES.SM} color="#94a3b8" />
                      </button>
                    </div>
                    <div className="ind-wp-link-row">
                      <span className="ind-wp-link-ico"><Icon name="Github" size={ICON_SIZES.DEFAULT} color="#1e293b" /></span>
                      <span className="ind-wp-link-meta">
                        <span className="ind-wp-link-top">GitHub</span>
                        <button type="button" className="ind-wp-link-url" onClick={() => openUrl(githubUrl)}>{githubUrl.replace(/^https?:\/\//, "")}</button>
                      </span>
                      <button type="button" className="ind-wp-ext" aria-label="Open github" onClick={() => openUrl(githubUrl)}>
                        <Icon name="ExternalLink" size={ICON_SIZES.SM} color="#94a3b8" />
                      </button>
                    </div>
                    <div className="ind-wp-link-row">
                      <span className="ind-wp-link-ico"><Icon name="Linkedin" size={ICON_SIZES.DEFAULT} color="#0077b5" /></span>
                      <span className="ind-wp-link-meta">
                        <span className="ind-wp-link-top">LinkedIn</span>
                        <button type="button" className="ind-wp-link-url" onClick={() => openUrl(linkedinUrl)}>{linkedinUrl.replace(/^https?:\/\//, "")}</button>
                      </span>
                      <button type="button" className="ind-wp-ext" aria-label="Open linkedin" onClick={() => openUrl(linkedinUrl)}>
                        <Icon name="ExternalLink" size={ICON_SIZES.SM} color="#94a3b8" />
                      </button>
                    </div>
                    <div className="ind-wp-link-row">
                      <span className="ind-wp-link-ico green"><Icon name="Download" size={ICON_SIZES.DEFAULT} color="#16a34a" /></span>
                      <span className="ind-wp-link-meta">
                        <span className="ind-wp-link-top">Resume</span>
                        <span className="ind-wp-link-file">{resumeName}</span>
                      </span>
                      {resumeUrl ? (
                        <button type="button" className="ind-wp-download" onClick={() => window.open(resumeUrl, "_blank")}>
                          <Icon name="Download" size={ICON_SIZES['2XS']} /> Download
                        </button>
                      ) : (
                        <button type="button" className="ind-wp-download" onClick={() => resumeInputRef.current?.click()}>
                          <Icon name="Download" size={ICON_SIZES['2XS']} /> Download
                        </button>
                      )}
                      <input ref={resumeInputRef} type="file" accept=".pdf,application/pdf" hidden onChange={handleResumeChange} />
                    </div>
                  </div>
                </div>
              </Cards>

              <Cards variant="base" className="ind-wp-card" padding="0">
                <div className="ind-wp-card-inner">
                  <h3 className="ind-wp-card-title">Profile Completion</h3>
                  <p className="ind-wp-muted">Complete your profile to attract more clients and increase visibility.</p>
                  <div className="ind-wp-checks">
                    {checklist.map((c) => (
                      <div key={c.label} className="ind-wp-check-row">
                        {c.done ? (
                          <Icon name="CheckCircle2" size={ICON_SIZES.DEFAULT} color="#16a34a" />
                        ) : (
                          <Icon name="Circle" size={ICON_SIZES.DEFAULT} color="#16a34a" />
                        )}
                        <span className={c.done ? "done" : "pending"}>{c.label}</span>
                      </div>
                    ))}
                  </div>
                  <PrimaryButton
                    text="Complete My Profile"
                    onClick={() => navigate("/profile/basic-info")}
                    className="ind-wp-btn-dark w-100"
                  />
                  <p className="ind-wp-pct">{completedCount}/{checklist.length} completed</p>
                </div>
              </Cards>

              <Cards variant="base" className="ind-wp-card" padding="0">
                <div className="ind-wp-card-inner">
                  <h3 className="ind-wp-card-title">Recent Activity</h3>
                  <p className="ind-wp-sub-label">TODAY</p>
                  <div className="ind-wp-activity">
                    <div className="ind-wp-act-row">
                      <span className="ind-wp-act-dot blue" />
                      <span>Joined TechGuild</span>
                    </div>
                    <div className="ind-wp-act-row">
                      <span className="ind-wp-act-dot green" />
                      <span>Verified Email Address</span>
                    </div>
                    <div className="ind-wp-act-row">
                      <span className="ind-wp-act-dot orange" />
                      <span>Earned +10 Trust Points</span>
                      <b className="ind-wp-tp">+10 TP</b>
                    </div>
                  </div>
                </div>
              </Cards>
            </div>

            {/* ================= TRUST + QUICK ACTIONS ================= */}
            <div className="ind-wp-grid-bottom">
              <Cards variant="base" className="ind-wp-card" padding="0">
                <div className="ind-wp-card-inner">
                  <h3 className="ind-wp-card-title">Trust Journey</h3>
                  <div className="ind-wp-ranks">
                    {TRUST_RANKS.map((r) => (
                      <div key={r} className={`ind-wp-rank ${r === currentRank ? "active" : ""}`}>
                        <span className="ind-wp-rank-circle">{r}</span>
                        {r === currentRank && <span className="ind-wp-rank-you">You</span>}
                      </div>
                    ))}
                  </div>
                  <div className="ind-wp-trust-box">
                    <div className="ind-wp-trust-top">
                      <span>Rank {currentRank}</span>
                      {nextRank && (
                        <span className="ind-wp-next">Next Rank: <b>Reach {nextRankMin} TP</b></span>
                      )}
                    </div>
                    <div className="ind-wp-trust-track">
                      <div
                        className="ind-wp-trust-fill"
                        style={{ width: `${Math.max(6, ((currentRankIndex + 0.15) / TRUST_RANKS.length) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Cards>

              <Cards variant="base" className="ind-wp-card" padding="0">
                <div className="ind-wp-card-inner">
                  <h3 className="ind-wp-card-title">Quick Actions</h3>
                  <div className="ind-wp-qa">
                    {quickActions.map((a) => (
                      <button key={a.id} type="button" className="ind-wp-qa-btn" onClick={() => handleQuickAction(a.id)}>
                        <span className="ind-wp-qa-left">
                          <span className="ind-wp-qa-ico">
                            <Icon name={a.icon} size={ICON_SIZES.MD} color="#2563eb" />
                          </span>
                          <span>{a.label}</span>
                        </span>
                        <Icon name="ChevronRight" size={ICON_SIZES.MD} color="#cbd5e1" />
                      </button>
                    ))}
                  </div>
                </div>
              </Cards>
            </div>
          </>
        )}
      </div>

      {isEditModalOpen && (
        <div className="ind-wp-modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="ind-wp-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ind-wp-modal-header">
              <div className="ind-wp-modal-title-wrap">
                <div className="ind-wp-modal-icon-badge">
                  <Icon name="User" size={ICON_SIZES.XL} />
                </div>
                <div>
                  <h3 className="ind-wp-modal-title">{editMeta.title}</h3>
                  <p className="ind-wp-modal-subtitle">{editMeta.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                className="ind-wp-modal-close-btn"
                aria-label="Close"
                onClick={() => setIsEditModalOpen(false)}
              >
                <Icon name="X" size={ICON_SIZES.DEFAULT} />
              </button>
            </div>

            {editScope === "all" && (
              <div className="ind-wp-modal-tabs">
                <button
                  type="button"
                  className={`ind-wp-modal-tab-btn ${modalTab === "general" ? "active" : ""}`}
                  onClick={() => setModalTab("general")}
                >
                  General Info
                </button>
                <button
                  type="button"
                  className={`ind-wp-modal-tab-btn ${modalTab === "skills" ? "active" : ""}`}
                  onClick={() => setModalTab("skills")}
                >
                  Skills &amp; Tools
                </button>
                <button
                  type="button"
                  className={`ind-wp-modal-tab-btn ${modalTab === "links" ? "active" : ""}`}
                  onClick={() => setModalTab("links")}
                >
                  Links &amp; Details
                </button>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="d-flex flex-column grow" style={{ minHeight: 0 }}>
              <div className="ind-wp-modal-body">
                {(editScope === "about" || (editScope === "all" && modalTab === "general")) && (
                  <>
                    <div className="ind-wp-form-group">
                      <label className="ind-wp-form-label">Headline</label>
                      <input
                        type="text"
                        className="ind-wp-form-input"
                        placeholder="e.g. Full Stack Developer"
                        value={editForm.headline}
                        onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                      />
                    </div>
                    <div className="ind-wp-form-group">
                      <label className="ind-wp-form-label">About Me</label>
                      <textarea
                        className="ind-wp-form-textarea"
                        placeholder="Tell clients about yourself, experience and what you do best..."
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      />
                    </div>
                    {(editScope === "all" || editScope === "experience") && editScope !== "all" ? null : null}
                    {editScope === "all" && (
                      <>
                        <div className="ind-wp-form-grid-2">
                          <div className="ind-wp-form-group">
                            <label className="ind-wp-form-label">Experience</label>
                            <input
                              type="text"
                              className="ind-wp-form-input"
                              placeholder="e.g. 3+ Years"
                              value={editForm.experience_level}
                              onChange={(e) => setEditForm({ ...editForm, experience_level: e.target.value })}
                            />
                          </div>
                          <div className="ind-wp-form-group">
                            <label className="ind-wp-form-label">Availability</label>
                            <input
                              type="text"
                              className="ind-wp-form-input"
                              placeholder="e.g. Full-time"
                              value={editForm.availability}
                              onChange={(e) => setEditForm({ ...editForm, availability: e.target.value })}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {(editScope === "skills" || (editScope === "all" && modalTab === "skills")) && (
                  <>
                    <div className="ind-wp-form-group">
                      <label className="ind-wp-form-label">Skills (comma separated)</label>
                      <textarea
                        className="ind-wp-form-textarea"
                        placeholder="React, Node.js, TypeScript..."
                        value={editForm.skills}
                        onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                      />
                    </div>
                    <div className="ind-wp-form-group">
                      <label className="ind-wp-form-label">Tools (comma separated)</label>
                      <textarea
                        className="ind-wp-form-textarea"
                        placeholder="Figma, VS Code, GitHub..."
                        value={editForm.tools}
                        onChange={(e) => setEditForm({ ...editForm, tools: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {editScope === "experience" && (
                  <>
                    <div className="ind-wp-form-grid-2">
                      <div className="ind-wp-form-group">
                        <label className="ind-wp-form-label">Experience</label>
                        <input
                          type="text"
                          className="ind-wp-form-input"
                          placeholder="e.g. 3+ Years"
                          value={editForm.experience_level}
                          onChange={(e) => setEditForm({ ...editForm, experience_level: e.target.value })}
                        />
                      </div>
                      <div className="ind-wp-form-group">
                        <label className="ind-wp-form-label">Availability</label>
                        <input
                          type="text"
                          className="ind-wp-form-input"
                          placeholder="e.g. Full-time"
                          value={editForm.availability}
                          onChange={(e) => setEditForm({ ...editForm, availability: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="ind-wp-form-grid-2">
                      <div className="ind-wp-form-group">
                        <label className="ind-wp-form-label">City</label>
                        <input
                          type="text"
                          className="ind-wp-form-input"
                          placeholder="e.g. Pune"
                          value={editForm.city}
                          onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                        />
                      </div>
                      <div className="ind-wp-form-group">
                        <label className="ind-wp-form-label">Country</label>
                        <input
                          type="text"
                          className="ind-wp-form-input"
                          placeholder="e.g. India"
                          value={editForm.country}
                          onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                        />
                      </div>
                    </div>
                  </>
                )}

                {(editScope === "links" || (editScope === "all" && modalTab === "links")) && (
                  <>
                    <div className="ind-wp-form-group">
                      <label className="ind-wp-form-label">Portfolio URL</label>
                      <input
                        type="text"
                        className="ind-wp-form-input"
                        placeholder="https://yourportfolio.com"
                        value={editForm.portfolio_url}
                        onChange={(e) => setEditForm({ ...editForm, portfolio_url: e.target.value })}
                      />
                    </div>
                    <div className="ind-wp-form-group">
                      <label className="ind-wp-form-label">GitHub URL</label>
                      <input
                        type="text"
                        className="ind-wp-form-input"
                        placeholder="github.com/username"
                        value={editForm.github_url}
                        onChange={(e) => setEditForm({ ...editForm, github_url: e.target.value })}
                      />
                    </div>
                    <div className="ind-wp-form-group">
                      <label className="ind-wp-form-label">LinkedIn URL</label>
                      <input
                        type="text"
                        className="ind-wp-form-input"
                        placeholder="linkedin.com/in/username"
                        value={editForm.linkedin_url}
                        onChange={(e) => setEditForm({ ...editForm, linkedin_url: e.target.value })}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="ind-wp-modal-footer">
                <SecondaryButton type="button" onClick={() => setIsEditModalOpen(false)} text="Cancel" />
                <PrimaryButton type="submit" disabled={savingProfile} text={savingProfile ? "Saving..." : "Save Changes"} />
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
