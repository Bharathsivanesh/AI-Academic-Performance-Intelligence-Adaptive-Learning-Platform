import React from "react";

const StudyPlanCard = ({ subject, title, progress, status, daysLeft }) => {
  const isCompleted = progress === 100;
  const isPending = status === "pending";

  const scheme = isCompleted
    ? {
        accent: "from-green-600 to-green-400",
        bar: "from-green-600 to-green-400",
        text: "text-green-400",
        dot: "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.55)]",
        iconBg: "bg-green-600/20",
        badge: "bg-green-600/20 text-green-400 border border-green-400/30",
        label: "Completed",
        meta: "All done!",
        icon: "📗",
      }
    : isPending
      ? {
          accent: "from-amber-600 to-yellow-400",
          bar: "from-amber-600 to-yellow-400",
          text: "text-yellow-400",
          dot: "bg-yellow-400 shadow-[0_0_6px_rgba(251,191,36,0.55)]",
          iconBg: "bg-amber-600/20",
          badge: "bg-amber-600/20 text-yellow-400 border border-yellow-400/30",
          label: "Pending",
          meta: "Not started",
          icon: "📙",
        }
      : {
          accent: "from-blue-600 to-blue-400",
          bar: "from-blue-600 to-blue-400",
          text: "text-blue-400",
          dot: "bg-blue-400 shadow-[0_0_6px_rgba(91,156,246,0.55)]",
          iconBg: "bg-blue-600/20",
          badge: "bg-blue-600/20 text-blue-400 border border-blue-400/30",
          label: "Active",
          meta: "In progress",
          icon: "📘",
        };

  return (
    <div
      className={`relative w-full bg-[#0b1929] border rounded-2xl p-5 cursor-pointer transition-all duration-300
  ${
    !isCompleted && !isPending
      ? "border-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:shadow-[0_0_45px_rgba(59,130,246,0.5)] hover:-translate-y-1 hover:scale-[1.02]"
      : "border-[#1a2e4a] hover:border-[#2a4a7a] hover:-translate-y-1"
  }`}
    >
      {/* Accent Bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r ${scheme.accent}`}
      />

      {/* Top */}
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${scheme.iconBg}`}
        >
          <span className="text-lg">{scheme.icon}</span>
        </div>

        <span
          className={`text-[10px] font-semibold tracking-wider px-3 py-[3px] rounded-full ${scheme.badge}`}
        >
          {scheme.label}
        </span>
      </div>

      {/* Subject + Title */}
      <p className="text-[10px] tracking-widest uppercase text-[#4a6a9a] mb-1">
        {subject}
      </p>

      <h3 className="text-sm font-semibold text-blue-100 leading-relaxed mb-4 min-h-[40px]">
        {title}
      </h3>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-[#1e3050] to-transparent mb-4" />

      {/* Progress */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[11px] text-[#4a6a9a]">
          {isCompleted ? "Completed" : "Progress"}
        </span>
        <span className={`text-[13px] font-bold ${scheme.text}`}>
          {progress}%
        </span>
      </div>

      <div className="h-[6px] bg-[#112038] rounded-full overflow-hidden mb-4">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${scheme.bar} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${scheme.dot}`} />
        <span className="text-[11px] text-[#4a6a9a]">{scheme.meta}</span>

        {daysLeft != null && (
          <span className="ml-auto text-[11px] text-[#3a5a7a] bg-[#0d1e35] px-2 py-[2px] rounded-md">
            {daysLeft} days
          </span>
        )}
      </div>
    </div>
  );
};

export default StudyPlanCard;
