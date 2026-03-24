"use client";

import React, { useState, useEffect } from "react";
import { Bell, CheckCircle } from "lucide-react";
import { apiService } from "../../../service/Apicall"; // adjust path

const StudyPlanTimeline = ({ plan,refreshPlans }) => {
  const [localPlan, setLocalPlan] = useState(plan);

  // ✅ FIX: sync when user selects different plan
  useEffect(() => {
    setLocalPlan(plan);
  }, [plan]);

  if (!localPlan) return null;

  // ✅ Calculate progress
  const calculateProgress = (details) => {
    if (!details || details.length === 0) return 0;
    const completed = details.filter((d) => d.is_completed).length;
    return Math.round((completed / details.length) * 100);
  };

  // ✅ Mark day complete API
  const markAsComplete = (id) => {
    apiService({
      endpoint: `/api/plan/day-complete/${id}/`,
      method: "POST",
      onSuccess: () => {
        const updatedDetails = localPlan.details.map((item) =>
          item.id === id ? { ...item, is_completed: true } : item
        );

        const newProgress = calculateProgress(updatedDetails);

        setLocalPlan({
          ...localPlan,
          details: updatedDetails,
          overall_progress: newProgress,
        });
        refreshPlans()
      },
      onError: (err) => console.error(err),
    });
  };

  return (
    <div className="bg-[#0b1325] text-white rounded-2xl p-6 md:p-10 mt-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">

        <div>
          <h2 className="text-xl font-semibold">
            {localPlan.plan_name}
          </h2>

          <p className="text-gray-400 text-sm">
            Daily {localPlan.daily_hours} Hours • {localPlan.time_horizon_days} Days
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-[#0f172a] rounded-xl p-4 flex flex-col gap-3">

          <span className="text-blue-400 tracking-widest text-sm font-semibold">
            PLAN PROGRESS
          </span>

          <div className="flex items-center gap-4">

            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${localPlan.overall_progress}%` }}
              />
            </div>

            <span className="text-white font-semibold text-lg">
              {localPlan.overall_progress}%
            </span>

          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">

        {/* Center line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-[3px] bg-white/10" />

        {localPlan.details.map((item, index) => {

          const isLeft = index % 2 === 0;

          return (
            <div
              key={item.id}
              className={`relative flex mb-10
              ${isLeft ? "md:justify-start" : "md:justify-end"}
              justify-start`}
            >

              {/* Dot */}
              <div
                className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full
                ${item.is_completed ? "bg-green-500" : "bg-blue-500"}
              `}
              />

              {/* Card */}
              <div
                className={`ml-12 md:ml-0 md:w-1/2 relative z-10 ${
                  isLeft ? "md:pr-10" : "md:pl-10"
                }`}
              >
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">

                  <div className="flex justify-between items-center mb-2">

                    <span className="text-xs text-blue-400 tracking-wider">
                      DAY {item.day_number}
                    </span>

                    <div className="flex items-center gap-2">

                      {/* ✅ Click to complete */}
                      {!item.is_completed && (
                        <CheckCircle
                          size={18}
                          className="text-gray-400 hover:text-green-400 cursor-pointer transition"
                          onClick={() => markAsComplete(item.id)}
                        />
                      )}

                      <Bell size={16} className="text-gray-400" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {item.topic_name}
                  </h3>

                  {/* ✅ Completed label */}
                  {item.is_completed && (
                    <span className="text-green-400 text-xs">
                      ✅ Completed
                    </span>
                  )}

                </div>
              </div>

              {/* Step number */}
              <span
                className={`hidden md:block absolute text-6xl font-bold text-white/5
                ${isLeft ? "right-[55%]" : "left-[55%]"}
                top-1/2 -translate-y-1/2`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default StudyPlanTimeline;