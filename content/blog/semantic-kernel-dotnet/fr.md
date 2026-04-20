---
title: "Semantic Kernel pour les Développeurs .NET : Comment Intégrer l'IA dans vos Apps d'Entreprise"
excerpt: "Guide complet de Semantic Kernel pour .NET : architecture, plugins, planners, mémoire et exemples de code C# pour intégrer l'IA dans vos applications d'entreprise."
date: "2026-04-19"
author: "Pulseia"
category: "Automation"
readTime: "16 min"
coverImage: "/blog/placeholder-cover.svg"
---

Les développeurs .NET ont longtemps regardé l'écosystème IA depuis la tourelle, envieux des outils Python comme LangChain et AutoGen. Avec Semantic Kernel, Microsoft change la donne en offrant un framework IA natif pour .NET, conçu pour les applications d'entreprise. Si vous construisez des solutions IA dans un environnement .NET/Azure, Semantic Kernel est le framework qu'il vous faut. Ce guide vous montre comment l'utiliser concrètement.

## Qu'est-ce que Semantic Kernel ?

Semantic Kernel (SK) est un SDK open source développé par Microsoft qui permet d'intégrer des capacités d'intelligence artificielle dans des applications existantes. Lancé en 2023, il est devenu un pilier de la stratégie IA de Microsoft, avec un support de première classe pour C#, Python et Java.

### La philosophie de Semantic Kernel

Contrairement à LangChain, qui est né dans l'écosystème Python et la communauté de la data science, Semantic Kernel est conçu par et pour des développeurs d'applications. Sa philosophie repose sur trois principes :

1. **Intégration dans le code existant** : SK s'insère dans votre application .NET comme n'importe quelle autre dépendance NuGet. Pas besoin de réécrire votre architecture.
2. **Sécurité et conformité enterprise** : SK est conçu pour les exigences de sécurité des entreprises — gestion des secrets, isolation des données, conformité RGPD.
3. **Extensibilité via des plugins** : chaque compétence de votre IA est un plugin, réutilisable, testable et composable.

### Les composants fondamentaux

Semantic Kernel repose sur quatre piliers :

| Composant | Description | Analogie |
|-----------|-------------|----------|
| **Kernel** | Le point d'entrée central qui orchestre tout | Le chef d'orchestre |
| **Plugins** | Des unités de fonctionnalité réutilisables | Les instruments |
| **Planners** | Les composants qui décident comment atteindre un objectif | La partition |
| **Memory** | Le stockage et la récupération d'informations contextuelles | Le répertoire |

## Architecture Détaillée de Semantic Kernel

### Le Kernel

Le Kernel est le centre de Semantic Kernel. Il gère les connexions aux modèles IA, les services et les plugins. Pensez-y comme le conteneur d'injection de dépendances de votre application IA.

```csharp
using Microsoft.SemanticKernel;

var builder = Kernel.CreateBuilder();

// Configuration du modèle IA
builder.AddAzureOpenAIChatCompletion(
    deploymentName: "gpt-4o",
    endpoint: "https://votre-instance.openai.azure.com/",
    apiKey: "votre-clé-api"
);

// Ajout de plugins
builder.Plugins.AddFromType<WeatherPlugin>();
builder.Plugins.AddFromType<CalendarPlugin>();
builder.Plugins.AddFromType<DatabasePlugin>();

var kernel = builder.Build();
```

### Les Plugins

Les plugins sont les briques de fonctionnalité de SK. Un plugin contient des fonctions (méthodes décorées) que le Kernel peut invoquer automatiquement.

```csharp
using Microsoft.SemanticKernel;
using System.ComponentModel;

public class WeatherPlugin
{
    [KernelFunction]
    [Description("Obtient la météo actuelle pour une ville donnée")]
    public string GetCurrentWeather(
        [Description("Le nom de la ville")] string city,
        [Description("L'unité de température (Celsius ou Fahrenheit)")] string unit = "Celsius"
    )
    {
        // Logique métier — appel API, base de données, etc.
        return $"La météo à {city} est ensoleillée, 22°{unit[0]}";
    }

    [KernelFunction]
    [Description("Prévoit la météo pour les 5 prochains jours")]
    public string GetForecast(
        [Description("Le nom de la ville")] string city
    )
    {
        return $"Prévisions pour {city} : ensoleillé toute la semaine.";
    }
}
```

