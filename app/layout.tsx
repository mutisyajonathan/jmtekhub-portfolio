import "./globals.css";
import Navbar from "../components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import ParticleBackground from "../components/Particles";
import FloatingContact from "../components/FloatingContact";
import ChatWidget from "../components/ChatWidget";

export const metadata = {
  title: "JM TekHub | Portfolio",
  description: "Software Development & Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className="bg-gray-950 text-white relative">
        {/* Background layer */}
        <ParticleBackground />

        {/* Main content */}
        <div className="relative z-10">
          <Navbar />
          {children}
        </div>

        <ChatWidget />
        <FloatingContact hidden />
        <Analytics />
      </body>
    </html>
  );
}