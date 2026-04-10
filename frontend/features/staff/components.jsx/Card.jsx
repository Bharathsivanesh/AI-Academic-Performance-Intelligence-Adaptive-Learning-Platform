import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

export const Card = ({ type, count, label }) => {
  const config = {
    high: {
      title: "HIGH RISK",
      bg: "bg-[#130c0c]",
      border: "border-red-500/30",
      badge: "bg-red-500/10 text-red-400",
      text: "text-red-400",
      bar: "bg-gradient-to-r from-red-600 to-red-400",
      icon: <AlertCircle size={14} />,
      scanColor: "rgba(239,68,68,.12)",
      pulse: "bg-red-500",
    },
    medium: {
      title: "MEDIUM RISK",
      bg: "bg-[#13100a]",
      border: "border-yellow-500/25",
      badge: "bg-yellow-500/10 text-yellow-400",
      text: "text-yellow-400",
      bar: "bg-gradient-to-r from-yellow-600 to-yellow-400",
      icon: <AlertTriangle size={14} />,
      scanColor: "rgba(234,179,8,.1)",
      pulse: "bg-yellow-400",
    },
    safe: {
      title: "SAFE",
      bg: "bg-[#0a130c]",
      border: "border-green-500/25",
      badge: "bg-green-500/10 text-green-400",
      text: "text-green-400",
      bar: "bg-gradient-to-r from-green-700 to-green-400",
      icon: <CheckCircle size={14} />,
      scanColor: "rgba(34,197,94,.1)",
      pulse: "bg-green-400",
    },
  };

  const c = config[type];
  const pct = Math.min(count * 2.5, 100);

  return (
    <div
      className={`relative rounded-2xl p-5 border ${c.bg} ${c.border} overflow-hidden`}
      style={{ animation: "fadeUp .5s ease both" }}
    >
      {/* scan line */}
      <div
        className="absolute left-0 right-0 h-px opacity-60 pointer-events-none"
        style={{
          background: `linear-gradient(90deg,transparent,${c.scanColor.replace(".12", ".6").replace(".25", ".6").replace(".1", ".6")},transparent)`,
          animation: "scanLine 3s linear infinite",
          top: 0,
        }}
      />

      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide ${c.badge}`}
        >
          {c.title}
        </span>
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center ${c.badge}`}
        >
          <span className={c.text}>{c.icon}</span>
        </div>
      </div>

      <div
        className={`text-5xl font-extrabold leading-none mb-1 ${c.text}`}
        style={{ animation: "countUp .6s ease both" }}
      >
        {count}
      </div>
      <p className="text-xs text-slate-500 mt-1">{label}</p>

      <div className="w-full h-1 bg-[#1e293b] rounded-full mt-5 overflow-hidden">
        <div
          className={`h-full rounded-full ${c.bar}`}
          style={{ width: `${pct}%`, transition: "width 1s ease" }}
        />
      </div>

      <div className="flex items-center gap-1.5 mt-3">
        <span className={`w-1.5 h-1.5 rounded-full ${c.pulse} animate-pulse`} />
        <span className="text-xs text-slate-500">
          Model confidence: {Math.round(85 + Math.random() * 10)}%
        </span>
      </div>
    </div>
  );
};
