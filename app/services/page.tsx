// app/services/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Services from "../../components/Services";
import FloatingContact from "../../components/FloatingContact";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white">
        <Services />
      </main>
    </>
  );
}