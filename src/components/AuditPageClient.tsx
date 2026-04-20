"use client";

import { useState, type FormEvent } from "react";
import {
  Clock,
  TrendingUp,
  Zap,
  Shield,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const benefits = [
  {
    icon: Clock,
    title: "Gain de temps",
    description:
      "Automatisez les tâches répétitives et récupérez des heures chaque semaine.",
  },
  {
    icon: TrendingUp,
    title: "Réduction des coûts",
    description:
      "Diminuez les coûts opérationnels en remplaçant les processus manuels.",
  },
  {
    icon: Zap,
    title: "Productivité",
    description:
      "Boostez la productivité de votre équipe en les libérant des tâches à faible valeur ajoutée.",
  },
  {
    icon: Shield,
    title: "Avantage compétitif",
    description:
      "Anticipez vos concurrents en adoptant l'IA avant qu'elle ne devienne la norme.",
  },
];

const toolOptions = [
  "CRM",
  "Email",
  "Facturation",
  "Prospection",
  "Support",
  "Contenu",
];

const painOptions = [
  "Tâches répétitives",
  "Manque de temps",
  "Erreurs manuelles",
  "Coûts élevés",
];

const teamOptions = ["1-5", "6-20", "21-50", "50+"];

const faqItems = [
  {
    question: "L'audit est-il vraiment gratuit ?",
    answer:
      "Oui, l'audit est 100 % gratuit et sans engagement. Nous identifions vos opportunités d'automatisation et vous livrons un rapport personnalisé.",
  },
  {
    question: "Combien de temps prend l'audit ?",
    answer:
      "Le formulaire prend environ 5 minutes. Vous recevez votre rapport d'audit personnalisé sous 48h.",
  },
  {
    question: "Que reçois-je après l'audit ?",
    answer:
      "Vous recevez un plan d'action détaillé avec les tâches à automatiser en priorité, les outils recommandés et une estimation du ROI.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AuditPageClient() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState("");

  const totalSteps = 4;

  function toggleItem(
    list: string[],
    setList: (v: string[]) => void,
    item: string
  ) {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  /* ---- Render ---- */

  return (
    <>
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center justify-center pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="tag-animate inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase rounded-full border border-accent/30 text-accent bg-accent/5">
            Audit Gratuit
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-tight mb-6">
            <span className="bg-gradient-to-r from-accent via-accent-light to-purple-400 bg-clip-text text-transparent">
              Audit IA Gratuit
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto text-block">
            Identifiez votre potentiel d&apos;automation en 5 minutes
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-14 text-block">
            Pourquoi réaliser un audit IA ?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="card-animate group rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-accent/30 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-white mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form / Steps */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            /* Success */
            <div className="text-center card-animate rounded-2xl border border-accent/20 bg-accent/[0.03] p-10 sm:p-14">
              <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
                Merci pour votre demande !
              </h2>
              <p className="text-white/60 text-lg max-w-md mx-auto">
                Nous analysons votre demande et vous recontactons sous 48h
                avec votre audit personnalisé.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              action="https://formsubmit.co/contact@pulseia.agency"
              method="POST"
              className="card-animate rounded-2xl border border-white/5 bg-white/[0.02] p-8 sm:p-10 space-y-8"
            >
              {/* Progress bar */}
              <div className="flex items-center gap-2 mb-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i < step ? "bg-accent" : "bg-white/10"
                    }`}
                  />
                ))}
                <span className="text-xs text-white/40 ml-2">
                  {step}/{totalSteps}
                </span>
              </div>

              {/* Step 1 — Identity */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-display font-semibold text-white">
                    Vos informations
                  </h2>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm text-white/50 mb-1.5"
                    >
                      Nom
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-white/50 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="jean@entreprise.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm text-white/50 mb-1.5"
                    >
                      Entreprise
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="Mon Entreprise"
                    />
                  </div>
                </div>
              )}

              {/* Step 2 — Tools */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-display font-semibold text-white">
                    Vos outils actuels
                  </h2>
                  <p className="text-sm text-white/50">
                    Sélectionnez les outils que vous utilisez au quotidien.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {toolOptions.map((tool) => (
                      <button
                        key={tool}
                        type="button"
                        onClick={() =>
                          toggleItem(selectedTools, setSelectedTools, tool)
                        }
                        className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors ${
                          selectedTools.includes(tool)
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20"
                        }`}
                      >
                        {selectedTools.includes(tool) && (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                        {tool}
                      </button>
                    ))}
                  </div>
                  <input
                    type="hidden"
                    name="tools"
                    value={selectedTools.join(", ")}
                  />
                </div>
              )}

              {/* Step 3 — Pain points */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-display font-semibold text-white">
                    Vos principaux défis
                  </h2>
                  <p className="text-sm text-white/50">
                    Quels sont vos principaux points de douleur ?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {painOptions.map((pain) => (
                      <button
                        key={pain}
                        type="button"
                        onClick={() =>
                          toggleItem(selectedPains, setSelectedPains, pain)
                        }
                        className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors ${
                          selectedPains.includes(pain)
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20"
                        }`}
                      >
                        {selectedPains.includes(pain) && (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                        {pain}
                      </button>
                    ))}
                  </div>
                  <input
                    type="hidden"
                    name="pains"
                    value={selectedPains.join(", ")}
                  />
                </div>
              )}

              {/* Step 4 — Team size */}
              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-display font-semibold text-white">
                    Taille de votre équipe
                  </h2>
                  <p className="text-sm text-white/50">
                    Combien de personnes composent votre équipe ?
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {teamOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setTeamSize(opt)}
                        className={`rounded-lg border px-4 py-4 text-sm font-medium transition-colors ${
                          teamSize === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="teamSize" value={teamSize} />
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-2">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    Précédent
                  </button>
                ) : (
                  <span />
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={step === 1 && (!name || !email)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Suivant
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!teamSize}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Recevoir mon audit
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-14 text-block">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqItems.map((faq) => (
              <div
                key={faq.question}
                className="card-animate rounded-xl border border-white/5 bg-white/[0.02] p-6"
              >
                <h3 className="font-display font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center card-animate">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full border border-accent/20 bg-accent/[0.04]">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span className="text-sm text-white/70">
              <strong className="text-white">50+</strong> entreprises ont
              déjà reçu leur audit
            </span>
          </div>
        </div>
      </section>
    </>
  );
}