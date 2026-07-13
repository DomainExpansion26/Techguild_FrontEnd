import React from "react";
import { Search, Bell, Mail } from "lucide-react";
import { Navbar, Cards } from "@/Components";
import "./dashboard.css";

export default function DashBoard() {
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

        <div className="dashboard-content">

        </div>
      </main>
    </div>
  );
}
