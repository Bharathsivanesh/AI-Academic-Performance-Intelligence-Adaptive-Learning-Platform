"use client";

import React, { useEffect, useState } from "react";
import InputField from "../../components/Inputfields";
import HighPerformersCard from "./components.jsx/HighPerformersCard";
import UnderPerformersCard from "./components.jsx/UnderPerformersCard";
import { apiService } from "../../service/Apicall";
import Loader from "@/components/Loader";
import { showToast } from "@/components/Notification";

const StudentPerformance = () => {
  const [filters, setFilters] = useState({
    batch: "",
    subject: "",
    module: "",
  });

  const [data, setData] = useState(null);
  // ✅ Add these states
  const [Loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "Fetching Performance Data...",
  );
  // 🔥 Dynamic dropdown data
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);

  // ================= FETCH BATCHES =================
  useEffect(() => {
    apiService({
      endpoint: "/api/staff/batches/",
      method: "GET",
      onSuccess: (res) => {
        const formatted = res.map((b) => ({
          label: b.batch_name,
          value: b.id,
        }));
        setBatches(formatted);
      },
    });
  }, []);

  // ================= FETCH SUBJECTS =================
  useEffect(() => {
    apiService({
      endpoint: "/api/subjects/?user=true",
      method: "GET",
      onSuccess: (res) => {
        const formatted = res.map((s) => ({
          label: s.subject_name,
          value: s.id,
        }));
        setSubjects(formatted);
      },
    });
  }, []);

  // ================= FETCH TOPICS BASED ON SUBJECT =================
  useEffect(() => {
    if (!filters.subject) return;

    apiService({
      endpoint: `/api/subjects/${filters.subject}/topics/`,
      method: "GET",
      setLoading,
      onSuccess: (res) => {
        const formatted = res.map((t) => ({
          label: t.topic_name,
          value: t.id,
        }));
        setTopics(formatted);
      },
    });
  }, [filters.subject]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };

    // 🔥 reset topic when subject changes
    if (e.target.name === "subject") {
      updated.module = "";
    }

    setFilters(updated);
  };

  // ================= DASHBOARD API =================
  useEffect(() => {
    if (!filters.batch) return;

    let query = `?batch=${filters.batch}`;

    if (filters.subject) query += `&subject=${filters.subject}`;
    if (filters.module) query += `&topic=${filters.module}`;

    apiService({
      endpoint: `/api/staff-dashboard/${query}`,
      method: "GET",
      onSuccess: (res) => {
        setData(res);
        // showToast("Performance data loaded!", "success");
      },

      onError: (err) => console.error(err),
    });
  }, [filters]);

  return (
    <div className="min-h-screen w-full bg-[#0b1220] p-6">
      <Loader isLoading={Loading} message={loadingMessage} />
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
              options={batches}
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
              options={subjects}
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
              options={topics}
            />
          </div>

          {/* Total */}
          <div className="md:ml-auto">
            <p className="text-xs text-gray-400">TOTAL ENROLLMENT</p>
            <h2 className="text-3xl font-bold text-white">
              {data?.total_students || "--"}
            </h2>
            <span className="text-blue-500 text-sm">STUDENTS</span>
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
