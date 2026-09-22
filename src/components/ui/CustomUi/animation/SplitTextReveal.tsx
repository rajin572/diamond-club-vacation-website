"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap-util";
import { cn } from "@/lib/utils";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  /** "lines" for headlines/paragraphs, "words" for short labels. */
  type?: "lines" | "words";
  stagger?: number;
  duration?: number;
  delay?: number;
  /** ScrollTrigger `start` -- default fires just before the text enters the viewport. */
  start?: string;
}

/**
 * Standard section text-reveal: splits `text` into lines/words, each masked
 * and risen into view, driven by a ScrollTrigger (`once: true`) rather than
 * a plain on-mount tween -- for above-the-fold text this still fires almost
 * immediately since the trigger is already past `start` on first paint, so
 * the same primitive works for a hero entrance and for text further down
 * the page.
 */
export function SplitTextReveal({
  text,
  className,
  type = "lines",
  stagger = 0.08,
  duration = 0.9,
  delay = 0,
  start = "top 85%",
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const split = SplitText.create(containerRef.current, {
        type,
        mask: type,
        autoSplit: true,
        onSplit: (self) => {
          const targets = type === "lines" ? self.lines : self.words;

          return reduceMotion
            ? gsap.from(targets, { opacity: 0, duration: 0.5, stagger: stagger / 2, delay })
            : gsap.from(targets, {
                yPercent: 110,
                duration,
                delay,
                ease: "premiumOut",
                stagger,
                scrollTrigger: { trigger: containerRef.current, start, once: true },
              });
        },
      });

      return () => split.revert();
    },
    { scope: containerRef, dependencies: [text, type, stagger, duration, delay, start] }
  );

  return (
    <span ref={containerRef} className={cn("inline-block", className)}>
      {text}
    </span>
  );
}

export default SplitTextReveal;
