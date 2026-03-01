"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ClassProficiencyChart = () => {
  const data = {
    labels: [
      "CO-1 Computational Complexity",
      "CO-2 Abstract Data Types",
      "CO-3 Graph Traversal",
    ],
    datasets: [
      {
        label: "Exceeding",
        data: [40, 25, 15],
        backgroundColor: "#22c55e",
        borderRadius: 8,
      },
      {
        label: "Meeting",
        data: [35, 45, 30],
        backgroundColor: "#2563eb",
        borderRadius: 8,
      },
      {
        label: "Developing",
        data: [15, 20, 35],
        backgroundColor: "#f59e0b",
        borderRadius: 8,
      },
      {
        label: "Below",
        data: [10, 10, 20],
        backgroundColor: "#ef4444",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: { color: "#94a3b8" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        stacked: true,
        ticks: { color: "#94a3b8" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-[#0f1c2e] p-6 rounded-2xl shadow-md">
      <h2 className="text-white font-semibold mb-4">
        Class Proficiency Distribution
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ClassProficiencyChart;