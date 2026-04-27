import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects";


/*const res = await fetch(
  `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
);
  const data = await res.json();*/


export default function Home() {
  return (
    <main>
      <Hero />

      <section className="max-w-7xl mx-auto px-6">
        <Skills />
        <Projects />
      </section>

      {/* CTA */}
      <section className="text-center py-20">
        <h2 className="text-3xl font-bold">
          Let's build something impactful
        </h2>
        <p className="text-gray-400 mt-4">
          Available for freelance and full-time opportunities
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 rounded-lg">
          Contact Me
        </button>
      </section>
    </main>
  );
}