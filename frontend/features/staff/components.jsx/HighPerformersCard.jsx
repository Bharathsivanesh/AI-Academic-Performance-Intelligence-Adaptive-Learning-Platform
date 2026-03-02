"use client";
import React, { useState } from "react";

const mockHighPerformers = [
  { name: "Aaron Smith", id: "2023CS001", score: 96 },
  { name: "Clara Hughes", id: "2023CS042", score: 94 },
  { name: "Daniel Craig", id: "2023CS015", score: 92 },
   { name: "Aaron Smith", id: "2023CS001", score: 96 },
  { name: "Clara Hughes", id: "2023CS042", score: 94 },
  { name: "Daniel Craig", id: "2023CS015", score: 92 },
];

const HighPerformersCard = () => {
  const [activeTab, setActiveTab] = useState("Top 10");

  return (
    <div className="bg-gradient-to-br from-[#0f1c2e] to-[#0b1624] rounded-2xl p-6 shadow-lg max-h-120  overflow-y-auto ">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-semibold">
          ⭐ High Performers
        </h2>

      
      </div>

      <p className="text-xs text-gray-400 mb-6">
        IAT-2 | Data Structures | Graph Algorithms
      </p>

      {/* Student List */}
      <div className="space-y-4">
        {mockHighPerformers.map((student, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-white/5 pb-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {student.name.charAt(0)}
              </div>

              <div>
                <p className="text-white font-medium">{student.name}</p>
                <p className="text-xs text-gray-400">{student.id}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-green-400 text-lg font-bold">
                {student.score}%
              </p>
              <p className="text-xs text-gray-400">PROFICIENCY</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighPerformersCard;