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
          scale: 6,
          backgroundColor: "var(--color-foreground)",
          duration: 0.5,
          ease: "power4.out",
        });
        gsap.to(text, {
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
        });
      } else {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "var(--color-foreground)",
          duration: 0.5,
          ease: "power4.out",
        });
      }
    };

    const handleHoverLeave = () => {
      gsap.to(text, {
        opacity: 0,
        duration: 0.2,
      });
      text.innerText = "";
      
      gsap.to(cursor, {
        scale: 0.5,
        backgroundColor: "var(--color-foreground)",
        duration: 0.5,
        ease: "power4.out",
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
      className="fixed top-0 left-0 w-2 h-2 bg-foreground rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center transition-opacity"
      style={{ willChange: "transform", opacity: 0.5 }}
    >
      <span 
        ref={textRef} 
        className="text-[3px] font-sans font-medium text-background opacity-0 text-center uppercase tracking-[0.2em] whitespace-nowrap"
        style={{ transform: "scale(0.3)" }}
      ></span>
    </div>
  );
}
