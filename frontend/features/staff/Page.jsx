
"use client";

import { useEffect, useState } from "react";
import DashboardStatCard from "./components.jsx/DashboardStatCard";
import PerformanceCharts from "./components.jsx/PerformanceCharts";
import DashboardHeader from "./components.jsx/DashboardHeader";

import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { apiService } from "../../service/Apicall";


const StaffPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [batch, setBatch] = useState("1"); // 👈 default batch

  // 🔥 API CALL FUNCTION
  const fetchDashboard = (selectedBatch) => {
    apiService({
      endpoint: `/api/staff/dashboard-overview/?batch=${selectedBatch}`,
      method: "GET",
      onSuccess: (data) => {
        setDashboardData(data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  // 🔥 INITIAL LOAD
  useEffect(() => {
    fetchDashboard(batch);
  }, []);

  // 🔥 FILTER CHANGE HANDLER
  const handleBatchChange = (value) => {
    setBatch(value);
    fetchDashboard(value);
  };

  // 🔥 DYNAMIC STATS
  const statsData = dashboardData
    ? [
        {
          title: "Total Students",
          value: dashboardData.summary.total_students,
          subtitle: "Enrolled",
          icon: SchoolIcon,
        },
        {
          title: "Overall Performance",
          value: `${dashboardData.summary.overall_performance}%`,
          subtitle: "Avg Score",
          progress: dashboardData.summary.overall_performance,
          valueColor: "text-blue-400",
          icon: TrendingUpIcon,
        },
        {
          title: "Pass Percentage",
          value: `${dashboardData.summary.pass_percentage}%`,
          icon: CheckCircleIcon,
        },
        {
          title: "Students At Risk",
          value: dashboardData.summary.students_at_risk,
          subtitle: "Critical",
          valueColor: "text-red-500",
          actionText: "View List",
          actionColor: "text-red-400",
          icon: WarningAmberIcon,
        },
      ]
    : [];

  return (
    <div className="bg-[#0b1220] px-4 min-h-screen">
      {/* 🔥 HEADER */}
      <DashboardHeader onBatchChange={handleBatchChange} />

      {/* 🔥 LOADING */}
      {!dashboardData ? (
        <div className="text-white p-10">Loading...</div>
      ) : (
        <>
          {/* 🔥 CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {statsData.map((card, index) => (
              <DashboardStatCard key={index} {...card} />
            ))}
          </div>

          {/* 🔥 CHARTS */}
          <PerformanceCharts data={dashboardData} />
        </>
      )}
    </div>
  );
};

export default StaffPage;