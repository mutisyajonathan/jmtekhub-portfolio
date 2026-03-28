"use client";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { Code2, Globe, Database, Smartphone, ShieldCheck, BarChart3 } from "lucide-react";

const services = [
  {
    title: "Custom Web Development",
    desc: "Full-stack web applications built with modern frameworks, optimized for performance and scalability.",
    icon: <Code2 size={20} />,
  },
  {
    title: "Business Websites",
    desc: "Professional, responsive websites tailored for brands, SMEs, and startups.",
    icon: <Globe size={20} />,
  },
  {
    title: "Backend & APIs",
    desc: "Robust backend systems, REST APIs, and database architecture using scalable technologies.",
    icon: <Database size={20} />,
  },
  {
    title: "Mobile-Friendly Apps",
    desc: "Cross-platform, responsive apps that work seamlessly across devices.",
    icon: <Smartphone size={20} />,
  },
  {
    title: "System Security",
    desc: "Authentication, authorization, and secure system design to protect data and users.",
    icon: <ShieldCheck size={20} />,
  },
  {
    title: "Analytics & Dashboards",
    desc: "Data visualization, reporting dashboards, and real-time analytics integration.",
    icon: <BarChart3 size={20} />,
  },
];

export default function ServicesPage() {
  return (
    <>
    <Navbar/>
  
    <section className="min-h-screen px-6 py-20 bg-black text-white">

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Services
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I design and build scalable digital solutions—from business websites to full-stack systems like POS platforms and analytics dashboards.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:shadow-xl transition"
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent blur-xl" />
              </div>

              {/* Icon */}
              <div className="mb-4 text-blue-400">{service.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">
                {service.title}
              </h3>

              {/* Desc */}
              <p className="text-gray-400 text-sm">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Have a project in mind?
          </h2>
          <p className="text-gray-400 mb-6">
            Let’s build something scalable and impactful.
          </p>

          <a
            href="#contact"
            className="inline-block px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
      </>
  );
}
