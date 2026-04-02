export const SafeCard = ({ student }) => {
  return (
    <div className="bg-[#111827] border-t-2 border-green-500 rounded-xl p-4 mb-4 flex justify-between items-center">

      <div>
        <h3 className="font-semibold">{student.student_name}</h3>
        <p className="text-sm text-gray-400">
          ID: {student.student_id}
        </p>

        <span className="text-green-400 text-xs mt-2 inline-block">
          ● SAFE STATUS
        </span>
      </div>

      <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">
        View Profile
      </button>

    </div>
  );
};