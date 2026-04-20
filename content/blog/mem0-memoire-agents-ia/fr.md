---
title: "Mem0 : Donner une Mémoire à Long Terme à vos Agents IA (Tutoriel)"
excerpt: "Tutoriel complet sur Mem0 : comment donner une mémoire persistante à vos agents IA, architecture, intégration LangChain et cas d'usage concrets."
date: "2026-04-19"
author: "Pulseia"
category: "IA"
readTime: "13 min"
coverImage: "/blog/placeholder-cover.svg"
---

Le problème est universel : vous discutez avec un agent IA, lui donnez des informations, et à la conversation suivante, il a tout oublié. **Mem0** résout ce problème en donnant une mémoire à long terme persistante à vos agents IA. Tutoriel complet.

## Le problème de la mémoire dans les agents IA

### Pourquoi les LLM n'ont pas de mémoire native

Les LLM sont des modèles stateless : ils ne conservent aucune information entre deux appels. Les conversations sont maintenues en renvoyant l'historique à chaque message, mais cet historique a une limite (la fenêtre de contexte) et disparaît à la fin de la session.

### Les conséquences sans mémoire

- L'utilisateur doit se répéter à chaque nouvelle conversation
- Les préférences et le contexte personnel sont perdus
- L'agent ne peut pas apprendre de ses interactions
- L'expérience utilisateur est frustrante et répétitive

### Les approches existantes avant Mem0

| Approche | Limite |
|---|---|
| Historique de conversation | Limité par la fenêtre de contexte (8k-128k tokens) |
| Résumé de conversation | Perte de détails, résumé générique |
| Base de données clé-valeur | Pas de compréhension sémantique |
| Vector store brut | Pas de structure, pas de gestion automatique |

Mem0 propose une approche fondamentalement différente : une **mémoire sémantique structurée** qui comprend ce qui est important à retenir.

## Qu'est-ce que Mem0 ?

Mem0 (prononcé "mem-zero") est un framework open source qui fournit une couche de mémoire persistante et intelligente pour les applications IA. Il analyse automatiquement les conversations, extrait les informations pertinentes, et les stocke de manière structurée pour un rappel ultérieur.

### Architecture de Mem0

```
Conversation → Mem0 → Extraction automatique des faits
                        → Stockage structuré (vector + graph)
                        → Rappel contextuel lors des futures requêtes
```

| Composant | Rôle |
|---|---|
| Memory Extractor | Extrait les faits et préférences des conversations |
| Vector Store | Stockage sémantique des mémoires |
| Graph Memory | Relations entre les mémoires (optionnel) |
| Memory Retriever | Rappel des mémoires pertinentes pour une requête |
| API | Interface simple pour ajouter/rechercher/supprimer des mémoires |

### Types de mémoires gérés

| Type | Exemple | Importance |
|---|---|---|
| Préférences | "Préfère les réponses concises" | Haute |
| Faits personnels | "Travaille chez Google comme ingénieur" | Haute |
| Contexte de projet | "Projet en cours : refonte du site vitrine" | Haute |
| Historique d'actions | "A déjà essayé la solution X" | Moyenne |
| Tonalité | "Communique de manière décontractée" | Moyenne |
| Détails de conversation | "A mentionné un chien nommé Rex" | Basse |

## Installation et configuration

### Installation

```bash
# Via pip
pip install mem0ai

# Via poetry
poetry add mem0ai
```

### Configuration de base

```python
from mem0 import Memory

# Configuration avec OpenAI
config = {
    "llm": {
        "provider": "openai",
        "config": {
            "model": "gpt-4o-mini",
            "api_key": "votre-cle-openai"
        }
    },
    "embedder": {
        "provider": "openai",
        "config": {
            "model": "text-embedding-3-small"
        }
    },
    "vector_store": {
        "provider": "qdrant",
        "config": {
            "collection_name": "memories",
            "path": "./qdrant_data"
        }
    }
}

memory = Memory.from_config(config)
```

### Configuration avec Ollama (local)

```python
config = {
    "llm": {
        "provider": "ollama",
        "config": {
            "model": "llama3.1:8b",
            "base_url": "http://localhost:11434"
        }
    },
    "embedder": {
        "provider": "ollama",
        "config": {
            "model": "nomic-embed-text",
            "base_url": "http://localhost:11434"
        }
    },
    "vector_store": {
        "provider": "qdrant",
        "config": {
            "collection_name": "memories",
            "path": "./qdrant_data"
        }
    }
}

memory = Memory.from_config(config)
```

