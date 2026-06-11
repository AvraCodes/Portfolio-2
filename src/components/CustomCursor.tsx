"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor || !text) return;

    // Set initial position off-screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
        opacity: 1,
      });
    };

    const handleHoverEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const cursorText = target.getAttribute("data-cursor-text");

      if (cursorText) {
        text.innerText = cursorText;
        gsap.to(cursor, {
          scale: 4,
          backgroundColor: "var(--color-foreground)",
          border: "none",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(text, {
          opacity: 1,
          duration: 0.2,
          delay: 0.1,
        });
      } else {
        gsap.to(cursor, {
          scale: 2.5,
          backgroundColor: "transparent",
          border: "1px solid var(--color-foreground)",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleHoverLeave = () => {
      gsap.to(text, {
        opacity: 0,
        duration: 0.1,
      });
      text.innerText = "";
      
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "var(--color-foreground)",
        border: "none",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Function to attach listeners
    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, input, textarea, [data-cursor='hover'], [data-cursor-text]"
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverEnter);
        el.addEventListener("mouseleave", handleHoverLeave);
      });
    };

    attachListeners();
    
    // Quick observer for dynamic elements if needed
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-foreground rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      style={{ willChange: "transform" }}
    >
      <span 
        ref={textRef} 
        className="text-[4px] font-sans font-bold text-background opacity-0 text-center uppercase tracking-widest whitespace-nowrap mix-blend-normal"
        style={{ transform: "scale(0.5)" }}
      ></span>
    </div>
  );
}
