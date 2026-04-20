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
    const t1 = setTimeout(() => setPhase("generating"), 800);
    const t2 = setTimeout(() => setPhase("revealing"), 2000);
    const t3 = setTimeout(() => setPhase("done"), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const blurAmount = phase === "loading" ? 30 : phase === "generating" ? 20 : phase === "revealing" ? 8 : 0;

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/[0.06] relative">
      {phase !== "done" && (
        <div className="absolute top-0 left-0 right-0 z-10 h-[2px]">
          <div
            className="h-full bg-gradient-to-r from-accent to-blue-400 transition-all duration-1000 ease-out"
            style={{ width: phase === "loading" ? "20%" : phase === "generating" ? "60%" : "95%" }}
          />
        </div>
      )}
      {phase !== "done" && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark/80 backdrop-blur-sm border border-white/10">
          <span className={`w-2 h-2 rounded-full ${phase === "loading" ? "bg-white/40 animate-pulse" : "bg-accent animate-pulse"}`} />
          <span className="text-[10px] tracking-[0.15em] uppercase text-white/60">
            {phase === "loading" ? "Chargement..." : phase === "generating" ? "Génération en cours..." : "Finalisation..."}
          </span>
        </div>
      )}
      {phase === "loading" && (
        <div className="aspect-[16/9] bg-white/[0.03] flex items-center justify-center">
          <div className="space-y-3 w-3/4">
            <div className="h-3 bg-white/[0.06] rounded w-full animate-pulse" />
            <div className="h-3 bg-white/[0.06] rounded w-5/6 animate-pulse" />
            <div className="h-3 bg-white/[0.06] rounded w-4/6 animate-pulse" />
          </div>
        </div>
      )}
      {phase !== "loading" && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            className="w-full h-full object-cover transition-[filter] duration-1000 ease-out"
            style={{ filter: loaded ? `blur(${blurAmount}px)` : "blur(30px)", opacity: loaded ? 1 : 0 }}
          />
          <div
            className="absolute inset-0 bg-accent/[0.03] transition-opacity duration-1000"
            style={{ opacity: phase === "done" ? 0 : 1 }}
          />
        </div>
      )}
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

    const allElements = container.querySelectorAll("p, h2, h3, blockquote, ul, ol, pre, li, table, img");

    type ItemType = "text" | "image" | "heading" | "table";
    const queue: { el: HTMLElement; text: string; html: string; type: ItemType }[] = [];
    const seen = new Set<HTMLElement>();

    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement;

      // Skip if already processed (e.g. inside a table or image paragraph)
      if (seen.has(htmlEl)) return;

      if (el.tagName === "IMG") {
        const parent = el.closest("p");
        if (parent) {
          if (seen.has(parent as HTMLElement)) return;
          seen.add(parent as HTMLElement);
          queue.push({ el: parent as HTMLElement, text: "", html: parent.innerHTML, type: "image" });
        }
        return;
      }

      // Skip elements inside an image paragraph
      if (htmlEl.closest("p") && (htmlEl.closest("p") as HTMLElement).querySelector("img")) return;

      // Skip elements inside a table (we handle the whole table)
      if (htmlEl.tagName !== "TABLE" && htmlEl.closest("table")) return;

      const text = htmlEl.textContent || "";
      if (!text.trim() && htmlEl.tagName !== "TABLE") return;

      if (htmlEl.tagName === "H2" || htmlEl.tagName === "H3") {
        seen.add(htmlEl);
        queue.push({ el: htmlEl, text, html: htmlEl.innerHTML, type: "heading" });
        return;
      }

      if (htmlEl.tagName === "TABLE") {
        seen.add(htmlEl);
        // Mark all child elements as seen so they don't get double-processed
        htmlEl.querySelectorAll("thead, tbody, tr, td, th, caption").forEach((child) => seen.add(child as HTMLElement));
        queue.push({ el: htmlEl, text: "", html: htmlEl.innerHTML, type: "table" });
        return;
      }

      seen.add(htmlEl);
      queue.push({ el: htmlEl, text, html: htmlEl.innerHTML, type: "text" });
    });

    // Hide all queued elements
    queue.forEach(({ el }) => {
      el.style.opacity = "0";
      el.style.position = "relative";
    });

    let currentIdx = 0;

    function processNext() {
      if (currentIdx >= queue.length) return;
      const item = queue[currentIdx];
      currentIdx++;

      if (item.type === "heading") {
        // Instant reveal for headings — no typing animation
        const { el, html } = item;
        el.innerHTML = html;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
        // Trigger a small slide-up reveal
        el.style.transform = "translateY(8px)";
        requestAnimationFrame(() => {
          el.style.transform = "translateY(0)";
        });
        processNext();
        return;
      }

      if (item.type === "table") {
        // Animated table: reveal row by row
        const { el, html } = item;
        el.innerHTML = html;
        el.style.opacity = "1";

        // Style the table
        el.className = "w-full border-collapse my-6";

        const rows = el.querySelectorAll("tr");
        rows.forEach((row, idx) => {
          const rowEl = row as HTMLElement;
          rowEl.style.opacity = "0";
          rowEl.style.transform = "translateY(10px)";
          rowEl.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
        });

        // Style header cells
        const headerCells = el.querySelectorAll("th");
        headerCells.forEach((cell) => {
          const c = cell as HTMLElement;
          c.className = "px-4 py-3 text-left text-xs tracking-[0.12em] uppercase font-medium text-white/50 border-b border-white/[0.08] bg-white/[0.02]";
        });

        // Style body cells
        const bodyCells = el.querySelectorAll("td");
        bodyCells.forEach((cell) => {
          const c = cell as HTMLElement;
          c.className = "px-4 py-3 text-sm text-white/70 border-b border-white/[0.04]";
        });

        // Animate rows in sequence
        rows.forEach((row, idx) => {
          const rowEl = row as HTMLElement;
          setTimeout(() => {
            rowEl.style.opacity = "1";
            rowEl.style.transform = "translateY(0)";
          }, idx * 120);
        });

        // Continue after all rows have started appearing
        setTimeout(() => processNext(), rows.length * 120 + 200);
        return;
      }

      if (item.type === "image") {
        const { el } = item;
        el.style.opacity = "1";
        const img = el.querySelector("img");
        if (!img) { processNext(); return; }

        const src = img.getAttribute("src") || "";
        const alt = img.getAttribute("alt") || "";

        const wrapper = document.createElement("div");
        wrapper.className = "my-8 rounded-xl overflow-hidden border border-white/[0.06] relative";

        const progressBar = document.createElement("div");
        progressBar.className = "absolute top-0 left-0 right-0 z-10 h-[2px]";
        progressBar.innerHTML = '<div class="h-full bg-gradient-to-r from-accent to-blue-400 transition-all duration-1000 ease-out" style="width:20%"></div>';
        wrapper.appendChild(progressBar);

        const badge = document.createElement("div");
        badge.className = "absolute top-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark/80 backdrop-blur-sm border border-white/10";
        badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span><span class="text-[10px] tracking-[0.15em] uppercase text-white/60">Génération en cours...</span>';
        wrapper.appendChild(badge);

        const imgContainer = document.createElement("div");
        imgContainer.className = "relative aspect-[16/9] overflow-hidden";
        const newImg = document.createElement("img");
        newImg.src = src;
        newImg.alt = alt;
        newImg.className = "w-full h-full object-cover";
        newImg.style.filter = "blur(25px)";
        newImg.style.transition = "filter 1.5s ease-out";
        imgContainer.appendChild(newImg);

        const overlay = document.createElement("div");
        overlay.className = "absolute inset-0 bg-accent/[0.03] transition-opacity duration-1500";
        imgContainer.appendChild(overlay);
        wrapper.appendChild(imgContainer);

        const caption = document.createElement("div");
        caption.className = "px-4 py-3 border-t border-white/[0.04] flex items-center justify-between";
        caption.innerHTML = `<span class="text-xs text-white/30">${alt}</span>`;
        wrapper.appendChild(caption);

        el.replaceWith(wrapper);

        setTimeout(() => { (progressBar.firstElementChild as HTMLElement).style.width = "60%"; }, 500);
        setTimeout(() => {
          (progressBar.firstElementChild as HTMLElement).style.width = "95%";
          newImg.style.filter = "blur(8px)";
          badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span><span class="text-[10px] tracking-[0.15em] uppercase text-white/60">Finalisation...</span>';
        }, 1500);
        setTimeout(() => {
          newImg.style.filter = "blur(0px)";
          progressBar.style.opacity = "0";
          badge.style.opacity = "0";
          overlay.style.opacity = "0";
          caption.innerHTML = `<span class="text-xs text-white/30">${alt}</span><span class="text-[10px] tracking-widest uppercase text-accent/50">Généré par IA</span>`;
          processNext();
        }, 2800);

        return;
      }

      // Text typing animation
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