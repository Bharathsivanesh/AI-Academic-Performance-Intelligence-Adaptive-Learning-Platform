import React from "react";
import { Send, Mic, Paperclip } from "lucide-react";

const ChatBubble = ({ message, isUser }) => (
  <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-lg px-4 py-3 rounded-2xl text-sm shadow-md ${
        isUser
          ? "bg-blue-600 text-white rounded-br-none"
          : "bg-slate-800 text-gray-200 rounded-bl-none"
      }`}
    >
      {message}
    </div>
  </div>
);

const ProgressBar = ({ label, value, color }) => (
  <div className="mb-4">
    <div className="flex justify-between text-xs mb-1 text-gray-300">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="w-full bg-slate-700 h-2 rounded-full">
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default function AiDashboard() {
  return (
    <div className=" bg-gradient-to-br from-[#020617] to-[#020617] text-white flex">
      {/* LEFT CHAT SECTION */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <ChatBubble message="Hello Alex! I've finished analyzing your recent Physics mock exam. You're showing great progress in Thermodynamics, but we need to focus on Wave Mechanics." />

          <ChatBubble message='INSIGHT DETECTED: "Your score in Unit 3 is 15% lower than the class average."' />

          <ChatBubble message="Why is my Physics score low? I thought I understood the formulas." isUser />

          <ChatBubble message="It seems you have the formulas memorized, but you're struggling with vector decomposition required to apply them. 60% of your incorrect answers were due to direction calculation errors." />

          <div className="flex gap-3 mt-4">
            <button className="bg-slate-800 px-4 py-2 rounded-xl text-sm hover:bg-slate-700">
              Practice Unit 3 Vectors
            </button>
            <button className="bg-slate-800 px-4 py-2 rounded-xl text-sm hover:bg-slate-700">
              Watch Wave Mechanics Video
            </button>
          </div>
        </div>

        {/* INPUT BOX */}
        <div className="mt-6 flex items-center bg-slate-800 rounded-xl px-3 py-2">
          <Paperclip className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Ask 'Am I ready for the semester exam?'..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-200"
          />
          <Mic className="text-gray-400 w-5 h-5 mx-2" />
          <button className="bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-500">
            Send <Send size={16} />
          </button>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-[320px] bg-[#020617] border-l border-slate-800 p-6 space-y-6">
        {/* Academic Status */}
        <div className="bg-slate-900 p-4 rounded-2xl shadow">
          <h3 className="text-xs text-gray-400 mb-2">ACADEMIC STATUS</h3>
          <div className="bg-orange-500/10 border border-orange-500 p-4 rounded-xl">
            <p className="text-xs text-gray-300">Current Risk Level</p>
            <h2 className="text-xl font-bold text-orange-400">MODERATE</h2>
            <p className="text-xs text-gray-400 mt-1">
              Physics Semester Exam is in 12 days. Current prep level: 64%
            </p>
          </div>
        </div>

        {/* Topic Mastery */}
        <div className="bg-slate-900 p-4 rounded-2xl shadow">
          <h3 className="text-xs text-gray-400 mb-3">TOPIC MASTERY</h3>

          <p className="text-xs text-gray-400 mb-2">Strongest Topics</p>
          <ProgressBar label="Calculus I" value={92} color="bg-blue-500" />
          <ProgressBar label="Thermodynamics" value={88} color="bg-blue-500" />

          <p className="text-xs text-gray-400 mt-4 mb-2">Improvement Areas</p>
          <ProgressBar label="Wave Mechanics" value={45} color="bg-red-500" />
          <ProgressBar label="Electrostatics" value={51} color="bg-red-500" />
        </div>

        {/* Motivation Card */}
        <div className="bg-slate-900 p-4 rounded-2xl text-center text-sm text-gray-300">
          ⭐ You've studied 4 hours more than last week. Keep this momentum!
        </div>
      </div>
    </div>
  );
}
