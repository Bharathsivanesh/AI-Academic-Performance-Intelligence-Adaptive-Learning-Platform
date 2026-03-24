"use client";

import React, { useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import { apiService } from "../../../service/Apicall";

const CreateCustomPlan = ({ refreshPlans }) => {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [hours, setHours] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePlan = () => {
    if (!subject || !duration || !hours) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    apiService({
      endpoint: "/api/study-plan/create/",
      method: "POST",
      payload: {
        subject: subject,
        plan_name: `AI - ${duration} Plan`,
        time_horizon_days: parseInt(duration),
        daily_hours: parseInt(hours),
        details: [
          {
            day_number: 1,
            topic_name: "Intro Topic",
          },
        ],
      },
      onSuccess: (res) => {
        setLoading(false);
        refreshPlans(); // 🔥 refresh UI
      },
      onError: (err) => {
        setLoading(false);
        console.error(err);
      },
    });
  };

  return (
    <div className="w-full max-w-6xl mt-12 md:px-0">

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
                <MenuItem value={1}>AI</MenuItem>
                <MenuItem value={2}>DSA</MenuItem>
                <MenuItem value={3}>OS</MenuItem>
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
                <MenuItem value="7">7 Days</MenuItem>
                <MenuItem value="14">14 Days</MenuItem>
                <MenuItem value="30">30 Days</MenuItem>
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
                <MenuItem value="2">2 Hours</MenuItem>
                <MenuItem value="4">4 Hours</MenuItem>
                <MenuItem value="6">6 Hours</MenuItem>
              </TextField>
            </div>
          </div>

          <button
            onClick={handleCreatePlan}
            className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300"
          >
            <BoltIcon fontSize="small" />
            {loading ? "Generating..." : "Generate Study Schedule"}
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