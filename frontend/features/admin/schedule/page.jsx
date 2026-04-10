"use client";

import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import InputField from "@/components/Inputfields";
import { supabase } from "../../../app/utils/supabaseClient";
import { apiService } from "../../../service/Apicall";
import Loader from "@/components/Loader";
import { showToast } from "@/components/Notification";

export default function ScheduleExamPage() {
  const [fileUrl, setFileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

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

  // ================= FILE UPLOAD =================
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingMessage("Uploading Excel File...");
    setIsLoading(true);

    const fileName = `qn_co/${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from("AiAccademin_Qn_Co")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      showToast("File upload failed!", "error");
      setIsLoading(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("AiAccademin_Qn_Co")
      .getPublicUrl(fileName);

    setFileUrl(publicData.publicUrl);
    showToast("File uploaded successfully!", "success");
    setIsLoading(false);
  };

  // ================= FETCH APIs =================
  useEffect(() => {
    apiService({
      endpoint: "/api/admin/departments/",
      method: "GET",
      onSuccess: (res) => {
        const formatted = res.map((d) => ({
          label: d.department_name,
          value: d.id,
        }));
        setDepartments(formatted);
      },
    });

    apiService({
      endpoint: "/api/batches/",
      method: "GET",
      onSuccess: (res) => {
        const formatted = res.map((b) => ({
          label: b.batch_name,
          value: b.id,
        }));
        setBatches(formatted);
      },
    });

    fetchSubjects();
  }, []);

  // ================= SUBJECT API =================
  const fetchSubjects = (departmentId = null) => {
    let url = "/api/subjects/";
    if (departmentId) url += `?department=${departmentId}`;

    apiService({
      endpoint: url,
      method: "GET",
      onSuccess: (res) => {
        const formatted = res.map((s) => ({
          label: s.subject_name,
          value: s.id,
        }));
        setSubjects(formatted);
      },
      onError: (err) => console.error(err),
    });
  };

  // ================= STATIC OPTIONS =================
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

  // ================= HANDLE CHANGE =================
  const handleExamChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...examData,
      [name]:
        name === "department" || name === "batch" || name === "semester"
          ? Number(value)
          : value,
    };

    setExamData(updatedData);

    if (name === "department") {
      fetchSubjects(value);
      setExamData((prev) => ({
        ...prev,
        department: Number(value),
        subject: "",
      }));
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = () => {
    if (!fileUrl) {
      showToast("Please upload the Excel file first!", "error");
      return;
    }

    setLoadingMessage("Scheduling Exam...");
    apiService({
      endpoint: "/api/admin/create-exam/",
      method: "POST",
      setLoading: setIsLoading,
      payload: {
        exam_type: examData.examType,
        subject: examData.subject,
        department: examData.department,
        batch: examData.batch,
        semester: examData.semester,
        exam_date: examData.examDate,
        file_url: fileUrl,
      },
      onSuccess: (res) => {
        showToast("Exam scheduled successfully!", "success");
        setExamData({
          department: "",
          batch: "",
          semester: "",
          subject: "",
          examType: "",
          examDate: "",
        });
        setFileUrl("");
      },
      onError: (err) => {
        console.error(err);
        showToast("Failed to schedule exam!", "error");
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0b1220] p-10 text-white">
      {/* ✅ Loader - only for file upload + exam creation */}
      <Loader isLoading={isLoading} message={loadingMessage} />

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">Schedule Examination</h1>
      </div>

      {/* Card */}
      <Box
        sx={{
          maxWidth: "1000px",
          background: "linear-gradient(180deg,#0f172a,#0b1220)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          p: 6,
        }}
      >
        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* FILE UPLOAD */}
        <div className="mt-8 border border-white/10 rounded-xl p-6">
          <h3 className="text-white text-lg mb-3">Upload Excel</h3>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-blue-600 file:text-white"
          />
          {/* ✅ Show file uploaded confirmation */}
          {fileUrl && (
            <p className="mt-3 text-green-400 text-xs flex items-center gap-1">
              ✅ File uploaded and ready
            </p>
          )}
        </div>

        {/* Excel Format */}
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

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end mt-10">
          <Button
            onClick={handleSubmit}
            sx={{
              background: "#2563eb",
              color: "#fff",
              px: 4,
              borderRadius: "10px",
              "&:hover": { background: "#1d4ed8" },
            }}
          >
            Schedule Exam
          </Button>
        </div>
      </Box>
    </div>
  );
}
