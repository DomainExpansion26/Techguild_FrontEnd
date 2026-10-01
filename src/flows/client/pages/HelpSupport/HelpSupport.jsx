import React, { useState } from "react";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";

export default function HelpSupport() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "How do I post a new Quest or contract?", a: "Navigate to Quest Board from the navigation menu and click '+ Post a New Quest'. Specify the budget, required tech stack, and deliverable deadlines." },
    { q: "How does the milestone escrow system work?", a: "When you accept a freelancer or agency proposal, the milestone funds are safely locked in platform escrow. Funds are released only after you review and approve the submitted deliverables." },
    { q: "How do I verify my company credentials?", a: "Visit the Verification Hub and upload your business registration documents, Certificate of Incorporation, or GST/Tax identification." },
    { q: "What should I do if a deliverable needs revisions?", a: "On the Active Quests workroom, click 'Request Revision' on the milestone submission to send feedback directly to the freelancer." },
  ];

  return (
    <DashboardLayout>
      <div className="p-4" style={{ maxWidth: "1000px", margin: "0 auto", width: "100%", flex: 1, minHeight: 0, overflowY: "auto" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111827", marginBottom: "4px" }}>
          Client Help & Support Center
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
          Get assistance with quest postings, milestone escrows, agency hiring, and platform compliance.
        </p>

        <div className="row g-4 mb-4">
          <div className="col-12 col-md-4">
            <Cards padding="24px" className="border text-center h-100">
              <div className="d-inline-flex p-3 rounded-circle bg-primary-subtle text-primary mb-3">
                <Icon name="Mail" size={24} />
              </div>
              <h3 className="fs-6 fw-bold text-dark mb-1">Account Manager</h3>
              <p className="text-muted small mb-3">Priority enterprise & client support</p>
              <a href="mailto:client-support@techguild.io" className="btn btn-sm btn-outline-primary w-100">
                Contact Desk
              </a>
            </Cards>
          </div>

          <div className="col-12 col-md-4">
            <Cards padding="24px" className="border text-center h-100">
              <div className="d-inline-flex p-3 rounded-circle bg-success-subtle text-success mb-3">
                <Icon name="ShieldCheck" size={24} />
              </div>
              <h3 className="fs-6 fw-bold text-dark mb-1">Escrow & Billing</h3>
              <p className="text-muted small mb-3">Invoicing, receipts & dispute resolution</p>
              <a href="mailto:billing@techguild.io" className="btn btn-sm btn-outline-success w-100">
                Billing Support
              </a>
            </Cards>
          </div>

          <div className="col-12 col-md-4">
            <Cards padding="24px" className="border text-center h-100">
              <div className="d-inline-flex p-3 rounded-circle bg-info-subtle text-info mb-3">
                <Icon name="BookOpen" size={24} />
              </div>
              <h3 className="fs-6 fw-bold text-dark mb-1">Hiring Guides</h3>
              <p className="text-muted small mb-3">Best practices for hiring vetted talent</p>
              <button type="button" className="btn btn-sm btn-outline-info w-100" onClick={() => alert("TechGuild Client Hiring Guide documentation.")}>
                Read Guide
              </button>
            </Cards>
          </div>
        </div>

        <Cards padding="28px">
          <h2 className="fs-5 fw-bold text-dark mb-3">Frequently Asked Questions</h2>
          <div className="d-flex flex-column gap-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border rounded-3 p-3">
                <div
                  className="d-flex justify-content-between align-items-center cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="fw-semibold text-dark">{faq.q}</span>
                  <Icon name={openFaq === idx ? "ChevronUp" : "ChevronDown"} size={18} color="#6b7280" />
                </div>
                {openFaq === idx && (
                  <p className="mt-2 text-secondary small mb-0 pt-2 border-top">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Cards>
      </div>
    </DashboardLayout>
  );
}
