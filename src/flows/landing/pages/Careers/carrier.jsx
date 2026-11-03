// 03-11-2026
// Careers page with open roles, culture highlights, and a job application form.
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PublicHeader from "@/flows/landing/LandingLink/PublicHeader/PublicHeader";
import Footer from "@/flows/landing/LandingLink/Footer/Footer";
import Icon from "@/Components/icons/Icon";
import Popup from "@/Components/Popup/Popup";
import TextInput from "@/Components/Textinput/Textinput";
import Dropdown from "@/Components/Dropdown/Dropdown";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import heroArt from "@/assets/landing-Img/Group 38023.png";
import "./carrier.css";

const MAX_RESUME_SIZE = 10 * 1024 * 1024;

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  countryCode: "+91",
  phone: "",
  email: "",
  position: "",
};

const JOBS = [
  {
    icon: "MousePointer",
    title: "UI/UX Designer",
    text: "Design intuitive and meaningful experiences for our platform. Work on end-to-end product design, from research to high-fidelity UI.",
  },
  {
    icon: "Smile",
    title: "Graphic Designer",
    text: "Create engaging visuals for our product, marketing and brand. Work on social media creatives, website assets, and product visuals.",
  },
  {
    icon: "Code",
    title: "Front-End Developer",
    text: "Build responsive and scalable user interfaces. Work closely with the product and design teams to bring our platform to life on the web.",
  },
  {
    icon: "Server",
    title: "Back-End Developer",
    text: "Build and maintain robust, secure and scalable backend systems. Work on APIs, database design and core platform infrastructure.",
  },
  {
    icon: "Megaphone",
    title: "Social Media Marketer",
    text: "Plan and execute our social media strategy. Create content, manage campaigns and help grow TechGuild's community across platforms.",
  },
  {
    icon: "ChartNoAxesColumn",
    title: "Financial Analyst / Controller",
    text: "Manage financial planning, reporting and analysis. Help us build a strong financial foundation as we scale and grow.",
  },
];

