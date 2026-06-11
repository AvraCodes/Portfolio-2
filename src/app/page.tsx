import Hero from "@/components/Hero";
import About from "@/components/About";
import SelectedWork from "@/components/SelectedWork";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground relative">
      {/* Absolute positioning of Nav is handled inside Nav.tsx */}
      <Hero />
      <About />
      <SelectedWork />
      <Contact />
    </main>
  );
}
