import React from "react";
import { useParams } from "react-router-dom";
import ClientProfileSetting from "./Profile/ClientProfileSetting";
import ClientAccountSecurity from "./AccountSecurity/ClientAccountSecurity";
import ClientNotificationsSetting from "./Notifications/ClientNotificationsSetting";
import ClientPrivacySetting from "./Privacy/ClientPrivacySetting";
import ClientBillingPayments from "./BillingPayments/ClientBillingPayments";
import ClientDeactivateAccount from "./DeactivateAccount/ClientDeactivateAccount";
import ClientSignOutSetting from "./SignOut/ClientSignOutSetting";

export default function ClientSettingsWrapper() {
  const { tab } = useParams();
  const currentTab = (tab || "profile").toLowerCase();

  switch (currentTab) {
    case "account-security":
      return <ClientAccountSecurity />;
    case "notifications":
      return <ClientNotificationsSetting />;
    case "privacy":
      return <ClientPrivacySetting />;
    case "billing-payments":
      return <ClientBillingPayments />;
    case "deactivate-account":
      return <ClientDeactivateAccount />;
    case "sign-out":
      return <ClientSignOutSetting />;
    case "profile":
    default:
      return <ClientProfileSetting />;
  }
}

