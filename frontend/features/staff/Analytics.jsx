"use client";

import { useState } from "react";
import InputField from "../../components/Inputfields";
import ClassProficiencyChart from "./components.jsx/ClassSubjectPerformanceChart";
import TopicMasteryChart from "./components.jsx/TopicMasteryChart";


const StudentAnalytics = () => {
  const [filters, setFilters] = useState({
    examStage: "",
    subject: "",
    module: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#0b1624] flex flex-col p-6 rounded-2xl shadow-lg">
      {/* Header Row */}
      <div className="flex flex-wrap items-end p-5 gap-6">

        {/* Exam Stage */}
        <div className="w-64">
          <p className="text-xs text-gray-400 mb-2">EXAM STAGE</p>
          <InputField
            type="select"
            name="examStage"
            value={filters.examStage}
            onChange={handleChange}
            placeholder="Select Exam"
            options={[
              { label: "IAT-2 Mid-term", value: "iat2" },
              { label: "IAT-1 Mid-term", value: "iat1" },
            ]}
          />
        </div>

        {/* Subject Discipline */}
        <div className="w-72">
          <p className="text-xs text-gray-400 mb-2">SUBJECT DISCIPLINE</p>
          <InputField
            type="select"
            name="subject"
            value={filters.subject}
            onChange={handleChange}
            placeholder="Select Subject"
            options={[
              { label: "Data Structures & Algorithms", value: "dsa" },
              { label: "Operating Systems", value: "os" },
            ]}
          />
        </div>

        {/* Module / Topic */}
        <div className="w-72">
          <p className="text-xs text-gray-400 mb-2">MODULE / TOPIC</p>
          <InputField
            type="select"
            name="module"
            value={filters.module}
            onChange={handleChange}
            placeholder="Select Module"
            options={[
              { label: "CO-3 Graph Traversal & Search", value: "co3" },
              { label: "Sorting Algorithms", value: "sorting" },
            ]}
          />
        </div>

        {/* Total Enrollment */}
        <div>
          <p className="text-xs text-gray-400">TOTAL ENROLLMENT</p>
          <h2 className="text-3xl font-bold text-white">142</h2>
          <span className="text-blue-500 text-sm">STUDENTS</span>
        </div>

      </div>
      <div className="flex w-full gap-6 flex-row">
        <div className="w-1/2">
    <ClassProficiencyChart />
  </div>

  <div className="w-1/2">
    <TopicMasteryChart />
  </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;