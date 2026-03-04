
"use client";
import React from 'react'
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
const AllOverview = () => {
    
  /* =========================
     Circular Score Chart
  ========================== */

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

  /* =========================
     Performance Trend Chart
  ========================== */

  const lineData = {
    labels: ["Semester 1", "Semester 2", "Semester 3"],
    datasets: [
      {
        data: [72, 18, 25],
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
    <div> <div className="relative w-full overflow-hidden rounded-3xl p-2 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
          {/* Glow Background */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/30 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-500/30 blur-3xl rounded-full"></div>
    
          <div className="relative flex justify-between p-6 items-center">
            {/* Left: Circular Score */}
            <div className="flex items-center gap-24">
              <div className="relative w-32 h-32">
                <Doughnut data={doughnutData} options={doughnutOptions} />
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
                  A+
                </div>
              </div>
    
              <div>
                <p className="text-gray-400 text-sm">Overall Percentage:</p>
                <h2 className="text-4xl font-bold text-white">85%</h2>
                <p className="text-gray-400 mt-1">Total Subjects: 6</p>
    
                <div className="mt-4 inline-block px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm shadow-md shadow-emerald-500/30">
                  Overall Risk Level: Low
                </div>
              </div>
            </div>
    
            {/* Middle Divider */}
            <div className="flex flex-col gap-4">
              <p className="text-gray-400 text-sm">Performance Trend</p>
              <h2 className="text-6xl font-bold text-emerald-400 mt-2">+8.5% ↑</h2>
              <p className="text-gray-400 text-sm mb-4">
                Improvement this Semester
              </p>
            </div>
    
            {/* Right: Trend */}
            <div>
              <div className="h-32">
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
         
          </div>
        </div></div>
  )
}

export default AllOverview