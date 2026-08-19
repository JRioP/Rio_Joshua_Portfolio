"use client";
import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTED = [
  "What is RoadRescue?",
  "What stack do you know?",
  "Tell me about MaYo Holdings.",
  "Are you open to work?",
];

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (toggleRef.current?.contains(e.target as Node)) return;
    if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const sendQuestion = async (text?: string) => {
    const q = (text ?? question).trim();
    if (!q || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setQuestion("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer ?? "No answer returned." },
      ]);
    } catch (err) {
      console.error("[Chat error]", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-3 md:bottom-20 md:right-20">
      {/* Chat panel */}
      {isOpen && (
        <div
          ref={chatRef}
          className="w-80 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ height: "420px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-950">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-neutral-300 uppercase tracking-widest">
                Ask Josh's AI
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-600 hover:text-neutral-300 transition-colors font-mono text-xs cursor-pointer"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {/* Welcome message */}
            {messages.length === 0 && !isLoading && (
              <div className="flex flex-col gap-3">
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Hi! I'm Josh's AI assistant. Ask me anything about his projects, skills, or experience.
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendQuestion(s)}
                      className="text-left font-mono text-xs px-3 py-2 rounded-lg border border-neutral-700 text-neutral-400 hover:border-accent-500 hover:text-accent-500 transition-colors cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message bubbles */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-accent-500 text-black font-medium"
                      : "bg-neutral-800 text-neutral-200 border border-neutral-700"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-xl flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-neutral-800 bg-neutral-950 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendQuestion()}
              placeholder="Ask something…"
              disabled={isLoading}
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-accent-500 transition-colors disabled:opacity-50"
            />
            <button
              onClick={() => sendQuestion()}
              disabled={isLoading || !question.trim()}
              className="px-3 py-2 bg-accent-500 text-black rounded-lg text-xs font-bold hover:bg-accent-400 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        ref={toggleRef}
        onClick={() => setIsOpen((o) => !o)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer ${
          isOpen
            ? "bg-neutral-700 text-neutral-300"
            : "bg-accent-500 text-black hover:bg-accent-400"
        }`}
        aria-label={isOpen ? "Close chat" : "Open AI chat"}
      >
        {isOpen ? (
          <span className="text-sm">✕</span>
        ) : (
          <span className="text-lg">💬</span>
        )}
      </button>
    </div>
  );
}