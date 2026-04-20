---
title: "Construire un Chatbot qui Répond sur vos Documents : Guide Complet avec RAGFlow"
excerpt: "Tutoriel pas à pas pour construire un chatbot RAG avec RAGFlow : installation, ingestion de documents, configuration, test et déploiement."
date: "2026-04-19"
author: "Pulseia"
category: "IA"
readTime: "14 min"
coverImage: "/blog/chatbot-ragflow-documents/cover.jpg"
---

Vous voulez un chatbot qui répond sur vos documents internes, avec précision et sans hallucination ? **RAGFlow** est la solution la plus rapide pour y parvenir. Ce guide pas à pas vous accompagne de l'installation au déploiement d'un chatbot RAG opérationnel.

## Pourquoi RAGFlow pour un chatbot sur documents ?

Avant de commencer, comprenons pourquoi RAGFlow est un excellent choix pour ce cas d'usage. Pour une comparaison avec d'autres frameworks, consultez [RAGFlow vs LlamaIndex](/blog/ragflow-vs-llamaindex).

| Avantage RAGFlow | Description |
|---|---|
| Interface complète | Gestion des documents, du RAG et du chat dans une seule UI |
| Parsing avancé | Gestion native des PDF complexes, tableaux et images |
| Chunking intelligent | 6 méthodes de découpage adaptées aux types de documents |
| Zero code | Pas besoin de programmer pour créer le chatbot |
| Déploiement Docker | Installation en une commande |
| Multi-utilisateurs | Authentification et gestion des accès intégrées |

## Étape 1 : Installation de RAGFlow

### Prérequis

- Docker et Docker Compose installés
- 16 Go de RAM minimum (32 Go recommandé)
- 50 Go d'espace disque
- Une clé API OpenAI ou un modèle Ollama local

Pour les modèles locaux, consultez [Ollama : Comment Faire Tourner un LLM en Local](/blog/ollama-llm-local).

### Installation via Docker

```bash
# Cloner le repository
git clone https://github.com/infiniflow/ragflow.git
cd ragflow

# Lancer les services
docker compose -f docker-compose.yml up -d

# Vérifier que les services sont actifs
docker compose ps
```

### Accès à l'interface

1. Ouvrez `http://localhost` dans votre navigateur
2. Créez votre compte administrateur
3. Vous accédez au dashboard principal

### Dépannage de l'installation

| Problème | Solution |
|---|---|
| Port 80 occupé | Changez le port dans docker-compose.yml |
| Elasticsearch ne démarre pas | Vérifiez vm.max_map_count : `sudo sysctl -w vm.max_map_count=262144` |
| OOM (Out of Memory) | Augmentez la RAM allouée à Docker (16 Go min) |
| Lenteur au démarrage | Normal, attendez 2-3 minutes pour l'initialisation |

## Étape 2 : Configuration du modèle de langage

### Option A : Utiliser OpenAI (le plus simple)

1. Allez dans **Settings** (engrenage)
2. Cliquez sur **Model Providers**
3. Ajoutez votre clé API OpenAI
4. Sélectionnez le modèle : `gpt-4o-mini` (économique) ou `gpt-4o` (meilleure qualité)

### Option B : Utiliser Ollama (gratuit et local)

1. Assurez-vous qu'Ollama tourne sur le port 11434
2. Dans RAGFlow, allez dans **Model Providers**
3. Ajoutez un provider Ollama avec l'URL `http://host.docker.internal:11434`
4. Sélectionnez le modèle : `llama3.1:8b` ou `mistral:7b`

Pour plus de détails sur Ollama, consultez notre guide [Ollama : Comment Faire Tourner un LLM en Local](/blog/ollama-llm-local) et [Open WebUI + Ollama : Construisez votre ChatGPT Privé](/blog/open-webui-ollama-chatgpt-prive).

### Option C : Utiliser d'autres providers

RAGFlow supporte aussi Anthropic (Claude), Google (Gemini), ZhipuAI, et d'autres. La configuration est similaire : ajoutez le provider et votre clé API.

### Configuration des embeddings

| Modèle d'embedding | Taille | Qualité | Prix |
|---|---|---|---|
| text-embedding-3-small (OpenAI) | 1536 dim | Bonne | 0,02$/1M tokens |
| text-embedding-3-large (OpenAI) | 3072 dim | Excellente | 0,13$/1M tokens |
| nomic-embed-text (Ollama) | 768 dim | Bonne | Gratuit |
| bge-large-zh (local) | 1024 dim | Bonne (français) | Gratuit |

Pour du français, `text-embedding-3-small` offre un bon compromis qualité-prix. En local, `nomic-embed-text` via Ollama fonctionne bien.

## Étape 3 : Créer une base de connaissances

### Créer la base

1. Dans le dashboard, cliquez sur **Knowledge Base**
2. Cliquez sur **Create Knowledge Base**
3. Nommez votre base (par exemple : "Documentation Interne")
4. Sélectionnez la méthode de chunking

