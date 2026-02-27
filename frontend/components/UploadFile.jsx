"use client";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function UploadCard({
  title = "Bulk Upload",
  description = "Drop your file here",
  buttonText = "Browse Files",
  onFileSelect,
}) {
  return (
    <div className="bg-gradient-to-br from-[#111827] to-[#0f172a] 
                    p-6 rounded-2xl border border-white/5 w-full">

      <div className="flex items-center gap-2 mb-6 text-white font-medium">
        <CloudUploadIcon className="text-blue-500" />
        {title}
      </div>

      <div className="border-2 border-dashed border-blue-500/30 
                      rounded-xl p-8 text-center">

        <div className="flex justify-center mb-4">
          <div className="bg-blue-600/20 p-4 rounded-full">
            <CloudUploadIcon className="text-blue-500" />
          </div>
        </div>

        <p className="text-white mb-1">{description}</p>
        <p className="text-gray-400 text-sm mb-6">
          Supported formats: CSV, XLSX (Max 10MB)
        </p>

        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 
                          px-6 py-2 rounded-lg text-white text-sm transition">
          {buttonText}
          <input
            type="file"
            hidden
            onChange={(e) => onFileSelect?.(e.target.files[0])}
          />
        </label>
      </div>
    </div>
  );
}