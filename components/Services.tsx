const services = [
  {
    title: "Software Engineering",
    desc: "Robust, scalable applications using modern stacks.",
  },
  {
    title: "Security Solutions",
    desc: "Physical + digital security systems integration.",
  },
  {
    title: "Automation & APIs",
    desc: "Process automation and system integrations.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-6">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Services
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div
            key={i}
            className="glass p-6 rounded-2xl hover:scale-105 transition transform"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-400">
              {s.title}
            </h3>
            <p className="text-gray-400">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}