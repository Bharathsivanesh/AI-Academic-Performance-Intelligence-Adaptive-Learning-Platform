"use client";
import * as React from "react";
import { Modal, Box, Tabs, Tab, Button } from "@mui/material";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ height: "100%" }}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function TabModal({ open, handleClose, tabs = [], onSubmit }) {
  const [value, setValue] = React.useState(0);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "900px",
          height: "550px",
          bgcolor: "#0b1220",
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          position: "absolute",
          top: "50%",
          left: "50%",
          border: "2px solid #1d4ed8",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* LEFT SIDEBAR */}
        <Box
          sx={{
            width: "220px",
            bgcolor: "#111827",
            borderRight: "1px solid #1f2937",
            p: 2,
          }}
        >
         

          <Tabs
            orientation="vertical"
            value={value}
            onChange={(e, v) => setValue(v)}
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              "& .MuiTab-root": {
                alignItems: "flex-start",
                borderRadius: "10px",
                textTransform: "none",
                color: "#9ca3af",
                mb: 1,
              },
              "& .Mui-selected": {
                backgroundColor: "#1d4ed8",
                color: "#ffff",
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Box>

        {/* RIGHT CONTENT */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* CONTENT */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Chrome
              },
            }}
          >
            {tabs.map((tab, index) => (
              <TabPanel key={index} value={value} index={index}>
                {tab.content}
              </TabPanel>
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
