"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ShieldCheck, Workflow, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Software Engineering",
    desc: "Robust, scalable applications using modern stacks.",
    details:
      "Building full-stack systems with clean architecture, performance optimization, and scalable backend design.",
    icon: Code2,
    color: "text-blue-400",
    glow: "from-blue-500/20",
  },
  {
    title: "Security Solutions",
    desc: "Physical + digital security systems integration.",
    details:
      "Designing secure infrastructures, access control systems, and integrating digital security layers.",
    icon: ShieldCheck,
    color: "text-green-400",
    glow: "from-green-500/20",
  },
  {
    title: "Automation & APIs",
    desc: "Process automation and system integrations.",
    details:
      "Automating workflows, integrating APIs, and optimizing business processes for efficiency.",
    icon: Workflow,
    color: "text-purple-400",
    glow: "from-purple-500/20",
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">
          Services
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={i}
                layout
                onClick={() =>
                  setActiveIndex(isActive ? null : i)
                }
                className={`group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg cursor-pointer transition-all duration-300 ${
                  isActive ? "md:col-span-2" : ""
                }`}
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${s.glow} via-transparent to-transparent blur-2xl`}
                  />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between">
                  <div
                    className={`${s.color} transform transition group-hover:scale-110`}
                  >
                    <Icon size={28} />
                  </div>

                  <ArrowRight
                    size={16}
                    className={`text-gray-400 transition ${
                      isActive ? "rotate-90 text-white" : ""
                    }`}
                  />
                </div>

                <h3 className="text-xl font-semibold mt-4 text-white">
                  {s.title}
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  {s.desc}
                </p>

                {/* Expandable Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4"
                    >
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {s.details}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-xs text-white">
                        Explore more
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium text-white">
            Let’s Work Together
          </button>
        </div>
      </div>
    </section>
  );
}