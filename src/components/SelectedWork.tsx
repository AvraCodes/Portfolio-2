"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Alvyn v2",
    description: "An intelligent Data Analyst agent that automates web scraping, data analysis, and visualization via a robust FastAPI REST backend.",
    tags: ["FastAPI", "Python", "LLMs", "REST"],
    link: "https://github.com/AvraCodes/Alvyn-V2",
    image: "/images/editorial-alvyn.png"
  },
  {
    title: "Distributed Job Queue",
    description: "A highly scalable job monitoring system with a real-time observability dashboard, handling thousands of tasks seamlessly.",
    tags: ["FastAPI", "Redis", "WebSockets", "Docker"],
    link: "#",
    image: "/images/editorial-queue.png"
  },
  {
    title: "AIRMAN Skynet",
    description: "A secure aviation operations platform featuring role-based access control, sortie dispatching, and comprehensive audit logging.",
    tags: ["FastAPI", "Next.js", "RBAC", "PostgreSQL"],
    link: "https://airman-two.vercel.app",
    image: "/images/editorial-manifesto.png"
  },
  {
    title: "RAG-Based AI Chatbot",
    description: "An educational chatbot utilizing Retrieval-Augmented Generation to provide context-aware, highly accurate responses.",
    tags: ["Python", "Vector DBs", "Machine Learning"],
    link: "https://rag-chatbot-five-pi.vercel.app",
    image: "/images/editorial-ml.png"
  }
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const cards = sectionRef.current.querySelectorAll('.project-card');
    
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  return (
    <section id="work" ref={sectionRef} className="w-full py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Selected Work</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            A showcase of distributed systems, machine learning pipelines, and the interfaces that power them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <a 
              key={i} 
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="project-card glass-card rounded-2xl overflow-hidden group flex flex-col block"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-white/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium flex items-center gap-2">
                    View Project <span className="text-accent">→</span>
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold tracking-tight mb-3">{project.title}</h3>
                <p className="text-foreground/70 leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs font-medium px-3 py-1 bg-white/10 rounded-full text-foreground/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
