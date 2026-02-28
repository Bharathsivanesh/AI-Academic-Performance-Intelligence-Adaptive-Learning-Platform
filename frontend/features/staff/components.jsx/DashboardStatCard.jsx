"use client";

import { Box, LinearProgress } from "@mui/material";

export default function DashboardStatCard({
  title,
  value,
  subtitle,
  growth,
  growthText,
  progress,
  avatars,
  actionText,
  actionColor = "text-blue-400",
  valueColor = "text-white",
  icon: Icon, // 👈 icon component passed as prop
}) {
  return (
    <div
      className="relative rounded-3xl p-6 w-full
                 bg-gradient-to-br from-[#111827] to-[#0f172a]
                 border border-white/5 shadow-xl
                 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      {/* 🔹 Top Right Icon */}
      {Icon && (
        <div
          className="absolute top-5 right-5
                     bg-white/5 backdrop-blur-md
                     p-3 rounded-xl"
        >
          <Icon className="text-blue-600" fontSize="medium" />
        </div>
      )}

      {/* 🔹 Title */}
      <p className="text-gray-400 text-xs tracking-widest uppercase mb-4">
        {title}
      </p>

      {/* 🔹 Value + Subtitle */}
      <div className="flex items-end gap-2">
        <h2 className={`text-4xl font-bold ${valueColor}`}>
          {value}
        </h2>
        {subtitle && (
          <span className="text-gray-400 text-sm mb-1">
            {subtitle}
          </span>
        )}
      </div>

      {/* 🔹 Growth */}
      {growth && (
        <p className="text-green-400 text-sm mt-3">
          {growth}{" "}
          <span className="text-gray-400 text-xs">
            {growthText}
          </span>
        </p>
      )}

      {/* 🔹 Progress Bar */}
      {progress !== undefined && (
        <Box className="mt-4">
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 10,
              backgroundColor: "rgba(255,255,255,0.1)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#3b82f6",
                borderRadius: 10,
              },
            }}
          />
        </Box>
      )}

      {/* 🔹 Avatars */}
      {avatars && avatars.length > 0 && (
        <div className="flex items-center gap-2 mt-4">
          {avatars.map((avatar, i) => (
            <img
              key={i}
              src={avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full border-2 border-[#0f172a]"
            />
          ))}
        </div>
      )}

      {/* 🔹 Action Link */}
      {actionText && (
        <p
          className={`mt-4 text-sm cursor-pointer font-medium ${actionColor}`}
        >
          {actionText} →
        </p>
      )}
    </div>
  );
}