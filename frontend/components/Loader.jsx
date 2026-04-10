"use client";
import PsychologyIcon from "@mui/icons-material/Psychology";
export default function Loader({ isLoading = false, message = "Loading..." }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0f1e]/90 backdrop-blur-sm">
      {/* Main spinner ring */}
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Static base ring */}
        <div className="absolute w-24 h-24 rounded-full border-4 border-[#1a2040]" />

        {/* Spinning blue ring */}
        <div className="absolute w-24 h-24 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin" />

        {/* Slower counter-spin ring */}
        <div
          className="absolute w-16 h-16 rounded-full border-4 border-transparent border-b-cyan-400 border-l-blue-600"
          style={{ animation: "spin 2s linear infinite reverse" }}
        />

        {/* AI Brain center icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0d1529] border border-blue-500/40 shadow-lg shadow-blue-500/20">
          {/* Animated neural dot grid */}

          {/* MUI AI Icon Center */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0d1529] border border-blue-500/40 shadow-lg shadow-blue-500/20">
            <PsychologyIcon
              style={{
                color: "#60a5fa",
                fontSize: "24px",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Animated bars */}
      <div className="flex items-end gap-1 mt-8">
        {[3, 6, 9, 5, 8, 4, 7, 3, 6].map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full"
            style={{
              height: `${h * 4}px`,
              background: `linear-gradient(to top, #3b82f6, #06b6d4)`,
              animation: `pulse 1s ease-in-out ${i * 0.1}s infinite alternate`,
              opacity: 0.85,
            }}
          />
        ))}
      </div>

      {/* Message */}
      <p className="mt-5 text-blue-400 text-sm font-semibold tracking-widest uppercase animate-pulse">
        {message}
      </p>

      {/* Subtitle */}
    </div>
  );
}

// Mini loader for cards/buttons
export function MiniLoader({ isLoading = false, message = "Processing..." }) {
  if (!isLoading) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
      <span className="text-blue-400 text-xs animate-pulse">{message}</span>
    </div>
  );
}
