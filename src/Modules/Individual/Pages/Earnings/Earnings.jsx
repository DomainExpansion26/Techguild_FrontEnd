import React from "react";
import { Search, Bell, Mail } from "lucide-react";
import { Navbar, Cards } from "@/Components";
import "../DashBoard/dashboard.css";
import "./earnings.css";

export default function Earnings() {
  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="main-workspace">
        <Cards className="header-card" padding="0">
          <header className="header">
            <div className="header-search-bar">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search for Clients, projects or freelancers.."
                className="search-input"
              />
            </div>
            <div className="header-actions">
              <button className="icon-btn">
                <Bell size={20} />
              </button>
              <button className="icon-btn">
                <Mail size={20} />
              </button>
              <div className="header-avatar">A</div>
            </div>
          </header>
        </Cards>

        <div className="dashboard-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100% - 70px)" }}>
          <div className="dummy-page-card" style={{ padding: "40px", backgroundColor: "#ffffff", borderRadius: "10px", border: "1.26px solid #e5e7eb", textAlign: "center", maxWidth: "400px" }}>
            <h1 style={{ fontSize: "24px", color: "#111827", marginBottom: "12px", fontWeight: "700" }}>Earnings & Payouts Page</h1>
            <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: "1.5" }}>
              This is a dummy page for user Earnings & Payouts. Real features will be integrated here soon.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
