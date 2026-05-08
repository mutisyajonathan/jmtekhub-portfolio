"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  Variants,
  AnimatePresence,
} from "framer-motion";
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
    const el = document.getElementById(id);

    if (el) el.scrollIntoView({ behavior: "smooth" });
    else router.push(fallback);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
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
        staggerChildren: 0.12,
        delayChildren: 0.15,
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
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.10),transparent_65%)]" />

        {/* main hero */}

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto w-full"
        >
          {/* PARENT = TWO CHILDREN */}
          <div className="flex flex-col gap-8 lg:gap-10">

            {/* TOP CHILD = HEADER + IMAGE */}

            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-4 xl:gap-6 items-center">
              {/* HEADER */}
              <div className="text-center lg:text-left lg:pr-0">
                <motion.p
                  variants={item}
                  className="text-blue-400 uppercase tracking-[0.3em] text-xs md:text-sm"
                >
                  JM TekHub
                </motion.p>

                <motion.h1
                  variants={item}
                  className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.02] text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg,#2563eb,#06b6d4,#3b82f6)",
                  }}
                >
                  Building Scalable Systems
                  <br className="hidden md:block" />
                  <span className="block md:inline">for your Business</span>
                </motion.h1>
              </div>

              {/* IMAGE */}
              <motion.div
                variants={item}
                className="relative flex justify-center lg:justify-start"
              >
                <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[500px] xl:max-w-[540px]">
                  <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full scale-90" />

                  <Image
                    src="/images/restaurant3d.png"
                    alt="JM Tekhub Restaurant POS"
                    width={900}
                    height={900}
                    priority
                    className="relative z-10 w-full h-auto drop-shadow-2xl hover:scale-[1.02] transition duration-500"
                  />
                </div>
              </motion.div>
            </div>

            {/* BOTTOM CHILD = TAGLINE + CTA */}
            <div className="text-center max-w-4xl mx-auto w-full">
              <motion.p
                variants={item}
                className="text-gray-400 text-base md:text-lg xl:text-xl leading-relaxed"
              >
                I help restaurants, SMEs, and growing businesses automate
                operations, improve customer service, and increase revenue through
                custom software, AI chatbots, and business management systems.
              </motion.p>

              <motion.div
                variants={item}
                className="mt-8 flex flex-wrap gap-3 justify-center text-sm"
              >
                <span className="chip">10+ Years Experience</span>
                <span className="chip">Real Business Systems</span>
                <span className="chip">Nairobi • Remote</span>
              </motion.div>

              <motion.div
                variants={item}
                className="mt-8 flex gap-4 flex-wrap justify-center"
              >
                <button
                  onClick={() => scrollToSection("projects", "/projects")}
                  className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition hover:scale-105 shadow-lg shadow-blue-600/20"
                >
                  Explore My Work
                </button>

                <button
                  onClick={() => setOpenModal(true)}
                  className="px-7 py-3 rounded-xl border border-blue-400/30 text-blue-300 hover:bg-blue-500/10 transition hover:scale-105"
                >
                  Let's Talk
                </button>
              </motion.div>

              <motion.p
                variants={item}
                className="mt-10 text-xs text-gray-600 font-mono"
              >
                {"<engineered for scale />"}
              </motion.p>
            </div>
          </div>
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
              initial={{ scale: 0.92, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
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
                  className="input"
                >
                  <option value="">Select Service</option>
                  <option>Web Development</option>
                  <option>Restaurant POS</option>
                  <option>Business Chatbot</option>
                  <option>Dashboard Systems</option>
                  <option>Consultation</option>
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
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
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

        .chip {
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.15);
          color: #93c5fd;
        }
      `}</style>
    </>
  );
}