---
title: "AutoGen Stap voor Stap: Bouw Je Eerste AI-agentteam in 30 Minuten"
excerpt: "Leer hoe je AutoGen kunt gebruiken om een team van samenwerkende AI-agents te maken in Python, met een stap-voor-stap tutorial voor beginners."
date: "2026-04-19"
author: "Pulseia"
category: "Automatisering"
readTime: "12 min"
coverImage: "/blog/placeholder-cover.svg"
---

Als je ooit ChatGPT of Claude alleen hebt gebruikt, ken je de kracht van een enkele LLM. Maar stel je nu meerdere AI-agents voor die met elkaar discussiëren, taken verdelen, elkaar bekritiseren en een eindresultaat produceren dat superieur is aan wat één agent alleen zou kunnen bereiken. Dat is precies wat AutoGen mogelijk maakt. In deze tutorial maak je je eerste AI-agentteam in minder dan 30 minuten, zonder eerdere ervaring vereist.

## Wat is AutoGen?

AutoGen is een open-source framework ontwikkeld door Microsoft Research dat het mogelijk maakt om multi-agent conversaties te creëren waarbij meerdere LLM's (of combinaties van LLM's en mensen) samenwerken om complexe problemen op te lossen. In tegenstelling tot een klassieke gebruiker-chatbot interactie, orkestreert AutoGen dialogen tussen autonome agents.

### Kernconcepten

- **Agent**: een autonome deelnemer in het gesprek. Elke agent heeft een rol, capaciteiten en gedrag gedefinieerd door zijn system prompt en de tools waartoe hij toegang heeft.
- **Conversatie**: een gestructureerde uitwisseling tussen meerdere agents. De conversatie volgt beurtregelgeving (wie spreekt wanneer) en terminatieregels (wanneer stoppen).
- **AssistantAgent**: een door een LLM aangedreven agent die kan redeneren, tools gebruiken en code genereren.
- **UserProxyAgent**: een agent die de menselijke gebruiker vertegenwoordigt. Hij kan code uitvoeren, resultaten valideren en handmatig ingrijpen in de conversatie.
- **GroupChat**: een conversatie tussen meer dan twee agents, met een mechanisme voor het selecteren van de volgende spreker.

### Waarom AutoGen gebruiken?

AutoGen blinkt uit in scenario's waar samenwerking tussen agents meerwaarde biedt:

- **Codegeneratie en -review**: één agent schrijft code, een andere beoordeelt het, een derde voert het uit en test het.
- **Onderzoek en synthese**: één agent zoekt, een andere synthetiseert, een derde controleert de feiten.
- **Debat en verfijning**: twee agents debatteren over een oplossing, een arbiter beslist.
- **Planning en uitvoering**: een planner deelt een taak op, uitvoerders voeren het uit.

Om AutoGen te vergelijken met andere orchestratie-frameworks, bekijk ons artikel [CrewAI vs AutoGen: Welk Framework Kiezen voor het Orkestreren van je Agents?](/blog/crewai-vs-autogen).

## Installatie en Configuratie

### Vereisten

- Python 3.9 of hoger
- Een OpenAI-account met een API-sleutel (of een andere ondersteunde LLM-provider)
- Een code-editor (VS Code aanbevolen)

### Installatie

```bash
pip install autogen-agentpy
```

### API-sleutel Configuratie

Maak een `OAI_CONFIG_LIST`-bestand aan in de hoofdmap van je project:

```json
[
  {
    "model": "gpt-4o",
    "api_key": "jouw-openai-api-sleutel"
  }
]
```

Of gebruik een omgevingsvariabele:

```bash
export OPENAI_API_KEY="jouw-openai-api-sleutel"
```

### Installatie Verifiëren

```python
import autogen

print(f"AutoGen versie: {autogen.__version__}")
```

Als deze code zonder fouten wordt uitgevoerd, ben je klaar om te beginnen.

## Tutorial: Maak een Team van Twee Agents in 30 Minuten

### Doel

We maken een team van twee agents:
1. **De Assistent**: een agent die Python-code genereert om een probleem op te lossen.
2. **De Gebruiker**: een proxy-agent die de code uitvoert en de resultaten valideert.

