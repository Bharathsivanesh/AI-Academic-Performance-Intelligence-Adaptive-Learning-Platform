"use client";

import { useEffect, useState } from "react";
import InputField from "../../components/Inputfields";
import ClassProficiencyChart from "./components.jsx/ClassSubjectPerformanceChart";
import TopicMasteryChart from "./components.jsx/TopicMasteryChart";
import { apiService } from "../../service/Apicall";
import Loader from "@/components/Loader";
import { showToast } from "@/components/Notification";

const StudentAnalytics = () => {
  const [filters, setFilters] = useState({ batch: "", subject: "" });
  const [data, setData] = useState(null);
  const [batchOptions, setBatchOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  // ✅ Loader only for analytics API
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Analyzing Data...");

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
  };

  // ================= FETCH BATCHES (no loader) =================
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
      onError: (err) => console.error(err),
    });
  }, []);

  // ================= FETCH SUBJECTS (no loader) =================
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
      onError: (err) => console.error(err),
    });
  }, []);

  // ================= ANALYTICS API ✅ (loader + toast) =================
  useEffect(() => {
    if (filters.batch && filters.subject) {
      setLoadingMessage("Fetching Topic Analytics...");
      apiService({
        endpoint: `/api/staff/topic-distribution/?batch=${filters.batch}&subject=${filters.subject}`,
        method: "GET",
        setLoading: setIsLoading,
        onSuccess: (res) => {
          setData(res);
          showToast("Analytics loaded successfully!", "success");
        },
        onError: (err) => {
          console.error(err);
          showToast("Failed to load analytics!", "error");
        },
      });
    }
  }, [filters.batch, filters.subject]);

  return (
    <div className="w-full h-screen p-4 md:p-6">
      {/* ✅ Loader - only for analytics filter API */}
      <Loader isLoading={isLoading} message={loadingMessage} />

      <div className="flex flex-col min-h-full rounded-2xl shadow-lg bg-[#0B1120]">
        {/* FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end p-4 md:p-6 gap-6 border-b border-white/5">
          <div>
            <p className="text-xs text-gray-400 mb-2">BATCH</p>
            <InputField
              type="select"
              name="batch"
              value={filters.batch}
              onChange={handleChange}
              placeholder="Select Batch"
              options={batchOptions}
            />
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-2">SUBJECT</p>
            <InputField
              type="select"
              name="subject"
              value={filters.subject}
              onChange={handleChange}
              placeholder="Select Subject"
              options={subjectOptions}
            />
          </div>

          <div>
            <p className="text-xs text-gray-400">TOTAL ENROLLMENT</p>
            <h2 className="text-3xl font-bold text-white">
              {data?.total_students || "--"}
            </h2>
            <span className="text-blue-500 text-sm">STUDENTS</span>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-2 md:p-6 flex-1">
          <div className="w-full">
            <ClassProficiencyChart data={data} />
          </div>
          <div className="w-full">
            <TopicMasteryChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;
