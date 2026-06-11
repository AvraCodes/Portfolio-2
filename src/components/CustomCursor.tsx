"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

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

    const handleHoverEnter = () => {
      gsap.to(cursor, {
        width: 40,
        height: 40,
        backgroundColor: "transparent",
        border: "1px solid var(--accent)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleHoverLeave = () => {
      gsap.to(cursor, {
        width: 8,
        height: 8,
        backgroundColor: "var(--accent)",
        border: "none",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Function to attach listeners
    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, input, textarea, [data-cursor='hover']"
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
      className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ willChange: "transform, width, height" }}
    />
  );
}
