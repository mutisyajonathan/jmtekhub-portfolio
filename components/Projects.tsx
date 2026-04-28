"use client";

import { useEffect, useRef, useState } from "react";
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

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Selected Work
          </h2>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            A collection of systems and applications I've built to solve
            real-world problems.
          </p>
        </div>

        {/* POS */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row gap-10 items-center">

            <div className="w-full md:w-1/2 text-center md:text-left">
              <span className="text-sm text-blue-400 uppercase tracking-wider">
                Featured Project
              </span>

              <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">
                Restaurant POS System
              </h3>

              <p className="text-gray-400 mt-4 leading-relaxed">
                A full-featured point-of-sale system designed for modern
                restaurants, handling orders, analytics, inventory,
                and real-time operations.
              </p>
            </div>

            <div className="w-full md:w-1/2">
              <PosCard />
            </div>
          </div>
        </div>

        {/* Chatbot Demo */}
        <div ref={chatbotRef} className="mb-20">
          <div className="flex flex-col md:flex-row-reverse gap-10 items-center">

            {/* Video Side */}
            <div className="w-full md:w-1/2">
              <div className="group rounded-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:shadow-[0_0_18px_rgba(59,130,246,0.35)] overflow-hidden bg-black">

                <video
                  ref={videoRef}
                  src="/videos/chatbot.mp4"
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  className="w-full h-auto object-contain"
                />

                {/* Floating Chat Mockup */}
                <div className="absolute bottom-4 right-4 bg-white text-black rounded-2xl px-4 py-3 shadow-2xl w-56 animate-bounce">
                  <p className="text-xs text-gray-500 mb-1">
                    AI Assistant
                  </p>
                  <p className="text-sm font-medium">
                    Hello 👋 How can I help your business today?
                  </p>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <span className="text-sm text-blue-400 uppercase tracking-wider">
                AI Solution
              </span>

              <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">
                Business Chatbot Demo
              </h3>

              <p className="text-gray-400 mt-4 leading-relaxed max-w-xl">
                Get a ChatGPT-powered chatbot trained to understand your
                business, engage clients, and process their requests—
                available today.
              </p>

              <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start text-sm">
                <span className="bg-blue-500/10 text-blue-300 px-3 py-2 rounded-full border border-blue-500/20">
                  24/7 Replies
                </span>

                <span className="bg-green-500/10 text-green-300 px-3 py-2 rounded-full border border-green-500/20">
                  Leads Captured
                </span>

                <span className="bg-purple-500/10 text-purple-300 px-3 py-2 rounded-full border border-purple-500/20">
                  Automated Orders
                </span>
              </div>

              <button
                onClick={() =>
                  document.dispatchEvent(new CustomEvent("openQuoteModal"))
                }
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

            <p className="text-gray-400 mt-2">
              Real-time IoT monitoring dashboard for tracking inverter
              performance, energy usage, and system health remotely.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}