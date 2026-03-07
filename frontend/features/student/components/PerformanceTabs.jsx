"use client";

import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";

const PerformanceTabs = () => {
  const [activeMainTab, setActiveMainTab] = useState("Semester Wise");
  const [activeSemester, setActiveSemester] = useState("Semester 1");
  const [activeIAT, setActiveIAT] = useState("IAT 1");

  const mainTabs = ["Overall", "Semester Wise", "IAT Wise"];
  const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];
  const iats = ["IAT 1", "IAT 2", "IAT 3"];

  return (
    <Box sx={{ mt: 3 }}>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          overflowX: "auto",
        }}
      >

        {/* MAIN TABS */}
        <ToggleButtonGroup
          value={activeMainTab}
          exclusive
          onChange={(e, newValue) => newValue && setActiveMainTab(newValue)}
          sx={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: "30px",
            padding: "4px",
            "& .MuiToggleButton-root": {
              border: "none",
              borderRadius: "30px",
              px: { xs: 2, sm: 3 },
              py: 1,
              textTransform: "none",
              fontSize: { xs: "12px", sm: "14px" },
              color: "#9CA3AF",
            },
            "& .Mui-selected": {
              backgroundColor: "#2563EB !important",
              color: "#fff !important",
              boxShadow: "0px 4px 14px rgba(37,99,235,0.4)",
            },
          }}
        >
          {mainTabs.map((tab) => (
            <ToggleButton key={tab} value={tab}>
              {tab}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* SEMESTER TABS */}
        {activeMainTab === "Semester Wise" && (
          <ToggleButtonGroup
            value={activeSemester}
            exclusive
            onChange={(e, newValue) => newValue && setActiveSemester(newValue)}
            sx={{
              display: "flex",
              gap: "10px",
              "& .MuiToggleButton-root": {
                border: "none",
                borderRadius: "30px",
                px: { xs: 2, sm: 3 },
                py: 1,
                fontSize: { xs: "12px", sm: "14px" },
                textTransform: "none",
                color: "#9CA3AF",
                background: "rgba(255,255,255,0.05)",
                whiteSpace: "nowrap", 
              },
              "& .Mui-selected": {
                backgroundColor: "#2563EB !important",
                color: "#fff !important",
              },
            }}
          >
            {semesters.map((sem) => (
              <ToggleButton key={sem} value={sem}>
                {sem}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}

        {/* IAT TABS */}
        {activeMainTab === "IAT Wise" && (
          <ToggleButtonGroup
            value={activeIAT}
            exclusive
            onChange={(e, newValue) => newValue && setActiveIAT(newValue)}
            sx={{
              display: "flex",
              gap: "10px",
              "& .MuiToggleButton-root": {
                border: "none",
                borderRadius: "30px",
                px: { xs: 2, sm: 3 },
                py: 1,
                fontSize: { xs: "12px", sm: "14px" },
                textTransform: "none",
                color: "#9CA3AF",
                background: "rgba(255,255,255,0.05)",
              },
              "& .Mui-selected": {
                backgroundColor: "#2563EB !important",
                color: "#fff !important",
              },
            }}
          >
            {iats.map((iat) => (
              <ToggleButton key={iat} value={iat}>
                {iat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}

      </Box>
    </Box>
  );
};

export default PerformanceTabs;