const skills = [
  "Next.js",
  "React",
  "Node.js",
  "MySQL",
  "Linux",
  "APIs",
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 px-5">
      <h2 className="text-2xl font-semibold mb-6">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-800 px-4 py-2 rounded-lg"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}