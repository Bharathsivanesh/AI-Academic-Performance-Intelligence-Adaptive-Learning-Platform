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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PermTracking = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    subject: "",
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 HANDLE FILTER CHANGE
  const handleChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
  };

  // 🔥 API CALL
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
        setLoading(false);
      },
    });
  }, [filters.subject]);

  /* ---------------- SAFE DATA ---------------- */

  const avgScore = data?.subject_overview?.average_score || 0;
  const difficulty = data?.subject_overview?.difficulty || "--";

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
      {/* 🔥 HEADER */}
      <div className="flex justify-between flex-col md:flex-row gap-4 items-center">
        <div>
          <h1 className="text-2xl font-bold">Subject Intelligence Dashboard</h1>
          <p className="text-gray-400 text-sm">
            Select a subject to view analytics
          </p>
        </div>

        {/* 🔥 FILTER ALWAYS VISIBLE */}
        <div className="w-[220px]">
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
      </div>

      {/* 🔥 TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* LEFT CARD */}
        <div className="col-span-2 bg-[#111827] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start border border-gray-800">
  
  {/* Circle */}
  <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
    
    <div className="absolute inset-0 rounded-full border-16 border-gray-700"></div>

    {/* 🔥 Dynamic Progress */}
    {data && (
      <div
        className="absolute inset-0 rounded-full border-16 border-blue-500 border-t-transparent"
        style={{
          transform: `rotate(${(data.subject_overview.average_score / 100) * 360}deg)`,
        }}
      ></div>
    )}

    {/* 🔥 Dynamic Percentage */}
    <div className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl font-bold">
      {data ? `${Math.round(data.subject_overview.average_score)}%` : "--"}
    </div>
  </div>

  {/* Text */}
  <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
    
    {/* 🔥 Subject Name */}
    <h2 className="text-lg sm:text-xl font-semibold">
      {filters.subject
        ? "Selected Subject"
        : "Select Subject"}
    </h2>

    {/* 🔥 Difficulty */}
    <span
      className={`inline-block text-xs px-2 py-1 rounded-full ${
        data?.subject_overview?.difficulty === "Easy"
          ? "bg-green-500/20 text-green-400"
          : data?.subject_overview?.difficulty === "Medium"
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {data?.subject_overview?.difficulty || "--"} Difficulty
    </span>

    {/* 🔥 Description */}
    <p className="text-gray-400 text-sm max-w-md">
      A foundational course focusing on data organization, management,
      and storage formats that enable efficient access and modification.
    </p>

    {/* 🔥 Batch Info */}
    <p className="text-gray-500 text-xs">
      {data
        ? `Based on ${data.batch_trend.length} batch(es)`
        : "Select subject to view insights"}
    </p>
  </div>
</div>
        {/* RIGHT AI CARD */}
        {/* Right Card */}{" "}
        <div className="bg-gradient-to-br from-purple-700/40 to-indigo-700/40 rounded-xl p-6 border border-purple-800 space-y-4">
          {" "}
          <h3 className="text-lg font-semibold">
            AI Smart Recommendation
          </h3>{" "}
          <p className="text-gray-300 text-sm">
            {" "}
            Students find{" "}
            <span className="text-pink-400 font-medium">Graphs</span>{" "}
            exceptionally difficult. Focusing your revision here can improve
            your projected score by <span className="text-green-400">+15%</span>{" "}
            .{" "}
          </p>{" "}
          <button
            onClick={() => router.push("/student/plan")}
            className="w-full bg-white text-black cursor-pointer py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            {" "}
            Make AI Smart Study Plan →{" "}
          </button>{" "}
        </div>{" "}
      </div>

      {/* 🔥 BOTTOM SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* CHART */}
        <div className="bg-[#111827] p-6 rounded-xl">
          <h3 className="mb-4">Batch Trend</h3>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : !data ? (
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
    </div>
  );
};

export default PermTracking;
