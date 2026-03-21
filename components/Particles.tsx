"use client";

import { useEffect, useRef } from "react";

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseHue: number;
    depth: number; // 0 (far) → 1 (near)
};

export default function AdvancedParticles() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        let particles: Particle[] = [];
        let animationId: number;

        // ⚡ Adaptive performance
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        // Fewer particles
        const particleCount = isMobile ? 25 : 45;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;

            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const initParticles = () => {
            particles = Array.from({ length: particleCount }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.2, // slower
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 1 + 0.3,   // 👈 much smaller
                baseHue: Math.random() * 360,
                depth: Math.random(),
            }));
        };

        const draw = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const globalHueShift = time * 0.02; // 🌈 color animation

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // 🌌 Parallax effect (depth-based motion scaling)
                const depthFactor = 0.3 + p.depth * 1.2;

                const dx = mouse.current.x - p.x;
                const dy = mouse.current.y - p.y;

                const distSq = dx * dx + dy * dy;
                const radius = 150;
                const radiusSq = radius * radius;

                if (distSq < radiusSq) {
                    const dist = Math.sqrt(distSq);
                    const force = (radius - dist) / radius;

                    p.vx += dx * force * 0.0005 * depthFactor;
                    p.vy += dy * force * 0.0005 * depthFactor;
                }

                p.x += p.vx * depthFactor;
                p.y += p.vy * depthFactor;

                // Wrap
                if (p.x < 0) p.x = window.innerWidth;
                if (p.x > window.innerWidth) p.x = 0;
                if (p.y < 0) p.y = window.innerHeight;
                if (p.y > window.innerHeight) p.y = 0;

                // Damping
                p.vx *= 0.97;
                p.vy *= 0.97;

                // 🌈 Dynamic hue shifting
                const hue = (p.baseHue + globalHueShift) % 360;
                // 🔥 Glow gradient
                // Subtle glow
                const glowRadius = p.size * 3.5; 

                const gradient = ctx.createRadialGradient(
                    p.x,
                    p.y,
                    0,
                    p.x,
                    p.y,
                    glowRadius
                );

                // Lower intensity
                gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.6)`);
                gradient.addColorStop(0.5, `hsla(${hue}, 100%, 60%, 0.15)`);
                gradient.addColorStop(1, "rgba(0,0,0,0)");

                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
                ctx.fill();

                // Core particle
                ctx.beginPath();
                ctx.fillStyle = `hsla(${hue},100%,80%,1)`;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // 🔗 Connections (optimized)
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];

                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    const maxDist = 120;
                    if (distSq < maxDist * maxDist) {
                        const dist = Math.sqrt(distSq);

                        const alpha = 1 - dist / maxDist;

                        ctx.beginPath();
                        ctx.strokeStyle = `hsla(${hue},100%,70%,${alpha * 0.4})`;
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        resize();
        initParticles();
        animationId = requestAnimationFrame(draw);

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: -1,
                background: "radial-gradient(circle at center, #020617, #000000)",
            }}
        />
    );
}