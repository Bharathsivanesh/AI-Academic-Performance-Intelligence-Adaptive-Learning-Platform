import React from 'react'
import PreviousPlans from './components/PreviousPlans'
import ScoreCards from './components/ScoreCards'
import ComparisonChart from './components/ComparisonChart'

const PermTracking = () => {
  return (
    <div className=" bg-[#0B1120]   text-white  space-y-4">

      {/* Previous Plans */}
      <PreviousPlans />

      {/* Score Section */}
      <ScoreCards />

      {/* Chart Section */}
      
          <ComparisonChart />
   

    </div>
  );
};

export default PermTracking