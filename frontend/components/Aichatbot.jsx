"use client";

import { useState, useEffect, useRef } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello! I'm your AI assistant. Ask me anything 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  const student_id = 2; // 👉 dynamic later if needed

  // ✅ REAL API CALL
  const getAIResponse = async (userMessage) => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://127.0.0.1:8000/ask?question=${encodeURIComponent(
          userMessage
        )}&student_id=${student_id}`
      );

      const data = await res.json();

      return data.answer || "No response from AI";
    } catch (err) {
      console.error(err);
      return "⚠️ Error connecting to AI server";
    } finally {
      setLoading(false);
    }
  };

  // Typing animation
  useEffect(() => {
    if (typingIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setTypingIndex((prev) => prev + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, currentText]);

  // Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const question = input;
    setInput("");

    // Add empty AI message
    setMessages((prev) => [...prev, { role: "ai", text: "" }]);

    const aiText = await getAIResponse(question);

    setCurrentText(aiText);
    setTypingIndex(0);
  };

  // Update AI typing
  useEffect(() => {
    if (typingIndex > 0) {
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;

        if (updated[lastIndex].role === "ai") {
          updated[lastIndex].text = currentText.slice(0, typingIndex);
        }

        return updated;
      });
    }
  }, [typingIndex]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingIndex]);

  return (
    <div className="flex flex-col h-full bg-[#0B1120] text-white">

      {/* Header */}
      <div className="p-4 border-b border-gray-700 shrink-0 flex justify-between">
        <h1 className="font-semibold">AI Assistant</h1>
        <span className="text-green-400 text-sm">● Online</span>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 scrollbar-hide">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md px-4 py-2 rounded-2xl ${
                msg.role === "user"
                  ? "bg-blue-600"
                  : "bg-gray-800"
              }`}
            >
              {msg.text}

              {/* typing cursor */}
              {i === messages.length - 1 &&
                msg.role === "ai" &&
                typingIndex < currentText.length && (
                  <span className="animate-pulse">|</span>
                )}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="text-gray-400 text-sm">AI is thinking...</div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex gap-2 shrink-0 bg-[#0B1120]">
        <input
          className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 outline-none"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}