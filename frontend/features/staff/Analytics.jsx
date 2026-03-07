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
    <div className="w-full h-full p-4 md:p-6">
      <div className="flex flex-col min-h-full rounded-2xl shadow-lg bg-[#0B1120]">

        {/* Header Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end p-4 md:p-6 gap-6 border-b border-white/5">

          {/* Exam Stage */}
          <div className="w-full">
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

          {/* Subject */}
          <div className="w-full">
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

          {/* Module */}
          <div className="w-full">
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

          {/* Total Students */}
          <div className="flex flex-col justify-end">
            <p className="text-xs text-gray-400">TOTAL ENROLLMENT</p>
            <h2 className="text-3xl font-bold text-white">142</h2>
            <span className="text-blue-500 text-sm">STUDENTS</span>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-2 md:p-6 flex-1">

          <div className="w-full">
            <ClassProficiencyChart />
          </div>

          <div className="w-full">
            <TopicMasteryChart />
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentAnalytics;