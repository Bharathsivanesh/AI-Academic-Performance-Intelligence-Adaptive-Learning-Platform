"use client";

import React, { useEffect, useState } from "react";
import InputField from "../../components/Inputfields";
import HighPerformersCard from "./components.jsx/HighPerformersCard";
import UnderPerformersCard from "./components.jsx/UnderPerformersCard";
import { apiService } from "../../service/Apicall";

const StudentPerformance = () => {
  const [filters, setFilters] = useState({
    batch: "",
    examStage: "",
    subject: "",
    module: "",
  });

  const [data, setData] = useState(null);

  const handleChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
  };

  // 🔥 API CALL
  useEffect(() => {
    if (!filters.batch) return; // ✅ batch mandatory

    let query = `?batch=${filters.batch}`;

    if (filters.subject) query += `&subject=${filters.subject}`;
    if (filters.examStage) query += `&exam=${filters.examStage}`;
    if (filters.module) query += `&topic=${filters.module}`;

    apiService({
      endpoint: `/api/staff-dashboard/${query}`,
      method: "GET",
      onSuccess: (res) => {
        setData(res);
      },
      onError: (err) => console.error(err),
    });
  }, [filters]);

  return (
    <div className="min-h-screen w-full bg-[#0b1220] p-6">
      <div className="bg-[#0b1624] flex flex-col h-full rounded-2xl shadow-lg">
        {/* 🔥 FILTERS */}
        <div className="flex flex-wrap items-end p-6 gap-6 border-b border-white/5">
          {/* Batch */}
          <div className="w-64">
            <p className="text-xs text-gray-400 mb-2">BATCH</p>
            <InputField
              type="select"
              name="batch"
              value={filters.batch}
              onChange={handleChange}
              placeholder="Select Batch"
              options={[
                { label: "2024", value: "1" },
                { label: "2025", value: "2" },
              ]}
            />
          </div>

          {/* Exam */}
          <div className="w-64">
            <p className="text-xs text-gray-400 mb-2">EXAM</p>
            <InputField
              type="select"
              name="examStage"
              value={filters.examStage}
              onChange={handleChange}
              placeholder="Select Exam"
              options={[
                { label: "IAT1", value: "IAT1" },
                { label: "IAT2", value: "IAT2" },
              ]}
            />
          </div>

          {/* Subject */}
          <div className="w-64">
            <p className="text-xs text-gray-400 mb-2">SUBJECT</p>
            <InputField
              type="select"
              name="subject"
              value={filters.subject}
              onChange={handleChange}
              placeholder="Select Subject"
              options={[
                { label: "Computer Networks", value: "1" },
                { label: "DBMS", value: "2" },
              ]}
            />
          </div>

          {/* Topic */}
          <div className="w-64">
            <p className="text-xs text-gray-400 mb-2">TOPIC</p>
            <InputField
              type="select"
              name="module"
              value={filters.module}
              onChange={handleChange}
              placeholder="Select Topic"
              options={[
                { label: "OSI Model", value: "1" },
                { label: "Routing", value: "2" },
              ]}
            />
          </div>

          {/* Total */}
      

          <div className="md:ml-auto">
            {" "}
            <p className="text-xs text-gray-400">TOTAL ENROLLMENT</p>{" "}
            <h2 className="text-3xl font-bold text-white"> {data?.total_students || "--"}</h2>{" "}
            <span className="text-blue-500 text-sm">STUDENTS</span>{" "}
          </div>
        </div>

        {/* 🔥 CARDS */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HighPerformersCard data={data?.high_performers} />
          <UnderPerformersCard data={data?.underperformers} />
        </div>
      </div>
    </div>
  );
};

export default StudentPerformance;
