"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Smartphone,
  Cloud,
  ShieldCheck,
  Plug,
  ExternalLink,
  Github,
} from "lucide-react";

export default function PosCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent blur-2xl" />
      </div>

      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src="/images/dasarishot.png"
          alt="Web Application Preview"
          fill
          className={`object-cover transition-transform duration-700 ${
            hovered ? "scale-110" : "scale-100"
          }`}
          priority
        />

        <div className="absolute inset-0 bg-black/40 opacity-60 group-hover:opacity-30 transition" />

        <div className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-green-500/90 text-white shadow">
          Live • 5+ Businesses
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-1">
          Web Application
        </h3>

        <p className="text-gray-400 text-sm mb-4">
          A scalable web platform built for modern operations and real-time workflows.
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <Feature icon={<Smartphone size={16} />} label="Responsive UI" />
          <Feature icon={<Cloud size={16} />} label="Cloud Sync" />
          <Feature icon={<ShieldCheck size={16} />} label="Secure Auth" />
          <Feature icon={<Plug size={16} />} label="API Ready" />
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {["Next.js", "Supabase", "Tailwind"].map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-md bg-white/10 text-gray-300 backdrop-blur"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            <Github size={14} />
            Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* Feature Component */
function Feature({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-gray-300">
      <span className="text-blue-400">{icon}</span>
      {label}
    </div>
  );
}