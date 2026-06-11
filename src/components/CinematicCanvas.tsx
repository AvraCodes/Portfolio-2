"use client";

import { useEffect, useRef } from "react";

export default function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number; maxAlpha: number }[] = [];
    const numParticles = 15;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 200 + 100, // Large, soft orbs
        vx: (Math.random() - 0.5) * 0.2, // Very slow movement
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.05,
        maxAlpha: Math.random() * 0.05 + 0.02,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges smoothly
        if (p.x < -p.r || p.x > width + p.r) p.vx *= -1;
        if (p.y < -p.r || p.y > height + p.r) p.vy *= -1;

        // Draw soft radial gradient
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        gradient.addColorStop(0, `rgba(240, 237, 232, ${p.maxAlpha})`); // F0EDE8
        gradient.addColorStop(1, `rgba(240, 237, 232, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 opacity-40 pointer-events-none"
      style={{ filter: "blur(40px)" }} // Extreme blur for smoke/light effect
    />
  );
}
