import React from "react";

const ScoreCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-2 gap-6">

      {/* Initial Score */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <p className="text-gray-400 text-sm">Initial Predicted Score</p>

        <h1 className="text-5xl font-bold mt-2">65%</h1>

        <p className="text-gray-500 text-xs mt-2">
          Assessed on Oct 01, 2023
        </p>

        <div className="mt-6 h-2 bg-gray-700 rounded-full">
          <div className="bg-gray-400 h-full w-[65%] rounded-full"></div>
        </div>
      </div>

      {/* Current Score */}
      <div className="bg-blue-900/40 border border-blue-500/30 rounded-xl p-6">
        <p className="text-blue-300 text-sm">Current Readiness Score</p>

        <h1 className="text-5xl font-bold mt-2">
          88% <span className="text-green-400 text-lg">+23%</span>
        </h1>

        <p className="text-gray-400 text-xs mt-2">
          Updated moments ago
        </p>

        <div className="mt-6 h-2 bg-blue-950 rounded-full">
          <div className="bg-blue-500 h-full w-[88%] rounded-full"></div>
        </div>
      </div>

    </div>
  );
};

export default ScoreCards;