"use client";

import { LanguageProvider } from "@/lib/LanguageContext";
import { SmoothScroller } from "@/components/SmoothScroller";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SmoothScroller>
        <ScrollAnimations />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScroller>
    </LanguageProvider>
  );
}