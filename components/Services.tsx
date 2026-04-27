"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  ShieldCheck,
  Workflow,
  ArrowRight,
  X,
  Send,
  Loader2,
} from "lucide-react";

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
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
    service: "",
    comments: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("Request sent successfully.");
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
          setMsg("");
        }, 1500);
      } else {
        setMsg(data.error || "Failed to send request.");
      }
    } catch {
      setMsg("Failed to send request.");
    }

    setLoading(false);
  };

  return (
    <>
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
                  onClick={() => setActiveIndex(isActive ? null : i)}
                  className={`group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg cursor-pointer transition-all duration-300 ${
                    isActive ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${s.glow} via-transparent to-transparent blur-2xl`}
                    />
                  </div>

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

                  <p className="text-gray-400 text-sm mt-2">{s.desc}</p>

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
                          <ArrowRight size={14} />
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
            <button
              onClick={() => setOpenModal(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium text-white"
            >
              Let's Work Together
            </button>
          </div>
        </div>
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
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-xl rounded-2xl bg-[#0b1120] border border-white/10 p-7 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Start Your Project
                </h3>

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
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="input"
                  />

                  <input
                    name="secondName"
                    placeholder="Second Name"
                    value={form.secondName}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="input"
                  />

                  <input
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>

                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="input bg-[#0f172a] text-white"
                >
                  <option value="">Select Service</option>
                  <option>Software Engineering</option>
                  <option>Security Solutions</option>
                  <option>Automation & APIs</option>
                  <option>Consultation</option>
                </select>

                <textarea
                  name="comments"
                  rows={5}
                  placeholder="Project details..."
                  value={form.comments}
                  onChange={handleChange}
                  className="input resize-none"
                />

                {msg && <p className="text-sm text-blue-400">{msg}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex justify-center items-center gap-2"
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