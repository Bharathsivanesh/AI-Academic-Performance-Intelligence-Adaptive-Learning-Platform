"use client";

import { usePathname, useRouter } from "next/navigation";

import { Box, Typography } from "@mui/material";
import { sidebarMenu } from "../app/utils/Jsons/Sidebaradmin";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Box className="w-64 h-screen bg-[#0B1120] flex flex-col justify-between p-4 border-r border-white/5">
      
      {/* 🔹 TOP SECTION */}
      <Box className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            AI
          </div>
          <div>
            <Typography className="text-white font-semibold text-sm">
              AI Academic
            </Typography>
            <Typography className="text-gray-400 text-xs">
              Super Admin Panel
            </Typography>
          </div>
        </div>
      </Box>

      {/* 🔹 CENTER MENU (DYNAMIC) */}
      <Box className="flex-1">
        {sidebarMenu.map((item, index) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <div
              key={index}
              onClick={() => router.push(item.path)}
              className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-xl cursor-pointer transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <Icon fontSize="small" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          );
        })}
      </Box>

    </Box>
  );
}