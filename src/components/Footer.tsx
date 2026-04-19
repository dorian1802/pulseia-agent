"use client";

import { useLanguage } from "@/lib/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 bg-dark border-t border-white/5 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-display text-xl font-bold tracking-widest text-white">
              PULSE<span className="text-accent">IA</span>
            </p>
            <p className="text-white/30 text-xs mt-1">{t.footer.tagline}</p>
          </div>
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Pulseia — {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}