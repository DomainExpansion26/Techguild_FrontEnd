import React from "react";
import { useParams } from "react-router-dom";
import ProfileSetting from "./Profile/ProfileSetting";
import AccountSecurity from "./AccountSecurity/AccountSecurity";
import NotificationsSetting from "./Notifications/NotificationsSetting";
import PrivacySetting from "./Privacy/PrivacySetting";
import BillingPayments from "./BillingPayments/BillingPayments";
import DeactivateAccount from "./DeactivateAccount/DeactivateAccount";
import SignOutSetting from "./SignOut/SignOutSetting";

export default function IndividualSettingsWrapper() {
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
      return <ProfileSetting />;
  }
}
