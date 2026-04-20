"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "pulseia-read-articles";
const LAST_SLUG_KEY = "pulseia-last-blog-slug";

interface ReadEntry {
  slug: string;
  timestamp: number;
}

export function useReadArticles() {
  const [readSlugs, setReadSlugs] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const entries: ReadEntry[] = JSON.parse(raw);
        setReadSlugs(new Set(entries.map((e) => e.slug)));
      }
    } catch {}
  }, []);

  const markAsRead = useCallback((slug: string) => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const entries: ReadEntry[] = raw ? JSON.parse(raw) : [];
      if (!entries.some((e) => e.slug === slug)) {
        entries.push({ slug, timestamp: Date.now() });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        setReadSlugs((prev) => new Set([...prev, slug]));
      }
      sessionStorage.setItem(LAST_SLUG_KEY, slug);
    } catch {}
  }, []);

  return { readSlugs, markAsRead, mounted };
}

export function consumeLastVisitedSlug(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const slug = sessionStorage.getItem(LAST_SLUG_KEY);
    if (slug) sessionStorage.removeItem(LAST_SLUG_KEY);
    return slug;
  } catch {
    return null;
  }
}