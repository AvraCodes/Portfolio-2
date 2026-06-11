"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "./SplitText";
import CinematicCanvas from "./CinematicCanvas";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    const reveals = containerRef.current.querySelectorAll('.cinematic-cut');

    const tl = gsap.timeline({ delay: 0.2 });

    // Staggered upward character reveal
    tl.fromTo(
      chars,
      { y: "100%" },
      {
        y: "0%",
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.03,
      }
    );

    // Hard clip-path cuts for metadata
    tl.fromTo(
      reveals,
      { clipPath: "inset(0 0 100% 0)" },
      { 
        clipPath: "inset(0 0 0% 0)", 
        duration: 0.6, 
        ease: "power4.out",
        stagger: 0.1
      },
      "-=0.6"
    );
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen flex flex-col justify-center px-6 md:px-12 relative overflow-hidden bg-transparent">
      
      {/* Abstract Cinematic Video Alternative */}
      <CinematicCanvas />

      {/* Massive Ghost Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full text-center pointer-events-none">
        <span className="font-display text-[400px] leading-none tracking-tighter ghost-text opacity-30 select-none">
          2026
        </span>
      </div>

      <div className="w-full flex flex-col z-10 relative mt-auto pb-12">
        
        {/* Main Title - Extremely Massive Scale */}
        <div className="flex flex-col -space-y-4 md:-space-y-12">
          <h1 className="font-display text-[28vw] md:text-[26vw] font-[800] leading-[0.7] tracking-[-0.03em] uppercase m-0 p-0 text-primary-text">
            <SplitText text="AVRA" />
          </h1>
          <h1 className="font-display text-[28vw] md:text-[26vw] font-[800] leading-[0.7] tracking-[-0.03em] uppercase m-0 p-0 text-primary-text pl-[10vw]">
            <SplitText text="PAUL" />
          </h1>
        </div>
        
        {/* Subtitle */}
        <div className="cinematic-cut overflow-hidden mt-12 md:mt-16 max-w-3xl ml-[10vw]">
          <p className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.3em] font-medium text-primary-text/90 leading-loose">
            DATA SCIENTIST — FULL-STACK DEVELOPER — SYSTEMS BUILDER
          </p>
        </div>

        {/* Footer Row */}
        <div className="flex justify-between items-end w-full mt-24">
          <div className="cinematic-cut overflow-hidden">
            <span className="font-sans text-[11px] uppercase text-secondary-text tracking-[0.2em]">Vol. 01 / Archive</span>
          </div>
          <div className="cinematic-cut overflow-hidden">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-primary-text">↓ SCROLL TO BEGIN</span>
          </div>
        </div>

      </div>
    </section>
  );
}
