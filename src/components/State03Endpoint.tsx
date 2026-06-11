"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function State03Endpoint({ systemExposed }: { systemExposed: boolean }) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [logTicks, setLogTicks] = useState(0);

  useEffect(() => {
    if (surfaceRef.current && !systemExposed) {
      gsap.fromTo(surfaceRef.current.querySelectorAll('.st3-reveal'),
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.out", stagger: 0.1, delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    if (systemExposed) {
      gsap.to(surfaceRef.current, { opacity: 0, filter: "blur(10px)", duration: 0.2 });
      gsap.fromTo(systemRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.2, delay: 0.1 }
      );
    } else {
      gsap.to(systemRef.current, { opacity: 0, scale: 0.95, duration: 0.2 });
      gsap.to(surfaceRef.current, { opacity: 1, filter: "blur(0px)", duration: 0.4, ease: "expo.out", delay: 0.1 });
    }
  }, [systemExposed]);

  useEffect(() => {
    if (systemExposed) {
      const interval = setInterval(() => setLogTicks(t => t + 1), 800);
      return () => clearInterval(interval);
    }
  }, [systemExposed]);

  const handleCopy = () => {
    navigator.clipboard.writeText("eminentavra9836@gmail.com");
    setCopied(true);
    
    // Cinematic flash
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
    <div className="relative w-full h-full flex items-center justify-center">
      
      {/* REALITY 1: THE SURFACE */}
      <div ref={surfaceRef} className="absolute inset-0 flex flex-col justify-between px-6 md:px-12 py-16">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          <span className="font-display text-[25vw] leading-none tracking-tighter ghost-text opacity-10 select-none">
            ENDPOINT
          </span>
        </div>

        <div className="st3-reveal font-sans text-[11px] uppercase tracking-[0.2em] text-secondary-text z-10">
          — FINAL / CONTACT
        </div>

        <div className="flex justify-center w-full z-10">
          <div 
            ref={emailRef} 
            onClick={handleCopy}
            className="st3-reveal font-display text-[7vw] md:text-[6vw] font-[300] tracking-tighter leading-none cursor-pointer select-none text-primary-text hover:font-[700] hover:scale-105 transition-all duration-300"
          >
            {emailText}
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-end gap-8 z-10">
          <div className="flex gap-12 font-sans text-[12px] uppercase tracking-[0.2em]">
            <a href="https://github.com/AvraCodes" target="_blank" rel="noreferrer" className="st3-reveal text-primary-text hover:text-accent transition-colors">
              GITHUB
            </a>
            <a href="https://linkedin.com/in/avra-paul-1924631b5/" target="_blank" rel="noreferrer" className="st3-reveal text-primary-text hover:text-accent transition-colors">
              LINKEDIN
            </a>
          </div>
          
          <div className="st3-reveal font-sans text-[10px] text-secondary-text text-right uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
            Built to get a job. Stayed to make it worth looking at.
          </div>
        </div>

        {copied && (
          <div className="fixed bottom-1/4 left-1/2 -translate-x-1/2 bg-accent text-[#000] font-sans text-[11px] font-bold tracking-[0.2em] uppercase px-6 py-3 z-50">
            COPIED
          </div>
        )}
      </div>

      {/* REALITY 2: THE SYSTEM */}
      <div ref={systemRef} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none bg-[#020202]">
        <pre className="system-text text-xs md:text-sm text-left p-8 md:p-16 w-full max-w-4xl whitespace-pre-wrap leading-relaxed">
{`> INITIATING WEBSOCKET CONNECTION...
> wss://avra.paul/system/endpoint
> STATUS: CONNECTED (101 Switching Protocols)

[SYS_LOG] Listening for incoming payload...
[SYS_LOG] Target email: eminentavra9836@gmail.com
[SYS_LOG] Target Github: github.com/AvraCodes

${Array.from({length: logTicks % 5}).map(() => `[HEARTBEAT] PING server OK...`).join('\n')}
${logTicks % 5 === 4 ? '> Ready for transmission.' : ''}
<span className="animate-pulse">_</span>`}
        </pre>
      </div>

    </div>
  );
}
