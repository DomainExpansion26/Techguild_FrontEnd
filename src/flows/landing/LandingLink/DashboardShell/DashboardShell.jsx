import { DashboardLayout } from "@/Components";
import { INDIVIDUAL_MENU_ITEMS } from "@/constants/navigation";
import "./DashboardShell.css";

const LANDING_MENU_ITEMS = INDIVIDUAL_MENU_ITEMS.map((item) => {
  if (item.id === "quest-board") {
    return { ...item, path: "/quest-board", aliases: ["/individual/quest-board", "/individual/projects"] };
  }

  if (item.id === "verification") {
    return {
      ...item,
      path: "/verify-organization",
      aliases: ["/get-verified", "/verification", "/verification-hub"],
    };
  }

  return item;
});

export default function DashboardShell({ children }) {
  return (
    <DashboardLayout
      navbarItems={LANDING_MENU_ITEMS}
      userRole="individual"
      mainWorkspaceClass="dash-workspace"
    >
      <div className="dash-content">{children}</div>
    </DashboardLayout>
  );
}
