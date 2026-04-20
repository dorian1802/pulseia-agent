import { HomeContent } from "@/components/HomeContent";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const SITE_URL = "https://pulseia-agent.vercel.app";
const VALID_LOCALES: Locale[] = ["fr", "en", "nl", "es", "de", "ma", "pt", "it", "tr", "zh", "ja", "ko", "ru", "hi", "ar"];

const HOME_TITLES: Record<string, string> = {
  fr: "Pulseia — L'IA qui Travaille pour Vous 24/7",
  en: "Pulseia — AI That Works for You 24/7",
  nl: "Pulseia — De AI die voor u werkt 24/7",
  es: "Pulseia — La IA que Trabaja para Ti 24/7",
  de: "Pulseia — Die KI, die für Sie arbeitet 24/7",
  pt: "Pulseia — A IA que Trabalha para Si 24/7",
  it: "Pulseia — L'IA che Lavora per Voi 24/7",
  tr: "Pulseia — Sizin İçin Çalışan Yapay Zeka 7/24",
  zh: "Pulseia — 为您全天候工作的AI",
  ja: "Pulseia — あなたのために24時間働くAI",
  ko: "Pulseia — 당신을 위해 24시간 일하는 AI",
  ru: "Pulseia — ИИ, который работает на вас 24/7",
  hi: "Pulseia — आपके लिए 24/7 काम करने वाला AI",
  ar: "Pulseia — الذكاء الاصطناعي الذي يعمل من أجلك على مدار الساعة",
  ma: "Pulseia — L'IA li kheddam lik 24/7",
};

const HOME_DESCS: Record<string, string> = {
  fr: "Agence digitale fusionnant IA et création web. 400+ agents, 9 divisions. Automation IA pour PME en Belgique, France et Suisse.",
  en: "Digital agency merging AI and web creation. 400+ agents, 9 divisions. AI automation for SMEs in Belgium, France and Switzerland.",
  nl: "Digitaal bureau dat AI en webcreatie samenvoegt. 400+ agenten, 9 divisies. AI-automatisering voor KMO's in België, Frankrijk en Zwitserland.",
  es: "Agencia digital que fusiona IA y creación web. 400+ agentes, 9 divisiones. Automatización IA para PYME en Bélgica, Francia y Suiza.",
  de: "Digitale Agentur, die KI und Webgestaltung vereint. 400+ Agenten, 9 Divisionen. KI-Automatisierung für KMU in Belgien, Frankreich und der Schweiz.",
  pt: "Agência digital que funde IA e criação web. 400+ agentes, 9 divisões. Automação IA para PME na Bélgica, França e Suíça.",
  it: "Agenzia digitale che unisce IA e creazione web. 400+ agenti, 9 divisioni. Automazione IA per PMI in Belgio, Francia e Svizzera.",
  tr: "Yapay zekayı ve web tasarımını birleştiren dijital ajans. 400+ ajan, 9 bölüm. Belçika, Fransa ve İsviçre'deki KOBİ'ler için yapay zeka otomasyonu.",
  zh: "融合人工智能与网页创作的数字代理。400+代理，9个部门。为比利时、法国和瑞士的中小企业提供AI自动化。",
  ja: "AIとウェブ制作を融合するデジタルエージェンシー。400以上のエージェント、9部門。ベルギー、フランス、スイスの中小企業向けAI自動化。",
  ko: "AI와 웹 제작을 융합하는 디지털 에이전시. 400+ 에이전트, 9개 부서. 벨기에, 프랑스, 스위스 중소기업을 위한 AI 자동화.",
  ru: "Цифровое агентство, объединяющее ИИ и веб-дизайн. 400+ агентов, 9 подразделений. Автоматизация ИИ для МСП в Бельгии, Франции и Швейцарии.",
  hi: "AI और वेब सृजन को मिलाने वाली डिजिटल एजेंसी। 400+ एजेंट, 9 विभाग। बेल्जियम, फ्रांस और स्विट्जरलैंड में SME के लिए AI स्वचालन।",
  ar: "وكالة رقمية تدمج الذكاء الاصطناعي مع التصميم الإلكتروني. 400+ وكيل، 9 أقسام. أتمتة الذكاء الاصطناعي للشركات الصغيرة والمتوسطة في بلجيكا وفرنسا وسويسرا.",
  ma: "Agence digitale li kayjma3 l'IA m3a création web. 400+ agents, 9 divisions. Automation IA l PME f Belgique, France w Suisse.",
};

const OG_LOCALE_MAP: Record<string, string> = {
  fr: "fr_FR", en: "en_US", nl: "nl_NL", es: "es_ES", de: "de_DE",
  ma: "ar_MA", pt: "pt_PT", it: "it_IT", tr: "tr_TR", zh: "zh_CN",
  ja: "ja_JP", ko: "ko_KR", ru: "ru_RU", hi: "hi_IN", ar: "ar_SA",
};

export function generateStaticParams() {
  return VALID_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = VALID_LOCALES.includes(lang as Locale) ? (lang as Locale) : "fr";
  const url = `${SITE_URL}/${lang}`;

  const languages: Record<string, string> = {};
  for (const loc of VALID_LOCALES) {
    languages[loc] = `${SITE_URL}/${loc}`;
  }
  languages["x-default"] = `${SITE_URL}/fr`;

  return {
    title: HOME_TITLES[locale] || HOME_TITLES.fr,
    description: HOME_DESCS[locale] || HOME_DESCS.fr,
    alternates: { canonical: url, languages },
    openGraph: {
      title: HOME_TITLES[locale] || HOME_TITLES.fr,
      description: HOME_DESCS[locale] || HOME_DESCS.fr,
      url,
      siteName: "Pulseia",
      locale: OG_LOCALE_MAP[locale] || "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: HOME_TITLES[locale] || HOME_TITLES.fr,
      description: HOME_DESCS[locale] || HOME_DESCS.fr,
    },
  };
}

export default function Home() {
  return <HomeContent />;
}