### Choisir la méthode de chunking

| Méthode | Description | Quand l'utiliser |
|---|---|---|
| General | Découpage par taille fixe | Textes standards, articles |
| Q&A | Extraction questions/réponses | FAQ, support client |
| Resume | Résumé par section | Documents longs, rapports |
| Table | Extraction de tableaux | Données tabulaires, prix |
| Paper | Sections de papier académique | Articles de recherche |
| Book | Chapitres et sections | Livres, manuels |
| Laws | Articles de loi | Documents juridiques |

Pour la plupart des cas d'usage, **General** est le bon choix par défaut.

### Paramètres de chunking recommandés

| Paramètre | Valeur recommandée | Description |
|---|---|---|
| Chunk size | 512 tokens | Taille de chaque segment |
| Chunk overlap | 50 tokens | Chevauchement entre segments |
| Max tokens per chunk | 1024 | Limite maximale |

## Étape 4 : Ingérer vos documents

### Formats supportés

| Format | Support | Qualité du parsing |
|---|---|---|
| PDF | Oui | Excellente (OCR intégré) |
| DOCX | Oui | Bonne |
| TXT/MD | Oui | Excellente |
| CSV/Excel | Oui | Bonne |
| Images (PNG, JPG) | Oui (via OCR) | Bonne |
| PPTX | Oui | Moyenne |

### Charger les documents

1. Dans votre Knowledge Base, cliquez sur **Upload**
2. Glissez-déposez vos fichiers ou sélectionnez-les
3. RAGFlow commence le parsing automatiquement
4. Attendez que le statut passe à "Completed"

### Préparer ses documents pour un RAG optimal

