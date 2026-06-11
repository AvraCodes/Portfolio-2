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
        scale: 2.5,
        backgroundColor: "transparent",
        border: "1px solid var(--color-foreground)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleHoverLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "var(--color-foreground)",
        border: "none",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Attach hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, [data-cursor='hover']"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverEnter);
      el.addEventListener("mouseleave", handleHoverLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverEnter);
        el.removeEventListener("mouseleave", handleHoverLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-foreground rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ willChange: "transform" }}
    />
  );
}
