---
title: "Building a Chatbot That Answers from Your Documents: Complete Guide with RAGFlow"
excerpt: "Step-by-step tutorial to build a RAG chatbot with RAGFlow: installation, document ingestion, configuration, testing, and deployment."
date: "2026-04-19"
author: "Pulseia"
category: "IA"
readTime: "14 min"
coverImage: "/blog/placeholder-cover.svg"
---

You want a chatbot that answers from your internal documents, with precision and without hallucination? **RAGFlow** is the fastest way to get there. This step-by-step guide walks you from installation to deploying an operational RAG chatbot.

## Why RAGFlow for a document chatbot?

Before we start, let's understand why RAGFlow is an excellent choice for this use case. For a comparison with other frameworks, check out [RAGFlow vs LlamaIndex](/blog/ragflow-vs-llamaindex).

| RAGFlow Advantage | Description |
|---|---|
| Complete interface | Document management, RAG, and chat in a single UI |
| Advanced parsing | Native handling of complex PDFs, tables, and images |
| Smart chunking | 6 splitting methods adapted to document types |
| Zero code | No programming needed to create the chatbot |
| Docker deployment | One-command installation |
| Multi-user | Built-in authentication and access management |

## Step 1: Install RAGFlow

### Prerequisites

- Docker and Docker Compose installed
- 16 GB RAM minimum (32 GB recommended)
- 50 GB disk space
- An OpenAI API key or a local Ollama model

For local models, check out [Ollama: How to Run a LLM Locally](/blog/ollama-llm-local).

### Installation via Docker

```bash
# Clone the repository
git clone https://github.com/infiniflow/ragflow.git
cd ragflow

# Start the services
docker compose -f docker-compose.yml up -d

# Verify services are running
docker compose ps
```

### Access the interface

1. Open `http://localhost` in your browser
2. Create your admin account
3. You'll land on the main dashboard

### Installation troubleshooting

| Problem | Solution |
|---|---|
| Port 80 in use | Change the port in docker-compose.yml |
| Elasticsearch won't start | Check vm.max_map_count: `sudo sysctl -w vm.max_map_count=262144` |
| OOM (Out of Memory) | Increase RAM allocated to Docker (16 GB min) |
| Slow startup | Normal, wait 2-3 minutes for initialization |

## Step 2: Configure the language model

### Option A: Use OpenAI (simplest)

1. Go to **Settings** (gear icon)
2. Click **Model Providers**
3. Add your OpenAI API key
4. Select the model: `gpt-4o-mini` (economical) or `gpt-4o` (better quality)

### Option B: Use Ollama (free and local)

1. Make sure Ollama is running on port 11434
2. In RAGFlow, go to **Model Providers**
3. Add an Ollama provider with the URL `http://host.docker.internal:11434`
4. Select the model: `llama3.1:8b` or `mistral:7b`

For more details on Ollama, check out our guide [Ollama: How to Run a LLM Locally](/blog/ollama-llm-local) and [Open WebUI + Ollama: Build Your Private ChatGPT](/blog/open-webui-ollama-chatgpt-prive).

### Option C: Use other providers

RAGFlow also supports Anthropic (Claude), Google (Gemini), ZhipuAI, and others. Configuration is similar: add the provider and your API key.

### Embedding configuration

| Embedding model | Size | Quality | Price |
|---|---|---|---|
| text-embedding-3-small (OpenAI) | 1536 dim | Good | $0.02/1M tokens |
| text-embedding-3-large (OpenAI) | 3072 dim | Excellent | $0.13/1M tokens |
| nomic-embed-text (Ollama) | 768 dim | Good | Free |
| bge-large-zh (local) | 1024 dim | Good (French) | Free |

For English, `text-embedding-3-small` offers a good quality-to-price balance. Locally, `nomic-embed-text` via Ollama works well.

## Step 3: Create a knowledge base

### Create the base