Les attributs `[KernelFunction]` et `[Description]` sont essentiels — ils permettent au planner de découvrir et de comprendre les capacités du plugin. Les descriptions sont injectées dans le prompt du LLM pour qu'il décide quelle fonction appeler.

### Les Planners

Les planners sont le mécanisme par lequel Semantic Kernel décide comment atteindre un objectif. Il existe plusieurs types de planners :

| Planner | Description | Quand l'utiliser |
|---------|-------------|------------------|
| **Handlebars Planner** | Génère un plan en utilisant des templates Handlebars | Plans structurés et prévisibles |
| **Stepwise Planner** | Exécute étape par étape, en décidant dynamiquement | Plans dynamiques avec conditions |
| **Function Calling** | Utilise le function calling natif du modèle | Le plus simple et le plus fiable |

Exemple avec le Function Calling :

```csharp
var executionSettings = new OpenAIPromptExecutionSettings
{
    ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions
};

var result = await kernel.InvokePromptAsync(
    "Quelle est la météo à Paris et à Lyon aujourd'hui ?",
    executionSettings
);

Console.WriteLine(result);
```

Le LLM comprend qu'il doit appeler `GetCurrentWeather` deux fois (pour Paris et Lyon) et compose la réponse finale. Le Kernel gère automatiquement les appels de fonction.

### La Mémoire (Memory/Vectors)

Semantic Kernel intègre un système de mémoire vectorielle pour stocker et récupérer des informations contextuelles.

```csharp
using Microsoft.SemanticKernel.Memory;

var memoryBuilder = new MemoryBuilder();
memoryBuilder.WithAzureOpenAITextEmbeddingGeneration(
    deploymentName: "text-embedding-3-large",
    endpoint: "https://votre-instance.openai.azure.com/",
    apiKey: "votre-clé-api"
);
memoryBuilder.WithMemoryStore(new VolatileMemoryStore());

var memory = memoryBuilder.Build();

// Stockage d'informations
await memory.SaveInformationAsync(
    collection: "entreprise",
    text: "Notre politique de retour permet un remboursement sous 30 jours.",
    id: "politique-retour"
);

// Recherche sémantique
var results = memory.SearchAsync(
    collection: "entreprise",
    query: "Comment fonctionnent les retours ?",
    limit: 3
);

await foreach (var result in results)
{
    Console.WriteLine($"{result.Relevance} : {result.Text}");
}
```

## Exemple Complet : Assistant d'Entreprise en C#

Voici un exemple complet d'un assistant d'entreprise qui peut répondre aux questions des employés en consultant la base de connaissances et les outils internes.

### Étape 1 : Définir les plugins

```csharp
using Microsoft.SemanticKernel;
using System.ComponentModel;

public class HrPlugin
{
    private readonly Dictionary<string, string> _policies = new()
    {
        ["congés"] = "Chaque employé a droit à 25 jours de congés payés par an.",
        ["télétravail"] = "Le télétravail est autorisé 3 jours par semaine.",
        ["mutuelle"] = "La mutuelle d'entreprise couvre 80% des frais de santé."
    };

    [KernelFunction]
    [Description("Recherche une politique RH par sujet")]
    public string SearchPolicy(
        [Description("Le sujet de la politique (congés, télétravail, mutuelle)")] string topic
    )
    {
        return _policies.TryGetValue(topic.ToLower(), out var policy)
            ? policy
            : "Aucune politique trouvée pour ce sujet.";
    }

    [KernelFunction]
    [Description("Calcule les jours de congés restants pour un employé")]
    public int CalculateRemainingDays(
        [Description("L'identifiant de l'employé")] string employeeId,
        [Description("L'année en cours")] int year
    )
    {
        // Logique de calcul — en production, interroger la base de données
        return 25 - 8; // Simulé : 25 jours - 8 jours pris
    }
}

public class ItPlugin
{
    [KernelFunction]
    [Description("Crée un ticket de support IT")]
    public string CreateTicket(
        [Description("Description du problème")] string description,
        [Description("Priorité : basse, moyenne, haute, critique")] string priority
    )
    {
        var ticketId = Guid.NewGuid().ToString()[..8];
        return $"Ticket {ticketId} créé avec priorité {priority}. Un technicien vous contactera sous 2h.";
    }

    [KernelFunction]
    [Description("Vérifie le statut d'un ticket")]
    public string CheckTicketStatus(
        [Description("L'identifiant du ticket")] string ticketId
    )
    {
        return $"Le ticket {ticketId} est en cours de traitement.";
    }
}
```

