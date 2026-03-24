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

const ClassProficiencyChart = ({ data }) => {

  // 🔥 HANDLE EMPTY
  if (!data || !data.topic_distribution) {
    return (
      <div className="text-white p-10 text-center">
        Select Batch & Subject
      </div>
    );
  }

  const topics = data.topic_distribution;

  // ✅ LABELS
  const labels = topics.map((t) => t.topic);

  // ✅ DATASETS
  const chartData = {
    labels,
    datasets: [
      {
        label: "Exceeding",
        data: topics.map((t) => t.Exceeding),
        backgroundColor: "#22c55e",
        borderRadius: 6,
      },
      {
        label: "Meeting",
        data: topics.map((t) => t.Meeting),
        backgroundColor: "#2563eb",
        borderRadius: 6,
      },
      {
        label: "Developing",
        data: topics.map((t) => t.Developing),
        backgroundColor: "#f59e0b",
        borderRadius: 6,
      },
      {
        label: "Below",
        data: topics.map((t) => t.Below),
        backgroundColor: "#ef4444",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: {
      legend: {
        labels: { color: "#cbd5e1" },
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
        ticks: {
          color: "#94a3b8",
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-[#0f1c2e] p-6 rounded-2xl h-[420px]">
      <h2 className="text-white font-semibold mb-4">
        Topic Proficiency Distribution
      </h2>

      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ClassProficiencyChart;