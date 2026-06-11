"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const projects = [
  {
    id: "01",
    title: "ALVYN",
    stack: "AI / RAG",
    link: "https://alvyn-v2.vercel.app",
    image: "/images/editorial-alvyn.png",
  },
  {
    id: "02",
    title: "JOB QUEUE",
    stack: "DISTRIBUTED",
    link: "#",
    image: "/images/editorial-queue.png",
  },
  {
    id: "03",
    title: "CLASSIFIER",
    stack: "ML PIPELINE",
    link: "https://github.com/AvraCodes/MLP-proj",
    image: "/images/editorial-ml.png",
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Move all images to cursor position
      imgRefs.current.forEach((img) => {
        if (img) {
          gsap.to(img, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: "power3.out",
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="work"
      ref={sectionRef} 
      className="w-full py-32 bg-background border-t border-foreground/10 relative"
    >
      <div className="w-full px-4 md:px-8">
        <h2 className="font-sans text-xs uppercase tracking-[0.2em] font-bold mb-16 ml-4">
          The Archive // 2026
        </h2>

        <div className="flex flex-col w-full">
          {projects.map((project, index) => (
            <a 
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group relative w-full border-b border-foreground/10 py-8 md:py-12 flex flex-col md:flex-row md:items-end justify-between hover-reveal-text cursor-pointer hover:bg-foreground hover:text-background transition-colors duration-500 px-4"
              data-cursor-text="VIEW"
            >
              {/* Massive Typographic Title */}
              <h3 className="font-display text-[15vw] leading-[0.75] tracking-tighter m-0 uppercase z-10 transition-transform duration-500 group-hover:translate-x-8">
                {project.title}
              </h3>

              {/* Metadata */}
              <div className="flex gap-16 items-end mt-8 md:mt-0 z-10 transition-transform duration-500 group-hover:-translate-x-8">
                <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold">
                  {project.id}
                </span>
                <span className="font-sans text-xs tracking-[0.2em] uppercase max-w-[100px] text-right">
                  {project.stack}
                </span>
              </div>

              {/* Hover Reveal Image (Fixed to viewport via CSS, moved by GSAP) */}
              <div 
                ref={el => { imgRefs.current[index] = el; }}
                className="hover-reveal-img w-[300px] md:w-[450px] aspect-[3/4]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
