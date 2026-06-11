"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-4 glass" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-semibold text-lg tracking-tight">
          Avra Paul<span className="text-accent">.</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="#contact" className="px-5 py-2.5 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-all shadow-lg hover:shadow-foreground/20">
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}