- **Nettoyez les PDF** : Supprimez les pages de garde et les tables des matières inutiles
- **Structurez les titres** : Les documents bien structurés (titres H1, H2) produisent de meilleurs chunks
- **Évitez les scans** : Les PDF textuels sont mieux parsés que les scans (même si l'OCR les gère)
- **Séparez les thématiques** : Une base de connaissances par sujet est plus efficace qu'une base fourre-tout

Pour le crawling de contenu web à intégrer dans RAGFlow, consultez [Firecrawl : Comment Transformer N'importe Quel Site Web en Donnée Exploitable par l'IA](/blog/firecrawl-guide-pratique).

## Étape 5 : Créer le chatbot

### Configuration de l'assistant

1. Allez dans **Chat** ou **Assistant**
2. Cliquez sur **Create Assistant**
3. Configurez les paramètres :

| Paramètre | Valeur recommandée | Description |
|---|---|---|
| Nom | "Assistant Documentation" | Nom affiché |
| LLM | gpt-4o-mini ou llama3.1:8b | Modèle de génération |
| Knowledge Base | Votre base créée | Source de données |
| Temperature | 0,1 | Faible pour des réponses factuelles |
| Top P | 0,9 | Qualité de la génération |
| Max tokens | 2048 | Longueur max des réponses |
| Similarity threshold | 0,2 | Seuil de similarité minimal |

### Prompt système

Ajoutez un prompt système qui guide le comportement du chatbot :

```
Tu es un assistant expert qui répond aux questions en te basant
uniquement sur les documents fournis dans la base de connaissances.

Règles :
1. Réponds toujours en français
2. Si la réponse n'est pas dans les documents, dis-le clairement
3. Cite tes sources en mentionnant le document d'origine
4. Structure tes réponses avec des listes et des titres
5. Ne fabrique jamais d'informations qui ne sont pas dans les documents
6. Si une question est ambiguë, demande des clarifications
```

## Étape 6 : Tester le chatbot

### Tests de validation

Avant de déployer, testez systématiquement :

| Type de test | Question type | Résultat attendu |
|---|---|---|
| Question factuelle | "Quelle est la politique de congés ?" | Réponse précise avec source |
| Question complexe | "Comment demander un congé parental ?" | Réponse étape par étape |
| Hors sujet | "Quelle est la météo à Paris ?" | "Je n'ai pas cette information" |
| Ambiguë | "Comment fonctionne le système ?" | Demande de clarification |
| Multi-documents | "Compare les avantages des plans A et B" | Synthèse de plusieurs sources |

### Métriques de qualité

| Métrique | Objectif | Comment mesurer |
|---|---|---|
| Taux de réponse correcte | > 85% | Test manuel sur 50+ questions |
| Taux de hallucination | < 5% | Vérification des sources |
| Taux de "je ne sais pas" | < 20% | Questions dont la réponse est dans les docs |
| Latence moyenne | < 3 secondes | Mesure de la réponse |
| Satisfaction utilisateur | > 4/5 | Feedback direct |

## Étape 7 : Déployer le chatbot

### Déploiement interne

Pour un déploiement interne, RAGFlow fournit :

1. **Interface web intégrée** : Partagez l'URL du chat avec votre équipe
2. **API REST** : Pour intégrer dans vos applications existantes
3. **Widget iFrame** : Pour intégrer le chat dans votre site web

### API REST

```bash
# Envoyer une question via l'API
curl -X POST "http://localhost/api/v1/chat" \
  -H "Authorization: Bearer votre-token" \
  -H "Content-Type: application/json" \
  -d '{
    "assistant_id": "votre-assistant-id",
    "question": "Quelle est la politique de congés ?"
  }'
```

### Widget intégrable

RAGFlow fournit un snippet JavaScript pour intégrer le chatbot sur n'importe quel site web :

```html
<iframe
  src="http://votre-serveur/chat/share/votre-token"
  width="400"
  height="600"
  style="border: none; border-radius: 10px;">
</iframe>
```

### Sécurisation du déploiement

| Mesure | Description |
|---|---|
| HTTPS | Utilisez un reverse proxy (Nginx/Caddy) avec certificat SSL |
| Authentification | Activez la connexion obligatoire dans RAGFlow |
| VPN | Pour l'accès distant, utilisez Tailscale ou WireGuard |
| Rate limiting | Limitez le nombre de requêtes par utilisateur |
| Sauvegardes | Sauvegardez régulièrement les données Qdrant et PostgreSQL |

Pour plus de détails sur l'auto-hébergement sécurisé, consultez [Pourquoi Auto-Héberger ses Outils IA](/blog/auto-heberger-outils-ia).

## Maintenance et amélioration continue

### Mise à jour des documents

- Ajoutez régulièrement les nouveaux documents à la base de connaissances
- Supprimez les documents obsolètes
- Relancez le parsing quand vous modifiez un document important

### Monitoring

| Métrique à surveiller | Fréquence | Action si anomalie |
|---|---|---|
| Latence de réponse | Continue | Optimiser le modèle ou le vector store |
| Qualité des réponses | Hebdomadaire | Ajuster le chunking ou le prompt |
| Utilisation | Quotidienne | Dimensionner les ressources |
| Erreurs système | Continue | Vérifier les logs Docker |

### Amélioration progressive

1. Collectez les questions des utilisateurs
2. Identifiez les réponses insatisfaisantes
3. Ajoutez les documents manquants
4. Affinez le prompt système
5. Ajustez les paramètres de retrieval

## FAQ

### Combien de documents RAGFlow peut-il gérer ?

RAGFlow gère confortablement des milliers de documents. La limite dépend principalement de votre infrastructure (RAM, stockage). Pour des volumes importants (>100k documents), utilisez Elasticsearch comme vector store et dimensionnez les ressources en conséquence.

### Les réponses du chatbot sont-elles fiables ?

RAGFlow réduit significativement les hallucinations en ancrant les réponses dans les documents. Cependant, aucun système RAG n'est parfait. Les taux d'hallucination typiques sont de 3 à 10% selon la qualité du chunking et du modèle. Toujours valider les réponses critiques.

### Peut-on utiliser RAGFlow avec LlamaIndex ?

Oui, les deux peuvent coexister. RAGFlow pour le chatbot clé en main, [LlamaIndex](/blog/llamaindex-explication-simple) pour des pipelines RAG plus personnalisés. Consultez [RAGFlow vs LlamaIndex](/blog/ragflow-vs-llamaindex) pour comprendre les différences.

### Comment gérer les documents multilingues ?

RAGFlow supporte les documents en plusieurs langues. Pour du français, assurez-vous que le modèle LLM et le modèle d'embeddings gèrent bien le français. GPT-4o et Llama 3.1 8B fonctionnent correctement en français. Pour les embeddings, text-embedding-3-small (OpenAI) est recommandé.

### Quel est le coût de fonctionnement ?

En auto-hébergement avec Ollama, le coût se résume à l'électricité (environ 15-30$/mois pour un serveur 24/7). Avec les API OpenAI, comptez 5 à 50$/mois selon le volume de requêtes. Pour plus de détails sur les coûts de l'auto-hébergement, consultez [Pourquoi Auto-Héberger ses Outils IA](/blog/auto-heberger-outils-ia).

## Mise à jour — Avril 2026

RAGFlow a poursuivi son amélioration continue. Le parsing PDF est encore meilleur avec la gestion des formules mathématiques et des diagrammes complexes. De nouvelles méthodes de chunking ont été ajoutées pour les documents juridiques et les spécifications techniques. L'interface a été modernisée avec un meilleur feedback visuel pendant l'ingestion. Côté intégration, RAGFlow fonctionne désormais parfaitement avec [Ollama](/blog/ollama-llm-local) pour un stack entièrement local et gratuit. Pour les projets nécessitant plus de flexibilité, [LlamaIndex](/blog/llamaindex-explication-simple) reste la référence programmatique. Pour l'ingestion de données web, [Firecrawl](/blog/firecrawl-guide-pratique) est le complément idéal. Le combo RAGFlow + Ollama + Firecrawl constitue un pipeline RAG local complet et sans coût récurrent.