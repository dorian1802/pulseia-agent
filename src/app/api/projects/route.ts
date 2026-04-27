import { NextResponse } from "next/server";

export interface ProjectData {
  id: string;
  name: string;
  client: string;
  status: "intake" | "design" | "dev" | "qa" | "deployed" | "maintenance";
  progress: number;
  agents: string[];
  deadline: string;
  budget?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: "PRJ-2026-042",
    name: "Café Lumière",
    client: "Café Lumière (Ixelles)",
    status: "design",
    progress: 45,
    agents: ["victor", "emma", "clara", "iris"],
    deadline: "2026-05-06",
    budget: "€8,000",
    description: "Site vitrine + réservation pour café-restaurant",
    createdAt: "2026-04-08T10:00:00Z",
    updatedAt: "2026-04-22T18:30:00Z",
  },
  {
    id: "PRJ-2026-041",
    name: "HEAVORA Official",
    client: "HEAVORA Music",
    status: "dev",
    progress: 60,
    agents: ["sofia", "sacha", "thomas", "marc"],
    deadline: "2026-05-15",
    budget: "€12,000",
    description: "Site artiste musique électronique avec 3D et animations",
    createdAt: "2026-04-01T09:00:00Z",
    updatedAt: "2026-04-22T19:45:00Z",
  },
  {
    id: "PRJ-2026-040",
    name: "Lumina SEO",
    client: "Lumina Design",
    status: "intake",
    progress: 15,
    agents: ["damien", "elena", "victor"],
    deadline: "2026-05-01",
    budget: "€3,500",
    description: "Audit et optimisation SEO complet",
    createdAt: "2026-04-20T14:00:00Z",
    updatedAt: "2026-04-22T16:00:00Z",
  },
  {
    id: "PRJ-2026-039",
    name: "Asia Glow E-com",
    client: "Asia Glow",
    status: "qa",
    progress: 85,
    agents: ["sofia", "julie", "clara", "noa"],
    deadline: "2026-04-28",
    budget: "€15,000",
    description: "E-commerce beauté coréenne avec chatbot IA",
    createdAt: "2026-03-15T08:00:00Z",
    updatedAt: "2026-04-22T20:00:00Z",
  },
  {
    id: "PRJ-2026-038",
    name: "Pulseia V2",
    client: "Pulseia Internal",
    status: "dev",
    progress: 35,
    agents: ["sofia", "sacha", "clara", "damien"],
    deadline: "2026-06-01",
    budget: "Internal",
    description: "Refonte site Pulseia avec dashboard agents",
    createdAt: "2026-04-10T11:00:00Z",
    updatedAt: "2026-04-22T19:00:00Z",
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  return NextResponse.json({
    projects: PROJECTS,
    summary: {
      total: PROJECTS.length,
      active: PROJECTS.filter((p) => p.status !== "deployed" && p.status !== "maintenance").length,
      completed: PROJECTS.filter((p) => p.status === "deployed").length,
      overdue: PROJECTS.filter((p) => new Date(p.deadline) < new Date() && p.status !== "deployed").length,
      totalBudget: PROJECTS.reduce((acc, p) => acc + (parseInt(p.budget?.replace(/[^0-9]/g, "") || "0")), 0),
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
