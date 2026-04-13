"use client";

import {
  Box,
  Button,
  Avatar,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import InputField from "@/components/Inputfields";
import { supabase } from "../../../app/utils/supabaseClient";
import { apiService } from "../../../service/Apicall";
import Loader from "@/components/Loader";
import { showToast } from "@/components/Notification";
import CommonTable from "@/components/Table";
import AddIcon from "@mui/icons-material/Add";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DownloadIcon from "@mui/icons-material/Download";

const AVATAR_COLORS = ["#1e3a8a", "#065f46", "#7c2d12", "#4c1d95", "#0f766e"];

const EXAM_TYPE_COLORS = {
  IAT1: { bg: "#1e3a5f", color: "#60a5fa" },
  IAT2: { bg: "#14532d", color: "#4ade80" },
  IAT3: { bg: "#4c1d95", color: "#c084fc" },
  SEM: { bg: "#7c2d12", color: "#fb923c" },
};

export default function ExamPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileUploading, setFileUploading] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [examData, setExamData] = useState({
    department: "",
    batch: "",
    semester: "",
    subject: "",
    examType: "",
    examDate: "",
  });

  // ── FETCH EXAMS ──
  const fetchExams = () => {
    apiService({
      endpoint: "/api/admin/exams/",
      method: "GET",
      setLoading,
      onSuccess: (data) => setExams(data),
      onError: () => showToast("Failed to load exams", "error"),
    });
  };

  // ── FETCH DROPDOWNS ──
  useEffect(() => {
    fetchExams();

    apiService({
      endpoint: "/api/admin/departments/",
      method: "GET",
      onSuccess: (res) =>
        setDepartments(
          res.map((d) => ({ label: d.department_name, value: d.id })),
        ),
    });

    apiService({
      endpoint: "/api/batches/",
      method: "GET",
      onSuccess: (res) =>
        setBatches(res.map((b) => ({ label: b.batch_name, value: b.id }))),
    });

    fetchSubjects();
  }, []);

  const fetchSubjects = (departmentId = null) => {
    let url = "/api/subjects/";
    if (departmentId) url += `?department=${departmentId}`;
    apiService({
      endpoint: url,
      method: "GET",
      onSuccess: (res) =>
        setSubjects(res.map((s) => ({ label: s.subject_name, value: s.id }))),
    });
  };

  // ── STATIC OPTIONS ──
  const semesterOptions = Array.from({ length: 8 }, (_, i) => ({
    label: `Semester ${i + 1}`,
    value: i + 1,
  }));

  const examTypeOptions = [
    { label: "IAT 1", value: "IAT1" },
    { label: "IAT 2", value: "IAT2" },
    { label: "IAT 3", value: "IAT3" },
    { label: "Semester Exam", value: "SEM" },
  ];

  // ── FILE UPLOAD ──
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileUploading(true);

    const fileName = `qn_co/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("AiAccademin_Qn_Co")
      .upload(fileName, file);

    if (error) {
      showToast("File upload failed!", "error");
      setFileUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("AiAccademin_Qn_Co")
      .getPublicUrl(fileName);

    setFileUrl(publicData.publicUrl);
    showToast("File uploaded successfully!", "success");
    setFileUploading(false);
  };

  // ── HANDLE CHANGE ──
  const handleExamChange = (e) => {
    const { name, value } = e.target;
    if (name === "department") {
      fetchSubjects(value);
      setExamData((prev) => ({
        ...prev,
        department: Number(value),
        subject: "",
      }));
      return;
    }
    setExamData((prev) => ({
      ...prev,
      [name]: ["department", "batch", "semester"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  // ── SUBMIT ──
  const handleSubmit = () => {
    if (!fileUrl) {
      showToast("Please upload the Excel file first!", "error");
      return;
    }
    apiService({
      endpoint: "/api/admin/create-exam/",
      method: "POST",
      setLoading: setSubmitting,
      payload: {
        exam_type: examData.examType,
        subject: examData.subject,
        department: examData.department,
        batch: examData.batch,
        semester: examData.semester,
        exam_date: examData.examDate,
        file_url: fileUrl,
      },
      onSuccess: () => {
        showToast("Exam scheduled successfully!", "success");
        setModalOpen(false);
        setExamData({
          department: "",
          batch: "",
          semester: "",
          subject: "",
          examType: "",
          examDate: "",
        });
        setFileUrl("");
        fetchExams();
      },
      onError: () => showToast("Failed to schedule exam!", "error"),
    });
  };

  const handleOpen = () => {
    setExamData({
      department: "",
      batch: "",
      semester: "",
      subject: "",
      examType: "",
      examDate: "",
    });
    setFileUrl("");
    setModalOpen(true);
  };

  // ── TABLE COLUMNS ──
  const columns = [
    {
      label: "SUBJECT",
      render: (row, i) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              width: 38,
              height: 38,
              backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {row.subject_name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography
              sx={{ fontSize: 14, fontWeight: 500, color: "#f1f5f9" }}
            >
              {row.subject_name}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#64748b" }}>
              {row.department_name}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      label: "EXAM TYPE",
      render: (row) => {
        const style = EXAM_TYPE_COLORS[row.exam_type] || {
          bg: "#1e293b",
          color: "#94a3b8",
        };
        return (
          <Chip
            label={row.exam_type}
            size="small"
            sx={{
              backgroundColor: style.bg,
              color: style.color,
              fontWeight: 600,
              fontSize: 12,
              borderRadius: "6px",
            }}
          />
        );
      },
    },
    {
      label: "BATCH",
      render: (row) => (
        <Typography sx={{ fontSize: 14, color: "#94a3b8" }}>
          {row.batch_name}
        </Typography>
      ),
    },
    {
      label: "SEMESTER",
      render: (row) => (
        <Chip
          label={`Sem ${row.semester}`}
          size="small"
          sx={{
            backgroundColor: "#1e293b",
            color: "#94a3b8",
            fontSize: 12,
            borderRadius: "6px",
          }}
        />
      ),
    },
    {
      label: "EXAM DATE",
      render: (row) => (
        <Typography sx={{ fontSize: 14, color: "#94a3b8" }}>
          {new Date(row.exam_date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Typography>
      ),
    },
    {
      label: "FILE",
      render: (row) =>
        row.file_url ? (
          <Button
            size="small"
            startIcon={<DownloadIcon sx={{ fontSize: 14 }} />}
            onClick={() => window.open(row.file_url, "_blank")}
            sx={{
              backgroundColor: "#14532d",
              color: "#4ade80",
              fontSize: 11,
              borderRadius: "6px",
              textTransform: "none",
              px: 1.5,
              "&:hover": { backgroundColor: "#166534" },
            }}
          >
            Download
          </Button>
        ) : (
          <Typography sx={{ fontSize: 12, color: "#475569" }}>
            No file
          </Typography>
        ),
    },
  ];

  const tableRows = exams.map((exam, i) => ({ ...exam, _index: i }));

  return (
    <>
      <Loader isLoading={loading || fileUploading} />

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
              <EventNoteIcon sx={{ color: "#93c5fd", fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: 20, fontWeight: 600, color: "#f1f5f9" }}
              >
                Exam Registry
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                Manage scheduled examinations and CO mappings.
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
            Add Exam
          </Button>
        </Box>

        {/* ── STATS ── */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {[
            { label: "Total Exams", value: exams.length, color: "#1e3a8a" },
            {
              label: "With Files",
              value: exams.filter((e) => e.file_url).length,
              color: "#14532d",
            },
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
          <CommonTable columns={columns} rows={tableRows} />
        )}

        {/* ── ADD EXAM MODAL ── */}
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: "#0f172a",
              border: "0.5px solid #1e3a8a",
              borderRadius: "14px",
              width: 600,
              maxWidth: "95vw",
              p: 1,
            },
          }}
        >
          <DialogTitle
            sx={{ color: "#f1f5f9", fontWeight: 600, fontSize: 18, pb: 0.5 }}
          >
            Schedule New Exam
          </DialogTitle>
          <Typography sx={{ px: 3, pb: 1, fontSize: 13, color: "#64748b" }}>
            Fill in the details and upload the CO mapping Excel file.
          </Typography>

          <DialogContent sx={{ pt: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <InputField
                type="select"
                name="department"
                label="Department"
                placeholder="Select Department"
                value={examData.department}
                onChange={handleExamChange}
                options={departments}
              />

              <InputField
                type="select"
                name="batch"
                label="Batch"
                placeholder="Select Batch"
                value={examData.batch}
                onChange={handleExamChange}
                options={batches}
              />

              <InputField
                type="select"
                name="semester"
                label="Semester"
                placeholder="Select Semester"
                value={examData.semester}
                onChange={handleExamChange}
                options={semesterOptions}
              />

              <InputField
                type="select"
                name="subject"
                label="Subject"
                placeholder="Select Subject"
                value={examData.subject}
                onChange={handleExamChange}
                options={subjects}
              />

              <InputField
                type="select"
                name="examType"
                label="Exam Type"
                placeholder="Select Exam Type"
                value={examData.examType}
                onChange={handleExamChange}
                options={examTypeOptions}
              />

              <InputField
                type="date"
                name="examDate"
                label="Exam Date"
                value={examData.examDate}
                onChange={handleExamChange}
              />
            </div>
             <div className="mt-10">
          <p className="text-gray-400 text-sm mb-2">Required Excel Format</p>
          <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
            <thead className="bg-[#0f1c2e] text-gray-300">
              <tr>
                <th className="p-3 text-left">QN</th>
                <th className="p-3 text-left">CO ID</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-t border-white/10">
                <td className="p-3">1</td>
                <td className="p-3">CO1</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">2</td>
                <td className="p-3">CO2</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-3">3</td>
                <td className="p-3">CO3</td>
              </tr>
            </tbody>
          </table>
        </div>

            {/* FILE UPLOAD */}
            <Box
              sx={{
                mt: 3,
                border: "0.5px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                p: 2.5,
              }}
            >
              <Typography sx={{ color: "#f1f5f9", fontSize: 14, mb: 1.5 }}>
                Upload CO Mapping Excel
              </Typography>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-300
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:bg-blue-600 file:text-white"
              />
              {fileUploading && (
                <Typography sx={{ mt: 1, fontSize: 12, color: "#60a5fa" }}>
                  ⏳ Uploading...
                </Typography>
              )}
              {fileUrl && !fileUploading && (
                <Typography sx={{ mt: 1, fontSize: 12, color: "#4ade80" }}>
                  ✅ File uploaded and ready
                </Typography>
              )}
            </Box>
            
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
              disabled={submitting || fileUploading}
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
              {submitting ? "Scheduling..." : "Schedule Exam"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
