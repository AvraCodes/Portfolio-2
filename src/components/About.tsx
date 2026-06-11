"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imgRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });

    tl.fromTo(
      imgRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    ).fromTo(
      textRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.2 },
      "-=1"
    );

  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full py-32 md:py-48 px-8 md:px-16 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 bg-background"
    >
      {/* Image Column */}
      <div className="w-full md:w-5/12 flex justify-end">
        <div ref={imgRef} className="relative w-full aspect-[3/4] max-w-md opacity-0">
          <Image 
            src="/images/editorial-manifesto.png" 
            alt="Editorial concept of structure and data" 
            fill 
            className="object-cover rounded-sm"
          />
        </div>
      </div>

      {/* Text Column */}
      <div ref={textRef} className="w-full md:w-6/12 max-w-xl flex flex-col gap-8">
        <h2 className="font-display text-4xl md:text-5xl leading-tight text-foreground">
          Backend is where I live.<br/>
          <span className="text-accent italic font-medium">Frontend is where I make things feel alive.</span>
        </h2>
        
        <p className="font-sans text-lg text-foreground/80 leading-relaxed font-light">
          Machine Learning is the invisible gap between the two.
        </p>

        <div className="grid grid-cols-2 gap-8 mt-8 pt-8 editorial-border-t">
          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/40 mb-2">
              Education
            </h3>
            <p className="font-sans text-sm text-foreground/80 leading-relaxed">
              IIT Madras (Online)<br/>
              Data Science, Class of 2027
            </p>
          </div>
          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/40 mb-2">
              Education
            </h3>
            <p className="font-sans text-sm text-foreground/80 leading-relaxed">
              University of Kalyani<br/>
              Info Tech, Class of 2027
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