### Stap 1: Importeer de Benodigde Modules

```python
import autogen

# LLM-configuratie
llm_config = {
    "model": "gpt-4o",
    "api_key": "jouw-api-sleutel",
    "temperature": 0.7
}
```

### Stap 2: Maak de AssistantAgent

```python
assistant = autogen.AssistantAgent(
    name="Assistant",
    llm_config=llm_config,
    system_message="""Je bent een expert Python-ontwikkelaar. Als je wordt gevraagd
    een probleem op te lossen, schrijf je heldere en goed becommentarieerde Python-code.
    Je verpakt je code altijd in ```python markdown-blokken.
    Je zorgt ervoor dat je code randgevallen en fouten afhandelt."""
)
```

### Stap 3: Maak de UserProxyAgent

```python
user_proxy = autogen.UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=5,
    code_execution_config={
        "work_dir": "coding",
        "use_docker": False
    },
    system_message="""Je bent een code-uitvoerder. Als de assistent code levert,
    voer je het uit en rapporteer je het resultaat. Als de code faalt,
    rapporteer je de fout zodat de assistent het kan herstellen."""
)
```

De parameter `human_input_mode="NEVER"` betekent dat de agent nooit om menselijke invoer zal vragen — hij werkt volledig autonoom. Als je handmatig wilt ingrijpen, gebruik `"ALWAYS"` of `"TERMINATE"`.

### Stap 4: Start de Conversatie

```python
user_proxy.initiate_chat(
    assistant,
    message="""Maak een Python-script dat:
    1. Gegevens downloadt van de publieke API https://api.exchangerate-api.com/v4/latest/EUR
    2. De 5 valuta met de hoogste koers ten opzichte van de euro weergeeft
    3. Een staafdiagram genereert met matplotlib
    Sla de grafiek op als 'top_currencies.png'."""
)
```

### Wat er Onder de Motorkap Gebeurt

Hier is het typische verloop van de conversatie:

1. De gebruiker stuurt het verzoek naar de assistent.
2. De assistent genereert Python-code om het probleem op te lossen.
3. De UserProxyAgent haalt de code uit het bericht van de assistent en voert het uit.
4. Als de code werkt, wordt het resultaat teruggestuurd naar de assistent, die het kan valideren of verbeteren.
5. Als de code faalt, wordt de fout teruggestuurd naar de assistent, die het herstelt en opnieuw probeert.
6. De cyclus gaat door totdat de taak is voltooid of het maximum aantal rondes is bereikt.

### Verwachte Resultaat

```
User (to Assistant):
Maak een Python-script dat: ...

Assistant (to User):
Hier is het Python-script: ```python ... ```

User (to Assistant):
De code is succesvol uitgevoerd. Hier is de uitvoer: ...

Assistant (to User):
Uitstekend! De grafiek is opgeslagen...
TERMINATE
```

## Verder Gaan: Groepsconversatie met GroupChat

De ware kracht van AutoGen wordt zichtbaar bij groepsconversaties. Laten we een derde agent toevoegen: een code-criticus.

### Stap 5: Voeg een Criticus-agent Toe

```python
critic = autogen.AssistantAgent(
    name="Critic",
    llm_config=llm_config,
    system_message="""Je bent een veeleisende code-reviewer. Als de assistent
    code levert, analyseer je het op:
    - Foutafhandeling
    - Prestaties
    - Leesbaarheid en PEP 8-conventies
    - Stel concrete verbeteringen voor
    Wees constructief maar streng."""
)
```

### Stap 6: Maak de GroupChat

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

### Stap 7: Start de Groepsconversatie

```python
user_proxy.initiate_chat(
    manager,
    message="""Maak een Python-functie die de Fibonacci-reeks berekent
    op een geoptimaliseerde manier (met memoïsering). De criticus moet
    de code valideren voordat deze wordt afgerond."""
)
```

In deze configuratie discussiëren de drie agents met elkaar:
- De assistent schrijft de code.
- De criticus analyseert het en stelt verbeteringen voor.
- De assistent past de code dienovereenkomstig aan.
- De cyclus herhaalt zich tot validatie of tot de rondes op zijn.

## Tabel met Sprekerselectiemethoden

| Methode | Beschrijving | Wanneer te Gebruiken |
|---------|-------------|----------------------|
| `"auto"` | De LLM kiest de volgende spreker | Dynamische conversaties, gevarieerde rollen |
| `"round_robin"` | Agents spreken om de beurt | Gestructureerde conversaties, debatten |
| `"random"` | Willekeurige selectie | Experimentatie, diversiteit |
| Aangepast | Python-functie die de volgende agent retourneert | Specifieke bedrijfslogica |

## Tips voor Beginners

### 1. Begin Simpel

Maak niet direct een team van 10 agents. Begin met 2 agents (assistent + gebruiker), en voeg er dan geleidelijk meer toe. Elke extra agent verhoogt de complexiteit van de conversatie en de kosten.

### 2. Zorgvuldig Je System Prompts Opstellen

Het gedrag van elke agent hangt volledig af van zijn `system_message`. Hoe nauwkeuriger je prompts, hoe beter de agents presteren. Een vage prompt produceert een onvoorspelbare agent.

### 3. Beperk het Aantal Beurten

Gebruik `max_round` om te voorkomen dat de conversatie in een eindeloze lus terechtkomt. Het is ook een kostenkwestie: elke beurt verbruikt tokens.

### 4. Schakel Code-uitvoering met Voorzichtigheid In

Automatische code-uitvoering is krachtig maar gevaarlijk. Gebruik in ontwikkeling `use_docker=True` om uitvoering te isoleren. In productie, handhaf strikte limieten (timeout, bestandsrechten).

### 5. Houd de Kosten in de Gaten

Elk bericht tussen agents verbruikt tokens. Een groepsconversatie met 4 agents over 10 rondes kan gemakkelijk 50.000+ tokens verbruiken. Gebruik goedkopere modellen (GPT-4o-mini) voor agents die geen complexe redenering nodig hebben.

## Beperkingen van AutoGen

AutoGen is een krachtig framework, maar heeft zijn beperkingen:

- **Token-kosten**: multi-agent conversaties verbruiken veel tokens, wat op schaal duur kan worden.
- **Debugging-complexiteit**: als 4 agents met elkaar discussiëren, is het moeilijk te begrijpen waarom een conversatie een onverwachte richting insloeg.
- **Geen native persistentie**: AutoGen biedt geen ingebouwd checkpoint-mechanisme zoals LangGraph. Een onderbroken conversatie is verloren.
- **Onvolmaakte sprekerselectie**: de `"auto"`-methode vertrouwt op de LLM om de volgende spreker te kiezen, wat tot suboptimale keuzes kan leiden.
- **Sterke koppeling met OpenAI**: hoewel andere providers worden ondersteund, blijft de optimale ervaring bij OpenAI-modellen.

Als deze beperkingen je zorgen baren, overweeg dan om [LangGraph en zijn cyclische workflows](/blog/langgraph-workflows-cycliques) te verkennen voor persistentie, of [CrewAI](/blog/crewai-vs-autogen) voor een meer gestructureerde benadering van rollen.

## Snelle Vergelijking met Andere Frameworks

| Criterium | AutoGen | CrewAI | LangGraph |
|-----------|---------|--------|-----------|
| **Aanpak** | Multi-agent conversaties | Gestructureerde rollen en taken | Toestandsgrafen |
| **Instapgemak** | Gemiddeld | Makkelijk | Gemiddeld tot moeilijk |
| **Flexibiliteit** | Zeer hoog | Matig | Zeer hoog |
| **Persistentie** | Niet native | Beperkt | Native (checkpoints) |
| **Token-kosten** | Hoog | Matig | Variabel |
| **Ideale use case** | Debat, verkenning, code | Gestructureerde taken | Complexe workflows |

## Volledig Voorbeeld: Onderzoeksagent met Tools

Hier is een meer geavanceerd voorbeeld met aangepaste tools:

```python
import autogen
import requests

# Configuratie
llm_config = {
    "model": "gpt-4o",
    "api_key": "jouw-api-sleutel",
    "temperature": 0.3
}

# Definitie van een zoektool
def search_web(query: str) -> str:
    """Zoek op het web via een API."""
    response = requests.get(
        "https://api.tavily.com/search",
        params={"query": query, "api_key": "jouw-tavily-sleutel"}
    )
    return str(response.json())

# Registratie van de tool
assistant = autogen.AssistantAgent(
    name="Researcher",
    llm_config=llm_config,
    system_message="""Je bent een AI-onderzoeker. Gebruik de search_web
    tool om informatie te vinden. Synthetiseer de resultaten
    helder en met bronvermelding.""",
    function_map={"search_web": search_web}
)

user_proxy = autogen.UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=3,
    code_execution_config=False
)

# Start
user_proxy.initiate_chat(
    assistant,
    message="Wat zijn de AI-trends in 2026?"
)
```

## FAQ

### Moet ik een ervaren ontwikkelaar zijn om AutoGen te gebruiken?

Nee, basiskennis van Python is voldoende. Deze tutorial is ontworpen voor beginners. Je moet weten hoe je een Python-script uitvoert, pakketten installeert met pip en de basissyntaxis begrijpt (variabelen, functies, woordenboeken).

### Hoeveel kost een multi-agent AutoGen-conversatie?

De kosten zijn afhankelijk van het gebruikte model, het aantal agents en het aantal rondes. Met GPT-4o kun je rekenen op ongeveer $0,05 tot $0,50 per conversatie van 5 tot 10 rondes met 2-3 agents. Met GPT-4o-mini zijn de kosten 10 tot 20 keer lager.

### Kan AutoGen code veilig uitvoeren?

AutoGen kan door agents gegenereerde code uitvoeren, wat risico's met zich meebrengt. Gebruik altijd `use_docker=True` om uitvoering te isoleren, of schakel automatische uitvoering uit met `code_execution_config=False` en valideer de code handmatig voordat je het uitvoert.

### Wat is het verschil tussen AutoGen en een simpele ChatGPT-aanroep?

Een ChatGPT-aanroep is een bilaterale interactie (gebruiker <-> model). AutoGen orkestreert conversaties tussen meerdere autonome agents die samenwerken, bekritiseren en itereren. Het resultaat is over het algemeen van hogere kwaliteit omdat het profiteert van meerdere perspectieven en beoordelingscycli.

### Kan ik AutoGen gebruiken met andere modellen dan OpenAI?

Ja. AutoGen ondersteunt meerdere providers via de `llm_config`-configuratie. Je kunt Anthropic-modellen (Claude), lokale modellen (via Ollama) of elk OpenAI-compatibel endpoint gebruiken. De soepelste ervaring blijft echter bij OpenAI-modellen.

## Update — April 2026

AutoGen blijft zich ontwikkelen. Hier zijn de laatste ontwikkelingen:

- **AutoGen 0.4+**: de nieuwe architectuur op basis van asynchrone actoren biedt betere prestaties en verbeterde schaalbaarheid voor grootschalige conversaties.
- **AutoGen Studio 2.0**: de webinterface voor het bouwen van no-code agents is volledig herbouwd. Je kunt nu agentteams direct vanuit de browser maken, testen en implementeren.
- **Verbeterde tool-ondersteuning**: AutoGen integreert nu externe tools (API's, databases, cloudservices) eenvoudiger via een gestandaardiseerd pluginsysteem.
- **Convergentie met de rest van het ecosysteem**: AutoGen integreert steeds gemakkelijker met LangChain (voor integraties) en LangGraph (voor persistentie en controlestroom). De keuze van framework is niet langer exclusief.
- **Kostenoptimalisatie**: nieuwe mechanismen verminderen het tokenverbruik door conversatiegeschiedenis te comprimeren en lichtgewicht modellen te gebruiken voor secundaire agents.

Om andere benaderingen van agent-orkestratie te verkennen, bekijk [LangChain vs LangGraph: Wat Zijn de Verschillen](/blog/langchain-vs-langgraph) en [Semantic Kernel voor .NET](/blog/semantic-kernel-dotnet).

---

AutoGen is een van de meest toegankelijke manieren om de kracht van samenwerkende AI-agents te ontdekken. In een paar regels Python kun je een team van agents orkestreren die autonoom complexe problemen oplossen. Begin simpel, experimenteer geleidelijk, en je zult snel het transformatieve potentieel van multi-agent systemen ontdekken.