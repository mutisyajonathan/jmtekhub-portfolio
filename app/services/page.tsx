// app/services/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Services from "../../components/Services";

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