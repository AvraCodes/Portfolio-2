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
  const metaRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Character reveal animation
    const tl = gsap.timeline({ delay: 1.5 }); // Wait for page transition

    const chars1 = textRef1.current?.querySelectorAll(".char");
    const chars2 = textRef2.current?.querySelectorAll(".char");

    if (chars1 && chars2) {
      tl.fromTo(
        [...Array.from(chars1), ...Array.from(chars2)],
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.02,
        }
      );
    }

    tl.fromTo(
      metaRefs.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.inOut", stagger: 0.2 },
      "-=0.5"
    );
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
        {char}
      </span>
    ));
  };

  const stackTicker = "PYTHON /// FASTAPI /// POSTGRESQL /// DOCKER /// REDIS /// REACT /// NEXT.JS /// THREE.JS /// GSAP /// TAILWIND CSS /// SCIKIT-LEARN /// RAG PIPELINES /// ";

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center brutal-border-b overflow-hidden">
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Metadata Corners */}
      <div 
        ref={el => { metaRefs.current[0] = el; }}
        className="absolute top-4 left-4 z-20 font-sans text-xs md:text-sm text-gray-500 uppercase tracking-widest hidden md:block"
      >
        SYS_STATUS: ACTIVE<br/>
        UPTIME: 99.9%
      </div>
      <div 
        ref={el => { metaRefs.current[1] = el; }}
        className="absolute top-4 right-4 z-20 font-sans text-xs md:text-sm text-gray-500 uppercase tracking-widest text-right hidden md:block"
      >
        LOC: {new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).format(new Date())}<br/>
        LAT/LONG: 13.0827° N, 80.2707° E
      </div>
      <div 
        ref={el => { metaRefs.current[2] = el; }}
        className="absolute bottom-16 left-4 z-20 font-sans text-xs md:text-sm text-gray-500 uppercase tracking-widest hidden md:block"
      >
        OBJ: FULL_STACK_DELIVERY<br/>
        AVAILABLE_FOR_DEPLOYMENT
      </div>

      {/* Main Title */}
      <div className="relative z-10 w-full max-w-[95vw] mx-auto flex flex-col justify-center items-center" ref={containerRef}>
        <h1 className="font-display text-[14vw] leading-[0.8] uppercase tracking-tighter text-center m-0 w-full flex flex-col items-center">
          <div ref={textRef1} className="overflow-hidden pb-2 w-full text-center">
            {splitText("Systems by day.")}
          </div>
          <div ref={textRef2} className="overflow-hidden text-foreground pb-2 w-full text-center flex flex-col items-center">
            {splitText("Interfaces by")}
            <span className="text-accent block mt-[-2vw]">{splitText("compulsion.")}</span>
          </div>
        </h1>
      </div>

      {/* Ticker Tape */}
      <div 
        ref={el => { metaRefs.current[3] = el; }}
        className="absolute bottom-0 w-full brutal-border-t bg-foreground text-background py-2 overflow-hidden z-20 flex"
      >
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="font-display text-xl md:text-2xl tracking-widest px-4">{stackTicker}</span>
          <span className="font-display text-xl md:text-2xl tracking-widest px-4">{stackTicker}</span>
        </div>
      </div>
    </section>
  );
}
