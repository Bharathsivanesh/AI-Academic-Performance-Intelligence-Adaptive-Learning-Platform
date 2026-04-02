import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

export const Card = ({ type, count, label }) => {
  const config = {
    high: {
      title: "HIGH RISK",
      color: "red",
      icon: <AlertCircle size={22} />,
      glow: "shadow-red-500/20",
      border: "border-red-500/40",
      progress: "bg-red-500",
      text: "text-red-400",
    },
    medium: {
      title: "MEDIUM RISK",
      color: "yellow",
      icon: <AlertTriangle size={22} />,
      glow: "shadow-yellow-500/20",
      border: "border-yellow-500/40",
      progress: "bg-yellow-400",
      text: "text-yellow-400",
    },
    safe: {
      title: "SAFE",
      color: "green",
      icon: <CheckCircle size={22} />,
      glow: "shadow-green-500/20",
      border: "border-green-500/40",
      progress: "bg-green-500",
      text: "text-green-400",
    },
  };

  const item = config[type];

  return (
    <div
      className={`
        relative rounded-2xl p-[1px]
        bg-gradient-to-b from-white/10 to-transparent
      `}
    >
      <div
        className={`
          bg-[#0f172a] rounded-2xl p-6
          border ${item.border}
          ${item.glow} shadow-xl
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className={`${item.text}`}>{item.icon}</div>

          <span
            className={`
              text-xs px-3 py-1 rounded-full
              bg-${item.color}-500/10 ${item.text}
            `}
          >
            {item.title}
          </span>
        </div>

        {/* Number */}
        <h1 className="text-4xl font-bold mb-1">{count}</h1>

        {/* Label */}
        <p className={`text-sm ${item.text}`}>{label}</p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#1e293b] rounded-full mt-4 overflow-hidden">
          <div
            className={`h-full ${item.progress} rounded-full`}
            style={{ width: `${Math.min(count, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};