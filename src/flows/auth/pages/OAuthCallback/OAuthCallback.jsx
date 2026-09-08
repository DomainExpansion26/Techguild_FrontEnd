import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import oauthApi from "@/features/auth/api/oauthApi";
import { LoadingSpinner } from "@/Components/feedback";

export default function OAuthCallback() {
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
        setError(err.message || "Failed to authenticate with OAuth provider");
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
  }, [searchParams, login, navigate]);

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h3 style={{ color: "#dc2626" }}>Authentication Error</h3>
        <p style={{ color: "#4b5563" }}>{error}</p>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-primary"
          style={{ marginTop: "16px" }}
        >
          Return to Login
        </button>
      </div>
    );
  }

  return <LoadingSpinner fullScreen text="Authenticating with provider..." />;
}
