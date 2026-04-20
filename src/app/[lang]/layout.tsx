import { LangProvider } from "@/components/LangProvider";
import type { Locale } from "@/lib/i18n";
import { SmoothScroller } from "@/components/SmoothScroller";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const VALID_LOCALES: Locale[] = ["fr", "en", "nl", "es", "de", "ma", "pt", "it", "tr", "zh", "ja", "ko", "ru", "hi", "ar"];

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = VALID_LOCALES.includes(lang as Locale) ? (lang as Locale) : "fr";

  return (
    <LangProvider locale={locale}>
      <SmoothScroller>
        <ScrollAnimations />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScroller>
    </LangProvider>
  );
}