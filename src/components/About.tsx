"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const words = textRef.current.querySelectorAll('.word');
    
    gsap.fromTo(
      words,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  const text = "Backend is where I live. Frontend is where I make things feel alive. Machine Learning is the invisible gap between the two.";
  const words = text.split(" ");

  return (
    <section 
      ref={sectionRef}
      className="w-full min-h-[80vh] flex flex-col justify-center px-4 md:px-16 py-32 bg-background border-t border-foreground/10"
    >
      <div className="max-w-[90vw] mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-start">
        
        {/* Abstract Data Definition */}
        <div className="w-full md:w-1/4 font-sans text-xs uppercase tracking-[0.2em] font-medium leading-loose pt-4">
          The Manifesto <br/>
          <span className="text-foreground/40 mt-4 block">
            A precise balance between architectural logic and aesthetic compulsion. Vol. 01.
          </span>
        </div>

        {/* Massive Drop Cap Text */}
        <div 
          ref={textRef} 
          className="w-full md:w-3/4 font-display text-5xl md:text-7xl lg:text-[7vw] leading-[0.85] tracking-tighter"
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-3 md:mr-6 pb-2">
              {i === 0 ? (
                <span className="float-left text-[20vw] leading-[0.6] pr-4 mt-2 italic">{word[0]}</span>
              ) : null}
              {i === 0 ? word.slice(1) : word}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
