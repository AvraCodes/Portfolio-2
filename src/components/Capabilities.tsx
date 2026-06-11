"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    role: "Independent Developer",
    focus: "AI, ML & Full-Stack Systems",
    timeline: "2025 — Present",
    details: "Designed Alvyn (AI Data Analyst API), built end-to-end data pipelines for 55k+ records, optimized LLM workflows."
  },
  {
    role: "ML & Data Science",
    focus: "Competitive & Applied",
    timeline: "2025 — Present",
    details: "Achieved ~80% in Kaggle competitions. Focused on feature engineering, structured/unstructured preprocessing."
  },
  {
    role: "Full-Stack Dev",
    focus: "Agency & Freelance",
    timeline: "2025 — Present",
    details: "Built clean, responsive UI with React/Next.js integrated with Python/FastAPI backends."
  }
];

const capabilities = [
  {
    domain: "Distributed Systems",
    tools: "Python, FastAPI, Node.js, PostgreSQL, Redis, Docker",
  },
  {
    domain: "ML Pipelines",
    tools: "Pandas, NumPy, Scikit-learn, Vector DBs, RAG",
  },
  {
    domain: "Web Interfaces",
    tools: "React, Next.js, TypeScript, Tailwind CSS, GSAP",
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('.fade-up');
    
    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-32 bg-background editorial-border-b">
      <div className="max-w-6xl mx-auto px-8 md:px-16 flex flex-col md:flex-row gap-24">
        
        {/* Left Column: Experience */}
        <div className="w-full md:w-1/2">
          <h2 className="fade-up font-display text-3xl md:text-4xl text-foreground mb-16">
            Experience Log
          </h2>

          <div className="flex flex-col gap-12">
            {experience.map((exp, i) => (
              <div key={i} className="fade-up flex flex-col gap-3">
                <div className="flex justify-between items-baseline border-b border-foreground/10 pb-2">
                  <h3 className="font-sans text-lg text-foreground font-medium">{exp.role}</h3>
                  <span className="font-sans text-xs text-foreground/40 tracking-widest">{exp.timeline}</span>
                </div>
                <p className="font-sans text-sm tracking-[0.1em] text-accent uppercase">
                  {exp.focus}
                </p>
                <p className="font-sans text-sm text-foreground/70 font-light leading-relaxed">
                  {exp.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Capabilities */}
        <div className="w-full md:w-1/2">
          <h2 className="fade-up font-display text-3xl md:text-4xl text-foreground mb-16">
            System Specs
          </h2>

          <div className="flex flex-col gap-12">
            {capabilities.map((cap, i) => (
              <div key={i} className="fade-up flex flex-col gap-3">
                <h3 className="font-sans text-lg text-foreground font-medium pb-2 border-b border-foreground/10">
                  {cap.domain}
                </h3>
                <p className="font-sans text-sm text-foreground/60 font-light leading-relaxed tracking-wide">
                  {cap.tools}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
