"use server";

/**
 * Orchestrateur Pulseia
 * Route les demandes vers les bons agents et gère les workflows
 */

import { analyzeWebsite, researchCompetitors } from "../tools/analyze-website";

export type AgentId = 
  | "victor-stratos" | "elena-tech" | "marc-identity"
  | "clara-plume" | "iris-pixel" | "sacha-motion" | "thomas-frame"
  | "sofia-lex" | "julie-debug"
  | "hugo-social" | "lea-conversion" | "maxime-lead" | "damien-data"
  | "emma-care" | "robin-talent" | "oscar-rank" | "noa-automate" | "sarah-flow";

export type TaskType = 
  | "website-analysis"
  | "competitor-research" 
  | "seo-audit"
  | "design-wireframe"
  | "code-generation"
  | "social-media-plan"
  | "lead-generation"
  | "performance-report"
  | "automation-workflow"
  | "project-planning";

interface Task {
  id: string;
  type: TaskType;
  agentId: AgentId;
  input: Record<string, any>;
  status: "pending" | "running" | "completed" | "failed";
  output?: any;
  createdAt: Date;
  completedAt?: Date;
}

// Router simple basé sur keywords
const AGENT_ROUTING: Record<string, AgentId> = {
  "site web": "victor-stratos",
  "website": "victor-stratos",
  "analyse": "victor-stratos",
  "audit": "victor-stratos",
  "stratégie": "victor-stratos",
  
  "technique": "elena-tech",
  "stack": "elena-tech",
  "architecture": "elena-tech",
  "feasibility": "elena-tech",
  
  "marque": "marc-identity",
  "branding": "marc-identity",
  "identité": "marc-identity",
  "logo": "marc-identity",
  
  "ui": "clara-plume",
  "ux": "clara-plume",
  "wireframe": "clara-plume",
  "interface": "clara-plume",
  "design": "clara-plume",
  
  "visuel": "iris-pixel",
  "maquette": "iris-pixel",
  "mockup": "iris-pixel",
  "palette": "iris-pixel",
  
  "animation": "sacha-motion",
  "motion": "sacha-motion",
  "transition": "sacha-motion",
  "gsap": "sacha-motion",
  
  "3d": "thomas-frame",
  "webgl": "thomas-frame",
  "three.js": "thomas-frame",
  "immersif": "thomas-frame",
  
  "développement": "sofia-lex",
  "code": "sofia-lex",
  "next.js": "sofia-lex",
  "react": "sofia-lex",
  "api": "sofia-lex",
  
  "deploy": "julie-debug",
  "ci/cd": "julie-debug",
  "test": "julie-debug",
  "qa": "julie-debug",
  "monitoring": "julie-debug",
  
  "social": "hugo-social",
  "instagram": "hugo-social",
  "tiktok": "hugo-social",
  "linkedin": "hugo-social",
  
  "conversion": "lea-conversion",
  "cro": "lea-conversion",
  "ab test": "lea-conversion",
  "funnel": "lea-conversion",
  
  "leads": "maxime-lead",
  "ads": "maxime-lead",
  "google ads": "maxime-lead",
  "meta ads": "maxime-lead",
  
  "seo": "damien-data",
  "référencement": "damien-data",
  "mots-clés": "damien-data",
  "content": "damien-data",
  "blog": "damien-data",
  
  "client": "emma-care",
  "support": "emma-care",
  "onboarding": "emma-care",
  
  "recrutement": "robin-talent",
  "rh": "robin-talent",
  
  "kpi": "oscar-rank",
  "performance": "oscar-rank",
  "rapport": "oscar-rank",
  
  "automatisation": "noa-automate",
  "workflow": "noa-automate",
  "n8n": "noa-automate",
  "zapier": "noa-automate",
  
  "planning": "sarah-flow",
  "projet": "sarah-flow",
  "deadline": "sarah-flow",
  "gantt": "sarah-flow",
};

export function routeTask(message: string): AgentId {
  const lowerMessage = message.toLowerCase();
  
  for (const [keyword, agentId] of Object.entries(AGENT_ROUTING)) {
    if (lowerMessage.includes(keyword)) {
      return agentId;
    }
  }
  
  // Default: Victor Stratos pour analyse stratégique
  return "victor-stratos";
}

export async function executeTask(type: TaskType, input: Record<string, any>): Promise<Task> {
  const task: Task = {
    id: `task-${Date.now()}`,
    type,
    agentId: routeTask(type),
    input,
    status: "running",
    createdAt: new Date(),
  };

  try {
    switch (type) {
      case "website-analysis":
        if (!input.url) throw new Error("URL required");
        task.output = await analyzeWebsite(input.url);
        break;
        
      case "competitor-research":
        if (!input.keywords) throw new Error("Keywords required");
        task.output = await researchCompetitors(input.keywords, input.location);
        break;
        
      default:
        task.output = { 
          message: "Task executed (simulated)", 
          type,
          input,
          agent: task.agentId,
        };
    }
    
    task.status = "completed";
    task.completedAt = new Date();
  } catch (error) {
    task.status = "failed";
    task.output = { error: error instanceof Error ? error.message : "Unknown error" };
  }

  return task;
}

// Workflow complet : nouveau client → site web
export async function runWebsiteProjectWorkflow(clientData: {
  name: string;
  email: string;
  businessType: string;
  goals: string[];
  budget?: string;
  timeline?: string;
}) {
  const workflow = [
    {
      step: 1,
      agent: "victor-stratos",
      task: "strategy-diagnostic",
      description: "Analyse des besoins et définition de la stratégie",
    },
    {
      step: 2,
      agent: "elena-tech",
      task: "technical-feasibility",
      description: "Évaluation technique et choix de la stack",
    },
    {
      step: 3,
      agent: "marc-identity",
      task: "brand-definition",
      description: "Définition de l'identité de marque",
    },
    {
      step: 4,
      agent: "clara-plume",
      task: "ui-wireframes",
      description: "Conception des wireframes UX",
    },
    {
      step: 5,
      agent: "iris-pixel",
      task: "visual-design",
      description: "Création de la maquette visuelle",
    },
    {
      step: 6,
      agent: "sofia-lex",
      task: "development",
      description: "Développement du site web",
    },
    {
      step: 7,
      agent: "julie-debug",
      task: "testing-deployment",
      description: "Tests QA et déploiement",
    },
    {
      step: 8,
      agent: "damien-data",
      task: "seo-optimization",
      description: "Optimisation SEO post-launch",
    },
  ];

  return {
    client: clientData,
    workflow,
    estimatedDuration: clientData.timeline || "4-6 semaines",
    estimatedBudget: clientData.budget || "À définir",
    status: "initialized",
  };
}
