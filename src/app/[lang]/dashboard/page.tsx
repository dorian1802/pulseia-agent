"use client";

import { useState, useEffect } from "react";

interface Agent {
  id: string;
  name: string;
  role: string;
  pole: string;
  status: "idle" | "working" | "review";
  currentTask?: string;
  avatar: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  status: "intake" | "design" | "dev" | "qa" | "deployed";
  progress: number;
  agents: string[];
  deadline: string;
}

const AGENTS: Agent[] = [
  { id: "victor", name: "Victor Stratos", role: "Chief Strategy", pole: "Strategy", status: "working", currentTask: "Audit Café Lumière", avatar: "🎯" },
  { id: "elena", name: "Elena Tech", role: "Technical Strategist", pole: "Strategy", status: "idle", avatar: "🔧" },
  { id: "marc", name: "Marc Identity", role: "Brand Strategist", pole: "Strategy", status: "idle", avatar: "🎨" },
  { id: "clara", name: "Clara Plume", role: "UI/UX Designer", pole: "Design", status: "working", currentTask: "Wireframes Asia Glow", avatar: "✏️" },
  { id: "iris", name: "Iris Pixel", role: "Visual Designer", pole: "Design", status: "idle", avatar: "🖼️" },
  { id: "sacha", name: "Sacha Motion", role: "Motion Designer", pole: "Design", status: "idle", avatar: "🎬" },
  { id: "thomas", name: "Thomas Frame", role: "3D Designer", pole: "Design", status: "idle", avatar: "🧊" },
  { id: "sofia", name: "Sofia Lex", role: "Full-Stack Dev", pole: "Engineering", status: "working", currentTask: "Dev HEAVORA site", avatar: "💻" },
  { id: "julie", name: "Julie Debug", role: "DevOps & QA", pole: "Engineering", status: "idle", avatar: "🧪" },
  { id: "hugo", name: "Hugo Social", role: "Social Media", pole: "Marketing", status: "idle", avatar: "📱" },
  { id: "lea", name: "Léa Conversion", role: "CRO Specialist", pole: "Marketing", status: "idle", avatar: "📈" },
  { id: "maxime", name: "Maxime Lead", role: "Lead Gen", pole: "Marketing", status: "idle", avatar: "🎯" },
  { id: "damien", name: "Damien Data", role: "SEO & Content", pole: "Marketing", status: "working", currentTask: "SEO audit Lumina", avatar: "🔍" },
  { id: "emma", name: "Emma Care", role: "Customer Success", pole: "Client", status: "working", currentTask: "Onboarding Café Lumière", avatar: "🤝" },
  { id: "robin", name: "Robin Talent", role: "HR Manager", pole: "Client", status: "idle", avatar: "👥" },
  { id: "oscar", name: "Oscar Rank", role: "Performance Analyst", pole: "Client", status: "idle", avatar: "📊" },
  { id: "noa", name: "Noa Automate", role: "Automation Engineer", pole: "Client", status: "idle", avatar: "⚡" },
  { id: "sarah", name: "Sarah Flow", role: "Project Manager", pole: "Client", status: "working", currentTask: "Planification Q3", avatar: "📋" },
];

const PROJECTS: Project[] = [
  { id: "PRJ-2026-042", name: "Café Lumière", client: "Café Lumière (Ixelles)", status: "design", progress: 45, agents: ["victor", "emma", "clara"], deadline: "2026-05-06" },
  { id: "PRJ-2026-041", name: "HEAVORA Site", client: "HEAVORA Music", status: "dev", progress: 30, agents: ["sofia", "sacha"], deadline: "2026-05-15" },
  { id: "PRJ-2026-040", name: "Lumina SEO", client: "Lumina Design", status: "intake", progress: 10, agents: ["damien", "marc"], deadline: "2026-05-01" },
  { id: "PRJ-2026-039", name: "Asia Glow E-com", client: "Asia Glow", status: "qa", progress: 85, agents: ["sofia", "julie", "clara"], deadline: "2026-04-28" },
];

const statusColors: Record<string, string> = {
  idle: "bg-slate-500",
  working: "bg-green-500",
  review: "bg-yellow-500",
  intake: "bg-blue-500",
  design: "bg-purple-500",
  dev: "bg-pink-500",
  qa: "bg-orange-500",
  deployed: "bg-emerald-500",
};

export function AgentDashboard() {
  const [activeTab, setActiveTab] = useState<"agents" | "projects">("agents");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const workingCount = AGENTS.filter(a => a.status === "working").length;
  const idleCount = AGENTS.filter(a => a.status === "idle").length;
  const activeProjects = PROJECTS.filter(p => p.status !== "deployed").length;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🎯 Pulseia Command Center</h1>
        <p className="text-slate-400">{time.toLocaleString("fr-FR")} — Dashboard temps réel</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="text-sm text-slate-400 mb-1">Agents Actifs</div>
          <div className="text-3xl font-bold text-green-400">{workingCount}/18</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="text-sm text-slate-400 mb-1">En Attente</div>
          <div className="text-3xl font-bold text-slate-400">{idleCount}/18</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="text-sm text-slate-400 mb-1">Projets En Cours</div>
          <div className="text-3xl font-bold text-purple-400">{activeProjects}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="text-sm text-slate-400 mb-1">Satisfaction Client</div>
          <div className="text-3xl font-bold text-emerald-400">N/A</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("agents")}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === "agents" ? "bg-[#a78bfa] text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"
          }`}
        >
          👥 Agents ({AGENTS.length})
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === "projects" ? "bg-[#a78bfa] text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"
          }`}
        >
          📁 Projets ({PROJECTS.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === "agents" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AGENTS.map((agent) => (
            <div key={agent.id} className="bg-white/5 border border-white/10 rounded-lg p-5 hover:border-[#a78bfa]/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{agent.avatar}</span>
                <div>
                  <h3 className="font-semibold">{agent.name}</h3>
                  <p className="text-sm text-slate-400">{agent.role}</p>
                </div>
                <div className={`ml-auto w-3 h-3 rounded-full ${statusColors[agent.status]} animate-pulse`} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">{agent.pole}</span>
                {agent.currentTask && (
                  <span className="text-[#a78bfa]">{agent.currentTask}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {PROJECTS.map((project) => (
            <div key={project.id} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-[#a78bfa]/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-sm text-slate-400">{project.client}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[project.status]} bg-opacity-20 text-white`}>
                    {project.status.toUpperCase()}
                  </span>
                  <span className="text-sm text-slate-400">Deadline: {project.deadline}</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Progression</span>
                  <span className="text-[#a78bfa]">{project.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#a78bfa] rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {project.agents.map((agentId) => {
                  const agent = AGENTS.find((a) => a.id === agentId);
                  return agent ? (
                    <span key={agentId} className="text-sm bg-white/5 px-3 py-1 rounded-full">
                      {agent.avatar} {agent.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action CTA */}
      <div className="mt-8 p-6 bg-[#a78bfa]/10 border border-[#a78bfa]/20 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Nouveau projet ?</h3>
        <p className="text-slate-400 mb-4">Lancer un workflow avec l'équipe d'agents IA</p>
        <button className="px-8 py-3 bg-[#a78bfa] hover:bg-[#8b5cf6] rounded-lg font-semibold transition-colors">
          ➕ Créer un projet
        </button>
      </div>
    </div>
  );
}

export default AgentDashboard;
