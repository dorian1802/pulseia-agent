---
title: "Ollama : Comment Faire Tourner un LLM en Local sur votre PC (même sans GPU Puissant)"
excerpt: "Guide complet pour installer et utiliser Ollama, faire tourner des LLM en local sans GPU coûteux, avec sélection de modèles et optimisation des performances."
date: "2026-04-19"
author: "Pulseia"
category: "Automation"
readTime: "13 min"
coverImage: "/blog/placeholder-cover.svg"
---

Faire tourner un modèle de langage sur votre propre machine, sans dépendre d'OpenAI ou de Google, c'est désormais une réalité accessible. **Ollama** démocratise l'exécution locale de LLM en simplifiant drastiquement l'installation et la gestion des modèles. Ce guide vous montre comment commencer, même avec du matériel modeste.

## Qu'est-ce qu'Ollama ?

Ollama est un outil open source qui permet de télécharger, configurer et exécuter des modèles de langage localement sur votre machine. Créé pour simplifier l'expérience d'exécution des LLM, Ollama gère la compilation, la quantification et l'optimisation des modèles pour votre matériel.

### Pourquoi exécuter un LLM en local ?

- **Confidentialité totale** : Vos données ne quittent jamais votre machine
- **Zéro coût d'API** : Pas de facturation à l'usage, seulement l'électricité
- **Fonctionne hors ligne** : Aucune dépendance à une connexion internet
- **Latence minimale** : Pas de latence réseau, réponses instantanées
- **Personnalisation** : Contrôle total sur les modèles et paramètres

Pour approfondir les avantages de l'auto-hébergement, consultez [Pourquoi Auto-Héberger ses Outils IA](/blog/auto-heberger-outils-ia).

## Configuration matérielle requise

### Exigences minimales et recommandées

| Composant | Minimum | Recommandé | Optimal |
|---|---|---|---|
| CPU | 4 coeurs, x86_64 | 8 coeurs, moderne | Apple M1 Pro+ / Ryzen 9 |
| RAM | 8 Go | 16 Go | 32 Go+ |
| GPU | Aucun (CPU only) | 8 Go VRAM | 16-24 Go VRAM |
| Stockage | 10 Go libres | 50 Go SSD | 100 Go+ NVMe |
| OS | macOS, Linux, Windows | macOS M1+ ou Linux | macOS M2/M3 ou Linux + NVIDIA |

### Peut-on vraiment tourner un LLM sans GPU ?

Oui, avec des limitations. Ollama supporte l'exécution sur CPU seul grâce à la quantification. Les petits modèles (1-3 milliards de paramètres) tournent correctement sur CPU avec 8 Go de RAM. Les performances seront modestes (3-8 tokens/seconde) mais fonctionnelles pour de la conversation ou du RAG local.

### Les Mac Apple Silicon : le sweet spot

Les Mac avec puces M1, M2, M3 et M4 sont particulièrement adaptés à Ollama. L'architecture unifiée CPU/GPU permet d'utiliser la RAM comme VRAM, offrant des performances exceptionnelles pour le prix :

| Mac | RAM | Meilleur modèle possible | Vitesse approx. |
|---|---|---|---|
| Mac Mini M1 | 8 Go | Llama 3.2 3B | 15-20 t/s |
| MacBook Air M2 | 16 Go | Mistral 7B | 20-30 t/s |
| MacBook Pro M2 Pro | 16 Go | Llama 3.1 8B | 25-35 t/s |
| Mac Mini M2 Pro | 32 Go | Llama 3.1 13B | 15-25 t/s |
| MacBook Pro M3 Max | 64 Go | Llama 3.1 70B | 8-15 t/s |

## Installation d'Ollama

### Sur macOS

```bash
# Méthode 1 : via Homebrew
brew install ollama

# Méthode 2 : téléchargement direct
# Téléchargez depuis https://ollama.com/download
```

### Sur Linux

```bash
# Installation en une commande
curl -fsSL https://ollama.com/install.sh | sh
```

### Sur Windows

Téléchargez l'installateur depuis [ollama.com/download](https://ollama.com/download). L'installation est classique : next, next, finish.

### Vérification de l'installation

```bash
# Vérifier qu'Ollama tourne
ollama --version

# Lancer le service (si pas déjà actif)
ollama serve

# Tester avec un petit modèle
ollama run llama3.2:3b
```

## Sélection des modèles : lesquels choisir ?

### Les meilleurs modèles par catégorie

