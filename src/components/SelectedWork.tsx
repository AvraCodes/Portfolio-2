"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Alvyn v2",
    desc: "Data analyst agent. Automates scraping, analysis, visualization via REST API.",
    tech: "FastAPI · Python · LLMs · REST",
    link: "https://github.com/AvraCodes/Alvyn-V2"
  },
  {
    id: "02",
    title: "Job Queue",
    desc: "Real-time job monitoring at scale with observability dashboard.",
    tech: "FastAPI · Redis · WebSockets · PostgreSQL · Docker",
    link: "#"
  },
  {
    id: "03",
    title: "AIRMAN Skynet",
    desc: "Aviation ops platform. Role-based access, sortie dispatch, audit logging.",
    tech: "FastAPI · Next.js · Role-Based Auth",
    link: "https://airman-two.vercel.app"
  },
  {
    id: "04",
    title: "RAG Chatbot",
    desc: "Retrieval-Augmented Generation chatbot for education.",
    tech: "Python · Vector Databases · LLMs",
    link: "https://rag-chatbot-five-pi.vercel.app"
  }
];

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;

    const panels = gsap.utils.toArray('.work-panel');

    // Horizontal Scroll
    const tl = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + containerRef.current!.offsetWidth * panels.length
      }
    });

    // Panel entry lines
    panels.forEach((panel: any, i) => {
      if (i === 0) return; // Skip first panel as it's already visible
      const line = panel.querySelector('.entry-line');
      const content = panel.querySelector('.panel-content');
      
      gsap.fromTo(line, 
        { height: "0%" }, 
        { 
          height: "100%", 
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tl,
            start: "left 75%",
            toggleActions: "play none none reverse"
          }
      });
      
      gsap.fromTo(content, 
        { opacity: 0, x: 50 }, 
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tl,
            start: "left 60%",
            toggleActions: "play none none reverse"
          }
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      id="work"
      ref={containerRef} 
      className="w-full h-screen bg-background overflow-hidden relative"
    >
      <div className="absolute top-8 left-4 md:left-8 font-sans text-[11px] uppercase tracking-[0.2em] z-10 text-foreground/70">
        — 03 / SELECTED WORK
      </div>

      <div 
        ref={scrollWrapperRef}
        className="flex w-[400vw] h-full"
      >
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className="work-panel w-[100vw] h-full flex relative px-4 md:px-16 items-center"
          >
            {/* Entry Line (drawn on scroll) */}
            {index > 0 && (
              <div className="entry-line absolute left-0 top-0 w-[2px] bg-foreground/20 z-0 h-0" />
            )}

            <div className="panel-content w-full h-full flex flex-col justify-center relative">
              
              {/* Ghost Number */}
              <div className="absolute top-1/4 left-0 font-sans text-[120px] font-[100] text-foreground/5 leading-none select-none">
                {project.id}
              </div>

              {/* Center Content */}
              <div className="z-10 mt-16 max-w-4xl">
                <h3 className="font-display text-[64px] md:text-[80px] font-bold leading-none mb-4 uppercase">
                  {project.title}
                </h3>
                
                {/* Clip-path reveal on hover for description */}
                <div className="group relative overflow-hidden inline-block cursor-default">
                  <p className="font-sans text-[14px] font-[300] tracking-wide mb-16 opacity-100 transition-opacity duration-300 group-hover:opacity-0 relative z-10">
                    {project.desc}
                  </p>
                  <p className="font-sans text-[14px] font-[300] tracking-wide mb-16 absolute top-0 left-0 text-accent transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                    {project.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Elements */}
              <div className="absolute bottom-16 left-0 w-full flex justify-between items-end pr-8 md:pr-32 z-10">
                <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/60 max-w-xs md:max-w-none">
                  {project.tech}
                </div>
                
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="clip-link font-sans text-[12px] font-bold tracking-widest uppercase"
                  data-text="VIEW →"
                >
                  <span>VIEW →</span>
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
