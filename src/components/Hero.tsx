"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 }); // Wait for page transition

    tl.fromTo(
      [textRef1.current, textRef2.current],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
      }
    );

    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" },
      "-=1"
    );
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center px-8 md:px-16 overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center" ref={containerRef}>
        <h1 className="font-display text-[10vw] md:text-[8vw] leading-[1.1] tracking-tight m-0 text-foreground">
          <div ref={textRef1} className="opacity-0">
            Systems by day.
          </div>
          <div ref={textRef2} className="opacity-0 text-accent italic font-medium">
            Interfaces by compulsion.
          </div>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="mt-12 font-sans text-sm md:text-base tracking-[0.2em] uppercase text-foreground/60 opacity-0 max-w-lg mx-auto"
        >
          Portfolio of Avra — Data Analyst & Full-Stack Developer
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-sans text-xs tracking-widest text-foreground/40 uppercase">
        Scroll to explore
      </div>
    </section>
  );
}
