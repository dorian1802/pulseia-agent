import { NextResponse } from "next/server";

export interface ActivityData {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  agentAvatar: string;
  action: string;
  projectId?: string;
  projectName?: string;
  type: "info" | "success" | "warning" | "error";
}

const ACTIVITIES: ActivityData[] = [
  { id: "act-001", timestamp: "2026-04-22T20:28:00Z", agentId: "sofia", agentName: "Sofia Lex", agentAvatar: "💻", action: "Push code: composant Hero HEAVORA", projectId: "PRJ-2026-041", projectName: "HEAVORA Official", type: "success" },
  { id: "act-002", timestamp: "2026-04-22T20:25:00Z", agentId: "clara", agentName: "Clara Plume", agentAvatar: "✏️", action: "Wireframes v2 validés par client", projectId: "PRJ-2026-039", projectName: "Asia Glow E-com", type: "success" },
  { id: "act-003", timestamp: "2026-04-22T20:22:00Z", agentId: "emma", agentName: "Emma Care", agentAvatar: "🤝", action: "Call client: Café Lumière - feedback positif", projectId: "PRJ-2026-042", projectName: "Café Lumière", type: "info" },
  { id: "act-004", timestamp: "2026-04-22T20:18:00Z", agentId: "damien", agentName: "Damien Data", agentAvatar: "🔍", action: "Rapport SEO: 47 erreurs corrigées", projectId: "PRJ-2026-040", projectName: "Lumina SEO", type: "success" },
  { id: "act-005", timestamp: "2026-04-22T20:15:00Z", agentId: "victor", agentName: "Victor Stratos", agentAvatar: "🎯", action: "Stratégie digitale validée", projectId: "PRJ-2026-042", projectName: "Café Lumière", type: "success" },
  { id: "act-006", timestamp: "2026-04-22T20:10:00Z", agentId: "noa", agentName: "Noa Automate", agentAvatar: "⚡", action: "Workflow facturation auto: tests OK", type: "info" },
  { id: "act-007", timestamp: "2026-04-22T20:05:00Z", agentId: "julie", agentName: "Julie Debug", agentAvatar: "🧪", action: "Bug critique trouvé: checkout Asia Glow", projectId: "PRJ-2026-039", projectName: "Asia Glow E-com", type: "error" },
  { id: "act-008", timestamp: "2026-04-22T20:00:00Z", agentId: "oscar", agentName: "Oscar Rank", agentAvatar: "📊", action: "Rapport performance Q1 généré", type: "info" },
  { id: "act-009", timestamp: "2026-04-22T19:55:00Z", agentId: "iris", agentName: "Iris Pixel", agentAvatar: "🖼️", action: "Maquettes Café Lumière: version finale", projectId: "PRJ-2026-042", projectName: "Café Lumière", type: "success" },
  { id: "act-010", timestamp: "2026-04-22T19:50:00Z", agentId: "sarah", agentName: "Sarah Flow", agentAvatar: "📋", action: "Nouveau sprint planifié: 15 tâches", type: "info" },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  return NextResponse.json({
    activities: ACTIVITIES,
    summary: {
      total: ACTIVITIES.length,
      lastHour: ACTIVITIES.filter((a) => {
        const hourAgo = new Date(Date.now() - 3600000);
        return new Date(a.timestamp) > hourAgo;
      }).length,
      updatedAt: new Date().toISOString(),
    },
  }, {
    headers: {
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

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
