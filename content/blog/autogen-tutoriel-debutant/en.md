---
title: "AutoGen Step by Step: Build Your First AI Agent Team in 30 Minutes"
excerpt: "Learn how to use AutoGen to create a team of collaborative AI agents in Python, with a beginner-friendly step-by-step tutorial."
date: "2026-04-19"
author: "Pulseia"
category: "Automation"
readTime: "12 min"
coverImage: "/blog/placeholder-cover.svg"
---

If you've ever used ChatGPT or Claude on your own, you know the power of a single LLM. But now imagine multiple AI agents discussing among themselves, dividing tasks, critiquing each other, and producing a final result superior to what any single agent could achieve. That's exactly what AutoGen enables. In this tutorial, you'll create your first AI agent team in under 30 minutes, with no prior experience required.

## What is AutoGen?

AutoGen is an open-source framework developed by Microsoft Research that enables the creation of multi-agent conversations where multiple LLMs (or mixtures of LLMs and humans) collaborate to solve complex problems. Unlike a classic user-chatbot interaction, AutoGen orchestrates dialogues between autonomous agents.

### Core Concepts

- **Agent**: an autonomous participant in the conversation. Each agent has a role, capabilities, and behavior defined by its system prompt and the tools it has access to.
- **Conversation**: a structured exchange between multiple agents. The conversation follows turn-taking rules (who speaks when) and termination rules (when to stop).
- **AssistantAgent**: an LLM-powered agent that can reason, use tools, and generate code.
- **UserProxyAgent**: an agent that represents the human user. It can execute code, validate results, and intervene manually in the conversation.
- **GroupChat**: a conversation between more than two agents, with a mechanism for selecting the next speaker.

### Why Use AutoGen?

AutoGen shines in scenarios where collaboration between agents adds value:

- **Code generation and review**: one agent writes code, another reviews it, a third executes and tests it.
- **Research and synthesis**: one agent searches, another synthesizes, a third fact-checks.
- **Debate and refinement**: two agents debate a solution, an arbiter makes the final call.
- **Planning and execution**: a planner breaks down a task, executors carry it out.

To compare AutoGen with other orchestration frameworks, check out our article [CrewAI vs AutoGen: Which Framework to Choose for Orchestrating Your Agents?](/blog/crewai-vs-autogen).

## Installation and Setup

### Prerequisites

- Python 3.9 or higher
- An OpenAI account with an API key (or any other supported LLM provider)
- A code editor (VS Code recommended)

### Installation

```bash
pip install autogen-agentpy
```

### API Key Configuration

Create an `OAI_CONFIG_LIST` file at the root of your project:

```json
[
  {
    "model": "gpt-4o",
    "api_key": "your-openai-api-key"
  }
]
```

Or use an environment variable:

```bash
export OPENAI_API_KEY="your-openai-api-key"
```

### Verifying the Installation

```python
import autogen

print(f"AutoGen version: {autogen.__version__}")
```

If this code runs without errors, you're ready to go.

## Tutorial: Create a Two-Agent Team in 30 Minutes

### Objective

We'll create a team of two agents:
1. **The Assistant**: an agent that generates Python code to solve a problem.
2. **The User**: a proxy agent that executes the code and validates the results.

### Step 1: Import the Required Modules

```python
import autogen

# LLM Configuration
llm_config = {
    "model": "gpt-4o",
    "api_key": "your-api-key",
    "temperature": 0.7
}
```

### Step 2: Create the AssistantAgent

