"use client";

import { useState } from "react";
import { Drawer } from "@mui/material";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-[#0F172A] overflow-hidden">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block h-screen sticky top-0">
        <Sidebar role="admin" />
      </div>

      {/* MOBILE DRAWER */}
      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 260,
            backgroundColor: "#0B1120",
            borderRight: "none",
          },
        }}
      >
        <Sidebar role="admin" />
      </Drawer>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col h-screen">

        {/* NAVBAR */}
        <div className="sticky top-0 z-50">
          <Navbar
            userName="Bharath"
            role="ADMIN"
            onMenuClick={handleDrawerToggle}
          />
        </div>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}