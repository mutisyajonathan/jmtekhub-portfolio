"use client";

import PosCard from "../components/PosCard";
import WebCard from "../components/WebCard";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Selected Work
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            A collection of systems and applications I've built to solve real-world problems.
          </p>
        </div>

        {/* 🔥 Featured Project (POS) */}
        {/* 🔥 Featured Project */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">

            {/* LEFT: Description */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <span className="text-sm text-blue-400 uppercase tracking-wider">
                Featured Project
              </span>

              <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">
                Restaurant POS System
              </h3>

              <p className="text-gray-400 mt-4 leading-relaxed max-w-xl mx-auto md:mx-0">
                A full-featured point-of-sale system designed for modern restaurants,
                handling orders, analytics, inventory, and real-time operations.
              </p>

              {/* Optional: Tech stack */}
              <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start text-xs text-gray-500">
                <span className="border border-gray-700 px-2 py-1 rounded">Next.js</span>
                <span className="border border-gray-700 px-2 py-1 rounded">Supabase</span>
                <span className="border border-gray-700 px-2 py-1 rounded">Real-time</span>
              </div>
            </div>

            {/* RIGHT: Card */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-full max-w-2xl">
                <PosCard />
              </div>
            </div>

          </div>
        </div>

        {/* 🔥 Other Projects */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Web Project */}
          <div className="p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition hover:shadow-lg hover:shadow-blue-500/20 bg-black/40 backdrop-blur">
            <WebCard />
          </div>

          {/* Inverter Monitoring */}
          <div className="p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition hover:shadow-lg hover:shadow-blue-500/20 bg-black/40 backdrop-blur">
            <h3 className="text-xl font-bold text-blue-400">
              Inverter Monitoring System
            </h3>
            <p className="text-gray-400 mt-2">
              Real-time IoT monitoring dashboard for tracking inverter performance,
              energy usage, and system health remotely.
            </p>

            {/* Optional tech tags */}
            <div className="flex gap-2 mt-4 flex-wrap text-xs text-gray-500">
              <span className="border border-gray-700 px-2 py-1 rounded">
                IoT
              </span>
              <span className="border border-gray-700 px-2 py-1 rounded">
                Supabase
              </span>
              <span className="border border-gray-700 px-2 py-1 rounded">
                Dashboard
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}