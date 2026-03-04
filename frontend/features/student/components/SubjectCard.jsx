"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Button,
  Chip,
} from "@mui/material";

const SubjectCard = ({
  code,
  title,
  subtitle,
  score,
  icon,
  onClick,
}) => {
  return (
    <Card
      sx={{
        background: "linear-gradient(145deg, #0B1220, #0E1627)",
        borderRadius: "20px",
        p: 2,
        color: "#fff",
        minWidth: 320,
        boxShadow: "0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Top Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          {/* Icon Box */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "14px",
              background: "rgba(37,99,235,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2563EB",
            }}
          >
            {icon}
          </Box>

          <Chip
            label={code}
            size="small"
            sx={{
              background: "rgba(255,255,255,0.08)",
              color: "#9CA3AF",
              fontSize: "12px",
            }}
          />
        </Box>

        {/* Title */}
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "#94A3B8", mb: 3 }}
        >
          {subtitle}
        </Typography>

        {/* Score Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#64748B", letterSpacing: 1 }}
          >
            SCORE POTENTIAL
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: "#2563EB", fontWeight: 600 }}
          >
            {score}%
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={score}
          sx={{
            height: 6,
            borderRadius: 5,
            backgroundColor: "rgba(255,255,255,0.08)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#2563EB",
              borderRadius: 5,
            },
          }}
        />

        {/* Button */}
        <Button
          fullWidth
          onClick={onClick}
          sx={{
            mt: 4,
            borderRadius: "14px",
            background: "rgba(255,255,255,0.03)",
            color: "#E2E8F0",
            textTransform: "none",
            py: 1.2,
            "&:hover": {
              background: "rgba(255,255,255,0.06)",
            },
          }}
        >
          View Topic Details →
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;