"use client";

import React from "react";
import { Bell } from "lucide-react";

const planData = [
  {
    day: "DAY 1 • 4 HOURS FOCUS",
    title: "Introduction to Neural Networks",
    resources: ["YouTube Resource", "Read Overview"],
  },
  {
    day: "DAY 2 • 4 HOURS FOCUS",
    title: "Backpropagation & Optimization",
    resources: ["Textbook Ch. 4", "Lab Exercise"],
  },
  {
    day: "DAY 3 • 4 HOURS FOCUS",
    title: "Deep Learning Architectures",
    resources: ["Video Tutorial"],
  },
];

const StudyPlanTimeline = () => {
  return (
    <div className="bg-[#0b1325] text-white rounded-2xl p-6 md:p-10 mt-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">

        <div>
          <h2 className="text-xl font-semibold">
            Neural Networks: 7-Day Plan
          </h2>

          <p className="text-gray-400 text-sm">
            Targeting: Fundamental Architectures & Backprop
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-[#0f172a] rounded-xl p-4 flex flex-col gap-3">

          <span className="text-blue-400 tracking-widest text-sm font-semibold">
            PLAN PROGRESS
          </span>

          <div className="flex items-center gap-4">

            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: "33%" }}
              />
            </div>

            <span className="text-white font-semibold text-lg">
              33%
            </span>

          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">

        {/* Center line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-[3px] bg-white/10" />

      {planData.map((item, index) => {

  const isLeft = index % 2 === 0;

  return (
    <div
      key={index}
      className={`relative flex mb-10
      ${isLeft ? "md:justify-start" : "md:justify-end"}
      justify-start`}
    >

      {/* Dot */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />

      {/* Card */}
      <div
        className={`
        ml-12 md:ml-0
        md:w-1/2
        ${isLeft ? "md:pr-10" : "md:pl-10"}
        `}
      >

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">

          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-blue-400 tracking-wider">
              {item.day}
            </span>

            <Bell size={16} className="text-gray-400" />
          </div>

          <h3 className="text-lg font-semibold mb-4">
            {item.title}
          </h3>

        </div>
      </div>

      {/* Step Number */}
      <span
        className={`hidden md:block absolute text-6xl font-bold text-white/5
        ${isLeft ? "right-[55%]" : "left-[55%]"}
        top-1/2 -translate-y-1/2`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

    </div>
  );
})}
      </div>

    </div>
  );
};

export default StudyPlanTimeline;