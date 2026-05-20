"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AgentsSection } from "@/components/AgentsSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { EuropeMapSection } from "@/components/EuropeMap";
import { CTASection } from "@/components/CTASection";

export function HomeContent() {
  const { scrollProgressRef, containerRef } = useScrollAnimation();

  return (
    <main ref={containerRef}>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AgentsSection />
      <PortfolioSection />
      <EuropeMapSection />
      <CTASection />
    </main>
  );
}