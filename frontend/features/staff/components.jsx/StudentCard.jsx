export const StudentCard = ({ student }) => {
  const pct = Math.round(student.risk_probability * 100);
  const initials = student.student_name
    ? student.student_name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

  const severity =
    pct >= 80
      ? "text-red-400 bg-red-500/10"
      : "text-orange-400 bg-orange-500/10";

  return (
    <div
      className="bg-[#0f0a0a] border-l-[3px] border-red-500 rounded-r-xl rounded-l-none p-3 flex items-center justify-between gap-3"
      style={{ animation: "fadeUp .4s ease both" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">
            {student.student_name}
          </p>
          <p className="text-[10px] text-slate-500">ID: {student.student_id}</p>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <div className="flex items-center gap-1.5 justify-end">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-bold text-red-400">{pct}%</span>
        </div>
        <div className="w-16 h-1.5 bg-[#1e293b] rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
            style={{ width: `${pct}%`, transition: "width 1s ease" }}
          />
        </div>
        <span
          className={`text-[10px] mt-1 inline-block px-1.5 py-0.5 rounded ${severity}`}
        >
          {pct >= 80 ? "Critical" : "High"}
        </span>
      </div>
    </div>
  );
};