Pour installer Ollama, consultez [Ollama : Comment Faire Tourner un LLM en Local](/blog/ollama-llm-local).

## Utilisation de base

### Ajouter des mémoires

```python
# Ajouter une mémoire depuis une conversation
result = memory.add(
    "Je m'appelle Pierre et je travaille comme data scientist chez Renault. J'utilise principalement Python et j'ai un chien qui s'appelle Rex.",
    user_id="pierre"
)

# Mem0 extrait automatiquement :
# - "L'utilisateur s'appelle Pierre"
# - "Pierre travaille comme data scientist chez Renault"
# - "Pierre utilise principalement Python"
# - "Pierre a un chien nommé Rex"

print(result)
```

### Rechercher des mémoires

```python
# Recherche sémantique
results = memory.search(
    "Quel est le métier de Pierre ?",
    user_id="pierre"
)

for result in results:
    print(f"Score: {result['score']}")
    print(f"Memory: {result['memory']}")
```

### Lister toutes les mémoires

```python
# Toutes les mémoires d'un utilisateur
all_memories = memory.get_all(user_id="pierre")

for m in all_memories:
    print(f"ID: {m['id']}")
    print(f"Memory: {m['memory']}")
    print(f"Created: {m['created_at']}")
    print("---")
```

### Supprimer des mémoires

```python
# Supprimer une mémoire spécifique
memory.delete(memory_id="mem_abc123", user_id="pierre")

# Supprimer toutes les mémoires d'un utilisateur
memory.delete_all(user_id="pierre")
```

## Intégration avec LangChain

Mem0 s'intègre naturellement avec LangChain pour créer des agents avec mémoire persistante :

```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from mem0 import Memory

# Initialiser Mem0
memory = Memory.from_config(config)

# Initialiser le LLM
llm = ChatOpenAI(model="gpt-4o-mini")

def chat_with_memory(user_id: str, message: str):
    # 1. Récupérer les mémoires pertinentes
    relevant_memories = memory.search(message, user_id=user_id)
    memories_text = "\n".join([m["memory"] for m in relevant_memories])

    # 2. Construire le prompt avec la mémoire
    system_prompt = f"""Tu es un assistant IA utile et personnalisé.
Voici ce que tu sais sur cet utilisateur :
{memories_text}

Utilise ces informations pour personnaliser tes réponses.
Si de nouvelles informations sur l'utilisateur apparaissent dans
la conversation, note-les."""

    # 3. Générer la réponse
    response = llm.invoke([
        SystemMessage(content=system_prompt),
        HumanMessage(content=message)
    ])

    # 4. Sauvegarder les nouvelles mémoires
    memory.add(message, user_id=user_id)

    return response.content

# Utilisation
print(chat_with_memory("pierre", "Qu'est-ce que tu sais de moi ?"))
print(chat_with_memory("pierre", "J'ai commencé un nouveau projet de RAG avec LlamaIndex"))
```

Pour en savoir plus sur LlamaIndex, consultez [LlamaIndex Expliqué Simplement](/blog/llamaindex-explication-simple).

## Intégration avec des applications LLM

### Avec OpenAI Assistants API

```python
import openai
from mem0 import Memory

memory = Memory.from_config(config)
client = openai.OpenAI()

def create_memory_aware_response(user_id, thread_id, message):
    # Ajouter le message à Mem0
    memory.add(message, user_id=user_id)

    # Récupérer le contexte mémoire
    memories = memory.search(message, user_id=user_id)
    memory_context = "\n".join([m["memory"] for m in memories[:5]])

    # Envoyer au thread OpenAI avec contexte mémoire
    client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=f"[Contexte utilisateur : {memory_context}]\n\n{message}"
    )
```

### Avec Dify ou LangFlow

Pour créer des agents avec mémoire dans des plateformes no-code, [Dify](/blog/dify-vs-langflow) et LangFlow peuvent être étendus avec des composants personnalisés qui appellent l'API Mem0.

## Cas d'usage concrets

### 1. Assistant personnel qui se souvient

Un assistant qui connaît vos préférences, votre contexte professionnel et vos habitudes :

```python
# Conversation 1
memory.add("Je suis végétarien et j'aime la cuisine italienne", user_id="marie")
memory.add("J'ai une réunion importante demain à 10h", user_id="marie")

# Conversation 2 (jours plus tard)
results = memory.search("suggestions de restaurant", user_id="marie")
# Retrouve automatiquement : "Marie est végétarienne et aime la cuisine italienne"
```

