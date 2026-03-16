"use client";
import React, { useState } from "react";
import { Modal, Box, Tabs, Tab, Button } from "@mui/material";
import InputField from "./Inputfields";

function TabPanel({ children, value, index }) {
  return value === index && (
    <Box sx={{ p: 2 }}>
      {children}
    </Box>
  );
}

export default function TabsModal({
  open,
  handleClose,
  tabs,
  formData,
  handleChange,
  onSubmit
}) {

  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 650,
          bgcolor: "#0f1c2e",
          borderRadius: 3,
          p: 3,
          display: "flex",
        }}
      >
        {/* LEFT SIDE TABS */}
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleTabChange}
          sx={{ borderRight: 1, borderColor: "divider", minWidth: 150 }}
        >
          {tabs.map((tab, i) => (
            <Tab key={i} label={tab.label} />
          ))}
        </Tabs>

        {/* RIGHT SIDE FORM */}
        <Box sx={{ flex: 1 }}>

          {tabs.map((tab, index) => (
            <TabPanel key={index} value={value} index={index}>
              
              <div className="flex flex-col gap-4">

                {tab.fields.map((field) => (
                  <InputField
                    key={field.name}
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      handleChange(field.name, e.target.value)
                    }
                    placeholder={field.label}
                    options={field.options || []}
                  />
                ))}

                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={onSubmit}
                >
                  Save
                </Button>

              </div>

            </TabPanel>
          ))}

        </Box>
      </Box>
    </Modal>
  );
}