### Étape 2 : Configurer le Kernel

```csharp
var builder = Kernel.CreateBuilder();

builder.AddAzureOpenAIChatCompletion(
    deploymentName: "gpt-4o",
    endpoint: Configuration["AzureOpenAI:Endpoint"]!,
    apiKey: Configuration["AzureOpenAI:ApiKey"]!
);

builder.Plugins.AddFromType<HrPlugin>();
builder.Plugins.AddFromType<ItPlugin>();

var kernel = builder.Build();

// Ajout d'un plugin depuis un répertoire de prompts
builder.Plugins.AddFromPromptDirectory(
    Path.Combine(Directory.GetCurrentDirectory(), "Plugins", "ChatPlugin")
);
```

### Étape 3 : Créer un plugin de prompt

Dans le répertoire `Plugins/ChatPlugin/Chat.skprompt.txt` :

```
Tu es l'assistant interne de l'entreprise. Tu aides les employés avec leurs
questions RH et IT. Utilise les outils disponibles pour fournir des réponses
précises. Si tu ne connais pas la réponse, dis-le honnêtement.

Historique de la conversation :
{{$history}}

Employé : {{$input}}
Assistant :
```

Dans `Plugins/ChatPlugin/Chat.config.json` :

```json
{
  "schema": 1,
  "type": "completion",
  "description": "Assistant interne pour les employés",
  "execution_settings": {
    "default": {
      "max_tokens": 1000,
      "temperature": 0.7
    }
  }
}
```

### Étape 4 : Exécuter l'assistant

```csharp
var executionSettings = new OpenAIPromptExecutionSettings
{
    ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions
};

// Utilisation avec function calling
var result = await kernel.InvokePromptAsync(
    "Combien de jours de congés me reste-t-il ? Mon ID est EMP-123.",
    executionSettings
);

Console.WriteLine(result);

// Autre exemple
result = await kernel.InvokePromptAsync(
    "Mon ordinateur ne démarre plus, c'est urgent !",
    executionSettings
);

Console.WriteLine(result);
```

Résultat attendu :

```
Il vous reste 17 jours de congés pour l'année 2026.

Le ticket A3F7B2C1 a été créé avec priorité critique. Un technicien vous contactera sous 2h.
```

## Intégration avec Azure OpenAI

Semantic Kernel est conçu pour fonctionner nativement avec Azure OpenAI, ce qui le rend idéal pour les entreprises qui ont déjà un environnement Microsoft.

### Configuration avec Managed Identity

```csharp
using Azure.Identity;

var builder = Kernel.CreateBuilder();

// Utilisation de Managed Identity — pas de clé API dans le code
builder.AddAzureOpenAIChatCompletion(
    deploymentName: "gpt-4o",
    endpoint: Configuration["AzureOpenAI:Endpoint"]!,
    credentials: new DefaultAzureCredential()
);
```

### Configuration avec dependency injection (ASP.NET Core)

```csharp
// Dans Program.cs
builder.Services.AddKernel()
    .AddAzureOpenAIChatCompletion(
        deploymentName: "gpt-4o",
        endpoint: builder.Configuration["AzureOpenAI:Endpoint"]!,
        apiKey: builder.Configuration["AzureOpenAI:ApiKey"]!
    )
    .Plugins.AddFromType<HrPlugin>()
    .Plugins.AddFromType<ItPlugin>();

// Dans un contrôleur
[ApiController]
[Route("api/[controller]")]
public class AssistantController : ControllerBase
{
    private readonly Kernel _kernel;

    public AssistantController(Kernel kernel)
    {
        _kernel = kernel;
    }

    [HttpPost("chat")]
    public async Task<IActionResult> Chat([FromBody] ChatRequest request)
    {
        var settings = new OpenAIPromptExecutionSettings
        {
            ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions
        };

        var result = await _kernel.InvokePromptAsync(request.Message, settings);
        return Ok(new { response = result.ToString() });
    }
}
```

