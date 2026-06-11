"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      textRefs.current,
      { y: "100%", opacity: 0, rotate: 2 },
      {
        y: "0%",
        opacity: 1,
        rotate: 0,
        duration: 1.8,
        ease: "power4.out",
        stagger: 0.1,
      }
    );

    tl.fromTo(
      pRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.out" },
      "-=1"
    );
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end pb-12 overflow-hidden bg-background">
      {/* Top Header / Nav Equivalent */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
        <div className="font-sans text-xs uppercase tracking-[0.2em] font-bold">Avra</div>
        <div className="font-sans text-xs uppercase tracking-[0.2em] max-w-[200px] text-right">
          Portfolio Archive <br/>
          Vol. I / 2026
        </div>
      </div>

      <div className="w-full px-4 md:px-8 relative z-10" ref={containerRef}>
        <div className="overflow-hidden">
          <h1 
            ref={el => { textRefs.current[0] = el; }}
            className="font-display text-[22vw] leading-[0.75] tracking-tighter uppercase m-0 p-0 text-foreground"
          >
            SYSTEMS
          </h1>
        </div>
        <div className="overflow-hidden flex items-center gap-8">
          <span 
            ref={pRef}
            className="font-sans text-xs uppercase tracking-[0.2em] font-medium max-w-[150px] hidden md:block mt-8"
          >
            Machine Learning & Full-Stack Development
          </span>
          <h1 
            ref={el => { textRefs.current[1] = el; }}
            className="font-display text-[22vw] leading-[0.75] tracking-tighter uppercase m-0 p-0 text-foreground italic"
          >
            &amp; INTERFACES
          </h1>
        </div>
      </div>
    </section>
  );
}
