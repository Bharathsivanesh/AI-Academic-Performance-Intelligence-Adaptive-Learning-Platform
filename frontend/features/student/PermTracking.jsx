import React from 'react'
import PreviousPlans from './components/PreviousPlans'
import ScoreCards from './components/ScoreCards'
import ComparisonChart from './components/ComparisonChart'

const PermTracking = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white px-8 space-y-4">

      {/* Previous Plans */}
      <PreviousPlans />

      {/* Score Section */}
      <ScoreCards />

      {/* Chart Section */}
      <div className="w-full flex justify-center">
        <div className="w-full  ">
          <ComparisonChart />
        </div>
      </div>

    </div>
  );
};

export default PermTracking