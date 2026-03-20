import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
    </main>
  );
}