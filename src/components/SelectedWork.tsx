"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Alvyn v2",
    stack: ["Python", "FastAPI", "RAG", "LLMs"],
    primaryStack: "RAG",
    impact: "AI assistant automating data scraping & analysis via REST API.",
    link: "https://alvyn-v2.vercel.app",
  },
  {
    id: "02",
    title: "Dist. Job Queue",
    stack: ["FastAPI", "Redis", "WebSockets", "Docker"],
    primaryStack: "WebSockets",
    impact: "Real-time job monitoring at scale with full observability.",
    link: "#",
  },
  {
    id: "03",
    title: "Kaggle Classifier",
    stack: ["NLP/ML", "scikit-learn", "Python"],
    primaryStack: "scikit-learn",
    impact: "Competition-grade multi-class comment classification pipeline.",
    link: "https://github.com/AvraCodes/MLP-proj",
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = scrollWrapperRef.current;
    
    if (!section || !wrapper) return;

    // We calculate how far we need to translate horizontally
    // 3 panels of 100vw each = 300vw total width. We translate by -200vw.
    const scrollAmount = wrapper.scrollWidth - window.innerWidth;

    const tween = gsap.to(wrapper, {
      x: -scrollAmount,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${scrollAmount}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="work"
      ref={sectionRef} 
      className="h-screen w-full overflow-hidden bg-background relative brutal-border-b"
    >
      {/* Absolute section title */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h2 className="text-sm font-sans uppercase tracking-[0.2em] mix-blend-difference text-white">
          [03] Selected Work
        </h2>
      </div>

      <div 
        ref={scrollWrapperRef}
        className="flex h-full w-[300vw]"
      >
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className="w-screen h-full flex items-center justify-center p-4 md:p-16 brutal-border-r relative group"
          >
            {/* Background project number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[40vw] text-foreground opacity-5 pointer-events-none select-none">
              {project.id}
            </div>

            <div className="relative z-10 w-full max-w-4xl p-8 md:p-12 transition-transform duration-500 ease-out group-hover:scale-105">
              
              {/* SVG Animated Border */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <rect 
                  className="w-full h-full fill-none stroke-foreground stroke-[1px] transition-all duration-700 ease-in-out"
                  style={{
                    strokeDasharray: "3000",
                    strokeDashoffset: "3000",
                  }}
                />
              </svg>

              <style jsx>{`
                .group:hover svg rect {
                  stroke-dashoffset: 0;
                }
              `}</style>

              <div className="flex justify-between items-start mb-16 relative z-10">
                <span className="font-display text-4xl">{project.id}</span>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  data-cursor="hover"
                  className="p-4 brutal-border hover:bg-accent hover:text-black transition-colors"
                >
                  <ArrowUpRight className="w-6 h-6" />
                </a>
              </div>

              <h3 className="font-display text-6xl md:text-8xl uppercase mb-8 leading-none relative z-10 transition-transform duration-500 group-hover:translate-x-4">
                {project.title}
              </h3>

              <div className="flex flex-wrap gap-3 mb-8 relative z-10">
                {project.stack.map(tech => (
                  <span 
                    key={tech} 
                    className={`px-4 py-2 text-sm uppercase font-sans brutal-border transition-colors duration-300 ${tech === project.primaryStack ? 'group-hover:bg-accent group-hover:text-black' : ''}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="font-sans text-lg md:text-2xl uppercase tracking-wide relative z-10">
                {project.impact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
