"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cuts = sectionRef.current.querySelectorAll('.cinematic-cut');

    gsap.fromTo(
      cuts,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full min-h-[80vh] py-32 px-6 md:px-12 relative flex flex-col justify-center border-t border-border">
      
      {/* Ghost Background Text */}
      <div className="absolute top-0 right-0 z-0 h-full overflow-hidden flex items-center justify-end pr-12">
        <span className="font-display text-[30vh] leading-none tracking-tighter ghost-text opacity-20" style={{ writingMode: 'vertical-rl' }}>
          AVRA
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Left Column - Manifesto */}
        <div className="md:col-span-5 md:col-start-2">
          <div className="cinematic-cut overflow-hidden mb-12">
            <h2 className="font-sans text-[11px] uppercase tracking-[0.2em] text-secondary-text">
              — 02 / MANIFESTO
            </h2>
          </div>
          
          <div className="cinematic-cut overflow-hidden">
            <p className="font-display text-[28px] md:text-[36px] leading-[1.2] font-light text-primary-text">
              Backend is where I live.<br/>
              Frontend is where I make things feel alive.<br/>
              ML is the gap I close between the two.<br/><br/>
              I co-founded an agency.<br/>
              I also compete on Kaggle.<br/>
              Neither surprises me.
            </p>
          </div>
        </div>

        {/* Right Column - Education Facts */}
        <div className="md:col-span-4 md:col-start-8 flex flex-col justify-end mt-16 md:mt-32">
          
          <div className="cinematic-cut overflow-hidden border-b border-border pb-4 mb-4 flex flex-col">
            <span className="font-sans text-[13px] font-semibold tracking-wide text-primary-text mb-1">
              B.S. DATA SCIENCE
            </span>
            <span className="font-sans text-[11px] font-light text-secondary-text tracking-[0.2em] uppercase">
              IIT Madras online programme, 2027
            </span>
          </div>

          <div className="cinematic-cut overflow-hidden border-b border-border pb-4 flex flex-col">
            <span className="font-sans text-[13px] font-semibold tracking-wide text-primary-text mb-1">
              B.TECH INFORMATION TECHNOLOGY
            </span>
            <span className="font-sans text-[11px] font-light text-secondary-text tracking-[0.2em] uppercase">
              University of Kalyani, 2027
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
