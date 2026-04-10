"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import InputField from "../../components/Inputfields";
import { apiService } from "../../service/Apicall";

// ✅ NEW IMPORTS
import Loader from "../../components/Loader";
import { showToast } from "../../components/Notification";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PermTracking = () => {
  const router = useRouter();

  const [subjects, setSubjects] = useState([]);
  const [filters, setFilters] = useState({
    subject: "",
  });

  const [data, setData] = useState(null);

  // ✅ GLOBAL LOADER STATE
  const [loading, setLoading] = useState(false);

  /* ---------------- HANDLE FILTER ---------------- */
  const handleChange = (e) => {
    const updated = {
      ...filters,
      [e.target.name]: Number(e.target.value),
    };
    setFilters(updated);
  };

  /* ---------------- SUBJECT LIST API ---------------- */
  useEffect(() => {
    setLoading(true);

    apiService({
      endpoint: "/api/subjects/?user=true",
      method: "GET",
      onSuccess: (res) => {
        const formatted = res.map((sub) => ({
          label: sub.subject_name,
          value: sub.id,
        }));

        setSubjects(formatted);
        setLoading(false);
      },
      onError: (err) => {
        console.error(err);
        showToast("Failed to load subjects!", "error");
        setLoading(false);
      },
    });
  }, []);

  /* ---------------- SUBJECT INTELLIGENCE API ---------------- */
  useEffect(() => {
    if (!filters.subject) return;

    setLoading(true);

    apiService({
      endpoint: `/api/subject-intelligence/?subject_id=${filters.subject}`,
      method: "GET",
      onSuccess: (res) => {
        setData(res);
        setLoading(false);
      },
      onError: (err) => {
        console.error(err);
        showToast("Failed to load data!", "error");
        setLoading(false);
      },
    });
  }, [filters.subject]);

  /* ---------------- SAFE DATA ---------------- */

  const avgScore = data?.subject_overview?.average_score || 0;

  const batchData = {
    labels: data?.batch_trend?.map((b) => b.batch) || [],
    datasets: [
      {
        label: "Avg Score %",
        data: data?.batch_trend?.map((b) => b.percentage) || [],
        backgroundColor: "#3B82F6",
        borderRadius: 6,
      },
    ],
  };

  const batchOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#9CA3AF" }, grid: { display: false } },
      y: { ticks: { color: "#9CA3AF" }, grid: { color: "#1F2937" } },
    },
  };

  const topicAnalysis = data?.topic_analysis || [];

  const getColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-400";
      case "Hard":
      case "Critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTextColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "Hard":
      case "Critical":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-[#0B1120] text-white min-h-screen px-3 p-3 space-y-3">
      {/* HEADER */}
      <div className="flex justify-between flex-col md:flex-row gap-4 items-center">
        <div>
          <h1 className="text-2xl font-bold">Subject Intelligence Dashboard</h1>
          <p className="text-gray-400 text-sm">
            Select a subject to view analytics
          </p>
        </div>

        <div className="w-[220px]">
          <InputField
            type="select"
            name="subject"
            value={filters.subject}
            onChange={handleChange}
            placeholder="Select Subject"
            options={subjects}
          />
        </div>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* LEFT CARD */}
        <div className="col-span-2 bg-[#111827] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start border border-gray-800">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border-16 border-gray-700"></div>

            {data && (
              <div
                className="absolute inset-0 rounded-full border-16 border-blue-500 border-t-transparent"
                style={{
                  transform: `rotate(${(avgScore / 100) * 360}deg)`,
                }}
              ></div>
            )}

            <div className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl font-bold">
              {data ? `${Math.round(avgScore)}%` : "--"}
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold">
              {filters.subject ? "Selected Subject" : "Select Subject"}
            </h2>

            <span className="inline-block text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
              {data?.subject_overview?.difficulty || "--"} Difficulty
            </span>

            <p className="text-gray-400 text-sm max-w-md">
             A foundational course focusing on data organization, management, and storage formats that enable efficient access and modification.s
            </p>

            <p className="text-gray-500 text-xs">
              {data
                ? `Based on ${data.batch_trend.length} batch(es)`
                : "Select subject to view insights"}
            </p>
          </div>
        </div>

        {/* RIGHT AI CARD */}
        <div className="bg-gradient-to-br from-purple-700/40 to-indigo-700/40 rounded-xl p-6 border border-purple-800 space-y-4">
          <h3 className="text-lg font-semibold">AI Smart Recommendation</h3>

          <p className="text-gray-300 text-sm">
            Students find <span className="text-pink-400">Graphs</span>{" "}
            difficult. Improve score by{" "}
            <span className="text-green-400">+15%</span>.
          </p>

          <button
            onClick={() => router.push("/student/plan")}
            className="w-full bg-white text-black py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            Make AI Smart Study Plan →
          </button>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* CHART */}
        <div className="bg-[#111827] p-6 rounded-xl">
          <h3 className="mb-4">Batch Trend</h3>

          {!data ? (
            <p className="text-gray-400">Select subject</p>
          ) : (
            <Bar data={batchData} options={batchOptions} />
          )}
        </div>

        {/* TOPICS */}
        <div className="bg-[#111827] p-6 rounded-xl space-y-8">
          <h3>Topic Analysis</h3>

          {!data ? (
            <p className="text-gray-400">Select subject</p>
          ) : topicAnalysis.length === 0 ? (
            <p className="text-gray-400">No data available</p>
          ) : (
            topicAnalysis.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{item.topic}</span>
                  <span className={getTextColor(item.difficulty)}>
                    {item.difficulty} ({item.percentage}%)
                  </span>
                </div>

                <div className="w-full bg-gray-700 h-3 rounded">
                  <div
                    className={`${getColor(item.difficulty)} h-3 rounded`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ✅ GLOBAL LOADER */}
      <Loader isLoading={loading} message="Loading data..." />
    </div>
  );
};

export default PermTracking;
