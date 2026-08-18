import React from 'react';
import { DashboardLayout } from "@/Components";
import "./client-dashboard.css";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="dashboard-content">
        <div className="client-db-grid">
          {/* Skeleton layout left for the person who will work on the client flow */}
        </div>
      </div>
    </DashboardLayout>
  );
}

