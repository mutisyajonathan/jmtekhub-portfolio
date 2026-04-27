"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (id: string, fallback: string) => {
    const attemptScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(fallback);
      }
    };
    setTimeout(attemptScroll, 100);
  };

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
   <section className="min-h-screen flex items-center justify-center px-6 pt-24 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_65%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        {/* Headline */}
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #2563eb, #06b6d4, #3b82f6)",
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  backgroundImage: [
                    "linear-gradient(90deg, #2563eb, #06b6d4)",
                    "linear-gradient(90deg, #3b82f6, #0ea5e9)",
                    "linear-gradient(90deg, #1d4ed8, #22d3ee)",
                    "linear-gradient(90deg, #2563eb, #06b6d4)",
                  ],
                }
          }
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          Building Scalable Systems for your Business
        </motion.h1>

        {/* Brand */}
        <motion.p
          variants={item}
          className="mt-3 text-blue-400 font-medium tracking-wide"
        >
          JM TekHub
        </motion.p>

        {/* Description */}
        <motion.p
          variants={item}
          className="mt-6 text-gray-400 max-w-2xl text-lg leading-relaxed"
        >
          I build high-performance web applications, dashboards, and backend
          systems using modern technologies like Next.js, Supabase, and cloud
          infrastructure.
        </motion.p>

        {/* Credibility */}
        <motion.p
          variants={item}
          className="mt-4 text-sm text-gray-500"
        >
          10+ years experience in software development
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={item}
          className="w-20 h-[2px] bg-blue-500/40 mt-8"
        />

        {/* CTA */}
        <motion.div
          variants={item}
          className="mt-10 flex gap-4 flex-wrap justify-center"
        >
          {/* Primary */}
          <button
            onClick={() => scrollToSection("projects", "/projects")}
            className="px-7 py-3 rounded-lg bg-blue-600 text-white font-medium transition hover:scale-105 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
          >
            Explore My Work
          </button>

          {/* Secondary */}
          <button
            onClick={() => scrollToSection("contact", "/#contact")}
            className="px-7 py-3 rounded-lg border border-blue-400/40 text-blue-300 transition hover:scale-105 hover:bg-blue-500/10"
          >
            Let’s Talk
          </button>
        </motion.div>

        {/* Subtle dev signature */}
        <motion.div
          variants={item}
          className="mt-16 text-xs text-gray-600 font-mono opacity-70"
        >
          {"<engineered for scale />"}
        </motion.div>
      </motion.div>
    </section>
  );
}