"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

/* ---------------- Doughnut Chart ---------------- */

const DoughnutChart = ({ value, color, label }) => {

  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, "#1e293b"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="flex flex-col items-center flex-1">

      {/* Chart */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">

        <Doughnut data={data} options={options} />

        {/* Center Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white font-semibold text-xs sm:text-sm">
            {value}%
          </p>
        </div>

      </div>

      {/* Label */}
      <p className="text-gray-400 text-xs sm:text-sm mt-2 text-center">
        {label}
      </p>

    </div>
  );
};

/* ---------------- Main Component ---------------- */

const TopicMasteryChart = () => {
  return (
    <div className="bg-[#0f1c2e] h-full p-4 md:p-6 rounded-2xl shadow-md">

      <h2 className="text-white font-semibold mb-6 text-sm md:text-base">
        Topic Mastery
      </h2>

      {/* Charts */}
      <div className="flex flex-row sm:flex-row justify-between gap-4">

        <DoughnutChart
          value={78}
          color="#2563eb"
          label="Concept Clarity"
        />

        <DoughnutChart
          value={48}
          color="#f59e0b"
          label="Problem Solving"
        />

        <DoughnutChart
          value={68}
          color="#22c55e"
          label="Retention Score"
        />

      </div>

      {/* AI Insight */}
      <div className="bg-[#0b1624] p-4  rounded-xl mt-8">

        <p className="text-blue-400 text-sm font-medium mb-2">
          AI Topic Insight
        </p>

        <p className="text-gray-400 text-sm leading-relaxed">
          Class excels in theory but struggles with practical execution.
          Algorithmic questions require more hands-on practice sessions.
        </p>

      </div>

    </div>
  );
};

export default TopicMasteryChart;