"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "./SplitText";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current || !containerRef.current) return;

    const chars = titleRef.current.querySelectorAll('.char');
    const otherElements = containerRef.current.querySelectorAll('.reveal');

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

    // Rest of the elements snap in (clip-path style)
    tl.fromTo(
      otherElements,
      { clipPath: "inset(0 0 100% 0)", y: 20 },
      { 
        clipPath: "inset(0 0 0% 0)", 
        y: 0, 
        duration: 0.6, 
        ease: "power4.out",
        stagger: 0.1
      },
      "-=0.6"
    );
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen flex flex-col justify-end pb-8 px-4 md:px-8 bg-background relative overflow-hidden">
      
      {/* Decorative Parallax Background Element */}
      <div 
        className="absolute top-1/4 left-0 w-full text-center opacity-5 pointer-events-none"
        data-speed="-0.2"
      >
        <span className="font-display text-[30vw] leading-none tracking-tighter uppercase whitespace-nowrap">
          PORTFOLIO
        </span>
      </div>

      <div className="w-full flex flex-col z-10">
        
        {/* Main Title (Bleeding Edge-to-Edge) */}
        <h1 
          ref={titleRef}
          className="font-display text-[15vw] md:text-[20vw] font-[800] leading-[0.75] tracking-tighter uppercase m-0 p-0 text-foreground"
        >
          <SplitText text="SYSTEMS" />
        </h1>
        
        {/* Subtitle */}
        <div className="reveal mt-8 mb-16 md:mb-24 overflow-hidden">
          <p className="font-sans text-[12px] uppercase tracking-[0.25em] font-medium text-foreground">
            DATA SCIENTIST — FULL-STACK DEVELOPER — SYSTEMS BUILDER
          </p>
        </div>

        {/* Footer Row */}
        <div className="flex justify-between items-end w-full">
          <div className="reveal overflow-hidden">
            <span className="font-sans text-[11px] uppercase text-foreground/50">2026</span>
          </div>
          <div className="reveal overflow-hidden">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold">↓ SCROLL</span>
          </div>
        </div>
      </div>

    </section>
  );
}
