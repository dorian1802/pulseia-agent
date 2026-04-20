---
title: "LangChain vs LangGraph : Quelles Différences et Quand Passer à l'Autre ?"
excerpt: "Découvrez les différences fondamentales entre LangChain et LangGraph, quand utiliser l'un ou l'autre, et comment migrer vos agents IA vers des workflows cycliques et stateful."
date: "2026-04-19"
author: "Pulseia"
category: "Automation"
readTime: "14 min"
coverImage: "/blog/langchain-vs-langgraph/cover.jpg"
---

L'écosystème des frameworks d'agents IA a connu une évolution fulgurante ces dernières années. Si LangChain a ouvert la voie en démocratisant la création de chaînes LLM, LangGraph est venu résoudre les limitations structurelles de son prédécesseur. Mais concrètement, quelles sont les différences entre les deux ? Quand faut-il rester sur LangChain, et quand est-il pertinent de passer à LangGraph ? Ce guide complet vous donne toutes les clés pour prendre la bonne décision.

## Qu'est-ce que LangChain ?

LangChain est un framework open source lancé en octobre 2022 par Harrison Chase. Son objectif fondateur : simplifier le développement d'applications basées sur les grands modèles de langage (LLM) en fournissant une abstraction modulaire pour chaîner des appels, gérer des prompts et connecter des sources de données externes.

### Les concepts clés de LangChain

LangChain repose sur plusieurs briques fondamentales :

