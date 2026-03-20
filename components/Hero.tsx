"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text glow"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        JM TekHub
      </motion.h1>

      <motion.p
        className="mt-6 text-gray-400 max-w-xl text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Engineering modern software, secure systems, and scalable digital solutions.
      </motion.p>

      <motion.div
        className="mt-8 flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <a
          href="#projects"
          className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          View Work
        </a>

        <a
          href="#contact"
          className="px-6 py-3 border border-gray-700 rounded-lg hover:border-white transition"
        >
          Contact
        </a>
      </motion.div>

    </section>
  );
}