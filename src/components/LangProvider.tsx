"use client";

import { LanguageProvider } from "@/lib/LanguageContext";
import type { Locale } from "@/lib/i18n";

export function LangProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>;
}