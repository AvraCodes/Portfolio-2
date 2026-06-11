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
    stack: "Python, FastAPI, RAG, LLMs",
    impact: "AI assistant automating data scraping & analysis via REST API.",
    link: "https://alvyn-v2.vercel.app",
    image: "/images/editorial-alvyn.png",
  },
  {
    id: "02",
    title: "Job Queue",
    stack: "FastAPI, Redis, WebSockets, Docker",
    impact: "Real-time job monitoring at scale with full observability.",
    link: "#",
    image: "/images/editorial-queue.png",
  },
  {
    id: "03",
    title: "ML Classifier",
    stack: "NLP/ML, scikit-learn, Python",
    impact: "Competition-grade multi-class comment classification pipeline.",
    link: "https://github.com/AvraCodes/MLP-proj",
    image: "/images/editorial-ml.png",
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.work-item');
    
    items.forEach((item) => {
      const img = item.querySelector('.work-img');
      const text = item.querySelector('.work-text');

      gsap.fromTo(
        img,
        { clipPath: "inset(10% 10% 10% 10%)", scale: 1.1, opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(
        text,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        }
      );
    });

  }, []);

  return (
    <section 
      id="work"
      ref={sectionRef} 
      className="w-full py-32 bg-background editorial-border-b"
    >
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/40 mb-24 text-center">
          Selected Works
        </h2>

        <div className="flex flex-col gap-32 md:gap-48">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`work-item flex flex-col gap-12 md:gap-24 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              {/* Image Container */}
              <div className="w-full md:w-7/12 aspect-[4/3] relative overflow-hidden bg-foreground/5 rounded-sm">
                <div className="work-img absolute inset-0 w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text Container */}
              <div className="work-text w-full md:w-5/12 flex flex-col items-center md:items-start text-center md:text-left">
                <span className="font-sans text-xs tracking-widest text-accent mb-4">
                  {project.id}
                </span>
                <h3 className="font-display text-4xl md:text-5xl mb-6 text-foreground">
                  {project.title}
                </h3>
                <p className="font-sans text-base text-foreground/70 font-light leading-relaxed mb-6">
                  {project.impact}
                </p>
                <div className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/40 mb-10">
                  {project.stack}
                </div>
                
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  data-cursor-text="VIEW"
                  className="font-sans text-xs tracking-widest uppercase pb-2 border-b border-foreground/20 hover:border-foreground transition-colors"
                >
                  Explore Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
