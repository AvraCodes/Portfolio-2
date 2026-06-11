"use client";

const experience = [
  {
    role: "Independent Developer",
    focus: "AI, ML & Full-Stack Systems",
    timeline: "2025 — Present",
    details: "Designed Alvyn (AI Data Analyst API), built end-to-end data pipelines for 55k+ records, optimized LLM workflows."
  },
  {
    role: "ML & Data Science",
    focus: "Competitive & Applied",
    timeline: "2025 — Present",
    details: "Achieved ~80% in Kaggle competitions. Focused on feature engineering, structured/unstructured preprocessing."
  },
  {
    role: "Full-Stack Dev",
    focus: "Agency & Freelance",
    timeline: "2025 — Present",
    details: "Built clean, responsive UI with React/Next.js integrated with Python/FastAPI backends."
  }
];

const capabilities = [
  {
    domain: "Distributed Systems",
    tools: "Python / FastAPI / Node.js / PostgreSQL / Redis / Docker / WebSockets",
  },
  {
    domain: "ML Pipelines",
    tools: "Pandas / NumPy / Scikit-learn / TensorFlow / RAG / Vector DBs",
  },
  {
    domain: "Web Interfaces",
    tools: "React / Next.js / TypeScript / Tailwind CSS / Three.js / GSAP",
  },
];

export default function Capabilities() {
  return (
    <section className="w-full py-24 md:py-32 px-4 md:px-8 brutal-border-b bg-background relative z-10">
      <div className="max-w-[95vw] mx-auto">
        
        <div className="flex flex-col md:flex-row gap-16 md:gap-8">
          
          {/* Left Column: Experience Data Table */}
          <div className="w-full md:w-1/2">
            <div className="flex justify-between items-end mb-8 border-b border-foreground pb-4">
              <h2 className="font-display text-4xl md:text-6xl uppercase leading-none">
                Experience Log
              </h2>
              <span className="font-sans text-xs uppercase tracking-widest text-gray-500 hidden md:block">
                QUERY: SELECT * FROM CAREER
              </span>
            </div>

            <div className="flex flex-col border-t border-l border-r border-foreground">
              {experience.map((exp, i) => (
                <div key={i} className="flex flex-col border-b border-foreground p-4 md:p-6 hover:bg-foreground/5 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-sans text-lg md:text-2xl font-bold uppercase">{exp.role}</h3>
                    <span className="font-sans text-xs md:text-sm font-mono bg-foreground text-background px-2 py-1">
                      {exp.timeline}
                    </span>
                  </div>
                  <p className="font-sans text-sm uppercase tracking-widest text-accent mb-4">
                    {exp.focus}
                  </p>
                  <p className="font-sans text-sm md:text-base opacity-80 border-l-2 border-foreground pl-4">
                    {exp.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Capabilities Service Menu */}
          <div className="w-full md:w-1/2">
            <div className="flex justify-between items-end mb-8 border-b border-foreground pb-4">
              <h2 className="font-display text-4xl md:text-6xl uppercase leading-none">
                System Specs
              </h2>
              <span className="font-sans text-xs uppercase tracking-widest text-gray-500 hidden md:block">
                STATUS: OPTIMIZED
              </span>
            </div>

            <div className="flex flex-col border-t border-foreground">
              {capabilities.map((cap, i) => (
                <div 
                  key={i} 
                  className="group relative border-b border-foreground p-6 md:p-8 overflow-hidden cursor-default"
                >
                  {/* Hover Sweep Background */}
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                  
                  <div className="relative z-10 flex flex-col gap-4">
                    <h3 className="font-display text-3xl md:text-5xl uppercase group-hover:text-black transition-colors duration-300">
                      {cap.domain}
                    </h3>
                    <p className="font-sans text-sm md:text-base uppercase tracking-widest font-mono text-gray-400 group-hover:text-black/80 transition-colors duration-300">
                      {cap.tools}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
