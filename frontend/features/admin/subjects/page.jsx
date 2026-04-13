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
  IconButton,
  Collapse,
} from "@mui/material";
import { useState, useEffect } from "react";
import InputField from "@/components/Inputfields";
import { apiService } from "../../../service/Apicall";
import Loader from "@/components/Loader";
import { showToast } from "@/components/Notification";
import CommonTable from "../../../components/Table";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TopicIcon from "@mui/icons-material/Topic";

const AVATAR_COLORS = ["#1e3a8a", "#065f46", "#7c2d12", "#4c1d95", "#0f766e"];
const CO_COLORS = {
  CO1: { bg: "#1e3a5f", color: "#60a5fa" },
  CO2: { bg: "#14532d", color: "#4ade80" },
  CO3: { bg: "#4c1d95", color: "#c084fc" },
  CO4: { bg: "#7c2d12", color: "#fb923c" },
  CO5: { bg: "#0f4c5c", color: "#22d3ee" },
};

const coStyle = (co) => CO_COLORS[co] || { bg: "#1e293b", color: "#94a3b8" };

const EMPTY_TOPIC = { topic_name: "", topic_description: "", co_id: "CO1" };

const CO_OPTIONS = ["CO1", "CO2", "CO3", "CO4", "CO5"].map((c) => ({
  label: c,
  value: c,
}));

