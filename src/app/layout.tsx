import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "AVRA PAUL",
  description: "Builder of distributed systems and ML pipelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=editorial-new@400,300,700,500,600&f[]=neue-montreal@400,300,500,700,600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full font-sans bg-background text-primary-text selection:bg-accent selection:text-black antialiased relative">
        
        {/* SVG Film Grain Texture */}
        <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03] mix-blend-difference">
          <svg className="h-full w-full">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        <Nav />
        {children}
      </body>
    </html>
  );
}
