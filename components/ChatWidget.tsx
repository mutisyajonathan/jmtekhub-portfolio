"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageCircle,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";

type Msg = {
  role: "user" | "assistant";
  content: string;
  cta?: {
    demo?: boolean;
    contact?: boolean;
  };
};

export default function ChatWidget() {
  // ---------------- CHAT STATE ----------------
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi 👋 I'm JM Tekhub Assistant. Ask me about POS systems, websites, chatbots, pricing or custom software.",
    },
  ]);

  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // ---------------- LEAD STATE ----------------
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadType, setLeadType] = useState<"demo" | "contact">("demo");
  const [sendingLead, setSendingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const [leadData, setLeadData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ---------------- SEND CHAT ----------------
  const sendMessage = async () => {
    if (!chatInput.trim() || loading) return;

    const newMessages = [
      ...messages,
      { role: "user", content: chatInput } as Msg,
    ];

    setMessages(newMessages);
    setChatInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: data.message,
          cta: data.cta,
        },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "⚠️ Sorry, something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  // ---------------- LEAD MODAL ----------------
  const openLeadForm = (type: "demo" | "contact") => {
    setLeadType(type);
    setLeadSuccess(false);
    setShowLeadForm(true);
  };

  const submitLead = async () => {
    if (
      !leadData.name.trim() ||
      !leadData.phone.trim() ||
      !leadData.email.trim()
    )
      return;

    setSendingLead(true);

    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: leadData.name,
          secondName: "",
          email: leadData.email,
          phone: leadData.phone,
          service:
            leadType === "demo"
              ? "Chatbot Demo Request"
              : "General Contact Request",
          comments: messages
            .map((m) => `${m.role}: ${m.content}`)
            .join("\n"),
        }),
      });

      setLeadSuccess(true);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "✅ Thank you. Your request has been received. We'll contact you shortly.",
        },
      ]);

      setTimeout(() => {
        setShowLeadForm(false);
        setLeadData({ name: "", phone: "", email: "" });
      }, 1500);
    } catch {
      alert("Failed to submit request.");
    }

    setSendingLead(false);
  };

  // ---------------- UI ----------------
  return (
    <>
      {/* OPEN BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl flex items-center gap-2"
        >
          <MessageCircle size={18} />
          Chat
        </button>
      )}

      {/* WIDGET */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[350px] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">

          {/* HEADER */}
          <div className="px-4 py-3 bg-gray-50 border-b flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-sm text-black">
                JM Tekhub Assistant
              </h3>
              <p className="text-xs text-green-600">Online now</p>
            </div>

            <button onClick={() => setIsOpen(false)}>
              <X size={18} className="text-gray-500 hover:text-black" />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-3">
            {messages.map((m, i) => (
              <div key={i}>
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "ml-auto bg-blue-600 text-white"
                      : "bg-white text-black border"
                  }`}
                >
                  {m.content}
                </div>

                {/* CTA */}
                {m.role === "assistant" && m.cta && (
                  <div className="flex gap-2 mt-2">
                    {m.cta.demo && (
                      <button
                        onClick={() => openLeadForm("demo")}
                        className="text-xs px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                      >
                        Request Demo
                      </button>
                    )}

                    {m.cta.contact && (
                      <button
                        onClick={() => openLeadForm("contact")}
                        className="text-xs px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Contact Us
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                Thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT (ONLY ONE — FIXED) */}
          <div className="p-3 border-t bg-white flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about my services..."
              className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm text-black bg-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>

          {/* LEAD MODAL */}
          {showLeadForm && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl">

                {!leadSuccess ? (
                  <>
                    <h3 className="font-bold text-lg text-black">
                      {leadType === "demo"
                        ? "Request Demo"
                        : "Contact Request"}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 mb-4">
                      Leave your details and we’ll reach out shortly.
                    </p>

                    <div className="space-y-3">
                      <input
                        placeholder="Full Name"
                        value={leadData.name}
                        onChange={(e) =>
                          setLeadData({
                            ...leadData,
                            name: e.target.value,
                          })
                        }
                        className="w-full border rounded-xl px-3 py-2 text-sm text-black"
                      />

                      <input
                        placeholder="Phone Number"
                        value={leadData.phone}
                        onChange={(e) =>
                          setLeadData({
                            ...leadData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full border rounded-xl px-3 py-2 text-sm text-black"
                      />

                      <input
                        placeholder="Email Address"
                        value={leadData.email}
                        onChange={(e) =>
                          setLeadData({
                            ...leadData,
                            email: e.target.value,
                          })
                        }
                        className="w-full border rounded-xl px-3 py-2 text-sm text-black"
                      />
                    </div>

                    <p className="text-xs text-gray-500 mt-3">
                      Your information will only be used to contact you regarding your request.
                    </p>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => setShowLeadForm(false)}
                        className="flex-1 border rounded-xl py-2 text-sm"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={submitLead}
                        disabled={sendingLead}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 text-sm"
                      >
                        {sendingLead ? "Sending..." : "Submit"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <CheckCircle2 className="mx-auto text-green-600" size={42} />
                    <h3 className="font-semibold mt-3">Request Sent</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      We'll contact you shortly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}