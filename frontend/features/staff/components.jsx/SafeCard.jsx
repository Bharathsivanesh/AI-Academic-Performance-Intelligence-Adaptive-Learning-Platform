export const SafeCard = ({ student }) => {
  const initials = student.student_name
    ? student.student_name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

  return (
    <div
      className="bg-[#090f0a] border-l-[3px] border-green-500 rounded-r-xl rounded-l-none p-3 flex items-center justify-between gap-3"
      style={{ animation: "fadeUp .4s ease both" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
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
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-green-400">Safe</span>
        </div>
        <div className="w-16 h-1.5 bg-[#1e293b] rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-700 to-green-400 rounded-full"
            style={{ width: "90%" }}
          />
        </div>
        <span className="text-[10px] mt-1 inline-block px-1.5 py-0.5 rounded bg-green-500/10 text-green-400">
          On Track
        </span>
      </div>
    </div>
  );
};
