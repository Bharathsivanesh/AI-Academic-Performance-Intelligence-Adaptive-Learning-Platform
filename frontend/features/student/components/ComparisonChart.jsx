"use client";
import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const ComparisonChart = () => {
  const data = {
    labels: ["Arrays", "Linked Lists", "Stacks", "Queues", "Graphs"],
    datasets: [
      {
        label: "Pre-Plan",
        data: [40, 25, 30, 28, 20],
        backgroundColor: "rgba(148,163,184,0.35)",
        borderRadius: 6,
        barThickness: 30
      },
      {
        label: "Post-Plan",
        data: [54, 68, 62, 58, 57],
        backgroundColor: "#3B82F6",
        borderRadius: 6,
        barThickness: 30
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          color: "#94A3B8",
          boxWidth: 24,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#94A3B8",
          font: { size: 12 },
        },
        grid: { display: false },
      },
      y: {
        ticks: { display: false },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl">

      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-lg font-semibold">
          Topic Performance Growth
        </h2>

        <p className="text-sm text-gray-400">
          Deep dive into <span className="text-blue-400">Data Structures</span> improvements
        </p>
      </div>

      {/* Chart */}
      <div className="h-[360px] w-full overflow-hidden px-6">
  <Bar data={data} options={options} />
</div>

      {/* Insight Box */}
      <div className="border-t border-white/10 p-5 flex items-start gap-3">
        <div className="w-7 h-7 rounded-md bg-blue-600/20 flex items-center justify-center text-blue-400">
          💡
        </div>

        <p className="text-sm text-gray-300">
          Your biggest improvement was in{" "}
          <span className="text-blue-400">Linked Lists</span> with a massive
          43% score increase. You've reached master level in{" "}
          <span className="text-green-400">Arrays</span>.
        </p>
      </div>

    </div>
  );
};

export default ComparisonChart;