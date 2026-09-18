import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import oauthApi from "@/features/auth/api/oauthApi";
import { LoadingSpinner } from "@/Components/feedback";
import { APP_STRINGS } from "@/constants/string";

export default function OAuthCallback() {
  const STRINGS = APP_STRINGS.AUTH.OAUTH;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const provider = window.location.pathname.includes("github") ? "github" : "google";

    async function processOAuth() {
      try {
        let result;
        if (provider === "github") {
          result = await oauthApi.handleGithubCallback(code, state);
        } else {
          result = await oauthApi.handleGoogleCallback(code, state);
        }

        if (result?.access_token) {
          await login(
            result.user || { name: "User", email: "oauth.user@example.com" },
            result.access_token,
            result.user?.role
          );
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError(err.message || STRINGS.DEFAULT_ERROR);
      }
    }

    if (code) {
      processOAuth();
    } else {
      // Direct token redirect fallback
      const token = searchParams.get("token") || searchParams.get("access_token");
      if (token) {
        login({ name: "User" }, token);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }
  }, [searchParams, login, navigate, STRINGS.DEFAULT_ERROR]);

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h3 style={{ color: "#dc2626" }}>{STRINGS.ERROR_TITLE}</h3>
        <p style={{ color: "#4b5563" }}>{error}</p>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-primary"
          style={{ marginTop: "16px" }}
        >
          {STRINGS.RETURN_TO_LOGIN}
        </button>
      </div>
    );
  }

  return <LoadingSpinner fullScreen text={STRINGS.LOADING_TEXT} />;
}
