import BarChartIcon from "@mui/icons-material/BarChart";
import FilterListIcon from "@mui/icons-material/FilterList";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const EmptyState = ({ batch, subject }) => {
  const steps = [
    {
      icon: <GroupsIcon sx={{ fontSize: 20 }} />,
      label: "Select a batch",
      done: !!batch,
    },
    {
      icon: <MenuBookIcon sx={{ fontSize: 20 }} />,
      label: "Select a subject",
      done: !!subject,
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 20 }} />,
      label: "Analytics will load",
      done: false,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[340px] gap-8 px-6 py-10">
      {/* Icon */}
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-blue-500/15 flex items-center justify-center">
            <FilterListIcon sx={{ fontSize: 28, color: "#3b82f6" }} />
          </div>
        </div>
        {/* Pulse ring */}
        <span className="absolute w-20 h-20 rounded-full border border-blue-500/20 animate-ping" />
      </div>

      {/* Text */}
      <div className="text-center">
        <h3 className="text-white font-semibold text-base mb-1">
          No data to display
        </h3>
        <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
          Use the filters above to load performance analytics for your class
        </p>
      </div>

      {/* Step tracker */}
      <div className="flex items-center gap-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all duration-300 ${
                step.done
                  ? "bg-blue-500/15 border-blue-500/30 text-blue-400"
                  : "bg-white/5 border-white/10 text-gray-500"
              }`}
            >
              <span
                className={`transition-colors duration-300 ${
                  step.done ? "text-blue-400" : "text-gray-600"
                }`}
              >
                {step.icon}
              </span>
              <span>{step.label}</span>
              {step.done && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" fill="#3b82f6" opacity="0.2" />
                  <path
                    d="M4.5 7l2 2 3-3"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-6 h-px transition-colors duration-500 ${
                  step.done ? "bg-blue-500/40" : "bg-white/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
