"use client";

import { useEffect, useRef } from "react";
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
  Legend,
);

// ── Shared card wrapper ────────────────────────────────────────────────────────
const Card = ({ title, children }) => (
  <div
    style={{
      background: "#111827",
      borderRadius: "16px",
      padding: "20px",
      border: "0.5px solid rgba(255,255,255,0.07)",
      minHeight: "280px",
    }}
  >
    <p
      style={{
        color: "#e8f0ff",
        fontSize: "15px",
        fontWeight: 500,
        margin: "0 0 16px",
      }}
    >
      {title}
    </p>
    {children}
  </div>
);

// ── Empty state ────────────────────────────────────────────────────────────────
const EmptyState = ({ icon, label }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "200px",
      gap: "10px",
    }}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "rgba(59,130,246,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
    <span style={{ fontSize: "13px", color: "#4a6a9a", textAlign: "center" }}>
      {label}
    </span>
  </div>
);

const TrendIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#5b9cf6"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const SubjectsIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#5b9cf6"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

// ── Main component ─────────────────────────────────────────────────────────────
export default function PerformanceCharts({ data }) {
  const trendData = data?.trend ?? [];
  const subjectsRaw = data?.subjects ?? [];

  const subjects = subjectsRaw.map((sub) => ({
    name: sub.subject,
    score: Math.round(sub.percentage),
  }));

  const hasTrend = trendData.length > 0;
  const hasSubjects = subjects.length > 0;

  const chartData = {
    labels: trendData.map((i) => i.label),
    datasets: [
      {
        label: "Performance",
        data: trendData.map((i) => i.value),
        backgroundColor: "rgba(59,130,246,0.75)",
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#e8f0ff",
        bodyColor: "#5b9cf6",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        callbacks: { label: (ctx) => ` ${ctx.parsed.y}%` },
      },
    },
    scales: {
      x: {
        ticks: { color: "#4a6a9a", font: { size: 12 } },
        grid: { color: "rgba(255,255,255,0.04)" },
        border: { color: "rgba(255,255,255,0.04)" },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: "#4a6a9a",
          font: { size: 12 },
          callback: (v) => `${v}%`,
        },
        grid: { color: "rgba(255,255,255,0.04)" },
        border: { color: "rgba(255,255,255,0.04)" },
      },
    },
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "12px",
        marginTop: "8px",
      }}
    >
      {/* ── LEFT: Trend ── */}
      <Card title="Trend">
        {hasTrend ? (
          <div style={{ position: "relative", height: "200px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        ) : (
          <EmptyState
            icon={<TrendIcon />}
            label="No trend data available yet"
          />
        )}
      </Card>

      {/* ── RIGHT: Subjects ── */}
      <Card title="Subjects">
        {hasSubjects ? (
          subjects.map((sub, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <span style={{ fontSize: "13px", color: "#c8d8f0" }}>
                  {sub.name}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#5b9cf6",
                    fontWeight: 500,
                  }}
                >
                  {sub.score}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.08)",
                  height: "6px",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${sub.score}%`,
                    height: "6px",
                    borderRadius: "6px",
                    background: "linear-gradient(90deg, #2563eb, #818cf8)",
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            icon={<SubjectsIcon />}
            label="No subject data available yet"
          />
        )}
      </Card>
    </div>
  );
}
