"use client";

import { useEffect, useState } from "react";
import InputField from "../../components/Inputfields";
import ClassProficiencyChart from "./components.jsx/ClassSubjectPerformanceChart";
import { apiService } from "../../service/Apicall";
import TopicMasteryChart from "./components.jsx/TopicMasteryChart";
const StudentAnalytics = () => {
  const [filters, setFilters] = useState({
    batch: "",
    subject: "",
  });

  const [data, setData] = useState(null);

  const handleChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
  };

  // 🔥 API CALL WHEN BOTH VALUES PRESENT
  useEffect(() => {
    if (filters.batch && filters.subject) {
      apiService({
        endpoint: `/api/staff/topic-distribution/?batch=${filters.batch}&subject=${filters.subject}`,
        method: "GET",
        onSuccess: (res) => {
          setData(res);
        },
        onError: (err) => console.error(err),
      });
    }
  }, [filters.batch, filters.subject]);

  return (
    <div className="w-full h-screen p-4 md:p-6">
      <div className="flex flex-col min-h-full rounded-2xl shadow-lg bg-[#0B1120]">
        {/* 🔥 FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end p-4 md:p-6 gap-6 border-b border-white/5">
          {/* Batch */}
          <div>
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

          {/* Subject */}
          <div>
            <p className="text-xs text-gray-400 mb-2">SUBJECT</p>
            <InputField
              type="select"
              name="subject"
              value={filters.subject}
              onChange={handleChange}
              placeholder="Select Subject"
              options={[
                { label: "Computer Networks", value: "2" },
                { label: "DBMS", value: "3" },
              ]}
            />
          </div>

          {/* Students */}
          <div>
            <p className="text-xs text-gray-400">TOTAL ENROLLMENT</p>
            <h2 className="text-3xl font-bold text-white">
              {data?.total_students || "--"}
            </h2>
            <span className="text-blue-500 text-sm">STUDENTS</span>
          </div>
        </div>

        {/* 🔥 CHART */}
        {/* <div className="p-4 md:p-6">
          <ClassProficiencyChart data={data} />
        </div>
        
         <div className="w-full">
            <TopicMasteryChart />
          </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-2 md:p-6 flex-1">
          {" "}
          <div className="w-full">
            {" "}
            <ClassProficiencyChart  data={data} />{" "}
          </div>{" "}
          <div className="w-full">
            {" "}
            <TopicMasteryChart />{" "}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;
