"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  { role: "Independent Developer", focus: "AI & Full-Stack", timeline: "25 — Present" },
  { role: "ML & Data Science", focus: "Applied ML", timeline: "25 — Present" },
  { role: "Full-Stack Dev", focus: "Agency", timeline: "25 — Present" }
];

const capabilities = [
  "Distributed Systems", "Python", "FastAPI", "PostgreSQL", 
  "Redis", "Docker", "ML Pipelines", "Scikit-learn", 
  "Vector DBs", "RAG", "React", "Next.js", "TypeScript", "GSAP"
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.fade-up'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-32 bg-background border-t border-foreground/10 px-4 md:px-8">
      <div className="w-full flex flex-col md:flex-row gap-32 items-start">
        
        {/* Experience List */}
        <div className="w-full md:w-1/2">
          <h2 className="fade-up font-sans text-xs uppercase tracking-[0.2em] font-bold mb-16 ml-4">
            Curriculum Vitae
          </h2>

          <div className="flex flex-col w-full">
            {experience.map((exp, i) => (
              <div key={i} className="fade-up flex justify-between items-end border-b border-foreground/10 py-8 px-4 hover:pl-8 transition-all duration-500">
                <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tighter m-0">{exp.role}</h3>
                <div className="text-right flex flex-col items-end gap-2">
                  <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold">{exp.timeline}</span>
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/40">{exp.focus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="w-full md:w-1/2">
          <h2 className="fade-up font-sans text-xs uppercase tracking-[0.2em] font-bold mb-16 ml-4">
            Index of Competence
          </h2>
          
          <div className="flex flex-wrap gap-x-12 gap-y-6 px-4">
            {capabilities.map((cap, i) => (
              <span key={i} className="fade-up font-display text-2xl md:text-4xl italic text-foreground/80 hover:text-foreground transition-colors">
                {cap}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
