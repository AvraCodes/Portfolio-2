"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  { domain: "Distributed Systems", tech: "FastAPI · Redis · WebSockets · Docker" },
  { domain: "Machine Learning", tech: "Scikit-learn · RAG · LLM pipelines" },
  { domain: "Data Engineering", tech: "PostgreSQL · Pandas · pipeline design" },
  { domain: "Web Interfaces", tech: "React · Next.js · TypeScript · GSAP" },
  { domain: "Agency & Delivery", tech: "BrewWeb · client projects · shipping" }
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const rows = sectionRef.current.querySelectorAll('.cap-row');
    
    gsap.fromTo(
      rows,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-32 px-4 md:px-8 bg-background">
      <div className="font-sans text-[11px] uppercase tracking-[0.2em] mb-24 text-foreground/70">
        — 04 / CAPABILITIES
      </div>

      <div className="w-full max-w-6xl">
        {capabilities.map((cap, i) => (
          <div 
            key={i} 
            className="cap-row grid-12 items-baseline border-b border-foreground/20 py-8 group hover:bg-foreground hover:text-background transition-colors duration-500 cursor-default px-4"
          >
            <div className="col-span-12 md:col-span-5 mb-4 md:mb-0">
              <span className="font-display text-[24px] md:text-[32px] tracking-wide">
                {cap.domain}
              </span>
            </div>
            <div className="col-span-12 md:col-span-7">
              <span className="font-sans text-[14px] font-[300] tracking-wider text-foreground/80 group-hover:text-background/80 transition-colors duration-500">
                {cap.tech}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
