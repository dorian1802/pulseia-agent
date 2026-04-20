"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function BlogArticle({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => setVisible(true),
    });

    return () => trigger.kill();
  }, []);

  if (!visible) {
    return (
      <div ref={ref} className="prose-custom">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div ref={ref} className="prose-custom">
      <TypedMarkdown content={content} />
    </div>
  );
}

function GeneratingImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState<"loading" | "generating" | "revealing" | "done">("loading");

  useEffect(() => {
    // Phase 1: Loading skeleton (0-800ms)
    const t1 = setTimeout(() => setPhase("generating"), 800);
    // Phase 2: "Generating" with progress bar (800-2000ms)
    const t2 = setTimeout(() => setPhase("revealing"), 2000);
    // Phase 3: Blur reveal (2000-3200ms)
    const t3 = setTimeout(() => setPhase("done"), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const blurAmount = phase === "loading" ? 30 : phase === "generating" ? 20 : phase === "revealing" ? 8 : 0;

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/[0.06] relative">
      {/* Progress bar */}
      {phase !== "done" && (
        <div className="absolute top-0 left-0 right-0 z-10 h-[2px]">
          <div
            className="h-full bg-gradient-to-r from-accent to-blue-400 transition-all duration-1000 ease-out"
            style={{ width: phase === "loading" ? "20%" : phase === "generating" ? "60%" : "95%" }}
          />
        </div>
      )}

      {/* Status badge */}
      {phase !== "done" && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark/80 backdrop-blur-sm border border-white/10">
          <span className={`w-2 h-2 rounded-full ${phase === "loading" ? "bg-white/40 animate-pulse" : "bg-accent animate-pulse"}`} />
          <span className="text-[10px] tracking-[0.15em] uppercase text-white/60">
            {phase === "loading" ? "Chargement..." : phase === "generating" ? "Génération en cours..." : "Finalisation..."}
          </span>
        </div>
      )}

      {/* Skeleton */}
      {phase === "loading" && (
        <div className="aspect-[16/9] bg-white/[0.03] flex items-center justify-center">
          <div className="space-y-3 w-3/4">
            <div className="h-3 bg-white/[0.06] rounded w-full animate-pulse" />
            <div className="h-3 bg-white/[0.06] rounded w-5/6 animate-pulse" />
            <div className="h-3 bg-white/[0.06] rounded w-4/6 animate-pulse" />
          </div>
        </div>
      )}

      {/* Image with blur effect */}
      {phase !== "loading" && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            className="w-full h-full object-cover transition-[filter] duration-1000 ease-out"
            style={{
              filter: loaded ? `blur(${blurAmount}px)` : "blur(30px)",
              opacity: loaded ? 1 : 0,
            }}
          />
          {/* Overlay that fades out during reveal */}
          <div
            className="absolute inset-0 bg-accent/[0.03] transition-opacity duration-1000"
            style={{ opacity: phase === "done" ? 0 : 1 }}
          />
        </div>
      )}

      {/* Caption */}
      <div className="px-4 py-3 border-t border-white/[0.04] flex items-center justify-between">
        <span className="text-xs text-white/30">{alt}</span>
        {phase === "done" && (
          <span className="text-[10px] tracking-widest uppercase text-accent/50">Généré par IA</span>
        )}
      </div>
    </div>
  );
}

