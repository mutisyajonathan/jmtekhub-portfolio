"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-8xl font-extrabold glow"
      >
        JM TekHub
      </motion.h1>

      <p className="mt-6 text-gray-400 max-w-xl text-lg">
        Engineering modern software, secure systems, and scalable digital solutions.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="px-6 py-3 rounded-lg text-white glow-blue transition hover:scale-105"
          style={{ background: "var(--primary-color)" }}>
          View Work
        </button>

        <button className="px-6 py-3 rounded-lg border transition hover:scale-105"
          style={{ borderColor: "var(--secondary-color)", color: "var(--secondary-color)" }}>
          Contact
        </button>
      </div>
    </section>
  );
}