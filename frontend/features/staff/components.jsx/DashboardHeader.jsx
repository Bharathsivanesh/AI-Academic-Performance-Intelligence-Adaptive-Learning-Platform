"use client";



import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useEffect, useState } from "react";
import InputField from "../../../components/Inputfields";
import {
  Modal,
  Box,
} from "@mui/material";
export default function DashboardHeader() {
  const [filters, setFilters] = useState({
    passoutYear: "",
    semester: "",
    academicYear: "",
  });
 const [open, setOpen] = useState(false);
  /* ---------------- Auto Academic Year Logic ---------------- */

  useEffect(() => {
    if (filters.passoutYear && filters.semester) {
      const year = parseInt(filters.passoutYear);

      // Example logic
      // SEM 1-2 → 1st year
      // SEM 3-4 → 2nd year
      // SEM 5-6 → 3rd year
      // SEM 7-8 → 4th year

      const sem = parseInt(filters.semester);

      let academicYear = "";

      if (sem <= 2) academicYear = `${year - 4}-${year -3}`;
      else if (sem <= 4) academicYear = `${year - 3}-${year -2}`;
      else if (sem <= 6) academicYear = `${year - 2}-${year -1}`;
      else academicYear = `${year-1 }-${year}`;

      setFilters((prev) => ({
        ...prev,
        academicYear,
      }));
    }
  }, [filters.passoutYear, filters.semester]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gradient-to-r from-[#0f172a] to-[#111827] 
                    p-5 rounded-2xl border border-white/5 mb-2">

      {/* Top Row */}
      <div className="flex flex-wrap justify-between items-center gap-6">

        {/* Left Section */}
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Staff Performance Overview Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Academic Year {filters.academicYear || "----"} • Computer Science
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-4">

          {/* Passout Year */}
          <div className="w-40">
            <InputField
              type="select"
              name="passoutYear"
              value={filters.passoutYear}
              onChange={handleChange}
              placeholder="Passout Year"
              options={[
                { label: "2024", value: "2024" },
                { label: "2025", value: "2025" },
                { label: "2026", value: "2026" },
              ]}
            />
          </div>

          {/* Semester */}
          <div className="w-32">
            <InputField
              type="select"
              name="semester"
              value={filters.semester}
              onChange={handleChange}
              placeholder="Semester"
              options={[
                { label: "SEM 1", value: "1" },
                { label: "SEM 2", value: "2" },
                { label: "SEM 3", value: "3" },
                { label: "SEM 4", value: "4" },
                { label: "SEM 5", value: "5" },
                { label: "SEM 6", value: "6" },
                { label: "SEM 7", value: "7" },
                { label: "SEM 8", value: "8" },
              ]}
            />
          </div>


          {/* Upload Button */}
          <button
            className="flex items-center gap-2 px-6 py-2 
                       bg-blue-600 hover:bg-blue-700 
                       rounded-xl text-white transition shadow-lg"
            onClick={()=>setOpen(true)}
          >
            <CloudUploadIcon fontSize="small" />
            Upload Academic Marks
          </button> 

        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="upload-modal"
      >
        <Box
          className="absolute top-1/2 left-1/2
                     -translate-x-1/2 -translate-y-1/2
                     w-[420px] bg-[#111827]
                     border border-white/10
                     rounded-2xl shadow-2xl p-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Upload Academic Marks
          </h2>

          <div className="space-y-5">

            {/* Passout Year */}
            <InputField
              type="select"
              name="passoutYear"
           
              value={filters.passoutYear}
              onChange={handleChange}
             
              placeholder="Select Passout Year"
              options={[
                { label: "2024", value: "2024" },
                { label: "2025", value: "2025" },
                { label: "2026", value: "2026" },
              ]}
            />

            {/* Semester */}
            <InputField
              type="select"
              name="semester"
              value={filters.semester}
              onChange={handleChange}
              placeholder="Select Semester"
           
              options={[
                { label: "SEM 1", value: "1" },
                { label: "SEM 2", value: "2" },
                { label: "SEM 3", value: "3" },
                { label: "SEM 4", value: "4" },
                { label: "SEM 5", value: "5" },
                { label: "SEM 6", value: "6" },
                { label: "SEM 7", value: "7" },
                { label: "SEM 8", value: "8" },
              ]}
            />

            {/* File Upload */}
            <div className="border-2 border-dashed border-blue-500/30
                            rounded-xl p-6 text-center">
              <label className="cursor-pointer text-blue-400">
                Browse Excel File
                <input type="file" hidden accept=".xlsx,.xls,.csv" />
              </label>
              <p className="text-gray-400 text-xs mt-2">
                Supported formats: XLSX, XLS, CSV
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg
                           bg-white/5 border border-white/10
                           text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                disabled={!filters.passoutYear || !filters.semester}
                className={`px-6 py-2 rounded-lg text-white
                  ${
                    filters.passoutYear && filters.semester
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-600/40 cursor-not-allowed"
                  }`}
              >
                Upload
              </button>
            </div>

          </div>
        </Box>
      </Modal>
    </div>
  );
}