import type { Metadata } from "next";
import { AboutPageClient } from "@/components/AboutPageClient";

export const metadata: Metadata = {
  title: "À Propos de Pulseia — L'IA qui Travaille pour Vous 24/7",
  description:
    "Pulseia est une agence digitale spécialisée en IA et automation. 400+ agents déployés, 9 divisions expertes, présent en Belgique, France et Suisse. Découvrez notre mission, nos valeurs et notre expertise.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}