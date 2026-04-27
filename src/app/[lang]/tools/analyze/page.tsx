"use client";

import { useState } from "react";
import { analyzeWebsite } from "@/agents/tools/analyze-website";

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!url) return;
    setLoading(true);
    try {
      const analysis = await analyzeWebsite(url);
      setResult(analysis);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : "Error" });
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <h1 className="text-3xl font-bold mb-8">🎯 Victor Stratos — Website Analysis Tool</h1>
      
      <div className="flex gap-4 mb-8">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-6 py-3 bg-[#a78bfa] rounded-lg font-semibold hover:bg-[#8b5cf6] disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {result && !result.error && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ScoreCard label="Performance" score={result.performance.score} />
            <ScoreCard label="SEO" score={result.seo.score} />
            <ScoreCard label="Accessibility" score={result.accessibility.score} />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Technologies Detected</h3>
            <div className="flex flex-wrap gap-2">
              {result.technologies.map((tech: string) => (
                <span key={tech} className="bg-[#a78bfa]/20 text-[#a78bfa] px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {result.seo.issues.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="font-semibold mb-4 text-yellow-400">SEO Issues</h3>
              <ul className="space-y-2">
                {result.seo.issues.map((issue: string) => (
                  <li key={issue} className="text-slate-300">⚠️ {issue}</li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="font-semibold mb-4 text-emerald-400">Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec: string) => (
                  <li key={rec} className="text-slate-300">💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {result?.error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-red-400">
          ❌ {result.error}
        </div>
      )}
    </div>
  );
}

function ScoreCard({ label, score }: { label: string; score: number }) {
  const color = score >= 80 ? "text-emerald-400" : score >= 60 ? "text-yellow-400" : "text-red-400";
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
      <div className="text-sm text-slate-400 mb-2">{label}</div>
      <div className={`text-4xl font-bold ${color}`}>{score}/100</div>
    </div>
  );
}
