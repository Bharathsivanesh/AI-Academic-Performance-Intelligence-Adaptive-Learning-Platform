"use client";

import { useState } from "react";
import { Drawer } from "@mui/material";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";

export default function StaffLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <div className="flex h-full bg-[#0F172A]">

      {/* ✅ DESKTOP SIDEBAR */}
      <div className="hidden md:block">
        <Sidebar role="staff" />
      </div>

      {/* ✅ MOBILE DRAWER */}
      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 260,
            backgroundColor: "#0B1120",
            borderRight: "none",
          },
        }}
      >
        <Sidebar role="staff" />
      </Drawer>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <Navbar
          userName="Sivanesh"
          role="STAFF"
          onMenuClick={handleDrawerToggle}
        />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>

      </div>
    </div>
  );
}