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
  TextField,
  IconButton,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import { apiService } from "../../../service/Apicall";
import CommonTable from "../../../components/Table";
import { showToast } from "../../../components/Notification";
import Loader from "../../../components/Loader";

const AVATAR_COLORS = ["#1e3a8a", "#065f46", "#7c2d12", "#4c1d95", "#0f766e"];

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    department_name: "",
    department_code: "",
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [searchText, setSearchText] = useState("");

  const fetchDepartments = () => {
    apiService({
      endpoint: "/api/admin/departments/",
      method: "GET",
      setLoading,
      onSuccess: (data) => {
        setDepartments(data);
        // showToast("Departments loaded successfully!", "success");
      },
      onError: () => showToast("Failed to load departments", "error"),
    });
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.department_name.trim())
      errs.department_name = "Department name is required";
    if (!form.department_code.trim())
      errs.department_code = "Department code is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    apiService({
      endpoint: "/api/admin/departments/create/",
      method: "POST",
      payload: form,
      setLoading: setSubmitting,
      onSuccess: () => {
        setModalOpen(false);
        setForm({ department_name: "", department_code: "" });
        setErrors({});
        fetchDepartments();
        showToast("Department added successfully!", "success");
      },
      onError: (err) => {
        const msg =
          err?.department_name?.[0] ||
          err?.department_code?.[0] ||
          "Failed to add department";
        showToast(msg, "error");
      },
    });
  };

  const handleOpen = () => {
    setForm({ department_name: "", department_code: "" });
    setErrors({});
    setModalOpen(true);
  };

  // ── TABLE ROWS ──
  const TableRow = departments.map((dept, i) => ({
    id: dept.id,
    name: dept.department_name,
    code: dept.department_code,
    avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
  }));

  // ── TABLE COLUMNS ──
  const columns = [
    {
      label: "DEPARTMENT NAME",
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
              Academic Department
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
  ];

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
              <BusinessIcon sx={{ color: "#93c5fd", fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: 20, fontWeight: 600, color: "#f1f5f9" }}
              >
                Department Registry
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                Manage institutional hierarchies and academic performance
                modules.
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
            New Dept.
          </Button>
        </Box>

        {/* ── STATS STRIP ── */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {[
            {
              label: "Total Departments",
              value: departments.length,
              color: "#1e3a8a",
            },
            { label: "Active", value: departments.length, color: "#14532d" },
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
            Add New Department
          </DialogTitle>
          <Typography sx={{ px: 3, pb: 1, fontSize: 13, color: "#64748b" }}>
            Fill in the details to register a new department.
          </Typography>

          <DialogContent sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Department Name"
              placeholder="e.g. Computer Science & AI"
              value={form.department_name}
              onChange={(e) =>
                setForm({ ...form, department_name: e.target.value })
              }
              error={!!errors.department_name}
              helperText={errors.department_name}
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#1e293b",
                  borderRadius: "10px",
                  color: "#f1f5f9",
                  "& fieldset": { borderColor: "#334155" },
                  "&:hover fieldset": { borderColor: "#2563eb" },
                  "&.Mui-focused fieldset": { borderColor: "#2563eb" },
                },
                "& .MuiInputLabel-root": { color: "#94a3b8" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
                "& .MuiFormHelperText-root": { color: "#f87171" },
              }}
            />
            <TextField
              fullWidth
              label="Department Code"
              placeholder="e.g. CS"
              value={form.department_code}
              onChange={(e) =>
                setForm({ ...form, department_code: e.target.value })
              }
              error={!!errors.department_code}
              helperText={errors.department_code}
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#1e293b",
                  borderRadius: "10px",
                  color: "#f1f5f9",
                  "& fieldset": { borderColor: "#334155" },
                  "&:hover fieldset": { borderColor: "#2563eb" },
                  "&.Mui-focused fieldset": { borderColor: "#2563eb" },
                },
                "& .MuiInputLabel-root": { color: "#94a3b8" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
                "& .MuiFormHelperText-root": { color: "#f87171" },
              }}
            />
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
                "&:disabled": { backgroundColor: "#1e3a8a", color: "#64748b" },
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
              }}
            >
              {submitting ? "Adding..." : "Add Department"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* ── TOAST ── */}
        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          onClose={() => setToast({ ...toast, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={toast.severity}
            onClose={() => setToast({ ...toast, open: false })}
            sx={{ borderRadius: "10px" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
