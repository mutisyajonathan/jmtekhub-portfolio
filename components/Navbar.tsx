export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold tracking-widest text-blue-400">
        JM TEKHUB
      </h1>

      <div className="space-x-6 text-sm text-gray-300">
        <a href="#services" className="hover:text-white transition">Services</a>
        <a href="#projects" className="hover:text-white transition">Projects</a>
        <a href="#contact" className="hover:text-white transition">Contact</a>
      </div>
    </nav>
  );
}