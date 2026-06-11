"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-expect-error - maath does not have types for this specific import path
import * as random from "maath/random/dist/maath-random.esm";

// Simple Particle Background
function ParticleField() {
  const ref = useRef<any>(null);
  // Generate random points in a sphere (15000 = 5000 particles * 3 coordinates)
  const sphere = random.inSphere(new Float32Array(15000), { radius: 1.5 });

  useEffect(() => {
    // Rotate slowly
    gsap.to(ref.current.rotation, {
      y: Math.PI * 2,
      x: Math.PI * 2,
      duration: 100,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#333333"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Character reveal animation
    const tl = gsap.timeline({ delay: 1.5 }); // Wait for page transition

    const chars1 = textRef1.current?.querySelectorAll(".char");
    const chars2 = textRef2.current?.querySelectorAll(".char");

    if (chars1 && chars2) {
      tl.fromTo(
        [...Array.from(chars1), ...Array.from(chars2)],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.02,
        }
      );
    }

    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out" },
      "-=0.5"
    );

    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out" },
      "-=0.8"
    );
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
        {char}
      </span>
    ));
  };

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-start px-4 md:px-8 brutal-border-b overflow-hidden">
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleField />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto" ref={containerRef}>
        <h1 className="font-display text-[12vw] md:text-[8vw] leading-[0.85] uppercase tracking-tighter m-0">
          <div ref={textRef1} className="overflow-hidden">
            {splitText("Systems by day.")}
          </div>
          <div ref={textRef2} className="overflow-hidden text-foreground">
            {splitText("Interfaces by compulsion.")}
          </div>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="mt-8 font-sans text-sm md:text-base uppercase tracking-[0.2em] opacity-0"
        >
          Avra — Data Analyst & Full-Stack Developer
        </p>

        <a 
          ref={ctaRef}
          href="#work"
          data-cursor="hover"
          className="mt-16 inline-block font-sans text-lg uppercase brutal-border px-6 py-3 hover:bg-foreground hover:text-background transition-colors duration-300 opacity-0"
        >
          Selected Work ↓
        </a>
      </div>
    </section>
  );
}