| Modèle | Taille | RAM nécessaire | Points forts | Cas d'usage |
|---|---|---|---|---|
| Llama 3.2 1B | ~1 Go | 4 Go | Rapide, compact | Tests, intégration |
| Llama 3.2 3B | ~2 Go | 8 Go | Bon ratio taille/perf | Conversation légère |
| Llama 3.1 8B | ~5 Go | 16 Go | Polyvalent, performant | Usage général |
| Mistral 7B | ~4 Go | 16 Go | Francais correct, rapide | Conversation, code |
| Gemma 2 9B | ~5 Go | 16 Go | Bon raisonnement | Analyse, rédaction |
| Llama 3.1 13B | ~7 Go | 32 Go | Qualité supérieure | Travail sérieux |
| Qwen 2.5 14B | ~9 Go | 32 Go | Multilingue, code | Code, multilingue |
| Llama 3.1 70B | ~40 Go | 64 Go | Excellent, quasi-GPT-4 | Projets avancés |
| DeepSeek R1 8B | ~5 Go | 16 Go | Raisonnement, code | Code, réflexion |

### Nos recommandations par profil

**Débutant avec 8 Go de RAM** : Llama 3.2 3B
- Compact, rapide, suffisant pour découvrir les LLM locaux

**Utilisateur standard avec 16 Go de RAM** : Llama 3.1 8B
- Le meilleur ratio qualité/performance pour la plupart des usages

**Développeur avec 16 Go de RAM** : DeepSeek Coder 6.7B ou Qwen 2.5 Coder 7B
- Optimisés pour le code, excellents pour l'assistance au développement

**Pro avec 32 Go+ de RAM** : Llama 3.1 13B ou Qwen 2.5 14B
- Qualité significativement supérieure pour le travail professionnel

### Télécharger et lancer un modèle

```bash
# Télécharger et lancer un modèle
ollama run llama3.1:8b

# Lister les modèles installés
ollama list

# Supprimer un modèle
ollama rm llama3.2:3b

# Voir les détails d'un modèle
ollama show llama3.1:8b
```

## La quantization : clé de l'exécution locale

### Qu'est-ce que la quantization ?

La quantization réduit la précision des poids du modèle (de 16 bits à 4 bits par exemple), diminuant drastiquement l'empreinte mémoire et la taille du fichier, avec une perte de qualité minimale.

### Impact de la quantization

| Format | Taille modèle 7B | Perte de qualité | RAM nécessaire |
|---|---|---|---|
| Q4_0 (4-bit) | ~3,8 Go | Modérée | 8 Go |
| Q4_K_M (4-bit optimisé) | ~4,4 Go | Faible | 8-16 Go |
| Q5_K_M (5-bit) | ~5,1 Go | Très faible | 16 Go |
| Q6_K (6-bit) | ~5,5 Go | Négligeable | 16 Go |
| Q8_0 (8-bit) | ~6,7 Go | Quasi-nulle | 16 Go |
| F16 (16-bit) | ~13 Go | Aucune | 32 Go |

### Recommandation

Pour la plupart des utilisateurs, **Q4_K_M** offre le meilleur compromis entre taille et qualité. Si vous avez suffisamment de RAM, passez à Q5_K_M pour une qualité légèrement supérieure.

## Optimiser les performances

### Paramètres d'exécution

```bash
# Ajuster le contexte (nombre de tokens en mémoire)
ollama run llama3.1:8b --ctx-size 4096

# Ajuster le nombre de threads CPU
ollama run llama3.1:8b --threads 8

# Mode GPU only (force l'utilisation du GPU)
OLLAMA_GPU=1 ollama run llama3.1:8b
```

### Astuces de performance

1. **Fermez les applications gourmandes** : Libérez un maximum de RAM pour le modèle
2. **Utilisez le bon niveau de quantization** : Q4_K_M pour les machines limitées, Q5+ pour les machines puissantes
3. **Réduisez le contexte** : Un contexte de 2048 tokens consomme moins de RAM que 8192
4. **Choisissez le bon modèle** : Un 7B bien quantizé est préférable à un 13B mal quantizé
5. **Utilisez SSD/NVMe** : Le chargement initial du modèle est beaucoup plus rapide sur SSD

### Monitoring des ressources

```bash
# Sur macOS : surveiller l'utilisation GPU
sudo powermetrics --samplers gpu_power -i 5000

# Sur Linux : surveiller l'utilisation RAM/GPU
watch -n 1 nvidia-smi  # Pour NVIDIA
htop  # Pour la RAM générale
```

## Intégrer Ollama dans vos workflows

### Utilisation avec Open WebUI

Pour une interface de type ChatGPT locale, consultez notre guide [Open WebUI + Ollama : Construisez votre ChatGPT Privé](/blog/open-webui-ollama-chatgpt-prive). C'est la combinaison idéale pour une expérience utilisateur complète.

