"use client";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import InputField from "../../../components/Inputfields";
import { Modal, Box } from "@mui/material";
import { apiService } from "../../../service/Apicall";

export default function DashboardHeader({ onBatchChange }) {

  // ✅ HEADER FILTER (ONLY FOR DASHBOARD)
  const [headerFilters, setHeaderFilters] = useState({
    passoutYear: "",
  });

  // ✅ MODAL FILTER (ONLY FOR UPLOAD)
  const [modalFilters, setModalFilters] = useState({
    batch: "",
    semester: "",
    subject: "",
    exam_type: "",
  });

  const [open, setOpen] = useState(false);
  const [batchOptions, setBatchOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  const [examData, setExamData] = useState(null);
  const [examError, setExamError] = useState("");
  const [file, setFile] = useState(null);

  /* ---------------- FETCH BATCHES ---------------- */
  useEffect(() => {
    apiService({
      endpoint: "/api/staff/batches/",
      method: "GET",
      onSuccess: (res) => {
        const formatted = res.map((b) => ({
          label: b.batch_name,
          value: b.id,
        }));
        setBatchOptions(formatted);
      },
    });
  }, []);

  /* ---------------- FETCH SUBJECTS ---------------- */
  useEffect(() => {
    apiService({
      endpoint: "/api/subjects/?user=true",
      method: "GET",
      onSuccess: (res) => {
        const formatted = res.map((s) => ({
          label: s.subject_name,
          value: s.id,
        }));
        setSubjectOptions(formatted);
      },
    });
  }, []);

  /* ---------------- HEADER CHANGE ---------------- */
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;

    setHeaderFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "passoutYear") {
      onBatchChange(value);
    }
  };

  /* ---------------- MODAL CHANGE ---------------- */
  const handleModalChange = (e) => {
    const { name, value } = e.target;

    setModalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    // reset exam when filters change
    setExamData(null);
    setExamError("");
  };

  /* ---------------- GET EXAM ---------------- */
  const handleGetExam = () => {
    const { batch, semester, subject, exam_type } = modalFilters;

    if (!batch || !semester || !subject || !exam_type) {
      alert("Fill all fields");
      return;
    }

    apiService({
      endpoint: `/api/staff/get-exam/?batch=${batch}&semester=${semester}&subject=${subject}&exam_type=${exam_type}`,
      method: "GET",
      onSuccess: (res) => {
        setExamData(res);
        setExamError("");
      },
      onError: (err) => {
        setExamData(null);
        setExamError(err?.error || "Exam not found");
      },
    });
  };

  /* ---------------- FILE ---------------- */
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  /* ---------------- RESET MODAL ---------------- */
  const resetModal = () => {
    setModalFilters({
      batch: "",
      semester: "",
      subject: "",
      exam_type: "",
    });
    setExamData(null);
    setExamError("");
    setFile(null);
  };

  /* ---------------- UPLOAD ---------------- */
  const handleUpload = () => {
    if (!file || !examData?.exam_id) {
      alert("Get exam first and select file");
      return;
    }

    const formData = new FormData();
    formData.append("exam_id", examData.exam_id);
    formData.append("file", file);

    apiService({
      endpoint: "/api/staff/upload-marks/",
      method: "POST",
      payload: formData,
      onSuccess: () => {
        alert("Uploaded successfully ✅");
        setOpen(false);
        resetModal();
      },
      onError: () => alert("Upload failed ❌"),
    });
  };

  return (
    <div className="bg-gradient-to-r from-[#0f172a] to-[#111827] 
                    p-5 rounded-2xl border border-white/5 mb-2">

      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-6">

        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">
            Staff Performance Overview Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Academic Year {headerFilters.passoutYear || "----"} • Computer Science
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">

          {/* ✅ HEADER BATCH */}
          <div className="md:w-40 ">
            <InputField
              type="select"
              name="passoutYear"
              value={headerFilters.passoutYear}
              onChange={handleHeaderChange}
              placeholder="Passout Year"
              options={batchOptions}
            />
          </div>

          <button
            className="flex cursor-pointer items-center gap-2 px-6 py-2 
                       bg-blue-600 hover:bg-blue-700 
                       rounded-xl text-white transition shadow-lg"
            onClick={() => setOpen(true)}
          >
            <CloudUploadIcon fontSize="small" />
            Upload Academic Marks
          </button>
        </div>
      </div>

      {/* MODAL */}
      <Modal open={open} onClose={() => { setOpen(false); resetModal(); }}>
        <Box className="absolute top-1/2 left-1/2
                     -translate-x-1/2 -translate-y-1/2
                     w-[720px] bg-[#111827]
                     border border-white/10
                     rounded-2xl shadow-2xl p-8">

          <h2 className="text-xl font-semibold text-white mb-6">
            Upload Academic Marks
          </h2>

          <div className="space-y-5">

            <div className="grid grid-cols-2 gap-2">

              {/* ✅ MODAL BATCH */}
              <InputField
                type="select"
                name="batch"
                value={modalFilters.batch}
                onChange={handleModalChange}
                placeholder="Select Batch"
                options={batchOptions}
              />

              <InputField
                type="select"
                name="semester"
                value={modalFilters.semester}
                onChange={handleModalChange}
                placeholder="Select Semester"
                options={[1,2,3,4,5,6,7,8].map(i => ({label:`SEM ${i}`, value:i}))}
              />

              <InputField
                type="select"
                name="subject"
                value={modalFilters.subject}
                onChange={handleModalChange}
                placeholder="Select Subject"
                options={subjectOptions}
              />

              <InputField
                type="select"
                name="exam_type"
                value={modalFilters.exam_type}
                onChange={handleModalChange}
                placeholder="Exam Type"
                options={[
                  { label: "IAT1", value: "IAT1" },
                  { label: "IAT2", value: "IAT2" },
                  { label: "IAT3", value: "IAT3" },
                  { label: "MODEL", value: "MODEL" },
                  { label: "SEM", value: "SEM" },
                ]}
              />

            </div>

            {/* SAME BELOW (no change) */}
            <button onClick={handleGetExam} className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg">
              Get Exam Details
            </button>

            {examError && <div className="text-red-400 text-center">{examError}</div>}

            {examData && (
              <div className="text-green-400 text-center">
                Exam Found ✅ <br />
                <a href={examData.file_url} target="_blank" className="underline">
                  View / Download Excel
                </a>
              </div>
            )}

            <div className="border-2 border-dashed border-blue-500/30 rounded-xl p-6 text-center">
              <label className="cursor-pointer text-blue-400">
                Browse Excel File
                <input type="file" hidden onChange={handleFileChange} />
              </label>

             
            </div>
 {file && <p className="text-blue-400 mt-2">{file.name}</p>}
            <div className="flex justify-end gap-4 pt-4">
              <button onClick={() => { setOpen(false); resetModal(); }} className="px-4   cursor-pointer py-2 rounded-lg bg-white/5 border text-gray-300">
                Cancel
              </button>

              <button onClick={handleUpload} className="px-6  cursor-pointer py-2 bg-blue-600 rounded-lg text-white">
                Upload
              </button>
            </div>

          </div>
        </Box>
      </Modal>
    </div>
  );
}