"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import PosCard from "../components/PosCard";
import WebCard from "../components/WebCard";

export default function Projects() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45 }
    );

    if (chatbotRef.current) observer.observe(chatbotRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (inView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  const openQuoteModal = () => {
    document.dispatchEvent(new CustomEvent("openQuoteModal"));
  };

  return (
    <>
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-blue-400 uppercase tracking-[0.25em] text-xs">
              Portfolio
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
              Selected Work
            </h2>

            <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-relaxed">
              Systems and digital solutions built to solve real business
              problems, streamline operations, and improve performance.
            </p>
          </div>

          {/* Restaurant POS */}
          <div className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <p className="text-blue-400 uppercase tracking-wider text-sm">
                  Featured System
                </p>

                <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
                  Restaurant POS System
                </h3>

                <p className="text-gray-400 mt-5 leading-relaxed">
                  A business-grade point-of-sale platform that helps
                  restaurants manage tables, control staff access, speed up
                  billing, and generate accurate PDF / Excel sales reports.
                </p>

                <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start text-sm">
                  <span className="chip">Table Management</span>
                  <span className="chip">Staff Permissions</span>
                  <span className="chip">Fast Billing</span>
                  <span className="chip">Sales Reports</span>
                </div>

                <button
                  onClick={openQuoteModal}
                  className="mt-8 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
                >
                  Request Demo <ArrowRight size={16} />
                </button>
              </div>

              <div>
                <PosCard />
              </div>
            </div>
          </div>

          {/* Chatbot */}
          <div ref={chatbotRef} className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Video */}
              <div className="order-2 md:order-1">
                <div className="rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:shadow-[0_0_18px_rgba(59,130,246,0.30)] bg-black">
                  <video
                    ref={videoRef}
                    src="/videos/chatbot.mp4"
                    muted
                    loop
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="order-1 md:order-2 text-center md:text-left">
                <p className="text-blue-400 uppercase tracking-wider text-sm">
                  AI Solution
                </p>

                <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
                  Business Chatbot
                </h3>

                <p className="text-gray-400 mt-5 leading-relaxed">
                  A ChatGPT-powered assistant trained on your business to answer
                  customer questions, capture leads, process requests, and stay
                  available 24/7.
                </p>

                <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start text-sm">
                  <span className="chip">24/7 Replies</span>
                  <span className="chip">Lead Capture</span>
                  <span className="chip">Automation</span>
                  <span className="chip">Customer Support</span>
                </div>

                <button
                  onClick={openQuoteModal}
                  className="mt-8 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-lg"
                >
                  Get Your Chatbot
                </button>
              </div>
            </div>
          </div>

          {/* Other Projects */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition bg-black/40 backdrop-blur">
              <WebCard />
            </div>

            <div className="p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition bg-black/40 backdrop-blur">
              <h3 className="text-xl font-bold text-blue-400">
                Inverter Monitoring System
              </h3>

              <p className="text-gray-400 mt-3 leading-relaxed">
                Real-time IoT dashboard for monitoring inverter performance,
                power usage, alerts, and system health remotely.
              </p>

              <div className="flex flex-wrap gap-3 mt-5 text-sm">
                <span className="chip">Remote Monitoring</span>
                <span className="chip">Live Data</span>
                <span className="chip">Alerts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .chip {
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.15);
          color: #93c5fd;
        }
      `}</style>
    </>
  );
}