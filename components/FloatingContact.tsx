"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white shadow-xl transition hover:scale-105"
        style={{
          background: "var(--primary-color)",
          boxShadow: "0 10px 30px rgba(1, 0, 102, 0.5)",
        }}
      >
        <MessageCircle size={20} />
        Talk to Us
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm">
          
          <div className="w-full md:w-[420px] bg-white rounded-t-2xl md:rounded-2xl p-6 animate-slideUp">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <MessageCircle style={{ color: "var(--primary-color)" }} />
                <h2 className="text-lg font-semibold text-gray-800">
                  Talk to us
                </h2>
              </div>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4">
              
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
              />

              <select
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
              >
                <option>Select Service</option>
                <option>Web Application Development</option>
                <option>Mobile App Development</option>
                <option>Desktop Application Development</option>
                <option>IT Consulting</option>
              </select>

              <textarea
                placeholder="Tell us about your project..."
                rows={4}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-lg text-white font-medium transition"
                style={{
                  background: "var(--primary-color)",
                }}
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}