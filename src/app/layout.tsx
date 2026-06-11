import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "AVRA PAUL | Builder of distributed systems",
  description: "Builder of distributed systems and ML pipelines who also happens to make websites that feel like this.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=editorial-new@400,300,700,500,600&f[]=neue-montreal@400,300,500,700,600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-accent selection:text-black">
        <CustomCursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