- **Les Chains (chaînes)** : le concept central. Une chaîne permet d'enchaîner séquentiellement des opérations — par exemple, un appel LLM suivi d'un formatage, puis d'un envoi vers une base de données. Les chaînes sont par nature linéaires et acycliques.
- **Les Agents** : des composants qui utilisent un LLM pour décider dynamiquement quelles actions entreprendre (appels d'API, recherche web, exécution de code). Les agents LangChain s'appuient sur des frameworks d'outils (toolkits) et des stratégies de raisonnement (ReAct, Plan-and-Execute).
- **Les Tools (outils)** : des fonctions que l'agent peut invoquer — recherche web, calcul, requêtes SQL, etc.
- **Les Memory (mémoire)** : des modules pour conserver le contexte entre les appels, que ce soit en mémoire ou via des bases de données vectorielles.
- **Les Retrievers (récupérateurs)** : des composants RAG pour interroger des bases de connaissances.

### Exemple de code LangChain

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Définition du prompt
prompt = ChatPromptTemplate.from_messages([
    ("system", "Tu es un expert en marketing digital."),
    ("human", "{question}")
])

# Construction de la chaîne
chain = prompt | ChatOpenAI(model="gpt-4o") | StrOutputParser()

# Exécution
result = chain.invoke({"question": "Comment améliorer le SEO d'un site e-commerce ?"})
print(result)
```

Ce pattern séquentiel — prompt, modèle, parseur — illustre parfaitement la philosophie LangChain : une exécution linéaire, prévisible et composable.

## Qu'est-ce que LangGraph ?

LangGraph est un framework plus récent, créé par la même équipe (LangChain, Inc.) pour adresser les limitations des chaînes linéaires. Lancé en début 2024, LangGraph s'inspire des graphes d'état (state graphs) et des automates finis pour permettre la création de workflows cycliques et stateful.

### Les concepts clés de LangGraph

- **Les StateGraph (graphes d'état)** : le concept central. Un graphe d'état définit des nœuds (fonctions de traitement) et des arêtes (transitions conditionnelles ou inconditionnelles) entre ces nœuds. Le graphe maintient un état partagé qui circule entre les nœuds.
- **Les Nodes (nœuds)** : des fonctions Python qui reçoivent l'état, le transforment et le retournent. Chaque nœud représente une étape de logique métier.
- **Les Edges (arêtes)** : des transitions entre les nœuds. Elles peuvent être conditionnelles (si la condition X est remplie, aller au nœud Y, sinon au nœud Z) ou inconditionnelles (toujours aller au nœud suivant).
- **Le State (état)** : un dictionnaire typé (via TypedDict ou Pydantic) qui persiste à travers l'exécution du graphe. L'état peut contenir des messages, des métriques, des compteurs, etc.
- **Les Checkpoints** : un système de persistance qui permet de sauvegarder l'état à chaque étape, offrant la possibilité de reprendre une exécution, de faire du time-travel debugging et de gérer des interactions humaines (human-in-the-loop).

### Exemple de code LangGraph

```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_openai import ChatOpenAI

# Définition de l'état
class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    iteration: int

# Nœud 1 : L'agent raisonne
def reason(state: AgentState) -> AgentState:
    llm = ChatOpenAI(model="gpt-4o")
    response = llm.invoke(state["messages"])
    return {"messages": [response], "iteration": state["iteration"] + 1}

# Nœud 2 : L'agent agit
def act(state: AgentState) -> AgentState:
    last_message = state["messages"][-1].content
    # Exécution d'une action (appel API, outil, etc.)
    result = f"Action effectuée : {last_message[:50]}..."
    return {"messages": [{"role": "assistant", "content": result}]}

# Arête conditionnelle : boucler ou terminer
def should_continue(state: AgentState) -> str:
    if state["iteration"] < 3:
        return "reason"
    return END

# Construction du graphe
graph = StateGraph(AgentState)
graph.add_node("reason", reason)
graph.add_node("act", act)
graph.add_edge(START, "reason")
graph.add_edge("reason", "act")
graph.add_conditional_edges("act", should_continue)

app = graph.compile()
```

Notez la différence fondamentale : LangGraph permet de **boucler** entre les nœuds `reason` et `act` jusqu'à ce qu'une condition soit remplie. Ce pattern cyclique est impossible avec les chaînes LangChain classiques.

## Architecture : Différences Fondamentales

### Chaînes linéaires vs Graphes d'état

La distinction la plus importante entre LangChain et LangGraph réside dans leur modèle d'exécution :

| Critère | LangChain | LangGraph |
|---------|-----------|-----------|
| **Modèle d'exécution** | Linéaire et acyclique (DAG) | Cyclique et stateful (graphe d'état) |
| **Flux de contrôle** | Implicitement séquentiel | Explicite via arêtes et conditions |
| **Persistance** | Mémoire optionnelle (Memory) | Checkpoints intégrés |
| **Boucles** | Non supportées nativement | Supportées nativement |
| **Parallélisme** | Via RunnableParallel | Via nœuds parallèles dans le graphe |
| **Observabilité** | Via LangSmith | Via LangSmith + time-travel |
| **Human-in-the-loop** | Complexe à implémenter | Natif via checkpoints et interruptions |
| **Complexité d'apprentissage** | Modérée | Plus élevée |

### Pourquoi les DAGs ne suffisent plus

Les chaînes LangChain fonctionnent parfaitement pour des pipelines simples : question -> retrieval -> LLM -> réponse. Mais dès que vous avez besoin de :

- **Ré-essayer** une action qui a échoué
- **Boucler** entre raisonnement et action (pattern ReAct)
- **Valider** un résultat avec un humain avant de continuer
- **Maintenir** un état complexe entre les étapes

... les chaînes linéaires montrent leurs limites. Vous vous retrouvez à écrire des boucles `while` manuelles, à gérer l'état avec des variables globales, et à perdre en observabilité.

LangGraph résout ces problèmes en rendant le flux de contrôle **explicite, déclaratif et persisté**.

## Quand Utiliser LangChain ?

LangChain reste un excellent choix dans plusieurs scénarios :

1. **Pipelines RAG simples** : vous avez une base de connaissances et vous voulez répondre à des questions. Un retriever + un prompt + un LLM suffisent.
2. **Chaînes de traitement séquentielles** : vous transformez des données étape par étape sans besoin de boucle (ex. : extraction d'informations -> formatage -> envoi).
3. **Prototypage rapide** : LangChain est plus simple à prendre en main et permet de construire un MVP rapidement.
4. **Intégrations avec des sources externes** : l'écosystème LangChain offre des centaines d'intégrations prêtes à l'emploi (document loaders, vector stores, tools).

## Quand Passer à LangGraph ?

Passez à LangGraph dès que votre cas d'usage implique :

1. **Des agents autonomes** : un agent qui raisonne, agit, observe le résultat et décide de continuer ou de s'arrêter. C'est le pattern ReAct, et LangGraph le gère nativement avec des boucles.
2. **Des workflows multi-étapes avec conditions** : si votre logique contient des embranchements (si X, alors Y, sinon Z) et des boucles, LangGraph est le bon outil.
3. **De l'approbation humaine** : si vous devez interrompre le workflow pour qu'un humain valide une décision, les checkpoints LangGraph le permettent sans effort.
4. **De la persistance et de la reprise** : si vous devez pouvoir reprendre un workflow après un crash ou une pause, les checkpoints sont indispensables.
5. **Des agents multi-acteurs** : si vous orchestrez plusieurs agents qui collaborent, LangGraph permet de modéliser leurs interactions sous forme de graphe.

Pour une exploration approfondie des workflows cycliques, consultez notre article dédié : [LangGraph Expliqué : Pourquoi les Workflows Cycliques Changent la Donne](/blog/langgraph-workflows-cycliques).

## Guide de Migration LangChain vers LangGraph

### Étape 1 : Identifier les patterns à migrer

Commencez par identifier les parties de votre application LangChain qui nécessitent des boucles, des conditions ou de la persistance. Les chaînes purement séquentielles peuvent rester en LangChain — les deux frameworks sont compatibles.

### Étape 2 : Définir l'état

Remplacez vos variables d'état dispersées par un `TypedDict` centralisé :

```python
from typing import TypedDict, Annotated, List
from langgraph.graph.message import add_messages

class WorkflowState(TypedDict):
    messages: Annotated[list, add_messages]
    documents: List[str]
    score: float
    approved: bool
```

### Étape 3 : Convertir les chaînes en nœuds

Chaque étape de votre chaîne devient un nœud :

```python
def retrieve(state: WorkflowState) -> dict:
    # Logique de retrieval
    docs = retriever.invoke(state["messages"][-1].content)
    return {"documents": [doc.page_content for doc in docs]}

def generate(state: WorkflowState) -> dict:
    # Logique de génération
    response = llm.invoke(state["messages"] + state["documents"])
    return {"messages": [response]}

def evaluate(state: WorkflowState) -> dict:
    # Logique d'évaluation
    score = evaluate_response(state["messages"][-1].content)
    return {"score": score}
```

### Étape 4 : Construire le graphe

```python
from langgraph.graph import StateGraph, START, END

graph = StateGraph(WorkflowState)
graph.add_node("retrieve", retrieve)
graph.add_node("generate", generate)
graph.add_node("evaluate", evaluate)

graph.add_edge(START, "retrieve")
graph.add_edge("retrieve", "generate")
graph.add_edge("generate", "evaluate")

# Boucle conditionnelle : régénérer si le score est trop bas
def should_regenerate(state: WorkflowState) -> str:
    if state["score"] < 0.7:
        return "generate"
    return END

graph.add_conditional_edges("evaluate", should_regenerate)

app = graph.compile()
```

### Étape 5 : Ajouter la persistance (optionnel)

```python
from langgraph.checkpoint.memory import MemorySaver

checkpointer = MemorySaver()
app = graph.compile(checkpointer=checkpointer)

# Exécution avec persistance
config = {"configurable": {"thread_id": "session-1"}}
result = app.invoke({"messages": [{"role": "user", "content": "Analyse ce rapport"}]}, config)

# Reprise ultérieure
result = app.invoke({"messages": [{"role": "user", "content": "Continue"}]}, config)
```

## Tableau Comparatif Détaillé

| Aspect | LangChain | LangGraph |
|--------|-----------|-----------|
| **Paradigme** | Chaînes séquentielles | Graphes d'état cycliques |
| **Créateur** | LangChain, Inc. (Harrison Chase) | LangChain, Inc. (Harrison Chase) |
| **Date de sortie** | Octobre 2022 | Début 2024 |
| **Langages** | Python, JavaScript/TypeScript | Python, JavaScript/TypeScript |
| **Courbe d'apprentissage** | Faible à modérée | Modérée à élevée |
| **Cas d'usage idéal** | RAG, pipelines, prototypage | Agents autonomes, workflows complexes |
| **Boucles** | Non (workaround manuel) | Oui (natif) |
| **Persistance** | Module Memory | Checkpoints intégrés |
| **Human-in-the-loop** | Complexe | Natif |
| **Debugging** | LangSmith | LangSmith + time-travel |
| **Intégrations** | Très riche (300+ intégrations) | Hérite des intégrations LangChain |
| **Communauté** | Très large | En croissance rapide |
| **License** | MIT | MIT |
| **Production-ready** | Oui (avec précautions) | Oui (plus robuste pour les agents) |

## Interopérabilité : Les Deux Coexistent

Un point crucial souvent négligé : **LangChain et LangGraph ne sont pas mutuellement exclusifs**. LangGraph s'appuie sur les primitives LangChain (modèles, prompts, outils). Vous pouvez :

- Utiliser LangChain pour les intégrations (loaders, vector stores, outils)
- Utiliser LangGraph pour l'orchestration et le flux de contrôle
- Combiner les deux dans la même application

```python
from langchain_openai import ChatOpenAI
from langchain_community.tools import TavilySearchResults
from langgraph.prebuilt import create_react_agent

# Réutilise les outils et modèles LangChain dans LangGraph
tools = [TavilySearchResults(max_results=3)]
llm = ChatOpenAI(model="gpt-4o")

app = create_react_agent(llm, tools)
result = app.invoke({"messages": [{"role": "user", "content": "Quelle est la météo à Paris ?"}]})
```

Si vous souhaitez comparer avec d'autres frameworks d'orchestration, lisez notre comparatif : [CrewAI vs AutoGen : Quel Framework Choisir pour Orchestrer vos Agents ?](/blog/crewai-vs-autogen).

## Bonnes Pratiques et Pièges à Éviter

### Bonnes pratiques

- **Ne migrez pas tout d'un coup** : identifiez les workflows qui bénéficient réellement de LangGraph et migrez-les progressivement.
- **Typsez votre état** : utilisez `TypedDict` ou Pydantic pour définir clairement la structure de votre état. Cela améliore la lisibilité et facilite le debugging.
- **Utilisez les checkpoints en production** : ils vous sauveront la mise en cas de crash et permettront le human-in-the-loop.
- **Visualisez votre graphe** : utilisez `app.get_graph().draw_mermaid()` pour générer un diagramme de votre workflow. Indispensable pour la documentation et le debugging.
- **Testez chaque nœud indépendamment** : les nœuds sont des fonctions pures — testez-les unitairement avant de les assembler.

### Pièges à éviter

- **Surcomplexifier un workflow simple** : si une chaîne linéaire suffit, ne la convertissez pas en graphe.
- **Oublier les arêtes conditionnelles de fin** : un graphe sans `END` peut boucler indéfiniment. Définissez toujours une condition de sortie.
- **Stocker trop de données dans l'état** : l'état doit contenir le minimum nécessaire. Les données volumineuses (documents complets, images) doivent être stockées dans une base et référencées par leur ID.
- **Ignorer la persistance en production** : sans checkpoint, un crash mid-exécution signifie une perte totale de l'état.

## FAQ

### LangGraph remplace-t-il LangChain ?

Non. LangGraph est un complément, pas un remplacement. LangChain reste le framework de référence pour les intégrations, les chaînes simples et le prototypage. LangGraph ajoute des capacités de workflows cycliques et stateful par-dessus les primitives LangChain.

### Puis-je utiliser LangChain et LangGraph dans le même projet ?

Absolument. Les deux frameworks sont conçus pour coexister. Vous pouvez utiliser les intégrations LangChain (modèles, outils, loaders) à l'intérieur de nœuds LangGraph. La compatibilité est totale.

### LangGraph est-il plus difficile à apprendre que LangChain ?

Oui, la courbe d'apprentissage est plus raide. LangGraph demande de penser en termes de graphes d'état, de nœuds et d'arêtes conditionnelles, ce qui est un changement de paradigme par rapport aux chaînes séquentielles. Cependant, l'investissement en vaut la peine dès que vos workflows deviennent complexes.

### Quels sont les coûts de migration de LangChain vers LangGraph ?

Les coûts sont principalement en temps d'apprentissage et de refactorisation. Il n'y a pas de coût financier puisque les deux sont open source (licence MIT). En termes de temps, comptez quelques jours pour convertir un workflow existant, et quelques semaines pour maîtriser pleinement LangGraph.

### LangGraph est-il adapté aux applications de production ?

Oui. LangGraph a été conçu avec la production en tête. Le système de checkpoints permet la persistance, la reprise après crash et le human-in-the-loop — des fonctionnalités essentielles pour les applications critiques. De nombreuses entreprises l'utilisent déjà en production pour orchestrer des agents autonomes.

## Mise à jour — Avril 2026

L'écosystème LangChain/LangGraph continue d'évoluer rapidement. Voici les développements récents à connaître :

- **LangGraph Platform** : LangChain, Inc. a lancé LangGraph Platform, une solution managée pour déployer et surveiller des graphes LangGraph en production. Elle inclut un serveur d'API, un dashboard de monitoring et des capacités de scaling automatique.
- **LangGraph Studio** : un IDE visuel pour concevoir, tester et debugger des graphes LangGraph directement dans le navigateur. Il permet de visualiser l'exécution en temps réel et d'inspecter l'état à chaque nœud.
- **Stabilité de LangGraph** : le framework a atteint une maturité suffisante pour être considéré comme production-ready. Les API principales sont stables et la rétrocompatibilité est assurée.
- **Convergence des écosystèmes** : les nouvelles fonctionnalités de LangChain sont de plus en plus conçues pour fonctionner nativement avec LangGraph. La distinction entre les deux frameworks s'estompe progressivement au profit d'un écosystème unifié.
- **Adoption enterprise** : de grandes entreprises (banques, assurance, santé) ont adopté LangGraph pour orchestrer des agents IA critiques, confirmant sa robustesse en environnement de production.

Si vous débutez dans l'univers des agents IA multi-acteurs, notre tutoriel [AutoGen Pas à Pas : Créez Votre Première Équipe d'Agents IA en 30 Minutes](/blog/autogen-tutoriel-debutant) vous aidera à poser les bases avant d'explorer LangGraph.

---

Le choix entre LangChain et LangGraph n'est pas une question de l'un ou l'autre, mais de bon outil au bon moment. Pour les pipelines simples et le prototypage, LangChain reste incontournable. Pour les agents autonomes et les workflows complexes avec boucles et persistance, LangGraph est le framework de référence. La bonne nouvelle ? Vous n'avez pas à choisir définitivement — les deux sont faits pour fonctionner ensemble.