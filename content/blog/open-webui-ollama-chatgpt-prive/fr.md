---
title: "Open WebUI + Ollama : Construisez votre ChatGPT Privé et Gratuit en 15 Minutes"
excerpt: "Tutoriel pas à pas pour installer Open WebUI avec Ollama et créer votre propre ChatGPT privé, gratuit et hors ligne."
date: "2026-04-19"
author: "Pulseia"
category: "Automation"
readTime: "12 min"
coverImage: "/blog/open-webui-ollama-chatgpt-prive/cover.jpg"
---

Imaginez un ChatGPT entièrement gratuit, qui protège vos données, fonctionne hors ligne et que vous contrôlez à 100%. C'est exactement ce qu'offrent **Open WebUI** et **Ollama** ensemble. Ce tutoriel vous guide pour déployer cette solution en 15 minutes chrono.

## Pourquoi construire son propre ChatGPT privé ?

### Les limites de ChatGPT et des services cloud

| Aspect | ChatGPT (OpenAI) | ChatGPT privé (Ollama + Open WebUI) |
|---|---|---|
| Coût | 0-20$/mois | 0$ (électricité uniquement) |
| Confidentialité | Données envoyées à OpenAI | Données locales uniquement |
| Hors ligne | Non | Oui |
| Personnalisation | Limitée | Totale |
| Modèles disponibles | GPT-4o, GPT-4o-mini | 100+ modèles open source |
| Limite d'usage | Quotas mensuels | Illimité |
| Contrôle des données | OpenAI les conserve | Vous seul y accédez |

Pour comprendre les avantages plus larges de l'auto-hébergement, consultez [Pourquoi Auto-Héberger ses Outils IA](/blog/auto-heberger-outils-ia).

## Prérequis

### Matériel minimum

- CPU : 4 coeurs minimum
- RAM : 8 Go minimum (16 Go recommandé)
- Stockage : 10 Go libres
- OS : macOS, Linux ou Windows avec WSL2

### Logiciels nécessaires

- **Docker** : Pour lancer Open WebUI facilement
- **Ollama** : Pour exécuter les modèles de langage

Si vous n'avez pas encore installé Ollama, suivez notre guide [Ollama : Comment Faire Tourner un LLM en Local](/blog/ollama-llm-local).

## Étape 1 : Installer Ollama (3 minutes)

### Installation rapide

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows : téléchargez depuis ollama.com/download
```

### Télécharger un modèle

```bash
# Modèle recommandé pour débuter (5 Go)
ollama pull llama3.1:8b

# Si vous avez moins de RAM (2 Go)
ollama pull llama3.2:3b

# Vérifier que le modèle est disponible
ollama list
```

### Démarrer le service Ollama

```bash
# Lancer Ollama en arrière-plan
ollama serve
```

Ollama écoute par défaut sur `http://localhost:11434`.

## Étape 2 : Installer Open WebUI via Docker (5 minutes)

### Méthode recommandée : Docker

```bash
# Lancer Open WebUI connecté à Ollama
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

### Vérification

1. Ouvrez votre navigateur à `http://localhost:3000`
2. Créez votre compte administrateur (première connexion)
3. Vous devriez voir l'interface de chat avec les modèles Ollama disponibles

### Dépannage Docker

| Problème | Solution |
|---|---|
| Port 3000 occupé | Changez le port : `-p 8080:8080` |
| Ollama non détecté | Vérifiez qu'Ollama tourne sur le port 11434 |
| Erreur de permissions | Ajoutez votre utilisateur au groupe docker |
| Conteneur ne démarre pas | Vérifiez les logs : `docker logs open-webui` |

## Étape 3 : Configurer Open WebUI (5 minutes)

### Paramètres de base

Accédez aux paramètres via l'icône engrenage en haut à droite :

1. **Modèle par défaut** : Sélectionnez `llama3.1:8b`
2. **Langue** : Français (si disponible) ou laissez en anglais
3. **Thème** : Sombre ou clair selon votre préférence

### Configuration avancée

