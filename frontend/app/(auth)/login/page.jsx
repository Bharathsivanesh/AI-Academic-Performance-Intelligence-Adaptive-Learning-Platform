"use client";

import { useState } from "react";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InputField from "../../../components/Inputfields";

export default function Page() {
  const [role, setRole] = useState("superadmin");
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleSubmit = () => {
    console.log(form, role);
  };

  return (
  <div className="relative min-h-screen flex items-center justify-center text-white px-4 bg-[#0b1220] overflow-hidden">

  {/* Top Left Glow */}
  <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#1e3a8a] opacity-30 blur-[150px] rounded-full"></div>

  {/* Bottom Right Glow */}
  <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#065f46] opacity-30 blur-[150px] rounded-full"></div>

  {/* Content */}
  <div className="relative z-10 w-full max-w-md">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-400 to-blue-500 p-3 rounded-xl">
              <TrendingUpIcon sx={{ color: "#fff" }} />
            </div>
          </div>

          <h1 className="text-2xl font-semibold">AI Academic Intelligence</h1>
          <p className="text-gray-400 text-sm mt-1">
            Performance Analysis & Intelligence Hub
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <p className="text-xs text-gray-400 mb-3 text-center tracking-widest">
            SELECT PORTAL ACCESS
          </p>

          {/* MUI Toggle Buttons */}
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(e, newValue) => newValue && setRole(newValue)}
            fullWidth
            sx={{
              mb: 3,
              p:0.8,
              backgroundColor: "#0f1c2e",
              borderRadius: "10px",
              "& .MuiToggleButton-root": {
                color: "#9ca3af",
                border: "none",
              },
              "& .Mui-selected": {
                background: "linear-gradient(to right, #10b981, #2563eb)",
                color: "#fff",
                borderRadius: "6px",
              },
            }}
          >
            <ToggleButton value="superadmin">Super Admin</ToggleButton>
            <ToggleButton value="staff">Staff</ToggleButton>
            <ToggleButton value="student">Student</ToggleButton>
          </ToggleButtonGroup>

          {/* ID Field */}
          <div className="flex flex-col gap-6">
            <InputField
              type="text"
              label="ID / Register Number"
              placeholder="Enter your identification code"
              mandatory
              onChange={handleChange("id")}
            />
          

          {/* Password Field */}
          
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              mandatory
              onChange={handleChange("password")}
            />
              <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{
              py: 1.5,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              background: "linear-gradient(to right, #10b981, #2563eb)",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            Access Dashboard →
          </Button>
          </div>

          {/* MUI Gradient Button */}
        
        </div>

      
    </div>
        </div>

  );
}
