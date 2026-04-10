"use client";

import { useState, useEffect, useRef } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm your AI assistant. Ask me anything 👋" },
  ]);
  const [input, setInput] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const student_id = 2;

  /* ── real API call (unchanged) ── */
  const getAIResponse = async (userMessage) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://127.0.0.1:8000/ask?question=${encodeURIComponent(userMessage)}&student_id=${student_id}`,
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

  /* ── typing animation (unchanged) ── */
  useEffect(() => {
    if (typingIndex < currentText.length) {
      const timeout = setTimeout(() => setTypingIndex((p) => p + 1), 14);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, currentText]);

  /* ── send message (unchanged) ── */
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const question = input;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setMessages((prev) => [...prev, { role: "ai", text: "" }]);
    const aiText = await getAIResponse(question);
    setCurrentText(aiText);
    setTypingIndex(0);
  };

  /* ── update AI typing bubble (unchanged) ── */
  useEffect(() => {
    if (typingIndex > 0) {
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (updated[lastIndex].role === "ai")
          updated[lastIndex].text = currentText.slice(0, typingIndex);
        return updated;
      });
    }
  }, [typingIndex]);

  /* ── auto scroll (unchanged) ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingIndex]);

  /* ── auto-grow textarea ── */
  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 110) + "px";
  };

  const time = () => {
    const n = new Date();
    return `${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <>
      {/* ── global styles injected once ── */}
      <style>{`
        @keyframes floatDot {
          0%,100% { transform: translateY(0) scale(1); opacity: .35; }
          50%      { transform: translateY(-16px) scale(1.15); opacity: .75; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: .7; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes breatheGlow {
          0%,100% { box-shadow: 0 0 16px #6366f144, 0 0 36px #6366f118; }
          50%      { box-shadow: 0 0 28px #6366f177, 0 0 52px #6366f130; }
        }
        @keyframes typingBounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }

        .chatbot-scroll::-webkit-scrollbar        { width: 4px; }
        .chatbot-scroll::-webkit-scrollbar-track  { background: transparent; }
        .chatbot-scroll::-webkit-scrollbar-thumb  { background: #1e2d50; border-radius: 4px; }

        .chatbot-input::placeholder { color: #334155; }
        .chatbot-input:focus {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 3px rgba(79,70,229,.22);
        }

        .chatbot-send:hover  { transform: scale(1.06); box-shadow: 0 0 18px rgba(99,102,241,.55); }
        .chatbot-send:active { transform: scale(.94); }

        .bubble-ai-glow  { animation: slideInLeft .25s ease, breatheGlow 3s ease-in-out infinite; }
        .bubble-user-in  { animation: slideInRight .25s ease; }
        .bubble-ai-in    { animation: slideInLeft .25s ease; }

        .shimmer-line {
          height: 11px;
          border-radius: 6px;
          background: linear-gradient(90deg,#1e2d50 25%,#2a3d6a 50%,#1e2d50 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          margin: 4px 0;
        }

        .float-dot { position: absolute; border-radius: 50%; animation: floatDot ease-in-out infinite; }
      `}</style>

      {/* ── outer shell ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: "#080c18",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* floating particles */}
        <Particles />

        {/* ── HEADER ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "12px 18px",
            background: "linear-gradient(135deg,#0d1226 0%,#111830 100%)",
            borderBottom: "1px solid #1e2a45",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* avatar with pulse ring */}
            <div
              style={{
                position: "relative",
                width: 38,
                height: 38,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#fff",
                }}
              >
                AI
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: -3,
                  borderRadius: "50%",
                  border: "1.5px solid #6366f1",
                  animation: "pulseRing 2s ease-out infinite",
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>
                AI Assistant
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 6px #22c55e",
                    display: "inline-block",
                  }}
                />
                Online
              </div>
            </div>
          </div>
         
        </div>

        {/* ── MESSAGES ── */}
        <div
          className="chatbot-scroll"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            padding: "16px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            position: "relative",
            zIndex: 2,
          }}
        >
          {messages.map((msg, i) => {
            const isLast = i === messages.length - 1;
            const isTyping =
              isLast && msg.role === "ai" && typingIndex < currentText.length;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  animation: "fadeUp .3s ease",
                }}
              >
                {msg.role === "ai" && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff",
                      marginRight: 8,
                      marginTop: 2,
                    }}
                  >
                    AI
                  </div>
                )}

                <div
                  style={{
                    maxWidth: "68%",
                    padding: "10px 14px",
                    borderRadius: 18,
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    ...(msg.role === "user"
                      ? {
                          background: "linear-gradient(135deg,#4f46e5,#6366f1)",
                          color: "#fff",
                          borderBottomRightRadius: 5,
                        }
                      : {
                          background: "#0e1a30",
                          border: "1px solid #1e2d50",
                          color: "#cbd5e1",
                          borderBottomLeftRadius: 5,
                        }),
                    ...(msg.role === "ai" && isLast
                      ? {
                          animation:
                            "slideInLeft .25s ease, breatheGlow 3s ease-in-out infinite",
                        }
                      : msg.role === "user"
                        ? { animation: "slideInRight .25s ease" }
                        : { animation: "slideInLeft .25s ease" }),
                  }}
                >
                  {loading && isLast && msg.role === "ai" && msg.text === "" ? (
                    <ShimmerLoader />
                  ) : (
                    <>
                      {msg.text}
                      {isTyping && (
                        <span
                          style={{
                            display: "inline-block",
                            width: 2,
                            height: 14,
                            background: "#818cf8",
                            marginLeft: 2,
                            verticalAlign: "middle",
                            animation: "blink .7s infinite",
                          }}
                        />
                      )}
                    </>
                  )}

                  {/* timestamp */}
                  {!loading && msg.text !== "" && (
                    <div
                      style={{
                        fontSize: 10,
                        color: "#475569",
                        marginTop: 4,
                        textAlign: "right",
                      }}
                    >
                      {time()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* typing indicator shown separately when waiting */}
          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                paddingLeft: 36,
              }}
            >
              {[0, 1, 2].map((n) => (
                <span
                  key={n}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#6366f1",
                    display: "inline-block",
                    animation: `typingBounce 1.1s ${n * 0.18}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── INPUT ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "10px 14px",
            background: "#080c18",
            borderTop: "1px solid #1a2340",
            display: "flex",
            gap: 8,
            alignItems: "flex-end",
            flexShrink: 0,
          }}
        >
          <textarea
            ref={textareaRef}
            className="chatbot-input"
            rows={1}
            placeholder="Ask anything…"
            value={input}
            onChange={handleInput}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.shiftKey &&
              (e.preventDefault(), handleSend())
            }
            style={{
              flex: 1,
              background: "#0e1528",
              border: "1px solid #1e2d50",
              borderRadius: 14,
              padding: "10px 14px",
              fontSize: 13.5,
              color: "#e2e8f0",
              outline: "none",
              resize: "none",
              fontFamily: "inherit",
              lineHeight: 1.5,
              minHeight: 42,
              maxHeight: 110,
              transition: "border-color .2s, box-shadow .2s",
            }}
          />
          <button
            className="chatbot-send"
            onClick={handleSend}
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              flexShrink: 0,
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform .15s, box-shadow .2s",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

/* ── tiny sub-components ── */

function Particles() {
  const colors = ["#6366f1", "#8b5cf6", "#3b82f6", "#06b6d4", "#a78bfa"];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {Array.from({ length: 20 }).map((_, i) => {
        const sz = Math.random() * 5 + 2;
        return (
          <span
            key={i}
            className="float-dot"
            style={{
              width: sz,
              height: sz,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: colors[Math.floor(Math.random() * colors.length)],
              opacity: Math.random() * 0.45 + 0.15,
              animationDuration: `${Math.random() * 4 + 3}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function ShimmerLoader() {
  return (
    <div style={{ minWidth: 160 }}>
      <div className="shimmer-line" style={{ width: "78%" }} />
      <div className="shimmer-line" style={{ width: "52%" }} />
    </div>
  );
}
