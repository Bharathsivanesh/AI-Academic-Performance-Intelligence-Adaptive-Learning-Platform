"use client";

import DashboardStatCard from "./components.jsx/DashboardStatCard";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PerformanceCharts from "./components.jsx/PerformanceCharts";
import DashboardHeader from "./components.jsx/DashboardHeader";
const statsData = [
  {
    title: "Total Students",
    value: "128",
    subtitle: "Enrolled",
    growth: "+4%",
    growthText: "vs last semester",
    icon: SchoolIcon,
  },
  {
    title: "Overall Performance",
    value: "76.2%",
    subtitle: "Avg Score",
    progress: 76.2,
    valueColor: "text-blue-400",
    icon: TrendingUpIcon,
  },
  {
    title: "Pass Percentage",
    value: "92.4%",
    icon: CheckCircleIcon,
  },
  {
    title: "Students At Risk",
    value: "06",
    subtitle: "Critical",
    valueColor: "text-red-500",
    actionText: "View List",
    actionColor: "text-red-400",
    icon: WarningAmberIcon,
  },
];
const StaffPage = () => {
  
     return (
    <div className=" bg-[#0b1220] px-4 min-h-screen">
      
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {statsData.map((card, index) => (
          <DashboardStatCard key={index} {...card} />
        ))}
      </div>

      <PerformanceCharts />
    </div>
  

  );
};

export default StaffPage;