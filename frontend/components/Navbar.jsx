"use client";

import React, { useState } from "react";
import {
  Avatar,
  Badge,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { useRouter } from "next/navigation";
import { apiService } from "../service/Apicall";

export default function Navbar({
  userName = "Admin User",
  role = "ADMIN",
  onMenuClick,
}) {
  const router = useRouter();

  const [openNotification, setOpenNotification] = useState(false);

 const handleLogout = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    await apiService({
      endpoint: "/api/logout/",
      method:   "POST",
      payload: {
        refresh: refreshToken,
      },
      onSuccess: () => {
        console.log("✅ Logout success");
      },
      onError: (err) => {
        console.error("❌ Logout API error", err);
      },
    });
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    // ✅ ALWAYS CLEAR TOKENS (even if API fails)
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    router.push("/login");
  }
};

  const handleOpenNotification = () => {
    setOpenNotification(true);
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  const notifications = [
    {
      id: 1,
      title: "New Staff Added",
      message: "A new staff member has been added to the system.",
      time: "2 mins ago",
    },
    {
      id: 2,
      title: "Student Data Updated",
      message: "Student records were updated successfully.",
      time: "10 mins ago",
    },
    {
      id: 3,
      title: "New Subject Created",
      message: "A new subject has been added to the curriculum.",
      time: "1 hour ago",
    },
  ];

  return (
    <>
      <div className="w-full h-16 bg-[#0B1120] border-b border-white/5 flex items-center justify-between px-4 md:px-6">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <IconButton
            onClick={onMenuClick}
            sx={{ display: { xs: "block", md: "none" }, color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* ROLE */}
          <Chip
            label={role}
            size="small"
            sx={{
              backgroundColor: "#1D4ED8",
              color: "#fff",
              fontWeight: 600,
              fontSize: "11px",
              padding: 2,
              borderRadius: "10px",
            }}
          />

          {/* NOTIFICATION */}
          {/* <IconButton onClick={handleOpenNotification}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon sx={{ color: "#ffffff" }} />
            </Badge>
          </IconButton> */}

          {/* USER */}
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

      {/* NOTIFICATION MODAL */}
      <Dialog
        open={openNotification}
        onClose={handleCloseNotification}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#0B1120",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
          },
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            fontWeight: 600,
          }}
        >
          Notifications
        </DialogTitle>

        <DialogContent sx={{ padding: 0 }}>

          <List>
            {notifications.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>

                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        backgroundColor: "#1D4ED8",
                        width: 40,
                        height: 40,
                      }}
                    >
                      <NotificationsActiveIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <span style={{ fontWeight: 600 }}>
                        {item.title}
                      </span>
                    }
                    secondary={
                      <>
                        <span style={{ color: "#9CA3AF" }}>
                          {item.message}
                        </span>
                        <br />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#6B7280",
                          }}
                        >
                          {item.time}
                        </span>
                      </>
                    }
                  />

                </ListItem>

                <Divider
                  sx={{ borderColor: "rgba(255,255,255,0.06)" }}
                />
              </React.Fragment>
            ))}
          </List>

        </DialogContent>

        <div className="p-4 flex justify-end border-t border-white/10">
          <Button
            variant="contained"
            onClick={handleCloseNotification}
            sx={{
              backgroundColor: "#2563EB",
              textTransform: "none",
              borderRadius: "8px",
            }}
          >
            Close
          </Button>
        </div>
      </Dialog>
    </>
  );
}