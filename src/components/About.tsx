"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');
    const facts = sectionRef.current.querySelectorAll('.fact-reveal');

    // Text scramble / reveal effect for manifesto
    gsap.fromTo(
      chars,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.1,
        stagger: 0.01,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        }
      }
    );

    // Fade up for education facts
    gsap.fromTo(
      facts,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );
  }, []);

  const manifestoText = "Backend is where I live. Frontend is where I make things feel alive. ML is the gap I close between the two. I co-founded an agency. I also compete on Kaggle. Neither surprises me.";

  return (
    <section ref={sectionRef} id="about" className="w-full min-h-screen py-32 px-4 md:px-8 bg-background flex flex-col justify-center">
      <div className="grid-12 items-start">
        
        {/* Left Column - Manifesto */}
        <div className="col-span-12 md:col-span-5 mb-16 md:mb-0">
          <div className="font-sans text-[11px] uppercase tracking-[0.2em] mb-12 text-foreground/70">
            — 02 / MANIFESTO
          </div>
          <div 
            ref={textRef}
            className="font-display text-[32px] md:text-[40px] leading-[1.1] font-light"
          >
            <SplitText text={manifestoText} />
          </div>
        </div>

        {/* Right Column - Education Facts */}
        <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-end h-full mt-16 md:mt-32">
          
          {/* Fact 1 */}
          <div className="fact-reveal border-b border-foreground/20 pb-4 mb-4 flex flex-col">
            <span className="font-sans text-[13px] font-semibold tracking-wide mb-1">
              B.S. DATA SCIENCE
            </span>
            <span className="font-sans text-[11px] font-light text-foreground/60 tracking-wider uppercase">
              IIT Madras online programme, 2027
            </span>
          </div>

          {/* Fact 2 */}
          <div className="fact-reveal border-b border-foreground/20 pb-4 flex flex-col">
            <span className="font-sans text-[13px] font-semibold tracking-wide mb-1">
              B.TECH INFORMATION TECHNOLOGY
            </span>
            <span className="font-sans text-[11px] font-light text-foreground/60 tracking-wider uppercase">
              University of Kalyani, 2027
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