function TeamScene() {
  return (
    <svg
      className="crd-team-svg"
      viewBox="0 0 720 430"
      role="img"
      aria-label="TechGuild team collaborating around a table"
    >
      <defs>
        <filter id="crdShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#1d4ed8" floodOpacity="0.1" />
        </filter>
      </defs>

      <rect x="0" y="0" width="720" height="430" rx="26" fill="#f1f6ff" />
      <circle cx="360" cy="215" r="164" fill="none" stroke="#cfdcf4" strokeDasharray="5 9" />
      <circle cx="360" cy="215" r="112" fill="none" stroke="#dde8fa" strokeDasharray="4 8" />

      <circle cx="286" cy="120" r="5" fill="#b7cff5" />
      <circle cx="436" cy="104" r="4" fill="#c9dbf7" />
      <circle cx="642" cy="132" r="6" fill="#c9dbf7" />
      <circle cx="82" cy="282" r="5" fill="#b7cff5" />
      <circle cx="668" cy="280" r="4" fill="#d3e1f8" />

      <g filter="url(#crdShadow)">
        <rect x="52" y="42" width="126" height="76" rx="14" fill="#ffffff" />
        <rect x="68" y="86" width="12" height="18" rx="4" fill="#a7c6fb" />
        <rect x="88" y="74" width="12" height="30" rx="4" fill="#4b8bf5" />
        <rect x="108" y="62" width="12" height="42" rx="4" fill="#2456e6" />
        <path d="M128 74 l14 -10" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
        <rect x="140" y="54" width="24" height="14" rx="7" fill="#e6f8ee" />
      </g>

      <g filter="url(#crdShadow)">
        <rect x="552" y="38" width="124" height="68" rx="14" fill="#ffffff" />
        <circle cx="576" cy="62" r="10" fill="#dbe8ff" />
        <circle cx="600" cy="62" r="10" fill="#a7c6fb" />
        <circle cx="624" cy="62" r="10" fill="#4b8bf5" />
        <rect x="570" y="80" width="86" height="8" rx="4" fill="#e6edf9" />
      </g>

      <g filter="url(#crdShadow)">
        <circle cx="352" cy="36" r="21" fill="#ffffff" />
        <path
          d="M352 25 l10 4 v7 c0 7 -5 10 -10 12 c-5 -2 -10 -5 -10 -12 v-7 Z"
          fill="#dbe8ff"
          stroke="#2456e6"
          strokeWidth="2"
        />
        <path d="M347 36 l4 4 l7 -8" stroke="#2456e6" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g filter="url(#crdShadow)">
        <rect x="34" y="150" width="88" height="108" rx="14" fill="#ffffff" />
        <rect x="52" y="170" width="52" height="8" rx="4" fill="#dbe7fa" />
        <rect x="52" y="186" width="38" height="8" rx="4" fill="#e8effb" />
        <rect x="52" y="202" width="46" height="8" rx="4" fill="#e8effb" />
        <circle cx="98" cy="234" r="12" fill="#2456e6" />
        <path d="M93 234 l4 4 l7 -8" stroke="#ffffff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g filter="url(#crdShadow)">
        <rect x="604" y="168" width="86" height="68" rx="14" fill="#ffffff" />
        <path d="M618 214 l14 -14 l10 8 l18 -20" stroke="#2456e6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M650 188 h10 v10" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <ellipse cx="150" cy="400" rx="44" ry="9" fill="#dce8fa" />
      <g>
        <path d="M138 318 L132 392" stroke="#16325c" strokeWidth="13" strokeLinecap="round" />
        <path d="M156 318 L166 392" stroke="#16325c" strokeWidth="13" strokeLinecap="round" />
        <path d="M128 268 L174 268 L182 326 L120 326 Z" fill="#173b73" />
        <path d="M132 236 C138 224 162 222 170 236 L178 278 L124 278 Z" fill="#4b8bf5" />
        <path d="M168 246 C192 252 204 268 208 288" stroke="#f2c7a4" strokeWidth="11" strokeLinecap="round" fill="none" />
        <circle cx="209" cy="290" r="6" fill="#f2c7a4" />
        <path d="M134 248 C122 266 122 282 128 296" stroke="#f2c7a4" strokeWidth="11" strokeLinecap="round" fill="none" />
        <circle cx="150" cy="208" r="21" fill="#f2c7a4" />
        <path d="M129 208 a21 21 0 0 1 42 0 q-10 -9 -21 -9 t-21 9 Z" fill="#3a2a26" />
        <path d="M129 205 C126 222 128 234 133 242 L131 208 Z" fill="#3a2a26" />
        <path d="M171 205 C174 222 172 234 167 242 L169 208 Z" fill="#3a2a26" />
      </g>

      <ellipse cx="302" cy="392" rx="34" ry="8" fill="#dce8fa" />
      <g>
        <path d="M272 262 C280 246 324 244 332 262 L338 330 L266 330 Z" fill="#a9c6ff" />
        <circle cx="302" cy="228" r="19" fill="#b97a56" />
        <path d="M283 226 q3 -20 19 -20 q16 0 19 20 q-9 -8 -19 -8 t-19 8 Z" fill="#241a16" />
      </g>

      <ellipse cx="458" cy="404" rx="42" ry="9" fill="#dce8fa" />
      <g>
        <path d="M448 322 L442 396" stroke="#1c2f52" strokeWidth="13" strokeLinecap="round" />
        <path d="M466 322 L474 396" stroke="#1c2f52" strokeWidth="13" strokeLinecap="round" />
        <path d="M434 258 C440 244 476 244 482 258 L488 328 L428 328 Z" fill="#2456e6" />
        <path d="M476 266 C498 246 506 230 510 214" stroke="#8a5a44" strokeWidth="11" strokeLinecap="round" fill="none" />
        <circle cx="511" cy="211" r="6" fill="#8a5a44" />
        <path d="M438 268 C428 286 428 302 432 316" stroke="#8a5a44" strokeWidth="11" strokeLinecap="round" fill="none" />
        <circle cx="458" cy="226" r="20" fill="#8a5a44" />
        <path d="M438 226 q3 -21 20 -21 q17 0 20 21 q-9 -8 -20 -8 t-20 8 Z" fill="#1f1713" />
      </g>

      <ellipse cx="568" cy="404" rx="38" ry="9" fill="#dce8fa" />
      <g>
        <path d="M558 322 L552 396" stroke="#1c2f52" strokeWidth="13" strokeLinecap="round" />
        <path d="M576 322 L584 396" stroke="#1c2f52" strokeWidth="13" strokeLinecap="round" />
        <path d="M544 260 C550 246 586 246 592 260 L598 328 L538 328 Z" fill="#1d7f8d" />
        <path d="M548 272 C526 280 516 288 510 296" stroke="#f2c7a4" strokeWidth="11" strokeLinecap="round" fill="none" />
        <circle cx="508" cy="298" r="6" fill="#f2c7a4" />
        <circle cx="568" cy="228" r="19" fill="#f2c7a4" />
        <path d="M549 226 q3 -20 19 -20 q16 0 19 20 q-9 -8 -19 -8 t-19 8 Z" fill="#33251f" />
      </g>

      <rect x="164" y="306" width="392" height="18" rx="9" fill="#ffffff" stroke="#cfdff5" />
      <rect x="206" y="324" width="10" height="74" rx="5" fill="#c3d5f0" />
      <rect x="504" y="324" width="10" height="74" rx="5" fill="#c3d5f0" />

      <path d="M276 282 L324 282 L330 304 L270 304 Z" fill="#1b3f86" />
      <path d="M282 284 L318 284 L322 300 L278 300 Z" fill="#5b9bfc" />

      <path d="M432 288 L478 288 L484 306 L426 306 Z" fill="#1b3f86" />
      <path d="M438 290 L472 290 L476 302 L434 302 Z" fill="#7fb1ff" />

      <circle cx="360" cy="420" r="3" fill="#9fc0f4" />
    </svg>
  );
}

function Carrier() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [resume, setResume] = useState(null);

  const handleApply = (jobTitle) => {
    setForm({ ...EMPTY_FORM, position: jobTitle });
    setErrors({});
    setResume(null);
    setApplyOpen(true);
  };

  const handleClose = () => setApplyOpen(false);

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_RESUME_SIZE) {
      setResume(null);
      setErrors((current) => ({ ...current, resume: "Resume must be 10 MB or smaller." }));
      event.target.value = "";
      return;
    }

    setResume(file);
    setErrors((current) => ({ ...current, resume: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!form.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) nextErrors.lastName = "Last name is required.";

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) {
      nextErrors.phone = "Contact number is required.";
    } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      nextErrors.phone = "Enter a valid contact number.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!resume) nextErrors.resume = "Please upload your resume.";
    if (!form.position) nextErrors.position = "Please select a position.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    dispatch(
      showSnackbar({
        message: `Application submitted for ${form.position}. We'll get back to you soon!`,
        type: "success",
      })
    );
    setApplyOpen(false);
    setForm(EMPTY_FORM);
    setResume(null);
  };

  return (
    <div className="crd-page">
      <PublicHeader />

      <main>
        <section className="crd-hero">
          <img className="crd-hero-art" src={heroArt} alt="" aria-hidden="true" />
          <div className="crd-hero-overlay" />
          <div className="crd-wrap crd-hero-inner">
            <h1 className="crd-hero-title">
              Build what&apos;s
              <br />
              next.
              <br />
              Make work
              <br />
              better for
              <br />
              everyone.
            </h1>
          </div>
        </section>

        <section className="crd-people">
          <div className="crd-wrap crd-people-grid">
            <div className="crd-people-copy">
              <p className="crd-eyebrow">OUR PEOPLE</p>
              <h2>Build the future of professional collaboration</h2>
              <p>
                Our people are the driving force behind TechGuild. We come from diverse
                backgrounds, bring a wide range of skills, and work on meaningful problems —
                from building innovative features to improving the way clients, freelancers,
                parties, and agencies collaborate. We value ownership, creativity and impact,
                and we&apos;re always looking for curious and passionate people who want to make
                work better for everyone.
              </p>
            </div>
            <div className="crd-people-art">
              <TeamScene />
            </div>
          </div>

          <div className="crd-wrap">
            <div className="crd-values">SHARE OUR VALUES</div>
          </div>
        </section>

        <section className="crd-join">
          <div className="crd-wrap">
            <div className="crd-join-panel">
              <p className="crd-eyebrow">JOIN OUR TEAM</p>
              <h2>Come build what&apos;s next with us!</h2>
              <p className="crd-join-sub">
                We&apos;re a growing team on a mission to make professional collaboration more
                transparent, fair and accessible. Join us and help shape the future of work.
              </p>
            </div>

            <div className="crd-job-grid">
              {JOBS.map((job) => (
                <article key={job.title} className="crd-job-card">
                  <span className="crd-job-icon">
                    <Icon name={job.icon} size={24} color="#0062ff" />
                  </span>
                  <h3>{job.title}</h3>
                  <p>{job.text}</p>
                  <button type="button" className="crd-apply" onClick={() => handleApply(job.title)}>
                    <span>Apply</span>
                    <Icon name="ArrowRight" size={15} color="currentColor" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer active="careers" />

      <Popup
        open={applyOpen}
        onClose={handleClose}
        showCloseButton={false}
        title="Apply to TechGuild"
        subtitle="Tell us a little about yourself and the role you're interested in."
        cardClassName="crd-apply-modal"
        headerClassName="crd-apply-header"
        titleClassName="crd-apply-title"
        subtitleClassName="crd-apply-subtitle"
        bodyClassName="crd-apply-body"
      >
        <button
          type="button"
          className="crd-apply-close"
          onClick={handleClose}
          aria-label="Close application form"
        >
          <Icon name="X" size={16} color="#64748b" />
        </button>

        <form className="crd-apply-form" onSubmit={handleSubmit} noValidate>
          <div className="crd-apply-row">
            <TextInput
              label="First name"
              name="firstName"
              placeholder="Enter your first name"
              value={form.firstName}
              onChange={handleChange("firstName")}
              error={errors.firstName}
              required
            />
            <TextInput
              label="Last name"
              name="lastName"
              placeholder="Enter your last name"
              value={form.lastName}
              onChange={handleChange("lastName")}
              error={errors.lastName}
              required
            />
          </div>

          <div className="crd-apply-row">
            <div className="crd-phone-field">
              <span className="crd-phone-label">
                Contact number <em>*</em>
              </span>
              <div className={`crd-phone-control ${errors.phone ? "has-error" : ""}`.trim()}>
                <div className="crd-phone-country">
                  <select
                    aria-label="Country code"
                    value={form.countryCode}
                    onChange={handleChange("countryCode")}
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                    <option value="+971">+971</option>
                  </select>
                  <Icon name="ChevronDown" size={14} color="#94a3b8" />
                </div>
                <span className="crd-phone-divider" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your number"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  autoComplete="tel"
                />
              </div>
              {errors.phone && <span className="crd-apply-error">{errors.phone}</span>}
            </div>

            <TextInput
              label="Email address"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange("email")}
              error={errors.email}
              required
            />
          </div>

          <div className="crd-resume-field">
            <span className="crd-phone-label">
              Resume <em>*</em>
            </span>
            <div className={`crd-resume-box ${errors.resume ? "has-error" : ""}`.trim()}>
              <span className="crd-resume-icon">
                <Icon name="Upload" size={18} color="#0062ff" />
              </span>
              <div className="crd-resume-copy">
                <span className="crd-resume-title">
                  {resume ? resume.name : "Upload your resume (PDF, DOC, DOCX)"}
                </span>
                <span className="crd-resume-hint">Maximum file size: 10 MB</span>
              </div>
              <button
                type="button"
                className="crd-resume-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="crd-resume-input"
                onChange={handleResumeChange}
              />
            </div>
            {errors.resume && <span className="crd-apply-error">{errors.resume}</span>}
          </div>

          <Dropdown
            label="Select position"
            name="position"
            placeholder="Choose a position"
            value={form.position}
            onChange={handleChange("position")}
            options={JOBS.map((job) => job.title)}
            error={errors.position}
            required
          />

          <div className="crd-apply-actions">
            <button type="submit" className="crd-apply-submit">
              Submit Application
            </button>
            <p className="crd-apply-note">We&apos;ll review your application and get back to you.</p>
          </div>
        </form>
      </Popup>
    </div>
  );
}

export default Carrier;
