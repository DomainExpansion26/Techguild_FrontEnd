import React from "react";
import { useParams } from "react-router-dom";
import ClientProfileSetting from "./Profile/ClientProfileSetting";
import {
  AccountSecurity,
  NotificationsSetting,
  PrivacySetting,
  BillingPayments,
  DeactivateAccount,
  SignOutSetting,
} from "@/flows/shared/settings";

export default function ClientSettingsWrapper() {
  const { tab } = useParams();
  const currentTab = (tab || "profile").toLowerCase();

  switch (currentTab) {
    case "account-security":
      return <AccountSecurity />;
    case "notifications":
      return <NotificationsSetting />;
    case "privacy":
      return <PrivacySetting />;
    case "billing-payments":
      return <BillingPayments />;
    case "deactivate-account":
      return <DeactivateAccount />;
    case "sign-out":
      return <SignOutSetting />;
    case "profile":
    default:
      return <ClientProfileSetting />;
  }
}
