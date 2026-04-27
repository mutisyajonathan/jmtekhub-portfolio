"use client";

import { useState } from "react";
import { motion, useReducedMotion, Variants, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { X, Send, Loader2 } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
    service: "",
    comments: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Message sent successfully.");
        setForm({
          firstName: "",
          secondName: "",
          email: "",
          phone: "",
          service: "",
          comments: "",
        });

        setTimeout(() => {
          setOpenModal(false);
          setSuccess("");
        }, 1800);
      } else {
        setSuccess(data.error || "Something went wrong.");
      }
    } catch {
      setSuccess("Failed to send message.");
    }

    setLoading(false);
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
    <>
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_65%)]" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #2563eb, #06b6d4, #3b82f6)",
            }}
          >
            Building Scalable Systems for your Business
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 text-blue-400 font-medium tracking-wide"
          >
            JM TekHub
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 text-gray-400 max-w-2xl text-lg leading-relaxed"
          >
            I build high-performance web applications, dashboards, and backend
            systems using modern technologies like Next.js, Supabase, and cloud
            infrastructure.
          </motion.p>

          <motion.p variants={item} className="mt-4 text-sm text-gray-500">
            10+ years experience in software development
          </motion.p>

          <motion.div
            variants={item}
            className="w-20 h-[2px] bg-blue-500/40 mt-8"
          />

          <motion.div
            variants={item}
            className="mt-10 flex gap-4 flex-wrap justify-center"
          >
            <button
              onClick={() => scrollToSection("projects", "/projects")}
              className="px-7 py-3 rounded-lg bg-blue-600 text-white font-medium transition hover:scale-105 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
            >
              Explore My Work
            </button>

            <button
              onClick={() => setOpenModal(true)}
              className="px-7 py-3 rounded-lg border border-blue-400/40 text-blue-300 transition hover:scale-105 hover:bg-blue-500/10"
            >
              Let's Talk
            </button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-16 text-xs text-gray-600 font-mono opacity-70"
          >
            {"<engineered for scale />"}
          </motion.div>
        </motion.div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0b1120] p-7 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Request Service
                </h2>

                <button
                  onClick={() => setOpenModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    className="input"
                  />

                  <input
                    name="secondName"
                    placeholder="Second Name"
                    required
                    value={form.secondName}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="input"
                  />

                  <input
                    name="phone"
                    placeholder="Phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <select
                  name="service"
                  required
                  value={form.service}
                  onChange={handleChange}
                  className="input bg-[#0f172a] text-white appearance-none"
                >
                  <option value="" className="bg-[#0f172a] text-gray-400">
                    Select Service
                  </option>
                  <option className="bg-[#0f172a] text-white">Web Development</option>
                  <option className="bg-[#0f172a] text-white">Dashboard Systems</option>
                  <option className="bg-[#0f172a] text-white">Backend APIs</option>
                  <option className="bg-[#0f172a] text-white">Cloud Deployment</option>
                  <option className="bg-[#0f172a] text-white">Consultation</option>
                </select>

                <textarea
                  name="comments"
                  rows={5}
                  placeholder="Comments / Project Details"
                  value={form.comments}
                  onChange={handleChange}
                  className="input resize-none"
                />

                {success && (
                  <p className="text-sm text-blue-400">{success}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 transition"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Request
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: white;
          outline: none;
        }

        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
      `}</style>
    </>
  );
}