| Paramètre | Valeur recommandée | Pourquoi |
|---|---|---|
| System Prompt | Personnalisé | Définit le comportement de l'assistant |
| Temperature | 0,7 | Bon équilibre créativité/cohérence |
| Top P | 0,9 | Qualité des réponses |
| Context Length | 4096 | Mémoire de conversation |
| Max Tokens | 2048 | Longueur maximale des réponses |

### Définir un System Prompt en français

Dans les paramètres, ajoutez :

```
Tu es un assistant IA professionnel, serviable et précis.
Tu réponds toujours en français.
Tu structures tes réponses avec des titres, des listes et
des tableaux quand c'est pertinent.
Si tu ne connais pas la réponse, tu le dis honnêtement.
```

## Étape 4 : Découvrir les fonctionnalités d'Open WebUI

### Fonctionnalités principales

- **Chat multi-modèles** : Comparez les réponses de plusieurs modèles côte à côte
- **Historique des conversations** : Toutes vos discussions sont sauvegardées localement
- **Upload de documents** : Chargez des PDF, des images et du texte pour discussion
- **Prompts communautaires** : Bibliothèque de prompts partageables
- **Modèles Ollama intégrés** : Téléchargez de nouveaux modèles directement depuis l'interface
- **API compatible OpenAI** : Utilisez Open WebUI comme proxy pour d'autres applications

### Fonctionnalités avancées

| Fonctionnalité | Description |
|---|---|
| RAG intégré | Discutez avec vos documents PDF/txt |
| Modèles multimodaux | Support vision (LLaVA, Llama 3.2 Vision) |
| Génération d'images | Intégration avec AUTOMATIC1111/ComfyUI |
| TTS/STT | Synthèse vocale et reconnaissance vocale |
| Code execution | Exécution de code Python dans le chat |
| Workspaces | Organisation par projets et équipes |

## Étape 5 : Ajouter des modèles supplémentaires

### Depuis l'interface Open WebUI

1. Cliquez sur le sélecteur de modèle en haut
2. Recherchez un modèle dans la bibliothèque intégrée
3. Cliquez sur "Pull" pour le télécharger
4. Le modèle est immédiatement disponible

### Modèles recommandés pour différents usages

| Usage | Modèle | Taille | Commande |
|---|---|---|---|
| Conversation générale | Llama 3.1 8B | ~5 Go | `ollama pull llama3.1:8b` |
| Code | DeepSeek Coder 6.7B | ~4 Go | `ollama pull deepseek-coder:6.7b` |
| Français natif | Mistral 7B | ~4 Go | `ollama pull mistral:7b` |
| Vision | LLaVA 1.6 | ~5 Go | `ollama pull llava:13b` |
| Rapide et léger | Phi-3 Mini | ~2 Go | `ollama pull phi3:mini` |
| Raisonnement | DeepSeek R1 8B | ~5 Go | `ollama pull deepseek-r1:8b` |

## Comparaison avec ChatGPT

### Tableau comparatif détaillé

| Critère | ChatGPT (OpenAI) | Open WebUI + Ollama |
|---|---|---|
| Installation | Aucune | 15 minutes, Docker |
| Coût mensuel | 0-20$ | 0$ |
| Qualité des réponses | Excellente (GPT-4o) | Bonne à très bonne (7B-70B) |
| Confidentialité | Faible | Excellente |
| Hors ligne | Non | Oui |
| Modèles disponibles | 3-4 | 100+ |
| Personnalisation | Limitée | Totale |
| Multimodal | Oui (images, voix) | Partiel (vision via LLaVA) |
| Plugins/Extensions | GPT Store | Communauté open source |
| Support | OpenAI | Communauté GitHub |

### Quand préférer ChatGPT

- Vous avez besoin de la meilleure qualité possible (GPT-4o)
- Le multimodal avancé (voix, vision) est essentiel
- Vous ne voulez pas gérer d'infrastructure

### Quand préférer Open WebUI + Ollama

- La confidentialité des données est critique
- Vous avez un budget limité
- Vous voulez personnaliser l'assistant
- Vous avez besoin d'un usage illimité
- Vous travaillez hors ligne régulièrement

## Extensions et intégrations

