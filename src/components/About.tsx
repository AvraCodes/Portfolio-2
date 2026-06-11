"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Scrub reveal text based on scroll position
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full min-h-[70vh] flex flex-col md:flex-row border-b border-foreground"
    >
      <div className="w-full md:w-1/2 p-8 md:p-16 border-b md:border-b-0 md:border-r border-foreground flex flex-col justify-center">
        <h2 className="text-sm font-sans uppercase tracking-[0.2em] mb-12">
          [02] Manifesto
        </h2>
        
        <div ref={textRef} className="font-sans text-2xl md:text-4xl leading-tight uppercase">
          <span className="font-light">Backend is where I live.</span><br />
          <span className="font-black text-accent">Frontend is where I make things feel alive.</span><br />
          <span className="font-normal italic">ML is the gap between the two.</span>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <div className="space-y-12">
          <div>
            <h3 className="text-xs font-sans uppercase tracking-[0.2em] mb-4 text-gray-500">
              Education .01
            </h3>
            <p className="font-display text-2xl md:text-3xl uppercase">B.S. Data Science</p>
            <p className="font-sans text-sm uppercase tracking-wider mt-1">IIT Madras (Online) — 2027</p>
          </div>
          
          <div>
            <h3 className="text-xs font-sans uppercase tracking-[0.2em] mb-4 text-gray-500">
              Education .02
            </h3>
            <p className="font-display text-2xl md:text-3xl uppercase">B.Tech IT</p>
            <p className="font-sans text-sm uppercase tracking-wider mt-1">University of Kalyani — 2027</p>
          </div>
        </div>
      </div>
    </section>
  );
}
