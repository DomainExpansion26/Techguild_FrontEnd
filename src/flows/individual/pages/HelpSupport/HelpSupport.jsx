import React from "react";
import { DashboardLayout, Cards } from "@/Components";
import Icon from "@/Components/icons/Icon";
import "./helpsupport.css";

export default function HelpSupport() {
  const faqs = [
    { q: "How do contract milestone escrows work?", a: "When you start a contract with a client, the payment is deposited in secure escrow. Once you submit milestone deliverables and the client approves, funds are automatically released to your earnings." },
    { q: "What documents are required for identity verification?", a: "We accept government-issued IDs such as Aadhaar Card, PAN Card, Passport, or Driver's License alongside a live face photo for KYC compliance." },
    { q: "How are Guild Trust Points calculated?", a: "Points are awarded for completing account milestones: email verification (+10), profile completion (+20), ID verification (+40), and successful project completions." },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard-content p-4" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111827", marginBottom: "4px" }}>
          Help Center & Community Support
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
          Find answers to common questions, platform guidelines, and connect with the TechGuild team.
        </p>

        <div className="row g-4 mb-4">
          <div className="col-12 col-md-4">
            <Cards padding="24px" className="border text-center h-100">
              <div className="d-inline-flex p-3 rounded-circle bg-primary-subtle text-primary mb-3">
                <Icon name="Mail" size={24} />
              </div>
              <h3 className="fs-6 fw-bold text-dark mb-1">Email Support</h3>
              <p className="text-muted small mb-3">Direct assistance from our compliance team</p>
              <a href="mailto:support@techguild.dev" className="btn btn-outline-primary btn-sm rounded-3">
                support@techguild.dev
              </a>
            </Cards>
          </div>

          <div className="col-12 col-md-4">
            <Cards padding="24px" className="border text-center h-100">
              <div className="d-inline-flex p-3 rounded-circle bg-success-subtle text-success mb-3">
                <Icon name="ShieldCheck" size={24} />
              </div>
              <h3 className="fs-6 fw-bold text-dark mb-1">Verification Support</h3>
              <p className="text-muted small mb-3">Questions on identity documents & KYC status</p>
              <a href="/verification" className="btn btn-outline-success btn-sm rounded-3">
                Check Verification
              </a>
            </Cards>
          </div>

          <div className="col-12 col-md-4">
            <Cards padding="24px" className="border text-center h-100">
              <div className="d-inline-flex p-3 rounded-circle bg-info-subtle text-info mb-3">
                <Icon name="Users" size={24} />
              </div>
              <h3 className="fs-6 fw-bold text-dark mb-1">Guild Community</h3>
              <p className="text-muted small mb-3">Collaborate with fellow freelancers & teams</p>
              <a href="/party-management" className="btn btn-outline-info btn-sm rounded-3">
                Join Guild Parties
              </a>
            </Cards>
          </div>
        </div>

        <Cards padding="28px" className="border">
          <h2 className="fs-6 fw-bold text-dark mb-3">Frequently Asked Questions</h2>
          <div className="d-flex flex-column gap-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-3 rounded-3 bg-light">
                <div className="fw-semibold text-dark small mb-1">{faq.q}</div>
                <div className="text-muted small" style={{ lineHeight: "1.6" }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </Cards>
      </div>
    </DashboardLayout>
  );
}