### Intégrer avec n8n pour l'automatisation

Pour automatiser des tâches avec votre ChatGPT privé, consultez [n8n avec l'IA : 5 Workflows d'Automatisation](/blog/n8n-ia-5-workflows). Vous pouvez connecter n8n à l'API Open WebUI pour créer des pipelines d'automatisation puissants.

### Utiliser Open WebUI comme API OpenAI

Open WebUI expose une API compatible OpenAI que vous pouvez utiliser avec n'importe quel client :

```bash
# Endpoint compatible OpenAI
curl http://localhost:3000/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.1:8b",
    "messages": [
      {"role": "user", "content": "Bonjour, comment allez-vous ?"}
    ]
  }'
```

### Intégrer avec des plateformes no-code

Pour construire des agents IA plus complexes, Open WebUI peut servir de backend pour [Dify](/blog/dify-vs-langflow) ou d'autres plateformes d'automatisation.

## Déploiement pour une équipe

### Configuration multi-utilisateurs

Open WebUI supporte nativement plusieurs utilisateurs avec des rôles :

1. **Admin** : Gère les utilisateurs, les modèles et la configuration
2. **Utilisateur** : Utilise les modèles disponibles
3. **Invité** : Accès limité (désactivé par défaut)

### Sécuriser le déploiement

- Activez HTTPS avec un reverse proxy (Nginx, Caddy)
- Configurez l'authentification obligatoire
- Limitez l'accès réseau avec un VPN (Tailscale, WireGuard)
- Sauvegardez régulièrement le volume Docker `open-webui`

## FAQ

### Open WebUI est-il vraiment gratuit ?

Oui, Open WebUI est un logiciel open source (licence MIT) entièrement gratuit. Les seuls coûts sont l'électricité pour faire tourner votre machine et éventuellement le matériel si vous devez upgrader.

### Peut-on accéder à Open WebUI depuis un autre appareil ?

Oui, en configurant le binding réseau. Changez le port Docker en `-p 0.0.0.0:3000:8080` et accédez-y depuis n'importe quel appareil sur votre réseau local. Pour un accès distant, utilisez un VPN comme Tailscale.

### La qualité est-elle comparable à ChatGPT ?

Avec un modèle 8B, la qualité est bonne pour la conversation et la rédaction standard. Pour des tâches complexes (raisonnement avancé, code complexe), un modèle 70B sur une machine puissante approche la qualité de GPT-4. Consultez [Ollama : Comment Faire Tourner un LLM en Local](/blog/ollama-llm-local) pour choisir le bon modèle.

### Peut-on utiliser Open WebUI au travail ?

Absolument, c'est même l'un des principaux cas d'usage. Les entreprises utilisent Open WebUI + Ollama pour garantir la confidentialité des données tout en offrant un assistant IA à leurs équipes. Pour les implications de l'auto-hébergement, lisez [Pourquoi Auto-Héberger ses Outils IA](/blog/auto-heberger-outils-ia).

### Que faire si mon PC n'est pas assez puissant ?

Vous pouvez utiliser un modèle plus petit (Llama 3.2 1B ou 3B), réduire la quantization, ou utiliser un serveur Ollama distant. Open WebUI peut se connecter à une instance Ollama distante, vous permettant d'utiliser un PC puissant comme serveur et un PC léger comme client.

## Mise à jour — Avril 2026

Open WebUI a connu un développement impressionnant. La version actuelle propose un RAG intégré performant, le support des modèles multimodaux, et même une génération d'images locale. L'interface a été considérablement améliorée avec un design plus moderne et plus de paramètres accessibles. Côté Ollama, les nouveaux modèles comme DeepSeek R1 et Qwen 2.5 offrent des performances qui rivalisent sérieusement avec GPT-4 pour un coût nul. L'écosystème s'élargit : des intégrations avec [n8n](/blog/n8n-ia-5-workflows) facilitent l'automatisation, et [Dify](/blog/dify-vs-langflow) permet de construire des agents IA sur cette base locale. Le combo Open WebUI + Ollama est devenu la référence pour le ChatGPT privé, et la communauté continue de l'améliorer chaque semaine.