"use client";
import { useState, useEffect, useRef } from "react";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
        if(chatRef.current && !chatRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };
    document.addEventListener("mousedown", handler);
    return () => {
        document.removeEventListener("mousedown", handler);
    };
    }, []);

    const sendQuestion = async () => {
        if (!question.trim()) return;
        setIsLoading(true);
        setAnswer("");
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question })
            });
            const data = await res.json();
            setAnswer(data.answer);
        } catch (error) {
            console.error("Error fetching chat response:", error);
            setAnswer("Sorry, I encountered an error while processing your request.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="p-3 rounded-full bg-accent-500 text-white shadow-lg"
      >
        💬
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          ref={chatRef}
          className="mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              Chat
            </h3>
          </div>

          <div className="p-4 h-48 overflow-y-auto">
            {isLoading ? (
              <p className="text-gray-500">Thinking…</p>
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{answer}</p>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendQuestion()}
              placeholder="Ask something…"
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />
            <button
              onClick={sendQuestion}
              disabled={isLoading}
              className="mt-2 w-full bg-accent-400 text-white py-2 rounded disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}