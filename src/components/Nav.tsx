"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    
    // Simple fade in on load
    gsap.fromTo(
      navRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.out", delay: 1 }
    );
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-start px-6 md:px-12 py-8 mix-blend-difference"
    >
      <div className="font-sans text-[11px] uppercase tracking-[0.3em] text-primary-text font-medium">
        AVRA PAUL
      </div>
      
      <div className="hidden md:flex flex-col items-end gap-2 font-sans text-[11px] uppercase tracking-[0.3em] text-primary-text font-medium">
        <a href="#work" className="clip-link" data-text="WORK"><span>WORK</span></a>
        <a href="#about" className="clip-link" data-text="ABOUT"><span>ABOUT</span></a>
        <a href="#contact" className="clip-link" data-text="CONTACT"><span>CONTACT</span></a>
      </div>
    </nav>
  );
}
