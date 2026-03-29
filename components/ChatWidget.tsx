"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 🔥 controls visibility

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Request failed");

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: data.message,
          cta: data.cta,
        },
      ]);
    } catch (err: any) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "⚠️ Error: " + err.message,
        },
      ]);
    }

    setLoading(false);
  };

  const handleDemo = () => {
    window.dispatchEvent(new CustomEvent("open-contact-form"));
  };

  const handleContact = () => {
    window.dispatchEvent(
      new CustomEvent("open-contact-form", {
        detail: { source: "chat", type: "contact" },
      })
    );
  };

  return (
    <>
      {/* 🔥 OPEN BUTTON (when minimized) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 z-50 flex items-center gap-2"
        >
          
          <MessageCircle size={18} />Chat
        </button>
      )}

      {/* 🔥 CHAT WIDGET */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-[420px] z-50 bg-white text-black border border-gray-300 shadow-2xl rounded-2xl flex flex-col">

          {/* Header with close button */}
          <div className="p-3 border-b font-semibold bg-gray-100 rounded-t-2xl flex justify-between items-center">
            <span>JM Tekhub Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-black"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className="flex flex-col">
                <div
                  className={`p-3 rounded-2xl text-sm max-w-[80%] shadow-sm whitespace-pre-wrap ${m.role === "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-white text-black border"
                    }`}
                >
                  {m.content}
                </div>

                {m.role === "assistant" && m.cta && (
                  <div className="flex gap-2 mt-2 ml-1">
                    {m.cta.demo && (
                      <button
                        onClick={handleDemo}
                        className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-700"
                      >
                        Request Demo
                      </button>
                    )}

                    {m.cta.contact && (
                      <button
                        onClick={handleContact}
                        className="bg-orange-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-orange-600"
                      >
                        Contact Us
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="text-gray-500 text-sm">Thinking...</div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t flex gap-2 bg-white rounded-b-2xl">
            <input
              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my projects..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            {/* 🔥 Send button with icon */}
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}