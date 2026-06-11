"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import State01Identity from "@/components/State01Identity";
import State02Archive from "@/components/State02Archive";
import State03Endpoint from "@/components/State03Endpoint";

export default function Home() {
  const [currentState, setCurrentState] = useState(0);
  const [systemExposed, setSystemExposed] = useState(false);
  const isAnimating = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalStates = 3;

  useEffect(() => {
    // Handle System Toggle (Spacebar)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault(); // prevent scroll
        if (!systemExposed) setSystemExposed(true);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setSystemExposed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Handle Mobile Touch and Hold
    const handleTouchStart = () => setSystemExposed(true);
    const handleTouchEnd = () => setSystemExposed(false);

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    
    // Handle Navigation via Wheel/Click
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) return;
      if (systemExposed) return; // Don't allow nav while inspecting system

      if (e.deltaY > 50) advanceState(1);
      else if (e.deltaY < -50) advanceState(-1);
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentState, systemExposed]);

  const advanceState = (dir: number) => {
    if (isAnimating.current) return;
    
    const nextState = currentState + dir;
    if (nextState < 0 || nextState >= totalStates) return;

    isAnimating.current = true;

    // Violent collapse animation
    gsap.to(containerRef.current, {
      scale: 0.8,
      opacity: 0,
      filter: "blur(20px)",
      duration: 0.4,
      ease: "power4.in",
      onComplete: () => {
        setCurrentState(nextState);
        // Violent explode animation
        gsap.fromTo(containerRef.current, 
          { scale: 1.2, opacity: 0, filter: "blur(20px)" },
          { 
            scale: 1, 
            opacity: 1, 
            filter: "blur(0px)", 
            duration: 0.8, 
            ease: "expo.out",
            onComplete: () => {
              isAnimating.current = false;
            }
          }
        );
      }
    });
  };

  return (
    <main className="w-screen h-screen overflow-hidden bg-background text-primary-text relative select-none">
      
      {/* Global State Indicator */}
      <div className="fixed top-8 left-8 z-50 font-sans text-[11px] uppercase tracking-[0.3em] opacity-50 mix-blend-difference pointer-events-none transition-opacity duration-300">
        {systemExposed ? "SYS // DEBUG MODE" : `STATE 0${currentState + 1} / 0${totalStates}`}
      </div>

      {/* Global Instructions */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 font-sans text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-300 pointer-events-none ${systemExposed ? 'text-accent' : 'text-secondary-text'}`}>
        {systemExposed ? "[ SYSTEM EXPOSED ]" : "[ HOLD SPACE ] TO EXPOSE SYSTEM"}
      </div>

      {/* State Machine Container */}
      <div ref={containerRef} className="w-full h-full flex items-center justify-center">
        {currentState === 0 && <State01Identity systemExposed={systemExposed} />}
        {currentState === 1 && <State02Archive systemExposed={systemExposed} />}
        {currentState === 2 && <State03Endpoint systemExposed={systemExposed} />}
      </div>

    </main>
  );
}
