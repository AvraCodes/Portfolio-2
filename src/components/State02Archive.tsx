"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const projects = [
  {
    id: "01",
    title: "ALVYN V2",
    desc: "AI Data Analyst Agent. Automates scraping, analysis, visualization via REST API.",
    tech: ["FastAPI", "Python", "LLMs"],
    image: "/images/editorial-alvyn.png",
    link: "https://github.com/AvraCodes/Alvyn-V2"
  },
  {
    id: "02",
    title: "JOB QUEUE",
    desc: "Distributed Job Queue & Observability Dashboard. Real-time job monitoring at scale.",
    tech: ["Redis", "WebSockets", "Docker"],
    image: "/images/editorial-queue.png",
    link: "#"
  },
  {
    id: "03",
    title: "AIRMAN SKYNET",
    desc: "Aviation ops platform. Role-based access, sortie dispatch, audit logging.",
    tech: ["FastAPI", "Next.js", "RBAC"],
    image: "/images/editorial-manifesto.png",
    link: "https://airman-two.vercel.app"
  },
  {
    id: "04",
    title: "RAG CHATBOT",
    desc: "Retrieval-augmented education tool leveraging vector databases.",
    tech: ["Python", "Vector DBs"],
    image: "/images/editorial-ml.png",
    link: "https://rag-chatbot-five-pi.vercel.app"
  }
];

export default function State02Archive({ systemExposed }: { systemExposed: boolean }) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    // Reveal Surface
    if (surfaceRef.current && !systemExposed) {
      gsap.fromTo(surfaceRef.current.querySelectorAll('.st2-reveal'),
        { clipPath: "inset(0 0 100% 0)", y: 20 },
        { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.8, ease: "power4.out", stagger: 0.1, delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    if (systemExposed) {
      gsap.to(surfaceRef.current, { opacity: 0, filter: "blur(10px)", duration: 0.2 });
      gsap.fromTo(systemRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.2, delay: 0.1 }
      );
    } else {
      gsap.to(systemRef.current, { opacity: 0, scale: 0.95, duration: 0.2 });
      gsap.to(surfaceRef.current, { opacity: 1, filter: "blur(0px)", duration: 0.4, ease: "expo.out", delay: 0.1 });
    }
  }, [systemExposed]);

  const handleNextProject = () => {
    if (systemExposed) return;
    
    gsap.to(surfaceRef.current?.querySelectorAll('.st2-reveal'), {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        setActiveIdx((prev) => (prev + 1) % projects.length);
        gsap.fromTo(surfaceRef.current?.querySelectorAll('.st2-reveal'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.05 }
        );
      }
    });
  };

  const project = projects[activeIdx];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      
      {/* REALITY 1: THE SURFACE */}
      <div 
        ref={surfaceRef} 
        className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12"
        onClick={handleNextProject}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          <span className="font-display text-[60vh] leading-none tracking-tighter ghost-text opacity-20 select-none">
            {project.id}
          </span>
        </div>

        <div className="z-10 w-full max-w-5xl aspect-[21/9] relative st2-reveal cursor-pointer group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover cinematic-img"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary-text">CLICK TO CYCLE</span>
          </div>
        </div>

        <div className="z-10 w-full max-w-5xl mt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col">
            <h2 className="st2-reveal font-display text-[48px] md:text-[64px] font-bold leading-none uppercase text-primary-text tracking-tighter">
              {project.title}
            </h2>
            <p className="st2-reveal font-sans text-[12px] uppercase tracking-[0.1em] text-secondary-text mt-4 max-w-sm leading-relaxed">
              {project.desc}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 st2-reveal">
            <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-secondary-text">
              {project.tech.join(" · ")}
            </div>
            <a 
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-border hover:bg-primary-text hover:text-background transition-colors duration-300 font-sans text-[11px] font-bold tracking-[0.2em] uppercase"
              onClick={(e) => e.stopPropagation()} // Prevent cycling when clicking link
            >
              VIEW PROJECT
            </a>
          </div>
        </div>

      </div>

      {/* REALITY 2: THE SYSTEM */}
      <div ref={systemRef} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none bg-[#020202]">
        <pre className="system-text text-xs md:text-sm text-left p-8 md:p-16 w-full max-w-4xl whitespace-pre-wrap leading-relaxed overflow-hidden">
{`const ARCHIVE_DB = [
  {
    "id": "01_ALVYN",
    "type": "AI_AGENT",
    "stack": ["FastAPI", "Python", "LLMs"],
    "status": "DEPLOYED",
    "endpoint": "/api/v2/alvyn"
  },
  {
    "id": "02_QUEUE",
    "type": "DISTRIBUTED_SYSTEM",
    "stack": ["Redis", "WebSockets", "Docker"],
    "throughput": "10k_req_sec",
    "status": "MONITORING"
  },
  {
    "id": "03_AIRMAN",
    "type": "AUTH_PLATFORM",
    "stack": ["FastAPI", "Next.js", "RBAC"],
    "security_level": "RESTRICTED"
  }
];

> SELECT * FROM ARCHIVE_DB WHERE status='DEPLOYED';
> Waiting for query execution...`}
        </pre>
      </div>

    </div>
  );
}
