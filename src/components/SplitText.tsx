"use client";

import { useMemo } from "react";

interface SplitTextProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  charClass?: string;
}

export function SplitText({
  children,
  className,
  tag: Tag = "div",
  charClass = "portfolio-char",
}: SplitTextProps) {
  const chars = useMemo(
    () =>
      children.split("").map((char, i) => (
        <span
          key={i}
          className={charClass}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : undefined,
          }}
          aria-hidden="true"
        >
          {char === " " ? " " : char}
        </span>
      )),
    [children, charClass]
  );

  return (
    <Tag className={className} aria-label={children}>
      {chars}
    </Tag>
  );
}