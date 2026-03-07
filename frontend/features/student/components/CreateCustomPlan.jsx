"use client";

import React, { useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";

const CreateCustomPlan = () => {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [hours, setHours] = useState("");

  return (
    <div className="w-full max-w-6xl mt-12  md:px-0">

      <div className="px-2 md:px-8">

        <h2 className="text-xl font-semibold text-white">
          Create Your Custom Plan
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Input your requirements and let AI handle the scheduling.
        </p>

        <div className="mt-6 bg-gradient-to-br from-[#0f172a] to-[#111827] border border-white/10 rounded-2xl p-4 md:p-8 backdrop-blur-xl shadow-xl">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Subject */}
            <div>
              <p className="text-xs text-blue-400 mb-2 tracking-wider uppercase">
                Select Subject
              </p>

              <TextField
                select
                fullWidth
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                size="small"
                sx={inputStyle}
              >
                <MenuItem value="Neural Networks">Neural Networks</MenuItem>
                <MenuItem value="Data Structures">Data Structures</MenuItem>
                <MenuItem value="Operating Systems">Operating Systems</MenuItem>
              </TextField>
            </div>

            {/* Duration */}
            <div>
              <p className="text-xs text-blue-400 mb-2 tracking-wider uppercase">
                Time Horizon
              </p>

              <TextField
                select
                fullWidth
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                size="small"
                sx={inputStyle}
              >
                <MenuItem value="7 days">7 Days</MenuItem>
                <MenuItem value="14 days">14 Days</MenuItem>
                <MenuItem value="30 days">30 Days</MenuItem>
              </TextField>
            </div>

            {/* Hours */}
            <div>
              <p className="text-xs text-blue-400 mb-2 tracking-wider uppercase">
                Daily Commitment
              </p>

              <TextField
                select
                fullWidth
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                size="small"
                sx={inputStyle}
              >
                <MenuItem value="2 hours">2 Hours</MenuItem>
                <MenuItem value="4 hours">4 Hours</MenuItem>
                <MenuItem value="6 hours">6 Hours</MenuItem>
              </TextField>
            </div>
          </div>

          <button className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300">
            <BoltIcon fontSize="small" />
            Generate Study Schedule
          </button>

        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: "#0f1c2e",
    borderRadius: "12px",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.1)",
    },
    "&:hover fieldset": {
      borderColor: "#2563EB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2563EB",
    },
  },
  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
};

export default CreateCustomPlan;