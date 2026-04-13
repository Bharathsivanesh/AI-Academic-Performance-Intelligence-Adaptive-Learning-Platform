"use client";
import { useState, useEffect } from "react";
import {
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import LayersIcon from "@mui/icons-material/Layers";
import { apiService } from "../../../service/Apicall";
import CommonTable from "../../../components/Table";
import { showToast } from "../../../components/Notification";
import Loader from "../../../components/Loader";

const AVATAR_COLORS = ["#1e3a8a", "#065f46", "#7c2d12", "#4c1d95", "#0f766e"];

const DATE_PICKER_SX = {
  width: "100%",

  "& .MuiOutlinedInput-root": {
    backgroundColor: "#1e293b",
    borderRadius: "10px",

    "& fieldset": {
      borderColor: "#ffffff !important",
    },
    "&:hover fieldset": {
      borderColor: "#ffffff !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff !important",
    },
  },

  // 🔥 FORCE ALL TEXT WHITE
  "& .MuiInputBase-root": {
    color: "#ffffff !important",
  },

  "& .MuiInputBase-input": {
    color: "#ffffff !important",
    WebkitTextFillColor: "#ffffff !important",
    opacity: 1,
  },

  // 🔥 PLACEHOLDER
  "& input::placeholder": {
    color: "#ffffff !important",
    opacity: 1,
  },

  // 🔥 MAIN FIX (selected value issue)
  "& .MuiPickersSectionList-root": {
    color: "#ffffff !important",
  },

  "& .MuiPickersSectionList-section": {
    color: "#ffffff !important",
    WebkitTextFillColor: "#ffffff !important",
  },

  "& .MuiPickersSectionList-sectionContent": {
    color: "#ffffff !important",
    WebkitTextFillColor: "#ffffff !important",
  },

  // 🔥 LABEL
  "& .MuiInputLabel-root": {
    color: "#ffffff !important",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#ffffff !important",
  },

  // 🔥 ICON
  "& .MuiSvgIcon-root": {
    color: "#ffffff !important",
  },

  // 🔥 HELPER TEXT
  "& .MuiFormHelperText-root": {
    color: "#ffffff !important",
    opacity: "1 !important",
  },

  // 🔥 DISABLED FULL FIX (IMPORTANT)
  "& .Mui-disabled": {
    color: "#ffffff !important",
    WebkitTextFillColor: "#ffffff !important",
    opacity: "1 !important",
  },

  "& .Mui-disabled .MuiInputBase-input": {
    color: "#ffffff !important",
    WebkitTextFillColor: "#ffffff !important",
    opacity: "1 !important",
  },

  "& .Mui-disabled .MuiPickersSectionList-root": {
    color: "#ffffff !important",
  },

  "& .Mui-disabled .MuiPickersSectionList-section": {
    color: "#ffffff !important",
    WebkitTextFillColor: "#ffffff !important",
  },

  "& .Mui-disabled .MuiPickersSectionList-sectionContent": {
    color: "#ffffff !important",
    WebkitTextFillColor: "#ffffff !important",
  },

  "& .MuiOutlinedInput-root.Mui-disabled": {
    backgroundColor: "#1e293b !important", // same as enabled
    opacity: "1 !important", // remove fade
    cursor: "not-allowed",
    "& fieldset": {
      borderColor: "#ffffff !important",
    },
  },

  "& .MuiSvgIcon-root.Mui-disabled": {
    color: "#ffffff !important",
    opacity: 1,
  },
};
const POPPER_SX = {
  "& .MuiPaper-root": {
    backgroundColor: "#1e293b",
    color: "#ffffff",
    border: "0.5px solid #2563eb",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
  },

  "& .MuiPickersCalendarHeader-root": {
    color: "#ffffff",
  },

  "& .MuiPickersArrowSwitcher-button": {
    color: "#ffffff",
    "&:hover": { backgroundColor: "#1e3a8a" },
  },

  "& .MuiPickersYear-yearButton": {
    color: "#ffffff !important",
  },

  "& .MuiPickersYear-yearButton.Mui-selected": {
    backgroundColor: "#2563eb",
    color: "#ffffff !important",
  },

  "& .MuiPickersYear-yearButton.Mui-disabled": {
    color: "#334155",
  },
};
export default function BatchPage() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [errors, setErrors] = useState({});
  const [searchText, setSearchText] = useState("");

  const currentYear = dayjs();
  const minStartYear = currentYear; // cannot pick past years
  const REQUIRED_GAP = 4;

  const fetchBatches = () => {
    apiService({
      endpoint: "/api/batches/",
      method: "GET",
      setLoading,
      onSuccess: (data) => setBatches(data),
      onError: () => showToast("Failed to load batches", "error"),
    });
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const validate = () => {
    const errs = {};

    if (!startYear) {
      errs.start_year = "Start year is required";
      showToast("Start year is required", "error");
    }

    if (!endYear) {
      errs.end_year = "End year is required";
      if (!errs.start_year) showToast("End year is required", "error");
    }

    if (startYear && dayjs(startYear).year() < dayjs().year()) {
      errs.start_year = "Start year cannot be in the past";
      showToast("Start year cannot be in the past", "error");
    }

    if (startYear && endYear) {
      const sy = dayjs(startYear).year();
      const ey = dayjs(endYear).year();
      const gap = ey - sy;

      if (gap !== REQUIRED_GAP) {
        errs.end_year = `End year must be exactly ${REQUIRED_GAP} years after start year (${sy} → ${sy + REQUIRED_GAP})`;
        showToast(
          `Batch duration must be exactly 4 years (${sy} → ${sy + REQUIRED_GAP})`,
          "error",
        );
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStartYearChange = (val) => {
    setStartYear(val);
    setEndYear(null); // reset end year whenever start changes
    setErrors({});
  };

  const handleEndYearChange = (val) => {
    setEndYear(val);
    setErrors((e) => ({ ...e, end_year: undefined }));

    if (startYear && val) {
      const sy = dayjs(startYear).year();
      const ey = dayjs(val).year();
      const gap = ey - sy;

      if (gap !== REQUIRED_GAP) {
        setErrors((e) => ({
          ...e,
          end_year: `Must be exactly 4 years after start year (${sy + REQUIRED_GAP})`,
        }));
      }
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const sy = dayjs(startYear).year();
    const ey = dayjs(endYear).year();

    const payload = {
      batch_name: `${sy}-${ey}`,
      batch_code: `B${sy}`,
      start_year: sy,
      end_year: ey,
    };

    apiService({
      endpoint: "/api/admin/batches/create/",
      method: "POST",
      payload,
      setLoading: setSubmitting,
      onSuccess: () => {
        setModalOpen(false);
        setStartYear(null);
        setEndYear(null);
        setErrors({});
        fetchBatches();
        showToast("Batch added successfully!", "success");
      },
      onError: (err) => {
        const msg =
          err?.batch_name?.[0] ||
          err?.batch_code?.[0] ||
          err?.start_year?.[0] ||
          err?.end_year?.[0] ||
          "Failed to add batch";
        showToast(msg, "error");
      },
    });
  };

  const handleOpen = () => {
    setStartYear(null);
    setEndYear(null);
    setErrors({});
    setModalOpen(true);
  };

  // ── TABLE ROWS ──
  const TableRow = batches.map((batch, i) => ({
    id: batch.id,
    name: batch.batch_name,
    code: batch.batch_code,
    start_year: batch.start_year,
    end_year: batch.end_year,
    avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
  }));

  // ── TABLE COLUMNS ──
  const columns = [
    {
      label: "BATCH NAME",
      render: (row) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              width: 38,
              height: 38,
              backgroundColor: row.avatarColor,
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {row.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography
              sx={{ fontSize: 14, fontWeight: 500, color: "#f1f5f9" }}
            >
              {row.name}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#64748b" }}>
              Academic Batch
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      label: "CODE",
      render: (row) => (
        <Chip
          label={row.code}
          size="small"
          sx={{
            backgroundColor: "#1e3a5f",
            color: "#60a5fa",
            fontFamily: "monospace",
            fontWeight: 600,
            fontSize: 12,
            borderRadius: "6px",
          }}
        />
      ),
    },
    {
      label: "START YEAR",
      render: (row) => (
        <Typography sx={{ fontSize: 14, color: "#94a3b8" }}>
          {row.start_year}
        </Typography>
      ),
    },
    {
      label: "END YEAR",
      render: (row) => (
        <Typography sx={{ fontSize: 14, color: "#94a3b8" }}>
          {row.end_year}
        </Typography>
      ),
    },
  ];

  // Compute valid end year based on start
  const exactEndYear = startYear
    ? dayjs().year(dayjs(startYear).year() + REQUIRED_GAP)
    : null;

  return (
    <>
      <Loader isLoading={loading} />

      <Box sx={{ p: 3 }}>
        {/* ── TOP BAR ── */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "10px",
                backgroundColor: "#1e3a8a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LayersIcon sx={{ color: "#93c5fd", fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: 20, fontWeight: 600, color: "#f1f5f9" }}
              >
                Batch Registry
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                Manage academic batches and year-wise cohorts.
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{
              backgroundColor: "#2563eb",
              "&:hover": { backgroundColor: "#1d4ed8" },
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              px: 2.5,
              py: 1,
              fontSize: 14,
            }}
          >
            New Batch
          </Button>
        </Box>

        {/* ── STATS STRIP ── */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {[
            { label: "Total Batches", value: batches.length, color: "#1e3a8a" },
            { label: "Active", value: batches.length, color: "#14532d" },
          ].map((s) => (
            <Box
              key={s.label}
              sx={{
                flex: 1,
                background: "#0f172a",
                border: `0.5px solid ${s.color}`,
                borderRadius: "10px",
                p: 2,
              }}
            >
              <Typography sx={{ fontSize: 12, color: "#64748b", mb: 0.5 }}>
                {s.label}
              </Typography>
              <Typography
                sx={{ fontSize: 24, fontWeight: 600, color: "#f1f5f9" }}
              >
                {s.value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ── TABLE ── */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#2563eb" }} />
          </Box>
        ) : (
          <CommonTable
            columns={columns}
            rows={TableRow}
            searchText={searchText}
          />
        )}

        {/* ── ADD MODAL ── */}
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: "#0f172a",
              border: "0.5px solid #1e3a8a",
              borderRadius: "14px",
              width: 460,
              p: 1,
            },
          }}
        >
          <DialogTitle
            sx={{ color: "#f1f5f9", fontWeight: 600, fontSize: 18, pb: 0.5 }}
          >
            Add New Batch
          </DialogTitle>
          <Typography sx={{ px: 3, pb: 1, fontSize: 13, color: "#FFFF" }}>
            Select start year. End year is auto-locked to exactly 4 years ahead.
          </Typography>

          <DialogContent sx={{ pt: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
              >
                {/* START YEAR */}
                <DatePicker
                  views={["year"]}
                  label="Start Year"
                  value={startYear}
                  minDate={minStartYear}
                  onChange={handleStartYearChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.start_year,
                      helperText:
                        errors.start_year ||
                        "Only current year and future years allowed",
                      sx: DATE_PICKER_SX,
                    },
                    popper: { sx: POPPER_SX },
                  }}
                />

                {/* END YEAR — locked to startYear + 4 */}
                <DatePicker
                  views={["year"]}
                  label="End Year"
                  value={endYear}
                  minDate={exactEndYear ?? undefined}
                  maxDate={exactEndYear ?? undefined}
                  disabled={!startYear}
                  onChange={handleEndYearChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.end_year,
                      helperText:
                        errors.end_year ||
                        (startYear
                          ? `Must be ${dayjs(startYear).year() + REQUIRED_GAP} (exactly 4 years)`
                          : "Select start year first"),
                      sx: DATE_PICKER_SX,
                    },
                    popper: { sx: POPPER_SX },
                  }}
                />

                {/* PREVIEW CARD */}
                {startYear && endYear && !errors.end_year && (
                  <Box
                    sx={{
                      backgroundColor: "#1e293b",
                      border: "0.5px solid #1e3a8a",
                      borderRadius: "10px",
                      p: 2,
                      display: "flex",
                      gap: 3,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{ fontSize: 11, color: "#64748b", mb: 0.3 }}
                      >
                        BATCH NAME
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#f1f5f9",
                        }}
                      >
                        {dayjs(startYear).year()}-{dayjs(endYear).year()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: 11, color: "#64748b", mb: 0.3 }}
                      >
                        BATCH CODE
                      </Typography>
                      <Chip
                        label={`B${dayjs(startYear).year()}`}
                        size="small"
                        sx={{
                          backgroundColor: "#1e3a5f",
                          color: "#60a5fa",
                          fontFamily: "monospace",
                          fontWeight: 600,
                          fontSize: 12,
                          borderRadius: "6px",
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </LocalizationProvider>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
            <Button
              onClick={() => setModalOpen(false)}
              sx={{
                color: "#94a3b8",
                border: "0.5px solid #334155",
                borderRadius: "10px",
                textTransform: "none",
                px: 2.5,
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              variant="contained"
              startIcon={
                submitting ? (
                  <CircularProgress size={14} sx={{ color: "#fff" }} />
                ) : (
                  <AddIcon />
                )
              }
              sx={{
                backgroundColor: "#2563eb",
                "&:hover": { backgroundColor: "#1d4ed8" },
                "&:disabled": {
                  backgroundColor: "#1e3a8a",
                  color: "#64748b",
                },
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
              }}
            >
              {submitting ? "Adding..." : "Add Batch"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