### 2. Support client avec historique

Un chatbot de support qui se souvient de chaque client :

```python
# Client signale un problème
memory.add(
    "Le client signale un bug sur la page de paiement avec Safari",
    user_id="client_456"
)

# Semaine suivante, le client revient
results = memory.search("problème de paiement", user_id="client_456")
# L'agent sait déjà qu'un bug Safari a été signalé
```

### 3. Agent de productivité

Un agent qui apprend de votre workflow :

```python
memory.add(
    "Pierre prépare ses rapports hebdomadaires le vendredi matin",
    user_id="pierre"
)
memory.add(
    "Pierre utilise Google Docs pour les rapports et Notion pour les notes",
    user_id="pierre"
)

# Plus tard, l'agent peut proactivement suggérer :
# "C'est vendredi, voulez-vous que je prépare le template de rapport hebdomadaire ?"
```

## Bonnes pratiques

### Structure des mémoires

- **Un fait par entrée** : Mem0 extrait automatiquement les faits individuels
- **Métadonnées utiles** : Ajoutez des métadonnées (source, date, catégorie)
- **Nettoyage régulier** : Supprimez les mémoires obsolètes
- **Scoping** : Utilisez `user_id` et des métadonnées pour segmenter les mémoires

### Performance

```python
# Limiter le nombre de résultats de recherche
results = memory.search(query, user_id=user_id, limit=5)

# Utiliser des métadonnées pour filtrer
memory.add(
    "Préférence : réponses en français",
    user_id="pierre",
    metadata={"category": "preference", "importance": "high"}
)
```

### Gestion des conflits

Mem0 gère automatiquement les conflits : si une information est mise à jour, l'ancienne version est remplacée. Par exemple, si l'utilisateur change de travail, Mem0 met à jour la mémoire "travaille chez X" sans créer de doublon.

## FAQ

### Mem0 est-il gratuit ?

Mem0 est open source (licence MIT) et gratuit en auto-hébergement. Le service cloud Mem0 Platform propose un plan gratuit (10k mémoires) et des plans payants à partir de 29$/mois. Pour l'auto-hébergement, consultez [Pourquoi Auto-Héberger ses Outils IA](/blog/auto-heberger-outils-ia).

### Quelle est la différence entre Mem0 et un simple vector store ?

Un vector store stocke et retrouve des textes par similarité. Mem0 fait bien plus : il extrait automatiquement les faits des conversations, les structure, gère les mises à jour et les conflits, et les rappelle intelligemment. C'est une couche de mémoire intelligente, pas un simple stockage.

### Mem0 fonctionne-t-il avec les modèles locaux ?

Oui, Mem0 supporte Ollama comme backend LLM et embedder. Pour une configuration entièrement locale et gratuite, utilisez Mem0 + Ollama + Qdrant. Consultez [Ollama : Comment Faire Tourner un LLM en Local](/blog/ollama-llm-local).

### Les mémoires sont-elles sécurisées ?

En auto-hébergement, les mémoires sont stockées localement sur votre infrastructure. La sécurité dépend de votre configuration (chiffrement, accès, sauvegardes). En cloud, Mem0 chiffre les données en transit et au repos.

### Peut-on utiliser Mem0 avec plusieurs utilisateurs ?

Oui, Mem0 gère nativement le multi-utilisateurs avec le paramètre `user_id`. Chaque utilisateur a un espace de mémoire isolé. Vous pouvez aussi créer des mémoires partagées au niveau d'un groupe ou d'une organisation.

## Mise à jour — Avril 2026

Mem0 a considérablement évolué. La version actuelle propose un **Graph Memory** optionnel qui modélise les relations entre les mémoires (par exemple, "Pierre travaille chez Renault" est lié à "Renault est une entreprise automobile"). L'extraction automatique est plus précise et plus rapide. L'intégration avec LangChain, [LlamaIndex](/blog/llamaindex-explication-simple) et [Dify](/blog/dify-vs-langflow) a été simplifiée. Le support des modèles locaux via [Ollama](/blog/ollama-llm-local) est stable. Si vous construisez des agents IA qui doivent se souvenir de leurs utilisateurs, Mem0 est désormais un outil de production mature. La mémoire persistante n'est plus un luxe : c'est une fonctionnalité essentielle pour toute application IA sérieuse.