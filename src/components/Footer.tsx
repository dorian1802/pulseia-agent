"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export function Footer() {
  const { locale, t } = useLanguage();

  return (
    <footer className="relative z-10 bg-dark border-t border-white/5 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-display text-xl font-bold tracking-widest text-white">
              PULSE<span className="text-accent">IA</span>
            </p>
            <p className="text-white/50 text-xs mt-1">{t.footer.tagline}</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href={`/${locale}`} className="text-white/40 text-sm hover:text-accent transition-colors">{t.nav.about}</Link>
            <Link href={`/${locale}/blog`} className="text-white/40 text-sm hover:text-accent transition-colors">{t.nav.blog}</Link>
            <Link href={`/${locale}/audit`} className="text-white/40 text-sm hover:text-accent transition-colors">{t.nav.audit}</Link>
            <Link href={`/${locale}#services`} className="text-white/40 text-sm hover:text-accent transition-colors">{t.nav.services}</Link>
            <Link href={`/${locale}#contact`} className="text-white/40 text-sm hover:text-accent transition-colors">{t.nav.contact}</Link>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Pulseia — {t.footer.rights}
          </p>
          <a href={`mailto:contact@pulseia.agency`} className="text-white/20 text-xs hover:text-accent transition-colors">
            contact@pulseia.agency
          </a>
        </div>
      </div>
    </footer>
  );
}