```python
assistant = autogen.AssistantAgent(
    name="Assistant",
    llm_config=llm_config,
    system_message="""You are an expert Python developer. When asked to solve
    a problem, you write clear and well-commented Python code.
    You always wrap your code in ```python markdown blocks.
    You make sure your code handles edge cases and errors."""
)
```

### Step 3: Create the UserProxyAgent

```python
user_proxy = autogen.UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=5,
    code_execution_config={
        "work_dir": "coding",
        "use_docker": False
    },
    system_message="""You are a code executor. When the assistant provides code,
    you execute it and report the result. If the code fails,
    you report the error so the assistant can fix it."""
)
```

The `human_input_mode="NEVER"` parameter means the agent will never ask for human input — it will operate fully autonomously. If you want to intervene manually, use `"ALWAYS"` or `"TERMINATE"`.

### Step 4: Start the Conversation

```python
user_proxy.initiate_chat(
    assistant,
    message="""Create a Python script that:
    1. Downloads data from the public API https://api.exchangerate-api.com/v4/latest/EUR
    2. Displays the 5 currencies with the highest rate against the euro
    3. Generates a bar chart with matplotlib
    Save the chart as 'top_currencies.png'."""
)
```

### What Happens Under the Hood

Here's the typical conversation flow:

1. The user sends the request to the assistant.
2. The assistant generates Python code to solve the problem.
3. The UserProxyAgent extracts the code from the assistant's message and executes it.
4. If the code works, the result is sent back to the assistant, which can validate or improve it.
5. If the code fails, the error is sent back to the assistant, which fixes and retries.
6. The cycle continues until the task is accomplished or the maximum number of rounds is reached.

### Expected Output

```
User (to Assistant):
Create a Python script that: ...

Assistant (to User):
Here is the Python script: ```python ... ```

User (to Assistant):
The code ran successfully. Here is the output: ...

Assistant (to User):
Great! The chart has been saved...
TERMINATE
```

## Going Further: Group Conversation with GroupChat

AutoGen's true power is revealed with group conversations. Let's add a third agent: a code critic.

### Step 5: Add a Critic Agent

```python
critic = autogen.AssistantAgent(
    name="Critic",
    llm_config=llm_config,
    system_message="""You are a demanding code reviewer. When the assistant
    provides code, you analyze it for:
    - Error handling
    - Performance
    - Readability and PEP 8 conventions
    - Suggest concrete improvements
    Be constructive but rigorous."""
)
```

### Step 6: Create the GroupChat

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

### Step 7: Start the Group Conversation

```python
user_proxy.initiate_chat(
    manager,
    message="""Create a Python function that calculates the Fibonacci sequence
    in an optimized way (with memoization). The critic must validate
    the code before finalization."""
)
```

In this configuration, the three agents discuss among themselves:
- The assistant writes the code.
- The critic analyzes it and suggests improvements.
- The assistant modifies the code accordingly.
- The cycle repeats until validation or the rounds are exhausted.

## Speaker Selection Methods Table

| Method | Description | When to Use |
|--------|-------------|-------------|
| `"auto"` | The LLM chooses the next speaker | Dynamic conversations, varied roles |
| `"round_robin"` | Agents take turns speaking | Structured conversations, debates |
| `"random"` | Random selection | Experimentation, diversity |
| Custom | Python function returning the next agent | Specific business logic |

## Tips for Beginners

### 1. Start Simple

Don't create a team of 10 agents right away. Start with 2 agents (assistant + user), then add more progressively. Each additional agent increases conversation complexity and costs.

### 2. Craft Your System Prompts Carefully

Each agent's behavior depends entirely on its `system_message`. The more precise your prompts, the better the agents perform. A vague prompt produces an erratic agent.

### 3. Limit the Number of Turns

Use `max_round` to prevent the conversation from looping indefinitely. It's also a cost issue: each turn consumes tokens.

### 4. Enable Code Execution with Caution

Automatic code execution is powerful but dangerous. In development, use `use_docker=True` to isolate execution. In production, enforce strict limits (timeout, file permissions).

### 5. Monitor Costs

Every message between agents consumes tokens. A group conversation with 4 agents over 10 rounds can easily consume 50,000+ tokens. Use cheaper models (GPT-4o-mini) for agents that don't need complex reasoning.

## AutoGen Limitations

AutoGen is a powerful framework, but it has its limitations:

- **Token costs**: multi-agent conversations consume a lot of tokens, which can become expensive at scale.
- **Debugging complexity**: when 4 agents are discussing among themselves, it's hard to understand why a conversation took an unexpected direction.
- **No native persistence**: AutoGen doesn't offer a built-in checkpoint mechanism like LangGraph. An interrupted conversation is lost.
- **Imperfect speaker selection**: the `"auto"` method relies on the LLM to choose the next speaker, which can lead to suboptimal choices.
- **Strong coupling with OpenAI**: although other providers are supported, the optimal experience remains with OpenAI models.

If these limitations concern you, consider exploring [LangGraph and its cyclic workflows](/blog/langgraph-workflows-cycliques) for persistence, or [CrewAI](/blog/crewai-vs-autogen) for a more structured approach to roles.

## Quick Comparison with Other Frameworks

| Criterion | AutoGen | CrewAI | LangGraph |
|-----------|---------|--------|-----------|
| **Approach** | Multi-agent conversations | Structured roles and tasks | State graphs |
| **Ease of getting started** | Medium | Easy | Medium to hard |
| **Flexibility** | Very high | Moderate | Very high |
| **Persistence** | Not native | Limited | Native (checkpoints) |
| **Token costs** | High | Moderate | Variable |
| **Ideal use case** | Debate, exploration, code | Structured tasks | Complex workflows |

## Complete Example: Research Agent with Tools

Here's a more advanced example using custom tools:

```python
import autogen
import requests

# Configuration
llm_config = {
    "model": "gpt-4o",
    "api_key": "your-api-key",
    "temperature": 0.3
}

# Defining a search tool
def search_web(query: str) -> str:
    """Search the web via an API."""
    response = requests.get(
        "https://api.tavily.com/search",
        params={"query": query, "api_key": "your-tavily-key"}
    )
    return str(response.json())

# Registering the tool
assistant = autogen.AssistantAgent(
    name="Researcher",
    llm_config=llm_config,
    system_message="""You are an AI researcher. Use the search_web
    tool to find information. Synthesize the results
    clearly and with citations.""",
    function_map={"search_web": search_web}
)

user_proxy = autogen.UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=3,
    code_execution_config=False
)

# Launch
user_proxy.initiate_chat(
    assistant,
    message="What are the AI trends in 2026?"
)
```

## FAQ

### Do I need to be an experienced developer to use AutoGen?

No, basic Python knowledge is sufficient. This tutorial is designed for beginners. You need to know how to run a Python script, install packages with pip, and understand basic syntax (variables, functions, dictionaries).

### How much does a multi-agent AutoGen conversation cost?

The cost depends on the model used, the number of agents, and the number of rounds. With GPT-4o, expect approximately $0.05 to $0.50 per 5-to-10-round conversation with 2-3 agents. With GPT-4o-mini, the cost is 10 to 20 times lower.

### Can AutoGen execute code safely?

AutoGen can execute code generated by agents, which carries risks. Always use `use_docker=True` to isolate execution, or disable automatic execution with `code_execution_config=False` and validate the code manually before running it.

### What's the difference between AutoGen and a simple ChatGPT call?

A ChatGPT call is a bilateral interaction (user <-> model). AutoGen orchestrates conversations between multiple autonomous agents that collaborate, critique, and iterate. The result is generally of higher quality because it benefits from multiple perspectives and review cycles.

### Can I use AutoGen with models other than OpenAI?

Yes. AutoGen supports multiple providers through the `llm_config` configuration. You can use Anthropic models (Claude), local models (via Ollama), or any OpenAI-compatible endpoint. However, the smoothest experience remains with OpenAI models.

## Update — April 2026

AutoGen continues to evolve. Here are the latest developments:

- **AutoGen 0.4+**: the new architecture based on asynchronous actors offers better performance and improved scalability for large-scale conversations.
- **AutoGen Studio 2.0**: the web interface for building no-code agents has been entirely rebuilt. It now allows you to create, test, and deploy agent teams directly from the browser.
- **Improved tool support**: AutoGen now integrates external tools (APIs, databases, cloud services) more easily through a standardized plugin system.
- **Convergence with the rest of the ecosystem**: AutoGen integrates increasingly easily with LangChain (for integrations) and LangGraph (for persistence and control flow). The choice of framework is no longer exclusive.
- **Cost optimization**: new mechanisms reduce token consumption by compressing conversation history and using lightweight models for secondary agents.

To explore other agent orchestration approaches, check out [LangChain vs LangGraph: What Are the Differences](/blog/langchain-vs-langgraph) and [Semantic Kernel for .NET](/blog/semantic-kernel-dotnet).

---

AutoGen is one of the most accessible ways to discover the power of collaborative AI agents. In a few lines of Python, you can orchestrate a team of agents that solve complex problems autonomously. Start simple, experiment progressively, and you'll quickly discover the transformative potential of multi-agent systems.