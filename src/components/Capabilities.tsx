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

    const cuts = sectionRef.current.querySelectorAll('.cinematic-cut');
    
    gsap.fromTo(
      cuts,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-32 px-6 md:px-12 bg-transparent relative z-10 border-t border-border">
      
      <div className="cinematic-cut overflow-hidden mb-24">
        <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-secondary-text">
          — 04 / CAPABILITIES
        </div>
      </div>

      <div className="w-full">
        {capabilities.map((cap, i) => (
          <div 
            key={i} 
            className="grid grid-cols-1 md:grid-cols-12 items-baseline border-b border-border py-6"
          >
            <div className="md:col-span-4 cinematic-cut overflow-hidden">
              <span className="font-sans text-[16px] md:text-[20px] font-medium tracking-wide text-primary-text">
                {cap.domain}
              </span>
            </div>
            <div className="md:col-span-8 cinematic-cut overflow-hidden mt-2 md:mt-0">
              <span className="font-sans text-[14px] font-[300] tracking-wider text-secondary-text">
                {cap.tech}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
