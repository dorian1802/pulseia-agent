import { LangProvider } from "@/components/LangProvider";
import type { Locale } from "@/lib/i18n";
import { SmoothScroller } from "@/components/SmoothScroller";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { CursorGlow } from "@/components/CursorGlow";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://pulseia-agent.vercel.app";
const VALID_LOCALES: Locale[] = ["fr", "en", "nl", "es", "de", "ma", "pt", "it", "tr", "zh", "ja", "ko", "ru", "hi", "ar"];
const RTL_LOCALES: Locale[] = ["ar"];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pulseia",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description: "Agence digitale fusionnant IA et création web. 400+ agents, 9 divisions. Automation IA pour PME.",
  address: { "@type": "PostalAddress", addressLocality: "Lens", addressCountry: "BE" },
  areaServed: [
    { "@type": "Country", name: "Belgium" },
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Switzerland" },
  ],
};

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = VALID_LOCALES.includes(lang as Locale) ? (lang as Locale) : "fr";
  const dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className="antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <LangProvider locale={locale}>
        <SmoothScroller>
          <ScrollAnimations />
          <CursorGlow />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroller>
      </LangProvider>
    </html>
  );
}