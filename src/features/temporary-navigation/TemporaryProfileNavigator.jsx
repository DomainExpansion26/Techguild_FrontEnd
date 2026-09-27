import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { navigateByAccountType } from "./temporaryNavigation";

// Mount this once (e.g. inside AppRoutes) to run the temporary profile-based
// navigation. Renders nothing; only redirects when the account type is known.
// It never navigates if the profile request fails unless a `fallback` route
// is passed via props.

export default function TemporaryProfileNavigator({ fallback = null }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    let active = true;

    (async () => {
      const navigated = await navigateByAccountType(navigate);
      if (!navigated && active && fallback) {
        navigate(fallback);
      }
    })();

    return () => {
      active = false;
    };
  }, [isAuthenticated, navigate, fallback]);

  return null;
}