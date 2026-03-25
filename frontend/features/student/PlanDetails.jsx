"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import StudyPlanCard from "./components/StudyPlanCard";
import CreateCustomPlan from "./components/CreateCustomPlan";
import StudyPlanTimeline from "./components/PlanHistorySection";
import { apiService } from "../../service/Apicall"; // adjust path

const PlanDetails = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const fetchPlans = () => {
    apiService({
      endpoint: "/api/study-plans/",
      method: "GET",
      onSuccess: (res) => {
        setPlans(res);
        if (res.length > 0) {
          setSelectedPlan(res[0]); // default first plan
        }
      },
      onError: (err) => console.error(err),
    });
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="w-full p-4 md:p-8 h-screen">
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
      <Box
        sx={{
          display: "flex",
          gap: 3,
          overflowX: "auto",
          pb: 2,
          flexWrap: { xs: "nowrap", md: "wrap" },
        }}
      >
        {plans.map((plan) => {
          const isActive = selectedPlan?.id === plan.id; // ✅ define here

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`cursor-pointer rounded-xl transition-all duration-300
        ${
          isActive
            ? "ring-4 ring-blue-500 shadow-lg shadow-blue-500/30"
            : "hover:ring-1 hover:ring-white/20"
        }
      `}
            >
              <StudyPlanCard
                subject={`Subject ${plan.subject}`}
                title={plan.plan_name}
                progress={plan.overall_progress}
                status={plan.status}
              />
            </div>
          );
        })}
      </Box>

      <CreateCustomPlan refreshPlans={fetchPlans} />

      {selectedPlan && (
        <StudyPlanTimeline plan={selectedPlan} refreshPlans={fetchPlans} />
      )}
    </div>
  );
};

export default PlanDetails;
