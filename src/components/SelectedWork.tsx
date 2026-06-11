"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Alvyn v2",
    stack: ["Python", "FastAPI", "RAG", "LLMs"],
    primaryStack: "RAG",
    impact: "AI assistant automating data scraping & analysis via REST API.",
    link: "https://alvyn-v2.vercel.app",
    image: "/images/project-alvyn.png",
    meta: "SYS.DEPLOY: VERCEL // LATENCY: <200ms"
  },
  {
    id: "02",
    title: "Job Queue",
    stack: ["FastAPI", "Redis", "WebSockets", "Docker"],
    primaryStack: "WebSockets",
    impact: "Real-time job monitoring at scale with full observability.",
    link: "#",
    image: "/images/project-queue.png",
    meta: "ARCH: DISTRIBUTED // NODE: CLUSTER_04"
  },
  {
    id: "03",
    title: "ML Classifier",
    stack: ["NLP/ML", "scikit-learn", "Python"],
    primaryStack: "scikit-learn",
    impact: "Competition-grade multi-class comment classification pipeline.",
    link: "https://github.com/AvraCodes/MLP-proj",
    image: "/images/project-ml.png",
    meta: "MODEL: DNN // ACCURACY: ~80% KAGGLE"
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = scrollWrapperRef.current;
    
    if (!section || !wrapper) return;

    const scrollAmount = wrapper.scrollWidth - window.innerWidth;

    const tween = gsap.to(wrapper, {
      x: -scrollAmount,
      ease: "none",
    });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${scrollAmount}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    // Image Parallax Effect during horizontal scroll
    imageRefs.current.forEach((img, i) => {
      if (img) {
        gsap.to(img, {
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          }
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section 
      id="work"
      ref={sectionRef} 
      className="h-screen w-full overflow-hidden bg-background relative brutal-border-b"
    >
      <div className="absolute top-8 left-8 z-50 pointer-events-none mix-blend-difference text-white flex gap-8">
        <h2 className="text-sm font-sans uppercase tracking-[0.2em]">
          [03] Selected Work
        </h2>
        <span className="text-sm font-sans uppercase tracking-[0.2em] opacity-50 hidden md:block">
          SCROLL_X // DRAG
        </span>
      </div>

      <div 
        ref={scrollWrapperRef}
        className="flex h-full w-[300vw]"
        data-cursor-text="DRAG"
      >
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className="w-screen h-full flex flex-col md:flex-row items-stretch brutal-border-r relative group"
          >
            {/* Left: Metadata & Title (30%) */}
            <div className="w-full md:w-[30%] h-full p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-foreground bg-background relative z-20">
              <div className="flex justify-between items-start mt-16 md:mt-0">
                <span className="font-display text-6xl md:text-[8vw] leading-none text-foreground">{project.id}</span>
              </div>
              
              <div>
                <div className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-4 font-mono">
                  {project.meta}
                </div>
                <h3 className="font-display text-5xl md:text-7xl uppercase mb-6 leading-[0.85] tracking-tighter">
                  {project.title}
                </h3>
                <p className="font-sans text-base md:text-lg uppercase tracking-wide opacity-80 mb-8 border-l-2 border-foreground pl-4">
                  {project.impact}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.stack.map(tech => (
                    <span 
                      key={tech} 
                      className={`px-3 py-1 text-xs uppercase font-sans brutal-border transition-colors duration-300 ${tech === project.primaryStack ? 'bg-foreground text-background' : ''}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                data-cursor="hover"
                className="flex items-center justify-between font-sans text-xl uppercase brutal-border px-6 py-4 hover:bg-accent hover:text-black transition-colors w-full group/btn"
              >
                <span>Initialize</span>
                <ArrowUpRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </a>
            </div>

            {/* Right: Massive Image (70%) */}
            <div className="w-full md:w-[70%] h-full relative overflow-hidden bg-[#0a0a0a]">
              {/* Animated Border on Hover */}
              <div className="absolute inset-4 z-30 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <rect 
                    className="w-full h-full fill-none stroke-accent stroke-[2px] transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100"
                    style={{
                      strokeDasharray: "4000",
                      strokeDashoffset: "4000",
                    }}
                  />
                </svg>
                <style jsx>{`
                  .group:hover svg rect {
                    stroke-dashoffset: 0;
                  }
                `}</style>
              </div>

              <div className="absolute inset-0 grayscale contrast-150 mix-blend-luminosity">
                <Image
                  ref={el => { imageRefs.current[index] = el; }}
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover scale-110"
                />
              </div>
              
              {/* Duotone Accent Overlay */}
              <div className="absolute inset-0 bg-accent mix-blend-multiply opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 md:hidden"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