1. On the dashboard, click **Knowledge Base**
2. Click **Create Knowledge Base**
3. Name your base (for example: "Internal Documentation")
4. Select the chunking method

### Choose the chunking method

| Method | Description | When to use |
|---|---|---|
| General | Fixed-size splitting | Standard texts, articles |
| Q&A | Question/answer extraction | FAQ, customer support |
| Resume | Section-by-section summary | Long documents, reports |
| Table | Table extraction | Tabular data, pricing |
| Paper | Academic paper sections | Research articles |
| Book | Chapters and sections | Books, manuals |
| Laws | Legal articles | Legal documents |

For most use cases, **General** is the right default choice.

### Recommended chunking parameters

| Parameter | Recommended value | Description |
|---|---|---|
| Chunk size | 512 tokens | Size of each segment |
| Chunk overlap | 50 tokens | Overlap between segments |
| Max tokens per chunk | 1024 | Maximum limit |

## Step 4: Ingest your documents

### Supported formats

| Format | Supported | Parsing quality |
|---|---|---|
| PDF | Yes | Excellent (built-in OCR) |
| DOCX | Yes | Good |
| TXT/MD | Yes | Excellent |
| CSV/Excel | Yes | Good |
| Images (PNG, JPG) | Yes (via OCR) | Good |
| PPTX | Yes | Average |

### Upload documents

1. In your Knowledge Base, click **Upload**
2. Drag and drop your files or select them
3. RAGFlow starts parsing automatically
4. Wait until the status changes to "Completed"

### Preparing your documents for optimal RAG

- **Clean up PDFs**: Remove cover pages and unnecessary tables of contents
- **Structure headings**: Well-structured documents (H1, H2 headings) produce better chunks
- **Avoid scans**: Text PDFs parse better than scans (even though OCR handles them)
- **Separate topics**: One knowledge base per topic is more effective than a catch-all base

For web content crawling to integrate into RAGFlow, check out [Firecrawl: How to Turn Any Website into AI-Usable Data](/blog/firecrawl-guide-pratique).

## Step 5: Create the chatbot

### Assistant configuration

1. Go to **Chat** or **Assistant**
2. Click **Create Assistant**
3. Configure the parameters:

| Parameter | Recommended value | Description |
|---|---|---|
| Name | "Documentation Assistant" | Display name |
| LLM | gpt-4o-mini or llama3.1:8b | Generation model |
| Knowledge Base | Your created base | Data source |
| Temperature | 0.1 | Low for factual responses |
| Top P | 0.9 | Generation quality |
| Max tokens | 2048 | Max response length |
| Similarity threshold | 0.2 | Minimum similarity threshold |

### System prompt

Add a system prompt that guides the chatbot's behavior:

```
You are an expert assistant that answers questions based
only on the documents provided in the knowledge base.

Rules:
1. Always respond in English
2. If the answer is not in the documents, say so clearly
3. Cite your sources by mentioning the original document
4. Structure your responses with lists and headings
5. Never fabricate information that is not in the documents
6. If a question is ambiguous, ask for clarification
```

## Step 6: Test the chatbot

### Validation tests

Before deploying, systematically test:

| Test type | Sample question | Expected result |
|---|---|---|
| Factual question | "What is the leave policy?" | Precise answer with source |
| Complex question | "How do I request parental leave?" | Step-by-step answer |
| Off-topic | "What's the weather in Paris?" | "I don't have that information" |
| Ambiguous | "How does the system work?" | Request for clarification |
| Multi-document | "Compare the benefits of plans A and B" | Synthesis from multiple sources |

### Quality metrics

| Metric | Target | How to measure |
|---|---|---|
| Correct answer rate | > 85% | Manual testing on 50+ questions |
| Hallucination rate | < 5% | Source verification |
| "I don't know" rate | < 20% | Questions whose answer is in the docs |
| Average latency | < 3 seconds | Response time measurement |
| User satisfaction | > 4/5 | Direct feedback |

## Step 7: Deploy the chatbot

