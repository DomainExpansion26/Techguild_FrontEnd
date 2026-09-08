import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";
import { useAuth } from "@/context/AuthContext";
import { profileApi } from "@/features/profile/api/profileApi";
import "./WholeProfile.css";

export default function WholeProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        const res = await profileApi.getProfile();
        setProfile(res?.individual || res?.data?.individual || res || {});
      } catch (err) {
        console.warn("Error fetching whole profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const displayName = user?.name || (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : null) || user?.email?.split("@")[0] || "Member";
  const headline = profile?.headline || user?.headline || "TechGuild Verified Freelancer";
  const bio = profile?.bio || "No biography added yet. Update your profile in settings to highlight your background.";
  const location = [profile?.city, profile?.country].filter(Boolean).join(", ") || user?.location || "Location not set";
  const timezone = profile?.timezone || user?.timezone || "UTC";
  const website = profile?.portfolio_url || "";
  const github = profile?.github_url || "";
  const linkedin = profile?.linkedin_url || "";
  const skills = profile?.skills || [];
  const tools = profile?.tools_technologies || [];
  const avatarUrl = profile?.avatar_url || user?.avatar;
  const initials = displayName ? displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "U";

  return (
    <DashboardLayout>
      <div className="whole-profile-container py-4 px-3 px-md-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted small">Loading live profile from API...</p>
          </div>
        ) : (
          <div className="whole-profile-grid">
            {/* Header / Hero Card */}
            <Cards className="whole-profile-hero-card mb-4" padding="32px">
              <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">
                <div
                  className="whole-profile-avatar"
                  style={avatarUrl ? { backgroundImage: `url(${avatarUrl})`, backgroundSize: "cover", color: "transparent" } : {}}
                >
                  {!avatarUrl && initials}
                </div>

                <div className="flex-grow-1 text-center text-md-start">
                  <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
                    <div>
                      <h1 className="whole-profile-name mb-1">{displayName}</h1>
                      <p className="whole-profile-headline mb-2">{headline}</p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 px-3 py-2 rounded-3"
                      onClick={() => navigate("/settings/profile")}
                    >
                      <Icon name="Settings" size={16} />
                      <span>Edit Profile</span>
                    </button>
                  </div>

                  <div className="whole-profile-meta d-flex flex-wrap justify-content-center justify-content-md-start align-items-center gap-3 mt-2 text-muted small">
                    <span className="d-flex align-items-center gap-1">
                      <Icon name="MapPin" size={15} />
                      {location}
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <Icon name="Clock" size={15} />
                      {timezone}
                    </span>
                    <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                      Available for Work
                    </span>
                  </div>
                </div>
              </div>
            </Cards>

            <div className="row g-4">
              {/* Left Column: About & Skills */}
              <div className="col-12 col-lg-8">
                <Cards className="mb-4" padding="28px">
                  <h3 className="section-title mb-3">About Me</h3>
                  <p className="section-desc mb-0" style={{ whiteSpace: "pre-line", lineHeight: "1.7" }}>
                    {bio}
                  </p>
                </Cards>

                <Cards className="mb-4" padding="28px">
                  <h3 className="section-title mb-3">Skills & Technologies</h3>
                  {skills.length > 0 || tools.length > 0 ? (
                    <div className="d-flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span key={index} className="skill-pill">
                          {skill}
                        </span>
                      ))}
                      {tools.map((tool, index) => (
                        <span key={`tool-${index}`} className="skill-pill tool-pill">
                          {tool}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted small mb-0">
                      No skills added yet. Add your core competencies in profile settings.
                    </p>
                  )}
                </Cards>
              </div>

              {/* Right Column: Links & Contact */}
              <div className="col-12 col-lg-4">
                <Cards className="mb-4" padding="28px">
                  <h3 className="section-title mb-3">Links & Portfolio</h3>
                  <div className="d-flex flex-column gap-3">
                    {website ? (
                      <a href={website.startsWith("http") ? website : `https://${website}`} target="_blank" rel="noreferrer" className="profile-link-item">
                        <Icon name="Globe" size={18} />
                        <span className="text-truncate">{website}</span>
                      </a>
                    ) : (
                      <span className="text-muted small">No personal website added</span>
                    )}

                    {github && (
                      <a href={github.startsWith("http") ? github : `https://${github}`} target="_blank" rel="noreferrer" className="profile-link-item">
                        <Icon name="Github" size={18} />
                        <span className="text-truncate">{github}</span>
                      </a>
                    )}

                    {linkedin && (
                      <a href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`} target="_blank" rel="noreferrer" className="profile-link-item">
                        <Icon name="Linkedin" size={18} />
                        <span className="text-truncate">{linkedin}</span>
                      </a>
                    )}
                  </div>
                </Cards>

                <Cards padding="28px">
                  <h3 className="section-title mb-3">Trust & Identity</h3>
                  <div className="d-flex align-items-center gap-2 text-success small mb-2">
                    <Icon name="ShieldCheck" size={18} color="#16a34a" />
                    <span className="fw-medium">Email Verified (+10 Points)</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-light w-100 mt-2 text-primary fw-medium small"
                    onClick={() => navigate("/verification")}
                  >
                    Verify Identity →
                  </button>
                </Cards>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

