import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const SITE_URL = "https://pulseia-agent.vercel.app";

export const metadata: Metadata = {
  title: "Pulseia — L'IA qui Travaille pour Vous 24/7",
  description:
    "Agence digitale fusionnant IA et création web. 400+ agents, 9 divisions. Automation IA pour PME en Belgique, France et Suisse.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    title: "Pulseia — L'IA qui Travaille pour Vous 24/7",
    description:
      "Agence digitale fusionnant IA et création web. 400+ agents, 9 divisions.",
    url: SITE_URL,
    siteName: "Pulseia",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulseia — L'IA qui Travaille pour Vous 24/7",
    description:
      "Agence digitale fusionnant IA et création web. 400+ agents, 9 divisions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
      <div id="bg-glow" className="fixed inset-0 pointer-events-none z-[-1]" />
      {children}
    </body>
  );
}