### Sécurité et conformité

| Aspect | Solution Semantic Kernel |
|--------|-------------------------|
| **Gestion des secrets** | Azure Key Vault + Managed Identity |
| **Chiffrement en transit** | HTTPS obligatoire (Azure OpenAI) |
| **Conformité RGPD** | Azure OpenAI traite les données en Europe |
| **Filtrage de contenu** | Content Safety intégré dans Azure OpenAI |
| **Audit et logging** | Azure Monitor + Application Insights |
| **Pas de rétention** | Azure OpenAI ne stocke pas les prompts |

## Patterns d'Entreprise avec Semantic Kernel

### Pattern 1 : Pipeline de traitement de documents

```csharp
public class DocumentPipeline
{
    private readonly Kernel _kernel;

    public DocumentPipeline(Kernel kernel) => _kernel = kernel;

    public async Task<string> ProcessAsync(string documentPath)
    {
        // Étape 1 : Extraire le texte
        var text = await File.ReadAllTextAsync(documentPath);

        // Étape 2 : Résumer
        var summary = await _kernel.InvokePromptAsync(
            "Résume ce document en 3 points clés :\n\n" + text
        );

        // Étape 3 : Extraire les entités
        var entities = await _kernel.InvokePromptAsync(
            "Extrais les noms d'entreprises, les dates et les montants de ce texte :\n\n" + text
        );

        // Étape 4 : Classer
        var category = await _kernel.InvokePromptAsync(
            "Classe ce document dans l'une des catégories : RH, Finance, Juridique, Technique.\n\n" + text
        );

        return $"Catégorie : {category}\nRésumé : {summary}\nEntités : {entities}";
    }
}
```

### Pattern 2 : Agent conversationnel avec mémoire

```csharp
public class ConversationAgent
{
    private readonly Kernel _kernel;
    private readonly ChatHistory _history = new();

    public ConversationAgent(Kernel kernel)
    {
        _kernel = kernel;
        _history.AddSystemMessage("Tu es un assistant d'entreprise professionnel et concis.");
    }

    public async Task<string> ChatAsync(string userMessage)
    {
        _history.AddUserMessage(userMessage);

        var settings = new OpenAIPromptExecutionSettings
        {
            ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions,
            MaxTokens = 500
        };

        var result = await _kernel.InvokePromptAsync(
            _history,
            settings
        );

        _history.AddAssistantMessage(result.ToString());
        return result.ToString();
    }
}
```

### Pattern 3 : Orchestration multi-plugins avec planners

```csharp
// Utilisation du Handlebars Planner pour des workflows complexes
using Microsoft.SemanticKernel.Planning.Handlebars;

var planner = new HandlebarsPlanner(new HandlebarsPlannerOptions { AllowLoops = true });

var plan = await planner.CreatePlanAsync(
    kernel,
    "Vérifie la météo à Paris, puis si elle est bonne, suggère une activité en extérieur. Sinon, suggère une activité en intérieur."
);

var result = await plan.InvokeAsync(kernel);
Console.WriteLine(result);
```

## Semantic Kernel vs LangChain : Quand Choisir SK ?

| Critère | Semantic Kernel | LangChain |
|---------|----------------|-----------|
| **Langage principal** | C# (.NET), Python, Java | Python, JavaScript/TypeScript |
| **Écosystème** | .NET / Azure | Python / data science |
| **Cible** | Applications d'entreprise .NET | Prototypage et RAG |
| **Intégration Azure** | Native, première classe | Via connecteurs tiers |
| **Sécurité entreprise** | Conçue pour (Managed Identity, Key Vault) | À configurer manuellement |
| **Community** | En croissance (Microsoft) | Très large |
| **Maturité** | Stable, production-ready | Très mature |
| **Extensibilité** | Plugins | Chains, Tools, Agents |
| **Orchestration** | Planners | Chains, Agents, LangGraph |

### Quand choisir Semantic Kernel

