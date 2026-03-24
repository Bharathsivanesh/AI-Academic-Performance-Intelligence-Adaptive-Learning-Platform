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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PerformanceCharts({ data }) {

  const iatData = {
    labels: data?.trend?.map((item) => item.label),
    datasets: [
      {
        label: "Performance",
        data: data?.trend?.map((item) => item.value),
        backgroundColor: "rgba(59,130,246,0.8)",
        borderRadius: 10,
      },
    ],
  };

  const subjects = data?.subjects?.map((sub) => ({
    name: sub.subject,
    score: sub.percentage,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">

      {/* LEFT */}
      <div className="bg-[#111827] p-6 rounded-2xl">
        <h2 className="text-white mb-4">Trend</h2>
        <Bar data={iatData} />
      </div>

      {/* RIGHT */}
      <div className="bg-[#111827] p-6 rounded-2xl">
        <h2 className="text-white mb-4">Subjects</h2>

        {subjects.map((sub, i) => (
          <div key={i} className="mb-4 flex flex-col gap-4">
            <div className="flex justify-between text-white text-sm">
              <span>{sub.name}</span>
              <span>{sub.score}%</span>
            </div>

            <div className="w-full bg-gray-700 h-2 rounded">
              <div
                className="bg-blue-500 h-2 rounded"
                style={{ width: `${sub.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}