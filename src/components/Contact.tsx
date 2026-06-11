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
      sectionRef.current.querySelectorAll('.footer-fade'),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <footer id="contact" ref={sectionRef} className="w-full py-16 px-6 border-t border-white/5 relative z-10 bg-background/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="footer-fade text-2xl font-bold tracking-tight mb-2">Let's Connect</h2>
          <p className="footer-fade text-foreground/60 max-w-sm">
            I'm currently available for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        <div className="footer-fade flex flex-col items-center md:items-end gap-6">
          <a 
            href="mailto:eminentavra9836@gmail.com"
            className="px-8 py-4 bg-accent text-white font-medium rounded-full shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-1"
          >
            eminentavra9836@gmail.com
          </a>
          
          <div className="flex gap-6 text-sm font-medium text-foreground/70">
            <a href="https://github.com/AvraCodes" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/avra-paul-1924631b5/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>

      </div>
      
      <div className="footer-fade max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/40">
        <p>© 2026 Avra Paul. Built to get a job.</p>
        <p>Stayed to make it worth looking at.</p>
      </div>
    </footer>
  );
}
