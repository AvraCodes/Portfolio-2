"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.fade-in'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-32 bg-background flex flex-col items-center justify-center text-center px-8">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <span className="fade-in font-sans text-xs uppercase tracking-[0.2em] text-accent mb-8">
          Available for Opportunities
        </span>
        
        <h2 className="fade-in font-display text-5xl md:text-7xl text-foreground leading-tight mb-12">
          Let's build something <br/> <span className="italic">beautiful together.</span>
        </h2>
        
        <a 
          href="mailto:contact@avra.dev" 
          data-cursor-text="SAY HI"
          className="fade-in font-sans text-sm tracking-[0.2em] uppercase text-foreground pb-2 border-b border-foreground/20 hover:border-foreground transition-colors mb-24"
        >
          contact@avra.dev
        </a>

        <div className="fade-in flex gap-8 font-sans text-xs tracking-widest uppercase text-foreground/40">
          <a href="https://github.com/AvraCodes" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
          <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
        </div>
      </div>
    </section>
  );
}
