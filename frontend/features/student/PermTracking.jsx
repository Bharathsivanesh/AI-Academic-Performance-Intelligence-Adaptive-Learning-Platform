"use client";
import React, { useState } from "react";
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

// Register Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PermTracking = () => {
  // 🔹 Batch Performance Data
  const batchData = {
    labels: ["2022", "2023", "2024"],
    datasets: [
      {
        label: "Avg Score %",
        data: [72, 75, 78],
        backgroundColor: ["#4B5563", "#6B7280", "#3B82F6"],
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const batchOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#9CA3AF" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#9CA3AF" },
        grid: { color: "#1F2937" },
      },
    },
  };

  // 🔹 Topic Difficulty Data
    const [filters, setFilters] = useState({
      subject: "",
    });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };  
  const topicAnalysis = [
    { topic: "Arrays", percentage: 88, difficulty: "Easy" },
    { topic: "Linked Lists", percentage: 72, difficulty: "Medium" },
    { topic: "Stacks & Queues", percentage: 76, difficulty: "Medium" },
    { topic: "Graphs", percentage: 42, difficulty: "Critical" },
  ];
  const router = useRouter();
  return (
    <div className="bg-[#0B1120] text-white min-h-screen px-3 p-3 mt-4 md:mt-0 space-y-2">
      {/* Header */}
      <div className="flex justify-between flex-col md:flex-row gap-4 md:gap-0 items-center">
        <div>
          <h1 className="text-2xl font-bold">Subject Intelligence Dashboard</h1>
          <p className="text-gray-400 text-sm">
            Analyze subject difficulty based on past student performance to
            optimize your study strategy.
          </p>
        </div>
        <div className="w-[20%]">
          <InputField
            type="select"
            name="subject"
            value={filters.subject}
            onChange={handleChange}
            placeholder="Select Subject"
            options={[
              { label: "Data Structures", value: "data-structures" },
              { label: "Algorithms", value: "algorithms" },
              { label: "Database Management", value: "database-management" },
            ]}
          />
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 mt-2 md:grid-cols-3 gap-3">
        {/* Left Card */}
        <div className="col-span-2 bg-[#111827] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start border border-gray-800">
          {/* Circle */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border-16 border-gray-700"></div>
            <div className="absolute inset-0 rounded-full border-16 border-blue-500 border-t-transparent rotate-[280deg]"></div>
            <div className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl font-bold">
              78%
            </div>
          </div>

          {/* Text */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold">
              Data Structures
            </h2>

            <span className="inline-block bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">
              Hard Difficulty
            </span>

            <p className="text-gray-400 text-sm max-w-md">
              A foundational course focusing on data organization, management,
              and storage formats that enable efficient access and modification.
            </p>

            <p className="text-gray-500 text-xs">
              Based on past 3 batches (2022–2024)
            </p>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-gradient-to-br from-purple-700/40 to-indigo-700/40 rounded-xl p-6 border border-purple-800 space-y-4">
          <h3 className="text-lg font-semibold">AI Smart Recommendation</h3>

          <p className="text-gray-300 text-sm">
            Students find{" "}
            <span className="text-pink-400 font-medium">Graphs</span>{" "}
            exceptionally difficult. Focusing your revision here can improve
            your projected score by <span className="text-green-400">+15%</span>
            .
          </p>

          <button
            onClick={() => router.push("/student/plan")}
            className="w-full bg-white text-black cursor-pointer py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            Make AI Smart Study Plan →
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Batch Trend Chart */}
        <div className="bg-[#111827] rounded-xl p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Batch Performance Trend</h3>
            <span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded">
              +5% increase
            </span>
          </div>

          <Bar data={batchData} options={batchOptions} />
        </div>

        {/* Topic Difficulty Chart */}
        {/* Topic Difficulty */}
        <div className="bg-[#111827] rounded-xl p-6 border border-gray-800 space-y-4">
          <h3 className="text-md font-semibold">Topic Difficulty Analysis</h3>

          {topicAnalysis.map((item, index) => {
            const getColor = (difficulty) => {
              switch (difficulty) {
                case "Easy":
                  return "bg-green-500";
                case "Medium":
                  return "bg-yellow-400";
                case "Hard":
                  return "bg-red-500";
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
              <div key={index} className="flex flex-col gap-2">
                {/* Title Row */}
                <div className="flex justify-between text-xs mb-1">
                  <span className="uppercase tracking-wide">{item.topic}</span>
                  <span
                    className={`${getTextColor(item.difficulty)} font-medium`}
                  >
                    {item.difficulty.toUpperCase()} (
                    {Math.round(item.percentage)}%)
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 h-4 rounded">
                  <div
                    className={`${getColor(item.difficulty)} h-4 rounded`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PermTracking;
