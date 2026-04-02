export const StudentCard = ({ student }) => {
  return (
    <div className="bg-[#111827]  border-t border-red-500 rounded-xl p-4 mb-4 flex justify-between items-center">

      <div>
        <h3 className="font-semibold">{student.student_name}</h3>
        <p className="text-sm text-gray-400">
          ID: {student.student_id}
        </p>

        <div className="mt-2">
          <p className="text-xs text-red-400">
            Risk Probability {(student.risk_probability * 100).toFixed(0)}%
          </p>

          <div className="w-40 h-2 bg-gray-700 rounded mt-1">
            <div
              className="h-2 bg-red-500 rounded"
              style={{ width: `${student.risk_probability * 100}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  );
};