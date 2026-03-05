import React from "react";

const plans = [
  {
    title: "Data Structures",
    status: "ACTIVE",
    growth: "+23%",
    date: "Nov 2023",
  },
  {
    title: "Computer Networks",
    status: "COMPLETED",
    growth: "+18%",
    date: "Aug 2023",
  },
  {
    title: "Database Systems",
    status: "COMPLETED",
    growth: "+31%",
    date: "Jun 2023",
  },
  {
    title: "Operating Systems",
    status: "COMPLETED",
    growth: "+12%",
    date: "Apr 2023",
  },
  {
    title: "Web Development",
    status: "COMPLETED",
    growth: "+42%",
    date: "Feb 2023",
  },
];

const PreviousPlans = () => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Previous Plans History</h2>
        <button className="text-xs bg-white/10 px-3 py-1 rounded-md">
          SELECT TO COMPARE
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="min-w-[220px] bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <span className="text-xs text-blue-400">{plan.status}</span>

            <h3 className="mt-2 font-semibold">{plan.title}</h3>

            <p className="text-gray-400 text-sm">{plan.date}</p>

            <p className="text-green-400 mt-2 text-sm">
              Growth Score {plan.growth}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousPlans;