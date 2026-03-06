"use client";

import {
  Avatar,
  Badge,
  IconButton,
  Chip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

export default function Navbar({
  userName = "Admin User",
  role = "SUPER ADMIN",
  onMenuClick,
}) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="w-full  h-16 bg-[#0B1120] border-b border-white/5 flex items-center justify-between px-4 md:px-6">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        <IconButton
          onClick={onMenuClick}
          sx={{ display: { xs: "block", md: "none" }, color: "#fff" }}
        >
          <MenuIcon />
        </IconButton>


      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 md:gap-6">

        <Chip
          label={role}
          size="small"
          sx={{
            backgroundColor: "#1D4ED8",
            color: "#fff",
            fontWeight: 600,
            fontSize: "11px",
            padding: 2,
            letterSpacing: "0.5px",
            borderRadius: "10px",
          }}
        />

        <IconButton>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon sx={{ color: "#ffffff" }} />
          </Badge>
        </IconButton>

        <div className="flex items-center gap-3 border-l border-white/10 pl-4 md:pl-6">
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

          <span className="text-white text-sm font-medium hidden sm:block">
            {userName}
          </span>

          <IconButton onClick={handleLogout}>
            <LogoutIcon sx={{ color: "#3B82F6" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}