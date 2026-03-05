"use client";
import React from "react";
import { LinearProgress } from "@mui/material";

const StudyPlanCard = ({ subject, title, progress, status }) => {
  const isCompleted = progress === 100;

  return (
    <div className="min-w-[300px] bg-gradient-to-br from-[#0f172a] to-[#111827] border border-white/10 rounded-2xl p-6 relative hover:border-blue-500 transition-all duration-300">
      
      {/* Active Badge */}
      {status === "active" && (
        <span className="absolute top-4 right-4 text-xs bg-blue-600 px-3 py-1 rounded-full text-white">
          ACTIVE
        </span>
      )}

      <p className="text-xs text-blue-400 uppercase tracking-wide">
        {subject}
      </p>

      <h3 className="text-white font-semibold mt-2">
        {title}
      </h3>

      <div className="mt-4">
        <p className="text-xs text-gray-400 mb-2">
          {isCompleted
            ? "Completed"
            : `Current Progress: ${progress}%`}
        </p>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 5,
            backgroundColor: "rgba(255,255,255,0.08)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: isCompleted ? "#22c55e" : "#2563EB",
            },
          }}
        />
      </div>
    </div>
  );
};

export default StudyPlanCard;