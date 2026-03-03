"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PerformanceCharts() {
  /* ---------------- LEFT: IAT Wise Performance ---------------- */

  const iatData = {
    labels: ["Week 1-4", "IAT-1", "Week 8-12", "IAT-2", "SEM"],
    datasets: [
      {
        label: "This Class",
        data: [65, 78, 72, 85, 91],
        backgroundColor: "rgba(59,130,246,0.8)",
        borderRadius: 10,
        barThickness: 40,
      },
    ],
  };

  const iatOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#9CA3AF",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#ffffff" },
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
        beginAtZero: true,
        max: 100,
      },
    },
  };

  /* ---------------- RIGHT: Subject Wise Performance (Custom UI) ---------------- */

  const subjects = [
    {
      name: "DATA STRUCTURES",
      score: 82,
      color: "bg-blue-500",
    },
    {
      name: "OPERATING SYSTEMS",
      score: 64,
      color: "bg-amber-500",
    },
    {
      name: "ALGORITHMS",
      score: 91,
      color: "bg-emerald-500",
    },
    {
      name: "LINEAR ALGEBRA",
      score: 74,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
      {/* LEFT CARD */}
      <div
        className="bg-gradient-to-br from-[#111827] to-[#0f172a]
                   border border-white/5 rounded-3xl p-6 shadow-xl"
      >
        <h2 className="text-white text-xl font-semibold mb-6">
          Class Performance Trend
        </h2>
        <Bar data={iatData} options={iatOptions} />
      </div>

      {/* RIGHT CARD */}
      <div
        className="bg-gradient-to-br from-[#111827] to-[#0f172a]
                   border border-white/5 rounded-3xl p-6 shadow-xl"
      >
        <h2 className="text-white text-xl font-semibold mb-8">
          Subject Proficiency
        </h2>

        <div className="space-y-6">
          {subjects.map((subject, index) => (
            <div key={index}>
              {/* Label Row */}
              <div className="flex justify-between mb-2">
                <span className="text-gray-400 text-xs tracking-wider">
                  {subject.name}
                </span>
                <span className="text-white text-sm font-medium">
                  {subject.score}%
                </span>
              </div>

              {/* Progress Background */}
              <div className="w-full h-2 bg-white/10 rounded-full">
                {/* Progress Fill */}
                <div
                  className={`h-2 rounded-full ${subject.color}`}
                  style={{ width: `${subject.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}