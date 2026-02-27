"use client";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function StatCard({
  title,
  value,
  icon: Icon,
  growth,
  growthText,
}) {
  return (
    <div className="relative bg-gradient-to-br from-[#111827] to-[#0f172a] 
                    rounded-2xl p-6 w-full 
                    border border-white/5
                    shadow-lg hover:shadow-blue-500/10
                    transition-all duration-300">

      {/* Icon */}
      <div className="flex justify-between items-start mb-6">
        <div className="bg-blue-600/20 p-3 rounded-xl">
          {Icon && <Icon className="text-blue-500" fontSize="medium" />}
        </div>
      </div>

      {/* Title */}
      <p className="text-gray-400 text-sm mb-1">
        {title}
      </p>

      {/* Value */}
      <h2 className="text-3xl font-bold text-white">
        {value}
      </h2>

      {/* Growth */}
      {growth && (
        <div className="flex items-center gap-1 mt-3 text-sm">
          <TrendingUpIcon className="text-green-400" fontSize="small" />
          <span className="text-green-400 font-medium">
            {growth}
          </span>
          <span className="text-gray-500">
            {growthText}
          </span>
        </div>
      )}
    </div>
  );
}