function TypedMarkdown({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const container = containerRef.current;
    if (!container) return;

    const textElements = container.querySelectorAll("p, h2, h3, blockquote, ul, ol, pre, li");
    const images = container.querySelectorAll("img");

    const queue: { el: HTMLElement; text: string; html: string; type: "text" | "image" }[] = [];

    // Build queue: interleave text and images in DOM order
    const allElements = container.querySelectorAll("p, h2, h3, blockquote, ul, ol, pre, li, img");
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (el.tagName === "IMG") {
        const img = el as HTMLImageElement;
        const parent = img.closest("p");
        if (parent) {
          queue.push({ el: parent as HTMLElement, text: "", html: parent.innerHTML, type: "image" });
        }
        return;
      }
      const text = htmlEl.textContent || "";
      if (!text.trim()) return;
      // Skip if this element is inside an image paragraph
      if (htmlEl.closest("p") && (htmlEl.closest("p") as HTMLElement).querySelector("img")) return;
      queue.push({ el: htmlEl, text, html: htmlEl.innerHTML, type: "text" });
    });

    // Deduplicate image entries
    const seen = new Set<HTMLElement>();
    const deduped = queue.filter((item) => {
      if (seen.has(item.el)) return false;
      seen.add(item.el);
      return true;
    });

    // Hide all queued elements
    deduped.forEach(({ el }) => {
      el.style.opacity = "0";
      el.style.position = "relative";
    });

    let currentIdx = 0;

    function processNext() {
      if (currentIdx >= deduped.length) return;
      const item = deduped[currentIdx];
      currentIdx++;

      if (item.type === "image") {
        // Replace image paragraph with GeneratingImage component via React-like DOM manipulation
        const el = item.el;
        el.style.opacity = "1";

        const img = el.querySelector("img");
        if (!img) { processNext(); return; }

        const src = img.getAttribute("src") || "";
        const alt = img.getAttribute("alt") || "";

        // Create the generating image container
        const wrapper = document.createElement("div");
        wrapper.className = "my-8 rounded-xl overflow-hidden border border-white/[0.06] relative";

        // Progress bar
        const progressBar = document.createElement("div");
        progressBar.className = "absolute top-0 left-0 right-0 z-10 h-[2px]";
        progressBar.innerHTML = '<div class="h-full bg-gradient-to-r from-accent to-blue-400 transition-all duration-1000 ease-out" style="width:20%"></div>';
        wrapper.appendChild(progressBar);

        // Status badge
        const badge = document.createElement("div");
        badge.className = "absolute top-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark/80 backdrop-blur-sm border border-white/10";
        badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span><span class="text-[10px] tracking-[0.15em] uppercase text-white/60">Génération en cours...</span>';
        wrapper.appendChild(badge);

        // Image container
        const imgContainer = document.createElement("div");
        imgContainer.className = "relative aspect-[16/9] overflow-hidden";
        const newImg = document.createElement("img");
        newImg.src = src;
        newImg.alt = alt;
        newImg.className = "w-full h-full object-cover";
        newImg.style.filter = "blur(25px)";
        newImg.style.transition = "filter 1.5s ease-out";
        imgContainer.appendChild(newImg);

        // Accent overlay
        const overlay = document.createElement("div");
        overlay.className = "absolute inset-0 bg-accent/[0.03] transition-opacity duration-1500";
        imgContainer.appendChild(overlay);
        wrapper.appendChild(imgContainer);

        // Caption
        const caption = document.createElement("div");
        caption.className = "px-4 py-3 border-t border-white/[0.04] flex items-center justify-between";
        caption.innerHTML = `<span class="text-xs text-white/30">${alt}</span>`;
        wrapper.appendChild(caption);

        // Replace the paragraph with the wrapper
        el.replaceWith(wrapper);

        // Animate: loading -> generating -> revealing -> done
        setTimeout(() => {
          // Phase 2: generating (60% progress)
          (progressBar.firstElementChild as HTMLElement).style.width = "60%";
        }, 500);

        setTimeout(() => {
          // Phase 3: revealing (95% progress, start unblurring)
          (progressBar.firstElementChild as HTMLElement).style.width = "95%";
          newImg.style.filter = "blur(8px)";
          badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span><span class="text-[10px] tracking-[0.15em] uppercase text-white/60">Finalisation...</span>';
        }, 1500);

        setTimeout(() => {
          // Phase 4: done (100%, fully unblurred)
          newImg.style.filter = "blur(0px)";
          progressBar.style.opacity = "0";
          badge.style.opacity = "0";
          overlay.style.opacity = "0";
          caption.innerHTML = `<span class="text-xs text-white/30">${alt}</span><span class="text-[10px] tracking-widest uppercase text-accent/50">Généré par IA</span>`;
          processNext();
        }, 2800);

        return;
      }

      // Text typing
      const { el, text, html } = item;
      el.style.opacity = "1";
      el.textContent = "";

      const cursor = document.createElement("span");
      cursor.className = "ai-cursor";
      cursor.textContent = "▌";
      cursor.style.color = "var(--color-accent)";
      cursor.style.animation = "cursor-blink 0.6s step-end infinite";
      el.appendChild(cursor);

      let charIdx = 0;

      function typeChar() {
        if (charIdx < text.length) {
          const chunk = text.slice(charIdx, charIdx + 3);
          cursor.before(chunk);
          charIdx += chunk.length;
          requestAnimationFrame(typeChar);
        } else {
          cursor.remove();
          el.innerHTML = html;
          el.style.opacity = "1";
          processNext();
        }
      }

      typeChar();
    }

    processNext();
  }, [started]);

  return (
    <div ref={containerRef}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}