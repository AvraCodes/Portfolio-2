"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-[70vh] bg-foreground text-background flex flex-col justify-center items-center text-center px-4 overflow-hidden relative">
      <div className="absolute top-8 left-8 font-sans text-xs tracking-[0.2em] uppercase font-bold text-background/50">
        Inquiries
      </div>

      <h2 
        ref={textRef} 
        className="font-display text-[12vw] leading-[0.8] tracking-tighter uppercase mb-16 hover:italic transition-all duration-500 cursor-pointer"
        data-cursor-text="EMAIL"
        onClick={() => window.location.href = "mailto:contact@avra.dev"}
      >
        CONTACT
      </h2>

      <div className="flex gap-16 font-sans text-xs tracking-[0.2em] uppercase font-bold absolute bottom-8">
        <a href="https://github.com/AvraCodes" target="_blank" rel="noreferrer" className="hover:text-background/50 transition-colors">GitHub</a>
        <a href="#" className="hover:text-background/50 transition-colors">LinkedIn</a>
      </div>
    </section>
  );
}
