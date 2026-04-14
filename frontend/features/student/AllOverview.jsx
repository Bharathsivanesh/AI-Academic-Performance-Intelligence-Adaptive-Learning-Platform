"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
);

const AllOverview = ({ data }) => {
  const overall = data?.overall || {};
  const trend = data?.trend || [];
  const improvement = data?.improvement ?? 0;

  const isPositive = improvement > 0;
  const isNegative = improvement < 0;
  // Doughnut dynamic
  const doughnutData = {
    datasets: [
      {
        data: [overall.percentage || 0, 100 - (overall.percentage || 0)],
        backgroundColor: ["rgba(99,102,241,0.9)", "rgba(255,255,255,0.05)"],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    cutout: "80%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  // Line chart dynamic
  const lineData = {
    labels: trend.map((t) => `Sem ${t.semester}`),
    datasets: [
      {
        data: trend.map((t) => t.percentage),
        tension: 0.4,
        fill: true,
        borderColor: "#34d399",
        backgroundColor: "rgba(52,211,153,0.15)",
        pointBackgroundColor: "#34d399",
        pointRadius: 4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8" },
        grid: { display: false },
      },
      y: {
        ticks: { display: false },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl p-4 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/30 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-500/30 blur-3xl rounded-full"></div>

      <div className="relative flex flex-col lg:flex-row justify-between items-center gap-12 p-2">
        {/* LEFT */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
              {overall.grade || "-"}
            </div>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-gray-400 text-sm">Overall Percentage:</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {overall.percentage || 0}%
            </h2>
            <p className="text-gray-400 mt-1">
              Total Subjects: {overall.total_subjects || 0}
            </p>

            <div className="mt-4 inline-block px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm shadow-md shadow-emerald-500/30">
              Overall Risk Level: {overall.risk_level || "-"}
            </div>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <p className="text-gray-400 text-sm">Performance Trend</p>
          <h2
            className={`text-4xl sm:text-6xl font-bold ${
              isPositive
                ? "text-emerald-400"
                : isNegative
                  ? "text-red-400"
                  : "text-gray-400"
            }`}
          >
            {improvement}%{isPositive && " ↑"}
            {isNegative && " ↓"}
          </h2>
          <p className="text-gray-400 text-sm">Improvement this Semester</p>
        </div>

        {/* RIGHT */}
        {/* RIGHT SECTION */}
        <div className="w-full sm:w-64">
          <div className="h-28 flex items-center justify-center">
            {trend.length <= 1 ? (
              // ✅ Single Data UI
              <div className="flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-bold text-emerald-400">
                  {trend[0]?.percentage || 0}%
                </div>

                <p className="text-gray-400 text-sm mt-1">
                  Only one Semester Data Available
                </p>

                <div className="mt-2 px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300">
                  {data?.trend_status === "improving" && "📈 Improving"}
                  {data?.trend_status === "declining" && "📉 Declining"}
                  {data?.trend_status === "same" && "➖ No Change"}
                </div>
              </div>
            ) : (
              // ✅ Normal Chart (multiple points)
              <Line data={lineData} options={lineOptions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOverview;