export default function SubjectPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    subject_name: "",
    subject_code: "",
    department: "",
  });
  const [topics, setTopics] = useState([{ ...EMPTY_TOPIC }]);
  const [errors, setErrors] = useState({});

  // ── FETCH ──
  const fetchSubjects = () => {
    apiService({
      endpoint: "/api/subjects/with-topics/",
      method: "GET",
      setLoading,
      onSuccess: (data) => setSubjects(data),
      onError: () => showToast("Failed to load subjects", "error"),
    });
  };

  useEffect(() => {
    fetchSubjects();
    apiService({
      endpoint: "/api/admin/departments/",
      method: "GET",
      onSuccess: (res) =>
        setDepartments(
          res.map((d) => ({ label: d.department_name, value: d.id })),
        ),
    });
  }, []);

  // ── TOPIC HANDLERS ──
  const handleTopicChange = (index, field, value) => {
    setTopics((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)),
    );
  };

  const addTopic = () => setTopics((prev) => [...prev, { ...EMPTY_TOPIC }]);

  const removeTopic = (index) => {
    if (topics.length === 1) {
      showToast("At least one topic is required", "error");
      return;
    }
    setTopics((prev) => prev.filter((_, i) => i !== index));
  };

  // ── VALIDATE ──
  const validate = () => {
    const errs = {};
    if (!form.subject_name.trim())
      errs.subject_name = "Subject name is required";
    if (!form.subject_code.trim())
      errs.subject_code = "Subject code is required";
    if (!form.department) errs.department = "Department is required";
    topics.forEach((t, i) => {
      if (!t.topic_name.trim()) errs[`topic_${i}`] = "Topic name is required";
    });
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast(Object.values(errs)[0], "error");
      return false;
    }
    return true;
  };

  // ── SUBMIT ──
  const handleSubmit = () => {
    if (!validate()) return;
    apiService({
      endpoint: "/api/admin/subjects/create/",
      method: "POST",
      setLoading: setSubmitting,
      payload: {
        subject_name: form.subject_name,
        subject_code: form.subject_code,
        department: Number(form.department),
        topics: topics.map((t) => ({
          topic_name: t.topic_name,
          topic_description: t.topic_description || null,
          co_id: t.co_id,
        })),
      },
      onSuccess: () => {
        showToast("Subject created successfully!", "success");
        setModalOpen(false);
        resetForm();
        fetchSubjects();
      },
      onError: (err) => {
        const msg =
          err?.subject_name?.[0] ||
          err?.subject_code?.[0] ||
          err?.department?.[0] ||
          "Failed to create subject";
        showToast(msg, "error");
      },
    });
  };

  const resetForm = () => {
    setForm({ subject_name: "", subject_code: "", department: "" });
    setTopics([{ ...EMPTY_TOPIC }]);
    setErrors({});
  };

  const handleOpen = () => {
    resetForm();
    setModalOpen(true);
  };
  const [selectedRow, setSelectedRow] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
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
              Academic Subject
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      label: "CODE",
      render: (row) => (
        <Chip
          label={row.subject_code}
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
      label: "TOPICS",
      render: (row) => (
        <Chip
          label={`${row.topics?.length || 0} Topics`}
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
      label: "CO IDs",
      render: (row) => {
        const uniqueCOs = [
          ...new Set(row.topics?.flatMap((t) => t.co_ids) || []),
        ];
        return (
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {uniqueCOs.map((co) => {
              const s = coStyle(co);
              return (
                <Chip
                  key={co}
                  label={co}
                  size="small"
                  sx={{
                    backgroundColor: s.bg,
                    color: s.color,
                    fontWeight: 600,
                    fontSize: 11,
                    borderRadius: "6px",
                  }}
                />
              );
            })}
          </Box>
        );
      },
    },
    {
      label: "DETAILS",
      render: (row) => (
        <IconButton
          size="small"
          onClick={() => {
            setSelectedRow(row);
            setDetailsOpen(true);
          }}
          sx={{ color: "#60a5fa" }}
        >
          {expandedRow === row.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      ),
    },
  ];

  const tableRows = subjects.map((s, i) => ({ ...s, _index: i }));

  // ── EXPANDED TOPIC ROWS ──
  //   const renderExpandedTopics = (row) => {
  //     if (expandedRow !== row.id) return null;
  //     return (
  //       <Box
  //         sx={{
  //           backgroundColor: "#0a1628",
  //           border: "0.5px solid #1e3a8a",
  //           borderRadius: "10px",
  //           mx: 2,
  //           mb: 1,
  //           p: 2,
  //         }}
  //       >
  //         <Typography
  //           sx={{ fontSize: 12, color: "#64748b", mb: 1.5, fontWeight: 600 }}
  //         >
  //           TOPICS IN {row.subject_name}
  //         </Typography>
  //         <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
  //           {row.topics?.map((topic) => (
  //             <Box
  //               key={topic.id}
  //               sx={{
  //                 display: "flex",
  //                 alignItems: "center",
  //                 justifyContent: "space-between",
  //                 backgroundColor: "#0f172a",
  //                 border: "0.5px solid #1e293b",
  //                 borderRadius: "8px",
  //                 px: 2,
  //                 py: 1,
  //               }}
  //             >
  //               <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
  //                 <TopicIcon sx={{ fontSize: 16, color: "#475569" }} />
  //                 <Typography sx={{ fontSize: 13, color: "#f1f5f9" }}>
  //                   {topic.topic_name}
  //                 </Typography>
  //                 {topic.topic_description && (
  //                   <Typography sx={{ fontSize: 12, color: "#64748b" }}>
  //                     — {topic.topic_description}
  //                   </Typography>
  //                 )}
  //               </Box>
  //               <Box sx={{ display: "flex", gap: 0.5 }}>
  //                 {topic.co_ids?.map((co) => {
  //                   const s = coStyle(co);
  //                   return (
  //                     <Chip
  //                       key={co}
  //                       label={co}
  //                       size="small"
  //                       sx={{
  //                         backgroundColor: s.bg,
  //                         color: s.color,
  //                         fontWeight: 600,
  //                         fontSize: 11,
  //                         borderRadius: "6px",
  //                       }}
  //                     />
  //                   );
  //                 })}
  //               </Box>
  //             </Box>
  //           ))}
  //         </Box>
  //       </Box>
  //     );
  //   };

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
              <MenuBookIcon sx={{ color: "#93c5fd", fontSize: 22 }} />
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: 20, fontWeight: 600, color: "#f1f5f9" }}
              >
                Subject Registry
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                Manage subjects, topics and course outcomes.
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
            Add Subject
          </Button>
        </Box>

        {/* ── STATS ── */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {[
            {
              label: "Total Subjects",
              value: subjects.length,
              color: "#1e3a8a",
            },
            {
              label: "Total Topics",
              value: subjects.reduce(
                (acc, s) => acc + (s.topics?.length || 0),
                0,
              ),
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

        {/* ── TABLE with expanded topic rows ── */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#2563eb" }} />
          </Box>
        ) : (
          <Box>
            <CommonTable columns={columns} rows={tableRows} />
            {/* Expanded topic panels rendered below each row concept */}
            {/* <Box sx={{ mt: 1 }}>
              {tableRows.map((row) => renderExpandedTopics(row))}
            </Box> */}
          </Box>
        )}

        {/* ── ADD SUBJECT MODAL ── */}
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: "#0f172a",
              border: "0.5px solid #1e3a8a",
              borderRadius: "14px",
              width: 640,
              maxWidth: "95vw",
              maxHeight: "90vh",
              p: 1,
            },
          }}
        >
          <DialogTitle
            sx={{ color: "#f1f5f9", fontWeight: 600, fontSize: 18, pb: 0.5 }}
          >
            Add New Subject
          </DialogTitle>
          <Typography sx={{ px: 3, pb: 1, fontSize: 13, color: "#64748b" }}>
            Define subject details, then add topics with their CO mappings.
          </Typography>

          <DialogContent sx={{ pt: 1 }}>
            {/* Subject Info */}
            <Box
              sx={{
                backgroundColor: "#0a1628",
                border: "0.5px solid #1e3a8a",
                borderRadius: "10px",
                p: 2,
                mb: 3,
              }}
            >
              <Typography
                sx={{ fontSize: 12, color: "#64748b", mb: 2, fontWeight: 600 }}
              >
                SUBJECT INFORMATION
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  type="text"
                  name="subject_name"
                  label="Subject Name"
                  placeholder="e.g. Mathematics"
                  value={form.subject_name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, subject_name: e.target.value }))
                  }
                  error={!!errors.subject_name}
                  helperText={errors.subject_name}
                />
                <InputField
                  type="text"
                  name="subject_code"
                  label="Subject Code"
                  placeholder="e.g. MA101"
                  value={form.subject_code}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, subject_code: e.target.value }))
                  }
                  error={!!errors.subject_code}
                  helperText={errors.subject_code}
                />
                <Box sx={{ gridColumn: "span 2" }}>
                  <InputField
                    type="select"
                    name="department"
                    label="Department"
                    placeholder="Select Department"
                    value={form.department}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, department: e.target.value }))
                    }
                    options={departments}
                    error={!!errors.department}
                    helperText={errors.department}
                  />
                </Box>
              </div>
            </Box>

            {/* Topics Section */}
            <Box
              sx={{
                backgroundColor: "#0a1628",
                border: "0.5px solid #1e3a8a",
                borderRadius: "10px",
                p: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}
                >
                  TOPICS ({topics.length})
                </Typography>
                <Button
                  size="small"
                  startIcon={<AddIcon sx={{ fontSize: 14 }} />}
                  onClick={addTopic}
                  sx={{
                    backgroundColor: "#1e3a8a",
                    color: "#93c5fd",
                    fontSize: 11,
                    borderRadius: "6px",
                    textTransform: "none",
                    px: 1.5,
                    "&:hover": { backgroundColor: "#1e40af" },
                  }}
                >
                  Add Topic
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {topics.map((topic, index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: "#0f172a",
                      border: `0.5px solid ${errors[`topic_${index}`] ? "#ef4444" : "#1e293b"}`,
                      borderRadius: "8px",
                      p: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1.5,
                      }}
                    >
                      <Typography
                        sx={{ fontSize: 12, color: "#475569", fontWeight: 600 }}
                      >
                        TOPIC {index + 1}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => removeTopic(index)}
                        sx={{
                          color: "#ef4444",
                          "&:hover": { backgroundColor: "#450a0a" },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Topic Name — spans 2 cols */}
                      <Box sx={{ gridColumn: "span 2" }}>
                        <InputField
                          type="text"
                          name={`topic_name_${index}`}
                          label="Topic Name"
                          placeholder="e.g. Algebra"
                          value={topic.topic_name}
                          onChange={(e) =>
                            handleTopicChange(
                              index,
                              "topic_name",
                              e.target.value,
                            )
                          }
                          error={!!errors[`topic_${index}`]}
                          helperText={errors[`topic_${index}`]}
                        />
                      </Box>

                      {/* CO ID */}
                      <InputField
                        type="select"
                        name={`co_id_${index}`}
                        label="CO ID"
                        value={topic.co_id}
                        onChange={(e) =>
                          handleTopicChange(index, "co_id", e.target.value)
                        }
                        options={CO_OPTIONS}
                      />

                      {/* Description — full width */}
                      <Box sx={{ gridColumn: "span 3" }}>
                        <InputField
                          type="text"
                          name={`topic_desc_${index}`}
                          label="Description "
                          placeholder="Brief description..."
                          value={topic.topic_description}
                          onChange={(e) =>
                            handleTopicChange(
                              index,
                              "topic_description",
                              e.target.value,
                            )
                          }
                        />
                      </Box>
                    </div>
                  </Box>
                ))}
              </Box>
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
              {submitting ? "Creating..." : "Create Subject"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            backgroundColor: "#0f172a",
            border: "0.5px solid #1e3a8a",
            borderRadius: "14px",
          },
        }}
      >
        <DialogTitle sx={{ color: "#f1f5f9", fontWeight: 600, fontSize: 18 }}>
          {selectedRow?.subject_name} - Topics
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {selectedRow?.topics?.map((topic) => (
              <Box
                key={topic.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#1e293b",
                  border: "0.5px solid #334155",
                  borderRadius: "10px",
                  px: 2,
                  py: 1.2,
                }}
              >
                {/* LEFT */}
                <Box>
                  <Typography sx={{ fontSize: 14, color: "#f1f5f9" }}>
                    {topic.topic_name}
                  </Typography>
                  {topic.topic_description && (
                    <Typography sx={{ fontSize: 12, color: "#64748b" }}>
                      {topic.topic_description}
                    </Typography>
                  )}
                </Box>

                {/* RIGHT CO TAGS */}
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  {topic.co_ids?.map((co) => {
                    const s = coStyle(co);
                    return (
                      <Chip
                        key={co}
                        label={co}
                        size="small"
                        sx={{
                          backgroundColor: s.bg,
                          color: s.color,
                          fontWeight: 600,
                          fontSize: 11,
                        }}
                      />
                    );
                  })}
                </Box>
              </Box>
            ))}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setDetailsOpen(false)}
            sx={{
              color: "#ffff",
              textTransform: "none",
              backgroundColor: "#2563eb",
              "&:hover": { backgroundColor: "#1d4ed8" },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
