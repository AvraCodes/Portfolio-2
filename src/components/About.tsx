"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current || !bgTextRef.current || !imgRef.current) return;

    // Scrub reveal text based on scroll position
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      }
    );

    // Parallax background text
    gsap.to(bgTextRef.current, {
      y: -200,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Image reveal
    gsap.fromTo(
      imgRef.current,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex flex-col md:flex-row border-b border-foreground overflow-hidden"
    >
      {/* Massive Background Outline Text */}
      <div 
        ref={bgTextRef}
        className="absolute top-1/4 left-0 w-full pointer-events-none select-none z-0 opacity-10"
      >
        <span className="font-display text-[25vw] leading-none text-transparent brutal-border-text stroke-foreground whitespace-nowrap overflow-hidden block">
          MANIFESTO MANIFESTO
        </span>
      </div>

      <style jsx>{`
        .brutal-border-text {
          -webkit-text-stroke: 1px var(--foreground);
        }
      `}</style>

      {/* Left Column: Image and Education */}
      <div className="w-full md:w-[45%] p-8 md:p-16 border-b md:border-b-0 md:border-r border-foreground flex flex-col justify-between relative z-10 bg-background/80 backdrop-blur-sm">
        <div>
          <h2 className="text-sm font-sans uppercase tracking-[0.2em] mb-12">
            [02] Core Logic
          </h2>
          <div ref={imgRef} className="w-full aspect-[4/5] relative bg-foreground/10 brutal-border overflow-hidden grayscale contrast-150 mix-blend-luminosity">
            <Image 
              src="/images/manifesto.png" 
              alt="Architectural structure representing systems" 
              fill 
              className="object-cover"
            />
            {/* Duotone Overlay */}
            <div className="absolute inset-0 bg-accent mix-blend-multiply opacity-50"></div>
          </div>
        </div>

        <div className="mt-16 space-y-8 border-t border-foreground pt-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-gray-500 mb-2">
                EDU.01 / Data Science
              </h3>
              <p className="font-sans text-sm md:text-base uppercase">IIT Madras (Online) <br/> Class of 2027</p>
            </div>
            <div>
              <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-gray-500 mb-2">
                EDU.02 / Info Tech
              </h3>
              <p className="font-sans text-sm md:text-base uppercase">University of Kalyani <br/> Class of 2027</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Statement */}
      <div className="w-full md:w-[55%] p-8 md:p-16 flex flex-col justify-center relative z-10 bg-background/80 backdrop-blur-sm">
        <div ref={textRef} className="font-sans text-3xl md:text-6xl lg:text-[5vw] leading-[1.1] uppercase tracking-tight">
          <span className="font-light block mb-4">Backend is where <br/> I live.</span>
          <span className="font-black text-accent block mb-4">Frontend is where <br/> I make things <br/> feel alive.</span>
          <span className="font-normal italic block text-xl md:text-3xl mt-12 opacity-80 border-l-4 border-accent pl-6 py-2">
            Machine Learning is the invisible gap between the two.
          </span>
        </div>
      </div>
    </section>
  );
}
