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
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_60%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        {/* Title with subtle animated blue hues */}
        <motion.h1
          variants={item}
          className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text tracking-tight"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #2563eb, #06b6d4, #3b82f6)",
            backgroundSize: "100% 100%",
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
          JM Tekhub
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="mt-6 text-gray-400 max-w-xl text-lg leading-relaxed"
        >
          I design and build secure, scalable software that solves real business problems.
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={item}
          className="w-16 h-[2px] bg-blue-500/40 mt-6"
        />

        {/* Buttons */}
        <motion.div
          variants={item}
          className="mt-10 flex gap-4 flex-wrap justify-center"
        >
          {/* View Work */}
          <a
            href="/#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects", "/projects");
            }}
            className="px-6 py-3 rounded-lg backdrop-blur-md bg-blue-600/20 border border-blue-500/40 text-blue-300 transition hover:scale-105 hover:bg-blue-500/30"
          >
            View Work
          </a>

          {/* Contact */}
          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact", "/#contact");
            }}
            className="px-6 py-3 rounded-lg backdrop-blur-md border border-blue-400/40 text-blue-300 transition hover:scale-105 hover:bg-blue-500/10"
          >
            Contact
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}