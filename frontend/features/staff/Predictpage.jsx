"use client";

import React, { useEffect, useState } from "react";
import { apiService } from "@/service/Apicall";
import { Card } from "./components.jsx/Card";
import { StudentCard } from "./components.jsx/StudentCard";
import { SafeCard } from "./components.jsx/SafeCard";

const Predictpage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch API
  const getRiskData = () => {
    setLoading(true);

    apiService({
      endpoint: "/api/at-risk/",
      method: "GET",
      onSuccess: (res) => {
        setData(res);
        setLoading(false);
      },
      onError: (err) => {
        console.error(err);
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    getRiskData();
  }, []);

  if (loading) return <div className="text-white h-screen p-10">Loading...</div>;

  if (!data) return <div className="text-white h-screen p-10">No Data</div>;

  const { summary, at_risk, safe } = data;

  return (
    <div className="bg-[#0b1120] min-h-screen p-6 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          ⚡ AI Risk Prediction
        </h1>
        <div className="w-64 h-1 bg-blue-500 mt-2 rounded"></div>
      </div>
      {/* 🔥 TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* HIGH RISK */}
        <Card type="high" count={summary.high_risk} label="Will Fail" />
        <Card type="medium" count={summary.medium_risk} label="Needs Help" />
        <Card type="safe" count={summary.low_risk} label="On Track" />
      </div>

      {/* 🔥 STUDENT LIST */}
      <div className="grid md:px-8 grid-cols-1 md:grid-cols-2 gap-12">
        {/* AT RISK */}
        <div className="max-h-120 overflow-y-auto no-scrollbar">
          <h2 className="text-red-400 font-semibold mb-4">
            ❌ AT RISK STUDENTS
          </h2>

          {at_risk.high.map((student) => (
            <StudentCard key={student.student_id} student={student} />
          ))}
        </div>

        {/* SAFE */}
        <div className="max-h-120 overflow-y-auto no-scrollbar">
          <h2 className="text-green-400 font-semibold mb-4">
            ✅ SAFE STUDENTS
          </h2>

          {safe.map((student) => (
            <SafeCard key={student.student_id} student={student} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Predictpage;