### Internal deployment

For internal deployment, RAGFlow provides:

1. **Built-in web interface**: Share the chat URL with your team
2. **REST API**: To integrate into your existing applications
3. **iFrame widget**: To embed the chat on your website

### REST API

```bash
# Send a question via the API
curl -X POST "http://localhost/api/v1/chat" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "assistant_id": "your-assistant-id",
    "question": "What is the leave policy?"
  }'
```

### Embeddable widget

RAGFlow provides a JavaScript snippet to embed the chatbot on any website:

```html
<iframe
  src="http://your-server/chat/share/your-token"
  width="400"
  height="600"
  style="border: none; border-radius: 10px;">
</iframe>
```

### Securing the deployment

| Measure | Description |
|---|---|
| HTTPS | Use a reverse proxy (Nginx/Caddy) with SSL certificate |
| Authentication | Enable mandatory login in RAGFlow |
| VPN | For remote access, use Tailscale or WireGuard |
| Rate limiting | Limit the number of requests per user |
| Backups | Regularly back up Qdrant and PostgreSQL data |

For more details on secure self-hosting, check out [Why Self-Host Your AI Tools](/blog/auto-heberger-outils-ia).

## Maintenance and continuous improvement

### Document updates

- Regularly add new documents to the knowledge base
- Remove obsolete documents
- Re-run parsing when you modify an important document

### Monitoring

| Metric to monitor | Frequency | Action if anomaly |
|---|---|---|
| Response latency | Continuous | Optimize model or vector store |
| Answer quality | Weekly | Adjust chunking or prompt |
| Usage | Daily | Scale resources |
| System errors | Continuous | Check Docker logs |

### Progressive improvement

1. Collect user questions
2. Identify unsatisfactory answers
3. Add missing documents
4. Refine the system prompt
5. Adjust retrieval parameters

## FAQ

### How many documents can RAGFlow handle?

RAGFlow comfortably handles thousands of documents. The limit depends primarily on your infrastructure (RAM, storage). For large volumes (>100k documents), use Elasticsearch as a vector store and scale resources accordingly.

### Are the chatbot's answers reliable?

RAGFlow significantly reduces hallucinations by grounding answers in documents. However, no RAG system is perfect. Typical hallucination rates are 3 to 10% depending on chunking quality and model. Always validate critical answers.

### Can you use RAGFlow with LlamaIndex?

Yes, both can coexist. RAGFlow for the turnkey chatbot, [LlamaIndex](/blog/llamaindex-explication-simple) for more customized RAG pipelines. Check out [RAGFlow vs LlamaIndex](/blog/ragflow-vs-llamaindex) to understand the differences.

### How do you handle multilingual documents?

RAGFlow supports documents in multiple languages. For English, make sure the LLM model and embedding model handle English well. GPT-4o and Llama 3.1 8B work correctly in English. For embeddings, text-embedding-3-small (OpenAI) is recommended.

### What is the operating cost?

With self-hosting and Ollama, the cost is limited to electricity (about $15-30/month for a 24/7 server). With OpenAI APIs, expect $5 to $50/month depending on request volume. For more details on self-hosting costs, check out [Why Self-Host Your AI Tools](/blog/auto-heberger-outils-ia).

## Update — April 2026

RAGFlow has continued its steady improvement. PDF parsing is even better with support for mathematical formulas and complex diagrams. New chunking methods have been added for legal documents and technical specifications. The interface has been modernized with better visual feedback during ingestion. On the integration side, RAGFlow now works perfectly with [Ollama](/blog/ollama-llm-local) for a fully local and free stack. For projects requiring more flexibility, [LlamaIndex](/blog/llamaindex-explication-simple) remains the programmatic reference. For web data ingestion, [Firecrawl](/blog/firecrawl-guide-pratique) is the ideal complement. The RAGFlow + Ollama + Firecrawl combo constitutes a complete local RAG pipeline with no recurring costs.