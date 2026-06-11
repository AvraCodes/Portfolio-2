export default function Capabilities() {
  const capabilities = [
    {
      domain: "Distributed Systems",
      tools: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS", "WebSockets"],
    },
    {
      domain: "ML Pipelines",
      tools: ["Pandas", "NumPy", "Scikit-learn", "TensorFlow", "RAG Frameworks", "Vector DBs"],
    },
    {
      domain: "Web Interfaces",
      tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "GSAP", "Framer Motion"],
    },
  ];

  return (
    <section className="w-full py-32 px-8 md:px-16 brutal-border-b">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-5xl md:text-8xl uppercase mb-24 leading-none">
          Capabilities
        </h2>

        <div className="flex flex-col gap-16">
          {capabilities.map((cap, index) => (
            <div 
              key={index} 
              className="flex flex-col md:flex-row md:items-start border-t border-foreground pt-8"
            >
              <div className="w-full md:w-1/3 mb-8 md:mb-0">
                <h3 className="font-sans text-2xl md:text-4xl uppercase font-bold">
                  {cap.domain}
                </h3>
              </div>
              <div className="w-full md:w-2/3 flex flex-wrap gap-x-8 gap-y-4">
                {cap.tools.map((tool, i) => (
                  <span 
                    key={i} 
                    className="font-sans text-xl md:text-3xl font-light uppercase tracking-wide text-gray-400 hover:text-accent transition-colors cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
