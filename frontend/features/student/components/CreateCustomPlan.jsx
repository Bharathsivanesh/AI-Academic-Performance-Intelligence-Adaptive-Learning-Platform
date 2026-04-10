import React, { useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import { apiService } from "../../../service/Apicall";
import Loader from "../../../components/Loader";
import { showToast } from "../../../components/Notification";

const CreateCustomPlan = ({ refreshPlans }) => {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [hours, setHours] = useState("");
  const [loading, setLoading] = useState(false);

  // ─── All logic unchanged ───────────────────────────────────────────────────
  const handleCreatePlan = async () => {
    if (!subject || !duration || !hours) {
      showToast("Please fill all fields!", "error");
      return;
    }
    setLoading(true);
    try {
      const generatedPlanResponse = await apiService({
        endpoint: "/api/study-plan/",
        method: "POST",
        payload: {
          subject,
          duration: parseInt(duration),
          dailyHours: parseInt(hours),
        },
      });

      let contentStr = generatedPlanResponse.choices[0].message.content;
      contentStr = contentStr.replace(/```json\s*/, "").replace(/```$/, "");
      const generatedPlan = JSON.parse(contentStr);

      const planData = {
        subject: 1,
        plan_name: generatedPlan.plan_name,
        time_horizon_days: generatedPlan.time_horizon_days,
        daily_hours: generatedPlan.daily_hours,
        details: generatedPlan.details.map((d) => ({
          day_number: d.day_number,
          topic_name: d.topic_name,
          video_links_pdf: d.video_links_pdf || d.video_links?.[0] || "",
          reference_links_pdf:
            d.reference_links_pdf || d.tutorial_links?.[0] || "",
        })),
      };

      await apiService({
        endpoint: "/api/study-plan/create/",
        method: "POST",
        payload: planData,
        onSuccess: (res) => {
          showToast("Study plan created successfully!", "success");
          setLoading(false);
          refreshPlans(); // parent handles modal close + refresh
        },
        onError: (err) => {
          console.error(err);
          showToast("Failed to save plan!", "error");
          setLoading(false);
        },
      });
    } catch (error) {
      console.error(error);
      showToast("Something went wrong!", "error");
      setLoading(false);
    }
  };
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Modal header text */}
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "17px",
            fontWeight: "600",
            color: "#e8f0ff",
            marginBottom: "4px",
          }}
        >
          Create Your Custom Plan
        </h2>
        <p style={{ fontSize: "13px", color: "#4a6a9a" }}>
          Input your requirements and let AI handle the scheduling.
        </p>
      </div>

      {/* Subject field */}
      <div style={{ marginBottom: "16px" }}>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "#5b9cf6",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
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
          <MenuItem value="AI">AI</MenuItem>
          <MenuItem value="DSA">DSA</MenuItem>
          <MenuItem value="OS">OS</MenuItem>
        </TextField>
      </div>

      {/* Duration + Hours side by side */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "#5b9cf6",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
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

        <div>
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "#5b9cf6",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
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

      {/* Generate button */}
      <button
        onClick={handleCreatePlan}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          background: loading
            ? "rgba(37,99,235,0.4)"
            : "linear-gradient(90deg, #2563eb, #4f46e5)",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "500",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "opacity 0.2s",
          marginTop: "8px",
        }}
      >
        <BoltIcon fontSize="small" />
        {loading ? "Generating Plan..." : "Generate Study Schedule"}
      </button>

      <Loader isLoading={loading} message="Generating your AI study plan..." />
    </div>
  );
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: "#071525",
    borderRadius: "10px",
    "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
    "&:hover fieldset": { borderColor: "#2563EB" },
    "&.Mui-focused fieldset": { borderColor: "#2563EB" },
  },
  "& .MuiSvgIcon-root": { color: "#5b9cf6" },
};

export default CreateCustomPlan;
