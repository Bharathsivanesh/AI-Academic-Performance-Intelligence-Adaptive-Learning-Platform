
"use client";

import { Box, Button } from "@mui/material";
import { useState } from "react";
import InputField from "@/components/Inputfields";
import { supabase } from "../../../app/utils/supabaseClient";

export default function ScheduleExamPage() {
  const [fileUrl, setFileUrl] = useState("");

  const handleFileUpload = async (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const fileName = `qn_co/${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("AiAccademin_Qn_Co")
      .upload(fileName, file);

    if (error) {
      console.log(error);
      return;
    }

    // get public URL
    const { data: publicData } = supabase.storage
      .from("AiAccademin_Qn_Co")
      .getPublicUrl(fileName);

    const url = publicData.publicUrl;

    setFileUrl(url);

    console.log("File URL:", url);
  };
  const [examData, setExamData] = useState({
    department: "",
    batch: "",
    semester: "",
    subject: "",
    examType: "",
    examDate: "",
  });

  const handleExamChange = (e) => {
    setExamData({
      ...examData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(examData);
  };

  return (
    <div className="min-h-screen bg-[#0b1220] p-10 text-white">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">
          Schedule Examination
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Configure examination slots across departments
        </p>
      </div>

      {/* Main Card */}
      <Box
        sx={{
          maxWidth: "1000px",
          background: "linear-gradient(180deg,#0f172a,#0b1220)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          p: 6,
        }}
      >

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputField
            type="select"
            name="department"
            label="Department"
            mandatory={true}
            value={examData.department}
            onChange={handleExamChange}
            options={[
              { label: "Computer Science Engineering", value: "CSE" },
              { label: "Mechanical Engineering", value: "MECH" },
            ]}
          />

          <InputField
            type="select"
            name="batch"
            label="Batch"
            mandatory={true}
            value={examData.batch}
            onChange={handleExamChange}
            options={[
              { label: "2021-2025", value: "2021-2025" },
              { label: "2022-2026", value: "2022-2026" },
            ]}
          />

          <InputField
            type="select"
            name="semester"
            label="Semester"
            mandatory={true}
            value={examData.semester}
            onChange={handleExamChange}
            options={[
              { label: "Semester 1", value: "1" },
              { label: "Semester 2", value: "2" },
            ]}
          />

          <InputField
            type="select"
            name="subject"
            label="Subject"
            mandatory={true}
            value={examData.subject}
            onChange={handleExamChange}
            options={[
              { label: "Neural Networks & Deep Learning", value: "nn" },
              { label: "Operating System", value: "os" },
            ]}
          />

          <InputField
            type="select"
            name="examType"
            label="Exam Type"
            mandatory={true}
            value={examData.examType}
            onChange={handleExamChange}
            options={[
              { label: "IAT 1 (Internal Assessment)", value: "IAT1" },
              { label: "IAT 2 (Internal Assessment)", value: "IAT2" },
            ]}
          />

          <InputField
            type="date"
            name="examDate"
            label="Exam Date"
            mandatory={true}
            value={examData.examDate}
            onChange={handleExamChange}
          />

        </div>

     
        {/* Upload */}
        <div className="mt-8 border border-white/10 rounded-xl p-6 bg-[#0b1220]">

          <h3 className="text-white text-lg font-semibold mb-2">
            Upload Question Paper Mapping
          </h3>

          <p className="text-gray-400 text-sm mb-4">
            Upload an Excel file containing Question Number and CO ID mapping.
          </p>

          {/* <input
            type="file"
            accept=".xlsx,.xls"
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700"
            onChange={(e) => console.log(e.target.files[0])}
          /> */}
<input
        type="file"
        accept=".xlsx,.xls"
        className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700"
        onChange={handleFileUpload}
      />

      {/* {fileUrl && (
        <p className="text-green-400 mt-3">
          Uploaded URL: {fileUrl}
        </p>
      )} */}
        </div>

           {/* Excel Format */}
        <div className="mt-10">

          <p className="text-gray-400 text-sm mb-2">
            Required Excel Format
          </p>

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


        {/* Footer */}
        <div className="flex justify-end gap-3 mt-10">

          <Button
            variant="outlined"
            sx={{
              color: "#cbd5f5",
              borderColor: "rgba(255,255,255,0.15)",
            }}
          >
            Cancel
          </Button>

          <Button
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: "10px",
              background: "linear-gradient(90deg,#3b82f6,#2563eb)",
              color: "#fff",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(90deg,#2563eb,#1d4ed8)",
              },
            }}
            onClick={handleSubmit}
          >
            Schedule Exam
          </Button>

        </div>

      </Box>

    </div>
  );
}