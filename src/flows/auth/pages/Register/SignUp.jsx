import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store";
import { Google, GitHub, Mail, Lock, Eye, EyeOff } from "@/Components/icons";
import "./SignUp.css";
import {
  AuthHomeScreen,
  BrandLogo,
  SignupCard,
} from "@/Components";
import authApi from "@/features/auth/api/authApi";
import oauthApi from "@/features/auth/api/oauthApi";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e?.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      dispatch(showSnackbar({ message: "Please enter both First Name and Last Name.", type: "error" }));
      return;
    }

    if (!email.trim() || !password.trim()) {
      dispatch(showSnackbar({ message: "Please enter both Email and Password.", type: "error" }));
      return;
    }

    if (password.length < 8) {
      dispatch(showSnackbar({ message: "Password must be at least 8 characters.", type: "warning" }));
      return;
    }

    if (!termsAccepted) {
      dispatch(showSnackbar({ message: "Please accept the Terms of Service & Privacy Policy to continue.", type: "warning" }));
      return;
    }

    setLoading(true);
    try {
      const cleanFirstName = firstName.trim();
      const cleanLastName = lastName.trim();
      const cleanEmail = email.trim();

      const response = await authApi.register({
        first_name: cleanFirstName,
        last_name: cleanLastName,
        email: cleanEmail,
        password,
      });

      // Save pending user profile info so real name is never replaced by dummy data
      localStorage.setItem(
        "techguild_pending_user",
        JSON.stringify({
          firstName: cleanFirstName,
          lastName: cleanLastName,
          name: `${cleanFirstName} ${cleanLastName}`.trim(),
          email: cleanEmail,
          password,
        })
      );

      dispatch(
        showSnackbar({
          message:
            response?.message ||
            "Registration successful! Please check your email inbox to verify your account.",
          type: "success",
        })
      );

      setTimeout(() => {
        navigate("/verify-email", {
          state: {
            email: cleanEmail,
            firstName: cleanFirstName,
            lastName: cleanLastName,
            password,
          },
        });
      }, 1000);
    } catch (err) {
      console.error("Signup error:", err);
      dispatch(showSnackbar({
        message: err?.message || "Failed to create account. Please check your credentials.",
        type: "error",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    oauthApi.redirectToGoogle();
  };

  const handleGithubSignup = () => {
    oauthApi.redirectToGithub();
  };

  return (
    <div className="signup-page">
      <AuthHomeScreen />

      <div className="auth-card-wrapper">
        <SignupCard>
          <form onSubmit={handleSignup} style={{ width: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <BrandLogo />

            <h2 style={{ fontWeight: 700, fontSize: '18px', color: '#111827', margin: '8px 0 2px 0' }}>Sign Up</h2>
            <p style={{ color: '#79797D', fontSize: '13px', margin: '0 0 14px 0' }}>Start your TechGuild Journey</p>

            {/* Social Buttons */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="btn btn-light bg-white border d-flex align-items-center justify-content-center gap-2 w-100 shadow-sm fw-medium rounded-3"
              style={{ fontSize: '13px', height: '38px', minHeight: '38px', marginBottom: '8px', flexShrink: 0 }}
            >
              <Google width={18} height={18} />
              <span>Continue with Google</span>
            </button>
            <button
              type="button"
              onClick={handleGithubSignup}
              className="btn btn-light bg-white border d-flex align-items-center justify-content-center gap-2 w-100 shadow-sm fw-medium rounded-3"
              style={{ fontSize: '13px', height: '38px', minHeight: '38px', marginBottom: '4px', flexShrink: 0 }}
            >
              <GitHub width={18} height={18} />
              <span>Continue with GitHub</span>
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0 10px 0', flexShrink: 0 }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }}></div>
              <span style={{ padding: '0 12px', fontSize: '11px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.05em' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }}></div>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* First Name & Last Name */}
              <div className="d-flex gap-2 mb-2" style={{ flexShrink: 0 }}>
                <div className="w-50">
                  <label htmlFor="first-name" style={{ fontWeight: 700, fontSize: '12px', color: '#111827', display: 'block', marginBottom: '4px' }}>
                    First Name
                  </label>
                  <div className="input-group rounded-3 overflow-hidden bg-white" style={{ height: '38px', minHeight: '38px', border: '1px solid #D1D5DB' }}>
                    <input
                      id="first-name"
                      type="text"
                      className="form-control border-0 shadow-none bg-white h-100"
                      placeholder="e.g. John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      style={{ fontSize: '13px', padding: '0 12px' }}
                    />
                  </div>
                </div>

                <div className="w-50">
                  <label htmlFor="last-name" style={{ fontWeight: 700, fontSize: '12px', color: '#111827', display: 'block', marginBottom: '4px' }}>
                    Last Name
                  </label>
                  <div className="input-group rounded-3 overflow-hidden bg-white" style={{ height: '38px', minHeight: '38px', border: '1px solid #D1D5DB' }}>
                    <input
                      id="last-name"
                      type="text"
                      className="form-control border-0 shadow-none bg-white h-100"
                      placeholder="e.g. Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      style={{ fontSize: '13px', padding: '0 12px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="mb-2" style={{ flexShrink: 0 }}>
                <label htmlFor="signup-email" style={{ fontWeight: 700, fontSize: '12px', color: '#111827', display: 'block', marginBottom: '4px' }}>
                  Email Address
                </label>
                <div className="input-group rounded-3 overflow-hidden bg-white" style={{ height: '38px', minHeight: '38px', border: '1px solid #D1D5DB' }}>
                  <span className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center" style={{ padding: '0 10px', minWidth: '36px' }}>
                    <Mail width={16} height={16} color="#6A717D" />
                  </span>
                  <input
                    id="signup-email"
                    type="email"
                    className="form-control border-0 shadow-none bg-white h-100"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ fontSize: '13px', padding: '0 10px 0 0' }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-2" style={{ flexShrink: 0 }}>
                <label htmlFor="signup-password" style={{ fontWeight: 700, fontSize: '12px', color: '#111827', display: 'block', marginBottom: '4px' }}>
                  Password
                </label>
                <div className="input-group rounded-3 overflow-hidden bg-white" style={{ height: '38px', minHeight: '38px', border: '1px solid #D1D5DB' }}>
                  <span className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center" style={{ padding: '0 10px', minWidth: '36px' }}>
                    <Lock width={16} height={16} />
                  </span>
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    className="form-control border-0 shadow-none bg-white h-100"
                    placeholder="Create password (min 8 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ fontSize: '13px', padding: '0 10px 0 0' }}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-white border-0 d-flex align-items-center justify-content-center"
                    style={{ padding: '0 10px', cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff width={16} height={16} /> : <Eye width={16} height={16} />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="d-flex align-items-center gap-2 mb-3" style={{ flexShrink: 0, marginTop: '2px' }}>
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  style={{ cursor: "pointer", width: '15px', height: '15px' }}
                />
                <label htmlFor="terms" style={{ fontSize: "12px", color: "#4B5563", margin: 0, cursor: "pointer" }}>
                  I agree to the <Link to="/terms" style={{ color: "#103CA4", fontWeight: 600 }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: "#103CA4", fontWeight: 600 }}>Privacy Policy</Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-3 fw-semibold"
                style={{
                  backgroundColor: "#103CA4",
                  borderColor: "#103CA4",
                  height: "40px",
                  minHeight: "40px",
                  fontSize: "14px",
                  flexShrink: 0,
                }}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              {/* Footer link */}
              <div className="text-center mt-3" style={{ fontSize: "13px", color: "#6B7280", flexShrink: 0 }}>
                Already have an account? <Link to="/login" style={{ color: "#103CA4", fontWeight: 600 }}>Log In</Link>
              </div>
            </div>
          </form>
        </SignupCard>
      </div>
    </div>
  );
}