### Utilisation via API

Ollama expose une API REST compatible avec le format OpenAI :

```bash
# Requête simple
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1:8b",
  "prompt": "Expliquez la photosynthèse en français"
}'

# Format compatible OpenAI
curl http://localhost:11434/v1/chat/completions -d '{
  "model": "llama3.1:8b",
  "messages": [
    {"role": "user", "content": "Expliquez la photosynthèse"}
  ]
}'
```

### Intégration avec n8n

Pour automatiser des tâches avec votre LLM local, consultez [n8n avec l'IA : 5 Workflows d'Automatisation](/blog/n8n-ia-5-workflows). n8n peut appeler Ollama comme n'importe quel autre LLM via son API.

### Créer un modèle personnalisé avec Ollama

```bash
# Créer un Modelfile
cat > Modelfile << EOF
FROM llama3.1:8b
PARAMETER temperature 0.7
PARAMETER top_p 0.9
SYSTEM Tu es un assistant expert en marketing digital. Tu réponds toujours en français avec un ton professionnel mais accessible.
EOF

# Construire le modèle
ollama create marketing-assistant -f Modelfile

# Lancer le modèle personnalisé
ollama run marketing-assistant
```

## Dépannage courant

### Problèmes fréquents et solutions

| Problème | Cause | Solution |
|---|---|---|
| "out of memory" | RAM/VRAM insuffisante | Utilisez un modèle plus petit ou Q4_K_M |
| Réponses lentes | CPU seul, pas de GPU | Passez à un modèle 3B ou réduisez le contexte |
| Ollama ne démarre pas | Port occupé | Changez le port : `OLLAMA_HOST=0.0.0.0:8080` |
| Modèle non trouvé | Modèle pas encore téléchargé | Lancez `ollama pull <modele>` |
| Qualité médiocre | Mauvaise quantization | Passez à Q5_K_M ou Q6_K |

## FAQ

### Peut-on vraiment utiliser Ollama sans GPU ?

Oui, absolument. Les modèles quantizés en Q4 peuvent tourner sur CPU seul avec 8 Go de RAM. Les performances sont plus lentes (3-8 tokens/seconde) mais fonctionnelles pour de la conversation, du RAG ou de l'analyse de texte.

### Quel est le meilleur modèle pour commencer ?

Llama 3.2 3B est le meilleur point d'entrée : petit (2 Go), rapide, et suffisant pour comprendre les capacités d'un LLM local. Ensuite, passez à Llama 3.1 8B pour un usage sérieux.

### Ollama est-il sécurisé pour des données sensibles ?

Ollama tourne entièrement en local. Aucune donnée n'est envoyée sur internet. C'est l'une des raisons principales de choisir l'exécution locale. Pour plus de détails sur les avantages sécurité, lisez [Pourquoi Auto-Héberger ses Outils IA](/blog/auto-heberger-outils-ia).

### Peut-on utiliser Ollama en production ?

Ollama peut servir de backend pour des applications de production. L'API REST est stable et le format compatible OpenAI facilite l'intégration. Cependant, pour une production robuste, combinez Ollama avec un reverse proxy, du monitoring et des stratégies de fallback.

### Quelle est la différence entre Ollama et llama.cpp ?

Ollama est une surcouche qui utilise llama.cpp (et d'autres backends) sous le hood. Ollama simplifie l'installation, la gestion des modèles et l'API. llama.cpp offre plus de contrôle mais nécessite plus de configuration technique. Pour la plupart des utilisateurs, Ollama est le choix recommandé.

## Mise à jour — Avril 2026

Ollama a considérablement évolué depuis début 2025. La version actuelle supporte désormais les modèles multimodaux (vision + texte), les embeddings natifs, et une API compatible OpenAI complète. Les performances sur Mac Apple Silicon ont été améliorées de 30 à 50% grâce à l'optimisation du backend Metal. Côté modèles, Llama 3.3, DeepSeek R1, Qwen 2.5 et Mistral Small sont les ajouts notables qui offrent des capacités quasi-GPT-4 à un coût nul. L'écosystème s'est aussi enrichi : [Open WebUI](/blog/open-webui-ollama-chatgpt-prive) propose une interface complète, et les intégrations avec [n8n](/blog/n8n-ia-5-workflows) et [Dify](/blog/dify-vs-langflow) permettent de construire des automatisations locales puissantes. Si vous n'avez pas encore essayé Ollama, c'est le moment : l'outil est mature, les modèles sont performants, et l'installation prend littéralement 2 minutes.