- Votre stack est .NET / Azure
- Vous avez besoin d'une intégration native avec Azure OpenAI
- La sécurité entreprise est une exigence première
- Vous intégrez l'IA dans une application existante (pas un projet neuf)
- Votre équipe est composée de développeurs C#

### Quand choisir LangChain ou LangGraph

- Votre stack est Python
- Vous avez besoin de l'écosystème riche d'intégrations LangChain
- Vous construisez des agents autonomes complexes (LangGraph)
- Vous faites du prototypage rapide
- Votre équipe est composée de data scientists ou d'ingénieurs ML

Pour une comparaison plus approfondie, lisez notre [article LangChain vs LangGraph](/blog/langchain-vs-langgraph).

## FAQ

### Semantic Kernel est-il gratuit ?

Oui. Semantic Kernel est open source sous licence MIT. Vous pouvez l'utiliser gratuitement. Les coûts viennent uniquement des appels aux modèles IA (Azure OpenAI, OpenAI, etc.).

### Semantic Kernel fonctionne-t-il uniquement avec Azure OpenAI ?

Non. SK supporte plusieurs fournisseurs : Azure OpenAI, OpenAI, Hugging Face, Ollama (modèles locaux), et tout endpoint compatible OpenAI. Cependant, l'intégration avec Azure OpenAI est la plus mature et la plus documentée.

### Puis-je utiliser Semantic Kernel dans une application ASP.NET Core existante ?

Absolument. C'est même le cas d'usage principal. SK s'intègre via dependency injection comme n'importe quel autre service. Vous pouvez ajouter des capacités IA à vos contrôleurs existants sans changer l'architecture.

### Quelle est la différence entre les planners et le function calling ?

Le function calling est le mécanisme natif des modèles (GPT-4o, etc.) pour appeler des fonctions. Les planners de SK vont plus loin : ils peuvent composer des plans multi-étapes, gérer des conditions et des boucles, et orchestrer plusieurs appels de fonction de manière séquentielle ou parallèle. Pour des cas simples, le function calling suffit. Pour des workflows complexes, les planners sont nécessaires.

### Semantic Kernel est-il adapté aux petits projets ?

SK est un framework léger qui s'adapte aux petits projets comme aux grandes applications. Pour un prototype rapide, quelques lignes de code suffisent. La complexité n'augmente qu'avec les besoins. Cependant, si vous n'avez pas de contrainte .NET, LangChain en Python peut être plus rapide pour le prototypage pur.

## Mise à jour — Avril 2026

Semantic Kernel a considérablement mûri au cours des derniers mois :

- **Version stable 1.x** : SK a atteint la stabilité de son API. Les principales interfaces (Kernel, Plugins, Planners) sont figées, garantissant la rétrocompatibilité pour les applications de production.
- **Process Framework** : Microsoft a introduit un framework de processus (workflows) inspiré de LangGraph, permettant de définir des workflows cycliques et stateful directement en C#. C'est une évolution majeure pour les agents autonomes en .NET.
- **Amélioration des planners** : le Handlebars Planner et le Function Calling sont plus performants et plus fiables. Le support du parallel function calling réduit les latences.
- **Intégration Microsoft Copilot** : SK est le framework sous-jacent de Microsoft Copilot. L'alignement entre SK et Copilot signifie que les améliorations de Copilot bénéficient à tous les utilisateurs de SK.
- **Support .NET 9** : SK tire parti des dernières fonctionnalités de .NET 9, notamment les améliorations de performance et les types de référence nullables.

Pour une vue d'ensemble des alternatives d'orchestration d'agents, consultez notre [comparatif CrewAI vs AutoGen](/blog/crewai-vs-autogen) et notre article sur [les workflows cycliques avec LangGraph](/blog/langgraph-workflows-cycliques).

---

Semantic Kernel est le choix naturel pour tout développeur .NET qui souhaite intégrer l'IA dans ses applications d'entreprise. Son intégration native avec Azure, son modèle de plugins extensible et sa compatibilité avec les patterns .NET existants en font le framework le plus pragmatique pour l'IA en environnement Microsoft. Commencez simple — un Kernel, quelques plugins, du function calling — et itérez progressivement vers des architectures plus complexes.