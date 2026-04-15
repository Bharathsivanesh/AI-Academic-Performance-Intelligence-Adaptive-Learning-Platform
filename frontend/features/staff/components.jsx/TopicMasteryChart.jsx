"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

/* -------- Doughnut Chart -------- */

const DoughnutChart = ({ value = 0, color, label }) => {
  const safeValue = Math.min(100, Math.max(0, Number(value) || 0));

  const data = {
    datasets: [
      {
        data: [safeValue, 100 - safeValue],
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
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white font-semibold text-xs sm:text-sm">
            {safeValue}%
          </p>
        </div>
      </div>
      <p className="text-gray-400 text-xs sm:text-sm mt-2 text-center">
        {label}
      </p>
    </div>
  );
};

/* -------- Skeleton Loader -------- */

const SkeletonRing = () => (
  <div className="flex flex-col items-center flex-1 animate-pulse">
    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1e293b]" />
    <div className="mt-2 w-20 h-3 rounded bg-[#1e293b]" />
  </div>
);

/* -------- Main Component -------- */

const TopicMasteryChart = ({ data }) => {
  // Expected API fields — adjust names to match your actual response keys
  const conceptClarity =
    data?.concept_clarity_score ?? data?.concept_clarity ?? null;
  const problemSolving =
    data?.problem_solving_score ?? data?.problem_solving ?? null;
  const retentionScore = data?.retention_score ?? null;
  const aiInsight = data?.ai_insight ?? null;

  const hasData = data !== null && data !== undefined;
  const hasScores =
    conceptClarity !== null ||
    problemSolving !== null ||
    retentionScore !== null;

  return (
    <div className="bg-[#0f1c2e] h-full p-4 md:p-6 rounded-2xl shadow-md flex flex-col">
      <h2 className="text-white font-semibold mb-6 text-sm md:text-base">
        Topic Mastery
      </h2>

      {/* Charts or skeleton */}
      <div className="flex flex-row justify-between gap-4">
        {!hasData ? (
          // No filters selected yet — show skeletons
          <>
            <SkeletonRing />
            <SkeletonRing />
            <SkeletonRing />
          </>
        ) : (
          <>
            <DoughnutChart
              value={conceptClarity}
              color="#2563eb"
              label="Concept Clarity"
            />
            <DoughnutChart
              value={problemSolving}
              color="#f59e0b"
              label="Problem Solving"
            />
            <DoughnutChart
              value={retentionScore}
              color="#22c55e"
              label="Retention Score"
            />
          </>
        )}
      </div>

      {/* AI Insight */}
      <div className="bg-[#0b1624] p-4 rounded-xl mt-8 flex-1">
        <p className="text-blue-400 text-sm font-medium mb-2">
          AI Topic Insight
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {!hasData
            ? "Select a batch and subject to generate AI insights."
            : aiInsight
              ? aiInsight
              : "Class excels in theory but struggles with practical execution. Algorithmic questions require more hands-on practice sessions."}
        </p>
      </div>
    </div>
  );
};

export default TopicMasteryChart;
