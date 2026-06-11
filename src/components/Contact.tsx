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
            scale: 1 + intensity * 0.5,
            y: -intensity * 20,
            rotation: (distX / 150) * 15 * intensity,
            fontWeight: 800,
            duration: 0.2,
            ease: "power2.out",
          });
        } else {
          gsap.to(char, {
            scale: 1,
            y: 0,
            rotation: 0,
            fontWeight: 400, // back to default font-weight
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
          fontWeight: 400,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove as EventListener);
      char.addEventListener("mouseleave", handleMouseLeave);

      // Store cleanup on element to avoid memory leaks
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
    
    // Invert screen effect
    document.body.classList.add("invert-screen");
    setTimeout(() => {
      document.body.classList.remove("invert-screen");
    }, 150);

    setTimeout(() => setCopied(false), 2000);
  };

  const emailText = "eminentavra9836@gmail.com";

  return (
    <section id="contact" className="w-full min-h-[90vh] bg-background px-4 md:px-8 py-16 flex flex-col justify-between relative">
      
      {/* Toast */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-accent text-black font-sans text-[11px] font-bold tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 z-50 ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
      >
        COPIED
      </div>

      <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-foreground/70">
        — 05 / CONTACT
      </div>

      <div className="w-full flex justify-center py-32">
        <div 
          ref={emailRef} 
          onClick={handleCopy}
          className="font-display text-[8vw] md:text-[6vw] tracking-tighter leading-none cursor-pointer select-none flex flex-wrap justify-center"
        >
          {emailText.split("").map((char, i) => (
            <span key={i} className="email-char inline-block origin-bottom transition-colors">
              {char}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="flex gap-12 font-sans text-[12px] uppercase tracking-[0.2em]">
          <a href="https://github.com/AvraCodes" target="_blank" rel="noreferrer" className="clip-link" data-text="GITHUB">
            <span>GITHUB</span>
          </a>
          <a href="https://linkedin.com/in/avra-paul-1924631b5/" target="_blank" rel="noreferrer" className="clip-link" data-text="LINKEDIN">
            <span>LINKEDIN</span>
          </a>
        </div>
        
        <div className="font-sans text-[10px] text-foreground/60 text-right uppercase tracking-widest max-w-[200px] leading-relaxed">
          Built to get a job. Stayed to make it worth looking at.
        </div>
      </div>
    </section>
  );
}
