"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Full-viewport horizontal wipe out
    gsap.to(overlay, {
      xPercent: 100,
      duration: 1.2,
      ease: "expo.inOut",
      delay: 0.2,
    });
  }, []);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-accent z-[10000] pointer-events-none origin-left"
      />
      {children}
    </>
  );
}
