"use client";

import { LanguageProvider } from "@/lib/LanguageContext";
import { SmoothScroller } from "@/components/SmoothScroller";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import {
  Shield,
  Lock,
  BarChart3,
  Cpu,
  Search,
  FileText,
  Code,
  Database,
  Palette,
  Megaphone,
  Headphones,
  Briefcase,
  ArrowRight,
  Globe,
  Zap,
  Building2,
} from "lucide-react";

const VALUES = [
  {
    icon: Shield,
    title: "Transparence",
    description:
      "Chaque agent, chaque processus est documenté et explicable. Pas de boîte noire — vous comprenez ce que l'IA fait pour vous.",
  },
  {
    icon: Lock,
    title: "Souveraineté",
    description:
      "Vos données restent les vôtres. Nous privilégions les solutions auto-hébergées et les infrastructures souveraines pour vos PME.",
  },
  {
    icon: BarChart3,
    title: "Impact mesurable",
    description:
      "Pas de promesses vagues. Chaque agent est suivi par des KPI clairs : temps gagné, coûts réduits, ROI démontré.",
  },
];

const DIVISIONS = [
  { icon: Zap, label: "Automation" },
  { icon: Search, label: "SEO" },
  { icon: FileText, label: "Content" },
  { icon: Code, label: "Dev" },
  { icon: Database, label: "Data" },
  { icon: Palette, label: "Design" },
  { icon: Megaphone, label: "Marketing" },
  { icon: Headphones, label: "Support" },
  { icon: Briefcase, label: "Consulting" },
];

const STATS = [
  { icon: Cpu, value: "400+", label: "Agents déployés" },
  { icon: Building2, value: "9", label: "Divisions expertes" },
  { icon: Zap, value: "24/7", label: "Disponibilité" },
  { icon: Globe, value: "3", label: "Belgique · France · Suisse" },
];

function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative z-10 pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="tag-animate text-xs tracking-[0.4em] uppercase text-accent font-medium mb-6">
              Pulseia
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white mb-6 leading-[0.95]">
              À{" "}
              <span className="font-bold bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent italic">
                Propos
              </span>
            </h1>
            <p className="text-block text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl">
              Nous rendons l&apos;intelligence artificielle accessible, concrète et
              mesurable pour les PME. Pas de jargon, pas de promesses vides —
              des résultats.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
              Notre Mission
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6 leading-[0.95]">
              Rendre l&apos;IA{" "}
              <span className="text-accent italic">accessible</span> aux PME
            </h2>
            <p className="text-block text-white/50 text-base md:text-lg leading-relaxed">
              Trop de PME pensent que l&apos;intelligence artificielle est réservée aux
              grandes entreprises. Chez Pulseia, nous prouvons le contraire chaque
              jour. Notre mission est de démocratiser l&apos;automation et l&apos;IA pour
              que chaque entreprise, quelle que soit sa taille, puisse
              bénéficier d&apos;agents intelligents qui travaillent 24/7 — sans
              nécessiter une équipe de data scientists.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4 text-center">
            Nos Valeurs
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-12 leading-[0.95] text-center">
            Ce qui nous{" "}
            <span className="text-accent italic">définit</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="card-animate p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-accent/30 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl text-white mb-3">
                  {title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise / Divisions */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4 text-center">
            Notre Expertise
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-12 leading-[0.95] text-center">
            9 divisions{" "}
            <span className="text-accent italic">expertes</span>
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-4 max-w-5xl mx-auto">
            {DIVISIONS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="card-animate flex flex-col items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-accent/[0.04] transition-all duration-500"
              >
                <Icon className="w-5 h-5 text-accent" />
                <span className="text-xs text-white/60 font-medium tracking-wide text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="stat-animate text-center p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <Icon className="w-5 h-5 text-accent mx-auto mb-3" />
                <p className="font-display text-3xl md:text-4xl text-accent font-bold mb-1">
                  {value}
                </p>
                <p className="text-white/50 text-xs tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Founding */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
              L&apos;Équipe
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6 leading-[0.95]">
              Fondé par des experts en{" "}
              <span className="text-accent italic">IA et automation</span>
            </h2>
            <p className="text-block text-white/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Pulseia est né de la conviction que l&apos;intelligence artificielle doit
              servir les entreprises, pas l&apos;inverse. Notre équipe combine des
              années d&apos;expérience en développement logiciel, en data science et en
              conseil stratégique pour créer des solutions qui transforment
              réellement le quotidien des PME.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="tag-animate text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
              Passons à l&apos;action
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6 leading-[0.95]">
              Prêt à{" "}
              <span className="text-accent italic">automatiser</span> ?
            </h2>
            <p className="text-block text-white/50 text-base md:text-lg leading-relaxed mb-8">
              Découvrez comment nos agents IA peuvent transformer votre
              entreprise. Audit gratuit, résultats concrets.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-lg px-8 py-3.5 text-sm font-semibold tracking-wider uppercase transition-colors"
            >
              Audit gratuit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function AboutPageClient() {
  return (
    <LanguageProvider>
      <SmoothScroller>
        <ScrollAnimations />
        <Navbar />
        <main>
          <AboutContent />
        </main>
        <Footer />
      </SmoothScroller>
    </LanguageProvider>
  );
}