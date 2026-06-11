"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  { category: "Backend & Systems", tech: "Python, FastAPI, Node.js, PostgreSQL, Redis, WebSockets, Docker" },
  { category: "Machine Learning", tech: "Scikit-learn, Pandas, NumPy, Vector Databases, RAG, LLMs" },
  { category: "Frontend", tech: "React, Next.js, TypeScript, Tailwind CSS, GSAP" },
];

const education = [
  { degree: "B.S. Data Science", school: "IIT Madras (Online)", year: "Class of 2027" },
  { degree: "B.Tech Information Technology", school: "University of Kalyani", year: "Class of 2027" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.about-fade'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Column: Bio & Education */}
        <div className="flex flex-col gap-8">
          <div className="about-fade glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 tracking-tight">About Me</h2>
            <p className="text-foreground/70 leading-relaxed mb-6">
              I specialize in building robust distributed systems and machine learning pipelines. 
              While my core expertise lies in backend architecture and data science, I treat frontend 
              development as a serious craft, ensuring that complex systems are wrapped in beautiful, 
              intuitive, and highly responsive user interfaces.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Whether I'm optimizing a vector database query, training a multi-class classifier, 
              or perfecting a GSAP animation, I aim for excellence across the entire stack.
            </p>
          </div>

          <div className="about-fade glass-card p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-6 tracking-tight">Education</h2>
            <div className="flex flex-col gap-6">
              {education.map((edu, i) => (
                <div key={i} className="flex flex-col border-l-2 border-accent/50 pl-4">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <div className="flex justify-between text-sm text-foreground/60 mt-1">
                    <span>{edu.school}</span>
                    <span>{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Capabilities */}
        <div className="about-fade glass-card p-8 rounded-2xl h-fit">
          <h2 className="text-2xl font-bold mb-8 tracking-tight">Technical Arsenal</h2>
          <div className="flex flex-col gap-8">
            {capabilities.map((cap, i) => (
              <div key={i} className="flex flex-col gap-2">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-accent">{cap.category}</h3>
                <p className="text-foreground/80 leading-relaxed">{cap.tech}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
