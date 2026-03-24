"use client";

const HighPerformersCard = ({ data = [] }) => {
  return (
    <div className="bg-[#0f1c2e] rounded-2xl p-6 max-h-[500px] overflow-y-auto">

      <h2 className="text-white text-lg font-semibold mb-4">
        ⭐ High Performers
      </h2>
    <p className="text-xs text-gray-400 mb-6"> IAT-2 | Data Structures | Graph Algorithms </p>
      {!data.length ? (
        <p className="text-gray-400">No data</p>
      ) : (
        <div className="space-y-4">
          {data.map((student, index) => (
            <div key={index} className="flex justify-between border-b pb-3 border-white/5">

              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  {student.name.charAt(0)}
                </div>

                <div>
                  <p className="text-white">{student.name}</p>
                  <p className="text-xs text-gray-400">
                    ID: {student.student_id}
                  </p>
                </div>
              </div>
       <div className="text-right">
              <p className="text-green-400 font-bold">
                {student.percentage}%
              </p>
              <p className="text-xs text-gray-400">PROFICIENCY</p>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HighPerformersCard;