// Modules/Individual/Screen/Pages/Settings/Notifications/Notifications.jsx
import { useState } from "react";
import { DashboardLayout, Cards, Toggle } from "@/Components";
import "../settings.css";
import "./NotificationsSetting.css";

export default function Notifications() {
  // Initial data matching screenshot
  const initialSections = [
    {
      title: "Project & Work",
      items: [
        { label: "New project invites", desc: "When a client invites you to a project", email: true, push: true },
        { label: "Proposal accepted", desc: "When a client accepts your proposal", email: true, push: true },
        { label: "Project milestones", desc: "Reminders for upcoming deliverables", email: true, push: false },
        { label: "Contract signed", desc: "When a client signs a new contract", email: true, push: true },
      ],
    },
    {
      title: "Messages",
      items: [
        { label: "New messages", desc: "When someone sends you a message", email: false, push: true },
        { label: "Message mentions", desc: "When you are @mentioned", email: true, push: true },
      ],
    },
    {
      title: "Payments",
      items: [
        { label: "Payment received", desc: "When a payment is processed", email: true, push: true },
        { label: "Invoice reminders", desc: "7 and 1 day before invoice due", email: true, push: false },
        { label: "Payout status updates", desc: "When your payout is initiated or complete", email: true, push: true },
      ],
    },
    {
      title: "Reviews & Trust",
      items: [
        { label: "New review received", desc: "When a client leaves a review", email: true, push: true },
        { label: "Trust Points updates", desc: "When you earn or lose Trust Points", email: false, push: true },
      ],
    },
    {
      title: "Marketing",
      items: [
        { label: "Product updates & tips", desc: "New features and platform improvements", email: true, push: false },
        { label: "Weekly digest", desc: "Weekly summary of your account activity", email: true, push: false },
      ],
    },
  ];

  const [sections, setSections] = useState(initialSections);

  const handleToggle = (sectionIdx, itemIdx, type) => {
    const updatedSections = [...sections];
    updatedSections[sectionIdx].items[itemIdx][type] = !updatedSections[sectionIdx].items[itemIdx][type];
    setSections(updatedSections);
  };

  return (
    <DashboardLayout containerClass="settings-layout-collapsed-nav notifications-layout">
      <div className="settings-scroll-area">
        <div className="settings-container notifications-settings-container">

          {/* Header */}
          <div className="settings-header">
            <h1 className="settings-page-title">Notifications</h1>
            <p className="settings-page-subtitle">
              Choose what you get notified about and how.
            </p>
          </div>

          {/* Cards Loop */}
          {sections.map((section, sIdx) => (
            <Cards
              key={sIdx}
              className="settings-section notifications-settings-section"
              padding="24px 28px"
            >

              {/* Section title + Email/Push column headers on the same row */}
              <div className="settings-section-header notifications-card-header">
                <h2 className="settings-section-title">{section.title}</h2>
                <div className="notifications-toggle-group">
                  <span className="notifications-col-label">Email</span>
                  <span className="notifications-col-label">Push</span>
                </div>
              </div>

              {/* Items List */}
              <div className="settings-list-container">
                {section.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="notifications-list-item settings-list-item"
                  >
                    <div>
                      <div className="notifications-item-title">{item.label}</div>
                      <div className="notifications-item-desc">{item.desc}</div>
                    </div>

                    {/* Toggle Row — 80px centered cells, same pitch as headers */}
                    <div className="notifications-toggle-group">
                      <div className="notifications-toggle-cell">
                        <Toggle
                          active={item.email}
                          onClick={() => handleToggle(sIdx, iIdx, "email")}
                        />
                      </div>
                      <div className="notifications-toggle-cell">
                        <Toggle
                          active={item.push}
                          onClick={() => handleToggle(sIdx, iIdx, "push")}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Cards>
          ))}

        </div>
      </div>
    </DashboardLayout>
  );
}
