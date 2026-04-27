import { NextResponse } from "next/server";

export type AgentStatus = "idle" | "working" | "review";

export interface AgentData {
  id: string;
  name: string;
  role: string;
  pole: string;
  status: AgentStatus;
  currentTask?: string;
  avatar: string;
  lastSeen: string;
}

const AGENTS: AgentData[] = [
  { id: "victor", name: "Victor Stratos", role: "Chief Strategy Officer", pole: "Strategy", status: "working", currentTask: "Audit stratégique Café Lumière", avatar: "🎯", lastSeen: "2026-04-22T20:15:00Z" },
  { id: "elena", name: "Elena Tech", role: "Technical Strategist", pole: "Strategy", status: "idle", avatar: "🔧", lastSeen: "2026-04-22T20:10:00Z" },
  { id: "marc", name: "Marc Identity", role: "Brand Strategist", pole: "Strategy", status: "idle", avatar: "🎨", lastSeen: "2026-04-22T20:05:00Z" },
  { id: "clara", name: "Clara Plume", role: "UI/UX Designer", pole: "Design", status: "working", currentTask: "Wireframes Asia Glow v2", avatar: "✏️", lastSeen: "2026-04-22T20:18:00Z" },
  { id: "iris", name: "Iris Pixel", role: "Visual Designer", pole: "Design", status: "working", currentTask: "Maquettes Café Lumière", avatar: "🖼️", lastSeen: "2026-04-22T20:12:00Z" },
  { id: "sacha", name: "Sacha Motion", role: "Motion Designer", pole: "Design", status: "idle", avatar: "🎬", lastSeen: "2026-04-22T19:55:00Z" },
  { id: "thomas", name: "Thomas Frame", role: "3D & Immersive Designer", pole: "Design", status: "idle", avatar: "🧊", lastSeen: "2026-04-22T19:40:00Z" },
  { id: "sofia", name: "Sofia Lex", role: "Full-Stack Developer", pole: "Engineering", status: "working", currentTask: "Développement HEAVORA site", avatar: "💻", lastSeen: "2026-04-22T20:20:00Z" },
  { id: "julie", name: "Julie Debug", role: "DevOps & QA Engineer", pole: "Engineering", status: "review", currentTask: "QA Asia Glow E-com", avatar: "🧪", lastSeen: "2026-04-22T20:08:00Z" },
  { id: "hugo", name: "Hugo Social", role: "Social Media Manager", pole: "Marketing", status: "idle", avatar: "📱", lastSeen: "2026-04-22T19:30:00Z" },
  { id: "lea", name: "Léa Conversion", role: "CRO Specialist", pole: "Marketing", status: "working", currentTask: "Audit conversion Café Lumière", avatar: "📈", lastSeen: "2026-04-22T20:14:00Z" },
  { id: "maxime", name: "Maxime Lead", role: "Lead Generation", pole: "Marketing", status: "idle", avatar: "🎯", lastSeen: "2026-04-22T19:20:00Z" },
  { id: "damien", name: "Damien Data", role: "SEO & Content Strategist", pole: "Marketing", status: "working", currentTask: "SEO audit Lumina Design", avatar: "🔍", lastSeen: "2026-04-22T20:16:00Z" },
  { id: "emma", name: "Emma Care", role: "Customer Success Manager", pole: "Client", status: "working", currentTask: "Onboarding Café Lumière", avatar: "🤝", lastSeen: "2026-04-22T20:22:00Z" },
  { id: "robin", name: "Robin Talent", role: "HR & Talent Manager", pole: "Client", status: "idle", avatar: "👥", lastSeen: "2026-04-22T19:45:00Z" },
  { id: "oscar", name: "Oscar Rank", role: "Performance Analyst", pole: "Client", status: "review", currentTask: "Rapport Q1 2026", avatar: "📊", lastSeen: "2026-04-22T20:00:00Z" },
  { id: "noa", name: "Noa Automate", role: "Automation Engineer", pole: "Client", status: "working", currentTask: "Workflow facturation auto", avatar: "⚡", lastSeen: "2026-04-22T20:11:00Z" },
  { id: "sarah", name: "Sarah Flow", role: "Project Manager", pole: "Client", status: "working", currentTask: "Planification sprint Q3", avatar: "📋", lastSeen: "2026-04-22T20:19:00Z" },
];

export async function GET() {
  // Simule un léger délai réseau
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  return NextResponse.json({
    agents: AGENTS,
    summary: {
      total: AGENTS.length,
      working: AGENTS.filter((a) => a.status === "working").length,
      idle: AGENTS.filter((a) => a.status === "idle").length,
      review: AGENTS.filter((a) => a.status === "review").length,
      updatedAt: new Date().toISOString(),
    },
  }, {
    headers: {
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

// OPTIONS pour CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
