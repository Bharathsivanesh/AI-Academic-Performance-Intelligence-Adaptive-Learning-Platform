"use client";
import React from "react";
import { Box } from "@mui/material";
import StudyPlanCard from "./components/StudyPlanCard";
import CreateCustomPlan from "./components/CreateCustomPlan";
import PlanHistorySection from "./components/PlanHistorySection";
import StudyPlanTimeline from "./components/PlanHistorySection";

const plans = [
  {
    subject: "Machine Learning",
    title: "Neural Networks: 7-Day Plan",
    progress: 35,
    status: "active",
  },
  {
    subject: "Quantum Physics",
    title: "Physics: IAT 1 Prep",
    progress: 100,
    status: "completed",
  },
  {
    subject: "Calculus III",
    title: "Math: Final Review",
    progress: 60,
    status: "active",
  },
];

const PlanDetails = () => {
  return (
    <div className="w-full  p-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm tracking-widest text-gray-400 uppercase">
          Recent Study Plans
        </h2>
        <button className="text-blue-400 text-sm hover:underline">
          View All History →
        </button>
      </div>

      {/* Cards */}
      <Box sx={{ display: "flex", gap: 3, overflowX: "auto", pb: 2 }}>
        {plans.map((plan, index) => (
          <StudyPlanCard
            key={index}
            subject={plan.subject}
            title={plan.title}
            progress={plan.progress}
            status={plan.status}
          />
        ))}
      </Box>

      <CreateCustomPlan/>
      <StudyPlanTimeline />
    </div>
  );
};

export default PlanDetails;