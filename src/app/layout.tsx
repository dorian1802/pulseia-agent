import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://pulseia-agent.vercel.app";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pulseia",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Agence digitale fusionnant IA et création web. 400+ agents, 9 divisions. Automation IA pour PME.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lens",
    addressCountry: "BE",
  },
  areaServed: [
    { "@type": "Country", name: "Belgium" },
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Switzerland" },
  ],
  sameAs: [],
};

export const metadata: Metadata = {
  title: "Pulseia — L'IA qui Travaille pour Vous 24/7",
  description:
    "Agence digitale fusionnant IA et création web. 400+ agents, 9 divisions. Automation IA pour PME en Belgique, France et Suisse.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
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
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans">
        <div id="bg-glow" className="fixed inset-0 pointer-events-none z-[-1]" />
        {children}
      </body>
    </html>
  );
}