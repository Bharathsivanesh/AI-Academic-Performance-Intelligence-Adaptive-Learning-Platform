"use client";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";

export default function UploadCard({
  title = "Bulk Upload",
  description = "Drop your file here",
  buttonText = "Browse Files",
  onFileSelect,
  sampleFile = "/sample-staff.csv", // 👈 default sample file
}) {
  const handleDownloadSample = () => {
    const link = document.createElement("a");
    link.href = sampleFile;
    link.download = sampleFile.split("/").pop();
    link.click();
  };

  return (
    <div
      className="bg-gradient-to-br from-[#111827] to-[#0f172a] 
                 p-2 rounded-2xl border border-white/5 w-full"
    >
      {/* Header */}
      <div className="flex gap- items-center justify-between mb-6">
        <div className="flex whitespace-nowrap items-center gap-2 text-white font-medium">
          <CloudUploadIcon className="text-blue-500" />
          {title}
        </div>

        <button
          onClick={handleDownloadSample}
          className="flex cursor-pointer  items-center whitespace-nowrap gap-2 text-sm 
                     bg-blue-600 hover:bg-blue-600/80 
                     text-white px-3 py-1.5 
                     rounded-lg transition"
        >
          <DownloadIcon fontSize="small"/>
          Download Sample CSV
        </button>
      </div>

      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-blue-500/30 
                   rounded-xl p-8 text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600/20 p-4 rounded-full">
            <CloudUploadIcon className="text-blue-500" />
          </div>
        </div>

        <p className="text-white mb-1">{description}</p>
        <p className="text-gray-400 text-sm mb-6">
          Supported formats: CSV, XLSX (Max 10MB)
        </p>

        <label
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 
                     px-6 py-2 rounded-lg text-white text-sm transition"
        >
          {buttonText}
          <input
            type="file"
            accept=".csv,.xlsx"
            hidden
            onChange={(e) => onFileSelect?.(e.target.files[0])}
          />
        </label>
      </div>
    </div>
  );
}