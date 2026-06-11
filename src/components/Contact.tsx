import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <footer className="w-full min-h-[80vh] flex flex-col justify-between p-8 md:p-16">
      <div className="flex-grow flex flex-col justify-center">
        <h2 className="text-sm font-sans uppercase tracking-[0.2em] mb-12">
          [05] Contact
        </h2>

        <a 
          href="mailto:eminentavra9836@gmail.com"
          data-cursor="hover"
          className="group block w-fit"
        >
          <h3 className="font-display text-5xl md:text-[8vw] leading-none uppercase break-all transition-colors duration-300 group-hover:text-accent">
            eminentavra9836<br/>@gmail.com
          </h3>
        </a>

        <div className="flex gap-8 mt-16">
          <a 
            href="https://github.com/AvraCodes" 
            target="_blank" 
            rel="noreferrer"
            data-cursor="hover"
            className="flex items-center gap-2 font-sans text-xl uppercase brutal-border px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
          >
            GitHub <ArrowUpRight className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/avra-paul-1924631b5/" 
            target="_blank" 
            rel="noreferrer"
            data-cursor="hover"
            className="flex items-center gap-2 font-sans text-xl uppercase brutal-border px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
          >
            LinkedIn <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-foreground flex flex-col md:flex-row justify-between items-end gap-8">
        <p className="font-sans text-xl md:text-2xl uppercase tracking-wide max-w-xl">
          Systems should scale. Interfaces should hit hard.
        </p>
        <p className="font-sans text-sm uppercase tracking-[0.2em] text-gray-500">
          © {new Date().getFullYear()} Avra Paul. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
