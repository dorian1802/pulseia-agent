"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { LanguageProvider } from "@/lib/LanguageContext";
import { SmoothScroller } from "@/components/SmoothScroller";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AgentsSection } from "@/components/AgentsSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ProductsSection } from "@/components/ProductsSection";
import { AuditSection } from "@/components/AuditSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export function HomeContent() {
  const { scrollProgressRef, containerRef } = useScrollAnimation();

  return (
    <LanguageProvider>
      <SmoothScroller>
        <ScrollAnimations />
        <Navbar />
        <main ref={containerRef}>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <AgentsSection />
          <PortfolioSection />
          <ProductsSection />
          <AuditSection />
          <CTASection />
        </main>
        <Footer />
      </SmoothScroller>
    </LanguageProvider>
  );
}