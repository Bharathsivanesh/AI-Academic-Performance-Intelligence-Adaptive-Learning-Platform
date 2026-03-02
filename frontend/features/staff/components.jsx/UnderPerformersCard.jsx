"use client";
import React, { useState } from "react";

const mockUnderPerformers = [
  { name: "Chris Wilson", id: "2023CS028", score: 38 },
  { name: "Bella Johnson", id: "2023CS014", score: 42 },
  { name: "Ryan Cooper", id: "2023CS033", score: 45 },
    { name: "Chris Wilson", id: "2023CS028", score: 38 },
  { name: "Bella Johnson", id: "2023CS014", score: 42 },
  { name: "Ryan Cooper", id: "2023CS033", score: 45 },
];

const UnderPerformersCard = () => {
  const [activeTab, setActiveTab] = useState("At Risk");

  return (
    <div className="bg-gradient-to-br from-[#1a1f35] to-[#0f172a] rounded-2xl p-6 shadow-lg max-h-120  overflow-y-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-semibold">
          ❗ Underperformers
        </h2>

     
      </div>

      <p className="text-xs text-gray-400 mb-6">
        IAT-2 | Data Structures | Graph Algorithms
      </p>

      {/* Student List */}
      <div className="space-y-4">
        {mockUnderPerformers.map((student, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-white/5 pb-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div>
                <p className="text-white font-medium">{student.name}</p>
                <p className="text-xs text-gray-400">{student.id}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-red-400 text-lg font-bold">
                {student.score}%
              </p>
              <p className="text-xs text-red-400">CRITICAL</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnderPerformersCard;