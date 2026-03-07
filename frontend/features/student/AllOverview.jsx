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
  Filler
);

const AllOverview = () => {
  const doughnutData = {
    datasets: [
      {
        data: [85, 15],
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

  const lineData = {
    labels: ["Semester 1", "Semester 2", "Semester 3"],
    datasets: [
      {
        data: [72, 80, 85],
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
    <div className="relative w-full  overflow-hidden rounded-3xl p-4 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">

      {/* Glow Effects */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/30 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-500/30 blur-3xl rounded-full"></div>

      <div className="relative flex flex-col lg:flex-row justify-between items-center gap-12 p-2">

        {/* LEFT SECTION */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">

          {/* Doughnut */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
              A+
            </div>
          </div>

          {/* Score Info */}
          <div className="text-center sm:text-left">
            <p className="text-gray-400 text-sm">Overall Percentage:</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">85%</h2>
            <p className="text-gray-400 mt-1">Total Subjects: 6</p>

            <div className="mt-4 inline-block px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm shadow-md shadow-emerald-500/30">
              Overall Risk Level: Low
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <p className="text-gray-400 text-sm">Performance Trend</p>
          <h2 className="text-4xl sm:text-6xl font-bold text-emerald-400">
            +8.5% ↑
          </h2>
          <p className="text-gray-400 text-sm">
            Improvement this Semester
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full sm:w-64">
          <div className="h-28">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AllOverview;