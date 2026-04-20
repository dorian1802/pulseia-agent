import { HomeContent } from "@/components/HomeContent";
import type { Locale } from "@/lib/i18n";

const VALID_LOCALES: Locale[] = ["fr", "en", "nl", "es", "de", "ma", "pt", "it", "tr", "zh", "ja", "ko", "ru", "hi", "ar"];

export function generateStaticParams() {
  return VALID_LOCALES.map((lang) => ({ lang }));
}

export default function Home() {
  return <HomeContent />;
}