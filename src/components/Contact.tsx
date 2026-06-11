"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Contact() {
  const emailRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!emailRef.current) return;

    const chars = emailRef.current.querySelectorAll('.email-char');

    chars.forEach((char) => {
      // Mouse move distortion effect
      const handleMouseMove = (e: MouseEvent) => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;
        
        const distX = e.clientX - charCenterX;
        const distY = e.clientY - charCenterY;
        const dist = Math.sqrt(distX * distX + distY * distY);
        
        // React if mouse is within 150px
        if (dist < 150) {
          const intensity = (150 - dist) / 150;
          gsap.to(char, {
            scale: 1 + intensity * 0.4,
            y: -intensity * 15,
            rotation: (distX / 150) * 10 * intensity,
            fontWeight: 700, // Increase weight slightly
            duration: 0.2,
            ease: "power2.out",
          });
        } else {
          gsap.to(char, {
            scale: 1,
            y: 0,
            rotation: 0,
            fontWeight: 300, // Back to light editorial weight
            duration: 0.6,
            ease: "power3.out",
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(char, {
          scale: 1,
          y: 0,
          rotation: 0,
          fontWeight: 300,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove as EventListener);
      char.addEventListener("mouseleave", handleMouseLeave);

      (char as any)._cleanup = () => {
        window.removeEventListener("mousemove", handleMouseMove as EventListener);
        char.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => {
      chars.forEach((char: any) => {
        if (char._cleanup) char._cleanup();
      });
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("eminentavra9836@gmail.com");
    setCopied(true);
    
    // Invert screen effect (Cinematic flash)
    const body = document.body;
    body.style.filter = "invert(1)";
    body.style.backgroundColor = "#F0EDE8";
    
    setTimeout(() => {
      body.style.filter = "none";
      body.style.backgroundColor = "";
    }, 150);

    setTimeout(() => setCopied(false), 2000);
  };

  const emailText = "eminentavra9836@gmail.com";

  return (
    <section id="contact" className="w-full min-h-[90vh] bg-transparent px-6 md:px-12 py-16 flex flex-col justify-between relative border-t border-border">
      
      {/* Ghost Background Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 overflow-hidden w-full text-center pointer-events-none select-none">
        <span className="font-display text-[30vw] leading-none tracking-tighter ghost-text opacity-10">
          CONTACT
        </span>
      </div>

      {/* Toast */}
      <div 
        className={`fixed bottom-12 left-1/2 -translate-x-1/2 bg-accent text-[#000000] font-sans text-[11px] font-bold tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300 z-50 ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
      >
        COPIED
      </div>

      <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-secondary-text relative z-10">
        — 05 / CONTACT
      </div>

      <div className="w-full flex justify-center py-32 relative z-10">
        <div 
          ref={emailRef} 
          onClick={handleCopy}
          className="font-display text-[7vw] md:text-[6vw] font-[300] tracking-tighter leading-none cursor-pointer select-none flex flex-wrap justify-center text-primary-text"
        >
          {emailText.split("").map((char, i) => (
            <span key={i} className="email-char inline-block origin-bottom transition-colors">
              {char}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
        <div className="flex gap-12 font-sans text-[12px] uppercase tracking-[0.2em]">
          <a href="https://github.com/AvraCodes" target="_blank" rel="noreferrer" className="clip-link text-primary-text" data-text="GITHUB">
            <span>GITHUB</span>
          </a>
          <a href="https://linkedin.com/in/avra-paul-1924631b5/" target="_blank" rel="noreferrer" className="clip-link text-primary-text" data-text="LINKEDIN">
            <span>LINKEDIN</span>
          </a>
        </div>
        
        <div className="font-sans text-[10px] text-secondary-text text-right uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
          Built to get a job. Stayed to make it worth looking at.
        </div>
      </div>
    </section>
  );
}
