"use client";

import React, { useEffect, useState } from "react";
import { apiService } from "@/service/Apicall";
import { Card } from "./components.jsx/Card";
import { StudentCard } from "./components.jsx/StudentCard";
import Loader from "@/components/Loader";
import { SafeCard } from "./components.jsx/SafeCard";
const Predictpage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getRiskData = () => {
    apiService({
      endpoint: "/api/at-risk/",
      method: "GET",
      setLoading: setIsLoading,
      onSuccess: (res) => setData(res),
      onError: (err) => console.error(err),
    });
  };

  useEffect(() => {
    getRiskData();
  }, []);

  if (!data && !isLoading)
    return (
      <div className="bg-[#070d1a] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-indigo-500/40 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">No prediction data available</p>
        </div>
      </div>
    );

  return (
    <div className="bg-[#070d1a] min-h-screen p-6 text-white">
      <Loader isLoading={isLoading} message="Running AI Risk Prediction..." />

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between mb-8 animate-fadeUp">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <BrainIcon />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
              AI Risk Prediction
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Random Forest · v2.3 · Last run:{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
        
          <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#0f1f14] border border-green-900 text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </span>
        </div>
      </div>

      {data && (
        <>
          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card
              type="high"
              count={data.summary.high_risk}
              label="Will Fail"
            />
            <Card
              type="medium"
              count={data.summary.medium_risk}
              label="Needs Help"
            />
            <Card type="safe" count={data.summary.low_risk} label="On Track" />
          </div>

          {/* ── STUDENT LISTS ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ListPanel
              title="At Risk Students"
              color="red"
              count={data.at_risk.high.length}
            >
              {data.at_risk.high.map((s) => (
                <StudentCard key={s.student_id} student={s} />
              ))}
            </ListPanel>

            <ListPanel
              title="Safe Students"
              color="green"
              count={data.safe.length}
            >
              {data.safe.map((s) => (
                <SafeCard key={s.student_id} student={s} />
              ))}
            </ListPanel>
          </div>
        </>
      )}
    </div>
  );
};

const ListPanel = ({ title, color, count, children }) => {
  const isRed = color === "red";
  return (
    <div className="bg-[#0b1120] border border-[#1e2540] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e2540]">
        <div
          className={`flex items-center gap-2 text-sm font-semibold ${isRed ? "text-red-400" : "text-green-400"}`}
        >
          {isRed ? <AlertIcon /> : <CheckIcon />}
          {title}
        </div>
        <span
          className={`text-xs px-2.5 py-0.5 rounded-full ${isRed ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}
        >
          {count} students
        </span>
      </div>
      <div className="p-3 max-h-[420px] overflow-y-auto no-scrollbar space-y-2">
        {children}
      </div>
    </div>
  );
};

const BrainIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M9 3a3 3 0 0 1 6 0" />
    <path d="M12 3v18" />
    <path d="M5 8a4 4 0 0 1 7-2.65" />
    <path d="M19 8a4 4 0 0 0-7-2.65" />
    <path d="M3 14a4 4 0 0 0 6 3.46" />
    <path d="M21 14a4 4 0 0 1-6 3.46" />
  </svg>
);
const AlertIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const CheckIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default Predictpage;
