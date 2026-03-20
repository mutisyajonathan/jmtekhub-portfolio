const projects = [
  {
    title: "Security Platform",
    desc: "Enterprise-grade security services system.",
  },
  {
    title: "Inverter Monitoring",
    desc: "Real-time IoT monitoring dashboard.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition hover:shadow-lg hover:shadow-blue-500/20"
          >
            <h3 className="text-xl font-bold text-blue-400">{p.title}</h3>
            <p className="text-gray-400 mt-2">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}