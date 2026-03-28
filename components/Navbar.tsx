"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [active, setActive] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // 🔥 Scroll to section (works cross-route)
  const navigateToSection = (id: string) => {
    setMobileOpen(false);
    setActive(id);

    if (pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 🔥 Handle hash on page load (important)
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname]);

  // 🔥 Scroll tracking (home only)
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      const sections = ["projects", "contact"];
      let current = "";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = id;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // 🔥 Sync active with route
  useEffect(() => {
    if (pathname === "/services") {
      setActive("services");
    }
  }, [pathname]);

  return (
    <>
      {/* Progress Bar (home only) */}
      {pathname === "/" && (
        <div className="fixed top-0 left-0 w-full h-[2px] z-[60]">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      <nav className="fixed top-[2px] w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10 px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/">
          <h1 className="text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 cursor-pointer">
            JM TEKHUB
          </h1>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex space-x-6 text-sm items-center">

          {/* SERVICES (route) */}
          <Link
            href="/services"
            onClick={() => setActive("services")}
            className={`relative transition duration-300 ${
              active === "services"
                ? "text-blue-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Services
          </Link>

          {/* PROJECTS */}
          <button
            onClick={() => navigateToSection("projects")}
            className={`relative transition duration-300 ${
              active === "projects"
                ? "text-blue-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Projects
          </button>

          {/* CONTACT */}
          <button
            onClick={() => navigateToSection("contact")}
            className={`relative transition duration-300 ${
              active === "contact"
                ? "text-blue-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Contact
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed top-[60px] left-0 w-full bg-black/90 backdrop-blur-md z-40 flex flex-col items-center py-6 space-y-6 md:hidden">
          
          <Link href="/services" onClick={() => setMobileOpen(false)}>
            Services
          </Link>

          <button onClick={() => navigateToSection("projects")}>
            Projects
          </button>

          <button onClick={() => navigateToSection("contact")}>
            Contact
          </button>
        </div>
      )}
    </>
  );
}