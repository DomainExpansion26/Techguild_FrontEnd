import { useEffect, useReducer, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store";
import { Google, GitHub, Mail, Lock, Eye, EyeOff } from "@/Components/icons";
import "./SignUp.css";
import {
  AuthHomeScreen,
  BrandLogo,
  SignupCard,
  TextInput,
  SecondaryButton,
  PrimaryButton,
  Divider,
  TermsCheckbox,
} from "@/Components";
import authApi from "@/features/auth/api/authApi";
import oauthApi from "@/features/auth/api/oauthApi";
import { APP_STRINGS, APP_CONFIG, TOAST_MESSAGES, FORM_ERRORS } from "@/constants/string";
import { AUTH_ROUTES } from "@/constants/navigation";
import { ICON_SIZES } from "@/constants/sizes";

const { STORAGE_KEYS, PASSWORD_MIN_LENGTH, SIGNUP_REDIRECT_DELAY_MS } = APP_CONFIG.AUTH;

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  termsAccepted: false,
  showPassword: false,
  loading: false,
};

function signupReducer(state, action) {
  switch (action.type) {
    case "FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE":
      return { ...state, [action.field]: !state[action.field] };
    case "SUBMIT_START":
      return { ...state, loading: true };
    case "SUBMIT_END":
      return { ...state, loading: false };
    default:
      return state;
  }
}

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const STRINGS = APP_STRINGS.AUTH.SIGNUP;
  const navigateTimer = useRef(null);

  const [state, dispatchForm] = useReducer(signupReducer, initialState);
  const { firstName, lastName, email, password, termsAccepted, showPassword, loading } = state;

  useEffect(() => {
    return () => {
      if (navigateTimer.current) {
        clearTimeout(navigateTimer.current);
      }
    };
  }, []);

  const setField = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    dispatchForm({ type: "FIELD", field, value });
  };

  const handleSignup = async (e) => {
    e?.preventDefault();

    if (loading) return;

    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim();

    if (!cleanFirstName || !cleanLastName) {
      dispatch(showSnackbar({ message: FORM_ERRORS.AUTH.NAME_REQUIRED, type: "error" }));
      return;
    }

    if (!cleanEmail || !password) {
      dispatch(showSnackbar({ message: FORM_ERRORS.AUTH.EMAIL_PASSWORD_REQUIRED, type: "error" }));
      return;
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      dispatch(showSnackbar({ message: FORM_ERRORS.AUTH.PASSWORD_MIN_LENGTH, type: "warning" }));
      return;
    }

    if (!termsAccepted) {
      dispatch(showSnackbar({ message: FORM_ERRORS.AUTH.TERMS_REQUIRED, type: "warning" }));
      return;
    }

    dispatchForm({ type: "SUBMIT_START" });
    try {
      const response = await authApi.register({
        first_name: cleanFirstName,
        last_name: cleanLastName,
        email: cleanEmail,
        password,
      });

      // Save pending user profile info so real name is never replaced by dummy data.
      // Password is intentionally not persisted — nothing downstream needs it.
      try {
        localStorage.setItem(
          STORAGE_KEYS.PENDING_USER,
          JSON.stringify({
            firstName: cleanFirstName,
            lastName: cleanLastName,
            name: `${cleanFirstName} ${cleanLastName}`.trim(),
            email: cleanEmail,
          })
        );
      } catch {
        // Storage may be unavailable (private mode); signup still succeeds.
      }

      dispatch(
        showSnackbar({
          message:
            response?.message ||
            TOAST_MESSAGES.AUTH.REGISTER_SUCCESS,
          type: "success",
        })
      );

      navigateTimer.current = setTimeout(() => {
        navigate(AUTH_ROUTES.VERIFY_EMAIL, {
          state: {
            email: cleanEmail,
            firstName: cleanFirstName,
            lastName: cleanLastName,
          },
        });
      }, SIGNUP_REDIRECT_DELAY_MS);
    } catch (err) {
      dispatch(showSnackbar({
        message: err?.message || FORM_ERRORS.AUTH.REGISTER_FAILED,
        type: "error",
      }));
    } finally {
      dispatchForm({ type: "SUBMIT_END" });
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
          <form className="signup-form" onSubmit={handleSignup} noValidate>
            <div className="signup-heading">
              <BrandLogo />
              <h2 className="signup-title">{STRINGS.TITLE}</h2>
              <p className="signup-subtitle">{STRINGS.SUBTITLE}</p>
            </div>

            {/* Social Buttons */}
            <div className="signup-oauth-stack">
              <SecondaryButton
                className="signup-oauth"
                text={STRINGS.GOOGLE_BTN}
                icon={<Google width={ICON_SIZES.LG} height={ICON_SIZES.LG} />}
                iconPosition="left"
                onClick={handleGoogleSignup}
                disabled={loading}
              />
              <SecondaryButton
                className="signup-oauth"
                text={STRINGS.GITHUB_BTN}
                icon={<GitHub width={ICON_SIZES.LG} height={ICON_SIZES.LG} />}
                iconPosition="left"
                onClick={handleGithubSignup}
                disabled={loading}
              />
            </div>

            {/* Divider */}
            <div className="signup-divider-wrap">
              <Divider text={STRINGS.DIVIDER_OR} />
            </div>

            {/* First Name & Last Name */}
            <div className="signup-names">
              <TextInput
                id="first-name"
                name="firstName"
                placeholder={STRINGS.FIRST_NAME_PLACEHOLDER}
                aria-label={STRINGS.FIRST_NAME_LABEL}
                autoComplete="given-name"
                value={firstName}
                onChange={setField("firstName")}
                disabled={loading}
                containerClassName="signup-name-field"
              />
              <TextInput
                id="last-name"
                name="lastName"
                placeholder={STRINGS.LAST_NAME_PLACEHOLDER}
                aria-label={STRINGS.LAST_NAME_LABEL}
                autoComplete="family-name"
                value={lastName}
                onChange={setField("lastName")}
                disabled={loading}
                containerClassName="signup-name-field"
              />
            </div>

            {/* Email Address */}
            <TextInput
              id="signup-email"
              name="email"
              type="email"
              placeholder={STRINGS.EMAIL_PLACEHOLDER}
              aria-label={STRINGS.EMAIL_LABEL}
              autoComplete="email"
              value={email}
              onChange={setField("email")}
              disabled={loading}
              leftIcon={<Mail width={ICON_SIZES.MD} height={ICON_SIZES.MD} color="#6A717D" aria-hidden="true" />}
            />

            {/* Password */}
            <TextInput
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={STRINGS.PASSWORD_PLACEHOLDER}
              aria-label={STRINGS.PASSWORD_LABEL}
              autoComplete="new-password"
              value={password}
              onChange={setField("password")}
              disabled={loading}
              leftIcon={<Lock width={ICON_SIZES.MD} height={ICON_SIZES.MD} aria-hidden="true" />}
              rightIcon={
                <button
                  type="button"
                  className="signup-eye"
                  onClick={() => dispatchForm({ type: "TOGGLE", field: "showPassword" })}
                  aria-label={showPassword ? STRINGS.PASSWORD_HIDE_LABEL : STRINGS.PASSWORD_SHOW_LABEL}
                  aria-pressed={showPassword}
                  disabled={loading}
                >
                  {showPassword
                    ? <EyeOff width={ICON_SIZES.MD} height={ICON_SIZES.MD} />
                    : <Eye width={ICON_SIZES.MD} height={ICON_SIZES.MD} />}
                </button>
              }
            />

            {/* Terms Checkbox */}
            <TermsCheckbox
              checked={termsAccepted}
              onChange={setField("termsAccepted")}
              userAgreementLink={AUTH_ROUTES.TERMS}
              privacyPolicyLink={AUTH_ROUTES.PRIVACY}
            />

            {/* Submit Button */}
            <PrimaryButton
              className="signup-submit"
              type="submit"
              disabled={loading}
              text={loading ? STRINGS.SUBMIT_BTN_LOADING : STRINGS.SUBMIT_BTN}
            />

            {/* Footer link */}
            <p className="signup-footer">
              {STRINGS.FOOTER_PROMPT}{" "}
              <Link to={AUTH_ROUTES.LOGIN}>{STRINGS.FOOTER_LINK}</Link>
            </p>
          </form>
        </SignupCard>
      </div>
    </div>
  );
}
