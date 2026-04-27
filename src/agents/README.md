# Agents IA Pulseia — Configuration Opérationnelle

## Architecture

```
pulseia-agents/
├── agents/           # Prompts et configs
├── tools/            # Outils exécutables (TypeScript)
├── dashboard/        # Interface de suivi
└── orchestrator/     # Moteur de routing
```

## Outils connectés

### Victor Stratos (Strategy)
- `analyze-website.ts` — Analyse Lighthouse + screenshot
- `competitor-research.ts` — Scraping SERP + analyse

### Elena Tech (Technical)
- `stack-analyzer.ts` — Detection stack via Wappalyzer API
- `cost-estimator.ts` — Estimation cloud/pricing

### Sofia Lex (Development)
- `code-generator.ts` — Génération composants Next.js
- `api-builder.ts` — Création endpoints API

### Damien Data (SEO)
- `seo-audit.ts` — Audit technique + sémantique
- `keyword-research.ts` — Recherche mots-clés

### Julie Debug (DevOps)
- `deploy-pipeline.ts` — Déploiement CI/CD
- `monitor-setup.ts` — Configuration monitoring

## Dashboard

### KPIs en temps réel
- Projets actifs
- Agents occupés/libres
- Tickets en cours
- Délais respectés/pas respectés
- Satisfaction client (NPS)

### Technologies
- Frontend : React + Tailwind + WebSocket
- Backend : Node.js + Express + Socket.io
- Data : In-memory (state) + JSON files
