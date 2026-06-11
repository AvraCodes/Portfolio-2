"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    // On scroll past hero (approx 100vh), nav background fills
    ScrollTrigger.create({
      start: "top -100px",
      end: 99999,
      toggleClass: { className: 'scrolled', targets: navRef.current },
    });
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 py-6 mix-blend-difference transition-all duration-300"
    >
      <style jsx>{`
        nav.scrolled {
          background-color: rgba(13, 13, 13, 0.95);
          border-bottom: 1px solid var(--foreground);
          mix-blend-mode: normal;
        }
      `}</style>
      
      <div className="font-sans text-[11px] uppercase tracking-[0.3em]">
        AVRA PAUL
      </div>
      
      <div className="hidden md:flex gap-8 font-sans text-[11px] uppercase tracking-[0.3em]">
        <a href="#work" className="clip-link" data-text="WORK"><span>WORK</span></a>
        <a href="#about" className="clip-link" data-text="ABOUT"><span>ABOUT</span></a>
        <a href="#contact" className="clip-link" data-text="CONTACT"><span>CONTACT</span></a>
      </div>
    </nav>
  );
}
