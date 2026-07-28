import { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import DashboardChart from "../components/DashboardChart";
import RecentCustomers from "../components/RecentCustomers";
import RecentClaims from "../components/RecentClaims";
import QuickActions from "../components/QuickActions";

import { getDashboard } from "../services/dashboardService";

import "./Dashboard.css";

export default function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const res = await getDashboard();

      setDashboard(res.dashboard);

    } catch (err) {

      console.error("Dashboard Error:", err);

    }

  };

  if (!dashboard) {

    return (
      <div className="dashboard">
        <h2 style={{ color: "white", textAlign: "center" }}>
          Loading Dashboard...
        </h2>
      </div>
    );

  }

  return (

    <div className="dashboard">

      <h1 className="dashboard-title">
        🏥 Insurance Management Dashboard
      </h1>

      {/* Statistics Cards */}

      <div className="dashboard-grid">

        <StatCard
          title="Customers"
          value={dashboard.total_customers}
        />

        <StatCard
          title="Policies"
          value={dashboard.total_policies}
        />

        <StatCard
          title="Customer Policies"
          value={dashboard.total_customer_policies}
        />

        <StatCard
          title="Claims"
          value={dashboard.total_claims}
        />

        <StatCard
          title="Approved Claims"
          value={dashboard.approved_claims}
        />

        <StatCard
          title="Pending Claims"
          value={dashboard.pending_claims}
        />

        <StatCard
          title="Rejected Claims"
          value={dashboard.rejected_claims}
        />

        <StatCard
          title="Premium Collected"
          value={`₹${dashboard.total_premium_collected}`}
        />

      </div>

      {/* Chart */}

      <div style={{ marginTop: "30px" }}>
        <DashboardChart />
      </div>

      {/* Recent Customers */}

      <div style={{ marginTop: "30px" }}>
        <RecentCustomers />
      </div>

      {/* Recent Claims */}

      <div style={{ marginTop: "30px" }}>
        <RecentClaims />
      </div>

      {/* Quick Actions */}

      <div style={{ marginTop: "30px", marginBottom: "40px" }}>
        <QuickActions />
      </div>

    </div>

  );

}