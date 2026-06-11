"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Alvyn v2",
    desc: "Data analyst agent. Automates scraping, analysis, visualization via REST API.",
    tech: "FastAPI · Python · LLMs · REST",
    link: "https://github.com/AvraCodes/Alvyn-V2",
    image: "/images/editorial-alvyn.png"
  },
  {
    id: "02",
    title: "Job Queue",
    desc: "Real-time job monitoring at scale with observability dashboard.",
    tech: "FastAPI · Redis · WebSockets · PostgreSQL · Docker",
    link: "#",
    image: "/images/editorial-queue.png"
  },
  {
    id: "03",
    title: "AIRMAN Skynet",
    desc: "Aviation ops platform. Role-based access, sortie dispatch, audit logging.",
    tech: "FastAPI · Next.js · Role-Based Auth",
    link: "https://airman-two.vercel.app",
    image: "/images/editorial-manifesto.png"
  },
  {
    id: "04",
    title: "RAG Chatbot",
    desc: "Retrieval-Augmented Generation chatbot for education.",
    tech: "Python · Vector Databases · LLMs",
    link: "https://rag-chatbot-five-pi.vercel.app",
    image: "/images/editorial-ml.png"
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
      if (i === 0) return; 
      const line = panel.querySelector('.entry-line');
      const contentCuts = panel.querySelectorAll('.cinematic-cut');
      
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
      
      gsap.fromTo(contentCuts, 
        { clipPath: "inset(0 0 100% 0)" }, 
        { 
          clipPath: "inset(0 0 0% 0)", 
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.1,
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
      className="w-full h-screen bg-transparent overflow-hidden relative border-t border-border"
    >
      <div className="absolute top-8 left-6 md:left-12 font-sans text-[11px] uppercase tracking-[0.2em] z-10 text-secondary-text">
        — 03 / SELECTED WORK
      </div>

      <div 
        ref={scrollWrapperRef}
        className="flex w-[400vw] h-full"
      >
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className="work-panel w-[100vw] h-full flex relative items-center justify-center"
          >
            {/* Entry Line (drawn on scroll) */}
            {index > 0 && (
              <div className="entry-line absolute left-0 top-0 w-[1px] bg-border z-20 h-0" />
            )}

            <div className="w-full h-full relative flex flex-col justify-center px-6 md:px-12 pt-24 pb-12">
              
              {/* Ghost Number Behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans text-[40vh] font-[100] ghost-text opacity-30 leading-none select-none z-0">
                {project.id}
              </div>

              {/* Film Still Image */}
              <div className="cinematic-cut overflow-hidden w-full max-w-5xl mx-auto aspect-[16/7] relative z-10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover cinematic-img"
                  priority={index === 0}
                />
              </div>

              {/* Metadata Overlay / Underneath */}
              <div className="w-full max-w-5xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-start md:items-end z-10 gap-8">
                
                <div className="flex flex-col gap-2">
                  <div className="cinematic-cut overflow-hidden">
                    <h3 className="font-display text-[48px] md:text-[64px] font-bold leading-none uppercase text-primary-text">
                      {project.title}
                    </h3>
                  </div>
                  <div className="cinematic-cut overflow-hidden max-w-md">
                    <p className="font-sans text-[14px] font-[300] tracking-wide text-secondary-text">
                      {project.desc}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-6">
                  <div className="cinematic-cut overflow-hidden">
                    <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-secondary-text">
                      {project.tech}
                    </div>
                  </div>
                  <div className="cinematic-cut overflow-hidden">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="clip-link font-sans text-[12px] font-bold tracking-widest uppercase text-primary-text"
                      data-text="VIEW →"
                    >
                      <span>VIEW →</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
