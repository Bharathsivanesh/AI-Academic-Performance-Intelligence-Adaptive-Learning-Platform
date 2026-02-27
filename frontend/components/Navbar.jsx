"use client";

import {
  Avatar,
  Badge,
  IconButton,
  Chip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

export default function Navbar({
  userName = "Admin User",
  role = "SUPER ADMIN",
}) {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Add logout logic
    router.push("/login");
  };

  return (
    <div className="w-full h-16 bg-[#0B1120] border-b border-white/5 flex items-center justify-end px-6">
      
      <div className="flex items-center gap-6">

        {/* 🔵 Role Badge */}
        <Chip
          label={role}
          size="small"
          sx={{
            backgroundColor: "#1D4ED8",
            color: "#fff",
            fontWeight: 600,
            fontSize: "11px",
            padding:2,
            letterSpacing: "0.5px",
            borderRadius:"10px"
          }}
        />

        {/* 🔔 Notification */}
        <IconButton>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon sx={{ color: "#ffffff" }} />
          </Badge>
        </IconButton>

        {/* 👤 User Info */}
        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
          <Avatar
            sx={{
              width: 36,
              height: 36,
              backgroundColor: "#1e3a8a",
              fontSize: 14,
            }}
          >
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>

          <span className="text-white text-sm font-medium">
            {userName}
          </span>

          {/* 🚪 Logout */}
          <IconButton onClick={handleLogout}>
            <LogoutIcon sx={{ color: "#3B82F6" }} />
          </IconButton>
        </div>

      </div>
    </div>
  );
}