"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const elements = containerRef.current.querySelectorAll('.hero-element');
    
    gsap.fromTo(
      elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      }
    );
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-mesh overflow-hidden text-center pt-20">
      <div className="max-w-4xl flex flex-col items-center z-10" ref={containerRef}>
        
        <div className="hero-element inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-white/10 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-medium text-foreground/80 tracking-wide uppercase">Available for new opportunities</span>
        </div>

        <h1 className="hero-element text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Building distributed systems <br className="hidden md:block"/>
          <span className="text-foreground/50">&amp; machine learning pipelines.</span>
        </h1>
        
        <p className="hero-element text-lg md:text-xl text-foreground/60 max-w-2xl mb-12 leading-relaxed">
          I'm Avra, a Data Scientist and Full-Stack Developer. I engineer robust backend architectures and train ML models, then wrap them in beautiful, intuitive interfaces.
        </p>
        
        <div className="hero-element flex flex-col sm:flex-row gap-4">
          <a href="#work" className="px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:-translate-y-1">
            View Selected Work
          </a>
          <a href="https://github.com/AvraCodes" target="_blank" rel="noreferrer" className="px-8 py-4 glass text-foreground font-medium rounded-full hover:bg-white/10 transition-all hover:-translate-y-1">
            Explore GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
