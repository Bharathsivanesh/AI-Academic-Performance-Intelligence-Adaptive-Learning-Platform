"use client";
import React from "react";
import { Bell } from "lucide-react";

const planData = [
  {
    day: "DAY 1 • 4 HOURS FOCUS",
    title: "Introduction to Neural Networks",
    resources: ["YouTube Resource", "Read Overview"],
    side: "right",
  },
  {
    day: "DAY 2 • 4 HOURS FOCUS",
    title: "Backpropagation & Optimization",
    resources: ["Textbook Ch. 4", "Lab Exercise"],
    side: "left",
  },
  {
    day: "DAY 3 • 4 HOURS FOCUS",
    title: "Deep Learning Architectures",
    resources: ["Video Tutorial"],
    side: "right",
  },
    {
    day: "DAY 3 • 4 HOURS FOCUS",
    title: "Deep Learning Architectures",
    resources: ["Video Tutorial"],
    side: "left",
  },
];

const StudyPlanTimeline = () => {
  return (
    <div className="bg-[#0b1325] text-white rounded-2xl p-10 relative overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-xl font-semibold">
            Neural Networks: 7-Day Plan
          </h2>
          <p className="text-gray-400 text-sm">
            Targeting: Fundamental Architectures & Backprop
          </p>
        </div>

       <div className="w-1/2 bg-[#0f172a] rounded-xl p-4 flex items-center justify-between">

  {/* Left Text */}
  <span className="text-blue-400 tracking-widest text-sm font-semibold">
    PLAN PROGRESS
  </span>

  {/* Progress Bar */}
  <div className="flex items-center gap-4 w-2/3">

    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
      <div
        className="bg-blue-500 h-full rounded-full transition-all duration-500"
        style={{ width: "33%" }}
      ></div>
    </div>

    {/* Percentage */}
    <span className="text-white font-semibold text-lg">
      33%
    </span>

  </div>
</div>
      </div>

      {/* Timeline */}
      <div className="relative">

        {/* Center Line */}
        <div className="absolute left-1/2 top-0 h-full w-[3px] bg-white/10"></div>

        {planData.map((item, index) => (
          <div
            key={index}
            className={`relative flex items-center  ${
              item.side === "left"
                ? "justify-start"
                : "justify-end"
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>

            {/* Card */}
            <div
              className={`w-[420px] p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md ${
                item.side === "left"
                  ? "mr-auto"
                  : "ml-auto"
              }`}
            >
              <div className="flex justify-between  items-center mb-2">
                <span className="text-xs text-blue-400 tracking-wider">
                  {item.day}
                </span>
                <Bell size={16} className="text-gray-400" />
              </div>

              <h3 className="text-lg font-semibold mb-4">
                {item.title}
              </h3>

              <div className="flex gap-3 flex-wrap">
                {item.resources.map((res, i) => (
                  <button
                    key={i}
                    className="text-xs px-3 py-2  border border-blue-500 rounded-md text-white bg-blue-600 hover:bg-blue-500"
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>

            {/* Big step number */}
           <span
  className={`absolute -translate-x-1/2 text-6xl text-white/5 font-bold ${
    item.side === "left" ? "left-120" : "left-160"
  }`}
>
  0{index + 1}
</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyPlanTimeline;