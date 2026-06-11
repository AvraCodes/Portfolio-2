"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "./SplitText";

export default function State01Identity({ systemExposed }: { systemExposed: boolean }) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial Load Animation for Surface
    if (surfaceRef.current && !systemExposed) {
      const chars = surfaceRef.current.querySelectorAll('.char');
      gsap.fromTo(chars, 
        { y: "100%" }, 
        { y: "0%", duration: 1, ease: "expo.out", stagger: 0.02, delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    if (systemExposed) {
      // Shatter surface, reveal system
      gsap.to(surfaceRef.current, { opacity: 0, scale: 1.05, filter: "blur(10px)", duration: 0.2 });
      gsap.fromTo(systemRef.current, 
        { opacity: 0, scale: 0.95, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.2, delay: 0.1 }
      );
    } else {
      // Hide system, snap surface back
      gsap.to(systemRef.current, { opacity: 0, scale: 0.95, filter: "blur(10px)", duration: 0.2 });
      gsap.to(surfaceRef.current, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.4, ease: "expo.out", delay: 0.1 });
    }
  }, [systemExposed]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      
      {/* REALITY 1: THE SURFACE */}
      <div ref={surfaceRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        
        {/* Massive Ghost Typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full text-center">
          <span className="font-display text-[40vh] leading-none tracking-tighter ghost-text opacity-30 select-none">
            2026
          </span>
        </div>

        <div className="z-10 flex flex-col items-center w-full px-6">
          <h1 className="font-display text-[22vw] md:text-[20vw] font-[800] leading-[0.75] tracking-tighter uppercase text-primary-text text-center w-full overflow-hidden">
            <SplitText text="AVRA" />
          </h1>
          <h1 className="font-display text-[22vw] md:text-[20vw] font-[800] leading-[0.75] tracking-tighter uppercase text-primary-text text-center w-full overflow-hidden">
            <SplitText text="PAUL" />
          </h1>
          
          <p className="mt-12 font-sans text-[12px] uppercase tracking-[0.3em] text-primary-text/90">
            Systems Builder / Creative Frontend
          </p>
        </div>
      </div>

      {/* REALITY 2: THE SYSTEM */}
      <div ref={systemRef} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none bg-[#020202]">
        <pre className="system-text text-xs md:text-sm text-left p-8 md:p-16 w-full max-w-4xl whitespace-pre-wrap leading-relaxed">
{`{
  "node_id": "usr_avra_paul",
  "status": "active",
  "timestamp": ${Date.now()},
  "architecture": {
    "frontend": ["React", "Next.js", "GSAP", "Tailwind"],
    "backend": ["Python", "FastAPI", "Node.js", "PostgreSQL"],
    "infrastructure": ["Docker", "Redis", "WebSockets"]
  },
  "ml_pipeline": {
    "frameworks": ["Scikit-learn", "Vector DBs"],
    "patterns": ["RAG", "LLM Orchestration"],
    "current_loss": 0.042
  },
  "metrics": {
    "lighthouse_score": 98,
    "coffee_intake": "ERR_OVERFLOW",
    "design_tension": "maximum"
  }
}`}
        </pre>
      </div>

    </div>
  );
}
