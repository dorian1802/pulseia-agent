import type { Metadata } from "next";
import { AuditPageClient } from "@/components/AuditPageClient";

export const metadata: Metadata = {
  title: "Audit IA Gratuit — Pulseia | Découvrez votre Potentiel d'Automation",
  description:
    "Obtenez un audit gratuit de votre potentiel d'automatisation IA. Identifiez les tâches à automatiser, estimez le ROI et recevez un plan d'action personnalisé.",
};

export default function AuditPage() {
  return <AuditPageClient />;
}