---
title: "AutoGen Pas à Pas : Créez Votre Première Équipe d'Agents IA en 30 Minutes"
excerpt: "Apprenez à utiliser AutoGen pour créer une équipe d'agents IA collaboratifs en Python, avec un tutoriel étape par étape accessible aux débutants."
date: "2026-04-19"
author: "Pulseia"
category: "Automation"
readTime: "12 min"
coverImage: "/blog/autogen-tutoriel-debutant/cover.jpg"
---

Si vous avez déjà utilisé ChatGPT ou Claude en solo, vous connaissez la puissance d'un seul LLM. Mais imaginez maintenant plusieurs agents IA qui discutent entre eux, se répartissent les tâches, se critiquent mutuellement et produisent un résultat final supérieur à ce qu'un seul agent pourrait obtenir. C'est exactement ce que permet AutoGen. Dans ce tutoriel, vous allez créer votre première équipe d'agents IA en moins de 30 minutes, sans expérience préalable requise.

## Qu'est-ce qu'AutoGen ?

AutoGen est un framework open source développé par Microsoft Research qui permet de créer des conversations multi-agents où plusieurs LLM (ou des mélanges de LLM et d'humains) collaborent pour résoudre des problèmes complexes. Contrairement à une interaction classique utilisateur-chatbot, AutoGen orchestre des dialogues entre agents autonomes.

### Les concepts fondamentaux

- **Agent** : un participant autonome dans la conversation. Chaque agent a un rôle, des capacités et un comportement définis par son system prompt et les outils auxquels il a accès.
- **Conversation** : un échange structuré entre plusieurs agents. La conversation suit des règles de tour de parole (qui parle quand) et de terminaison (quand arrêter).
- **AssistantAgent** : un agent propulsé par un LLM qui peut raisonner, utiliser des outils et générer du code.
- **UserProxyAgent** : un agent qui représente l'utilisateur humain. Il peut exécuter du code, valider des résultats et intervenir manuellement dans la conversation.
- **GroupChat** : une conversation entre plus de deux agents, avec un mécanisme de sélection du prochain locuteur.

### Pourquoi utiliser AutoGen ?

AutoGen brille dans les scénarios où la collaboration entre agents apporte une valeur ajoutée :

- **Génération et révision de code** : un agent écrit le code, un autre le révise, un troisième l'exécute et teste.
- **Recherche et synthèse** : un agent cherche, un autre synthétise, un troisième vérifie les faits.
- **Débat et raffinement** : deux agents débattent d'une solution, un arbitre tranche.
- **Planification et exécution** : un planificateur décompose une tâche, des exécutants la réalisent.

Pour comparer AutoGen avec d'autres frameworks d'orchestration, consultez notre article [CrewAI vs AutoGen : Quel Framework Choisir pour Orchestrer vos Agents ?](/blog/crewai-vs-autogen).

## Installation et Configuration

### Prérequis

- Python 3.9 ou supérieur
- Un compte OpenAI avec une clé API (ou tout autre fournisseur LLM supporté)
- Un éditeur de code (VS Code recommandé)

### Installation

```bash
pip install autogen-agentpy
```

### Configuration de la clé API

Créez un fichier `OAI_CONFIG_LIST` à la racine de votre projet :

```json
[
  {
    "model": "gpt-4o",
    "api_key": "votre-clé-api-openai"
  }
]
```

Ou utilisez une variable d'environnement :

```bash
export OPENAI_API_KEY="votre-clé-api-openai"
```

### Vérification de l'installation

```python
import autogen

print(f"AutoGen version : {autogen.__version__}")
```

Si ce code s'exécute sans erreur, vous êtes prêt.

## Tutoriel : Créer une Équipe de Deux Agents en 30 Minutes

### Objectif

Nous allons créer une équipe de deux agents :
1. **L'Assistant** : un agent qui génère du code Python pour résoudre un problème.
2. **L'Utilisateur** : un agent proxy qui exécute le code et valide les résultats.

### Étape 1 : Importer les modules nécessaires

```python
import autogen

# Configuration du LLM
llm_config = {
    "model": "gpt-4o",
    "api_key": "votre-clé-api",
    "temperature": 0.7
}
```

### Étape 2 : Créer l'AssistantAgent

```python
assistant = autogen.AssistantAgent(
    name="Assistant",
    llm_config=llm_config,
    system_message="""Tu es un développeur Python expert. Quand on te demande de résoudre
    un problème, tu écris du code Python clair et bien commenté.
    Tu encapsules toujours ton code dans des blocs markdown ```python.
    Tu vérifies que ton code gère les cas limites et les erreurs."""
)
```

### Étape 3 : Créer le UserProxyAgent

```python
user_proxy = autogen.UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=5,
    code_execution_config={
        "work_dir": "coding",
        "use_docker": False
    },
    system_message="""Tu es un exécuteur de code. Quand l'assistant te fournit du code,
    tu l'exécutes et tu rapportes le résultat. Si le code échoue,
    tu signales l'erreur pour que l'assistant puisse corriger."""
)
```

Le paramètre `human_input_mode="NEVER"` signifie que l'agent ne demandera jamais d'input humain — il fonctionnera de manière totalement autonome. Si vous souhaitez intervenir manuellement, utilisez `"ALWAYS"` ou `"TERMINATE"`.

### Étape 4 : Lancer la conversation

```python
user_proxy.initiate_chat(
    assistant,
    message="""Crée un script Python qui :
    1. Télécharge les données de l'API publique https://api.exchangerate-api.com/v4/latest/EUR
    2. Affiche les 5 devises avec le taux le plus élevé par rapport à l'euro
    3. Génère un graphique barre avec matplotlib
    Sauvegarde le graphique sous 'top_currencies.png'."""
)
```

### Ce qui se passe sous le capot

Voici le déroulement typique de la conversation :

1. L'utilisateur envoie la demande à l'assistant.
2. L'assistant génère du code Python pour résoudre le problème.
3. Le UserProxyAgent extrait le code du message de l'assistant et l'exécute.
4. Si le code fonctionne, le résultat est renvoyé à l'assistant qui peut le valider ou l'améliorer.
5. Si le code échoue, l'erreur est renvoyée à l'assistant qui corrige et réessaie.
6. Le cycle continue jusqu'à ce que la tâche soit accomplie ou que le nombre maximal de tours soit atteint.

### Résultat attendu

```
User (to Assistant):
Crée un script Python qui : ...

Assistant (to User):
Voici le script Python : ```python ... ```

User (to Assistant):
Le code s'est exécuté avec succès. Voici la sortie : ...

Assistant (to User):
Parfait ! Le graphique a été sauvegardé...
TERMINATE
```

## Aller Plus Loin : Conversation de Groupe avec GroupChat

Le vrai pouvoir d'AutoGen se révèle avec les conversations de groupe. Ajoutons un troisième agent : un critique de code.

### Étape 5 : Ajouter un agent Critique

```python
critic = autogen.AssistantAgent(
    name="Critic",
    llm_config=llm_config,
    system_message="""Tu es un réviseur de code exigeant. Quand l'assistant
    fournit du code, tu l'analyses pour :
    - Vérifier la gestion des erreurs
    - Vérifier la performance
    - Vérifier la lisibilité et les conventions PEP 8
    - Suggérer des améliorations concrètes
    Sois constructif mais rigoureux."""
)
```

### Étape 6 : Créer le GroupChat

```python
groupchat = autogen.GroupChat(
    agents=[user_proxy, assistant, critic],
    messages=[],
    max_round=12,
    speaker_selection_method="auto"
)

manager = autogen.GroupChatManager(
    groupchat=groupchat,
    llm_config=llm_config
)
```

### Étape 7 : Lancer la conversation de groupe

```python
user_proxy.initiate_chat(
    manager,
    message="""Crée une fonction Python qui calcule la suite de Fibonacci
    de manière optimisée (avec mémoïsation). Le critique doit valider
    le code avant sa finalisation."""
)
```

Dans cette configuration, les trois agents discutent entre eux :
- L'assistant écrit le code.
- Le critique l'analyse et suggère des améliorations.
- L'assistant modifie le code en conséquence.
- Le cycle se répète jusqu'à validation ou épuisement des tours.

## Tableau des Modes de Sélection du Locuteur

| Méthode | Description | Quand l'utiliser |
|---------|-------------|------------------|
| `"auto"` | Le LLM choisit le prochain locuteur | Conversations dynamiques, rôles variés |
| `"round_robin"` | Les agents parlent à tour de rôle | Conversations structurées, débats |
| `"random"` | Sélection aléatoire | Expérimentation, diversité |
| Personnalisée | Fonction Python qui retourne l'agent suivant | Logique métier spécifique |

## Conseils pour les Débutants

### 1. Commencez simple

Ne créez pas une équipe de 10 agents dès le départ. Commencez avec 2 agents (assistant + utilisateur), puis ajoutez-en progressivement. Chaque agent supplémentaire augmente la complexité de la conversation et les coûts.

### 2. Soignez les system prompts

Le comportement de chaque agent dépend entièrement de son `system_message`. Plus vos prompts sont précis, plus les agents seront performants. Un prompt vague produit un agent erratique.

### 3. Limitez les tours de parole

Utilisez `max_round` pour éviter que la conversation ne tourne en boucle indéfiniment. C'est aussi une question de coût : chaque tour consomme des tokens.

### 4. Activez l'exécution de code avec précaution

L'exécution automatique de code est puissante mais dangereuse. En développement, utilisez `use_docker=True` pour isoler l'exécution. En production, imposez des limites strictes (timeout, permissions fichier).

### 5. Surveillez les coûts

Chaque message entre agents consomme des tokens. Une conversation de groupe de 4 agents sur 10 rounds peut facilement consommer 50 000+ tokens. Utilisez des modèles moins chers (GPT-4o-mini) pour les agents qui n'ont pas besoin de raisonnement complexe.

## Limites d'AutoGen

AutoGen est un framework puissant, mais il a ses limites :

- **Coûts de tokens** : les conversations multi-agents consomment beaucoup de tokens, ce qui peut devenir coûteux à grande échelle.
- **Complexité de debugging** : quand 4 agents discutent entre eux, il est difficile de comprendre pourquoi une conversation a pris une direction inattendue.
- **Pas de persistance native** : AutoGen n'offre pas de mécanisme de checkpoint intégré comme LangGraph. Une conversation interrompue est perdue.
- **Sélection du locuteur imparfaite** : la méthode `"auto"` repose sur le LLM pour choisir le prochain locuteur, ce qui peut mener à des choix suboptimaux.
- **Couplage fort avec OpenAI** : bien que d'autres fournisseurs soient supportés, l'expérience optimale reste avec les modèles OpenAI.

Si ces limites vous concernent, envisagez d'explorer [LangGraph et ses workflows cycliques](/blog/langgraph-workflows-cycliques) pour la persistance, ou [CrewAI](/blog/crewai-vs-autogen) pour une approche plus structurée des rôles.

## Comparaison Rapide avec d'Autres Frameworks

| Critère | AutoGen | CrewAI | LangGraph |
|---------|---------|--------|-----------|
| **Approche** | Conversations multi-agents | Rôles et tâches structurés | Graphes d'état |
| **Facilité de démarrage** | Moyenne | Facile | Moyenne à difficile |
| **Flexibilité** | Très haute | Modérée | Très haute |
| **Persistance** | Non native | Limitée | Native (checkpoints) |
| **Coûts de tokens** | Élevés | Modérés | Variables |
| **Cas d'usage idéal** | Débat, exploration, code | Tâches structurées | Workflows complexes |

## Exemple Complet : Agent de Recherche avec Outils

Voici un exemple plus avancé utilisant des outils personnalisés :

```python
import autogen
import requests

# Configuration
llm_config = {
    "model": "gpt-4o",
    "api_key": "votre-clé-api",
    "temperature": 0.3
}

# Définition d'un outil de recherche
def search_web(query: str) -> str:
    """Recherche sur le web via une API."""
    response = requests.get(
        "https://api.tavily.com/search",
        params={"query": query, "api_key": "votre-clé-tavily"}
    )
    return str(response.json())

# Enregistrement de l'outil
assistant = autogen.AssistantAgent(
    name="Researcher",
    llm_config=llm_config,
    system_message="""Tu es un chercheur IA. Utilise l'outil search_web
    pour trouver des informations. Synthétise les résultats
    de manière claire et citée.""",
    function_map={"search_web": search_web}
)

user_proxy = autogen.UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=3,
    code_execution_config=False
)

# Lancement
user_proxy.initiate_chat(
    assistant,
    message="Quelles sont les tendances IA en 2026 ?"
)
```

## FAQ

### Ai-je besoin d'être développeur expérimenté pour utiliser AutoGen ?

Non, une connaissance de base de Python suffit. Ce tutoriel est conçu pour les débutants. Vous devez savoir exécuter un script Python, installer des packages avec pip et comprendre la syntaxe de base (variables, fonctions, dictionnaires).

### Combien coûte une conversation multi-agents AutoGen ?

Le coût dépend du modèle utilisé, du nombre d'agents et du nombre de tours. Avec GPT-4o, comptez environ 0,05 $ à 0,50 $ par conversation de 5 à 10 tours avec 2-3 agents. Avec GPT-4o-mini, le coût est 10 à 20 fois inférieur.

### AutoGen peut-il exécuter du code en toute sécurité ?

AutoGen peut exécuter du code généré par les agents, ce qui comporte des risques. Utilisez toujours `use_docker=True` pour isoler l'exécution, ou désactivez l'exécution automatique avec `code_execution_config=False` et validez le code manuellement avant de l'exécuter.

### Quelle est la différence entre AutoGen et un simple appel à ChatGPT ?

Un appel à ChatGPT est une interaction bilatérale (utilisateur <-> modèle). AutoGen orchestre des conversations entre plusieurs agents autonomes qui collaborent, se critiquent et itèrent. Le résultat est généralement de meilleure qualité car il bénéficie de perspectives multiples et de cycles de révision.

### Puis-je utiliser AutoGen avec des modèles autres qu'OpenAI ?

Oui. AutoGen supporte plusieurs fournisseurs via la configuration `llm_config`. Vous pouvez utiliser des modèles Anthropic (Claude), locaux (via Ollama), ou tout endpoint compatible OpenAI. Cependant, l'expérience la plus fluide reste avec les modèles OpenAI.

## Mise à jour — Avril 2026

AutoGen continue d'évoluer. Voici les développements récents :

- **AutoGen 0.4+** : la nouvelle architecture basée sur des acteurs asynchrones offre de meilleures performances et une scalabilité améliorée pour les conversations de grande envergure.
- **AutoGen Studio 2.0** : l'interface web pour construire des agents sans code a été entièrement refaite. Elle permet désormais de créer, tester et déployer des équipes d'agents directement depuis le navigateur.
- **Support amélioré des outils** : AutoGen intègre désormais plus facilement des outils externes (API, bases de données, services cloud) via un système de plugins standardisé.
- **Convergence avec le reste de l'écosystème** : AutoGen s'intègre de plus en plus facilement avec LangChain (pour les intégrations) et LangGraph (pour la persistance et le flux de contrôle). Le choix du framework n'est plus exclusif.
- **Optimisation des coûts** : de nouveaux mécanismes permettent de réduire la consommation de tokens en compressant l'historique des conversations et en utilisant des modèles légers pour les agents secondaires.

Pour approfondir d'autres approches d'orchestration d'agents, découvrez [LangChain vs LangGraph : Quelles Différences](/blog/langchain-vs-langgraph) et [Semantic Kernel pour .NET](/blog/semantic-kernel-dotnet).

---

AutoGen est l'un des moyens les plus accessibles de découvrir la puissance des agents IA collaboratifs. En quelques lignes de Python, vous pouvez orchestrer une équipe d'agents qui résolvent des problèmes complexes de manière autonome. Commencez simple, expérimentez progressivement, et vous découvrirez rapidement le potentiel transformateur du multi-agents.